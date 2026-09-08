/* =============================================================
   PROUX — Les 3 pôles et leurs sous-prestations.
   Voir claude.md §3 & §7.2. Utilisé par :
   - le méga-menu et la home (carte « Nos prestations ») ;
   - les pages /toiture, /nettoyage, /peinture (contenu éditorial).

   `confirmed: false` = prestation non validée par le client
   (cf. claude.md §3, §13) : ne pas publier tant qu'elle n'est pas
   confirmée. Filtrée à l'affichage.

   Règle de rédaction (claude.md §3) : chaque sous-prestation dit
   le problème du client → ce que PROUX fait → le résultat. Vouvoiement,
   phrases courtes, pas de jargon sans traduction (claude.md §4.7).

   ⚠️ TODO(assets) — cf. claude.md §9 : plusieurs sous-prestations
   pointent pour l'instant vers les photos génériques de pôle
   (/img/services/*.jpg). À remplacer par une photo de chantier
   dédiée par prestation (tri + recadrage 3:2 + nommage) avant mise
   en production.
   ============================================================= */

export type SubService = {
  label: string;
  slug: string;
  /** phrase de résumé courte (méga-menu, ancre) */
  summary: string;
  /** corps éditorial : problème → intervention → résultat (2-4 phrases) */
  body: string;
  /** mini-liste optionnelle de points concrets */
  points?: string[];
  /** photo de chantier associée (§7.2) */
  image: string;
  imageAlt: string;
  confirmed?: boolean;
};

/** Encadré « méthode » propre à un pôle (ex. produits hydrofuge). */
export type MethodNote = {
  title: string;
  body: string;
  points: string[];
};

export type Pole = {
  key: "toiture" | "nettoyage" | "peinture";
  label: string;
  /** titre affiché sur la carte de la home (défaut : `label`) */
  homeTitle?: string;
  /** sur-titre court affiché au-dessus du titre dans le méga-menu */
  kicker: string;
  href: string;
  tagline: string;
  /** vignette carrée/portrait — méga-menu & menu mobile */
  image: string;
  /** image paysage 16:10 — section « Nos prestations » de la home */
  wideImage: string;
  imageAlt: string;
  /** 2 points de réassurance courts, affichés dans le méga-menu */
  highlights: string[];

  /* — Page pôle (§7.2) — */
  /** <h1> de la page pôle */
  pageTitle: string;
  /** phrase de promesse sous le h1 */
  pagePitch: string;
  /** image plein cadre du hero de section */
  heroImage: string;
  heroImageAlt: string;
  /** intro courte : à qui ça s'adresse, pourquoi c'est important */
  intro: string;
  /** <title> + meta description SEO */
  metaTitle: string;
  metaDescription: string;
  /** encadré méthode, si pertinent */
  methodNote?: MethodNote;

  subs: SubService[];
};

