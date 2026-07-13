import { Nav, Footer, Container, Button, Chip } from "@/app/components";

type ResumeEntry = {
  title: string;
  period: string;
  body: string;
};

const EXPERIENCE: ResumeEntry[] = [
  {
    title: "Senior Backend Engineer · Tavola",
    period: "2023 — now",
    body: "Own the payments & ledger services. Cut p99 checkout latency by 40% and led the move to an event-sourced ledger. Mentor two engineers.",
  },
  {
    title: "Software Engineer · Northwind Labs",
    period: "2019 — 2023",
    body: "Built internal tooling and the data pipeline behind analytics. Shipped the first version of the API gateway now serving 3B requests/day.",
  },
];

const TOOLKIT = [
  "Go",
  "Python",
  "PostgreSQL",
  "Kafka",
  "gRPC",
  "Redis",
  "Kubernetes",
  "TypeScript",
];

/** A resume row: a 220px label column + content. */
function ResumeRow({
  heading,
  meta,
  heavyRule = false,
  children,
}: {
  heading: string;
  meta: string;
  heavyRule?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        gap: 40,
        padding: "36px 0",
        borderTop: heavyRule ? "1.5px solid #1a1a1a" : "1px solid #ececec",
      }}
    >
      <div>
        <h2 className="font-display" style={{ fontWeight: 700, fontSize: 24, margin: 0 }}>
          {heading}
        </h2>
        <div className="font-mono text-ink-faint" style={{ fontSize: 11, marginTop: 6 }}>
          {meta}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

/** A dated entry (title + period + description) used in Experience/Education. */
function DatedEntry({ title, period, body }: ResumeEntry) {
  return (
    <div>
      <div className="flex items-baseline justify-between" style={{ gap: 16 }}>
        <div style={{ fontSize: 22, fontWeight: 600 }}>{title}</div>
        <div className="font-mono text-ink-faint" style={{ fontSize: 12, flex: "none" }}>
          {period}
        </div>
      </div>
      <p style={{ fontSize: 18, lineHeight: 1.65, margin: "8px 0 0", color: "#444" }}>{body}</p>
    </div>
  );
}

export default function About() {
  return (
    <>
      <Nav active="about" brand="ainulbedjo." />

      {/* HEADER */}
      <Container>
        <div style={{ paddingTop: 70, paddingBottom: 20 }}>
          <div
            className="font-mono text-ink-faint"
            style={{ fontSize: 12, letterSpacing: 1, marginBottom: 22 }}
          >
            WHO&apos;S WRITING
          </div>
          <h1
            className="font-display"
            style={{ fontWeight: 600, fontSize: 64, lineHeight: 1.05, margin: 0, letterSpacing: "-1px" }}
          >
            A bit about me.
          </h1>
          <p
            className="text-ink-body"
            style={{ fontSize: 22, lineHeight: 1.75, maxWidth: 640, margin: "28px 0 0" }}
          >
            I&apos;m AinulBedjo — a backend engineer who likes systems that stay quiet
            under load and code that reads like a sentence. I write things down by hand
            before I type them, which is why half this site looks like a notebook. Below
            is the tidy, resume-shaped version.
          </p>
        </div>
      </Container>

      {/* RESUME */}
      <Container>
        <div style={{ paddingTop: 56, paddingBottom: 20 }}>
          <ResumeRow heading="Experience" meta="2019 — NOW" heavyRule>
            <div className="flex flex-col" style={{ gap: 30 }}>
              {EXPERIENCE.map((e) => (
                <DatedEntry key={e.title} {...e} />
              ))}
            </div>
          </ResumeRow>

          <ResumeRow heading="Toolkit" meta="DAY TO DAY">
            <div className="flex flex-wrap" style={{ gap: 10, alignContent: "flex-start" }}>
              {TOOLKIT.map((skill) => (
                <Chip key={skill} variant="outline">
                  {skill}
                </Chip>
              ))}
            </div>
          </ResumeRow>

          <ResumeRow heading="Education" meta="2015 — 2019">
            <DatedEntry
              title="B.S. Computer Science · Seoul National University"
              period="2019"
              body="Focus on distributed systems & databases. Undergraduate TA for Algorithms — which is where the LeetCode habit started."
            />
          </ResumeRow>

          <ResumeRow heading="Lately" meta="OFF THE CLOCK">
            <div style={{ position: "relative" }}>
              <p style={{ fontSize: 18, lineHeight: 1.7, margin: 0, color: "#444" }}>
                Working through <strong>75 hard graph problems</strong>, learning to bind
                books by hand, and slowly restoring a 1970s film camera. I keep a running
                list of ideas that will probably never ship — and that&apos;s the fun part.
              </p>
              <div
                className="font-display text-ink"
                style={{ fontSize: 19, transform: "rotate(-2deg)", marginTop: 18 }}
              >
                — ask me about the camera ✎
              </div>
            </div>
          </ResumeRow>
        </div>
      </Container>

      {/* CTA */}
      <Container>
        <div className="flex flex-wrap items-center" style={{ gap: 22, padding: "20px 0" }}>
          <Button href="/projects" withArrow>
            see my projects
          </Button>
          <Button href="mailto:ainulbedjo@example.com" variant="underline">
            ainulbedjo@example.com
          </Button>
        </div>
      </Container>

      <Footer />
    </>
  );
}
