import Image from "next/image";
import type { Pole } from "@/content/services";
import styles from "./PoleSchema.module.css";

/**
 * Schéma annoté d'une page pôle (§7.2) — vue d'ensemble illustrée des
 * prestations du pôle, entre l'intro/sommaire et les sections détaillées.
 * Image fournie par le client (illustration + bulles). L'alt reprend le
 * contenu du schéma pour l'accessibilité et le SEO.
 */
export function PoleSchema({ pole }: { pole: Pole }) {
  return (
    <figure className={styles.figure}>
      <Image
        src={pole.schemaImage}
        alt={pole.schemaImageAlt}
        width={1600}
        height={1067}
        sizes="(max-width: 980px) 100vw, 920px"
        className={styles.img}
      />
    </figure>
  );
}
