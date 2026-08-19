export const initialProfile = {
  name: "Ahmed Boutaba",
  title: "Développeur Web Full-Stack & Concepteur SaaS",
  tagline: "Je conçois et développe des Applications Web sur-mesure, des plateformes SaaS et des sites e-commerce haute conversion.",
  bio: "Passionné par l'architecture logicielle moderne et les interfaces utilisateur soignées, je transforme vos besoins métiers en produits digitaux performants. De la conception UI/UX à l'architecture backend et la mise en production, j'assure un développement propre, réactif et sans compromis.",
  status: "Disponible pour nouveaux projets",
  statusColor: "emerald",
  email: "ahmedboutaba7171@gmail.com",
  phone: "+216 22 456 563",
  whatsapp: "+216 22 456 563",
  location: "Maroc • Disponible en télétravail international",
  github: "https://github.com/AhmedBoutaba",
  linkedin: "https://linkedin.com/in/ahmed-boutaba",
  commitments: [
    {
      title: "100% Sur-Mesure",
      desc: "Chaque projet est développé selon vos objectifs réels et l'expérience de vos utilisateurs.",
      icon: "Sparkles"
    },
    {
      title: "Architecture Scalable & Propre",
      desc: "Code moderne, maintenable, documenté et pensé pour évoluer sans refonte lourde.",
      icon: "Code2"
    },
    {
      title: "Performance & Vitesse 98+",
      desc: "Temps de chargement ultra-rapides, design responsive irréprochable et SEO soigné.",
      icon: "Zap"
    },
    {
      title: "Suivi & Accompagnement Dédié",
      desc: "Communication claire, points d'avancement réguliers et assistance garantie après livraison.",
      icon: "ShieldCheck"
    }
  ]
};

