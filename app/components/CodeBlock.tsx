export type CodeLine =
  | { text: string; comment?: false; blank?: false }
  | { text: string; comment: true }
  | { blank: true };

type CodeBlockProps = {
  /** Filename shown in the title bar, e.g. "solution.py". */
  filename: string;
  /** Language label, e.g. "PYTHON". */
  language: string;
  lines: CodeLine[];
};

/**
 * Dark code card: a typographic title bar (filename, language), then
 * gutter-numbered monospace lines. Comment lines use the muted-green comment
 * color; the gutter is non-selectable. See DESIGN_SYSTEM.md §5.
 *
 * No window chrome: the bar is a label + rule, not a fake macOS title bar.
 */
export function CodeBlock({ filename, language, lines }: CodeBlockProps) {
  return (
    <div style={{ border: "var(--rule-heavy)", borderRadius: 6, overflow: "hidden" }}>
      {/* Title bar */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: "11px 16px",
          borderBottom: "1px solid var(--ink-body)",
          background: "var(--code-bar)",
        }}
      >
        <span
          className="font-mono"
          style={{ fontSize: 12, fontWeight: 500, color: "var(--code-line)" }}
        >
          {filename}
        </span>
        <span
          className="font-mono"
          style={{ fontSize: 11, letterSpacing: "0.5px", color: "var(--ink-soft)" }}
        >
          {language}
        </span>
      </div>

      {/* Lines */}
      <div
        className="font-mono"
        style={{
          padding: "18px 16px",
          fontSize: 13.5,
          lineHeight: 1.75,
          overflowX: "auto",
          background: "var(--code-bg)",
          color: "var(--code-line)",
        }}
      >
        {lines.map((line, i) => (
          <div key={i} className="flex" style={{ gap: 16 }}>
            <span
              style={{
                color: "var(--code-gutter)",
                width: 18,
                textAlign: "right",
                flex: "none",
                userSelect: "none",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {i + 1}
            </span>
            <span
              style={{
                whiteSpace: "pre",
                ...("comment" in line && line.comment ? { color: "var(--code-comment)" } : {}),
              }}
            >
              {"blank" in line && line.blank ? " " : (line as { text: string }).text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
