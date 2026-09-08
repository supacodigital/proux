"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useInView } from "@/lib/useInView";
import type { SubService } from "@/content/services";
import styles from "./ServiceSection.module.css";

type ServiceSectionProps = {
  sub: SubService;
  /** alterne le sens texte / photo (index pair = photo à droite) */
  index: number;
};

/**
 * Une sous-prestation d'une page pôle (§7.2) :
 * problème → intervention → résultat + photo de chantier, en blocs
 * texte / image alternés. Ancre `#slug` pour le maillage interne.
 * Apparition discrète au scroll (opacity + translateY, §5).
 */
export function ServiceSection({ sub, index }: ServiceSectionProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reversed = index % 2 === 1;

  return (
    <article
      id={sub.slug}
      className={styles.section}
      data-reversed={reversed ? "" : undefined}
    >
      <div
        ref={ref}
        className={styles.grid}
        data-inview={inView ? "" : undefined}
      >
        <div className={styles.body}>
          <h3 className={styles.title}>{sub.label}</h3>
          <p className={styles.text}>{sub.body}</p>

          {sub.points && sub.points.length > 0 && (
            <ul className={styles.points}>
              {sub.points.map((point) => (
                <li key={point}>
                  <Check size={18} aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.media}>
          <Image
            src={sub.image}
            alt={sub.imageAlt}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.img}
          />
        </div>
      </div>
    </article>
  );
}
