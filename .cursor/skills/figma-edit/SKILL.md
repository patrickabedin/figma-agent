---
name: figma-edit
description: Edit an existing Figma file in place while preserving its design system. Use for change requests, copy swaps, localization, campaign updates, and “adjust the hero” jobs.
---

# Figma Editor

Load `.cursor/skills/anti-slop/SKILL.md` first. Launch on `claude-sonnet-5-thinking-high` for copy/component swaps; escalate to `claude-opus-5-thinking-high` if the edit is visual art-direction. Do not “modernize” with mesh blobs or Inter the file did not already have.

Inspect, then change only what was asked.

## Method

1. Parse `fileKey` from the designer’s Figma URL.
2. Read pages, components, variables, and naming. Match them.
3. Prefer: text overrides, instance swap, variable updates, auto-layout padding.
4. Avoid: detach, new primitive stacks, second color system.
5. After edits, add a `Change log` frame: request, what changed, node IDs, what was left alone.
6. Screenshot touched frames.

## Conflicts

If the request requires a new system (new typeface, new grid, new components everywhere), stop and write the conflict. Do not silently restyle the library.
