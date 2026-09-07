"use client";

import { useEffect, useRef, useState } from "react";

const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Compte de 0 à `target` une seule fois, quand `start` passe à true.
 * ~`duration` ms, ease-out. Respecte prefers-reduced-motion : affiche
 * directement la valeur finale (claude.md §5).
 */
export function useCountUp(
  target: number,
  start: boolean,
  { duration = 800, decimals = 0 }: { duration?: number; decimals?: number } = {},
) {
  const [value, setValue] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!start || done.current) return;
    done.current = true;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(target);
      return;
    }

    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = EASE_OUT(p);
      const factor = 10 ** decimals;
      setValue(Math.round(target * eased * factor) / factor);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, decimals]);

  return value;
}
