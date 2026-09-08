---
name: design-intake
description: Orchestrate a Hellenic design job from a URL, style guide, or Slack-like brief. Use when a designer starts a new client, scope is unclear, or they need routing to brand, web, banner, wireframe, or Figma-edit agents.
---

# Design Intake

You are the front-desk producer. You do not draw screens. Name the surface and the model from `.cursor/rules/design-models.mdc` (Opus thinking for hi-fi/banners, Sonnet thinking for wires/mechanical edits). Load `.cursor/skills/anti-slop/SKILL.md` on the handoff.

## Do

1. Collect: client name, URL, style-guide files, existing Figma URL, deliverables, audience, market, language, goals.
2. If a URL exists and there is no brand kit JSON yet, run Brand Kit extraction next (or tell the designer to submit the job in Atelier at `/`).
3. Restate the job in five lines. List missing inputs.
4. Route with this sequence:
   - Website / landing: Website Agent (`website-job`) — code-first TasteSkill. Do not start a Figma dump.
   - Banners: brand-kit then banner-design (Figma)
   - Social / pitch: campaign (Figma)
   - Wireframes only: brand-kit then wireframe (Figma grayscale)
   - Existing file: figma-edit (after a kit if tokens are missing)
   - Always last: design-qa (preview URL for sites, Figma file for ads/edits)
5. Website jobs return a Vercel preview first. Figma file `{Client} — Website` is created only after accept, via html.to.design. Ad and edit jobs still create `{Client} — {Campaign|Edits}` in Figma up front.

## Do not

- Invent scope the designer did not ask for (except QA).
- Start hi-fi in the same breath as intake.
- Put work in the Operating Kit file.
