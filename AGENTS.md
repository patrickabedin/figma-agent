<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Hellenic Technologies — Design Agents

This repository is the operating system for the design team.

- **Atelier** (`/`) is the designer intake UI. It extracts a brand kit from a URL and writes specialist packets.
- **Skills** in `.cursor/skills/` are the dedicated agents. Follow the named skill. Do not improvise a parallel process.
- **Figma** is the deliverable surface. Confirm access with `whoami`. Create client files in the Hellenic Technologies team (`team::835515410208041552`).
- **Operating Kit** (structure only, never the client skin): https://www.figma.com/design/2k2H00PKTb87JeKvlpHDIv

## Routing

| Designer says | Agent |
| --- | --- |
| New website or landing (default) | `website-job` — brand + wire + hi-fi + QA in one chat |
| Wireframes only | `wireframe` |
| Banners / display / Meta / LinkedIn | `banner-design` after the site, or alone |
| Social / launch extras | `campaign` |
| Edit this Figma file | `figma-edit` |
| Critique / before client send | `design-qa` (already inside website-job) |
| Components from approved screens | `design-system` |

Any design surface. Saved starters live in `starters/`. Default sequence for a new site is the Website Agent. Banners, social, and edits are first-class jobs with the same TasteSkill stack.

## Taste + models

Load `.cursor/skills/anti-slop/SKILL.md` before drawing. TasteSkill applies to websites, banners, social, pitch, wireframes, and in-file edits.

When spawning a design subagent, or telling a designer which Cloud Agent model to pick:

| Surface | Cursor slug |
| --- | --- |
| Hi-fi, banners, campaign, brand, QA | `claude-opus-5-thinking-high` |
| Escalate if the first pass looks templated | `claude-opus-5-thinking-xhigh` |
| Wireframes, intake, mechanical Figma edits | `claude-sonnet-5-thinking-high` |
| Parent chat is GPT / Codex | `gpt-5.6-sol-xhigh` + load `gpt-taste` |

Do not draw hi-fi or banners on a small/fast model. Studio packets print the slug.

## Hard rules

- Never default to Inter or a purple SaaS template when the client has a typeface and palette.
- Never use lorem ipsum when the source site has real language.
- Never dump a new client into the Operating Kit. Create a new file.
- Never rebuild a file the designer asked you to edit.
- Never ship mesh blobs, three-equal-card rows, em-dashes, or Elevate/Unleash on any surface.
- Load Figma skills before write tools: `figma-create-new-file`, `figma-use`, and `figma-generate-design` or `figma-generate-library` as required.
- If the user has multiple Figma plans, use Hellenic Technologies (`team::835515410208041552`) unless they name the other team.
