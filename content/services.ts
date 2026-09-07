/* =============================================================
   PROUX — Les 3 pôles et leurs sous-prestations.
   Voir claude.md §3. Utilisé par le méga-menu et (plus tard) les
   pages /toiture, /nettoyage, /peinture.

   `confirmed: false` = prestation non validée par le client
   (cf. claude.md §3, §13) : à afficher avec prudence, ne pas
   publier tant qu'elle n'est pas confirmée.
   ============================================================= */

export type SubService = {
  label: string;
  slug: string;
  confirmed?: boolean;
};

export type Pole = {
  key: "toiture" | "nettoyage" | "peinture";
  label: string;
  /** titre affiché sur la carte de la home (défaut : `label`) */
  homeTitle?: string;
  /** sur-titre court affiché au-dessus du titre dans le méga-menu */
  kicker: string;
  href: string;
  tagline: string;
  /** vignette carrée/portrait — méga-menu & menu mobile */
  image: string;
  /** image paysage 16:10 — section « Nos prestations » de la home */
  wideImage: string;
  imageAlt: string;
  /** 2 points de réassurance courts, affichés dans le méga-menu */
  highlights: string[];
  subs: SubService[];
};

export const poles: Pole[] = [
  {
    key: "toiture",
    label: "Toiture",
    homeTitle: "Nettoyage toiture",
    kicker: "Couverture & étanchéité",
    href: "/toiture",
    tagline: "Démoussage, hydrofuge et réparations de couverture.",
    image: "/img/nav/toiture.jpg",
    wideImage: "/img/services/toiture.jpg",
    imageAlt: "Toiture en tuile après démoussage par PROUX",
    highlights: [
      "Produits anti-mousse respectueux des tuiles",
      "Traitement hydrofuge de protection longue durée",
    ],
    subs: [
      { label: "Démoussage de toiture", slug: "demoussage" },
      { label: "Traitement hydrofuge", slug: "hydrofuge" },
      { label: "Nettoyage basse & haute pression", slug: "nettoyage" },
      { label: "Réfection de faîtage", slug: "faitage" },
      { label: "Remplacement de tuiles", slug: "tuiles" },
      { label: "Solins & abergements", slug: "solins" },
      { label: "Réparation de souche de cheminée", slug: "cheminee" },
      { label: "Nettoyage de gouttières", slug: "gouttieres" },
    ],
  },
  {
    key: "nettoyage",
    label: "Nettoyage",
    kicker: "Façades & extérieurs",
    href: "/nettoyage",
    tagline: "Façades, terrasses, dallages et murets remis à neuf.",
    image: "/img/nav/nettoyage.jpg",
    wideImage: "/img/services/nettoyage.jpg",
    imageAlt: "Terrasse en dallage nettoyée par PROUX",
    highlights: [
      "Pression adaptée à chaque support",
      "Anti-mousse et traitement des taches vertes",
    ],
    subs: [
      { label: "Nettoyage de façade", slug: "facade" },
      { label: "Nettoyage de terrasse & dallage", slug: "terrasse" },
      { label: "Traitement hydrofuge de sol", slug: "hydrofuge-sol" },
      { label: "Murets, clôtures & escaliers", slug: "murets" },
      { label: "Terrasse bois & saturateur", slug: "terrasse-bois" },
      { label: "Cour, allée & parking", slug: "cour-allee" },
      { label: "Abords de piscine", slug: "piscine", confirmed: false },
    ],
  },
  {
    key: "peinture",
    label: "Peinture",
    kicker: "Peinture extérieure",
    href: "/peinture",
    tagline: "Peinture extérieure : façade, sous-face, boiseries.",
    image: "/img/nav/peinture.jpg",
    wideImage: "/img/services/peinture.jpg",
    imageAlt: "Façade repeinte par PROUX",
    highlights: [
      "Préparation des supports avant mise en peinture",
      "Produits façade et bois adaptés à l'extérieur",
    ],
    subs: [
      { label: "Peinture de façade", slug: "facade" },
      { label: "Sous-face de toit & rives", slug: "sous-face" },
      { label: "Boiseries extérieures", slug: "boiseries" },
      { label: "Souche de cheminée & maçonnerie", slug: "cheminee" },
      { label: "Lasure & saturateur bois", slug: "lasure" },
      { label: "Portail & ferronnerie", slug: "ferronnerie", confirmed: false },
    ],
  },
];

/* Panneau vedette du méga-menu Prestations — un chantier mis en avant.
   TODO(client) : remplacer par un vrai chantier daté et localisé. */
export const megaFeature = {
  image: "/img/nav/vedette.jpg",
  imageAlt:
    "Nettoyeur haute pression sur une toiture en tuile, vue sur les montagnes",
  kicker: "Chantier récent",
  title: "Démoussage complet d'une toiture tuile",
  location: "Pays de Gex",
  href: "/realisations",
  cta: "Voir toutes nos réalisations",
};

/* Zone d'intervention — aperçu pour le méga-menu.
   TODO(client) : liste réelle des communes prioritaires (claude.md §13).
   Placeholders réalistes (communes du Pays de Gex / Ain frontalier). */
export type AreaGroup = { title: string; communes: string[] };

export const areaPreview: AreaGroup[] = [
  {
    title: "Pays de Gex",
    communes: [
      "Gex",
      "Ferney-Voltaire",
      "Saint-Genis-Pouilly",
      "Prévessin-Moëns",
      "Divonne-les-Bains",
      "Ornex",
    ],
  },
  {
    title: "Bassin bellegardien",
    communes: [
      "Bellegarde-sur-Valserine",
      "Valserhône",
      "Châtillon-en-Michaille",
      "Injoux-Génissiat",
    ],
  },
  {
    title: "Côtière & Bugey",
    communes: ["Nantua", "Oyonnax", "Montréal-la-Cluse", "Bourg-en-Bresse"],
  },
];
