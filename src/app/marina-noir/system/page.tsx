import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { SWATCHES, STATUS, hex, ratio, verdict } from "@/data/marina-noir/tokens";
import { Badge, CountBadge } from "@/components/marina-noir/Badge";
import { Button } from "@/components/marina-noir/Button";
import { FilterChip } from "@/components/marina-noir/Chip";
import { CrossLinks } from "@/components/marina-noir/NavBar";
import { DoubleRule, FanPattern } from "@/components/marina-noir/Ornament";
import { Components } from "./Components";
import { CardStates, Matrix } from "./Matrix";
import { UiStates } from "./UiStates";

export const metadata: Metadata = { title: "Marina Noir: design system" };

const SECTIONS = [
  ["color", "Color"],
  ["type", "Type"],
  ["space", "Space and shape"],
  ["components", "Components"],
  ["states", "Control states"],
  ["ui-states", "UI states"],
] as const;

type Pair = { token: string; name: string; use: string; fg: string; bg: string; partner: string; kind: "text" | "ui" | "decor"; chip: string };
const PAIRS: Pair[] = [
  { token: "bg", name: "Onyx", use: "Page background", fg: hex.ink, bg: hex.bg, partner: "Ivory text", kind: "text", chip: hex.bg },
  { token: "surface", name: "Smoke", use: "Cards, panels", fg: hex.ink, bg: hex.surface, partner: "Ivory text", kind: "text", chip: hex.surface },
  { token: "surface-2", name: "Velvet", use: "Drawers, toasts, raised panels", fg: hex.ink, bg: hex["surface-2"], partner: "Ivory text", kind: "text", chip: hex["surface-2"] },
  { token: "ink", name: "Ivory", use: "Primary text, focus ring", fg: hex.ink, bg: hex.bg, partner: "on Onyx", kind: "text", chip: hex.ink },
  { token: "ink-muted", name: "Linen", use: "Secondary text", fg: hex["ink-muted"], bg: hex.bg, partner: "on Onyx", kind: "text", chip: hex["ink-muted"] },
  { token: "ink-subtle", name: "Taupe", use: "Meta, captions, placeholders", fg: hex["ink-subtle"], bg: hex["surface-2"], partner: "on Velvet, the worst case", kind: "text", chip: hex["ink-subtle"] },
  { token: "line", name: "Hairline", use: "Dividers, quiet borders", fg: hex.line, bg: hex.bg, partner: "on Onyx", kind: "decor", chip: hex.line },
  { token: "line-strong", name: "Bronze line", use: "Double rules, card tops", fg: hex["line-strong"], bg: hex.bg, partner: "on Onyx", kind: "decor", chip: hex["line-strong"] },
  { token: "control-line", name: "Brass edge", use: "Input and control borders", fg: hex["control-line"], bg: hex.bg, partner: "on Onyx", kind: "ui", chip: hex["control-line"] },
  { token: "brand", name: "Oxblood", use: "Selected chips, brand bands", fg: hex.ink, bg: hex.brand, partner: "Ivory text (on-brand)", kind: "text", chip: hex.brand },
  { token: "lacquer", name: "Lacquer", use: "Active indicators, seals", fg: hex.lacquer, bg: hex.bg, partner: "on Onyx", kind: "decor", chip: hex.lacquer },
  { token: "accent", name: "Champagne", use: "Primary action only", fg: hex.bg, bg: hex.accent, partner: "Onyx text (on-accent)", kind: "text", chip: hex.accent },
  { token: "focus", name: "Ivory focus ring", use: "Keyboard focus, 2px, 2px offset", fg: hex.ink, bg: hex.bg, partner: "on Onyx", kind: "ui", chip: hex.ink },
  ...STATUS.map<Pair>((s) => ({ token: s.token, name: s.name, use: s.role, fg: s.hex, bg: hex["surface-2"], partner: "on Velvet", kind: "text", chip: s.hex })),
];

