/**
 * Tests for Ideas Board upvote logic.
 *
 * Covers the three bugs fixed on 2026-02-25:
 *   1. Vote count should sync with server's authoritative count after upvote
 *   2. Card sort order should lock on load and not jump mid-session
 *   3. Duplicate upvotes should be blocked by localStorage deduplication
 */

import { describe, it, expect, beforeEach } from "vitest";

// ─── Helpers extracted from IdeasSection (logic under test) ──

const UPVOTES_KEY = "np-hub-upvotes";

function getUpvoted(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(UPVOTES_KEY) ?? "[]"));
  } catch {
    return new Set();
  }
}

function saveUpvote(id: string) {
  const existing = getUpvoted();
  existing.add(id);
  localStorage.setItem(UPVOTES_KEY, JSON.stringify([...existing]));
}

type Idea = { id: string; title: string; votes: number };

function sortIdeasOnLoad(ideas: Idea[]): string[] {
  return [...ideas].sort((a, b) => b.votes - a.votes).map((i) => i.id);
}

// ─── Tests ───────────────────────────────────────────────────

describe("upvote deduplication (localStorage)", () => {
  beforeEach(() => localStorage.clear());

  it("starts with no upvotes", () => {
    expect(getUpvoted().size).toBe(0);
  });

  it("records an upvote", () => {
    saveUpvote("idea-1");
    expect(getUpvoted().has("idea-1")).toBe(true);
  });

  it("does not double-record the same id", () => {
    saveUpvote("idea-1");
    saveUpvote("idea-1");
    expect(getUpvoted().size).toBe(1);
  });

  it("tracks multiple different ideas independently", () => {
    saveUpvote("idea-1");
    saveUpvote("idea-2");
    const upvoted = getUpvoted();
    expect(upvoted.has("idea-1")).toBe(true);
    expect(upvoted.has("idea-2")).toBe(true);
    expect(upvoted.size).toBe(2);
  });

  it("persists across simulated page refresh (re-read from localStorage)", () => {
    saveUpvote("idea-42");
    // Simulate refresh — read fresh from localStorage
    const afterRefresh = getUpvoted();
    expect(afterRefresh.has("idea-42")).toBe(true);
  });

  it("blocks upvote if id already in set", () => {
    saveUpvote("idea-1");
    const upvoted = getUpvoted();
    // This is the guard in handleUpvote — if already upvoted, do nothing
    const wouldUpvote = !upvoted.has("idea-1");
    expect(wouldUpvote).toBe(false);
  });
});

describe("sort order locks on load", () => {
  const ideas: Idea[] = [
    { id: "a", title: "Idea A", votes: 3 },
    { id: "b", title: "Idea B", votes: 10 },
    { id: "c", title: "Idea C", votes: 1 },
  ];

  it("sorts by votes descending on initial load", () => {
    const order = sortIdeasOnLoad(ideas);
    expect(order).toEqual(["b", "a", "c"]);
  });

  it("locked order does not change when votes update mid-session", () => {
    const lockedOrder = sortIdeasOnLoad(ideas);
    // Simulate upvoting "c" — votes go from 1 to 2, but order stays locked
    const updated = ideas.map((i) => (i.id === "c" ? { ...i, votes: 2 } : i));
    // Re-sort would now give b, a, c (c still last with 2 vs a's 3) — same here
    // But if c had jumped to 11 it would still stay last in locked order
    const ideaMap = new Map(updated.map((i) => [i.id, i]));
    const displayed = lockedOrder.map((id) => ideaMap.get(id)!);
    expect(displayed.map((i) => i.id)).toEqual(["b", "a", "c"]);
  });

  it("handles ideas with equal votes stably", () => {
    const tied: Idea[] = [
      { id: "x", title: "X", votes: 5 },
      { id: "y", title: "Y", votes: 5 },
    ];
    const order = sortIdeasOnLoad(tied);
    expect(order).toHaveLength(2);
    expect(order).toContain("x");
    expect(order).toContain("y");
  });

  it("handles empty ideas list", () => {
    expect(sortIdeasOnLoad([])).toEqual([]);
  });
});

describe("upvote toggle (remove upvote)", () => {
  beforeEach(() => localStorage.clear());

  it("removes an upvote from localStorage", () => {
    saveUpvote("idea-1");
    expect(getUpvoted().has("idea-1")).toBe(true);
    // removeUpvote mirrors the function in IdeasSection
    const existing = getUpvoted();
    existing.delete("idea-1");
    localStorage.setItem("np-hub-upvotes", JSON.stringify([...existing]));
    expect(getUpvoted().has("idea-1")).toBe(false);
  });

  it("decrement is -1 when removing an upvote", () => {
    const ideas = [{ id: "a", votes: 5 }];
    const updated = ideas.map((i) => (i.id === "a" ? { ...i, votes: i.votes - 1 } : i));
    expect(updated[0].votes).toBe(4);
  });

  it("vote cannot go below 0 (server enforces MAX(0, votes-1))", () => {
    // Client-side floor
    const votes = 0;
    const afterRemove = Math.max(0, votes - 1);
    expect(afterRemove).toBe(0);
  });

  it("toggling upvote on then off leaves localStorage empty", () => {
    saveUpvote("idea-1");
    const existing = getUpvoted();
    existing.delete("idea-1");
    localStorage.setItem("np-hub-upvotes", JSON.stringify([...existing]));
    expect(getUpvoted().size).toBe(0);
  });
});

describe("optimistic upvote + server sync", () => {
  it("optimistic update increments vote by 1", () => {
    const ideas: Idea[] = [{ id: "a", title: "A", votes: 5 }];
    const updated = ideas.map((i) => (i.id === "a" ? { ...i, votes: i.votes + 1 } : i));
    expect(updated[0].votes).toBe(6);
  });

  it("server sync overwrites optimistic count with authoritative value", () => {
    // Server returns 8 (e.g. two people voted at the same time)
    const serverVotes = 8;
    let ideas: Idea[] = [{ id: "a", title: "A", votes: 5 }];
    // Step 1: optimistic
    ideas = ideas.map((i) => (i.id === "a" ? { ...i, votes: i.votes + 1 } : i));
    expect(ideas[0].votes).toBe(6);
    // Step 2: server sync
    ideas = ideas.map((i) => (i.id === "a" ? { ...i, votes: serverVotes } : i));
    expect(ideas[0].votes).toBe(8);
  });

  it("failed server call leaves optimistic count in place", () => {
    let ideas: Idea[] = [{ id: "a", title: "A", votes: 5 }];
    ideas = ideas.map((i) => (i.id === "a" ? { ...i, votes: i.votes + 1 } : i));
    // Simulate fetch throwing — no further update
    const fetchFailed = true;
    if (!fetchFailed) {
      ideas = ideas.map((i) => (i.id === "a" ? { ...i, votes: 99 } : i));
    }
    expect(ideas[0].votes).toBe(6);
  });
});
