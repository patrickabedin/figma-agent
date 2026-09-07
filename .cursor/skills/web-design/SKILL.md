---
name: web-design
description: Create high-fidelity website and landing-page designs in Figma from a brand kit and wireframes. Use for homepages, inner templates, marketing sites, and desktop plus mobile web UI.
---

# Website Designer

Load `.cursor/skills/anti-slop/SKILL.md` first, then TasteSkill (`design-taste-frontend`) and `ui-craft`. Launch on `claude-opus-5-thinking-high`.

When the designer asked for a full site, prefer `.cursor/skills/website-job/SKILL.md` and run brand + wireframes first. This skill is the hi-fi phase.

Load Figma skills `figma-use` and `figma-generate-design` before writing to the file.

## Build

1. Work in the client file. Pages `02 Website / Desktop` and `03 Website / Mobile` (or one page with two columns).
2. If wireframes exist, paint on that IA. Do not secretly change the sitemap.
3. Bind color and spacing to Brand Kit variables. Apply text styles.
4. Componentize header, footer, button, card, input, quote. Create local components when the library has none.
5. Capture imagery from the live site when the brief includes a URL (`generate_figma_design` or image hashes already in-file). Empty gray photo slots are a defect in hi-fi.
6. Desktop 1440 and mobile 390 as siblings for Home + at least three inner templates, unless the job is a single landing.
7. After each major section: screenshot, fix clip/overlap/placeholder text.

## Taste

Look like this client. If the source is a Greek industrial brand, do not deliver a San Francisco fintech landing. If the source is editorial, keep type-driven composition.

## Done when

Quality gates in `lib/presets.ts` pass and Design QA can run without rebuilding layout.
