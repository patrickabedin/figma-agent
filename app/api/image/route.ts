import { IMAGE_SPECIALISTS } from "@/lib/models";
import { generateViaOpenRouter, openRouterKey } from "@/lib/openrouter";
import type { ImageSpecialistId } from "@/lib/types";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 120;

const SPECIALIST_IDS = Object.keys(IMAGE_SPECIALISTS) as ImageSpecialistId[];

export async function GET() {
  const ready = Boolean(openRouterKey());
  return NextResponse.json({
    gateway: "openrouter",
    configured: ready,
    specialists: SPECIALIST_IDS.map((id) => ({
      id,
      label: IMAGE_SPECIALISTS[id].label,
      strength: IMAGE_SPECIALISTS[id].strength,
      openrouter: IMAGE_SPECIALISTS[id].openrouter,
      openrouterNote: IMAGE_SPECIALISTS[id].openrouterNote,
      configured: ready,
    })),
  });
}

export async function POST(request: Request) {
  try {
    if (!openRouterKey()) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY is not set. Add it on Vercel and in .env.local." },
        { status: 503 },
      );
    }

    const body = await request.json();
    const specialist = String(body.specialist || "") as ImageSpecialistId;
    const prompt = String(body.prompt || "").trim();
    const sourceImageUrl = typeof body.sourceImageUrl === "string" ? body.sourceImageUrl.trim() : "";
    const aspectRatio = typeof body.aspectRatio === "string" ? body.aspectRatio : undefined;
    const quality = body.quality === "low" || body.quality === "medium" || body.quality === "high" || body.quality === "auto"
      ? body.quality
      : undefined;

    if (!SPECIALIST_IDS.includes(specialist)) {
      return NextResponse.json(
        { error: "Unknown specialist. Use midjourney, gpt-image-2, nano-banana-2, flux-2, ideogram, stable-diffusion-3.5, or firefly-5." },
        { status: 400 },
      );
    }
    if (!prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    const result = await generateViaOpenRouter({
      specialist,
      prompt,
      aspectRatio,
      quality,
      sourceImageUrl: sourceImageUrl || undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not generate the image.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
