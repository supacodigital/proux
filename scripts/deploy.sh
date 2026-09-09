#!/usr/bin/env bash
#
# Redéploiement de PROUX sur le VPS.
# À lancer depuis /var/www/proux-couverture.fr sur le serveur :
#
#     cd /var/www/proux-couverture.fr && ./scripts/deploy.sh
#
# Fait : récupère la dernière version de main, installe les dépendances,
# build, puis recharge le process PM2 sans coupure.

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

echo "✓ Déploiement terminé — $(date '+%Y-%m-%d %H:%M:%S')"
pm2 describe proux | grep -E "status|uptime|restarts" || true
