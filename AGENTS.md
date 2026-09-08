<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Hellenic Technologies — Design Agents

This repository is the operating system for the design team.

- **Atelier** (`/`) is the designer intake UI. It extracts a brand kit from a URL and writes specialist packets.
- **Skills** in `.cursor/skills/` are the dedicated agents. Follow the named skill. Do not improvise a parallel process.
- **Website / landing** output is Next.js on the house stack, then a Vercel preview. Figma is a later html.to.design handoff.
- **Banners, social, wires, edits** still deliver in Figma. Confirm access with `whoami`. Create client files in the Hellenic Technologies team (`team::835515410208041552`).
- **Operating Kit** (structure only, never the client skin): https://www.figma.com/design/2k2H00PKTb87JeKvlpHDIv

## Routing

| Designer says | Agent |
| --- | --- |
| New website or landing (default) | `website-job` — audit + comps + one Next page + preview. Stop gates. |
| Wireframes only | `wireframe` |
| Banners / display / Meta / LinkedIn | `banner-design` after the site, or alone |
| Social / launch extras | `campaign` |
| Edit this Figma file | `figma-edit` |
| Critique / before client send | `design-qa` (already inside website-job) |
| Components from approved screens | `design-system` |

Any design surface. Saved starters live in `starters/`. Default sequence for a new site is the Website Agent (code-first). Banners, social, and edits are first-class Figma jobs with the same TasteSkill bans.

## Taste + image specialists

Load `.cursor/skills/anti-slop/SKILL.md` and `.cursor/skills/image-models/SKILL.md` before drawing. TasteSkill applies to websites, banners, social, pitch, wireframes, and in-file edits.

The chat model does layout. Pixels go through OpenRouter (`POST /api/image`):

| Need | Specialist | OpenRouter slug |
| --- | --- | --- |
| Photoreal / lighting | Nano Banana 2 | `google/gemini-3.1-flash-image` |
| Precise edits | GPT Image 2 | `openai/gpt-image-2` |
| Controlled realism | FLUX.2 | `black-forest-labs/flux.2-pro` |
| Type in the image | Ideogram (stand-in Recraft) | `recraft/recraft-v4.1-pro` |
| Mood / aesthetics | Midjourney (stand-in FLUX.2 max) | `black-forest-labs/flux.2-max` |
| Local / LoRA | SD 3.5 (stand-in FLUX.2 flex) | `black-forest-labs/flux.2-flex` |
| Composite in CC | Firefly 5 (API stand-in GPT Image 2) | `openai/gpt-image-2` |

Studio packets print the plan. Requires `OPENROUTER_API_KEY` in Vercel / `.env.local`.

## Hard rules

- Never default to Inter or a purple SaaS template when the client has a typeface and palette.
- Never use lorem ipsum when the source site has real language.
- Never dump a new client into the Operating Kit. Create a new file.
- Never rebuild a file the designer asked you to edit.
- Never ship mesh blobs, three-equal-card rows, em-dashes, or Elevate/Unleash on any surface.
- Website jobs: do not call `generate_figma_design` as the first output. Import with html.to.design only after the preview is accepted.
- Banner / edit jobs: load Figma skills before write tools (`figma-create-new-file`, `figma-use`, `figma-generate-design` or `figma-generate-library`).
- If the user has multiple Figma plans, use Hellenic Technologies (`team::835515410208041552`) unless they name the other team.
