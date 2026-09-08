import type { MethodNote as MethodNoteData } from "@/content/services";
import styles from "./MethodNote.module.css";

/**
 * Encadré « méthode » d'une page pôle (§7.2) — ex. traitement
 * hydrofuge pour la toiture, préparation avant peinture.
 */
export function MethodNote({ note }: { note: MethodNoteData }) {
  return (
    <aside className={styles.note} aria-label={note.title}>
      <div className={styles.head}>
        <p className={styles.kicker}>Notre méthode</p>
        <h2 className={styles.title}>{note.title}</h2>
        <p className={styles.body}>{note.body}</p>
      </div>

      <ol className={styles.steps}>
        {note.points.map((point, i) => (
          <li key={point} className={styles.step}>
            <span className={styles.num} aria-hidden>
              {i + 1}
            </span>
            <span className={styles.stepText}>{point}</span>
          </li>
        ))}
      </ol>
    </aside>
  );
}
