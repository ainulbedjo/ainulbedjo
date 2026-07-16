import Link from "next/link";
import { Nav, Footer, Container } from "@/app/components";
import { PROJECTS, type Project } from "./projects-data";

function ProjectCard({ project, lead = false }: { project: Project; lead?: boolean }) {
  const hasDetail = Boolean(project.detail);
  const href = hasDetail ? `/projects/${project.slug}` : "#";
  return (
    <Link
      href={href}
      className={`project-card flex flex-col${lead ? " project-card--lead" : ""}`}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-ink-faint" style={{ fontSize: 13, fontWeight: "bold" }}>
          {project.kind}
        </span>
        <span
          className="font-display"
          style={{ fontSize: 22, color: hasDetail ? "var(--ink)" : "var(--ink-ghost)" }}
        >
          ↗
        </span>
      </div>
      <h2
        className="project-card__name font-display"
        style={{ fontWeight: 700, margin: "20px 0 0" }}
      >
        {project.name}
      </h2>
      <p
        style={{
          fontSize: 18,
          lineHeight: 1.6,
          margin: "12px 0 0",
          color: "var(--ink-body)",
          maxWidth: lead ? 620 : undefined,
          flex: 1,
        }}
      >
        {project.blurb}
      </p>
      <div className="flex flex-wrap" style={{ gap: 8, marginTop: 20 }}>
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-ink-soft"
            style={{ fontSize: 11, border: "1px solid var(--rule-soft)", padding: "5px 10px", borderRadius: 3 }}
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default function Projects() {
  return (
    <>
      <Nav active="projects" brand="ainulbedjo." />

      {/* HEADER */}
      <Container>
        <div className="pt-5 pb-6">
          <h1
            className="page-title font-display"
            style={{ fontWeight: 600, lineHeight: 1.05, margin: 0, letterSpacing: "-1px" }}
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

      {/* PROJECT CARDS — the newest leads full-width, the rest pair off. */}
      <Container>
        <div className="project-grid" style={{ paddingTop: 20, paddingBottom: 20 }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} project={p} lead={i === 0} />
          ))}
        </div>
      </Container>

      <Footer />
    </>
  );
}
