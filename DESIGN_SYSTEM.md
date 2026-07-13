# AinulBedjo — Design System

A warm, literary, hand-crafted personal site. The feeling to protect: _ink on cream
paper_, a porch you write on. Serif prose, a hand-drawn display face, monospace for
the machine-y bits (dates, tags, code), and small hand-drawn SVG marks (underlines,
arrows) that keep it from feeling like a template.

Source of truth for the visuals is the Claude Design project (the `.dc.html` pages:
`Veranda`, `About`, `Projects`, `LeetCode`, `LeetCodeSolution`). This document and the
React components in [`app/components/`](app/components/) are the code port of that
system.

---

## 1. Principles

- **Ink on paper.** One ink color (`#1a1a1a`) on a warm cream (`#faf8f3`). Grays are
  ink at reduced strength, never a new hue. Color is earned, not decorative.
- **Three voices, three fonts.** Display (hand-drawn), serif (prose), mono (metadata &
  code). Never mix their jobs.
- **Hand-drawn accents, sparingly.** A wobbly underline under the active nav item, an
  arrow that curves. These are the signature — one or two per screen, not a pattern.
- **Rules over boxes.** Structure comes from hairline rules and a heavy `1.5px` ink
  rule, not from cards with shadows. Borders are crisp (`1.5px solid #1a1a1a`), corners
  barely rounded (`3–6px`).
- **Generous measure.** Prose caps around `580–640px`; page content caps at
  `1040–1120px`, centered, `40px` side padding.

---

## 2. Color tokens

Defined as CSS custom properties in [`app/globals.css`](app/globals.css) and exposed to
Tailwind via `@theme` (e.g. `bg-paper`, `text-ink-faint`).

### Surfaces

| Token             | Value     | Tailwind          | Use                              |
| ----------------- | --------- | ----------------- | -------------------------------- |
| `--paper`         | `#faf8f3` | `bg-paper`        | Default page background          |
| `--paper-white`   | `#ffffff` | `bg-paper-white`  | Alt background option            |
| `--paper-tan`     | `#f6f0e6` | `bg-paper-tan`    | Warmer alt background            |
| `--paper-tan-deep`| `#f1e8d8` | `bg-paper-tan-deep` | Warmest alt background         |

`Veranda` exposes a background swatch set of exactly these four in the editor Theme
panel — treat them as the only allowed page backgrounds.

### Ink

| Token         | Value     | Tailwind         | Use                                        |
| ------------- | --------- | ---------------- | ------------------------------------------ |
| `--ink`       | `#1a1a1a` | `text-ink`       | Primary text, headings, active nav, rules  |
| `--ink-body`  | `#333333` | `text-ink-body`  | Long-form paragraph prose                  |
| `--ink-muted` | `#666666` | `text-ink-muted` | Secondary captions (complexity notes)      |
| `--ink-soft`  | `#8a8a8a` | `text-ink-soft`  | Tertiary metadata (topics, difficulty)     |
| `--ink-faint` | `#9a9a9a` | `text-ink-faint` | Inactive nav, labels, dates, gutter        |

### Lines

| Token         | Value     | Use                                             |
| ------------- | --------- | ----------------------------------------------- |
| `--rule`      | `#ececec` | Hairline list dividers                          |
| `--rule-soft` | `#dcdcdc` | Inactive chip borders                           |
| `--ink` (rule)| `#1a1a1a` | Heavy structural rules (`1.5px`), card outlines |

### Code surface (dark)

| Token            | Value     | Use                          |
| ---------------- | --------- | ---------------------------- |
| `--code-bg`      | `#1a1a1a` | Code block background        |
| `--code-bar`     | `#141414` | Code block title bar         |
| `--code-line`    | `#e2e2e2` | Code text                    |
| `--code-gutter`  | `#555555` | Line numbers                 |
| `--code-comment` | `#7d9a6d` | Code comments (muted green)  |

> Extending the palette: if these are too restrictive, derive new values in `oklch`
> harmonized with the ink/paper pair — do not invent unrelated hues.

---

## 3. Typography

Three families, loaded via `next/font/google` in
[`app/layout.tsx`](app/layout.tsx) and exposed as `font-display`, `font-serif`,
`font-mono`.

| Role        | Family          | Token          | Notes                                   |
| ----------- | --------------- | -------------- | --------------------------------------- |
| Display     | Shantell Sans   | `font-display` | Headings, brand, hand-drawn asides      |
| Serif       | Newsreader      | `font-serif`   | Body prose, list titles (body default)  |
| Mono        | JetBrains Mono  | `font-mono`    | Dates, tags, labels, code, buttons      |

### Type scale (observed from the pages)

| Step            | Size   | Family  | Weight | Example                          |
| --------------- | ------ | ------- | ------ | -------------------------------- |
| Hero            | 78px   | display | 600    | "Hi, I'm AinulBedjo."            |
| Page title      | 56–64px| display | 600    | "Solved & written up."           |
| Section head    | 26px   | display | 700    | "Recent", "My notes", "The code" |
| Brand mark      | 23px   | display | 700    | "AinulBedjo" nav logo            |
| Aside / mark    | 20–22px| display | 400–700| handwritten notes, "✎"           |
| Lead paragraph  | 22–23px| serif   | 400    | intro copy (`line-height:1.7`)   |
| Body paragraph  | 18px   | serif   | 400    | problem statement                |
| List item title | 21–24px| serif   | 500    | feed / problem row titles        |
| Metadata / label| 11–13px| mono    | 400–700| dates, tags, chips, labels       |
| Code            | 13.5px | mono    | 400    | `line-height:1.75`               |

