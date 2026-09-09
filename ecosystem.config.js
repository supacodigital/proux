/**
 * Configuration PM2 — process du site PROUX sur le VPS.
 *
 * Le site tourne en Next.js « complet » (Server Actions du formulaire de devis,
 * next/image, en-têtes de sécurité de next.config.ts). Nginx fait un
 * reverse-proxy de proux-couverture.fr vers le port local ci-dessous.
 *
 * Démarrage initial :   pm2 start ecosystem.config.js && pm2 save
 * Redéploiement :        scripts/deploy.sh   (git pull + build + reload)
 *
 * Port 3100 : libre sur le VPS (sabai utilise 3000).
 * `next start` lit le port depuis la variable d'env PORT.
 */
module.exports = {
  apps: [
    {
      name: "proux",
      cwd: "/var/www/proux-couverture.fr",
      script: "pnpm",
      args: "start",
      interpreter: "none", // pnpm est un exécutable, pas un script node
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "400M",
      env: {
        NODE_ENV: "production",
        PORT: "3100",
        HOSTNAME: "127.0.0.1",
      },
      // Les secrets (RESEND_API_KEY, etc.) sont lus par Next depuis
      // /var/www/proux-couverture.fr/.env.local — non versionné.
    },
  ],
};
