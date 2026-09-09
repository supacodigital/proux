/* =============================================================
   PROUX — Contenu de la page « Notre histoire » (/a-propos, §7.5).

   Ton : du vrai, pas de storytelling gonflé (claude.md §4.7 & §7.5).
   ⚠️ claude.md §11 : aucune fausse donnée. Ce qui n'est pas confirmé
   par le client reste neutre + TODO.

   Confirmé avec le client :
   - prénom de l'artisan : Yohan ;
   - entreprise familiale, transmise de père en fils ;
   - plus de 20 ans d'activité (confirmé le 2026-09-09) ;
   - activité centrée sur le Pays de Gex ;
   - travaux couverts par une assurance décennale (compagnie + n° : TODO).

   TODO(client) :
   - nom de la compagnie d'assurance + n° de contrat décennale ;
   - adresse complète, SIRET (mentions légales) ;
   - éventuels labels / certifications réels (RGE, Qualibat, FFB/CAPEB…).
   ============================================================= */

export type AboutValue = {
  /** clé d'icône — voir VALUE_ICONS dans AboutValues.tsx */
  icon: "sparkles" | "broom" | "handshake" | "shield-check";
  title: string;
  body: string;
};

export type AboutCommitment = {
  /** clé d'icône — voir COMMITMENT_ICONS dans AboutCommitments.tsx */
  icon: "shield" | "clock" | "car" | "wrench";
  label: string;
  detail: string;
  /** placeholder / donnée à confirmer avant mise en production */
  pending?: boolean;
};

export const about = {
  kicker: "Notre histoire",
  title: "De père en fils, dans le Pays de Gex",
  lead: "PROUX, c’est une entreprise familiale. Yohan a appris le métier avec son père : le nettoyage de toiture, le traitement des façades, la peinture extérieure. Aujourd’hui, il fait le même travail, sur les mêmes maisons de l’Ain et de la frontière suisse.",

  /* Corps de l'histoire — 2 à 3 paragraphes courts. */
  story: [
    "Le métier n’a pas beaucoup changé depuis que le père de Yohan a commencé : on monte sur le toit, on regarde l’état réel des tuiles, on enlève la mousse à la main et à basse pression quand la couverture est fragile, on protège, et on laisse le chantier propre. Ce qui a changé, ce sont les produits — anti-mousse plus respectueux, hydrofuges plus durables — et le fait de tout expliquer au client avant de commencer.",
    "PROUX travaille surtout dans le Pays de Gex et le bassin franco-genevois : Gex, Ferney-Voltaire, Saint-Genis-Pouilly, Divonne, et les communes autour. Des maisons individuelles, souvent de type savoyard, avec des toitures en tuile terre cuite ou béton, exposées au gel l’hiver et à la mousse le reste de l’année.",
    "L’idée est simple : faire le travail comme on le ferait chez soi. Un devis clair, une intervention soignée, un résultat qu’on assume et qu’on garantit. Pas de démarchage agressif, pas de promesse qu’on ne tiendra pas.",
  ],

  /* Photo principale de la section histoire — artisan au travail. */
  storyImage: "/img/about/artisan.jpg",
  storyImageAlt:
    "Yohan, de PROUX, nettoyant une toiture en tuile au nettoyeur haute pression dans le Pays de Gex",

  /* Photo secondaire (bande large sous les valeurs). */
  wideImage: "/img/about/toiture-montagnes.jpg",
  wideImageAlt:
    "Toiture en tuile nettoyée par PROUX, avec vue sur les montagnes du Pays de Gex",

  values: [
    {
      icon: "sparkles",
      title: "Le travail soigné",
      body: "On adapte la méthode au support : brossage et basse pression sur une tuile ancienne, haute pression seulement là où elle ne fait pas de dégât. Le résultat compte, la façon de l’obtenir aussi.",
    },
    {
      icon: "broom",
      title: "Le chantier propre",
      body: "On protège les abords, la végétation et le mobilier avant de commencer. On récupère la mousse dans les gouttières, on trie les déchets, et on laisse la place nette en partant.",
    },
    {
      icon: "handshake",
      title: "Le conseil honnête",
      body: "Si une toiture n’a pas besoin d’hydrofuge, on le dit. Si une réparation dépasse notre métier, on oriente vers le bon artisan. On préfère un client qui revient à une vente forcée.",
    },
    {
      icon: "shield-check",
      title: "Le résultat garanti",
      body: "On fait le tour du chantier avec vous à la fin. Le travail est garanti, on reste joignables après l’intervention, et on revient si quelque chose ne va pas.",
    },
  ] satisfies AboutValue[],

  commitments: [
    {
      icon: "shield",
      label: "Assurance décennale",
      detail:
        "Nos travaux de couverture et de maçonnerie sont couverts par une assurance de responsabilité décennale.",
      // TODO(client) : compagnie + n° de contrat → compléter le detail avec
      // « … (Compagnie, contrat n° …) », comme demandé au §2 du brief.
    },
    {
      icon: "clock",
      label: "Devis sous 48 h",
      detail:
        "On se déplace, on évalue l’état réel de votre toiture ou de vos façades, et vous recevez un devis clair et détaillé sous 48 heures.",
    },
    {
      icon: "car",
      label: "Déplacement inclus",
      detail:
        "Le devis est gratuit et sans engagement, déplacement compris, dans toute la zone d’intervention.",
    },
    {
      icon: "wrench",
      label: "Matériel professionnel",
      detail:
        "Nettoyeurs à pression réglable, produits anti-mousse et hydrofuges de qualité professionnelle, équipements de travail en hauteur aux normes.",
    },
  ] satisfies AboutCommitment[],
} as const;
