"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, Route as RouteIcon, X } from "lucide-react";
import { TileMotif } from "./patterns";
import { CountBadge } from "./Feedback";
import { cx } from "./cx";

const SLUG = "shophouse-heritage";

export type NavLink = { href: string; label: string };

export function CrossLinks({ current, className }: { current?: "site" | "moodboard" | "system"; className?: string }) {
  const items = [
    { key: "hub", label: "Hub", href: "/" },
    { key: "moodboard", label: "Mood board", href: `/${SLUG}/moodboard/` },
    { key: "system", label: "Design system", href: `/${SLUG}/system/` },
    { key: "site", label: "Site", href: `/${SLUG}/` },
  ];
  return (
    <nav aria-label="Project pages" className={cx("flex flex-wrap items-center gap-x-1 text-sm", className)}>
      {items.map((it, i) => (
        <span key={it.key} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden className="text-ink-subtle">·</span>}
          <Link
            href={it.href}
            aria-current={current === it.key ? "page" : undefined}
            className="inline-flex min-h-11 items-center rounded-control px-1.5 text-ink-muted underline decoration-line-strong/25 underline-offset-4 hover:text-ink hover:decoration-brand aria-[current=page]:font-semibold aria-[current=page]:text-ink md:min-h-8"
          >
            {it.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}

/** Sticky header: wordmark, in-page links, optional trail button, and quiet cross-links. */
export function SiteNav({
  title = "The Heritage Trail",
  links,
  current,
  trailCount,
  onOpenTrail,
}: {
  title?: string;
  links: NavLink[];
  current: "site" | "moodboard" | "system";
  trailCount?: number;
  onOpenTrail?: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/92 backdrop-blur supports-[backdrop-filter]:bg-bg/85">
      <div className="mx-auto flex h-16 max-w-[84rem] items-center gap-4 px-5 md:px-10">
        <Link href={`/${SLUG}/`} className="flex items-center gap-2.5 rounded-control" aria-label={`${title}, home`}>
          <TileMotif size={30} />
          <span className="sh-title text-[1.15rem] leading-none text-ink">{title}</span>
        </Link>
        <nav aria-label="Sections" className="ml-6 hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="inline-flex min-h-9 items-center rounded-control px-3 text-sm font-semibold text-ink hover:bg-surface-2">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <CrossLinks current={current} className="hidden xl:flex" />
          {onOpenTrail && (
            <button
              type="button"
              onClick={onOpenTrail}
              className="ml-2 inline-flex min-h-11 items-center gap-2 rounded-control border border-brand px-3.5 text-sm font-semibold text-brand hover:bg-brand/10 md:min-h-10"
            >
              <RouteIcon size={18} strokeWidth={1.5} aria-hidden />
              My trail
              <CountBadge count={trailCount ?? 0} />
              <span className="sr-only">{trailCount ?? 0} stops</span>
            </button>
          )}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="sh-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="flex size-11 items-center justify-center rounded-control text-ink hover:bg-surface-2 xl:hidden"
          >
            {open ? <X size={22} strokeWidth={1.5} aria-hidden /> : <Menu size={22} strokeWidth={1.5} aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <div id="sh-menu" className="sh-fade-up border-t border-line bg-bg px-5 pb-5 pt-3 md:px-10 xl:hidden">
          <nav aria-label="Sections" className="flex flex-col lg:hidden">
            {links.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center border-b border-line text-base font-semibold text-ink">
                {l.label}
              </a>
            ))}
          </nav>
          <CrossLinks current={current} className="mt-3 -ml-1.5" />
        </div>
      )}
    </header>
  );
}
