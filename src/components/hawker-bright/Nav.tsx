"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ArrowLeft, Menu, X } from "lucide-react";
import { Button } from "./Button";
import { cn, type ForceState } from "./types";

export const ROUTES = {
  hub: "/",
  site: "/hawker-bright/",
  moodboard: "/hawker-bright/moodboard/",
  system: "/hawker-bright/system/",
};

/** Cross-links: a distinct way out to the hub, then Mood board · Design system · Site */
export function CrossLinks({ current, className, onDark }: { current?: "site" | "moodboard" | "system"; className?: string; onDark?: boolean }) {
  const items = [
    { k: "moodboard", href: ROUTES.moodboard, label: "Mood board" },
    { k: "system", href: ROUTES.system, label: "Design system" },
    { k: "site", href: ROUTES.site, label: "Site" },
  ];
  return (
    <nav aria-label="Style pages" className={cn("flex flex-wrap items-center gap-y-0.5", className)}>
      <Link
        href={ROUTES.hub}
        aria-label="Leave Hawker Bright and return to the hub"
        className={cn(
          "hb-focusable group my-1.5 inline-flex min-h-8 items-center gap-1.5 rounded-full border-2 px-3 text-[0.8125rem] font-bold transition-colors",
          onDark ? "border-bg/60 !text-bg hover:border-bg hover:bg-bg hover:!text-ink !outline-white" : "border-ink hover:bg-ink hover:text-bg",
        )}
      >
        <ArrowLeft size={13} strokeWidth={3} aria-hidden className="transition-transform group-hover:-translate-x-0.5" /> Hub
      </Link>
      <span aria-hidden className={cn("mx-4 h-5 w-0.5 rounded-full sm:mx-5", onDark ? "bg-bg/30" : "bg-ink/25")} />
      {items.map((it, i) => (
        <span key={it.k} className="flex items-center gap-1">
          {i > 0 ? <span aria-hidden className={onDark ? "text-white/50" : "text-ink-subtle"}>·</span> : null}
          <Link
            href={it.href}
            aria-current={it.k === current ? "page" : undefined}
            className={cn(
              "hb-focusable rounded px-1 py-2 text-[0.8125rem] font-bold underline-offset-4 hover:underline",
              it.k === current && "underline decoration-2",
              onDark && "!outline-white",
            )}
          >
            {it.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}

export function NavLink({ href, children, current, forceState, onClick }: { href: string; children: ReactNode; current?: boolean; forceState?: ForceState; onClick?: () => void }) {
  const cls = "hb-navlink hb-focusable";
  const isHash = href.startsWith("#") || href.includes("#");
  return isHash ? (
    <a href={href} data-force={forceState} aria-current={current ? "page" : undefined} onClick={onClick} className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} data-force={forceState} aria-current={current ? "page" : undefined} onClick={onClick} className={cls}>
      {children}
    </Link>
  );
}

/** Stall-sign wordmark */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link href={ROUTES.site} className={cn("hb-focusable inline-flex items-center gap-2 rounded-[10px]", className)} aria-label="Makan Map home">
      <span className="flex items-stretch overflow-hidden rounded-[10px] border-2 border-ink bg-brand text-on-brand shadow-[3px_3px_0_var(--ink)]">
        <span className="hb-mono grid place-items-center border-r-2 border-ink bg-surface px-2 text-ink">#01</span>
        <span className="hb-title px-3 py-1.5 !text-[1.35rem] uppercase !leading-none tracking-wide">Makan Map</span>
      </span>
    </Link>
  );
}

export function SiteNav({
  links,
  current,
  trailing,
  page,
}: {
  links: { href: string; label: string; current?: boolean }[];
  current?: "site" | "moodboard" | "system";
  trailing?: ReactNode;
  page?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-bg">
      <div className="bg-ink text-bg">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-6">
          <CrossLinks current={current} onDark className="[&_a]:text-bg" />
          <span className="hb-mono hidden text-bg/70 sm:block">{page ?? "Hawker Bright · Everyday Singapore"}</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1320px] items-center gap-3 px-4 py-3 sm:px-6">
        <Wordmark />
        <nav aria-label="Sections" className="ml-4 hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink key={l.label} href={l.href} current={l.current}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <span className="flex-1" />
        {trailing}
        <Button icon variant="secondary" size="sm" className="lg:!hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="hb-mobile-nav" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={20} strokeWidth={2.75} aria-hidden /> : <Menu size={20} strokeWidth={2.75} aria-hidden />}
        </Button>
      </div>
      {open ? (
        <nav id="hb-mobile-nav" aria-label="Sections" className="border-t-2 border-ink bg-surface-2 px-4 py-3 lg:hidden">
          <ul className="grid grid-cols-2 gap-2">
            {links.map((l) => (
              <li key={l.label}>
                <NavLink href={l.href} current={l.current} onClick={() => setOpen(false)}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

export function Footer({ current }: { current?: "site" | "moodboard" | "system" }) {
  return (
    <footer className="border-t-2 border-ink">
      <div className="hb-stripes h-6 border-b-2 border-ink" aria-hidden />
      <div className="bg-ink text-bg">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="hb-headline !text-[2.75rem] text-bg">Chope a seat. Kopi&apos;s on.</p>
            <p className="hb-body mt-3 max-w-xl text-bg/80">
              Makan Map is a design exercise: a hawker-centre guide for the curious traveller. Stall names are illustrative; centres and dishes are real. Check each centre for today&apos;s opening times before you go.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <CrossLinks current={current} onDark className="[&_a]:text-bg" />
            <Link href="/credits/" className="hb-focusable rounded px-1 py-2 text-[0.875rem] font-bold text-bg underline underline-offset-4 !outline-white">
              Photo credits
            </Link>
            <p className="hb-mono text-bg/60">HAWKER BRIGHT · SINGAPORE, THREE WAYS</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
