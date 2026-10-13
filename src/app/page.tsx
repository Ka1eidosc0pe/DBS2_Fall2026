import Link from "next/link";
import { HubFlood } from "@/components/HubFlood";
import { fontVars } from "@/lib/fonts";
import { STYLES, href, type StyleEntry } from "@/lib/styles";

const STEPS = [
  { n: "01", title: "Mood board", body: "Imagery, color, type, and texture that set the feel of the style." },
  { n: "02", title: "Design system", body: "Color and type roles, spacing, shape, and every component in every state." },
  { n: "03", title: "Site", body: "A travel guide built only from that system, checked at 390px and 1440px." },
];

export default function Hub() {
  return (
    <HubFlood>
      <header data-lock="header" className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 pt-6 md:px-10 md:pt-8">
        <p className="font-display text-sm font-semibold tracking-tight">Singapore, Three Ways</p>
        <p className="hidden font-mono text-xs text-ink-muted sm:block">Design, Build, Ship · Project 2</p>
      </header>

      <main className="mx-auto max-w-[1280px] px-5 pb-20 md:px-10">
        <section data-lock="hero" className="grid gap-6 py-14 md:grid-cols-[1.4fr_1fr] md:items-end md:py-24">
          <h1 className="font-display text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance md:text-[5.25rem]">
            One city. Three visual styles.
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-pretty text-ink-muted">
            A travel guide to Singapore, designed three times over. Each style starts as a mood board, becomes a
            design system, and ships as a small site built from that system.
          </p>
        </section>

        {/* At desktop each card is a subgrid over five shared rows, so header, title, palette,
            description, and actions line up across cards whatever their lengths. */}
        <ul className="grid gap-5 lg:grid-cols-3 lg:gap-y-0" aria-label="Styles">
          {STYLES.map((s, i) => (
            <StyleCard key={s.slug} style={s} index={i} />
          ))}
        </ul>

        <section data-lock="process" aria-labelledby="process" className="mt-20 border-t border-line pt-10 md:mt-28">
          <h2 id="process" className="font-mono text-xs tracking-wider text-ink-muted uppercase">
            Per style
          </h2>
          <ol className="mt-6 grid gap-8 md:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.n} className="flex gap-4">
                <span className="font-mono text-sm text-ink-subtle">{step.n}</span>
                <div>
                  <h3 className="font-display font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer data-lock="footer" className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-8 text-sm text-ink-muted">
        <p>Static site. Next.js and Tailwind CSS. No accounts, no tracking.</p>
        <Link href="/credits/" className="underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink">
          Photo credits
        </Link>
        </div>
      </footer>
    </HubFlood>
  );
}

function StyleCard({ style: s, index }: { style: StyleEntry; index: number }) {
  const c = s.card;
  return (
    <li
      data-style-card={s.slug}
      className={`${fontVars.hub} relative z-20 flex flex-col overflow-hidden rounded-card lg:row-span-5 lg:grid lg:grid-rows-subgrid lg:p-8 ring-1 ring-black/10 transition-shadow duration-300 hover:shadow-[0_0_0_1.5px_var(--card-edge),0_28px_60px_-28px_rgb(0_0_0/0.45)] focus-within:shadow-[0_0_0_1.5px_var(--card-edge)]`}
      style={{ background: c.bg, color: c.ink, fontFamily: "var(--font-hub-sans)", ["--card-edge" as string]: c.edge }}
    >
      <div className="flex flex-1 flex-col p-6 md:p-8 lg:contents">
        <div className="flex items-baseline justify-between text-xs" style={{ color: c.muted, fontFamily: "var(--font-hub-mono)" }}>
          <span>0{index + 1}</span>
          <span className="tracking-wider uppercase">{s.lens}</span>
        </div>

        <div className="lg:self-end">
        <h2
          className="mt-12 text-[2.6rem] leading-[0.95] md:mt-16 md:text-[3.25rem]"
          style={{ fontFamily: s.displayFontVar, ...DISPLAY_TUNING[s.slug] }}
        >
          {/* One word per line, so every card's title takes the same two lines */}
          {s.name.split(" ").map((word, i) => (
            <span key={word} className="block">
              {i > 0 && <span className="sr-only"> </span>}
              {word}
            </span>
          ))}
        </h2>
        <p className="mt-3 text-lg" style={{ fontFamily: s.displayFontVar, color: c.muted, ...TAGLINE_TUNING[s.slug] }}>
          {s.tagline}
        </p>
        </div>

        <div className="mt-8 flex" aria-label={`${s.name} palette`} role="img">
          {s.swatches.map((sw, j) => (
            <span
              key={sw.hex}
              title={`${sw.name} ${sw.hex}`}
              className="h-10 flex-1 first:rounded-l-md last:rounded-r-md"
              style={{
                background: sw.hex,
                boxShadow: `inset 0 0 0 1px ${c.line}`,
                flexGrow: j === s.swatches.length - 1 ? 0.6 : 1,
              }}
            />
          ))}
        </div>

        <p className="mt-6 text-[0.95rem] leading-relaxed" style={{ color: c.muted }}>
          {s.description}
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-8">
          <Link
            href={href(s.slug, "site")}
            className="flex min-h-12 items-center justify-between rounded-full px-5 text-[0.95rem] font-semibold transition-[filter,transform] hover:brightness-105 active:scale-[0.98]"
            style={{ background: c.accent, color: c.onAccent }}
          >
            Visit {s.siteName}
            <span aria-hidden>→</span>
          </Link>
          <div className="grid grid-cols-2 gap-3">
            {(["moodboard", "system"] as const).map((k) => (
              <Link
                key={k}
                href={href(s.slug, k)}
                className="flex min-h-11 items-center justify-center rounded-full text-sm font-medium transition-colors hover:bg-[color-mix(in_srgb,currentColor_8%,transparent)]"
                style={{ boxShadow: `inset 0 0 0 1px ${c.line}` }}
              >
                {k === "moodboard" ? "Mood board" : "Design system"}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

// Each display face wants slightly different settings to look its best at card size.
const DISPLAY_TUNING: Record<StyleEntry["slug"], React.CSSProperties> = {
  "marina-noir": { fontWeight: 500, letterSpacing: "-0.01em", fontVariationSettings: '"opsz" 96' },
  "hawker-bright": { fontWeight: 800, letterSpacing: "-0.02em", fontVariationSettings: '"wdth" 75', textTransform: "uppercase" },
  "shophouse-heritage": { fontWeight: 600, letterSpacing: "-0.015em", fontVariationSettings: '"SOFT" 100, "WONK" 1, "opsz" 144' },
};

const TAGLINE_TUNING: Record<StyleEntry["slug"], React.CSSProperties> = {
  "marina-noir": { fontStyle: "italic" },
  "hawker-bright": { fontWeight: 600, fontVariationSettings: '"wdth" 100' },
  "shophouse-heritage": { fontStyle: "italic" },
};
