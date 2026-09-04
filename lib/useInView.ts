"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Révèle un élément une seule fois quand il entre dans le viewport.
 * Respecte prefers-reduced-motion (révélé immédiatement).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  margin = "-80px",
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: `0px 0px ${margin} 0px` },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, inView };
}
