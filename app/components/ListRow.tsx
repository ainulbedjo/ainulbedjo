import Link from "next/link";
import type { ReactNode } from "react";

type ListRowProps = {
  href: string;
  children: ReactNode;
  /** Grid template for column layouts (problem table). Omit for the flex feed. */
  columns?: string;
  /** Draw a bottom hairline in addition to the top one (last row). */
  closeBottom?: boolean;
  className?: string;
};

/**
 * A hairline-divided row that links somewhere. Two shapes:
 * - Feed: no `columns` → flex row (date / title+meta / arrow), used on Veranda.
 * - Table: pass `columns` (a CSS grid template) → aligned columns, used on LeetCode.
 * See DESIGN_SYSTEM.md §5.
 */
export function ListRow({
  href,
  children,
  columns,
  closeBottom = false,
  className = "",
}: ListRowProps) {
  const style: React.CSSProperties = {
    borderTop: "var(--rule-hair)",
    ...(closeBottom ? { borderBottom: "var(--rule-hair)" } : {}),
    ...(columns
      ? {
          display: "grid",
          gridTemplateColumns: columns,
          gap: 16,
          alignItems: "center",
          padding: "20px 0",
        }
      : {
          display: "flex",
          gap: 28,
          alignItems: "baseline",
          padding: "22px 0",
        }),
  };

  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}
