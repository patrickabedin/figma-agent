export type Rgb = { r: number; g: number; b: number };

export function hexToRgb(hex: string): Rgb | null {
  const value = hex.replace("#", "").trim();
  if (value.length === 3) {
    const [r, g, b] = value.split("").map((ch) => parseInt(ch + ch, 16));
    return { r, g, b };
  }
  if (value.length === 6 || value.length === 8) {
    return {
      r: parseInt(value.slice(0, 2), 16),
      g: parseInt(value.slice(2, 4), 16),
      b: parseInt(value.slice(4, 6), 16),
    };
  }
  return null;
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const to = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}

export function parseCssColor(input: string): string | null {
  const value = input.trim();
  const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (hex) {
    const rgb = hexToRgb(hex[0]);
    return rgb ? rgbToHex(rgb) : null;
  }

  const rgb = value.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);
  if (rgb) {
    return rgbToHex({ r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]) });
  }

  return null;
}

export function luminance({ r, g, b }: Rgb): number {
  const channel = (n: number) => {
    const v = n / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function saturation({ r, g, b }: Rgb): number {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  if (max === min) return 0;
  const l = (max + min) / 2;
  return l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
}

export function colorDistance(a: Rgb, b: Rgb): number {
  return Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b);
}

export function isNearNeutral(rgb: Rgb): boolean {
  return saturation(rgb) < 0.08;
}

export function clusterHexColors(hexes: string[], max = 8): string[] {
  const unique = [...new Set(hexes.map((hex) => hex.toUpperCase()))];
  const scored = unique
    .map((hex) => {
      const rgb = hexToRgb(hex);
      if (!rgb) return null;
      return { hex, rgb, sat: saturation(rgb), lum: luminance(rgb) };
    })
    .filter((item): item is { hex: string; rgb: Rgb; sat: number; lum: number } => item !== null)
    .sort((a, b) => b.sat - a.sat || Math.abs(0.5 - a.lum) - Math.abs(0.5 - b.lum));

  const picked: typeof scored = [];
  for (const candidate of scored) {
    if (picked.some((existing) => colorDistance(existing.rgb, candidate.rgb) < 28)) continue;
    picked.push(candidate);
    if (picked.length >= max) break;
  }
  return picked.map((item) => item.hex);
}
