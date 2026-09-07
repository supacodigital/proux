import Image from "next/image";
import logoColor from "@/public/img/logo-proux.png";
import logoWhite from "@/public/img/logo-proux-white-hd.png";
import styles from "./Logo.module.css";

type LogoProps = {
  /** "onDark" = version blanche (header transparent sur photo) */
  tone?: "default" | "onDark";
  /** hauteur d'affichage en px (le ratio est conservé) */
  height?: number;
  priority?: boolean;
  className?: string;
};

/**
 * Logo PROUX — image officielle du client, sans fond.
 * Deux déclinaisons : couleur (par défaut, 250×157) et blanc (sur fond
 * sombre, 1586×992, détouré depuis un fond noir plein).
 * TODO(client) : remplacer les deux par le vecteur définitif dès qu'il
 * est fourni (cf. claude.md §9).
 */
export function Logo({
  tone = "default",
  height = 40,
  priority = false,
  className,
}: LogoProps) {
  const src = tone === "onDark" ? logoWhite : logoColor;
  const width = Math.round((height * src.width) / src.height);

  return (
    <Image
      src={src}
      alt="PROUX — Peinture, Nettoyage, Toiture"
      width={width}
      height={height}
      priority={priority}
      quality={90}
      className={[styles.img, className].filter(Boolean).join(" ")}
      sizes={`${width}px`}
    />
  );
}
