#!/usr/bin/env bash
#
# Pré-chauffage du cache d'images optimisées.
#
# `pnpm build` vide .next/cache : à froid, la 1re demande de chaque variante
# d'image passe par l'optimiseur Next (réencodage AVIF, 0,5–2,5 s sur le VPS).
# Sur la home + les pages pôle, ça fait plusieurs secondes de cascade pour le
# tout premier visiteur après un déploiement.
#
# Ce script, lancé en fin de `deploy.sh`, visite les pages principales et,
# pour chaque IMAGE distincte de leur HTML, chauffe UNE seule variante : la
# plus grande taille « réaliste » (≤ 1600 px, cas écran desktop retina). C'est
# ce qui pèse sur le LCP. Les petites variantes mobiles se régénèrent vite et
# ne bloquent pas le rendu.
#
# Chauffé en AVIF + WebP (Next renvoie Vary: Accept) → cache Next ET
# proxy_cache Nginx remplis.
#
# Idempotent, que des GET. Relançable à la main :
#   ./scripts/warm-cache.sh
#   BASE=http://127.0.0.1:3100 ./scripts/warm-cache.sh   # sans passer par Nginx

set -euo pipefail

BASE="${BASE:-https://www.proux-couverture.fr}"

PAGES=(
  "/"
  "/toiture"
  "/couverture"
  "/nettoyage"
  "/peinture"
  "/a-propos"
  "/contact"
)

ACCEPTS=(
  "image/avif,image/webp,image/*,*/*"
  "image/webp,image/*,*/*"
)

echo "▸ Pré-chauffage du cache images — base $BASE"

# 1. Toutes les URLs /_next/image du HTML des pages.
raw="$(
  for page in "${PAGES[@]}"; do
    curl -fsS --max-time 15 "$BASE$page" 2>/dev/null || true
  done \
    | grep -oE '/_next/image\?[^"'"'"' ]+' \
    | sed 's/&amp;/\&/g'
)"

if [ -z "$raw" ]; then
  echo "  ⚠ aucune URL /_next/image trouvée — le site répond-il ? (pré-chauffage ignoré)"
  exit 0
fi

# 2. Pour chaque couple (image source, qualité), ne garder que la plus grande
#    largeur ≤ 1600. Clé = url+q sans le w= ; on trie par w décroissant.
targets="$(
  echo "$raw" \
    | awk -F'[?&]' '
        {
          url=""; q=""; w=""
          for (i = 1; i <= NF; i++) {
            if ($i ~ /^url=/) url = $i
            else if ($i ~ /^q=/) q = $i
            else if ($i ~ /^w=/) w = substr($i, 3) + 0
          }
          if (url == "" || w == 0 || w > 1600) next
          key = url "|" q
          if (w > best[key]) { best[key] = w }
        }
        END {
          for (key in best) {
            split(key, a, "|")
            print "/_next/image?" a[1] "&w=" best[key] "&" a[2]
          }
        }
      ' \
    | sort -u
)"

count="$(echo "$targets" | wc -l | tr -d ' ')"
echo "  $count images distinctes à chauffer (× ${#ACCEPTS[@]} formats)"

ok=0
fail=0
while IFS= read -r rel; do
  [ -z "$rel" ] && continue
  for accept in "${ACCEPTS[@]}"; do
    if curl -fsS --max-time 30 -o /dev/null -H "Accept: $accept" "$BASE$rel"; then
      ok=$((ok + 1))
    else
      fail=$((fail + 1))
    fi
  done
done <<< "$targets"

echo "✓ Pré-chauffage terminé — $ok OK, $fail échecs"
