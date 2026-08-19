import React from 'react';

export const ProjectFilter = ({ categories, activeCategory, onSelectCategory, projectCounts }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        const count = projectCounts[cat] ?? 0;

        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              isActive
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-105'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 hover:border-white/20'
            }`}
          >
            <span>{cat}</span>
            <span
              className={`text-[11px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-white/10 text-slate-400'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
