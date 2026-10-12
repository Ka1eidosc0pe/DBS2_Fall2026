"use client";
import { ArrowDown, ArrowUp, Printer, Route as RouteIcon, Trash2 } from "lucide-react";
import { Button, IconButton } from "./Button";
import { DistrictDot } from "./Chips";
import { EmptyState } from "./Feedback";
import { districtOf, minutesLabel, type Landmark } from "@/data/shophouse-heritage/heritage";
import { cx, type ForceState } from "./cx";

export function TrailRow({
  landmark,
  index,
  total,
  onMove,
  onRemove,
  forceState,
}: {
  landmark: Landmark;
  index: number;
  total: number;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
  forceState?: ForceState;
}) {
  const d = districtOf(landmark.district);
  return (
    <li className="sh-fade-up flex items-center gap-2 rounded-card border border-line bg-surface p-2.5 pl-3.5">
      <span aria-hidden className="sh-year w-7 shrink-0 text-center text-2xl leading-none text-brand">{index + 1}</span>
      <div className="min-w-0 flex-1">
        <p className="sh-title truncate text-[1.0625rem] leading-tight text-ink">{landmark.name}</p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted">
          <DistrictDot color={d.color} size={8} />
          {d.name} · {minutesLabel(landmark.minutes)}
        </p>
      </div>
      <div className="flex shrink-0 items-center">
        <IconButton label={`Move ${landmark.name} up`} variant="ghost" disabled={index === 0} onClick={() => onMove(-1)} forceState={forceState}>
          <ArrowUp size={18} strokeWidth={1.5} aria-hidden />
        </IconButton>
        <IconButton label={`Move ${landmark.name} down`} variant="ghost" disabled={index === total - 1} onClick={() => onMove(1)} forceState={forceState}>
          <ArrowDown size={18} strokeWidth={1.5} aria-hidden />
        </IconButton>
        <IconButton label={`Remove ${landmark.name}`} variant="ghost" onClick={onRemove} className="hover:text-danger" forceState={forceState}>
          <Trash2 size={18} strokeWidth={1.5} aria-hidden />
        </IconButton>
      </div>
    </li>
  );
}

export function routeSummary(stops: Landmark[]) {
  const mins = stops.reduce((n, s) => n + s.minutes, 0);
  const hours = Math.max(1, Math.round(mins / 30) / 2);
  const label = hours === 1 ? "1 hour" : `${hours} hours`;
  return { mins, text: `${stops.length} stops, about ${label}` };
}

/** The list the primary action fills: ordered stops, total time, and the Print my route confirm. */
export function TrailList({
  stops,
  onMove,
  onRemove,
  onClear,
  onPrint,
  printing,
  printed,
  onBrowse,
  className,
}: {
  stops: Landmark[];
  onMove: (i: number, dir: -1 | 1) => void;
  onRemove: (id: string) => void;
  onClear?: () => void;
  onPrint: () => void;
  printing?: boolean;
  printed?: string | null;
  onBrowse?: () => void;
  className?: string;
}) {
  const total = stops.reduce((n, s) => n + s.minutes, 0);
  const can = stops.length >= 2;
  if (!stops.length)
    return (
      <div className={className}>
        <EmptyState
          title="Your trail is empty."
          action={onBrowse && <Button variant="secondary" onClick={onBrowse}>Browse landmarks</Button>}
        >
          Add a stop from any landmark and it will wait here, in the order you choose.
        </EmptyState>
      </div>
    );
  return (
    <div className={cx("flex flex-col", className)}>
      <ol className="space-y-2.5">
        {stops.map((s, i) => (
          <TrailRow key={s.id} landmark={s} index={i} total={stops.length} onMove={(d) => onMove(i, d)} onRemove={() => onRemove(s.id)} />
        ))}
      </ol>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
        <span className="inline-flex items-center gap-2 text-ink-muted">
          <RouteIcon size={16} strokeWidth={1.5} aria-hidden />
          Time on the ground
        </span>
        <span className="sh-title text-lg text-ink">{minutesLabel(total)}</span>
      </div>
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <Button variant="secondary" className="flex-1" onClick={onPrint} loading={printing} disabled={!can} icon={<Printer size={16} strokeWidth={1.5} aria-hidden />}>
          {printing ? "Preparing" : "Print my route"}
        </Button>
        {onClear && (
          <Button variant="ghost" onClick={onClear} disabled={printing}>
            Clear trail
          </Button>
        )}
      </div>
      {!can && <p className="mt-2 text-sm text-ink-muted">Add at least two stops to print a route.</p>}
      {printed && (
        <p role="status" className="sh-fade-up mt-3 rounded-card border border-brand bg-brand/5 px-3.5 py-3 text-[0.9375rem] font-medium text-ink">
          {printed}
        </p>
      )}
    </div>
  );
}
