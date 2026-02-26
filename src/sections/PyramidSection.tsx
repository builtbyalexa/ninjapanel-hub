import { useState, useEffect } from "react";
import { PYRAMID_LEVELS, type PyramidLevel } from "../content";
import { SectionHeader } from "./HeroSection";

const STATUS_CLASS: Record<string, string> = {
  Now: "badge-now",
  Next: "badge-next",
  Later: "badge-later",
  Done: "badge-done",
};


// Mini pyramid SVG — 5 trapezoid slices, active level illuminated
// Level 5 (Enablement) = narrow peak at TOP, level 1 (Security) = wide base at BOTTOM
function MiniPyramid({ activeLevel }: { activeLevel: number }) {
  const W = 100;
  const H = 60;
  const sliceH = H / 5;

  // top→bottom in SVG: level 5 (peak, narrowest) first, level 1 (base, widest) last
  const levels = PYRAMID_LEVELS.slice().sort((a, b) => b.level - a.level);

  // i=0 → level 5 (top, narrow tip), i=4 → level 1 (bottom, wide base)
  // inset fraction: large inset = narrow slice. i=0 has max inset, i=4 has zero inset
  const slices = levels.map((lvl, i) => {
    const totalSlices = 5;
    const topInset = (totalSlices - i) / totalSlices;      // inset at top edge (large = narrow)
    const botInset = (totalSlices - i - 1) / totalSlices;  // inset at bottom edge (smaller = wider)
    const tlx = (W / 2) * topInset;
    const trx = W - tlx;
    const blx = (W / 2) * botInset;
    const brx = W - blx;
    const y1 = i * sliceH;
    const y2 = y1 + sliceH;
    return { lvl, tlx, trx, blx, brx, y1, y2 };
  });

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ display: "block", flexShrink: 0 }}
    >
      {slices.map(({ lvl, tlx, trx, blx, brx, y1, y2 }) => {
        const isActive = lvl.level === activeLevel;
        return (
          <polygon
            key={lvl.level}
            points={`${tlx},${y1} ${trx},${y1} ${brx},${y2} ${blx},${y2}`}
            fill={lvl.color}
            opacity={isActive ? 1 : 0.15}
            style={{ transition: "opacity 0.25s ease" }}
          />
        );
      })}
      {/* Separator lines */}
      {slices.map(({ lvl, blx, brx, y2 }) =>
        lvl.level > 1 ? (
          <line
            key={`sep-${lvl.level}`}
            x1={blx} y1={y2} x2={brx} y2={y2}
            stroke="var(--bg-base)"
            strokeWidth={1.5}
          />
        ) : null
      )}
    </svg>
  );
}

