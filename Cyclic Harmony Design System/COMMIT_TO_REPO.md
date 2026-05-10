# Committing this design system into stagsz/Selfassesment-app

This zip contains the full Cyclic Harmony design system — tokens, preview cards, brand docs, and a click-thru UI kit recreating the live app.

## Suggested layout

Drop the contents into a new top-level folder so it doesn't collide with the app code:

```
Selfassesment-app/
├── design-system/          ← unzip the contents of this archive here
│   ├── README.md
│   ├── SKILL.md
│   ├── colors_and_type.css
│   ├── assets/
│   ├── preview/
│   └── ui_kits/helix-qms/
├── frontend/
├── backend/
└── …
```

## Suggested commit / PR

```bash
cd Selfassesment-app
mkdir -p design-system
# unzip the archive contents into design-system/
git checkout -b design-system/cyclic-harmony
git add design-system/
git commit -m "design-system: add Cyclic Harmony tokens, preview cards, and Helix QMS UI kit"
git push -u origin design-system/cyclic-harmony
```

Open the PR with the body pointing at `design-system/README.md` and `design-system/SKILL.md` for entry points.

## Notes for reviewers

- **Tokens mirror Tailwind theme.** `colors_and_type.css` exposes the same scale that `tailwind.config.js` already references — adopt as either CSS variables or a Tailwind plugin.
- **`SKILL.md` is dual-purpose.** It works as a regular markdown index and as a Claude Code skill manifest if you ever wire one up.
- **UI kit is prototype-grade.** `ui_kits/helix-qms/` is plain JSX over CDN React/Babel — no build step. Useful for design review and as a reference, not for production.
- **Logo and font files are placeholders.** The repo does not yet ship a brand mark; the kit reuses Lucide's `Shield`. Inter + Poppins are loaded from Google Fonts.

## Files of interest

| File | Purpose |
|---|---|
| `README.md` | Brand context, content fundamentals, visual foundations |
| `SKILL.md` | Skill manifest / entry point |
| `colors_and_type.css` | All tokens as CSS variables |
| `preview/*.html` | One-card-per-token specimens |
| `ui_kits/helix-qms/index.html` | Click-thru recreation of the app |
