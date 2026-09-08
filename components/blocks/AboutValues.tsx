import Image from "next/image";
import {
  Handshake,
  ShieldCheck,
  Sparkles,
  SprayCan,
  type LucideIcon,
} from "lucide-react";
import { about, type AboutValue } from "@/content/about";
import styles from "./AboutValues.module.css";

const VALUE_ICONS: Record<AboutValue["icon"], LucideIcon> = {
  sparkles: Sparkles,
  broom: SprayCan,
  handshake: Handshake,
  "shield-check": ShieldCheck,
};

/**
 * Section « Ce qui compte pour nous » (§7.5) : les valeurs de PROUX
 * en cartes, suivies d'une bande photo plein cadre.
 */
export function AboutValues() {
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <p className={styles.kicker}>Nos valeurs</p>
        <h2 id="about-values-title" className={styles.title}>
          Ce qui compte pour nous
        </h2>
      </div>

      <ul className={styles.grid}>
        {about.values.map((value) => {
          const Icon = VALUE_ICONS[value.icon];
          return (
            <li key={value.title} className={styles.card}>
              <span className={styles.icon} aria-hidden>
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className={styles.cardTitle}>{value.title}</h3>
              <p className={styles.cardBody}>{value.body}</p>
            </li>
          );
        })}
      </ul>

      <figure className={styles.wide}>
        <Image
          src={about.wideImage}
          alt={about.wideImageAlt}
          fill
          sizes="100vw"
          className={styles.wideImg}
        />
      </figure>
    </div>
  );
}
