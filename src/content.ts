// ============================================================
// content.ts — Single source of truth for NinjaPanel Hub
// Team: edit this file to update copy, data, and links.
// ============================================================

// ─── Nav ────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "What is NP?", href: "#what-is-np" },
  { label: "Who uses it?", href: "#who-uses-it" },
  { label: "Platform Apps", href: "#platform-apps" },
  { label: "Compare", href: "#compare" },
  { label: "Focus Pyramid", href: "#pyramid" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Ideas", href: "#ideas" },
  { label: "Resources", href: "#resources" },
  { label: "The Team", href: "#about" },
];

// ─── Hero ───────────────────────────────────────────────────
export const HERO = {
  headline: "NINJAPANEL",
  subheadline: "Your Company's Internal Control Plane",
  description:
    "The write-access operational tool that lets your teams manage customers, configure products, and build internal admin experiences — all in one place.",
  pills: [
    { label: "Get Access", href: "https://internal.example.com/access", variant: "primary" as const, tooltip: "Opens the internal access provisioning tool (employees only)" },
    { label: "Build on NP", href: "https://internal.example.com/dev-guide", variant: "secondary" as const, tooltip: "Opens the developer onboarding guide on the internal wiki" },
    { label: "View Roadmap", href: "#roadmap", variant: "secondary" as const },
    { label: "Leave an Idea", href: "#ideas", variant: "secondary" as const },
  ],
  stats: [
    { value: "16+", label: "Platform Apps" },
    { value: "15+", label: "Teams Supported" },
    { value: "1", label: "Source of Truth" },
  ],
  teams: [
    "Platform", "CI/CD", "Pages", "Billing", "IAM",
    "Auth", "Bots", "Notifications", "Custom Pages", "Network",
    "Addresses", "Trust & Safety", "Support Engineering",
    "Customer Success", "Solutions Engineering",
  ],
};

// ─── What Is NinjaPanel ─────────────────────────────────────
export const WHAT_IS_NP = {
  title: "What is NinjaPanel?",
  subtitle:
    "NinjaPanel is an internal operational admin tool — a control plane for employees who need write access to production systems.",
  is: [
    {
      label: "A write-access operational tool",
      tooltip: "CSMs can upgrade a customer's plan, Support can toggle features for a specific zone — live changes to production systems.",
    },
    {
      label: "A platform for internal admin apps (NPaaP)",
      tooltip: "Teams deploy their admin UIs as internal apps. NP's reverse proxy gateway gives them auth/authz for free.",
    },
    {
      label: "The home for Support, CS, and T&S workflows",
      tooltip: "Debug Tools, Trust & Safety suite, Entitlements, IAM Tools — all live here, used daily by hundreds of employees.",
    },
    {
      label: "Auth & fine-grained access control",
      tooltip: "Authorization is powered by a policy engine with role-based groups. Fine-grained, relationship-based access control is actively rolling out.",
    },
    {
      label: "Owned and operated by the Platform Tools team",
      tooltip: "The Platform Tools team builds the platform, maintains auth, onboards new apps, and runs the roadmap.",
    },
  ],
  isnt: [
    {
      label: "An analytics or BI tool",
      note: "For customer analytics, use your company's dedicated analytics platform.",
    },
    {
      label: "A customer-facing product",
      note: "NinjaPanel is internal-only, accessible only to employees.",
    },
    {
      label: "A replacement for the customer dashboard",
      note: "The public dashboard is for customers. NP is for internal teams.",
    },
    {
      label: "A static reporting surface",
      note: "NP enables actions — upgrading plans, configuring flags, managing access — not just reading data.",
    },
  ],
};

// ─── Who Uses It ────────────────────────────────────────────
export type Persona = {
  role: string;
  emoji: string;
  tagline: string;
  description: string;
  tools: string[];
  accessLink: string;
};

