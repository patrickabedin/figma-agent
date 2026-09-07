import * as cheerio from "cheerio";
import {
  clusterHexColors,
  hexToRgb,
  isNearNeutral,
  luminance,
  parseCssColor,
} from "./colors";
import type { BrandColor, BrandFont, BrandKit } from "./types";
import { normalizeHttpUrl } from "./url-guard";

const FETCH_TIMEOUT_MS = 12000;
const MAX_STYLESHEETS = 5;
const MAX_BODY_CHARS = 400_000;

const SYSTEM_FONTS = new Set(
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
    "roboto",
    "-apple-system",
    "blinkmacsystemfont",
  ].map((name) => name.toLowerCase()),
);

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

  const css = `${$("style").text()}\n${cssChunks.join("\n")}`;
  const hexes = collectCssColors(html, css);
  if (themeColor) hexes.unshift(themeColor);

  const colors = assignColorRoles(clusterHexColors(hexes, 10), themeColor);
  const fonts = collectFonts($, css, html);
  const logos = collectLogos($, url);
  const sitemapHints = collectNav($);
  const voice = collectVoice($, description);
  const imageryNotes = collectImagery($);

  const warnings: string[] = [];
  if (colors.length < 3) {
    warnings.push("Few brand colors were detected. Confirm the palette from the style guide or screenshots.");
  }
  if (fonts.length === 0) {
    warnings.push("No custom fonts were detected. Check Google Fonts, Adobe Fonts, or the uploaded guide.");
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
    if (colors.length >= 10) break;
  }

  return colors;
}

type CheerioRoot = ReturnType<typeof cheerio.load>;

function collectFonts(
  $: CheerioRoot,
  css: string,
  html: string,
): BrandFont[] {
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
            if (name) families.add(name);
          });
      }
    },
  );

  for (const match of css.match(/font-family\s*:\s*([^;}{]+)/gi) ?? []) {
    const stack = match.replace(/font-family\s*:\s*/i, "");
    stack.split(",").forEach((part) => {
      const name = part.replace(/["']/g, "").trim();
      if (name && !SYSTEM_FONTS.has(name.toLowerCase())) families.add(name);
    });
  }

  for (const match of html.match(/--[\w-]*(font|type)[\w-]*\s*:\s*["']?([^;"']+)/gi) ?? []) {
    const name = match.split(":").slice(1).join(":").replace(/["']/g, "").split(",")[0]?.trim();
    if (name && !SYSTEM_FONTS.has(name.toLowerCase())) families.add(name);
  }

  return [...families].slice(0, 6).map((family, index) => ({
    family,
    role: index === 0 ? "display" : index === 1 ? "body" : "unknown",
    source: "site css / webfonts",
  }));
}

function collectLogos($: CheerioRoot, base: URL): string[] {
  const candidates = [
    $('meta[property="og:logo"]').attr("content"),
    $('meta[property="og:image"]').attr("content"),
    $('link[rel="apple-touch-icon"]').attr("href"),
    $('link[rel="icon"][type="image/svg+xml"]').attr("href"),
    $('img[alt*="logo" i]').attr("src"),
    $('img[src*="logo" i]').attr("src"),
    $("header img").first().attr("src"),
  ]
    .filter((value): value is string => !!value)
    .map((value) => {
      try {
        return new URL(value, base).toString();
      } catch {
        return null;
      }
    })
    .filter((value): value is string => !!value);

  return [...new Set(candidates)].slice(0, 6);
}

function collectNav($: CheerioRoot): string[] {
  const labels = $("nav a, header a")
    .map((_, el) => clean($(el).text()))
    .get()
    .filter((label) => label.length > 1 && label.length < 32);

  const headings = $("h2")
    .map((_, el) => clean($(el).text()))
    .get()
    .filter((label) => label.length > 2 && label.length < 48);

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
    notes.push("The source site uses motion or embedded video. Consider a still + play-state in Figma.");
  }

  return notes;
}

function clean(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}
