import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Lien interne qui ne fait du prefetch QUE vers les pages réellement
 * construites. Tant que le site est en cours d'assemblage (cf. claude.md
 * §12), Next prefetch sinon des routes 404 → bruit console + requêtes
 * inutiles à chaque chargement.
 *
 * TODO : au fur et à mesure que les pages sont créées, les ajouter à
 * BUILT_ROUTES (ou supprimer ce garde-fou une fois le site complet).
 */
const BUILT_ROUTES = new Set<string>([
  "/",
  "/contact",
  // "/toiture", "/nettoyage", "/peinture",
  // "/realisations", "/a-propos",
  // "/zone-intervention", "/mentions-legales", "/politique-confidentialite",
]);

type NavLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
  };

export function NavLink({ href, prefetch, children, ...rest }: NavLinkProps) {
  const path = typeof href === "string" ? href.split(/[?#]/)[0] : "";
  const known = BUILT_ROUTES.has(path);

  return (
    <Link href={href} prefetch={prefetch ?? (known ? undefined : false)} {...rest}>
      {children}
    </Link>
  );
}
