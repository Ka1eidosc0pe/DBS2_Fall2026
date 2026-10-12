"use client";
import { Check, Clock, Plus } from "lucide-react";
import { Button } from "./Button";
import { ArchFrame } from "./Arch";
import { Badge } from "./Feedback";
import { DistrictDot } from "./Chips";
import { TileBullet } from "./patterns";
import { districtOf, eraOf, minutesLabel, typeOf, type Landmark } from "@/data/shophouse-heritage/heritage";
import { cx, type ForceState } from "./cx";

export function DistrictLabel({ id, className }: { id: Landmark["district"]; className?: string }) {
  const d = districtOf(id);
  return (
    <span className={cx("sh-label inline-flex items-center gap-2 text-ink", className)}>
      <DistrictDot color={d.color} />
      {d.name}
    </span>
  );
}

/** A landmark in a catalogue grid. The card opens the detail drawer; the add button is secondary. */
export function LandmarkCard({
  landmark,
  added,
  onOpen,
  onToggle,
  featured,
  forceState,
  index = 0,
}: {
  landmark: Landmark;
  added?: boolean;
  onOpen: (l: Landmark, el: HTMLElement) => void;
  onToggle: (l: Landmark) => void;
  featured?: boolean;
  forceState?: ForceState;
  index?: number;
}) {
  const era = eraOf(landmark.era);
  const t = typeOf(landmark.type);
  return (
    <article
      data-force={forceState}
      style={{ animationDelay: `${Math.min(index, 6) * 45}ms` }}
      className="sh-fade-up group/card relative flex flex-col rounded-card border border-line bg-surface p-3 shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-ink-subtle hover:shadow-raised data-[force=hover]:-translate-y-0.5 data-[force=hover]:border-ink-subtle data-[force=hover]:shadow-raised"
    >
      <button
        type="button"
        onClick={(e) => onOpen(landmark, e.currentTarget)}
        aria-label={`Read the story of ${landmark.name}`}
        className="block w-full rounded-card text-left"
      >
        <ArchFrame
          src={landmark.image}
          alt={landmark.alt}
          sizes="(min-width: 1280px) 380px, (min-width: 768px) 45vw, 90vw"
          ratio={featured ? "4 / 4.6" : "4 / 3.4"}
          arch={featured}
          position={landmark.position}
          credit={false}
          imgClassName="transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
        />
      </button>
      <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-4">
        <div className="flex items-center justify-between gap-3">
          <DistrictLabel id={landmark.district} />
          <span className="sh-year text-lg leading-none text-ink-muted">{landmark.yearLabel}</span>
        </div>
        <h3 className="sh-title mt-2.5 text-[1.375rem] leading-[1.2] text-ink">{landmark.name}</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{landmark.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge>{t.label}</Badge>
          <Badge tone="outline">{era.short}</Badge>
          <span className="ml-auto inline-flex items-center gap-1.5 text-sm text-ink-muted">
            <Clock size={15} strokeWidth={1.5} aria-hidden />
            {minutesLabel(landmark.minutes)}
          </span>
        </div>
        <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
          <Button
            variant="secondary"
            size="sm"
            aria-pressed={added}
            onClick={() => onToggle(landmark)}
            icon={added ? <Check size={16} strokeWidth={1.75} aria-hidden /> : <Plus size={16} strokeWidth={1.75} aria-hidden />}
            className={cx("w-full", added && "bg-brand/10")}
          >
            {added ? "On your trail" : "Add to trail"}
          </Button>
        </div>
      </div>
    </article>
  );
}

/** Vertical mini-timeline used inside the drawer. */
export function MiniTimeline({ items }: { items: { year: string; text: string }[] }) {
  return (
    <ol className="relative ml-1">
      <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-brand/40" />
      {items.map((it) => (
        <li key={it.year + it.text} className="relative grid grid-cols-[5.5rem_1fr] gap-3 py-2 pl-6">
          <span aria-hidden className="absolute left-0 top-[1.05rem] size-[11px] rotate-45 border border-brand bg-surface" />
          <span className="sh-year text-lg leading-tight text-ink">{it.year}</span>
          <span className="text-[0.9375rem] leading-snug text-ink-muted">{it.text}</span>
        </li>
      ))}
    </ol>
  );
}

/** Body of the landmark drawer. The Add to trail action is passed in as `action` so it can own state. */
export function LandmarkDetail({ landmark }: { landmark: Landmark }) {
  const era = eraOf(landmark.era);
  return (
    <div className="px-5 pb-8 pt-6 md:px-7">
      <div className="mx-auto w-full max-w-sm">
        <ArchFrame src={landmark.image} alt={landmark.alt} sizes="(min-width: 768px) 24rem, 90vw" ratio="4 / 4.4" arch position={landmark.position} reveal />
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <DistrictLabel id={landmark.district} />
        <span className="sh-label text-ink-muted">{era.label} · {era.span}</span>
      </div>
      <p className="sh-year mt-3 text-[2rem] leading-none text-ink">{landmark.yearLabel}</p>
      <p className="mt-4 text-[1.0625rem] leading-[1.7] text-ink">{landmark.story}</p>
      <h3 className="sh-label mt-8 text-brand">Look for</h3>
      <ul className="mt-3 space-y-2.5">
        {landmark.lookFor.map((l) => (
          <li key={l} className="flex gap-3 text-[0.9375rem] leading-snug text-ink">
            <TileBullet size={16} className="mt-0.5 shrink-0 text-brand" />
            {l}
          </li>
        ))}
      </ul>
      <h3 className="sh-label mt-8 text-brand">Key dates</h3>
      <div className="mt-2">
        <MiniTimeline items={landmark.timeline} />
      </div>
      <p className="mt-6 inline-flex items-center gap-2 text-sm text-ink-muted">
        <Clock size={15} strokeWidth={1.5} aria-hidden />
        Allow about {minutesLabel(landmark.minutes)}
      </p>
    </div>
  );
}
