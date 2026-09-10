import Link from "next/link";
import type { Pole, SubService } from "@/content/services";
import styles from "./PoleToc.module.css";

/**
 * Sommaire ancré des sous-prestations d'un pôle — repère de lecture
 * + maillage interne. Affiché à droite du hero (§7.2).
 */
export function PoleToc({
  pole,
  subs,
}: {
  pole: Pole;
  subs: SubService[];
}) {
  return (
    <nav
      className={styles.toc}
      aria-label={`Prestations ${pole.label.toLowerCase()}`}
    >
      <p className={styles.label}>Sur cette page</p>
      <ol className={styles.list}>
        {subs.map((sub, i) => (
          <li key={sub.slug} className={styles.item}>
            <Link href={`#${sub.slug}`} className={styles.link}>
              <span className={styles.num}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.text}>{sub.label}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
