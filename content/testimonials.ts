/* =============================================================
   PROUX — Avis clients (home, claude.md §7.1 point 9).

   ⚠️ claude.md §11 : uniquement des avis RÉELS, source vérifiable.
   Ceux-ci sont copiés depuis la fiche Google Business de PROUX
   (relevé le 2026-09-07). Tous notés 5/5.

   TODO(client) :
   - fournir l'URL exacte de la fiche Google (company.links.googleBusiness)
     pour le bouton « Voir tous les avis » ;
   - confirmer qu'on a l'autorisation d'afficher ces avis sur le site
     (les avis Google sont publics, mais le client valide l'usage).
   ============================================================= */

export type Testimonial = {
  author: string;
  /** date relative telle qu'affichée par Google */
  when: string;
  /** mois de visite indiqué par Google */
  visited: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** avis marqué « Nouveau » par Google */
  isNew?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    author: "Cécile Richard",
    when: "il y a 2 jours",
    visited: "Visité en septembre",
    rating: 5,
    isNew: true,
    text: "Très bonne expérience ! Ponctuel, sympathique et efficace. Travail soigné et professionnel, avec en plus de très bons conseils.",
  },
  {
    author: "Lendon Renard",
    when: "il y a 4 mois",
    visited: "Visité en avril",
    rating: 5,
    text: "Très sérieux et professionnel. Le travail a été réalisé correctement, avec soin et dans les délais annoncés. Je suis très satisfait du résultat final. Bonne communication tout au long du chantier, je recommande sans hésiter.",
  },
  {
    author: "Daniel Durand",
    when: "il y a un an",
    visited: "Visité en juin 2025",
    rating: 5,
    text: "J’ai fait confiance à Monsieur Proux et je ne suis pas déçu, je conseille vivement cette entreprise.",
  },
  {
    author: "Lucie Lagrené",
    when: "il y a 4 mois",
    visited: "Visité en avril",
    rating: 5,
    text: "Je recommande à 100 % Monsieur Proux pour son savoir-faire et son sérieux. Le travail est fait à la perfection, je n’hésiterai pas à le rappeler si besoin.",
  },
  {
    author: "Bruno Leducq",
    when: "il y a 2 jours",
    visited: "Visité en septembre",
    rating: 5,
    isNew: true,
    text: "Très bon travail. Artisan compétent à l’écoute du client. À recommander.",
  },
  {
    author: "Kysler Metayer",
    when: "il y a 5 mois",
    visited: "Visité en mars",
    rating: 5,
    text: "Respect des délais, travail propre, je recommande fortement.",
  },
  {
    author: "Layqui Vis",
    when: "il y a 4 mois",
    visited: "Visité en avril",
    rating: 5,
    text: "Nous avons fait appel à ce professionnel, nous sommes très satisfaits : efficace, agréable et rapide, il nous a fait un excellent travail. Je recommande fortement.",
  },
  {
    author: "Dorsaf Mahmoud",
    when: "il y a un an",
    visited: "Visité en mai 2025",
    rating: 5,
    text: "Entreprise sérieuse et minutieuse, que je rappellerai par la suite. Je recommande à 100 %, merci pour votre travail.",
  },
  {
    author: "LEPIN Loïc",
    when: "il y a un an",
    visited: "Visité en août 2025",
    rating: 5,
    text: "Intervention rapide. Travail propre et impeccable.",
  },
  {
    author: "Eric Watine",
    when: "il y a un jour",
    visited: "Visité en septembre",
    rating: 5,
    isNew: true,
    text: "Réactif et travail sérieux.",
  },
  {
    author: "Wilson Trost",
    when: "il y a 4 mois",
    visited: "Visité en avril",
    rating: 5,
    text: "Je vous conseille cette entreprise : travail propre et soigné.",
  },
  {
    author: "Teggy Allais",
    when: "il y a 4 mois",
    visited: "Visité en avril",
    rating: 5,
    text: "Très professionnel, efficace, je recommande cette entreprise.",
  },
  {
    author: "Breseis Henin",
    when: "il y a un an",
    visited: "Visité en mai 2025",
    rating: 5,
    text: "Très professionnel, très efficace et très sympa, je recommande.",
  },
];
