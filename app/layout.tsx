import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: `${company.name} — Nettoyage de toiture, façades & peinture extérieure`,
    template: `%s — ${company.name}`,
  },
  description: company.tagline,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: company.name,
    title: `${company.name} — Nettoyage de toiture, façades & peinture extérieure`,
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
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        {/* overlay : le hero de la home est sombre, header transparent au repos */}
        <Header overlay />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
