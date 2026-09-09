/* =============================================================
   PROUX — Contenu des pages légales (mentions légales + RGPD).
   Voir claude.md §7.7 & §11.

   Version « minimum légal » :
   - Mentions légales : art. 6-III LCEN (éditeur, hébergeur, contact).
   - Politique de confidentialité : RGPD (art. 13) limitée au
     formulaire de devis. AUCUN cookie / traceur → pas de bandeau
     (claude.md §7.7 : analytics non installé pour l'instant).

   ⚠️ TODO(client) — champs non confirmés, laissés en clair « À
   communiquer » à l'écran, jamais de fausse donnée :
   - raison sociale exacte + forme juridique + SIRET / RCS
   - adresse du siège
   - directeur de la publication (nom du gérant / exploitant)
   - assurance décennale : compagnie + n° + couverture géographique
   - hébergeur définitif (Vercel ou Hostinger) : raison sociale + adresse
   ============================================================= */

/** Un bloc de la page légale : un titre + un ou plusieurs paragraphes.
 *  `items` = liste à puces optionnelle sous le corps. */
export type LegalBlock = {
  heading: string;
  body?: string[];
  items?: string[];
};

export type LegalDocument = {
  title: string;
  /** date de dernière mise à jour, format ISO (affichée en toutes lettres) */
  updated: string;
  intro?: string;
  blocks: LegalBlock[];
};

/* Placeholder visible tant que le client n'a pas fourni l'info.
   Ne jamais remplacer par une valeur inventée. */
const TODO = "À communiquer (information en cours d’obtention).";

/* — Hébergeur — NON tranché (claude.md §6 : Vercel ou Hostinger).
   Tant que le choix n'est pas fait, on affiche un placeholder plutôt
   qu'une fausse mention. Une fois décidé, remplacer `HOST` par l'objet
   correspondant :

   Vercel :
     name: "Vercel Inc."
     address: "340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis"
     site: "https://vercel.com"
   Hostinger :
     name: "Hostinger International Ltd."
     address: "61 Lordou Vironos Street, 6023 Larnaca, Chypre"
     site: "https://www.hostinger.fr"
*/
type Host = { name: string; address: string; site: string };
const HOST = null as Host | null;

// ---------------------------------------------------------------------------
// Mentions légales
// ---------------------------------------------------------------------------