export const initialProjects = [
  {
    id: "clinique-dentaire-al-ibtisama",
    title: "Plateforme Médicale & Réservation — Clinique Dentaire Al Ibtisama",
    category: "SaaS & Applications Web",
    subtitle: "Système complet de prise de rendez-vous en 3 étapes, catalogue des soins & gestion des patients.",
    client: "Clinique Dentaire Al Ibtisama",
    year: "2024",
    status: "published",
    featured: true,
    coverImage: "/projects/smile-clinic/hero-overview.png",
    demoUrl: "#",
    githubUrl: "",
    images: [
      {
        url: "/projects/smile-clinic/hero-overview.png",
        title: "Page d'Accueil & Présentation",
        caption: "Interface d'accueil moderne avec mise en avant des disponibilités, des médecins et appel à l'action immédiat."
      },
      {
        url: "/projects/smile-clinic/services-pricing.png",
        title: "Catalogue des Soins & Tarifs",
        caption: "Grille claire et transparente des soins dentaires avec affichage des prix en dirhams et des durées estimées."
      },
      {
        url: "/projects/smile-clinic/doctors-team.png",
        title: "Équipe Médicale & Spécialités",
        caption: "Présentation des chirurgiens-dentistes, années d'expérience et spécialisations pour instaurer une confiance maximale."
      },
      {
        url: "/projects/smile-clinic/booking-wizard.png",
        title: "Tunnel de Réservation en 3 Étapes",
        caption: "Parcours patient intuitif (1. Choix du soin → 2. Sélection du médecin & créneau → 3. Informations personnelles)."
      },
      {
        url: "/projects/smile-clinic/appointment-management.png",
        title: "Espace Patient & Gestion des RDV",
        caption: "Tableau de bord patient permettant de consulter le numéro de réservation et d'annuler ou modifier le rendez-vous en 1 clic."
      }
    ],
    techStack: ["React", "Tailwind CSS", "Node.js", "REST API", "Support RTL/Arabe", "Design UI/UX"],
    problem: "Les cabinets médicaux et dentaires font face à des pertes de temps au standard téléphonique et à des rendez-vous non honorés, avec une gestion manuelle fastidieuse.",
    solution: "Conception d'une plateforme web moderne et responsive en arabe permettant aux patients de choisir leur soin, leur médecin et leur horaire en moins d'une minute, avec confirmation instantanée.",
    keyFeatures: [
      "Tunnel de réservation intelligent sans friction en 3 étapes",
      "Support complet de la langue arabe avec typographie et mise en page RTL soignée",
      "Affichage en temps réel des créneaux horaires disponibles par praticien",
      "Calcul automatique de la durée et du coût prévisionnel selon les actes choisis",
      "Espace patient pour le suivi et l'annulation simplifiée sans appel téléphonique",
      "Design rassurant, adapté au secteur de la santé et 100% responsive sur mobile"
    ]
  },
  {
    id: "purrluxe-cat-brush-store",
    title: "PurrLuxe™ — E-Commerce D2C & Landing Page Haute Conversion",
    category: "E-Commerce & Vente",
    subtitle: "Boutique en ligne haut de gamme pour produit D2C de soin animalier avec technologie brume vapeur.",
    client: "PurrLuxe Brand",
    year: "2024",
    status: "published",
    featured: true,
    coverImage: "/projects/purrluxe-store/products-catalog.png",
    demoUrl: "#",
    githubUrl: "",
    images: [
      {
        url: "/projects/purrluxe-store/products-catalog.png",
        title: "Catalogue Produits & Gamme Luxe",
        caption: "Cartes produits immersives avec badges Best-Seller / Innovation, tarification promotionnelle et ajout au panier direct."
      },
      {
        url: "/projects/purrluxe-store/technology-features.png",
        title: "Présentation de la Technologie PurrVapor™",
        caption: "Section explicative de réassurance technique (système breveté, anti-statique, moteur silencieux et recharge USB-C)."
      },
      {
        url: "/projects/purrluxe-store/benefits-cards.png",
        title: "Piliers de Bénéfices & Promesse Produit",
        caption: "Mise en avant des arguments clés : Brume Nano-Vapeur, Picots Silicone et Système d'Éjection Rapide des poils."
      },
      {
        url: "/projects/purrluxe-store/reviews-footer.png",
        title: "Témoignages Clients Vérifiés & Footer",
        caption: "Preuve sociale avec avis vérifiés 5 étoiles, photos de propriétaires d'animaux et engagements de garantie 30 jours."
      }
    ],
    techStack: ["HTML5", "CSS3 / Tailwind", "JavaScript ES6+", "UI/UX Luxe", "Optimisation Vitesse", "Tunnel de Vente"],
    problem: "Nécessité de transformer un produit physique innovant en une marque désirable, avec un storytelling captivant et un tunnel de commande ultra-rapide.",
    solution: "Création d'une landing page e-commerce sur-mesure aux codes graphiques luxueux (vert impérial, touches d'or et typographie serif prestigieuse), intégrant vidéos explicatives, avis clients et commande simplifiée.",
    keyFeatures: [
      "Design e-commerce premium axé sur le storytelling de marque et la valeur perçue",
      "Mise en valeur interactive des caractéristiques techniques (PurrVapor™, autonomie, ergonomie)",
      "Module de preuve sociale avec avis clients détaillés et photos",
      "Architecture optimisée pour un chargement instantané (< 0.8s) et un taux de conversion maximal",
      "Pied de page complet avec engagements qualité, FAQ et réassurance client"
    ]
  },
  {
    id: "trustwall-saas-reviews",
    title: "TrustWall — SaaS de Collecte & Intégration d'Avis Clients",
    category: "SaaS & Applications Web",
    subtitle: "Plateforme SaaS permettant aux entreprises de collecter, modérer et afficher des témoignages clients en direct.",
    client: "Startups & E-Commerçants",
    year: "2024",
    status: "published",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "#",
    githubUrl: "",
    images: [
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        title: "Tableau de Bord & Widgets d'Avis",
        caption: "Dashboard administrateur pour gérer les formulaires de collecte, valider les avis et générer le code d'intégration."
      }
    ],
    techStack: ["Next.js", "Tailwind CSS", "Prisma ORM", "PostgreSQL", "NextAuth", "API Embed"],
    problem: "Les créateurs de sites perdent des ventes par manque de preuve sociale authentique et peinent à intégrer des témoignages facilement.",
    solution: "Développement d'un SaaS B2B complet générant des widgets de témoignages ultra-légers à copier-coller sur n'importe quel site web.",
    keyFeatures: [
      "Formulaire public de soumission d'avis avec capture de photos et notes",
      "Générateur de widgets dynamiques personnalisables (couleurs, polices, dispositions)",
      "Tableau de bord de modération en temps réel avec filtres anti-spam",
      "Export des avis et intégration par script en une seule ligne de code"
    ]
  },
  {
    id: "immo-ai-platform",
    title: "Immo-AI — Application Intelligente d'Estimation & Gestion Immobilière",
    category: "SaaS & Applications Web",
    subtitle: "Plateforme web combinant estimation algorithmique des biens, recherche cartographique et gestion des mandats.",
    client: "Agences Immobilières & Investisseurs",
    year: "2024",
    status: "published",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
        title: "Simulateur d'Estimation Immobilière",
        caption: "Calculateur instantané du prix au m² et de rentabilité locative selon la typologie du bien."
      }
    ],
    techStack: ["JavaScript (ES6+)", "Tailwind CSS", "Leaflet Maps", "REST APIs", "Algorithmes de Calcul"],
    problem: "Les estimations immobilières traditionnelles sont lentes et opaques, rendant difficile la prise de décision rapide pour les acheteurs.",
    solution: "Application web réactive fournissant une estimation en moins de 30 secondes basée sur les données du marché local et des critères précis.",
    keyFeatures: [
      "Simulateur dynamique de rentabilité brute/nette et de mensualité de crédit",
      "Interface épurée et interactive adaptée aux particuliers et aux agents",
      "Génération automatique d'un rapport PDF récapitulatif pour le client"
    ]
  },
  {
    id: "cv-analyzer-ai-saas",
    title: "CV Analyzer AI — SaaS d'Analyse & Optimisation de Profils",
    category: "Outils Métier & Automatisation",
    subtitle: "Outil intelligent d'évaluation de CV, scoring ATS et recommandations personnalisées assistées par IA.",
    client: "Candidats & Recruteurs",
    year: "2024",
    status: "published",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
        title: "Rapport d'Analyse de CV",
        caption: "Affichage des points forts, mots-clés manquants et score de compatibilité avec les offres d'emploi."
      }
    ],
    techStack: ["React", "Tailwind CSS", "Node.js", "IA Parsing", "PDF Parser"],
    problem: "Plus de 75% des CV sont rejetés par les filtres ATS automatisés avant même d'être lus par un humain.",
    solution: "SaaS permettant de glisser-déposer un CV pour obtenir un diagnostic instantané et des axes d'amélioration concrets.",
    keyFeatures: [
      "Extraction automatique du texte et des compétences depuis PDF",
      "Analyse de conformité ATS et détection des lacunes",
      "Conseils de réécriture ciblés pour maximiser les entretiens"
    ]
  }
];