const TYPE = [
  { role: "Display", cls: "mn-display", sample: "After dark, by invitation.", family: "Bodoni Moda", m: "46 / 48", d: "96 / 94", weight: "400", track: "-0.025em / -0.03em", kase: "Sentence", use: "Hero, one per page" },
  { role: "Headline", cls: "mn-headline", sample: "Three ways to spend a night", family: "Bodoni Moda", m: "34 / 37", d: "56 / 59", weight: "400", track: "-0.02em", kase: "Sentence", use: "Section titles" },
  { role: "Title", cls: "mn-title", sample: "A rooftop hour on the water", family: "Bodoni Moda", m: "24 / 30", d: "28 / 35", weight: "400", track: "-0.01em", kase: "Sentence", use: "Card and panel titles" },
  { role: "Body", cls: "mn-body", sample: "A table by the glass at sunset. By the end of dinner the skyline across the water has turned gold, and no one has hurried you.", family: "Jost", m: "16 / 27", d: "17 / 29", weight: "350", track: "0", kase: "Sentence", use: "Running text, 60ch max" },
  { role: "Lead", cls: "mn-lead", sample: "A private guide to Singapore after dark.", family: "Jost", m: "18 / 31", d: "20 / 34", weight: "300", track: "0", kase: "Sentence", use: "Intro paragraphs" },
  { role: "Label", cls: "mn-label", sample: "The Concierge · By appointment", family: "Jost", m: "11 / 14", d: "12 / 16", weight: "500", track: "0.20em / 0.22em", kase: "UPPERCASE", use: "Eyebrows, nav, buttons, meta" },
  { role: "Caption", cls: "mn-caption", sample: "Parkview Square · Dress: smart elegant", family: "Jost", m: "13 / 20", d: "13 / 20", weight: "400", track: "0.02em", kase: "Sentence", use: "Credits, hints, helper text" },
  { role: "Numeral", cls: "mn-numeral", sample: "57", family: "Bodoni Moda, lining", m: "64 / 64", d: "96 / 96", weight: "400", track: "-0.03em", kase: "n/a", use: "Stat moments: 57 floors up" },
] as const;

const SPACING = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160];

