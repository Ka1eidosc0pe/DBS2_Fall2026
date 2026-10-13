"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ThemeRoot } from "@/components/ThemeRoot";
import { displayVars } from "@/lib/fonts";
import { STYLES, type StyleSlug } from "@/lib/styles";

type Geo = { x: number; y: number; r: number };

const OPEN = "clip-path 900ms cubic-bezier(0.22, 0.8, 0.2, 1)";
const CLOSE = "clip-path 550ms cubic-bezier(0.4, 0, 0.6, 1)";

/**
 * Hovering (or focusing) a style card floods the hub in that style: a copy of the hub,
 * re-themed, is revealed by a circle growing out of the card. Leaving recedes it back in.
 *
 * Each copy is inert and hidden from assistive tech. Sections marked data-lock keep the
 * base layer's measured height so the re-typeset copy lines up with the real page.
 */
export function HubFlood({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const current = useRef<StyleSlug | null>(null);
  const [open, setOpen] = useState<StyleSlug | null>(null);
  const [geo, setGeo] = useState<Partial<Record<StyleSlug, Geo>>>({});

  // Measure locked sections on the base layer and share the heights with the copies.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const base = el.querySelector<HTMLElement>('[data-layer="base"]');
    if (!base) return;
    const measure = () => {
      base.querySelectorAll<HTMLElement>("[data-lock]").forEach((n) => {
        el.style.setProperty(`--lock-${n.dataset.lock}`, `${n.offsetHeight}px`);
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(base);
    return () => ro.disconnect();
  }, []);

  const activate = useCallback((slug: StyleSlug | null, card?: HTMLElement) => {
    if (slug === current.current) return;
    current.current = slug;
    if (!slug || !card || !root.current) {
      setOpen(null);
      return;
    }
    const box = root.current.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    const x = c.left - box.left + c.width / 2;
    const y = c.top - box.top + c.height / 2;
    const r = Math.max(
      Math.hypot(x, y),
      Math.hypot(box.width - x, y),
      Math.hypot(x, box.height - y),
      Math.hypot(box.width - x, box.height - y),
    );
    // Place the circle at radius 0 first, then grow it on the next frames.
    setGeo((g) => ({ ...g, [slug]: { x, y, r } }));
    requestAnimationFrame(() => requestAnimationFrame(() => current.current === slug && setOpen(slug)));
  }, []);

  const fromTarget = (t: EventTarget | null) => {
    const card = t instanceof Element ? t.closest<HTMLElement>("[data-style-card]") : null;
    return { card: card ?? undefined, slug: (card?.dataset.styleCard as StyleSlug | undefined) ?? null };
  };

  return (
    <div
      ref={root}
      className={`relative isolate ${displayVars}`}
      onPointerOver={(e) => {
        if (e.pointerType === "touch") return;
        const { card, slug } = fromTarget(e.target);
        activate(slug, card);
      }}
      onPointerLeave={(e) => e.pointerType !== "touch" && activate(null)}
      onFocus={(e) => {
        const { card, slug } = fromTarget(e.target);
        activate(slug, card);
      }}
      onBlur={(e) => {
        if (!fromTarget(e.relatedTarget).slug) activate(null);
      }}
    >
      <ThemeRoot theme="hub" className="hub-base" data-layer="base">
        {children}
      </ThemeRoot>

      {STYLES.map((s) => {
        const g = geo[s.slug];
        const isOpen = open === s.slug;
        return (
          <div
            key={s.slug}
            aria-hidden
            inert
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{
              zIndex: isOpen ? 12 : 11,
              clipPath: g ? `circle(${isOpen ? g.r : 0}px at ${g.x}px ${g.y}px)` : "circle(0px at 50% 50%)",
              transition: isOpen ? OPEN : CLOSE,
              visibility: g ? "visible" : "hidden",
            }}
          >
            <ThemeRoot theme={s.slug} className="hub-flood h-full">
              {children}
            </ThemeRoot>
          </div>
        );
      })}
    </div>
  );
}
