"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { submitQuote, type QuoteState } from "@/app/actions/quote";
import { PRESTATION_OPTIONS } from "@/lib/validation";
import { company } from "@/content/company";
import styles from "./QuoteForm.module.css";

const initialState: QuoteState = { status: "idle" };

type FieldProps = {
  label: string;
  error?: string;
  required?: boolean;
  children: (a11y: {
    id: string;
    "aria-invalid": boolean | undefined;
    "aria-describedby": string | undefined;
  }) => React.ReactNode;
};

function Field({ label, error, required, children }: FieldProps) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div className={styles.field} data-error={error ? "" : undefined}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errId : undefined,
      })}
      {error && (
        <p id={errId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.submit} disabled={pending}>
      {pending ? (
        <>
          <Loader2 size={18} className={styles.spinner} aria-hidden />
          Envoi…
        </>
      ) : (
        <>
          Envoyer ma demande
          <ArrowRight size={18} aria-hidden />
        </>
      )}
    </button>
  );
}

/**
 * Formulaire de demande de devis (brief §8).
 * Server Action + validation zod côté serveur, erreurs par champ,
 * état de succès inline, bouton loading, honeypot + horodatage anti-bot.
 */
export function QuoteForm() {
  const [state, formAction] = useActionState(submitQuote, initialState);
  const [ts, setTs] = useState("");
  const statusRef = useRef<HTMLParagraphElement>(null);
  const consentId = useId();

  useEffect(() => {
    setTs(String(Date.now()));
  }, []);

  useEffect(() => {
    if (state.status === "error") {
      statusRef.current?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successIcon} aria-hidden>
          <Check size={22} />
        </span>
        <p className={styles.successTitle}>
          {state.message ?? "Merci, on vous rappelle sous 48 h."}
        </p>
        <p className={styles.successHint}>
          Pour les plus pressés :{" "}
          <a href={company.phone.href}>{company.phone.display}</a>
        </p>
      </div>
    );
  }

  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form action={formAction} className={styles.form} noValidate>
      {state.status === "error" && state.message && (
        <p
          ref={statusRef}
          tabIndex={-1}
          className={styles.formError}
          role="alert"
        >
          {state.message}
        </p>
      )}

      <div className={styles.grid}>
        <Field label="Nom" error={e.name} required>
          {(a) => (
            <input
              {...a}
              type="text"
              name="name"
              autoComplete="name"
              defaultValue={v.name}
              className={styles.input}
              required
            />
          )}
        </Field>

        <Field label="Téléphone" error={e.phone} required>
          {(a) => (
            <input
              {...a}
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              defaultValue={v.phone}
              className={styles.input}
              required
            />
          )}
        </Field>

        <Field label="E-mail" error={e.email} required>
          {(a) => (
            <input
              {...a}
              type="email"
              name="email"
              autoComplete="email"
              defaultValue={v.email}
              className={styles.input}
              required
            />
          )}
        </Field>

        <Field
          label="Commune ou code postal"
          error={e.location}
          required
        >
          {(a) => (
            <input
              {...a}
              type="text"
              name="location"
              autoComplete="address-level2"
              defaultValue={v.location}
              className={styles.input}
              required
            />
          )}
        </Field>

        <Field label="Type de prestation" error={e.prestation} required>
          {(a) => (
            <select
              {...a}
              name="prestation"
              defaultValue={v.prestation ?? ""}
              className={styles.select}
              required
            >
              <option value="" disabled>
                Choisir…
              </option>
              {PRESTATION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>

      <Field label="Votre projet (surface, état, contexte)" error={e.message}>
        {(a) => (
          <textarea
            {...a}
            name="message"
            rows={4}
            defaultValue={v.message}
            className={styles.textarea}
          />
        )}
      </Field>

      <div
        className={styles.consent}
        data-error={e.consent ? "" : undefined}
      >
        <input
          type="checkbox"
          id={consentId}
          name="consent"
          className={styles.checkbox}
          aria-invalid={e.consent ? true : undefined}
          aria-describedby={e.consent ? `${consentId}-err` : undefined}
        />
        <label htmlFor={consentId} className={styles.consentLabel}>
          J’accepte que mes informations soient utilisées pour être
          recontacté(e) au sujet de ma demande.{" "}
          <a href="/politique-confidentialite">Politique de confidentialité</a>.
        </label>
        {e.consent && (
          <p id={`${consentId}-err`} className={styles.error}>
            {e.consent}
          </p>
        )}
      </div>

      {/* Anti-bot : honeypot (masqué) + horodatage */}
      <div className={styles.hp} aria-hidden>
        <label htmlFor="company-website">Ne pas remplir</label>
        <input
          id="company-website"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name="ts" value={ts} />

      <SubmitButton />

      <p className={styles.note}>
        Devis gratuit, sans engagement. Réponse sous 48 h.
      </p>
    </form>
  );
}
