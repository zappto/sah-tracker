---
design_system_version: "2.0.0"
status: draft
framework: "Tailwind CSS v4 + shadcn/ui (base-nova)"
design_variance: 5
motion_intensity: 4
visual_density: 4
mode: operate
primary_design_system: "impeccable v4.0.1"

# ── Tokens ──────────────────────────────────────────────

# Typography
font_heading: "Geist"
font_body: "Geist"
font_mono: "Geist Mono"
type_scale_ratio: 1.2
tabular_figures: true

# Color — Light
color_primary_50: "#EEF2FF"
color_primary_100: "#E0E7FF"
color_primary_400: "#818CF8"
color_primary_500: "#6366F1"
color_primary_600: "#4F46E5"
color_primary_700: "#4338CA"
color_primary_gradient: "linear-gradient(135deg, #818CF8, #6366F1, #4F46E5)"

color_success_50: "#ECFDF5"
color_success_500: "#10B981"
color_danger_50: "#FFF1F2"
color_danger_500: "#F43F5E"
color_warning_50: "#FFFBEB"
color_warning_500: "#F59E0B"

color_bg_app: "#F8FAFC"
color_surface: "#FFFFFF"
color_surface_secondary: "#F1F5F9"
color_border_subtle: "#E2E8F0"
color_text_primary: "#0F172A"
color_text_secondary: "#475569"
color_text_muted: "#94A3B8"
color_text_inverse: "#FFFFFF"

# Color — Dark
color_bg_app_dark: "#0B1120"
color_surface_dark: "#1E293B"
color_border_subtle_dark: "#334155"
color_text_primary_dark: "#F8FAFC"
color_text_muted_dark: "#64748B"

# Spacing (8px base)
space_xs: 4   # gap-1
space_sm: 8   # gap-2
space_md: 16  # gap-4
space_lg: 24  # gap-6
space_xl: 32  # gap-8
space_2xl: 48 # gap-12

# Shapes
radius_sm: 8   # rounded-lg
radius_md: 12  # rounded-xl
radius_lg: 16  # rounded-2xl
radius_xl: 24  # rounded-3xl

# Shadow
shadow_color: "rgba(99,102,241,0.10)"  # indigo tint
shadow_xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
shadow_sm: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
shadow_md: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
shadow_lg: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
shadow_xl: "0 25px 50px -12px rgb(0 0 0 / 0.25)"

# Motion (impeccable Operate defaults)
motion_duration_default: 200
motion_duration_enter: 300
motion_duration_exit: 250
motion_easing_default: "ease-out"
motion_easing_enter: [0.16, 1, 0.3, 1]
motion_easing_exit: [0.32, 0, 0.67, 0]
motion_press_scale: 0.97
motion_card_tap_scale: 0.98
---

# Trip Finance Dashboard — Design Specification

**Design System:** impeccable v4.0.1 (Operate mode)
**Skill References:** `impeccable` → `design-taste-frontend` → `ui-ux-pro-max`

---

# 1. Design Direction

**Mode:** Operate (dashboard/app UI). Per impeccable's `operate.md`: restrained color, one font family, fixed type scale, motion conveys state not decoration, familiarity is a feature.

**Three Dials (design-taste-frontend):**

| Dial | Value | Rationale |
|------|-------|-----------|
| DESIGN_VARIANCE | 5 | Symmetrical card layout, predictable grid, no chaotic asymmetry. Financial data needs clarity. |
| MOTION_INTENSITY | 4 | Subtle micro-interactions (entry fade, press scale, number tick). No scroll-hijack or heavy GSAP. |
| VISUAL_DENSITY | 4 | Airy spacing, generous padding, one data point per card. |

---

# 2. Typography

## 2.1 Font Stack

| Role | Font | Source |
|------|------|--------|
| Headings | Geist (sans) | `next/font` |
| Body | Geist (sans) | Same as headings — one family per impeccable Operate mode |
| Numbers/Mono | Geist Mono | Financial data, tabular figures |

## 2.2 Type Scale (ratio 1.2)

