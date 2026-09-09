/* =============================================================
   PROUX — Chantiers (avant / après). Voir claude.md §6 & §9.

   Photos réelles issues des dossiers du client, recadrées au même
   format 3:2. Le composant <BeforeAfterSlider> attend deux images
   au cadrage identique.

   ⚠️ TODO(client) — cf. claude.md §9 & §11 :
   - autorisation d'usage des photos, chantiers à ne pas montrer ;
   - vérifier l'absence de plaque d'immatriculation lisible / visage
     de tiers / n° de rue identifiant un client (flouter au besoin) ;
   - localité exacte de chaque chantier (ici : secteur approximatif).
   ============================================================= */

export type ProjectPole =
  | "toiture"
  | "couverture"
  | "nettoyage"
  | "peinture";
// TODO(assets) : aucun chantier « couverture » (faîtage / solins / souche)
// n'est encore trié. La section « Avant / Après » de /couverture reste masquée
// tant qu'aucun projet n'a `pole: "couverture"` (cf. PoleWork).

export type Project = {
  slug: string;
  /** Titre court, orienté résultat */
  title: string;
  pole: ProjectPole;
  /** Secteur — pas d'adresse précise (RGPD / claude.md §9) */
  location: string;
  /** Type de support / couverture, pour la légende */
  detail: string;
  before: string;
  after: string;
  /** alt commun (le slider ajoute « — avant » / « — après ») */
  alt: string;
  /** true = mis en avant sur la home (section « Avant / Après vedette ») */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "demoussage-toiture-pays-de-gex",
    title: "Démoussage d'une grande toiture en tuile",
    pole: "toiture",
    location: "Pays de Gex",
    detail: "Tuile terre cuite ternie par la mousse — teinte ravivée",
    before: "/img/realisations/demoussage-toiture-pays-de-gex/avant.jpg",
    after: "/img/realisations/demoussage-toiture-pays-de-gex/apres.jpg",
    alt: "Toiture en tuile terre cuite d'une maison du Pays de Gex démoussée par PROUX",
    featured: true,
  },
  {
    slug: "demoussage-toiture-tuile",
    title: "Démoussage d'une toiture en tuile",
    pole: "toiture",
    location: "Pays de Gex",
    detail: "Tuile béton envahie de mousse et de lichen",
    before: "/img/realisations/demoussage-toiture-tuile/avant.jpg",
    after: "/img/realisations/demoussage-toiture-tuile/apres.jpg",
    alt: "Toiture en tuile béton démoussée par PROUX",
    featured: true,
  },
  {
    slug: "refection-toiture-ferme",
    title: "Nettoyage complet d'une toiture de ferme",
    pole: "toiture",
    location: "Pays de Gex",
    detail: "Grande toiture tuile — maison de caractère",
    before: "/img/realisations/refection-toiture-ferme/avant.jpg",
    after: "/img/realisations/refection-toiture-ferme/apres.jpg",
    alt: "Toiture d'une ferme savoyarde nettoyée par PROUX",
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