export const PERSONAS: Persona[] = [
  {
    role: "Customer Success Managers (CSMs)",
    emoji: "🤝",
    tagline: "Manage customer accounts and configurations",
    description:
      "CSMs use NinjaPanel daily to look up customer accounts, manage entitlements, review subscription data, and make configuration changes for enterprise customers.",
    tools: ["Entitlements", "Subscriptions", "Org Admin UI", "IAM Tools"],
    accessLink: "https://internal.example.com",
  },
  {
    role: "Support Engineers",
    emoji: "🛠️",
    tagline: "Diagnose and resolve customer issues",
    description:
      "Support engineers rely on DebugTools and other NP apps to investigate zone-level issues, inspect customer configurations, and apply fixes — all with a full audit trail.",
    tools: ["DebugTools", "Product Features", "Notifications", "Custom Pages Admin"],
    accessLink: "https://internal.example.com",
  },
  {
    role: "Trust & Safety Teams",
    emoji: "🔒",
    tagline: "Enforce policies and manage abuse cases",
    description:
      "The T&S suite inside NinjaPanel enables Trust & Safety to take enforcement actions, manage abuse cases, and configure safety policies across the network.",
    tools: ["Trust & Safety Suite"],
    accessLink: "https://internal.example.com",
  },
  {
    role: "Network Security Engineers (NSEs)",
    emoji: "🌐",
    tagline: "Manage network-level configurations",
    description:
      "NSEs use NP to configure API rate limiting, manage address resources, and make network-level changes that require write access to production infrastructure.",
    tools: ["API Rate Limiter", "Addresses"],
    accessLink: "https://internal.example.com",
  },
  {
    role: "Engineers Building on NP",
    emoji: "⚙️",
    tagline: "Build and ship admin UIs on the NP Platform",
    description:
      "Product teams use NP as a platform (NPaaP) to deploy their own admin tools. NP's gateway handles auth/authz — teams just build their UI and plug it in.",
    tools: ["NP Gateway (NPaaP)", "Developer Guide", "Scaffold Template"],
    accessLink: "https://internal.example.com",
  },
  {
    role: "Leadership & Product Managers",
    emoji: "📊",
    tagline: "Oversee product health and operational metrics",
    description:
      "Leadership uses NinjaPanel-hosted tools for operational oversight — reviewing audit logs, monitoring product feature flags, and accessing compliance reports.",
    tools: ["Audit Logs", "Product Features", "Org Admin UI"],
    accessLink: "https://internal.example.com",
  },
];

// ─── Platform Apps ──────────────────────────────────────────
export type AppBadge = "Core" | "Platform" | "Coming Soon";

export type PlatformApp = {
  name: string;
  path: string;
  team: string;
  description: string;
  badge: AppBadge;
  url?: string;
};

