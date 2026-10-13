import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { SWATCHES } from "@/data/marina-noir/tokens";
import { CrossLinks } from "@/components/marina-noir/NavBar";
import { DoubleRule, FanPattern, Lattice, Sunburst } from "@/components/marina-noir/Ornament";
import { Credit, Photo } from "@/components/marina-noir/Photo";

export const metadata: Metadata = { title: "Marina Noir: mood board" };

const p = (n: string) => `/images/marina-noir/${n}.jpg`;

type Tile = { file: string; alt: string; lg: string; m: string; pos?: string };

/* A 12-column board on 88px rows. Sizes vary on purpose: one wide, a few tall, a few small. */
const TILES: Tile[] = [
  { file: "fullerton-aerial", alt: "The Fullerton Hotel floodlit in gold beside the dark river", lg: "lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-5", m: "col-span-2 aspect-[16/10]", pos: "30% 55%" },
  { file: "singapore-sling", alt: "A Singapore Sling beside a sack of peanuts on a marble table", lg: "lg:col-start-8 lg:col-span-3 lg:row-start-1 lg:row-span-5", m: "col-span-1 aspect-[3/4]", pos: "60% 55%" },
  { file: "champagne-pour", alt: "Champagne poured into two flutes in lamplight", lg: "lg:col-start-11 lg:col-span-2 lg:row-start-3 lg:row-span-3", m: "col-span-1 aspect-[3/4]", pos: "50% 35%" },
  { file: "raffles-night", alt: "Raffles Hotel lit against a deep blue sky", lg: "lg:col-start-1 lg:col-span-4 lg:row-start-6 lg:row-span-6", m: "col-span-2 aspect-[4/3]", pos: "50% 55%" },
  { file: "artscience-night", alt: "The lotus-shaped ArtScience Museum reflected in the bay", lg: "lg:col-start-5 lg:col-span-3 lg:row-start-6 lg:row-span-6", m: "col-span-1 aspect-[3/4]", pos: "45% 60%" },
  { file: "skyline-water", alt: "Marina Bay skyline at night, towers reflected in dark water", lg: "lg:col-start-8 lg:col-span-5 lg:row-start-9 lg:row-span-3", m: "col-span-2 aspect-[16/9]", pos: "50% 65%" },
  { file: "gardens-night", alt: "Aerial view of Gardens by the Bay at night", lg: "lg:col-start-1 lg:col-span-5 lg:row-start-12 lg:row-span-5", m: "col-span-2 aspect-[3/2]", pos: "40% 55%" },
  { file: "mbs-dusk", alt: "Marina Bay Sands at dusk, reflected in still water", lg: "lg:col-start-6 lg:col-span-7 lg:row-start-12 lg:row-span-5", m: "col-span-2 aspect-[3/2]", pos: "50% 50%" },
  { file: "gallery-atrium", alt: "The National Gallery atrium in warm light", lg: "lg:col-start-1 lg:col-span-3 lg:row-start-17 lg:row-span-4", m: "col-span-1 aspect-[3/4]", pos: "50% 45%" },
  { file: "bay-aerial-night", alt: "Marina Bay Sands and the lit city from above", lg: "lg:col-start-4 lg:col-span-6 lg:row-start-17 lg:row-span-4", m: "col-span-2 aspect-[16/10]", pos: "55% 45%" },
  { file: "fullerton-facade", alt: "The columned facade of The Fullerton Hotel at night", lg: "lg:col-start-10 lg:col-span-3 lg:row-start-17 lg:row-span-4", m: "col-span-1 aspect-[3/4]", pos: "55% 40%" },
  { file: "skyline-bridge", alt: "The skyline over the Esplanade Bridge at night", lg: "lg:hidden", m: "col-span-2 aspect-[16/10]", pos: "50% 65%" },
];

const KEYWORDS = ["Hushed", "Lacquered", "Nocturnal", "Tailored", "Gilded but quiet", "Cinematic", "By appointment"];

const THIS_NOT_THAT: [string, string][] = [
  ["One gold rim, once per view", "Gold foil on everything"],
  ["Hairline rules and double rules", "Heavy borders and drop shadows"],
  ["Warm tungsten against deep blue", "Neon, glow, gradient tech"],
  ["Square corners, one pill chip", "Rounded cards and bubbly buttons"],
  ["Space that feels expensive", "Crowded dashboards"],
  ["Slow fades, 400 to 700ms", "Bounce, shake, confetti"],
];

const PROPORTIONS = [
  { name: "Onyx", color: "#0B0A0A", w: 60 },
  { name: "Smoke and Velvet", color: "#1C1918", w: 20 },
  { name: "Ivory and Linen", color: "#A89F94", w: 12 },
  { name: "Oxblood", color: "#6E1423", w: 6.5 },
  { name: "Champagne", color: "#D4B67A", w: 1.5 },
];

