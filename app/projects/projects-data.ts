/**
 * Projects data + detail content.
 * Mirrors the leetcode `problems.ts` pattern: a flat list for the grid, plus an
 * optional `detail` block that powers the `/projects/[slug]` case-study page.
 * The detail layout is ported from the Claude Design `ProjectDetail.dc.html`.
 */

/** A screenshot slot in the gallery. `src` is optional — falls back to a
 *  captioned placeholder frame until a real image is dropped in `public/`. */
export type Shot = {
  /** Path under /public, e.g. "/projects/kirim/home.png". Optional. */
  src?: string;
  /** Short caption under the frame / placeholder hint. */
  caption: string;
};

export type ProjectDetail = {
  /** "mobile" → phone-frame gallery, "web" → browser-window gallery. */
  platform: "mobile" | "web";
  kicker: string;
  /** Pill next to the title, e.g. "ANDROID" or "WEB". */
  platformBadge: string;
  /** Sidebar platform line, e.g. "Android (Flutter)". */
  platformLabel: string;
  tagline: string;
  primaryHref: string;
  primaryLabel: string;
  repoHref: string;
  repoLabel: string;
  body: string[];
  highlights: string[];
  year: string;
  role: string;
  /** Gallery images. Mobile uses 3 phone frames; web uses 1 hero + 2 shots. */
  shots: Shot[];
  next: { title: string; href: string };
};

export type Project = {
  slug: string;
  index: string;
  kind: string;
  name: string;
  blurb: string;
  stack: string[];
  /** Present when the project has a written-up case study page. */
  detail?: ProjectDetail;
};

export const PROJECTS: Project[] = [
  {
    slug: "legacy-to-flutter",
    index: "01",
    kind: "AT AMARTHA",
    name: "Legacy → Flutter",
    blurb:
      "Led the migration of a large Kotlin codebase to Flutter and re-architected the repayment data source onto Firestore — cross-platform, cleaner, and easier to maintain.",
    stack: ["Flutter", "Kotlin", "Firestore"],
    detail: {
      platform: "mobile",
      kicker: "CASE STUDY · ANDROID APP",
      platformBadge: "ANDROID",
      platformLabel: "Android (Flutter)",
      tagline:
        "Migrating a years-old Kotlin app to Flutter without the users ever noticing — one screen at a time, in production.",
      primaryHref: "https://play.google.com/store/apps/details?id=com.amartha",
      primaryLabel: "Play Store",
      repoHref: "https://github.com/ainulbedjo",
      repoLabel: "Source",
      body: [
        "The app had grown for years as native Kotlin, and the cost of shipping a new screen twice — once for each platform, in a codebase only a few people fully understood — kept climbing. The goal was a gradual migration to Flutter: no big-bang rewrite, no feature freeze, and no regressions on a fintech app people trust with their repayments.",
        "The hard part wasn't the UI — it was the data layer. I re-architected the repayment data source onto Firestore and built a bridge so Flutter and the remaining Kotlin screens could share the same source of truth during the transition. Every migrated screen shipped behind a flag, compared against the old one, and only then replaced it.",
      ],
      highlights: [
        "Incremental screen-by-screen migration behind feature flags — the app stayed shippable the entire time.",
        "Re-architected the repayment data source onto Firestore, with a bridge that kept Kotlin and Flutter in sync.",
        "Shared design-system components meant migrated screens matched the originals pixel-for-pixel on day one.",
      ],
      year: "2021 — now",
      role: "Lead the migration",
      shots: [
        { caption: "Home" },
        { caption: "Repayment flow" },
        { caption: "Receipt" },
      ],
      next: { title: "Stock Market App", href: "/projects/stock-market-app" },
    },
  },
  {
    slug: "shared-ui-kit",
    index: "02",
    kind: "DESIGN SYSTEM",
    name: "Shared UI Kit",
    blurb:
      "Built and maintain the reusable component library that keeps the app's screens consistent — the same hand-crafted, design-system mindset behind this site.",
    stack: ["Flutter", "Dart"],
  },
  {
    slug: "release-pipeline",
    index: "03",
    kind: "TOOLING",
    name: "Release Pipeline",
    blurb:
      "CI/CD tooling that smooths out the release cycle and automatically prunes unused dependencies & assets so the codebase stays lean.",
    stack: ["CI/CD", "Bash", "Fastlane"],
  },
  {
    slug: "stock-market-app",
    index: "04",
    kind: "SIDE PROJECT",
    name: "Stock Market App",
    blurb:
      "A Flutter stock-market app built in collaboration with Samuel Stock — real-time data, charts, and a focus on smooth, responsive UI.",
    stack: ["Flutter", "Dart"],
    detail: {
      platform: "web",
      kicker: "CASE STUDY · WEB APP",
      platformBadge: "WEB",
      platformLabel: "Responsive web",
      tagline:
        "A stock-market dashboard built with Samuel Stock — real-time quotes, readable charts, and a UI that stays smooth when the numbers don't.",
      primaryHref: "https://samuelstock.example.com",
      primaryLabel: "Visit live site",
      repoHref: "https://github.com/ainulbedjo",
      repoLabel: "Source",
      body: [
        "Samuel Stock needed a dashboard that made a live market feel calm instead of frantic. The brief was deceptively simple: show a lot of fast-moving numbers without the screen ever feeling like it's flickering at you. Everything after that was a fight against jitter.",
        "Most of the work went into the streaming layer and the charts. Quotes update several times a second, so I batched updates to a single animation frame and diffed against the last painted value — a price only re-renders when it actually changed. The charts share one rendering path so the hero view and the detail cards never disagree.",
      ],
      highlights: [
        "Batched real-time quote updates into a single frame, so a busy market never turns into a flickering screen.",
        "One chart engine drives the hero view and every detail card — the numbers can never contradict each other.",
        "Responsive from a trading desk down to a phone, with the same layout logic at every width.",
      ],
      year: "2021",
      role: "Design & build",
      shots: [
        { caption: "Dashboard" },
        { caption: "Watchlist detail" },
        { caption: "Single ticker" },
      ],
      next: { title: "Legacy → Flutter", href: "/projects/legacy-to-flutter" },
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
