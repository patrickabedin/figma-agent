import Link from "next/link";
import { AGENTS } from "@/lib/agents";
import { modelForAgent } from "@/lib/models";

export default function AgentsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <p className="text-[11px] uppercase tracking-[0.22em] text-copper">Specialists</p>
      <h1 className="serif mt-3 max-w-3xl text-5xl">
        One specialist per surface. Sites code first.
      </h1>
      <p className="mt-4 max-w-2xl text-base text-ink-soft">
        The Website Agent is the default for a new site — Next + TasteSkill, then html.to.design.
        Use Banner, Campaign, Wireframe, or Figma Editor when that is the job. Every specialist names
        the OpenRouter image model.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {AGENTS.map((agent) => (
          <article key={agent.id} className="hairline rounded-2xl bg-paper-2 p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink-soft">{agent.id}</p>
            <h2 className="serif mt-2 text-3xl">{agent.name}</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{agent.role}</p>
            <p className="mt-4 text-sm">
              <span className="font-medium">Use when. </span>
              {agent.whenToUse}
            </p>
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <List title="Needs" items={agent.inputs} />
              <List title="Leaves behind" items={agent.outputs} />
            </div>
            <p className="mt-4 text-sm">
              <span className="font-medium">Call for pixels. </span>
              {modelForAgent(agent.id).label}
              <span className="mt-1 block font-mono text-[11px] text-ink-soft">
                {modelForAgent(agent.id).openrouter}
              </span>
            </p>
            <p className="mt-3 font-mono text-[11px] text-ink-soft">{agent.skillPath}</p>
          </article>
        ))}
      </div>

      <p className="mt-10 text-sm text-ink-soft">
        Start from a{" "}
        <Link href="/" className="underline decoration-line underline-offset-4">
          new brief
        </Link>{" "}
        so the packets already include the extracted brand kit.
      </p>
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-ink-soft">{title}</p>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
