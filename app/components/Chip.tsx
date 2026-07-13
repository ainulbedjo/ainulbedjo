import type { ReactNode } from "react";

type ChipVariant = "active" | "outline" | "muted";

type ChipProps = {
  children: ReactNode;
  variant?: ChipVariant;
};

/**
 * Filter pill (mono, 3px radius). Used in the LeetCode filter row.
 * - `active`: ink fill, white text (the selected filter).
 * - `outline`: 1.5px ink border (primary, unselected).
 * - `muted`: soft border + soft text (secondary topics).
 * See DESIGN_SYSTEM.md §5.
 */
export function Chip({ children, variant = "outline" }: ChipProps) {
  const base = {
    fontSize: 12,
    padding: "7px 14px",
    borderRadius: 3,
  } as const;

  const styles: Record<ChipVariant, React.CSSProperties> = {
    active: { ...base, background: "#1a1a1a", color: "#fff" },
    outline: { ...base, border: "1.5px solid #1a1a1a" },
    muted: { ...base, border: "1.5px solid #dcdcdc", color: "#8a8a8a" },
  };

  return (
    <span className="font-mono" style={styles[variant]}>
      {children}
    </span>
  );
}