export default function Page() {
  return (
    <div className="overflow-x-clip bg-bg">
      <CrossLinks current="moodboard" />

      <main>
        {/* Opening */}
        <section className="relative isolate overflow-hidden border-b border-line">
          <div aria-hidden className="absolute inset-0 -z-10 text-(--brass)/[0.14] [mask-image:radial-gradient(ellipse_at_80%_100%,black,transparent_65%)]">
            <FanPattern size={56} />
          </div>
          <Sunburst className="absolute -right-24 bottom-0 -z-10 hidden w-[760px] text-(--brass)/40 lg:block" rays={48} />
          <div className="mx-auto max-w-[1440px] px-5 pt-20 pb-24 md:px-10 lg:pt-36 lg:pb-40">
            <p className="mn-label mn-rise text-ink-muted">Mood board · Crazy Rich Singapore</p>
            <h1 className="mn-display mn-rise mt-8 max-w-[11ch] lg:text-[8.5rem]" style={{ ["--d" as string]: "120ms" }}>
              Marina <span className="mn-italic">Noir</span>
            </h1>
            <p className="mn-lead mn-rise mt-8 max-w-[44ch] text-ink-muted" style={{ ["--d" as string]: "260ms" }}>
              A private members&rsquo; club at midnight. Marina Bay&rsquo;s lights on black water, lacquered oxblood walls, brass, white tablecloths, and a single gold rim on a glass.
            </p>
            <dl className="mn-rise mt-14 grid max-w-3xl gap-x-10 gap-y-6 border-t border-line-strong pt-6 sm:grid-cols-3" style={{ ["--d" as string]: "400ms" }}>
              {[
                ["The lens", "Crazy Rich Singapore"],
                ["The site", "The Concierge"],
                ["The line", "After dark, by invitation."],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="mn-label text-ink-subtle">{k}</dt>
                  <dd className="mn-title mt-2 text-[1.25rem]!">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Collage */}
        <section aria-labelledby="board" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 lg:py-32">
          <SectionHead id="board" n="01" title="The board" note="Warm tungsten against deep blue. Water, stone, brass. Nothing with a crowd in it." />
          <div className="mt-12 grid grid-cols-2 gap-3 lg:auto-rows-[88px] lg:grid-cols-12 lg:gap-4">
            {TILES.map((t) => (
              <figure key={t.file} className={`mn-zoom group relative overflow-hidden bg-surface-2 lg:aspect-auto ${t.m} ${t.lg}`}>
                <Photo src={p(t.file)} alt={t.alt} sizes="(min-width: 1024px) 60vw, 100vw" position={t.pos} />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg/85 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 md:p-4">
                  <Credit file={p(t.file)} tone="text-ink/75" />
                </figcaption>
              </figure>
            ))}
            {/* Quote tiles sit in the gaps the photos leave */}
            <div className="relative col-span-2 flex flex-col justify-between overflow-hidden bg-brand p-6 text-on-brand lg:col-start-11 lg:col-span-2 lg:row-start-1 lg:row-span-2">
              <FanPattern size={32} className="text-on-brand/15" />
              <p className="mn-label relative">Rule one</p>
              <p className="mn-title relative mt-6 text-[1.25rem]! italic lg:text-[1.25rem]!">Gold appears once per view.</p>
            </div>
            <div className="relative col-span-2 flex flex-col justify-center overflow-hidden border border-line-strong bg-surface p-8 lg:col-start-8 lg:col-span-5 lg:row-start-6 lg:row-span-3 lg:p-10">
              <Lattice className="text-(--brass)/[0.18]" />
              <p className="relative font-display text-[1.75rem] leading-[1.2] italic lg:text-[2.25rem]" style={{ fontVariationSettings: '"opsz" 72' }}>
                &ldquo;Luxury here means space, slowness, and precision.&rdquo;
              </p>
              <p className="mn-label relative mt-6 text-ink-muted">The brief</p>
            </div>
          </div>
        </section>

        {/* Palette */}
        <section aria-labelledby="palette" className="border-y border-line bg-surface">
          <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 lg:py-32">
            <SectionHead id="palette" n="02" title="The palette" note="Near-black does the work. Reds carry the brand. Champagne is held back for the one action that matters." />
            <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
              {SWATCHES.map((s) => (
                <li key={s.token}>
                  <div
                    className="relative flex h-44 items-end border border-line-strong p-3 lg:h-56"
                    style={{ background: s.hex }}
                  >
                    <span className="mn-label text-[0.625rem]" style={{ color: ["#0B0A0A", "#141212", "#1C1918", "#2E2926", "#4A403A", "#6E1423", "#7A6B60", "#A3172B"].includes(s.hex.toUpperCase()) ? "#F3EDE4" : "#0B0A0A" }}>
                      {s.hex}
                    </span>
                  </div>
                  <p className="mn-title mt-4 text-[1.5rem]! italic">{s.name}</p>
                  <p className="mn-caption mt-1 text-ink-muted">{s.evocation}</p>
                  <p className="mn-label mt-3 text-[0.625rem] text-ink-subtle">{s.role}</p>
                </li>
              ))}
            </ul>

            <div className="mt-20">
              <p className="mn-label text-ink-muted">Proportion on a typical screen</p>
              <div className="mt-4 flex h-14 border border-line-strong" role="img" aria-label="Onyx 60 percent, Smoke and Velvet 20, Ivory and Linen 12, Oxblood 6.5, Champagne 1.5">
                {PROPORTIONS.map((x) => (
                  <div key={x.name} style={{ width: `${x.w}%`, background: x.color }} title={x.name} />
                ))}
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-1">
                {PROPORTIONS.map((x) => (
                  <li key={x.name} className="mn-caption text-ink-muted">
                    {x.name} <span className="text-ink-subtle">{x.w}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Type */}
        <section aria-labelledby="type" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 lg:py-32">
          <SectionHead id="type" n="03" title="The type" note="A high-contrast Didone for the voice. A light geometric sans for everything that has to be read." />
          <div className="mt-12 grid gap-px bg-line lg:grid-cols-12">
            <div className="relative overflow-hidden bg-bg p-8 lg:col-span-7 lg:p-12">
              <p className="mn-label text-ink-muted">Display · Bodoni Moda</p>
              <p className="font-display mt-6 text-[9rem] leading-[0.85] tracking-[-0.04em] lg:text-[16rem]" style={{ fontVariationSettings: '"opsz" 96' }} aria-hidden>
                A<span className="italic">a</span>
              </p>
              <p className="mn-display mt-10 lg:text-[4.5rem]">After dark, <span className="mn-italic">by invitation.</span></p>
              <p className="mn-caption mt-8 text-ink-subtle">Weight 400 to 500, optical size 96 at large sizes. Italic for taglines and pull-quotes.</p>
            </div>
            <div className="flex flex-col gap-px lg:col-span-5">
              <div className="flex-1 bg-surface p-8 lg:p-12">
                <p className="mn-label text-ink-muted">Label · Jost 500</p>
                <p className="mn-label mt-6 text-[0.875rem] tracking-[0.22em] lg:text-[1rem]">The Concierge · By appointment</p>
                <p className="mn-label mt-4 text-[0.75rem] text-ink-muted">Rooftop &nbsp;·&nbsp; Chef&rsquo;s counter &nbsp;·&nbsp; Suite</p>
                <p className="mn-caption mt-8 text-ink-subtle">Uppercase, 11 to 12px, tracking 0.18 to 0.24em. Eyebrows, nav, buttons, meta.</p>
              </div>
              <div className="flex-1 bg-bg p-8 lg:p-12">
                <p className="mn-label text-ink-muted">Body · Jost 300 to 400</p>
                <p className="mn-lead mt-6 max-w-[40ch]">
                  A table by the glass at sunset. By the end of dinner the skyline across the water has turned gold, and no one has hurried you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Texture */}
        <section aria-labelledby="texture" className="border-y border-line bg-surface">
          <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 lg:py-32">
            <SectionHead id="texture" n="04" title="Texture and pattern" note="Drawn in code, in hairline bronze, at low opacity. Always behind content, never in front of it." />
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                { label: "Fan", note: "Scalloped Deco fans. Drawer headers, bands.", node: <FanPattern size={48} className="text-(--brass)/45" /> },
                { label: "Sunburst", note: "Rays and arcs. The hero ornament.", node: <div className="absolute inset-x-6 bottom-0 text-(--brass)/70"><Sunburst rays={30} className="w-full" /></div> },
                { label: "Lattice", note: "A Peranakan-Deco grille.", node: <Lattice size={40} className="text-(--brass)/45" /> },
              ].map((t) => (
                <figure key={t.label} className="relative">
                  <div className="relative aspect-[4/5] overflow-hidden border border-line-strong bg-bg">{t.node}</div>
                  <figcaption className="mt-4 flex items-baseline justify-between gap-6">
                    <span className="mn-title italic">{t.label}</span>
                    <span className="mn-caption text-ink-muted">{t.note}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-12 grid items-center gap-6 md:grid-cols-[1fr_2fr]">
              <p className="mn-label text-ink-muted">Dividers</p>
              <div>
                <div className="mn-double-rule" />
                <p className="mn-caption mt-3 text-ink-subtle">Two hairlines, three pixels apart. Used between sections and above drawer footers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Keywords */}
        <section aria-labelledby="words" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 lg:py-32">
          <SectionHead id="words" n="05" title="Keywords" />
          <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-2">
            {KEYWORDS.map((k, i) => (
              <li key={k} className="font-display text-[2.5rem] leading-[1.25] tracking-[-0.02em] italic lg:text-[5rem]" style={{ fontVariationSettings: '"opsz" 96', opacity: 1 - i * 0.06 }}>
                {k}
                {i < KEYWORDS.length - 1 && <span aria-hidden className="ml-10 text-(--lacquer)">/</span>}
              </li>
            ))}
          </ul>
        </section>

        {/* References + direction */}
        <section aria-labelledby="refs" className="border-y border-line">
          <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-20 md:px-10 lg:grid-cols-2 lg:py-32">
            <div>
              <SectionHead id="refs" n="06" title="References" />
              <ul className="mt-10 divide-y divide-line border-y border-line">
                {[
                  ["Crazy Rich Asians (2018)", "The Marina Bay Sands rooftop, the Gardens by the Bay night scenes, the opulence of Tyersall Park."],
                  ["Raffles Hotel", "White colonnades, teak, the Long Bar. Colonial grandeur, lacquered."],
                  ["The Fullerton", "A floodlit neoclassical landmark on the river."],
                  ["Parkview Square", "Gotham-style Art Deco in brass and bronze."],
                  ["A private members’ club", "Low light, dark wood, a single good lamp."],
                ].map(([t, d]) => (
                  <li key={t} className="grid gap-1 py-5 md:grid-cols-[14rem_1fr] md:gap-8">
                    <span className="mn-title text-[1.25rem]! italic">{t}</span>
                    <span className="mn-body text-ink-muted">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHead id="photo" n="07" title="Photography direction" />
              <ol className="mt-10 grid gap-8">
                {[
                  ["Low-key and warm", "Deep shadows, tungsten highlights. If the sky is blue, it is the dark blue of just after sunset."],
                  ["Water and reflection", "The bay is the recurring mirror. Let light pool and streak on it."],
                  ["Architecture, not crowds", "Facades, colonnades, arcs of steel. People appear small, or not at all."],
                  ["Detail as luxury", "A poured glass, a marble table, a brass lamp. One subject, shallow focus."],
                  ["Graded into the palette", "Slightly desaturated, warm, never HDR-glossy."],
                ].map(([t, d], i) => (
                  <li key={t} className="grid grid-cols-[3rem_1fr] gap-4">
                    <span className="font-display text-[1.5rem] text-ink-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="mn-label text-ink">{t}</p>
                      <p className="mn-body mt-2 text-ink-muted">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* This, not that */}
        <section aria-labelledby="tnt" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 lg:py-32">
          <SectionHead id="tnt" n="08" title="This, not that" />
          <div className="mt-12 grid gap-px border border-line-strong bg-line-strong md:grid-cols-2">
            <div className="bg-bg p-8 lg:p-12">
              <p className="mn-label flex items-center gap-3 text-ink"><Check aria-hidden strokeWidth={1.25} className="size-4" /> This</p>
              <ul className="mt-8 grid gap-5">
                {THIS_NOT_THAT.map(([a]) => (
                  <li key={a} className="mn-title border-b border-line pb-5 text-[1.25rem]! last:border-b-0">{a}</li>
                ))}
              </ul>
            </div>
            <div className="bg-surface p-8 lg:p-12">
              <p className="mn-label flex items-center gap-3 text-ink-muted"><X aria-hidden strokeWidth={1.25} className="size-4" /> Not that</p>
              <ul className="mt-8 grid gap-5">
                {THIS_NOT_THAT.map(([, b]) => (
                  <li key={b} className="mn-title border-b border-line pb-5 text-[1.25rem]! text-ink-subtle line-through decoration-(--lacquer) decoration-1 last:border-b-0">{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line-strong">
        <DoubleRule className="border-x-0" />
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="mn-title italic">Marina Noir</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link href="/marina-noir/system/" className="mn-label inline-flex min-h-11 items-center text-ink-muted hover:text-ink">See the design system</Link>
            <Link href="/marina-noir/" className="mn-label inline-flex min-h-11 items-center text-ink-muted hover:text-ink">Enter The Concierge</Link>
            <Link href="/credits/" className="mn-label inline-flex min-h-11 items-center text-ink-subtle hover:text-ink">Photo credits</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHead({ id, n, title, note }: { id: string; n: string; title: string; note?: string }) {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="mn-label text-ink-subtle">
          <span className="tabular-nums">{n}</span>
          <span aria-hidden className="mx-3 inline-block h-px w-8 bg-line-strong align-middle" />
        </p>
        <h2 id={id} className="mn-headline mt-3">{title}</h2>
      </div>
      {note && <p className="mn-lead max-w-[48ch] self-end text-ink-muted lg:col-span-6 lg:col-start-7">{note}</p>}
    </div>
  );
}
