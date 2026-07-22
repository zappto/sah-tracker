# Backend Milestones

# Trip Finance Dashboard

**Version:** 1.0.0  
**Status:** Draft  

---

# M1: Prisma & Database Schema

**Goal:** Database schema defined, Prisma client generated, migrations working.

| Task | Detail |
|------|--------|
| Define Prisma schema | All models: Member, Pocket, Expense, MemberBalanceEntry, PocketBalanceEntry, ExpenseAllocation |
| Enums | `BalanceEntryType` (DEPOSIT, EXPENSE, ALLOCATION) |
| Indexes | `memberId`, `pocketId`, `expenseId`, `createdAt` |
| Driver adapter | Install and configure `@prisma/adapter-pg` (or Neon) for Prisma 7 |
| Prisma client | Generate client to `lib/generated/prisma` |
| Migration | Run `prisma migrate dev` — initial schema deployed |
| Seed script | Optional: seed with sample data for development |

**Files to create:**
- `prisma/schema.prisma` (update)
- `prisma.config.ts` (exists)
- `src/lib/db/prisma.ts` (singleton client)

**Acceptance:**
- `prisma db push` succeeds
- Client can query all models

---

# M2: Error Handling & API Infrastructure

**Goal:** Shared error handling, standard API responses, and API client infrastructure.

| Task | Detail |
|------|--------|
| `AppError` class | Custom error with `code`, `message`, `status` |
| `error-handler.ts` | Maps AppError → NextResponse |
| `api-response.ts` | Standard response helpers (success, paginated, error) |
| `api-client.ts` | Frontend fetch wrapper with error handling |

**Files to create:**
- `src/lib/errors/app-error.ts`
- `src/lib/errors/error-handler.ts`
- `src/lib/http/api-response.ts`
- `src/lib/http/api-client.ts`

**Acceptance:**
- API routes return consistent `{ data }` / `{ error }` shape
- Errors return correct HTTP status codes

---

# M3: Auth Module

**Goal:** Admin authentication with session-based login.

| Task | Detail |
|------|--------|
| Login schema | Zod: `email` + `password` |
| Auth service | `login()`, `logout()`, `getSession()` |
| Session | HTTP-only cookie with encrypted token |
| API routes | `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me` |

**Files to create:**
- `src/modules/auth/auth.schema.ts`
- `src/modules/auth/auth.service.ts`
- `src/modules/auth/auth.types.ts`
- `src/modules/auth/session.ts`
- `src/app/api/auth/login/route.ts`
- `src/app/api/auth/logout/route.ts`
- `src/app/api/auth/me/route.ts`

**Acceptance:**
- Admin can log in with credentials
- Session persists across requests
- Unauthenticated requests return 401

---

# M4: Member Module

**Goal:** Full CRUD for members.

| Task | Detail |
|------|--------|
| Member schema | Zod: `name` required, `currentBalance` default 0 |
| Member repository | `findAll()`, `findById()`, `create()`, `update()`, `delete()` |
| Member service | Validation + business logic |
| API routes | `GET /api/members`, `POST /api/members`, `GET /api/members/[id]`, `PATCH /api/members/[id]`, `DELETE /api/members/[id]` |

**Files to create:**
- `src/modules/member/member.schema.ts`
- `src/modules/member/member.repository.ts`
- `src/modules/member/member.service.ts`
- `src/modules/member/member.types.ts`
- `src/app/api/members/route.ts`
- `src/app/api/members/[id]/route.ts`

**Acceptance:**
- All CRUD operations work
- Validation rejects empty names
- Delete restricted if member has financial history

---

# M5: Pocket Module

**Goal:** Full CRUD for pockets.

| Task | Detail |
|------|--------|
| Pocket schema | Zod: `name` required, `description` optional |
| Pocket repository | `findAll()`, `findById()`, `create()`, `update()`, `delete()` |
| Pocket service | Validation + business logic |
| API routes | `GET /api/pockets`, `POST /api/pockets`, `GET /api/pockets/[id]`, `PATCH /api/pockets/[id]`, `DELETE /api/pockets/[id]` |

**Files to create:**
- `src/modules/pocket/pocket.schema.ts`
- `src/modules/pocket/pocket.repository.ts`
- `src/modules/pocket/pocket.service.ts`
- `src/modules/pocket/pocket.types.ts`
- `src/app/api/pockets/route.ts`
- `src/app/api/pockets/[id]/route.ts`

**Acceptance:**
- All CRUD operations work
- Delete restricted if pocket has expenses

---

# M6: Transaction Module

**Goal:** Create expenses with member allocations. Core financial logic.

| Task | Detail |
|------|--------|
| Transaction schema | Zod: `description`, `totalAmount`, `pocketId`, `allocations[]` |
| Allocation validation | Sum of allocations must equal totalAmount |
| Financial calculator | Update member balance, pocket balance |
| Transaction repository | Create expense + allocations + balance entries in transaction |
| Transaction service | Atomic Prisma transaction |
| API routes | `GET /api/transactions`, `POST /api/transactions`, `GET /api/transactions/[id]` |
| Deposit flow | `POST /api/transactions` with type DEPOSIT updates member balance |

**Files to create:**
- `src/modules/transaction/transaction.schema.ts`
- `src/modules/transaction/transaction.repository.ts`
- `src/modules/transaction/transaction.service.ts`
- `src/modules/transaction/transaction.calculator.ts`
- `src/modules/transaction/transaction.types.ts`
- `src/app/api/transactions/route.ts`
- `src/app/api/transactions/[id]/route.ts`

**Acceptance:**
- Expense with valid allocations creates all records atomically
- Invalid allocation sum returns 400
- Member and pocket balances update correctly

---

# M7: SSE (Server-Sent Events)

**Goal:** Realtime dashboard updates after mutations.

| Task | Detail |
|------|--------|
| Event bus | Simple pub/sub: `publish()`, `subscribe()` |
| Event types | `FINANCE_UPDATED` |
| SSE manager | Track open connections, broadcast events |
| SSE route | `GET /api/events` — keeps connection open |

**Files to create:**
- `src/lib/events/event-bus.ts`
- `src/lib/events/event-types.ts`
- `src/lib/events/sse-manager.ts`
- `src/app/api/events/route.ts`

**Acceptance:**
- Client connects to `/api/events` and receives events
- After mutation, `FINANCE_UPDATED` is broadcast

---

# M8: Dashboard Module

**Goal:** Aggregated dashboard data API.

| Task | Detail |
|------|--------|
| Dashboard service | Aggregate: total balance, income, expenses, pocket balances, member balances, recent transactions |
| Dashboard types | `DashboardResponse` interface |
| API route | `GET /api/dashboard` |

**Files to create:**
- `src/modules/dashboard/dashboard.service.ts`
- `src/modules/dashboard/dashboard.types.ts`
- `src/app/api/dashboard/route.ts`

**Acceptance:**
- Returns complete dashboard data in one request
- Response includes all fields needed by the UI

---

# M9: Connect SSE to Mutations

**Goal:** Every mutation publishes SSE event.

| Task | Detail |
|------|--------|
| Wire event bus | Transaction service publishes FINANCE_UPDATED after create |
| Wire member service | Publish after deposit, create, update, delete |
| Wire pocket service | Publish after create, update, delete |

**Acceptance:**
- All financial mutations trigger SSE broadcast
- Dashboard clients receive updates in real time
