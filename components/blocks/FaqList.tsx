import { Accordion, type AccordionItemData } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faq } from "@/content/faq";
import styles from "./FaqList.module.css";

/**
 * Section FAQ (home, claude.md §7.1 point 11).
 * Accordéon + JSON-LD FAQPage pour le SEO (claude.md §10).
 */
export function FaqList() {
  const items: AccordionItemData[] = faq.map((f, i) => ({
    id: `q${i + 1}`,
    title: f.question,
    content: <p>{f.answer}</p>,
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className={styles.wrap}>
      <JsonLd data={faqSchema} />

      <div className={styles.head}>
        <p className={styles.kicker}>Questions fréquentes</p>
        <h2 id="faq-title" className={styles.title}>
          Ce que nos clients nous demandent
        </h2>
      </div>

      <Accordion items={items} className={styles.accordion} />
    </div>
  );
}
