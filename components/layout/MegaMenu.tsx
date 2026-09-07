import Image from "next/image";
import { NavLink } from "@/components/ui/NavLink";
import { poles } from "@/content/services";
import styles from "./MegaMenu.module.css";

type PanelProps = { onNavigate: () => void };

export function PrestationsPanel({ onNavigate }: PanelProps) {
  return (
    <div className={styles.panel}>
      {poles.map((pole) => (
        <NavLink
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
              sizes="33vw"
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
        </NavLink>
      ))}
    </div>
  );
}
