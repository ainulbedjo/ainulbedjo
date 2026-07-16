import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Nav, Footer, Container } from "@/app/components";
import { PROJECTS, getProject, type Shot } from "../projects-data";

export function generateStaticParams() {
  return PROJECTS.filter((p) => p.detail).map((p) => ({ slug: p.slug }));
}

/** A drop-in image, or a captioned placeholder frame until one is added. */
function SlotImage({ shot, hint }: { shot: Shot; hint: string }) {
  if (shot.src) {
    return (
      <Image
        src={shot.src}
        alt={shot.caption}
        fill
        sizes="(max-width: 700px) 100vw, 500px"
        style={{ objectFit: "cover" }}
      />
    );
  }
  return (
    <div
      className="flex items-center justify-center font-mono text-ink-faint"
      style={{
        position: "absolute",
        inset: 0,
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
        padding: 16,
        letterSpacing: "0.5px",
      }}
    >
      {hint}
    </div>
  );
}

/**
 * A screenshot in an ink-outlined figure with a mono caption. No drawn device
 * chrome — the reader already owns a phone and a browser; a redrawn one is
 * always subtly wrong. The frame is the site's own voice instead.
 */
function Plate({
  shot,
  hint,
  ratio,
  className,
}: {
  shot: Shot;
  hint: string;
  ratio: string;
  className?: string;
}) {
  return (
    <figure className={className} style={{ margin: 0 }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: ratio,
          border: "var(--rule-heavy)",
          borderRadius: 4,
          overflow: "hidden",
          background: "var(--well)",
        }}
      >
        <SlotImage shot={shot} hint={hint} />
      </div>
      <figcaption
        className="font-mono text-ink-faint"
        style={{ fontSize: 13, fontWeight: "bold", marginTop: 10 }}
      >
        {shot.caption}
      </figcaption>
    </figure>
  );
}

/** Mobile case study: portrait plates in a scrolling row. */
function PhoneGallery({ shots }: { shots: Shot[] }) {
  return (
    <div className="gallery-rail">
      {shots.map((shot, i) => (
        <Plate
          key={i}
          shot={shot}
          hint={`Drop: ${shot.caption}`}
          ratio="9 / 19.5"
          className="gallery-rail__item"
        />
      ))}
    </div>
  );
}

