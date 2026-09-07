/* =============================================================
   PROUX — « Notre méthode » (home, claude.md §7.1 point 6).
   4 étapes du parcours client. Ton : résultat + tranquillité,
   pas de jargon de process (claude.md §4.7).
   ============================================================= */

export type ProcessStep = {
  /** clé d'icône — voir PROCESS_ICONS dans ProcessSteps.tsx */
  icon: "search" | "brush" | "shield" | "check";
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    icon: "search",
    title: "Visite & devis gratuit",
    body: "On se déplace, on regarde l’état réel de votre toiture ou de vos façades, et vous recevez un devis clair sous 48 h.",
  },
  {
    icon: "brush",
    title: "Intervention soignée",
    body: "Démoussage, nettoyage ou peinture selon le chantier. Abords protégés, tri des déchets, on laisse la place nette.",
  },
  {
    icon: "shield",
    title: "Traitement de protection",
    body: "Application d’un anti-mousse et, si besoin, d’un hydrofuge : votre toit résiste à l’eau et à la reprise de mousse pour des années.",
  },
  {
    icon: "check",
    title: "Résultat garanti",
    body: "On fait le tour du chantier avec vous. Le travail est garanti, et on reste joignables après l’intervention.",
  },
];
