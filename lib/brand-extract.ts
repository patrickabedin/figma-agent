import * as cheerio from "cheerio";
import {
  extractSvgFills,
  firstFontFromStack,
  isLegalNavLabel,
  isNoiseHex,
  isPartnerLogo,
  isPhoneLabel,
  isUsableFontName,
  SYSTEM_FONT_NAMES,
} from "./brand-noise";
import {
  clusterHexColors,
  hexToRgb,
  isNearNeutral,
  luminance,
  parseCssColor,
} from "./colors";
import { assignThemeColorRoles, collectThemeColorTokens, collectThemeFonts } from "./css-tokens";
import type { BrandColor, BrandFont, BrandKit } from "./types";
import { normalizeHttpUrl } from "./url-guard";

const FETCH_TIMEOUT_MS = 12000;
const MAX_STYLESHEETS = 5;
const MAX_BODY_CHARS = 400_000;

export async function extractBrandFromUrl(rawUrl: string): Promise<BrandKit> {
  const url = normalizeHttpUrl(rawUrl);
  const html = await fetchText(url);
  const $ = cheerio.load(html);

  const title = clean(
    $('meta[property="og:site_name"]').attr("content") ||
      $("title").first().text() ||
      url.hostname.replace(/^www\./, ""),
  );
  const description = clean(
    $('meta[name="description"]').attr("content") ||
      $('meta[property="og:description"]').attr("content") ||
      "",
  );
  const tagline = clean($("h1").first().text());
  const themeColor = parseCssColor($('meta[name="theme-color"]').attr("content") || "");

  const stylesheetHrefs = $("link[rel='stylesheet']")
    .map((_, el) => $(el).attr("href"))
    .get()
    .filter(Boolean)
    .slice(0, MAX_STYLESHEETS)
    .map((href) => new URL(href!, url).toString());

  const cssChunks = await Promise.all(
    stylesheetHrefs.map(async (href) => {
      try {
        return await fetchText(new URL(href));
      } catch {
        return "";
      }
    }),
  );

  const css = `${$("style").text()}\n${cssChunks.join("\n")}\n${html}`;
  const logos = collectLogos($, url);
  const logoHexes = await collectLogoHexes(logos);
  const { colors, droppedDefaults } = selectBrandColors(css, themeColor, logoHexes);
  const fonts = selectBrandFonts($, css, html);
  const sitemapHints = collectNav($);
  const voice = collectVoice($, description);
  const imageryNotes = collectImagery($);

  const warnings: string[] = [];
  if (droppedDefaults > 0) {
    warnings.push(
      `Dropped ${droppedDefaults} WordPress editor / Tailwind scale colors. Using theme tokens and logo fills.`,
    );
  }
  if (colors.length < 3) {
    warnings.push("Few brand colors were detected. Confirm the palette from the style guide or screenshots.");
  }
  if (fonts.length === 0) {
    warnings.push("No custom fonts were detected. Check Google Fonts, Adobe Fonts, or the uploaded guide.");
  }
  if (fonts.some((font) => font.family.toLowerCase() === "inter")) {
    warnings.push("Inter is the source face on this site — keep it. The Inter ban is only when Inter is a fallback.");
  }
  if (logos.length === 0) {
    warnings.push("No obvious logo asset was found. Upload the official logo files.");
  }

  return {
    name: title || url.hostname,
    url: url.origin,
    tagline: tagline || undefined,
    description: description || undefined,
    colors,
    fonts,
    logos,
    imageryNotes,
    voice,
    sitemapHints,
    warnings,
  };
}

export function emptyBrandKit(name: string, warnings: string[] = []): BrandKit {
  return {
    name,
    colors: [],
    fonts: [],
    logos: [],
    imageryNotes: [],
    voice: [],
    sitemapHints: [],
    warnings,
  };
}

