"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import styles from "./BeforeAfterSlider.module.css";

type BeforeAfterSliderProps = {
  before: string;
  after: string;
  /** alt de base — on suffixe « — avant » / « — après » */
  alt: string;
  /** position initiale de la poignée, 0–100 (défaut 50) */
  initial?: number;
  /** `priority` sur les images (1er slider visible seulement) */
  priority?: boolean;
  className?: string;
};

/**
 * Comparateur avant / après.
 *
 * - Fond = image « après » (l'état final, plein cadre).
 * - Par-dessus, l'image « avant » est révélée depuis la GAUCHE jusqu'à
 *   `--pos` via `clip-path: inset()` → à 50 %, Avant à gauche / Après à
 *   droite (convention universelle). Aucun nœud DOM en trop, composé GPU.
 * - Au drag : la poignée colle au pointeur, PAS de transition. Au
 *   relâchement / au clavier : retour animé `--dur-base` `--ease-out`.
 * - Clavier : ← → (±2 %), Maj (±10 %), Début / Fin. `role="slider"`.
 *
 * Conforme à claude.md §5 et à prefers-reduced-motion.
 */
export function BeforeAfterSlider({
  before,
  after,
  alt,
  initial = 50,
  priority = false,
  className,
}: BeforeAfterSliderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const hintId = useId();

  const setFromClientX = useCallback((clientX: number) => {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setFromClientX(e.clientX);
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    setDragging(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    let next: number | null = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = pos - step;
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") next = pos + step;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 100;
    if (next === null) return;
    e.preventDefault();
    setPos(Math.min(100, Math.max(0, next)));
  };

  // Filet de sécurité : relâchement du pointeur hors de l'élément
  useEffect(() => {
    if (!dragging) return;
    const stop = () => setDragging(false);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, [dragging]);

  return (
    <div
      ref={rootRef}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-dragging={dragging ? "" : undefined}
      style={{ "--pos": `${pos}%` } as CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {/* Fond : APRÈS, plein cadre */}
      <Image
        src={after}
        alt={`${alt} — après`}
        fill
        sizes="(max-width: 900px) 100vw, 900px"
        priority={priority}
        className={styles.img}
        draggable={false}
      />

      <span className={[styles.tag, styles.tagAfter].join(" ")}>Après</span>

      {/* Par-dessus : AVANT, révélé de la gauche jusqu'à --pos.
          L'étiquette « Avant » vit dans le clip → disparaît avec lui. */}
      <div className={styles.beforeClip}>
        <Image
          src={before}
          alt={`${alt} — avant`}
          fill
          sizes="(max-width: 900px) 100vw, 900px"
          priority={priority}
          className={styles.img}
          draggable={false}
        />
        <span className={[styles.tag, styles.tagBefore].join(" ")}>Avant</span>
      </div>

      {/* Poignée */}
      <div
        className={styles.handle}
        role="slider"
        tabIndex={0}
        aria-label="Comparer l’avant et l’après"
        aria-describedby={hintId}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)} % révélé de l’avant`}
        onKeyDown={onKeyDown}
      >
        <span className={styles.handleLine} aria-hidden />
        <span className={styles.handleGrip} aria-hidden>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
            <path
              fill="currentColor"
              d="M9.5 7 5 12l4.5 5V13H15v4l4.5-5L15 7v4H9.5z"
            />
          </svg>
        </span>
      </div>

      <span id={hintId} className="visually-hidden">
        Glissez le curseur ou utilisez les flèches pour comparer l’état avant et
        après l’intervention.
      </span>
    </div>
  );
}
