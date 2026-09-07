"use client";

import type { CSSProperties } from "react";
import { History, Home, MapPin, Star, type LucideIcon } from "lucide-react";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";
import { stats, type Stat } from "@/content/stats";
import styles from "./StatsRow.module.css";

const STAT_ICONS: Record<Stat["icon"], LucideIcon> = {
  history: History,
  home: Home,
  map: MapPin,
  star: Star,
};

function StatValue({ stat, start }: { stat: Stat; start: boolean }) {
  const n = useCountUp(stat.value, start, { decimals: stat.decimals ?? 0 });
  const shown = n.toLocaleString("fr-FR", {
    minimumFractionDigits: stat.decimals ?? 0,
    maximumFractionDigits: stat.decimals ?? 0,
  });
  return (
    <span className={styles.value}>
      {stat.prefix}
      {shown}
      {stat.suffix}
    </span>
  );
}

/** Rangée de 5 étoiles, remplies au prorata de `rating` (sur 5). */
function StarRating({ rating }: { rating: number }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span
      className={styles.stars}
      aria-hidden
      style={{ "--fill": `${pct}%` } as CSSProperties}
    >
      {"★★★★★"}
    </span>
  );
}

/**
 * Section « Chiffres-clés » (home, claude.md §7.1).
 * Chaque chiffre : icône + valeur (count-up une fois à l'entrée du viewport,
 * ~800 ms, ease-out) + label + ligne de contexte.
 * prefers-reduced-motion → valeur finale directe.
 */
export function StatsRow() {
  const { ref, inView } = useInView<HTMLDivElement>("-120px");

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <p className={styles.kicker}>En chiffres</p>
        <h2 id="stats-title" className={styles.title}>
          Un artisan installé, des résultats qui durent
        </h2>
      </div>

      <div ref={ref} className={styles.grid}>
        {stats.map((stat) => {
          const Icon = STAT_ICONS[stat.icon];
          return (
            <div
              key={stat.label}
              className={styles.item}
              data-pending={stat.pending ? "" : undefined}
            >
              <span className={styles.icon} aria-hidden>
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <p className={styles.figure}>
                <StatValue stat={stat} start={inView} />
              </p>
              {stat.icon === "star" && (
                <StarRating rating={stat.value} />
              )}
              <p className={styles.label}>{stat.label}</p>
              <p className={styles.hint}>{stat.hint}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
