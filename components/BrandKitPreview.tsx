import type { BrandKit } from "@/lib/types";

export function BrandKitPreview({ kit }: { kit: BrandKit }) {
  return (
    <section className="hairline rounded-2xl bg-paper-2 p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">Brand kit</p>
          <h2 className="serif mt-1 text-3xl">{kit.name}</h2>
          {kit.tagline ? <p className="mt-2 max-w-2xl text-sm text-ink-soft">{kit.tagline}</p> : null}
        </div>
        {kit.url ? (
          <a className="text-sm underline decoration-line underline-offset-4" href={kit.url}>
            {kit.url.replace(/^https?:\/\//, "")}
          </a>
        ) : null}
      </div>

      {kit.colors.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {kit.colors.map((color) => (
            <div key={`${color.hex}-${color.role}`} className="overflow-hidden rounded-xl border border-line">
              <div className="h-16" style={{ background: color.hex }} />
              <div className="px-2.5 py-2 text-[11px]">
                <p className="font-medium">{color.hex}</p>
                <p className="text-ink-soft">{color.role}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Meta title="Type" items={kit.fonts.map((font) => `${font.family} · ${font.role}`)} empty="No custom fonts found" />
        <Meta title="Sitemap hints" items={kit.sitemapHints} empty="No nav extracted" />
        <Meta title="Voice samples" items={kit.voice} empty="No copy extracted" />
      </div>

      {kit.logos.length > 0 ? (
        <div className="mt-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">Logo / imagery candidates</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {kit.logos.map((src) => (
              <div key={src} className="flex h-16 w-28 items-center justify-center overflow-hidden rounded-lg border border-line bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="max-h-14 max-w-[6.5rem] object-contain" />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {kit.warnings.length > 0 ? (
        <ul className="mt-6 space-y-1.5 rounded-xl bg-[#f4e3d2] px-4 py-3 text-sm text-copper-deep">
          {kit.warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function Meta({ title, items, empty }: { title: string; items: string[]; empty: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">{title}</p>
      {items.length === 0 ? (
        <p className="mt-2 text-sm text-ink-soft">{empty}</p>
      ) : (
        <ul className="mt-2 space-y-1.5 text-sm">
          {items.slice(0, 6).map((item) => (
            <li key={item} className="leading-snug">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
