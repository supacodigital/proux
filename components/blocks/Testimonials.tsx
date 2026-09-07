import { ArrowUpRight, Star } from "lucide-react";
import { company } from "@/content/company";
import { testimonials, type Testimonial } from "@/content/testimonials";
import styles from "./Testimonials.module.css";

/* Palette d'avatars façon Google (fond plein + initiale blanche) */
const AVATAR_COLORS = [
  "#1a73e8",
  "#d93025",
  "#188038",
  "#e37400",
  "#9334e6",
  "#12a4a4",
];

function avatarColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

/** Petit logo « G » Google, multicolore, en SVG inline. */
function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden focusable="false">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.15-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.85 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.89l3.67-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05L5.85 9.9C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className={styles.stars} aria-label={`${rating} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={15}
          strokeWidth={0}
          className={i < rating ? styles.starOn : styles.starOff}
        />
      ))}
    </span>
  );
}

function ReviewCard({ t }: { t: Testimonial }) {
  return (
    <article className={styles.card}>
      <header className={styles.cardHead}>
        <span
          className={styles.avatar}
          style={{ background: avatarColor(t.author) }}
          aria-hidden
        >
          {t.author.charAt(0)}
        </span>
        <div className={styles.who}>
          <p className={styles.name}>{t.author}</p>
          <p className={styles.source}>
            <GoogleG />
            Google
          </p>
        </div>
        <span className={styles.quoteMark} aria-hidden>
          &ldquo;
        </span>
      </header>

      <div className={styles.meta}>
        <Stars rating={t.rating} />
        <span className={styles.when}>· {t.when}</span>
        {t.isNew && <span className={styles.badgeNew}>Nouveau</span>}
      </div>

      <p className={styles.text}>{t.text}</p>
      <p className={styles.visited}>{t.visited}</p>
    </article>
  );
}

function ReviewTrack({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className={styles.group} aria-hidden={ariaHidden || undefined}>
      {testimonials.map((t) => (
        <ReviewCard key={t.author + t.visited} t={t} />
      ))}
    </div>
  );
}

/**
 * Section « Avis clients » (home, claude.md §7.1).
 * Bandeau d'avis Google qui défile en continu (ruban linéaire, pause au
 * survol / focus). Cartes au style proche de Google. Deux pistes
 * identiques pour une boucle sans couture ; figé sous prefers-reduced-motion.
 *
 * TODO(client) : URL de la fiche Google pour le bouton « Voir tous les avis ».
 */
export function Testimonials() {
  const reviewsHref = company.links.googleBusiness;
  const count = company.reviews.count;

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <p className={styles.kicker}>Avis clients</p>
        <h2 id="reviews-title" className={styles.title}>
          Ils nous ont fait confiance
        </h2>
        <div className={styles.summary}>
          <span className={styles.rating}>
            {company.reviews.rating.toLocaleString("fr-FR", {
              minimumFractionDigits: 1,
            })}
          </span>
          <Stars rating={Math.round(company.reviews.rating)} />
          <span className={styles.summaryText}>
            sur Google
            {count ? ` · ${count} avis` : ` · ${company.reviews.minCount}+ avis`}
          </span>
        </div>
      </div>

      <div className={styles.viewport}>
        <div className={styles.track}>
          <ReviewTrack />
          <ReviewTrack ariaHidden />
        </div>
      </div>

      {reviewsHref ? (
        <a
          href={reviewsHref}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.more}
        >
          Voir tous les avis sur Google
          <ArrowUpRight size={18} aria-hidden />
        </a>
      ) : (
        // TODO(client) : lien fiche Google manquant
        <p className={styles.moreTodo}>
          Lien vers la fiche Google à ajouter (company.links.googleBusiness)
        </p>
      )}
    </div>
  );
}
