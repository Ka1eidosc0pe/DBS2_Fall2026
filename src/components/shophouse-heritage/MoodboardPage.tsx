import { Check, X } from "lucide-react";
import { SiteNav } from "./Nav";
import { HeritageFooter } from "./Footer";
import { SectionHeading, Rule } from "./Section";
import { ArchFrame } from "./Arch";
import { BatikPattern, GrillePattern, TileBand, TileBullet, TileMotif, TilePattern } from "./patterns";
import { cx } from "./cx";

const P = (n: string) => `/images/shophouse-heritage/${n}.jpg`;

const LINKS = [
  { href: "#board", label: "Board" },
  { href: "#palette", label: "Palette" },
  { href: "#pattern", label: "Pattern" },
  { href: "#type", label: "Type" },
  { href: "#direction", label: "Direction" },
];

type Shot = { src: string; alt: string; span: string; ratio: string; arch?: boolean; pos?: string; reveal?: boolean };

function Shot({ s, sizes }: { s: Shot; sizes: string }) {
  return (
    <ArchFrame
      src={s.src}
      alt={s.alt}
      sizes={sizes}
      ratio={s.ratio}
      arch={s.arch}
      position={s.pos}
      reveal={s.reveal}
      stretch
      className={cx("h-full", s.span)}
    />
  );
}

const BOARD_A: Shot[] = [
  { src: P("emerald-hill"), alt: "Terrace houses on Emerald Hill in periwinkle blue and dark timber, under a blue sky.", span: "col-span-2 mx-auto w-3/5 md:col-span-3 md:w-full", ratio: "3 / 4", arch: true, pos: "30% 50%", reveal: true },
  { src: P("koon-seng"), alt: "A row of pastel shophouses on Koon Seng Road in pink, sage, grey, terracotta and cyan.", span: "col-span-2 md:col-span-6", ratio: "3 / 2", pos: "50% 40%" },
  { src: P("gopuram"), alt: "The tiered gopuram of Sri Mariamman Temple, covered in painted deities.", span: "col-span-1 md:col-span-3", ratio: "3 / 4", arch: true, pos: "50% 25%", reveal: true },
  { src: P("five-foot-way"), alt: "A cobalt-blue five-foot way with a rounded arch and green tiled floor.", span: "col-span-1 md:col-span-3", ratio: "3 / 4", pos: "50% 40%" },
  { src: P("baba-house"), alt: "A periwinkle Peranakan townhouse with arched shutters, a ceramic frieze and green roof-tile eaves.", span: "col-span-2 md:col-span-6", ratio: "3 / 2", pos: "50% 25%" },
  { src: P("thian-hock-keng"), alt: "Patterned floor tiles in blue, white and terracotta in front of a gilded altar.", span: "col-span-2 mx-auto w-3/5 md:col-span-3 md:w-full", ratio: "3 / 4", pos: "50% 82%" },
];

const BOARD_B: Shot[] = [
  { src: P("armenian-church"), alt: "The white Armenian Church with a deep columned portico.", span: "col-span-2 md:col-span-5", ratio: "4 / 3", pos: "50% 60%" },
  { src: P("sultan-bussorah"), alt: "The golden dome of the Sultan Mosque above its cream facade.", span: "col-span-1 md:col-span-3", ratio: "3 / 4", arch: true, pos: "50% 22%", reveal: true },
  { src: P("tan-teng-niah"), alt: "The upper floor of the House of Tan Teng Niah, with arched shutters in every colour.", span: "col-span-1 md:col-span-4", ratio: "4 / 5", pos: "50% 20%" },
  { src: P("baba-house-2"), alt: "Sun-faded shutters and painted signboards above a Peranakan five-foot way.", span: "col-span-1 md:col-span-4", ratio: "4 / 3", pos: "50% 18%" },
  { src: P("sri-mariamman"), alt: "A close view of painted sculptures on the Sri Mariamman gopuram.", span: "col-span-1 md:col-span-3", ratio: "3 / 4", arch: true, pos: "50% 50%" },
  { src: P("joo-chiat"), alt: "A wide row of Joo Chiat shophouses in soft pastels.", span: "col-span-2 md:col-span-5", ratio: "5 / 3", pos: "40% 50%" },
];

