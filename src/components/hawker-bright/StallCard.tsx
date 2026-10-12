import { Check, Leaf, MapPin } from "lucide-react";
import type { Stall } from "@/data/hawker-bright/stalls";
import { CategoryTag, ChilliMeter, PriceTier, StallBadge } from "./Badges";
import { Photo } from "./Photo";
import { cn, type ForceState } from "./types";

export function StallCard({
  stall,
  onOpen,
  onList,
  forceState,
  className,
  priority,
}: {
  stall: Stall;
  onOpen?: () => void;
  onList?: boolean;
  forceState?: ForceState;
  className?: string;
  priority?: boolean;
}) {
  const disabled = forceState === "disabled";
  const listed = onList || forceState === "selected";
  return (
    <button
      type="button"
      onClick={onOpen}
      data-force={forceState}
      disabled={disabled}
      aria-haspopup="dialog"
      aria-label={`${stall.dish} at ${stall.centre}. Open stall details.${listed ? " On your makan list." : ""}`}
      className={cn("hb-card hb-card-link hb-lift hb-focusable group flex h-full flex-col !p-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:grayscale", className)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b-2 border-ink" style={{ background: "var(--surface-2)" }}>
        <Photo file={stall.photo} alt="" sizes="(min-width:1024px) 380px, (min-width:640px) 45vw, 92vw" focus={stall.focus} priority={priority} className="transition-transform duration-300 group-hover:scale-105 group-data-[force=hover]:scale-105" />
        <StallBadge no={stall.unit} className="absolute left-3 top-3 shadow-[2px_2px_0_var(--ink)]" />
        {listed ? (
          <span className="hb-tag absolute right-3 top-3 !bg-surface shadow-[2px_2px_0_var(--ink)]">
            <Check size={14} strokeWidth={3} aria-hidden /> On list
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-center justify-between gap-2">
          <CategoryTag category={stall.category} />
          <PriceTier tier={stall.tier} />
        </div>
        <h3 className="hb-title !text-[1.55rem] uppercase !leading-[0.98]">{stall.dish}</h3>
        <p className="hb-caption !text-[0.875rem] text-ink-muted">{stall.name}</p>
        <p className="mt-auto flex items-center gap-1.5 pt-1 text-[0.9375rem] font-semibold">
          <MapPin size={16} strokeWidth={2.5} aria-hidden className="flex-none" />
          <span className="truncate">{stall.centre}</span>
        </p>
        <div className="flex items-center gap-2 border-t-2 border-dashed border-line pt-3">
          <ChilliMeter level={stall.spice} />
          <span className="flex-1" />
          {stall.halal ? <span className="hb-mono rounded-md border-2 border-ink bg-hdb-mint px-1.5 py-1 text-[0.6875rem] [background:var(--hdb-mint)]">HALAL</span> : null}
          {stall.veg ? (
            <span className="hb-mono inline-flex items-center gap-1 rounded-md border-2 border-ink px-1.5 py-1 text-[0.6875rem] [background:var(--hdb-mint)]">
              <Leaf size={12} strokeWidth={2.75} aria-hidden /> VEG
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
}
