import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { QuoteCta } from "@/components/ui/QuoteCta";
import { company, footerNav, legalNav } from "@/content/company";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* — Bande CTA — */}
      <div className={styles.ctaBand}>
        <Container className={styles.ctaInner}>
          <div className={styles.ctaText}>
            <p className={styles.ctaKicker}>Devis gratuit &amp; sans engagement</p>
            <p className={styles.ctaTitle}>Un projet ? Parlons-en.</p>
          </div>
          <div className={styles.ctaActions}>
            <QuoteCta size="lg" onDark label="Demander un devis" />
            <a href={company.phone.href} className={styles.ctaPhone}>
              <Phone size={18} aria-hidden />
              {company.phone.display}
            </a>
          </div>
        </Container>
      </div>

      {/* — Corps du footer — */}
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Logo tone="onDark" height={44} />
            <p className={styles.pitch}>{company.tagline}</p>

            <ul className={styles.contact}>
              <li>
                <MapPin size={16} aria-hidden />
                <span>{company.area}</span>
              </li>
              <li>
                <Phone size={16} aria-hidden />
                <a href={company.phone.href}>{company.phone.display}</a>
              </li>
              <li>
                <Mail size={16} aria-hidden />
                <a href={company.email.href}>{company.email.display}</a>
              </li>
            </ul>
          </div>

          <nav className={styles.columns} aria-label="Pied de page">
            {footerNav.map((col) => (
              <div key={col.title} className={styles.column}>
                <h3 className={styles.colTitle}>{col.title}</h3>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} {company.legalName}. Tous droits réservés.
          </p>
          <ul className={styles.legal}>
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
