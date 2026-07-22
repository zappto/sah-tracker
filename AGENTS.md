<!-- BEGIN:skill-hooks -->

# Required Skills — MUST Use

Before writing UI code or making UX decisions, invoke these installed skills. **`impeccable`** is the primary design system — always use it first.

| Skill | When | Purpose |
|-------|------|---------|
| **`impeccable`** | Before any UI or design decision | Primary design system (v4.0.1). Run `node .agents/skills/impeccable/scripts/context.mjs` once per session. Read `reference/operate.md` (dashboard UX depth), `reference/new-work.md` (design flow), `reference/craft-floor.md` (quality checks), `reference/document.md` (DESIGN.md YAML token format). |
| **`design-taste-frontend`** | After impeccable, for per-page design reads | Set Three Dials (DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY) → determine layout, color, typography, animation approach |
| **`ui-ux-pro-max`** | During implementation for UX decisions | Reference priority categories: §1 Accessibility, §2 Touch & Interaction, §5 Layout, §6 Typography & Color, §7 Animation, §8 Forms, §9 Navigation, §10 Charts & Data |

Failure to invoke these skills before UI work is a violation of project conventions.

---

# Design Reference — MUST Read

Before any UI implementation, read **`docs/design.md`** — canonical design specification covering:

- **Three Dials** (DESIGN_VARIANCE: 5, MOTION_INTENSITY: 4, VISUAL_DENSITY: 4)
- **Typography** (Geist + Geist Mono, type scale, number formatting)
- **Color palette** (soft indigo primary, emerald/rose semantic, slate neutrals, dark mode)
- **Spacing & shapes** (radius scale, shadow tint, 8px base unit)
- **Layout structure** (ASCII diagram of every section from header to bottom nav)
- **Component specs** (summary card gradient, pocket scroll, member avatar pastels, transaction icons, admin grid menu, bottom nav glassmorphism, drawer/modal forms)
- **States** (loading skeletons, empty guidance, error toasts)
- **Micro-interactions** (press scale, number tick, modal slide, pulse badge)
- **Accessibility checklist** (touch 44px, contrast 4.5:1, focus rings, reduced-motion)

<!-- END:skill-hooks -->

<!-- BEGIN:nextjs-agent-rules -->

# Next.js Version Notice

This project uses **Next.js 16.2.11** — APIs, conventions, and file structure may differ from older versions. Read the relevant guide in `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.

---

# Trip Finance Dashboard — AI Agent Guide

Simple, mobile-only, financially transparent trip/event tracker.

Two user types:
- **Guest / Member** — no login, view-only dashboard
- **Admin** — authenticated, manages deposits/expenses/members/pockets via modal/drawer

---

# Technology Stack

## Frontend

| Library | Purpose |
|---------|---------|
| Next.js 16 | Framework |
| React 19 | UI library |
| TypeScript | Language |
| Tailwind CSS v4 | Styling |
| shadcn/ui (base-nova) + @base-ui/react | Component primitives |
| Lucide React | Icons |
| TanStack Query v5 | Server state |
| React Hook Form + Zod | Forms & validation |
| motion/react | Micro-interactions |

## Backend

| Library | Purpose |
|---------|---------|
| Next.js Route Handlers | REST API |
| Service Layer | Business logic |
| Repository Layer | Data access |
| SSE | Realtime updates |

## Database

| Tool | Purpose |
|------|---------|
| PostgreSQL (Supabase) | Database |
| Prisma 7 | ORM (driver adapter required) |
| Bun | Package manager / runtime |

## Deployment

| Service | Role |
|---------|------|
| Railway | Hosting |

---

# Architecture: Modular Monolith

One codebase, one deployment. No microservices.

```
UI (Components)
 ↓
Hooks (TanStack Query)
 ↓
API Route Handlers
 ↓
Service Layer
 ↓
Repository Layer
 ↓
Prisma + Driver Adapter
 ↓
