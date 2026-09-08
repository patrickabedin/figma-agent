---
name: anti-slop
description: Apply TasteSkill, ui-craft, and Vercel web guidelines to ALL Hellenic design work — websites, banners, social, wireframes, brand kits, Figma edits, pitch decks. Blocks mesh blobs, three-card templates, Inter defaults, and other AI tells.
---

# Anti-slop (TasteSkill adapter)

Every visual job goes through [TasteSkill](https://www.tasteskill.dev/) before it is allowed to look done. Websites, banners, social, pitch, and in-file edits. Not websites only.

Load before drawing:

1. `.cursor/skills/design-taste-frontend/SKILL.md` (TasteSkill v2)
2. `.cursor/skills/gpt-taste/SKILL.md` when the model family is GPT or Codex
3. `.cursor/skills/redesign-existing-projects/SKILL.md` when a live URL exists
4. `.cursor/skills/ui-craft/SKILL.md`
5. `.cursor/skills/full-output-enforcement/SKILL.md`
6. `.cursor/skills/web-design-guidelines/SKILL.md` at QA (sites and landings)

Then this file, which maps those rules onto Figma and ads.

## Design read (mandatory)

Before any hi-fi frame or banner master, write one line:

`Reading this as: <surface> for <audience>, with a <vibe> language, leaning toward <type + system>.`

Surfaces include website, landing, display banner, Meta/LinkedIn, story, pitch cover, brand board. If Atelier already printed a design read, use it.

## Locks (never relax)

- **Color:** one accent from the brand kit. A gold site or gold ad does not grow a blue CTA.
- **Shape:** one radius system per job.
- **Theme:** one theme. No random dark-mesh inserts behind a banner offer.

## Banned on every surface

- Mesh blobs, purple glow, rainbow gradients, glassmorphism on every card
- Three identical cards or three identical ad tiles
- Inter unless it is in the brand kit
- Pure `#000000` / `#FFFFFF` when the kit has off-black / off-white
- Section eyebrows like `00 / INDEX`
- Decoration strips: `TYPE / FORM / MOTION`
- Fake browser chrome or empty gray product rectangles
- Em-dashes in any text node
- Elevate, Unleash, Seamless, Next-Gen, Acme, Jane Doe
- Pills on photos, scroll cues, version stamps

## Banners and social (extra)

- One idea. Do not shrink a whole landing page into 300×250
- Offer / proof / CTA only. No decoration-word salad
- Safe zone: no crop-critical mark in the outer 8%
- No stock "ELEVATE YOUR BRAND" on a blurry city
- Resizes must stay the same campaign, not a new concept per size
- Type must still read at 320×100

## Wireframes

Grayscale is not an excuse for a three-card template. Structure should already be asymmetric or editorial if the hi-fi will be.

## Client brand beats TasteSkill defaults

If the guide is already purple, keep purple (LILA override). TasteSkill stops templates. It does not replace the client.

## Models

Follow `.cursor/rules/design-models.mdc` and `.cursor/skills/image-models/SKILL.md`. Call Nano Banana 2, GPT Image 2, FLUX.2, Ideogram/Recraft, or Midjourney/FLUX.2 max through `POST /api/image` (OpenRouter). The chat model does not invent photography.

## Pre-flight (no box, no ship)

- [ ] Design read declared
- [ ] Correct image specialist for the surface (OpenRouter)
- [ ] TasteSkill Section 9 scanned
- [ ] No three-equal-card row
- [ ] No mesh / AI-purple / Inter-by-default
- [ ] Real client language
- [ ] Banners: one idea, safe zones, readable type
- [ ] QA page lists remaining TasteSkill nits
