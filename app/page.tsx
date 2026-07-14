import { Nav, Footer, Container, Button, ListRow } from "@/app/components";

type FeedItem = {
  href: string;
  date: string;
  title: string;
  meta: string;
};

const FEED: FeedItem[] = [
  {
    href: "/leetcode/binary-tree-maximum-path-sum",
    date: "JUL 08",
    title: "Binary Tree Maximum Path Sum",
    meta: "LeetCode · Hard · 12 min read",
  },
  {
    href: "/leetcode/lru-cache",
    date: "JUN 26",
    title: "LRU Cache, three ways",
    meta: "LeetCode · Medium · 9 min read",
  },
  {
    href: "/leetcode/word-ladder",
    date: "JUN 19",
    title: "Word Ladder & the BFS I kept getting wrong",
    meta: "LeetCode · Hard · 11 min read",
  },
];

export default function Veranda() {
  return (
    <>
      <Nav active="veranda" />

      {/* HERO */}
      <Container>
        <div className="pt-12 pb-6">
          <div
            className="font-mono text-ink-faint"
            style={{ fontSize: 13, fontWeight: "bold", letterSpacing: 1, marginBottom: 26 }}
          >
            THE VERANDA — EST. 2026
          </div>
          <h1
            className="font-display"
            style={{ fontWeight: 600, fontSize: 78, lineHeight: 1.02, margin: 0, letterSpacing: "-1.5px" }}
          >
            Hi, I&apos;m Ainul.
          </h1>
          <p
            className="text-ink-body"
            style={{ fontSize: 23, lineHeight: 1.7, maxWidth: 580, margin: "30px 0 0" }}
          >
            Software engineer &amp; full-time tinkerer. 
            I build mobile apps, explore new tech, and write about what I learn along the way.
            Also some leetcode problems, because I like to keep my brain sharp.
          </p>
          <div className="flex items-center" style={{ gap: 22, marginTop: 36 }}>
            <Button href="/about" withArrow>
              more about me
            </Button>
            <Button href="#recent" variant="underline">
              read the latest
            </Button>
          </div>
        </div>
      </Container>

      {/* RECENT FEED */}
      <Container>
        <div id="recent" style={{ paddingTop: 70, paddingBottom: 40 }}>
          <div className="flex items-baseline" style={{ gap: 14, marginBottom: 8 }}>
            <h2 className="font-display" style={{ fontWeight: 700, fontSize: 26, margin: 0 }}>
              Recent
            </h2>
            <span className="font-mono text-ink-faint" style={{ fontSize: 13, fontWeight: "bold" }}>
              writeups &amp; notes
            </span>
          </div>

          {FEED.map((item, i) => (
            <ListRow key={item.href + i} href={item.href} closeBottom={i === FEED.length - 1}>
              <span
                className="font-mono text-ink-faint"
                style={{ fontSize: 13, fontWeight: "bold", width: 80, flex: "none" }}
              >
                {item.date}
              </span>
              <span style={{ flex: 1 }}>
                <span
                  style={{ display: "block", fontSize: 24, fontWeight: 500, marginBottom: 5 }}
                >
                  {item.title}
                </span>
                <span
                  className="font-mono text-ink-soft"
                  style={{ display: "block", fontSize: 12 }}
                >
                  {item.meta}
                </span>
              </span>
              <span className="font-display text-ink" style={{ fontSize: 20 }}>
                ↗
              </span>
            </ListRow>
          ))}

          <div className="flex justify-end" style={{ marginTop: 26 }}>
            <Button href="/leetcode" variant="underline">
              see all writeups
            </Button>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
}
