export type Level = "EASY" | "MEDIUM" | "HARD";

type DifficultyProps = {
  level: Level;
  /** `plain` mono label (list rows) or `solid` inverted pill (detail header). */
  variant?: "plain" | "solid";
};

/**
 * Difficulty label. HARD/MEDIUM render in full-strength ink; EASY drops to
 * ink-soft. The `solid` variant is the black pill used on the solution header.
 * See DESIGN_SYSTEM.md §5.
 */
export function Difficulty({ level, variant = "plain" }: DifficultyProps) {
  if (variant === "solid") {
    return (
      <span
        className="font-mono text-white"
        style={{
          fontSize: 11,
          fontWeight: 700,
          background: "var(--ink)",
          padding: "5px 11px",
          borderRadius: 3,
          letterSpacing: "0.5px",
        }}
      >
        {level}
      </span>
    );
  }

  return (
    <span
      className={`font-mono ${level === "EASY" ? "text-ink-soft" : "text-ink"}`}
      style={{ fontSize: 12, fontWeight: 700 }}
    >
      {level}
    </span>
  );
}
