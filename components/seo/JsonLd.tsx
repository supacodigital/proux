/**
 * Injecte un bloc JSON-LD (<script type="application/ld+json">).
 * `data` est sérialisé côté serveur — ne jamais y mettre de contenu
 * non maîtrisé (risque d'injection via </script>). Ici les données
 * viennent de fichiers `content/*.ts`, c'est sûr.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
