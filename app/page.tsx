import { BriefForm } from "@/components/BriefForm";
import { OPERATING_KIT, SAMPLE_WEBSITE } from "@/lib/constants";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <section className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-copper">Any design job</p>
        <h1 className="serif mt-3 text-5xl sm:text-6xl">
          Sites, banners, social — TasteSkill and the right image model.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
          Paste the client URL or drop a style guide. Atelier extracts the brand, writes a design read, and
          names the image specialist Cursor should call through OpenRouter: Nano Banana 2 for light,
          Ideogram/Recraft for type in the frame, Midjourney/FLUX.2 max for mood, GPT Image 2 for edits.
          TasteSkill applies to every surface, not only websites.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <StatusChip label="Hellenic Technologies Pro seat" />
          <StatusChip label="Patrick Abedin · Full" />
          <a className="rounded-full border border-line px-3 py-1 text-ink-soft hover:text-ink" href="/taste">
            TasteSkill + models
          </a>
          <a className="rounded-full border border-line px-3 py-1 text-ink-soft hover:text-ink" href={SAMPLE_WEBSITE.url}>
            Sample website in Figma
          </a>
          <a className="rounded-full border border-line px-3 py-1 text-ink-soft hover:text-ink" href={OPERATING_KIT.url}>
            Operating Kit
          </a>
        </div>
      </section>

      <div className="mt-12">
        <BriefForm />
      </div>
    </div>
  );
}

function StatusChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-2 px-3 py-1 text-ink-soft">
      <span className="h-1.5 w-1.5 rounded-full bg-ok" />
      {label}
    </span>
  );
}
