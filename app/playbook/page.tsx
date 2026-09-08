import Link from "next/link";
import { OPERATING_KIT } from "@/lib/constants";
import { IMAGE_ROSTER } from "@/lib/models";
import { BANNER_SIZES, QUALITY_GATES, WEB_BREAKPOINTS } from "@/lib/presets";

const steps = [
  {
    title: "Collect what exists",
    body: "A live URL is enough to start. A PDF style guide is better. An existing Figma file is required only when the job is an edit.",
  },
  {
    title: "Pick the surface and the image specialist",
    body: "Website, landing, banners, social, wires, or an in-file edit. Atelier writes the packet and names who Cursor should call through OpenRouter: Nano Banana 2 for photoreal, Ideogram/Recraft for type in the image, Midjourney/FLUX.2 max for mood, GPT Image 2 for edits.",
  },
  {
    title: "TasteSkill before polish",
    body: "Every surface loads anti-slop. No mesh blobs, no three-equal-card rows, no Inter-by-default, no Elevate/Unleash. Client brand beats TasteSkill color defaults.",
  },
  {
    title: "Review in Figma",
    body: "Humans still art-direct. Reject anything that looks like a generic template. Request edits with the Figma Editor starter.",
  },
];

export default function PlaybookPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <p className="text-[11px] uppercase tracking-[0.22em] text-copper">How the desk works</p>
      <h1 className="serif mt-3 max-w-3xl text-5xl leading-[1.05]">
        Any design job. TasteSkill on every surface. The right model for the pixels.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
        This is the operating model for the Hellenic design team. Atelier is the front door. Cursor Cloud
        Agents do layout in Figma. Image specialists draw the pixels through OpenRouter. Figma is where work ships.
        Humans still decide, brief the client, and reject anything that looks generic.
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

      <section className="mt-14">
        <h2 className="serif text-3xl">Image specialists Cursor should call</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {IMAGE_ROSTER.map((model) => (
            <li key={model.id} className="flex flex-col gap-1 border-b border-line py-3 sm:flex-row sm:justify-between">
              <span>
                {model.label}
                <span className="block text-xs text-ink-soft">{model.strength}</span>
              </span>
              <span className="shrink-0 font-mono text-xs text-ink-soft">{model.openrouter}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-ink-soft">
          Full stack and banned tells live on{" "}
          <Link href="/taste" className="text-ink underline decoration-line underline-offset-4">
            Taste
          </Link>
          .
        </p>
      </section>

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
            Save the Website, Banner, and Figma Editor starters (`/starters`). Designers then only paste the
            client URL or file and the Atelier brand kit.
          </li>
          <li>
            For retainers, run Design System after the first approved site so the second campaign is
            instance-swaps, not redraws.
          </li>
          <li>
            If a first photoreal pass still looks fake, switch specialist: Nano Banana 2 for light,
            FLUX.2 for control, Midjourney (or FLUX.2 max via OpenRouter) for mood.
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
          Start a job
        </Link>
      </section>
    </div>
  );
}
