import styles from "./QuoteFormSkeleton.module.css";

/**
 * Squelette du formulaire de devis.
 * Affiché tant que le composant client (QuoteForm) n'est pas hydraté,
 * et pendant son chargement différé au scroll (CtaBanner).
 * Reproduit la grille réelle du formulaire pour éviter tout saut de mise
 * en page. Purement décoratif : masqué aux lecteurs d'écran.
 */
export function QuoteFormSkeleton() {
  return (
    <div className={styles.form} aria-hidden>
      <div className={styles.grid}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.field}>
            <span className={`${styles.bar} ${styles.label}`} />
            <span className={`${styles.bar} ${styles.input}`} />
          </div>
        ))}
      </div>

      <div className={styles.field}>
        <span className={`${styles.bar} ${styles.label}`} />
        <span className={`${styles.bar} ${styles.textarea}`} />
      </div>

      <div className={styles.consent}>
        <span className={`${styles.bar} ${styles.checkbox}`} />
        <div className={styles.consentLines}>
          <span className={`${styles.bar} ${styles.line}`} />
          <span className={`${styles.bar} ${styles.lineShort}`} />
        </div>
      </div>

      <span className={`${styles.bar} ${styles.submit}`} />
      <span className={`${styles.bar} ${styles.note}`} />
    </div>
  );
}
