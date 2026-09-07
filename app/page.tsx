import { BriefForm } from "@/components/BriefForm";
import { OPERATING_KIT, SAMPLE_WEBSITE } from "@/lib/constants";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <section className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-copper">Websites first</p>
        <h1 className="serif mt-3 text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          Start every new site from the live URL.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
          Paste the client’s existing website or drop their style guide. Atelier extracts the brand and
          writes one Website Agent packet — brand kit, wireframes, hi-fi desktop and mobile, then QA.
          Banners, social, and in-file edits come after.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <StatusChip label="Hellenic Technologies Pro seat" />
          <StatusChip label="Patrick Abedin · Full" />
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