export const PLATFORM_APPS: PlatformApp[] = [
  {
    name: "Workers Admin",
    path: "/workers",
    team: "Platform team",
    description: "Admin tooling for serverless compute — inspect, configure, and manage deployments across accounts.",
    badge: "Platform",
    url: "https://internal.example.com",
  },
  {
    name: "Pages Admin",
    path: "/pages",
    team: "Platform team",
    description: "Admin interface for static site hosting — deployment management and configuration.",
    badge: "Platform",
    url: "https://internal.example.com",
  },
  {
    name: "CI Admin",
    path: "/ci",
    team: "Platform team",
    description: "CI/CD admin tooling for build pipelines.",
    badge: "Platform",
    url: "https://internal.example.com",
  },
  {
    name: "Entitlements",
    path: "/billing/entitlements",
    team: "Billing",
    description: "Manage customer product entitlements — view, assign, and modify feature access for accounts.",
    badge: "Core",
    url: "https://internal.example.com",
  },
  {
    name: "Subscriptions",
    path: "/subscriptions",
    team: "Billing",
    description: "Manage customer subscription plans and billing configurations.",
    badge: "Core",
    url: "https://internal.example.com",
  },
  {
    name: "IAM Tools",
    path: "/iam-tools",
    team: "IAM",
    description: "Identity & Access Management tooling — manage user roles, permissions, and RBAC configurations.",
    badge: "Core",
    url: "https://internal.example.com",
  },
  {
    name: "Audit Logs",
    path: "/auditlogs",
    team: "Auth",
    description: "View comprehensive audit trails for all actions taken within NinjaPanel and across systems.",
    badge: "Core",
    url: "https://internal.example.com",
  },
  {
    name: "Bots Admin",
    path: "/bots-admin",
    team: "Bots",
    description: "Configure and manage bot management — review scores, manage exceptions, and tune configurations.",
    badge: "Platform",
    url: "https://internal.example.com",
  },
  {
    name: "Notifications",
    path: "/notifications",
    team: "Notifications",
    description: "Manage notification configurations and alert routing for services.",
    badge: "Platform",
    url: "https://internal.example.com",
  },
  {
    name: "Custom Pages Admin",
    path: "/custom-pages-admin",
    team: "Custom Pages",
    description: "Configure and manage custom error pages for zones.",
    badge: "Platform",
    url: "https://internal.example.com",
  },
  {
    name: "API Rate Limiter",
    path: "/api-rate-limiter",
    team: "Network",
    description: "Configure API rate limiting rules and thresholds for network APIs.",
    badge: "Platform",
    url: "https://internal.example.com",
  },
  {
    name: "Addresses",
    path: "/addresses",
    team: "Addresses team",
    description: "Manage IP address resources, BYOIP configurations, and address prefix management.",
    badge: "Platform",
    url: "https://internal.example.com",
  },
  {
    name: "DebugTools",
    path: "/debugtools",
    team: "Support",
    description: "Deep-dive debugging tools for Support Engineers — inspect configs, trace requests, diagnose customer issues.",
    badge: "Core",
    url: "https://internal.example.com",
  },
  {
    name: "Trust & Safety Suite",
    path: "/trust-and-safety/*",
    team: "Trust & Safety",
    description: "Comprehensive T&S workflow tools — enforcement actions, abuse case management, policy configuration.",
    badge: "Core",
    url: "https://internal.example.com",
  },
  {
    name: "Org Admin UI",
    path: "/org-admin",
    team: "Platform Tools",
    description: "Organizational hierarchy management — manage accounts, sub-orgs, and org-level configurations.",
    badge: "Core",
    url: "https://internal.example.com",
  },
  {
    name: "Product Features",
    path: "/product-features",
    team: "Platform Tools",
    description: "Feature flag management — control product feature rollouts, manage beta access, and configure flags.",
    badge: "Core",
    url: "https://internal.example.com",
  },
  {
    name: "NP CLI Tool",
    path: "CLI",
    team: "Platform Tools",
    description: "Command-line interface for NinjaPanel — automate admin workflows, script bulk operations, and integrate NP into CI pipelines.",
    badge: "Coming Soon",
  },
  {
    name: "NinjaPanel MCP",
    path: "MCP",
    team: "Platform Tools",
    description: "Model Context Protocol server for NinjaPanel — enable AI-assisted admin workflows and LLM-powered operational tooling.",
    badge: "Coming Soon",
  },
];

// ─── Compare ────────────────────────────────────────────────
export const COMPARE_TOOLS = [
  {
    id: "ninjapanel",
    label: "NinjaPanel",
    purpose: "Operational control plane for internal teams — take action on production systems",
    audience: "CSMs, Support Engineers, T&S, NSEs, Engineers building admin tools",
    dataType: "Live operational data — accounts, zones, entitlements, flags",
    access: "Read + Write (with audit trail and access control)",
    link: "https://internal.example.com",
    linkLabel: "Open NinjaPanel",
    owner: "Platform Tools team",
    highlight: true,
    badge: "Core" as const,
    notes: [
      "Write access to production systems",
      "Platform for hosting internal admin apps (NPaaP)",
      "Policy-engine authorization with fine-grained access control",
      "Full audit logging",
    ],
  },
  {
    id: "analytics",
    label: "Customer Analytics (Read-only)",
    purpose: "Read-only analytics and customer intelligence for go-to-market teams",
    audience: "Sales, Customer Success, Support (for analytics & insights)",
    dataType: "Aggregated analytics — usage, revenue, churn signals, health scores",
    access: "Read-only (daily data refresh)",
    link: "https://internal.example.com",
    linkLabel: "Open Analytics",
    owner: "Data & Insights team",
    highlight: false,
    badge: "Platform" as const,
    notes: [
      "1,000+ MAU",
      "Daily data refresh from data warehouse",
      "No write access",
      "Customer-facing team workflows",
    ],
  },
  {
    id: "product360",
    label: "Product Analytics",
    purpose: "Read-only product analytics and usage metrics for Product Managers",
    audience: "Product Managers, Product leadership",
    dataType: "Product usage metrics — feature adoption, retention, funnel analytics",
    access: "Read-only (early access — targeting GA this year)",
    link: "https://internal.example.com",
    linkLabel: "Open Product Analytics",
    owner: "Data & Insights team",
    highlight: false,
    badge: "Platform" as const,
    notes: [
      "Early access / PoC stage",
      "No write access",
      "Focused on product adoption metrics",
    ],
  },
];

