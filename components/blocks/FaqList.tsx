import { faq } from "@/content/faq";
import { FaqSection } from "./FaqSection";

/**
 * Section FAQ de la home (claude.md §7.1 point 11).
 * Fine enveloppe autour de FaqSection avec la FAQ générale.
 */
export function FaqList() {
  return (
    <FaqSection
      items={faq}
      titleId="faq-title"
      title="Ce que nos clients nous demandent"
    />
  );
}
