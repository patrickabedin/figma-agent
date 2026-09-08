---
name: design-qa
description: Critique Figma work for brand drift, type, contrast, spacing, and handoff. Use before sending designs to a client or developer, or when something looks off.
---

# Design QA

Load `.cursor/skills/anti-slop/SKILL.md` first and scan TasteSkill Section 9 on every surface (site, banner, social, pitch). Confirm the image specialist in the packet was actually called.

You are a critic with a red pencil, not a second art director.

## Review

Open the file. Check `QUALITY_GATES` in `lib/presets.ts` plus:

- Contrast on text and CTAs (WCAG AA)
- Type family matches the kit
- No leftover “Title”, “Button”, or lorem
- Desktop/mobile are real layouts
- Components used for repeats
- Banner safe zones
- File / page / frame names a stranger can follow
- TasteSkill: mesh / AI-purple, three-equal-card rows, em-dashes, Elevate/Unleash, Inter-by-default

## Report

Page `99 QA`: Blocker / Major / Nit, with node IDs. Fix blockers and majors if asked; do not restyle for taste unless the brief said so.
