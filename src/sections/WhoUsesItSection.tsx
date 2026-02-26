import { useState } from "react";
import {
  DialogRoot,
  Dialog,
  DialogTitle,
  DialogDescription,
  Button,
} from "@cloudflare/kumo";
import { PERSONAS, type Persona } from "../content";
import { SectionHeader } from "./HeroSection";

function PersonaCard({ persona }: { persona: Persona }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="card card-lift"
        onClick={() => setOpen(true)}
        style={{
          width: "100%",
          textAlign: "left",
          cursor: "pointer",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.875rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
          <span style={{ fontSize: "2rem", flexShrink: 0 }}>{persona.emoji}</span>
          <div style={{ minWidth: 0 }}>
            <h3
              className="text-sm-body"
              style={{
                color: "var(--text-primary)",
                fontWeight: 600,
                margin: "0 0 0.25rem",
                lineHeight: 1.35,
              }}
            >
              {persona.role}
            </h3>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-muted)",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {persona.tagline}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
          {persona.tools.slice(0, 2).map((t) => (
            <span key={t} className="badge badge-platform">
              {t}
            </span>
          ))}
          {persona.tools.length > 2 && (
            <span className="badge badge-platform">+{persona.tools.length - 2} more</span>
          )}
        </div>

        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--orange)",
            margin: 0,
            fontWeight: 600,
          }}
        >
          View details →
        </p>
      </button>

      <DialogRoot open={open} onOpenChange={setOpen}>
        <Dialog size="lg">
          <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "2.5rem", flexShrink: 0 }}>{persona.emoji}</span>
            <div>
              <DialogTitle style={{ fontWeight: 700 }}>{persona.role}</DialogTitle>
              <DialogDescription>{persona.tagline}</DialogDescription>
            </div>
          </div>

          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              marginBottom: "1.25rem",
            }}
          >
            {persona.description}
          </p>

          <div style={{ marginBottom: "1.25rem" }}>
            <p className="text-label" style={{ color: "var(--text-muted)", marginBottom: "0.5rem", fontWeight: 700 }}>
              Tools they use in NP
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {persona.tools.map((t) => (
                <span key={t} className="badge badge-now">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              paddingTop: "1rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            <a href={persona.accessLink} target="_blank" rel="noreferrer">
              <Button variant="primary" size="sm">
                Open NinjaPanel →
              </Button>
            </a>
            <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
          </div>
        </Dialog>
      </DialogRoot>
    </>
  );
}

export function WhoUsesItSection() {
  return (
    <section id="who-uses-it" className="section" style={{ background: "var(--bg-1)" }}>
      <div className="section-inner">
        <SectionHeader number="02" label="Who uses it?" />

        <div style={{ borderTop: "1px dashed var(--border-dashed)", paddingTop: "3rem" }}>
          <div className="reveal-up" style={{ maxWidth: 680, marginBottom: "3rem" }}>
            <h2 className="text-h2" style={{ color: "var(--text-primary)", margin: "0 0 1rem" }}>
              Built for operators and builders
            </h2>
            <p className="text-body" style={{ color: "var(--text-secondary)", margin: 0 }}>
              NinjaPanel serves two main audiences: teams that use it daily for customer operations, and engineers who build admin tools on the platform.
            </p>
          </div>

          <div
            className="stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {PERSONAS.map((persona) => (
              <PersonaCard key={persona.role} persona={persona} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
