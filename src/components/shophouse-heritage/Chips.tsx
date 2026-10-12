"use client";
import { useRef } from "react";
import { cx, type ForceState } from "./cx";

export function DistrictDot({ color, size = 10, className = "" }: { color: string; size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cx("inline-block shrink-0 rounded-full ring-1 ring-ink/30", className)}
      style={{ width: size, height: size, background: color }}
    />
  );
}

type ChipProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  selected?: boolean;
  dot?: string;
  count?: number;
  forceState?: ForceState;
  onToggle?: () => void;
};

/** Filter chip: a toggle button (aria-pressed). Selected is jade, never coral. */
export function FilterChip({ selected, dot, count, forceState, onToggle, disabled, children, className, ...rest }: ChipProps) {
  const on = selected || forceState === "selected";
  return (
    <button
      type="button"
      aria-pressed={on}
      data-force={forceState}
      disabled={disabled || forceState === "disabled"}
      onClick={onToggle}
      {...rest}
      className={cx(
        "inline-flex min-h-11 items-center gap-2 rounded-pill border px-4 text-sm font-semibold transition-[background-color,color,border-color,transform] duration-200 ease-out active:translate-y-px data-[force=active]:translate-y-px disabled:cursor-not-allowed disabled:border-line disabled:bg-surface-2 disabled:text-ink-muted data-[force=disabled]:cursor-not-allowed data-[force=disabled]:border-line data-[force=disabled]:bg-surface-2 data-[force=disabled]:text-ink-muted md:min-h-9 md:px-3.5",
        on
          ? "border-brand bg-brand text-on-brand hover:bg-(--jade-deep) data-[force=hover]:bg-(--jade-deep)"
          : "border-ink-subtle bg-surface text-ink hover:border-ink hover:bg-surface-2 data-[force=hover]:border-ink data-[force=hover]:bg-surface-2 active:bg-line data-[force=active]:bg-line",
        className,
      )}
    >
      {dot && <DistrictDot color={dot} className={on ? "ring-on-brand/70" : ""} />}
      {children}
      {typeof count === "number" && (
        <span className={cx("text-xs font-medium tabular-nums", on ? "text-on-brand/80" : "text-ink-muted")}>{count}</span>
      )}
    </button>
  );
}

export type SegmentOption<T extends string> = { value: T; label: string; sub?: string };

/** Segmented control: a radiogroup with roving focus and arrow keys. */
export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
  forceStates,
  className,
}: {
  label: string;
  value: T;
  options: SegmentOption<T>[];
  onChange?: (v: T) => void;
  /** per-option forced state for the system page */
  forceStates?: Partial<Record<T, ForceState>>;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (dir: number) => {
    const i = options.findIndex((o) => o.value === value);
    const next = options[(i + dir + options.length) % options.length];
    onChange?.(next.value);
    requestAnimationFrame(() => ref.current?.querySelector<HTMLElement>(`[data-v="${next.value}"]`)?.focus());
  };
  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={label}
      className={cx("inline-flex max-w-full rounded-control border border-ink-subtle bg-surface p-0.5", className)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); move(1); }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      }}
    >
      {options.map((o) => {
        const f = forceStates?.[o.value];
        const on = o.value === value || f === "selected";
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            data-v={o.value}
            data-force={f}
            disabled={f === "disabled"}
            onClick={() => onChange?.(o.value)}
            className={cx(
              "min-h-11 flex-1 whitespace-nowrap rounded-[4px] px-3.5 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:text-ink-muted data-[force=disabled]:cursor-not-allowed data-[force=disabled]:text-ink-muted md:min-h-9",
              on
                ? "bg-brand text-on-brand"
                : "text-ink hover:bg-surface-2 data-[force=hover]:bg-surface-2 active:bg-line data-[force=active]:bg-line",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
