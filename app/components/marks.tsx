/**
 * Hand-drawn SVG marks — the site's signature accents.
 * Keep them rare: one or two per screen. See DESIGN_SYSTEM.md §6.
 */

type MarkProps = {
  /** Stroke color; defaults to ink. */
  color?: string;
  className?: string;
};

type UnderlineProps = MarkProps & {
  /**
   * Underline width in px — should roughly match the word it sits under, the
   * way the design sizes each nav item's stroke individually (about ≈ 46,
   * projects ≈ 60, leetcode ≈ 62, veranda ≈ 70).
   */
  width?: number;
};

/**
 * Wobbly underline placed under the active nav item. Positioned absolutely by
 * the caller (Nav does this). The wobble path scales with `width` so short
 * words ("about") don't get an overshooting stroke.
 */
export function HandUnderline({ color = "#1a1a1a", width = 60, className }: UnderlineProps) {
  // Scale the control points from a 60px reference path.
  const s = width / 60;
  const r = (n: number) => +(n * s).toFixed(1);
  const d = `M2 5 C ${r(17)} 1, ${r(40)} 8, ${r(58)} 3`;
  return (
    <svg
      width={width}
      height="9"
      viewBox={`0 0 ${width} 9`}
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", left: 0, bottom: -8 }}
    >
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

type ArrowProps = MarkProps & {
  /** Overall width in px; height scales with the viewBox. */
  width?: number;
};

/**
 * Curving arrow used inside primary buttons and "see all" links.
 */
export function HandArrow({ color = "#1a1a1a", width = 20, className }: ArrowProps) {
  const height = (width * 14) / 20;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 14"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 7 H 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M11 2 L 17 7 L 11 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
