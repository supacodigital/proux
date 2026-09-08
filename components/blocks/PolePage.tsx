import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/components/seo/schema";
import { getPole, publishedSubs, type Pole } from "@/content/services";
import { faqByPole } from "@/content/faq";
import { projects } from "@/content/projects";
import { PoleHero } from "./PoleHero";
import { PoleIntro } from "./PoleIntro";
import { ServiceSection } from "./ServiceSection";
import { MethodNote } from "./MethodNote";
import { PoleWork } from "./PoleWork";
import { FaqSection } from "./FaqSection";
import { CtaBanner } from "./CtaBanner";
import sectionStyles from "./ServiceSection.module.css";

/**
 * Gabarit commun des pages pôle (/toiture, /nettoyage, /peinture — §7.2).
 * Assemble hero de section, intro + sommaire, une section par
 * sous-prestation, encadré méthode, avant/après filtrés, FAQ du pôle,
 * CtaBanner. JSON-LD Service + BreadcrumbList + FAQPage.
 */
export function PolePage({ poleKey }: { poleKey: Pole["key"] }) {
  const pole = getPole(poleKey);
  const subs = publishedSubs(pole);
  const hasWork = projects.some((p) => p.pole === pole.key);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: pole.pageTitle,
          description: pole.metaDescription,
          path: pole.href,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: pole.label, path: pole.href },
        ])}
      />

      <PoleHero pole={pole} />

      <Section aria-label={`${pole.label} — présentation`}>
        <PoleIntro pole={pole} subs={subs} />
      </Section>

      <Section
        tone="surface"
        aria-label={`Prestations ${pole.label.toLowerCase()}`}
      >
        <div className={sectionStyles.list}>
          {subs.map((sub, i) => (
            <ServiceSection key={sub.slug} sub={sub} index={i} />
          ))}
        </div>
      </Section>

      {pole.methodNote && (
        <Section aria-label={pole.methodNote.title}>
          <MethodNote note={pole.methodNote} />
        </Section>
      )}

      {hasWork && (
        <Section aria-labelledby="pole-work-title">
          <PoleWork pole={pole.key} poleLabel={pole.label} />
        </Section>
      )}

      <Section tone="surface" aria-labelledby="faq-title">
        <FaqSection
          items={faqByPole[pole.key]}
          titleId="faq-title"
          title={`${pole.label} — vos questions`}
        />
      </Section>

      <Section aria-labelledby="cta-title">
        <CtaBanner />
      </Section>
    </>
  );
}
