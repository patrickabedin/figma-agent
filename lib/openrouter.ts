import { IMAGE_SPECIALISTS } from "./models";
import type { ImageSpecialistId } from "./types";

const OPENROUTER_IMAGES = "https://openrouter.ai/api/v1/images";

export function openRouterKey(): string | undefined {
  return process.env.OPENROUTER_API_KEY || process.env.OPEN_ROUTER_API_KEY;
}

export type OpenRouterImageRequest = {
  specialist: ImageSpecialistId;
  prompt: string;
  aspectRatio?: string;
  quality?: "auto" | "low" | "medium" | "high";
  sourceImageUrl?: string;
};

export type OpenRouterImageResult = {
  status: "ok";
  specialist: ImageSpecialistId;
  model: string;
  openrouterNote?: string;
  images: { b64_json?: string; media_type?: string; url?: string }[];
  usage?: unknown;
};

export async function generateViaOpenRouter(input: OpenRouterImageRequest): Promise<OpenRouterImageResult> {
  const key = openRouterKey();
  if (!key) throw new Error("OPENROUTER_API_KEY is not set");

  const spec = IMAGE_SPECIALISTS[input.specialist];
  const payload: Record<string, unknown> = {
    model: spec.openrouter,
    prompt: input.prompt,
    n: 1,
    aspect_ratio: input.aspectRatio || defaultAspect(input.specialist),
    quality: input.quality || "high",
  };

  if (input.sourceImageUrl) {
    payload.input_references = [
      {
        type: "image_url",
        image_url: { url: input.sourceImageUrl },
      },
    ];
  }

  const response = await fetch(OPENROUTER_IMAGES, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://figma-agent-swart.vercel.app",
      "X-Title": "Atelier Hellenic design agents",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    const message = data?.error?.message || data?.error || JSON.stringify(data);
    throw new Error(`OpenRouter ${spec.openrouter}: ${message}`);
  }

  const images = (data.data ?? []).map((item: { b64_json?: string; url?: string; media_type?: string }) => ({
    b64_json: item.b64_json,
    url: item.url,
    media_type: item.media_type,
  }));

  return {
    status: "ok",
    specialist: input.specialist,
    model: spec.openrouter,
    openrouterNote: spec.openrouterNote,
    images,
    usage: data.usage,
  };
}

function defaultAspect(id: ImageSpecialistId): string {
  if (id === "ideogram") return "16:9";
  if (id === "nano-banana-2" || id === "flux-2") return "16:9";
  return "1:1";
}