export default function Page() {
  return (
    <div className="overflow-x-clip bg-bg">
      <CrossLinks current="system" />

      <header className="relative isolate overflow-hidden border-b border-line">
        <div aria-hidden className="absolute inset-0 -z-10 text-(--brass)/[0.14] [mask-image:linear-gradient(to_left,black,transparent_70%)]">
          <FanPattern size={56} />
        </div>
        <div className="mx-auto max-w-[1440px] px-5 pt-16 pb-16 md:px-10 lg:pt-28 lg:pb-24">
          <p className="mn-label mn-rise text-ink-muted">Design system · Marina Noir</p>
          <h1 className="mn-display mn-rise mt-6 lg:text-[7rem]" style={{ ["--d" as string]: "100ms" }}>
            The house <span className="mn-italic">rules</span>
          </h1>
          <p className="mn-lead mn-rise mt-8 max-w-[52ch] text-ink-muted" style={{ ["--d" as string]: "220ms" }}>
            Tokens, type, components and states for The Concierge. Every component here is imported by the site; nothing is redrawn.
          </p>
        </div>
      </header>

      <nav aria-label="On this page" className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur-md">
        <ul className="mx-auto flex max-w-[1440px] gap-1 overflow-x-auto px-3 md:px-9">
          {SECTIONS.map(([id, label], i) => (
            <li key={id} className="shrink-0">
              <a href={`#${id}`} className="mn-label inline-flex min-h-12 items-center gap-3 px-3 text-ink-muted transition-colors duration-(--dur-1) hover:text-ink focus-visible:outline-2 focus-visible:outline-focus">
                <span className="text-ink-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* 1. COLOR */}
        <Section id="color" n="01" title="Color roles" note="Near-black does the work, reds carry the brand, and champagne is reserved for the one action that matters.">
          <div className="border-t border-line-strong">
            <div className="mn-label hidden grid-cols-[3rem_9rem_9rem_1fr_16rem_9rem] gap-x-6 border-b border-line py-3 text-ink-subtle lg:grid">
              <span />
              <span>Token</span>
              <span>Hex</span>
              <span>Role</span>
              <span>Contrast</span>
              <span>Verdict</span>
            </div>
            {PAIRS.map((p) => (
              <div key={p.token} className="grid grid-cols-[3rem_1fr] items-start gap-x-6 gap-y-1 border-b border-line py-4 lg:grid-cols-[3rem_9rem_9rem_1fr_16rem_9rem] lg:items-center">
                <span aria-hidden className="row-span-3 size-10 border border-line-strong lg:row-span-1" style={{ background: p.chip }} />
                <span>
                  <span className="mn-title block text-[1.25rem]! italic">{p.name}</span>
                  <code className="mn-caption text-ink-subtle">{p.token}</code>
                </span>
                <span className="mn-label text-ink-muted tabular-nums">{(SWATCHES.find((s) => s.token === p.token)?.hex ?? STATUS.find((s) => s.token === p.token)?.hex ?? p.chip).toUpperCase()}</span>
                <span className="mn-body text-ink-muted lg:text-[1rem]">{p.use}</span>
                <span className="mn-caption text-ink-muted tabular-nums">
                  {p.kind === "decor" ? `${ratio(p.fg, p.bg)} ${p.partner}` : `${ratio(p.fg, p.bg)} ${p.partner}`}
                </span>
                <span>
                  <Badge tone={verdict(p.fg, p.bg, p.kind) === "Fails" ? "danger" : p.kind === "decor" ? "neutral" : "success"}>{verdict(p.fg, p.bg, p.kind)}</Badge>
                </span>
              </div>
            ))}
          </div>
          <p className="mn-caption mt-4 max-w-[70ch] text-ink-subtle">
            Body text needs 4.5:1, large text and UI edges 3:1. Hairline, Bronze line and Lacquer are decorative and never carry meaning alone. Control edges use Brass edge (3.9:1), not Bronze line.
          </p>

          <h3 className="mn-title mt-20">Where the accent goes</h3>
          <p className="mn-body mt-3 max-w-[60ch] text-ink-muted">Champagne is the primary action and its direct echoes, and nothing else. Everything else that wants emphasis is ivory, oxblood or a thin rule.</p>
          <div className="mt-8 grid gap-px border border-line-strong bg-line-strong md:grid-cols-2">
            <div className="bg-bg p-8 lg:p-10">
              <p className="mn-label flex items-center gap-3 text-ink"><Check aria-hidden strokeWidth={1.25} className="size-4" />Do</p>
              <div className="mt-8 grid gap-8">
                <div className="flex flex-wrap items-center gap-6">
                  <Button variant="primary">Request reservation</Button>
                  <span className="mn-caption text-ink-muted">The primary action, once per view</span>
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <span className="mn-label inline-flex items-center gap-3">Your evening <CountBadge count={3} label="requests" /></span>
                  <span className="mn-caption text-ink-muted">The counter on the list the action fills</span>
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <Button variant="primary" size="lg">Send to concierge</Button>
                  <span className="mn-caption text-ink-muted">The primary button inside that list</span>
                </div>
              </div>
            </div>
            <div className="bg-surface p-8 lg:p-10">
              <p className="mn-label flex items-center gap-3 text-ink-muted"><X aria-hidden strokeWidth={1.25} className="size-4" />Don&rsquo;t, and use this instead</p>
              <ul className="mt-8 grid gap-6">
                {[
                  ["Gold headings or links", "Ivory type, with a thin ivory underline"],
                  ["Gold for the selected filter chip", null],
                  ["Gold icons and ornaments", "Linen icons; bronze or brass hairlines"],
                  ["Gold on a second button in the same view", "A secondary button with an ivory hairline"],
                ].map(([bad, good]) => (
                  <li key={bad as string} className="grid gap-3">
                    <span className="mn-body text-ink-subtle line-through decoration-(--lacquer) decoration-1">{bad}</span>
                    {good ? <span className="mn-caption text-ink-muted">{good}</span> : <span className="flex items-center gap-4"><FilterChip selected>Dine</FilterChip><span className="mn-caption text-ink-muted">Selected is oxblood with a check</span></span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* 2. TYPE */}
        <Section id="type" n="02" title="Typeface roles" note="Bodoni Moda for the voice, Jost for everything that has to be read. The uppercase tracked label is the signature.">
          <div className="border-t border-line-strong">
            {TYPE.map((t) => (
              <article key={t.role} className="grid gap-x-12 gap-y-6 border-b border-line py-10 lg:grid-cols-[1fr_22rem] lg:py-14">
                <div className="min-w-0">
                  <p className="mn-label mb-5 text-ink-subtle">{t.role}</p>
                  <p className={`${t.cls} ${t.role === "Display" ? "lg:text-[5rem]" : ""} ${t.role === "Body" ? "max-w-[56ch]" : t.role === "Label" || t.role === "Caption" || t.role === "Lead" ? "max-w-[60ch]" : "max-w-[24ch]"}`}>{t.sample}</p>
                </div>
                <dl className="mn-caption grid h-fit grid-cols-[6.5rem_1fr] gap-x-4 gap-y-2 self-end text-ink-muted">
                  {[
                    ["Family", t.family],
                    ["Mobile", `${t.m} px`],
                    ["Desktop", `${t.d} px`],
                    ["Weight", t.weight],
                    ["Tracking", t.track],
                    ["Case", t.kase],
                    ["Used for", t.use],
                  ].map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="text-ink-subtle">{k}</dt>
                      <dd className="text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
          <p className="mn-caption mt-4 max-w-[70ch] text-ink-subtle">
            Bodoni uses optical size 96 at display sizes and 48 at title size, with lining figures. Italic is for taglines and pull-quotes only. Prices and counts use Jost tabular figures. There is no monospace face.
          </p>
        </Section>

        {/* 3. SPACE AND SHAPE */}
        <Section id="space" n="03" title="Spacing and shape" note="Generous, on a 4px base. Square corners everywhere, one pill, and depth from surface steps rather than shadow.">
          <div className="grid gap-x-16 gap-y-20 lg:grid-cols-2">
            <Block title="Spacing scale" note="px · Tailwind step">
              <ul className="grid gap-3">
                {SPACING.map((s) => (
                  <li key={s} className="grid grid-cols-[4.5rem_1fr_4rem] items-center gap-4">
                    <span className="mn-label text-ink-muted tabular-nums">{s}px</span>
                    <span className="h-3 bg-ink-muted/60" style={{ width: Math.min(s * 2.4, 384) }} />
                    <span className="mn-caption text-ink-subtle tabular-nums">{s / 4}</span>
                  </li>
                ))}
              </ul>
              <p className="mn-caption mt-6 text-ink-subtle">Section padding is 80px on mobile and 128px on desktop. Text measure is 60ch.</p>
            </Block>

            <Block title="Radii" note="Square, with one exception">
              <div className="flex flex-wrap gap-8">
                {[
                  ["0", "Controls, cards, panels, images", "rounded-none"],
                  ["Pill", "Filter chips only", "rounded-pill"],
                ].map(([r, d, c]) => (
                  <div key={r} className="w-40">
                    <div className={`h-20 border border-ink-muted ${c}`} />
                    <p className="mn-label mt-3">{r}</p>
                    <p className="mn-caption mt-1 text-ink-subtle">{d}</p>
                  </div>
                ))}
              </div>
            </Block>

            <Block title="Border weights" note="Hairlines only">
              <div className="grid gap-6">
                {[
                  ["1px hairline", <div key="a" className="h-px w-full bg-line-strong" />],
                  ["Double rule: two 1px lines, 3px apart", <DoubleRule key="b" />],
                  ["2px lacquer: the active indicator", <div key="c" className="h-0.5 w-24 bg-(--lacquer)" />],
                  ["1px brass top: raised panels", <div key="d" className="h-12 border-t border-t-(--brass) bg-surface-2" />],
                ].map(([l, n]) => (
                  <div key={l as string} className="grid items-center gap-2 sm:grid-cols-[15rem_1fr] sm:gap-6">
                    <span className="mn-caption text-ink-muted">{l}</span>
                    {n}
                  </div>
                ))}
              </div>
            </Block>

            <Block title="Elevation" note="Surface steps, not shadows">
              <div className="grid grid-cols-3 gap-3">
                {[
                  ["0", "Onyx", "bg-bg border border-line"],
                  ["1", "Smoke", "bg-surface border border-line"],
                  ["2", "Velvet, brass top", "bg-surface-2 border border-line-strong border-t-(--brass) shadow-raised"],
                ].map(([l, n, c]) => (
                  <div key={l} className={`flex h-28 flex-col justify-end p-3 ${c}`}>
                    <span className="mn-label">{l}</span>
                    <span className="mn-caption text-ink-subtle">{n}</span>
                  </div>
                ))}
              </div>
              <p className="mn-caption mt-4 text-ink-subtle">Cards sit at 1, drawers and toasts at 2. The one shadow (<code>shadow-raised</code>) barely reads on black and exists to separate a drawer from the scrim.</p>
            </Block>

            <Block title="Layout grid" note="12 columns · 16px gutter · 1440 max" className="lg:col-span-2">
              <div className="grid grid-cols-12 gap-2 sm:gap-4" aria-hidden>
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="grid h-24 place-items-end bg-ink/[0.05] pb-2 sm:h-32">
                    <span className="mn-caption text-ink-subtle tabular-nums">{i + 1}</span>
                  </div>
                ))}
              </div>
              <p className="mn-caption mt-4 max-w-[75ch] text-ink-subtle">
                Margins are 20px on mobile and 40px from 768px up. The editorial grid is asymmetric: a feature card takes 7 columns and its neighbour 5, then three cards take 4 each, with images bleeding off one edge.
              </p>
              <dl className="mt-8 grid gap-4 sm:grid-cols-4">
                {[
                  ["390", "Mobile design target"],
                  ["768 (md)", "Two columns, drawer becomes a side panel"],
                  ["1024 (lg)", "Twelve-column grid, desktop type scale"],
                  ["1440", "Desktop design target and max width"],
                ].map(([k, v]) => (
                  <div key={k} className="border-t border-line-strong pt-3">
                    <dt className="mn-title text-[1.5rem]! tabular-nums">{k}</dt>
                    <dd className="mn-caption mt-1 text-ink-muted">{v}</dd>
                  </div>
                ))}
              </dl>
            </Block>

            <Block title="Motion" note="Slow and smooth. Nothing bounces." className="lg:col-span-2">
              <div className="grid gap-12 md:grid-cols-[1fr_16rem]">
                <ul className="grid gap-5">
                  {[
                    ["400ms", "Colour and border changes on controls", "duration-[400ms]"],
                    ["560ms", "Underline, rule and arrow movement", "duration-[560ms]"],
                    ["700ms", "Drawers, photos (a 1.03 scale), reveals", "duration-[700ms]"],
                  ].map(([d, u, c]) => (
                    <li key={d} className="group grid grid-cols-[4rem_1fr] items-center gap-x-5 gap-y-2 sm:grid-cols-[4rem_14rem_1fr]">
                      <span className="mn-label tabular-nums">{d}</span>
                      <span className="mn-caption text-ink-muted">{u}</span>
                      <span className="relative col-span-2 h-px bg-line-strong sm:col-span-1">
                        <span className={`absolute top-1/2 left-0 size-2.5 -translate-y-1/2 rotate-45 bg-ink transition-[left,transform] ease-(--ease) group-hover:left-[calc(100%-10px)] ${c}`} />
                      </span>
                    </li>
                  ))}
                  <li className="mn-caption text-ink-subtle">Hover a row to play it. Reveals fade and rise 12px. All motion is disabled under prefers-reduced-motion.</li>
                </ul>
                <figure>
                  <svg viewBox="-8 -8 116 116" className="w-full max-w-60 border border-line bg-surface" role="img" aria-label="Easing curve cubic-bezier 0.2, 0.7, 0.1, 1">
                    <path d="M0 100 H100 M0 0 V100" stroke="currentColor" className="text-line-strong" strokeWidth="0.5" fill="none" />
                    <path d="M0 100 C20 30 10 0 100 0" stroke="currentColor" className="text-ink" strokeWidth="1.25" fill="none" />
                  </svg>
                  <figcaption className="mn-caption mt-3 text-ink-muted">cubic-bezier(0.2, 0.7, 0.1, 1)<br />A long, soft landing.</figcaption>
                </figure>
              </div>
            </Block>
          </div>
        </Section>

        {/* 4. COMPONENTS */}
        <Section id="components" n="04" title="Components" note="The same files the site imports. Interact with them here.">
          <Components />
        </Section>

        {/* 5. STATES */}
        <Section id="states" n="05" title="Control states" note="Forced states use data-force beside the real pseudo-classes, so a forced hover is the real hover.">
          <Matrix />
          <CardStates />
          <p className="mn-caption mt-4 text-ink-subtle">En dashes mark states that don&rsquo;t apply: a text input has no pressed state, a button has no error.</p>
        </Section>

        {/* 6. UI STATES */}
        <Section id="ui-states" n="06" title="UI states" note="As they appear on the site.">
          <UiStates />
        </Section>
      </main>

      <footer className="mt-20 border-t border-line-strong">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="mn-title italic">Marina Noir</p>
          <div className="flex flex-wrap gap-x-8">
            <Link href="/marina-noir/moodboard/" className="mn-label inline-flex min-h-11 items-center text-ink-muted hover:text-ink">Mood board</Link>
            <Link href="/marina-noir/" className="mn-label inline-flex min-h-11 items-center text-ink-muted hover:text-ink">Enter The Concierge</Link>
            <Link href="/credits/" className="mn-label inline-flex min-h-11 items-center text-ink-subtle hover:text-ink">Photo credits</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, n, title, note, children }: { id: string; n: string; title: string; note: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-14 border-b border-line py-20 last:border-b-0 lg:py-32">
      <div className="mb-14 grid gap-4 lg:grid-cols-12 lg:mb-20">
        <div className="lg:col-span-6">
          <p className="mn-label text-ink-subtle tabular-nums">{n}</p>
          <h2 id={`${id}-h`} className="mn-headline mt-3">{title}</h2>
        </div>
        <p className="mn-lead max-w-[46ch] self-end text-ink-muted lg:col-span-5 lg:col-start-8">{note}</p>
      </div>
      {children}
    </section>
  );
}

function Block({ title, note, children, className }: { title: string; note?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-4 border-b border-line-strong pb-3">
        <h3 className="mn-label text-ink">{title}</h3>
        {note && <p className="mn-caption text-ink-subtle">{note}</p>}
      </div>
      <div className="pt-6">{children}</div>
    </div>
  );
}
