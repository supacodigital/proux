"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

/**
 * Vidéo de fond du hero.
 *
 * L'autoplay natif échoue souvent sur mobile (Safari iOS surtout) même
 * avec muted + playsInline : on force play() au montage, avec reprise au
 * 1er geste si le navigateur refuse (Low Power Mode). Le poster reste le
 * filet de sécurité — jamais d'écran noir.
 *
 * On garde le poster seul (aucun octet de vidéo) si l'utilisateur a
 * demandé « moins d'animations » ou activé l'économie de données.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (reduceMotion || conn?.saveData === true) {
      setShowVideo(false);
    }
  }, []);

  useEffect(() => {
    if (!showVideo) return;
    const video = ref.current;
    if (!video) return;

    let cancelled = false;

    const tryPlay = () => {
      if (cancelled) return;
      const p = video.play();
      p?.catch(() => {
        const resume = () => video.play().catch(() => {});
        window.addEventListener("touchstart", resume, {
          once: true,
          passive: true,
        });
        window.addEventListener("click", resume, { once: true });
      });
    };

    if (video.readyState >= 2) tryPlay();
    else video.addEventListener("loadeddata", tryPlay, { once: true });

    const onVisible = () => {
      if (document.visibilityState === "visible") video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [showVideo]);

  return (
    <div className={styles.media} aria-hidden>
      {showVideo ? (
        <video
          ref={ref}
          className={styles.video}
          poster="/video/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className={styles.poster} />
      )}
      <div className={styles.scrim} />
    </div>
  );
}
