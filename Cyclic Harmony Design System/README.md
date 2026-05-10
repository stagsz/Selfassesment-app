# Cyclic Harmony Design System

The visual language for **Helix QMS** — an ISO 9001:2015 Self-Assessment & Audit Management application. Crowned cards, sage-green earth tones, dotted-arc connectors, and a cyclic process metaphor that reframes compliance work as a living journey instead of a checklist.

> **Brand premise:** Quality work breathes in cycles, not corners. The system trades sharp corporate edges for organic arcs and grounded greens, so heavy regulatory tasks feel calm and continuous.

---

## Sources

This system was reverse-engineered from a single source repository:

- **GitHub:** `stagsz/Selfassesment-app` (branch `main`, commit `55355b8b`)
  - `frontend/tailwind.config.ts` — full token set (sage, surface, success/warning/danger, semantic CSS-vars)
  - `frontend/src/app/globals.css` — shadcn-style runtime tokens
  - `frontend/src/components/cyclic-harmony/*` — `CrownedCard`, `ProcessStageCard`, `ProgressConnector`, `NavigationButtons`, `SectionFlowNavigation`, `SaveStatusBadge`
  - `frontend/src/components/cyclic-harmony/QUICK_REFERENCE.md` — token cheat-sheet
  - `frontend/src/components/ui/*` — `Button`, `Card`, `Input`, `ScoreButton`
  - `frontend/src/components/layout/sidebar.tsx`, `header.tsx`
  - `canvas_phisoph.md` — written manifesto ("Cyclic Harmony Philosophy")
  - `frontend/src/app/(dashboard)/dashboard/page.tsx`, `assessments/[id]/audit-harmony/page.tsx`
- **Reference image:** `design-philosophy.png` (older blue-based exploration — superseded by the sage palette in code; kept for archive only)

The codebase is the source of truth. Where this README and the code disagree, the code wins.

---

## Index

```
.
├── README.md                ← you are here
├── SKILL.md                 ← agent skill manifest
├── colors_and_type.css      ← CSS variables for color + type
├── design-philosophy.png    ← legacy blue exploration (archive)
├── assets/                  ← logos, illustrations, icon references
├── fonts/                   ← Inter + Poppins (Google Fonts links)
├── preview/                 ← Design-system tab cards (one per token cluster)
├── ui_kits/
│   └── helix-qms/           ← The web app — primary product surface
│       ├── README.md
│       ├── index.html       ← interactive click-thru prototype
│       └── *.jsx            ← Sidebar, Header, CrownedCard, ProcessStageCard, …
└── frontend/                ← imported source files (read-only reference)
```

---

## Brand at a glance

| | |
|---|---|
| **Product** | Helix QMS — ISO 9001:2015 self-assessment & audit management |
| **Audience** | System admins, quality managers, internal auditors, department heads, viewers |
| **Aesthetic** | Earth-toned, organic, breathing — sage greens, beige neutrals, crowned arcs |
| **Voice** | Calm, instructional, professional. Direct second-person ("you"). No marketing fluff. |
| **Type** | Poppins for display & headings; Inter for UI & body |
| **Iconography** | Lucide (uniform 2px stroke, calm geometry) |

---

## Content fundamentals

The product copy is **functional and instructional** — built for auditors mid-task, not marketers. Tone is calm, factual, second-person, and free of jargon-padding.

**Voice rules pulled from the codebase:**

- **Second-person ("you"), never first-person plural ("we").** Every onboarding and dashboard line addresses the user directly: *"Sign in to your account"*, *"Welcome back!"*, *"You have been assigned as Lead Auditor"*.
- **Sentence case for titles, body, and buttons.** Title Case appears only in proper nouns ("ISO 9001:2015", "Quality Manager"). Buttons read *"New Assessment"*, *"Save"*, *"View all notifications"* — short, capitalised first word.
- **Imperative verbs for actions.** *"Conduct an Assessment"*, *"Add Evidence"*, *"Complete"*, *"Generate"*. Never *"Click here to…"*.
- **Numbers and metrics are loud, units are quiet.** *"72.1%"*, *"18 Compliant"*, *"3 Critical"* — the figure dominates, the unit is a small grey caption underneath.
- **No emoji. No exclamation marks** (except a single warm onboarding "Welcome back!"). The product is regulatory; tone stays composed.
- **No marketing adjectives.** Drop *"powerful"*, *"seamless"*, *"intuitive"*. Replace with concrete behaviour: *"Auto-save: every 30 seconds"*, *"Tracks corrective actions through completion and verification"*.
- **Status labels are single words or two-word phrases.** `Draft`, `In Progress`, `Under Review`, `Completed`, `Archived`, `Open`, `Verified`. Always uppercase-first, never ALL-CAPS in UI (ALL-CAPS reserved for tiny eyebrow labels — `HEADING 1 - 42PX BOLD`).
- **Empty states explain the next action.** *"No assessments yet — create your first to start tracking compliance."*
- **Errors are kind, not blamey.** *"Failed to save: <reason>"*, *"Justification is required for non-compliant scores"*.

