import type { ReactNode } from "react";

type OutlineCardProps = {
  children: ReactNode;
  /** Optional uppercase mono eyebrow, e.g. "THE PROBLEM" or "TIME". */
  eyebrow?: string;
  /** Corner radius; 4px default (cards), used at other steps by callers. */
  radius?: number;
  /** Inner padding shorthand. */
  padding?: string;
  className?: string;
};

/**
 * The 1.5px ink-outlined card. Structure comes from the crisp border, not a
 * shadow. Optional mono eyebrow sits above the content.
 * See DESIGN_SYSTEM.md §5.
 */
export function OutlineCard({
  children,
  eyebrow,
  radius = 4,
  padding = "26px 30px",
  className = "",
}: OutlineCardProps) {
  return (
    <div
      className={className}
      style={{ border: "1.5px solid #1a1a1a", borderRadius: radius, padding }}
    >
      {eyebrow ? (
        <div
          className="font-mono text-ink-faint"
          style={{ fontSize: 11, letterSpacing: "0.5px", marginBottom: 12 }}
        >
          {eyebrow}
        </div>
      ) : null}
      {children}
    </div>
  );
}
