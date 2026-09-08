/* =============================================================
   Helpers de données structurées (JSON-LD). Voir claude.md §10.
   Sérialisés par <JsonLd> — ne passer que du contenu maîtrisé
   (fichiers content/*.ts).
   ============================================================= */

import { company } from "@/content/company";

const BASE = company.siteUrl.replace(/\/$/, "");

/** Fil d'Ariane — pages profondes (§10). */
export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: `${BASE}${step.path}`,
    })),
  };
}

/** Service rendu par PROUX — pages pôle (§10). */
export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url: `${BASE}${path}`,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Ain et Pays de Gex",
    },
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: company.name,
      telephone: company.phone.href.replace("tel:", ""),
      url: BASE,
    },
  };
}
