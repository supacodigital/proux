import type { LegalDocument } from "@/content/legal";
import styles from "./LegalDoc.module.css";

/**
 * Rendu d'une page légale (mentions légales, politique de confidentialité).
 * Colonne éditoriale étroite, titres de section, date de mise à jour.
 * Aucun script : composant serveur.
 */
export function LegalDoc({ doc, titleId }: { doc: LegalDocument; titleId: string }) {
  const updated = new Date(doc.updated).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className={styles.doc}>
      <header className={styles.head}>
        <h1 id={titleId} className={styles.title}>
          {doc.title}
        </h1>
        <p className={styles.updated}>Dernière mise à jour : {updated}</p>
        {doc.intro ? <p className={styles.intro}>{doc.intro}</p> : null}
      </header>

      {doc.blocks.map((block) => (
        <section key={block.heading} className={styles.block}>
          <h2 className={styles.heading}>{block.heading}</h2>
          {block.body?.map((para) => (
            <p key={para.slice(0, 32)} className={styles.para}>
              {para}
            </p>
          ))}
          {block.items ? (
            <ul className={styles.list}>
              {block.items.map((item) => (
                <li key={item.slice(0, 32)}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </article>
  );
}
