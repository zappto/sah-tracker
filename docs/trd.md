# Technical Requirements Document (TRD)

# Trip Finance Dashboard

**Version:** 1.1.0  
**Status:** Draft  
**Application Type:** Fullstack Mobile-Only Web Application (no desktop layout)  

---

# 1. Technical Overview

Trip Finance Dashboard is a fullstack web application designed to transparently track financial activities during a trip or event.

The application allows:

- Public users to view financial data.
- Admin users to manage financial data.
- Real-time dashboard updates through Server-Sent Events (SSE).
- REST API-based communication between the frontend and backend.
- PostgreSQL-based persistent data storage.

The application is deployed as a single Next.js application on Railway.

The database is hosted on Supabase PostgreSQL.

---

# 2. Design & UX Skills

UI implementation follows these installed skills:

| Skill | When to Use |
|-------|-------------|
| **`design-taste-frontend`** | Before building any new page or major component. Run Design Read → set Three Dials (DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY) → determine layout, color, typography, and animation approach. |
| **`ui-ux-pro-max`** | During implementation for UX decisions. Reference priority categories: §1 Accessibility (CRITICAL), §2 Touch & Interaction, §5 Layout & Responsive, §6 Typography & Color, §7 Animation, §8 Forms & Feedback, §9 Navigation Patterns, §10 Charts & Data. |

---

# 3. Technology Stack

## 3.1 Frontend

```
Next.js 16
React 19
TypeScript
Tailwind CSS v4
shadcn/ui (base-nova style)
  └─ @base-ui/react (primitives)
Lucide React (icons)
TanStack Query v5 (server state)
React Hook Form + Zod (forms)
```

## 3.2 Backend

```
Next.js Route Handlers (REST API)
Service Layer (business logic)
Repository Layer (data access)
Server-Sent Events (realtime)
```

## 3.3 Animation & Interaction

```
motion/react (micro-interactions, entry/exit transitions)
GSAP + ScrollTrigger (scroll-driven animations, if needed)
```

Animation principles:
- Animate only `transform` and `opacity` (hardware accelerated).
- Micro-interactions: 150-300ms, ease-out for enter, ease-in for exit.
- Respect `prefers-reduced-motion`.
- Never use `window.addEventListener('scroll', ...)` — use GSAP ScrollTrigger or Motion's `useScroll`.

## 3.4 Database & ORM

```
PostgreSQL (Supabase)
Prisma 7 (ORM)
  └─ Driver adapter (e.g., @prisma/adapter-neon or @prisma/adapter-pg)
  └─ prisma-client generator → lib/generated/prisma
  └─ prisma.config.ts (v7 config file)
```

## 3.5 Runtime & Deployment

```
Bun (package manager / runtime)
Railway (deployment)
```

---

# 4. Architecture

## 4.1 Modular Monolith

The application follows a Modular Monolith architecture — one codebase, one deployment.

```
One Repository
    ↓
One Next.js Application
    ↓
REST API + SSE
    ↓
Prisma + Driver Adapter
    ↓
PostgreSQL (Supabase)
```

Do not introduce microservices.

## 4.2 Dependency Flow

```
UI (React Components)
 ↓
Hooks (TanStack Query wrappers)
 ↓
API Route Handlers (Next.js)
 ↓
Service Layer (business logic)
 ↓
Repository Layer (data access)
 ↓
Prisma ORM
 ↓
PostgreSQL
```

**Rules:**
- React components never query Prisma directly.
- Hooks never call Prisma directly.
- All database access goes through Service → Repository → Prisma.

---

# 5. Component Architecture

## 5.1 Route Tree

```
app/ (root layout + globals + providers)
├── (public)/layout.tsx
│   └── page.tsx (main dashboard — guests)
│
├── admin/layout.tsx
│   ├── login/page.tsx
│   └── page.tsx (admin dashboard)
│
└── api/
    ├── auth/me/route.ts
    ├── auth/login/route.ts
    ├── auth/logout/route.ts
    ├── dashboard/route.ts
    ├── events/route.ts (SSE)
    ├── members/route.ts + [id]/route.ts
    ├── pockets/route.ts + [id]/route.ts
    └── transactions/route.ts + [id]/route.ts
```

