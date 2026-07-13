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
  if (variant === "underline") {
    return (
      <Link
        href={href}
        className={`inline-flex items-center font-mono text-ink ${className}`}
        style={{
          fontSize: 13,
          fontWeight: 500,
          borderBottom: "2px solid #1a1a1a",
          paddingBottom: 3,
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`inline-flex items-center bg-ink font-mono text-white ${className}`}
      style={{
        gap: 9,
        fontSize: 13,
        fontWeight: 500,
        padding: "13px 22px",
        borderRadius: 3,
      }}
    >
      {children}
      {withArrow ? <HandArrow color="#fff" /> : null}
    </Link>
  );
}
