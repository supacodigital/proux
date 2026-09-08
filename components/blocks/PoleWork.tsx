import { ArrowRight } from "lucide-react";
import { NavLink } from "@/components/ui/NavLink";
import { projects, type ProjectPole } from "@/content/projects";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import styles from "./PoleWork.module.css";

/**
 * Avant / après filtrés sur un pôle (§7.2).
 * Ne rend rien si aucun chantier n'est disponible pour ce pôle
 * (choix produit : afficher si dispo, masquer sinon).
 */
export function PoleWork({
  pole,
  poleLabel,
}: {
  pole: ProjectPole;
  poleLabel: string;
}) {
  const items = projects.filter((p) => p.pole === pole);
  if (items.length === 0) return null;

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <p className={styles.kicker}>Avant / Après</p>
        <h2 id="pole-work-title" className={styles.title}>
          Nos chantiers {poleLabel.toLowerCase()}
        </h2>
        <p className={styles.intro}>
          Des interventions réelles dans l’Ain et le Pays de Gex. Glissez le
          curseur pour comparer.
        </p>
      </div>

      <ul className={styles.list}>
        {items.map((project) => (
          <li key={project.slug} className={styles.item}>
            <BeforeAfterSlider
              before={project.before}
              after={project.after}
              alt={project.alt}
            />
            <div className={styles.caption}>
              <h3 className={styles.captionTitle}>{project.title}</h3>
              <p className={styles.captionMeta}>
                {project.location} · {project.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <NavLink href="/realisations" className={styles.more}>
        Voir toutes nos réalisations
        <ArrowRight size={18} aria-hidden />
      </NavLink>
    </div>
  );
}
