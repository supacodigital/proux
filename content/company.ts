/* =============================================================
   PROUX — Source unique de vérité (coordonnées, offre, liens).
   Voir claude.md §2 & §13.

   ⚠️  Tout champ marqué TODO n'est PAS confirmé par le client.
       Ne jamais publier ces valeurs telles quelles en production.
       Ne jamais inventer de donnée à la place (faux n°, fausse
       adresse, faux label, faux avis).
   ============================================================= */

export type NavLink = { label: string; href: string };

/** Item de nav : lien simple, ou déclencheur du méga-menu Prestations. */
export type NavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "mega"; label: string; href: string; panel: "prestations" };

export const company = {
  name: "PROUX",
  // TODO(client) : raison sociale exacte + statut juridique (EI / SARL / auto-entrepreneur)
  legalName: "PROUX",
  baseline: "Peinture · Nettoyage · Toiture",

  // Promesse courte, utilisée en meta description et sous-titres
  tagline:
    "Nettoyage de toiture, façades et peinture extérieure dans l’Ain et le Pays de Gex.",

  // Accroche du hero (sous le logo).
  // TODO(client) : confirmer « entreprise familiale / de père en fils » +
  // le nombre d'années d'ancienneté (20 = valeur provisoire à valider).
  heroPitch: "Entreprise familiale, de père en fils depuis plus de 20 ans.",

  // — Contact —
  phone: {
    // TODO(client) : numéro à reconfirmer avant mise en ligne (cf. claude.md §2)
    display: "04 82 29 73 21",
    href: "tel:+33482297321",
    confirmed: false,
  },
  email: {
    // TODO(client) : adresse e-mail réelle
    display: "contact@proux.fr",
    href: "mailto:contact@proux.fr",
    confirmed: false,
  },
  whatsapp: {
    // TODO(client) : numéro de mobile WhatsApp réel (le fixe 04… ne marche pas
    // sur WhatsApp). En attendant : même numéro que le téléphone, format E.164.
    number: "33482297321",
    href: "https://wa.me/33482297321",
    // Message pré-rempli côté client
    message: "Bonjour, je souhaite un devis gratuit pour…",
    confirmed: false,
  },
  address: {
    // TODO(client) : adresse complète (SEO local + Google Business + mentions légales)
    locality: "Pays de Gex",
    region: "Ain",
    postalCode: "01",
    country: "FR",
    confirmed: false,
  },

  // — Zone d’intervention (résumé affichable) —
  area: "Pays de Gex",
  areaLong:
    "Département de l’Ain et bassin franco-genevois : Pays de Gex, Bellegarde, Saint-Genis-Pouilly et alentours.",

  // — Réassurance (n’afficher que ce qui est vrai) —
  trust: {
    // TODO(client) : compagnie + n° de contrat décennale
    decennale: { label: "Assurance décennale", confirmed: false },
    freeQuote: { label: "Devis gratuit", confirmed: true },
    // TODO(client) : nombre de chantiers / années d’expérience communicables
    experience: { label: "Artisan local", confirmed: true },
  },

  // Chiffres-clés (section « Chiffres » de la home). Confirmés avec le client
  // le 2026-09-07, sauf la note Google (voir `reviews`).
  stats: {
    yearsExperience: 20,
    /** arrondi communicable — « + de 500 chantiers » */
    projectsCount: 500,
  },

  // Avis Google (voir content/testimonials.ts pour le détail des avis).
  // TODO(client) : nombre d'avis exact affiché sur la fiche + URL de la fiche.
  reviews: {
    rating: 4.9,
    /** au moins ce nombre d'avis 5★ collectés (2026-09-07) — mettre le total réel */
    count: null as number | null,
    minCount: 15,
    confirmed: false,
  },

  // — Liens externes —
  links: {
    // TODO(client) : remplacer par l'URL courte et stable de la fiche Google
    // (type https://g.page/... ou .../maps/place/...). Le lien ci-dessous est
    // une page de résultats de recherche « Proux … Avis » — fonctionnelle mais
    // moins pérenne.
    googleBusiness:
      "https://www.google.com/search?q=Proux+nettoyage+r%C3%A9novation+Avis&hl=fr-FR",
    googleReviewsConfirmed: false,
    facebook: null as string | null,
    instagram: null as string | null,
  },

  // — Domaine —
  // TODO(client) : domaine cible définitif (cf. claude.md §13)
  siteUrl: "https://www.proux.fr",
  legacyUrl: "https://www.nettoyage-toiture-01.fr",
} as const;

/* Navigation principale — les pages cibles seront créées plus tard.
   Header (méga-menu) + MobileMenu + Footer s’appuient dessus. */
export const primaryNav: NavItem[] = [
  {
    kind: "mega",
    label: "Prestations",
    href: "/toiture",
    panel: "prestations",
  },
  { kind: "link", label: "Réalisations", href: "/realisations" },
  { kind: "link", label: "À propos", href: "/a-propos" },
];

/* Version à plat, pour le menu mobile (accordéons gérés côté composant). */
export const mobileNav: NavLink[] = [
  { label: "Toiture", href: "/toiture" },
  { label: "Nettoyage", href: "/nettoyage" },
  { label: "Peinture", href: "/peinture" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Zone d’intervention", href: "/zone-intervention" },
  { label: "À propos", href: "/a-propos" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Prestations",
    links: [
      { label: "Démoussage de toiture", href: "/toiture#demoussage" },
      { label: "Traitement hydrofuge", href: "/toiture#hydrofuge" },
      { label: "Nettoyage de façade", href: "/nettoyage#facade" },
      { label: "Nettoyage de terrasse & dallage", href: "/nettoyage#terrasse" },
      { label: "Peinture extérieure", href: "/peinture" },
    ],
  },
  {
    title: "L’entreprise",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Nos réalisations", href: "/realisations" },
      { label: "Zone d’intervention", href: "/zone-intervention" },
      { label: "Demander un devis", href: "/contact" },
    ],
  },
  {
    title: "Zone d’intervention",
    links: [
      { label: "Gex", href: "/zone-intervention/gex" },
      { label: "Ferney-Voltaire", href: "/zone-intervention/ferney-voltaire" },
      {
        label: "Saint-Genis-Pouilly",
        href: "/zone-intervention/saint-genis-pouilly",
      },
      {
        label: "Divonne-les-Bains",
        href: "/zone-intervention/divonne-les-bains",
      },
      {
        label: "Bellegarde-sur-Valserine",
        href: "/zone-intervention/bellegarde-sur-valserine",
      },
      { label: "Toutes les communes", href: "/zone-intervention" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
];

export const CONTACT_HREF = "/contact";

/* Éléments de la TrustBar (juste après le hero).
   `pending: true` → placeholder visible, à remplacer par le client.
   `icon` référence une clé de components/blocks/TrustBar.tsx (TRUST_ICONS). */
export const trustBar: {
  label: string;
  icon: "shield" | "clock" | "map" | "home";
  pending?: boolean;
}[] = [
  { label: "Assurance décennale", icon: "shield", pending: true },
  { label: "Devis gratuit sous 48 h", icon: "clock" },
  { label: "Artisan local — Ain & Pays de Gex", icon: "map" },
  {
    label: company.stats.projectsCount
      ? `+ ${company.stats.projectsCount} chantiers réalisés`
      : "+ [X] chantiers réalisés",
    icon: "home",
    pending: !company.stats.projectsCount,
  },
];