Details: display headings use `letter-spacing:-1px` (`-1.5px` at hero). Uppercase mono
labels use `letter-spacing:0.5–1px`. Italic (`<em>`) is Newsreader italic, used for
emphasis in prose.

---

## 4. Spacing & layout

- **Container:** `max-width` `1040px` (index/list pages) or `1120px` (solution detail),
  `margin:0 auto`, `padding:… 40px`.
- **Vertical rhythm:** section gaps around `70px`; header blocks `~34px` bottom padding;
  list rows `20–22px` vertical padding.
- **Radii:** `3px` (chips, tags, buttons), `4px` (outlined cards), `6px` (code block).
- **Borders:** `1.5px solid #1a1a1a` for structural outlines and the heavy rule; `1px`
  hairlines use `--rule`.
- **Prose measure:** `max-width` `580–640px`.

---

## 5. Components

Ported to React in [`app/components/`](app/components/). Import from the barrel:

```tsx
import { Nav, Footer, Button, Chip, Tag, Difficulty, ListRow, OutlineCard, CodeBlock, Container } from "@/app/components";
```

| Component     | File                                                       | Purpose                                                     |
| ------------- | ---------------------------------------------------------- | ----------------------------------------------------------- |
| `Container`   | [`Container.tsx`](app/components/Container.tsx)            | Centered max-width wrapper (`md` 1040 / `lg` 1120 / `xl` 1320). |
| `Nav`         | [`Nav.tsx`](app/components/Nav.tsx)                        | Brand + links; active link gets the hand-drawn underline.  |
| `Footer`      | [`Footer.tsx`](app/components/Footer.tsx)                  | Heavy top rule, copyright, "built on the veranda ✎".        |
| `Button`      | [`Button.tsx`](app/components/Button.tsx)                  | `solid` (ink) and `underline` (text + 2px rule) variants.  |
| `Chip`        | [`Chip.tsx`](app/components/Chip.tsx)                      | Filter pill: `active`, `outline`, `muted`.                 |
| `Tag`         | [`Tag.tsx`](app/components/Tag.tsx)                        | Mono topic/meta label (e.g. `trees · dfs`).                |
| `Difficulty`  | [`Difficulty.tsx`](app/components/Difficulty.tsx)         | EASY / MEDIUM / HARD label, `solid` or `plain`.            |
| `ListRow`     | [`ListRow.tsx`](app/components/ListRow.tsx)               | Hairline-divided feed / table row (link).                  |
| `OutlineCard` | [`OutlineCard.tsx`](app/components/OutlineCard.tsx)       | `1.5px` ink-outlined card with an optional mono eyebrow.   |
| `CodeBlock`   | [`CodeBlock.tsx`](app/components/CodeBlock.tsx)           | Dark code card with title bar, gutter, comment coloring.   |
| `HandUnderline` / `HandArrow` | [`marks.tsx`](app/components/marks.tsx)   | The hand-drawn SVG accents.                                |

### Component notes

**Nav** — brand text varies across pages (`AinulBedjo` on the Veranda hero,
`ainulbedjo.` elsewhere); pass it as a prop. Exactly one link is `active` and carries
`HandUnderline`, whose stroke width is sized per word to match the design (about 46,
projects 60, leetcode 62, veranda 70). `size` aligns the nav with the page container
below it — use `xl` on the wide Projects layout.

**Button** — `solid` is ink background, white mono text, `3px` radius, optional trailing
`HandArrow`. `underline` is ink text over a `2px` ink underline; use for secondary
actions ("read the latest", "open on leetcode ↗"). Internal (`/…`) hrefs render via
`next/link`; `mailto:`, `#anchor`, and external hrefs render as a plain `<a>`.

**Difficulty** — HARD/MEDIUM render in full-strength ink; EASY drops to `ink-soft`. The
`solid` variant (inverted black pill) is for the detail-page header only.

**CodeBlock** — content is line objects (`{ text, comment?, blank? }`). Comments use
`--code-comment`; the gutter is non-selectable. Keep it monospace at `13.5px`.

---

## 6. Hand-drawn marks

Two small inline SVGs give the site its signature. Keep them rare.

- **`HandUnderline`** — the wobbly stroke under the active nav item. Width scales to the
  word; `stroke #1a1a1a`, `stroke-width 2`, `round` caps.
- **`HandArrow`** — a curving arrow used inside primary buttons and "see all" links.

Both are ink-colored and inherit sizing via props. Do not add more SVG imagery — for
anything richer, use a real asset instead of drawing it.

---

## 7. Do / Don't

**Do**

- Keep one ink + one paper; add grays only from the ink ramp.
- Let rules and whitespace carry structure.
- Use mono for anything the machine says (dates, tags, code, difficulty).

**Don't**

- Add gradients, drop shadows, or accent-bordered rounded "info" cards.
- Introduce Inter/Roboto/Arial or a fourth font.
- Scatter hand-drawn marks — one or two per screen.
- Invent new hues; derive from `oklch` off the existing pair if you must.
