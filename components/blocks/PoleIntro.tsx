import type { Pole } from "@/content/services";
import styles from "./PoleIntro.module.css";

/**
 * Chapô d'une page pôle (§7.2) : phrase d'attaque appuyée + suite du
 * texte en corps. Le sommaire ancré est dans le hero (PoleToc).
 */
export function PoleIntro({ pole }: { pole: Pole }) {
  return (
    <div className={styles.wrap}>
      <p className={styles.lead}>{pole.introLead}</p>
      <p className={styles.body}>{pole.intro}</p>
    </div>
  );
}
