# Déploiement — PROUX sur le VPS Hostinger

Site **Next.js 15** servi en mode « complet » (Server Actions du formulaire de
devis via Resend, `next/image`, en-têtes de sécurité de `next.config.ts`).

- **En prod** : https://www.proux-couverture.fr — déployé le 2026-09-09
- **VPS** : Ubuntu 24.04, `145.223.34.3` (`srv1193148`), accès SSH `root`
- **Runtime** : Node 20 + **pnpm 9** + PM2, process `proux` sur le port **3100**
- **Reverse-proxy** : Nginx → `127.0.0.1:3100`, HTTPS Let's Encrypt (renouv. auto)
- **Répertoire** : `/var/www/proux-couverture.fr`
- **Repo** : `https://github.com/supacodigital/proux` (branche `main`)

Même modèle que les autres sites Node du VPS (`sabai`, `kekosan`, `gex`).

> **pnpm 9, pas 11.** Le VPS tourne Node 20 ; pnpm 10/11 exigent Node ≥ 22.13.
> Le repo n'a **pas** de champ `packageManager` (il forçait pnpm 11 → crash).
> pnpm 9 est installé en global via `npm i -g pnpm@9`. `corepack` est désactivé
> sur le VPS (il re-téléchargeait pnpm 11). Le réglage `unrs-resolver` (build
> autorisé) est porté par `package.json` › `pnpm.onlyBuiltDependencies` pour
> pnpm 9 **et** `pnpm-workspace.yaml` › `allowBuilds` pour le poste de dev (pnpm 11).

---

## 1. Setup initial — DÉJÀ FAIT (2026-09-09)

Pour référence / reconstruction. Sur le VPS, en `root` :

```bash
# ─ pnpm 9 (une fois pour le VPS entier) ─
corepack disable
npm install -g pnpm@9

# ─ Cloner le repo ─
cd /var/www
git clone https://github.com/supacodigital/proux.git proux-couverture.fr
cd proux-couverture.fr

# ─ Variables d'environnement (NON versionnées) ─
cat > .env.local <<'EOF'
RESEND_API_KEY=re_...            # cf. .env.local du poste de dev
QUOTE_FROM_EMAIL="PROUX — Site <devis@proux-couverture.fr>"
QUOTE_TO_EMAIL=mproux.service@gmail.com
EOF

# ─ Dépendances + build ─
pnpm install --frozen-lockfile
pnpm build

# ─ Démarrer sous PM2 ─
pm2 start ecosystem.config.js
pm2 save                   # persiste la liste (survit au reboot via pm2-root.service)

curl -sI http://127.0.0.1:3100 | head -5   # doit répondre 200
```

## 2. Nginx + HTTPS — DÉJÀ FAIT

```bash
cp /var/www/proux-couverture.fr/deploy/nginx-proux-couverture.fr.conf \
   /etc/nginx/sites-available/proux-couverture.fr
ln -s /etc/nginx/sites-available/proux-couverture.fr /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Certbot (le DNS doit déjà pointer vers le VPS)
certbot --nginx -d proux-couverture.fr -d www.proux-couverture.fr \
        --non-interactive --agree-tos -m supaco.digital@gmail.com --redirect
```

Canonique = **www** (`content/company.ts` › `siteUrl`). Redirections en place :
`http://*` → HTTPS, `https://proux-couverture.fr` → `https://www.proux-couverture.fr`.

### 2 bis. Perfs images — MISE À JOUR (2026-09-10)

La conf Nginx a évolué pour régler la lenteur des images au **premier
chargement** après un déploiement (à froid, `next/image` réencode chaque
variante AVIF en 0,5–2,5 s sur le VPS mono-process).

Trois changements, à appliquer **une fois** sur le VPS :

