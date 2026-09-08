import {
  firstFontFromStack,
  isGutenbergDefaultSlug,
  isTailwindScaleSlug,
  isThemeBrandSlug,
} from "./brand-noise.ts";
import { parseCssColor } from "./colors.ts";
import type { BrandColor, BrandFont } from "./types.ts";

export type CssCustomProperty = { name: string; value: string };

export function parseCssCustomProperties(css: string): CssCustomProperty[] {
  const found: CssCustomProperty[] = [];
  const seen = new Set<string>();
  const pattern = /--([a-zA-Z0-9-_]+)\s*:\s*([^;]+)/g;
  for (const match of css.matchAll(pattern)) {
    const name = match[1];
    const value = match[2].trim();
    const key = `${name}:${value}`;
    if (seen.has(key)) continue;
    seen.add(key);
    found.push({ name, value });
  }
  return found;
}

export type ThemeColorToken = {
  hex: string;
  slug: string;
  source: string;
};

export function collectThemeColorTokens(css: string): {
  theme: ThemeColorToken[];
  droppedDefaults: number;
} {
  const theme: ThemeColorToken[] = [];
  const seenHex = new Set<string>();
  let droppedDefaults = 0;

  for (const prop of parseCssCustomProperties(css)) {
    const wp = prop.name.match(/^wp--preset--color--(.+)$/i);
    const named = prop.name.match(/^(?:color-|brand-|theme-)?(primary|secondary|accent|brand)(?:-|$)/i);
    if (!wp && !named) continue;

    const slug = (wp?.[1] || prop.name).toLowerCase();
    if (isGutenbergDefaultSlug(slug) || isTailwindScaleSlug(slug)) {
      droppedDefaults += 1;
      continue;
    }
    if (wp && !isThemeBrandSlug(slug)) continue;

    const hex = parseCssColor(prop.value);
    if (!hex || seenHex.has(hex)) continue;
    seenHex.add(hex);
    theme.push({
      hex,
      slug,
      source: wp ? `wp theme ${slug}` : `css ${prop.name}`,
    });
  }

  return { theme, droppedDefaults };
}

export function assignThemeColorRoles(tokens: ThemeColorToken[]): BrandColor[] {
  const colors: BrandColor[] = [];
  const used = new Set<string>();

  const pick = (role: BrandColor["role"], match: (slug: string) => boolean) => {
    const token = tokens.find((item) => !used.has(item.hex) && match(item.slug));
    if (!token) return;
    used.add(token.hex);
    colors.push({ hex: token.hex, role, source: token.source });
  };

  pick("primary", (slug) => /^(body|primary-400|primary-500|primary-600|primary)$/.test(slug));
  pick("accent", (slug) => /^(anchorlink|primary-300|primary-200)$/.test(slug) || /accent/.test(slug));
  pick("secondary", (slug) => /secondary/.test(slug));
  pick("text", (slug) => /^(primary-500|primary-600|text)$/.test(slug));
  pick("background", (slug) => /^(primary-100|background|surface)$/.test(slug));

  if (!colors.some((item) => item.role === "primary")) {
    pick("primary", (slug) => /primary/.test(slug));
  }

  for (const token of tokens) {
    if (used.has(token.hex)) continue;
    colors.push({ hex: token.hex, role: "palette", source: token.source });
    used.add(token.hex);
    if (colors.length >= 8) break;
  }

  return colors;
}

export function collectThemeFonts(css: string): BrandFont[] {
  const families: BrandFont[] = [];
  const seen = new Set<string>();

  for (const prop of parseCssCustomProperties(css)) {
    const wp = prop.name.match(/^wp--preset--font-family--(.+)$/i);
    if (!wp) continue;
    const family = firstFontFromStack(prop.value);
    if (!family || seen.has(family.toLowerCase())) continue;
    seen.add(family.toLowerCase());
    const slug = wp[1].toLowerCase();
    families.push({
      family,
      role: slug.includes("mono") ? "mono" : families.length === 0 ? "display" : "body",
      source: `wp theme ${slug}`,
    });
  }

  return families;
}
