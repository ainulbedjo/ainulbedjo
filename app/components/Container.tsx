import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  /** md = 1040px (index/list pages), lg = 1120px (solution detail). */
  size?: "md" | "lg";
  className?: string;
};

/**
 * Centered max-width wrapper with the standard 40px side padding.
 * See DESIGN_SYSTEM.md §4.
 */
export function Container({ children, size = "md", className = "" }: ContainerProps) {
  const maxWidth = size === "lg" ? 1120 : 1040;
  return (
    <div
      className={`mx-auto px-3 ${className}`}
      style={{ maxWidth }}
    >
      {children}
    </div>
  );
}
