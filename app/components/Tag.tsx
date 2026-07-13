import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Mono topic / metadata label, e.g. "trees · dfs · recursion".
 * Plain soft-ink text, no border. See DESIGN_SYSTEM.md §5.
 */
export function Tag({ children, className = "" }: TagProps) {
  return (
    <span className={`font-mono text-ink-soft ${className}`} style={{ fontSize: 12 }}>
      {children}
    </span>
  );
}
