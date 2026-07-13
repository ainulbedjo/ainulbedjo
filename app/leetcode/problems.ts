import type { CodeLine, Level } from "@/app/components";

/** A block of handwritten notes on the solution page. */
export type NoteBlock =
  | { kind: "p"; html: string }
  | { kind: "step"; n: number; title: string; body: string }
  | { kind: "aside"; html: string }
  | { kind: "arrow"; text: string };

export type Problem = {
  slug: string;
  number: number;
  title: string;
  difficulty: Level;
  /** Short topic label for list/table rows, e.g. "trees · dfs". */
  topic: string;
  /** Longer topic label for the solution header, e.g. "trees · dfs · recursion". */
  topicLong?: string;
  /** Display date, e.g. "JUL 08". */
  date: string;
  /** Full solved date for the detail header, e.g. "JUL 08, 2026". */
  solvedOn?: string;
  runtime?: string;
  /** URL on leetcode.com. */
  url?: string;
  /** Rich detail content — present for problems that have a written-up solution. */
  detail?: {
    statement: string;
    example: string;
    constraint: string;
    notes: NoteBlock[];
    code: {
      filename: string;
      language: string;
      lines: CodeLine[];
    };
    complexity: {
      time: string;
      timeNote: string;
      space: string;
      spaceNote: string;
    };
    prev?: { label: string };
    next?: { label: string };
  };
};

export const PROBLEMS: Problem[] = [
  {
    slug: "binary-tree-maximum-path-sum",
    number: 124,
    title: "Binary Tree Maximum Path Sum",
    difficulty: "HARD",
    topic: "trees · dfs",
    topicLong: "trees · dfs · recursion",
    date: "JUL 08",
    solvedOn: "JUL 08, 2026",
    runtime: "68 ms (beats 94%)",
    url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    detail: {
      statement:
        "A <strong>path</strong> is any sequence of nodes connected by edges, where each node appears at most once — it need not pass through the root. The <strong>path sum</strong> is the sum of the node values in the path. Given the root of a binary tree, return the maximum path sum of any non-empty path.",
      example: "[-10,9,20,null,null,15,7] → <strong>42</strong>",
      constraint: "1 ≤ nodes ≤ 3·10⁴",
      notes: [
        {
          kind: "p",
          html:
            "Okay — the trick that finally clicked: every node has to answer <strong>two different questions</strong>.",
        },
        {
          kind: "step",
          n: 1,
          title: "What's the best path that <u>passes through</u> me?",
          body:
            'That path can dip into my left branch, come up through me, and go down my right branch. So it\'s <code>me + left + right</code>. This is a candidate for the global answer.',
        },
        {
          kind: "step",
          n: 2,
          title: "What can I hand up to my parent?",
          body:
            'A parent can only extend <strong>one</strong> of my branches — you can\'t fork upward. So I return <code>me + max(left, right)</code>.',
        },
        {
          kind: "aside",
          html:
            'Gotcha I kept missing: clamp each branch at <strong>0</strong>. If a branch is negative, just don\'t take it — <code>max(gain(child), 0)</code>.',
        },
        { kind: "arrow", text: "one DFS, update a global max as you go." },
      ],
      code: {
        filename: "solution.py",
        language: "PYTHON",
        lines: [
          { text: "class Solution:" },
          { text: "    def maxPathSum(self, root):" },
          { text: "        self.best = float('-inf')" },
          { blank: true },
          { text: "        def gain(node):" },
          { text: "            if not node:" },
          { text: "                return 0" },
          { text: "            # ignore branches that only hurt us", comment: true },
          { text: "            left  = max(gain(node.left),  0)" },
          { text: "            right = max(gain(node.right), 0)" },
          { text: "            # best path that bends through this node", comment: true },
          { text: "            self.best = max(self.best, node.val + left + right)" },
          { text: "            # parent can extend only one side", comment: true },
          { text: "            return node.val + max(left, right)" },
          { blank: true },
          { text: "        gain(root)" },
          { text: "        return self.best" },
        ],
      },
      complexity: {
        time: "O(n)",
        timeNote: "visit each node once",
        space: "O(h)",
        spaceNote: "recursion stack, tree height",
      },
      prev: { label: "146 · LRU Cache" },
      next: { label: "127 · Word Ladder" },
    },
  },
  {
    slug: "lru-cache",
    number: 146,
    title: "LRU Cache",
    difficulty: "MEDIUM",
    topic: "design · hashmap",
    date: "JUN 26",
  },
  {
    slug: "word-ladder",
    number: 127,
    title: "Word Ladder",
    difficulty: "HARD",
    topic: "graphs · bfs",
    date: "JUN 19",
  },
  {
    slug: "longest-increasing-subsequence",
    number: 300,
    title: "Longest Increasing Subsequence",
    difficulty: "MEDIUM",
    topic: "dp · binary search",
    date: "JUN 11",
  },
  {
    slug: "trapping-rain-water",
    number: 42,
    title: "Trapping Rain Water",
    difficulty: "HARD",
    topic: "two pointers",
    date: "JUN 03",
  },
  {
    slug: "two-sum",
    number: 1,
    title: "Two Sum",
    difficulty: "EASY",
    topic: "hashmap",
    date: "MAY 28",
  },
];

export function getProblem(slug: string): Problem | undefined {
  return PROBLEMS.find((p) => p.slug === slug);
}
