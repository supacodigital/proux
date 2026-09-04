import { Clock, Home, MapPin, ShieldCheck, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { trustBar } from "@/content/company";
import styles from "./TrustBar.module.css";

const TRUST_ICONS: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  clock: Clock,
  map: MapPin,
  home: Home,
};

export function TrustBar() {
  return (
    <div className={styles.wrap}>
      <Container>
        <ul className={styles.list}>
          {trustBar.map((item) => {
            const Icon = TRUST_ICONS[item.icon];
            return (
              <li
                key={item.label}
                className={styles.item}
                data-pending={item.pending ? "" : undefined}
              >
                <Icon size={18} aria-hidden className={styles.icon} strokeWidth={1.75} />
                {item.label}
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}
