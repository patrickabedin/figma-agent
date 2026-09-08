---
name: website-job
description: Run a Hellenic website or landing job the TasteSkill way — written read, live-site audit, section comps, one Next.js homepage, Vercel preview. Figma only after the designer accepts, via html.to.design. Use for new marketing sites, redesigns, and landing pages. This is the default website starter.
---

# Website Agent — TasteSkill code-first

Load `.cursor/skills/anti-slop/SKILL.md` and `.cursor/skills/image-models/SKILL.md` first, then TasteSkill v2 (`design-taste-frontend`). If a live URL exists, load `redesign-existing-projects` before drawing. After comps are picked, load `image-to-code`.

**Code is the first output.** Do not call `generate_figma_design` or paint a full site in Figma in this run.

## House stack (do not substitute)

- Next.js App Router + Tailwind v4
- `next/font` with the **client** typeface (Source Sans 3 when that is the kit). Never Inter-by-default
- shadcn/ui **primitives only** (button, input, dialog, nav) — restyle to client tokens. Never ship default shadcn chrome
- Icons: Phosphor / HugeIcons / Radix / Tabler
- Motion (`motion/react`) only if the motion dial needs it. No Aceternity / Magic UI as the look
- Photography through `POST /api/image` (OpenRouter)
- Vercel preview so a human can click it. Local `npm run dev` is enough to build and screenshot
- Figma later, via html.to.design, into a **new** Hellenic client file

## Sequence (stop at each gate)

1. **PHASE A — Design read.** Five-line brief + three dials (variance / motion / density). **Stop. Wait for human OK.**
2. **PHASE B — Audit.** If a live URL exists, written redesign audit: what to preserve vs overhaul. Client brand beats TasteSkill color defaults. **Stop.**
3. **PHASE C — Comps.** Three section comps only (hero, proof, about/offer) via `POST /api/image`. **Stop. Human picks.**
4. **PHASE D — One page.** Implement **one** homepage or one landing against the pick. Screenshot desktop 1440 and mobile 390. Written TasteSkill pre-flight. Any Fail blocks “done.”
5. **PHASE E — Preview.** `vercel` preview (or local screenshots if deploy is blocked). Do not open eight pages.
6. **PHASE F — Figma (only after accept).** Import the rendered preview with html.to.design (desktop + mobile) into a new file named `{Client} — Website` on `team::835515410208041552`. Logos as SVG. Never scale-fill marks. Never the Operating Kit.

## Page set

Unless the brief is a single landing, keep this sitemap in the audit — implement Home first:

- Home
- About / company
- Offer (services or product)
- Proof (case studies / work)
- Contact

Language of the source site stays the language of the page.

## Taste

Look like this client. A Greek industrial or services brand is not a San Francisco SaaS template. If the live site is type-driven, keep it type-driven. If the kit is gold / cyan / Source Sans 3, do not invent school-bus yellow.

## Stop conditions

- Do not skip a stop gate.
- Do not add a banner system unless banners were in the brief.
- Never dump the job into the Operating Kit.
- Never treat `generate_figma_design` as art direction.

## Done when

PHASE D/E: one preview URL (or screenshots) plus a written pre-flight that passes.
PHASE F (optional): one Figma URL the designer can edit. Code stays source of truth unless the team says otherwise.
