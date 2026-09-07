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
          <h2 className="serif mt-1 text-3xl">Run these in order</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            Open a Cloud Agent on this repo, paste the prompt, and attach any style-guide files. Brand Kit before
            visuals. QA last.
          </p>
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
          <PacketCard key={packet.agentId} packet={packet} />
        ))}
      </div>
    </section>
  );
}

function PacketCard({ packet }: { packet: AgentPacket }) {
  return (
    <article className="hairline rounded-2xl bg-paper-2 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="serif text-2xl">{packet.title}</h3>
          <p className="mt-1 text-sm text-ink-soft">{packet.summary}</p>
        </div>
        <CopyButton text={packet.prompt} />
      </div>
      <pre className="mt-4 max-h-72 overflow-auto rounded-xl bg-ink px-4 py-3 font-mono text-[11px] leading-5 text-[#f3ecdf]">
        {packet.prompt}
      </pre>
    </article>
  );
}
