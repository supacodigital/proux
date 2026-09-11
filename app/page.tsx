import { Hero } from "@/components/blocks/Hero";
import { ServicePillars } from "@/components/blocks/ServicePillars";
import { FeaturedWork } from "@/components/blocks/FeaturedWork";
import { ProcessSteps } from "@/components/blocks/ProcessSteps";
import { StatsRow } from "@/components/blocks/StatsRow";
import { Testimonials } from "@/components/blocks/Testimonials";
import { FaqList } from "@/components/blocks/FaqList";
import { CoverageArea } from "@/components/blocks/CoverageArea";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { Section } from "@/components/layout/Section";

/**
 * Accueil — sections (cf. claude.md §7.1) :
 * Hero ✓ (+ TrustBar) · 3 pôles ✓ · Avant/Après ✓ · Méthode ✓ · FAQ ✓ ·
 * Chiffres ✓ · Avis ✓ · Zone d'intervention ✓ · CtaBanner ✓ (formulaire de devis).
 * Méthode et FAQ sont enchaînées (ancres #methode / #faq du header).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Section aria-labelledby="pillars-title">
        <ServicePillars />
      </Section>
      <Section tone="surface" aria-labelledby="featured-title">
        <FeaturedWork />
      </Section>
      <Section id="methode" aria-labelledby="process-title">
        <ProcessSteps />
      </Section>
      <Section id="faq" tone="surface" aria-labelledby="faq-title">
        <FaqList />
      </Section>
      <Section aria-labelledby="stats-title">
        <StatsRow />
      </Section>
      <Section tone="surface" aria-labelledby="reviews-title">
        <Testimonials />
      </Section>
      <Section id="zone" aria-labelledby="coverage-title">
        <CoverageArea />
      </Section>
      <Section aria-labelledby="cta-title">
        <CtaBanner />
      </Section>
    </>
  );
}
