import { Nav, Footer, Container, Chip, Tag, Difficulty, ListRow } from "@/app/components";
import { PROBLEMS } from "./problems";

const TABLE_COLUMNS = "64px 1fr 120px 150px 90px";

export default function LeetCodeList() {
  return (
    <>
      <Nav active="leetcode" brand="ainulbedjo." />

      {/* HEADER */}
      <Container>
        <div style={{ paddingTop: 70, paddingBottom: 34 }}>
          <div
            className="font-mono text-ink-faint"
            style={{ fontSize: 13, fontWeight: "bold", letterSpacing: 1, marginBottom: 22 }}
          >
            THE PROBLEM SET
          </div>
          <div className="flex flex-wrap items-end" style={{ gap: 24 }}>
            <h1
              className="font-display"
              style={{ fontWeight: 600, fontSize: 64, lineHeight: 1, margin: 0, letterSpacing: "-1px" }}
            >
              Solved &amp; written up.
            </h1>
            <div
              className="font-display text-ink"
              style={{ fontSize: 22, transform: "rotate(-3deg)", paddingBottom: 8 }}
            >
              247 and counting →
            </div>
          </div>
          <p
            className="text-ink-body"
            style={{ fontSize: 22, lineHeight: 1.75, maxWidth: 640, margin: "26px 0 0" }}
          >
            Not a solutions dump. These are the problems that actually taught me
            something — each with notes I wrote by hand before typing a single line.
          </p>
        </div>
      </Container>

      {/* FILTER CHIPS */}
      <Container>
        <div className="flex flex-wrap" style={{ gap: 10, paddingBottom: 18 }}>
          <Chip variant="active">all</Chip>
          <Chip variant="outline">easy</Chip>
          <Chip variant="outline">medium</Chip>
          <Chip variant="outline">hard</Chip>
          <Chip variant="muted">graphs</Chip>
          <Chip variant="muted">dp</Chip>
          <Chip variant="muted">trees</Chip>
        </div>
      </Container>

      {/* PROBLEM LIST */}
      <Container>
        <div style={{ paddingTop: 14, paddingBottom: 20 }}>
          {/* header row */}
          <div
            className="font-mono text-ink-faint"
            style={{
              display: "grid",
              gridTemplateColumns: TABLE_COLUMNS,
              gap: 16,
              padding: "12px 0",
              fontSize: 13,
              fontWeight: "bold",
              letterSpacing: "0.5px",
              borderBottom: "1.5px solid #1a1a1a",
            }}
          >
            <span>#</span>
            <span>PROBLEM</span>
            <span>DIFFICULTY</span>
            <span>TOPIC</span>
            <span style={{ textAlign: "right" }}>DATE</span>
          </div>

          {PROBLEMS.map((p) => (
            <ListRow key={p.slug} href={`/leetcode/${p.slug}`} columns={TABLE_COLUMNS}>
              <span className="font-mono text-ink-faint" style={{ fontSize: 13, fontWeight: "bold" }}>
                {p.number}
              </span>
              <span style={{ fontSize: 21, fontWeight: 500 }}>{p.title}</span>
              <Difficulty level={p.difficulty} />
              <Tag>{p.topic}</Tag>
              <span
                className="font-mono text-ink-faint"
                style={{ fontSize: 13, fontWeight: "bold", textAlign: "right" }}
              >
                {p.date}
              </span>
            </ListRow>
          ))}
        </div>
      </Container>

      <Footer />
    </>
  );
}
