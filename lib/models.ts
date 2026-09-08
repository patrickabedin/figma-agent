import type { AgentId, BriefInput, DeliverableId, ImageJob, ImagePlan, ImageSpecialistId } from "./types";

export type ImageSpecialist = {
  id: ImageSpecialistId;
  label: string;
  maker: string;
  strength: string;
  use: string;
  never: string;
  call: string;
  href: string;
  openrouter: string;
  openrouterNote?: string;
};

export const IMAGE_SPECIALISTS: Record<ImageSpecialistId, ImageSpecialist> = {
  midjourney: {
    id: "midjourney",
    label: "Midjourney",
    maker: "Midjourney",
    strength: "Artistic aesthetics, mood, and style consistency",
    use: "Mood frames, campaign atmosphere, illustrated or luxury looks. Style lock across a set.",
    never: "Do not bake headlines, CTAs, or legal type into Midjourney. Set type in Next or Figma, or send type jobs to Ideogram.",
    call: "POST /api/image { specialist: \"midjourney\" } → OpenRouter black-forest-labs/flux.2-max. Midjourney itself is not on OpenRouter; use the designer Midjourney account when you need that exact look.",
    href: "https://www.midjourney.com/",
    openrouter: "black-forest-labs/flux.2-max",
    openrouterNote: "Midjourney is not on OpenRouter. FLUX.2 [max] is the closest high-aesthetic call. Run real Midjourney when the mood lock must be MJ.",
  },
  "gpt-image-2": {
    id: "gpt-image-2",
    label: "GPT Image 2",
    maker: "OpenAI",
    strength: "Complex detail, hyper-precise instruction following, integrated editing",
    use: "“Keep this, change that” edits, multi-clause prompts, in-file photo surgery.",
    never: "Do not use it as the default art-director for mood. Midjourney owns atmosphere.",
    call: "POST /api/image { specialist: \"gpt-image-2\" } → OpenRouter openai/gpt-image-2",
    href: "https://openrouter.ai/openai/gpt-image-2",
    openrouter: "openai/gpt-image-2",
  },
  "nano-banana-2": {
    id: "nano-banana-2",
    label: "Nano Banana 2",
    maker: "Google DeepMind",
    strength: "Class-leading photorealism and natural lighting",
    use: "Hero photography, people, product-in-scene, daylight and interior light.",
    never: "Do not use it for poster type or logo lockups. That is Ideogram.",
    call: "POST /api/image { specialist: \"nano-banana-2\" } → OpenRouter google/gemini-3.1-flash-image",
    href: "https://openrouter.ai/google/gemini-3.1-flash-image",
    openrouter: "google/gemini-3.1-flash-image",
  },
  "flux-2": {
    id: "flux-2",
    label: "FLUX.2",
    maker: "Black Forest Labs",
    strength: "High-end realism, advanced control, open-weights flexibility",
    use: "Controlled product shots, pose/color lock, open or self-hosted pipelines.",
    never: "Do not force FLUX to render a 12-word headline. Use Ideogram or Figma type.",
    call: "POST /api/image { specialist: \"flux-2\" } → OpenRouter black-forest-labs/flux.2-pro",
    href: "https://openrouter.ai/black-forest-labs/flux.2-pro",
    openrouter: "black-forest-labs/flux.2-pro",
  },
  ideogram: {
    id: "ideogram",
    label: "Ideogram 4.0 / 3.0",
    maker: "Ideogram",
    strength: "Crisp, legible typography and embedded text",
    use: "Banners, social, pitch covers, posters — when the words live inside the image.",
    never: "Do not use Ideogram as the photoreal people/product engine. Pair a plate from Nano Banana 2 or FLUX.2.",
    call: "POST /api/image { specialist: \"ideogram\" } → OpenRouter recraft/recraft-v4.1-pro (Ideogram is not on OpenRouter; Recraft is the type/design stand-in). Prefer a real Ideogram account when the headline must be print-perfect.",
    href: "https://developer.ideogram.ai/",
    openrouter: "recraft/recraft-v4.1-pro",
    openrouterNote: "Ideogram 4.0/3.0 is not on OpenRouter. Recraft v4.1 Pro is the type-in-image stand-in. GPT Image 2 is the edit fallback.",
  },
  "stable-diffusion-3.5": {
    id: "stable-diffusion-3.5",
    label: "Stable Diffusion 3.5",
    maker: "Stability AI",
    strength: "Open-weight customization, local hosting, fine-tuning",
    use: "Brand LoRAs, air-gapped clients, a look you will reuse for months.",
    never: "Do not start a one-off client job here unless they already have a trained look.",
    call: "POST /api/image { specialist: \"stable-diffusion-3.5\" } → OpenRouter black-forest-labs/flux.2-flex. SD 3.5 weights stay local when the client needs a LoRA or air-gap.",
    href: "https://stability.ai/",
    openrouter: "black-forest-labs/flux.2-flex",
    openrouterNote: "Stable Diffusion 3.5 is not on OpenRouter. FLUX.2 [flex] is the controllable open-family stand-in. Use local SD 3.5 for brand LoRAs.",
  },
  "firefly-5": {
    id: "firefly-5",
    label: "Adobe Firefly 5",
    maker: "Adobe",
    strength: "Professional graphic workflows and blending into existing photos",
    use: "Composites, generative fill, Creative Cloud handoff, editing a real client plate.",
    never: "Do not invent a new campaign look in Firefly when Midjourney already set the mood.",
    call: "POST /api/image { specialist: \"firefly-5\" } → OpenRouter openai/gpt-image-2 with input_references. Firefly itself stays in Creative Cloud for official composites.",
    href: "https://www.adobe.com/products/firefly.html",
    openrouter: "openai/gpt-image-2",
    openrouterNote: "Firefly 5 is not on OpenRouter. GPT Image 2 with a source plate is the API edit/blend. Use Firefly in CC when the handoff must stay in Adobe.",
  },
};

