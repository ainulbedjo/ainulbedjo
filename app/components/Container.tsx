import type { ReactNode } from "react";

type ContainerSize = "md" | "lg" | "xl";

type ContainerProps = {
  children: ReactNode;
  /**
   * md = 1040px (index/list pages), lg = 1120px (solution detail),
   * xl = 1320px (Projects grid).
   */
  size?: ContainerSize;
  className?: string;
};

const MAX_WIDTH: Record<ContainerSize, number> = {
  md: 1040,
  lg: 1120,
  xl: 1320,
};

/**
 * Centered max-width wrapper with the standard 40px side padding.
 * `width: 100%` matters: the page mounts inside a `flex flex-col` body, where
 * `mx-auto` alone would shrink the box to its content width and float it in the
 * middle. Filling the cross axis first lets max-width + auto margins center it.
 * See DESIGN_SYSTEM.md §4.
 */
export function Container({ children, size = "md", className = "" }: ContainerProps) {
  const maxWidth = MAX_WIDTH[size];
  return (
    <div
      className={`mx-auto w-full px-10 ${className}`}
      style={{ maxWidth }}
    >
      {children}
    </div>
  );
}
