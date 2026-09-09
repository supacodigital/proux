/* =============================================================
   Helpers de données structurées (JSON-LD). Voir claude.md §10.
   Sérialisés par <JsonLd> — ne passer que du contenu maîtrisé
   (fichiers content/*.ts).
   ============================================================= */

import { company } from "@/content/company";
import { testimonials } from "@/content/testimonials";

const BASE = company.siteUrl.replace(/\/$/, "");

/**
 * Fiche établissement — injectée une seule fois dans le layout (§10).
 * `HomeAndConstructionBusiness` : NAP, zone desservie, note agrégée.
 * Aucune donnée inventée : l'adresse reste partielle tant que le client
 * ne l'a pas fournie, la note vient des avis réels (content/testimonials.ts).
 */
export function localBusinessSchema(): Record<string, unknown> {
  const phone = company.phone.href.replace("tel:", "");

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${BASE}/#business`,
    name: company.name,
    legalName: company.legalName,
    description: company.tagline,
    url: BASE,
    image: `${BASE}/opengraph-image.png`,
    logo: `${BASE}/opengraph-image.png`,
    telephone: phone,
    email: company.email.href.replace("mailto:", ""),
    priceRange: "€€",
    // TODO(client) : compléter avec la rue et le code postal exacts.
    address: {
      "@type": "PostalAddress",
      addressLocality: company.address.locality,
      addressRegion: company.address.region,
      addressCountry: company.address.country,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Ain" },
      { "@type": "AdministrativeArea", name: "Pays de Gex" },
      ...company.mainCities.slice(0, 8).map((name) => ({
        "@type": "City",
        name,
      })),
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: company.reviews.rating,
      reviewCount: company.reviews.count ?? company.reviews.minCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: testimonials.slice(0, 4).map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
      },
      reviewBody: t.text,
    })),
    ...(company.links.googleBusiness
      ? { sameAs: [company.links.googleBusiness] }
      : {}),
  };
}

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
