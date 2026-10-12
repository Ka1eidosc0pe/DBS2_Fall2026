"use client";
import { useState } from "react";
import { Button } from "./Button";
import { ArchFrame } from "./Arch";
import { BatikPattern, GrillePattern, TileBand, TileMotif, TilePattern } from "./patterns";

const ROLES = [
  {
    role: "Display",
    cls: "sh-display text-[2.75rem] leading-[1.02] md:text-[5.5rem]",
    sample: "Walk the five-foot way",
    family: "Fraunces, SOFT 100 · WONK 1 · opsz 144",
    mobile: "44 / 1.05",
    desktop: "88 / 0.98",
    weight: "600",
    tracking: "−0.015em",
    casing: "Sentence case",
    use: "Hero headline only.",
  },
  {
    role: "Headline",
    cls: "sh-display text-[2.5rem] leading-[1.05] md:text-[3.5rem]",
    sample: "Six quarters, one walk",
    family: "Fraunces, SOFT 100 · WONK 1 · opsz 144",
    mobile: "40 / 1.05",
    desktop: "56 / 1.05",
    weight: "600",
    tracking: "−0.015em",
    casing: "Sentence case",
    use: "Section headings, centred on the axis.",
  },
  {
    role: "Title",
    cls: "sh-title text-[1.375rem] leading-[1.2] md:text-[1.75rem]",
    sample: "Thian Hock Keng Temple",
    family: "Fraunces, SOFT 80 · WONK 1 · opsz 48",
    mobile: "22 / 1.2",
    desktop: "28 / 1.2",
    weight: "600",
    tracking: "0",
    casing: "Title case",
    use: "Card and drawer titles, stop names.",
  },
  {
    role: "Body",
    cls: "text-[1.0625rem] leading-[1.7] md:text-[1.125rem]",
    sample: "Hokkien immigrants built this temple to thank Mazu for their safe passage across the South China Sea.",
    family: "Karla",
    mobile: "17 / 1.7",
    desktop: "18 / 1.7",
    weight: "400 (500 for emphasis)",
    tracking: "0",
    casing: "Sentence case",
    use: "Stories, descriptions, paragraphs. 65 characters per line.",
  },
  {
    role: "Label",
    cls: "sh-label",
    sample: "Kampong Glam · Early colonial",
    family: "Karla",
    mobile: "11 / 1.3",
    desktop: "12 / 1.3",
    weight: "700",
    tracking: "0.12em",
    casing: "UPPERCASE",
    use: "Museum-card captions, district names, form labels.",
  },
  {
    role: "Caption",
    cls: "text-[0.8125rem] leading-snug text-ink-muted",
    sample: "Author · CC BY-SA 4.0, linked to the source photograph.",
    family: "Karla",
    mobile: "13 / 1.4",
    desktop: "13 / 1.4",
    weight: "400",
    tracking: "0",
    casing: "Sentence case",
    use: "Photo credits, helper text, timestamps.",
  },
  {
    role: "Numerals",
    cls: "sh-year text-[2.5rem] leading-none md:text-[3.25rem]",
    sample: "1823 · 1932 · 1965",
    family: "Fraunces italic, old-style figures",
    mobile: "40 / 1",
    desktop: "52 / 1",
    weight: "600 italic",
    tracking: "0",
    casing: "Numerals",
    use: "Dates are a recurring motif: years, timelines, trail numbers.",
  },
];

