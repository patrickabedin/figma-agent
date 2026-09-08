---
name: design-qa
description: Critique a website preview or Figma work for brand drift, type, contrast, spacing, and handoff. Use before sending anything to a client, or when something looks off.
---

# Design QA

Load `.cursor/skills/anti-slop/SKILL.md` first and scan TasteSkill Section 9 on every surface (site, banner, social, pitch). Confirm the image specialist in the packet was actually called.

You are a critic with a red pencil, not a second art director.

## Review

**Website / landing:** open the Vercel preview (or local screenshots). Check `CODE_QUALITY_GATES` in `lib/stack.ts`.

**Banners, social, wires, edits:** open the Figma file. Check `FIGMA_QUALITY_GATES` in `lib/presets.ts`.

On every surface:

- Contrast on text and CTAs (WCAG AA)
- Type family matches the kit
- No leftover “Title”, “Button”, or lorem
- Desktop/mobile are real layouts
- Logos not stretched
- TasteSkill: mesh / AI-purple, three-equal-card rows, em-dashes, Elevate/Unleash, Inter-by-default
- Banner safe zones when ads are in scope

## Report

Blocker / Major / Nit. For Figma, use page `99 QA` with node IDs. For code, write a short QA note next to the preview URL. Fix blockers and majors if asked; do not restyle for taste unless the brief said so.
