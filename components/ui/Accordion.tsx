"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import styles from "./Accordion.module.css";

export type AccordionItemData = {
  /** clé stable */
  id: string;
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItemData[];
  /** un seul panneau ouvert à la fois (défaut : true) */
  single?: boolean;
  /** id du premier panneau ouvert au montage */
  defaultOpen?: string;
  className?: string;
};

/**
 * Accordéon accessible.
 * - Ouverture animée via `grid-template-rows: 0fr → 1fr` (claude.md §5),
 *   pas de `height: auto` en JS.
 * - Boutons `aria-expanded` + `aria-controls`, panneau `role="region"`.
 * - `prefers-reduced-motion` : on garde le fondu, pas le déploiement.
 */
export function Accordion({
  items,
  single = true,
  defaultOpen,
  className,
}: AccordionProps) {
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(defaultOpen ? [defaultOpen] : []),
  );
  const baseId = useId();

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(single ? [] : prev);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const btnId = `${baseId}-${item.id}-btn`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id} className={styles.item} data-open={isOpen ? "" : undefined}>
            <h3 className={styles.heading}>
              <button
                type="button"
                id={btnId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span className={styles.title}>{item.title}</span>
                <Plus className={styles.icon} size={20} aria-hidden />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={styles.panel}
              inert={!isOpen}
            >
              <div className={styles.panelInner}>{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
