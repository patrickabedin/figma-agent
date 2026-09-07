---
name: brand-kit
description: Extract and publish a client brand kit in Figma from a live website or uploaded style guide. Use when tokens, colors, type, or logo rules are needed before website, banner, or campaign work.
---

# Brand Kit

Source of truth, in order: uploaded style guide → existing brand Figma → live website → designer notes.

## Extract

- Color: theme-color, CSS custom properties, frequent hex, screenshot sampling if CSS is thin.
- Type: Google / Adobe font links, `font-family` stacks. Drop system fallbacks.
- Logo: header SVG/PNG, apple-touch, wordmark vs icon.
- Voice: H1, meta description, a few real sentences. Language of the source stays the language of the kit.
- Imagery: photography contrast, illustration vs photo, people vs product.

## Build in Figma

1. New file in Hellenic Technologies (`team::835515410208041552`) unless editing a named file.
2. Page `00 Brand`.
3. Variables with explicit scopes: fills vs text vs stroke vs gap. Modes only if the guide has light/dark.
4. Text styles: Display, H1, H2, H3, Body, Caption. Load the real family via `listAvailableFontsAsync`. If the font is missing, say so — do not silently use Inter.
5. Logo row with clear space.
6. Do / don’t notes (color on photo, minimum type size, logo on busy images).
7. Open questions from extraction warnings.

## Quality

A junior must be able to design a banner from this page without opening the client website.
