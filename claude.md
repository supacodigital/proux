# PROUX — Site vitrine (refonte complète)

> Brief de référence pour la construction du nouveau site de **PROUX**, artisan
> nettoyage de toiture, façades et peinture extérieure, département de l'Ain (01)
> et bassin franco-genevois.
> Ce fichier fait autorité sur l'architecture, la direction artistique, le contenu
> et le SEO. En cas de doute pendant le build, s'y référer plutôt qu'improviser.

---

## 1. Contexte & objectif

### Le point de départ
Le site actuel — `https://www.nettoyage-toiture-01.fr/` — fonctionne pour le SEO
local (300+ pages communes) mais n'a **aucune image de marque** : template
générique, hiérarchie confuse, prestations listées en vrac sans que le prospect
comprenne d'un coup d'œil ce que l'artisan sait faire.

### Ce qu'on construit
Un **site vitrine neuf**, avec un vrai branding « PROUX », qui :

1. **Installe la marque** — un fond blanc, un bleu marine de confiance, du noir,
   repris du logo. Une identité premium-artisan, rassurante, soignée.
2. **Rend l'offre lisible en 5 secondes** — beaucoup de prestations, regroupées
   sous les **3 pôles du logo** : `TOITURE` · `NETTOYAGE` · `PEINTURE`.
3. **Prouve par l'image** — les chantiers réels (avant/après spectaculaires de
   démoussage) sont le cœur de l'argumentaire, pas un ajout.
4. **Convertit** — un seul objectif : obtenir une demande de devis gratuit
   (formulaire + appel). CTA présent partout, sans être agressif.
5. **Conserve le SEO local** — pages par commune générées par template propre,
   contenu variabilisé (pas de duplicate content grossier).

### Public cible
Propriétaires de maisons individuelles, 40-70 ans, dans l'Ain et à la frontière
suisse. Ils cherchent « nettoyage toiture + [leur ville] » sur mobile, comparent
2-3 artisans, veulent être rassurés (sérieux, assurance, propreté du travail,
devis clair) avant d'appeler.

---

## 2. L'entreprise

| Donnée | Valeur | Note |
| --- | --- | --- |
| Nom commercial | **PROUX** | Le logo dit « PROUX ». Ancienne raison sociale « ETS PROUX Nettoyage » — à confirmer avec le client, utiliser « PROUX » partout dans l'UI. |
| Baseline | **Peinture · Nettoyage · Toiture** | Reprise du logo. Ordre à l'affichage : on peut réordonner en « Toiture · Nettoyage · Peinture » selon le poids commercial — à trancher avec le client. |
| Métier | Nettoyage / démoussage de toiture, traitement hydrofuge, nettoyage façades & extérieurs, peinture extérieure, petite réfection toiture | |
| Zone | Département de l'Ain (01) + bassin franco-genevois / Pays de Gex / frontière suisse | Photos de chantiers : maisons type savoyard, vue sur montagnes → zone Gex / Bellegarde / Saint-Genis. |
| Téléphone | `04 82 29 73 21` | **À reconfirmer avec le client** avant mise en ligne. Peut-être aussi un portable. |
| Email | _à obtenir_ | Placeholder `contact@proux.fr` en dev, `TODO` visible. |
| Adresse | _à obtenir_ | Nécessaire pour le SEO local + fiche Google Business + mentions légales. |
| SIRET | _à obtenir_ | Mentions légales. |
| Assurance décennale | _à obtenir (assureur + n°)_ | **Argument de vente majeur** — à mettre en avant dès qu'on l'a. |
| Disponibilité | Intervention rapide, urgences | L'ancien site annonçait « 24h/24 7j/7 en cas d'urgence » — à nuancer, garder « devis sous 48 h » et « intervention rapide ». |
| Devis | Gratuit, sans engagement, déplacement inclus | |

> ⚠️ **Bloc « infos à obtenir du client » à traiter avant mise en production.**
> Tant que ces champs sont vides, laisser des `TODO:` visibles dans le code
> (commentaires) et des valeurs neutres à l'écran — jamais de fausse donnée
> (faux numéro, fausse adresse, faux avis, faux label RGE/Qualibat).

---

## 3. Prestations — architecture en 3 pôles

Chaque pôle = **une page** (`/toiture`, `/nettoyage`, `/peinture`), avec ses
sous-prestations en sections ancrées. Sur la home, 3 grandes cartes.

