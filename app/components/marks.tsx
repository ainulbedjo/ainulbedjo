/**
 * Hand-drawn SVG marks — the site's signature accents.
 * Keep them rare: one or two per screen. See DESIGN_SYSTEM.md §6.
 */

type MarkProps = {
  /** Stroke color; defaults to ink. */
  color?: string;
  className?: string;
};

/**
 * Wobbly underline placed under the active nav item. Positioned absolutely by
 * the caller (Nav does this). Width is generous so it reads under one word.
 */
export function HandUnderline({ color = "#1a1a1a", className }: MarkProps) {
  return (
    <svg
      width="66"
      height="9"
      viewBox="0 0 66 9"
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", left: 0, bottom: -8 }}
    >
      <path
        d="M2 5 C 18 1, 44 8, 64 3"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
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
