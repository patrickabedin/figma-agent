/** Known editor/framework palettes that leak into scraped CSS. Not client brand. */

export const GUTENBERG_DEFAULT_SLUGS = new Set([
  "black",
  "cyan-bluish-gray",
  "white",
  "pale-pink",
  "vivid-red",
  "luminous-vivid-orange",
  "luminous-vivid-amber",
  "light-green-cyan",
  "vivid-green-cyan",
  "pale-cyan-blue",
  "vivid-cyan-blue",
  "vivid-purple",
  "inherit",
  "current",
  "transparent",
]);

/** Gutenberg core default palette (WP 5.9–6.x). */
export const GUTENBERG_DEFAULT_HEX = new Set([
  "#000000",
  "#ABB8C3",
  "#FFFFFF",
  "#F78DA7",
  "#CF2E2E",
  "#FF6900",
  "#FCB900",
  "#7BDCB5",
  "#00D084",
  "#8ED1FC",
  "#0693E3",
  "#9B51E6",
  "#9B51E0",
]);

const TAILWIND_HUE = new Set([
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
]);

const PARTNER_LOGO = /vivawallet|visa|mastercard|paypal|apple-pay|google-pay|stripe|amex|maestro/i;

export function isGutenbergDefaultSlug(slug: string): boolean {
  return GUTENBERG_DEFAULT_SLUGS.has(slug.toLowerCase());
}

export function isTailwindScaleSlug(slug: string): boolean {
  const match = slug.toLowerCase().match(/^([a-z]+)-(\d{2,3})$/);
  return !!match && TAILWIND_HUE.has(match[1]);
}

export function isThemeBrandSlug(slug: string): boolean {
  return /^(primary|secondary|accent|brand|header-primary|header-secondary|footer-primary|footer-secondary|body|anchorlink|text|background|surface|muted)(-|$)/i.test(
    slug,
  );
}

export function isNoiseHex(hex: string): boolean {
  return GUTENBERG_DEFAULT_HEX.has(hex.toUpperCase());
}

export function isPartnerLogo(url: string): boolean {
  return PARTNER_LOGO.test(url);
}

export function isUsableFontName(name: string): boolean {
  const cleaned = name.replace(/["']/g, "").replace(/\s*!important\s*/gi, "").trim();
  if (!cleaned) return false;
  if (/^(inherit|initial|unset|revert)$/i.test(cleaned)) return false;
  if (/^var\(/i.test(cleaned) || cleaned.includes("--")) return false;
  if (/emoji/i.test(cleaned)) return false;
  return true;
}

export function firstFontFromStack(stack: string): string | null {
  for (const part of stack.split(",")) {
    const name = part.replace(/["']/g, "").replace(/\s*!important\s*/gi, "").trim();
    if (!isUsableFontName(name)) continue;
    if (SYSTEM_FONT_NAMES.has(name.toLowerCase())) continue;
    return name;
  }
  return null;
}

export const SYSTEM_FONT_NAMES = new Set(
  [
    "arial",
    "helvetica",
    "times",
    "times new roman",
    "georgia",
    "verdana",
    "tahoma",
    "trebuchet ms",
    "courier",
    "courier new",
    "system-ui",
    "sans-serif",
    "serif",
    "monospace",
    "cursive",
    "fantasy",
    "ui-sans-serif",
    "ui-serif",
    "ui-monospace",
    "apple color emoji",
    "segoe ui",
    "segoe ui emoji",
    "roboto",
    "-apple-system",
    "blinkmacsystemfont",
  ].map((name) => name.toLowerCase()),
);

export function extractSvgFills(svg: string): string[] {
  const found: string[] = [];
  const hexes = svg.matchAll(/fill=["'](#(?:[0-9a-f]{3}|[0-9a-f]{6}))["']/gi);
  for (const match of hexes) {
    const raw = match[1].toUpperCase();
    const hex =
      raw.length === 4
        ? `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`
        : raw;
    if (hex !== "#000000" && hex !== "#FFFFFF") found.push(hex);
  }
  return [...new Set(found)];
}

export function isPhoneLabel(label: string): boolean {
  return /^\+?\d[\d\s().-]{6,}$/.test(label.trim());
}

export function isLegalNavLabel(label: string): boolean {
  return /terms of use|terms and conditions|privacy policy|cookie policy|website terms/i.test(label);
}
