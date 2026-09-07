---
name: design-system
description: Promote approved screens into a Figma variable and component library. Use after a website is approved or when a retainer needs reusable buttons, cards, and tokens.
---

# Design System

Load `figma-use` and `figma-generate-library`.

## Build

1. Confirm screens are approved enough to freeze.
2. Variables first: color, space, radius — explicit scopes, no `ALL_SCOPES`.
3. Text and effect styles.
4. Components from what already repeats: button, input, nav, card, footer, logo. Variants for state/size, not a variant per page.
5. Docs page: usage, do/don’t, how to add a page.

Icons: import SVG, do not rebuild from rotated lines.
