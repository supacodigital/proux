"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { PrestationsPanel } from "./MegaMenu";
import { QuoteCta } from "@/components/ui/QuoteCta";
import { primaryNav } from "@/content/company";
import styles from "./Header.module.css";

type HeaderProps = {
  /** true sur les pages au hero sombre : header transparent au repos */
  overlay?: boolean;
};

type PanelId = "prestations";
const HOVER_CLOSE_DELAY = 180;

export function Header({ overlay = false }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<PanelId | null>(null);
  /** true = ouvert par un clic → le survol ne le ferme plus (seul clic / Échap / clic-dehors ferme) */
  const lockedRef = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeNow = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    lockedRef.current = false;
    setOpenPanel(null);
  }, []);

  // Ferme tout à chaque navigation
  useEffect(() => {
    setMenuOpen(false);
    closeNow();
  }, [pathname, closeNow]);

  // Échap + clic en dehors de la nav et du panneau → ferme le méga-menu
  useEffect(() => {
    if (!openPanel) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNow();
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      const inNav = navRef.current?.contains(target);
      const inPanel = panelRef.current?.contains(target);
      if (!inNav && !inPanel) closeNow();
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openPanel, closeNow]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  // Fermeture au survol : ignorée si le panneau a été verrouillé par un clic
  const scheduleHoverClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      if (!lockedRef.current) setOpenPanel(null);
    }, HOVER_CLOSE_DELAY);
  }, [clearCloseTimer]);

  const openOnHover = useCallback(
    (id: PanelId) => {
      clearCloseTimer();
      setOpenPanel(id);
    },
    [clearCloseTimer],
  );

  // Survol d'un AUTRE lien de nav → ferme le panneau (sauf s'il est verrouillé)
  const closeOnHoverOther = useCallback(() => {
    if (!lockedRef.current) {
      clearCloseTimer();
      setOpenPanel(null);
    }
  }, [clearCloseTimer]);

  // Clic sur le déclencheur :
  //  - fermé            → ouvre + verrouille
  //  - ouvert (survol)  → verrouille (reste ouvert)
  //  - ouvert + verrou  → ferme
  const toggleOnClick = useCallback(
    (id: PanelId) => {
      clearCloseTimer();
      const shouldClose = openPanel === id && lockedRef.current;
      lockedRef.current = !shouldClose;
      setOpenPanel(shouldClose ? null : id);
    },
    [clearCloseTimer, openPanel],
  );

  // Le méga-menu ouvert ne solidifie PAS le header : il reste transparent
  // sur le hero (liens blancs). En revanche le menu mobile ouvert force
  // la barre en blanc opaque (même barre, autres couleurs).
  const solid = !overlay || scrolled || menuOpen;

  return (
    <header
      className={[styles.header, solid ? styles.solid : styles.transparent].join(
        " ",
      )}
      data-scrolled={scrolled ? "" : undefined}
      onMouseLeave={scheduleHoverClose}
      onMouseEnter={clearCloseTimer}
    >
      <Container className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="PROUX — accueil">
          <Logo tone={solid ? "default" : "onDark"} height={38} priority />
        </Link>

        <div className={styles.end}>
          <nav
            ref={navRef}
            className={styles.nav}
            aria-label="Navigation principale"
          >
            {primaryNav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              if (item.kind === "link") {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={styles.navLink}
                    aria-current={active ? "page" : undefined}
                    onMouseEnter={closeOnHoverOther}
                  >
                    {item.label}
                  </Link>
                );
              }

              const isOpen = openPanel === item.panel;
              return (
                <div
                  key={item.label}
                  className={styles.navItem}
                  onMouseEnter={() => openOnHover(item.panel)}
                >
                  <button
                    type="button"
                    className={styles.navTrigger}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    data-open={isOpen ? "" : undefined}
                    onClick={() => toggleOnClick(item.panel)}
                  >
                    {item.label}
                    <ChevronDown
                      size={15}
                      aria-hidden
                      className={styles.chevron}
                    />
                  </button>
                </div>
              );
            })}
          </nav>

          <div className={styles.actions}>
            <QuoteCta
              size="md"
              onDark={!solid}
              className={styles.ctaDesktop}
              label="Devis gratuit"
            />
            {!menuOpen && (
              <QuoteCta
                size="sm"
                onDark={!solid}
                className={styles.ctaMobile}
                label="Devis"
              />
            )}
            <button
              type="button"
              className={styles.burger}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <X size={24} aria-hidden />
              ) : (
                <span className={styles.burgerLines} aria-hidden>
                  <span />
                  <span />
                </span>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* — Conteneur méga-menu (enfant du header : y passer la souris ne
          déclenche pas le onMouseLeave du header) — */}
      <div className={styles.megaWrap} data-open={openPanel ? "" : undefined}>
        <div className={styles.megaTrack}>
          <div ref={panelRef} className={styles.megaInner}>
            {openPanel === "prestations" && (
              <PrestationsPanel onNavigate={closeNow} />
            )}
          </div>
        </div>
      </div>

      {/* voile plein écran quand un panneau est ouvert */}
      <button
        type="button"
        className={styles.backdrop}
        data-open={openPanel ? "" : undefined}
        tabIndex={-1}
        aria-hidden
        onClick={closeNow}
      />

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
