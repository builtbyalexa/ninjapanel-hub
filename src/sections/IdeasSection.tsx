import { useEffect, useState } from "react";
import {
  Button,
  DialogRoot,
  Dialog,
  DialogTitle,
  DialogDescription,
  Input,
  InputArea,
} from "@cloudflare/kumo";
import { SEEDED_IDEAS, type IdeaSeed } from "../content";
import { SectionHeader } from "./HeroSection";

const UPVOTES_KEY = "np-hub-upvotes";
const IDEAS_API = "/api/ideas";

type Idea = IdeaSeed & { source?: "seed" | "live" };

interface Comment {
  id: string;
  idea_id: string;
  body: string;
  email: string | null;
  created_at: string;
}

function CommentsDialog({ idea }: { idea: Idea }) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [count, setCount] = useState(0);

  // Fetch comment count on mount for seeded ideas we show 0
  useEffect(() => {
    if (!idea.id.startsWith("seed-") && !idea.id.startsWith("local-")) {
      fetch(`${IDEAS_API}/${idea.id}/comments`)
        .then((r) => r.ok ? r.json() : [])
        .then((data: Comment[]) => setCount(data.length))
        .catch(() => {});
    }
  }, [idea.id]);

  const fetchComments = async () => {
    if (fetched) return;
    try {
      const r = await fetch(`${IDEAS_API}/${idea.id}/comments`);
      if (r.ok) { const data = await r.json() as Comment[]; setComments(data); setCount(data.length); }
    } catch { /* ok */ }
    setFetched(true);
  };

  const handleOpen = () => { setOpen(true); fetchComments(); };

  const handleSubmit = async () => {
    if (!body.trim()) return;
    setLoading(true);
    // Public portfolio demo — comments are not persisted
    const localComment: Comment = {
      id: `local-${Date.now()}`,
      idea_id: idea.id,
      body: body.trim(),
      email: email.trim() || null,
      created_at: new Date().toISOString(),
    };
    setComments((prev) => [...prev, localComment]);
    setCount((c) => c + 1);
    setBody("");
    setEmail("");
    setLoading(false);
  };

  const displayed = showAll ? comments : comments.slice(0, 3);

  return (
    <>
      <button
        onClick={handleOpen}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: "0.75rem",
          color: "var(--text-dim)",
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
      >
        {count > 0 ? `${count} comment${count !== 1 ? "s" : ""}` : "0 comments"}
      </button>

      <DialogRoot open={open} onOpenChange={setOpen}>
        <Dialog size="base">
          <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: 0 }}>
            <DialogTitle style={{ fontWeight: 700 }}>{idea.title}</DialogTitle>
            <DialogDescription>
              {idea.description}
            </DialogDescription>

            {/* Comments list */}
            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {!fetched && <p style={{ color: "var(--text-dim)", fontSize: "0.8rem", margin: 0 }}>Loading comments…</p>}
              {fetched && comments.length === 0 && (
                <p style={{ color: "var(--text-dim)", fontSize: "0.8rem", margin: 0, fontStyle: "italic" }}>
                  No comments yet — be the first!
                </p>
              )}
              {displayed.map((c) => (
                <div
                  key={c.id}
                  style={{
                    background: "var(--bg-1)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: "0.875rem 1rem",
                  }}
                >
                  <p style={{ margin: "0 0 0.375rem", fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                    {c.body}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.7rem", color: "var(--text-dim)", fontFamily: "'SF Mono', monospace" }}>
                    {c.email ? c.email : "Anonymous"} · {new Date(c.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {comments.length > 3 && !showAll && (
                <button
                  onClick={() => setShowAll(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--orange)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: 0,
                    textAlign: "left",
                    fontFamily: "inherit",
                  }}
                >
                  Show {comments.length - 3} more comment{comments.length - 3 !== 1 ? "s" : ""} ↓
                </button>
              )}
            </div>

            {/* Add comment */}
            <div
              style={{
                marginTop: "1.5rem",
                paddingTop: "1.25rem",
                borderTop: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <p className="text-label" style={{ color: "var(--text-muted)", margin: 0, fontWeight: 700 }}>
                Leave a comment
              </p>
              <InputArea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="What do you think about this idea?"
                rows={3}
                style={{ width: "100%" }}
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com (optional)"
                type="email"
                style={{ width: "100%" }}
              />
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <Button variant="primary" onClick={handleSubmit} disabled={!body.trim() || loading}>
                  {loading ? "Posting…" : "Post Comment"}
                </Button>
                <Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>
              </div>
            </div>
          </div>
        </Dialog>
      </DialogRoot>
    </>
  );
}

function getUpvoted(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(UPVOTES_KEY) ?? "[]"));
  } catch {
    return new Set();
  }
}

function saveUpvote(id: string) {
  const existing = getUpvoted();
  existing.add(id);
  localStorage.setItem(UPVOTES_KEY, JSON.stringify([...existing]));
}

function removeUpvote(id: string) {
  const existing = getUpvoted();
  existing.delete(id);
  localStorage.setItem(UPVOTES_KEY, JSON.stringify([...existing]));
}

function IdeaCard({
  idea,
  upvoted,
  onUpvote,
}: {
  idea: Idea;
  upvoted: boolean;
  onUpvote: (id: string) => void;
}) {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1.125rem",
      }}
    >
      {/* Upvote button */}
      <button
        onClick={() => onUpvote(idea.id)}
        title={upvoted ? "Remove upvote" : "Upvote"}
        style={{
          flexShrink: 0,
          width: 44,
          height: 56,
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.125rem",
          border: upvoted ? "1px solid rgba(246,130,31,0.4)" : "1px solid var(--border)",
          background: upvoted ? "var(--orange-dim)" : "var(--bg-1)",
          color: upvoted ? "var(--orange)" : "var(--text-muted)",
          cursor: "pointer",
          transition: "border-color 0.12s, background 0.12s, color 0.12s",
          fontFamily: "inherit",
          boxSizing: "border-box",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--orange)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = upvoted ? "rgba(246,130,31,0.4)" : "var(--border)";
        }}
      >
        <span style={{ fontSize: "0.875rem", lineHeight: 1 }}>
          {upvoted ? "▲" : "△"}
        </span>
        <span
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: "0.8rem",
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {idea.votes}
        </span>
      </button>

      {/* Content */}
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "0.375rem",
          }}
        >
          <h4
            className="text-sm-body"
            style={{ fontWeight: 600, color: "var(--text-primary)", margin: 0 }}
          >
            {idea.title}
          </h4>
          {idea.source === "live" && (
            <span className="badge badge-new">New</span>
          )}
        </div>
        <p
          className="text-sm-body"
          style={{ color: "var(--text-muted)", margin: "0 0 0.5rem", lineHeight: 1.55 }}
        >
          {idea.description}
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentsDialog idea={idea} />
        </div>
      </div>
    </div>
  );
}