export const initialServices = [
  {
    id: "saas-webapps",
    title: "SaaS & Applications Web Sur-Mesure",
    category: "Développement Avancé",
    icon: "Layers",
    description: "Conception et développement de plateformes web complètes, de la base de données jusqu'à l'interface utilisateur finale.",
    deliverables: [
      "Architecture modulaire & scalable (React / Next.js / Node.js)",
      "Système d'authentification sécurisé & gestion des rôles",
      "Intégration d'APIs tierces & passerelles de paiement (Stripe)",
      "Tableaux de bord d'administration avec statistiques en direct"
    ],
    idealFor: "Startups, SaaS B2B/B2C, plateformes de réservation, outils internes métier."
  },
  {
    id: "ecommerce-boutiques",
    title: "E-Commerce & Boutiques Haute Performance",
    category: "Vente en Ligne & D2C",
    icon: "ShoppingCart",
    description: "Création de boutiques e-commerce rapides et modernes, optimisées pour convertir les visiteurs en acheteurs.",
    deliverables: [
      "Catalogue produits fluide avec recherche et filtres instantanés",
      "Tunnel de commande simplifié et paiement sécurisé",
      "Storytelling de marque et mise en valeur haut de gamme des produits",
      "Connexion aux services de livraison et notifications clients"
    ],
    idealFor: "Marques D2C, artisans, commerçants souhaitant digitaliser leurs ventes."
  },
  {
    id: "landing-vitrines",
    title: "Sites Vitrines & Landing Pages Haute Conversion",
    category: "Image de Marque & Leads",
    icon: "Layout",
    description: "Design percutant et développement sur-mesure pour présenter vos services et générer des demandes de devis qualifiées.",
    deliverables: [
      "Design premium sur-mesure (pas de templates génériques)",
      "Temps de chargement inférieur à 1 seconde & SEO optimisé",
      "Formulaires interactifs et boutons de contact direct WhatsApp",
      "Adaptation parfaite sur tous les smartphones, tablettes et ordinateurs"
    ],
    idealFor: "Cabinets médicaux, agences, consultants, artisans, PME."
  },
  {
    id: "refonte-optimisation",
    title: "Refonte, Modernisation & Optimisation",
    category: "Performance & Audit",
    icon: "Zap",
    description: "Transformation de votre site existant pour le rendre plus rapide, plus moderne et plus vendeur.",
    deliverables: [
      "Audit complet de performance, sécurité et UX",
      "Migration vers une stack moderne et réactive",
      "Correction des lenteurs et amélioration du score Google Lighthouse",
      "Ajout de nouvelles fonctionnalités métiers sans casser l'existant"
    ],
    idealFor: "Sites lents, interfaces datées, besoins d'évolution technique."
  }
];

