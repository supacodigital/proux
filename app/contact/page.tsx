import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { QuoteForm } from "@/components/blocks/QuoteForm";
import { company } from "@/content/company";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact & devis gratuit",
  description:
    "Demandez votre devis gratuit à PROUX : nettoyage de toiture, façades et peinture extérieure dans l’Ain et le Pays de Gex. Réponse sous 48 h.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Section aria-labelledby="contact-title">
      <div className={styles.layout}>
        <div className={styles.intro}>
          <p className={styles.kicker}>Contact</p>
          <h1 id="contact-title" className={styles.title}>
            Demandez votre devis gratuit
          </h1>
          <p className={styles.lead}>
            Décrivez votre projet en quelques lignes. On vous rappelle sous
            48 h pour convenir d’une visite et vous remettre un devis clair,
            sans engagement.
          </p>

          <ul className={styles.coords}>
            <li>
              <Phone size={18} aria-hidden />
              <a href={company.phone.href}>{company.phone.display}</a>
            </li>
            <li>
              <Mail size={18} aria-hidden />
              {/* TODO(client) : adresse e-mail réelle */}
              <a href={company.email.href}>{company.email.display}</a>
            </li>
            <li>
              <MapPin size={18} aria-hidden />
              {/* TODO(client) : adresse complète */}
              <span>
                {company.area} · Intervention dans l’Ain (01) & le Pays de Gex
              </span>
            </li>
          </ul>

          {/* TODO(client) : horaires d'ouverture + lien fiche Google Business */}
        </div>

        <div className={styles.formCol}>
          <QuoteForm />
        </div>
      </div>
    </Section>
  );
}