function SubmitDialog({ onSubmit }: { onSubmit: (title: string, description: string, email: string) => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      await onSubmit(title.trim(), desc.trim(), email.trim());
    } finally {
      setLoading(false);
      setTitle("");
      setDesc("");
      setEmail("");
      setOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.625rem 1.25rem",
          borderRadius: 8,
          background: "var(--orange)",
          color: "#fff",
          fontSize: "0.9rem",
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 0 20px rgba(246,130,31,0.25)",
          transition: "opacity 0.12s",
          fontFamily: "inherit",
        }}
      >
        + Submit an Idea
      </button>

      <DialogRoot open={open} onOpenChange={setOpen}>
        <Dialog size="base">
          <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: 0 }}>
            <DialogTitle style={{ fontWeight: 700 }}>Submit an Idea</DialogTitle>
            <DialogDescription>
              Have a feature request or improvement for NinjaPanel? Share it here — the team reviews all ideas.
            </DialogDescription>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.25rem" }}>
              <div>
                <p className="text-label" style={{ color: "var(--text-muted)", marginBottom: "0.375rem", fontWeight: 700 }}>
                  Title *
                </p>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Fuzzy zone search"
                  style={{ width: "100%" }}
                />
              </div>
              <div>
                <p className="text-label" style={{ color: "var(--text-muted)", marginBottom: "0.375rem", fontWeight: 700 }}>
                  Description
                </p>
                <InputArea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Describe the problem you're solving..."
                  rows={4}
                  style={{ width: "100%" }}
                />
              </div>
              <div>
                <p className="text-label" style={{ color: "var(--text-muted)", marginBottom: "0.375rem", fontWeight: 700 }}>
                  Your email <span style={{ color: "var(--text-dim)", fontWeight: 400 }}>(optional — so we can follow up)</span>
                </p>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  type="email"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginTop: "1.5rem",
                paddingTop: "1.25rem",
                borderTop: "1px solid var(--border)",
              }}
            >
              <Button variant="primary" onClick={handleSubmit} disabled={!title.trim() || loading}>
                {loading ? "Submitting…" : "Submit Idea"}
              </Button>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Dialog>
      </DialogRoot>
    </>
  );
}

