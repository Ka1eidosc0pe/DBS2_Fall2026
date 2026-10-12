import type { Metadata } from "next";
import { Camera, Check, Sun, X } from "lucide-react";
import { Burst, ChopeSticker, checker, formica, formicaMint, mosaic } from "@/components/hawker-bright/patterns";
import { CollageTile } from "@/components/hawker-bright/Collage";
import { Footer, SiteNav } from "@/components/hawker-bright/Nav";
import { StallBadge, Tag } from "@/components/hawker-bright/Badges";
import { EXTRA_SWATCHES, ROLE_SWATCHES } from "@/data/hawker-bright/palette";
import { PHOTOS as P } from "@/data/hawker-bright/photos";

export const metadata: Metadata = { title: "Hawker Bright · Mood board" };

const LINKS = [
  { href: "#board", label: "Board" },
  { href: "#palette", label: "Palette" },
  { href: "#type", label: "Type" },
  { href: "#patterns", label: "Patterns" },
  { href: "#direction", label: "Direction" },
];

const KEYWORDS = ["Sunny", "Chatty", "Numbered", "Handwritten", "Tropical-bright", "Neighbourly", "Chope-able", "Steamy", "Busy but organised", "Outlined", "Sticker-flat"];

const REFERENCES = [
  { n: "01-01", t: "Stall unit-number plates", d: "White enamel, black numerals, a thin border. The model for every stall badge." },
  { n: "01-02", t: "Toa Payoh dragon playground", d: "Mosaic tile, flat colour and chunky outlines in a neighbourhood setting." },
  { n: "01-03", t: "HDB block repaint palettes", d: "Mint, peach, sky and butter, used to tell one block or one category from the next." },
  { n: "01-04", t: "Hand-lettered menu boards", d: "Dense, honest, price-tiered, with the dish name shouted first." },
  { n: "01-05", t: "Kopitiam cups and saucers", d: "Thick white china, a red-and-white logo, a tray with a number." },
  { n: "01-06", t: "Tissue-packet chope", d: "A tiny sign that says a seat is taken: the most Singaporean sticker there is." },
];

const DIRECTION = [
  "Bright, natural light. Morning and mid-day beat dusk, except for one night market shot.",
  "A focal point per frame: a bowl, a sign, a block. No empty crowds.",
  "Candid and slightly off-centre, shot at table height or from the queue.",
  "Colour first: yellow plates, orange tables, pastel blocks. Let the food clash.",
  "Crop tight on steam, gloss and chilli. Keep one corner of the frame messy.",
];

const THIS_NOT_THAT = [
  ["Thick 2px kopi-o outlines and hard offset shadows", "Soft blurred drop shadows and thin hairlines"],
  ["Condensed, uppercase signage type", "Rounded, friendly app-style headlines"],
  ["HDB pastels that map to categories", "A random rainbow with no job"],
  ["Sambal orange for one action", "Orange on everything that wants attention"],
  ["Busy but organised, in rows of stalls", "Cluttered, with no grid underneath"],
  ["Real stall numbers and honest Singlish", "Souvenir-shop kitsch and fake accents"],
];

