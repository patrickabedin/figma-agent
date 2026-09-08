import type { BrandKit, BriefInput } from "./types";

export const TASTE_STACK = [
  {
    id: "anti-slop",
    name: "Anti-slop adapter",
    href: "https://www.tasteskill.dev/",
    role: "House map of TasteSkill onto every Hellenic surface: sites, banners, social, pitch, wireframes, edits.",
    path: ".cursor/skills/anti-slop/SKILL.md",
    when: "Every visual job, before drawing",
  },
  {
    id: "design-taste-frontend",
    name: "TasteSkill v2",
    href: "https://www.tasteskill.dev/",
    role: "Anti-slop design read, LILA rule, banned AI tells. Trained on thousands of generated-page failures.",
    path: ".cursor/skills/design-taste-frontend/SKILL.md",
    when: "Every hi-fi, banner, social, and pitch pass",
  },
  {
    id: "gpt-taste",
    name: "TasteSkill GPT",
    href: "https://www.tasteskill.dev/",
    role: "Stricter TasteSkill variant when the Cloud Agent is GPT or Codex.",
    path: ".cursor/skills/gpt-taste/SKILL.md",
    when: "Parent model is GPT / Codex",
  },
  {
    id: "ui-craft",
    name: "ui-craft",
    href: "https://github.com/educlopez/ui-craft",
    role: "Designer-grade layout, type, color, and polish. Discovery before drawing.",
    path: ".cursor/skills/ui-craft/SKILL.md",
    when: "Hi-fi, banners, social, brand boards",
  },
  {
    id: "redesign-existing-projects",
    name: "TasteSkill redesign",
    href: "https://www.tasteskill.dev/docs",
    role: "Audit-first on a live site or existing file. Preserve IA and brand. Do not silently invent a new product.",
    path: ".cursor/skills/redesign-existing-projects/SKILL.md",
    when: "Client already has a site or Figma file",
  },
  {
    id: "web-design-guidelines",
    name: "Vercel Web Interface Guidelines",
    href: "https://github.com/vercel-labs/agent-skills",
    role: "Focus, keyboard, forms, touch, reduced motion, hierarchy.",
    path: ".cursor/skills/web-design-guidelines/SKILL.md",
    when: "QA and any coded implementation",
  },
  {
    id: "full-output-enforcement",
    name: "TasteSkill output",
    href: "https://www.tasteskill.dev/docs",
    role: "No placeholders, no skipped sections, no half-finished frames.",
    path: ".cursor/skills/full-output-enforcement/SKILL.md",
    when: "Every Figma and code deliverable",
  },
  {
    id: "image-to-code",
    name: "TasteSkill image-to-code",
    href: "https://www.tasteskill.dev/docs",
    role: "Reference frames first when the brief is visual. Implement against the reference.",
    path: ".cursor/skills/image-to-code/SKILL.md",
    when: "Designer attaches a mock or wants a coded site from Figma",
  },
  {
    id: "vercel-react-best-practices",
    name: "Vercel React best practices",
    href: "https://github.com/vercel-labs/agent-skills",
    role: "Performance when the website is implemented in Next.js, not when drawing Figma.",
    path: ".agents/skills/vercel-react-best-practices/SKILL.md",
    when: "Code implementation only",
  },
] as const;

export const ANTI_SLOP_BANS = [
  "AI-purple / mesh-blob / neon glow backgrounds unless the brand is explicitly purple (LILA rule)",
  "Three equal feature or case-study cards in a row — also three identical ad tiles",
  "Inter + slate-900 as a default when the client has a face and palette",
  "Centered hero on a dark mesh with glass cards",
  "Em-dashes, section-number eyebrows (00 / INDEX), decoration strips (TYPE / FORM / MOTION)",
  "Fake product UI built from empty rectangles",
  "Lorem, Acme, Jane Doe, Elevate / Unleash / Seamless",
  "Pills overlaid on photos, scroll-to-explore cues, version stamps on marketing pages",
  "A whole landing page crammed into a 300×250, or a new concept per banner size",
] as const;

export function tasteLoadLines(opts?: { gpt?: boolean; redesign?: boolean }): string[] {
  const lines = [
    ".cursor/skills/anti-slop/SKILL.md",
    ".cursor/skills/image-models/SKILL.md",
    ".cursor/skills/design-taste-frontend/SKILL.md",
  ];
  if (opts?.gpt) lines.push(".cursor/skills/gpt-taste/SKILL.md");
  if (opts?.redesign) lines.push(".cursor/skills/redesign-existing-projects/SKILL.md");
  lines.push(".cursor/skills/ui-craft/SKILL.md", ".cursor/skills/full-output-enforcement/SKILL.md");
  return lines;
}

export function inferSurface(input: BriefInput): string {
  const dels = input.deliverables;
  const website = dels.includes("website") || dels.includes("landing");
  if (dels.includes("figma-edit") && !website && !dels.includes("banners") && !dels.includes("social")) {
    return "in-file redesign";
  }
  if (dels.includes("banners") && !website) return "display banner campaign";
  if (dels.includes("pitch") && !website) return "pitch deck";
  if (dels.includes("social") && !website) return "social campaign";
  if (dels.includes("wireframes") && !website) return "wireframes / IA";
  if (dels.includes("landing") && !dels.includes("website")) return "landing";
  return "marketing website redesign";
}

export function inferDesignRead(input: BriefInput, kit: BrandKit): string {
  const blob = [input.audience, input.goals, kit.tagline, kit.description, kit.voice.join(" ")]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const pageKind = inferSurface(input);
  const audience = input.audience || "business buyers";

  let vibe = "serious B2B services";
  if (/editorial|magazine|publisher/.test(blob)) vibe = "editorial";
  else if (/luxury|premium|hotel|fashion/.test(blob)) vibe = "premium consumer";
  else if (/playful|kids|game/.test(blob)) vibe = "playful";
  else if (/gov|public|health|legal/.test(blob)) vibe = "trust-first";
  else if (/agency|marketing|ai agents|website/.test(blob)) vibe = "agency, type-led, not SaaS-template";

  const family = kit.fonts[0]?.family
    ? `${kit.fonts[0].family} + client palette`
    : "client type + restrained accent";

  return `Reading this as: ${pageKind} for ${audience}, with a ${vibe} language, leaning toward ${family}. Not an AI-purple SaaS landing.`;
}
