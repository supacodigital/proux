import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { QuoteCta } from "@/components/ui/QuoteCta";
import type { Pole, SubService } from "@/content/services";
import { PoleToc } from "./PoleToc";
import styles from "./PoleHero.module.css";

/**
 * Haut des pages pôle (§7.2) — présentation éditoriale sur fond clair :
 * kicker, <h1>, phrase de promesse et actions à gauche ; sommaire ancré
 * des sous-prestations à droite. Header solide sur ces pages.
 */
export function PoleHero({
  pole,
  subs,
}: {
  pole: Pole;
  subs: SubService[];
}) {
  return (
    <section className={styles.hero} aria-labelledby="pole-title">
      <Container className={styles.inner}>
        <div className={styles.body}>
          <p className={styles.kicker}>{pole.kicker}</p>
          <h1 id="pole-title" className={styles.title}>
            {pole.pageTitle}
          </h1>
          <p className={styles.pitch}>{pole.pagePitch}</p>

          <div className={styles.actions}>
            <QuoteCta size="lg" label="Demander un devis gratuit" />
            {pole.methodNote && (
              <a href="#methode" className={styles.secondary}>
                Voir notre méthode
                <ArrowRight size={18} aria-hidden />
              </a>
            )}
          </div>
        </div>

        <PoleToc pole={pole} subs={subs} />
      </Container>
    </section>
  );
}
