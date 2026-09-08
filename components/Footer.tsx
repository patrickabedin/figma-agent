import { OPERATING_KIT, SAMPLE_WEBSITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-line/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p>Hellenic Technologies · Sites in Next. Ads in Figma. Pro seat connected for handoff.</p>
        <div className="flex flex-wrap gap-4">
          <a className="underline decoration-line underline-offset-4 hover:text-ink" href="/taste">
            TasteSkill + models
          </a>
          <a className="underline decoration-line underline-offset-4 hover:text-ink" href={SAMPLE_WEBSITE.url}>
            Sample website file
          </a>
          <a className="underline decoration-line underline-offset-4 hover:text-ink" href={OPERATING_KIT.url}>
            Operating Kit
          </a>
        </div>
      </div>
    </footer>
  );
}