### Pôle 1 — TOITURE
- **Démoussage de toiture** (prestation phare) — brossage + traitement anti-mousse, produits respectueux, sans haute pression destructrice sur tuiles fragiles.
- **Traitement hydrofuge** — hydrofuge incolore ou coloré (teinte ravivée), protection longue durée contre l'eau et la reprise de mousse.
- **Nettoyage basse/haute pression** — selon type de couverture (tuile terre cuite, béton, ardoise).
- **Réfection de faîtage** — faîtage à sec ou scellé, remplacement des tuiles faîtières.
- **Remplacement de tuiles cassées / réparation ponctuelle.**
- **Solins & abergements** — réfection des solins zinc/mortier autour des souches de cheminée, raccords d'étanchéité.
- **Réparation & rejointoiement de souche de cheminée** — enduit, étanchéité, remise en état.
- **Ramonage / nettoyage de conduit** — _à confirmer que le client le propose réellement (activité réglementée)._
- **Nettoyage de gouttières & descentes.**

### Pôle 2 — NETTOYAGE (extérieurs)
- **Nettoyage de façade** — enduit, crépi ; traitement anti-mousse et algues.
- **Nettoyage de terrasse & dallage** — pierre, béton désactivé, dalles gravillonnées.
- **Traitement hydrofuge de terrasse / sol** — protège et facilite l'entretien.
- **Nettoyage de murets, murs de clôture, escaliers extérieurs.**
- **Nettoyage de terrasse bois + saturateur / dégrisage** — redonne la teinte d'origine au bois.
- **Nettoyage aux abords de piscine / plage de piscine** — _à confirmer avec le client._
- **Nettoyage de cour, allée, parking.**

### Pôle 3 — PEINTURE (extérieure)
- **Peinture de façade** — mise en peinture, ravalement léger, application d'un revêtement de façade.
- **Peinture de sous-face de toit, rives, planches de rive, débords.**
- **Peinture & traitement de boiseries extérieures** — volets, bardage, avant-toits, pergolas, balustrades bois.
- **Peinture de souche de cheminée, éléments maçonnés.**
- **Peinture de portail, ferronnerie, garde-corps** — _à confirmer._
- **Lasure / saturateur sur bois extérieur.**

> **Règle de contenu :** chaque sous-prestation a au minimum un titre, 2-3 phrases
> qui expliquent *le problème du client* → *ce que PROUX fait* → *le résultat*,
> et une photo de chantier associée. Pas de jargon sans traduction.
> Marquer `TODO:` toute prestation non confirmée par le client, ne pas la publier
> tant qu'elle n'est pas validée.

---

## 4. Direction artistique

### 4.1 Principe directeur
**Artisan premium / confiance.** Fond blanc dominant, respiration généreuse,
photos plein cadre, avant/après en vedette. Bleu marine profond pour l'autorité,
un bleu accent plus vif pour les actions. Rien de « BTP agressif », rien de
« agence froide » : c'est solide, honnête, haut de gamme sans en faire trop.

Chaque détail invisible compte et s'additionne. On soigne le hover d'un bouton
comme le H1 de la home.

### 4.2 Couleurs

Design tokens en **variables CSS** dans `styles/tokens.css`. Palette dérivée du
logo (bleu marine + accents). Valeurs de départ (à ajuster à l'œil une fois le
logo vectorisé et la teinte exacte prélevée) :

```css
:root {
  /* — Fond & surfaces — */
  --color-bg:            #ffffff;   /* fond principal */
  --color-surface:       #f6f8fb;   /* sections alternées, cartes */
  --color-surface-2:     #eef2f7;   /* hover de carte, séparateurs doux */

  /* — Marque — */
  --color-navy:          #0f2a47;   /* bleu marine du logo — titres, header, footer */
  --color-navy-700:      #163a5f;
  --color-ink:           #0c1116;   /* "noir" du texte courant — pas de #000 pur */
  --color-ink-soft:      #3d4753;   /* texte secondaire */

  /* — Accent (actions) — */
  --color-accent:        #1f6feb;   /* bleu vif — CTA, liens, focus */
  --color-accent-hover:  #1a5fd0;
  --color-accent-soft:   #e8f0fe;   /* fond de badge, surbrillance */

  /* — Fonctionnels — */
  --color-success:       #1a7f4b;
  --color-border:        #dbe3ec;
  --color-shadow:        213 40% 12%;  /* teinte HSL réutilisée dans les ombres */
}
```

Règles :
- **Le blanc domine.** L'accent bleu est rare et précieux : CTA principaux,
  liens, état focus, un chiffre-clé. Si tout est bleu, plus rien ne ressort.
