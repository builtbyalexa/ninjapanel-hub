import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "./content";
import { useLogoBurst, IdleShuriken } from "./EasterEggs";
import { HeroSection } from "./sections/HeroSection";
import { WhatIsNpSection } from "./sections/WhatIsNpSection";
import { WhoUsesItSection } from "./sections/WhoUsesItSection";
import { PlatformAppsSection } from "./sections/PlatformAppsSection";
import { CompareSection } from "./sections/CompareSection";
import { PyramidSection } from "./sections/PyramidSection";
import { RoadmapSection } from "./sections/RoadmapSection";
import { IdeasSection } from "./sections/IdeasSection";
import { ResourcesSection } from "./sections/ResourcesSection";
import { AboutSection } from "./sections/AboutSection";

// ─── Ghost star for footer ────────────────────────────────────
function FooterStar({ size, opacity, rotate, style, color }: {
  size: number; opacity: number; rotate: number;
  style?: React.CSSProperties; color: string;
}) {
  const s = size / 2;
  const tip = s * 0.92, inner = s * 0.24, mid = s * 0.27;
  return (
    <svg
      width={size} height={size}
      viewBox={`${-s} ${-s} ${size} ${size}`}
      fill="none"
      style={{ position: "absolute", opacity, transform: `rotate(${rotate}deg)`, pointerEvents: "none", color, ...style }}
    >
      <polygon points={`0,${-tip} ${mid},${-mid} 0,${-inner} ${-mid},${-mid}`} fill="currentColor" />
      <polygon points={`0,${tip} ${mid},${mid} 0,${inner} ${-mid},${mid}`} fill="currentColor" />
      <polygon points={`${-tip},0 ${-mid},${-mid} ${-inner},0 ${-mid},${mid}`} fill="currentColor" />
      <polygon points={`${tip},0 ${mid},${-mid} ${inner},0 ${mid},${mid}`} fill="currentColor" />
      <circle cx="0" cy="0" r={s * 0.18} fill="currentColor" />
      <circle cx="0" cy="0" r={s * 0.09} fill="#080d14" />
    </svg>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: "dark" | "light"; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="btn-ghost"
      style={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: "0.375rem",
        padding: "0.35rem 0.75rem",
        borderRadius: 7,
        border: "1px solid var(--border)",
        background: "var(--bg-card)",
        color: "var(--text-muted)",
        fontSize: "0.8rem",
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "border-color 0.12s, color 0.12s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-bright)";
        (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
      }}
    >
      <span style={{ fontSize: "0.9rem" }}>{theme === "dark" ? "☀️" : "🌙"}</span>
      <span style={{ display: "none" }}>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {open ? (
        <>
          <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="3" y1="5"  x2="17" y2="5"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function Nav({ theme, onToggle, activeSection, onLogoBurst }: { theme: "dark" | "light"; onToggle: () => void; activeSection: string; onLogoBurst: (x: number, y: number) => void }) {
  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!navRef.current || !activeSection) { setIndicator(null); return; }
    const activeEl = navRef.current.querySelector<HTMLElement>(`[data-section="${activeSection}"]`);
    if (!activeEl) { setIndicator(null); return; }
    const navRect = navRef.current.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();
    setIndicator({ left: elRect.left - navRect.left, width: elRect.width });
  }, [activeSection]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".nav-bar") && !target.closest(".nav-mobile-dropdown")) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  // Close mobile menu when active section changes (user tapped a link)
  useEffect(() => { setMobileOpen(false); }, [activeSection]);

  return (
    <>
      <header className="nav-bar">
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 1.5rem",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => {
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              onLogoBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexShrink: 0,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: "0.7rem",
                color: "var(--blue-400)",
                border: "1px solid var(--border-bright)",
                padding: "0.15rem 0.4rem",
                borderRadius: 4,
                letterSpacing: "0.08em",
              }}
            >
              NP
            </span>
            <span
              style={{
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              NinjaPanel Hub
            </span>
          </a>

          {/* Nav links — hidden on mobile */}
          <nav
            ref={navRef}
            className="nav-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.125rem",
              overflowX: "hidden",
              flexShrink: 1,
              position: "relative",
            }}
          >
            {/* Sliding indicator line */}
            {indicator && (
              <span
                style={{
                  position: "absolute",
                  bottom: -1,
                  left: indicator.left,
                  width: indicator.width,
                  height: 2,
                  background: "var(--orange)",
                  borderRadius: 2,
                  transition: "left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease",
                  pointerEvents: "none",
                }}
              />
            )}
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  data-section={link.href.slice(1)}
                  style={{
                    fontSize: "0.8125rem",
                    color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                    padding: "0.375rem 0.625rem",
                    borderRadius: 6,
                    whiteSpace: "nowrap",
                    transition: "color 0.35s ease, background 0.15s ease, opacity 0.35s ease",
                    fontWeight: 400,
                    opacity: isActive ? 1 : 0.7,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-2)";
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = isActive ? "var(--text-primary)" : "var(--text-muted)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.opacity = isActive ? "1" : "0.7";
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right side: theme toggle + CTA (desktop) + hamburger (mobile) */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
            <ThemeToggle theme={theme} onToggle={onToggle} />
            <a
              href="https://ninjapanel.cfdata.org"
              target="_blank"
              rel="noreferrer"
              className="nav-cta-desktop"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 700,
                color: "#fff",
                background: "var(--orange)",
                padding: "0.4rem 0.875rem",
                borderRadius: 7,
                letterSpacing: "-0.01em",
                transition: "opacity 0.12s",
                textDecoration: "none",
              }}
            >
              Open NP →
            </a>
            {/* Hamburger — mobile only */}
            <button
              className="nav-hamburger"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              style={{
                display: "none",
                background: "none",
                border: "1px solid var(--border)",
                borderRadius: 7,
                padding: "0.35rem 0.5rem",
                cursor: "pointer",
                color: "var(--text-muted)",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "inherit",
                transition: "border-color 0.12s, color 0.12s",
              }}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="nav-mobile-dropdown">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "0.875rem 1.5rem",
                  fontSize: "0.9375rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "var(--orange)" : "var(--text-secondary)",
                  borderLeft: isActive ? "2px solid var(--orange)" : "2px solid transparent",
                  textDecoration: "none",
                  transition: "color 0.12s, border-color 0.12s",
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}