export function selectBrandColors(
  css: string,
  themeColor: string | null,
  logoHexes: string[],
): { colors: BrandColor[]; droppedDefaults: number } {
  const { theme, droppedDefaults } = collectThemeColorTokens(css);
  let colors = assignThemeColorRoles(theme);

  if (logoHexes.length && !colors.some((item) => item.role === "primary")) {
    const logoPrimary = logoHexes.find((hex) => {
      const rgb = hexToRgb(hex);
      return rgb && !isNearNeutral(rgb);
    });
    if (logoPrimary) {
      colors = [{ hex: logoPrimary, role: "primary", source: "logo fill" }, ...colors];
    }
  }

  if (colors.length >= 3) {
    return { colors: colors.slice(0, 8), droppedDefaults };
  }

  const hexes = collectCssColors(css).filter((hex) => !isNoiseHex(hex));
  for (const hex of logoHexes) hexes.unshift(hex);
  if (themeColor && !isNoiseHex(themeColor)) hexes.unshift(themeColor);

  const fallback = assignColorRoles(clusterHexColors(hexes, 10), themeColor && !isNoiseHex(themeColor) ? themeColor : null);
  return { colors: fallback.slice(0, 8), droppedDefaults };
}

export function selectBrandFonts($: CheerioRoot, css: string, html: string): BrandFont[] {
  const fromTheme = collectThemeFonts(css);
  if (fromTheme.length) return fromTheme.slice(0, 4);

  const families = new Set<string>();

  $("link[href*='fonts.googleapis.com'], link[href*='use.typekit.net'], link[href*='fonts.adobe.com']").each(
    (_, el) => {
      const href = $(el).attr("href") || "";
      const familyParams = href.match(/family=([^&]+)/g) || [];
      for (const param of familyParams) {
        decodeURIComponent(param.replace("family=", ""))
          .split("|")
          .forEach((part) => {
            const name = part.split(":")[0]?.replace(/\+/g, " ").trim();
            if (name && isUsableFontName(name) && !SYSTEM_FONT_NAMES.has(name.toLowerCase())) {
              families.add(name);
            }
          });
      }
    },
  );

  for (const match of css.match(/@font-face\s*\{[^}]*font-family\s*:\s*([^;}{]+)/gi) ?? []) {
    const family = firstFontFromStack(match.replace(/@font-face[\s\S]*font-family\s*:\s*/i, ""));
    if (family) families.add(family);
  }

  for (const match of `${css}\n${html}`.match(/font-family\s*:\s*([^;}{]+)/gi) ?? []) {
    const family = firstFontFromStack(match.replace(/font-family\s*:\s*/i, ""));
    if (family) families.add(family);
  }

  return [...families].slice(0, 4).map((family, index) => ({
    family,
    role: index === 0 ? "display" : index === 1 ? "body" : "unknown",
    source: "site css / webfonts",
  }));
}

