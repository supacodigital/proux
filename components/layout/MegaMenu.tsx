import Image from "next/image";
import Link from "next/link";
import { poles } from "@/content/services";
import styles from "./MegaMenu.module.css";

type PanelProps = { onNavigate: () => void };

export function PrestationsPanel({ onNavigate }: PanelProps) {
  return (
    <div className={styles.panel}>
      {poles.map((pole) => (
        <Link
          key={pole.key}
          href={pole.href}
          className={styles.card}
          onClick={onNavigate}
        >
          <span className={styles.media}>
            <Image
              src={pole.image}
              alt=""
              fill
              sizes="(max-width: 1200px) 33vw, 320px"
              className={styles.mediaImg}
            />
          </span>
          <span className={styles.body}>
            <span className={styles.kicker}>{pole.kicker}</span>
            <span className={styles.label}>
              {pole.label}
              <span className={styles.underline} aria-hidden />
            </span>
            <span className={styles.tagline}>{pole.tagline}</span>
            {/* même forme que le CTA du header (bloc marine, coin coupé) */}
            <span className={styles.cta}>Découvrir</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
