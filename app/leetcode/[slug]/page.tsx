import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Nav,
  Footer,
  Container,
  Difficulty,
  Tag,
  OutlineCard,
  CodeBlock,
  HandArrow,
} from "@/app/components";
import { PROBLEMS, getProblem, type NoteBlock } from "../problems";

export function generateStaticParams() {
  return PROBLEMS.filter((p) => p.detail).map((p) => ({ slug: p.slug }));
}

function Note({ block }: { block: NoteBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <p style={{ margin: "0 0 20px" }} dangerouslySetInnerHTML={{ __html: block.html }} />
      );
    case "step":
      return (
        <>
          <p style={{ margin: "0 0 8px", fontWeight: 700 }}>
            {block.n} · <span dangerouslySetInnerHTML={{ __html: block.title }} />
          </p>
          <p style={{ margin: "0 0 20px" }} dangerouslySetInnerHTML={{ __html: block.body }} />
        </>
      );
    case "aside":
      return (
        <div
          style={{
            borderLeft: "2px solid var(--ink)",
            paddingLeft: 16,
            margin: "0 0 20px",
            transform: "rotate(-0.4deg)",
          }}
        >
          <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );
    case "arrow":
      return (
        <p className="flex items-center" style={{ margin: 0, gap: 8 }}>
          <span style={{ flex: "none", transform: "rotate(-8deg)" }}>
            <HandArrow width={42} />
          </span>
          {block.text}
        </p>
      );
  }
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = getProblem(slug);
  if (!problem || !problem.detail) notFound();

  const { detail } = problem;

  return (
    <>
      <Nav active="leetcode" brand="ainulbedjo." />

      {/* BREADCRUMB */}
      <Container>
        <div style={{ paddingTop: 26 }}>
          <Link
            href="/leetcode"
            className="inline-flex items-center font-mono text-ink-faint"
            style={{ fontSize: 13, fontWeight: "bold", gap: 8 }}
          >
            <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden="true">
              <path d="M24 6 H 4" stroke="var(--ink-soft)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              <path
                d="M8 2 L 3 6 L 8 10"
                stroke="var(--ink-soft)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            all problems
          </Link>
        </div>
      </Container>

      {/* PROBLEM HEADER */}
      <Container>
        <div style={{ paddingTop: 24, paddingBottom: 30 }}>
          <div className="flex items-center" style={{ gap: 14, marginBottom: 14 }}>
            <span className="font-mono text-ink-faint" style={{ fontSize: 13, fontWeight: "bold" }}>
              #{problem.number}
            </span>
            <Difficulty level={problem.difficulty} variant="solid" />
            <Tag>{problem.topicLong ?? problem.topic}</Tag>
          </div>
          <h1
            className="font-display"
            style={{ fontWeight: 600, fontSize: 56, lineHeight: 1.05, margin: 0, letterSpacing: "-1px" }}
          >
            {problem.title}
          </h1>
          <div
            className="flex font-mono text-ink-faint"
            style={{ gap: 26, marginTop: 16, fontSize: 13, fontWeight: "bold" }}
          >
            {problem.solvedOn ? <span>SOLVED {problem.solvedOn}</span> : null}
            {problem.runtime ? (
              <>
                <span>·</span>
                <span>RUNTIME {problem.runtime}</span>
              </>
            ) : null}
            {problem.url ? (
              <>
                <span>·</span>
                <a
                  href={problem.url}
                  className="text-ink"
                  style={{ borderBottom: "var(--rule-heavy)", paddingBottom: 1 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  open on leetcode ↗
                </a>
              </>
            ) : null}
          </div>
        </div>
      </Container>

      {/* PROBLEM STATEMENT */}
      <Container>
        <div style={{ paddingBottom: 10 }}>
          <OutlineCard eyebrow="THE PROBLEM">
            <p
              className="text-ink-body"
              style={{ fontSize: 18, lineHeight: 1.7, margin: 0 }}
              dangerouslySetInnerHTML={{ __html: detail.statement }}
            />
            <div
              className="flex flex-wrap font-mono"
              style={{ gap: 30, marginTop: 18, fontSize: 13, color: "var(--ink-body)" }}
            >
              <span>
                <span className="text-ink-faint">example →</span> &nbsp;
                <span dangerouslySetInnerHTML={{ __html: detail.example }} />
              </span>
              <span>
                <span className="text-ink-faint">constraint →</span> &nbsp;{detail.constraint}
              </span>
            </div>
          </OutlineCard>
        </div>
      </Container>

      {/* TWO COLUMN: NOTES + CODE */}
      <Container>
        <div
          style={{
            paddingTop: 30,
            paddingBottom: 20,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 36,
            alignItems: "start",
          }}
        >
          {/* LEFT: handwritten notes */}
          <div style={{ position: "relative" }}>
            <div className="flex items-center" style={{ gap: 10, marginBottom: 18 }}>
              <h2 className="font-display" style={{ fontWeight: 700, fontSize: 26, margin: 0 }}>
                My notes
              </h2>
              <span className="font-display" style={{ fontSize: 22 }}>
                ✎
              </span>
            </div>
            <div
              className="font-display text-ink"
              style={{ fontSize: 20, lineHeight: 1.85 }}
            >
              {detail.notes.map((block, i) => (
                <Note key={i} block={block} />
              ))}
            </div>
          </div>

          {/* RIGHT: code + complexity */}
          <div>
            <div className="flex items-center" style={{ gap: 10, marginBottom: 18 }}>
              <h2 className="font-display" style={{ fontWeight: 700, fontSize: 26, margin: 0 }}>
                The code
              </h2>
            </div>

            <CodeBlock
              filename={detail.code.filename}
              language={detail.code.language}
              lines={detail.code.lines}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
                marginTop: 16,
              }}
            >
              <OutlineCard padding="16px 18px">
                <div className="font-mono text-ink-faint" style={{ fontSize: 13, fontWeight: "bold", marginBottom: 8 }}>
                  TIME
                </div>
                <div className="font-mono" style={{ fontSize: 22, fontWeight: 700 }}>
                  {detail.complexity.time}
                </div>
                <div className="text-ink-muted" style={{ fontSize: 15, marginTop: 4 }}>
                  {detail.complexity.timeNote}
                </div>
              </OutlineCard>
              <OutlineCard padding="16px 18px">
                <div className="font-mono text-ink-faint" style={{ fontSize: 13, fontWeight: "bold", marginBottom: 8 }}>
                  SPACE
                </div>
                <div className="font-mono" style={{ fontSize: 22, fontWeight: 700 }}>
                  {detail.complexity.space}
                </div>
                <div className="text-ink-muted" style={{ fontSize: 15, marginTop: 4 }}>
                  {detail.complexity.spaceNote}
                </div>
              </OutlineCard>
            </div>
          </div>
        </div>
      </Container>

      {/* PREV / NEXT */}
      {detail.prev || detail.next ? (
        <Container>
          <div
            className="flex justify-between"
            style={{ paddingTop: 30, paddingBottom: 10, borderTop: "var(--rule-hair)" }}
          >
            <Link
              href="/leetcode"
              className="font-mono text-ink-faint"
              style={{ fontSize: 13, fontWeight: "bold" }}
            >
              {detail.prev ? `← ${detail.prev.label}` : ""}
            </Link>
            <Link href="/leetcode" className="font-mono text-ink" style={{ fontSize: 13 }}>
              {detail.next ? `${detail.next.label} →` : ""}
            </Link>
          </div>
        </Container>
      ) : null}

      <Footer />
    </>
  );
}
