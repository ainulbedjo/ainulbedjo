import Link from "next/link";
import { Container } from "./Container";
import { HandUnderline } from "./marks";

export type NavKey = "about" | "projects" | "veranda" | "leetcode";

/** `underline` is the hand-drawn stroke width, sized to the word (see design). */
type NavItem = { key: NavKey; label: string; href: string; underline: number };

const NAV_ITEMS: readonly NavItem[] = [
  { key: "about", label: "about", href: "/about", underline: 46 },
  { key: "projects", label: "projects", href: "/projects", underline: 60 },
  { key: "veranda", label: "veranda", href: "/", underline: 70 },
  { key: "leetcode", label: "leetcode", href: "/leetcode", underline: 62 },
];

type NavProps = {
  /** Which link is the current page — gets the hand-drawn underline. */
  active?: NavKey;
  /** Brand text; varies per page (e.g. "AinulBedjo", "ainulbedjo."). */
  brand?: string;
  /** Container width to align with the page below. */
  size?: "md" | "lg" | "xl";
};

/**
 * Top navigation: display-font brand + mono links. The active link is ink;
 * the rest are faint, and the active one carries the hand-drawn underline.
 * See DESIGN_SYSTEM.md §5.
 */
export function Nav({ active, brand = "ainulbedjo.", size = "lg" }: NavProps) {
  return (
    <Container size={size}>
      <nav className="flex flex-wrap items-center justify-between py-7" style={{ gap: 16 }}>
        <Link
          href="/"
          className="font-display text-ink"
          style={{ fontWeight: 700, fontSize: 23 }}
        >
          {brand}
        </Link>
        <div className="flex font-mono" style={{ gap: 32, fontSize: 13 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === active;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={isActive ? "text-ink" : "text-ink-faint"}
                style={isActive ? { position: "relative" } : undefined}
              >
                {item.label}
                {isActive ? <HandUnderline width={item.underline} /> : null}
              </Link>
            );
          })}
        </div>
      </nav>
    </Container>
  );
}
