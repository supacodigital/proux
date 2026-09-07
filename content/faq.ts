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
