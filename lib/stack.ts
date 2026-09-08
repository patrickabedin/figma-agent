/** House stack for Website / Landing jobs. Banners, social, and in-file edits stay Figma-native. */

export const CODE_STACK = [
  {
    id: "next",
    name: "Next.js App Router",
    role: "One real page at a time. RSC. Not eight Figma pages in one run.",
  },
  {
    id: "tailwind",
    name: "Tailwind v4",
    role: "Utilities + CSS variables from the extracted brand kit. No leftover template theme.",
  },
  {
    id: "type",
    name: "next/font + client face",
    role: "The face in the brand kit. Never Inter-by-default unless Inter is that face.",
  },
  {
    id: "shadcn",
    name: "shadcn/ui primitives only",
    role: "Button, input, dialog, nav. Restyle to client tokens. Never ship default shadcn chrome.",
  },
  {
    id: "icons",
    name: "Phosphor / HugeIcons / Radix / Tabler",
    role: "TasteSkill icon set. Lucide discouraged. No hand-rolled icon sprites.",
  },
  {
    id: "motion",
    name: "Motion (motion/react)",
    role: "Only if the design-read motion dial needs it. No Aceternity / Magic UI as the look.",
  },
  {
    id: "taste",
    name: "TasteSkill v2 + redesign + image-to-code",
    role: "Written read, audit on live sites, section comps, then implement against the pick.",
  },
  {
    id: "images",
    name: "OpenRouter photography",
    role: "POST /api/image. Nano Banana 2 for light, Ideogram/Recraft for type-in-image, GPT Image 2 for edits.",
  },
  {
    id: "vercel",
    name: "Vercel preview",
    role: "Shareable URL after the page exists. Local npm run dev is enough to build and screenshot.",
  },
  {
    id: "figma-handoff",
    name: "html.to.design after accept",
    role: "Import the rendered preview into a new client Figma file. Not generate_figma_design as first output.",
  },
] as const;

export const WEBSITE_STOP_GATES = [
  "PHASE A — Written design read + three dials (variance / motion / density). Stop. Wait for human OK.",
  "PHASE B — Live URL: written redesign audit (what to preserve vs overhaul). Stop.",
  "PHASE C — Three section comps only (hero, proof, about/offer) via POST /api/image. Stop. Human picks.",
  "PHASE D — Implement one homepage or one landing in Next. Screenshot desktop + mobile. Written pre-flight. Any Fail blocks done.",
  "PHASE E — Vercel preview URL (or local screenshots if deploy is blocked). Do not open eight pages.",
  "PHASE F — Only after human accept: html.to.design into a new Hellenic client file. Logos as SVG. Not the Operating Kit.",
] as const;

export const CODE_QUALITY_GATES = [
  "Client type and palette are bound as tokens — no Inter-by-default, no leftover shadcn zinc",
  "Type scale is systematic (display / h1–h3 / body / caption) with real line-height",
  "Spacing uses an 8px (or brand) grid; no random 13/17/23px gaps",
  "Desktop and mobile are designed as siblings, not a squashed stretch",
  "Contrast meets WCAG AA for text and essential UI",
  "Real client language is used — no lorem, no leftover “Title / Button”",
  "shadcn is primitives only; radii, color, shadow, type match the kit",
  "Logos are SVG or intrinsic-ratio images — never object-fit scale-fill on marks",
  "Photography came from OpenRouter or the live site; no empty gray photo slots",
  "Written TasteSkill pre-flight is attached; any Fail is still open",
  "TasteSkill: no mesh / AI-purple / neon glow unless the brand is purple (LILA)",
  "TasteSkill: no three equal feature, case-study, or ad tiles in a row",
  "TasteSkill: no em-dashes, 00 / INDEX eyebrows, or TYPE / FORM / MOTION strips",
  "TasteSkill: no Elevate / Unleash / Seamless, fake product UI, or Magic UI chrome as the system",
] as const;

export const FIGMA_HANDOFF_STEPS = [
  "Human accepted the Vercel preview (or local screenshots).",
  "Create a new Figma file on the Hellenic Technologies team named “{Client} — Website”. Never the Operating Kit.",
  "Import desktop and mobile via html.to.design (URL or outerHTML). Prefer native layers over a screenshot.",
  "Replace any rasterized logos with SVG. Do not scale-fill marks.",
  "Designer edits in Figma. Code stays source of truth unless the team says otherwise.",
] as const;
