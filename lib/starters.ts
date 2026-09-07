export type Starter = {
  id: string;
  title: string;
  status: "live" | "next";
  blurb: string;
  href: string;
};

export const STARTERS: Starter[] = [
  {
    id: "website",
    title: "Website Agent",
    status: "live",
    blurb: "Default site job on Claude Opus thinking. Brand kit, wires, hi-fi, QA — one Cloud Agent.",
    href: "/starters#website",
  },
  {
    id: "wireframes",
    title: "Wireframes only",
    status: "next",
    blurb: "When the sitemap is still the argument. Grayscale, no color pass.",
    href: "/starters#wireframes",
  },
  {
    id: "banners",
    title: "Banners / Campaign",
    status: "live",
    blurb: "Ads-only or after the site. One idea, many sizes. Same TasteSkill bans. Opus thinking.",
    href: "/starters#banners",
  },
  {
    id: "figma-edit",
    title: "Figma Editor",
    status: "next",
    blurb: "Change an existing file. Do not rebuild it.",
    href: "/starters#figma-edit",
  },
  {
    id: "campaign",
    title: "Social / launch",
    status: "live",
    blurb: "Extend the site into 1:1, 4:5, 9:16, LinkedIn. Opus thinking. No new brand per ratio.",
    href: "/starters#campaign",
  },
  {
    id: "design-system",
    title: "Design system",
    status: "next",
    blurb: "After the first site is approved. Tokens and components for the retainer.",
    href: "/starters#design-system",
  },
];
