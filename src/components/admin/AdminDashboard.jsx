import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectFormModal } from './ProjectFormModal';
import { 
  ShieldCheck, 
  FolderPlus, 
  Edit, 
  Trash2, 
  Eye, 
  User, 
  Sliders, 
  Download, 
  Upload, 
  RefreshCw, 
  KeyRound, 
  LogOut, 
  Star, 
  ArrowUp, 
  ArrowDown,
  Layers,
  Sparkles,
  Phone,
  Mail,
  Check
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    profile, 
    setProfile, 
    projects, 
    deleteProject, 
    toggleProjectFeatured, 
    moveProject, 
    logoutAdmin, 
    setIsAdminViewActive,
    exportData,
    importData,
    resetToDefault,
    adminPin,
    updateAdminPin
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'profile' | 'backup' | 'security'
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Profile Form state
  const [profileForm, setProfileForm] = useState(profile);
  const [profileSaved, setProfileSaved] = useState(false);

  // PIN Form state
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinMessage, setPinMessage] = useState({ text: '', isError: false });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setProfile(profileForm);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handlePinUpdate = (e) => {
    e.preventDefault();
    const success = updateAdminPin(currentPin, newPin);
    if (success) {
      setPinMessage({ text: 'Code PIN mis à jour avec succès !', isError: false });
      setCurrentPin('');
      setNewPin('');
    } else {
      setPinMessage({ text: 'Code actuel incorrect ou nouveau code trop court (min 4 car.).', isError: true });
    }
  };

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const ok = importData(json);
        if (ok) {
          alert('Sauvegarde restaurée avec succès !');
        } else {
          alert('Format de fichier invalide.');
        }
      } catch (err) {
        alert('Erreur lors de la lecture du fichier JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">Espace Administrateur</h1>
                <span className="text-xs font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                  Connecté
                </span>
              </div>
              <p className="text-xs text-slate-400">Gérez vos projets, vos photos et les paramètres de votre portfolio.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminViewActive(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold border border-white/10 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Voir le Site Client</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
          {[
            { id: 'projects', label: `Mes Projets (${projects.length})`, icon: Layers },
            { id: 'profile', label: 'Profil & Coordonnées', icon: User },
            { id: 'backup', label: 'Sauvegarde & Données', icon: Download },
            { id: 'security', label: 'Sécurité & Code PIN', icon: KeyRound },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROJECTS LIST */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Liste des Réalisations</h2>
              <button
                onClick={() => {
                  setProjectToEdit(null);
                  setIsFormOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-md hover:scale-[1.02] transition-transform"
              >
                <FolderPlus className="w-4 h-4" />
                <span>+ Ajouter un Nouveau Projet</span>
              </button>
            </div>

            {/* Projects Table / Cards */}
            <div className="grid grid-cols-1 gap-4">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-20 h-14 rounded-xl overflow-hidden bg-slate-950 border border-white/10 shrink-0">
                      <img
                        src={proj.coverImage || (proj.images && proj.images[0]?.url)}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          {proj.category}
                        </span>
                        {proj.featured && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                            <Star className="w-3 h-3 fill-amber-400" />
                            Phare
                          </span>
                        )}
                        <span className="text-xs text-slate-500">{proj.images?.length || 1} photo(s)</span>
                      </div>
                      <h3 className="font-bold text-white text-sm truncate">{proj.title}</h3>
                      <p className="text-xs text-slate-400 truncate">{proj.subtitle || proj.client}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    
                    {/* Reorder Buttons */}
                    <button
                      disabled={idx === 0}
                      onClick={() => moveProject(proj.id, 'up')}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Monter d'un rang"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    <button
                      disabled={idx === projects.length - 1}
                      onClick={() => moveProject(proj.id, 'down')}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Descendre d'un rang"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Toggle Featured */}
                    <button
                      onClick={() => toggleProjectFeatured(proj.id)}
                      className={`p-2 rounded-lg border transition-colors ${
                        proj.featured 
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                          : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                      }`}
                      title="Basculer En Vedette"
                    >
                      <Star className={`w-3.5 h-3.5 ${proj.featured ? 'fill-amber-300' : ''}`} />
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => {
                        setProjectToEdit(proj);
                        setIsFormOpen(true);
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-emerald-500/20 hover:text-emerald-300 text-slate-200 text-xs font-semibold transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Modifier</span>
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => {
                        if (confirm(`Êtes-vous sûr de vouloir supprimer le projet "${proj.title}" ?`)) {
                          deleteProject(proj.id);
                        }
                      }}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                      title="Supprimer ce projet"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: PROFILE & CONTACT */}
        {activeTab === 'profile' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 max-w-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Profil & Coordonnées Client</h2>
                <p className="text-xs text-slate-400">Ces informations sont visibles sur le portfolio et utilisées pour les boutons de contact.</p>
              </div>
              {profileSaved && (
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
                  <Check className="w-4 h-4" />
                  <span>Enregistré avec succès !</span>
                </span>
              )}
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nom Complet</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Titre Professionnel</label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Accroche Principale (Hero Pitch)</label>
                <textarea
                  rows="2"
                  value={profileForm.tagline}
                  onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Numéro WhatsApp (Format int. sans + ni espaces)</label>
                  <input
                    type="text"
                    value={profileForm.whatsapp}
                    onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                    placeholder="212600000000"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email de Contact</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Badge de Disponibilité</label>
                  <input
                    type="text"
                    value={profileForm.status}
                    onChange={(e) => setProfileForm({ ...profileForm, status: e.target.value })}
                    placeholder="🟢 Disponible pour de nouveaux projets"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Localisation / Remote</label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-md hover:scale-[1.02] transition-transform"
                >
                  Enregistrer mon Profil
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 3: BACKUP & DATA */}
        {activeTab === 'backup' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            
            {/* Export JSON */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Exporter la Base de Données</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Téléchargez un fichier de sauvegarde JSON contenant tous vos projets, photos, réglages et coordonnées.
              </p>
              <button
                onClick={exportData}
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
              >
                Télécharger la Sauvegarde (.JSON)
              </button>
            </div>

            {/* Import JSON */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Restaurer une Sauvegarde</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Restaurez l'ensemble de votre portfolio à partir d'un fichier JSON exporté précédemment.
              </p>
              <label className="block w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-center text-white font-bold text-xs cursor-pointer border border-white/15 transition-colors">
                <span>Sélectionner un fichier JSON</span>
                <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
              </label>
            </div>

            {/* Reset Data */}
            <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-rose-500/20 space-y-3 bg-rose-950/10">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-rose-400" />
                <h4 className="text-sm font-bold text-white">Réinitialiser aux Données Initiales</h4>
              </div>
              <p className="text-xs text-slate-400">
                Remet le portfolio à son état d'origine avec le projet dentaire Al Ibtisama et les projets par défaut.
              </p>
              <button
                onClick={() => {
                  if (confirm('Attention : cette action va effacer les modifications non sauvegardées et restaurer les données par défaut. Continuer ?')) {
                    resetToDefault();
                    alert('Données réinitialisées avec succès.');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold border border-rose-500/30"
              >
                Réinitialiser les Données
              </button>
            </div>

          </div>
        )}

        {/* TAB 4: SECURITY */}
        {activeTab === 'security' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 max-w-md space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Modifier le Code PIN Administrateur</h2>
              <p className="text-xs text-slate-400">Ce code sécurise l'accès à ce panneau d'administration.</p>
            </div>

            <form onSubmit={handlePinUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Code PIN Actuel</label>
                <input
                  type="password"
                  required
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value)}
                  placeholder="Code actuel (par défaut: 1234)"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nouveau Code PIN / Mot de passe</label>
                <input
                  type="password"
                  required
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="Nouveau code (min. 4 caractères)"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              {pinMessage.text && (
                <p className={`text-xs ${pinMessage.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {pinMessage.text}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-md"
              >
                Changer le Code PIN
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Project Form Modal (Add / Edit) */}
      {isFormOpen && (
        <ProjectFormModal
          projectToEdit={projectToEdit}
          onClose={() => {
            setIsFormOpen(false);
            setProjectToEdit(null);
          }}
        />
      )}

    </div>
  );
};
