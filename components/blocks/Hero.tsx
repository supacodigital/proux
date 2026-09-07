import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { QuoteCta } from "@/components/ui/QuoteCta";
import { company } from "@/content/company";
import { TrustBar } from "./TrustBar";
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
        <Logo tone="onDark" height={480} priority className={styles.logo} />

        <h1 id="hero-title" className="visually-hidden">
          Votre toiture retrouve son éclat d’origine.
        </h1>

        {/* TODO(client) : confirmer « de père en fils » + le nombre d'années */}
        <p className={styles.pitch}>{company.heroPitch}</p>

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
      </Container>

      {/* Bandeau d'arguments ancré en bas du hero (overlay, déroule au scroll) */}
      <TrustBar />
    </section>
  );
}
