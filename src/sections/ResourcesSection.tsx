import type { ReactElement } from "react";
import { RESOURCES } from "../content";
import { SectionHeader } from "./HeroSection";

// Minimal inline SVG icons
const ICONS: Record<string, ReactElement> = {
  book: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 2.5h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M6 6h4M6 8.5h4M6 11h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  code: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M6 5L2 9l4 4M12 5l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 3.5l-2 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  template: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M2 6.5h14" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M6.5 6.5v9.5" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  ),
  key: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="7" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M10 11l5 5M13 13l1.5-1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  chat: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 3h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7l-4 3V4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  ),
  bug: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 13a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M9 6V4.5M9 15v1.5M5.5 6.5L3.5 4.5M12.5 6.5l2-2M5 9H2.5M15.5 9H13M5.5 11.5l-2 2M12.5 11.5l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  chart: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2.5 14l3.5-4.5 3.5 2.5 3.5-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.5 15.5h13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  catalog: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  ),
};

export function ResourcesSection() {
  return (
    <section
      id="resources"
      className="section"
      style={{ background: "var(--bg-1)" }}
    >
      <div className="section-inner">
        <SectionHeader number="08" label="Resources" />

        <div style={{ borderTop: "1px dashed var(--border-dashed)", paddingTop: "3rem" }}>
          <div className="reveal-up" style={{ maxWidth: 600, marginBottom: "3rem" }}>
            <h2 className="text-h2" style={{ color: "var(--text-primary)", margin: "0 0 1rem" }}>
              Everything you need
            </h2>
            <p className="text-body" style={{ color: "var(--text-secondary)", margin: 0 }}>
              Documentation, access requests, tooling, and support channels for NinjaPanel.
            </p>
          </div>

          <div
            className="stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1rem",
            }}
          >
            {RESOURCES.map((resource) => (
              <a
                key={resource.label}
                href={resource.href}
                target="_blank"
                rel="noreferrer"
                className="card card-lift"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  textDecoration: "none",
                  color: "inherit",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border-bright)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 9,
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--blue-400)",
                  }}
                >
                  {ICONS[resource.icon]}
                </div>

                <div>
                  <p
                    className="text-sm-body"
                    style={{
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      margin: "0 0 0.25rem",
                      lineHeight: 1.35,
                    }}
                  >
                    {resource.label}
                  </p>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {resource.description}
                  </p>
                </div>

                <span
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--orange)",
                    fontWeight: 600,
                    marginTop: "auto",
                  }}
                >
                  Open →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
