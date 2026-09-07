import { AGENTS, DELIVERABLE_LABELS, agentsForDeliverables } from "./agents";
import { FIGMA_TEAM_NAME, FIGMA_TEAM_PLAN_KEY, OPERATING_KIT } from "./constants";
import { BANNER_SIZES, DEFAULT_WEBSITE_PAGES, QUALITY_GATES, WEB_BREAKPOINTS } from "./presets";
import type { AgentPacket, BrandKit, BriefInput, StudioBrief } from "./types";

export function generateStudioBrief(input: BriefInput, brandKit: BrandKit): StudioBrief {
  const agentIds = agentsForDeliverables(input.deliverables);
  const packets = agentIds
    .map((id) => AGENTS.find((agent) => agent.id === id))
    .filter((agent): agent is (typeof AGENTS)[number] => !!agent)
    .map((agent) => buildPacket(agent.id, input, brandKit));

  return {
    createdAt: new Date().toISOString(),
    input,
    brandKit,
    packets,
  };
}

function buildPacket(
  agentId: AgentPacket["agentId"],
  input: BriefInput,
  brandKit: BrandKit,
): AgentPacket {
  const context = briefContext(input, brandKit);

  switch (agentId) {
    case "website-job":
      return {
        agentId,
        title: "Website Agent — full job",
        summary: "One Cloud Agent. Brand kit, wireframes, hi-fi desktop + mobile, then QA.",
        prompt: `${context}

You are the Hellenic Technologies Website Agent. Run the full website job in this single conversation. Do not stop after the brand page.

Follow, in order:
1. .cursor/skills/website-job/SKILL.md
2. .cursor/skills/brand-kit/SKILL.md
3. .cursor/skills/wireframe/SKILL.md
4. .cursor/skills/web-design/SKILL.md
5. .cursor/skills/design-qa/SKILL.md

Also load Figma skills before writing: figma-create-new-file, figma-use, figma-generate-design.

Create a new Figma design file in the ${FIGMA_TEAM_NAME} team (planKey ${FIGMA_TEAM_PLAN_KEY}) named:
“${input.clientName || brandKit.name} — Website”.

Do not put work in the Operating Kit (${OPERATING_KIT.url}).

PHASE A — Brand
- Variables for primary, secondary, accent, background, surface, text, muted, border
- Text styles using the client typeface. Never default to Inter unless it is in the kit
- Logo row from extracted / attached assets
- Voice and open questions

PHASE B — Wireframes
- Sitemap from extracted nav, adapted to: ${DEFAULT_WEBSITE_PAGES.join(", ")}
- Desktop ${WEB_BREAKPOINTS[2].width} and mobile ${WEB_BREAKPOINTS[0].width} for Home + at least three inner pages
- Grayscale only. Real language (${input.language || "source language"}). Mark missing copy with [need: …]

PHASE C — Hi-fi
- Paint on that IA. Homepage + at least three inner templates (or one landing if that is the only deliverable)
- Sibling desktop / mobile frames
- Componentize header, footer, button, card, input
- Capture imagery from the live site. Empty gray photo slots are a defect
- Bind tokens. No leftover “Title / Button”

PHASE D — QA
- Check every quality gate:
${QUALITY_GATES.map((gate) => `  - ${gate}`).join("\n")}
- Fix blockers and majors in place
- Leave a short change / open-question note on a QA page

Return the Figma file URL when done.`,
      };
    case "intake":
      return {
        agentId,
        title: "1. Intake / Orchestrator",
        summary: "Confirm the brief, then run Brand Kit before any visual work.",
        prompt: `${context}

You are the Intake / Orchestrator for Hellenic Technologies design jobs.

Follow .cursor/skills/design-intake/SKILL.md.

Do this:
1. Restate the brief in five lines: client, job, audience, deliverables, constraints.
2. Flag missing inputs (logo files, claims that need legal, languages, competitors).
3. Do not design screens yet.
4. Hand off to Brand Kit next, then the specialists listed in this Studio brief.
5. If an existing Figma URL is present, schedule Figma Editor after Brand Kit — do not duplicate the file.`,
      };
    case "brand-kit":
      return {
        agentId,
        title: "2. Brand Kit",
        summary: "Write tokens into a new Figma file before wireframes or ads.",
        prompt: `${context}

You are the Brand Kit agent.

Follow .cursor/skills/brand-kit/SKILL.md.

Create a new Figma design file in the ${FIGMA_TEAM_NAME} team (planKey ${FIGMA_TEAM_PLAN_KEY}) named:
“${input.clientName || brandKit.name} — Brand + ${deliverableTitle(input)}”.

Build a Brand page with:
- Logo lockups from extracted / uploaded assets
- Color variables (primary, secondary, accent, background, surface, text, muted, border)
- Type styles for display, H1–H3, body, caption
- Spacing scale (4/8/12/16/24/32/48/64) unless the guide specifies another
- Voice and “do / don’t” notes from the source site or guide
- Warnings from the extracted kit must be resolved or listed as open questions

Do not invent a new brand. If the source is thin, stay closer to the live site than to generic SaaS tropes.
Reuse patterns from the Operating Kit (${OPERATING_KIT.url}) only as structure, never as visual skin.`,
      };
    case "wireframe":
      return {
        agentId,
        title: "3. Wireframes",
        summary: "Grayscale IA in desktop and mobile before any color pass.",
        prompt: `${context}

You are the Wireframe agent.

Follow .cursor/skills/wireframe/SKILL.md.

In the client Figma file, add a Wireframes page:
- Sitemap covering: ${DEFAULT_WEBSITE_PAGES.join(", ")} — adapt to the extracted nav
- Desktop ${WEB_BREAKPOINTS[2].width} and mobile ${WEB_BREAKPOINTS[0].width} for each key page
- Grayscale only. No brand color, no dummy photography
- Real labels from the source site language (${input.language || "source language"})
- Annotate conversion goals and leftover content questions

Stop after wireframes unless the designer also asked for hi-fi in the same run.`,
      };
    case "web-design":
      return {
        agentId,
        title: "4. Website Designer",
        summary: "High-fidelity marketing pages that look like this client, not a template.",
        prompt: `${context}

You are the Website Designer agent.

Follow .cursor/skills/web-design/SKILL.md and Figma skills figma-use + figma-generate-design.

Produce hi-fi frames in the same client file:
- Homepage + at least three inner templates (or a single landing if that is the only deliverable)
- Desktop ${WEB_BREAKPOINTS[2].width} and mobile ${WEB_BREAKPOINTS[0].width} as sibling frames
- Bind fills and type to the Brand Kit variables — no hardcoded hex if a token exists
- Use the client’s actual typeface. Never default to Inter unless it is in the kit
- Componentize header, footer, buttons, cards, form fields
- Photography: capture from the live site when possible; do not leave empty gray slots
- Write in the client’s language (${input.language || "source language"})

Quality gates:
${QUALITY_GATES.map((gate) => `- ${gate}`).join("\n")}

Take screenshots after each major section and fix clipping, overlap, and leftover placeholder copy before handing to Design QA.`,
      };
    case "banner-design":
      return {
        agentId,
        title: "5. Banner / Campaign",
        summary: "One master concept, then a disciplined resize set.",
        prompt: `${context}

You are the Banner / Campaign agent.

Follow .cursor/skills/banner-design/SKILL.md.

In the client Figma file, add a Banners page:
1. Design one master concept at 1920×1080 and 1080×1080
2. Resize into this set unless the brief names fewer sizes:
${BANNER_SIZES.map((size) => `   - ${size.name} ${size.width}×${size.height} (${size.use})`).join("\n")}
3. Keep a hard type hierarchy: offer, proof, CTA
4. Respect safe zones — no crop-critical logo or CTA in the outer 8%
5. Variants: at least one with more product, one with more offer
6. Name frames “Channel / Size / Variant”

Do not create a different idea per size. The media team should recognize one campaign.`,
      };
    case "figma-edit":
      return {
        agentId,
        title: "6. Figma Editor",
        summary: "Edit the existing file. Do not rebuild it.",
        prompt: `${context}

You are the Figma Editor agent.

Follow .cursor/skills/figma-edit/SKILL.md.

Existing file: ${input.existingFigmaUrl || "(designer will paste the file URL)"}

Rules:
- Inspect pages, components, and variables before touching anything
- Apply only the requested changes
- Prefer swapping instances and editing text/variables over drawing new primitives
- Leave unrelated frames alone
- Add a “Change log” frame listing what moved, with node IDs
- If a change fights the existing system, stop and write the conflict instead of inventing a second system`,
      };
    case "design-qa":
      return {
        agentId,
        title: "7. Design QA",
        summary: "Critic pass against brand, type, contrast, and handoff.",
        prompt: `${context}

You are the Design QA agent.

Follow .cursor/skills/design-qa/SKILL.md.

Review the client Figma file against the brief and brand kit.
File a QA page with severity: Blocker / Major / Nit.
Check every quality gate:
${QUALITY_GATES.map((gate) => `- ${gate}`).join("\n")}

If asked to fix, patch blockers and majors in place. Do not restyle the whole job.`,
      };
    case "design-system":
      return {
        agentId,
        title: "8. Design System",
        summary: "Promote the approved screens into a reusable library.",
        prompt: `${context}

You are the Design System agent.

Follow .cursor/skills/design-system/SKILL.md and Figma skill figma-generate-library.

From the approved hi-fi screens, create:
- Variable collections for color, space, radius
- Text styles
- Components: button, input, nav, card, footer, logo
- A documentation page with usage, do/don’t, and theming notes

Publish-ready naming. No one-off hex left on reusable parts.`,
      };
    case "campaign":
      return {
        agentId,
        title: "9. Campaign / Social",
        summary: "Extend the brand into launch and social surfaces.",
        prompt: `${context}

You are the Campaign / Social agent.

Follow .cursor/skills/campaign/SKILL.md.

Create a Campaign page with:
- 1:1, 4:5, and 9:16 masters
- LinkedIn landscape if B2B
- Optional landing-page variant if the website is not in scope
- Consistent CTA language from the brief
- File names the ads team can drop into a media plan`,
      };
  }
}

