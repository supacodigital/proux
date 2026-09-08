/* =============================================================
   PROUX — FAQ (home, claude.md §7.1 point 11).
   5-6 questions courantes. Ton : concret, résultat & tranquillité,
   pas de jargon (claude.md §4.7). Alimente aussi le JSON-LD FAQPage.

   ⚠️ Pas de prix chiffré tant que le client n'a pas donné de fourchette
   communicable (claude.md §13). On reste sur « devis gratuit ».
   ============================================================= */

export type FaqItem = {
  question: string;
  /** réponse en texte simple (1 paragraphe, éventuellement 2 phrases) */
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: "Combien coûte un nettoyage de toiture ?",
    answer:
      "Le prix dépend de la surface, de la pente, du type de tuile et de l’état de la couverture. On se déplace gratuitement pour évaluer votre toiture et vous remettre un devis clair et détaillé sous 48 h, sans engagement.",
  },
  {
    question: "Combien de temps dure l’intervention ?",
    answer:
      "Un démoussage de toiture prend généralement une à deux journées pour une maison individuelle. Si un traitement hydrofuge est appliqué, il faut prévoir un temps de séchage entre les passages. On vous donne un planning précis avec le devis.",
  },
  {
    question: "Les produits utilisés sont-ils dangereux pour le jardin ?",
    answer:
      "Non. Nous utilisons des produits anti-mousse adaptés, appliqués avec méthode, et nous protégeons les abords (végétation, terrasse, mobilier) avant de commencer. Le rinçage est maîtrisé pour éviter tout ruissellement non contrôlé.",
  },
  {
    question: "À quelle saison faut-il faire nettoyer sa toiture ?",
    answer:
      "Le printemps et l’automne sont idéaux : températures douces, peu de gel, bon séchage. On intervient toute l’année dès que la météo le permet ; en cas d’urgence (fuite, tuile cassée), on se déplace rapidement.",
  },
  {
    question: "Ma toiture est ancienne et fragile, pouvez-vous intervenir ?",
    answer:
      "Oui. Sur les tuiles fragiles ou anciennes, on privilégie le brossage et la basse pression plutôt que la haute pression, qui peut abîmer la terre cuite. On adapte toujours la méthode au support pour ne pas fragiliser la couverture.",
  },
  {
    question: "Proposez-vous une garantie sur le travail réalisé ?",
    answer:
      "Oui, le travail est garanti et nous restons joignables après l’intervention. Le traitement hydrofuge protège durablement contre l’eau et la reprise de mousse ; sa durée dépend de l’exposition de votre toit et du produit appliqué.",
  },
];

/* =============================================================
   FAQ par pôle (pages /toiture, /nettoyage, /peinture — §7.2).
   4-5 questions ciblées sur le pôle. Alimentent aussi un JSON-LD
   FAQPage propre à chaque page.
   ============================================================= */

export const faqByPole: Record<
  "toiture" | "nettoyage" | "peinture",
  FaqItem[]
> = {
  toiture: [
    {
      question: "Faut-il vraiment traiter la toiture après le démoussage ?",
      answer:
        "C’est fortement conseillé. Sans anti-mousse, la mousse repousse en un à deux ans. L’hydrofuge, lui, empêche l’eau de pénétrer dans la tuile et ralentit encore le retour de la mousse. Un démoussage seul est une solution de court terme ; démoussage + traitement, c’est plusieurs années de tranquillité.",
    },
    {
      question: "La haute pression risque-t-elle d’abîmer mes tuiles ?",
      answer:
        "Oui, sur une tuile ancienne ou poreuse, la haute pression peut retirer la couche de surface et accélérer l’usure. C’est pour ça qu’on juge l’état de la couverture avant de commencer et qu’on passe en basse pression et au brossage dès que la tuile est fragile.",
    },
    {
      question: "L’hydrofuge coloré change-t-il beaucoup la couleur du toit ?",
      answer:
        "Il ravive la teinte d’origine plutôt qu’il ne la transforme : une tuile rouge délavée retrouve un rouge profond. On vous montre des exemples et on peut appliquer le produit sur une zone témoin avant de traiter toute la toiture.",
    },
    {
      question: "Intervenez-vous sur les petites réparations, pas seulement le nettoyage ?",
      answer:
        "Oui. Remplacement de tuiles cassées, réfection de faîtage, reprise des solins autour de la cheminée, rejointoiement de souche : on traite les points qui laissent passer l’eau. Pour une réfection lourde de charpente ou de couverture complète, on vous oriente vers un couvreur spécialisé.",
    },
    {
      question: "Combien de temps dure la protection hydrofuge ?",
      answer:
        "Plusieurs années, selon l’exposition de votre toit (orientation, arbres à proximité, altitude) et le produit appliqué. On refait le point avec vous à la fin du chantier et on reste joignables ensuite.",
    },
  ],
  nettoyage: [
    {
      question: "Le nettoyage haute pression peut-il décaper mon enduit de façade ?",
      answer:
        "Sur un enduit fragile, oui. On nettoie donc les façades en basse pression, avec un traitement anti-mousse qui fait le travail en profondeur. La haute pression est réservée aux supports qui le supportent, comme certains bétons.",
    },
    {
      question: "Les traces vertes et noires vont-elles revenir ?",
      answer:
        "Elles reviennent d’autant plus vite que la surface reste humide et ombragée. Le traitement anti-mousse qu’on applique ralentit nettement la repousse. Sur une façade ou une terrasse, un hydrofuge en complément espace encore les nettoyages.",
    },
    {
      question: "Faut-il libérer la terrasse ou déplacer les plantes ?",
      answer:
        "On vous demande de dégager le mobilier léger ; on s’occupe de protéger ce qui reste et la végétation en bordure. Pour une terrasse en bois, prévoyez aussi de laisser sécher plusieurs jours avant de tout réinstaller si on applique un saturateur.",
    },
    {
      question: "Ma terrasse en bois est très grise, peut-on la récupérer ?",
      answer:
        "Dans la plupart des cas, oui. Un dégriseur retire la couche grise oxydée et redonne au bois sa teinte chaude ; un saturateur la fixe ensuite. On juge sur place : si des lames sont fendues ou vrillées, on vous le dit franchement.",
    },
  ],
  peinture: [
    {
      question: "Pourquoi ma précédente peinture de façade s’est-elle écaillée ?",
      answer:
        "Presque toujours à cause d’un support mal préparé : peinture appliquée sur un enduit sale, humide, farinant, ou sans sous-couche adaptée. On nettoie, on traite, on rebouche et on ponce avant de peindre — c’est ce qui fait tenir le résultat.",
    },
    {
      question: "À quelle saison peut-on peindre à l’extérieur ?",
      answer:
        "Du printemps à l’automne, hors gel, hors forte chaleur et sur support sec. Dans l’Ain et le Pays de Gex, la fenêtre va en général d’avril à octobre. On cale le chantier sur une période météo favorable.",
    },
    {
      question: "Peinture ou lasure pour mes volets et boiseries en bois ?",
      answer:
        "La lasure et le saturateur laissent respirer le bois et ne cloquent pas ; ils demandent un entretien plus régulier. La peinture microporeuse couvre davantage et tient plus longtemps, mais se refait entièrement le moment venu. On vous conseille selon l’état du bois et le rendu que vous voulez.",
    },
    {
      question: "Repeignez-vous aussi les sous-faces de toit et les rives ?",
      answer:
        "Oui, c’est une demande fréquente. Sous-faces, planches de rive, débords : on les nettoie, on les ponce et on les remet en peinture avec un produit qui résiste à l’humidité sous la toiture.",
    },
  ],
};
