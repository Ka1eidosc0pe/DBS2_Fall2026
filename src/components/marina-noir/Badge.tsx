import { cx } from "./cx";

type Tone = "neutral" | "brand" | "success" | "warning" | "danger" | "info";

const dot: Record<Exclude<Tone, "neutral" | "brand">, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
};

/** Tag: hairline for kinds, oxblood for emphasis, a dot for status. */
export function Badge({ tone = "neutral", className, children }: { tone?: Tone; className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cx(
        "mn-label inline-flex min-h-6 items-center gap-2 border px-2.5 py-0.5 text-[0.6875rem]",
        tone === "brand" ? "border-brand bg-brand text-on-brand" : "border-(--control-line) text-ink-muted",
        className,
      )}
    >
      {tone !== "neutral" && tone !== "brand" && <span aria-hidden className={cx("size-1.5 rotate-45", dot[tone])} />}
      {children}
    </span>
  );
}

/** The one gold badge: it counts what the primary action fills. */
export function CountBadge({ count, label, className }: { count: number; label: string; className?: string }) {
  return (
    <span
      role="status"
      aria-label={`${count} ${label}`}
      className={cx(
        "inline-grid h-5 min-w-5 place-items-center bg-accent px-1.5 text-[0.6875rem] leading-none font-medium text-on-accent tabular-nums",
        className,
      )}
    >
      {count}
    </span>
  );
}
