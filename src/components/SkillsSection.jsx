import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Code2, 
  Database, 
  Cloud, 
  Layout, 
  Cpu, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const SkillsSection = () => {
  const { skills } = usePortfolio();

  return (
    <section id="competences" className="py-24 relative overflow-hidden bg-[#050811]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technologies & Stack de Pointe</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Maîtrise Technique & Performance
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Un écosystème moderne axé sur la réactivité, la sécurité des données et une évolutivité sans faille.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Frontend */}
          <div className="super-card p-8 rounded-2xl border border-white/10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Layout className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Frontend & UI/UX</h3>
                <p className="text-xs text-slate-400">Interfaces ultra-fluides & responsive</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {['React 18', 'Next.js', 'Tailwind CSS', 'TypeScript', 'JavaScript ES6+', 'Redux / Zustand', 'HTML5 / CSS3', 'RTL (Support Arabe)'].map((t, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Backend & DB */}
          <div className="super-card p-8 rounded-2xl border border-white/10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Backend & Données</h3>
                <p className="text-xs text-slate-400">Logique métier & APIs scalables</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'REST APIs', 'JWT / OAuth', 'Prisma ORM', 'Stripe API'].map((t, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* DevOps & Qualité */}
          <div className="super-card p-8 rounded-2xl border border-white/10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Cloud className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">DevOps & Déploiement</h3>
                <p className="text-xs text-slate-400">Sécurité & Vitesse 98+ Lighthouse</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Git & GitHub', 'Vercel / Netlify', 'Docker Basics', 'Vite.js', 'SEO & Core Web Vitals', 'CI/CD Pipelines', 'Sécurité SSL/TLS'].map((t, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-indigo-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
