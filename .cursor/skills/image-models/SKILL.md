---
name: image-models
description: Route imagery to specialized image models — Midjourney, GPT Image 2, Nano Banana 2, FLUX.2, Ideogram, Stable Diffusion 3.5, Adobe Firefly 5. Use whenever a website, banner, social, pitch, or Figma edit needs generated or edited pixels.
---

# Image specialists

The Cloud Agent chat model does layout — in **Next.js** for website / landing jobs, in **Figma** for banners, social, wires, and edits. It does **not** invent photography. When pixels are missing, call one of these specialists. Roster lives in `lib/models.ts`. If Atelier already printed an image plan, follow it.

## Who to call

| Need | Call | Why |
| --- | --- | --- |
| Mood, atmosphere, style lock | **Midjourney** | Gold standard aesthetics and consistency |
| “Keep this, change that”, multi-clause edits | **GPT Image 2** (`gpt-image-2`) | Instruction following and in-context edit |
| Photoreal people, product-in-scene, light | **Nano Banana 2** (`gemini-3.1-flash-image`) | Photorealism and natural lighting |
| Controlled realism, pose/color, open weights | **FLUX.2** (`flux-2-pro`) | High-end control, self-host option |
| Headlines / offers **inside** the image | **Ideogram 4.0 / 3.0** | Legible embedded type |
| Brand LoRA, local, air-gapped | **Stable Diffusion 3.5** | Open-weight customization |
| Blend into a real client photo, CC handoff | **Adobe Firefly 5** | Professional composite / fill |

## Hard splits

- Website UI type stays in the Next app. Banner/social type-in-image goes to Ideogram. Do not Midjourney a nav label.
- Banner/social **words in the picture** → Ideogram. Photo plate behind them → Nano Banana 2 or FLUX.2.
- Existing client photograph → GPT Image 2 or Firefly 5. Do not regenerate the whole plate unless it cannot be saved.
- Mood frames are Midjourney. They are references, not final UI.

## How Cursor calls them

1. Read the packet’s image plan (primary + supporting).
2. Write a specialist-specific prompt (camera/light for Nano Banana and FLUX; style/mood only for Midjourney; exact string for Ideogram; keep/change list for GPT Image 2 / Firefly).
3. `POST /api/image` with `{ "specialist": "<id>", "prompt": "...", "aspectRatio": "16:9", "sourceImageUrl": "..." }`. Atelier calls OpenRouter (`OPENROUTER_API_KEY`).
4. If a specialist is not on OpenRouter, the API uses the stand-in in `lib/models.ts` (FLUX.2 max for Midjourney, Recraft for Ideogram, GPT Image 2 for Firefly). Say so on the QA page.
5. Put the returned `b64_json` into the Next page (website jobs) or the client Figma file (ads / edits). Empty gray photo slots are a defect.

## Prompt notes

- Pass brand hex, typeface name, market, and real language. No “Elevate your brand”.
- One idea per generate. Do not ask Midjourney for a 728×90 plus a story plus a desktop hero in one go.
- Ideogram: give the exact headline. If it cannot set it, set type in the Next app or Figma on a generated plate.
- GPT Image 2 / Firefly: attach the source image. List what must not change.

## Do not

- Do not pretend the chat model painted the photograph.
- Do not use one specialist for every job.
- Do not bake TasteSkill-banned tropes (mesh blobs, Inter, three identical tiles) into the image prompt.
