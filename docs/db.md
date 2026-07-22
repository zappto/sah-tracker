# Database Schema Document (DB)

# Trip Finance Dashboard

**Version:** 1.1.0  
**Engine:** PostgreSQL (Supabase)  
**ORM:** Prisma 7  
**Status:** Draft  

---

# 1. Entity-Relationship Diagram

```mermaid
erDiagram
    MEMBER ||--o{ MEMBER_BALANCE_ENTRY : "has balance history"
    MEMBER ||--o{ EXPENSE_ALLOCATION : "receives expense allocation"

    POCKET ||--o{ EXPENSE : "contains expenses"
    POCKET ||--o{ POCKET_BALANCE_ENTRY : "has balance history"

    EXPENSE ||--o{ EXPENSE_ALLOCATION : "has allocations"
    EXPENSE ||--o{ MEMBER_BALANCE_ENTRY : "creates member usage"
    EXPENSE ||--o{ POCKET_BALANCE_ENTRY : "creates pocket usage"

    MEMBER {
        string id PK
        string name
        decimal currentBalance
        datetime createdAt
        datetime updatedAt
    }

    POCKET {
        string id PK
        string name
        string description
        decimal currentBalance
        datetime createdAt
        datetime updatedAt
    }

    EXPENSE {
        string id PK
        string description
        decimal totalAmount
        string pocketId FK
        datetime createdAt
        datetime updatedAt
    }

    MEMBER_BALANCE_ENTRY {
        string id PK
        enum type
        decimal amount
        string description
        string memberId FK
        string expenseId FK
        datetime createdAt
    }

    POCKET_BALANCE_ENTRY {
        string id PK
        enum type
        decimal amount
        string description
        string pocketId FK
        string expenseId FK
        datetime createdAt
    }

    EXPENSE_ALLOCATION {
        string id PK
        decimal amount
        string expenseId FK
        string memberId FK
        datetime createdAt
    }
```

---

# 2. Enum Definitions

## 2.1 BalanceEntryType

Used in `MEMBER_BALANCE_ENTRY.type` and `POCKET_BALANCE_ENTRY.type`.

| Value | Description |
|-------|-------------|
| `DEPOSIT` | Money added to a member's balance (income). |
| `EXPENSE` | Money deducted for a shared expense. |
| `ALLOCATION` | Portion of an expense assigned to a specific member. |

---

# 3. Field Specifications

## 3.1 Monetary Precision

All `amount` and `currentBalance` fields use:

| Property | Value |
|----------|-------|
| Type | `Decimal(12,2)` |
| Max value | 9,999,999,999.99 |
| Min value | -9,999,999,999.99 |
| Scale | 2 decimal places |
| Currency | IDR (display formatting only; stored as raw decimal) |

## 3.2 ID Generation

- All `id` fields use CUID2 (via Prisma `@default(cuid())`)
- No auto-increment integers

---

# 4. Indexes

| Table | Column(s) | Type | Purpose |
|-------|-----------|------|---------|
| MEMBER_BALANCE_ENTRY | `memberId` | B-tree | Filter balance history by member |
| MEMBER_BALANCE_ENTRY | `expenseId` | B-tree | Join with expense |
| MEMBER_BALANCE_ENTRY | `createdAt` | B-tree (DESC) | Recent entries query |
| POCKET_BALANCE_ENTRY | `pocketId` | B-tree | Filter balance history by pocket |
| POCKET_BALANCE_ENTRY | `expenseId` | B-tree | Join with expense |
| POCKET_BALANCE_ENTRY | `createdAt` | B-tree (DESC) | Recent entries query |
| EXPENSE | `pocketId` | B-tree | Filter expenses by pocket |
| EXPENSE_ALLOCATION | `expenseId` | B-tree | Join with expense |
| EXPENSE_ALLOCATION | `memberId` | B-tree | Filter allocations by member |

---

# 5. Foreign Key Constraints

| FK Column | From | To | On Delete | Rationale |
|-----------|------|----|-----------|-----------|
| `memberId` | MEMBER_BALANCE_ENTRY | MEMBER | `RESTRICT` | Prevent orphaned financial history |
| `expenseId` | MEMBER_BALANCE_ENTRY | EXPENSE | `RESTRICT` | Prevent orphaned financial history |
| `pocketId` | POCKET_BALANCE_ENTRY | POCKET | `RESTRICT` | Prevent orphaned financial history |
| `expenseId` | POCKET_BALANCE_ENTRY | EXPENSE | `RESTRICT` | Prevent orphaned financial history |
| `pocketId` | EXPENSE | POCKET | `RESTRICT` | Prevent orphaned expenses |
| `expenseId` | EXPENSE_ALLOCATION | EXPENSE | `CASCADE` | Allocations deleted with expense |
| `memberId` | EXPENSE_ALLOCATION | MEMBER | `RESTRICT` | Prevent orphaned allocations |

---

# 6. Expense Creation Flow

```mermaid
flowchart TD
    A[Admin Creates Expense] --> B[Select Pocket]
    B --> C[Enter Total Amount]
    C --> D[Select Members]
    D --> E[Define Allocation per Member]

    E --> F{Allocation Total == Expense Total?}

    F -->|No| G[Reject: Validation Error]
    F -->|Yes| H[Create EXPENSE record]

    H --> I[Create EXPENSE_ALLOCATIONs]
    I --> J[Decrease POCKET.currentBalance]
    I --> K[Decrease each MEMBER.currentBalance]

    J --> L[Create POCKET_BALANCE_ENTRY]
    K --> M[Create MEMBER_BALANCE_ENTRYs]

    L --> N[Publish SSE: FINANCE_UPDATED]
    M --> N
```

---

# 7. Soft Delete Strategy

- Financial records (entries, allocations) use `ON DELETE RESTRICT` — they are **permanent**.
- `MEMBER` and `POCKET` may be **hard deleted** only when they have zero financial history.
- Future: add `deletedAt` timestamp if archival/restore is needed.

---

# 8. Prisma Schema Mapping

- **Generator:** `prisma-client` → output `lib/generated/prisma`
- **Datasource:** PostgreSQL via Supabase
- **Driver adapter** required for Prisma 7 runtime
