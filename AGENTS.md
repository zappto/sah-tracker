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
├── DESIGN.md                      # Design specification (READ BEFORE UI WORK)
├── README.md                      # Project setup docs
├── components.json                # shadcn/ui config (base-nova style)
├── prisma.config.ts               # Prisma 7 config
│
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── migrations/                # Migration history
│
├── app/                           # All routes, layout, globals
│   ├── globals.css                # Tailwind v4 + shadcn CSS variables + tokens
│   ├── layout.tsx                 # Root layout (font loading, html/body)
│   ├── page.tsx                   # Main public dashboard
│   ├── transactions/
│   │   └── page.tsx               # All transactions page
│   ├── admin/                     # Admin pages (planned)
│   ├── api/                       # REST API + SSE endpoints (planned)
│   └── (public)/                  # Route group (placeholder)
│
├── lib/                           # Shared utilities
│   ├── data/transactions.ts       # Mock transaction data
│   ├── hooks/
│   │   └── use-local-storage.ts   # useSyncExternalStore localStorage hook
│   ├── db/                        # Prisma client singleton (planned)
│   ├── events/                    # event-bus.ts, types, sse-manager (planned)
│   ├── errors/                    # app-error.ts, error-handler.ts (planned)
│   ├── http/                      # api-client.ts, api-response.ts (planned)
│   ├── money/                     # format-money.ts, money-calculator.ts (planned)
│   └── utils/                     # cn(), formatRp, pastelColors, smoothScrollTo
│
├── components/                    # UI components by domain
│   ├── ui/                        # shadcn components (base-nova style)
│   │   ├── button.tsx             # Base UI + CVA button
│   │   ├── badge.tsx              # Badge tag (pocket labels, status)
│   │   └── card.tsx               # Card container + Header/Content/Footer
│   ├── dashboard/                 # Dashboard layout components
│   │   ├── header.tsx             # Sticky header (app title + Login)
│   │   └── summary-card.tsx       # Balance overview card (total, income, expense)
│   ├── member/
│   │   └── member-section.tsx     # Horizontal carousel, pin toggle, dot nav
│   ├── pocket/
│   │   └── pocket-section.tsx     # Grid cards with show-more toggle + motion
│   ├── transaction/
│   │   └── transaction-section.tsx # 5 newest transactions list
│   └── admin/                     # Admin-specific components (planned)
│
├── providers/
│   └── query-provider.tsx         # TanStack Query provider
│
├── docs/
│   ├── design.md                  # Canonical design spec
│   ├── prd.md                     # Product requirements
│   ├── trd.md                     # Technical requirements
│   ├── db.md                      # Database schema docs
│   ├── milestones-fe.md           # Frontend milestones
│   └── milestones-be.md           # Backend milestones
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
- **Badge, Card:** Installed at `components/ui/badge.tsx`, `components/ui/card.tsx`.

---

# File Location Conventions

| Location | Purpose |
|----------|---------|
| `app/` (root) | Root layout, globals, providers. This is where Next.js 16 expects `globals.css`. |
| `app/` | Application routes, pages, and API endpoints. |
| `components/` | Domain-specific components + global shadcn components. |
| `lib/` | Shared utilities (data, db, events, errors, http, money). |
| `providers/` | React context providers. |

---

# Component Organization

Setiap section pada dashboard dipisah ke file sendiri di dalam `components/{domain}/`:

| Domain | Path | File |
|--------|------|------|
| Dashboard | `components/dashboard/` | `header.tsx`, `summary-card.tsx` |
| Member | `components/member/` | `member-section.tsx` |
| Pocket | `components/pocket/` | `pocket-section.tsx` |
| Transaction | `components/transaction/` | `transaction-section.tsx` |
| UI | `components/ui/` | `badge.tsx`, `button.tsx`, `card.tsx` (shadcn) |

**Rules:**
- **Cek dulu** — sebelum buat component baru, periksa apakah sudah ada di `components/{domain}/` atau `components/ui/`. Jangan duplikasi.
- **shadcn untuk UI kecil** — button, badge, card, dan komponen UI kecil lainnya harus pakai shadcn (`components/ui/`). Jika komponen shadcn belum ada, install dulu via `npx shadcn@latest add <component>`.
- **Domain component folder** — component besar/section pindah ke `components/{domain}/`.

---

# Component Writing Rules

1. **RSC by default.** Only add `'use client'` when interactivity is required (event handlers, hooks, state).
2. **Motion isolation.** Any component using motion/react, scroll listeners, or pointer physics MUST be an isolated leaf Client Component.
3. **Theme.** Every component must render correctly in both light and dark mode. Use CSS variables or Tailwind `dark:` variant.
4. **Accessibility.** WCAG AA minimum. Touch targets ≥ 44×44px. Keyboard nav. `aria-labels` on icon-only buttons.
5. **No Prisma in components.** See architecture dependency flow.
6. **Forms.** Use react-hook-form + Zod schema. Label above input. Error below field. Button disabled during submit.

---

# TypeScript Strict Rules — STRICT

**DILARANG KERAS:**
- `any` — tidak boleh digunakan dalam bentuk apapun
- `unknown` — tidak boleh digunakan
- `// @ts-nocheck`, `// @ts-ignore`, `// eslint-disable-next-line` — dilarang
- Non-null assertion `!` — dilarang (kecuali untuk type predicate yang sudah divalidasi)
- Type assertion `as` — dilarang, gunakan type narrowing, type guard, atau zod parsing

**WAJIB:**
- Setiap file TypeScript harus `strict: true` di tsconfig (sudah aktif)
- Manfaatkan **generics** untuk reusable logic (parameterized types)
- Gunakan **type narrowing** (typeof, instanceof, discriminated union, type guard) daripada type assertion
- Zod untuk validasi runtime data dari API/form
- `satisfies` keyword untuk type-checking tanpa widening

**Prefix Convention:**

| Prefix | For | Contoh |
|--------|-----|--------|
| `I` | Interface (object shape) | `IMember`, `ITransaction` |
| `T` | Type alias | `TMemberResponse`, `TPocketSummary` |
| `G` (generic) | Generic type parameter | `<GData>`, `<GId extends string>` |
| `Props` | Component props type | `MemberCardProps`, `TransactionSectionProps` |
| `Params` | Function parameters | `CreateMemberParams`, `FetchPocketsParams` |
| `Res` | API response type | `DashboardRes`, `MemberListRes` |

**Contoh benar:**
```ts
// ✅ Good: interface + generic
interface IMember<TId extends string> {
  id: TId
  name: string
  setor: number
}

// ✅ Good: discriminated union + type guard
type TTransactionType = 'income' | 'expense'

interface ITransaction {
  type: TTransactionType
  amount: number
}

const isIncome = (tx: ITransaction): tx is ITransaction & { type: 'income' } =>
  tx.type === 'income'

// ✅ Good: satisfies for literal inference
const COLORS = { red: '#F00', green: '#0F0' } as const satisfies Record<string, string>

// ❌ Bad: any, unknown, as, !, ts-ignore
```

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
8. **Check before build** — sebelum buat UI component, cek dulu di `components/{domain}/` atau `components/ui/`. Jangan duplikasi.
9. **shadcn untuk UI kecil** — install via `npx shadcn@latest add <component>` jika belum ada. Jangan bikin manual button/badge/card.

<!-- END:nextjs-agent-rules -->
