import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema } from "@/components/seo/schema";
import { company } from "@/content/company";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-inter-tight",
});

const TITLE = `${company.name} — Nettoyage de toiture, façades & peinture extérieure`;

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: TITLE,
    template: `%s — ${company.name}`,
  },
  description: company.tagline,
  alternates: { canonical: "/" },
  // L'image de partage (og:image / twitter:image) est générée à partir de
  // `app/opengraph-image.png` (logo PROUX sur fond marine) — Next la câble
  // automatiquement, ici on ne met que le texte.
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: company.name,
    url: "/",
    title: TITLE,
    description: company.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: company.tagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${interTight.variable}`}>
      <body>
        <JsonLd data={localBusinessSchema()} />
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        {/* Le Header gère lui-même l'overlay : transparent sur la home
            (hero sombre), solide sur les autres pages. */}
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
