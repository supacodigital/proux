import { Car, Clock, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import { about, type AboutCommitment } from "@/content/about";
import styles from "./AboutCommitments.module.css";

const COMMITMENT_ICONS: Record<AboutCommitment["icon"], LucideIcon> = {
  shield: ShieldCheck,
  clock: Clock,
  car: Car,
  wrench: Wrench,
};

/**
 * Section « Nos engagements » (§7.5) : assurance, devis, déplacement,
 * matériel. Un engagement encore incomplet côté client (`pending`) est
 * estompé et ne porte aucune donnée inventée.
 */
export function AboutCommitments() {
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <p className={styles.kicker}>Nos engagements</p>
        <h2 id="about-commitments-title" className={styles.title}>
          Ce sur quoi vous pouvez compter
        </h2>
      </div>

      <dl className={styles.list}>
        {(about.commitments as readonly AboutCommitment[]).map((item) => {
          const Icon = COMMITMENT_ICONS[item.icon];
          return (
            <div
              key={item.label}
              className={styles.item}
              data-pending={item.pending ? "" : undefined}
            >
              <dt className={styles.term}>
                <span className={styles.icon} aria-hidden>
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                {item.label}
              </dt>
              <dd className={styles.detail}>{item.detail}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
