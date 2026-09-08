import Image from "next/image";
import { about } from "@/content/about";
import styles from "./AboutStory.module.css";

/**
 * En-tête de la page « Notre histoire » (§7.5) : titre, accroche, le
 * texte de l'histoire et une photo de l'artisan au travail.
 * Pas de hero plein écran : la page est plus posée que les pages pôle.
 */
export function AboutStory() {
  return (
    <div className={styles.wrap}>
      <div className={styles.intro}>
        <p className={styles.kicker}>{about.kicker}</p>
        <h1 id="about-title" className={styles.title}>
          {about.title}
        </h1>
        <p className={styles.lead}>{about.lead}</p>
      </div>

      <div className={styles.body}>
        <div className={styles.text}>
          {about.story.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>

        <figure className={styles.media}>
          <Image
            src={about.storyImage}
            alt={about.storyImageAlt}
            fill
            sizes="(max-width: 900px) 100vw, 40vw"
            className={styles.img}
          />
        </figure>
      </div>
    </div>
  );
}
