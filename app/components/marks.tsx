/**
 * Hand-drawn SVG marks — the site's signature accents.
 * Keep them rare: one or two per screen. See DESIGN_SYSTEM.md §6.
 */

type MarkProps = {
  /** Stroke color; inherits the ink of whatever it sits in by default. */
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
export function HandUnderline({ color = "currentColor", width = 60, className }: UnderlineProps) {
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

/**
 * Wobbly hand-drawn square frame — sits behind/around a portrait or image.
 * Render it absolutely-positioned as a sibling overlay so the photo shows
 * through the middle. The path traces a rounded-ish square with a deliberate
 * wobble so it reads as ink, not a CSS border. See DESIGN_SYSTEM.md §6.
 */
export function HandFrame({ color = "currentColor", className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 105 105"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0, width: "105%", height: "105%" }}
    >
      <path
        d="M4 6 C 30 3, 62 5, 95 4 C 97 30, 96 64, 96 95 C 66 97, 34 95, 5 96 C 3 66, 5 34, 4 6 Z"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * The veranda plant — a stem, four leaves and a bud that draw themselves on,
 * then sway from the soil. Pure CSS: each path is dashed to its own length and
 * the offset animates to 0, staggered so the plant grows bottom-up. The sway
 * waits for the drawing to finish. Both cut out under reduced-motion.
 *
 * The signature illustration allowed by DESIGN_SYSTEM.md §6 — one per site.
 */
export function HandPlant({ color = "currentColor", className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 120 220"
      aria-hidden="true"
      className={`hand-plant ${className ?? ""}`}
      style={{ width: "100%", height: "auto", display: "block" }}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* stem — drawn first, root to tip */}
      <path d="M60 216 C 61 170, 57 120, 60 78 C 62 50, 59 27, 60 10" />
      {/* leaves — alternating, low to high */}
      <path d="M60 168 C 39 161, 25 145, 27 120 C 52 125, 65 145, 60 168 Z" />
      <path d="M60 136 C 83 129, 97 111, 95 86 C 69 91, 55 113, 60 136 Z" />
      <path d="M60 102 C 41 96, 30 81, 32 58 C 55 63, 66 81, 60 102 Z" />
      <path d="M60 73 C 81 67, 93 52, 91 32 C 67 37, 55 55, 60 73 Z" />
      {/* bud */}
      <path d="M60 26 C 52 19, 52 10, 60 4 C 68 10, 68 19, 60 26 Z" />
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
export function HandArrow({ color = "currentColor", width = 20, className }: ArrowProps) {
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
