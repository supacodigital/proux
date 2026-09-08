import Link from "next/link";
import type { Pole, SubService } from "@/content/services";
import styles from "./PoleIntro.module.css";

/**
 * Intro d'une page pôle (§7.2) : phrase d'accroche + sommaire ancré
 * des sous-prestations (maillage interne + repère de lecture).
 */
export function PoleIntro({
  pole,
  subs,
}: {
  pole: Pole;
  subs: SubService[];
}) {
  return (
    <div className={styles.wrap}>
      <p className={styles.lead}>{pole.intro}</p>

      <nav className={styles.toc} aria-label={`Prestations ${pole.label.toLowerCase()}`}>
        <p className={styles.tocLabel}>Sur cette page</p>
        <ul className={styles.tocList}>
          {subs.map((sub) => (
            <li key={sub.slug}>
              <Link href={`#${sub.slug}`}>{sub.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
