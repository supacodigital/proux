import { MapPin } from "lucide-react";
import { company } from "@/content/company";
import styles from "./CoverageArea.module.css";

/**
 * Section « Zone d'intervention » (home) : liste les communes desservies
 * en badges, source unique `company.mainCities` (cf. claude.md §13).
 * Server Component statique — pas d'animation par item (29 badges, cf.
 * limite de stagger du brief §5).
 */
export function CoverageArea() {
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <p className={styles.kicker}>Zone d&apos;intervention</p>
        <h2 id="coverage-title" className={styles.title}>
          Ain &amp; Pays de Gex — {company.mainCities.length} communes desservies
        </h2>
        <p className={styles.intro}>{company.areaLong}</p>
      </div>

      <ul className={styles.list} aria-label="Communes desservies">
        {company.mainCities.map((city) => (
          <li key={city} className={styles.badge}>
            <MapPin size={14} aria-hidden strokeWidth={1.75} />
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}
