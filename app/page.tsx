import { Hero } from "@/components/blocks/Hero";
import { ServicePillars } from "@/components/blocks/ServicePillars";
import { FeaturedWork } from "@/components/blocks/FeaturedWork";
import { ProcessSteps } from "@/components/blocks/ProcessSteps";
import { StatsRow } from "@/components/blocks/StatsRow";
import { Testimonials } from "@/components/blocks/Testimonials";
import { FaqList } from "@/components/blocks/FaqList";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { Section } from "@/components/layout/Section";

/**
 * Accueil — sections (cf. claude.md §7.1) :
 * Hero ✓ (+ TrustBar) · 3 pôles ✓ · Avant/Après ✓ · Méthode ✓ · Chiffres ✓ ·
 * Avis ✓ · FAQ ✓ · CtaBanner ✓ (formulaire de devis).
 * (Section « zone d'intervention » sur la home volontairement sautée — le SEO
 *  local passe par les pages /zone-intervention/[commune] + JSON-LD areaServed.)
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
      <Section aria-labelledby="process-title">
        <ProcessSteps />
      </Section>
      <Section tone="surface" aria-labelledby="stats-title">
        <StatsRow />
      </Section>
      <Section aria-labelledby="reviews-title">
        <Testimonials />
      </Section>
      <Section tone="surface" aria-labelledby="faq-title">
        <FaqList />
      </Section>
      <Section aria-labelledby="cta-title">
        <CtaBanner />
      </Section>
    </>
  );
}