export const poles: Pole[] = [
  {
    key: "toiture",
    label: "Toiture",
    homeTitle: "Nettoyage toiture",
    kicker: "Couverture & étanchéité",
    href: "/toiture",
    tagline: "Démoussage, hydrofuge et réparations de couverture.",
    // Header (méga-menu / menu mobile) : même visuel que la carte de la home.
    image: "/img/services/toiture/hydrofuge.jpg",
    wideImage: "/img/services/toiture/hydrofuge.jpg",
    imageAlt: "Toiture en tuile après traitement hydrofuge par PROUX, teinte ravivée",
    highlights: [
      "Produits anti-mousse respectueux des tuiles",
      "Traitement hydrofuge de protection longue durée",
    ],

    pageTitle: "Nettoyage et entretien de toiture",
    pagePitch:
      "On enlève la mousse, on protège la couverture, votre toit repart pour des années.",
    heroImage: "/img/services/toiture/hero.jpg",
    heroImageAlt:
      "Artisan PROUX nettoyant une toiture en tuile au nettoyeur haute pression, vue sur les montagnes du Pays de Gex",
    intro:
      "La mousse et le lichen retiennent l’eau, soulèvent les tuiles et finissent par fragiliser toute la couverture. PROUX intervient sur les toitures en tuile terre cuite, tuile béton et ardoise dans l’Ain et le Pays de Gex : démoussage, traitement de protection et petites réparations, sans monter la pression au point d’abîmer vos tuiles.",
    metaTitle: "Nettoyage de toiture, démoussage & hydrofuge",
    metaDescription:
      "PROUX nettoie et protège votre toiture dans l’Ain et le Pays de Gex : démoussage, traitement hydrofuge, faîtage, solins, remplacement de tuiles. Devis gratuit sous 48 h.",
    methodNote: {
      title: "Notre traitement en trois temps",
      body: "Un démoussage qui tient dans la durée ne se limite pas à un passage de brosse. On travaille toujours dans le même ordre.",
      points: [
        "Brossage manuel et nettoyage basse pression pour décoller la mousse sans fissurer les tuiles.",
        "Pulvérisation d’un anti-mousse qui poursuit son action pendant plusieurs mois et évite la repousse rapide.",
        "Traitement hydrofuge, incolore ou coloré, qui empêche l’eau de pénétrer et ralentit fortement le retour de la mousse.",
      ],
    },

    subs: [
      {
        label: "Traitement hydrofuge",
        slug: "hydrofuge",
        summary: "Hydrofuge incolore ou coloré, protection longue durée contre l’eau.",
        body: "Une tuile poreuse absorbe l’eau de pluie, gèle en hiver et se dégrade plus vite ; la mousse revient aussi plus rapidement. Après le démoussage, on pulvérise un hydrofuge qui fait perler l’eau sur la tuile sans l’empêcher de respirer. En version colorée, il ravive aussi la teinte de la toiture. La protection dure plusieurs années selon l’exposition de votre toit.",
        points: [
          "Version incolore (protection seule) ou colorée (teinte ravivée)",
          "Réduit fortement la reprise de mousse et de lichen",
          "Application après séchage complet du démoussage",
        ],
        image: "/img/services/toiture/hydrofuge.jpg",
        imageAlt:
          "Toiture en tuile après traitement hydrofuge par PROUX, teinte ravivée",
      },
      {
        label: "Démoussage de toiture",
        slug: "demoussage",
        summary: "Brossage et traitement anti-mousse, sans haute pression destructrice.",
        body: "Une toiture couverte de mousse et de lichen garde l’humidité, ce qui accélère l’usure des tuiles et peut provoquer des infiltrations. On décolle la mousse au brossage et à la basse pression, on récupère les déchets dans les gouttières, puis on applique un anti-mousse qui continue d’agir après notre passage. Votre toit retrouve sa couleur d’origine et respire de nouveau.",
        points: [
          "Adapté à la tuile terre cuite, la tuile béton et l’ardoise",
          "Basse pression sur les couvertures anciennes ou fragiles",
          "Abords protégés, gouttières et descentes vidées après intervention",
        ],
        image: "/img/services/toiture/demoussage.jpg",
        imageAlt:
          "Toiture en tuile avant / après démoussage par PROUX : mousse et lichen retirés",
      },
      {
        label: "Nettoyage basse & haute pression",
        slug: "nettoyage",
        summary: "Pression choisie selon le type de couverture.",
        body: "Toutes les toitures ne se nettoient pas de la même façon. Sur une tuile en bon état, la haute pression maîtrisée retire efficacement les salissures ; sur une tuile ancienne, poreuse ou en terre cuite, on reste en basse pression et au brossage pour ne pas éclater le matériau. On juge sur place et on adapte, pièce par pièce si besoin.",
        image: "/img/services/toiture/nettoyage.jpg",
        imageAlt:
          "Artisan PROUX nettoyant une toiture en tuile au nettoyeur haute pression",
      },
      {
        label: "Réfection de faîtage",
        slug: "faitage",
        summary: "Faîtage à sec ou scellé, remplacement des tuiles faîtières.",
        body: "Le faîtage, la ligne de crête de votre toit, est la première zone à lâcher : mortier fissuré, tuiles faîtières descellées, entrées d’eau. On dépose l’ancien faîtage, on remplace les éléments cassés et on repose au mortier bâtard ou en pose à sec ventilée selon la couverture. La ligne de faîte redevient étanche et propre.",
        image: "/img/services/toiture/faitage.jpg",
        imageAlt: "Faîtage de toiture en tuile en cours de réfection par PROUX",
      },
      {
        label: "Remplacement de tuiles",
        slug: "tuiles",
        summary: "Repérage et remplacement des tuiles cassées ou glissées.",
        body: "Une seule tuile fêlée ou déplacée suffit à laisser l’eau s’infiltrer dans la charpente. Pendant le démoussage ou lors d’une intervention dédiée, on repère les tuiles cassées, poreuses ou mal positionnées et on les remplace par des tuiles compatibles. C’est le geste le plus simple pour éviter un dégât des eaux coûteux.",
        image: "/img/services/toiture/tuiles.jpg",
        imageAlt: "Arêtier d’une toiture en tuile terre cuite entretenu par PROUX",
      },
      {
        label: "Solins & abergements",
        slug: "solins",
        summary: "Réfection des raccords d’étanchéité autour des cheminées et murs.",
        body: "Les solins font la jonction entre la toiture et un mur, une souche de cheminée ou une lucarne. Quand le zinc se soulève ou que le mortier se désagrège, l’eau passe par là. On refait les solins en zinc ou en mortier et on reprend les abergements pour que ces points sensibles redeviennent parfaitement étanches.",
        image: "/img/services/toiture/solins.jpg",
        imageAlt: "Solin en zinc neuf posé au pied d’une souche de cheminée par PROUX",
      },
      {
        label: "Réparation de souche de cheminée",
        slug: "cheminee",
        summary: "Rejointoiement, enduit et étanchéité de la souche.",
        body: "Une souche de cheminée exposée au vent et à la pluie se fissure, les joints s’ouvrent, l’enduit se décolle. On rejointoie la maçonnerie, on reprend l’enduit et on traite l’étanchéité en tête de souche. La cheminée cesse d’être une source d’infiltration et retrouve un aspect soigné.",
        image: "/img/services/toiture/cheminee.jpg",
        imageAlt: "Souche de cheminée avant / après remise en état par PROUX",
      },
      {
        label: "Nettoyage de gouttières",
        slug: "gouttieres",
        summary: "Retrait des feuilles et de la mousse, vérification de l’écoulement.",
        body: "Des gouttières bouchées débordent, ruissellent le long de la façade et gèlent en hiver. On retire les feuilles, la mousse et les dépôts des gouttières et des descentes, on contrôle les pentes et les jonctions, et on s’assure que l’eau part bien là où elle doit partir. C’est souvent l’occasion de repérer un crochet desserré ou une descente fendue.",
        image: "/img/services/toiture/gouttieres.jpg",
        imageAlt: "Toiture en tuile et sa gouttière entretenues par PROUX",
      },
    ],
  },
  {
    key: "nettoyage",
    label: "Nettoyage",
    kicker: "Façades & extérieurs",
    href: "/nettoyage",
    tagline: "Façades, terrasses, dallages et murets remis à neuf.",
    // Header (méga-menu / menu mobile) : même visuel que la carte de la home.
    image: "/img/services/nettoyage.jpg",
    wideImage: "/img/services/nettoyage.jpg",
    imageAlt: "Terrasse en dallage nettoyée par PROUX",
    highlights: [
      "Pression adaptée à chaque support",
      "Anti-mousse et traitement des taches vertes",
    ],

    pageTitle: "Nettoyage de façades et d’extérieurs",
    pagePitch:
      "Façade, terrasse, allée : on retire les traces vertes et noires, vos extérieurs retrouvent leur teinte.",
    heroImage: "/img/services/nettoyage/hero.jpg",
    heroImageAlt:
      "Allée en pavés autobloquants entièrement nettoyée par PROUX",
    intro:
      "Enduit noirci au nord, terrasse glissante, dallage envahi de mousse : l’humidité et les micro-algues s’installent partout où l’eau stagne. PROUX nettoie façades, terrasses, dallages, murets et allées dans l’Ain et le Pays de Gex, avec la bonne pression et le bon produit pour chaque support — sans décaper l’enduit ni marquer la pierre.",
    metaTitle: "Nettoyage de façade, terrasse & dallage",
    metaDescription:
      "PROUX nettoie vos façades, terrasses, dallages et murets dans l’Ain et le Pays de Gex : anti-mousse, hydrofuge de sol, dégrisage du bois. Devis gratuit sous 48 h.",
    methodNote: {
      title: "La bonne pression pour chaque surface",
      body: "Un nettoyage réussi, c’est d’abord le bon réglage. On teste sur une zone discrète avant de traiter l’ensemble.",
      points: [
        "Enduit et crépi : basse pression et anti-mousse, jamais de décapage qui arrache le grain.",
        "Pierre, béton désactivé, gravillonné : pression modérée pour ne pas déchausser les granulats.",
        "Bois : nettoyage doux puis dégrisage, avant application d’un saturateur qui nourrit la fibre.",
      ],
    },

    subs: [
      {
        label: "Nettoyage de façade",
        slug: "facade",
        summary: "Enduit et crépi : anti-mousse, traitement des algues et des traces noires.",
        body: "Une façade se salit surtout là où elle sèche mal : sous les débords, côté nord, près de la végétation. Les traces vertes sont des micro-algues, les traces noires des champignons. On applique un traitement fongicide, on nettoie à basse pression pour ne pas ouvrir l’enduit, et la façade retrouve une teinte homogène. Un hydrofuge de façade peut prolonger le résultat.",
        points: [
          "Enduit gratté, taloché, crépi projeté",
          "Protection des menuiseries et de la végétation",
          "Option hydrofuge de façade pour espacer les nettoyages",
        ],
        image: "/img/services/nettoyage/facade.jpg",
        imageAlt: "Façade en pierre et enduit d’une maison ancienne nettoyée par PROUX",
      },
      {
        label: "Nettoyage de terrasse & dallage",
        slug: "terrasse",
        summary: "Pierre, béton désactivé, dalles gravillonnées.",
        body: "Une terrasse verte est glissante et dangereuse dès qu’il pleut. On adapte la pression au revêtement — pierre naturelle, béton désactivé, dalles sur plots — pour retirer la mousse et les dépôts noirs sans déchausser les gravillons ni creuser les joints. La terrasse redevient sûre et retrouve sa couleur d’origine.",
        image: "/img/services/nettoyage/terrasse.jpg",
        imageAlt: "Terrasse en dalles nettoyée par PROUX, teinte d’origine retrouvée",
      },
      {
        label: "Traitement hydrofuge de sol",
        slug: "hydrofuge-sol",
        summary: "Protège la terrasse et facilite l’entretien courant.",
        body: "Après nettoyage, une terrasse ou un dallage poreux se resalit vite. L’hydrofuge de sol fait perler l’eau, limite les taches grasses et ralentit le retour de la mousse. L’entretien se résume ensuite à un coup de jet. Il s’applique sur pierre, béton et dallage, une fois la surface parfaitement sèche.",
        image: "/img/services/nettoyage/hydrofuge-sol.jpg",
        imageAlt: "Terrasse en dalles avant / après nettoyage et hydrofuge par PROUX",
      },
      {
        label: "Murets, clôtures & escaliers",
        slug: "murets",
        summary: "Murs de clôture, murets, escaliers extérieurs.",
        body: "Les murets et les escaliers extérieurs prennent la mousse sur leur face ombragée et deviennent glissants marche après marche. On les nettoie avec la pression adaptée à leur revêtement — enduit, pierre, béton — et on traite contre la repousse. L’ensemble retrouve une teinte propre et les marches redeviennent sûres.",
        image: "/img/services/nettoyage/murets.jpg",
        imageAlt: "Terrasse et muret de bordure nettoyés par PROUX",
      },
      {
        label: "Terrasse bois & saturateur",
        slug: "terrasse-bois",
        summary: "Nettoyage, dégrisage et saturateur pour retrouver la teinte du bois.",
        body: "Une terrasse en bois non entretenue grise, se fend et devient rêche. On nettoie en douceur, on applique un dégriseur qui redonne au bois sa couleur chaude, puis un saturateur qui nourrit la fibre et la protège des UV et de l’eau. Le bois retrouve son aspect neuf sans film qui pèle avec le temps.",
        points: [
          "Dégrisage des lames ternies",
          "Saturateur incolore ou teinté",
          "Aussi sur bardage bois et garde-corps",
        ],
        image: "/img/services/nettoyage/terrasse-bois.jpg",
        imageAlt: "Terrasse en bois avant / après dégrisage et saturateur par PROUX",
      },
      {
        label: "Cour, allée & parking",
        slug: "cour-allee",
        summary: "Enrobé, béton, pavés : retrait de la mousse et des traces.",
        body: "Une allée ou une cour se couvre de mousse sur ses bords et de traces noires au centre, là où roulent les voitures. On nettoie l’enrobé, le béton ou les pavés à la pression adaptée, on traite les zones les plus incrustées et on rince proprement. L’entrée de votre maison fait tout de suite meilleure impression.",
        image: "/img/services/nettoyage/cour-allee.jpg",
        imageAlt: "Allée en pavés autobloquants nettoyée par PROUX",
      },
      {
        label: "Abords de piscine",
        slug: "piscine",
        summary: "Plage de piscine, margelles, terrasse attenante.",
        body: "Les plages de piscine, souvent en pierre reconstituée ou en béton, deviennent glissantes et se tachent avec les produits et les feuilles. On nettoie les margelles et la plage avec une pression douce, on traite contre la mousse et on peut protéger la surface à l’hydrofuge. Le tour de la piscine redevient net et moins glissant.",
        image: "/img/services/nettoyage.jpg",
        imageAlt: "Plage de piscine en pierre nettoyée par PROUX",
        confirmed: false,
      },
    ],
  },
  {
    key: "peinture",
    label: "Peinture",
    kicker: "Peinture extérieure",
    href: "/peinture",
    tagline: "Peinture extérieure : façade, sous-face, boiseries.",
    // Header (méga-menu / menu mobile) : même visuel que la carte de la home.
    image: "/img/services/peintureexterieur.png",
    wideImage: "/img/services/peintureexterieur.png",
    imageAlt: "Façade repeinte par PROUX",
    highlights: [
      "Préparation des supports avant mise en peinture",
      "Produits façade et bois adaptés à l’extérieur",
    ],

    pageTitle: "Peinture extérieure",
    pagePitch:
      "Façade, sous-face, volets : on prépare, on protège, la peinture tient parce que le support est sain.",
    heroImage: "/img/services/peinture/hero.jpg",
    heroImageAlt:
      "Façade de maison et toiture entretenues par PROUX dans le Pays de Gex",
    intro:
      "Une peinture extérieure qui s’écaille au bout de deux ans, c’est presque toujours un support mal préparé. PROUX peint façades, sous-faces de toit, rives et boiseries dans l’Ain et le Pays de Gex : on nettoie, on traite, on rebouche et on ponce avant d’appliquer un produit conçu pour l’extérieur. Le résultat est net et il dure.",
    metaTitle: "Peinture extérieure : façade, boiseries & sous-face",
    metaDescription:
      "PROUX réalise vos travaux de peinture extérieure dans l’Ain et le Pays de Gex : façade, sous-face de toit, rives, volets et boiseries, lasure bois. Devis gratuit sous 48 h.",
    methodNote: {
      title: "La préparation avant la peinture",
      body: "Ce qui fait tenir une peinture extérieure, c’est le travail qu’on ne voit plus une fois le chantier terminé.",
      points: [
        "Nettoyage et traitement anti-mousse du support, puis séchage complet.",
        "Rebouchage des fissures, ponçage des parties écaillées, dépoussiérage.",
        "Sous-couche adaptée au support, puis peinture ou lasure en deux couches.",
      ],
    },

    subs: [
      {
        label: "Peinture de façade",
        slug: "facade",
        summary: "Mise en peinture, ravalement léger, revêtement de façade.",
        body: "Une façade ternie, farinante ou tachée vieillit toute la maison. Après nettoyage et traitement, on reprend les micro-fissures, on applique une sous-couche puis un revêtement de façade souple qui protège l’enduit et garde sa teinte face aux UV. La maison paraît rénovée et l’enduit est de nouveau protégé.",
        points: [
          "Peinture de façade ou revêtement semi-épais",
          "Traitement des fissures fines avant application",
          "Large choix de teintes, nuancier fourni",
        ],
        image: "/img/services/peinture/facade.jpg",
        imageAlt: "Façade de maison après mise en peinture par PROUX",
      },
      {
        label: "Sous-face de toit & rives",
        slug: "sous-face",
        summary: "Sous-face, planches de rive, débords de toit.",
        body: "Les sous-faces et les planches de rive, en bois ou en PVC, sont très exposées à l’humidité et noircissent vite. On les nettoie, on ponce le bois, on traite puis on remet en peinture avec un produit qui résiste aux variations d’humidité. Ces finitions sous la toiture redeviennent nettes et cadrent proprement la maison.",
        image: "/img/services/peinture/sous-face.jpg",
        imageAlt: "Sous-face de toit et débord en bois repeints en blanc par PROUX",
      },
      {
        label: "Boiseries extérieures",
        slug: "boiseries",
        summary: "Volets, bardage, avant-toits, pergolas, balustrades.",
        body: "Le bois extérieur non protégé grise, se fend et laisse entrer l’eau. Selon l’état, on décape ou on ponce, on traite le bois, puis on applique une peinture microporeuse ou une lasure qui laisse respirer la fibre. Vos volets et vos boiseries retrouvent une finition uniforme et sont protégés pour plusieurs années.",
        image: "/img/services/peinture/boiseries.jpg",
        imageAlt: "Façade et boiseries extérieures repeintes par PROUX",
      },
      {
        label: "Souche de cheminée & maçonnerie",
        slug: "cheminee",
        summary: "Mise en peinture d’une souche, d’éléments maçonnés.",
        body: "Une souche de cheminée ou un élément maçonné dont l’enduit se décolle attire l’œil et prend l’eau. On reprend l’enduit si nécessaire, on traite, puis on remet en peinture avec un produit façade compatible avec la teinte du reste de la maison. L’ensemble redevient homogène.",
        image: "/img/services/peinture/cheminee.jpg",
        imageAlt: "Souche de cheminée avant / après remise en état et peinture par PROUX",
      },
      {
        label: "Lasure & saturateur bois",
        slug: "lasure",
        summary: "Entretien du bois extérieur : bardage, portail bois, pergola.",
        body: "La lasure et le saturateur protègent le bois sans former de film qui cloque au soleil. On nettoie et on dégrise le bois, puis on applique deux couches de lasure teintée ou de saturateur incolore. Le veinage reste visible, le bois est nourri et protégé des UV et de la pluie.",
        image: "/img/services/peinture/lasure.jpg",
        imageAlt: "Bois extérieur avant / après application d’un saturateur par PROUX",
      },
      {
        label: "Portail & ferronnerie",
        slug: "ferronnerie",
        summary: "Portail métal, garde-corps, grilles.",
        body: "Le métal extérieur rouille aux points de choc et sous la peinture qui cloque. On brosse la rouille, on applique un antirouille puis une peinture fer adaptée à l’extérieur. Le portail et les garde-corps retrouvent une finition nette et sont protégés de la corrosion.",
        image: "/img/services/peinture.jpg",
        imageAlt: "Portail métallique repeint par PROUX",
        confirmed: false,
      },
    ],
  },
];