export function TypeSection() {
  return (
    <div className="divide-y divide-line rounded-card border border-line bg-surface">
      {ROLES.map((r) => (
        <div key={r.role} className="grid gap-6 p-5 md:p-8 lg:grid-cols-[1fr_20rem] lg:gap-10">
          <div className="min-w-0">
            <p className="sh-label mb-3 text-brand">{r.role}</p>
            <p className={r.cls + " text-ink"}>{r.sample}</p>
          </div>
          <dl className="grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1.5 self-start text-sm">
            {[
              ["Family", r.family],
              ["Mobile", r.mobile],
              ["Desktop", r.desktop],
              ["Weight", r.weight],
              ["Tracking", r.tracking],
              ["Case", r.casing],
              ["Use", r.use],
            ].map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="sh-label text-ink-muted">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

const SPACE = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128];
const BREAKPOINTS = [
  ["Mobile", "390", "Single column, 20px margins, 64–80px section padding"],
  ["sm", "640", "Two-up chips and forms"],
  ["md", "768", "Drawer becomes a right-hand panel, 40px margins"],
  ["lg", "1024", "Section links appear in the header, two- and three-up grids"],
  ["xl", "1280", "Cross-links open in the header, 96–128px section padding"],
  ["Desktop", "1440", "Content capped at 84rem (1344px)"],
];

function Card({ title, children, note }: { title: string; children: React.ReactNode; note?: string }) {
  return (
    <div className="min-w-0 rounded-card border border-line bg-surface p-5 md:p-6">
      <h3 className="sh-title text-xl text-ink">{title}</h3>
      {note && <p className="mt-1 text-sm text-ink-muted">{note}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

export function SpaceSection() {
  const [n, setN] = useState(0);
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card title="Spacing scale" note="A 4px base. Sections breathe at 64 (mobile) to 128 (desktop).">
        <ul className="space-y-2.5">
          {SPACE.map((s) => (
            <li key={s} className="flex items-center gap-4">
              <span className="w-12 text-sm tabular-nums text-ink-muted">{s}px</span>
              <span className="h-3 rounded-[2px] bg-brand" style={{ width: s }} />
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Radii" note="Gentle controls, calm cards, and the arch.">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ["Control", "6px", "rounded-control"],
            ["Card", "10px", "rounded-card"],
            ["Pill", "999px", "rounded-pill"],
          ].map(([a, b, c]) => (
            <div key={a} className="text-center">
              <div className={`mx-auto h-20 w-full border-2 border-brand bg-surface-2 ${c}`} />
              <p className="mt-2 text-sm font-semibold text-ink">{a}</p>
              <p className="text-xs text-ink-muted">{b}</p>
            </div>
          ))}
          <div className="text-center">
            <div className="mx-auto h-20 w-full rounded-t-[999px] rounded-b-card border-2 border-brand bg-surface-2" />
            <p className="mt-2 text-sm font-semibold text-ink">Arch</p>
            <p className="text-xs text-ink-muted">999 / 999 / 10 / 10</p>
          </div>
        </div>
      </Card>
      <Card title="Borders and elevation">
        <div className="grid gap-4 sm:grid-cols-2">
          <ul className="space-y-3 text-sm text-ink">
            <li className="flex items-center gap-3"><span className="h-0 w-14 border-t border-line" />1px plaster line: dividers, cards</li>
            <li className="flex items-center gap-3"><span className="h-0 w-14 border-t border-ink-subtle" />1px pewter: control edges (3.6:1)</li>
            <li className="flex items-center gap-3"><span className="h-0 w-14 border-t border-ink" />1px ink: drawers, toasts</li>
            <li className="flex items-center gap-3"><span className="h-0 w-14 border-t-2 border-focus" />2px deep jade: focus, offset 2px</li>
          </ul>
          <div className="flex gap-4">
            <div className="flex h-20 flex-1 items-center justify-center rounded-card bg-surface text-xs text-ink-muted shadow-card">card</div>
            <div className="flex h-20 flex-1 items-center justify-center rounded-card bg-surface text-xs text-ink-muted shadow-raised">raised</div>
          </div>
        </div>
      </Card>
      <Card title="Layout grid and breakpoints" note="12 columns, 20px gutters on mobile, 24px from md. Max width 84rem.">
        <ul className="divide-y divide-line text-sm">
          {BREAKPOINTS.map(([k, w, d]) => (
            <li key={k} className="grid grid-cols-[4.5rem_3.5rem_1fr] gap-3 py-2">
              <span className="font-semibold text-ink">{k}</span>
              <span className="tabular-nums text-ink-muted">{w}px</span>
              <span className="text-ink-muted">{d}</span>
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Motion" note="250–400ms, ease-out. Reduced motion collapses every duration to zero.">
        <ul className="grid gap-2 text-sm text-ink sm:grid-cols-3">
          <li className="rounded-control bg-surface-2 p-3"><b>200ms</b><br />Hover and press</li>
          <li className="rounded-control bg-surface-2 p-3"><b>300ms</b><br />Cards, fades, toasts</li>
          <li className="rounded-control bg-surface-2 p-3"><b>400ms</b><br />Arch reveal, drawers</li>
        </ul>
        <p className="mt-3 text-sm text-ink-muted">Easing: <code>cubic-bezier(0.22, 0.61, 0.36, 1)</code></p>
        <div className="mt-5 flex flex-wrap items-center gap-5">
          <div key={n} className="w-28">
            <ArchFrame src="/images/shophouse-heritage/koon-seng.jpg" alt="Shophouse row in an arched frame" sizes="112px" ratio="4 / 5" arch reveal credit={false} />
          </div>
          <div key={"t" + n} className="sh-spin-in"><TileMotif size={72} /></div>
          <Button variant="secondary" size="sm" onClick={() => setN((x) => x + 1)}>Replay</Button>
        </div>
        <p className="mt-2 text-sm text-ink-muted">The arch wipes upward; the tile turns in.</p>
      </Card>
      <Card title="Pattern kit" note="Drawn in SVG, reusable at any size. The tile is the signature.">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex items-center gap-4">
            <TileMotif size={104} title="The Peranakan tile, one repeat" />
            <div className="h-[104px] flex-1 overflow-hidden rounded-card border border-line"><TilePattern tile={52} /></div>
          </div>
          <div className="col-span-2"><TileBand height={36} /></div>
          <div className="h-24 overflow-hidden rounded-card border border-line bg-surface-2 text-brand"><GrillePattern tile={32} /></div>
          <div className="h-24 overflow-hidden rounded-card border border-line bg-surface-2 text-(--jade-deep)"><BatikPattern tile={36} /></div>
        </div>
        <p className="mt-3 text-sm text-ink-muted">Tile · band · ventilation grille · batik kawung. Pattern is the frame; the page stays limewash.</p>
      </Card>
    </div>
  );
}
