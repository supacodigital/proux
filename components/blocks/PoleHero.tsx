import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { QuoteCta } from "@/components/ui/QuoteCta";
import type { Pole } from "@/content/services";
import styles from "./PoleHero.module.css";

/**
 * Hero de section des pages pôle (§7.2) : kicker, <h1>, phrase de
 * promesse, photo plein cadre en fond avec voile marine, CTA devis +
 * lien « nos réalisations ».
 */
export function PoleHero({ pole }: { pole: Pole }) {
  return (
    <section className={styles.hero} aria-labelledby="pole-title">
      <Image
        src={pole.heroImage}
        alt={pole.heroImageAlt}
        fill
        sizes="100vw"
        priority
        className={styles.bg}
      />
      <div className={styles.veil} aria-hidden />

      <Container className={styles.inner}>
        <p className={styles.kicker}>{pole.kicker}</p>
        <h1 id="pole-title" className={styles.title}>
          {pole.pageTitle}
        </h1>
        <p className={styles.pitch}>{pole.pagePitch}</p>

        <div className={styles.actions}>
          <QuoteCta size="lg" onDark label="Demander un devis gratuit" />
          <Link href="/realisations" className={styles.secondary}>
            Voir nos réalisations
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
