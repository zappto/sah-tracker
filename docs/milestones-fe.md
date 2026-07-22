# Frontend Milestones

# Trip Finance Dashboard

**Version:** 1.0.0  
**Status:** Draft  

**Design approach:**
- Read **`docs/design.md`** for the canonical design spec (colors, typography, spacing, component specs, states, micro-interactions)
- Invoke **`impeccable`** first at session start (run `node .agents/skills/impeccable/scripts/context.mjs`), reference `reference/operate.md` for dashboard UX depth
- Invoke `design-taste-frontend` before each milestone to set Three Dials (VARIANCE, MOTION, DENSITY)
- Reference `ui-ux-pro-max` for all UX decisions (accessibility, touch, forms, navigation)

---

# F1: Project Scaffold & Theme

**Goal:** Root layout, providers, global styles, and theme setup.

| Task | Detail | Design Ref |
|------|--------|------------|
| Root layout | `app/layout.tsx` — Geist font (sans + mono), html/body, metadata | `docs/design.md` §2 Typography |
| Global CSS | `app/globals.css` — Tailwind v4 + shadcn CSS variables. Verify palette matches DESIGN.md §3. | `docs/design.md` §3 Color Palette |
| Theme | CSS variables for light/dark, `.dark` class, `prefers-color-scheme`. Dark values per DESIGN.md §3.4. | `docs/design.md` §3.4 |
| TanStack Query provider | `src/providers/query-provider.tsx` | — |
| `cn()` helper | `lib/utils.ts` (exists) | — |
| `src/app/layout.tsx` | Application layout with providers | — |
| `src/app/globals.css` | App-specific overrides | `docs/design.md` §4 Shapes, §5 Spacing |

**Files to create/update:**
- `app/layout.tsx` (update)
- `app/globals.css` (verify)
- `src/providers/query-provider.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`

**Acceptance:**
- App renders with correct font and colors per `docs/design.md`
- Dark mode toggle works (or respects system preference)
- TanStack Query devtools available in dev

---

# F2: Public Dashboard — Data Display

**Goal:** The core public dashboard page with all financial data.

**Before coding:** Read `docs/design.md` §6 (layout), §7 (component specs). Invoke `impeccable` reference `operate.md`, then `design-taste-frontend`.

| Task | Detail | Design Ref |
|------|--------|------------|
| Dashboard hook | `use-dashboard.ts` — `useQuery(['dashboard'], fetchDashboard)` | — |
| Summary card | Gradient card: balance, total masuk, total keluar | `docs/design.md` §7.2 |
| Pocket list | Horizontal scroll-snap cards, first card tinted | `docs/design.md` §7.3 |
| Member list | Avatar pastel palette, setoran + sisa amounts | `docs/design.md` §7.4 |
| Transaction list | Arrow icons with colored backgrounds | `docs/design.md` §7.5 |
| Loading state | Skeleton cards matching final layout | `docs/design.md` §8.1 |
| Empty state | Guidance message per section | `docs/design.md` §8.2 |
| Error state | Toast + inline + section retry | `docs/design.md` §8.3 |

**Components to create:**
- `src/components/dashboard/dashboard-summary.tsx`
- `src/components/dashboard/pocket-list.tsx`
- `src/components/dashboard/member-list.tsx`
- `src/components/dashboard/transaction-list.tsx`
- `src/hooks/use-dashboard.ts`

**Acceptance:**
- All data sections render correctly
- Loading skeletons show during fetch
- Empty sections show guidance
- Mobile-only layout (no breakpoints, full viewport width)

---

# F3: Admin Authentication

**Goal:** Login page and session management.

| Task | Detail |
|------|--------|
| Login page | `admin/login/page.tsx` — email + password form |
| Form | react-hook-form + Zod schema |
| Auth hook | `useAuth` — login mutation, session query |
| Session check | Admin dashboard checks `/api/auth/me` on mount |
| Redirect | Unauthenticated → login page; authenticated → admin dashboard |
| Error states | Invalid credentials, network error |
| Loading | Button spinner during submit |

**Components to create:**
- `src/components/admin/login-form.tsx`
- `src/components/admin/auth-guard.tsx`

**Acceptance:**
- Login form validates inputs
- Successful login redirects to admin dashboard
- Unauthenticated users redirected to login
- Logout clears session

---

# F4: Admin Dashboard

**Goal:** Admin sees the same dashboard as public + admin action buttons.

**Before coding:** Read `docs/design.md` §7.6 (admin grid menu), §7.7 (bottom nav), §7.8 (drawer/modal). Invoke `impeccable` reference `operate.md`, then `design-taste-frontend`.

| Task | Detail | Design Ref |
|------|--------|------------|
| Admin layout | Wraps dashboard with admin controls | — |
| Auth guard | Protect admin routes | — |
| Grid menu | 3-col grid with color-coded icon cards | `docs/design.md` §7.6 |
| Bottom nav | Glassmorphism bar + center FAB | `docs/design.md` §7.7 |
| Action drawer | Bottom drawer with drag handle for forms | `docs/design.md` §7.8 |

**Components to create:**
- `src/components/admin/admin-layout.tsx`
- `src/components/admin/action-menu.tsx`
- `src/components/admin/admin-page.tsx`

**Acceptance:**
- Admin sees same dashboard data
- Action button is visible and tappable
- Action menu opens modal/drawer

---

# F5: Member Management (Admin)

**Goal:** CRUD for members via modal/drawer.

