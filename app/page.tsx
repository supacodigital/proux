import { Hero } from "@/components/blocks/Hero";
import { ServicePillars } from "@/components/blocks/ServicePillars";
import { Section } from "@/components/layout/Section";

/**
 * Accueil — sections en cours d'assemblage (cf. claude.md §7.1) :
 * Hero ✓ (+ TrustBar en bandeau au bas du hero) · 3 pôles ✓ · Avant/Après ·
 * Méthode · Chiffres · Réalisations · Avis · Zone · FAQ · CtaBanner.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Section aria-labelledby="pillars-title">
        <ServicePillars />
      </Section>
    </>
  );
}