- **Jamais de `#000` pur** pour le texte — `--color-ink`.
- Le marine sert aux zones d'ancrage (header au scroll, footer, gros titres,
  bandeaux de section sombres) ; l'accent sert à *agir*.
- Contraste AA minimum partout (texte courant ≥ 4.5:1).

### 4.3 Typographie

Deux familles, chargées en `next/font` (auto-host, pas de requête Google à
l'exécution) :

| Rôle | Police | Détail |
| --- | --- | --- |
| Display / titres | **`Söhne`-like** au choix : `Geist`, `Inter Tight`, ou `Hanken Grotesk` | Grotesque solide, un peu de caractère. Poids 500-600. Tracking légèrement négatif sur les gros titres (`letter-spacing: -0.02em`). |
| Texte courant / UI | **`Inter`** (ou `Geist`) | 400 / 500. `line-height` 1.6 sur les paragraphes. |

- Pas plus de 2 familles. Pas de police fantaisie.
- Échelle typographique (rem), ratio ~1.25 :
  `--text-xs:.8125 · --text-sm:.9375 · --text-base:1 · --text-lg:1.125 ·
  --text-xl:1.375 · --text-2xl:1.75 · --text-3xl:2.25 · --text-4xl:3 ·
  --text-5xl:3.75` (clamp() pour le responsive sur les 3 plus grands).
- H1 home : gros, calme, une promesse simple. Ex. « Votre toiture retrouve son
  éclat. » — pas un slogan sur-vendu.

### 4.4 Espacement, rayons, ombres

```css
:root {
  --space-1:.25rem; --space-2:.5rem;  --space-3:.75rem; --space-4:1rem;
  --space-6:1.5rem; --space-8:2rem;   --space-12:3rem;  --space-16:4rem;
  --space-24:6rem;  --space-32:8rem;

  --radius-sm:.375rem;
  --radius:.625rem;      /* cartes, inputs, boutons */
  --radius-lg:1rem;      /* grandes surfaces, images */
  --radius-full:999px;

  --shadow-sm:  0 1px 2px hsl(var(--color-shadow) / .06);
  --shadow:     0 4px 16px -4px hsl(var(--color-shadow) / .10);
  --shadow-lg:  0 12px 40px -8px hsl(var(--color-shadow) / .16);
}
```

- **Sections larges** : `--space-24` à `--space-32` de padding vertical desktop,
  `--space-16` mobile. Le vide fait partie du design.
- **Coins légèrement arrondis** (`--radius`), jamais d'angles vifs partout.
- **Ombres douces et basses**, jamais de drop-shadow dur. Les cartes reposent sur
  la page, elles ne flottent pas à 2 cm.
- Container principal : `max-width: 1200px`, gouttières `--space-6` mobile /
  `--space-8` desktop.
- Grille de contenu éditorial : `max-width: 68ch` pour les blocs de texte.

### 4.5 Photographie (le plus important)

Les photos de chantier **sont** l'argument. Traitement :

- **Plein cadre**, bord à bord ou dans un conteneur `--radius-lg`. Jamais de
  vignette timbre-poste.
- **Avant / Après** : composant dédié (voir §6). Slider au drag sur desktop,
  deux images empilées + label sur mobile. C'est le hero de la preuve.
- Uniformiser : recadrage 3:2 ou 4:3 cohérent, léger étalonnage pour une
  colorimétrie homogène (les photos brutes iPhone varient beaucoup).
- Toutes servies via `next/image`, formats AVIF/WebP, `sizes` correct,
  `priority` uniquement sur l'image du hero.
- `alt` descriptif et localisé quand c'est pertinent (« Démoussage d'une toiture
  en tuile béton à Gex — après traitement »).