export const IMAGE_ROSTER = [
  IMAGE_SPECIALISTS.midjourney,
  IMAGE_SPECIALISTS["gpt-image-2"],
  IMAGE_SPECIALISTS["nano-banana-2"],
  IMAGE_SPECIALISTS["flux-2"],
  IMAGE_SPECIALISTS.ideogram,
  IMAGE_SPECIALISTS["stable-diffusion-3.5"],
  IMAGE_SPECIALISTS["firefly-5"],
] as const;

function job(id: ImageSpecialistId, role: string, why: string): ImageJob {
  const specialist = IMAGE_SPECIALISTS[id];
  return {
    role,
    specialistId: id,
    label: specialist.label,
    why,
    call: specialist.call,
  };
}

function blobOf(input: Pick<BriefInput, "goals" | "audience">, extra?: string): string {
  return `${input.goals ?? ""} ${input.audience ?? ""} ${extra ?? ""}`.toLowerCase();
}

function wantsTypeInImage(blob: string, deliverables: DeliverableId[]): boolean {
  if (/headline|poster|lockup|wordmark|type in (the )?image|baked (in )?type/.test(blob)) return true;
  return deliverables.includes("banners") || deliverables.includes("social") || deliverables.includes("pitch");
}

function wantsPhotoreal(blob: string): boolean {
  return /photo|people|portrait|product|hotel|interior|lighting|realism|photoreal/.test(blob);
}

function wantsMood(blob: string): boolean {
  return /mood|atmosphere|editorial|luxury|fashion|illustrated|artistic|cinematic/.test(blob);
}

function wantsEdit(blob: string): boolean {
  return /edit|keep this|change that|remove|retouch|existing photo|composite|blend|photoshop/.test(blob);
}

function wantsCustom(blob: string): boolean {
  return /lora|fine-?tune|self-?host|local model|open.?weight|air-?gapped/.test(blob);
}

