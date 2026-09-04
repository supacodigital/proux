import type { ElementType, ReactNode } from "react";
import styles from "./Container.module.css";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function Container({ as: Tag = "div", children, className }: ContainerProps) {
  return (
    <Tag className={[styles.container, className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}
