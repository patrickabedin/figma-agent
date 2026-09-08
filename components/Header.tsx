import Link from "next/link";
import { STUDIO_NAME } from "@/lib/constants";

const links = [
  { href: "/", label: "New job" },
  { href: "/starters", label: "Starters" },
  { href: "/agents", label: "Agents" },
  { href: "/taste", label: "Taste" },
  { href: "/playbook", label: "Playbook" },
];

export function Header() {
  return (
    <header className="border-b border-line/80 bg-paper-2/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="serif text-2xl tracking-tight">{STUDIO_NAME}</span>
          <span className="hidden text-[11px] uppercase tracking-[0.22em] text-ink-soft sm:inline">
            Hellenic design agents
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-ink-soft">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
