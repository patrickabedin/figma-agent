"use client";

import { CopyButton } from "./CopyButton";
import type { AgentPacket, StudioBrief } from "@/lib/types";

export function PacketList({ brief }: { brief: StudioBrief }) {
  function downloadJson() {
    const blob = new Blob([JSON.stringify(brief, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${brief.brandKit.name.replace(/\s+/g, "-").toLowerCase()}-atelier-brief.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">Agent packets</p>
          <h2 className="serif mt-1 text-3xl">
            {brief.packets.some((packet) => packet.agentId === "website-job")
              ? "Start with the Website Agent"
              : "Run these in order"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            Paste the first prompt into a Cloud Agent on this repo. For pixels, Cursor calls{" "}
            <span className="text-ink">{brief.recommendedModelLabel}</span>{" "}
            (<code className="font-mono text-[11px]">{brief.recommendedModel}</code>) through{" "}
            <code className="font-mono text-[11px]">POST /api/image</code> on OpenRouter. TasteSkill is
            already in the packet.
          </p>
          <p className="mt-3 max-w-2xl text-sm italic text-ink">{brief.designRead}</p>
        </div>
        <button
          type="button"
          onClick={downloadJson}
          className="rounded-full border border-line px-3.5 py-1.5 text-xs hover:bg-paper-2"
        >
          Download brief JSON
        </button>
      </div>

      <div className="space-y-4">
        {brief.packets.map((packet) => (
          <PacketCard key={packet.agentId} packet={packet} featured={packet.agentId === "website-job"} />
        ))}
      </div>
    </section>
  );
}

function PacketCard({ packet, featured = false }: { packet: AgentPacket; featured?: boolean }) {
  return (
    <article className={`rounded-2xl p-5 ${featured ? "bg-ink text-paper-2" : "hairline bg-paper-2"}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          {featured ? (
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#e8c4b0]">Default starter</p>
          ) : null}
          <h3 className="serif text-2xl">{packet.title}</h3>
          <p className={`mt-1 text-sm ${featured ? "text-paper-2/70" : "text-ink-soft"}`}>{packet.summary}</p>
          <p className={`mt-2 font-mono text-[11px] ${featured ? "text-[#e8c4b0]" : "text-copper"}`}>
            Call {packet.recommendedModelLabel} · {packet.recommendedModel}
          </p>
          {packet.imagePlan.supporting.length ? (
            <p className={`mt-1 text-xs ${featured ? "text-paper-2/60" : "text-ink-soft"}`}>
              Also {packet.imagePlan.supporting.map((item) => item.label).join(", ")}
            </p>
          ) : null}
        </div>
        <CopyButton
          text={packet.prompt}
          label={featured ? "Copy Website Agent" : "Copy prompt"}
          light={featured}
        />
      </div>
      <pre
        className={`mt-4 max-h-72 overflow-auto rounded-xl px-4 py-3 font-mono text-[11px] leading-5 ${
          featured ? "bg-[#0c0b09] text-[#f3ecdf]" : "bg-ink text-[#f3ecdf]"
        }`}
      >
        {packet.prompt}
      </pre>
    </article>
  );
}
