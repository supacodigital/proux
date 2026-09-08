import { Accordion, type AccordionItemData } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import type { FaqItem } from "@/content/faq";
import styles from "./FaqList.module.css";

type FaqSectionProps = {
  items: FaqItem[];
  /** ancre le <h2> pour aria-labelledby de la Section parente */
  titleId: string;
  kicker?: string;
  title?: string;
  /** émettre le JSON-LD FAQPage (une seule fois par page) */
  jsonLd?: boolean;
};

/**
 * Section FAQ générique — accordéon + JSON-LD FAQPage optionnel.
 * Utilisée par la home (FaqList) et les pages pôle.
 */
export function FaqSection({
  items,
  titleId,
  kicker = "Questions fréquentes",
  title = "Ce que nos clients nous demandent",
  jsonLd = true,
}: FaqSectionProps) {
  const accordionItems: AccordionItemData[] = items.map((f, i) => ({
    id: `${titleId}-q${i + 1}`,
    title: f.question,
    content: <p>{f.answer}</p>,
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className={styles.wrap}>
      {jsonLd && <JsonLd data={faqSchema} />}

      <div className={styles.head}>
        <p className={styles.kicker}>{kicker}</p>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
      </div>

      <Accordion items={accordionItems} className={styles.accordion} />
    </div>
  );
}