/** Web case study: one wide plate, then the rest 2-up. */
function WebGallery({ shots }: { shots: Shot[] }) {
  const [hero, ...rest] = shots;
  return (
    <div className="flex flex-col" style={{ gap: 28 }}>
      {hero ? (
        <Plate shot={hero} hint="Drop a full desktop screenshot" ratio="16 / 10" />
      ) : null}
      {rest.length ? (
        <div className="gallery-pair">
          {rest.map((shot, i) => (
            <Plate key={i} shot={shot} hint={`Drop: ${shot.caption}`} ratio="16 / 11" />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** A faint-mono uppercase label — the site's standard eyebrow. */
function Label({ children, mb = 0 }: { children: React.ReactNode; mb?: number }) {
  return (
    <div
      className="font-mono text-ink-faint"
      style={{ fontSize: 13, fontWeight: "bold", letterSpacing: 1, marginBottom: mb }}
    >
      {children}
    </div>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.detail) notFound();
  const d = project.detail;

  return (
    <>
      <Nav active="projects" />

      {/* BACK */}
      <Container>
        <div style={{ paddingTop: 6 }}>
          <Link
            href="/projects"
            className="inline-flex items-center font-mono text-ink-faint"
            style={{ fontSize: 13, fontWeight: "bold", gap: 9 }}
          >
            <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
              <path d="M16 6 H 4" stroke="var(--ink-faint)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              <path
                d="M8 2 L 3 6 L 8 10"
                stroke="var(--ink-faint)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            back to projects
          </Link>
        </div>
      </Container>

      {/* HEADER */}
      <Container>
        <div style={{ paddingTop: 26 }}>
          <Label mb={20}>{d.kicker}</Label>
          <div
            className="flex justify-between flex-wrap"
            style={{ alignItems: "flex-end", gap: 24 }}
          >
            <h1
              className="font-display"
              style={{ fontWeight: 600, fontSize: 60, lineHeight: 1.02, margin: 0, letterSpacing: "-1px" }}
            >
              {project.name}
            </h1>
            <span
              className="font-mono"
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: "var(--ink)",
                border: "var(--rule-heavy)",
                borderRadius: 3,
                padding: "6px 12px",
                whiteSpace: "nowrap",
              }}
            >
              {d.platformBadge}
            </span>
          </div>
          <p style={{ fontSize: 23, lineHeight: 1.7, maxWidth: 640, margin: "24px 0 0", color: "var(--ink-body)" }}>
            {d.tagline}
          </p>

          {/* LINKS */}
          <div className="flex flex-wrap" style={{ gap: 14, marginTop: 30 }}>
            <a
              href={d.primaryHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center font-mono"
              style={{
                gap: 9,
                background: "var(--ink)",
                color: "var(--paper-white)",
                fontSize: 13,
                fontWeight: 500,
                padding: "12px 20px",
                borderRadius: 3,
              }}
            >
              {d.primaryLabel}
              <span className="font-display" style={{ fontSize: 16 }}>↗</span>
            </a>
            <a
              href={d.repoHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center font-mono"
              style={{
                gap: 9,
                color: "var(--ink)",
                fontSize: 13,
                fontWeight: 500,
                padding: "12px 20px",
                border: "var(--rule-heavy)",
                borderRadius: 3,
              }}
            >
              {d.repoLabel}
              <span className="font-display" style={{ fontSize: 16 }}>↗</span>
            </a>
          </div>
        </div>
      </Container>

      {/* GALLERY */}
      <Container>
        <div style={{ paddingTop: 50 }}>
          {d.platform === "mobile" ? (
            <PhoneGallery shots={d.shots} />
          ) : (
            <WebGallery shots={d.shots} />
          )}
        </div>
      </Container>

      {/* BODY: story + sidebar */}
      <Container>
        <div
          style={{
            paddingTop: 60,
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: 56,
          }}
        >
          {/* story */}
          <div>
            <Label mb={18}>THE STORY</Label>
            {d.body.map((para, i) => (
              <p key={i} style={{ fontSize: 20, lineHeight: 1.8, margin: "0 0 22px", color: "var(--ink-body)" }}>
                {para}
              </p>
            ))}

            <h3 className="font-display" style={{ fontWeight: 700, fontSize: 26, margin: "38px 0 16px" }}>
              What I&apos;m proud of
            </h3>
            <ul
              className="flex flex-col"
              style={{ margin: 0, padding: 0, listStyle: "none", gap: 14 }}
            >
              {d.highlights.map((hl, i) => (
                <li
                  key={i}
                  className="flex"
                  style={{ gap: 14, alignItems: "flex-start", fontSize: 19, lineHeight: 1.6, color: "var(--ink-body)" }}
                >
                  <span
                    className="font-display text-ink"
                    style={{ fontSize: 20, flex: "none", marginTop: 1 }}
                  >
                    ✎
                  </span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* sidebar */}
          <div className="flex flex-col" style={{ alignSelf: "start" }}>
            <div style={{ padding: "0 0 20px", borderBottom: "1px solid var(--rule-warm)" }}>
              <Label>YEAR</Label>
              <div style={{ fontSize: 19, marginTop: 5 }}>{d.year}</div>
            </div>
            <div style={{ padding: "20px 0", borderBottom: "1px solid var(--rule-warm)" }}>
              <Label>ROLE</Label>
              <div style={{ fontSize: 19, marginTop: 5 }}>{d.role}</div>
            </div>
            <div style={{ padding: "20px 0", borderBottom: "1px solid var(--rule-warm)" }}>
              <Label>PLATFORM</Label>
              <div style={{ fontSize: 19, marginTop: 5 }}>{d.platformLabel}</div>
            </div>
            <div style={{ padding: "20px 0 0" }}>
              <Label mb={12}>TECH STACK</Label>
              <div className="flex flex-wrap" style={{ gap: 9 }}>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono"
                    style={{ fontSize: 12, border: "var(--rule-heavy)", padding: "6px 12px", borderRadius: 3 }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* NEXT PROJECT */}
      <Container>
        <div style={{ marginTop: 70 }}>
          <Link
            href={d.next.href}
            className="flex justify-between items-center"
            style={{ gap: 20, border: "var(--rule-heavy)", borderRadius: 4, padding: "26px 30px" }}
          >
            <div>
              <Label>NEXT UP</Label>
              <div className="font-display" style={{ fontWeight: 700, fontSize: 30, marginTop: 6 }}>
                {d.next.title}
              </div>
            </div>
            <svg width="42" height="18" viewBox="0 0 42 18" aria-hidden="true">
              <path d="M2 9 H 34" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path
                d="M28 2 L 39 9 L 28 16"
                stroke="var(--ink)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </Link>
        </div>
      </Container>

      <Footer />
    </>
  );
}
