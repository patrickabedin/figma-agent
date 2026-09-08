import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { extractSvgFills, firstFontFromStack, isGutenbergDefaultSlug, isTailwindScaleSlug, isThemeBrandSlug } from "./brand-noise.ts";
import { assignThemeColorRoles, collectThemeColorTokens, collectThemeFonts } from "./css-tokens.ts";

const AVANCE_CSS = `
--wp--preset--color--black: #000;
--wp--preset--color--luminous-vivid-orange: #ff6900;
--wp--preset--color--vivid-green-cyan: #00d084;
--wp--preset--color--luminous-vivid-amber: #fcb900;
--wp--preset--color--purple-200: #e9d5ff;
--wp--preset--color--body: #004d99;
--wp--preset--color--anchorlink: #0086ff;
--wp--preset--color--primary-100: #f1f8ff;
--wp--preset--color--primary-200: #53adff;
--wp--preset--color--primary-300: #0086ff;
--wp--preset--color--primary-400: #004d99;
--wp--preset--color--primary-500: #003061;
--wp--preset--color--secondary-100: #f9b916;
--wp--preset--font-family--sans: Inter,sans-serif;
`;

describe("wordpress theme tokens beat gutenberg defaults", () => {
  it("classifies editor noise vs theme slugs", () => {
    assert.equal(isGutenbergDefaultSlug("vivid-green-cyan"), true);
    assert.equal(isTailwindScaleSlug("purple-200"), true);
    assert.equal(isThemeBrandSlug("primary-400"), true);
    assert.equal(isThemeBrandSlug("body"), true);
  });

  it("picks Avance navy / CTA blue / gold from named presets", () => {
    const { theme, droppedDefaults } = collectThemeColorTokens(AVANCE_CSS);
    assert.ok(droppedDefaults >= 3);
    const colors = assignThemeColorRoles(theme);
    assert.equal(colors.find((item) => item.role === "primary")?.hex, "#004D99");
    assert.equal(colors.find((item) => item.role === "accent")?.hex, "#0086FF");
    assert.equal(colors.find((item) => item.role === "secondary")?.hex, "#F9B916");
    assert.ok(!colors.some((item) => item.hex === "#00D084" || item.hex === "#FF6900" || item.hex === "#E9D5FF"));
  });

  it("resolves Inter from the sans preset", () => {
    const fonts = collectThemeFonts(AVANCE_CSS);
    assert.equal(fonts[0]?.family, "Inter");
    assert.equal(firstFontFromStack("inherit"), null);
    assert.equal(firstFontFromStack("var(--wp--preset--font-family--sans) !important"), null);
  });

  it("reads navy from the Avance wordmark SVG", () => {
    const fills = extractSvgFills('<path fill="#004D99" /><path fill="#004d99" />');
    assert.deepEqual(fills, ["#004D99"]);
  });

  it("reads live avance.gr theme tokens as navy, not Gutenberg orange", async () => {
    const response = await fetch("https://avance.gr/", {
      headers: { "user-agent": "Mozilla/5.0 HT-Atelier-test" },
    });
    assert.equal(response.ok, true);
    const html = await response.text();
    const { theme, droppedDefaults } = collectThemeColorTokens(html);
    const colors = assignThemeColorRoles(theme);
    assert.ok(droppedDefaults >= 8);
    assert.equal(colors.find((item) => item.role === "primary")?.hex, "#004D99");
    assert.equal(collectThemeFonts(html)[0]?.family, "Inter");
    assert.ok(!colors.some((item) => ["#00D084", "#FF6900", "#FCB900", "#E9D5FF"].includes(item.hex)));
  });
});
