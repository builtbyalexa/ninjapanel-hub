import { useState } from "react";
import { COMPARE_TOOLS } from "../content";
import { SectionHeader } from "./HeroSection";

export function CompareSection() {
  const [active, setActive] = useState("ninjapanel");
  const tool = COMPARE_TOOLS.find((t) => t.id === active)!;

  return (
    <section
      id="compare"
      className="section"
      style={{ background: "var(--bg-1)" }}
    >
      <div className="section-inner">
        <SectionHeader number="04" label="How does it compare?" />

        <div style={{ borderTop: "1px dashed var(--border-dashed)", paddingTop: "3rem" }}>
          <div className="reveal-up" style={{ maxWidth: 680, marginBottom: "3rem" }}>
            <h2 className="text-h2" style={{ color: "var(--text-primary)", margin: "0 0 1rem" }}>
              Internal Tool Comparison
            </h2>
            <p className="text-body" style={{ color: "var(--text-secondary)", margin: 0 }}>
              These tools may look similar from the outside but serve fundamentally different purposes and audiences.
            </p>
          </div>

          {/* Tab row */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "2rem",
              flexWrap: "wrap",
            }}
          >
            {COMPARE_TOOLS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                style={{
                  padding: "0.5rem 1.25rem",
                  borderRadius: 8,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.12s",
                  ...(active === t.id
                    ? {
                        background: t.highlight ? "var(--orange)" : "var(--blue-500)",
                        color: "#fff",
                        border: `1px solid ${t.highlight ? "var(--orange)" : "var(--blue-500)"}`,
                      }
                    : {
                        background: "var(--bg-card)",
                        color: "var(--text-muted)",
                        border: "1px solid var(--border)",
                      }),
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div
            key={active}
            className="card reveal-fade"
            style={{
              border: `1px solid ${tool.highlight ? "rgba(246,130,31,0.45)" : "var(--border)"}`,
              background: "var(--bg-card)",
              boxShadow: tool.highlight
                ? "0 0 0 1px rgba(246,130,31,0.12), 0 0 32px rgba(246,130,31,0.12), 0 0 80px rgba(246,130,31,0.07)"
                : undefined,
              transition: "box-shadow 0.4s ease, border-color 0.4s ease",
            }}
            onMouseEnter={(e) => {
              if (tool.highlight) {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 0 1px rgba(246,130,31,0.25), 0 0 48px rgba(246,130,31,0.22), 0 0 100px rgba(246,130,31,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(246,130,31,0.7)";
              } else {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 0 1px rgba(77,141,224,0.2), 0 0 32px rgba(77,141,224,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-bright)";
              }
            }}
            onMouseLeave={(e) => {
              if (tool.highlight) {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 0 1px rgba(246,130,31,0.12), 0 0 32px rgba(246,130,31,0.12), 0 0 80px rgba(246,130,31,0.07)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(246,130,31,0.45)";
              } else {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "1rem",
                marginBottom: "2rem",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h3
                    className="text-h3"
                    style={{ margin: 0, color: "var(--text-primary)" }}
                  >
                    {tool.label}
                  </h3>
                  {tool.highlight && (
                    <span className="badge badge-platform">Built by PPT</span>
                  )}
                </div>
                <p
                  className="text-sm-body"
                  style={{ color: "var(--text-secondary)", margin: 0, maxWidth: 520 }}
                >
                  {tool.purpose}
                </p>
              </div>
              <a
                href={tool.link}
                target="_blank"
                rel="noreferrer"
                className="link-orange"
                style={{ fontSize: "0.875rem", fontWeight: 600, flexShrink: 0 }}
              >
                {tool.linkLabel} →
              </a>
            </div>

            {/* Comparison grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              {[
                { label: "Audience", value: tool.audience },
                { label: "Data Type", value: tool.dataType },
                { label: "Access", value: tool.access },
                { label: "Owned by", value: tool.owner },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    background: "var(--bg-1)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: "1rem",
                  }}
                >
                  <p className="text-label" style={{ color: "var(--text-muted)", marginBottom: "0.375rem" }}>
                    {label}
                  </p>
                  <p
                    className="text-sm-body"
                    style={{ color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Key notes */}
            <div>
              <p className="text-label" style={{ color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                Key notes
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {tool.notes.map((note) => (
                  <div
                    key={note}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.625rem",
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: tool.highlight ? "var(--orange)" : "var(--blue-500)",
                        flexShrink: 0,
                        marginTop: "0.5rem",
                      }}
                    />
                    <span
                      className="text-sm-body"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