| Token | Size | Weight | Line Ht | Tracking | Usage |
|-------|------|--------|---------|----------|-------|
| `display-xl` | 36px / text-4xl | 600 | 1.1 | -0.02em | Main balance |
| `heading-lg` | 20px / text-xl | 600 | 1.25 | -0.01em | Section titles |
| `heading-md` | 16px / text-base | 600 | 1.4 | normal | Card titles |
| `body` | 14px / text-sm | 400 | 1.5 | normal | Body text |
| `body-mono` | 14px / text-sm | 500 | 1.5 | normal | Money amounts |
| `caption` | 12px / text-xs | 400 | 1.5 | normal | Timestamps, labels |
| `caption-mono` | 12px / text-xs | 500 | 1.5 | normal | Small amounts |
| `micro` | 11px | 500 | 1.3 | 0.06em | Badges, eyebrow |

## 2.3 Number Formatting

- All monetary values use **tabular figures** (Geist Mono) for vertical alignment.
- Thousands separator for amounts ≥ 1,000.
- Currency prefix (Rp) same weight as number.

---

# 3. Color Palette

Per impeccable Operate mode: restrained palette, accent reserved for primary actions, semantic colors for income/expense only.

## 3.1 Primary — Soft Indigo

| Token | Hex | Usage |
|-------|-----|-------|
| `primary-50` | `#EEF2FF` | Badge backgrounds, icon backgrounds |
| `primary-100` | `#E0E7FF` | Light hover states |
| `primary-400` | `#818CF8` | Secondary accents, decorative |
| `primary-500` | `#6366F1` | Primary buttons, active states |
| `primary-600` | `#4F46E5` | Button hover, link text |
| `primary-700` | `#4338CA` | Pressed states |

**Gradient:** `bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600`

## 3.2 Semantic

| Token | Hex | Usage |
|-------|-----|-------|
| `success-50`/`-500` | `#ECFDF5` / `#10B981` | Income icon bg / income text |
| `danger-50`/`-500` | `#FFF1F2` / `#F43F5E` | Expense icon bg / expense text |
| `warning-50`/`-500` | `#FFFBEB` / `#F59E0B` | Alert bg / warning text |

## 3.3 Neutrals — Slate

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-app` | `#F8FAFC` (slate-50) | Page background |
| `surface` | `#FFFFFF` | Cards |
| `surface-secondary` | `#F1F5F9` (slate-100) | Secondary card, input bg |
| `border-subtle` | `#E2E8F0` (slate-200) | Dividers, borders |
| `text-primary` | `#0F172A` (slate-900) | Main text |
| `text-secondary` | `#475569` (slate-600) | Body text |
| `text-muted` | `#94A3B8` (slate-400) | Captions, placeholders |
| `text-inverse` | `#FFFFFF` | Text on gradient bg |

## 3.4 Dark Mode

| Token | Light | Dark |
|-------|-------|------|
| `bg-app` | `#F8FAFC` | `#0B1120` (slate-950) |
| `surface` | `#FFFFFF` | `#1E293B` (slate-800) |
| `text-primary` | `#0F172A` | `#F8FAFC` |
| `text-muted` | `#94A3B8` | `#64748B` |
| `border-subtle` | `#E2E8F0` | `#334155` |

---

# 4. Shapes & Elevation

## 4.1 Border Radius

| Token | Value | Applied |
|-------|-------|---------|
| `radius-sm` | 8px (rounded-lg) | Badges, small icons |
| `radius-md` | 12px (rounded-xl) | Buttons, inputs |
| `radius-lg` | 16px (rounded-2xl) | Cards, modals |
| `radius-xl` | 24px (rounded-3xl) | Summary card, FAB |

## 4.2 Shadows (indigo-tinted)

| Token | Tailwind | Usage |
|-------|----------|-------|
| `shadow-xs` | `shadow-sm` | Inputs, subtle dividers |
| `shadow-sm` | `shadow-md` | Cards, menu items |
| `shadow-md` | `shadow-lg shadow-indigo-500/10` | Summary card (tinted) |
| `shadow-lg` | `shadow-xl` | Modals, drawers |
| `shadow-xl` | `shadow-2xl` | FAB, elevated |

---

# 5. Spacing (8px base)

| Token | Value | Usage |
|-------|-------|-------|
| `space-xs` | 4px (gap-1) | Inline icon-text gap |
| `space-sm` | 8px (gap-2) | Card internal inset |
| `space-md` | 16px (gap-4) | Section padding, card grid |
| `space-lg` | 24px (gap-6) | Between sections |
| `space-xl` | 32px (gap-8) | Page content padding |
| `space-2xl` | 48px (gap-12) | Major section separation |

---

# 6. Layout Structure

Mobile-only. No breakpoints. Full viewport width (`w-full px-4`). 375px–430px viewport.

