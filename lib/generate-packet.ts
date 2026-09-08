import { AGENTS, DELIVERABLE_LABELS, agentsForDeliverables } from "./agents";
import { FIGMA_TEAM_NAME, FIGMA_TEAM_PLAN_KEY, OPERATING_KIT } from "./constants";
import { formatImagePlan, recommendImagePlan } from "./models";
import { BANNER_SIZES, DEFAULT_WEBSITE_PAGES, QUALITY_GATES, WEB_BREAKPOINTS } from "./presets";
import { CODE_QUALITY_GATES, CODE_STACK, FIGMA_HANDOFF_STEPS, WEBSITE_STOP_GATES } from "./stack";
import { inferDesignRead, tasteLoadLines } from "./taste";
import type { AgentPacket, BrandKit, BriefInput, StudioBrief } from "./types";

export function generateStudioBrief(input: BriefInput, brandKit: BrandKit): StudioBrief {
  const agentIds = agentsForDeliverables(input.deliverables);
  const packets = agentIds
    .map((id) => AGENTS.find((agent) => agent.id === id))
    .filter((agent): agent is (typeof AGENTS)[number] => !!agent)
    .map((agent) => buildPacket(agent.id, input, brandKit));

  const imagePlan = recommendImagePlan(input);
  return {
    createdAt: new Date().toISOString(),
    input,
    brandKit,
    packets,
    designRead: inferDesignRead(input, brandKit),
    recommendedModel: imagePlan.primary.specialistId,
    recommendedModelLabel: imagePlan.primary.label,
    imagePlan,
  };
}

function buildPacket(
  agentId: AgentPacket["agentId"],
  input: BriefInput,
  brandKit: BrandKit,
): AgentPacket {
  const context = briefContext(input, brandKit);
  const packet = packetBody(agentId, input, brandKit, context);
  return finishPacket(agentId, packet.title, packet.summary, packet.body, input, brandKit);
}

function finishPacket(
  agentId: AgentPacket["agentId"],
  title: string,
  summary: string,
  body: string,
  input: BriefInput,
  brandKit: BrandKit,
): AgentPacket {
  const designRead = inferDesignRead(input, brandKit);
  const imagePlan = recommendImagePlan(input, agentId);
  const redesign =
    Boolean(input.websiteUrl) ||
    Boolean(input.existingFigmaUrl) ||
    /redesign|refresh|existing/i.test(`${input.goals} ${input.websiteUrl}`);
  const codeFirst = agentId === "website-job" || agentId === "web-design";
  const taste = [
    codeFirst
      ? "TASTE + CODE-FIRST WEBSITE STACK (Figma is a later handoff)"
      : "TASTE + IMAGE SPECIALISTS (banners, social, wire, pitch, edits)",
    `- Design read: ${designRead}`,
    `- Load skills: ${tasteLoadLines({ redesign, codeFirst }).join(" → ")}`,
    formatImagePlan(imagePlan),
    "- Client brand beats TasteSkill defaults (keep purple only if the brand is already purple)",
    codeFirst
      ? "- Do not call generate_figma_design or paint a full site in Figma in this run"
      : "- Figma is the deliverable surface for this job",
    brandKit.warnings.length ? `- Kit warnings: ${brandKit.warnings.join(" | ")}` : "",
    "",
  ].join("\n");

  return {
    agentId,
    title,
    summary,
    recommendedModel: imagePlan.primary.specialistId,
    recommendedModelLabel: imagePlan.primary.label,
    designRead,
    imagePlan,
    prompt: `${taste}${body}`,
  };
}

