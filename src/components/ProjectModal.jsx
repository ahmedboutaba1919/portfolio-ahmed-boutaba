import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  MessageSquare,
  Maximize2,
  Calendar,
  ShieldCheck
} from 'lucide-react';

export const ProjectModal = () => {
  const { selectedProject, setSelectedProject, profile } = usePortfolio();
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!selectedProject) return null;

  const images = selectedProject.images && selectedProject.images.length > 0 
    ? selectedProject.images 
    : [{ url: selectedProject.coverImage, title: selectedProject.title }];

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[activeImageIdx] || images[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#070b14] border border-white/20 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0c1222] shrink-0">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              {selectedProject.category}
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-white line-clamp-1">{selectedProject.title}</h2>
          </div>
          <button
            onClick={() => setSelectedProject(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Main Cinema Photo Display */}
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-white/10 aspect-[16/9] group flex items-center justify-center">
              <img
                src={currentImage.url}
                alt={currentImage.title || selectedProject.title}
                className="w-full h-full object-contain bg-slate-950"
              />

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 text-white hover:bg-emerald-500 hover:text-slate-950 transition-all backdrop-blur-md shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 text-white hover:bg-emerald-500 hover:text-slate-950 transition-all backdrop-blur-md shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-black/80 text-white text-xs font-mono backdrop-blur-md border border-white/10">
                  {activeImageIdx + 1} / {images.length}
                </span>
              </div>
            </div>

            {/* Caption */}
            {currentImage.caption && (
              <p className="text-xs text-slate-300 italic text-center px-4">
                "{currentImage.caption}"
              </p>
            )}

            {/* Image Thumbnails Carousel */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative shrink-0 w-28 h-18 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx 
                        ? 'border-emerald-400 scale-105 shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/40' 
                        : 'border-white/10 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.title || `Aperçu ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
            
            {/* Problem & Solution (Left 2 cols) */}
            <div className="md:col-span-2 space-y-6">
              
              {selectedProject.subtitle && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Résumé du projet</h4>
                  <p className="text-sm text-slate-200 leading-relaxed">{selectedProject.subtitle}</p>
                </div>
              )}

              {selectedProject.problem && (
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <span>🎯 Défi & Problématique Métier</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{selectedProject.problem}</p>
                </div>
              )}

              {selectedProject.solution && (
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <span>💡 Solution Technique Développée</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{selectedProject.solution}</p>
                </div>
              )}

              {/* Key Features Checklist */}
              {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Fonctionnalités Clés Implémentées</h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {selectedProject.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Sidebar */}
            <div className="space-y-5">
              
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3.5 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">Client / Secteur :</span>
                  <span className="font-bold text-white text-sm">{selectedProject.client || "Client Partenaire"}</span>
                </div>
                <div className="border-t border-white/5 pt-2.5">
                  <span className="text-slate-400 block mb-0.5">Année de réalisation :</span>
                  <span className="font-mono text-white">{selectedProject.year || "2024"}</span>
                </div>
                <div className="border-t border-white/5 pt-2.5">
                  <span className="text-slate-400 block mb-0.5">Rôle & Responsabilité :</span>
                  <span className="text-emerald-400 font-semibold">Conception UI/UX & Dév Full-Stack</span>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Technologies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-white/10 text-emerald-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${profile.whatsapp ? profile.whatsapp.replace(/[^0-9]/g, '') : '212600000000'}?text=${encodeURIComponent(`Bonjour Ahmed, j'ai vu votre projet "${selectedProject.title}" et je souhaite développer un projet similaire.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-extrabold text-xs shadow-lg hover:scale-[1.02] transition-transform"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Projet Similaire ? Parlons-en</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
