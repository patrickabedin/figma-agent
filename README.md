# Atelier

Designer intake and specialist agents for the Hellenic Technologies Figma desk.

Atelier is the front door. A designer pastes a client URL or drops a style guide. The studio extracts a brand kit and writes Cloud Agent packets. Those agents build websites, wireframes, banners, and in-file edits in Figma.

## Figma access

Confirmed on the connected account:

- **Patrick Abedin** · `abedin@hellenictechnologies.com`
- **Hellenic Technologies** — Pro, Full seat (`team::835515410208041552`)
- **Patrick Abedin's team** — Starter, Full seat

Client files should be created on the Hellenic Technologies plan unless someone asks otherwise.

Operating Kit (templates and sizes, not client work):

https://www.figma.com/design/2k2H00PKTb87JeKvlpHDIv

## How designers work

1. Open Atelier and start a **new brief**.
2. Enter the live website and/or upload the brand guide.
3. Pick deliverables (website, wireframes, banners, existing Figma edit, …).
4. Copy the packets in order. Brand Kit first. QA last.
5. Open a Cursor Cloud Agent on this repository, paste the packet, attach the same guide files.
6. Review in Figma. Send change lists to the Figma Editor agent. Run Design QA before the client.

Playbook in the app: `/playbook`. Agent catalog: `/agents`.

## Dedicated agents

| Agent | Skill |
| --- | --- |
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

- New client = new Figma file. Never dump work into the Operating Kit.
- No Inter-by-default. No lorem when the source site has language.
- Edit jobs inspect the existing system before drawing anything new.
