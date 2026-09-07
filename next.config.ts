import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // En-tête « x-powered-by » inutile : on l'enlève.
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    minimumCacheTTL: 31_536_000,
  },

  // Cache long sur la vidéo/poster du hero (assets immuables).
  async headers() {
    return [
      {
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
