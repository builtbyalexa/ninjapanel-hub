import { useState } from "react";
import { WHAT_IS_NP } from "../content";
import { SectionHeader } from "./HeroSection";

export function WhatIsNpSection() {
  const [hoveredIs, setHoveredIs] = useState<number | null>(null);

  return (
    <section id="what-is-np" className="section">
      <div className="section-inner">
        <SectionHeader number="01" label="What is NinjaPanel?" />

        <div
          style={{
            borderTop: "1px dashed var(--border-dashed)",
            paddingTop: "3rem",
          }}
        >
          {/* Intro */}
          <div className="reveal-up" style={{ maxWidth: 680, marginBottom: "3rem" }}>
            <h2 className="text-h2" style={{ color: "var(--text-primary)", margin: "0 0 1rem" }}>
              The internal control plane for company operations
            </h2>
            <p
              className="text-body"
              style={{ color: "var(--text-secondary)", margin: 0 }}
            >
              {WHAT_IS_NP.subtitle}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
              gap: "1.5rem",
            }}
          >
            {/* IS card */}
            <div className="card reveal-up" style={{ animationDelay: "0.05s" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.25rem",
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(34,197,94,0.12)",
                    border: "1px solid rgba(34,197,94,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--green)",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                <h3 className="text-h3" style={{ margin: 0, color: "var(--text-primary)" }}>
                  NinjaPanel IS
                </h3>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {WHAT_IS_NP.is.map((item, i) => (
                  <li key={item.label}>
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.625rem",
                        padding: "0.625rem 0.75rem",
                        borderRadius: 8,
                        cursor: "default",
                        background: hoveredIs === i ? "var(--bg-2)" : "transparent",
                        border: "1px solid",
                        borderColor: hoveredIs === i ? "var(--border)" : "transparent",
                        transition: "background 0.12s, border-color 0.12s",
                      }}
                      onMouseEnter={() => setHoveredIs(i)}
                      onMouseLeave={() => setHoveredIs(null)}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "var(--green)",
                          flexShrink: 0,
                          marginTop: "0.45rem",
                        }}
                      />
                      <span
                        className="text-sm-body"
                        style={{
                          color: hoveredIs === i ? "var(--text-primary)" : "var(--text-secondary)",
                          transition: "color 0.12s",
                          flex: 1,
                        }}
                      >
                        {item.label}
                      </span>
                      {hoveredIs === i && (
                        <span
                          style={{
                            fontSize: "0.7rem",
                            color: "var(--text-muted)",
                            marginLeft: "auto",
                            flexShrink: 0,
                          }}
                        >
                          ↓
                        </span>
                      )}
                    </div>
                    {hoveredIs === i && (
                      <div
                        className="reveal-fade"
                        style={{
                          marginLeft: "1.625rem",
                          marginTop: "0.25rem",
                          padding: "0.625rem 0.75rem",
                          background: "var(--bg-elevated)",
                          border: "1px solid var(--border-bright)",
                          borderRadius: 8,
                          fontSize: "0.8125rem",
                          color: "var(--text-muted)",
                          lineHeight: 1.6,
                        }}
                      >
                        {item.tooltip}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* ISN'T card */}
            <div className="card reveal-up" style={{ animationDelay: "0.1s" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.25rem",
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--red)",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  ✕
                </span>
                <h3 className="text-h3" style={{ margin: 0, color: "var(--text-primary)" }}>
                  NinjaPanel ISN'T
                </h3>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {WHAT_IS_NP.isnt.map((item) => (
                  <li
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.625rem",
                      padding: "0.75rem",
                      background: "var(--bg-1)",
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "var(--red)",
                        flexShrink: 0,
                        marginTop: "0.45rem",
                        opacity: 0.7,
                      }}
                    />
                    <div>
                      <p
                        className="text-sm-body"
                        style={{ color: "var(--text-primary)", margin: "0 0 0.25rem", fontWeight: 500 }}
                      >
                        {item.label}
                      </p>
                      <p
                        style={{ color: "var(--text-muted)", fontSize: "0.8rem", margin: 0, lineHeight: 1.5 }}
                      >
                        {item.note}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
