import { useState } from "react";
import { PLATFORM_APPS, type PlatformApp, type AppBadge } from "../content";
import { SectionHeader } from "./HeroSection";

const BADGE_CLASS: Record<AppBadge, string> = {
  Core: "badge-core",
  Platform: "badge-platform",
  "Coming Soon": "badge-soon",
};

function AppCard({ app }: { app: PlatformApp }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`card${expanded ? " card-active" : " card-lift"}`}
      style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}
      onClick={() => setExpanded((e) => !e)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setExpanded((v) => !v)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "0.75rem",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginBottom: "0.25rem",
            }}
          >
            <span
              className="text-sm-body"
              style={{ fontWeight: 600, color: "var(--text-primary)" }}
            >
              {app.name}
            </span>
            <span className={`badge ${BADGE_CLASS[app.badge]}`}>{app.badge}</span>
          </div>
          <span
            className="text-mono"
            style={{ color: "var(--text-muted)" }}
          >
            {app.path}
          </span>
        </div>
        <span
          style={{
            color: "var(--text-dim)",
            fontSize: "0.75rem",
            flexShrink: 0,
            marginTop: "0.125rem",
          }}
        >
          {expanded ? "▲" : "▼"}
        </span>
      </div>

      <p
        className="text-sm-body"
        style={{
          color: "var(--text-muted)",
          margin: "0.625rem 0 0",
          lineHeight: 1.55,
          ...(expanded ? {} : {
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }),
        }}
      >
        {app.description}
      </p>

      {expanded && (
        <div
          className="reveal-fade"
          style={{
            marginTop: "1rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="text-label" style={{ color: "var(--text-dim)" }}>Owner</span>
            <span className="text-sm-body" style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
              {app.team}
            </span>
          </div>
          {app.url ? (
            <div className="pill-tooltip-wrap" style={{ position: "relative", display: "inline-flex" }}>
              <a
                href={app.url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="link-orange"
                style={{ fontSize: "0.8125rem", fontWeight: 600 }}
              >
                Open in NP →
              </a>
              <div className="pill-tooltip">
                Hosted inside NinjaPanel (CF employees only)
              </div>
            </div>
          ) : (
            <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontStyle: "italic" }}>
              Not yet available
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function PlatformAppsSection() {
  const [filter, setFilter] = useState<AppBadge | "All">("All");
  const [comingSoonSeen, setComingSoonSeen] = useState(false);
  const filters: Array<AppBadge | "All"> = ["All", "Core", "Platform", "Coming Soon"];
  const filtered =
    filter === "All" ? PLATFORM_APPS : PLATFORM_APPS.filter((a) => a.badge === filter);

  return (
    <section id="platform-apps" className="section">
      <div className="section-inner">
        <SectionHeader number="03" label="Platform Apps" />

        <div style={{ borderTop: "1px dashed var(--border-dashed)", paddingTop: "3rem" }}>
          <div className="reveal-up" style={{ maxWidth: 680, marginBottom: "2.5rem" }}>
            <h2 className="text-h2" style={{ color: "var(--text-primary)", margin: "0 0 1rem" }}>
              Everything hosted inside NinjaPanel
            </h2>
            <p className="text-body" style={{ color: "var(--text-secondary)", margin: 0 }}>
              NP hosts {PLATFORM_APPS.length}+ tools built by teams across the company. Click any card for the NP URL and owner.
            </p>
          </div>

          {/* Filter row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "2rem",
            }}
          >
            {filters.map((f) => {
              const isComingSoon = f === "Coming Soon";
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => {
                    setFilter(f);
                    if (isComingSoon) setComingSoonSeen(true);
                  }}
                  style={{
                    padding: "0.375rem 0.875rem",
                    borderRadius: 100,
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background 0.12s, color 0.12s, border-color 0.12s",
                    position: "relative",
                    ...(isActive
                      ? { background: "var(--orange)", color: "#fff", border: "1px solid transparent" }
                      : { background: "transparent", color: "var(--text-muted)", border: "1px solid var(--border)" }),
                  }}
                >
                  {isComingSoon && !comingSoonSeen && (
                    <span
                      style={{
                        position: "absolute",
                        top: -7,
                        right: -7,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--orange)",
                        animation: "pulse-spin 2s ease-in-out infinite",
                        filter: "drop-shadow(0 0 3px rgba(246,130,31,0.8))",
                      }}
                    >
                      <svg width="14" height="14" viewBox="-8 -8 16 16" fill="none">
                        <polygon points="0,-7 1.8,-1.8 7,0 1.8,1.8 0,7 -1.8,1.8 -7,0 -1.8,-1.8" fill="currentColor" />
                        <circle cx="0" cy="0" r="1.8" fill="currentColor" />
                      </svg>
                    </span>
                  )}
                  {f}
                </button>
              );
            })}
          </div>

          <div
            className="stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
              alignItems: "start",
            }}
          >
            {filtered.map((app) => (
              <AppCard key={app.name} app={app} />
            ))}
          </div>

          <p
            style={{
              textAlign: "center",
              color: "var(--text-dim)",
              fontSize: "0.8125rem",
              marginTop: "2rem",
            }}
          >
            {PLATFORM_APPS.length} apps total ·{" "}
            <a href="#resources" className="link-orange">
              Want to add your app?
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