// ─── Focus Pyramid ──────────────────────────────────────────
export type PyramidLevel = {
  level: number;
  title: string;
  subtitle: string;
  userStory: string;
  color: string;
  textColor: string;
  objective: string;
  featureAreas: string[];
  keyResults: string[];
  roadmapProjects: Array<{
    name: string;
    status: "Now" | "Next" | "Later" | "Done";
  }>;
};

export const PYRAMID_LEVELS: PyramidLevel[] = [
  {
    level: 1,
    title: "Security & Reliability",
    subtitle: "Foundation",
    userStory: "NP is always available, always compliant, and I trust it completely.",
    color: "#1e3a5f",
    textColor: "#ffffff",
    objective: "Ensure NinjaPanel is secure, compliant, and reliably available for all users.",
    featureAreas: [
      "Uptime & SLAs",
      "Fine-grained access control rollout",
      "Audit logging",
      "Break glass access",
      "Geo compliance",
      "Regulatory compliance",
    ],
    keyResults: [
      "99.9% uptime SLA maintained",
      "Access Control Phase 2 rolled out to all enterprise tiers",
      "100% of write actions have audit log entries",
    ],
    roadmapProjects: [
      { name: "Compliance Initiative A", status: "Now" },
      { name: "Compliance Initiative B", status: "Now" },
      { name: "Access Control Initiative B", status: "Now" },
      { name: "Data Residency Support", status: "Done" },
      { name: "Access Control Ph1", status: "Done" },
    ],
  },
  {
    level: 2,
    title: "Usability",
    subtitle: "Level 2",
    userStory: "I can instantly find what I need and do what I came to do — fast.",
    color: "#1e5e8a",
    textColor: "#ffffff",
    objective: "Reduce time-to-action for all NP users through better search, navigation, and consistency.",
    featureAreas: [
      "Search & account lookup",
      "ID consistency",
      "Entitlements UX",
      "Feature flags",
      "Codebase DX improvements",
      "CI/CD migration",
    ],
    keyResults: [
      "Account lookup time < 5 seconds",
      "ID drift incidents reduced to zero",
      "CI/CD fully migrated to modern pipeline",
    ],
    roadmapProjects: [
      { name: "CI/CD Migration", status: "Now" },
      { name: "Org API Update", status: "Now" },
      { name: "ID Optimization", status: "Later" },
      { name: "ID Drift Fix", status: "Done" },
      { name: "CDN Setup", status: "Done" },
      { name: "Test Coverage Improvements", status: "Later" },
    ],
  },
  {
    level: 3,
    title: "Platform Extensibility",
    subtitle: "Level 3",
    userStory: "My team can build and ship admin tools here without reinventing the wheel.",
    color: "#f6821f",
    textColor: "#ffffff",
    objective: "Make NP the obvious choice for teams building internal admin tooling.",
    featureAreas: [
      "NPaaP (NinjaPanel as a Platform)",
      "Onboarding new apps",
      "NP Gateway / auth",
      "Developer guide & templates",
      "Service catalog integration",
    ],
    keyResults: [
      "Zero-touch onboarding for new platform apps",
      "Developer guide covers 100% of onboarding steps",
      "3+ new apps onboarded per quarter",
    ],
    roadmapProjects: [
      { name: "Billing Tag Improvements", status: "Later" },
      { name: "Feature Flags Audit", status: "Later" },
    ],
  },
  {
    level: 4,
    title: "Transparency & Accountability",
    subtitle: "Level 4",
    userStory: "I can see what's happening and prove the impact of my actions.",
    color: "#e06010",
    textColor: "#ffffff",
    objective: "Give users and administrators full visibility into NP operations and impact.",
    featureAreas: [
      "Audit logs surfacing",
      "Usage metrics",
      "Observability project",
      "Grafana dashboards",
      "CRM data integration",
    ],
    keyResults: [
      "Audit data flowing into CRM by Q2",
      "Grafana dashboard covers all critical NP metrics",
      "Observability project shipped",
    ],
    roadmapProjects: [
      { name: "NP Observability", status: "Next" },
      { name: "CRM Audit Integration", status: "Later" },
      { name: "Role Clarity", status: "Later" },
    ],
  },
  {
    level: 5,
    title: "Enablement & Impact",
    subtitle: "Top",
    userStory: "The Platform Tools team is a force multiplier — they make me more effective at my job than I could be alone.",
    color: "#c04000",
    textColor: "#ffffff",
    objective: "Position the Platform Tools team as a force multiplier that makes every employee more effective.",
    featureAreas: [
      "NP CLI tool",
      "NinjaPanel MCP server",
      "Documentation & developer guides",
      "Internal comms & awareness",
      "Onboarding experience",
      "NP Public Channel Bot",
    ],
    keyResults: [
      "NP CLI tool shipped in Q2",
      "MCP server in beta",
      "NP public channel active with weekly updates",
    ],
    roadmapProjects: [
      { name: "NinjaPanel MCP", status: "Next" },
      { name: "Official NP CLI Tool", status: "Next" },
      { name: "NP Public Channel Bot", status: "Later" },
    ],
  },
];