function DetailPanel({ level }: { level: PyramidLevel }) {
  return (
    <div
      className="card reveal-fade"
      style={{
        border: "1px solid var(--border-bright)",
        boxShadow: "0 0 40px rgba(37,99,196,0.08)",
        height: "100%",
      }}
    >
      {/* Header: text left, mini pyramid right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          marginBottom: "2rem",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Color bar + text */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flex: 1, minWidth: 0 }}>
          <div
            style={{
              width: 4,
              borderRadius: 4,
              alignSelf: "stretch",
              background: level.color,
              flexShrink: 0,
              minHeight: 48,
            }}
          />
          <div>
            <p className="text-label" style={{ color: "var(--text-muted)", marginBottom: "0.25rem" }}>
              {level.subtitle}
            </p>
            <h3 className="text-h3" style={{ margin: "0 0 0.5rem", color: "var(--text-primary)" }}>
              {level.title}
            </h3>
            <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", margin: 0, fontStyle: "italic", lineHeight: 1.5 }}>
              "{level.userStory}"
            </p>
          </div>
        </div>

        {/* Mini pyramid — right side */}
        <MiniPyramid activeLevel={level.level} />
      </div>

      {/* Objective — full width above the dense cards */}
      <div style={{ background: "var(--bg-1)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.125rem", marginBottom: "1.25rem" }}>
        <p className="text-label" style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>Objective</p>
        <p className="text-sm-body" style={{ color: "var(--text-secondary)", margin: 0 }}>{level.objective}</p>
      </div>

      {/* Feature Areas + Roadmap side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        {/* Feature Areas */}
        <div style={{ background: "var(--bg-1)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.125rem" }}>
          <p className="text-label" style={{ color: "var(--text-muted)", marginBottom: "0.625rem" }}>Feature Areas</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {level.featureAreas.map((fa) => (
              <li key={fa} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <span style={{ color: "var(--orange)", flexShrink: 0, marginTop: "0.35rem", fontSize: "0.6rem" }}>◆</span>
                <span className="text-sm-body" style={{ color: "var(--text-secondary)" }}>{fa}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Roadmap Projects */}
        <div style={{ background: "var(--bg-1)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.125rem" }}>
          <p className="text-label" style={{ color: "var(--text-muted)", marginBottom: "0.625rem" }}>Roadmap Projects</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {level.roadmapProjects.map((p) => (
              <div key={p.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                <span className="text-sm-body" style={{ color: "var(--text-secondary)", flex: 1, minWidth: 0 }}>{p.name}</span>
                <span className={`badge ${STATUS_CLASS[p.status]}`}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Results */}
      {level.keyResults.length > 0 && (
        <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
          <p className="text-label" style={{ color: "var(--text-muted)", marginBottom: "0.75rem" }}>Key Results (WIP)</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {level.keyResults.map((kr) => (
              <div key={kr} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <span style={{ width: 16, height: 16, borderRadius: "50%", border: "1.5px solid var(--blue-500)", flexShrink: 0, marginTop: "0.2rem" }} />
                <span className="text-sm-body" style={{ color: "var(--text-secondary)" }}>{kr}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export function PyramidSection() {
  const [activeLevel, setActiveLevel] = useState<number>(5);
  // On mobile, track which accordion item is open (null = all closed)
  const [accordionOpen, setAccordionOpen] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const displayOrder = [...PYRAMID_LEVELS].sort((a, b) => b.level - a.level);

  const handleLayerClick = (levelNum: number) => {
    if (isMobile) {
      setAccordionOpen((prev) => (prev === levelNum ? null : levelNum));
    } else {
      setActiveLevel(levelNum);
    }
  };

  return (
    <section id="pyramid" className="section">
      <div className="section-inner">
        <SectionHeader number="05" label="Focus Framework Pyramid" />

        <div style={{ borderTop: "1px dashed var(--border-dashed)", paddingTop: "3rem" }}>
          <div className="reveal-up" style={{ maxWidth: 680, marginBottom: "3.5rem" }}>
            <h2 className="text-h2" style={{ color: "var(--text-primary)", margin: "0 0 1rem" }}>
              How the PPT team prioritizes
            </h2>
            <p className="text-body" style={{ color: "var(--text-secondary)", margin: 0 }}>
              The PPT team's strategic priorities, modeled on the DashEx Focus Framework. {isMobile ? "Tap any layer to explore." : "Click any layer to explore."}
            </p>
          </div>

          {/* Desktop: side-by-side layout */}
          {!isMobile && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(220px, 340px) 1fr",
                gap: "2rem",
                alignItems: "start",
              }}
            >
              {/* Left: layer buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {displayOrder.map((level) => {
                  const isActive = activeLevel === level.level;
                  return (
                    <button
                      key={level.level}
                      onClick={() => handleLayerClick(level.level)}
                      style={{
                        width: "100%",
                        minHeight: 56,
                        background: isActive ? level.color : "var(--bg-card)",
                        borderRadius: 6,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        textAlign: "left",
                        padding: "0.5rem 1rem 0.5rem 14px",
                        color: isActive ? level.textColor : "var(--text-secondary)",
                        border: isActive ? "1px solid rgba(255,255,255,0.15)" : "1px solid var(--border)",
                        borderLeft: `6px solid ${level.color}`,
                        boxShadow: isActive ? "0 4px 16px rgba(0,0,0,0.25)" : "none",
                        opacity: isActive ? 1 : 0.75,
                        transition: "background 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease, color 0.2s ease",
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontFamily: "'SF Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", opacity: 0.7, lineHeight: 1, marginBottom: "0.2rem" }}>
                        {level.subtitle.toUpperCase()}
                      </span>
                      <span style={{ fontSize: "0.875rem", fontWeight: 700, lineHeight: 1.2 }}>
                        {level.title}
                      </span>
                    </button>
                  );
                })}
                <p style={{ textAlign: "center", color: "var(--text-dim)", fontSize: "0.7rem", fontFamily: "'SF Mono', monospace", letterSpacing: "0.06em", marginTop: "0.5rem" }}>
                  Click any layer to explore
                </p>
              </div>

              {/* Right: detail panel */}
              <DetailPanel level={PYRAMID_LEVELS.find((l) => l.level === activeLevel)!} />
            </div>
          )}

          {/* Mobile: accordion layout */}
          {isMobile && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {displayOrder.map((level) => {
                const isOpen = accordionOpen === level.level;
                return (
                  <div key={level.level}>
                    {/* Layer button */}
                    <button
                      onClick={() => handleLayerClick(level.level)}
                      style={{
                        width: "100%",
                        minHeight: 56,
                        background: isOpen ? level.color : "var(--bg-card)",
                        borderRadius: isOpen ? "6px 6px 0 0" : 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        textAlign: "left",
                        padding: "0.5rem 1rem 0.5rem 14px",
                        color: isOpen ? level.textColor : "var(--text-secondary)",
                        border: isOpen ? "1px solid rgba(255,255,255,0.15)" : "1px solid var(--border)",
                        borderBottom: isOpen ? "none" : undefined,
                        borderLeft: `6px solid ${level.color}`,
                        boxShadow: isOpen ? "0 4px 16px rgba(0,0,0,0.25)" : "none",
                        opacity: isOpen ? 1 : 0.75,
                        transition: "background 0.2s ease, opacity 0.2s ease, color 0.2s ease",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      <div>
                        <span style={{ display: "block", fontFamily: "'SF Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", opacity: 0.7, lineHeight: 1, marginBottom: "0.2rem" }}>
                          {level.subtitle.toUpperCase()}
                        </span>
                        <span style={{ fontSize: "0.875rem", fontWeight: 700, lineHeight: 1.2 }}>
                          {level.title}
                        </span>
                      </div>
                      {/* Chevron */}
                      <svg
                        width="16" height="16" viewBox="0 0 16 16" fill="none"
                        style={{ flexShrink: 0, transition: "transform 0.2s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.7 }}
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* Expanded detail panel */}
                    {isOpen && (
                      <div className="pyramid-accordion-panel">
                        <DetailPanel level={level} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
