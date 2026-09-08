import { Phone } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { nav, phoneDisplay, phoneHref, liveSite } from "@/lib/data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ice/80 bg-wash/95">
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-4 sm:px-8">
        <a href="#top" aria-label="Avance home">
          <Logo />
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-navy hover:text-sky"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={phoneHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy"
          >
            <Phone size={18} weight="bold" />
            {phoneDisplay}
          </a>
          <Button asChild variant="outline" size="sm">
            <a href={`${liveSite}/login`}>Login</a>
          </Button>
          <Button asChild size="sm">
            <a href="#book">Book</a>
          </Button>
        </div>
        <details className="lg:hidden">
          <summary className="flex h-12 cursor-pointer list-none items-center px-2 text-sm font-semibold text-navy [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <div className="absolute inset-x-0 top-20 border-b border-ice bg-white px-4 py-6">
            <nav className="mx-auto flex max-w-[1200px] flex-col gap-4" aria-label="Mobile">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium text-navy"
                >
                  {item.label}
                </a>
              ))}
              <a href={phoneHref} className="font-semibold text-navy">
                {phoneDisplay}
              </a>
              <Button asChild>
                <a href="#book">Book a car</a>
              </Button>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
