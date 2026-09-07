import Link from "next/link";
import { OPERATING_KIT } from "@/lib/constants";
import { BANNER_SIZES, QUALITY_GATES, WEB_BREAKPOINTS } from "@/lib/presets";

const steps = [
  {
    title: "Collect what exists",
    body: "A live URL is enough to start. A PDF style guide is better. An existing Figma file is required only when the job is an edit.",
  },
  {
    title: "Run intake in Atelier",
    body: "The studio extracts color, type, logos, nav, and voice, then writes specialist packets. Designers do not invent a prompt from scratch.",
  },
  {
    title: "Brand Kit in Figma first",
    body: "Open a Cloud Agent on this repository, paste packet 2, attach the guide. Tokens and type exist before anyone draws a page.",
  },
  {
    title: "Structure, then polish",
    body: "Wireframes lock IA in grayscale. Website Designer paints on those frames. Banners share one campaign idea across sizes.",
  },
  {
    title: "Edit in place",
    body: "If the client already has a Figma file, Figma Editor inspects components and variables, then changes only what was asked.",
  },
  {
    title: "QA before the client sees it",
    body: "Design QA scores contrast, type, brand drift, and leftover placeholder copy. Blockers get fixed in the same file.",
  },
];

export default function PlaybookPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <p className="text-[11px] uppercase tracking-[0.22em] text-copper">How the desk works</p>
      <h1 className="serif mt-3 max-w-3xl text-5xl leading-[1.05]">
        Same path for every new website, banner set, or Figma change request.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
        This is the operating model for the Hellenic design team. Atelier is the front door. Cursor Cloud
        Agents are the specialists. Figma is where work ships. Humans still decide, brief the client, and
        reject anything that looks generic.
      </p>

      <ol className="mt-10 grid gap-4 md:grid-cols-2">
        {steps.map((step, index) => (
          <li key={step.title} className="hairline rounded-2xl bg-paper-2 p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink-soft">0{index + 1}</p>
            <h2 className="serif mt-2 text-2xl">{step.title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{step.body}</p>
          </li>
        ))}
      </ol>

      <section className="mt-14 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="serif text-3xl">Website frames</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {WEB_BREAKPOINTS.map((item) => (
              <li key={item.name} className="flex justify-between border-b border-line py-2">
                <span>{item.name}</span>
                <span className="font-mono text-xs text-ink-soft">
                  {item.width} × {item.height}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="serif text-3xl">Default banner set</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {BANNER_SIZES.map((item) => (
              <li key={item.name} className="flex justify-between gap-4 border-b border-line py-2">
                <span>
                  {item.name}
                  <span className="block text-xs text-ink-soft">{item.use}</span>
                </span>
                <span className="shrink-0 font-mono text-xs text-ink-soft">
                  {item.width} × {item.height}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="serif text-3xl">Nothing leaves the studio until</h2>
        <ul className="mt-4 grid gap-2 md:grid-cols-2">
          {QUALITY_GATES.map((gate) => (
            <li key={gate} className="rounded-xl border border-line bg-paper-2 px-4 py-3 text-sm leading-6">
              {gate}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 hairline rounded-3xl bg-paper-2 p-6 sm:p-8">
        <h2 className="serif text-3xl">What I recommend next</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-soft">
          <li>
            Keep one Operating Kit file and spawn a new client file per job — never dump clients into the
            kit. The kit is already in your drafts:{" "}
            <a className="text-ink underline decoration-line underline-offset-4" href={OPERATING_KIT.url}>
              {OPERATING_KIT.name}
            </a>
            .
          </li>
          <li>
            Save the nine specialist prompts as reusable Cloud Agent starters so juniors do not skip Brand
            Kit or QA.
          </li>
          <li>
            For retainers, run Design System after the first approved site so the second campaign is
            instance-swaps, not redraws.
          </li>
          <li>
            Add competitive teardowns as a tenth packet only when the client has no site and a thin guide —
            otherwise you will design their competitor.
          </li>
          <li>
            Humans still art-direct. The agents are fast hands with a house style, not the creative
            director.
          </li>
        </ul>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-ink px-4 py-2 text-sm text-paper-2 hover:bg-copper-deep"
        >
          Open a new brief
        </Link>
      </section>
    </div>
  );
}
