"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PoleVideo.module.css";

export type PoleVideoContent = {
  /** Kicker au-dessus du titre */
  kicker: string;
  title: string;
  /** 1-2 phrases : ce que le visiteur regarde */
  body: string;
  /** Points courts affichés sous le texte */
  points?: string[];
  src: string;
  poster: string;
  /** Décrit la scène pour ceux qui ne voient pas la vidéo */
  caption: string;
};

/**
 * Vidéo de chantier verticale (format natif du téléphone de l'artisan).
 *
 * Décorative : muette, en boucle, sans contrôles — elle appuie le texte,
 * elle ne le remplace pas. On ne charge la vidéo que lorsque le bloc entre
 * dans le viewport, et jamais si l'utilisateur a demandé « moins
 * d'animations » ou activé l'économie de données : dans ces cas le poster
 * seul est affiché (cf. claude.md §5 et HeroVideo).
 */
export function PoleVideo({ content }: { content: PoleVideoContent }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (reduceMotion || conn?.saveData === true) return;

    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShowVideo(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!showVideo) return;
    const video = videoRef.current;
    if (!video) return;
    const play = () => video.play().catch(() => {});
    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });
  }, [showVideo]);

  return (
    <div className={styles.wrap}>
      <div className={styles.text}>
        <p className={styles.kicker}>{content.kicker}</p>
        <h2 id="pole-video-title" className={styles.title}>
          {content.title}
        </h2>
        <p className={styles.body}>{content.body}</p>
        {content.points && (
          <ul className={styles.points}>
            {content.points.map((point) => (
              <li key={point} className={styles.point}>
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div ref={wrapRef} className={styles.media}>
        <figure className={styles.figure}>
          {showVideo ? (
            <video
              ref={videoRef}
              className={styles.video}
              poster={content.poster}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={content.caption}
            >
              <source src={content.src} type="video/mp4" />
            </video>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              className={styles.video}
              src={content.poster}
              alt={content.caption}
              width={608}
              height={1080}
            />
          )}
        </figure>
      </div>
    </div>
  );
}