async function fetchText(url: URL): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; HT-Atelier/1.0; +https://hellenictechnologies.com) brand-extract",
        accept: "text/html,text/css,*/*;q=0.8",
      },
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url.hostname} (${response.status}).`);
    }
    const text = await response.text();
    return text.slice(0, MAX_BODY_CHARS);
  } finally {
    clearTimeout(timer);
  }
}

async function collectLogoHexes(logos: string[]): Promise<string[]> {
  const svgs = logos.filter((src) => /\.svg(\?|$)/i.test(src)).slice(0, 2);
  const hexes: string[] = [];
  for (const src of svgs) {
    try {
      const text = await fetchText(new URL(src));
      hexes.push(...extractSvgFills(text));
    } catch {
      // Logo fetch is optional confirmation.
    }
  }
  return [...new Set(hexes)];
}

export { extractSvgFills };

function collectCssColors(...chunks: string[]): string[] {
  const found: string[] = [];
  const hex = /#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})\b/gi;
  const rgb = /rgba?\(\s*[\d.]+\s*[,/\s]\s*[\d.]+\s*[,/\s]\s*[\d.]+/gi;

  for (const chunk of chunks) {
    for (const match of chunk.match(hex) ?? []) {
      const parsed = parseCssColor(match);
      if (parsed) found.push(parsed);
    }
    for (const match of chunk.match(rgb) ?? []) {
      const parsed = parseCssColor(`${match})`);
      if (parsed) found.push(parsed);
    }
  }
  return found;
}

function assignColorRoles(hexes: string[], themeColor: string | null): BrandColor[] {
  const colors: BrandColor[] = [];
  const used = new Set<string>();

  const pick = (role: BrandColor["role"], predicate: (hex: string) => boolean, source: string) => {
    const hex = hexes.find((item) => !used.has(item) && predicate(item));
    if (!hex) return;
    used.add(hex);
    colors.push({ hex, role, source });
  };

  if (themeColor) {
    used.add(themeColor.toUpperCase());
    colors.push({ hex: themeColor.toUpperCase(), role: "primary", source: "theme-color" });
  }

  pick("background", (hex) => {
    const rgb = hexToRgb(hex);
    return !!rgb && luminance(rgb) > 0.86;
  }, "light surface");

  pick("text", (hex) => {
    const rgb = hexToRgb(hex);
    return !!rgb && luminance(rgb) < 0.18;
  }, "dark text");

  pick("primary", (hex) => {
    const rgb = hexToRgb(hex);
    return !!rgb && !isNearNeutral(rgb);
  }, "dominant chromatic");

  pick("accent", (hex) => {
    const rgb = hexToRgb(hex);
    return !!rgb && !isNearNeutral(rgb);
  }, "secondary chromatic");

  pick("secondary", (hex) => {
    const rgb = hexToRgb(hex);
    return !!rgb && !isNearNeutral(rgb);
  }, "supporting chromatic");

  pick("muted", (hex) => {
    const rgb = hexToRgb(hex);
    return !!rgb && isNearNeutral(rgb) && luminance(rgb) > 0.2 && luminance(rgb) < 0.8;
  }, "neutral");

  for (const hex of hexes) {
    if (used.has(hex)) continue;
    colors.push({ hex, role: "palette", source: "css" });
    used.add(hex);
    if (colors.length >= 8) break;
  }

  return colors;
}

type CheerioRoot = ReturnType<typeof cheerio.load>;

function collectLogos($: CheerioRoot, base: URL): string[] {
  const candidates = [
    ...$('img[src*="logo" i], img[alt*="logo" i], header img, .logo img')
      .map((_, el) => $(el).attr("src"))
      .get(),
    $('link[rel="icon"][type="image/svg+xml"]').attr("href"),
    $('meta[property="og:logo"]').attr("content"),
    $('meta[property="og:image"]').attr("content"),
    $('link[rel="apple-touch-icon"]').attr("href"),
  ]
    .filter((value): value is string => !!value)
    .map((value) => {
      try {
        return new URL(value, base).toString();
      } catch {
        return null;
      }
    })
    .filter((value): value is string => !!value && !isPartnerLogo(value) && /logo/i.test(value));

  const unique = [...new Set(candidates)];
  unique.sort((a, b) => logoScore(b) - logoScore(a));
  return unique.slice(0, 6);
}

function logoScore(src: string): number {
  let score = 0;
  if (/\.svg(\?|$)/i.test(src)) score += 40;
  if (/logo/i.test(src)) score += 30;
  if (/logo-white/i.test(src)) score -= 8;
  if (/favicon|apple-touch/i.test(src)) score -= 20;
  if (/wp-content\/uploads/i.test(src) && /logo/i.test(src)) score += 5;
  return score;
}

function collectNav($: CheerioRoot): string[] {
  const labels = $("nav a, header a")
    .map((_, el) => clean($(el).text()))
    .get()
    .filter((label) => label.length > 1 && label.length < 40 && !isPhoneLabel(label) && !isLegalNavLabel(label));

  const headings = $("h2")
    .map((_, el) => clean($(el).text()))
    .get()
    .filter((label) => label.length > 2 && label.length < 48 && !isPhoneLabel(label));

  return [...new Set([...labels, ...headings])].slice(0, 16);
}

function collectVoice($: CheerioRoot, description: string): string[] {
  const paragraphs = $("p")
    .map((_, el) => clean($(el).text()))
    .get()
    .filter((text) => text.split(" ").length > 8 && text.length < 240)
    .slice(0, 4);

  return [description, ...paragraphs].filter(Boolean).slice(0, 5);
}

function collectImagery($: CheerioRoot): string[] {
  const notes: string[] = [];
  const og = $('meta[property="og:image"]').attr("content");
  if (og) notes.push(`Open Graph image: ${og}`);

  const imgCount = $("img").length;
  if (imgCount > 0) notes.push(`Page contains ${imgCount} images — inspect photography style before inventing new shots.`);

  if ($("video, iframe").length) {
    notes.push("The source site uses motion or embedded video. Capture a still + play state; do not invent a product UI.");
  }

  return notes;
}

function clean(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}
