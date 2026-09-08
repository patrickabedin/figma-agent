import type { AgentId, DeliverableId } from "./types";

export type AgentDefinition = {
  id: AgentId;
  name: string;
  role: string;
  whenToUse: string;
  inputs: string[];
  outputs: string[];
  skillPath: string;
};

export const AGENTS: AgentDefinition[] = [
  {
    id: "website-job",
    name: "Website Agent",
    role: "TasteSkill code-first: design read, live-site audit, three section comps, one Next homepage, Vercel preview. Figma via html.to.design only after accept.",
    whenToUse: "Any new marketing site or landing. Default starter. Honor the stop gates — do not paint a full site in Figma.",
    inputs: ["Client URL and/or style guide", "Goals", "Language / market"],
    outputs: ["Design read + audit", "Section comps", "Next homepage", "Vercel preview", "Optional Figma import"],
    skillPath: ".cursor/skills/website-job/SKILL.md",
  },
  {
    id: "intake",
    name: "Intake / Orchestrator",
    role: "Turns a messy client request into a structured brief and routes the right specialists.",
    whenToUse: "Every new job. Start here if the designer only has a URL, a PDF, or a Slack message.",
    inputs: ["Client name", "Website URL and/or style guide", "Requested deliverables", "Goals"],
    outputs: ["Studio brief JSON", "Brand extraction request", "Specialist packets"],
    skillPath: ".cursor/skills/design-intake/SKILL.md",
  },
  {
    id: "brand-kit",
    name: "Brand Kit",
    role: "Extracts a usable design system from a live site or uploaded guide.",
    whenToUse: "Before any visual work. Also when a client says “just make it look like our brand”.",
    inputs: ["URL", "Style guide files", "Optional existing Figma library"],
    outputs: ["Color / type / logo tokens", "Voice notes", "Figma variables page"],
    skillPath: ".cursor/skills/brand-kit/SKILL.md",
  },
  {
    id: "wireframe",
    name: "Wireframe",
    role: "Locks information architecture and page structure in grayscale before polish.",
    whenToUse: "New websites, redesigns, and any job where stakeholders still argue about content order.",
    inputs: ["Brand kit", "Sitemap hints", "Goals / audience"],
    outputs: ["Sitemap", "Desktop + mobile lo-fi frames", "User-flow notes"],
    skillPath: ".cursor/skills/wireframe/SKILL.md",
  },
  {
    id: "web-design",
    name: "Website Designer",
    role: "Implements accepted comps as one Next.js page on the house stack.",
    whenToUse: "After the designer picked comps (or after wireframes-only). Not a Figma paint pass.",
    inputs: ["Brand kit", "Accepted comps or IA", "Reference URL"],
    outputs: ["Next homepage", "Desktop + mobile screenshots", "Vercel preview"],
    skillPath: ".cursor/skills/web-design/SKILL.md",
  },
  {
    id: "banner-design",
    name: "Banner / Campaign",
    role: "Produces a size system of ads and campaign frames from one master concept.",
    whenToUse: "Media plans, launches, always-on performance creative.",
    inputs: ["Brand kit", "Offer / CTA", "Required sizes"],
    outputs: ["Master concept + resized set", "Safe-zone notes", "Copy hierarchy"],
    skillPath: ".cursor/skills/banner-design/SKILL.md",
  },
  {
    id: "figma-edit",
    name: "Figma Editor",
    role: "Edits an existing file without exploding the design system.",
    whenToUse: "Client change requests, campaign swaps, localization, “make the hero less busy”.",
    inputs: ["Figma URL", "Change list", "Brand kit if tokens are missing"],
    outputs: ["In-file edits", "Change log page", "Untouched frames left intact"],
    skillPath: ".cursor/skills/figma-edit/SKILL.md",
  },
  {
    id: "design-qa",
    name: "Design QA",
    role: "Critiques contrast, type, spacing, brand drift, and handoff readiness.",
    whenToUse: "Before sending anything to a client or developer.",
    inputs: ["Preview URL or Figma URL", "Brand kit", "Brief"],
    outputs: ["Issue list with severity", "Preview or in-file notes", "Fix pass if asked"],
    skillPath: ".cursor/skills/design-qa/SKILL.md",
  },
  {
    id: "design-system",
    name: "Design System",
    role: "Turns one-off screens into tokens, components, and a documented library.",
    whenToUse: "Retainers, multi-page sites, and any client who will come back for more work.",
    inputs: ["Approved hi-fi screens", "Brand kit"],
    outputs: ["Variables", "Component set", "Usage notes"],
    skillPath: ".cursor/skills/design-system/SKILL.md",
  },
  {
    id: "campaign",
    name: "Campaign / Social",
    role: "Extends a website or brand kit into social, landing, and launch assets.",
    whenToUse: "When the website is not the only surface — launches, always-on, multi-market.",
    inputs: ["Brand kit", "Campaign message", "Channels"],
    outputs: ["Social set", "Optional landing variant", "Naming convention"],
    skillPath: ".cursor/skills/campaign/SKILL.md",
  },
];

export function agentsForDeliverables(deliverables: DeliverableId[]): AgentId[] {
  const wantsWebsite = deliverables.includes("website") || deliverables.includes("landing");
  const ids: AgentId[] = [];

  if (wantsWebsite) {
    ids.push("website-job");
  } else {
    if (deliverables.includes("wireframes")) {
      ids.push("brand-kit", "wireframe", "design-qa");
    }
    if (deliverables.includes("banners") || deliverables.includes("social") || deliverables.includes("pitch")) {
      if (!ids.includes("brand-kit")) ids.push("brand-kit");
    }
    if (deliverables.includes("banners")) ids.push("banner-design");
    if (deliverables.includes("social") || deliverables.includes("pitch")) ids.push("campaign");
    if (deliverables.includes("figma-edit")) ids.push("figma-edit");
    if (deliverables.includes("design-system")) ids.push("design-system");
    if (ids.length && !ids.includes("design-qa") && !deliverables.includes("figma-edit")) {
      ids.push("design-qa");
    }
    if (deliverables.includes("figma-edit") && !ids.includes("design-qa")) ids.push("design-qa");
  }

  if (wantsWebsite && deliverables.includes("banners")) ids.push("banner-design");
  if (wantsWebsite && (deliverables.includes("social") || deliverables.includes("pitch"))) {
    ids.push("campaign");
  }
  if (wantsWebsite && deliverables.includes("figma-edit")) ids.push("figma-edit");
  if (wantsWebsite && deliverables.includes("design-system")) ids.push("design-system");

  return [...new Set(ids)];
}

export const DELIVERABLE_LABELS: Record<DeliverableId, string> = {
  website: "Website redesign",
  wireframes: "Wireframes / IA",
  banners: "Banners & display ads",
  "figma-edit": "Edit existing Figma",
  landing: "Landing page",
  social: "Social / campaign",
  "design-system": "Design system",
  pitch: "Pitch / presentation",
};
