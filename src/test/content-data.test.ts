/**
 * Data integrity tests for content.ts.
 *
 * These are "contract" tests — they ensure the data that feeds the UI
 * is well-formed and internally consistent. If someone edits content.ts
 * and breaks a required field or introduces a duplicate ID, these catch it.
 */

import { describe, it, expect } from "vitest";
import {
  NAV_LINKS,
  PLATFORM_APPS,
  ROADMAP_ITEMS,
  COMPARE_TOOLS,
  PYRAMID_LEVELS,
  TEAM,
  PERSONAS,
  HERO,
} from "../content";

const VALID_STATUSES = ["Now", "Next", "Later", "Done"] as const;

// ─── NAV_LINKS ───────────────────────────────────────────────

describe("NAV_LINKS", () => {
  it("has at least one link", () => {
    expect(NAV_LINKS.length).toBeGreaterThan(0);
  });

  it("every link has a non-empty label and href", () => {
    for (const link of NAV_LINKS) {
      expect(link.label).toBeTruthy();
      expect(link.href).toBeTruthy();
    }
  });

  it("all hrefs are anchor links (internal navigation)", () => {
    for (const link of NAV_LINKS) {
      expect(link.href).toMatch(/^#/);
    }
  });

  it("no duplicate labels", () => {
    const labels = NAV_LINKS.map((l) => l.label);
    expect(new Set(labels).size).toBe(labels.length);
  });
});

// ─── PLATFORM_APPS ───────────────────────────────────────────

describe("PLATFORM_APPS", () => {
  it("has at least 16 apps", () => {
    expect(PLATFORM_APPS.length).toBeGreaterThanOrEqual(16);
  });

  it("every app has required fields", () => {
    for (const app of PLATFORM_APPS) {
      expect(app.name, `app missing name`).toBeTruthy();
      expect(app.path, `${app.name} missing path`).toBeTruthy();
      expect(app.team, `${app.name} missing team`).toBeTruthy();
      expect(app.description, `${app.name} missing description`).toBeTruthy();
      expect(["Core", "Platform", "Coming Soon"]).toContain(app.badge);
    }
  });

  it("no duplicate app names", () => {
    const names = PLATFORM_APPS.map((a) => a.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("no duplicate app paths", () => {
    const paths = PLATFORM_APPS.map((a) => a.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("apps with a url use https", () => {
    for (const app of PLATFORM_APPS) {
      if (app.url) {
        expect(app.url).toMatch(/^https:\/\//);
      }
    }
  });

  it("Coming Soon apps do not have a url", () => {
    const comingSoon = PLATFORM_APPS.filter((a) => a.badge === "Coming Soon");
    for (const app of comingSoon) {
      expect(app.url, `${app.name} is Coming Soon but has a url`).toBeUndefined();
    }
  });

  it("Core and Platform apps all have a url", () => {
    const live = PLATFORM_APPS.filter((a) => a.badge !== "Coming Soon");
    for (const app of live) {
      expect(app.url, `${app.name} is ${app.badge} but missing url`).toBeTruthy();
    }
  });
});

// ─── ROADMAP_ITEMS ───────────────────────────────────────────

describe("ROADMAP_ITEMS", () => {
  it("has items in every status bucket", () => {
    for (const status of VALID_STATUSES) {
      const items = ROADMAP_ITEMS.filter((i) => i.status === status);
      expect(items.length, `no roadmap items with status "${status}"`).toBeGreaterThan(0);
    }
  });

  it("every item has required fields", () => {
    for (const item of ROADMAP_ITEMS) {
      expect(item.id, `item missing id`).toBeTruthy();
      expect(item.title, `${item.id} missing title`).toBeTruthy();
      expect(item.summary, `${item.id} missing summary`).toBeTruthy();
      expect(VALID_STATUSES).toContain(item.status);
    }
  });

  it("no duplicate IDs", () => {
    const ids = ROADMAP_ITEMS.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("pyramidLevel is 1–5 when set", () => {
    for (const item of ROADMAP_ITEMS) {
      if (item.pyramidLevel !== undefined) {
        expect(item.pyramidLevel).toBeGreaterThanOrEqual(1);
        expect(item.pyramidLevel).toBeLessThanOrEqual(5);
      }
    }
  });

  it("links have label and valid https href when present", () => {
    for (const item of ROADMAP_ITEMS) {
      if (item.links) {
        for (const link of item.links) {
          expect(link.label, `${item.id} link missing label`).toBeTruthy();
          expect(link.href, `${item.id} link missing href`).toMatch(/^https:\/\//);
        }
      }
    }
  });
});

// ─── COMPARE_TOOLS ───────────────────────────────────────────

describe("COMPARE_TOOLS", () => {
  it("has at least 3 tools", () => {
    expect(COMPARE_TOOLS.length).toBeGreaterThanOrEqual(3);
  });

  it("every tool has required fields", () => {
    for (const tool of COMPARE_TOOLS) {
      expect(tool.id).toBeTruthy();
      expect(tool.label).toBeTruthy();
      expect(tool.purpose).toBeTruthy();
      expect(tool.audience).toBeTruthy();
      expect(tool.access).toBeTruthy();
      expect(tool.link).toMatch(/^https:\/\//);
    }
  });

  it("exactly one tool is highlighted (NinjaPanel)", () => {
    const highlighted = COMPARE_TOOLS.filter((t) => t.highlight);
    expect(highlighted.length).toBe(1);
    expect(highlighted[0].id).toBe("ninjapanel");
  });

  it("no duplicate IDs", () => {
    const ids = COMPARE_TOOLS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// ─── PYRAMID_LEVELS ──────────────────────────────────────────

describe("PYRAMID_LEVELS", () => {
  it("has exactly 5 levels", () => {
    expect(PYRAMID_LEVELS.length).toBe(5);
  });

  it("levels are numbered 1–5 without gaps", () => {
    const levels = PYRAMID_LEVELS.map((l) => l.level).sort((a, b) => a - b);
    expect(levels).toEqual([1, 2, 3, 4, 5]);
  });

  it("every level has required fields", () => {
    for (const level of PYRAMID_LEVELS) {
      expect(level.title).toBeTruthy();
      expect(level.subtitle).toBeTruthy();
      expect(level.objective).toBeTruthy();
      expect(level.featureAreas.length).toBeGreaterThan(0);
      expect(level.keyResults.length).toBeGreaterThan(0);
    }
  });

  it("roadmap projects in pyramid levels reference valid statuses", () => {
    for (const level of PYRAMID_LEVELS) {
      for (const project of level.roadmapProjects) {
        expect(project.name).toBeTruthy();
        expect(VALID_STATUSES).toContain(project.status);
      }
    }
  });
});

// ─── TEAM ────────────────────────────────────────────────────

describe("TEAM", () => {
  it("has at least one member", () => {
    expect(TEAM.length).toBeGreaterThan(0);
  });

  it("every member has required fields", () => {
    for (const member of TEAM) {
      expect(member.name).toBeTruthy();
      expect(member.title).toBeTruthy();
      expect(member.city).toBeTruthy();
      expect(member.email).toMatch(/@\w+\.\w+$/);
      expect(member.startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(member.photo).toMatch(/^\/team\//);
    }
  });

  it("no duplicate emails", () => {
    const emails = TEAM.map((m) => m.email);
    expect(new Set(emails).size).toBe(emails.length);
  });

  it("gchatDm is either a valid Google Chat URL or null", () => {
    for (const member of TEAM) {
      if (member.gchatDm !== null) {
        expect(member.gchatDm).toMatch(/^https:\/\/chat\.google\.com\//);
      }
    }
  });

  it("startDate is a valid parseable date", () => {
    for (const member of TEAM) {
      const d = new Date(member.startDate);
      expect(isNaN(d.getTime()), `${member.name} has invalid startDate`).toBe(false);
    }
  });

  it("startDate is not in the future", () => {
    const now = new Date();
    for (const member of TEAM) {
      const d = new Date(member.startDate);
      expect(d.getTime(), `${member.name} startDate is in the future`).toBeLessThanOrEqual(now.getTime());
    }
  });
});

// ─── PERSONAS ────────────────────────────────────────────────

describe("PERSONAS", () => {
  it("has at least 4 personas", () => {
    expect(PERSONAS.length).toBeGreaterThanOrEqual(4);
  });

  it("every persona has required fields", () => {
    for (const persona of PERSONAS) {
      expect(persona.role).toBeTruthy();
      expect(persona.tagline).toBeTruthy();
      expect(persona.description).toBeTruthy();
      expect(persona.tools.length).toBeGreaterThan(0);
      expect(persona.accessLink).toMatch(/^https:\/\//);
    }
  });
});

// ─── HERO ────────────────────────────────────────────────────

describe("HERO", () => {
  it("has headline and description", () => {
    expect(HERO.headline).toBeTruthy();
    expect(HERO.description).toBeTruthy();
  });

  it("has at least one stat", () => {
    expect(HERO.stats.length).toBeGreaterThan(0);
  });

  it("every stat has value and label", () => {
    for (const stat of HERO.stats) {
      expect(stat.value).toBeTruthy();
      expect(stat.label).toBeTruthy();
    }
  });

  it("every pill has label and href", () => {
    for (const pill of HERO.pills) {
      expect(pill.label).toBeTruthy();
      expect(pill.href).toBeTruthy();
    }
  });

  it("has at least one team listed", () => {
    expect(HERO.teams.length).toBeGreaterThan(0);
  });
});
