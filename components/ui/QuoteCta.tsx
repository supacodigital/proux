import Link from "next/link";
import { CONTACT_HREF } from "@/content/company";
import styles from "./QuoteCta.module.css";

type QuoteCtaProps = {
  /** Texte du bouton */
  label?: string;
  size?: "sm" | "md" | "lg";
  /** Sur fond sombre (hero) : marine plus clair + halo, garde le contraste */
  onDark?: boolean;
  /** Occupe toute la largeur (menu mobile) */
  block?: boolean;
  href?: string;
  className?: string;
};

/**
 * CTA signature de PROUX — forme « Barre chantier » (F).
 * Bloc marine, coin inférieur-gauche coupé. Marine sur tous les fonds.
 * Motion conforme à claude.md §5 (transform/opacity, ease-out, < 320ms).
 */
export function QuoteCta({
  label = "Devis gratuit",
  size = "md",
  onDark = false,
  block = false,
  href = CONTACT_HREF,
  className,
}: QuoteCtaProps) {
  const cls = [
    styles.cta,
    styles[size],
    onDark ? styles.onDark : "",
    block ? styles.block : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={cls}>
      <span className={styles.label}>{label}</span>
    </Link>
  );
}
