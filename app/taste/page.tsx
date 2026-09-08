import Link from "next/link";
import { IMAGE_ROSTER } from "@/lib/models";
import { CODE_STACK } from "@/lib/stack";
import { ANTI_SLOP_BANS, TASTE_STACK } from "@/lib/taste";

export default function TastePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <p className="text-[11px] uppercase tracking-[0.22em] text-copper">TasteSkill + image specialists</p>
      <h1 className="serif mt-3 max-w-3xl text-5xl">
        Anti-slop for every surface. Image models that actually draw.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
        Website layout happens in Next.js. Photography and type-in-image go to specialists through{" "}
        <code>POST /api/image</code>. Banners, social, and edits still layout in Figma. One studio key,
        the right model per job.
      </p>

      <section className="mt-12">
        <h2 className="serif text-3xl">Who Cursor should call</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
          Packets print a primary + supporting plan. Midjourney, Ideogram, Firefly, and SD 3.5 are not
          all on OpenRouter — those rows name the stand-in slug the API actually hits.
        </p>
        <div className="mt-6 grid gap-4">
          {IMAGE_ROSTER.map((model) => (
            <article key={model.id} className="hairline rounded-2xl bg-paper-2 p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="serif text-2xl">
                  <a href={model.href} className="hover:text-copper-deep">
                    {model.label}
                  </a>
                </h3>
                <p className="font-mono text-[11px] text-copper">{model.openrouter}</p>
              </div>
              <p className="mt-1 text-sm text-ink">{model.strength}</p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{model.use}</p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{model.never}</p>
              {model.openrouterNote ? (
                <p className="mt-2 text-xs leading-5 text-ink-soft">{model.openrouterNote}</p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="serif text-3xl">Website stack</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
          House combo for Website and Landing jobs. Banners and edits skip this and stay in Figma.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {CODE_STACK.map((item) => (
            <article key={item.id} className="hairline rounded-2xl bg-paper-2 p-5">
              <h3 className="serif text-2xl">{item.name}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{item.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="serif text-3xl">Taste stack</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {TASTE_STACK.map((item) => (
            <article key={item.id} className="hairline rounded-2xl bg-paper-2 p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-copper">{item.when}</p>
              <h3 className="serif mt-2 text-2xl">
                <a href={item.href} className="hover:text-copper-deep">
                  {item.name}
                </a>
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{item.role}</p>
              <p className="mt-3 font-mono text-[11px] text-ink-soft">{item.path}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="serif text-3xl">Banned on every surface</h2>
        <ul className="mt-4 grid gap-2 md:grid-cols-2">
          {ANTI_SLOP_BANS.map((ban) => (
            <li key={ban} className="rounded-xl border border-line bg-paper-2 px-4 py-3 text-sm leading-6">
              {ban}
            </li>
          ))}
        </ul>
      </section>

      <Link
        href="/"
        className="mt-12 inline-flex rounded-full bg-ink px-4 py-2 text-sm text-paper-2 hover:bg-copper-deep"
      >
        Start a job
      </Link>
    </div>
  );
}
