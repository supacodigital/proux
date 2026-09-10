"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Droplets,
  House,
  PaintRoller,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { poles } from "@/content/services";
import { useInView } from "@/lib/useInView";
import { QuoteCta } from "@/components/ui/QuoteCta";
import styles from "./ServicePillars.module.css";

const POLE_ICONS: Record<(typeof poles)[number]["key"], LucideIcon> = {
  toiture: House,
  couverture: Wrench,
  nettoyage: Droplets,
  peinture: PaintRoller,
};

export function ServicePillars() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSlider, setIsSlider] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 899px)");
    setIsSlider(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsSlider(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries.reduce((best, entry) =>
          entry.intersectionRatio > best.intersectionRatio ? entry : best,
        );
        if (mostVisible.intersectionRatio > 0.5) {
          const index = cardRefs.current.findIndex((el) => el === mostVisible.target);
          if (index !== -1) setActiveIndex(index);
        }
      },
      { root: scroller, threshold: [0.5, 0.75, 1] },
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function scrollToCard(index: number) {
    const card = cardRefs.current[index];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    card?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      inline: "start",
      block: "nearest",
    });
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <p className={styles.kicker}>Nos prestations</p>
        <h2 id="pillars-title" className={styles.title}>
          Toiture, façades, peinture — un seul artisan
        </h2>
        <p className={styles.intro}>
          PROUX entretient, répare et protège l’extérieur de votre maison : du
          démoussage de la toiture à la mise en peinture des boiseries, en
          passant par les réparations de couverture.
        </p>
      </div>

      <div
        ref={(node) => {
          ref.current = node;
          scrollerRef.current = node;
        }}
        className={styles.grid}
        data-inview={inView ? "" : undefined}
        role="region"
        aria-label="Nos pôles de prestations"
        tabIndex={isSlider ? 0 : undefined}
      >
        {poles.map((pole, i) => {
          const Icon = POLE_ICONS[pole.key];
          return (
            <article
              key={pole.key}
              ref={(node) => {
                cardRefs.current[i] = node;
              }}
              className={styles.card}
              style={{ transitionDelay: `${i * 70}ms` }}
              aria-label={`${i + 1} sur ${poles.length} : ${pole.label}`}
            >
              <Link href={pole.href} className={styles.media}>
                <Image
                  src={pole.wideImage}
                  alt={pole.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  // 1re carte : proche du pli sur desktop → on la charge tôt.
                  // Les 3 autres restent en lazy (défaut).
                  priority={i === 0}
                  className={styles.mediaImg}
                />
                <span className={styles.mediaIcon} aria-hidden>
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <span className={styles.mediaKicker}>{pole.kicker}</span>
              </Link>

              <div className={styles.body}>
                <h3 className={styles.cardTitle}>
                  <Link href={pole.href}>{pole.homeTitle ?? pole.label}</Link>
                </h3>
                <p className={styles.tagline}>{pole.tagline}</p>

                <ul className={styles.subs}>
                  {pole.subs
                    .filter((s) => s.confirmed !== false)
                    .slice(0, 5)
                    .map((sub) => (
                      <li key={sub.slug}>
                        <Link href={`${pole.href}#${sub.slug}`}>{sub.label}</Link>
                      </li>
                    ))}
                </ul>

                <div className={styles.ctaWrap}>
                  <QuoteCta
                    href={pole.href}
                    size="md"
                    label={`Voir la page ${pole.label.toLowerCase()}`}
                    className={styles.more}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.dots} role="tablist" aria-label="Choisir un pôle">
        {poles.map((pole, i) => (
          <button
            key={pole.key}
            type="button"
            role="tab"
            className={styles.dot}
            data-active={i === activeIndex ? "" : undefined}
            aria-selected={i === activeIndex}
            aria-label={`Voir ${pole.label}`}
            onClick={() => scrollToCard(i)}
          />
        ))}
      </div>
    </div>
  );
}
