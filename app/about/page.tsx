import Image from "next/image";
import { Nav, Footer, Container, Button, Chip, HandFrame } from "@/app/components";

type ResumeEntry = {
  title: string;
  period: string;
  body: string;
};

const EXPERIENCE: ResumeEntry[] = [
  {
    title: "Software Development Engineer · Amartha",
    period: "2021 — now",
    body: "Led the migration of legacy Kotlin code to Flutter and re-architected the repayment data source onto Firestore. Build and maintain the shared design-system components, plus CI/CD tooling that streamlines releases and prunes unused dependencies & assets.",
  },
  {
    title: "Mobile Developer · TwisCode",
    period: "2021",
    body: "Maintained a Flutter-based CRM app and shipped a churn feature for a Java B2B application. Built a Flutter stock-market app in collaboration with Samuel Stock.",
  },
  {
    title: "Web Developer Intern · CV Idekreasi Mandiri",
    period: "2017",
    body: "Developed and maintained an ERP website for a local construction company using Laravel, jQuery, and Bootstrap.",
  },
];

const TOOLKIT = [
  "Flutter",
  "Kotlin",
  "Go",
  "Java",
  "Android",
  "Firebase",
  "Firestore",
  "CI/CD",
  "Event Monitoring",
  "Crashlytics",
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
        <div className="font-mono text-ink-faint" style={{ fontSize: 13, fontWeight: "bold", marginTop: 6 }}>
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
        <div className="font-mono text-ink-faint" style={{ fontSize: 13, flex: "none", fontWeight: "bold" }}>
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
        <div
          style={{
            paddingTop: 70,
            paddingBottom: 20,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 340px",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div>
            <div
              className="font-mono text-ink-faint"
              style={{ fontSize: 13, letterSpacing: 1, marginBottom: 22, fontWeight: "bold" }}
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
              I&apos;m Ainul — a software engineer from Indonesia who mainly uses Kotlin and Go. 
              I&apos;ve been building mobile apps for the past 5 years, and I&apos;m currently working on a fintech company called Amartha.
              I enjoy exploring new technologies, solving complex problems, and sharing knowledge with the my friends.
            </p>
          </div>

          {/* Framed portrait — drop the photo at public/portrait.jpg */}
          <div
            style={{
              position: "relative",
              width: 340,
              height: 340,
              transform: "rotate(-1.5deg)",
              justifySelf: "end",
            }}
          >
            <Image
              src="/portrait.jpg"
              alt="Ainul"
              fill
              sizes="340px"
              style={{ objectFit: "cover", padding: 10 }}
            />
            <HandFrame />
          </div>
        </div>
      </Container>

      {/* RESUME */}
      <Container>
        <div style={{ paddingTop: 56, paddingBottom: 20 }}>
          <ResumeRow heading="Experience" meta="2017 — NOW" heavyRule>
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

          <ResumeRow heading="Education" meta="2021 — 2025">
            <DatedEntry
              title="Information System · Adhi Tama Institute of Technology (ITATS)"
              period="2021 — 2025"
              body="Bachelor's degree, GPA 3.73/4.0. Where the habit of picking apart algorithms — and the LeetCode grind — started."
            />
          </ResumeRow>

          <ResumeRow heading="Lately" meta="OFF THE CLOCK">
            <div style={{ position: "relative" }}>
              <p style={{ fontSize: 18, lineHeight: 1.7, margin: 0, color: "#444" }}>
                Grinding through <strong>graph &amp; DP problems on LeetCode</strong>, tinkering
                with Kotlin and Go side projects, and poking at CI/CD ideas that make releases less
                painful. I keep a running list of things I want to build that will probably
                never ship — and that&apos;s the fun part.
              </p>
              <div
                className="font-display text-ink"
                style={{ fontSize: 19, transform: "rotate(-2deg)", marginTop: 18 }}
              >
                — ask me about the Kotlin/Go stuff ✎
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
          <Button href="mailto:ainul.y9b@gmail.com" variant="underline">
            ainul.y9b@gmail.com
          </Button>
        </div>
      </Container>

      <Footer />
    </>
  );
}
