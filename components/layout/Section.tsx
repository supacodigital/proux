import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";
import styles from "./Section.module.css";

type SectionProps = {
  as?: ElementType;
  /** fond de la section */
  tone?: "default" | "surface" | "navy";
  /** retire le padding vertical (utile pour les bandes fines) */
  flush?: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
  "aria-label"?: string;
};

export function Section({
  as: Tag = "section",
  tone = "default",
  flush = false,
  id,
  className,
  children,
  ...aria
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={[
        styles.section,
        styles[tone],
        flush ? styles.flush : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...aria}
    >
      <Container>{children}</Container>
    </Tag>
  );
}
