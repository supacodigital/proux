"use server";

import { quoteSchema, type QuoteFieldErrors } from "@/lib/validation";
import { sendQuoteAcknowledgement, sendQuoteNotification } from "@/lib/email";

export type QuoteState = {
  status: "idle" | "success" | "error";
  /** message global (succès ou erreur générale) */
  message?: string;
  /** erreurs par champ */
  errors?: QuoteFieldErrors;
  /** valeurs à réafficher en cas d'erreur */
  values?: Record<string, string>;
};

/** Délai minimal (ms) entre le rendu du formulaire et la soumission. */
const MIN_FILL_MS = 2500;

export async function submitQuote(
  _prev: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    location: String(formData.get("location") ?? ""),
    prestation: String(formData.get("prestation") ?? ""),
    message: String(formData.get("message") ?? ""),
    consent: formData.get("consent") ? "on" : undefined,
    company: String(formData.get("company") ?? ""),
    ts: String(formData.get("ts") ?? ""),
  };

  const parsed = quoteSchema.safeParse(raw);

  // Valeurs à réafficher (jamais le honeypot)
  const values = {
    name: raw.name,
    phone: raw.phone,
    email: raw.email,
    location: raw.location,
    prestation: raw.prestation,
    message: raw.message,
  };

  if (!parsed.success) {
    const errors: QuoteFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in errors)) {
        (errors as Record<string, string>)[key] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Merci de corriger les champs indiqués.",
      errors,
      values,
    };
  }

  const data = parsed.data;

  // Anti-bot : honeypot rempli OU soumission quasi instantanée → on fait
  // semblant d'accepter (pas d'indice pour le bot), sans rien envoyer.
  const elapsed = Number(data.ts) ? Date.now() - Number(data.ts) : MIN_FILL_MS;
  if ((data.company && data.company.length > 0) || elapsed < MIN_FILL_MS) {
    return {
      status: "success",
      message: "Merci, votre demande a bien été envoyée.",
    };
  }

  try {
    await sendQuoteNotification(data);
    // L'accusé de réception ne doit pas faire échouer la demande.
    void sendQuoteAcknowledgement(data).catch(() => {});
  } catch (err) {
    console.error("[quote] échec d'envoi :", err);
    return {
      status: "error",
      message:
        "L’envoi a échoué. Réessayez, ou appelez-nous directement au 07 61 44 99 40.",
      values,
    };
  }

  return {
    status: "success",
    message: "Merci, on vous rappelle sous 48 h.",
  };
}