```
┌─────────────────────────────────────┐
│            HEADER                    │
│  Trip Name               ● LIVE     │
├─────────────────────────────────────┤
│                                     │
│        SUMMARY CARD                 │
│  ┌─────────────────────────────┐    │
│  │     Sisa Dana Acara         │    │
│  │       Rp 12.450.000         │    │
│  │  ─────────────────────────  │    │
│  │  Total Masuk  Total Keluar  │    │
│  │  Rp 15jt       Rp 2,55jt   │    │
│  └─────────────────────────────┘    │
│                                     │
│  ── Pocket ─────────────────────    │
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ Dana │ │Makan │ │Snack │   ←    │
│  │Utama │ │      │ │      │ scroll │
│  └──────┘ └──────┘ └──────┘        │
│                                     │
│  ── Uang Member ───────────────     │
│                                     │
│  ┌────────────────────────────┐     │
│  │ ◉ Zapp     Setor: 5jt      │     │
│  │            Sisa: 3,2jt     │     │
│  ├────────────────────────────┤     │
│  │ ◉ Fulan    Setor: 5jt      │     │
│  │            Sisa: 1,8jt     │     │
│  └────────────────────────────┘     │
│                                     │
│  ── Transaksi Terbaru ──────────    │
│                                     │
│  ┌────────────────────────────┐     │
│  │ 🔴 Makan Bajawa     -350k  │     │
│  │ 🟢 Setor Zapp      +5jt   │     │
│  │ 🔴 Kopi Flores       -50k  │     │
│  └────────────────────────────┘     │
│                                     │
│           [Admin: FAB]              │
└─────────────────────────────────────┘
```

---

# 7. Component Specifications

## 7.1 Header

- **Background:** Transparent → `bg-white/80 backdrop-blur-md` on scroll (sticky)
- **Content:** Trip name (left), LIVE badge + admin bell icon (right)
- **LIVE badge:** `bg-emerald-50 text-emerald-600 text-micro font-medium px-2 py-0.5 rounded-full` with pulse

## 7.2 Summary Card

- **Background:** `bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600`
- **Radius:** `rounded-2xl` (16px), padding: `p-6`, text: `text-inverse`
- **Balance:** `text-4xl font-semibold tracking-tight font-mono`
- **Divider:** `border-t border-white/20`
- **Bottom row:** Two columns — "Total Masuk" (success-300) / "Total Keluar" (rose-300)
- **State-rich:** per impeccable, card has defined hover/focus/active states

## 7.3 Pocket Section (Horizontal Scroll)

- **Container:** `overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4`
- **Cards:** `min-w-[160px] snap-start rounded-xl p-4 bg-white shadow-sm border border-slate-100`
- **First card (Dana Utama):** `bg-gradient-to-br from-primary-50 to-primary-100`
- **Others:** White with `border-l-4 border-l-primary-400`

## 7.4 Member List

- **Row:** `flex items-center gap-3 py-3 border-b border-slate-100` (min 44px touch target)
- **Avatar:** `w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold`, pastel bg from name hash
- **Name:** `text-sm font-medium text-slate-900`
- **Amounts:** "Setoran: Rp X" (text-muted) / "Sisa: Rp Y" (success-600 if > 0)

### Avatar Pastel Palette

```
bg-rose-50  text-rose-600  | bg-sky-50   text-sky-600
bg-emerald-50 text-emerald-600 | bg-amber-50 text-amber-600
bg-violet-50 text-violet-600 | bg-cyan-50  text-cyan-600
bg-orange-50 text-orange-600 | bg-teal-50  text-teal-600
```

## 7.5 Transaction List

- **Row:** `flex items-center gap-3 py-3 border-b border-slate-100`
- **Icon box:** `w-9 h-9 rounded-xl flex items-center justify-center` — income (success-50/success-600), expense (danger-50/danger-600)
- **Description:** `text-sm font-medium text-slate-900`
- **Amount:** `text-sm font-mono` success-600 / danger-600
- **Timestamp:** `text-xs text-slate-400`

## 7.6 Admin Grid Menu

- **Layout:** `grid grid-cols-3 gap-3`
- **Card:** `flex flex-col items-center gap-2 p-4 rounded-xl bg-white shadow-sm border border-slate-100`
- **Icon:** `w-10 h-10 rounded-xl flex items-center justify-center text-xl`
- **Label:** `text-xs font-medium text-slate-600`

