"use client";

import { ArrowLeft, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cx, FOCUS, T } from "./cx";

export type NavItem = { label: string; href: string; current?: boolean };

/** Utility strip on every page: the way back to the hub and across the three Marina Noir deliverables. */
export function CrossLinks({ current, className }: { current?: "moodboard" | "system" | "site"; className?: string }) {
  const items = [
    { key: "moodboard", label: "Mood board", href: "/marina-noir/moodboard/" },
    { key: "system", label: "Design system", href: "/marina-noir/system/" },
    { key: "site", label: "Site", href: "/marina-noir/" },
  ];
  const link = "mn-label inline-flex min-h-11 items-center whitespace-nowrap text-[0.625rem] tracking-[0.08em] sm:tracking-[0.2em] md:min-h-9";
  return (
    <nav aria-label="Project" className={cx("border-b border-line bg-bg", className)}>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-3 md:px-10">
        {/* The way out: set apart from the style's own pages */}
        <Link
          href="/"
          aria-label="Leave Marina Noir and return to the hub"
          className={cx(link, "group my-1.5 !min-h-8 gap-1.5 border border-line-strong px-2.5 text-ink-muted sm:gap-2 sm:px-3 hover:border-ink hover:text-ink md:!min-h-7", T, FOCUS)}
        >
          <ArrowLeft aria-hidden strokeWidth={1} className="size-3.5 transition-transform duration-500 group-hover:-translate-x-1" />
          Hub
        </Link>
        <ul className="flex items-center overflow-x-auto">
          {items.map((i, idx) => (
            <li key={i.key} className="flex items-center">
              {idx > 0 && <span aria-hidden className="size-1 rotate-45 bg-line-strong" />}
              <Link
                href={i.href}
                aria-current={i.key === current ? "page" : undefined}
                className={cx(link, "px-1.5 text-ink-subtle hover:text-ink aria-[current=page]:text-ink sm:px-2.5 md:px-4", T, FOCUS)}
              >
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link href="/marina-noir/" className={cx("group flex min-h-11 flex-col justify-center leading-none", FOCUS, className)} aria-label="The Concierge, home">
      <span className="font-display text-[1.375rem] tracking-[-0.01em] italic" style={{ fontVariationSettings: '"opsz" 48' }}>
        The Concierge
      </span>
      <span className="mn-label mt-1 hidden text-[0.5625rem] text-ink-subtle sm:block">Singapore after dark</span>
    </Link>
  );
}

/** Site navigation. Collapses to a menu on small screens. `end` holds the Your evening button. */
export function NavBar({ items, end, className }: { items: NavItem[]; end?: React.ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={cx("relative border-b border-line bg-bg/85 backdrop-blur-md", className)}>
      <div className="mx-auto flex h-[4.5rem] max-w-[1440px] items-center justify-between gap-4 px-5 md:px-10">
        <Wordmark />
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {items.map((i) => (
            <a
              key={i.href}
              href={i.href}
              aria-current={i.current ? "true" : undefined}
              className={cx(
                "mn-label relative inline-flex min-h-11 items-center px-4 text-ink-muted hover:text-ink aria-[current=true]:text-ink",
                "after:absolute after:inset-x-4 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-(--lacquer) after:transition-transform after:duration-(--dur-2) after:ease-(--ease) hover:after:scale-x-100 aria-[current=true]:after:scale-x-100",
                T,
                FOCUS,
              )}
            >
              {i.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {end}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mn-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={cx("grid size-11 cursor-pointer place-items-center border border-(--control-line) hover:border-ink md:hidden", T, FOCUS)}
          >
            {open ? <X aria-hidden strokeWidth={1} className="size-[18px]" /> : <Menu aria-hidden strokeWidth={1} className="size-[18px]" />}
          </button>
        </div>
      </div>
      <nav
        id="mn-menu"
        aria-label="Menu"
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 border-b border-line-strong bg-surface-2 px-5 py-3 md:hidden"
      >
        {items.map((i) => (
          <a
            key={i.href}
            href={i.href}
            onClick={() => setOpen(false)}
            className={cx("mn-label flex min-h-12 items-center border-b border-line text-ink last:border-b-0", FOCUS)}
          >
            {i.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
