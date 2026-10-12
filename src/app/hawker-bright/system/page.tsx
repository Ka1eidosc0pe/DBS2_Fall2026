import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { Button } from "@/components/hawker-bright/Button";
import { CountBadge, StallBadge, Tag } from "@/components/hawker-bright/Badges";
import { Chip } from "@/components/hawker-bright/Chip";
import { Footer, SiteNav } from "@/components/hawker-bright/Nav";
import { ToastProvider } from "@/components/hawker-bright/Overlay";
import { ComponentsSection, StatesMatrix, UiStates } from "@/components/hawker-bright/SystemInteractive";
import { formica, mosaic } from "@/components/hawker-bright/patterns";
import { contrast } from "@/components/hawker-bright/types";
import { EXTRA_SWATCHES, ROLE_SWATCHES, type Swatch } from "@/data/hawker-bright/palette";

export const metadata: Metadata = { title: "Hawker Bright · Design system" };

const LINKS = [
  { href: "#color", label: "Color" },
  { href: "#type", label: "Type" },
  { href: "#shape", label: "Spacing and shape" },
  { href: "#components", label: "Components" },
  { href: "#states", label: "Control states" },
  { href: "#ui-states", label: "UI states" },
];

function Section({ id, n, title, intro, children }: { id: string; n: string; title: string; intro: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-32 border-t-2 border-ink px-4 py-12 sm:px-6 md:py-16 first:border-t-0">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-8 flex flex-wrap items-start gap-x-5 gap-y-3">
          <StallBadge no={n} className="mt-3 !text-base" />
          <div className="min-w-0 flex-1 basis-[420px]">
            <h2 id={`${id}-h`} className="hb-headline">
              {title}
            </h2>
            <p className="hb-body-lg mt-2 max-w-3xl text-ink-muted">{intro}</p>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

function Ratio({ a, b, label }: { a: string; b: string; label: string }) {
  const r = contrast(a, b);
  const grade = r >= 7 ? "AAA" : r >= 4.5 ? "AA" : r >= 3 ? "AA large / UI" : "Below 3:1";
  const ok = r >= 3;
  return (
    <p className="hb-caption flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className="hb-mono">{r.toFixed(2)}:1</span>
      <span className={`hb-tag !text-[0.625rem] ${ok ? "" : "!bg-hdb-peach"}`} style={{ ["--tag-bg" as string]: r >= 4.5 ? "var(--hdb-mint)" : r >= 3 ? "var(--hdb-butter)" : "var(--hdb-peach)" }}>
        {grade}
      </span>
      <span className="text-ink-muted">vs {label}</span>
    </p>
  );
}

function SwatchCard({ s }: { s: Swatch }) {
  const dark = contrast(s.hex, "#FFFFFF") > contrast(s.hex, "#2B1D14");
  return (
    <li className="hb-card flex flex-col">
      <div className="flex h-24 items-end justify-between border-b-2 border-ink p-3" style={{ background: s.hex, color: dark ? "#fff" : "#2b1d14" }}>
        <span className="hb-mono">{s.hex}</span>
        {s.partner ? <span className="hb-title !text-[2rem]" style={{ color: s.partner.hex }} aria-hidden>Aa</span> : null}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <p className="hb-title !text-[1.2rem] uppercase">{s.name}</p>
        <p className="hb-mono text-ink-muted">{s.token}</p>
        <p className="hb-caption !text-[0.875rem]">{s.use}</p>
        {s.partner ? <div className="mt-auto pt-2">{s.token === "line" ? <p className="hb-caption text-ink-muted">Decorative: never carries meaning on its own.</p> : <Ratio a={s.hex} b={s.partner.hex} label={s.partner.label} />}</div> : null}
      </div>
    </li>
  );
}

const TYPE_ROLES = [
  { role: "Display", cls: "hb-display", sample: "Makan like a local", family: "Archivo, wdth 62", weight: "900", mobile: "52 / 48", desktop: "110 / 101", track: "-0.005em", caseR: "Uppercase", use: "Hero only" },
  { role: "Headline", cls: "hb-headline", sample: "The stalls", family: "Archivo, wdth 70", weight: "800", mobile: "36 / 34", desktop: "60 / 57", track: "0", caseR: "Uppercase", use: "Section headers" },
  { role: "Title", cls: "hb-title", sample: "Hainanese chicken rice", family: "Archivo, wdth 75", weight: "800", mobile: "22 / 22", desktop: "28 / 28", track: "0.005em", caseR: "Uppercase on cards", use: "Card and panel titles" },
  { role: "Body", cls: "hb-body", sample: "Silky poached chicken over rice cooked in its own stock, with ginger paste and chilli.", family: "Figtree", weight: "400 to 600", mobile: "16 / 25", desktop: "16 / 25", track: "0", caseR: "Sentence", use: "Paragraphs, tips" },
  { role: "Label", cls: "hb-label", sample: "What to order", family: "Figtree", weight: "800", mobile: "13 / 14", desktop: "13 / 14", track: "0.08em", caseR: "Uppercase", use: "Field labels, row heads" },
  { role: "Caption", cls: "hb-caption", sample: "Photo: Kbseah · CC BY-SA 4.0", family: "Figtree", weight: "500", mobile: "13 / 18", desktop: "13 / 18", track: "0", caseR: "Sentence", use: "Credits, hints" },
  { role: "Mono / numeric", cls: "hb-mono", sample: "#01-23 · $$ · 12 MIN QUEUE", family: "Space Mono", weight: "700", mobile: "13 / 16", desktop: "13 / 16", track: "0.02em", caseR: "Uppercase", use: "Stall numbers, tiers, receipts" },
];

const SPACING = [4, 8, 12, 16, 24, 32, 48, 64, 96];

export default function Page() {
  return (
    <ToastProvider>
      <div className="min-h-dvh">
        <SiteNav links={LINKS} current="system" page="Design system" />
        <main>
          {/* Hero */}
          <section className="border-b-2 border-ink px-4 py-12 sm:px-6 md:py-16" style={formica}>
            <div className="mx-auto max-w-[1320px]">
              <div className="flex flex-wrap items-center gap-2">
                <StallBadge no="04-00" />
                <Tag tone="var(--hdb-mint)">Design system</Tag>
                <Tag tone="var(--hdb-butter)">Hawker Bright</Tag>
              </div>
              <h1 className="hb-display mt-4">Makan Map UI kit</h1>
              <p className="hb-body-lg mt-4 max-w-3xl">
                Chunky outlines, hard shadows, condensed signage type and HDB pastels. This page renders every token and component the site uses, with the same code. Sambal orange is saved for one action.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {LINKS.map((l, i) => (
                  <a key={l.href} href={l.href} className="hb-chip hb-focusable" style={{ ["--chip-bg" as string]: ["var(--hdb-butter)", "var(--hdb-peach)", "var(--hdb-sky)", "var(--hdb-mint)", "var(--hdb-lilac)", "var(--surface)"][i] }}>
                    <span className="hb-mono">{`0${i + 1}`}</span> {l.label}
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* 1. Color */}
          <Section id="color" n="04-01" title="Color roles" intro="Warm coffee neutrals do the work. Pastels sort stalls into categories. One hot orange marks the action that matters most on a screen.">
            <h3 className="hb-title !text-[1.75rem] uppercase">Semantic roles</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {ROLE_SWATCHES.map((s) => (
                <SwatchCard key={s.token} s={s} />
              ))}
            </ul>
            <h3 className="hb-title mt-10 !text-[1.75rem] uppercase">HDB pastels (extras)</h3>
            <p className="hb-body mt-1 text-ink-muted">Each dish category owns one. They are always filled with ink text and a 2px ink outline.</p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {EXTRA_SWATCHES.map((s) => (
                <SwatchCard key={s.token} s={s} />
              ))}
            </ul>

            <h3 className="hb-title mt-10 !text-[1.75rem] uppercase">Where the accent goes</h3>
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              <div className="hb-card overflow-hidden">
                <p className="hb-label flex items-center gap-2 border-b-2 border-ink bg-brand p-3 text-on-brand">
                  <Check size={16} strokeWidth={3} aria-hidden /> Do: the one primary action and its echoes
                </p>
                <div className="grid gap-5 p-5">
                  <div className="flex flex-wrap items-center gap-4">
                    <Button variant="primary"><span aria-hidden>+</span> Add to makan list</Button>
                    <span className="inline-flex items-center gap-2 font-bold">Makan list <CountBadge count={3} /></span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button variant="primary">Plan my food crawl</Button>
                    <Chip selected tone="var(--hdb-butter)">Rice</Chip>
                    <Button variant="brand">Find food</Button>
                  </div>
                  <ul className="hb-body grid gap-1.5 text-ink-muted">
                    <li>Primary button: one per screen or panel.</li>
                    <li>The counter badge on the list that action fills.</li>
                    <li>The primary button in that list&apos;s drawer.</li>
                    <li>Selected chips, nav and links use pandan instead.</li>
                  </ul>
                </div>
              </div>
              <div className="hb-card overflow-hidden">
                <p className="hb-label flex items-center gap-2 border-b-2 border-ink bg-danger p-3 text-white">
                  <X size={16} strokeWidth={3} aria-hidden /> Don&apos;t: decoration, headings, links, selection
                </p>
                <div className="grid gap-5 p-5 opacity-80">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="hb-title !text-[1.6rem] uppercase line-through" style={{ color: "#f26b2a", textDecorationColor: "#c62828" }}>Orange heading</span>
                    <span className="font-bold line-through underline" style={{ color: "#f26b2a", textDecorationColor: "#c62828" }}>Orange link</span>
                    <span className="hb-chip line-through" style={{ ["--chip-bg" as string]: "#f26b2a" }}>Selected chip</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="inline-block h-10 w-10 rounded-full border-2 border-ink" style={{ background: "#f26b2a" }} aria-hidden />
                    <span className="hb-caption">Orange icons, dividers, backgrounds and second buttons all dilute the one thing you want pressed.</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="hb-btn hb-lift line-through" style={{ ["--btn-bg" as string]: "#f26b2a", ["--btn-fg" as string]: "#2b1d14" }}>Second orange button</span>
                    <span className="h-1.5 w-24 rounded-full" style={{ background: "#f26b2a" }} aria-hidden />
                  </div>
                  <p className="hb-body text-ink-muted">Use pandan for selection and links, ink for emphasis, and an HDB pastel for category.</p>
                </div>
              </div>
            </div>
          </Section>

          {/* 2. Type */}
          <Section id="type" n="04-02" title="Typeface roles" intro="Archivo condensed for signage, Figtree for reading, Space Mono for numbers. Sizes are fluid between the mobile and desktop values shown.">
            <div className="hb-card overflow-hidden">
              {TYPE_ROLES.map((t, i) => (
                <article key={t.role} className={`grid gap-4 p-5 sm:p-6 ${i > 0 ? "border-t-2 border-dashed border-line" : ""}`}>
                  <div className="min-w-0">
                    <p className="hb-label mb-2 text-ink-muted">{t.role}</p>
                    <p className={`${t.cls} ${t.cls === "hb-display" ? "!text-[clamp(2.75rem,2rem+4.5vw,6.5rem)]" : ""} break-words`}>{t.sample}</p>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-[12px] border-2 border-ink bg-surface-2 p-3 sm:grid-cols-4 lg:grid-cols-7">
                    {[
                      ["Family", t.family],
                      ["Weight", t.weight],
                      ["Mobile px", t.mobile],
                      ["Desktop px", t.desktop],
                      ["Tracking", t.track],
                      ["Case", t.caseR],
                      ["Used for", t.use],
                    ].map(([k, v]) => (
                      <div key={k} className="min-w-0">
                        <dt className="hb-label !text-[0.625rem] text-ink-muted">{k}</dt>
                        <dd className="hb-mono mt-0.5 !text-[0.8125rem]">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
            <p className="hb-caption mt-3 text-ink-muted">Sizes are shown as font-size / line-height in px. Display and headline are never set in lowercase.</p>
          </Section>

          {/* 3. Spacing and shape */}
          <Section id="shape" n="04-03" title="Spacing and shape" intro="Medium-high density: tight 16 to 24px gutters, 64 to 96px between sections. Everything is outlined, and everything with depth casts a hard shadow.">
            <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-2">
              <div className="hb-card p-5">
                <h3 className="hb-title !text-[1.5rem] uppercase">Spacing scale</h3>
                <ul className="mt-4 grid gap-2">
                  {SPACING.map((px, i) => (
                    <li key={px} className="flex items-center gap-3">
                      <span className="hb-mono w-16 text-ink-muted">s{i + 1}</span>
                      <span className="hb-mono w-12">{px}px</span>
                      <span className="h-5 min-w-0 rounded-sm border-2 border-ink bg-hdb-butter" style={{ width: `${Math.max(4, (px / 96) * 70)}%`, background: "var(--hdb-butter)" }} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hb-card p-5">
                <h3 className="hb-title !text-[1.5rem] uppercase">Radii and borders</h3>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[
                    ["Pill 999", "999px"],
                    ["Card 18", "18px"],
                    ["Panel 14", "14px"],
                    ["Plate 8", "8px"],
                    ["Receipt 6", "6px 6px 0 0"],
                    ["Tile 2", "2px"],
                  ].map(([l, r]) => (
                    <div key={l} className="grid gap-2 text-center">
                      <div className="h-16 border-2 border-ink" style={{ borderRadius: r, background: "var(--hdb-sky)" }} />
                      <p className="hb-mono">{l}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid gap-3">
                  {[
                    ["1px", "line", "Dividers inside receipts and tables (dashed)", "var(--line)"],
                    ["2px", "ink", "Every card, button, input and chip", "var(--ink)"],
                    ["3px", "focus ring", "Outline with 3px offset on focus-visible", "var(--ink)"],
                  ].map(([w, n, d, c]) => (
                    <div key={w} className="flex items-center gap-3">
                      <span className="w-16 flex-none" style={{ borderTop: `${w} solid ${c}` }} />
                      <p className="hb-caption"><span className="hb-mono">{w} {n}</span> · {d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hb-card p-5">
                <h3 className="hb-title !text-[1.5rem] uppercase">Elevation: hard shadows</h3>
                <div className="mt-5 grid grid-cols-2 gap-6 sm:grid-cols-4">
                  {[
                    ["Rest", "4px 4px 0 var(--ink)", "none"],
                    ["Hover lift", "6px 6px 0 var(--ink)", "translate(-2px,-2px)"],
                    ["Pressed", "0 0 0 var(--ink)", "translate(2px,2px)"],
                    ["Drawer", "-6px 0 0 var(--ink)", "none"],
                  ].map(([l, sh, tr]) => (
                    <div key={l} className="grid gap-3 text-center">
                      <div className="mx-auto h-16 w-full max-w-[96px] rounded-[14px] border-2 border-ink bg-surface" style={{ boxShadow: sh, transform: tr }} />
                      <p className="hb-mono">{l}</p>
                    </div>
                  ))}
                </div>
                <p className="hb-caption mt-4 text-ink-muted">Never blurred. The shadow is always the ink colour, offset down and right (left for the drawer).</p>
              </div>
              <div className="hb-card p-5">
                <h3 className="hb-title !text-[1.5rem] uppercase">Layout grid and breakpoints</h3>
                <div className="mt-4 grid grid-cols-12 gap-1.5" aria-hidden>
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="h-10 rounded-sm border-2 border-ink" style={{ background: i % 2 ? "var(--hdb-mint)" : "var(--hdb-butter)" }} />
                  ))}
                </div>
                <table className="hb-mono mt-4 w-full text-left !text-[0.8125rem]">
                  <tbody>
                    {[
                      ["390", "Mobile", "1 or 2 columns, 16px gutters, sheets from the bottom"],
                      ["768", "Tablet", "2 columns, 20px gutters, drawers from the right"],
                      ["1024", "Laptop", "3 columns, 24px gutters"],
                      ["1440", "Desktop", "12 columns, 1320px max, 24px gutters"],
                    ].map(([w, n, d]) => (
                      <tr key={w} className="border-t-2 border-dashed border-line">
                        <td className="py-2 pr-3 font-bold">{w}</td>
                        <td className="py-2 pr-3">{n}</td>
                        <td className="py-2 font-sans text-[0.875rem] font-medium text-ink-muted">{d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="hb-card p-5 lg:col-span-2">
                <h3 className="hb-title !text-[1.5rem] uppercase">Motion</h3>
                <p className="hb-body mt-1 text-ink-muted">Snappy and a little springy. Hover each tile. Reduced-motion users get instant transitions.</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["Fast", "150ms", "Colour and hover fills", "ease"],
                    ["Base", "200ms", "Lift and push on cards, buttons", "cubic-bezier(.34,1.56,.64,1)"],
                    ["Slow", "250ms", "Drawers, toasts, sheets", "cubic-bezier(.34,1.56,.64,1)"],
                    ["Flip", "420ms", "Glossary cards", "cubic-bezier(.34,1.56,.64,1)"],
                  ].map(([n, d, u, e]) => (
                    <div key={n} className="rounded-[14px] border-2 border-dashed border-ink/50 p-4">
                      <div className="group mb-3 h-14 rounded-[12px] border-2 border-ink bg-hdb-peach shadow-[4px_4px_0_var(--ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:rotate-[-2deg] hover:shadow-[7px_7px_0_var(--ink)]" style={{ transition: `all ${d} ${e}`, background: "var(--hdb-peach)" }} />
                      <p className="hb-mono">{n} · {d}</p>
                      <p className="hb-caption mt-1">{u}</p>
                      <p className="hb-mono mt-1 text-ink-muted !text-[0.6875rem] !font-normal">{e}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 h-7 border-y-2 border-ink" style={mosaic} aria-hidden />
          </Section>

          {/* 4. Components */}
          <Section id="components" n="04-04" title="Components" intro="Every piece below is the component the site imports. Hover, tab and click them: the states are real.">
            <ComponentsSection />
          </Section>

          {/* 5. Control states */}
          <Section id="states" n="04-05" title="Control states" intro="Each control in every state, rendered with the forceState prop so forced and real states look identical. n/a means the state does not apply.">
            <StatesMatrix />
          </Section>

          {/* 6. UI states */}
          <Section id="ui-states" n="04-06" title="UI states" intro="Empty, loading, error, success and no results, shown as they appear on the site.">
            <UiStates />
          </Section>
        </main>
        <Footer current="system" />
      </div>
    </ToastProvider>
  );
}
