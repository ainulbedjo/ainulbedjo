import { Container } from "./Container";

type FooterProps = {
  size?: "md" | "lg" | "xl";
  /** Copyright name. */
  name?: string;
  /** Copyright year. */
  year?: number;
};

/**
 * Page footer: a heavy 1.5px ink top rule, mono copyright on the left, and the
 * display-font "built on the veranda ✎" sign-off on the right.
 * See DESIGN_SYSTEM.md §5.
 */
export function Footer({ size = "md", name = "AinulBedjo", year = 2026 }: FooterProps) {
  return (
    <Container size={size} className="mt-10 pb-16">
      <div
        className="flex items-center justify-between font-mono text-ink-faint"
        style={{ borderTop: "1.5px solid #1a1a1a", paddingTop: 22, fontSize: 13, fontWeight: "bold" }}
      >
        <span>© {year} {name}</span>
        <span className="font-display text-ink" style={{ fontSize: 16 }}>
          built on the veranda ✎
        </span>
      </div>
    </Container>
  );
}
