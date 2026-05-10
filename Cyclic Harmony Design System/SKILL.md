---
name: helix-qms-design
description: Use this skill to generate well-branded interfaces and assets for Helix QMS (an ISO 9001:2015 self-assessment / audit-management web app), either for production or throwaway prototypes/mocks. Contains essential design guidelines — colors, type, fonts, assets, and a UI kit of components — for prototyping audit dashboards, assessment wizards, NCR workflows, and reports.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy assets out and create static HTML files for the user to view. The components in `ui_kits/helix-qms/` are plain JSX with no build step — load them via `<script type="text/babel" src="...jsx">` after React + Babel.

If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand. The colors, type, spacing, and elevation tokens in `colors_and_type.css` mirror the Tailwind theme used in the source app and will plug into either a CSS-vars or Tailwind setup.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

**Core motifs to honor**
- The "crowned card" — a white card with an elliptical sage-green gradient cap, used for ISO process stages and key navigation moments. Don't replace it with a flat header.
- Sage primary (`#557349`) over warm-neutral surfaces; never bluish-purple.
- Lucide icons, 2px stroke. No emoji in product UI.
- Calm, instructional copy. Direct "you". Sentence-case verbs on buttons.