**Reference:** `docs/design.md` §7.8 (drawer form styles), `ui-ux-pro-max` §8 Forms & Feedback.

| Task | Detail | Design Ref |
|------|--------|------------|
| Add member | Drawer: name input → submit → mutation → refetch | `docs/design.md` §7.8 |
| Edit member | Drawer: pre-filled name → submit | `docs/design.md` §7.8 |
| Delete member | Confirmation dialog → delete → refetch | — |
| Add deposit | Drawer: large amount input + description → submit | `docs/design.md` §7.8 |
| Member card | Avatar pastel, setoran/sisa display | `docs/design.md` §7.4 |
| Member hook | `use-members.ts` — queries + mutations | — |

**Components to create:**
- `src/components/member/member-form.tsx`
- `src/components/member/member-card.tsx` (with admin actions)
- `src/components/member/deposit-form.tsx`
- `src/components/member/delete-confirmation.tsx`
- `src/hooks/use-members.ts`

**Acceptance:**
- Add member works (name required)
- Edit member works (name required)
- Delete restricted if member has history
- Deposit updates member balance immediately

---

# F6: Pocket Management (Admin)

**Goal:** CRUD for pockets via modal/drawer.

| Task | Detail | Design Ref |
|------|--------|------------|
| Add pocket | Drawer: name + description → submit → refetch | `docs/design.md` §7.8 |
| Edit pocket | Drawer: pre-filled fields → submit | `docs/design.md` §7.8 |
| Delete pocket | Confirmation dialog → delete → refetch | — |
| Pocket card | Snap-scroll card, first tinted gradient | `docs/design.md` §7.3 |
| Pocket hook | `use-pockets.ts` — queries + mutations | — |

**Components to create:**
- `src/components/pocket/pocket-form.tsx`
- `src/components/pocket/pocket-card.tsx` (with admin actions)
- `src/components/pocket/delete-confirmation.tsx`
- `src/hooks/use-pockets.ts`

**Acceptance:**
- Add pocket works (name required)
- Delete restricted if pocket has expenses
- Pocket list updates after mutation

---

# F7: Transaction Management (Admin)

**Goal:** Create expense with member allocations.

**Reference:** `docs/design.md` §7.8 (drawer form), §7.5 (transaction row), `ui-ux-pro-max` §8 Forms & Feedback.

| Task | Detail | Design Ref |
|------|--------|------------|
| Create expense drawer | Single form: pocket dropdown → amount → members → allocations | `docs/design.md` §7.8 |
| Allocation validation | Sum of allocations must equal total amount | — |
| Amount input | Large mono text, centered (digital bank style) | `docs/design.md` §7.8 |
| Transaction row | Arrow icon with colored bg, mono amount | `docs/design.md` §7.5 |
| Submit | Mutation → SSE → dashboard refreshes | — |
| Transaction hook | `use-transactions.ts` — queries + mutations | — |

**Components to create:**
- `src/components/transaction/expense-form.tsx`
- `src/components/transaction/allocation-input.tsx`
- `src/components/transaction/transaction-row.tsx`
- `src/hooks/use-transactions.ts`

**Acceptance:**
- Admin can create expense with valid allocations
- Invalid allocation sum shows inline error
- Dashboard updates after successful creation

---

# F8: SSE Integration (Auto-Refresh)

**Goal:** Dashboard auto-refreshes when financial data changes.

| Task | Detail |
|------|--------|
| SSE hook | `use-financial-events.ts` — `EventSource` to `/api/events` |
| Auto-invalidation | On `FINANCE_UPDATED` → `queryClient.invalidateQueries(['dashboard'])` |
| Connection recovery | Reconnect on disconnect with exponential backoff |
| Connection status | Optional: show connection indicator |

**Files to create:**
- `src/hooks/use-financial-events.ts`

**Acceptance:**
- Dashboard refreshes within 1s after mutation
- SSE reconnects if connection drops
- No duplicate fetches on reconnect

---

# F9: Polish & Responsive

**Goal:** Mobile-first polish, animations, edge cases, a11y audit.

**Before coding:** Read `docs/design.md` §9 (micro-interactions), §11 (accessibility checklist). Run `impeccable` quality checks per `craft-floor.md`, then `ui-ux-pro-max` Pre-Delivery Checklist.

| Task | Detail | Design Ref |
|------|--------|------------|
| Mobile-only layout | Full viewport width, no breakpoints | `docs/design.md` §10 |
| Touch targets | Verify all interactive elements ≥ 44×44px | `docs/design.md` §11 |
| Micro-interactions | Press scale, number tick, modal slide, pulse badge | `docs/design.md` §9 |
| Reduced motion | Respect `prefers-reduced-motion` on all animations | `docs/design.md` §9 |
| Keyboard nav | Tab through all interactive elements | `docs/design.md` §11 |
| Screen reader | `aria-labels` on icon buttons, semantic HTML | `docs/design.md` §11 |
| Dark mode | Verify palette contrast in both themes | `docs/design.md` §3.4 |
| Empty states | Every list has a helpful empty message | `docs/design.md` §8.2 |
| Error boundaries | Wrap dashboard sections | `docs/design.md` §8.3 |
| Loading audit | No flash-of-empty-content | `docs/design.md` §8.1 |
| Avatar colors | Verify pastel palette matches design spec | `docs/design.md` §7.4 |

**Acceptance:**
- Tested on real mobile devices (375px-430px)
- No accessibility violations
- Smooth animations (when motion not reduced)
- Mobile-only layout (no breakpoints, full viewport width)