const PALETTE = [
  { name: "Celadon", hex: "#E3EDE6", note: "pale jade shophouse fronts, Straits ware", dark: false },
  { name: "Porcelain", hex: "#F7FAF7", note: "a kamcheng's white glaze", dark: false },
  { name: "Glaze", hex: "#D5E3DA", note: "pooled celadon, sun-faded render", dark: false },
  { name: "Indigo ink", hex: "#1F2A33", note: "letterpress black", dark: true },
  { name: "Slate", hex: "#55616b", note: "monsoon cloud", dark: true },
  { name: "Jade", hex: "#2E6E5E", note: "glazed roof ridges", dark: true },
  { name: "Peranakan Teal", hex: "#3A9CA6", note: "the tile's turquoise", dark: false },
  { name: "Turmeric", hex: "#D9A23B", note: "kunyit, rubbed on thumbs", dark: false },
  { name: "Batik Indigo", hex: "#2B3A67", note: "dyed cloth, three dips", dark: true },
  { name: "Mangosteen", hex: "#7B3F68", note: "a Joo Chiat door", dark: true },
  { name: "Pandan", hex: "#66742C", note: "leaf, crushed", dark: true },
  { name: "Roof terracotta", hex: "#B0603A", note: "baked clay, rain-washed", dark: true },
  { name: "Nyonya Coral", hex: "#E8837A", note: "the one action", dark: false, accent: true },
  { name: "Madder", hex: "#A8324A", note: "red dye, deep", dark: true },
];

const KEYWORDS = ["ornamented", "crafted", "tiled", "sun-faded", "storied", "symmetrical", "curated", "five-foot-way shade", "louvred", "glazed", "hand-lettered"];

const REFS = [
  ["Peranakan tiles", "Glazed ceramic floor and wall tiles, often imported from Europe and Japan and laid in pink, jade and blue."],
  ["The NUS Baba House", "A restored townhouse on Neil Road: carved timber, a ceramic frieze and the colour of the facade."],
  ["Joo Chiat and Koon Seng Road", "Rows of Peranakan terrace houses, each painted in a different pastel."],
  ["Nyonya kamcheng", "Lidded porcelain jars in pink and green, with peony and phoenix."],
  ["Batik kawung", "Four overlapping ellipses around a seed, a classic repeating cloth motif."],
  ["Museum labels and letterpress", "Small caps, wide tracking, generous margins. Information that feels set by hand."],
];

const DIRECTION = [
  "Daylight, early or soft. The wall should glow, never glare.",
  "Frontal or symmetric, with clean verticals. Shoot straight on, not up.",
  "Crop to ornament: the tile, the shutter, the roof ridge. Detail earns its keep.",
  "Colour left true. No HDR, no heavy grading, no teal-and-orange.",
  "Few people. A single figure for scale at most.",
  "Frame in arches where it helps: the window is the proportion.",
];

const THIS = ["Pastel facades with tile and carved timber", "Fraunces with soft, wonky character", "One tile pattern, used as a signature", "Coral for one action only", "Calm celadon around the ornament"];
const NOT = ["Sepia 'old-timey' filters", "Red-and-gold lanterns and dragons", "Dusty, brown, museum-dim UI", "Pattern behind body text", "Theme-park oriental"];

