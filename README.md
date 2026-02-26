# NinjaPanel Hub

A polished internal explainer and marketing site for an operational control plane tool — built as a portfolio project demonstrating a full-stack Cloudflare Workers app with a dark editorial design system.

> **Note:** This is a sanitized public version. Team member info, internal URLs, and company-specific copy have been replaced with placeholders. The full design, architecture, and functionality are preserved.

---

## Live Demo

[ninjapanel-hub.alexa-pm.workers.dev](https://ninjapanel-hub.alexa-pm.workers.dev)

---

## What is this?

NinjaPanel Hub is a single-page internal microsite that helps employees understand:

- What an internal admin tool is and who it's for
- Which platform apps live on it
- The product capability pyramid and roadmap
- How to request access and submit ideas/feedback

It's also designed to be **forkable** — if you're a PM or team lead wanting a polished internal microsite for your own product, this is a working starting point.

---

## Built by

**Alexa** — Sr. Product Manager  
[github.com/builtbyalexa](https://github.com/builtbyalexa)

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Vite + React + TypeScript |
| Component library | [`@cloudflare/kumo`](https://github.com/cloudflare/kumo) |
| Backend / API | Cloudflare Workers |
| Database | Cloudflare D1 (SQLite) |
| Hosting | Workers with Static Assets |
| Testing | Vitest (104 tests) |
| CI | GitLab CI (test + build on every push) |

---

## Running locally

```bash
# Install dependencies
npm install

# Terminal 1 — API + Worker (connects to remote D1)
CLOUDFLARE_ACCOUNT_ID=your_account_id npx wrangler dev --remote --port 8787

# Terminal 2 — Vite frontend
npm run dev
```

Open http://localhost:5173

---

## Running tests

```bash
npm test              # run all 104 tests once
npm run test:watch    # watch mode during development
```

Tests cover upvote logic, localStorage deduplication, content data integrity, worker route logic, and content helpers.

---

## Deploying

1. [Create a Cloudflare account](https://dash.cloudflare.com/sign-up) if you don't have one
2. Create a D1 database: `npx wrangler d1 create your-db-name`
3. Update `wrangler.toml` with your account ID and D1 database ID
4. Build and deploy:

```bash
npm run build
CLOUDFLARE_ACCOUNT_ID=your_account_id npx wrangler deploy
```

---

## How to fork this for your team

1. Clone this repo
2. Edit `src/content.ts` — this is the only file you need for 90% of changes. All copy, links, team members, nav links, and roadmap items live here
3. Swap out `public/team/` photos for your team photos
4. Create a D1 database and update `wrangler.toml`
5. Deploy

The design system is fully driven by CSS custom properties in `src/index.css` — reskin by changing the variables at the top of that file.

---

## Project structure

```
src/
├── content.ts          # Single source of truth for ALL copy and data
├── index.css           # Design system — CSS custom properties
├── App.tsx             # Nav, layout
├── sections/           # One component per page section
│   ├── HeroSection.tsx
│   ├── WhatIsNpSection.tsx
│   ├── WhoUsesItSection.tsx
│   ├── PlatformAppsSection.tsx
│   ├── CompareSection.tsx
│   ├── PyramidSection.tsx
│   ├── RoadmapSection.tsx
│   ├── IdeasSection.tsx
│   ├── ResourcesSection.tsx
│   └── AboutSection.tsx
├── test/               # Vitest test files (104 tests)
└── EasterEggs.tsx      # Logo burst + idle shuriken
worker/
└── ideas-api.ts        # /api/ideas CRUD + comments + upvotes (D1)
public/
└── team/               # Team member profile photos
```

---

## Roadmap for this codebase

- [ ] Per-user vote deduplication via auth JWT + D1 `votes` table
- [ ] Worker tests via `@cloudflare/vitest-pool-workers`
- [ ] Webhook notifications for upvotes and comments
- [ ] Theme toggle

---

*Built by [Alexa](https://github.com/builtbyalexa)*
