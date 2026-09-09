import type { MetadataRoute } from "next";
import { company } from "@/content/company";

const BASE = company.siteUrl.replace(/\/$/, "");

/**
 * Sitemap — uniquement les routes réellement construites (§10).
 * TODO : ajouter /realisations, /zone-intervention et les pages communes
 * quand elles seront créées (brief §7.3 & §7.4).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/toiture", priority: 0.8, changeFrequency: "monthly" },
    { path: "/couverture", priority: 0.8, changeFrequency: "monthly" },
    { path: "/nettoyage", priority: 0.8, changeFrequency: "monthly" },
    { path: "/peinture", priority: 0.8, changeFrequency: "monthly" },
    { path: "/a-propos", priority: 0.5, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/mentions-legales", priority: 0.2, changeFrequency: "yearly" },
    {
      path: "/politique-confidentialite",
      priority: 0.2,
      changeFrequency: "yearly",
    },
  ];

  return entries.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
