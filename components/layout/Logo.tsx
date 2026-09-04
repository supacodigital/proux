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
 * sombre, 1536×1024, détouré depuis un fond noir plein).
 * TODO(client) : la version blanche affiche « Peinture · Imperméabilisation ·
 * Toiture » — la couleur affiche « Peinture · Nettoyage · Toiture » (cf.
 * claude.md §2). À harmoniser avec le client, et remplacer les deux par le
 * vecteur définitif dès qu'il est fourni (cf. claude.md §9).
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
      quality={95}
      className={[styles.img, className].filter(Boolean).join(" ")}
      sizes={`${width}px`}
    />
  );
}