## 5.2 Component Organization

Setiap section dashboard dipisah ke file sendiri di `components/{domain}/`:

| Domain | Path | File |
|--------|------|------|
| Dashboard | `components/dashboard/` | `header.tsx`, `summary-card.tsx` |
| Member | `components/member/` | `member-section.tsx` |
| Pocket | `components/pocket/` | `pocket-section.tsx` |
| Transaction | `components/transaction/` | `transaction-section.tsx` |
| UI | `components/ui/` | `badge.tsx`, `button.tsx`, `card.tsx` (shadcn) |

**Rules:**
- Cek `components/{domain}/` atau `components/ui/` sebelum buat component baru. Jangan duplikasi.
- UI kecil (button, badge, card) pakai shadcn. Install via `npx shadcn@latest add <component>` jika belum ada.
- Component besar/section pindah ke `components/{domain}/`.

## 5.3 Component Hierarchy (Dashboard Page)

```
DashboardPage (RSC)
├── Header (app title + Login button)
├── SummaryCard (total balance, income, expenses)
├── MemberSection (horizontal carousel of member cards)
│   └── MemberCard (avatar, name, balance stats, pin button)
├── PocketSection (grid of pocket cards with show-more toggle)
│   └── PocketCard (name, remaining/spent, progress bar)
└── TransactionSection (5 newest transactions)
    └── TransactionRow (description, amount, pocket badge, time)
```

## 5.3 Admin Action Pattern

All admin actions follow this pattern:

```
ActionButton (FAB or inline)
  → Modal or BottomSheet
    → Form (react-hook-form + Zod)
    → Submit (TanStack Query mutation)
    → SSE event broadcast
    → Modal closes
    → Dashboard data invalidated
```

---

# 6. Theme System

- **Dark mode** supported via CSS variables and `.dark` class.
- Uses `prefers-color-scheme` by default.
- Admin toggle option for manual override.
- All colors use CSS custom properties defined in `globals.css` (shadcn format).
- Every new component is built with both light and dark variants.

---

# 7. Form Patterns

All forms (admin actions) follow these conventions:

| Element | Convention |
|---------|------------|
| Library | `react-hook-form` + `@hookform/resolvers/zod` |
| Validation | Zod schema per entity |
| Label | Visible label above input (never placeholder-only) |
| Error | Inline error below the field on blur |
| Submit | Disable button during async, show spinner |
| Success | Brief toast, auto-dismiss |
| Touch targets | Input height ≥ 44px |

---

# 8. SSE (Server-Sent Events) Flow

```
1. Client (use-financial-events.ts):
   new EventSource('/api/events')
   → listens for 'FINANCE_UPDATED' event
   → calls queryClient.invalidateQueries({ queryKey: ['dashboard'] })

2. Server (api/events/route.ts):
   → SSE endpoint with ReadableStream
   → sse-manager.ts tracks open connections
   → On FINANCE_UPDATED event, broadcasts to all connections

3. Trigger:
   → transaction.service.ts publishes event after every mutation
   → event-bus.ts dispatches to sse-manager
```

---

# 9. Prisma 7 Configuration

- **Config file:** `prisma.config.ts` (separate from `next.config.ts`)
- **Generator output:** `lib/generated/prisma` (outside `node_modules`)
- **Driver adapter:** Required at runtime (e.g., `@prisma/adapter-neon` or `@prisma/adapter-pg`)
- **Schema:** `prisma/schema.prisma`
- **Migration path:** `prisma/migrations/`

```
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: process.env["DATABASE_URL"] },
});
```

---

# 10. Error Handling Strategy

## 10.1 Backend

```
AppError class (custom error with code + status + message)
  → error-handler.ts
    → maps to NextResponse.json({ error: { code, message } }, { status })
```

Standard error codes: `VALIDATION_ERROR`, `NOT_FOUND`, `UNAUTHORIZED`, `CONFLICT`, `INTERNAL_ERROR`.

## 10.2 Frontend

- **API client** (`lib/http/api-client.ts`): wraps fetch, throws structured errors.
- **TanStack Query**: `onError` callbacks per mutation.
- **Error boundaries**: one per page section.
- **Toast**: transient errors (network, save failure).
- **Inline**: form validation errors.

