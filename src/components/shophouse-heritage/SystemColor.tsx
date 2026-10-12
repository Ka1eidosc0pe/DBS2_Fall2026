import { contrast, grade } from "./contrast";
import { DISTRICTS } from "@/data/shophouse-heritage/heritage";
import { TILE } from "./patterns";
import { Button } from "./Button";
import { FilterChip } from "./Chips";
import { TileBullet } from "./patterns";
import { Check, X } from "lucide-react";

type Tok = { token: string; name: string; hex: string; use: string; partner: string; partnerLabel: string; large?: boolean };

const SEMANTIC: Tok[] = [
  { token: "bg", name: "Limewash", hex: "#F6F1E7", use: "The page. Warm, calm space around the pattern.", partner: "#1F2A33", partnerLabel: "ink" },
  { token: "surface", name: "Porcelain", hex: "#FFFDF8", use: "Cards, inputs, drawers, the tile ground.", partner: "#1F2A33", partnerLabel: "ink" },
  { token: "surface-2", name: "Plaster", hex: "#EDE4D3", use: "Quiet panels, hover fills, badges, skeletons.", partner: "#1F2A33", partnerLabel: "ink" },
  { token: "ink", name: "Indigo ink", hex: "#1F2A33", use: "All primary text, strong rules, tooltips.", partner: "#F6F1E7", partnerLabel: "bg" },
  { token: "ink-muted", name: "Slate", hex: "#5A6670", use: "Secondary text, captions, placeholder.", partner: "#F6F1E7", partnerLabel: "bg" },
  { token: "ink-subtle", name: "Pewter", hex: "#7D8790", use: "Control borders and disabled marks. Never body text.", partner: "#FFFDF8", partnerLabel: "surface", large: true },
  { token: "line", name: "Plaster line", hex: "#D8CDB8", use: "Hairline dividers and card edges. Decorative only.", partner: "#F6F1E7", partnerLabel: "bg", large: true },
  { token: "brand", name: "Jade", hex: "#2E6E5E", use: "Headers, nav, selected chips, tile motifs, links on hover.", partner: "#FFFDF8", partnerLabel: "on-brand" },
  { token: "focus", name: "Deep jade", hex: "#1F5F52", use: "The 2px focus ring, always offset 2px.", partner: "#F6F1E7", partnerLabel: "bg", large: true },
  { token: "accent", name: "Nyonya Coral", hex: "#E8837A", use: "The primary action only, and its direct echoes.", partner: "#1F2A33", partnerLabel: "on-accent" },
  { token: "accent-hover", name: "Coral, lifted", hex: "#EE978F", use: "Primary action on hover.", partner: "#1F2A33", partnerLabel: "on-accent" },
  { token: "accent-pressed", name: "Coral, pressed", hex: "#E07A71", use: "Primary action while pressed.", partner: "#1F2A33", partnerLabel: "on-accent" },
  { token: "success", name: "Jade (success)", hex: "#2E6E5E", use: "Confirmation icons and borders.", partner: "#FFFDF8", partnerLabel: "surface" },
  { token: "warning", name: "Burnt turmeric", hex: "#8F600F", use: "Cautions, never the only signal.", partner: "#FFFDF8", partnerLabel: "surface" },
  { token: "danger", name: "Madder", hex: "#A8324A", use: "Errors and destructive actions.", partner: "#FFFDF8", partnerLabel: "surface" },
  { token: "info", name: "Teal ink", hex: "#2B7B85", use: "Neutral notices.", partner: "#FFFDF8", partnerLabel: "surface" },
];

const EXTRAS: Tok[] = [
  { token: "peranakan-teal", name: "Peranakan Teal", hex: "#3A9CA6", use: "Tile petals, Kampong Glam.", partner: "#FFFDF8", partnerLabel: "surface", large: true },
  { token: "turmeric", name: "Turmeric", hex: "#D9A23B", use: "Tile hearts, Chinatown. Ink sits on it, never white.", partner: "#1F2A33", partnerLabel: "ink" },
  { token: "indigo", name: "Batik Indigo", hex: "#2B3A67", use: "Tile corners, Little India.", partner: "#FFFDF8", partnerLabel: "surface" },
  { token: "jade-deep", name: "Deep jade", hex: "#1F5F52", use: "Footer, Emerald Hill, selected hover.", partner: "#FFFDF8", partnerLabel: "surface" },
  { token: "mangosteen", name: "Mangosteen", hex: "#7B3F68", use: "Joo Chiat.", partner: "#FFFDF8", partnerLabel: "surface" },
  { token: "pandan", name: "Pandan", hex: "#66742C", use: "Civic District.", partner: "#FFFDF8", partnerLabel: "surface" },
  { token: "terracotta", name: "Roof terracotta", hex: "#B0603A", use: "Clay roofs and warm accents.", partner: "#FFFDF8", partnerLabel: "surface" },
];

