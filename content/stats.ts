/* =============================================================
   PROUX — Chiffres-clés (home, claude.md §7.1 point 7).

   ⚠️ claude.md §11 : aucun chiffre inventé. Les valeurs viennent de
   `company` (confirmées avec le client) ; `pending: true` = à
   remplacer / compléter avant mise en production.
   ============================================================= */

import { company } from "./company";
import { areaPreview } from "./services";

/** Nombre de villes listées dans la zone d'intervention (source vérifiable) */
const CITY_COUNT = areaPreview.reduce(
  (n, group) => n + group.communes.length,
  0,
);

export type Stat = {
  /** clé d'icône — voir STAT_ICONS dans StatsRow.tsx */
  icon: "history" | "home" | "map" | "star";
  /** valeur numérique cible du count-up */
  value: number;
  /** nombre de décimales à afficher (note : 1) */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** ligne de contexte sous le label */
  hint: string;
  /** placeholder / donnée incomplète à confirmer */
  pending?: boolean;
};

export const stats: Stat[] = [
  {
    icon: "history",
    value: company.stats.yearsExperience ?? 0,
    label: "ans d’expérience",
    hint: "Entreprise familiale, de père en fils",
  },
  {
    icon: "home",
    value: company.stats.projectsCount ?? 0,
    prefix: "+ ",
    label: "chantiers réalisés",
    hint: "Toitures, façades, terrasses & peinture",
  },
  {
    icon: "map",
    value: CITY_COUNT,
    label: "villes desservies",
    hint: "Ain (01) & Pays de Gex",
  },
  {
    icon: "star",
    value: company.reviews.rating,
    decimals: 0,
    suffix: " / 5",
    label: "note Google",
    hint: company.reviews.count
      ? `${company.reviews.count} avis vérifiés`
      : "Avis clients vérifiés",
    // TODO(client) : nombre d'avis + lien fiche Google
    pending: !company.reviews.confirmed,
  },
];
