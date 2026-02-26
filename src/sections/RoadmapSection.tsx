import { useState } from "react";
import { ROADMAP_ITEMS, ROADMAP_LAST_UPDATED, type RoadmapStatus, type RoadmapItem } from "../content";
import { SectionHeader } from "./HeroSection";

const STATUS_CONFIG: Record<
  RoadmapStatus,
  { class: string; colClass: string; color: string }
> = {
  Now:   { class: "badge-now",   colClass: "swimlane-now",   color: "var(--green)" },
  Next:  { class: "badge-next",  colClass: "swimlane-next",  color: "var(--orange)" },
  Later: { class: "badge-later", colClass: "swimlane-later", color: "var(--blue-500)" },
  Done:  { class: "badge-done",  colClass: "swimlane-done",  color: "var(--purple)" },
};

const PYRAMID_LABEL: Record<number, string> = {
  1: "Security & Reliability",
  2: "Usability",
  3: "Platform Extensibility",
  4: "Transparency & Accountability",
  5: "Enablement & Impact",
};

function RoadmapCard({ item }: { item: RoadmapItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`card${open ? " card-active" : " card-lift"}`}
      style={{ cursor: "pointer" }}
      onClick={() => setOpen((o) => !o)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setOpen((v) => !v)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "0.5rem",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <p
            className="text-sm-body"
            style={{ fontWeight: 600, color: "var(--text-primary)", margin: "0 0 0.25rem" }}
          >
            {item.title}
          </p>
          {item.dueDate && (
            <p
              className="text-mono"
              style={{ color: "var(--text-muted)", margin: 0 }}
            >
              {item.dueDate}
            </p>
          )}
        </div>
        <span style={{ color: "var(--text-dim)", fontSize: "0.7rem", flexShrink: 0, marginTop: "0.2rem" }}>
          {open ? "▲" : "▼"}
        </span>
      </div>

      {open && (
        <div
          className="reveal-fade"
          style={{
            marginTop: "0.875rem",
            paddingTop: "0.875rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <p className="text-sm-body" style={{ color: "var(--text-secondary)", margin: "0 0 0.75rem", lineHeight: 1.6 }}>
            {item.summary}
          </p>

          {item.pyramidLevel && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span className="text-label" style={{ color: "var(--text-dim)" }}>Focus</span>
              <span style={{ fontSize: "0.8rem", color: "var(--blue-400)", fontWeight: 500 }}>
                {PYRAMID_LABEL[item.pyramidLevel]}
              </span>
            </div>
          )}

          {item.links && item.links.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {item.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="link-orange"
                  style={{ fontSize: "0.8125rem", fontWeight: 600 }}
                >
                  {link.label} →
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function RoadmapSection() {
  const columns: RoadmapStatus[] = ["Now", "Next", "Later", "Done"];

  return (
    <section
      id="roadmap"
      className="section"
      style={{ background: "var(--bg-1)" }}
    >
      <div className="section-inner">
        <SectionHeader number="06" label="Roadmap" />

        <div style={{ borderTop: "1px dashed var(--border-dashed)", paddingTop: "3rem" }}>
          <div
            className="reveal-up"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              maxWidth: "100%",
              marginBottom: "2.5rem",
            }}
          >
            <div>
              <h2 className="text-h2" style={{ color: "var(--text-primary)", margin: "0 0 0.75rem" }}>
                What we're working on
              </h2>
              <p className="text-body" style={{ color: "var(--text-secondary)", margin: 0 }}>
                Active work, what's coming next, and what's been shipped.
              </p>
            </div>
            <div style={{ flexShrink: 0, textAlign: "left" }}>
              <p className="text-label" style={{ color: "var(--text-dim)", marginBottom: "0.25rem" }}>
                Last updated
              </p>
              <p className="text-mono" style={{ color: "var(--text-muted)", margin: 0 }}>
                {ROADMAP_LAST_UPDATED}
              </p>
              <a
                href="https://docs.google.com/spreadsheets/d/1LCoRGsHVZr_rD5PPCWys630fD2zF8WeBjom7GYMy92w"
                target="_blank"
                rel="noreferrer"
                className="link-orange"
                style={{ fontSize: "0.8125rem", fontWeight: 600, display: "block", marginTop: "0.25rem" }}
              >
                View full sheet →
              </a>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {columns.map((status) => {
              const config = STATUS_CONFIG[status];
              const items = ROADMAP_ITEMS.filter((i) => i.status === status);

              return (
                <div key={status}>
                  <div
                    className={config.colClass}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      padding: "1.25rem",
                      paddingTop: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "1.25rem",
                      }}
                    >
                      <span className={`badge ${config.class}`}>{status}</span>
                      <span
                        className="text-mono"
                        style={{ color: "var(--text-dim)" }}
                      >
                        {items.length}
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {items.map((item) => (
                        <RoadmapCard key={item.id} item={item} />
                      ))}
                      {items.length === 0 && (
                        <p
                          className="text-mono"
                          style={{ color: "var(--text-dim)", textAlign: "center", padding: "1rem" }}
                        >
                          None
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
