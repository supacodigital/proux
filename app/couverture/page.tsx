import type { Metadata } from "next";
import { PolePage } from "@/components/blocks/PolePage";
import { getPole } from "@/content/services";

const pole = getPole("couverture");

export const metadata: Metadata = {
  title: pole.metaTitle,
  description: pole.metaDescription,
  alternates: { canonical: pole.href },
  openGraph: {
    title: `${pole.metaTitle} — PROUX`,
    description: pole.metaDescription,
    url: pole.href,
  },
};

export default function CouverturePage() {
  return <PolePage poleKey="couverture" />;
}