export default function App() {
  // Theme state — persisted to localStorage
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("np-hub-theme");
    return saved === "light" ? "light" : "dark";
  });

  // Sync theme to <html data-mode="..."> and localStorage whenever it changes
  useEffect(() => {
    document.documentElement.dataset.mode = theme;
    localStorage.setItem("np-hub-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const logoBurst = useLogoBurst();

  // Active section tracking via IntersectionObserver
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);



  return (
    <div id="top" style={{ background: "var(--bg-base)", minHeight: "100vh" }}>
      <Nav theme={theme} onToggle={toggleTheme} activeSection={activeSection} onLogoBurst={logoBurst} />
      <IdleShuriken />

      <HeroSection />

      <WhatIsNpSection />
      <WhoUsesItSection />
      <PlatformAppsSection />
      <CompareSection />
      <PyramidSection />
      <RoadmapSection />
      <IdeasSection />
      <ResourcesSection />
      <AboutSection />

      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "2.5rem 1.5rem",
          marginTop: "4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid — mirrors hero */}
        <div
          className="dot-grid"
          style={{ position: "absolute", inset: 0, opacity: 0.35, pointerEvents: "none" }}
        />
        {/* Faint blue glow top */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(37,99,196,0.08) 0%, transparent 70%)",
        }} />
        {/* Ghost stars — clustered right where there's open space */}
        <FooterStar size={110} opacity={0.18} rotate={15}  style={{ top: "-10px",  right: "4%" }}  color="var(--blue-700)" />
        <FooterStar size={60}  opacity={0.15} rotate={-28} style={{ bottom: "0px", right: "14%" }} color="var(--blue-500)" />
        <FooterStar size={38}  opacity={0.20} rotate={42}  style={{ top: "20px",   right: "22%" }} color="#f6821f" />

        <div
          style={{
            position: "relative",
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
          }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: 0 }}>
            Maintained by{" "}
            <a
              href="https://github.com/builtbyalexa/ninjapanel-hub"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--orange)", fontWeight: 600, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              alexa
            </a>
          </p>

        </div>
      </footer>
    </div>
  );
}
