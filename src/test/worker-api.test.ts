/**
 * Unit tests for worker API route logic.
 *
 * We test the pure logic extracted from ideas-api.ts — routing patterns,
 * input validation, and response shaping — without needing a live D1 database.
 */

import { describe, it, expect } from "vitest";

// ─── Route matching (mirrors worker pathname checks) ─────────

function matchUpvote(pathname: string): string | null {
  const m = pathname.match(/^\/api\/ideas\/([^/]+)\/upvote$/);
  return m ? m[1] : null;
}

function matchDownvote(pathname: string): string | null {
  const m = pathname.match(/^\/api\/ideas\/([^/]+)\/downvote$/);
  return m ? m[1] : null;
}

function matchCommentsGet(pathname: string): string | null {
  const m = pathname.match(/^\/api\/ideas\/([^/]+)\/comments$/);
  return m ? m[1] : null;
}

function isApiPath(pathname: string): boolean {
  return pathname.startsWith("/api/");
}

describe("route matching — upvote", () => {
  it("matches a valid upvote path", () => {
    expect(matchUpvote("/api/ideas/abc123/upvote")).toBe("abc123");
  });

  it("matches a seed id upvote path", () => {
    expect(matchUpvote("/api/ideas/seed-1/upvote")).toBe("seed-1");
  });

  it("does not match the ideas list path", () => {
    expect(matchUpvote("/api/ideas")).toBeNull();
  });

  it("does not match a downvote path", () => {
    expect(matchUpvote("/api/ideas/abc123/downvote")).toBeNull();
  });

  it("does not match a comments path", () => {
    expect(matchUpvote("/api/ideas/abc123/comments")).toBeNull();
  });

  it("does not match paths with trailing slash", () => {
    expect(matchUpvote("/api/ideas/abc123/upvote/")).toBeNull();
  });
});

describe("route matching — downvote", () => {
  it("matches a valid downvote path", () => {
    expect(matchDownvote("/api/ideas/abc123/downvote")).toBe("abc123");
  });

  it("does not match an upvote path", () => {
    expect(matchDownvote("/api/ideas/abc123/upvote")).toBeNull();
  });

  it("does not match the ideas list", () => {
    expect(matchDownvote("/api/ideas")).toBeNull();
  });
});

describe("route matching — comments", () => {
  it("matches a valid comments path", () => {
    expect(matchCommentsGet("/api/ideas/abc123/comments")).toBe("abc123");
  });

  it("matches seed id comments path", () => {
    expect(matchCommentsGet("/api/ideas/seed-2/comments")).toBe("seed-2");
  });

  it("does not match upvote path", () => {
    expect(matchCommentsGet("/api/ideas/abc123/upvote")).toBeNull();
  });
});

describe("api path guard", () => {
  it("identifies /api/ paths correctly", () => {
    expect(isApiPath("/api/ideas")).toBe(true);
    expect(isApiPath("/api/ideas/abc/upvote")).toBe(true);
  });

  it("passes non-api paths to static assets", () => {
    expect(isApiPath("/")).toBe(false);
    expect(isApiPath("/index.html")).toBe(false);
    expect(isApiPath("/assets/main.js")).toBe(false);
  });
});

// ─── Input validation (mirrors POST /api/ideas logic) ────────

function validateIdeaSubmission(body: unknown): { ok: true; title: string; description: string } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "invalid body" };
  const b = body as Record<string, unknown>;
  const title = typeof b.title === "string" ? b.title.trim() : "";
  if (!title) return { ok: false, error: "title is required" };
  const description = typeof b.description === "string" ? b.description.trim() : "";
  return { ok: true, title, description };
}

describe("idea submission validation", () => {
  it("accepts a valid title and description", () => {
    const result = validateIdeaSubmission({ title: "My idea", description: "Some detail" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.title).toBe("My idea");
      expect(result.description).toBe("Some detail");
    }
  });

  it("trims whitespace from title", () => {
    const result = validateIdeaSubmission({ title: "  My idea  " });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.title).toBe("My idea");
  });

  it("trims whitespace from description", () => {
    const result = validateIdeaSubmission({ title: "Valid", description: "  spaces  " });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.description).toBe("spaces");
  });

  it("rejects empty title", () => {
    const result = validateIdeaSubmission({ title: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe("title is required");
  });

  it("rejects whitespace-only title", () => {
    const result = validateIdeaSubmission({ title: "   " });
    expect(result.ok).toBe(false);
  });

  it("rejects missing title field", () => {
    const result = validateIdeaSubmission({ description: "no title here" });
    expect(result.ok).toBe(false);
  });

  it("accepts submission with no description (optional field)", () => {
    const result = validateIdeaSubmission({ title: "Just a title" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.description).toBe("");
  });

  it("rejects null body", () => {
    const result = validateIdeaSubmission(null);
    expect(result.ok).toBe(false);
  });

  it("rejects non-object body", () => {
    const result = validateIdeaSubmission("a string");
    expect(result.ok).toBe(false);
  });
});

// ─── Vote floor logic (mirrors MAX(0, votes-1) in D1) ────────

function applyDownvote(currentVotes: number): number {
  return Math.max(0, currentVotes - 1);
}

describe("vote floor logic", () => {
  it("decrements a positive vote count", () => {
    expect(applyDownvote(5)).toBe(4);
  });

  it("floors at 0 — cannot go negative", () => {
    expect(applyDownvote(0)).toBe(0);
  });

  it("handles vote count of 1 correctly", () => {
    expect(applyDownvote(1)).toBe(0);
  });
});

// ─── randomId shape ───────────────────────────────────────────
// The worker uses crypto.randomUUID().split("-")[0] for IDs

function randomId(): string {
  return crypto.randomUUID().split("-")[0];
}

describe("randomId", () => {
  it("returns a non-empty string", () => {
    expect(randomId().length).toBeGreaterThan(0);
  });

  it("does not contain a hyphen", () => {
    expect(randomId()).not.toContain("-");
  });

  it("generates unique IDs", () => {
    const ids = new Set(Array.from({ length: 20 }, () => randomId()));
    expect(ids.size).toBe(20);
  });
});