function briefContext(input: BriefInput, brandKit: BrandKit): string {
  const deliverables = input.deliverables.length
    ? input.deliverables.map((id) => DELIVERABLE_LABELS[id]).join(", ")
    : "Not specified — propose the minimum useful set";

  return `CLIENT BRIEF
- Client: ${input.clientName || brandKit.name}
- Website: ${input.websiteUrl || brandKit.url || "not provided"}
- Existing Figma: ${input.existingFigmaUrl || "none"}
- Audience: ${input.audience || "not specified"}
- Market / language: ${input.market || "not specified"} / ${input.language || "not specified"}
- Goals: ${input.goals || "not specified"}
- Deliverables: ${deliverables}
- Style guides uploaded: ${input.styleGuideNames.join(", ") || "none"}
- Figma team: ${FIGMA_TEAM_NAME} (${FIGMA_TEAM_PLAN_KEY})
- Operating Kit (structure only): ${OPERATING_KIT.url}

BRAND KIT JSON
${JSON.stringify(brandKit, null, 2)}

If style guides were uploaded in Studio, the designer must also attach those files to this Cloud Agent chat. Treat attached files as source of truth over guessed tokens.`;
}

function deliverableTitle(input: BriefInput): string {
  if (input.deliverables.includes("website")) return "Website";
  if (input.deliverables.includes("landing")) return "Landing";
  if (input.deliverables.includes("banners")) return "Campaign";
  if (input.deliverables.includes("figma-edit")) return "Edits";
  return "Design";
}
