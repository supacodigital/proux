import { ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { QuoteCta } from "@/components/ui/QuoteCta";
import { company } from "@/content/company";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {/* — Vidéo de fond — */}
      <div className={styles.media} aria-hidden>
        <video
          className={styles.video}
          poster="/video/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        <div className={styles.scrim} />
      </div>

      <Container className={styles.inner}>
        <p className={styles.eyebrow}>{company.area}</p>

        <h1 id="hero-title" className={styles.title}>
          Votre toiture retrouve
          <br />
          son éclat d’origine.
        </h1>

        <p className={styles.lead}>
          PROUX nettoie, protège et repeint vos extérieurs — toiture, façade,
          terrasse — avec un travail soigné et un résultat qui dure.
        </p>

        <div className={styles.actions}>
          <QuoteCta size="lg" onDark label="Demander un devis gratuit" />
          <Button
            href="/realisations"
            size="lg"
            variant="secondary"
            tone="onDark"
            className={styles.secondary}
          >
            Voir nos réalisations
            <ArrowRight size={18} aria-hidden />
          </Button>
        </div>

        <p className={styles.reassurance}>
          <ShieldCheck size={16} aria-hidden />
          Devis gratuit &amp; sans engagement · Intervention dans tout l’Ain
        </p>
      </Container>
    </section>
  );
}