```bash
# a) Créer le dossier du cache disque des images optimisées
mkdir -p /var/cache/nginx/proux-img
chown -R www-data:www-data /var/cache/nginx/proux-img

# b) Poser la nouvelle conf (récupère aussi les blocs `alias` pour servir
#    /_next/static et /video directement depuis le disque)
cp /var/www/proux-couverture.fr/deploy/nginx-proux-couverture.fr.conf \
   /etc/nginx/sites-available/proux-couverture.fr

# c) Vérifier que Certbot n'a pas de conflit puis recharger
nginx -t && systemctl reload nginx
```

> Si `nginx -t` râle sur un `server` 443 dupliqué : Certbot a réécrit le
> fichier lors du `--redirect` initial. Rouvrir
> `/etc/nginx/sites-available/proux-couverture.fr`, reporter à la main les
> nouveaux `location` (`/_next/image` avec `proxy_cache`, `/_next/static` et
> `/video` en `alias`) dans le `server { listen 443 ssl; server_name www... }`
> généré par Certbot, garder le `proxy_cache_path` en tête de fichier.

Effets :
- `/_next/image` → **cache disque Nginx** (`X-Img-Cache: HIT`), survit aux
  `pnpm build` (qui vident `.next/cache`) et aux `pm2 reload`.
- `/_next/static` et `/video` → servis par Nginx (`sendfile`), plus par le
  process Node.
- `deploy.sh` lance `scripts/warm-cache.sh` en fin de course : pré-génère les
  ~38 images des pages principales pour que le 1er visiteur ne paie rien.

Vérif après coup :
```bash
curl -sI -H 'Accept: image/avif' \
  'https://www.proux-couverture.fr/_next/image?url=%2Fimg%2Fservices%2Ftoiture-cards.jpg&w=1200&q=75' \
  | grep -i x-img-cache            # → HIT au 2e appel
```

## 3. DNS — DÉJÀ FAIT

Géré chez Hostinger (zone DNS). État actuel :

| Type | Nom | Valeur | TTL |
| ---- | --- | ------ | --- |
| A    | `@` | `145.223.34.3` (le VPS) | 300 |
| CNAME| `www` | `proux-couverture.fr.` | 300 |

Enregistrements Resend (SPF / DKIM `resend._domainkey` / `_dmarc` / `send`) :
**ne pas toucher**, l'envoi d'e-mail du formulaire en dépend.

> Ancien domaine `nettoyage-toiture-01.fr` → 301 vers le nouveau : **à faire**
> (côté client / registrar de l'ancien domaine).

## 4. Redéploiements

```bash
cd /var/www/proux-couverture.fr && ./scripts/deploy.sh
```

Le script fait : `git fetch` + `reset --hard origin/main` → `pnpm install`
→ `pnpm build` → `pm2 reload proux` (sans coupure).

> `reset --hard` écrase toute modif locale sur le VPS. C'est voulu : la seule
> source de vérité est `main`. Ne jamais éditer le code directement sur le VPS.

## 5. Exploitation

```bash
pm2 logs proux              # logs en direct
pm2 describe proux          # état, RAM, redémarrages
pm2 restart proux           # redémarrage sec
tail -f /var/log/nginx/proux-error.log
```

Redémarrage au boot : `pm2-root.service` (systemd, déjà `enabled`) relit
`/root/.pm2/dump.pm2`. Après tout changement de la liste des process : `pm2 save`.

### Mise à jour d'un secret

Éditer `/var/www/proux-couverture.fr/.env.local` puis
`pm2 restart proux --update-env`.

## 6. Reste à faire

- [ ] 301 de `nettoyage-toiture-01.fr` → `https://www.proux-couverture.fr`
      (côté ancien domaine — voir avec le client / son registrar).
- [ ] Boîte `contact@proux-couverture.fr` (le formulaire envoie déjà depuis
      `devis@…`, vérifié dans Resend).
- [ ] `next start` est lancé via `pnpm start` (fork). Acceptable ; si un jour on
      veut que PM2 surveille directement le process Next :
      `script: "node_modules/next/dist/bin/next", args: "start"` dans
      `ecosystem.config.js` (chemin réel du bin après `pnpm install`).
