import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { LegalDoc } from "@/components/blocks/LegalDoc";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/components/seo/schema";
import { mentionsLegales } from "@/content/legal";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site PROUX : éditeur, hébergeur, assurance, propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
  openGraph: {
    title: "Mentions légales — PROUX",
    description: "Informations légales relatives au site et à l’entreprise PROUX.",
    url: "/mentions-legales",
  },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Mentions légales", path: "/mentions-legales" },
        ])}
      />
      <Section aria-labelledby="legal-title">
        <LegalDoc doc={mentionsLegales} titleId="legal-title" />
      </Section>
    </>
  );
}