export function MoodboardPage() {
  return (
    <div className="min-h-dvh bg-bg">
      <SiteNav current="moodboard" links={LINKS} />
      <main>
        <section className="relative overflow-hidden px-5 pb-14 pt-14 text-center md:px-10 md:pb-24 md:pt-24">
          <div className="mx-auto max-w-4xl">
            <p className="sh-label text-brand">The Heritage Trail · Mood board</p>
            <h1 className="sh-display mt-5 text-[2.75rem] leading-[1.02] text-ink md:text-[5.5rem]">
              Ornate, but in order
            </h1>
            <p className="sh-year mx-auto mt-6 max-w-xl text-xl leading-snug text-ink-muted md:text-2xl">
              Morning light on a row of Joo Chiat shophouses, and the cool shade of the five-foot way.
            </p>
            <Rule className="mx-auto mt-8" />
          </div>
        </section>
        <TileBand height={56} />

        <section id="board" aria-label="Photographs" className="scroll-mt-16 px-5 py-14 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-[84rem] grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-12 md:gap-x-6 md:gap-y-10">
            {BOARD_A.map((s) => (
              <Shot key={s.src} s={s} sizes="(min-width: 768px) 45vw, 50vw" />
            ))}
            <div className="col-span-2 flex items-center justify-center gap-6 rounded-card bg-(--jade-deep) p-6 text-center text-on-brand md:col-span-12 md:p-10">
              <TileMotif size={72} className="hidden shrink-0 sm:block" />
              <p className="sh-display max-w-3xl text-2xl leading-tight md:text-4xl">
                Walk the five-foot way.
              </p>
              <TileMotif size={72} className="hidden shrink-0 sm:block" />
            </div>
            {BOARD_B.map((s) => (
              <Shot key={s.src} s={s} sizes="(min-width: 768px) 45vw, 50vw" />
            ))}
          </div>
        </section>

        <section id="palette" className="scroll-mt-16 bg-surface-2 px-5 py-16 md:px-10 md:py-28">
          <div className="mx-auto max-w-[84rem]">
            <SectionHeading eyebrow="Palette" title="Colours with a source">
              Every colour is borrowed from a wall, a tile or a dye pot. Coral is kept for a single action.
            </SectionHeading>
            <ul className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4 md:gap-4 lg:grid-cols-7">
              {PALETTE.map((c) => (
                <li key={c.name} className="overflow-hidden rounded-card border border-ink/15 bg-surface">
                  <div className="h-28 md:h-36" style={{ background: c.hex }} />
                  <div className="p-3.5">
                    <p className="sh-title text-[1.0625rem] leading-tight text-ink">{c.name}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">{c.hex} · {c.note}</p>
                    {c.accent && <p className="sh-label mt-2 text-ink">Primary action only</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="pattern" className="scroll-mt-16 px-5 py-16 md:px-10 md:py-28">
          <div className="mx-auto max-w-[84rem]">
            <SectionHeading eyebrow="Pattern, drawn in code" title="One tile, repeated with care">
              A four-fold floral on pale teal: rose petals, teal and jade buds, indigo corner flowers that complete themselves where four tiles meet.
            </SectionHeading>
            <div className="mt-12 grid items-center gap-8 md:mt-16 lg:grid-cols-[22rem_1fr] lg:gap-14">
              <div className="mx-auto w-full max-w-[22rem]">
                <TileMotif size={352} title="The Peranakan tile" className="h-auto w-full rounded-[4px] shadow-raised" />
                <p className="mt-3 text-center text-sm text-ink-muted">One repeat, 120 units square, four-fold symmetric.</p>
              </div>
              <div className="space-y-6">
                <div className="h-64 overflow-hidden rounded-card border border-line md:h-80"><TilePattern tile={104} /></div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <figure>
                    <div className="h-36 overflow-hidden rounded-card border border-line bg-surface text-brand"><GrillePattern tile={44} /></div>
                    <figcaption className="mt-2 text-sm text-ink-muted">Ventilation grille: a lattice of circles and crossbars, in one line colour.</figcaption>
                  </figure>
                  <figure>
                    <div className="h-36 overflow-hidden rounded-card border border-line bg-surface text-(--indigo)"><BatikPattern tile={46} /></div>
                    <figcaption className="mt-2 text-sm text-ink-muted">Batik kawung: four ellipses around a seed.</figcaption>
                  </figure>
                </div>
              </div>
            </div>
            <div className="mt-12"><TileBand height={44} /></div>
          </div>
        </section>

        <section id="type" className="scroll-mt-16 bg-surface px-5 py-16 md:px-10 md:py-28">
          <div className="mx-auto max-w-[84rem]">
            <SectionHeading eyebrow="Type" title="A voice and a label">
              Fraunces for character, Karla for work, small caps for the museum label.
            </SectionHeading>
            <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
              <div>
                <p className="sh-label text-brand">Display · Fraunces, soft and wonky</p>
                <p className="sh-display mt-3 text-[3.25rem] leading-[0.98] text-ink md:text-[6.5rem]">Peranakan</p>
                <p className="sh-display mt-1 text-[2.25rem] leading-none text-ink md:text-[3.5rem]">Heritage Trail</p>
                <p className="sh-year mt-6 text-5xl leading-none text-brand md:text-7xl">1823 · 1932</p>
                <p className="mt-2 text-sm text-ink-muted">Italic old-style figures for every date.</p>
              </div>
              <div>
                <p className="sh-label text-brand">Body · Karla</p>
                <p className="mt-3 text-[1.0625rem] leading-[1.7] text-ink md:text-lg">
                  Hokkien immigrants built this temple to thank Mazu for a safe passage across the South China Sea. It once stood almost at the water&rsquo;s edge, before reclamation pushed the shoreline far away.
                </p>
                <p className="sh-label mt-8 text-brand">Label · Karla 700, caps, 0.12em</p>
                <p className="sh-label mt-3 text-ink">Kampong Glam · Early colonial · c. 1826</p>
                <p className="sh-label mt-6 text-brand">Title · Fraunces 600</p>
                <p className="sh-title mt-2 text-3xl text-ink">Thian Hock Keng Temple</p>
              </div>
            </div>
          </div>
        </section>

        <section id="direction" className="scroll-mt-16 px-5 py-16 md:px-10 md:py-28">
          <div className="mx-auto max-w-[84rem]">
            <SectionHeading eyebrow="Direction" title="How it should feel">
              Ornamented, crafted, tiled, sun-faded, storied, symmetrical, curated.
            </SectionHeading>
            <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
              {KEYWORDS.map((k) => (
                <li key={k} className="inline-flex items-center gap-2 rounded-pill border border-brand px-4 py-2 text-sm font-semibold text-brand">
                  <TileBullet size={12} />
                  {k}
                </li>
              ))}
            </ul>
            <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-2 lg:gap-16">
              <div>
                <h3 className="sh-title text-2xl text-ink">Photography direction</h3>
                <ul className="mt-5 space-y-3">
                  {DIRECTION.map((d) => (
                    <li key={d} className="flex gap-3 text-[1.0625rem] leading-snug text-ink"><TileBullet size={16} className="mt-1 shrink-0 text-brand" />{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="sh-title text-2xl text-ink">References</h3>
                <dl className="mt-5 divide-y divide-line">
                  {REFS.map(([t, d]) => (
                    <div key={t} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                      <dt className="sh-label pt-1 text-brand">{t}</dt>
                      <dd className="text-[0.9375rem] leading-snug text-ink-muted">{d}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="mt-16 grid gap-5 md:grid-cols-2">
              <div className="rounded-card border border-brand bg-surface p-6 md:p-8">
                <p className="sh-label flex items-center gap-2 text-brand"><Check size={16} strokeWidth={1.75} aria-hidden /> This</p>
                <ul className="mt-4 space-y-2.5 text-[1.0625rem] text-ink">{THIS.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
              <div className="rounded-card border border-danger bg-surface p-6 md:p-8">
                <p className="sh-label flex items-center gap-2 text-danger"><X size={16} strokeWidth={1.75} aria-hidden /> Not that</p>
                <ul className="mt-4 space-y-2.5 text-[1.0625rem] text-ink-muted line-through decoration-danger/50">{NOT.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <HeritageFooter current="moodboard" />
    </div>
  );
}