- Les fichiers `.HEIC`/`.MOV` du dossier source doivent être convertis
  (JPG/WebP + poster d'image pour les vidéos) avant intégration.

### 4.6 Iconographie
- Jeu d'icônes linéaires cohérent (`lucide-react`), trait 1.5-2px, taille 20-24.
- Une icône par pôle / sous-prestation, discrète, jamais colorée en aplat.
- Pas de cliparts, pas d'emoji dans l'UI de production.

### 4.7 Ton rédactionnel
- **Vouvoiement**, phrases courtes, concret. « On enlève la mousse, on protège,
  votre toit est reparti pour 10 ans. »
- Pas de superlatifs vides (« le meilleur », « n°1 »). Des faits : nombre de
  chantiers, années d'expérience, zone couverte, garantie.
- Le client parle « résultat » et « tranquillité », pas « process ».

---

## 5. Animation & micro-interactions

> Cadre issu de la philosophie design-engineering d'Emil Kowalski.
> **Principe : une animation doit avoir un but** (feedback, continuité spatiale,
> explication). Si c'est juste « joli » et vu souvent → on n'anime pas.

### Tokens de motion

```css
:root {
  --ease-out:     cubic-bezier(0.23, 1, 0.32, 1);      /* entrées, feedback */
  --ease-in-out:  cubic-bezier(0.77, 0, 0.175, 1);     /* déplacements à l'écran */
  --dur-fast:     140ms;   /* press, hover */
  --dur-base:     200ms;   /* dropdowns, tooltips, fade de section */
  --dur-slow:     320ms;   /* menu mobile, accordéon */
}
```

### Règles

| Élément | Traitement |
| --- | --- |
| Boutons / liens-boutons | `transition: transform var(--dur-fast) var(--ease-out)` ; `:active { transform: scale(0.97) }`. Feedback instantané, obligatoire. |
| Hover de carte | Élévation d'ombre + `translateY(-2px)` max, `--dur-base`, `ease`. Sous `@media (hover:hover) and (pointer:fine)` uniquement. |
| Apparition de section au scroll | `opacity` 0→1 + `translateY(12px→0)`, `--dur-base`, `--ease-out`, `IntersectionObserver` `{ once: true, margin: "-80px" }`. Discret. Jamais de gros mouvement. |
| Stagger (grille de prestations, portfolio) | 40-60ms entre items, max ~5 items visibles animés. Décoratif, ne bloque jamais l'interaction. |
| Header au scroll | Passe de transparent-sur-hero à fond blanc + ombre `--shadow-sm` + `--color-navy` sur le logo. Transition `--dur-base`. |
| Menu mobile | Slide-in depuis la droite, `--dur-slow`, `--ease-in-out` (courbe drawer iOS ok : `cubic-bezier(0.32,0.72,0,1)`). |
| Accordéon (FAQ, sous-prestations) | `grid-template-rows: 0fr → 1fr` animé, `--dur-slow`, `--ease-in-out`. Pas de `height: auto` en JS si évitable. |
| Slider avant/après | Suit le pointeur, `clip-path: inset()` sur l'image du dessus, pas de transition pendant le drag (colle au doigt), retour ease-out `--dur-base` au relâchement. |
| Compteur de chiffres-clés | Count-up une seule fois à l'entrée dans le viewport, ~800ms, `ease-out`. Respecte `prefers-reduced-motion`. |

### Interdits
- `transition: all` → toujours nommer les propriétés.
- `scale(0)` en entrée → partir de `scale(0.96)` + `opacity`.
- `ease-in` sur une entrée d'UI → `--ease-out`.
- Animer `width`/`height`/`margin`/`padding` → uniquement `transform` / `opacity`
  (accordéon `grid-rows` toléré).
- Toute animation > 320ms sur un élément d'UI courant.
- Animer une action déclenchée au clavier.

### `prefers-reduced-motion`
`@media (prefers-reduced-motion: reduce)` : on garde les fondus d'opacité/couleur
qui aident à comprendre, on retire tout mouvement de position/scale. Le count-up
affiche directement la valeur finale.

---

## 6. Stack technique

| Choix | Détail |
| --- | --- |
| Framework | **Next.js 15+, App Router**, React Server Components par défaut. |
| Langage | **TypeScript**, `strict: true`. |
| Styles | **CSS pur en CSS Modules** (`*.module.css`) + un `styles/globals.css` et `styles/tokens.css`. **Pas de Tailwind, pas de CSS-in-JS.** Variables CSS pour tous les tokens. Nesting CSS natif ok. |
| Polices | `next/font` (auto-hébergées). |
| Images | `next/image`, AVIF/WebP, dossier `public/img/…` optimisé (voir §9). |
| Icônes | `lucide-react`. |
| Animation | CSS transitions + `IntersectionObserver` maison. Pas de lib d'animation pour la v1. `motion`/Framer seulement si un composant (slider avant/après avec inertie) le justifie vraiment. |
| Formulaire | Server Action Next.js + envoi email (Resend ou nodemailer via SMTP OVH/Hostinger) + honeypot anti-spam. Pas de dépendance form lourde ; validation avec `zod`. |
| Contenu | Données structurées en fichiers **`content/*.ts`** typés (services, communes, chantiers, FAQ, avis). Pas de CMS pour la v1. Prévoir la migration vers un CMS headless plus tard si le client veut éditer seul. |
| Analytics | Plausible ou Vercel Analytics (léger, sans bandeau cookie lourd si possible). |
| Hébergement | Vercel, ou Hostinger (le client a un accès Hostinger). Build statique/ISR au maximum. |
| Lint / format | ESLint (config next core-web-vitals) + Prettier. |
| Node | ≥ 20. Gestionnaire : `pnpm`. |

### Arborescence cible

```
proux/
├── claude.md                    ← ce fichier
├── app/
│   ├── layout.tsx               ← <html lang="fr">, header, footer, fonts, JSON-LD org
│   ├── page.tsx                 ← home
│   ├── toiture/page.tsx
│   ├── nettoyage/page.tsx
│   ├── peinture/page.tsx
│   ├── realisations/page.tsx    ← portfolio avant/après filtrable
│   ├── zone-intervention/
│   │   ├── page.tsx             ← carte + index des communes
│   │   └── [commune]/page.tsx   ← page SEO locale générée (generateStaticParams)
│   ├── a-propos/page.tsx
│   ├── contact/page.tsx         ← formulaire devis + coordonnées + carte
│   ├── devis/page.tsx           ← (optionnel) formulaire long dédié
│   ├── mentions-legales/page.tsx
│   ├── politique-confidentialite/page.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── not-found.tsx
├── components/
│   ├── layout/   (Header, Footer, MobileMenu, Container, Section)
│   ├── ui/       (Button, Card, Badge, Accordion, Field, Input, Textarea)
│   ├── blocks/   (Hero, ServicePillars, BeforeAfter, BeforeAfterSlider,
│   │             PortfolioGrid, StatsRow, ProcessSteps, Testimonials,
│   │             CoverageMap, FaqList, CtaBanner, QuoteForm, TrustBar)
│   └── seo/      (JsonLd helpers)
├── content/
│   ├── services.ts      ← 3 pôles + sous-prestations (titre, slug, résumé, corps, photo, icône)
│   ├── communes.ts      ← liste des communes (nom, slug, cp, dpt, lat/lng, ~zone)
│   ├── projects.ts      ← chantiers (titre, pôle, commune, image avant, image après, légende)
│   ├── testimonials.ts  ← avis clients (⚠ réels uniquement, source vérifiable)
│   ├── faq.ts
│   └── company.ts       ← coordonnées, horaires, réseaux, assurance → single source of truth
├── lib/            (email, validation, formatters, useInView)
├── styles/         (tokens.css, globals.css, reset)
└── public/img/     (voir §9)
```

---

## 7. Pages & contenu

### 7.1 Accueil (`/`)
1. **Header** transparent sur le hero.
2. **Hero** : H1 promesse simple + sous-titre (métier + zone) + CTA primaire
   « Demander un devis gratuit » + CTA secondaire « Voir nos réalisations » +
   téléphone cliquable. Fond = **un avant/après plein cadre** (le plus fort,
   toiture) ou image chantier avec léger voile marine pour lisibilité du texte.
3. **TrustBar** : 3-4 éléments — « Assurance décennale » · « Devis sous 48 h » ·
   « + X chantiers réalisés » · « Zone : Ain & Pays de Gex ». (Chiffres réels.)
4. **Les 3 pôles** : 3 grandes cartes `TOITURE / NETTOYAGE / PEINTURE`, chacune
   avec icône, 4-5 sous-prestations listées, photo, lien vers la page.
5. **Avant / Après vedette** : 2-3 sliders, la transformation est le message.
6. **Notre méthode** : 3-4 étapes (Visite & devis gratuit → Intervention
   soignée → Traitement de protection → Résultat garanti).
7. **Chiffres-clés** : StatsRow avec count-up (années d'expérience, chantiers,
   communes couvertes, note moyenne d'avis).
8. **Réalisations** : aperçu grille (6-8) + lien vers `/realisations`.
9. **Avis clients** : 3 témoignages réels (Google). Lien vers la fiche Google.
10. **Zone d'intervention** : carte + mention des principales villes + lien.
11. **FAQ** : 5-6 questions (prix, durée, produits, saison, garantie, toiture
    fragile).
12. **CtaBanner** final : « Un projet ? Parlons-en. » + formulaire court ou lien
    contact + téléphone.
13. **Footer** : coordonnées, pôles, communes principales, horaires, mentions,
    réseaux, assurance.

### 7.2 Pages pôle (`/toiture`, `/nettoyage`, `/peinture`)
- Hero de section (titre du pôle, phrase de promesse, photo, CTA).
- Intro courte : à qui ça s'adresse, pourquoi c'est important.
- **Une section par sous-prestation** (ancre) : problème → intervention →
  résultat, photo/avant-après, éventuellement mini-liste de points.
- Bloc « méthode » spécifique si pertinent (ex. produits hydrofuge pour toiture).
- Avant/après filtrés sur ce pôle.
- FAQ spécifique au pôle.
- CtaBanner.

### 7.3 Réalisations (`/realisations`)
- Grille de chantiers, **filtre par pôle** (Tous / Toiture / Nettoyage /
  Peinture) et éventuellement par commune.
- Chaque item ouvre un avant/après en grand (slider) + légende (ville, type de
  toiture/support, ce qui a été fait).
- Pas de lightbox lourde : une vue détail simple, accessible au clavier.

### 7.4 Zone d'intervention (`/zone-intervention` + `/zone-intervention/[commune]`)
- Page index : carte (Ain + Pays de Gex), liste alphabétique des communes
  (groupées par zone / canton), champ de recherche filtrant côté client.
- **Pages communes générées par template** (`generateStaticParams` sur
  `content/communes.ts`) :
  - `<h1>` : « Nettoyage de toiture à {Commune} ({CP}) — PROUX »
  - Contenu **variabilisé, pas dupliqué** : paragraphe d'intro mentionnant la
    commune, sa zone, le type d'habitat courant ; rappel des 3 pôles ; 2-3
    avant/après (idéalement d'un chantier proche si dispo, sinon génériques) ;
    bloc « Pourquoi faire appel à un pro pour votre toiture à {Commune} » ;
    communes limitrophes en maillage interne ; CTA + formulaire.
  - Variables par commune : nom, CP, canton/zone, distance approx. secteur,
    liste de communes voisines, éventuellement 1 phrase spécifique (climat,
    altitude, type de tuile régionale).
  - **Éviter le duplicate content** : au moins 40 % du texte doit varier d'une
    page à l'autre (templating par blocs + banque de formulations). Si le
    client ne fournit pas assez de matière → réduire le nombre de pages plutôt
    que publier du texte identique.
  - `<link rel="canonical">` propre, JSON-LD `LocalBusiness` avec `areaServed`.
  - Ces pages sont indexables mais **ne polluent pas** la nav principale (accès
    via la page zone + footer + maillage).

### 7.5 À propos (`/a-propos`)
- Histoire courte de PROUX, la personne / l'équipe, la zone, les valeurs
  (travail soigné, propreté du chantier, conseil honnête).
- Photo(s) de l'artisan au travail (les photos de chantier avec la personne).
- Assurance, engagements, matériel.
- Pas de storytelling gonflé — du vrai.

### 7.6 Contact (`/contact`)
- Formulaire de demande de devis (voir §8).
- Coordonnées complètes, horaires, zone, carte.
- Téléphone et email cliquables.
- Lien fiche Google Business + avis.

### 7.7 Légal
- `mentions-legales`, `politique-confidentialite` (RGPD : finalité du formulaire,
  durée de conservation, droits). Bandeau cookies **uniquement si** analytics
  non-exemptée ; privilégier une solution sans consentement.

---

## 8. Formulaire de devis

Champs :
- Nom *
- Téléphone * (le canal principal pour un artisan)
- Email *
- Commune / code postal *
- Type de prestation * (select : Toiture / Nettoyage façade-terrasse / Peinture /
  Plusieurs / Je ne sais pas)
- Message (surface concernée, état, contexte) — optionnel
- Consentement RGPD * (case à cocher, non pré-cochée)
- Honeypot caché + horodatage anti-bot

Comportement :
- **Server Action**, validation `zod` côté serveur, messages d'erreur par champ,
  clairs, sous le champ.
- Envoi email vers l'adresse PROUX + accusé de réception au prospect.
- État de succès **inline** (pas de redirection brutale) : « Merci, on vous
  rappelle sous 48 h. » + rappel du numéro pour les pressés.
- Bouton : `:active` scale, état `loading` (spinner rapide), désactivé pendant
  l'envoi, jamais de double soumission.
- Accessible : `<label>` liés, `aria-invalid`, `aria-describedby`, focus géré,
  erreurs annoncées.

---

## 9. Assets — dossier source

Le dossier de travail contient :

```
Logo-ets-proux-nettoyage.png          ← logo (maison stylisée + "PROUX" + baseline)
Photos iCloud de Clarky Proux/        ← ~28 fichiers (JPG, PNG, HEIC, MOV)
Photos iCloud de Clarky Proux 2/      ← ~25 fichiers (JPG, PNG, HEIC, MOV)
```

### Ce qu'on a repéré dans les photos
- Démoussage toiture tuile béton / terre cuite — **avant/après spectaculaires**
  (mousse jaune/lichen → tuile nette). Plusieurs déjà montées en « AVANT / APRÈS »
  avec le logo PROUX incrusté.
- Hydrofuge coloré (toiture ravivée, teinte rouge profond).
- Nettoyage + hydrofuge de terrasse gravillonnée (avant/après net).
- Peinture de façade (crépi terni → propre), maisons type savoyard.
- Peinture de sous-face / rives en bois blanc.
- Réfection de solins zinc autour de souche de cheminée.
- Peinture / enduit de souche de cheminée.
- Nettoyage de grande terrasse bois autour d'une piscine (dégrisage → saturateur).
- Artisan au travail sur toiture (nettoyeur), vue montagnes.

### À faire sur les assets (étape de préparation, avant intégration)
1. **Logo** : obtenir/recréer une version **vectorielle (SVG)** + versions PNG
   transparentes (couleur, monochrome blanc, monochrome marine) + favicon +
   apple-touch-icon + OG image. Extraire la teinte bleue exacte → ajuster
   `--color-navy` / `--color-accent`.
2. **Conversion** : `.HEIC` → JPG/WebP ; `.MOV` → soit on les écarte, soit on en
   tire un poster + une version `.mp4`/`.webm` compressée (hero éventuel).
3. **Tri & nommage** : renommer en `slug-parlant--avant.jpg` /
   `slug-parlant--apres.jpg`, ranger dans `public/img/realisations/<slug>/`.
4. **Paires avant/après** : identifier les couples, recadrer au **même cadrage**
   (indispensable pour le slider), même exposition/teinte.
5. **Nettoyage** : retirer les incrustations « AVANT/APRÈS » et le logo des
   photos déjà montées si on refait le composant nous-mêmes (garder les
   originaux séparés) — sinon les utiliser telles quelles pour les vignettes.
6. **Optimisation** : largeur max 2400px, versions responsives gérées par
   `next/image`. Cible < 250 Ko par image affichée.
7. `alt` rédigés dans `content/projects.ts`, pas en dur dans le JSX.

> Ne jamais publier une photo où figure une plaque d'immatriculation lisible, un
> visage de tiers non consenti, ou un numéro de rue identifiant précisément un
> client. Flouter si besoin. (Vu au moins une plaque lisible dans le lot.)

---

## 10. SEO & performance

### Technique
- **Metadata API** Next : `title` / `description` uniques par page,
  `openGraph` + `twitter`, `canonical`.
- **JSON-LD** :
  - `LocalBusiness` (ou `HomeAndConstructionBusiness`) global dans le layout :
    nom, logo, `image`, `telephone`, `address`, `geo`, `areaServed` (l'Ain +
    communes), `openingHours`, `priceRange`, `aggregateRating` **si avis réels
    agrégés vérifiables**.
  - `Service` sur les pages pôle.
  - `BreadcrumbList` sur les pages profondes.
  - `FAQPage` sur les blocs FAQ.
- `sitemap.ts` généré (inclut toutes les communes), `robots.ts`, `lastModified`.
- URLs propres, en français, sans accent, tiret-séparées (`/zone-intervention/saint-genis-pouilly`).
- Maillage interne : home → pôles → sous-prestations ; zone → communes →
  communes limitrophes ; footer récapitulatif.
- Une seule `<h1>` par page, hiérarchie Hn correcte.

### Contenu local
- Cibler « nettoyage toiture {ville} », « démoussage toiture {ville} »,
  « nettoyage façade {ville} », « peinture façade {ville} » pour les communes
  principales ; longue traîne sur les autres.
- Page Google Business Profile : cohérence NAP (Name/Address/Phone) stricte avec
  `content/company.ts`.
- Encourager les avis Google (lien direct dans l'email d'accusé de réception).

### Performance (cible Lighthouse ≥ 95 mobile)
- RSC par défaut, `"use client"` seulement où c'est nécessaire (slider, menu
  mobile, formulaire, filtres, count-up, useInView).
- Images : `next/image`, `priority` sur le hero uniquement, `loading="lazy"`
  ailleurs, dimensions explicites → **CLS ≈ 0**.
- Polices : `next/font`, `display: swap`, subset latin, preload de la display.
- Pas de librairie JS lourde. Bundle initial < 100 Ko JS gz visé.
- CSS critique inline via le pipeline Next, le reste en modules.
- ISR / SSG pour tout ; revalidation longue.
- `prefers-reduced-motion` respecté (cf. §5).

### Accessibilité (WCAG 2.1 AA)
- Navigation clavier complète, focus visible (anneau `--color-accent`, jamais
  `outline: none` sans remplacement).
- Contrastes AA.
- `lang="fr"`, landmarks (`header`/`nav`/`main`/`footer`), skip-link.
- Cibles tactiles ≥ 44px.
- Formulaire entièrement accessible (cf. §8).
- Slider avant/après : utilisable au clavier (flèches) + `aria` + fallback
  statique si JS off.

---

## 11. Ce qu'on ne fait PAS

- ❌ Pas de fausses données (numéro, adresse, avis, label RGE/Qualibat/QualiPV,
  chiffres inventés). Tant que le client n'a pas fourni → `TODO:` visible + valeur
  neutre.
- ❌ Pas de Tailwind, pas de CSS-in-JS, pas de UI kit (MUI, Chakra…).
- ❌ Pas de carrousel auto-défilant, pas de pop-up d'entrée, pas de chat widget
  tiers lourd.
- ❌ Pas d'animation gratuite sur les éléments vus 50 fois par jour.
- ❌ Pas de `#000`, pas d'ombres dures, pas d'angles vifs généralisés.
- ❌ Pas de duplicate content sur les pages communes (cf. §7.4).
- ❌ Pas de stock photos génériques : **uniquement les vrais chantiers PROUX**.
- ❌ Pas de vidéo auto-play avec son.

---

## 12. Ordre de construction suggéré

1. **Setup** : Next + TS + ESLint/Prettier + structure de dossiers +
   `styles/tokens.css` + `styles/globals.css` + reset + polices.
2. **Design system** : `Button`, `Card`, `Badge`, `Container`, `Section`,
   `Field`/`Input`/`Textarea`, `Accordion` — avec leurs états (hover, active,
   focus, disabled) et les tokens de motion.
3. **Layout** : `Header` (dont comportement au scroll), `MobileMenu`, `Footer`,
   `company.ts` comme source unique.
4. **Blocks** : `Hero`, `ServicePillars`, `BeforeAfterSlider`, `PortfolioGrid`,
   `StatsRow`, `ProcessSteps`, `Testimonials`, `FaqList`, `CtaBanner`,
   `QuoteForm`, `TrustBar`, `CoverageMap`.
5. **Home** assemblée.
6. **Pages pôle** (`services.ts` d'abord).
7. **Réalisations** + `projects.ts` + préparation des assets (§9).
8. **Zone d'intervention** + template commune + `communes.ts`.
9. **À propos**, **Contact** (+ Server Action email), **pages légales**.
10. **SEO** : metadata, JSON-LD, sitemap, robots, OG images.
11. **Passe finale** : Lighthouse, axe (a11y), test clavier, test mobile réel,
    relecture des animations à froid le lendemain, remplacement de tous les
    `TODO:` par les vraies infos client.

---

## 13. Questions ouvertes à trancher avec le client

- [ ] Raison sociale exacte + statut (auto-entrepreneur / SARL / EI) pour mentions légales.
- [ ] Téléphone(s) définitif(s), email, adresse, SIRET.
- [ ] Assurance décennale : compagnie + n° de contrat + zone couverte.
- [ ] Labels / certifications réels éventuels (RGE, Qualibat, adhésion FFB/CAPEB…).
- [ ] Années d'expérience, nombre de chantiers (chiffre communicable).
- [ ] Liste réelle des prestations : confirmer ramonage, piscine, ferronnerie, portails.
- [ ] Ordre d'affichage des 3 pôles (Toiture d'abord ? ou respecter le logo Peinture·Nettoyage·Toiture ?).
- [ ] Périmètre géographique précis + liste des communes prioritaires.
- [ ] Avis clients : accès à la fiche Google (URL), autorisation de citer les avis.
- [ ] Fourchettes de prix communicables (ou non).
- [ ] Nom de domaine cible : garder `nettoyage-toiture-01.fr`, prendre `proux-*.fr`, ou les deux (redirection 301) ?
- [ ] Le client veut-il éditer le contenu lui-même à terme (→ CMS headless) ?
- [ ] Photos : autorisation d'usage, y a-t-il des chantiers à ne pas montrer ?
- [ ] Logo vectoriel (SVG) disponible quelque part ?