// IDs of ideas that are seeds — never show "New" badge
const SEED_IDS = new Set(SEEDED_IDEAS.map((i) => i.id));

export function IdeasSection() {
  const [ideas, setIdeas] = useState<Idea[]>(
    SEEDED_IDEAS.map((i) => ({ ...i, source: "seed" as const })),
  );
  const [upvoted, setUpvoted] = useState<Set<string>>(getUpvoted());
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    fetch(IDEAS_API)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: IdeaSeed[]) => {
        // Seeds that come back from API stay "seed" — only truly new ideas are "live"
        const merged: Idea[] = data.map((i) => ({
          ...i,
          source: SEED_IDS.has(i.id) ? "seed" as const : "live" as const,
        }));
        // Append any seeds not yet in D1 (shouldn't happen but safe fallback)
        const apiIds = new Set(data.map((i) => i.id));
        SEEDED_IDEAS.forEach((s) => {
          if (!apiIds.has(s.id)) merged.push({ ...s, source: "seed" as const });
        });
        setIdeas(merged);
        setApiLoaded(true);
      })
      .catch(() => { setApiLoaded(true); });
  }, []);

  const handleUpvote = async (id: string) => {
    const isUpvoted = upvoted.has(id);
    // Optimistic update
    setIdeas((prev) => prev.map((i) => (i.id === id ? { ...i, votes: i.votes + (isUpvoted ? -1 : 1) } : i)));
    if (isUpvoted) {
      removeUpvote(id);
    } else {
      saveUpvote(id);
    }
    setUpvoted(getUpvoted());
    try {
      const endpoint = isUpvoted ? `${IDEAS_API}/${id}/downvote` : `${IDEAS_API}/${id}/upvote`;
      const r = await fetch(endpoint, { method: "POST" });
      if (r.ok) {
        // Sync with server's authoritative vote count
        const saved = await r.json() as IdeaSeed;
        setIdeas((prev) => prev.map((i) => (i.id === id ? { ...i, votes: saved.votes } : i)));
      }
    } catch { /* ok — optimistic count stands */ }
  };

  const handleSubmit = async (title: string, description: string, _email: string) => {
    // Public portfolio demo — ideas are not persisted to D1
    const local: Idea = { id: `local-${Date.now()}`, title, description, votes: 0, source: "live" };
    setIdeas((prev) => [local, ...prev]);
  };

  // Sort order locked once API data arrives — cards don't jump mid-session when upvoted
  const [sortedIds, setSortedIds] = useState<string[]>([]);
  useEffect(() => {
    if (apiLoaded && sortedIds.length === 0) {
      setSortedIds([...ideas].sort((a, b) => b.votes - a.votes).map((i) => i.id));
    }
  }, [apiLoaded]);
  const ideaMap = new Map(ideas.map((i) => [i.id, i]));
  const sorted = sortedIds.length > 0
    ? [
        // Show any newly submitted ideas (not in original sort) at the top
        ...ideas.filter((i) => !sortedIds.includes(i.id)),
        ...sortedIds.map((id) => ideaMap.get(id)).filter(Boolean) as Idea[],
      ]
    : [...ideas].sort((a, b) => b.votes - a.votes);

  return (
    <section id="ideas" className="section">
      <div className="section-inner">
        <SectionHeader number="07" label="Ideas Board" />

        <div style={{ borderTop: "1px dashed var(--border-dashed)", paddingTop: "3rem" }}>
          <div
            className="reveal-up"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
              marginBottom: "2.5rem",
            }}
          >
            <div>
              <h2 className="text-h2" style={{ color: "var(--text-primary)", margin: "0 0 0.75rem" }}>
                What would you like to see?
              </h2>
              <p className="text-body" style={{ color: "var(--text-secondary)", margin: 0 }}>
                Upvote what matters to you or submit your own idea. The team reviews all submissions.
              </p>
            </div>
            <SubmitDialog onSubmit={handleSubmit} />
          </div>

          <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {sorted.map((idea) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                upvoted={upvoted.has(idea.id)}
                onUpvote={handleUpvote}
              />
            ))}
          </div>

          <p
            style={{
              color: "var(--text-dim)",
              fontSize: "0.8rem",
              fontFamily: "'SF Mono', monospace",
              marginTop: "2rem",
            }}
          >
            // Upvotes stored per browser via localStorage. Comments shown for demo only — not persisted.
          </p>
        </div>
      </div>
    </section>
  );
}