---

# 11. State Management

| Concern | Tool |
|---------|------|
| Server data (dashboard, members, pockets, transactions) | TanStack Query |
| UI state (modal open/close, form state) | `useState` / `useReducer` |
| SSE events (invalidation trigger) | TanStack Query `invalidateQueries` |
| Admin session | Server-side session (HTTP-only cookie) |

---

# 12. Data Flow Diagram

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant H as Hook (TanStack Query)
    participant API as Next.js Route Handler
    participant S as Service Layer
    participant R as Repository
    participant DB as PostgreSQL

    U->>H: View Dashboard
    H->>API: GET /api/dashboard
    API->>S: getDashboard()
    S->>R: query members, pockets, expenses
    R->>DB: SELECT queries
    DB-->>R: result sets
    R-->>S: aggregated data
    S-->>API: DashboardResponse
    API-->>H: JSON response
    H-->>U: Rendered UI

    Note over U,DB: On mutation (admin action):

    U->>API: POST /api/transactions (expense)
    API->>S: createExpense()
    S->>R: validate + create expense + allocations
    R->>DB: Transaction (BEGIN...COMMIT)
    DB-->>R: success
    R-->>S: created records
    S-->>API: success response
    S->>S: Publish FINANCE_UPDATED event
    API-->>U: 201 Created

    par SSE broadcast
        S->>U: SSE: FINANCE_UPDATED
        U->>H: invalidateQueries(['dashboard'])
        H->>API: GET /api/dashboard (refetch)
    end
```

---

# 13. Financial Calculation Rules

## 13.1 Member Balance

```
member.currentBalance =
  SUM(deposits) - SUM(expense allocations)
```

## 13.2 Pocket Balance

```
pocket.currentBalance =
  SUM(income into pocket) - SUM(expenses from pocket)
```

## 13.3 Validation

```
All expense allocation amounts must equal the expense total amount.
No financial record can be updated or deleted after creation (append-only).
```

---

# 14. TypeScript Strict Rules

## 14.1 Absolute Bans

| Practice | Status | Alternative |
|----------|--------|-------------|
| `any` | ❌ Dilarang | Gunakan generic atau interface eksplisit |
| `unknown` | ❌ Dilarang | Gunakan discriminated union + type narrowing |
| `// @ts-nocheck`, `// @ts-ignore` | ❌ Dilarang | Perbaiki type error langsung |
| `// eslint-disable-next-line` | ❌ Dilarang | Ikuti rule, jangan dimatikan |
| Non-null assertion `!` | ❌ Dilarang | Type predicate yang sudah divalidasi |
| Type assertion `as` | ❌ Dilarang | Type narrowing, type guard, atau Zod |

## 14.2 Mandatory Practices

- Setiap file TypeScript menggunakan `strict: true` (aktif via tsconfig)
- **Generics** untuk reusable logic (parameterized types)
- **Type narrowing** (`typeof`, `instanceof`, discriminated union, type guard)
- **Zod** untuk validasi runtime data dari API/form
- **`satisfies`** keyword untuk type-checking tanpa widening

## 14.3 Naming Convention

| Prefix | Untuk | Contoh |
|--------|-------|--------|
| `I` | Interface (object shape) | `IMember`, `ITransaction` |
| `T` | Type alias | `TMemberResponse`, `TPocketSummary` |
| `G` (generic) | Generic type parameter | `<GData>`, `<GId extends string>` |
| `Props` | Component props type | `MemberCardProps` |
| `Params` | Function parameters | `CreateMemberParams` |
| `Res` | API response type | `DashboardRes` |

## 14.4 Correct Examples

```ts
// ✅ Interface + generic
interface IMember<TId extends string> {
  id: TId
  name: string
  setor: number
}

// ✅ Discriminated union + type guard
type TTransactionType = 'income' | 'expense'

interface ITransaction {
  type: TTransactionType
  amount: number
}

const isIncome = (tx: ITransaction): tx is ITransaction & { type: 'income' } =>
  tx.type === 'income'

// ✅ satisfies for literal inference
const COLORS = { red: '#F00', green: '#0F0' } as const satisfies Record<string, string>

// ❌ any, unknown, as, !, ts-ignore — semua dilarang
```