function packetBody(
  agentId: AgentPacket["agentId"],
  input: BriefInput,
  brandKit: BrandKit,
  context: string,
): { title: string; summary: string; body: string } {
  switch (agentId) {
    case "website-job":
      return {
        title: "Website Agent — TasteSkill code-first",
        summary: "One Next homepage. Section comps first. Vercel preview. Figma only after the designer accepts.",
        body: `${context}

You are the Hellenic Technologies Website Agent. Code is the first output. Do not call generate_figma_design or paint a full site in Figma in this run.

Follow .cursor/skills/website-job/SKILL.md. Stack — do not substitute:
${CODE_STACK.map((item) => `- ${item.name}: ${item.role}`).join("\n")}

Sitemap to keep in mind (implement Home only unless the designer already accepted Home):
${sitemapForPacket(brandKit).map((page) => `- ${page}`).join("\n")}

Stop gates — honor each one. Do not skip to the next phase without a human OK:
${WEBSITE_STOP_GATES.map((gate) => `- ${gate}`).join("\n")}

PHASE D quality gates:
${CODE_QUALITY_GATES.map((gate) => `- ${gate}`).join("\n")}

Figma handoff (PHASE F only):
${FIGMA_HANDOFF_STEPS.map((step) => `- ${step}`).join("\n")}

Do not put work in the Operating Kit (${OPERATING_KIT.url}).
Do not use Magic UI / Aceternity as the visual system.
Do not invent a new palette when the kit already has one. Hellenic gold / cyan / Source Sans 3 only if this client is Hellenic Technologies.
If Inter is in this kit, keep Inter. The Inter ban is only when Inter is a leftover fallback.

Return the Vercel preview URL (or local screenshots) when PHASE D/E is done. Return a Figma URL only after PHASE F.`,
      };
    case "intake":
      return {
        title: "1. Intake / Orchestrator",
        summary: "Confirm the brief, name the image specialists, then run Brand Kit before any visual work.",
        body: `${context}

You are the Intake / Orchestrator for Hellenic Technologies design jobs.

Follow .cursor/skills/anti-slop/SKILL.md and .cursor/skills/design-intake/SKILL.md.

Do this:
1. Restate the brief in five lines: client, job, audience, deliverables, constraints.
2. Name the surface (website, landing, banners, social, pitch, wireframes, edit) and the recommended model.
3. Flag missing inputs (logo files, claims that need legal, languages, competitors).
4. Do not design screens yet.
5. Website / landing: hand off to the Website Agent (code-first TasteSkill). Do not start a Figma dump.
6. Banners, social, wires-only, or an existing Figma URL: Brand Kit in Figma, then the matching specialist.
7. If an existing Figma URL is present and the job is an edit, schedule Figma Editor — do not duplicate the file.`,
      };
    case "brand-kit":
      return {
        title: "2. Brand Kit",
        summary: "Write tokens into a new Figma file before wireframes, ads, or social.",
        body: `${context}

You are the Brand Kit agent.

Follow .cursor/skills/anti-slop/SKILL.md and .cursor/skills/brand-kit/SKILL.md.

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
        title: "3. Wireframes",
        summary: "Grayscale IA in desktop and mobile before any color pass.",
        body: `${context}

You are the Wireframe agent.

Follow .cursor/skills/anti-slop/SKILL.md and .cursor/skills/wireframe/SKILL.md.

In the client Figma file, add a Wireframes page:
- Sitemap covering: ${sitemapForPacket(brandKit).join(", ")} — use extracted nav, not a generic agency IA
- Desktop ${WEB_BREAKPOINTS[2].width} and mobile ${WEB_BREAKPOINTS[0].width} for each key page
- Grayscale only. No brand color, no dummy photography
- Real labels from the source site language (${input.language || "source language"})
- Annotate conversion goals and leftover content questions
- Do not lock three equal cards into the structure if the hi-fi should be editorial

Stop after wireframes unless the designer also asked for hi-fi in the same run.`,
      };
    case "web-design":
      return {
        title: "4. Website Designer",
        summary: "Implement the accepted comps as one Next page. Figma only after the preview is accepted.",
        body: `${context}

You are the Website Designer agent — code-first.

Follow .cursor/skills/web-design/SKILL.md. This is the PHASE D implementer after the designer picked comps. Do not call generate_figma_design.

Stack:
${CODE_STACK.map((item) => `- ${item.name}: ${item.role}`).join("\n")}

Build:
- One homepage or one landing in Next.js + Tailwind v4
- Desktop ${WEB_BREAKPOINTS[2].width} and mobile ${WEB_BREAKPOINTS[0].width} as sibling screenshots
- CSS variables from the brand kit. Client typeface via next/font. Never Inter-by-default
- shadcn primitives only, restyled to the kit
- Photography from the live site or POST /api/image. Empty gray slots are a defect
- Write in the client’s language (${input.language || "source language"})
- Written TasteSkill pre-flight. Any Fail blocks done

Quality gates:
${CODE_QUALITY_GATES.map((gate) => `- ${gate}`).join("\n")}

Return the Vercel preview URL. Figma handoff is PHASE F only, via html.to.design, into a new client file — not the Operating Kit (${OPERATING_KIT.url}).`,
      };
    case "banner-design":
      return {
        title: "5. Banner / Campaign",
        summary: "One master concept, then a disciplined resize set. Same TasteSkill bans as websites.",
        body: `${context}

You are the Banner / Campaign agent.

Follow .cursor/skills/anti-slop/SKILL.md and .cursor/skills/banner-design/SKILL.md.

In the client Figma file, add a Banners page:
1. Write one line first: offer, proof, CTA
2. Design one master concept at 1920×1080 and 1080×1080
3. Resize into this set unless the brief names fewer sizes:
${BANNER_SIZES.map((size) => `   - ${size.name} ${size.width}×${size.height} (${size.use})`).join("\n")}
4. Keep a hard type hierarchy: offer, proof, CTA
5. Respect safe zones — no crop-critical logo or CTA in the outer 8%
6. Variants: at least one with more product, one with more offer
7. Name frames “Channel / Size / Variant”
8. TasteSkill still applies: no mesh blobs, no three identical tiles, no Elevate/Unleash, no Inter-by-default
9. Type must still read at 320×100

Do not create a different idea per size. The media team should recognize one campaign.`,
      };
    case "figma-edit":
      return {
        title: "6. Figma Editor",
        summary: "Edit the existing file. Do not rebuild it. Do not introduce AI-slop while editing.",
        body: `${context}

You are the Figma Editor agent.

Follow .cursor/skills/anti-slop/SKILL.md and .cursor/skills/figma-edit/SKILL.md.

Existing file: ${input.existingFigmaUrl || "(designer will paste the file URL)"}

Rules:
- Inspect pages, components, and variables before touching anything
- Apply only the requested changes
- Prefer swapping instances and editing text/variables over drawing new primitives
- Leave unrelated frames alone
- Add a “Change log” frame listing what moved, with node IDs
- If a change fights the existing system, stop and write the conflict instead of inventing a second system
- Do not “modernize” with mesh blobs, Inter, or a three-card row the file did not already have`,
      };
    case "design-qa":
      return {
        title: "7. Design QA",
        summary: "Critic pass against brand, TasteSkill, type, contrast, and handoff.",
        body: `${context}

You are the Design QA agent.

Follow .cursor/skills/anti-slop/SKILL.md and .cursor/skills/design-qa/SKILL.md.

If this is a website / landing job, review the Vercel preview (or screenshots) against CODE_QUALITY_GATES in lib/stack.ts.
If this is banners, social, wires, or an edit, review the Figma file against FIGMA_QUALITY_GATES.
Severity: Blocker / Major / Nit.

Code gates:
${CODE_QUALITY_GATES.map((gate) => `- ${gate}`).join("\n")}

Figma gates:
${QUALITY_GATES.map((gate) => `- ${gate}`).join("\n")}

If asked to fix, patch blockers and majors in place. Do not restyle the whole job.`,
      };
    case "design-system":
      return {
        title: "8. Design System",
        summary: "Promote the approved screens into a reusable library.",
        body: `${context}

You are the Design System agent.

Follow .cursor/skills/anti-slop/SKILL.md, .cursor/skills/design-system/SKILL.md, and Figma skill figma-generate-library.

From the approved hi-fi screens, create:
- Variable collections for color, space, radius
- Text styles
- Components: button, input, nav, card, footer, logo
- A documentation page with usage, do/don’t, and theming notes

Publish-ready naming. No one-off hex left on reusable parts.
Do not encode a three-equal-card template or Inter fallback into the library.`,
      };
    case "campaign":
      return {
        title: "9. Campaign / Social",
        summary: "Extend the brand into launch and social surfaces with the same taste rules.",
        body: `${context}

You are the Campaign / Social agent.

Follow .cursor/skills/anti-slop/SKILL.md and .cursor/skills/campaign/SKILL.md.

Create a Campaign page with:
- 1:1, 4:5, and 9:16 masters
- LinkedIn landscape if B2B
- Optional landing-page variant if the website is not in scope
- Consistent CTA language from the brief
- File names the ads team can drop into a media plan
- Same TasteSkill bans as websites and banners. One idea, not a new look per ratio.`,
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

function sitemapForPacket(brandKit: BrandKit): string[] {
  const extracted = brandKit.sitemapHints.filter((label) => label.length > 1);
  if (extracted.length >= 4) return extracted.slice(0, 10);
  return [...DEFAULT_WEBSITE_PAGES];
}

function deliverableTitle(input: BriefInput): string {
  if (input.deliverables.includes("website")) return "Website";
  if (input.deliverables.includes("landing")) return "Landing";
  if (input.deliverables.includes("banners")) return "Campaign";
  if (input.deliverables.includes("social")) return "Social";
  if (input.deliverables.includes("pitch")) return "Pitch";
  if (input.deliverables.includes("figma-edit")) return "Edits";
  return "Design";
}
