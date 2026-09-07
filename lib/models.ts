import type { AgentId, DeliverableId } from "./types";

export type DesignModel = {
  id: string;
  label: string;
  slug: string;
  use: string;
  family: "claude" | "gpt" | "other";
};

export const DESIGN_MODELS = {
  visualLead: {
    id: "visual-lead",
    label: "Claude Opus 5 thinking (high)",
    slug: "claude-opus-5-thinking-high",
    use: "Hi-fi websites, banners, social, pitch, brand kits, design QA",
    family: "claude",
  },
  visualMax: {
    id: "visual-max",
    label: "Claude Opus 5 thinking (extra high)",
    slug: "claude-opus-5-thinking-xhigh",
    use: "Hard art-direction, Awwwards-level, or when the first pass still looks templated",
    family: "claude",
  },
  structure: {
    id: "structure",
    label: "Claude Sonnet 5 thinking (high)",
    slug: "claude-sonnet-5-thinking-high",
    use: "Wireframes, IA, intake, Figma edits that are copy/component swaps",
    family: "claude",
  },
  gptVisual: {
    id: "gpt-visual",
    label: "GPT-5.6 (xhigh) + TasteSkill gpt-taste",
    slug: "gpt-5.6-sol-xhigh",
    use: "When the Cloud Agent is a GPT/Codex model. Load gpt-taste. Do not use a mini/fast GPT for pixels.",
    family: "gpt",
  },
} as const satisfies Record<string, DesignModel>;

export const MODEL_TABLE = [
  DESIGN_MODELS.visualLead,
  DESIGN_MODELS.visualMax,
  DESIGN_MODELS.structure,
  DESIGN_MODELS.gptVisual,
] as const;

export function isGptFamily(parentModel?: string): boolean {
  return !!parentModel && /gpt|codex|openai/i.test(parentModel);
}

export function recommendModel(deliverables: DeliverableId[], parentModel?: string): DesignModel {
  if (isGptFamily(parentModel)) return DESIGN_MODELS.gptVisual;
  if (
    deliverables.includes("website") ||
    deliverables.includes("landing") ||
    deliverables.includes("banners") ||
    deliverables.includes("social") ||
    deliverables.includes("pitch") ||
    deliverables.includes("design-system")
  ) {
    return DESIGN_MODELS.visualLead;
  }
  if (deliverables.includes("wireframes") || deliverables.includes("figma-edit")) {
    return DESIGN_MODELS.structure;
  }
  return DESIGN_MODELS.visualLead;
}

export function modelForAgent(agentId: AgentId, parentModel?: string): DesignModel {
  if (isGptFamily(parentModel)) return DESIGN_MODELS.gptVisual;
  if (agentId === "wireframe" || agentId === "intake" || agentId === "figma-edit") {
    return DESIGN_MODELS.structure;
  }
  return DESIGN_MODELS.visualLead;
}
