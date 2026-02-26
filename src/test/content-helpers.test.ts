/**
 * Tests for content.ts pure helper functions.
 * These run with no browser/network needed — just logic.
 */

import { describe, it, expect } from "vitest";
import { getTeamMemberTenure, isNewMember, type TeamMember } from "../content";

// ─── Helpers ─────────────────────────────────────────────────

function makeMember(startDate: string): TeamMember {
  return {
    name: "Test User",
    title: "Engineer",
    city: "Denver",
    state: "CO",
    timezone: "GMT-7",
    startDate,
    photo: "/team/test.png",
    email: "test@cloudflare.com",
    gchatDm: null,
  };
}

// ─── isNewMember ─────────────────────────────────────────────

describe("isNewMember", () => {
  it("returns true if start date is less than 4 months ago", () => {
    const recent = new Date();
    recent.setMonth(recent.getMonth() - 2);
    expect(isNewMember(makeMember(recent.toISOString().split("T")[0]))).toBe(true);
  });

  it("returns false if start date is more than 4 months ago", () => {
    const old = new Date();
    old.setMonth(old.getMonth() - 6);
    expect(isNewMember(makeMember(old.toISOString().split("T")[0]))).toBe(false);
  });

  it("returns false exactly at the 4-month boundary", () => {
    const boundary = new Date();
    boundary.setMonth(boundary.getMonth() - 4);
    expect(isNewMember(makeMember(boundary.toISOString().split("T")[0]))).toBe(false);
  });

  it("returns true for someone who started today", () => {
    const today = new Date().toISOString().split("T")[0];
    expect(isNewMember(makeMember(today))).toBe(true);
  });
});

// ─── getTeamMemberTenure ─────────────────────────────────────

describe("getTeamMemberTenure", () => {
  it("returns a non-empty string", () => {
    const member = makeMember("2022-06-06");
    expect(getTeamMemberTenure(member)).toBeTruthy();
  });

  it("includes 'yr' for someone with multi-year tenure", () => {
    const member = makeMember("2021-01-01");
    expect(getTeamMemberTenure(member)).toMatch(/yr/);
  });

  it("includes 'mo' or 'yr' for someone with at least 1 month tenure", () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 2);
    const member = makeMember(oneMonthAgo.toISOString().split("T")[0]);
    expect(getTeamMemberTenure(member)).toMatch(/mo|yr/);
  });

  it("returns a string for a brand new member", () => {
    const today = new Date().toISOString().split("T")[0];
    const result = getTeamMemberTenure(makeMember(today));
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });
});