// ─── Roadmap ────────────────────────────────────────────────
export type RoadmapStatus = "Now" | "Next" | "Later" | "Done";

export type RoadmapItem = {
  id: string;
  title: string;
  status: RoadmapStatus;
  summary: string;
  dueDate?: string;
  links?: Array<{ label: string; href: string }>;
  pyramidLevel?: number;
};

export const ROADMAP_ITEMS: RoadmapItem[] = [
  // NOW
  {
    id: "compliance-a",
    title: "Compliance Initiative A",
    status: "Now",
    summary: "Ensure NinjaPanel meets regulatory requirements for all NP services.",
    dueDate: "EO Q1",
    pyramidLevel: 1,
  },
  {
    id: "compliance-initiative-b",
    title: "Compliance Initiative B",
    status: "Now",
    summary: "Implement enhanced access controls for privileged platform operations — ensuring all elevated access is tracked, time-limited, and fully auditable.",
    dueDate: "EO Q1",
    pyramidLevel: 1,
  },
  {
    id: "access-control-initiative-b",
    title: "Access Control Initiative B",
    status: "Now",
    summary: "Roll out fine-grained, relationship-based access control to the enterprise tier — restricting platform access to only relevant accounts per user role.",
    dueDate: "Q1",
    pyramidLevel: 1,
  },
  {
    id: "cicd-migration",
    title: "CI/CD Pipeline Migration",
    status: "Now",
    summary: "Migrate NinjaPanel CI/CD pipelines to modern tooling for better developer experience and alignment with company standards.",
    dueDate: "EO Q1",
    pyramidLevel: 2,
  },
  {
    id: "org-api",
    title: "Org API Update",
    status: "Now",
    summary: "Ensure NP maintains correct access behavior as org admins gain implicit access to child accounts.",
    dueDate: "EO Q1",
    pyramidLevel: 2,
  },
  // NEXT
  {
    id: "np-mcp",
    title: "NinjaPanel MCP Server",
    status: "Next",
    summary: "Model Context Protocol server for NinjaPanel — enables AI assistants and LLM-powered tools to interact with NP programmatically. Will unlock AI-assisted customer support and admin workflows.",
    dueDate: "Q2",
    pyramidLevel: 5,
    links: [
      { label: "MCP Docs", href: "https://modelcontextprotocol.io" },
    ],
  },
  {
    id: "np-cli",
    title: "Official NP CLI Tool",
    status: "Next",
    summary: "A governed CLI that wraps the NP API — giving power users a sanctioned, terminal-first interface with auth, dry-run mode, confirmation prompts, and bulk action guardrails.",
    dueDate: "Q2",
    pyramidLevel: 5,
  },
  {
    id: "np-observability",
    title: "NP Observability",
    status: "Next",
    summary: "Add PM-friendly usage tracking across NP tooling — so we better understand our stakeholders and where to invest.",
    dueDate: "EO Q1",
    pyramidLevel: 4,
  },
  {
    id: "np-channel-bot",
    title: "NP Public Channel Bot",
    status: "Later",
    summary: "Chat bot for the NinjaPanel public space — automated weekly updates, incident notifications, and self-service Q&A for NP users.",
    pyramidLevel: 5,
  },
  {
    id: "test-coverage",
    title: "Test Coverage Improvements",
    status: "Later",
    summary: "Improve test coverage and CI tooling for better reliability across NP platform apps.",
    pyramidLevel: 2,
  },
  {
    id: "id-optimization",
    title: "ID Optimization",
    status: "Later",
    summary: "Automated tooling to detect and resolve ID drift — ensuring customer identifiers stay consistent across NP and downstream systems.",
    dueDate: "Q2",
    pyramidLevel: 2,
  },
  {
    id: "billing-platform",
    title: "Billing Tag Improvements",
    status: "Later",
    summary: "Add context for billing tags, and give users a free text field to add notes when updating a billing status.",
    dueDate: "Q2",
    pyramidLevel: 3,
  },
  {
    id: "role-clarity",
    title: "Role Clarity in NP",
    status: "Later",
    summary: "Clarify and document role definitions within NinjaPanel — improving discoverability and reducing over-permissioning.",
    dueDate: "Q2",
    pyramidLevel: 4,
  },
  {
    id: "crm-audit",
    title: "CRM Audit Integration",
    status: "Later",
    summary: "Surface how IDs change at the NP level vs. the CRM record level, giving CS teams clearer visibility into ID movement.",
    dueDate: "Q2",
    pyramidLevel: 4,
  },
  {
    id: "feature-flags-audit",
    title: "Feature Flags Audit",
    status: "Later",
    summary: "Audit all apps using the feature flag system to ensure they follow current best practices and are properly integrated with the platform.",
    dueDate: "Q2",
    pyramidLevel: 3,
  },
  // DONE
  {
    id: "access-control-phase1",
    title: "Access Control Ph1",
    summary: "Completed Phase 1 of fine-grained access control rollout.",
    status: "Done",
    pyramidLevel: 1,
  },
  {
    id: "data-residency",
    title: "Data Residency Support",
    summary: "Stakeholder for data residency project to meet regulatory requirements for data handling.",
    status: "Done",
    pyramidLevel: 1,
  },
  {
    id: "cdn-setup",
    title: "CDN Setup",
    summary: "Updated NP systems to meet performance and failover requirements.",
    status: "Done",
    pyramidLevel: 2,
  },
  {
    id: "id-drift",
    title: "ID Drift (resolved)",
    summary: "Investigated and resolved ID drift issues — customer identifiers now stay consistent across NP and downstream systems.",
    status: "Done",
    pyramidLevel: 2,
  },
];

