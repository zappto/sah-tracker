# Product Requirements Document (PRD)

# Trip Finance Dashboard

**Version:** 1.1.0  
**Status:** Draft  
**Product Type:** Mobile-Only Web Application (no desktop layout)  
**Primary Users:** Trip/Event Members and Admin  
**Authentication:** Admin Only  
**Realtime Update:** Server-Sent Events (SSE)  

---

# 1. Product Overview

Trip Finance Dashboard is a simple, transparent, and mobile-only web application designed to manage and display the financial activities of a trip or event.

The application allows an admin to record:

- Member deposits.
- Trip/event expenses.
- Financial pockets.
- Member-related financial usage.
- Financial transactions.

Members do not need to log in.

All members can access the dashboard and view the financial information transparently.

The application is designed to answer the following questions:

1. How much money is currently available?
2. How much money has been spent?
3. Where is the money currently located?
4. How much money does each member have remaining?
5. What transactions have recently occurred?
6. How was each member's money used?

The application must prioritize:

- Simplicity.
- Transparency.
- Mobile-only (no desktop layout, no breakpoints, tested on real devices).
- Fast data entry for admins.
- Clear financial information.
- Minimal navigation.
- Easy-to-understand information hierarchy.

The application must not become a complex accounting system.

---

# 2. Design System Direction

UI implementation follows these installed skills:

- **`design-taste-frontend`** — for component design decisions, layout variance, motion intensity, and visual density (Three Dials system). Use before building any new page or major component.
- **`ui-ux-pro-max`** — for UX guidelines: accessibility (§1-3), touch targets (§2), form patterns (§8), navigation (§9), animation (§7), and data display (§10).

## 2.1 Style Direction

- **Vibe:** Financial dashboard → clarity & trust. Neutral palette (slate/zinc), restrained typography, no decorative fluff.
- **Dark mode:** Supported via CSS variables. Respects `prefers-color-scheme`.
- **Typography:** Geist (sans) + Geist Mono (numbers). Financial data uses tabular figures.
- **Icons:** Lucide React (single family, consistent stroke).
- **Components:** shadcn/ui with `base-nova` style (`@base-ui/react` primitives).

---

# 3. Product Goals

## 3.1 Primary Goals

### Goal 1: Provide Financial Transparency

Every member should be able to view the current financial state of the trip/event without logging in.

Members should be able to understand:

- Total available balance.
- Total income.
- Total expenses.
- Pocket balances.
- Individual member balances.
- Recent transactions.

### Goal 2: Make Admin Data Entry Fast

The admin should be able to quickly:

- Add income.
- Add expenses.
- Add members.
- Add pockets.

The admin should not need to navigate through complex pages.

The primary workflow should be:

```
Dashboard
    ↓
Admin Action Button
    ↓
Action Menu
    ↓
Modal / Bottom Sheet
    ↓
Submit
    ↓
Dashboard Updated
```

---

# 4. User Stories

## 4.1 Guest / Member

| ID | Story |
|----|-------|
| US-01 | As a member, I want to see the total balance so I know how much money is available. |
| US-02 | As a member, I want to see total income and expenses so I understand the financial overview. |
| US-03 | As a member, I want to see pocket balances so I know where the money is stored. |
| US-04 | As a member, I want to see my personal balance so I know how much I have left. |
| US-05 | As a member, I want to see recent transactions so I can track spending. |
| US-06 | As a member, I want the dashboard to update automatically so I always see current data. |

## 4.2 Admin

| ID | Story |
|----|-------|
| US-07 | As an admin, I want to log in securely so only I can manage finances. |
| US-08 | As an admin, I want to add a deposit for a member so their balance is updated. |
| US-09 | As an admin, I want to create an expense with member allocations so costs are distributed fairly. |
| US-10 | As an admin, I want to manage members (add/edit/delete) so the roster stays current. |
| US-11 | As an admin, I want to manage pockets so money is properly categorized. |

---

# 5. UI States Requirements

Every data-driven component must handle these states:

## 5.1 Loading State

- Use **skeleton loaders** matching the final layout shape (never generic circular spinners).
- Show skeleton immediately on navigation; no delay before showing loading UI.

## 5.2 Empty State

- Display a helpful message + suggested action (e.g., "No members yet. Add your first member.").
- Never show an empty table/chart with no guidance.

## 5.3 Error State

- Show inline error messages near the relevant field (forms).
- Use toast notifications for transient errors (network failure, save failure).
- Include a retry action for recoverable errors.
- Implement React error boundaries at page level.

## 5.4 Success State

- Brief visual confirmation after mutation (toast, checkmark animation, color flash).
- Auto-dismiss toasts after 3-5 seconds.

---

# 6. Admin Workflow Diagrams

## 6.1 Create Expense

```
Admin → Tap "Add Expense" FAB
  → Modal/Bottom Sheet opens
    → Select Pocket (dropdown)
    → Enter Total Amount
    → Select Members (multi-select)
    → Enter Allocation per Member
    → Submit
  → Validation: sum of allocations == total amount
  → If valid: create expense + allocations → update balances → publish SSE
  → If invalid: show inline error "Allocations must equal total amount"
  → Modal closes → Dashboard refreshes
```

## 6.2 Add Deposit

```
Admin → Tap member card/row
  → Tap "Add Deposit"
  → Modal/Bottom Sheet opens
    → Enter Amount
    → Optional Description
    → Submit
  → Member balance updated → SSE published
  → Modal closes → Dashboard refreshes
```

---

# 7. Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| First SSE update | < 1s after mutation |

---

# 8. Accessibility Targets

- **WCAG AA** minimum (4.5:1 contrast for body text, 3:1 for large text).
- Touch targets ≥ 44×44px.
- Full keyboard navigation for all interactive elements.
- Screen reader support: `aria-labels` on icon-only buttons, semantic HTML.
- Respect `prefers-reduced-motion`.
- Focus order matches visual order.
