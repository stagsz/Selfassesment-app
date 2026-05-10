# Helix QMS — Web App UI Kit

A click-thru recreation of the Helix QMS audit-management web app, built in plain JSX components against the design system. Use these as a starting point for any prototype or mock that lives inside the app shell.

## Screens included
- **Dashboard** — KPIs, active assessments, NCR queue
- **Assessments list** — table view with status filters
- **Assessment detail** (Cyclic Harmony) — crowned process flow, current section, question cards
- **Non-conformities** — NCR list with severity + status

## Components
- `AppShell.jsx` — sidebar + header + content slot
- `Sidebar.jsx` — slate-900 nav with active-pill state
- `TopBar.jsx` — breadcrumbs, search, save badge, avatar
- `StatCard.jsx`, `Badge.jsx`, `Button.jsx`, `ScoreButtons.jsx`
- `CrownedCard.jsx`, `ProcessFlow.jsx`, `QuestionCard.jsx`
- `AssessmentsTable.jsx`, `NCRRow.jsx`

Open `index.html` to drive the prototype: log in → dashboard → assessment → score a question.

## Sources mirrored
- `frontend/src/components/cyclic-harmony/*` — process flow, crowned cards, question cards
- `frontend/src/components/layout/{sidebar,header}.tsx` — app chrome
- `frontend/src/components/ui/*` — primitives (button, badge, score-button, progress-bar)
- `frontend/src/app/(dashboard)/**` — page layouts
