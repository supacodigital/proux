import { Resend } from "resend";
import type { QuoteInput } from "./validation";

/* Ce module ne doit être importé que côté serveur (Server Actions). */

const FROM =
  process.env.QUOTE_FROM_EMAIL ?? "PROUX — Site <onboarding@resend.dev>";
const TO = process.env.QUOTE_TO_EMAIL ?? "contact@proux-couverture.fr";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/** true si l'envoi réel est configuré (sinon : mode dry-run). */
export const emailEnabled = resend !== null;

function esc(s: string) {
  return s.replace(/[<>&]/g, (c) =>
    c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;",
  );
}

/** Notification interne : nouvelle demande de devis pour l'artisan. */
export async function sendQuoteNotification(data: QuoteInput) {
  const lines: [string, string][] = [
    ["Nom", data.name],
    ["Téléphone", data.phone],
    ["E-mail", data.email],
    ["Commune / CP", data.location],
    ["Prestation", data.prestation],
    ["Message", data.message?.trim() || "—"],
  ];

  const text = lines.map(([k, v]) => `${k} : ${v}`).join("\n");
  const html = `
    <h2 style="margin:0 0 16px;font-family:system-ui,sans-serif">Nouvelle demande de devis</h2>
    <table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">
      ${lines
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 16px 6px 0;color:#6b7684;vertical-align:top">${k}</td><td style="padding:6px 0">${esc(
              v,
            ).replace(/\n/g, "<br>")}</td></tr>`,
        )
        .join("")}
    </table>`;

  if (!resend) {
    console.info("[quote] dry-run — RESEND_API_KEY absente. Demande :\n" + text);
    return { dryRun: true as const };
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: data.email,
    subject: `Devis — ${data.prestation} — ${data.location}`,
    text,
    html,
  });
  if (error) throw new Error(error.message);
  return { dryRun: false as const };
}

/** Accusé de réception envoyé au prospect. */
export async function sendQuoteAcknowledgement(data: QuoteInput) {
  const text = `Bonjour ${data.name},

Nous avons bien reçu votre demande de devis (${data.prestation} — ${data.location}).
Un artisan PROUX vous rappelle sous 48 h.

Pour toute urgence, vous pouvez nous joindre au 07 61 44 99 40.

À très vite,
PROUX — Peinture · Nettoyage · Toiture`;

  if (!resend) {
    console.info("[quote] dry-run — accusé de réception non envoyé.");
    return;
  }

  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: "Votre demande de devis — PROUX",
    text,
  });
}
