import { Logo } from "@/components/logo";
import {
  address,
  email,
  liveSite,
  phoneDisplay,
  phoneHref,
} from "@/lib/data";

const columns = [
  {
    title: "Customer support",
    links: [
      { href: `${liveSite}/manage-reservation`, label: "Manage reservation" },
      { href: `${liveSite}/online-checkin`, label: "Online check-in" },
      { href: `${liveSite}/faqs`, label: "FAQs" },
      { href: `${liveSite}/contact`, label: "Contact" },
    ],
  },
  {
    title: "Avance",
    links: [
      { href: `${liveSite}/about-us`, label: "About us" },
      { href: `${liveSite}/locations`, label: "Locations" },
      { href: `${liveSite}/explore-vehicles`, label: "Explore vehicles" },
      { href: `${liveSite}/career`, label: "Career" },
    ],
  },
  {
    title: "Partners",
    links: [
      { href: `${liveSite}/b2b`, label: "B2B program" },
      { href: `${liveSite}/corporate`, label: "Corporate car rentals" },
      { href: `${liveSite}/hotel-partners`, label: "Hotel partners" },
      { href: `${liveSite}/deals`, label: "Deals" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-16 sm:px-8 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo variant="white" className="h-11" />
          <p className="mt-6 max-w-xs text-base leading-7 text-ice">
            The Greek car rental company. Airports, ports, and hotel desks.
            Driving miles together.
          </p>
          <p className="mt-6 text-sm leading-6 text-ice">
            <a href={phoneHref} className="font-semibold text-white">
              {phoneDisplay}
            </a>
            <br />
            <a href={`mailto:${email}`} className="text-white">
              {email}
            </a>
            <br />
            {address}
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="caption text-gold">{col.title}</p>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-ice hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/awards/peak.svg" alt="Peak Awards 2022 Bronze" className="h-12 w-auto" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/awards/evolution.svg" alt="Evolution Awards" className="h-12 w-auto" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/awards/champion.svg" alt="Greek tourism champion" className="h-12 w-auto" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/vivawallet.svg" alt="Viva Wallet" className="h-7 w-auto brightness-0 invert" />
        </div>
        <p className="mx-auto max-w-[1200px] px-4 pb-8 text-xs text-ice sm:px-8">
          Homepage redesign preview. Bookings continue on avance.gr.
        </p>
      </div>
    </footer>
  );
}
