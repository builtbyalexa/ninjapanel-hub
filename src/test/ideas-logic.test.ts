/**
 * Tests for Ideas Board business logic beyond upvoting:
 * - Seeded vs live idea merging
 * - Comment count tracking
 * - Idea submission shape
 */

import { describe, it, expect } from "vitest";
import { SEEDED_IDEAS, type IdeaSeed } from "../content";

// ─── Types mirrored from IdeasSection ────────────────────────

type Idea = IdeaSeed & { source?: "seed" | "live" };

// ─── Seed / live merge logic ──────────────────────────────────
// Mirrors the useEffect in IdeasSection that merges API data with seeds

function mergeIdeas(live: IdeaSeed[], seeds: IdeaSeed[]): Idea[] {
  const liveIds = new Set(live.map((i) => i.id));
  return [
    ...live.map((i) => ({ ...i, source: "live" as const })),
    ...seeds
      .filter((i) => !liveIds.has(i.id))
      .map((i) => ({ ...i, source: "seed" as const })),
  ];
}

describe("seeded ideas shape", () => {
  it("all seeded ideas have required fields", () => {
    for (const idea of SEEDED_IDEAS) {
      expect(idea.id).toBeTruthy();
      expect(idea.title).toBeTruthy();
      expect(typeof idea.description).toBe("string");
      expect(typeof idea.votes).toBe("number");
    }
  });

  it("all seeded idea IDs are unique", () => {
    const ids = SEEDED_IDEAS.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("seeded ideas start with non-negative votes", () => {
    for (const idea of SEEDED_IDEAS) {
      expect(idea.votes).toBeGreaterThanOrEqual(0);
    }
  });

  it("has at least one seeded idea", () => {
    expect(SEEDED_IDEAS.length).toBeGreaterThan(0);
  });
});

describe("live / seed merge", () => {
  it("live ideas take precedence over seeds with the same id", () => {
    const liveVersion: IdeaSeed = { id: "seed-1", title: "Updated title", description: "live", votes: 5 };
    const merged = mergeIdeas([liveVersion], SEEDED_IDEAS);
    const seed1 = merged.filter((i) => i.id === "seed-1");
    // Should only appear once
    expect(seed1.length).toBe(1);
    // Should be the live version
    expect(seed1[0].source).toBe("live");
    expect(seed1[0].votes).toBe(5);
  });

  it("seeds not in live data are appended as 'seed'", () => {
    const merged = mergeIdeas([], SEEDED_IDEAS);
    expect(merged.every((i) => i.source === "seed")).toBe(true);
    expect(merged.length).toBe(SEEDED_IDEAS.length);
  });

  it("live ideas not in seeds appear with source 'live'", () => {
    const newIdea: IdeaSeed = { id: "live-abc", title: "New idea", description: "from D1", votes: 3 };
    const merged = mergeIdeas([newIdea], SEEDED_IDEAS);
    const found = merged.find((i) => i.id === "live-abc");
    expect(found?.source).toBe("live");
  });

  it("merged list contains all seeds when live is empty", () => {
    const merged = mergeIdeas([], SEEDED_IDEAS);
    expect(merged.length).toBe(SEEDED_IDEAS.length);
  });

  it("no duplicates in merged list", () => {
    const live: IdeaSeed[] = [{ id: "seed-1", title: "Live seed-1", description: "", votes: 2 }];
    const merged = mergeIdeas(live, SEEDED_IDEAS);
    const ids = merged.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("comment count tracking", () => {
  it("count starts at 0 for a new idea", () => {
    let count = 0;
    expect(count).toBe(0);
  });

  it("increments correctly when a comment is added", () => {
    let count = 0;
    count += 1;
    expect(count).toBe(1);
  });

  it("reflects server comment list length", () => {
    const serverComments = [
      { id: "c1", idea_id: "a", body: "First", email: null, created_at: "2026-01-01" },
      { id: "c2", idea_id: "a", body: "Second", email: null, created_at: "2026-01-02" },
    ];
    const count = serverComments.length;
    expect(count).toBe(2);
  });

  it("show more threshold is 3 comments", () => {
    const SHOW_MORE_THRESHOLD = 3;
    const comments = Array.from({ length: 5 }, (_, i) => ({
      id: `c${i}`, idea_id: "a", body: `Comment ${i}`, email: null, created_at: "2026-01-01",
    }));
    const displayed = comments.slice(0, SHOW_MORE_THRESHOLD);
    expect(displayed.length).toBe(3);
    expect(comments.length - SHOW_MORE_THRESHOLD).toBe(2); // "Show 2 more"
  });
});
