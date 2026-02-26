import { useState } from "react";
import { TEAM, getTeamMemberTenure, isNewMember, type TeamMember } from "../content";
import { SectionHeader } from "./HeroSection";

function IconButton({ href, title, children }: { href: string; title: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={title}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 28,
        height: 28,
        borderRadius: 6,
        border: "1px solid var(--border)",
        background: "var(--bg-elevated)",
        color: "var(--text-muted)",
        textDecoration: "none",
        flexShrink: 0,
        transition: "border-color 0.12s, color 0.12s, background 0.12s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "var(--border-bright)";
        el.style.color = "var(--text-primary)";
        el.style.background = "var(--bg-2)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "var(--border)";
        el.style.color = "var(--text-muted)";
        el.style.background = "var(--bg-elevated)";
      }}
    >
      {children}
    </a>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  const [imgError, setImgError] = useState(false);
  const tenure = getTeamMemberTenure(member);
  const isNew = isNewMember(member);
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();


  const mailtoUrl = `mailto:${member.email}`;

  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem 1.5rem 1.75rem",
        gap: 0,
        transition: "border-color 0.15s, box-shadow 0.15s",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border-bright)";
        el.style.boxShadow = "0 0 0 1px var(--border-bright) inset, 0 8px 32px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.boxShadow = "none";
      }}
    >
      {/* New badge — top-right corner, auto-hides after 4 months */}
      {isNew && (
        <span
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#fff",
            background: "var(--orange)",
            borderRadius: 4,
            padding: "0.15rem 0.45rem",
            lineHeight: 1.6,
          }}
        >
          New
        </span>
      )}

      {/* Photo / Initials avatar */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid var(--border-bright)",
          marginBottom: "1.25rem",
          background: "var(--bg-elevated)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!imgError ? (
          <img
            src={member.photo}
            alt={member.name}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
        ) : (
          <span
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--blue-400)",
              letterSpacing: "0.02em",
            }}
          >
            {initials}
          </span>
        )}
      </div>

      {/* Name + Title — flex: 1 pushes contact icons to consistent position */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", marginBottom: "0.5rem" }}>
        <p
          style={{
            fontWeight: 700,
            fontSize: "1rem",
            color: "var(--text-primary)",
            margin: "0 0 0.25rem",
            lineHeight: 1.3,
          }}
        >
          {member.name}
        </p>
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--blue-400)",
            fontWeight: 600,
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {member.title}
        </p>
      </div>

      {/* Contact icons — under title */}
      <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.875rem" }}>
        {member.gchatDm && (
          <IconButton href={member.gchatDm} title="Message on GChat">
            {/* Chat bubble */}
            <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
              <path d="M3 3h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7l-4 3V4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            </svg>
          </IconButton>
        )}
        <IconButton href={mailtoUrl} title={`Email ${member.name}`}>
          {/* Envelope */}
          <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M2 5.5l7 5.5 7-5.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
          </svg>
        </IconButton>
      </div>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          height: 1,
          background: "var(--border)",
          marginBottom: "0.875rem",
        }}
      />

      {/* Meta chips */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.4rem",
          marginBottom: member.funFact ? "1rem" : 0,
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            borderRadius: 5,
            padding: "0.2rem 0.55rem",
            lineHeight: 1.5,
          }}
        >
          📍 {member.city}, {member.state} · {member.timezone}
        </span>
        <span
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            borderRadius: 5,
            padding: "0.2rem 0.55rem",
            lineHeight: 1.5,
          }}
        >
          ⏱ {tenure} at company
        </span>
      </div>

      {/* Fun fact */}
      {member.funFact && (
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--text-secondary)",
            margin: 0,
            lineHeight: 1.55,
            fontStyle: "italic",
            borderTop: "1px dashed var(--border-dashed)",
            paddingTop: "0.875rem",
            width: "100%",
            textAlign: "center",
          }}
        >
          "{member.funFact}"
        </p>
      )}
    </div>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="section"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="section-inner">
        <SectionHeader number="09" label="The Team" />

        <div style={{ borderTop: "1px dashed var(--border-dashed)", paddingTop: "3rem" }}>
          <div className="reveal-up" style={{ maxWidth: 600, marginBottom: "3rem" }}>
            <h2 className="text-h2" style={{ color: "var(--text-primary)", margin: "0 0 1rem" }}>
              Product Platform Tools
            </h2>
            <p className="text-body" style={{ color: "var(--text-secondary)", margin: 0 }}>
              The small, but growing team behind NinjaPanel and Feature Flipper.
            </p>
          </div>

          <div
            className="stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 150px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {TEAM.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
