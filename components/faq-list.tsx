import { faqs, liveSite } from "@/lib/data";

export function FaqList() {
  return (
    <div>
      <div className="divide-y divide-ice">
        {faqs.map((item) => (
          <details key={item.q} className="group py-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-lg font-semibold text-navy [&::-webkit-details-marker]:hidden">
              {item.q}
              <span className="mt-1 shrink-0 text-sky group-open:rotate-180">⌄</span>
            </summary>
            <p className="pt-3 text-base leading-7 text-muted-foreground">
              {item.a}
            </p>
          </details>
        ))}
      </div>
      <p className="mt-8 text-base">
        More questions?{" "}
        <a href={`${liveSite}/faqs`} className="font-semibold text-sky">
          Full FAQ
        </a>{" "}
        or{" "}
        <a href={`${liveSite}/contact`} className="font-semibold text-sky">
          contact us
        </a>
        .
      </p>
    </div>
  );
}
