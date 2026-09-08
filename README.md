# Atelier

Designer intake and specialist agents for the Hellenic Technologies design desk.

Atelier is the front door. A designer pastes a client URL or drops a style guide. The studio extracts a brand kit, writes a TasteSkill design read, and builds Cloud Agent packets.

- **Website / landing** — TasteSkill code-first: audit, section comps, one Next.js homepage, Vercel preview. Figma later via html.to.design.
- **Banners, social, wires, edits** — still Figma-native on the Hellenic Technologies team.

## Figma access

Confirmed on the connected account:

- **Patrick Abedin** · `[REDACTED]`
- **Hellenic Technologies** — Pro, Full seat (`team::835515410208041552`)
- **Patrick Abedin's team** — Starter, Full seat

Client files should be created on the Hellenic Technologies plan unless someone asks otherwise. Website files are created **after** the preview is accepted.

Operating Kit (templates and sizes, not client work):

https://www.figma.com/design/2k2H00PKTb87JeKvlpHDIv

## How designers work

1. Open Atelier and start a **new brief**.
2. Enter the live website and/or upload the brand guide.
3. Pick the job: Website (default), Landing, Banners only, Social, Wireframes, or Edit Figma.
4. Copy the first packet. Website packets already include the house stack and stop gates.
5. Open a Cursor Cloud Agent on this repository. Paste the packet. For pixels, the agent calls `POST /api/image` (OpenRouter).
6. Website jobs: review the Vercel preview. Accept, then import with html.to.design. Ads and edits: review in Figma.

Playbook: `/playbook`. Taste + models: `/taste`. Agent catalog: `/agents`.

## House website stack

Next.js App Router · Tailwind v4 · next/font (client face) · shadcn primitives only · Phosphor / HugeIcons / Radix / Tabler · TasteSkill v2 · redesign + image-to-code · OpenRouter photography · Vercel preview · html.to.design after accept.

## Dedicated agents

| Agent | Skill |
| --- | --- |
| Website Agent (default) | `.cursor/skills/website-job` |
| Intake / Orchestrator | `.cursor/skills/design-intake` |
| Brand Kit | `.cursor/skills/brand-kit` |
| Wireframe | `.cursor/skills/wireframe` |
| Website Designer | `.cursor/skills/web-design` |
| Banner / Campaign | `.cursor/skills/banner-design` |
| Figma Editor | `.cursor/skills/figma-edit` |
| Design QA | `.cursor/skills/design-qa` |
| Design System | `.cursor/skills/design-system` |
| Campaign / Social | `.cursor/skills/campaign` |

## Local

```bash
npm install
npm run dev
```

## House rules

- Website / landing: code first. Do not `generate_figma_design` a full site.
- New client = new Figma file. Never dump work into the Operating Kit.
- No Inter-by-default. No lorem when the source site has language.
- TasteSkill on every surface: no mesh blobs, three-equal-card rows, or Elevate/Unleash.
- Imagery goes through OpenRouter specialists (Nano Banana 2, GPT Image 2, FLUX.2, Recraft/Ideogram). Not the chat model.
- Edit jobs inspect the existing system before drawing anything new.
