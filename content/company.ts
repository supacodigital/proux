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

  // Accroche du hero (sous le logo). Confirmé par le client le 2026-09-09.
  heroPitch: "Entreprise familiale, de père en fils depuis plus de 20 ans.",

  // — Contact —
  phone: {
    // Numéro fourni par le client le 2026-09-07.
    display: "07 61 44 99 40",
    href: "tel:+33761449940",
    confirmed: true,
  },
  email: {
    // Adresse de réception des demandes (fournie par le client le 2026-09-09).
    // Sert aussi de destinataire Resend (QUOTE_TO_EMAIL). L'adresse d'envoi
    // reste devis@proux-couverture.fr. TODO(client) : créer une boîte
    // contact@proux-couverture.fr si le client veut une adresse au domaine.
    display: "mproux.service@gmail.com",
    href: "mailto:mproux.service@gmail.com",
    confirmed: true,
  },
  whatsapp: {
    // Mobile fourni par le client le 2026-09-07 (format E.164).
    number: "33761449940",
    href: "https://wa.me/33761449940",
    // Message pré-rempli côté client
    message: "Bonjour, je souhaite un devis gratuit pour…",
    confirmed: true,
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
  // Communes principales — source unique pour le JSON-LD `areaServed` et le
  // compteur « villes desservies » de la home. TODO(client) : liste réelle
  // des communes prioritaires (claude.md §13) + créer les pages dédiées.
  mainCities: [
    "Gex",
    "Ferney-Voltaire",
    "Saint-Genis-Pouilly",
    "Prévessin-Moëns",
    "Divonne-les-Bains",
    "Ornex",
    "Bellegarde-sur-Valserine",
    "Valserhône",
    "Châtillon-en-Michaille",
    "Nantua",
    "Oyonnax",
    "Montréal-la-Cluse",
    "Bourg-en-Bresse",
    "Injoux-Génissiat",
  ] as string[],

  // — Réassurance (n’afficher que ce qui est vrai) —
  trust: {
    // Existence confirmée par le client le 2026-09-08.
    // TODO(client) : compagnie + n° de contrat décennale (pour l'afficher en toutes lettres)
    decennale: { label: "Assurance décennale", confirmed: true },
    freeQuote: { label: "Devis gratuit", confirmed: true },
    experience: { label: "Artisan local", confirmed: true },
  },

  // Chiffres-clés (section « Chiffres » de la home).
  // Ancienneté et nombre de chantiers confirmés par le client le 2026-09-09.
  // La note Google reste `pending` tant que le nombre exact d'avis n'est
  // pas communiqué (voir `reviews`).
  stats: {
    yearsExperience: 20,
    /** arrondi communicable — « + de 500 chantiers » */
    projectsCount: 500,
  },

  // Avis Google (voir content/testimonials.ts pour le détail des avis).
  // Note relevée sur la fiche Google le 2026-09-08 : 5/5 (tous les avis sont 5★).
  // TODO(client) : nombre d'avis exact affiché sur la fiche + URL de la fiche.
  reviews: {
    rating: 5,
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
  // Domaine acheté pour le projet le 2026-09-08.
  siteUrl: "https://www.proux-couverture.fr",
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
  // Ancres vers les sections correspondantes de la home.
  { kind: "link", label: "Méthode", href: "/#methode" },
  { kind: "link", label: "FAQ", href: "/#faq" },
  { kind: "link", label: "Notre histoire", href: "/a-propos" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Prestations",
    links: [
      { label: "Démoussage de toiture", href: "/toiture#demoussage" },
      { label: "Traitement hydrofuge", href: "/toiture#hydrofuge" },
      { label: "Réfection de faîtage", href: "/couverture#faitage" },
      { label: "Solins & souche de cheminée", href: "/couverture#solins" },
      { label: "Nettoyage de façade", href: "/nettoyage#facade" },
      { label: "Nettoyage de terrasse & dallage", href: "/nettoyage#terrasse" },
      { label: "Peinture extérieure", href: "/peinture" },
    ],
  },
  {
    title: "L’entreprise",
    links: [
      { label: "Notre histoire", href: "/a-propos" },
      { label: "Notre méthode", href: "/#methode" },
      { label: "Questions fréquentes", href: "/#faq" },
      { label: "Demander un devis", href: "/contact" },
    ],
  },
];
// TODO : rétablir une colonne « Zone d’intervention » quand les pages
// /zone-intervention + /zone-intervention/[commune] seront construites (brief §7.4).

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
  // Existence confirmée par le client le 2026-09-08 (n° de contrat : TODO).
  { label: "Assurance décennale", icon: "shield" },
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