export const mentionsLegales: LegalDocument = {
  title: "Mentions légales",
  updated: "2026-09-08",
  intro:
    "Informations légales relatives au site et à l’entreprise, conformément à l’article 6-III de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN).",
  blocks: [
    {
      heading: "Éditeur du site",
      body: [
        `Le présent site est édité par PROUX, artisan spécialisé dans le nettoyage et le démoussage de toiture, le nettoyage de façades et d’extérieurs et la peinture extérieure.`,
      ],
      items: [
        `Dénomination sociale : ${TODO}`,
        `Forme juridique : ${TODO}`,
        `Siège social : ${TODO}`,
        `SIRET / RCS : ${TODO}`,
        `Numéro de TVA intracommunautaire : ${TODO}`,
        `Téléphone : 07 61 44 99 40`,
        `E-mail : mproux.service@gmail.com`,
        `Directeur de la publication : ${TODO}`,
      ],
    },
    {
      heading: "Assurance professionnelle",
      body: [
        `PROUX est couvert par une assurance de responsabilité civile professionnelle et une garantie décennale.`,
        `Compagnie d’assurance, numéro de contrat et couverture géographique : ${TODO}`,
      ],
    },
    {
      heading: "Hébergeur",
      body: HOST
        ? [`Le site est hébergé par ${HOST.name}, ${HOST.address}.`, `Site : ${HOST.site}`]
        : [`Hébergeur : ${TODO}`],
    },
    {
      heading: "Propriété intellectuelle",
      body: [
        `L’ensemble des contenus du site (textes, photographies de chantiers, logo, mise en page) est la propriété de PROUX ou fait l’objet d’une autorisation d’usage. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable, est interdite et constituerait une contrefaçon au sens des articles L.335-2 et suivants du Code de la propriété intellectuelle.`,
        `Les photographies présentées illustrent des chantiers réellement réalisés par PROUX.`,
      ],
    },
    {
      heading: "Responsabilité",
      body: [
        `Les informations diffusées sur le site sont fournies à titre indicatif et n’ont pas de valeur contractuelle. Seul le devis remis après visite fait foi. PROUX s’efforce de tenir ces informations à jour mais ne peut garantir l’exactitude, la complétude ou l’actualité de l’ensemble des contenus.`,
        `PROUX ne saurait être tenu responsable d’un dommage résultant de l’accès au site ou de l’impossibilité d’y accéder, ni de l’usage fait des informations qu’il contient.`,
      ],
    },
    {
      heading: "Liens hypertextes",
      body: [
        `Le site peut renvoyer vers des sites tiers (fiche Google Business, réseaux sociaux). PROUX n’exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.`,
      ],
    },
    {
      heading: "Données personnelles et cookies",
      body: [
        `Le traitement des données transmises via le formulaire de demande de devis est décrit dans la politique de confidentialité.`,
        `Le site ne dépose aucun cookie publicitaire ni traceur de mesure d’audience. Aucun consentement n’est donc requis pour le consulter.`,
      ],
    },
    {
      heading: "Droit applicable",
      body: [
        `Les présentes mentions légales sont soumises au droit français. Tout litige relève de la compétence des tribunaux français.`,
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Politique de confidentialité
// ---------------------------------------------------------------------------

export const politiqueConfidentialite: LegalDocument = {
  title: "Politique de confidentialité",
  updated: "2026-09-08",
  intro:
    "Cette politique explique quelles données personnelles PROUX collecte via ce site, pourquoi, combien de temps elles sont conservées et quels sont vos droits, conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.",
  blocks: [
    {
      heading: "Responsable du traitement",
      body: [
        `Le responsable du traitement est PROUX (coordonnées dans les mentions légales).`,
        `Pour toute question relative à vos données : mproux.service@gmail.com — téléphone 07 61 44 99 40.`,
      ],
    },
    {
      heading: "Données collectées",
      body: [
        `Les seules données personnelles collectées sont celles que vous saisissez volontairement dans le formulaire de demande de devis :`,
      ],
      items: [
        `nom ;`,
        `numéro de téléphone ;`,
        `adresse e-mail ;`,
        `commune ou code postal ;`,
        `type de prestation souhaitée ;`,
        `message libre (facultatif) : description de votre projet, de la surface concernée, du contexte.`,
      ],
    },
    {
      heading: "Finalité et base légale",
      body: [
        `Ces données sont utilisées uniquement pour répondre à votre demande : vous recontacter, convenir d’une visite et établir un devis.`,
        `La base légale est votre consentement (case à cocher du formulaire) et l’exécution de mesures précontractuelles prises à votre demande (article 6.1.a et 6.1.b du RGPD).`,
        `Elles ne font l’objet d’aucune prospection commerciale non sollicitée, d’aucune cession ni d’aucun profilage.`,
      ],
    },
    {
      heading: "Destinataires",
      body: [
        `Vos données sont transmises à PROUX (l’artisan qui traite votre demande) et à son prestataire technique d’envoi d’e-mails, la société Resend (Resend, Inc., États-Unis), qui achemine le message du formulaire vers la boîte de PROUX et l’accusé de réception vers votre adresse. Ce prestataire agit en qualité de sous-traitant ; le transfert hors Union européenne est encadré par les clauses contractuelles types de la Commission européenne.`,
        `Aucun autre tiers n’a accès à ces données.`,
      ],
    },
    {
      heading: "Durée de conservation",
      body: [
        `Les demandes sans suite sont conservées jusqu’à 12 mois puis supprimées.`,
        `Lorsqu’un devis ou un chantier fait suite à la demande, les données sont conservées pour la durée de la relation commerciale puis archivées conformément aux obligations légales (notamment comptables : 10 ans).`,
      ],
    },
    {
      heading: "Cookies et mesure d’audience",
      body: [
        `Ce site ne dépose aucun cookie de suivi, de publicité ou de mesure d’audience. Seuls peuvent être utilisés des éléments strictement nécessaires au fonctionnement du site, qui ne permettent pas de vous identifier.`,
      ],
    },
    {
      heading: "Vos droits",
      body: [
        `Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et d’opposition au traitement de vos données, ainsi que du droit de retirer votre consentement à tout moment.`,
        `Pour exercer ces droits, écrivez à mproux.service@gmail.com. Une preuve d’identité pourra être demandée en cas de doute.`,
        `Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez saisir la CNIL : www.cnil.fr — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.`,
      ],
    },
    {
      heading: "Sécurité",
      body: [
        `PROUX met en œuvre des mesures raisonnables pour protéger vos données contre la perte, l’accès non autorisé ou la divulgation. Les échanges avec le site sont chiffrés (HTTPS).`,
      ],
    },
  ],
};
