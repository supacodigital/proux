import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <Container as="section" className={styles.wrap}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Cette page n’existe pas (ou plus).</h1>
      <p className={styles.text}>
        Le lien est peut-être erroné, ou la page n’a pas encore été mise en ligne.
      </p>
      <Button href="/" size="lg">
        Retour à l’accueil
      </Button>
    </Container>
  );
}
