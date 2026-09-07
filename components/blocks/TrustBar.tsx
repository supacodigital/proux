"use client";

import { useEffect, useState } from "react";
import { Clock, Home, MapPin, ShieldCheck, type LucideIcon } from "lucide-react";
import { trustBar } from "@/content/company";
import styles from "./TrustBar.module.css";

const TRUST_ICONS: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  clock: Clock,
  map: MapPin,
  home: Home,
};

function TrustGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul className={styles.group} aria-hidden={ariaHidden || undefined}>
      {trustBar.map((item) => {
        const Icon = TRUST_ICONS[item.icon];
        return (
          <li
            key={item.label}
            className={styles.item}
            data-pending={item.pending ? "" : undefined}
          >
            <Icon
              size={18}
              aria-hidden
              className={styles.icon}
              strokeWidth={1.75}
            />
            {item.label}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * TrustBar — bandeau d'arguments ancré au bas du hero, en overlay sur la
 * vidéo (fond marine translucide + flou). Masqué sous le bord du hero au
 * repos, il « déroule » vers le haut dès le premier scroll, puis les
 * arguments défilent en continu (ruban, mouvement linéaire).
 * Pause au survol / focus ; arrêt total si prefers-reduced-motion (les
 * arguments restent lisibles, centrés). Rendu dans <Hero>.
 */
export function TrustBar() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Mouvement réduit : bandeau affiché directement, pas de déroulé.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    // Se déroule quand on a parcouru ~30 % du hero : son emplacement (bas du
    // hero) est alors déjà bien dans le viewport, le déroulé est visible.
    const onScroll = () => {
      const threshold = Math.min(window.innerHeight * 0.3, 260);
      if (window.scrollY > threshold) {
        setRevealed(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    onScroll(); // au cas où la page est déjà scrollée (rechargement ancré)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.wrap} data-revealed={revealed ? "" : undefined}>
      <div className={styles.viewport}>
        <div className={styles.track}>
          <TrustGroup />
          <TrustGroup ariaHidden />
        </div>
      </div>
    </div>
  );
}
