import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Code2, 
  Sparkles, 
  Menu, 
  X, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';

export const Navbar = () => {
  const { profile } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Réalisations', href: '#projets' },
    { name: 'Solutions & Services', href: '#services' },
    { name: 'Simulateur de Devis', href: '#simulateur' },
    { name: 'Compétences', href: '#competences' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300">
      <nav
        className={`w-full max-w-7xl rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-[#070b14]/90 backdrop-blur-xl border border-white/15 shadow-2xl py-3 px-6'
            : 'bg-[#070b14]/50 backdrop-blur-md border border-white/10 py-4 px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
              ✦
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight block group-hover:text-emerald-400 transition-colors">
                {profile.name || "Boutaba Ahmed"}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold tracking-wider block">
                FULL-STACK & SAAS STUDIO
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-xl border border-white/5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://wa.me/${profile.whatsapp ? profile.whatsapp.replace(/[^0-9]/g, '') : '212600000000'}?text=${encodeURIComponent("Bonjour Ahmed, je souhaite échanger avec vous sur un projet web.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <span>Demander un Devis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-xl"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 space-y-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-extrabold text-xs"
              >
                Demander un Devis Gratuit
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
