import { useState } from "react";
import { HERO } from "../content";

// ─── Ninja star SVG ──────────────────────────────────────────
function Shuriken({
  size,
  opacity,
  rotate,
  style,
}: {
  size: number;
  opacity: number;
  rotate: number;
  style?: React.CSSProperties;
}) {
  const s = size / 2;
  const tip = s * 0.92;
  const inner = s * 0.24;
  const mid = s * 0.27;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`${-s} ${-s} ${size} ${size}`}
      fill="none"
      style={{
        position: "absolute",
        opacity,
        transform: `rotate(${rotate}deg)`,
        pointerEvents: "none",
        ...style,
      }}
    >
      {/* up */}
      <polygon points={`0,${-tip} ${mid},${-mid} 0,${-inner} ${-mid},${-mid}`} fill="currentColor" />
      {/* down */}
      <polygon points={`0,${tip} ${mid},${mid} 0,${inner} ${-mid},${mid}`} fill="currentColor" />
      {/* left */}
      <polygon points={`${-tip},0 ${-mid},${-mid} ${-inner},0 ${-mid},${mid}`} fill="currentColor" />
      {/* right */}
      <polygon points={`${tip},0 ${mid},${-mid} ${inner},0 ${mid},${mid}`} fill="currentColor" />
      <circle cx="0" cy="0" r={s * 0.18} fill="currentColor" />
      <circle cx="0" cy="0" r={s * 0.09} fill="#080d14" />
    </svg>
  );
}

// ─── Section Header (shared) ─────────────────────────────────
function SectionNum({ n }: { n: string }) {
  return (
    <span
      style={{
        fontFamily: "'SF Mono', monospace",
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        color: "var(--blue-400)",
        border: "1px solid var(--border-bright)",
        padding: "0.2rem 0.5rem",
        borderRadius: 4,
        flexShrink: 0,
      }}
    >
      {n}
    </span>
  );
}