**Numerical scoring vocabulary (memorise this — it's the spine of the product):**

| Score | Label | Use |
|---|---|---|
| 0 | Not Applicable | Item doesn't apply |
| 1 | Non-Compliant | No evidence, not addressed |
| 2 | Initial | Awareness exists, no formal implementation |
| 3 | Developing | Partially implemented, inconsistent |
| 4 | Established | Fully implemented, consistent application |
| 5 | Optimizing | Exceeds requirements, continual improvement |

(Older copy still references a 1–3 traffic-light scale; the current code is 0–5.)

**Domain words to keep:** *audit, assessment, non-conformity (NCR), corrective action, evidence, root cause, compliance score, section, requirement, surveillance, certification.*

---

## Visual foundations

### Color
- **Primary:** Sage green ramp `#f4f7f3 → #2e3e2a`. The 600 (`#557349`) is the primary action; 400 (`#8baa7e`) is the focus ring; 100 (`#e6ede4`) is sidebar text on dark.
- **Surface:** Warm-neutral ramp `#fafaf9 → #252523`. Backgrounds, borders, dividers. No pure white except cards.
- **Harmony aliases (legacy / explicit):** `harmony-sage #8BAA7E`, `harmony-lime #A8C499`, `harmony-olive #5C7C52`, `harmony-forest #3D5A3A`, `harmony-warm-white #F5F5F0`, `harmony-light-beige #E8E8E0`, `harmony-warm-gray #D8D8D0`, `harmony-dark-text #333333`. These name the **state ramp**: pending → in-progress → active → completed.
- **Semantic:** `success` (`#23a663`), `warning` (`#f99d07`), `danger` (`#e51d1d`), `info` (`#3b9af6`), `sky` accent (`#0070c9`).
- **Score chips** lean lighter than semantic: `red-50/30`, `amber-50/30`, `green-50/30`, etc., with a 4px coloured left border on the question card.
- The **sidebar** is the only dark surface (`slate-900` / `#0f172a`) — every other surface is light cream or white. This anchors the layout.

### Type
- **Display:** **Poppins** (600/700) — page titles, card titles, stage numbers. Slight negative tracking (`-0.01em`).
- **UI / body:** **Inter** (400/500/600) — everything else. `font-feature-settings: "rlig" 1, "calt" 1` for ligatures.
- **Generous line-heights:** `leading-generous` = 1.6 for body, `leading-relaxed-plus` = 1.75 for long-form copy. Cards always breathe.
- Heading scale: H1 42px bold · H2 24px semibold · H3 20px semibold · Body 16px regular · Caption 12–13px.

### Crowns, corners, cards
- The **crowned card** is the brand signature: a flat rounded rectangle (`rounded-crown` = 24px) with a coloured semi-circle "crown" sitting on top, clipped via `clip-path: ellipse(50% 100% at 50% 0%)`. Crown height defaults to 45% of card width but can be tweaked (15–60%).
- **Radii:** `lg` 12px (inputs, small buttons), `xl` 16px (most buttons, badges), `2xl` 16–24px (cards, score buttons), `card` 16px, `crown` 24px, `crown-lg` 32px, `pill` 9999px.
- **Standard card padding:** 32px (`p-8`). Never less than 24px.

### Shadows / elevation
Material-inspired ramp, low-key:
- `elevation-1` thin lift `0 1px 3px rgba(0,0,0,.08)`
- `elevation-2` resting card `0 4px 6px -1px rgba(0,0,0,.08)`
- `elevation-3` hover `0 10px 15px -3px rgba(0,0,0,.08)`
- `elevation-4` modal/popover `0 20px 25px -5px rgba(0,0,0,.08)`
- `crown` (`0 4px 12px rgba(0,0,0,.08)`) — the brand-default card shadow
- `sage-glow` (`0 4px 14px rgba(85,115,73,.25)`) — coloured shadow for primary CTAs only
- No inner shadows. No drop-shadow drama.

### Spacing
- 4px grid. Common steps: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64.
- Page gutters: 16px (mobile) → 32px (desktop).
- Section gaps: 24px between cards, 32–48px between major page regions.

### Backgrounds
- **Surface neutral cream** (`#fafaf9` or `#f5f5f0`) for app body. Never pure `#fff`.
- Auth screens add **two soft blurred orbs** (`bg-emerald-100/50 blur-3xl` top-right, `bg-sky-100/40 blur-3xl` bottom-left) — the *only* place blur is used decoratively.
- No repeating patterns, no textures, no gradients-as-art. Gradients appear sparingly: lime→sage on the primary "next" button, lime→sage→olive on active stage crowns.
- No full-bleed photography in the current product.

### Animation
- **Calm, 200–500ms, ease-out.** Never bouncy.
- Named keyframes: `lift` (translateY -4px, 300ms), `scale-subtle` (1.02, 200ms), `fade-in` (400ms), `slide-up` (translateY 20px → 0 + opacity, 500ms), `progress-flow` (0.4 ↔ 1 opacity, 2s loop), `enter` (4px slide + fade, 200ms).
- Staggered list reveals use `animationDelay: i * 50–100ms`.

### Hover / press / focus
- **Hover:** lift 1–4px (`-translate-y-1`), deepen shadow `crown → crown-hover`, sometimes a subtle tint shift.
- **Press / active:** `scale-[0.98]` on buttons; `shadow-crown-active` for cards.
- **Focus:** double-ring — `outline: 0 0 0 2px #fff, 0 0 0 4px #8baa7e` (white halo + sage ring). Always visible on `:focus-visible`.
- **Disabled:** `opacity 0.5` + `cursor-not-allowed`. Stage cards add `grayscale`.

### Borders
- **Default border:** `#ddddd9` (surface-300). 1px.
- **Coloured-edge cards** (question cards, alerts) use `border-l-4` with a semantic colour and the rest of the border at `#ddddd9` — the brand's preferred way to denote status without filling the card.
- **Avoid colour-only-left-border cards as a styling trope** outside this question/alert pattern (the system uses it intentionally with score colours, not as default chrome).

### Transparency / blur
- Glassmorphism only on the **fixed top header** (`bg-white/80 backdrop-blur-md`).
- Score-state cards use `/30` alpha tints (`bg-red-50/30`).
- Auth screen orbs (above) — 50% / 40% alpha + 3xl blur.
- Otherwise, opaque.

### Imagery vibe
- Currently no photography in product. If illustrations are added, the philosophy demands: warm, organic, low-saturation greens/beiges, no harsh edges, no neon. Hand-drawn feel preferred over flat-vector tech.

### Layout rules
- Sidebar collapses 64px ↔ 256px. Header is 64px tall, fixed, glassy. Main content max-width 1600px on audit pages, 1280px elsewhere.
- Horizontal "process flow" layouts (the audit journey) are sacred — each section card is equal width, connected by dotted arcs. No hierarchy of size, only sequence.
- Reading direction is left-to-right time. Numbers (`01`, `02`, `03`) anchor each stage.

---

## Iconography

- **Primary library:** [Lucide](https://lucide.dev) (`lucide-react`). Uniform 2px stroke, rounded line-caps, calm geometry — perfectly aligned with the philosophy. Used at 16, 18, 20, and 56 (large feature icons on stage cards).
- **Loading:** Lucide icons via CDN: `https://unpkg.com/lucide-static@latest/font/lucide.css` works for static HTML; for React prototypes, use the per-icon SVG approach in `assets/icons.html`.
- **No emoji.** The product is regulatory; emoji appear nowhere in the codebase.
- **No unicode glyphs as icons.** All status indicators use either Lucide icons or coloured dots.
- **No bespoke SVG icons** beyond the brand `Shield` mark in the sidebar logo and the dotted-arc connector in `ProgressConnector`. The connector is the one piece of custom SVG worth preserving — see `assets/progress-connector.svg`.
- **Color usage:** icons inherit text colour by default. Status icons take semantic colour (red/amber/green/blue) at 16–20px in chips and badges. Icon backgrounds (`bg-emerald-100`, `bg-red-50`) appear in stat cards.

If a needed icon is missing from Lucide, substitute the closest match and document it in the prototype file. Do not hand-roll new SVGs.

---

## Index — what's in this folder

| Path | What's there |
|---|---|
| `README.md` | This file — brand context, content fundamentals, visual foundations |
| `SKILL.md` | Agent-Skills entry-point so this folder works as a Claude Code skill |
| `colors_and_type.css` | All design tokens (colors, type, spacing, radii, shadows) as CSS variables, plus semantic element styles |
| `assets/` | Brand visual assets (icons, connector SVGs, etc.) |
| `preview/` | Per-token preview cards rendered in the Design System tab |
| `ui_kits/helix-qms/` | Click-thru web app UI kit — sidebar shell, dashboard, assessment flow, NCR queue. Open `index.html` |

## When to use this system

- ✅ Internal-tools, regulatory, or compliance dashboards that need to feel calm and competent.
- ✅ Multi-step processes where progress, sequence, and continuity matter.
- ✅ Audit, assessment, review, or scoring interfaces.
- ❌ Consumer-facing marketing sites (use a different system).
- ❌ Dense data tables with no narrative — the cyclic-harmony layout privileges flow over density.

---

## Caveats / known gaps

- The reference `design-philosophy.png` shows a **blue** palette; the current code is **sage green**. Treat the image as historical only.
- No dedicated logo mark exists in the repo — the sidebar uses Lucide's `Shield` icon as a placeholder. A real wordmark/logo is needed.
- Photography style is undefined; if added, follow the principles in *Visual foundations → Imagery vibe*.
- Font files are not vendored — the system links to Google Fonts (Inter, Poppins). If working offline, vendor the .woff2 files into `fonts/`.
