import Link from "next/link";
import { MODEL_TABLE } from "@/lib/models";
import { ANTI_SLOP_BANS, TASTE_STACK } from "@/lib/taste";

export default function TastePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <p className="text-[11px] uppercase tracking-[0.22em] text-copper">TasteSkill + models</p>
      <h1 className="serif mt-3 max-w-3xl text-5xl leading-[1.05]">
        Anti-slop for every surface. Models that can actually draw.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
        Websites, banners, social, pitch, wireframes, and in-file edits all go through{" "}
        <a className="text-ink underline decoration-line underline-offset-4" href="https://www.tasteskill.dev/">
          TasteSkill
        </a>{" "}
        before they are allowed to look done. Cursor then launches the specialist on a design-capable model —
        not a fast/small one.
      </p>

      <section className="mt-12">
        <h2 className="serif text-3xl">Which model to launch</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
          Packets print the Cursor slug. When you spawn a design subagent, pass that slug. If the parent
          chat is already GPT or Codex, stay on GPT-5.6 xhigh and load <code>gpt-taste</code>.
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper-2 text-[11px] uppercase tracking-[0.16em] text-ink-soft">
              <tr>
                <th className="px-4 py-3 font-medium">Use</th>
                <th className="px-4 py-3 font-medium">Model</th>
                <th className="px-4 py-3 font-medium">Cursor slug</th>
              </tr>
            </thead>
            <tbody>
              {MODEL_TABLE.map((model) => (
                <tr key={model.id} className="border-t border-line">
                  <td className="px-4 py-3 text-ink-soft">{model.use}</td>
                  <td className="px-4 py-3">{model.label}</td>
                  <td className="px-4 py-3 font-mono text-[11px]">{model.slug}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