export function SectionHeader({ number, label }: { number: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1.5rem",
        paddingTop: "3rem",
        paddingBottom: "1rem",
      }}
    >
      <SectionNum n={number} />
      <span
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────
export function HeroSection() {
  const [teamsOpen, setTeamsOpen] = useState(false);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-base)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      {/* Dot grid */}
      <div
        className="dot-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.6, pointerEvents: "none" }}
      />

      {/* Orange glow bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(246,130,31,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Blue glow top */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(37,99,196,0.15) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Ninja stars ── */}
      {/* top-right large */}
      <div style={{ position: "absolute", top: "3%", right: "4%", color: "var(--blue-700)" }}>
        <Shuriken size={130} opacity={0.18} rotate={15} />
      </div>
      {/* left-mid medium */}
      <div style={{ position: "absolute", top: "28%", left: "2%", color: "var(--blue-600)" }}>
        <Shuriken size={80} opacity={0.14} rotate={-22} />
      </div>
      {/* bottom-right small */}
      <div style={{ position: "absolute", bottom: "10%", right: "8%", color: "var(--blue-500)" }}>
        <Shuriken size={55} opacity={0.12} rotate={40} />
      </div>
      {/* bottom-left medium */}
      <div style={{ position: "absolute", bottom: "18%", left: "6%", color: "#f6821f" }}>
        <Shuriken size={70} opacity={0.09} rotate={-10} />
      </div>
      {/* top-left tiny */}
      <div style={{ position: "absolute", top: "12%", left: "14%", color: "var(--blue-400)" }}>
        <Shuriken size={36} opacity={0.11} rotate={30} />
      </div>
      {/* top-right small */}
      <div style={{ position: "absolute", top: "22%", right: "16%", color: "#f6821f" }}>
        <Shuriken size={42} opacity={0.10} rotate={-35} />
      </div>

      {/* Corner brackets */}
      <div className="corner-brackets">
        <span />
      </div>

      {/* Content */}
      <div
        className="hero-section-inner"
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "calc(52px + 7rem) 2rem 6rem",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
        <div
          className="reveal-fade"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            border: "1px solid var(--border)",
            borderRadius: 100,
            padding: "0.3rem 0.875rem",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--orange)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--blue-300)",
              textAlign: "center",
            }}
          >
            <span className="hero-eyebrow-line1">Internal Tools</span>
            <span className="hero-eyebrow-sep"> · </span>
            <span className="hero-eyebrow-line2">Product Platform Team</span>
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-hero reveal-up"
          style={{
            margin: "0 0 0.5rem",
            color: "var(--text-primary)",
            animationDelay: "0.05s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5em",
          }}
        >
          <span className="text-gradient-orange" style={{ letterSpacing: "0.2em" }}>NINJAPANEL</span>
        </h1>

        <h2
          className="text-h2 reveal-up"
          style={{
            margin: "0 0 1.75rem",
            color: "var(--text-secondary)",
            fontWeight: 400,
            animationDelay: "0.1s",
          }}
        >
          {HERO.subheadline}
        </h2>

        <p
          className="text-body reveal-up"
          style={{
            color: "var(--text-secondary)",
            maxWidth: 620,
            margin: "0 auto 2.5rem",
            animationDelay: "0.15s",
          }}
        >
          {HERO.description}
        </p>

        {/* CTA pills */}
        <div
          className="reveal-up"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            justifyContent: "center",
            marginBottom: "1.25rem",
            animationDelay: "0.2s",
          }}
        >
          {HERO.pills.map((pill, i) => (
            <div key={pill.label} style={{ position: "relative" }} className="pill-tooltip-wrap">
              <a
                href={pill.href}
                target={pill.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.625rem 1.25rem",
                  borderRadius: 8,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  transition: "opacity 0.12s, transform 0.12s",
                  ...(i === 0
                    ? { background: "var(--orange)", color: "#fff", boxShadow: "0 0 24px rgba(246,130,31,0.3)" }
                    : { background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)" }),
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.85";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {pill.label}
              </a>
              {pill.tooltip && (
                <div className="pill-tooltip">
                  {pill.tooltip}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Ticker — coming soon callout */}
        <div
          className="reveal-up"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "2rem",
            marginBottom: "2rem",
            animationDelay: "0.22s",
          }}
        >
          <span style={{ fontSize: "0.85rem" }}>✨</span>
          <span
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "var(--text-muted)",
            }}
          >
            NinjaPanel MCP + Official NP CLI — coming Q2 '26
          </span>
          <span style={{ fontSize: "0.85rem" }}>✨</span>
        </div>

        {/* Stats */}
        <div
          className="reveal-up"
          style={{
            maxWidth: 520,
            margin: "0 auto",
            animationDelay: "0.25s",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              borderTop: "1px solid var(--border)",
              paddingTop: "2.5rem",
            }}
          >
            {HERO.stats.map((stat, i) => {
              const isTeams = stat.label === "Teams Supported";
              return (
                <div
                  key={stat.label}
                  style={{
                    textAlign: "center",
                    padding: "0 1.5rem",
                    borderRight: i < 2 ? "1px solid var(--border)" : undefined,
                  }}
                >
                  <p
                    className="text-gradient-orange"
                    style={{
                      fontFamily: "'SF Mono', monospace",
                      fontSize: "2rem",
                      fontWeight: 800,
                      margin: 0,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {stat.value}
                  </p>
                  {isTeams ? (
                    <button
                      onClick={() => setTeamsOpen((o) => !o)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                        {stat.label}
                      </span>
                      <span
                        style={{
                          fontSize: "0.6rem",
                          color: "var(--orange)",
                          transition: "transform 0.2s",
                          display: "inline-block",
                          transform: teamsOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        ▼
                      </span>
                    </button>
                  ) : (
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem", lineHeight: 1.4 }}>
                      {stat.label}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Expandable teams list */}
          <div
            style={{
              overflow: "hidden",
              maxHeight: teamsOpen ? "600px" : "0px",
              transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s",
              opacity: teamsOpen ? 1 : 0,
            }}
          >
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1rem 1.25rem",
                background: "var(--bg-1)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                textAlign: "left",
              }}
            >
              <p
                style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  margin: "0 0 0.75rem",
                }}
              >
                // Platform app teams + operational users
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.4rem",
                }}
              >
                {HERO.teams.map((team) => (
                  <span
                    key={team}
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      borderRadius: 6,
                      padding: "0.2rem 0.6rem",
                      fontWeight: 500,
                    }}
                  >
                    {team}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            marginTop: "4rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            opacity: 0.3,
            animation: "bounce 2s infinite",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "var(--blue-400)" }}>
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "var(--text-dim)",
              textTransform: "uppercase",
            }}
          >
            scroll
          </span>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}
