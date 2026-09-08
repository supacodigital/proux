import { featuredProjects } from "@/content/projects";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import styles from "./FeaturedWork.module.css";

/**
 * Section « Avant / Après vedette » (home, claude.md §7.1).
 * La transformation EST le message : 3 comparateurs plein cadre,
 * légende sobre.
 */
export function FeaturedWork() {
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <p className={styles.kicker}>Avant / Après</p>
        <h2 id="featured-title" className={styles.title}>
          La différence se voit tout de suite
        </h2>
        <p className={styles.intro}>
          Des chantiers réels dans l’Ain et le Pays de Gex. Glissez le curseur
          pour comparer.
        </p>
      </div>

      <ul className={styles.list}>
        {featuredProjects.map((project, i) => (
          <li key={project.slug} className={styles.item}>
            <BeforeAfterSlider
              before={project.before}
              after={project.after}
              alt={project.alt}
              priority={i === 0}
            />
            <div className={styles.caption}>
              <h3 className={styles.captionTitle}>{project.title}</h3>
              <p className={styles.captionMeta}>
                <span className={styles.pole} data-pole={project.pole}>
                  {project.pole}
                </span>
                {project.location} · {project.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