PostgreSQL (Supabase)
```

**Hard rules:**
- Do NOT query Prisma from React components.
- Financial mutations must be atomic (wrapped in Prisma transactions).
- All database access flows through Service → Repository → Prisma.

---

# Project Structure

```
sah-tracker/
│
├── AGENTS.md                      # AI agent instructions (this file)
├── CLAUDE.md                      # Alias → AGENTS.md
├── PRD.md                         # Product requirements
├── TRD.md                         # Technical requirements
├── DESIGN.md                      # Design specification (READ BEFORE UI WORK)
├── README.md                      # Project setup docs
├── components.json                # shadcn/ui config (base-nova style)
├── prisma.config.ts               # Prisma 7 config
│
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── migrations/                # Migration history
│
├── app/                           # Root layout, globals, providers (Next.js 16)
│   ├── globals.css                # Tailwind v4 + shadcn CSS variables
│   ├── layout.tsx                 # Root layout (font loading, html/body)
│   └── page.tsx                   # Default home page (template)
│
├── src/
│   ├── app/                       # Application routes
│   │   ├── (public)/              # Guest pages (no auth)
│   │   │   └── page.tsx           # Main public dashboard
│   │   │
│   │   ├── admin/                 # Admin pages (authenticated)
│   │   │   ├── page.tsx           # Admin dashboard
│   │   │   └── login/page.tsx     # Admin login
│   │   │
│   │   ├── api/                   # REST API + SSE endpoints
│   │   │   ├── auth/login/route.ts
│   │   │   ├── auth/logout/route.ts
│   │   │   ├── auth/me/route.ts
│   │   │   ├── dashboard/route.ts
│   │   │   ├── events/route.ts    # SSE endpoint
│   │   │   ├── members/route.ts + [id]/route.ts
│   │   │   ├── pockets/route.ts + [id]/route.ts
│   │   │   └── transactions/route.ts + [id]/route.ts
│   │   │
│   │   ├── layout.tsx             # Root app layout
│   │   └── globals.css            # App-specific styles
│   │
│   ├── components/                # React components by domain
│   │   ├── ui/                    # Generic UI (shadcn components)
│   │   ├── dashboard/             # Dashboard-specific components
│   │   ├── member/                # Member components
│   │   ├── pocket/                # Pocket components
│   │   ├── transaction/           # Transaction components
│   │   └── admin/                 # Admin-specific components
│   │
│   ├── hooks/                     # TanStack Query hooks + SSE hook
│   │   ├── use-dashboard.ts
│   │   ├── use-members.ts
│   │   ├── use-pockets.ts
│   │   ├── use-transactions.ts
│   │   └── use-financial-events.ts
│   │
│   ├── modules/                   # Business logic per domain
│   │   ├── auth/                  # auth.service.ts, schema, types, session
│   │   ├── dashboard/             # dashboard.service.ts, types
│   │   ├── member/                # service, repository, schema, types
│   │   ├── pocket/                # service, repository, schema, types
│   │   └── transaction/           # service, repository, schema, calculator, types
│   │
│   ├── lib/                       # Shared utilities
│   │   ├── db/prisma.ts           # Prisma client singleton
│   │   ├── events/                # event-bus.ts, types, sse-manager
│   │   ├── errors/                # app-error.ts, error-handler.ts
│   │   ├── http/                  # api-client.ts, api-response.ts
│   │   ├── money/                 # format-money.ts, money-calculator.ts
│   │   └── utils/                 # Utility functions
│   │
│   ├── providers/
│   │   └── query-provider.tsx     # TanStack Query provider
│   │
│   └── types/
│       └── api.ts                 # Shared API response types
│
├── components/                    # Global shadcn components
│   └── ui/button.tsx              # Button (Base UI + CVA)
│
├── lib/                           # Global utilities
│   └── utils.ts                   # cn() helper
│
├── .env.example
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

# shadcn/ui Conventions

- **Style:** `base-nova` (uses `@base-ui/react` as primitives, not Radix).
- **Icons:** `lucide-react` (single family, consistent stroke width).
- **Components:** Add via `npx shadcn@latest add <component>`.
- **CS variables** for theming (light/dark).
- **Button:** Already installed at `components/ui/button.tsx` — uses `@base-ui/react/button` + `class-variance-authority`.

---

# File Location Conventions

| Location | Purpose |
|----------|---------|
| `app/` (root) | Root layout, globals, providers. This is where Next.js 16 expects `globals.css`. |
| `src/app/` | Application routes, pages, and API endpoints. |
| `src/components/` | Domain-specific components. |
| `components/` (root) | Global shadcn components installed via CLI. |
| `src/modules/` | Business logic (service + repository + schema per domain). |
| `src/hooks/` | TanStack Query wrappers and SSE hook. |
| `src/lib/` | Shared infrastructure (db, events, errors, http, money). |

---

# Component Writing Rules

1. **RSC by default.** Only add `'use client'` when interactivity is required (event handlers, hooks, state).
2. **Motion isolation.** Any component using motion/react, scroll listeners, or pointer physics MUST be an isolated leaf Client Component.
3. **Theme.** Every component must render correctly in both light and dark mode. Use CSS variables or Tailwind `dark:` variant.
4. **Accessibility.** WCAG AA minimum. Touch targets ≥ 44×44px. Keyboard nav. `aria-labels` on icon-only buttons.
5. **No Prisma in components.** See architecture dependency flow.
6. **Forms.** Use react-hook-form + Zod schema. Label above input. Error below field. Button disabled during submit.

---

# Data Flow Rules

```
UI Component
  → Hook (useQuery / useMutation from TanStack Query)
    → API Route Handler (Next.js)
      → Service (business logic, validation)
        → Repository (database queries)
          → Prisma → PostgreSQL
```

SSE flow:
```
Mutation (service)
  → Event Bus publishes FINANCE_UPDATED
    → SSE Manager broadcasts to open connections
      → Client hook invalidates queries
        → Dashboard refetches
```

---

# Project Rules (Summary)

1. **Modular Monolith** — no microservices.
2. **Atomic mutations** — financial changes wrapped in Prisma transactions.
3. **No Prisma from components** — always through Service → Repository.
4. **Skills required** — invoke `impeccable` first (primary design system), then `design-taste-frontend`, then `ui-ux-pro-max` for implementation.
5. **Mobile-only** — no desktop layout, no breakpoints, full viewport width.
6. **Admin via modal/drawer** — no separate admin pages for CRUD.
7. **Keep it simple** — don't overengineer. Not a banking app, not a SaaS.

<!-- END:nextjs-agent-rules -->
