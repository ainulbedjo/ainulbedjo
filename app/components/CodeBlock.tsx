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
 * Dark code card: a title bar (dot + filename, language + "copy"), then
 * gutter-numbered monospace lines. Comment lines use the muted-green comment
 * color; the gutter is non-selectable. See DESIGN_SYSTEM.md §5.
 */
export function CodeBlock({ filename, language, lines }: CodeBlockProps) {
  return (
    <div style={{ border: "1.5px solid #1a1a1a", borderRadius: 6, overflow: "hidden" }}>
      {/* Title bar */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "11px 16px", borderBottom: "1px solid #333", background: "#141414" }}
      >
        <div className="flex items-center" style={{ gap: 9 }}>
          <span
            style={{ width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #888" }}
          />
          <span
            className="font-mono"
            style={{ fontSize: 12, fontWeight: 500, color: "#e8e8e8" }}
          >
            {filename}
          </span>
        </div>
        <div className="flex items-center" style={{ gap: 12 }}>
          <span className="font-mono" style={{ fontSize: 11, color: "#8a8a8a" }}>
            {language}
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: 11,
              border: "1px solid #444",
              padding: "4px 9px",
              borderRadius: 3,
              color: "#ccc",
            }}
          >
            copy
          </span>
        </div>
      </div>

      {/* Lines */}
      <div
        className="font-mono"
        style={{
          padding: "18px 16px",
          fontSize: 13.5,
          lineHeight: 1.75,
          overflowX: "auto",
          background: "#1a1a1a",
          color: "#e2e2e2",
        }}
      >
        {lines.map((line, i) => (
          <div key={i} className="flex" style={{ gap: 16 }}>
            <span
              style={{
                color: "#555",
                width: 18,
                textAlign: "right",
                flex: "none",
                userSelect: "none",
              }}
            >
              {i + 1}
            </span>
            <span
              style={{
                whiteSpace: "pre",
                ...("comment" in line && line.comment ? { color: "#7d9a6d" } : {}),
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