export const ROADMAP_LAST_UPDATED = "Q1 2026";

// ─── Seeded Ideas (shown before D1 data loads) ──────────────
export type IdeaSeed = {
  id: string;
  title: string;
  description: string;
  votes: number;
};

export const SEEDED_IDEAS: IdeaSeed[] = [
  {
    id: "seed-1",
    title: "Zone search with fuzzy matching",
    description: "Let users search for zones by approximate name — typos shouldn't require re-typing the whole query.",
    votes: 0,
  },
  {
    id: "seed-2",
    title: "Bulk entitlement operations",
    description: "Allow applying the same entitlement change to multiple accounts at once — huge time saver for CSMs during migrations.",
    votes: 0,
  },
  {
    id: "seed-3",
    title: "NP status page",
    description: "A public (internal) status page showing uptime and any active incidents for NinjaPanel and its platform apps.",
    votes: 0,
  },
  {
    id: "seed-4",
    title: "Keyboard shortcut for zone lookup",
    description: "⌘K or /search hotkey to jump straight to zone/account search from anywhere in NP.",
    votes: 0,
  },
  {
    id: "seed-5",
    title: "Recent actions history",
    description: "A sidebar showing your recent actions in NP — like a browser history but for admin operations.",
    votes: 0,
  },
];

// ─── Team ───────────────────────────────────────────────────
export type TeamMember = {
  name: string;
  title: string;
  city: string;
  state: string;
  timezone: string;
  startDate: string;
  photo: string;
  email: string;
  gchatDm: string | null;
  funFact?: string;
};

