import {
  Check,
  PaintRoller,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { processSteps } from "@/content/process";
import styles from "./ProcessSteps.module.css";

const PROCESS_ICONS: Record<string, LucideIcon> = {
  search: Search,
  brush: PaintRoller,
  shield: ShieldCheck,
  check: Check,
};

/**
 * Section « Notre méthode » (home, claude.md §7.1).
 * Ligne horizontale numérotée reliée par un trait ; empilée sur mobile.
 */
export function ProcessSteps() {
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <p className={styles.kicker}>Notre méthode</p>
        <h2 id="process-title" className={styles.title}>
          Du premier appel au résultat garanti
        </h2>
        <p className={styles.intro}>
          Une intervention cadrée, propre et sans mauvaise surprise. Vous savez
          à chaque étape ce qu’on fait et pourquoi.
        </p>
      </div>

      <ol className={styles.steps}>
        {processSteps.map((step, i) => {
          const Icon = PROCESS_ICONS[step.icon];
          return (
            <li key={step.title} className={styles.step}>
              <div className={styles.marker}>
                <span className={styles.num}>{i + 1}</span>
                <span className={styles.icon} aria-hidden>
                  <Icon size={20} strokeWidth={1.75} />
                </span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