export const initialSkills = [
  {
    category: "Frontend & UI/UX",
    skills: ["React.js", "Next.js", "Tailwind CSS", "JavaScript (ES6+)", "TypeScript", "HTML5 / CSS3", "Figma / UI Design", "Responsive & RTL (Arabe)"]
  },
  {
    category: "Backend & Bases de Données",
    skills: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "Prisma ORM", "Supabase", "REST APIs", "Authentification JWT / OAuth"]
  },
  {
    category: "Outils, DevOps & Intégrations",
    skills: ["Git / GitHub", "Stripe Checkout", "Intégrations IA (OpenAI)", "Vercel / Netlify", "Postman", "Optimisation SEO", "Sécurité Web"]
  }
];

export const initialTestimonials = [
  {
    id: 1,
    name: "Dr. Alami",
    role: "Chirurgien-Dentiste & Directeur de Clinique",
    content: "Ahmed a développé notre plateforme de réservation médicale avec un professionnalisme remarquable. Le système en 3 étapes a considérablement réduit les appels téléphoniques et nos patients adorent la simplicité du site.",
    rating: 5,
    tag: "Projet Médical"
  },
  {
    id: 2,
    name: "Karim M.",
    role: "Fondateur E-commerce D2C",
    content: "Excellente collaboration ! Ahmed comprend vite les enjeux business et propose des solutions techniques élégantes. Le site PurrLuxe est ultra-rapide et le tunnel d'achat a augmenté notre taux de conversion dès la première semaine.",
    rating: 5,
    tag: "E-Commerce"
  },
  {
    id: 3,
    name: "Yassine B.",
    role: "Créateur de Startup SaaS",
    content: "Le code est propre, bien structuré et facile à maintenir. Respect des délais, communication fluide sur WhatsApp et disponibilité exemplaire. Je recommande vivement pour tout projet web sérieux.",
    rating: 5,
    tag: "Développement SaaS"
  }
];