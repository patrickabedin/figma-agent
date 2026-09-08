"use client";

import { useState } from "react";
import { List, Phone, X } from "@phosphor-icons/react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { nav, phoneDisplay, phoneHref, liveSite } from "@/lib/data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ice/80 bg-wash/95 backdrop-blur-sm">
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
        <button
          type="button"
          className="inline-flex size-12 items-center justify-center text-navy lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <List size={24} />}
          <span className="sr-only">Menu</span>
        </button>
      </div>
      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-ice bg-white px-4 py-6 lg:hidden"
        >
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-lg font-medium text-navy"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href={phoneHref} className="font-semibold text-navy">
              {phoneDisplay}
            </a>
            <Button asChild>
              <a href="#book" onClick={() => setOpen(false)}>
                Book a car
              </a>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
