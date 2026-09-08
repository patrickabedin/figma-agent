---
name: web-design
description: Implement an accepted website or landing as one Next.js page on the house TasteSkill stack. Use after the designer picked section comps. Figma import is a later handoff, not the first output.
---

# Website Designer — code-first

Load `.cursor/skills/anti-slop/SKILL.md` and `.cursor/skills/image-models/SKILL.md` first, then TasteSkill (`design-taste-frontend`), `image-to-code`, and `web-design-guidelines`.

When the designer asked for a full site, prefer `.cursor/skills/website-job/SKILL.md` and honor its stop gates. This skill is **PHASE D** — implement the accepted comps.

Do **not** call `generate_figma_design`. Do not paint the site in Figma first.

## Stack

- Next.js App Router + Tailwind v4
- `next/font` + client typeface
- shadcn primitives only, restyled to the kit
- Phosphor / HugeIcons / Radix / Tabler icons
- OpenRouter photography via `POST /api/image`
- Vercel preview when a human needs a clickable URL

## Build

1. One homepage or one landing. Not eight routes.
2. If comps or wireframes exist, implement that IA. Do not secretly change the sitemap.
3. Bind color and type to CSS variables from the brand kit.
4. Componentize header, footer, button, card, input — restyle shadcn, do not leave zinc defaults.
5. Capture imagery from the live site or generate through OpenRouter. Empty gray photo slots are a defect.
6. Screenshot desktop 1440 and mobile 390 after each major section. Fix clip, overlap, leftover placeholder copy.
7. Written TasteSkill pre-flight. Any Fail blocks done.

## Taste

Look like this client. If the source is a Greek industrial brand, do not deliver a San Francisco fintech landing. If the source is editorial, keep type-driven composition.

## Figma

Only after a human accepts the preview. html.to.design into a new client file. Logos as SVG. Not the Operating Kit.

## Done when

`CODE_QUALITY_GATES` in `lib/stack.ts` pass and a preview URL (or screenshots) exists.
