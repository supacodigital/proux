"use client";

import Image from "next/image";
import { NavLink } from "@/components/ui/NavLink";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import { QuoteCta } from "@/components/ui/QuoteCta";
import { company } from "@/content/company";
import { poles } from "@/content/services";
import styles from "./MobileMenu.module.css";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

/** Liens hors pôles, en liste sobre sous les cartes photo.
 * Doit rester aligné sur `primaryNav` (desktop) — cf. claude.md §7.4 :
 * la page zone d'intervention ne doit pas polluer la nav principale.
 * Méthode / FAQ ancrent les sections correspondantes de la home. */
const secondaryLinks = [
  { label: "Méthode", href: "/#methode" },
  { label: "FAQ", href: "/#faq" },
  { label: "Notre histoire", href: "/a-propos" },
];

/**
 * Panneau plein écran mobile. La BARRE HAUTE reste celle du Header
 * (rendue en permanence) : ici on n'affiche que le contenu, sous la barre.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  // Échap pour fermer. Effet séparé du verrou de scroll ci-dessous : `onClose`
  // ne doit jamais faire réexécuter le verrou (voir plus bas).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Verrou de scroll du body pendant l'ouverture.
  // `overflow: hidden` seul casse le `position: sticky` du header (le
  // contexte de scroll du body change alors que la page reste défilée →
  // le header sticky se retrouve figé à son offset dans le flux, hors
  // écran). On fige plutôt le body en `position: fixed` à son scroll
  // actuel, puis on restaure le scroll à la fermeture.
  // Dépend UNIQUEMENT de `open` : si ça dépendait aussi d'un callback recréé
  // à chaque render du parent, l'effet se relancerait en boucle et
  // recapturerait `scrollY` alors qu'il vaut déjà 0 (body déjà verrouillé).
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const { position, top, width } = document.body.style;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = position;
      document.body.style.top = top;
      document.body.style.width = width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <div
      ref={panelRef}
      className={styles.root}
      data-open={open ? "" : undefined}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className={styles.scroll}>
        {/* — Pôles en cartes photo — */}
        <div className={styles.cards}>
          {poles.map((pole, i) => {
            const active =
              pathname === pole.href || pathname.startsWith(`${pole.href}/`);
            return (
              <NavLink
                key={pole.key}
                href={pole.href}
                className={styles.card}
                style={{ transitionDelay: `${60 + i * 40}ms` }}
                aria-current={active ? "page" : undefined}
                onClick={onClose}
              >
                <span className={styles.cardMedia}>
                  <Image
                    src={pole.image}
                    alt=""
                    fill
                    sizes="100vw"
                    className={styles.cardImg}
                  />
                </span>
                <span className={styles.cardBody}>
                  <span className={styles.cardKicker}>{pole.kicker}</span>
                  <span className={styles.cardLabel}>{pole.label}</span>
                </span>
                <ArrowUpRight
                  size={20}
                  aria-hidden
                  className={styles.cardArrow}
                />
              </NavLink>
            );
          })}
        </div>

        {/* — Liens secondaires — */}
        <nav className={styles.links} aria-label="Navigation secondaire">
          {secondaryLinks.map((link, i) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <NavLink
                key={link.href}
                href={link.href}
                className={styles.link}
                style={{ transitionDelay: `${180 + i * 35}ms` }}
                aria-current={active ? "page" : undefined}
                onClick={onClose}
              >
                <span>{link.label}</span>
                <ArrowUpRight size={18} aria-hidden className={styles.linkArrow} />
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className={styles.footer}>
        <QuoteCta size="lg" block label="Demander un devis gratuit" />
        <a href={company.phone.href} className={styles.phone}>
          <Phone size={18} aria-hidden />
          <span>{company.phone.display}</span>
        </a>
      </div>
    </div>
  );
}
