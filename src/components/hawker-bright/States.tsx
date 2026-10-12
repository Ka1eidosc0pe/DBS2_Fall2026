import type { ReactNode } from "react";
import { AlertTriangle, RefreshCw, SearchX, ShoppingBasket, PartyPopper } from "lucide-react";
import { Button } from "./Button";
import { cn } from "./types";
import { ALERT_STYLE } from "./Overlay";
import { mosaic } from "./patterns";

export function Alert({ kind = "info", title, children, className }: { kind?: "success" | "info" | "warning" | "error"; title?: string; children: ReactNode; className?: string }) {
  const { bg, Icon } = ALERT_STYLE[kind];
  return (
    <div role={kind === "error" ? "alert" : "status"} className={cn("hb-card flex gap-3 !overflow-visible p-4", className)} style={{ background: bg }}>
      <Icon size={24} strokeWidth={2.5} aria-hidden className="mt-0.5 flex-none" />
      <div>
        {title ? <p className="hb-title !text-xl">{title}</p> : null}
        <p className="text-[0.9375rem] font-semibold leading-snug">{children}</p>
      </div>
    </div>
  );
}

/** Shared frame for empty / error / success / no-results states. */
function StateFrame({ icon, tone, title, children, action, className }: { icon: ReactNode; tone: string; title: string; children: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <div className={cn("hb-card flex flex-col items-center gap-3 px-6 py-10 text-center", className)} style={{ background: "var(--surface)" }}>
      <div className="grid h-20 w-20 place-items-center rounded-full border-2 border-ink shadow-card" style={{ background: tone }}>
        {icon}
      </div>
      <h3 className="hb-headline !text-[2rem] sm:!text-[2.5rem]">{title}</h3>
      <p className="hb-body max-w-md text-ink-muted">{children}</p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

export function NoResults({ onClear, className }: { onClear?: () => void; className?: string }) {
  return (
    <StateFrame
      className={className}
      tone="var(--hdb-peach)"
      icon={<SearchX size={38} strokeWidth={2.5} aria-hidden />}
      title="Wah, nothing leh."
      action={
        <Button variant="secondary" onClick={onClear}>
          Clear filters
        </Button>
      }
    >
      No stalls match those filters. Try clearing a filter or searching for a different dish.
    </StateFrame>
  );
}

export function EmptyPlate({ className, action }: { className?: string; action?: ReactNode }) {
  return (
    <StateFrame className={cn("!border-dashed !shadow-none", className)} tone="var(--hdb-butter)" icon={<ShoppingBasket size={38} strokeWidth={2.5} aria-hidden />} title="Your plate is empty" action={action}>
      Open any stall and tap Add to makan list. Add two or more and we will plan a food crawl.
    </StateFrame>
  );
}

export function ErrorState({ onRetry, retrying, className }: { onRetry?: () => void; retrying?: boolean; className?: string }) {
  return (
    <StateFrame
      className={className}
      tone="var(--hdb-peach)"
      icon={<AlertTriangle size={38} strokeWidth={2.5} aria-hidden />}
      title="Aiyo, stall closed"
      action={
        <Button variant="secondary" onClick={onRetry} loading={retrying}>
          <RefreshCw size={18} strokeWidth={2.5} aria-hidden /> Try again
        </Button>
      }
    >
      We could not load the stalls just now. Check your connection and try again.
    </StateFrame>
  );
}

export function SuccessState({ title, children, action, className }: { title: string; children: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <StateFrame className={className} tone="var(--hdb-mint)" icon={<PartyPopper size={38} strokeWidth={2.5} aria-hidden />} title={title} action={action}>
      {children}
    </StateFrame>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("hb-skel", className)} />;
}

export function StallCardSkeleton() {
  return (
    <div className="hb-card" aria-hidden>
      <Skeleton className="aspect-[4/3] !rounded-none" />
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-2">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-7 w-16" />
        </div>
        <Skeleton className="h-7 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

/** Mosaic strip used as a decorative divider. */
export function MosaicStrip({ className }: { className?: string }) {
  return <div aria-hidden className={cn("h-7 border-y-2 border-ink", className)} style={mosaic} />;
}