function tenureMonths(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date("2026-02-24");
  return (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
}

function tenureLabel(startDate: string): string {
  const total = tenureMonths(startDate);
  const years = Math.floor(total / 12);
  const months = total % 12;
  if (years === 0) return `${months} mo`;
  if (months === 0) return `${years} yr`;
  return `${years} yr ${months} mo`;
}

export function getTeamMemberTenure(member: TeamMember): string {
  return tenureLabel(member.startDate);
}

/** Returns true if the member has been at CF for less than 4 months */
export function isNewMember(member: TeamMember): boolean {
  return tenureMonths(member.startDate) < 4;
}

export const TEAM: TeamMember[] = [
  {
    name: "SpongeBob SquarePants",
    title: "Sr. Product Manager",
    city: "Bikini Bottom",
    state: "Pacific Ocean",
    timezone: "GMT-7",
    startDate: "2025-05-01",
    photo: "/team/spongebob.svg",
    email: "spongebob@company.com",
    gchatDm: null,
    funFact: "Has cried exactly 47 times during sprint retros. Claims it's allergies.",
  },
  {
    name: "Patrick Star",
    title: "Engineering Manager",
    city: "Bikini Bottom",
    state: "Pacific Ocean",
    timezone: "GMT-5",
    startDate: "2022-11-28",
    photo: "/team/patrick.svg",
    email: "patrick@company.com",
    gchatDm: null,
    funFact: "Once left a code review open for 3 weeks. Still marked it 'Looks good to me.'",
  },
  {
    name: "Sandy Cheeks",
    title: "Sr. Systems Engineer",
    city: "Bikini Bottom",
    state: "Pacific Ocean",
    timezone: "GMT-6",
    startDate: "2022-06-06",
    photo: "/team/sandy.svg",
    email: "sandy@company.com",
    gchatDm: null,
    funFact: "Holds a PhD in computer science and a lasso world record. Uses both regularly.",
  },
  {
    name: "Squidward Tentacles",
    title: "Sr. Systems Engineer",
    city: "Bikini Bottom",
    state: "Pacific Ocean",
    timezone: "GMT-6",
    startDate: "2022-11-07",
    photo: "/team/squidward.svg",
    email: "squidward@company.com",
    gchatDm: null,
    funFact: "Insists the old deployment pipeline was better. Has never explained why.",
  },
  {
    name: "Gary the Snail",
    title: "Systems Engineer",
    city: "Bikini Bottom",
    state: "Pacific Ocean",
    timezone: "GMT-6",
    startDate: "2025-04-07",
    photo: "/team/gary.svg",
    email: "gary@company.com",
    gchatDm: null,
    funFact: "Communicates exclusively in meows. Has the highest Slack response rate on the team.",
  },
  {
    name: "Larry the Lobster",
    title: "Sr. Systems Engineer",
    city: "Bikini Bottom",
    state: "Pacific Ocean",
    timezone: "GMT-6",
    startDate: "2025-12-08",
    photo: "/team/larry.svg",
    email: "larry@company.com",
    gchatDm: null,
    funFact: "Benchmarks every PR by how many calories it burns. Unclear methodology.",
  },
];

// ─── Resources ──────────────────────────────────────────────
export const RESOURCES = [
  {
    label: "NP Wiki (main docs)",
    description: "Full NinjaPanel documentation",
    href: "https://internal.example.com",
    icon: "book" as const,
  },
  {
    label: "Developer Guide",
    description: "Build your own app on NinjaPanel (NPaaP)",
    href: "https://internal.example.com",
    icon: "code" as const,
  },
  {
    label: "Scaffold Template",
    description: "Scaffold a new NP platform app",
    href: "https://internal.example.com",
    icon: "template" as const,
  },
  {
    label: "Request Access",
    description: "Submit an access request",
    href: "https://internal.example.com",
    icon: "key" as const,
  },
  {
    label: "NinjaPanel Chat",
    description: "Ask questions, get help, stay updated",
    href: "https://internal.example.com",
    icon: "chat" as const,
  },
  {
    label: "Report a Bug",
    description: "File a bug or feature request",
    href: "https://internal.example.com",
    icon: "bug" as const,
  },
  {
    label: "NP Roadmap (Sheet)",
    description: "Live roadmap maintained by the Platform Tools team",
    href: "https://internal.example.com",
    icon: "chart" as const,
  },
  {
    label: "Service Catalog",
    description: "NinjaPanel entry in the internal service catalog",
    href: "https://internal.example.com",
    icon: "catalog" as const,
  },
];
