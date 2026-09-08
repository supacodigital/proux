import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { LegalDoc } from "@/components/blocks/LegalDoc";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/components/seo/schema";
import { politiqueConfidentialite } from "@/content/legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment PROUX collecte et protège vos données lorsque vous demandez un devis : finalité, durée de conservation, vos droits (RGPD). Aucun cookie de suivi.",
  alternates: { canonical: "/politique-confidentialite" },
  openGraph: {
    title: "Politique de confidentialité — PROUX",
    description:
      "Traitement des données du formulaire de devis PROUX, durée de conservation et droits RGPD.",
    url: "/politique-confidentialite",
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Politique de confidentialité", path: "/politique-confidentialite" },
        ])}
      />
      <Section aria-labelledby="legal-title">
        <LegalDoc doc={politiqueConfidentialite} titleId="legal-title" />
      </Section>
    </>
  );
}
