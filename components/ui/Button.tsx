import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";
type Tone = "default" | "onDark";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  children: ReactNode;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<"button">, "className">;

type ButtonProps = ButtonAsLink | ButtonAsButton;

function classes(
  variant: Variant,
  size: Size,
  tone: Tone,
  className?: string,
) {
  return [
    styles.button,
    styles[variant],
    styles[size],
    tone === "onDark" ? styles.onDark : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    tone = "default",
    className,
    children,
    ...rest
  } = props;

  const cls = classes(variant, size, tone, className);

  if (typeof props.href === "string") {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={cls} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  );
}
