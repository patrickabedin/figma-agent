---
name: banner-design
description: Design campaign and display banner systems in Figma from a brand kit. Use for Google Display, Meta, LinkedIn, YouTube, site heroes, and resize sets.
---

# Banner / Campaign

Load `.cursor/skills/anti-slop/SKILL.md` first, then TasteSkill (`design-taste-frontend`) and `ui-craft`. Launch on `claude-opus-5-thinking-high` — banners are visual work, not a fast-model job.

One idea, many sizes. Sizes live in `lib/presets.ts`. TasteSkill bans apply here the same as websites: no mesh blobs, no three identical tiles, no Elevate/Unleash, no Inter-by-default.

## Build

1. Page `04 Banners`.
2. Write the line first: offer, proof, CTA. If the brief is vague, propose two lines and design one.
3. Master at 1920×1080 and 1080×1080.
4. Resize to the requested set (default: the full preset list).
5. Safe zone: no crop-critical mark or CTA in the outer 8%.
6. Type must remain legal at 320×100 — if it cannot, simplify the line, do not shrink below readability.
7. Name frames `Channel / W×H / Variant`.
8. Variants: Product-led and Offer-led, not a new concept per size.

## Done when

A media buyer can export without asking which file is source.
