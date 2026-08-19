import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { compressImageFile } from '../../utils/storage';
import { 
  X, 
  Upload, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Check, 
  Layers, 
  Sparkles,
  Link,
  Calendar,
  Star
} from 'lucide-react';

export const ProjectFormModal = ({ projectToEdit, onClose }) => {
  const { addProject, updateProject } = usePortfolio();

  const [formData, setFormData] = useState({
    title: '',
    category: 'SaaS & Applications Web',
    subtitle: '',
    client: '',
    year: new Date().getFullYear().toString(),
    status: 'published',
    featured: false,
    coverImage: '',
    demoUrl: '',
    githubUrl: '',
    problem: '',
    solution: '',
    techStack: ['React', 'Tailwind CSS'],
    keyFeatures: ['']
  });

  const [images, setImages] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        title: projectToEdit.title || '',
        category: projectToEdit.category || 'SaaS & Applications Web',
        subtitle: projectToEdit.subtitle || '',
        client: projectToEdit.client || '',
        year: projectToEdit.year || new Date().getFullYear().toString(),
        status: projectToEdit.status || 'published',
        featured: projectToEdit.featured || false,
        coverImage: projectToEdit.coverImage || '',
        demoUrl: projectToEdit.demoUrl || '',
        githubUrl: projectToEdit.githubUrl || '',
        problem: projectToEdit.problem || '',
        solution: projectToEdit.solution || '',
        techStack: projectToEdit.techStack || ['React', 'Tailwind CSS'],
        keyFeatures: projectToEdit.keyFeatures && projectToEdit.keyFeatures.length > 0 ? projectToEdit.keyFeatures : ['']
      });

      setImages(projectToEdit.images || []);
    }
  }, [projectToEdit]);

  // Handle local image upload from computer with auto-compression
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    try {
      const newUploadedImages = [];
      for (const file of files) {
        const compressedBase64 = await compressImageFile(file, 1600, 0.85);
        newUploadedImages.push({
          url: compressedBase64,
          title: file.name.replace(/\.[^/.]+$/, ""),
          caption: "Capture d'écran du projet"
        });
      }

      setImages((prev) => [...prev, ...newUploadedImages]);

      // Set cover image if empty
      if (!formData.coverImage && newUploadedImages.length > 0) {
        setFormData((prev) => ({ ...prev, coverImage: newUploadedImages[0].url }));
      }
    } catch (err) {
      console.error('Image compression error:', err);
      alert('Erreur lors du chargement des images.');
    } finally {
      setUploading(false);
    }
  };

  // Add external image URL
  const handleAddImageUrl = () => {
    const url = prompt("Entrez l'URL de l'image :");
    if (url && url.trim()) {
      const newImg = { url: url.trim(), title: 'Image', caption: '' };
      setImages((prev) => [...prev, newImg]);
      if (!formData.coverImage) {
        setFormData((prev) => ({ ...prev, coverImage: url.trim() }));
      }
    }
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const filtered = prev.filter((_, i) => i !== index);
      if (formData.coverImage === prev[index]?.url) {
        setFormData((f) => ({ ...f, coverImage: filtered[0]?.url || '' }));
      }
      return filtered;
    });
  };

  const setAsCover = (url) => {
    setFormData((prev) => ({ ...prev, coverImage: url }));
  };

  // Tech stack tags management
  const addTechTag = () => {
    if (newTag.trim() && !formData.techStack.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTechTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tag)
    }));
  };

  // Key features checklist management
  const addFeatureInput = () => {
    setFormData((prev) => ({
      ...prev,
      keyFeatures: [...prev.keyFeatures, '']
    }));
  };

  const updateFeatureInput = (index, value) => {
    const updated = [...formData.keyFeatures];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, keyFeatures: updated }));
  };

  const removeFeatureInput = (index) => {
    setFormData((prev) => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== index)
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Veuillez renseigner au moins le titre du projet.');
      return;
    }

    const payload = {
      ...formData,
      images: images.length > 0 ? images : (formData.coverImage ? [{ url: formData.coverImage, title: formData.title }] : []),
      coverImage: formData.coverImage || (images[0]?.url || ''),
      keyFeatures: formData.keyFeatures.filter((f) => f.trim() !== '')
    };

    if (projectToEdit) {
      updateProject(projectToEdit.id, payload);
    } else {
      addProject(payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0b101e] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0e1528] shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">
              {projectToEdit ? 'Modifier le Projet' : 'Ajouter un Nouveau Projet'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6">
          
          {/* Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Titre du Projet *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: SaaS de Réservation Médicale"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Catégorie *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="SaaS & Applications Web">SaaS & Applications Web</option>
                <option value="E-Commerce & Vente">E-Commerce & Vente</option>
                <option value="Sites Vitrines & Portails">Sites Vitrines & Portails</option>
                <option value="Outils Métier & Automatisation">Outils Métier & Automatisation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Client / Commanditaire</label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="Ex: Clinique Dentaire Al Ibtisama"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Année</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="2024"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-emerald-500 rounded focus:ring-0"
                />
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  Mettre en vedette (Projet Phare)
                </span>
              </label>
            </div>
          </div>

          {/* Subtitle / Pitch */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description Courte / Pitch</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="Ex: Solution complète de prise de rendez-vous en 3 étapes avec espace patient autonome."
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Images & Screenshots Uploader */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-400" />
                  <span>Captures d'écran & Photos du projet ({images.length})</span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Vous pouvez ajouter plusieurs captures. Les photos sont compressées et sauvegardées localement.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <label className="cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploading ? 'Compression...' : 'Importer depuis le PC'}</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="px-3 py-1.5 rounded-lg bg-white/10 text-slate-300 text-xs font-medium hover:bg-white/15 transition-colors"
                >
                  + URL Externe
                </button>
              </div>
            </div>

            {/* Images Grid */}
            {images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative rounded-xl overflow-hidden border group aspect-video bg-slate-950 ${
                      formData.coverImage === img.url ? 'border-emerald-400 ring-2 ring-emerald-500/40' : 'border-white/10'
                    }`}
                  >
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                    
                    {formData.coverImage === img.url && (
                      <span className="absolute top-1 left-1 bg-emerald-500 text-slate-950 font-bold text-[9px] px-1.5 py-0.5 rounded shadow">
                        Couverture
                      </span>
                    )}

                    {/* Actions Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAsCover(img.url)}
                        className="p-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                        title="Définir comme image de couverture"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="p-1.5 rounded-lg bg-rose-500 text-white hover:bg-rose-600"
                        title="Supprimer cette image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 border border-dashed border-white/10 rounded-xl text-xs text-slate-400">
                Aucune capture d'écran ajoutée pour le moment. Cliquez sur "Importer depuis le PC" pour en ajouter.
              </div>
            )}
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Problématique / Contexte</label>
              <textarea
                rows="3"
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                placeholder="Quel était le problème du client ou l'objectif initial ?"
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Solution Technique Apportée</label>
              <textarea
                rows="3"
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                placeholder="Quelle solution avez-vous conçu et développée ?"
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
              ></textarea>
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Technologies Utilisées</label>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {formData.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-lg bg-white/10 text-emerald-300 border border-white/5"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTechTag(tech)}
                    className="text-slate-400 hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 max-w-sm">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTechTag();
                  }
                }}
                placeholder="Ex: Next.js, Stripe, Supabase..."
                className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
              <button
                type="button"
                onClick={addTechTag}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
              >
                + Ajouter
              </button>
            </div>
          </div>

          {/* Key Features Checklist */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">Points Forts & Fonctionnalités Réalisées</label>
              <button
                type="button"
                onClick={addFeatureInput}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300"
              >
                + Ajouter un point
              </button>
            </div>

            <div className="space-y-2">
              {formData.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => updateFeatureInput(idx, e.target.value)}
                    placeholder="Ex: Tunnel de réservation fluide en 3 étapes sans friction"
                    className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                  {formData.keyFeatures.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeatureInput(idx)}
                      className="p-2 text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Lien du Site en Ligne (Optionnel)</label>
              <input
                type="url"
                value={formData.demoUrl}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                placeholder="https://monsite.com"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Lien Code GitHub (Optionnel)</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/mon-projet"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Footer Submit Buttons */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {projectToEdit ? 'Enregistrer les Modifications' : 'Publier le Projet'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
