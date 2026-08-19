import React, { useState, useRef } from 'react';
import { ExternalLink, Eye, Star, ArrowUpRight } from 'lucide-react';

export const ProjectCard = ({ project, onOpenDetails }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const imagesCount = project.images ? project.images.length : 1;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, shineX, shineY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
      }}
      className="group rounded-2xl model-card overflow-hidden flex flex-col h-full border border-white/10 relative shadow-xl select-none"
    >
      {/* Interactive Cursor Spotlight Glow */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 220px at ${tilt.shineX}% ${tilt.shineY}%, rgba(16, 185, 129, 0.18), transparent 70%)`
          }}
        />
      )}

      {/* Browser Mockup Top Bar */}
      <div className="browser-top-bar flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block animate-pulse"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
        </div>
        <div className="text-[10px] font-mono text-slate-400 truncate max-w-[160px]">
          {project.category}
        </div>
        <span className="font-mono text-[10px] text-slate-500">{project.year || '2024'}</span>
      </div>

      {/* Image Preview Container */}
      <div 
        onClick={() => onOpenDetails(project)}
        className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer"
      >
        <img
          src={project.coverImage || (project.images && project.images[0]?.url)}
          alt={project.title}
          className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060914] via-transparent to-transparent opacity-80" />

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md">
            <Star className="w-2.5 h-2.5 fill-slate-950" />
            <span>Phare</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
          <span className="btn-shine-effect flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-4 h-4" />
            <span>Voir l'Étude & Galerie ({imagesCount} photo{imagesCount > 1 ? 's' : ''})</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#060914]/90 z-10">
        <div>
          {/* Client & Date */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-emerald-400">{project.client || "Client Partenaire"}</span>
            <span className="font-mono text-[11px] text-slate-500">{project.year || "2024"}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onOpenDetails(project)}
            className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors cursor-pointer line-clamp-1"
          >
            {project.title}
          </h3>

          {/* Subtitle / Description */}
          <p className="text-xs text-slate-300 line-clamp-2 mt-1.5 leading-relaxed font-normal">
            {project.subtitle || project.problem || "Application web conçue sur-mesure avec une expérience utilisateur optimale."}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.techStack?.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.techStack && project.techStack.length > 4 && (
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <button
            onClick={() => onOpenDetails(project)}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors group-hover:translate-x-1"
          >
            <span>Détails & Galerie</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {project.demoUrl && project.demoUrl !== '#' && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              title="Lien direct vers le site en ligne"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Site Live</span>
            </a>
          )}
        </div>

      </div>

    </div>
  );
};
