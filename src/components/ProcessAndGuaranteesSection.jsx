import React from 'react';
import { 
  ShieldCheck,
  Zap, 
  Workflow, 
  Clock, 
  Lock, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Headphones, 
  Code2, 
  Layers
} from 'lucide-react';

export const ProcessAndGuaranteesSection = () => {
  const steps = [
    {
      num: "01",
      title: "Cadrage & Maquette Interactive (48h)",
      desc: "Nous définissons ensemble vos besoins exacts, l'arborescence et l'ergonomie. Vous visualisez la maquette avant la moindre ligne de code.",
      badge: "Zéro surprise"
    },
    {
      num: "02",
      title: "Développement & Code Propre",
      desc: "Développement moderne (React, Next.js, Tailwind, Node.js) avec architecture modulaire, responsive mobile et score vitesse 98+ Lighthouse.",
      badge: "Haute performance"
    },
    {
      num: "03",
      title: "Tests en Direct & Retouches",
      desc: "Vous recevez un lien privé de test pour essayer vous-même votre site/application en conditions réelles et demander des ajustements.",
      badge: "Validation 100%"
    },
    {
      num: "04",
      title: "Mise en Ligne & Support 30 Jours",
      desc: "Déploiement sécurisé sur votre nom de domaine avec certificat SSL. Accompagnement et support technique offert pendant 30 jours.",
      badge: "Sérénité totale"
    }
  ];

  const guarantees = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: "Paiement Sécurisé par Jalons",
      desc: "Acompte initial de 30% au démarrage, solde uniquement après livraison et validation complète de votre part."
    },
    {
      icon: <Lock className="w-6 h-6 text-cyan-400" />,
      title: "100% Propriétaire de Votre Code",
      desc: "L'intégralité du code source, des accès serveurs et des droits de propriété intellectuelle vous appartient."
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: "Vitesse 98+ Google Lighthouse",
      desc: "Sites ultra-légers et optimisés pour le référencement naturel (SEO) et un taux de conversion maximal."
    },
    {
      icon: <Headphones className="w-6 h-6 text-indigo-400" />,
      title: "Disponibilité & Support Dédié 1:1",
      desc: "Un interlocuteur unique et réactif directement sur WhatsApp pour répondre à vos questions en moins de 2 heures."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#040711]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Transparence & Charte d'Engagement</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Mon Processus & Mes Garanties
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Zéro fausse promesse. Voici exactement comment se déroule notre collaboration pour garantir le succès de votre projet.
          </p>
        </div>

        {/* 4-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="model-card p-6 sm:p-7 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 relative group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-mono text-emerald-400/80 group-hover:text-emerald-300 transition-colors">
                    {s.num}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                    {s.badge}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base leading-snug group-hover:text-emerald-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>
              <div className="h-1 w-12 rounded-full bg-emerald-500/30 group-hover:w-full group-hover:bg-emerald-400 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* 4 Solid Guarantees */}
        <div className="model-card p-8 sm:p-12 rounded-3xl border border-emerald-500/30 relative overflow-hidden bg-gradient-to-br from-[#0a1124] to-[#040711]">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              ✦ SÉCURITÉ & TRANQUILLITÉ D'ESPRIT
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Pourquoi Travailler Avec Moi en Toute Confiance ?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((g, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  {g.icon}
                </div>
                <h4 className="font-bold text-white text-sm">{g.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
