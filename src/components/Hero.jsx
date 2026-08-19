import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Code2, 
  Layers, 
  ExternalLink,
  Eye,
  Star,
  Cpu
} from 'lucide-react';

export const Hero = () => {
  const { profile, projects, setSelectedProject } = usePortfolio();

  const smileClinic = projects.find((p) => p.id === 'clinique-dentaire-al-ibtisama') || projects[0];
  const purrLuxe = projects.find((p) => p.id === 'purrluxe-cat-brush-store') || projects[1] || projects[0];

  const [activeTab, setActiveTab] = useState('smile');
  const activeProj = activeTab === 'smile' ? smileClinic : purrLuxe;

  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden bg-laser-grid">
      {/* Laser Light Background Orbs with Pulse Animations */}
      <div className="radial-mesh animate-pulse-slow" />
      <div className="absolute top-1/4 left-5 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 right-5 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" style={{ animationDelay: '2.5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Availability Badge with Radar Animation */}
        <div className="flex justify-center lg:justify-start mb-6">
          <div className="relative inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide backdrop-blur-xl shadow-lg shadow-emerald-500/10 hover:scale-105 transition-transform cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-radar"></span>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-mono">{profile.status || "Disponible pour de nouveaux projets"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Main Pitch (Left 7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-emerald-400 block">
                ✦ Architecte Web & Créateur de Solutions SaaS
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
                <span className="text-gradient-title">Je conçois des</span>{' '}
                <span className="text-gradient-emerald">Applications Web & SaaS d'Élite</span>{' '}
                <span className="text-gradient-title">qui maximisent votre chiffre d'affaires.</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              {profile.tagline || "Je conçois et développe des Applications Web sur-mesure, des plateformes SaaS et des sites e-commerce haute conversion."}
            </p>

            {/* Action Buttons with Shine & Hover Lift */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projets"
                className="btn-shine-effect flex items-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.03] active:scale-[0.97]"
              >
                <span>Explorer mes Réalisations</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#simulateur"
                className="btn-shine-effect flex items-center gap-2 px-6 py-4 rounded-xl model-card hover:bg-white/10 text-white font-semibold text-sm transition-all hover:border-emerald-500/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Simuler un Devis</span>
              </a>

              <a
                href={`https://wa.me/${profile.whatsapp ? profile.whatsapp.replace(/[^0-9]/g, '') : '212600000000'}?text=${encodeURIComponent("Bonjour Ahmed, j'aimerais discuter d'un projet web / SaaS avec vous.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-sm transition-all hover:scale-[1.03]"
                title="Discuter directement sur WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp Direct</span>
              </a>
            </div>

            {/* Trust Checklist */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="font-medium">Code 100% Propre & Modulaire</span>
              </div>
              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span className="font-medium">Score Vitesse 98+ Lighthouse</span>
              </div>
              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <span className="font-medium">Accompagnement 1:1 Dédié</span>
              </div>
            </div>

          </div>

          {/* Right Spotlight: Interactive Luxury Showcase Deck (Right 5 cols) */}
          <div className="lg:col-span-5 flex justify-center animate-float-slow">
            <div className="w-full max-w-lg rounded-2xl model-card border border-white/15 shadow-2xl overflow-hidden group relative">
              
              {/* Interactive Showcase Tabs */}
              <div className="flex items-center justify-between p-2.5 bg-[#060914] border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveTab('smile')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === 'smile' 
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-105' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    ✦ SaaS Médical
                  </button>
                  <button
                    onClick={() => setActiveTab('purrluxe')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === 'purrluxe' 
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 scale-105' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    ★ E-Commerce D2C
                  </button>
                </div>

                <div className="flex items-center gap-1.5 px-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">LIVE</span>
                </div>
              </div>

              {/* Browser Window Bar */}
              <div className="browser-top-bar">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 bg-white/5 px-3 py-0.5 rounded-md border border-white/5 truncate max-w-[200px]">
                  {activeProj?.title}
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  {activeProj?.images?.length || 5} photos HD
                </span>
              </div>

              {/* Cover Screenshot Container with Smooth Zoom */}
              <div 
                onClick={() => setSelectedProject(activeProj)}
                className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer"
              >
                <img
                  src={activeProj?.coverImage || (activeProj?.images && activeProj?.images[0]?.url)}
                  alt={activeProj?.title}
                  className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060914] via-transparent to-transparent opacity-90" />

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider shadow-lg">
                  ★ Projet Phare
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white bg-black/60 px-3 py-1 rounded-lg backdrop-blur-md border border-white/10">
                    {activeProj?.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-lg backdrop-blur-md border border-emerald-500/30">
                    Cliquez pour ouvrir ↗
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 space-y-4 bg-[#060914]/95">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-semibold text-emerald-400">{activeProj?.client}</span>
                    <span className="font-mono text-[11px] text-slate-500">{activeProj?.year || "2024"}</span>
                  </div>
                  <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
                    {activeProj?.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed font-normal">
                    {activeProj?.subtitle}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeProj?.techStack?.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10 hover:border-emerald-500/30 hover:text-emerald-300 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Trigger Button with Shine Effect */}
                <button
                  onClick={() => setSelectedProject(activeProj)}
                  className="btn-shine-effect w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/30 transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01]"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ouvrir l'Étude de Cas & Galerie Complète</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