/** Un pôle par sa clé — pour `generateStaticParams` et les pages. */
export function getPole(key: Pole["key"]): Pole {
  const pole = poles.find((p) => p.key === key);
  if (!pole) throw new Error(`Pôle inconnu : ${key}`);
  return pole;
}

/** Sous-prestations publiables d'un pôle (filtre `confirmed !== false`). */
export function publishedSubs(pole: Pole): SubService[] {
  return pole.subs.filter((s) => s.confirmed !== false);
}

/* Panneau vedette du méga-menu Prestations — un chantier mis en avant.
   TODO(client) : remplacer par un vrai chantier daté et localisé. */
export const megaFeature = {
  image: "/img/nav/vedette.jpg",
  imageAlt:
    "Nettoyeur haute pression sur une toiture en tuile, vue sur les montagnes",
  kicker: "Chantier récent",
  title: "Démoussage complet d'une toiture tuile",
  location: "Pays de Gex",
  href: "/realisations",
  cta: "Voir toutes nos réalisations",
};

/* Zone d'intervention — aperçu pour le méga-menu.
   TODO(client) : liste réelle des communes prioritaires (claude.md §13).
   Placeholders réalistes (communes du Pays de Gex / Ain frontalier). */
export type AreaGroup = { title: string; communes: string[] };

export const areaPreview: AreaGroup[] = [
  {
    title: "Pays de Gex",
    communes: [
      "Gex",
      "Ferney-Voltaire",
      "Saint-Genis-Pouilly",
      "Prévessin-Moëns",
      "Divonne-les-Bains",
      "Ornex",
    ],
  },
  {
    title: "Bassin bellegardien",
    communes: [
      "Bellegarde-sur-Valserine",
      "Valserhône",
      "Châtillon-en-Michaille",
      "Injoux-Génissiat",
    ],
  },
  {
    title: "Côtière & Bugey",
    communes: ["Nantua", "Oyonnax", "Montréal-la-Cluse", "Bourg-en-Bresse"],
  },
];
