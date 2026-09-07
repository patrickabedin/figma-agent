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

export type AgentPacket = {
  agentId: AgentId;
  title: string;
  summary: string;
  prompt: string;
  recommendedModel: string;
  recommendedModelLabel: string;
  designRead: string;
};

export type StudioBrief = {
  createdAt: string;
  input: BriefInput;
  brandKit: BrandKit;
  packets: AgentPacket[];
  designRead: string;
  recommendedModel: string;
  recommendedModelLabel: string;
};
