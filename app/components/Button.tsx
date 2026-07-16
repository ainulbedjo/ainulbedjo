import Link from "next/link";
import type { ReactNode } from "react";
import { HandArrow } from "./marks";

type ButtonVariant = "solid" | "underline";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  /** Append the hand-drawn arrow (solid variant only). */
  withArrow?: boolean;
  className?: string;
};

/** Internal app routes use next/link; protocol/anchor/external use a plain <a>. */
function isInternal(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * Link-styled call to action.
 * - `solid`: ink background, white mono text, 3px radius, optional trailing arrow.
 * - `underline`: ink mono text over a 2px ink underline (secondary actions).
 * See DESIGN_SYSTEM.md §5.
 */
export function Button({
  children,
  href,
  variant = "solid",
  withArrow = false,
  className = "",
}: ButtonProps) {
  const style: React.CSSProperties =
    variant === "underline"
      ? { fontSize: 13, fontWeight: 500, borderBottom: "2px solid var(--ink)", paddingBottom: 3 }
      : { gap: 9, fontSize: 13, fontWeight: 500, padding: "13px 22px", borderRadius: 3, color: "var(--paper-white)" };

  const classes =
    variant === "underline"
      ? `inline-flex items-center font-mono text-ink ${className}`
      : `inline-flex items-center bg-ink font-mono ${className}`;

  const content = (
    <>
      {children}
      {variant === "solid" && withArrow ? <HandArrow color="var(--paper-white)" /> : null}
    </>
  );

  if (isInternal(href)) {
    return (
      <Link href={href} className={classes} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} style={style}>
      {content}
    </a>
  );
}
