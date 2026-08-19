import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Calculator, 
  Sparkles, 
  Check, 
  Clock, 
  MessageSquare, 
  ArrowRight,
  Tag,
  ShieldCheck,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PriceEstimator = () => {
  const { profile } = usePortfolio();

  const [projectType, setProjectType] = useState('vitrine');
  const [scope, setScope] = useState('small');
  const [features, setFeatures] = useState({
    auth: false,
    payment: false,
    adminDashboard: true,
    aiIntegration: false,
    multilingual: true,
    seoOptimization: true
  });
  const [urgency, setUrgency] = useState('standard');

  const calculateEstimate = () => {
    let basePrice = 0;
    let baseDays = 0;

    if (projectType === 'vitrine') {
      basePrice = 190;
      baseDays = 4;
    } else if (projectType === 'ecommerce') {
      basePrice = 390;
      baseDays = 7;
    } else if (projectType === 'saas') {
      basePrice = 490;
      baseDays = 9;
    } else {
      basePrice = 290;
      baseDays = 5;
    }

    if (scope === 'small') {
      basePrice *= 0.85;
      baseDays = Math.max(3, Math.round(baseDays * 0.8));
    } else if (scope === 'large') {
      basePrice *= 1.35;
      baseDays = Math.round(baseDays * 1.4);
    }

    if (features.auth && projectType !== 'saas') basePrice += 60;
    if (features.payment && projectType !== 'ecommerce') basePrice += 80;
    if (features.adminDashboard && projectType !== 'saas') basePrice += 70;
    if (features.aiIntegration) { basePrice += 120; baseDays += 2; }
    if (features.multilingual) basePrice += 50;
    if (features.seoOptimization) basePrice += 40;

    if (urgency === 'express') {
      basePrice *= 1.2;
      baseDays = Math.max(2, Math.round(baseDays * 0.65));
    }

    const minPrice = Math.round(basePrice * 0.9);
    const maxPrice = Math.round(basePrice * 1.12);

    return { minPrice, maxPrice, days: baseDays };
  };

  const estimate = calculateEstimate();

  const toggleFeature = (key) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const triggerConfetti = () => {
    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
    } catch (e) {}
  };

  const generateWhatsAppMessage = () => {
    triggerConfetti();
    const typeLabel = {
      vitrine: "Site Vitrine / Landing Page",
      ecommerce: "Boutique E-Commerce D2C",
      saas: "Application Web / Plateforme SaaS",
      custom: "Projet Web Sur-Mesure"
    }[projectType];

    const activeFeatures = Object.entries(features)
      .filter(([_, val]) => val)
      .map(([key]) => {
        const map = {
          auth: "Authentification & Rôles",
          payment: "Paiement en ligne sécurisé (Stripe)",
          adminDashboard: "Dashboard Administrateur Dédié",
          aiIntegration: "Intégration IA / API",
          multilingual: "Support Multilingue & RTL (Arabe/Français)",
          seoOptimization: "SEO & Vitesse 98+ Lighthouse"
        };
        return map[key];
      })
      .join(", ");

    const text = `Bonjour Ahmed, j'ai configuré mon projet sur votre simulateur en ligne :
- Type de projet : ${typeLabel}
- Envergure : ${scope === 'small' ? 'Essentiel (1-3 pages clés)' : scope === 'medium' ? 'Standard (4-8 pages)' : 'Complet (Plateforme 9+ pages)'}
- Modules choisis : ${activeFeatures || 'Modules de base'}
- Délai estimé : ~${estimate.days} jours ouvrés
- Budget indicatif : ${estimate.minPrice}€ - ${estimate.maxPrice}€ (Tarif spécial lancement)

Pouvez-vous me confirmer vos disponibilités pour démarrer ?`;

    const phone = profile.whatsapp ? profile.whatsapp.replace(/[^0-9]/g, '') : '21622456563';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="simulateur" className="py-24 relative overflow-hidden bg-[#050813]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Early Bird Offer Tag */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Tag className="w-3.5 h-3.5" />
            <span>Tarifs de Lancement Partenaires • 100% Transparent</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Estimez Votre Projet en Direct
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Des tarifs accessibles et calculés au plus juste pour lancer votre projet rapidement sans compromis sur la qualité.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Configurator (Left 7 cols) */}
          <div className="lg:col-span-7 model-card p-6 sm:p-9 rounded-2xl border border-white/10 space-y-8">
            
            {/* Step 1: Type of project */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  1. Type de Solution Web
                </label>
                <span className="text-[11px] font-mono text-emerald-400">Dès 190€</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'vitrine', label: 'Site Vitrine', price: 'Dès 190€', desc: '1-3 pages épurées' },
                  { id: 'ecommerce', label: 'E-Commerce', price: 'Dès 390€', desc: 'Boutique D2C rapide' },
                  { id: 'saas', label: 'SaaS / App Web', price: 'Dès 490€', desc: 'Plateforme complète' },
                  { id: 'custom', label: 'Sur-Mesure', price: 'Dès 290€', desc: 'Besoin spécifique' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setProjectType(t.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      projectType === t.id
                        ? 'bg-emerald-500/25 border-emerald-400 text-white shadow-lg ring-1 ring-emerald-400/40 scale-[1.02]'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="block text-xs font-bold text-white">{t.label}</span>
                    </div>
                    <span className="block text-[11px] font-mono text-emerald-400 font-semibold mt-0.5">{t.price}</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Scale */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  2. Envergure du Projet
                </label>
                <span className="text-[11px] font-mono text-cyan-400">Étape 2/4</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'small', label: 'Essentiel', desc: '1 à 3 pages clés' },
                  { id: 'medium', label: 'Standard', desc: '4 à 8 pages / flux' },
                  { id: 'large', label: 'Complet', desc: '9+ pages & portail' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setScope(s.id)}
                    className={`p-3.5 rounded-xl text-center border transition-all ${
                      scope === s.id
                        ? 'bg-cyan-500/25 border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400/40 scale-[1.02]'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="block text-xs font-bold text-white">{s.label}</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{s.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Features Checklist */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  3. Modules & Fonctionnalités Souhaitées
                </label>
                <span className="text-[11px] font-mono text-indigo-400">À la carte</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { key: 'adminDashboard', label: 'Espace Administrateur', desc: 'Gestion autonome des contenus & stats' },
                  { key: 'payment', label: 'Paiement en ligne sécurisé', desc: 'Stripe Checkout & facturation auto' },
                  { key: 'auth', label: 'Connexion Utilisateurs / Rôles', desc: 'Comptes clients & permissions' },
                  { key: 'multilingual', label: 'Support Multilingue & RTL', desc: 'Français, Arabe, Anglais fluide' },
                  { key: 'seoOptimization', label: 'Optimisation SEO & Vitesse 98+', desc: 'Score Google Lighthouse maximal' },
                  { key: 'aiIntegration', label: 'Module IA / Automatisation API', desc: 'Chatbot intelligent ou OpenAI API' },
                ].map((feat) => {
                  const isChecked = features[feat.key];
                  return (
                    <div
                      key={feat.key}
                      onClick={() => toggleFeature(feat.key)}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                        isChecked
                          ? 'bg-emerald-500/15 border-emerald-400/80 text-white shadow-sm'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked ? 'bg-emerald-500 text-slate-950 shadow' : 'border border-white/20 bg-transparent'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-white">{feat.label}</span>
                        <span className="block text-[11px] text-slate-400">{feat.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Urgency */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  4. Délais de Réalisation
                </label>
                <span className="text-[11px] font-mono text-amber-400">Étape 4/4</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setUrgency('standard')}
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    urgency === 'standard'
                      ? 'bg-indigo-500/20 border-indigo-400 text-white ring-1 ring-indigo-400/30'
                      : 'bg-white/5 border-white/10 text-slate-300'
                  }`}
                >
                  <span className="block text-xs font-bold text-white">Délai Standard</span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">Rythme soigné & fluide</span>
                </button>
                <button
                  onClick={() => setUrgency('express')}
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    urgency === 'express'
                      ? 'bg-amber-500/20 border-amber-400 text-white ring-1 ring-amber-400/30'
                      : 'bg-white/5 border-white/10 text-slate-300'
                  }`}
                >
                  <span className="block text-xs font-bold text-amber-300">⚡ Livraison Express</span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">Priorité absolue (2 à 5 jours)</span>
                </button>
              </div>
            </div>

          </div>

          {/* Live Estimate Card (Right 5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="model-card p-7 sm:p-9 rounded-2xl border border-emerald-500/40 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#0e172a] via-[#080d1b] to-[#040711]">
              
              {/* Early bird tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                  <Tag className="w-3 h-3" />
                  <span>Tarif Spécial Lancement</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">Sans frais cachés</span>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <div className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {estimate.minPrice}€ — {estimate.maxPrice}€
                </div>
                <p className="text-xs text-slate-400 mt-1.5 font-normal">
                  *Fourchette indicative claire et personnalisable selon vos besoins précis.
                </p>
              </div>

              {/* Delivery Timeline */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400">Délai estimé</span>
                    <span className="block text-sm font-bold text-white">~{estimate.days} jours ouvrés</span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Accompagnement 1:1
                </span>
              </div>

              {/* Inclusions */}
              <div className="space-y-2.5 mb-7 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Code source complet & droits 100% vôtres</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Déploiement en ligne & certificat SSL sécurisé</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Garantie 30 jours de support et ajustements offerts</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={generateWhatsAppMessage}
                  className="btn-shine-effect w-full flex items-center justify-center gap-2.5 py-4 px-5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Envoyer cette estimation sur WhatsApp</span>
                </button>

                <a
                  href="#contact"
                  className="w-full block text-center py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold border border-white/10 transition-colors"
                >
                  Remplir le formulaire de contact standard →
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
