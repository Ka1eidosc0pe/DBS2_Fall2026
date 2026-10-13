import { Check } from "lucide-react";
import { cx, FOCUS, T, type ForceState } from "./cx";

/** The one pill in the system: a hairline filter chip. Selected is oxblood, never gold. */
export function FilterChip({
  selected,
  count,
  forceState,
  disabled,
  className,
  children,
  ...rest
}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
  selected?: boolean;
  count?: number;
  forceState?: ForceState;
  className?: string;
}) {
  const isSelected = selected || forceState === "selected";
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      data-force={forceState}
      disabled={disabled || forceState === "disabled"}
      {...rest}
      className={cx(
        "mn-label inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-pill border px-5 whitespace-nowrap",
        "border-(--control-line) bg-transparent text-ink-muted",
        "hover:border-ink hover:text-ink data-[force=hover]:border-ink data-[force=hover]:text-ink",
        "active:bg-ink/[0.1] data-[force=active]:bg-ink/[0.1]",
        "aria-pressed:border-brand aria-pressed:bg-brand aria-pressed:text-on-brand aria-pressed:hover:border-ink",
        "disabled:cursor-not-allowed disabled:border-line disabled:bg-transparent disabled:text-ink-subtle",
        T,
        FOCUS,
        className,
      )}
    >
      {isSelected && <Check aria-hidden strokeWidth={1.5} className="-ml-1 size-3.5" />}
      {children}
      {count !== undefined && <span className="tabular-nums opacity-70">{count}</span>}
    </button>
  );
}

/** Segmented control. The active segment carries a lacquer rule. */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  force,
  className,
}: {
  label: string;
  options: { value: T; label: string; disabled?: boolean }[];
  value: T;
  onChange?: (v: T) => void;
  force?: { value: T; state: ForceState };
  className?: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className={cx("inline-flex border border-(--control-line)", className)}>
      {options.map((o) => {
        const f = force?.value === o.value ? force.state : undefined;
        const active = o.value === value || f === "selected";
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            data-force={f}
            disabled={o.disabled || f === "disabled"}
            onClick={() => onChange?.(o.value)}
            className={cx(
              "mn-label relative min-h-11 cursor-pointer px-5 text-ink-muted",
              "border-r border-line last:border-r-0",
              "hover:bg-ink/[0.06] hover:text-ink data-[force=hover]:bg-ink/[0.06] data-[force=hover]:text-ink",
              "active:bg-ink/[0.12] data-[force=active]:bg-ink/[0.12]",
              "aria-checked:bg-surface-2 aria-checked:text-ink",
              "after:absolute after:inset-x-0 after:top-0 after:h-0.5 after:scale-x-0 after:bg-(--lacquer) after:transition-transform after:duration-(--dur-2) after:ease-(--ease) aria-checked:after:scale-x-100",
              "disabled:cursor-not-allowed disabled:text-ink-subtle disabled:hover:bg-transparent",
              T,
              "focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-focus data-[force=focus]:outline-2 data-[force=focus]:outline-offset-[-3px] data-[force=focus]:outline-focus",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
