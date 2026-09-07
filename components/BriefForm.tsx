"use client";

import { useMemo, useState } from "react";
import { BrandKitPreview } from "./BrandKitPreview";
import { PacketList } from "./PacketList";
import { DELIVERABLE_LABELS } from "@/lib/agents";
import type { DeliverableId, StudioBrief } from "@/lib/types";
import { DELIVERABLES } from "@/lib/types";

const DEFAULT_DELIVERABLES: DeliverableId[] = ["website"];

const JOB_PRESETS: { id: string; label: string; deliverables: DeliverableId[] }[] = [
  { id: "website", label: "Website", deliverables: ["website"] },
  { id: "landing", label: "Landing", deliverables: ["landing"] },
  { id: "banners", label: "Banners only", deliverables: ["banners"] },
  { id: "social", label: "Social / campaign", deliverables: ["social"] },
  { id: "wireframes", label: "Wireframes only", deliverables: ["wireframes"] },
  { id: "edit", label: "Edit Figma", deliverables: ["figma-edit"] },
];

export function BriefForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [brief, setBrief] = useState<StudioBrief | null>(null);
  const [deliverables, setDeliverables] = useState<DeliverableId[]>(DEFAULT_DELIVERABLES);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const selectedLabel = useMemo(
    () => deliverables.map((id) => DELIVERABLE_LABELS[id]).join(" · "),
    [deliverables],
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    form.delete("deliverables");
    for (const item of deliverables) form.append("deliverables", item);

    try {
      const response = await fetch("/api/brief", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Could not build the brief.");
      }
      setBrief(data);
      window.requestAnimationFrame(() => {
        document.getElementById("brief-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not build the brief.");
    } finally {
      setPending(false);
    }
  }

  function toggle(id: DeliverableId) {
    setDeliverables((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function fillExample() {
    const form = document.getElementById("brief-form") as HTMLFormElement | null;
    if (!form) return;
    (form.elements.namedItem("clientName") as HTMLInputElement).value = "Hellenic Technologies";
    (form.elements.namedItem("websiteUrl") as HTMLInputElement).value = "https://hellenictechnologies.com";
    (form.elements.namedItem("audience") as HTMLInputElement).value = "CEOs and marketing leads at mid-market firms";
    (form.elements.namedItem("market") as HTMLInputElement).value = "Greece / EMEA";
    (form.elements.namedItem("language") as HTMLInputElement).value = "Greek + English";
    (form.elements.namedItem("goals") as HTMLTextAreaElement).value =
      "Redesign the marketing site. Homepage first, then About, Work, and Contact. Keep the current logo.";
    setDeliverables(["website"]);
  }

  return (
    <div className="space-y-10">
      <form id="brief-form" onSubmit={onSubmit} className="hairline rounded-3xl bg-paper-2 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">New design job</p>
            <h2 className="serif mt-2 text-3xl sm:text-4xl">URL or style guide in. Taste-checked packets out.</h2>
            <p className="mt-2 max-w-xl text-sm text-ink-soft">
              Default is a full website. Switch the job to banners, social, wires, or an existing Figma file.
              Every packet names the model Cursor should launch.
            </p>
          </div>
          <button
            type="button"
            onClick={fillExample}
            className="rounded-full border border-line px-3.5 py-1.5 text-xs hover:bg-paper"
          >
            Load Hellenic example
          </button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Field label="Client name" name="clientName" placeholder="Miles Rent a Car" />
          <Field label="Existing website" name="websiteUrl" placeholder="https://client.com" />
          <Field
            label="Existing Figma file"
            name="existingFigmaUrl"
            placeholder="https://www.figma.com/design/…"
            hint="Only needed for edits to work already in Figma"
          />
          <Field label="Audience" name="audience" placeholder="B2B buyers, tourists, patients…" />
          <Field label="Market" name="market" placeholder="Greece, DACH, US…" />
          <Field label="Language of deliverables" name="language" placeholder="Greek, English, both…" />
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-medium">Goals and constraints</span>
          <textarea
            name="goals"
            rows={4}
            placeholder="They want more inbound demos. Keep the current logo. Homepage must ship first."
            className="mt-2 w-full rounded-2xl border border-line bg-paper px-3.5 py-3 text-sm outline-none focus:border-ink"
          />
        </label>

        <fieldset className="mt-6">
          <legend className="text-sm font-medium">Job</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {JOB_PRESETS.map((preset) => {
              const active =
                deliverables.length === preset.deliverables.length &&
                preset.deliverables.every((item) => deliverables.includes(item));
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setDeliverables(preset.deliverables)}
                  className={`rounded-full px-3.5 py-1.5 text-xs ${
                    active ? "bg-copper text-paper-2" : "border border-line text-ink-soft hover:text-ink"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="text-sm font-medium">Deliverables</legend>
          <p className="mt-1 text-xs text-ink-soft">{selectedLabel || "Pick at least one"}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {DELIVERABLES.map((id) => {
              const active = deliverables.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggle(id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs ${
                    active ? "bg-ink text-paper-2" : "border border-line text-ink-soft hover:text-ink"
                  }`}
                >
                  {DELIVERABLE_LABELS[id]}
                </button>
              );
            })}
          </div>
        </fieldset>

        <label className="mt-6 block">
          <span className="text-sm font-medium">Brand style guide</span>
          <span className="mt-1 block text-xs text-ink-soft">
            PDF, PNG, JPG, or SVG. Files stay on this machine for the brief — attach them again to the Cloud Agent.
          </span>
          <input
            type="file"
            name="styleGuides"
            multiple
            accept=".pdf,.png,.jpg,.jpeg,.webp,.svg,.ai,.pdf"
            onChange={(event) => {
              const files = Array.from(event.target.files ?? []);
              setFileNames(files.map((file) => file.name));
            }}
            className="mt-3 block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-3.5 file:py-1.5 file:text-xs file:text-paper-2"
          />
          {fileNames.length > 0 ? (
            <p className="mt-2 text-xs text-ink-soft">{fileNames.join(" · ")}</p>
          ) : null}
        </label>

        {error ? <p className="mt-5 text-sm text-copper">{error}</p> : null}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-copper px-5 py-2.5 text-sm font-medium text-paper-2 hover:bg-copper-deep disabled:opacity-60"
          >
            {pending ? "Reading the brand…" : "Build agent packets"}
          </button>
          <p className="text-xs text-ink-soft">Usually 5–15 seconds for a public marketing site.</p>
        </div>
      </form>

      {brief ? (
        <div id="brief-result" className="space-y-8">
          <BrandKitPreview kit={brief.brandKit} />
          <PacketList brief={brief} />
        </div>
      ) : null}
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  hint,
}: {
  label: string;
  name: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      {hint ? <span className="mt-1 block text-xs text-ink-soft">{hint}</span> : null}
      <input
        name={name}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-line bg-paper px-3.5 py-2.5 text-sm outline-none focus:border-ink"
      />
    </label>
  );
}
