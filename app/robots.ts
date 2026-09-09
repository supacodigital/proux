import type { MetadataRoute } from "next";
import { company } from "@/content/company";

const BASE = company.siteUrl.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
