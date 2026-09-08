export const DELIVERABLES = [
  "website",
  "wireframes",
  "banners",
  "figma-edit",
  "landing",
  "social",
  "design-system",
  "pitch",
] as const;

export type DeliverableId = (typeof DELIVERABLES)[number];

export type BrandColorRole =
  | "primary"
  | "secondary"
  | "accent"
  | "background"
  | "surface"
  | "text"
  | "muted"
  | "border";

export type BrandColor = {
  hex: string;
  role: BrandColorRole | "palette";
  source: string;
};

export type BrandFont = {
  family: string;
  role: "display" | "body" | "mono" | "unknown";
  source: string;
};

export type BrandKit = {
  name: string;
  url?: string;
  tagline?: string;
  description?: string;
  colors: BrandColor[];
  fonts: BrandFont[];
  logos: string[];
  imageryNotes: string[];
  voice: string[];
  sitemapHints: string[];
  competitors?: string[];
  warnings: string[];
};

export type BriefInput = {
  clientName: string;
  websiteUrl: string;
  existingFigmaUrl: string;
  goals: string;
  audience: string;
  market: string;
  language: string;
  deliverables: DeliverableId[];
  styleGuideNames: string[];
};

export type AgentId =
  | "website-job"
  | "intake"
  | "brand-kit"
  | "wireframe"
  | "web-design"
  | "banner-design"
  | "figma-edit"
  | "design-qa"
  | "design-system"
  | "campaign";

export type ImageSpecialistId =
  | "midjourney"
  | "gpt-image-2"
  | "nano-banana-2"
  | "flux-2"
  | "ideogram"
  | "stable-diffusion-3.5"
  | "firefly-5";

export type ImageJob = {
  role: string;
  specialistId: ImageSpecialistId;
  label: string;
  why: string;
  call: string;
};

export type ImagePlan = {
  primary: ImageJob;
  supporting: ImageJob[];
  notes: string[];
};

export type AgentPacket = {
  agentId: AgentId;
  title: string;
  summary: string;
  prompt: string;
  recommendedModel: string;
  recommendedModelLabel: string;
  designRead: string;
  imagePlan: ImagePlan;
};

export type StudioBrief = {
  createdAt: string;
  input: BriefInput;
  brandKit: BrandKit;
  packets: AgentPacket[];
  designRead: string;
  recommendedModel: string;
  recommendedModelLabel: string;
  imagePlan: ImagePlan;
};