export function recommendImagePlan(input: Pick<BriefInput, "deliverables" | "goals" | "audience" | "existingFigmaUrl">, agentId?: AgentId): ImagePlan {
  const dels = input.deliverables;
  const blob = blobOf(input);
  const notes = [
    "These are image specialists. They are not the Cloud Agent chat model.",
    "Set website UI type in the Next app. Banner/social type-in-image goes to Ideogram.",
    "Capture live-site photography first. Generate only what is missing.",
    "POST /api/image { specialist, prompt } — Atelier calls OpenRouter. One studio key.",
  ];

  if (agentId === "wireframe" || (dels.length === 1 && dels[0] === "wireframes")) {
    return {
      primary: job("nano-banana-2", "None yet", "Wireframes stay grayscale. Do not generate photography."),
      supporting: [],
      notes: ["No image models on a wireframe pass."],
    };
  }

  if (agentId === "intake" || agentId === "design-system") {
    return {
      primary: job("midjourney", "Later", "Intake and libraries do not generate campaign art."),
      supporting: [],
      notes: ["Image specialists wait until hi-fi, banners, or an edit."],
    };
  }

  if (wantsCustom(blob)) {
    return {
      primary: job("stable-diffusion-3.5", "Brand-trained look", "Client needs a fine-tune, LoRA, or local weights."),
      supporting: [
        job("flux-2", "Controlled plate", "Open pipeline with pose/color lock."),
        job("firefly-5", "Composite", "Blend the trained look into existing photos."),
      ],
      notes,
    };
  }

  if (agentId === "figma-edit" || (dels.includes("figma-edit") && !dels.includes("website") && !dels.includes("banners"))) {
    return {
      primary: job("gpt-image-2", "Precise edit", "Keep layout, change only what the brief named."),
      supporting: [
        job("firefly-5", "Blend / fill", "Compositing into a real client plate, Creative Cloud handoff."),
        job("nano-banana-2", "Replacement photo", "Only if the edit needs a new photoreal plate."),
      ],
      notes,
    };
  }

  if (agentId === "banner-design" || agentId === "campaign" || wantsTypeInImage(blob, dels)) {
    const primary = wantsMood(blob) && !/type|headline|offer/.test(blob)
      ? job("midjourney", "Campaign mood", "Atmosphere first; type goes on in Next, Figma, or Ideogram.")
      : job("ideogram", "Type in the frame", "Headlines, offers, and CTAs that must read inside the image.");
    return {
      primary,
      supporting: [
        job("nano-banana-2", "Photoreal plate", "People, product, and lighting behind the type."),
        job("midjourney", "Mood frames", "Style consistency before the resize set."),
        job("gpt-image-2", "Instruction edit", "Tighten a near-miss without a new concept."),
      ],
      notes,
    };
  }

  if (wantsEdit(blob) && (dels.includes("website") || dels.includes("landing") || Boolean(input.existingFigmaUrl))) {
    return {
      primary: job("gpt-image-2", "Directed edit", "Multi-clause changes to an existing plate."),
      supporting: [
        job("firefly-5", "Composite", "Blend into the live-site photograph."),
        job("nano-banana-2", "New photoreal", "If the plate cannot be saved."),
      ],
      notes,
    };
  }

  if (wantsMood(blob) && !wantsPhotoreal(blob)) {
    return {
      primary: job("midjourney", "Art direction", "Mood and style lock for the site or campaign."),
      supporting: [
        job("nano-banana-2", "Photoreal fallback", "When a frame must look like a photograph."),
        job("ideogram", "Type lockup", "Only if words must live in the picture."),
      ],
      notes,
    };
  }

  if (wantsPhotoreal(blob) && /product|packshot|control|pose/.test(blob)) {
    return {
      primary: job("flux-2", "Controlled realism", "Product, pose, and color lock with open-weight option."),
      supporting: [
        job("nano-banana-2", "Natural light", "Lifestyle and interior lighting."),
        job("firefly-5", "Blend", "Drop the product into a client photo."),
      ],
      notes,
    };
  }

  return {
    primary: job("nano-banana-2", "Photoreal imagery", "Hero, people, product-in-scene, natural light."),
    supporting: [
      job("midjourney", "Mood frames", "Art direction before the hi-fi pass."),
      job("flux-2", "Controlled product", "When the shot needs pose or color lock."),
      job("gpt-image-2", "Edits", "Keep this, change that on a captured plate."),
      job("ideogram", "Type-in-image", "Only for ads or covers — not website UI type."),
    ],
    notes,
  };
}

export function recommendModel(deliverables: DeliverableId[], goals = "", audience = ""): ImageSpecialist {
  const plan = recommendImagePlan({ deliverables, goals, audience, existingFigmaUrl: "" });
  return IMAGE_SPECIALISTS[plan.primary.specialistId];
}

export function modelForAgent(agentId: AgentId, deliverables: DeliverableId[] = defaultDeliverables(agentId)): ImageSpecialist {
  const plan = recommendImagePlan(
    { deliverables, goals: "", audience: "", existingFigmaUrl: "" },
    agentId,
  );
  return IMAGE_SPECIALISTS[plan.primary.specialistId];
}

function defaultDeliverables(agentId: AgentId): DeliverableId[] {
  if (agentId === "banner-design") return ["banners"];
  if (agentId === "campaign") return ["social"];
  if (agentId === "wireframe") return ["wireframes"];
  if (agentId === "figma-edit") return ["figma-edit"];
  if (agentId === "web-design" || agentId === "website-job") return ["website"];
  return ["website"];
}

export function formatImagePlan(plan: ImagePlan): string {
  const lines = [
    "IMAGE SPECIALISTS (Cursor must call these — not the chat model)",
    `- Primary: ${plan.primary.label} — ${plan.primary.role}. ${plan.primary.why}`,
    `- Call: ${plan.primary.call}`,
    ...plan.supporting.map((item) => `- Supporting: ${item.label} — ${item.role}. ${item.why}`),
    ...plan.notes.map((note) => `- ${note}`),
    "- Load .cursor/skills/image-models/SKILL.md before generating any pixels",
  ];
  return lines.join("\n");
}

/** @deprecated Chat-model family check is unused. Image specialists are the design models. */
export function isGptFamily(parentModel?: string): boolean {
  return !!parentModel && /gpt|codex|openai/i.test(parentModel);
}
