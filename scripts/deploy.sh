#!/usr/bin/env bash
#
# Redéploiement de PROUX sur le VPS.
# À lancer depuis /var/www/proux-couverture.fr sur le serveur :
#
#     cd /var/www/proux-couverture.fr && ./scripts/deploy.sh
#
# Fait : récupère la dernière version de main, installe les dépendances,
# build, recharge le process PM2 sans coupure, puis pré-chauffe le cache
# d'images (sinon le 1er visiteur après déploiement attend le réencodage AVIF).

set -euo pipefail

APP_DIR="/var/www/proux-couverture.fr"
BRANCH="main"

cd "$APP_DIR"

echo "▸ git fetch + reset sur origin/$BRANCH"
git fetch --prune origin
git reset --hard "origin/$BRANCH"

echo "▸ pnpm install (frozen lockfile)"
pnpm install --frozen-lockfile --prod=false

echo "▸ pnpm build"
pnpm build

echo "▸ pm2 reload proux"
if pm2 describe proux > /dev/null 2>&1; then
  pm2 reload proux --update-env
else
  pm2 start ecosystem.config.js
  pm2 save
fi

echo "▸ pré-chauffage du cache images"
# Laisse le process finir de démarrer avant de le solliciter.
sleep 3
# Via l'URL publique : chauffe le cache Next ET le proxy_cache Nginx d'un coup.
./scripts/warm-cache.sh || \
  echo "  ⚠ pré-chauffage non concluant — le site fonctionne, les images se"\
       "généreront à la 1re visite. Relancer : ./scripts/warm-cache.sh"

echo "✓ Déploiement terminé — $(date '+%Y-%m-%d %H:%M:%S')"
pm2 describe proux | grep -E "status|uptime|restarts" || true
