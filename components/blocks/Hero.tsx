import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { QuoteCta } from "@/components/ui/QuoteCta";
import { company } from "@/content/company";
import { HeroVideo } from "./HeroVideo";
import { TrustBar } from "./TrustBar";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {/* — Vidéo de fond (lecture forcée en JS pour le mobile) — */}
      <HeroVideo />

      <Container className={styles.inner}>
        <Logo tone="onDark" height={480} priority className={styles.logo} />

        <h1 id="hero-title" className="visually-hidden">
          Votre toiture retrouve son éclat d’origine.
        </h1>

        <p className={styles.pitch}>{company.heroPitch}</p>

        <div className={styles.actions}>
          <QuoteCta size="lg" onDark label="Demander un devis gratuit" />
          <Button
            href="/#methode"
            size="lg"
            variant="secondary"
            tone="onDark"
            className={styles.secondary}
          >
            Voir notre méthode
            <ArrowRight size={18} aria-hidden />
          </Button>
        </div>
      </Container>

      {/* Bandeau d'arguments ancré en bas du hero (overlay, déroule au scroll) */}
      <TrustBar />
    </section>
  );
}
