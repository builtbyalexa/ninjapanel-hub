/**
 * NinjaPanel Hub — Unified Worker
 *
 * Handles /api/* routes with D1 backend.
 * All other requests are passed through to the ASSETS binding (static files).
 *
 * Endpoints:
 *   GET    /api/ideas              — list all ideas sorted by votes desc
 *   POST   /api/ideas              — submit a new idea { title, description }
 *   POST   /api/ideas/:id/upvote   — increment vote count for an idea
 */

export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

interface IdeaRow {
  id: string;
  title: string;
  description: string;
  email: string | null;
  votes: number;
  created_at: string;
}

interface CommentRow {
  id: string;
  idea_id: string;
  body: string;
  email: string | null;
  created_at: string;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

function corsOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

function randomId() {
  return crypto.randomUUID().split("-")[0];
}

async function ensureTable(db: D1Database) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS ideas (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT DEFAULT '',
      email TEXT DEFAULT NULL,
      votes INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `).run();

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      idea_id TEXT NOT NULL,
      body TEXT NOT NULL,
      email TEXT DEFAULT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (idea_id) REFERENCES ideas(id)
    )
  `).run();
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Pass all non-API requests to static asset handler
    if (!url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    // CORS preflight
    if (request.method === "OPTIONS") return corsOptions();

    // Initialize DB on first call (idempotent)
    await ensureTable(env.DB);

    // GET /api/ideas
    if (request.method === "GET" && url.pathname === "/api/ideas") {
      const { results } = await env.DB.prepare(
        "SELECT * FROM ideas ORDER BY votes DESC, created_at DESC LIMIT 100",
      ).all<IdeaRow>();
      return json(results);
    }

    // POST /api/ideas
    if (request.method === "POST" && url.pathname === "/api/ideas") {
      const body = await request.json<{ title: string; description?: string; email?: string }>();
      if (!body?.title?.trim()) {
        return json({ error: "title is required" }, 400);
      }
      const id = randomId();
      await env.DB.prepare(
        "INSERT INTO ideas (id, title, description, email, votes) VALUES (?, ?, ?, ?, 0)",
      )
        .bind(id, body.title.trim(), (body.description ?? "").trim(), body.email?.trim() || null)
        .run();

      const row = await env.DB.prepare("SELECT * FROM ideas WHERE id = ?")
        .bind(id)
        .first<IdeaRow>();
      return json(row, 201);
    }

    // POST /api/ideas/:id/upvote
    // TODO: add GChat webhook notification when someone upvotes (wire up after moving to internal CF account)
    const upvoteMatch = url.pathname.match(/^\/api\/ideas\/([^/]+)\/upvote$/);
    if (request.method === "POST" && upvoteMatch) {
      const id = upvoteMatch[1];
      await env.DB.prepare("UPDATE ideas SET votes = votes + 1 WHERE id = ?")
        .bind(id)
        .run();
      const row = await env.DB.prepare("SELECT * FROM ideas WHERE id = ?")
        .bind(id)
        .first<IdeaRow>();
      if (!row) return json({ error: "not found" }, 404);
      return json(row);
    }

    // POST /api/ideas/:id/downvote
    const downvoteMatch = url.pathname.match(/^\/api\/ideas\/([^/]+)\/downvote$/);
    if (request.method === "POST" && downvoteMatch) {
      const id = downvoteMatch[1];
      await env.DB.prepare("UPDATE ideas SET votes = MAX(0, votes - 1) WHERE id = ?")
        .bind(id)
        .run();
      const row = await env.DB.prepare("SELECT * FROM ideas WHERE id = ?")
        .bind(id)
        .first<IdeaRow>();
      if (!row) return json({ error: "not found" }, 404);
      return json(row);
    }

    // GET /api/ideas/:id/comments
    const commentsGetMatch = url.pathname.match(/^\/api\/ideas\/([^/]+)\/comments$/);
    if (request.method === "GET" && commentsGetMatch) {
      const id = commentsGetMatch[1];
      const { results } = await env.DB.prepare(
        "SELECT * FROM comments WHERE idea_id = ? ORDER BY created_at ASC",
      ).bind(id).all<CommentRow>();
      return json(results);
    }

    // POST /api/ideas/:id/comments
    // TODO: add GChat webhook notification when someone comments (wire up after moving to internal CF account)
    const commentsPostMatch = url.pathname.match(/^\/api\/ideas\/([^/]+)\/comments$/);
    if (request.method === "POST" && commentsPostMatch) {
      const id = commentsPostMatch[1];
      const body = await request.json<{ body: string; email?: string }>();
      if (!body?.body?.trim()) {
        return json({ error: "body is required" }, 400);
      }
      const commentId = randomId();
      await env.DB.prepare(
        "INSERT INTO comments (id, idea_id, body, email) VALUES (?, ?, ?, ?)",
      ).bind(commentId, id, body.body.trim(), body.email?.trim() || null).run();

      const row = await env.DB.prepare("SELECT * FROM comments WHERE id = ?")
        .bind(commentId).first<CommentRow>();
      return json(row, 201);
    }

    return json({ error: "not found" }, 404);
  },
};
