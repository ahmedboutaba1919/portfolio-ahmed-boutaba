import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Star, MessageSquare, Quote, Sparkles } from 'lucide-react';

export const TestimonialsSection = () => {
  const { testimonials } = usePortfolio();

  return (
    <section className="py-24 relative overflow-hidden bg-dot-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Retours d'Expérience Partenaires</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ce que Disent Mes Clients
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            La satisfaction client, le respect des délais et la qualité du code sont au cœur de chaque mission.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={item.id || idx}
              className="super-card p-8 rounded-2xl border border-white/10 flex flex-col justify-between space-y-6 relative group"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating || 5)].map((_, rIdx) => (
                    <Star key={rIdx} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{item.feedback}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-bold text-sm shadow-md">
                  {item.author ? item.author.charAt(0) : 'C'}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{item.author}</h4>
                  <p className="text-xs text-emerald-400 font-medium">{item.role} • {item.company}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
