# Déploiement — PROUX sur le VPS Hostinger

Site **Next.js 15** servi en mode « complet » (Server Actions du formulaire de
devis via Resend, `next/image`, en-têtes de sécurité de `next.config.ts`).

- **VPS** : Ubuntu 24.04, `145.223.34.3` (`srv1193148`)
- **Runtime** : Node 20 + PM2, process `proux` sur le port **3100**
- **Reverse-proxy** : Nginx → `127.0.0.1:3100`
- **Répertoire** : `/var/www/proux-couverture.fr`
- **Repo** : `https://github.com/supacodigital/proux` (branche `main`)

Même modèle que les autres sites Node du VPS (`sabai`, `kekosan`, `gex`).

---

## 1. Setup initial (une seule fois)

Sur le VPS, en `root` :

```bash
# ─ Cloner le repo ─
cd /var/www
git clone https://github.com/supacodigital/proux.git proux-couverture.fr
cd proux-couverture.fr

# ─ Variables d'environnement (NON versionnées) ─
cp .env.example .env.local
nano .env.local
#   RESEND_API_KEY=re_...              (clé Resend, cf. .env.local du poste de dev)
#   QUOTE_FROM_EMAIL="PROUX — Site <devis@proux-couverture.fr>"
#   QUOTE_TO_EMAIL=mproux.service@gmail.com

# ─ Dépendances + build ─
corepack enable            # active pnpm à la version du packageManager
pnpm install --frozen-lockfile
pnpm build

# ─ Démarrer sous PM2 ─
pm2 start ecosystem.config.js
pm2 save                   # persiste la liste des process (redémarre au boot)

# ─ Vérifier que ça répond en local ─
curl -sI http://127.0.0.1:3100 | head -5
```

## 2. Nginx + HTTPS

```bash
cp /var/www/proux-couverture.fr/deploy/nginx-proux-couverture.fr.conf \
   /etc/nginx/sites-available/proux-couverture.fr

ln -s /etc/nginx/sites-available/proux-couverture.fr /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Certificat Let's Encrypt (le DNS doit déjà pointer vers le VPS — cf. §3)
certbot --nginx -d proux-couverture.fr -d www.proux-couverture.fr
```

Le canonique est **www** (`content/company.ts` → `siteUrl`). Le fichier `.conf`
redirige déjà l'apex → www ; vérifier après Certbot que ce bloc n'a pas été cassé.

## 3. DNS

Le domaine est géré chez Hostinger. Enregistrement à corriger :

| Type | Nom | Avant | Après |
| ---- | --- | ----- | ----- |
| A    | `@` | `2.57.91.91` | `145.223.34.3` |
| CNAME| `www` | `proux-couverture.fr.` | (inchangé) |

Les enregistrements Resend (SPF / DKIM `resend._domainkey` / `_dmarc` / `send`)
restent tels quels — l'envoi d'e-mail en dépend.

TTL de l'enregistrement A : 50 s → propagation quasi immédiate.

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

### Mise à jour d'un secret

Éditer `/var/www/proux-couverture.fr/.env.local` puis
`pm2 restart proux --update-env`.
