import { CopyButton } from "@/components/CopyButton";
import { STARTER_BODIES, extractStarterPrompt } from "@/lib/starter-copy";
import { STARTERS } from "@/lib/starters";

export default function StartersPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <p className="text-[11px] uppercase tracking-[0.22em] text-copper">Saved Cloud Agents</p>
      <h1 className="serif mt-3 max-w-3xl text-5xl leading-[1.05]">
        Saved Cloud Agents for sites, banners, social, and edits.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
        Paste a starter into a Cloud Agent on this repo. The prompt names the image specialist to call
        through OpenRouter. Designers then only add the client URL, file, or brand kit.
      </p>

      <div className="mt-10 space-y-6">
        {STARTERS.map((starter) => {
          const body = STARTER_BODIES[starter.id];
          return (
            <article key={starter.id} id={starter.id} className="hairline scroll-mt-24 rounded-2xl bg-paper-2 p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-copper">
                    {starter.status === "live" ? "Use now" : "Next"}
                  </p>
                  <h2 className="serif mt-2 text-3xl">{starter.title}</h2>
                  <p className="mt-2 max-w-2xl text-sm text-ink-soft">{starter.blurb}</p>
                </div>
                <CopyButton text={extractStarterPrompt(body)} label="Copy starter" />
              </div>
              <pre className="mt-5 max-h-80 overflow-auto rounded-xl bg-ink px-4 py-3 font-mono text-[11px] leading-5 text-[#f3ecdf]">
                {body}
              </pre>
            </article>
          );
        })}
      </div>
    </div>
  );
}
