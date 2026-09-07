import { OPERATING_KIT } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-line/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p>Hellenic Technologies · Figma connected on the Hellenic Technologies Pro seat.</p>
        <a className="underline decoration-line underline-offset-4 hover:text-ink" href={OPERATING_KIT.url}>
          Open the Operating Kit in Figma
        </a>
      </div>
    </footer>
  );
}
