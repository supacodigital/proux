import type { NextConfig } from "next";

/* En-têtes de sécurité appliqués à toutes les réponses.
   Le site est 100 % auto-hébergé : polices via next/font, images locales,
   aucun script tiers, aucune analytics. Seule sortie réseau : l'API Resend
   (Server Action). D'où une CSP stricte. */
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  // Next injecte du CSS et du JS inline (hydratation, styled-jsx) → 'unsafe-inline'.
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://api.resend.com",
  "media-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // En-tête « x-powered-by » inutile : on l'enlève.
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    minimumCacheTTL: 31_536_000,
    // Le VPS est mono-process : chaque variante d'image non cachée coûte
    // 0,5–2,5 s de CPU (réencodage AVIF) au premier hit. On réduit le nombre
    // de tailles générables au strict nécessaire pour nos `sizes` réels
    // (100vw / 50vw / 40vw / 33vw sur des viewports jusqu'à ~1440 px + retina),
    // ce qui limite d'autant le travail à froid et le cache à pré-chauffer.
    deviceSizes: [360, 480, 720, 960, 1200, 1600, 1920],
    imageSizes: [200, 320, 480],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
      {
        // Cache long sur la vidéo/poster du hero (assets immuables).
        source: "/video/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