| Menu | Icon | Icon BG |
|------|------|---------|
| Tambah Uang | `wallet` | `bg-emerald-50 text-emerald-600` |
| Belanja | `shopping-cart` | `bg-rose-50 text-rose-600` |
| Anggota | `users` | `bg-sky-50 text-sky-600` |
| Pocket | `layers` | `bg-violet-50 text-violet-600` |
| Pengaturan | `settings` | `bg-slate-100 text-slate-600` |
| Laporan | `file-text` | `bg-amber-50 text-amber-600` |

## 7.7 Bottom Navigation (Admin)

- **Container:** `fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-xl border-t border-slate-200/50`
- **Layout:** `flex items-center justify-around px-6 py-2`
- **Items:** Icon + label, `text-xs text-slate-400` (active: `text-primary-500`)
- **FAB (center):** `w-14 h-14 -mt-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg shadow-primary-500/20 text-white flex items-center justify-center`

## 7.8 Drawer / Modal (Admin CRUD)

- **Drawer:** `fixed inset-x-0 bottom-0 rounded-t-2xl bg-white shadow-xl`, drag handle `w-10 h-1 bg-slate-300 rounded-full mx-auto mt-3`
- **Form (ui-ux-pro-max §8):**
  - Label above input
  - Input: `rounded-xl border border-slate-200 px-4 py-3 text-base focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500`
  - Amount: `text-2xl font-mono text-center`
  - Submit: `w-full rounded-xl bg-primary-500 text-white py-3 font-medium`
  - Error: `text-xs text-danger-500 mt-1` below field

---

# 8. States

Every data component implements 3 states:

## 8.1 Loading

- **Summary:** Shimmer placeholder matching card shape
- **Lists:** 3 skeleton rows with `animate-pulse bg-slate-100 rounded-lg`
- **Pocket:** 3 skeleton cards `w-[160px] h-[100px] rounded-xl bg-slate-100 animate-pulse`

## 8.2 Empty

- **Members:** icon + "Belum ada anggota. Tambah anggota pertama." + CTA (admin)
- **Pockets:** "Belum ada pocket. Buat pocket baru." + CTA
- **Transactions:** "Belum ada transaksi."

## 8.3 Error

- **Toast:** `bg-danger-50 border border-danger-200 text-danger-700 rounded-xl px-4 py-3` + dismiss
- **Inline (form):** Red text below field, border → `border-danger-500`
- **Section error:** Retry button + "Gagal memuat data."

---

# 9. Micro-Interactions

Per impeccable Operate: 150–250ms transitions, motion conveys state not decoration.

| Element | Interaction | Implementation |
|---------|-------------|----------------|
| Button press | `scale-[0.97]` | `whileTap={{ scale: 0.97 }}` (motion/react) |
| Card tap | `scale-[0.98]` | `whileTap={{ scale: 0.98 }}` |
| Balance change | Number tick | Animate old → new, 300ms ease-out |
| Modal enter | Slide up + fade | `initial={{ y: "100%" }} animate={{ y: 0 }}` (300ms) |
| Modal exit | Slide down | `exit={{ y: "100%" }}` (250ms) |
| SSE live badge | Gentle pulse | CSS `animate-pulse` on dot |
| Skeleton | Shimmer | CSS `animate-pulse` |
| Avatar tap | Subtle scale | `active:scale-95` |
| Bottom nav active | Underline indicator | `border-t-2 border-primary-500` |

All animations respect `prefers-reduced-motion`.

---

# 10. Mobile-Only Constraint

| Rule | Detail |
|------|--------|
| Viewport | Full width (`w-full px-4`), no max-width container |
| Breakpoints | None. No `sm:`, `md:`, `lg:` variants. |
| Testing | Real mobile devices only (375px–430px) |
| Desktop | Not supported |

---

# 11. Accessibility Checklist

- [ ] All touch targets ≥ 44×44px
- [ ] Color contrast ≥ 4.5:1 (body), ≥ 3:1 (large text)
- [ ] Icon-only buttons have `aria-label`
- [ ] Form labels visible above inputs (not placeholder-only)
- [ ] Focus ring: `focus-visible:ring-2 focus-visible:ring-primary-500`
- [ ] Keyboard nav: tab order matches visual order
- [ ] `prefers-reduced-motion` respected
- [ ] Error messages linked to inputs via `aria-describedby`
- [ ] Live regions (`aria-live="polite"`) for SSE updates
