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
    blurb: "Default. Brand kit, wireframes, hi-fi desktop and mobile, QA — one Cloud Agent.",
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
    status: "next",
    blurb: "After the website (or when ads are the only ask). One idea, many sizes.",
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
    status: "next",
    blurb: "Extend the site into 1:1, 4:5, 9:16, LinkedIn.",
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
