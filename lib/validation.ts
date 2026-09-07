import { z } from "zod";

/** Types de prestation proposés dans le select du formulaire (brief §8) */
export const PRESTATION_OPTIONS = [
  "Toiture",
  "Nettoyage façade / terrasse",
  "Peinture extérieure",
  "Plusieurs prestations",
  "Je ne sais pas encore",
] as const;

export const quoteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Indiquez votre nom.")
    .max(120, "Nom trop long."),
  phone: z
    .string()
    .trim()
    .min(6, "Indiquez un numéro de téléphone.")
    .max(30, "Numéro trop long.")
    .regex(
      /^[+0-9 ().-]{6,30}$/,
      "Numéro invalide (chiffres, espaces, + et - autorisés).",
    ),
  email: z
    .string()
    .trim()
    .min(1, "Indiquez votre e-mail.")
    .email("Adresse e-mail invalide.")
    .max(180),
  location: z
    .string()
    .trim()
    .min(2, "Indiquez votre commune ou votre code postal.")
    .max(120),
  prestation: z.enum(PRESTATION_OPTIONS, {
    message: "Choisissez un type de prestation.",
  }),
  message: z.string().trim().max(2000, "Message trop long.").optional(),
  consent: z
    .string()
    .optional()
    .refine((v) => v === "on" || v === "true", {
      message: "Vous devez accepter la politique de confidentialité.",
    }),

  // — Anti-spam (non affichés / masqués) —
  /** honeypot : doit rester vide */
  company: z.string().max(0).optional().or(z.literal("")),
  /** horodatage du rendu du formulaire (ms) — soumission trop rapide = bot */
  ts: z.string().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

/** Champs affichés à l'utilisateur (pour typer l'état d'erreurs côté client) */
export type QuoteFieldErrors = Partial<
  Record<
    "name" | "phone" | "email" | "location" | "prestation" | "message" | "consent",
    string
  >
>;
