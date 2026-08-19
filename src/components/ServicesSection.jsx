import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Layers, 
  ShoppingCart, 
  Layout, 
  Zap, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

export const ServicesSection = () => {
  const { services } = usePortfolio();

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-6 h-6 text-emerald-400" />;
      case 'ShoppingCart': return <ShoppingCart className="w-6 h-6 text-cyan-400" />;
      case 'Layout': return <Layout className="w-6 h-6 text-indigo-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-amber-400" />;
      default: return <Sparkles className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Offres & Valeur Ajoutée</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ce que je Développe pour Vous
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Des architectures logicielles complètes, conçues pour résoudre vos besoins métiers réels et offrir une expérience utilisateur haut de gamme.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv, idx) => (
            <div
              key={srv.id || idx}
              className="glass-card p-8 sm:p-9 rounded-2xl border border-white/10 flex flex-col justify-between space-y-6 relative group overflow-hidden"
            >
              <div className="space-y-5">
                
                {/* Icon & Category Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    {getIcon(srv.icon)}
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                    {srv.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {srv.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {srv.description}
                </p>

                {/* Deliverables List */}
                {srv.deliverables && (
                  <div className="space-y-2.5 pt-3 border-t border-white/5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Livrables & Garanties Inclus :
                    </span>
                    {srv.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Bottom Target */}
              {srv.idealFor && (
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    <strong className="text-slate-200">Idéal pour :</strong> {srv.idealFor}
                  </span>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