export default function Page() {
  return (
    <div className="min-h-dvh">
      <SiteNav links={LINKS} current="moodboard" page="Mood board" trailing={null} />
      <main>
        {/* Title */}
        <section className="relative overflow-hidden border-b-2 border-ink" style={formica}>
          <div className="mx-auto max-w-[1320px] px-4 pb-10 pt-10 sm:px-6 md:pb-14 md:pt-14">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <StallBadge no="02-01" />
                <Tag tone="var(--hdb-sky)">Mood board</Tag>
                <Tag tone="var(--hdb-butter)">Everyday Singapore</Tag>
              </div>
              <h1 className="hb-display mt-4">
                Seven a.m.
                <br />
                at the <span className="inline-block -rotate-2 rounded-[14px] border-2 border-ink bg-brand px-3 pb-1 pt-2 text-on-brand shadow-card">hawker</span> centre
              </h1>
              <p className="hb-body-lg mt-5 max-w-2xl">
                Steam off the chicken-rice stall. A uncle pulling teh tarik. Tissue packets on tables. Numbered signs in red and white, and HDB blocks in mint, peach, sky and butter. Cheerful, busy and honest.
              </p>
            </div>
            <div className="absolute right-12 top-8 hidden h-[250px] w-[330px] xl:block">
            <div className="absolute right-0 top-0 w-[215px] rotate-3">
              <CollageTile n="02-02" photo={P.satay} sizes="220px" className="h-[175px]" tone="var(--hdb-lilac)" />
            </div>
            <ChopeSticker className="absolute bottom-0 left-0 w-[170px] -rotate-6 drop-shadow-[4px_4px_0_#2b1d14]" />
            <Burst className="absolute left-[92px] top-0 w-[112px] rotate-12">
              <span className="hb-title !text-[1.45rem] uppercase">Shiok!</span>
            </Burst>
          </div>
          </div>
        </section>

        {/* Collage */}
        <section id="board" aria-labelledby="board-h" className="scroll-mt-32 px-4 py-12 sm:px-6 md:py-16">
          <div className="mx-auto max-w-[1320px]">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <h2 id="board-h" className="hb-headline">
                The board
              </h2>
              <p className="hb-mono text-ink-muted">13 PHOTOS · WIKIMEDIA COMMONS · CREDITS ON EACH</p>
            </div>
            <div className="grid auto-rows-[88px] grid-cols-2 gap-3 sm:auto-rows-[96px] md:grid-cols-12 md:gap-5 md:[grid-auto-rows:84px]">
              <CollageTile n="03-01" photo={P.dragon} tilt={-1.5} priority sizes="(min-width:1024px) 520px, 100vw" className="col-span-2 row-span-4 md:[grid-area:1/1/7/6]" tone="var(--hdb-peach)" />
              <CollageTile n="03-02" photo={P.night} tilt={1.2} sizes="(min-width:1024px) 420px, 100vw" className="col-span-2 row-span-3 md:[grid-area:1/6/5/10]" tone="var(--hdb-lilac)" />
              <CollageTile n="03-03" photo={P.laksa} tilt={-2} sizes="(min-width:1024px) 320px, 50vw" className="row-span-3 md:[grid-area:1/10/4/13]" tone="var(--hdb-peach)" />
              <CollageTile n="03-04" photo={P.chicken} tilt={1.5} sizes="(min-width:1024px) 320px, 50vw" className="row-span-3 md:[grid-area:4/10/7/13]" tone="var(--hdb-butter)" />
              <CollageTile n="03-05" photo={P.void} tilt={-1} sizes="(min-width:1024px) 420px, 100vw" className="col-span-2 row-span-2 md:[grid-area:5/6/7/10]" tone="var(--hdb-mint)" />
              <CollageTile n="03-06" photo={P.satay} tilt={1.8} sizes="(min-width:1024px) 300px, 50vw" className="row-span-3 md:[grid-area:7/1/10/4]" tone="var(--hdb-lilac)" />
              <CollageTile n="03-07" photo={P.kaya} tilt={-2.2} sizes="(min-width:1024px) 400px, 50vw" className="row-span-3 md:[grid-area:7/9/10/13]" tone="var(--hdb-sky)" />
              <CollageTile n="03-08" photo={P.maxwell2} tilt={1} sizes="(min-width:1024px) 520px, 100vw" className="col-span-2 row-span-3 md:[grid-area:7/4/10/9]" tone="var(--hdb-mint)" />
              <CollageTile n="03-09" photo={P.mural} tilt={-1.2} sizes="(min-width:1024px) 300px, 50vw" className="row-span-3 md:[grid-area:10/1/13/4]" tone="var(--hdb-peach)" />
              <CollageTile n="03-10" photo={P.bcm} tilt={1.4} sizes="(min-width:1024px) 300px, 50vw" className="row-span-3 md:[grid-area:13/1/16/5]" tone="var(--hdb-butter)" />
              <CollageTile n="03-11" photo={P.oar} tilt={-1.6} sizes="(min-width:1024px) 400px, 100vw" className="col-span-2 row-span-3 md:[grid-area:10/4/13/8]" tone="var(--hdb-sky)" />
              <CollageTile n="03-12" photo={P.tekka} tilt={1.1} sizes="(min-width:1024px) 520px, 100vw" className="col-span-2 row-span-3 md:[grid-area:10/8/13/13]" tone="var(--hdb-peach)" />
              <CollageTile n="03-13" photo={P.maxwell} tilt={-0.8} sizes="(min-width:1024px) 760px, 100vw" className="col-span-2 row-span-3 md:[grid-area:13/5/16/13]" tone="var(--hdb-sky)" />
            </div>
          </div>
        </section>

        {/* Palette */}
        <section id="palette" aria-labelledby="pal-h" className="scroll-mt-32 border-y-2 border-ink px-4 py-12 sm:px-6 md:py-16" style={{ background: "var(--surface-2)" }}>
          <div className="mx-auto max-w-[1320px]">
            <h2 id="pal-h" className="hb-headline">
              The palette
            </h2>
            <p className="hb-body-lg mt-3 max-w-2xl text-ink-muted">Warm coffee neutrals do the heavy lifting. HDB pastels give each category its colour, and one hot sambal orange is saved for the thing you should press.</p>
            <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
              {[ROLE_SWATCHES[0], ROLE_SWATCHES[1], ROLE_SWATCHES[2], ROLE_SWATCHES[3], ROLE_SWATCHES[4], ROLE_SWATCHES[6], ROLE_SWATCHES[7], ...EXTRA_SWATCHES, ROLE_SWATCHES[8], ROLE_SWATCHES[11]].map((s, i) => (
                <li key={s.token} className="hb-card flex flex-col" style={{ transform: `rotate(${[-1, 0.8, -0.6, 1.2][i % 4]}deg)` }}>
                  <div className="grid h-28 place-items-end justify-items-start border-b-2 border-ink p-3" style={{ background: s.hex }}>
                    <span className="hb-stallno">{`0${i + 1}`.slice(-2)}</span>
                  </div>
                  <div className="p-3">
                    <p className="hb-title !text-[1.25rem] uppercase">{s.name}</p>
                    <p className="hb-mono mt-1 text-ink-muted">{s.hex}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="hb-label">Proportion</span>
              <div className="flex h-10 min-w-[260px] flex-1 overflow-hidden rounded-full border-2 border-ink shadow-card" role="img" aria-label="Palette proportion: mostly cream, then ink, pandan, pastels, and a sliver of sambal">
                <span style={{ flex: 46, background: "#FBF5EA" }} />
                <span style={{ flex: 16, background: "#2B1D14" }} />
                <span style={{ flex: 12, background: "#2F7D4F" }} />
                <span style={{ flex: 5, background: "#F6E3A1" }} />
                <span style={{ flex: 5, background: "#F7C9A9" }} />
                <span style={{ flex: 5, background: "#BFD9EE" }} />
                <span style={{ flex: 5, background: "#BFE3D0" }} />
                <span style={{ flex: 4, background: "#D9CCEB" }} />
                <span style={{ flex: 2, background: "#F26B2A" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Type */}
        <section id="type" aria-labelledby="type-h" className="scroll-mt-32 px-4 py-12 sm:px-6 md:py-16">
          <div className="mx-auto max-w-[1320px]">
            <h2 id="type-h" className="hb-headline">
              The type
            </h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
              <article className="hb-card flex flex-col justify-between gap-6 p-6 md:p-8" style={{ background: "var(--hdb-butter)" }}>
                <p className="hb-mono">ARCHIVO · 900 · WDTH 62 · UPPERCASE · SIGNAGE</p>
                <p className="hb-display !text-[clamp(3.5rem,2rem+8vw,9rem)]">Makan like a local</p>
                <p className="hb-body max-w-xl">Condensed and chunky, set tight like the signs above the stalls. Used for stall names, section headers and the hero. Never in lowercase.</p>
              </article>
              <div className="grid gap-5">
                <article className="hb-card p-6">
                  <p className="hb-mono text-ink-muted">FIGTREE · 400 TO 600 · BODY</p>
                  <p className="hb-title mt-3 !text-[2rem] !leading-tight">Friendly and highly legible</p>
                  <p className="hb-body mt-2 text-ink-muted">Soft-boiled eggs, dark soy, white pepper. Crack, stir, dunk. Warm 16px text for every menu line, tip and tooltip.</p>
                </article>
                <article className="hb-card p-6" style={{ background: "var(--hdb-sky)" }}>
                  <p className="hb-mono">SPACE MONO · 700 · STALL CODES</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <StallBadge no="01-23" className="!text-lg" />
                    <span className="hb-mono !text-lg">$$ · 12 MIN QUEUE</span>
                  </div>
                  <p className="hb-body mt-3">For unit numbers, price tiers, queue times and receipts.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Patterns */}
        <section id="patterns" aria-labelledby="pat-h" className="scroll-mt-32 border-y-2 border-ink px-4 py-12 sm:px-6 md:py-16" style={{ background: "var(--hdb-mint)" }}>
          <div className="mx-auto max-w-[1320px]">
            <h2 id="pat-h" className="hb-headline">
              Patterns, drawn in code
            </h2>
            <p className="hb-body-lg mt-3 max-w-2xl">Every texture here is SVG or CSS. No image files, so it stays crisp and loads instantly.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <figure className="hb-card m-0 bg-surface">
                <div className="h-44 border-b-2 border-ink" style={formica} />
                <figcaption className="p-4">
                  <p className="hb-title !text-xl uppercase">Formica speckle</p>
                  <p className="hb-caption mt-1 text-ink-muted">Table-top laminate. Page bands and hero.</p>
                </figcaption>
              </figure>
              <figure className="hb-card m-0 bg-surface">
                <div className="h-44 border-b-2 border-ink" style={mosaic} />
                <figcaption className="p-4">
                  <p className="hb-title !text-xl uppercase">Mosaic floor</p>
                  <p className="hb-caption mt-1 text-ink-muted">Kopitiam and playground tile. Dividers and empty states.</p>
                </figcaption>
              </figure>
              <figure className="hb-card m-0 bg-surface">
                <div className="grid h-44 place-items-center border-b-2 border-ink px-6" style={{ ...checker("#2b1d14", "#fbf5ea", 22) }}>
                  <div className="hb-zigzag-bottom w-full max-w-[180px] border-2 border-b-0 border-ink bg-surface px-3 pb-4 pt-3">
                    <p className="hb-mono text-center">ORDER SLIP</p>
                    <div className="my-1.5 border-t-2 border-dashed border-ink" />
                    <p className="hb-mono flex justify-between"><span>LAKSA</span><span>$</span></p>
                    <p className="hb-mono flex justify-between"><span>KOPI-O</span><span>$</span></p>
                  </div>
                </div>
                <figcaption className="p-4">
                  <p className="hb-title !text-xl uppercase">Checker and receipt</p>
                  <p className="hb-caption mt-1 text-ink-muted">Zigzag-edged paper for the makan list.</p>
                </figcaption>
              </figure>
              <figure className="hb-card m-0 bg-surface">
                <div className="relative grid h-44 place-items-center border-b-2 border-ink" style={formicaMint}>
                  <ChopeSticker className="w-40 -rotate-6 drop-shadow-[3px_3px_0_#2b1d14]" />
                </div>
                <figcaption className="p-4">
                  <p className="hb-title !text-xl uppercase">Chope sticker</p>
                  <p className="hb-caption mt-1 text-ink-muted">A tissue packet that says this seat is taken.</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Direction */}
        <section id="direction" aria-labelledby="dir-h" className="scroll-mt-32 px-4 py-12 sm:px-6 md:py-16">
          <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-2">
            <div>
              <h2 id="dir-h" className="hb-headline">
                Keywords
              </h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {KEYWORDS.map((k, i) => (
                  <li key={k} className="hb-chip" style={{ ["--chip-bg" as string]: ["var(--hdb-butter)", "var(--hdb-peach)", "var(--hdb-sky)", "var(--hdb-mint)", "var(--hdb-lilac)"][i % 5], transform: `rotate(${[-2, 1.5, -1, 2, -1.5][i % 5]}deg)`, cursor: "default" }}>
                    {k}
                  </li>
                ))}
              </ul>
              <h2 className="hb-headline mt-12">References</h2>
              <ol className="mt-6 grid gap-3">
                {REFERENCES.map((r) => (
                  <li key={r.n} className="hb-card flex items-start gap-3 p-4">
                    <StallBadge no={r.n} />
                    <div>
                      <p className="hb-title !text-[1.2rem] uppercase">{r.t}</p>
                      <p className="hb-caption mt-1 text-ink-muted !text-[0.9375rem]">{r.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="hb-headline flex items-center gap-3">
                <Camera size={36} strokeWidth={2.5} aria-hidden /> Photography
              </h2>
              <ul className="hb-card mt-6 divide-y-2 divide-dashed divide-line p-0">
                {DIRECTION.map((d) => (
                  <li key={d} className="flex gap-3 p-4">
                    <Sun size={20} strokeWidth={2.5} aria-hidden className="mt-0.5 flex-none" />
                    <span className="hb-body">{d}</span>
                  </li>
                ))}
              </ul>
              <h2 className="hb-headline mt-12">This, not that</h2>
              <div className="mt-6 overflow-hidden rounded-[18px] border-2 border-ink shadow-card">
                <div className="grid grid-cols-2 border-b-2 border-ink">
                  <p className="hb-label flex items-center gap-2 bg-brand p-3 text-on-brand">
                    <Check size={16} strokeWidth={3} aria-hidden /> This
                  </p>
                  <p className="hb-label flex items-center gap-2 border-l-2 border-ink bg-hdb-peach p-3 [background:var(--hdb-peach)]">
                    <X size={16} strokeWidth={3} aria-hidden /> Not that
                  </p>
                </div>
                {THIS_NOT_THAT.map(([a, b]) => (
                  <div key={a} className="grid grid-cols-2 border-b-2 border-dashed border-line bg-surface last:border-b-0">
                    <p className="p-3 text-[0.9375rem] font-bold leading-snug">{a}</p>
                    <p className="border-l-2 border-dashed border-line p-3 text-[0.9375rem] leading-snug text-ink-muted line-through decoration-danger/60">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="h-6 border-y-2 border-ink" aria-hidden style={mosaic} />
      <Footer current="moodboard" />
    </div>
  );
}
