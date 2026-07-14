import { Nav, Footer, Container } from "@/app/components";

type Project = {
  index: string;
  kind: string;
  name: string;
  blurb: string;
  stack: string[];
  href: string;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    kind: "AT AMARTHA",
    name: "Legacy → Flutter",
    blurb:
      "Led the migration of a large Kotlin codebase to Flutter and re-architected the repayment data source onto Firestore — cross-platform, cleaner, and easier to maintain.",
    stack: ["Flutter", "Kotlin", "Firestore"],
    href: "#",
  },
  {
    index: "02",
    kind: "DESIGN SYSTEM",
    name: "Shared UI Kit",
    blurb:
      "Built and maintain the reusable component library that keeps the app's screens consistent — the same hand-crafted, design-system mindset behind this site.",
    stack: ["Flutter", "Dart"],
    href: "#",
  },
  {
    index: "03",
    kind: "TOOLING",
    name: "Release Pipeline",
    blurb:
      "CI/CD tooling that smooths out the release cycle and automatically prunes unused dependencies & assets so the codebase stays lean.",
    stack: ["CI/CD", "Bash", "Fastlane"],
    href: "#",
  },
  {
    index: "04",
    kind: "SIDE PROJECT",
    name: "Stock Market App",
    blurb:
      "A Flutter stock-market app built in collaboration with Samuel Stock — real-time data, charts, and a focus on smooth, responsive UI.",
    stack: ["Flutter", "Dart"],
    href: "#",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      className="flex flex-col"
      style={{
        border: "1.5px solid #1a1a1a",
        borderRadius: 4,
        padding: 30,
        minHeight: 280,
      }}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-ink-faint" style={{ fontSize: 13, fontWeight: "bold" }}>
          {project.index} · {project.kind}
        </span>
        <span className="font-display" style={{ fontSize: 22 }}>
          ↗
        </span>
      </div>
      <h2 className="font-display" style={{ fontWeight: 700, fontSize: 32, margin: "20px 0 0" }}>
        {project.name}
      </h2>
      <p style={{ fontSize: 18, lineHeight: 1.6, margin: "12px 0 0", color: "#444", flex: 1 }}>
        {project.blurb}
      </p>
      <div className="flex flex-wrap" style={{ gap: 8, marginTop: 20 }}>
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-ink-soft"
            style={{ fontSize: 11, border: "1px solid #dcdcdc", padding: "5px 10px", borderRadius: 3 }}
          >
            {tech}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function Projects() {
  return (
    <>
      <Nav active="projects" brand="ainulbedjo." />

      {/* HEADER */}
      <Container>
        <div style={{ paddingTop: 70, paddingBottom: 40 }}>
          <div
            className="font-mono text-ink-faint"
            style={{ fontSize: 13, fontWeight: "bold", letterSpacing: 1, marginBottom: 22 }}
          >
            THINGS I&apos;VE MADE
          </div>
          <h1
            className="font-display"
            style={{ fontWeight: 600, fontSize: 64, lineHeight: 1.05, margin: 0, letterSpacing: "-1px" }}
          >
            Projects.
          </h1>
          <p
            className="text-ink-body"
            style={{ fontSize: 22, lineHeight: 1.75, maxWidth: 600, margin: "28px 0 0" }}
          >
            A few things I&apos;ve shipped, broken, and rebuilt. Some are useful; some just
            scratched an itch. All taught me something.
          </p>
        </div>
      </Container>

      {/* PROJECT CARDS */}
      <Container>
        <div
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.index} project={p} />
          ))}
        </div>
      </Container>

      <Footer />
    </>
  );
}
