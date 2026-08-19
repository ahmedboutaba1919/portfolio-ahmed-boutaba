import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  Github, 
  Linkedin,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection = () => {
  const { profile } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'SaaS / Application Web',
    budget: '1 000€ - 3 000€',
    message: ''
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(profile.email || "contact.boutaba.ahmed@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleDirectSubmit = (e) => {
    e.preventDefault();
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } });
    } catch (err) {}

    const text = `Bonjour Ahmed, je vous contacte depuis votre portfolio :
- Nom : ${formData.name}
- Email : ${formData.email}
- Téléphone : ${formData.phone || 'Non renseigné'}
- Type de Projet : ${formData.projectType}
- Budget estimé : ${formData.budget}
- Message : ${formData.message}`;

    const phone = profile.whatsapp ? profile.whatsapp.replace(/[^0-9]/g, '') : '212600000000';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact Direct & Devis</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Donnons Vie à Votre Projet
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Que vous ayez un cahier des charges prêt ou simplement une idée à concrétiser, je vous réponds sous moins de 2 heures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Direct Cards (Left 5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* WhatsApp Priority Card */}
            <a
              href={`https://wa.me/${profile.whatsapp ? profile.whatsapp.replace(/[^0-9]/g, '') : '212600000000'}?text=${encodeURIComponent("Bonjour Ahmed, je souhaite échanger avec vous au sujet d'un nouveau projet web.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block glass-card p-6 sm:p-7 rounded-2xl border border-emerald-500/40 hover:border-emerald-400 transition-all group relative overflow-hidden shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">Canal Prioritaire</span>
                  <h3 className="font-extrabold text-white text-lg">WhatsApp Direct</h3>
                  <p className="text-xs text-slate-300 mt-0.5">Réponse rapide & échange direct</p>
                </div>
              </div>
            </a>

            {/* Email Card */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Email Professionnel</span>
                    <h4 className="font-bold text-white text-sm">{profile.email || "contact.boutaba.ahmed@gmail.com"}</h4>
                  </div>
                </div>
                <button
                  onClick={copyEmailToClipboard}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Copier l'email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Availability */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{profile.location || "Maroc • Disponible en télétravail international"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Disponibilité : <strong className="text-emerald-400">{profile.status}</strong></span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-2">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-card hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-card hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>

          </div>

          {/* Contact Form (Right 7 cols) */}
          <div className="lg:col-span-7 glass-card p-7 sm:p-9 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">Envoyez-moi un message direct</h3>
            <p className="text-xs text-slate-400 mb-6">
              Remplissez ce formulaire pour recevoir une estimation personnalisée et organiser un échange de cadrage.
            </p>

            <form onSubmit={handleDirectSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Votre Nom / Entreprise *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Karim Benali"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Votre Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nom@entreprise.com"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Type de Projet</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="SaaS / Application Web">SaaS / Application Web</option>
                    <option value="Boutique E-Commerce D2C">Boutique E-Commerce D2C</option>
                    <option value="Site Vitrine / Landing Page">Site Vitrine / Landing Page</option>
                    <option value="Refonte & Optimisation">Refonte & Optimisation</option>
                    <option value="Autre projet sur-mesure">Autre projet sur-mesure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Fourchette de Budget</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="< 500€">&lt; 500€ (Projet express)</option>
                    <option value="500€ - 1 500€">500€ - 1 500€</option>
                    <option value="1 500€ - 3 000€">1 500€ - 3 000€</option>
                    <option value="3 000€+">3 000€+ (Plateforme complète)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Décrivez brièvement vos objectifs *</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Expliquez vos objectifs, les fonctionnalités souhaitées et vos délais..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer ma demande (WhatsApp & Email)</span>
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
