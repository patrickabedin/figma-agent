export const BANNER_SIZES = [
  { name: "Display leaderboard", width: 728, height: 90, use: "Google Display" },
  { name: "Display medium rectangle", width: 300, height: 250, use: "Google Display / IAB" },
  { name: "Display half page", width: 300, height: 600, use: "Google Display" },
  { name: "Display billboard", width: 970, height: 250, use: "Premium display" },
  { name: "Display large mobile", width: 320, height: 100, use: "Mobile web" },
  { name: "Meta feed 1:1", width: 1080, height: 1080, use: "Facebook / Instagram feed" },
  { name: "Meta story 9:16", width: 1080, height: 1920, use: "Stories / Reels" },
  { name: "Meta landscape 1.91:1", width: 1200, height: 628, use: "Link ads" },
  { name: "LinkedIn landscape", width: 1200, height: 627, use: "Sponsored content" },
  { name: "LinkedIn square", width: 1080, height: 1080, use: "LinkedIn feed" },
  { name: "YouTube cover", width: 2560, height: 1440, use: "Channel art" },
  { name: "Site hero 16:9", width: 1920, height: 1080, use: "Website hero / campaign" },
] as const;

export const WEB_BREAKPOINTS = [
  { name: "Mobile", width: 390, height: 844 },
  { name: "Tablet", width: 768, height: 1024 },
  { name: "Desktop", width: 1440, height: 1024 },
  { name: "Wide", width: 1728, height: 1117 },
] as const;

export const DEFAULT_WEBSITE_PAGES = [
  "Home",
  "About / Company",
  "Services or Product",
  "Case studies / Work",
  "Contact",
] as const;

export const QUALITY_GATES = [
  "Brand colors, type, and logo treatment match the kit — no default Inter unless it is the brand font",
  "Type scale is systematic (display / h1–h3 / body / caption) with real line-height",
  "Spacing uses an 8px (or brand) grid; no random 13/17/23px gaps",
  "Desktop and mobile are designed as siblings, not a squashed stretch",
  "Contrast meets WCAG AA for text and essential UI",
  "Real client language is used — no lorem, no leftover “Title / Button”",
  "Repeated UI is componentized before handoff",
  "Auto-layout is used for every structural group",
  "Imagery is cropped with intent; no empty gray photo slots in final comps",
  "A QA page lists open questions and deviations from the brief",
] as const;
