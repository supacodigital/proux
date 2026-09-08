import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { AboutStory } from "@/components/blocks/AboutStory";
import { AboutValues } from "@/components/blocks/AboutValues";
import { AboutCommitments } from "@/components/blocks/AboutCommitments";
import { StatsRow } from "@/components/blocks/StatsRow";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/components/seo/schema";

export const metadata: Metadata = {
  title: "Notre histoire",
  description:
    "PROUX, entreprise familiale de père en fils : nettoyage de toiture, façades et peinture extérieure dans le Pays de Gex et l’Ain. Travail soigné, chantier propre, conseil honnête.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: "Notre histoire — PROUX",
    description:
      "Entreprise familiale de père en fils, PROUX entretient et protège l’extérieur des maisons du Pays de Gex.",
    url: "/a-propos",
  },
};

/**
 * Page « Notre histoire » (/a-propos, §7.5).
 * Histoire courte → valeurs + bande photo → engagements → chiffres → CTA.
 */
export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Notre histoire", path: "/a-propos" },
        ])}
      />

      <Section aria-labelledby="about-title">
        <AboutStory />
      </Section>

      <Section tone="surface" aria-labelledby="about-values-title">
        <AboutValues />
      </Section>

      <Section aria-labelledby="about-commitments-title">
        <AboutCommitments />
      </Section>

      <Section tone="surface" aria-labelledby="stats-title">
        <StatsRow />
      </Section>

      <Section aria-labelledby="cta-title">
        <CtaBanner />
      </Section>
    </>
  );
}