function Swatch({ t }: { t: Tok }) {
  const r = contrast(t.hex, t.partner);
  return (
    <li className="overflow-hidden rounded-card border border-line bg-surface">
      <div className="flex h-24 items-end justify-between p-3" style={{ background: t.hex, color: t.partner }}>
        <span className="sh-title text-lg leading-none">Aa</span>
        <span className="sh-label opacity-90">on {t.partnerLabel}</span>
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2">
          <p className="sh-title text-lg text-ink">{t.name}</p>
          <code className="text-xs text-ink-muted">{t.hex}</code>
        </div>
        <p className="sh-label mt-1 text-ink-muted">--{t.token}</p>
        <p className="mt-2 text-sm leading-snug text-ink">{t.use}</p>
        <p className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-sm text-ink-muted">
          <span className="font-semibold tabular-nums text-ink">{r.toFixed(2)}:1</span>
          <span>vs {t.partnerLabel}</span>
          <span className="ml-auto rounded-[4px] bg-surface-2 px-1.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider text-ink">{grade(r, t.large)}</span>
        </p>
      </div>
    </li>
  );
}

export function ColorSection() {
  return (
    <div className="space-y-14">
      <div>
        <h3 className="sh-title text-2xl text-ink">Semantic roles</h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{SEMANTIC.map((t) => <Swatch key={t.token} t={t} />)}</ul>
      </div>
      <div>
        <h3 className="sh-title text-2xl text-ink">Tile and district extras</h3>
        <p className="mt-2 max-w-2xl text-ink-muted">Pulled from the tiles themselves. They colour pattern, district dots and era marks. Text colour is chosen per swatch, since turmeric needs ink and the darker colours take porcelain.</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{EXTRAS.map((t) => <Swatch key={t.token} t={t} />)}</ul>
        <p className="mt-4 text-sm text-ink-muted">
          Tile ceramics (<span className="font-semibold text-ink">rose {TILE.rose}</span>, blush {TILE.blush}, mist {TILE.mist}) live only inside the drawn tile artwork. Body text never sits on a tile.
        </p>
      </div>
      <div>
        <h3 className="sh-title text-2xl text-ink">District colours</h3>
        <p className="mt-2 max-w-2xl text-ink-muted">Each district owns one colour, shown as a dot beside its name. The dot carries a thin ink ring and is always paired with the district&rsquo;s name, so colour is never the only signal.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DISTRICTS.map((d) => (
            <li key={d.id} className="flex items-center gap-4 rounded-card border border-line bg-surface p-4">
              <span aria-hidden className="size-10 shrink-0 rounded-full ring-1 ring-ink/30" style={{ background: d.color }} />
              <div>
                <p className="sh-title text-lg text-ink">{d.name}</p>
                <p className="text-sm text-ink-muted">{d.colorName} · {d.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="sh-title text-2xl text-ink">Where the accent goes</h3>
        <p className="mt-2 max-w-2xl text-ink-muted">Coral is reserved for the single most important action on a screen and the things that directly echo it. Everything else that needs emphasis is jade.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-card border border-brand bg-surface p-5">
            <p className="sh-label flex items-center gap-2 text-brand"><Check size={16} strokeWidth={1.75} aria-hidden /> Do</p>
            <ul className="mt-4 space-y-4">
              <li className="flex flex-wrap items-center gap-3"><Button>Add to trail</Button><span className="text-sm text-ink-muted">The primary action</span></li>
              <li className="flex flex-wrap items-center gap-3"><span className="inline-flex h-5 min-w-5 items-center justify-center rounded-pill bg-accent px-1.5 text-xs font-bold text-on-accent">4</span><span className="text-sm text-ink-muted">The count on the list that action fills</span></li>
              <li className="flex flex-wrap items-center gap-3"><Button>Start your trail</Button><span className="text-sm text-ink-muted">The one action in the hero</span></li>
            </ul>
          </div>
          <div className="rounded-card border border-danger bg-surface p-5">
            <p className="sh-label flex items-center gap-2 text-danger"><X size={16} strokeWidth={1.75} aria-hidden /> Don&rsquo;t</p>
            <ul className="mt-4 space-y-4">
              <li className="flex flex-wrap items-center gap-3"><FilterChip selected>Chinatown</FilterChip><span className="text-sm text-ink-muted">Selected chips are jade, not coral</span></li>
              <li className="flex flex-wrap items-center gap-3"><TileBullet size={16} className="text-brand" /><span className="text-sm text-ink-muted">Icons and bullets are jade, not coral</span></li>
              <li className="flex flex-wrap items-center gap-3"><span className="sh-title text-xl text-brand">A heading</span><span className="text-sm text-ink-muted">Headings and links are ink or jade</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
