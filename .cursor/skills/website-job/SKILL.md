---
name: website-job
description: Run a full Hellenic website job in one Cloud Agent — brand kit, wireframes, high-fidelity desktop and mobile, then QA. Use for new marketing sites, redesigns, and landing pages. This is the default website starter.
---

# Website Agent — full job

This is the default path. Websites first. Do not split into four chats unless the designer asked for only one slice.

## Sequence (do not skip)

1. **Confirm the brief** in five lines. If a URL exists and brand JSON is thin, re-extract from the live site.
2. **New Figma file** on the Hellenic Technologies plan (`team::835515410208041552`), named `{Client} — Website`.
3. **Brand kit** — follow `brand-kit`. Tokens and type before any page.
4. **Wireframes** — follow `wireframe`. Grayscale Home + inner pages, desktop 1440 and mobile 390 as siblings.
5. **Hi-fi** — follow `web-design`. Paint on that IA. Load `figma-use` and `figma-generate-design`.
6. **QA** — follow `design-qa`. Fix blockers and majors.

## Page set

Unless the brief is a single landing:

- Home
- About / company
- Offer (services or product)
- Proof (case studies / work)
- Contact

Language of the source site stays the language of the frames. Bilingual sites may use one language per frame set if asked.

## Taste

Look like this client. A Greek industrial or services brand is not a San Francisco SaaS template. If the live site is type-driven, keep it type-driven.

## Stop conditions

- Stop after wireframes only if the designer said “wireframes only”.
- Do not add a banner system unless banners were in the brief — that is a later starter.
- Never dump the job into the Operating Kit.

## Done when

You can hand the designer one Figma URL with brand, wire, hi-fi, and a QA note. Quality gates in `lib/presets.ts` pass.
