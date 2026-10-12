"use client";
import { CITY_TIMELINE, ERAS, type EraId } from "@/data/shophouse-heritage/heritage";
import { cx, type ForceState } from "./cx";

/**
 * The city timeline band. Horizontal scroll with snap on mobile, a six-column grid on desktop.
 * Each date is a toggle that filters landmarks by its era.
 */
export function CityTimeline({
  era,
  onEra,
  forceStates,
  compact,
}: {
  era: EraId | "all";
  onEra: (e: EraId | "all") => void;
  forceStates?: Record<string, ForceState>;
  /** show only the first date, for the state matrix */
  compact?: boolean;
}) {
  return (
    <div className="@container relative">
      <ol className={cx(compact ? "block" : "-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 @xl:mx-0 @xl:grid @xl:grid-cols-3 @xl:gap-4 @xl:overflow-visible @xl:px-0 @xl:pb-0 @5xl:grid-cols-6 [scrollbar-width:thin]")}>
        {(compact ? CITY_TIMELINE.slice(0, 1) : CITY_TIMELINE).map((t) => {
          const f = forceStates?.[t.year];
          const on = era === t.era || f === "selected";
          const e = ERAS.find((x) => x.id === t.era)!;
          return (
            <li key={t.year} className="w-[15.5rem] shrink-0 snap-start @xl:w-auto">
              <button
                type="button"
                aria-pressed={on}
                data-force={f}
                onClick={() => onEra(on && era === t.era ? "all" : t.era)}
                className={cx(
                  "group relative flex h-full w-full flex-col rounded-card border p-4 pt-5 text-left transition-[background-color,border-color,transform] duration-200 ease-out active:translate-y-px data-[force=active]:translate-y-px",
                  on
                    ? "border-brand bg-brand text-on-brand"
                    : "border-line bg-surface hover:border-ink-subtle hover:bg-surface-2 data-[force=hover]:border-ink-subtle data-[force=hover]:bg-surface-2",
                )}
              >
                <span aria-hidden className={cx("absolute -top-[7px] left-5 size-3.5 rotate-45 border-2", on ? "border-brand bg-surface" : "border-brand bg-bg")} />
                <span className="sh-year text-[2.5rem] leading-none">{t.year}</span>
                <span className="sh-title mt-3 text-lg leading-tight">{t.title}</span>
                <span className={cx("mt-1.5 text-sm leading-snug", on ? "text-on-brand/85" : "text-ink-muted")}>{t.text}</span>
                <span className={cx("sh-label mt-auto pt-4", on ? "text-on-brand/85" : "text-brand")}>{e.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <span aria-hidden className="pointer-events-none absolute inset-x-0 -top-px hidden h-px bg-brand @xl:block" />
    </div>
  );
}
