"use client";

import dynamic from "next/dynamic";
import { Phone } from "lucide-react";
import { useInView } from "@/lib/useInView";
import { company } from "@/content/company";
import styles from "./CtaBanner.module.css";

/* Le formulaire (zod + logique) n'est chargé qu'au scroll : il est tout
   en bas de la home, inutile de peser sur le chargement initial. */
const QuoteForm = dynamic(
  () => import("./QuoteForm").then((m) => m.QuoteForm),
  {
    loading: () => <div className={styles.skeleton} aria-hidden />,
  },
);

/**
 * Section de conversion finale de la home (claude.md §7.1 point 12).
 * Accroche + formulaire de devis complet (chargé à l'entrée du viewport).
 * La bande CTA marine du footer reste en dessous comme dernier rappel.
 */
export function CtaBanner() {
  const { ref, inView } = useInView<HTMLDivElement>("-100px");

  return (
    <div className={styles.wrap}>
      <div className={styles.intro}>
        <p className={styles.kicker}>Devis gratuit</p>
        <h2 id="cta-title" className={styles.title}>
          Demandez votre devis
        </h2>
        <p className={styles.lead}>
          Décrivez votre projet en quelques lignes. On vous rappelle sous 48 h
          pour convenir d’une visite et vous remettre un devis clair, sans
          engagement.
        </p>
        <a href={company.phone.href} className={styles.phone}>
          <Phone size={18} aria-hidden />
          {company.phone.display}
        </a>
      </div>

      <div ref={ref} className={styles.formCol}>
        {inView ? (
          <QuoteForm />
        ) : (
          <div className={styles.skeleton} aria-hidden />
        )}
      </div>
    </div>
  );
}
