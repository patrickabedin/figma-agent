import { emptyBrandKit, extractBrandFromUrl } from "@/lib/brand-extract";
import { generateStudioBrief } from "@/lib/generate-packet";
import type { BriefInput, DeliverableId } from "@/lib/types";
import { DELIVERABLES } from "@/lib/types";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const input = parseBrief(form);

    let brandKit = emptyBrandKit(input.clientName || "Untitled client");
    if (input.websiteUrl.trim()) {
      brandKit = await extractBrandFromUrl(input.websiteUrl);
      if (input.clientName.trim()) brandKit.name = input.clientName.trim();
    } else if (input.styleGuideNames.length === 0 && !input.existingFigmaUrl) {
      return NextResponse.json(
        { error: "Add a website URL, an existing Figma file, or a style guide." },
        { status: 400 },
      );
    } else {
      brandKit.warnings.push(
        "No live website was provided. Build the brand kit from the uploaded guide and/or existing Figma file only.",
      );
    }

    if (input.styleGuideNames.length) {
      brandKit.warnings.push(
        `Attach these style-guide files to the Cloud Agent chat: ${input.styleGuideNames.join(", ")}`,
      );
    }

    const brief = generateStudioBrief(input, brandKit);
    return NextResponse.json(brief);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not build the brief.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

function parseBrief(form: FormData): BriefInput {
  const deliverables = form
    .getAll("deliverables")
    .map(String)
    .filter((value): value is DeliverableId => DELIVERABLES.includes(value as DeliverableId));

  const styleGuideNames = form
    .getAll("styleGuides")
    .flatMap((value) => (value instanceof File && value.size > 0 ? [value.name] : []));

  return {
    clientName: String(form.get("clientName") || "").trim(),
    websiteUrl: String(form.get("websiteUrl") || "").trim(),
    existingFigmaUrl: String(form.get("existingFigmaUrl") || "").trim(),
    goals: String(form.get("goals") || "").trim(),
    audience: String(form.get("audience") || "").trim(),
    market: String(form.get("market") || "").trim(),
    language: String(form.get("language") || "").trim(),
    deliverables,
    styleGuideNames,
  };
}
