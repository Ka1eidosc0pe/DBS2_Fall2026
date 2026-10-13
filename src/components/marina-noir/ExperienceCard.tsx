"use client";

import { ArrowRight } from "lucide-react";
import type { Experience } from "@/data/marina-noir/experiences";
import { Badge } from "./Badge";
import { CornerBrackets } from "./Ornament";
import { Photo } from "./Photo";
import { cx, T, type ForceState } from "./cx";

/**
 * The collection card. The whole card opens the detail drawer through the stretched button.
 * `feature` adds Deco corner brackets and a wider crop.
 */
export function ExperienceCard({
  item,
  onOpen,
  inEvening,
  feature,
  imageClass = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority,
  forceState,
  className,
}: {
  item: Experience;
  onOpen?: (item: Experience, trigger: HTMLElement) => void;
  inEvening?: boolean;
  feature?: boolean;
  imageClass?: string;
  sizes?: string;
  priority?: boolean;
  forceState?: ForceState;
  className?: string;
}) {
  const disabled = forceState === "disabled";
  return (
    <article
      data-force={forceState}
      className={cx(
        "group relative flex flex-col",
        disabled && "opacity-45",
        className,
      )}
    >
      <div className={cx("mn-zoom relative w-full overflow-hidden bg-surface-2", imageClass)} data-force={forceState === "hover" ? "hover" : undefined}>
        <Photo src={item.image} alt={item.imageAlt} sizes={sizes} priority={priority} position={item.position} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/75 via-transparent to-bg/30" />
        {feature && <CornerBrackets inset={14} />}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 md:p-5">
          <span className="mn-label text-ink drop-shadow-[0_1px_8px_rgb(0_0_0/0.6)]">{item.kind}</span>
          {inEvening && <Badge tone="brand">In your evening</Badge>}
        </div>
      </div>

      <div
        className={cx(
          "relative mt-5 flex flex-1 flex-col border-t pt-5",
          T,
          "border-line-strong group-hover:border-ink-muted group-data-[force=hover]:border-ink-muted",
          inEvening && "border-(--brass)",
        )}
      >
        <p className="mn-label flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-muted">
          <span>{item.neighborhood}</span>
          <span aria-hidden className="size-1 rotate-45 bg-(--control-line)" />
          <span aria-label={`Price tier ${item.tier.length} of 4`}>{item.tier}</span>
        </p>
        <h3 className={cx("mn-title mt-3", feature && "lg:text-[2.25rem] lg:leading-[1.1]")}>
          {item.name}
        </h3>
        <p className="mn-caption mt-1.5 text-ink-subtle">{item.place}</p>
        <p className="mn-body mt-3 max-w-[46ch] text-ink-muted">{item.tagline}</p>

        <button
          type="button"
          disabled={disabled}
          onClick={(e) => onOpen?.(item, e.currentTarget)}
          aria-label={`${item.name}: view details`}
          className={cx(
            "mn-label mt-6 inline-flex w-fit min-h-11 cursor-pointer items-center gap-3 text-ink",
            "after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-focus",
            "data-[force=focus]:after:outline-2 data-[force=focus]:after:outline-offset-4 data-[force=focus]:after:outline-focus",
            "disabled:cursor-not-allowed disabled:text-ink-subtle",
          )}
          data-force={forceState === "focus" ? "focus" : undefined}
        >
          Details
          <ArrowRight
            aria-hidden
            strokeWidth={1}
            className="size-[18px] transition-transform duration-(--dur-2) ease-(--ease) group-hover:translate-x-1.5 group-data-[force=hover]:translate-x-1.5"
          />
        </button>
      </div>
    </article>
  );
}
