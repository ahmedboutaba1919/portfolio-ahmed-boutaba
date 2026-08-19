import React, { useState, useEffect, useMemo } from 'react';
import { usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ParticleBackground } from './components/ParticleBackground';
import { ProjectFilter } from './components/ProjectFilter';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { PriceEstimator } from './components/PriceEstimator';
import { ServicesSection } from './components/ServicesSection';
import { SkillsSection } from './components/SkillsSection';
import { ProcessAndGuaranteesSection } from './components/ProcessAndGuaranteesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminStandalonePage } from './components/AdminStandalonePage';
import { Layers } from 'lucide-react';

export function App() {
  const { projects, setSelectedProject } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [currentRoute, setCurrentRoute] = useState(() => {
    return window.location.hash === '#/admin' || window.location.pathname === '/admin' ? 'admin' : 'client';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/admin' || window.location.pathname === '/admin') {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('client');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const categories = useMemo(() => {
    return ['Tous', 'SaaS & Applications Web', 'E-Commerce & Vente', 'Sites Vitrines & Portails'];
  }, []);

  const projectCounts = useMemo(() => {
    const counts = { Tous: projects.length };
    categories.forEach((cat) => {
      if (cat !== 'Tous') {
        counts[cat] = projects.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, [projects, categories]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Tous') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  if (currentRoute === 'admin') {
    return <AdminStandalonePage />;
  }

  return (
    <div className="min-h-screen bg-[#040711] text-slate-100 font-sans selection:bg-emerald-500 selection:text-white relative">
      {/* Interactive Particle Canvas */}
      <ParticleBackground />

      <Navbar />
      <Hero />

      <section id="projets" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Portefeuille de Réalisations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Projets Récents & Études de Cas
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Découvrez des applications conçues avec rigueur, optimisées pour la conversion et adaptées aux exigences de chaque secteur.
            </p>
          </div>

          <ProjectFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            projectCounts={projectCounts}
          />

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenDetails={setSelectedProject}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 model-card rounded-2xl border border-white/10 text-slate-400 text-sm">
              Aucun projet dans cette catégorie pour le moment.
            </div>
          )}
        </div>
      </section>

      <ServicesSection />
      <PriceEstimator />
      <SkillsSection />
      <ProcessAndGuaranteesSection />
      <ContactSection />
      <Footer />
      <ProjectModal />
    </div>
  );
}

export default App;
