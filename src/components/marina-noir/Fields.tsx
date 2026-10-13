"use client";

import { AlertCircle, Check, ChevronDown, Minus, Plus, Search, X } from "lucide-react";
import { useId } from "react";
import { cx, FOCUS, T, type ForceState } from "./cx";

const inputBase = cx(
  "w-full min-h-12 border border-(--control-line) bg-transparent px-4 text-[1rem] text-ink placeholder:text-ink-subtle",
  "hover:border-ink-muted data-[force=hover]:border-ink-muted",
  "focus-visible:border-ink data-[force=focus]:border-ink",
  "aria-invalid:border-danger data-[force=error]:border-danger",
  "disabled:cursor-not-allowed disabled:border-line disabled:bg-surface disabled:text-ink-subtle disabled:placeholder:text-ink-subtle/70",
  T,
  FOCUS,
);

export function Field({
  label,
  hint,
  error,
  htmlFor,
  optional,
  children,
  className,
}: {
  label: string;
  hint?: string;
  error?: string | null;
  htmlFor?: string;
  optional?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex flex-col gap-2.5", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={htmlFor} className="mn-label text-ink-muted">
          {label}
        </label>
        {optional && <span className="mn-caption text-ink-subtle">Optional</span>}
      </div>
      {children}
      {hint && !error && <p className="mn-caption text-ink-subtle">{hint}</p>}
      {error && <FieldError id={htmlFor ? `${htmlFor}-error` : undefined}>{error}</FieldError>}
    </div>
  );
}

export function FieldError({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} role="alert" className="mn-caption flex items-start gap-2 text-danger">
      <AlertCircle aria-hidden strokeWidth={1.25} className="mt-px size-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> & { forceState?: ForceState; className?: string };

export function TextInput({ forceState, className, ...rest }: InputProps) {
  return (
    <input
      data-force={forceState}
      disabled={rest.disabled || forceState === "disabled"}
      aria-invalid={forceState === "error" ? true : rest["aria-invalid"]}
      {...rest}
      className={cx(inputBase, className)}
    />
  );
}

export function SearchInput({
  forceState,
  value,
  onClear,
  className,
  ...rest
}: InputProps & { onClear?: () => void }) {
  const hasValue = typeof value === "string" && value.length > 0;
  return (
    <div className={cx("relative", className)}>
      <Search aria-hidden strokeWidth={1} className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-ink-muted" />
      <input
        type="search"
        data-force={forceState}
        disabled={rest.disabled || forceState === "disabled"}
        value={value}
        {...rest}
        className={cx(inputBase, "pr-12 pl-11 [&::-webkit-search-cancel-button]:hidden")}
      />
      {hasValue && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className={cx("absolute top-1/2 right-0 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center text-ink-muted hover:text-ink", T, FOCUS)}
        >
          <X aria-hidden strokeWidth={1.25} className="size-4" />
        </button>
      )}
    </div>
  );
}

export function Select({
  forceState,
  className,
  children,
  ...rest
}: Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> & { forceState?: ForceState; className?: string }) {
  return (
    <div className={cx("relative", className)}>
      <select
        data-force={forceState}
        disabled={rest.disabled || forceState === "disabled"}
        aria-invalid={forceState === "error" ? true : rest["aria-invalid"]}
        {...rest}
        className={cx(inputBase, "cursor-pointer appearance-none pr-11 [&>option]:bg-surface-2 [&>option]:text-ink")}
      >
        {children}
      </select>
      <ChevronDown aria-hidden strokeWidth={1} className="pointer-events-none absolute top-1/2 right-4 size-[18px] -translate-y-1/2 text-ink-muted" />
    </div>
  );
}

export function Textarea({
  forceState,
  className,
  ...rest
}: Omit<React.ComponentProps<"textarea">, "className"> & { forceState?: ForceState; className?: string }) {
  return (
    <textarea
      data-force={forceState}
      disabled={rest.disabled || forceState === "disabled"}
      aria-invalid={forceState === "error" ? true : rest["aria-invalid"]}
      rows={4}
      {...rest}
      className={cx(inputBase, "min-h-28 resize-y py-3 leading-relaxed", className)}
    />
  );
}

/* ---------- Checkbox and radio ---------- */

const optionLabel = "group relative flex min-h-11 cursor-pointer items-center gap-3.5 py-1 text-ink has-[:disabled]:cursor-not-allowed has-[:disabled]:text-ink-subtle";

export function Checkbox({
  label,
  forceState,
  className,
  ...rest
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "className"> & { label: string; forceState?: ForceState; className?: string }) {
  return (
    <label data-force={forceState} className={cx(optionLabel, className)}>
      <input
        type="checkbox"
        className="peer sr-only"
        disabled={rest.disabled || forceState === "disabled"}
        {...rest}
        {...(forceState === "selected" ? { checked: true, readOnly: true, onChange: () => {} } : {})}
      />
      <span
        aria-hidden
        className={cx(
          "grid size-5 shrink-0 place-items-center border border-(--control-line) text-on-brand",
          T,
          "group-hover:border-ink group-data-[force=hover]:border-ink",
          "peer-checked:border-brand peer-checked:bg-brand group-data-[force=selected]:border-brand group-data-[force=selected]:bg-brand",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus group-data-[force=focus]:outline-2 group-data-[force=focus]:outline-offset-2 group-data-[force=focus]:outline-focus",
          "group-data-[force=active]:bg-ink/15",
          "peer-disabled:border-line peer-disabled:bg-transparent",
          "[&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100 group-data-[force=selected]:[&>svg]:opacity-100",
        )}
      >
        <Check strokeWidth={1.5} className="size-3.5" />
      </span>
      <span className="text-[1rem]">{label}</span>
    </label>
  );
}

export function Radio({
  label,
  forceState,
  className,
  ...rest
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "className"> & { label: string; forceState?: ForceState; className?: string }) {
  return (
    <label data-force={forceState} className={cx(optionLabel, className)}>
      <input
        type="radio"
        className="peer sr-only"
        disabled={rest.disabled || forceState === "disabled"}
        {...rest}
        {...(forceState === "selected" ? { checked: true, readOnly: true, onChange: () => {} } : {})}
      />
      {/* A diamond, to keep every corner sharp */}
      <span
        aria-hidden
        className={cx(
          "grid size-[18px] shrink-0 rotate-45 place-items-center border border-(--control-line)",
          T,
          "group-hover:border-ink group-data-[force=hover]:border-ink",
          "peer-checked:border-ink group-data-[force=selected]:border-ink",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-focus group-data-[force=focus]:outline-2 group-data-[force=focus]:outline-offset-4 group-data-[force=focus]:outline-focus",
          "peer-disabled:border-line",
          "after:size-2 after:scale-0 after:bg-ink after:transition-transform after:duration-(--dur-1) after:ease-(--ease) peer-checked:after:scale-100 group-data-[force=selected]:after:scale-100",
        )}
      />
      <span className="text-[1rem]">{label}</span>
    </label>
  );
}

/* ---------- Switch ---------- */

export function Switch({
  label,
  checked,
  onCheckedChange,
  forceState,
  disabled,
  className,
}: {
  label: string;
  checked: boolean;
  onCheckedChange?: (v: boolean) => void;
  forceState?: ForceState;
  disabled?: boolean;
  className?: string;
}) {
  const id = useId();
  const on = forceState === "selected" ? true : checked;
  return (
    <div className={cx("flex min-h-11 items-center gap-4", className)}>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={on}
        aria-labelledby={`${id}-l`}
        data-force={forceState}
        disabled={disabled || forceState === "disabled"}
        onClick={() => onCheckedChange?.(!checked)}
        className={cx(
          "group relative h-7 w-12 shrink-0 cursor-pointer border border-(--control-line) bg-transparent",
          T,
          "hover:border-ink data-[force=hover]:border-ink",
          "aria-checked:border-brand aria-checked:bg-brand",
          "disabled:cursor-not-allowed disabled:border-line disabled:bg-transparent",
          FOCUS,
        )}
      >
        <span
          aria-hidden
          className={cx(
            "absolute top-1/2 left-1 size-4 -translate-y-1/2 bg-ink-muted transition-[transform,background-color] duration-(--dur-1) ease-(--ease)",
            "group-aria-checked:translate-x-[21px] group-aria-checked:bg-ink group-disabled:bg-ink-subtle/50",
            "group-data-[force=active]:scale-x-125",
          )}
        />
      </button>
      <label id={`${id}-l`} htmlFor={id} className="mn-label cursor-pointer text-ink">
        {label}
      </label>
    </div>
  );
}

/* ---------- Stepper (party size) ---------- */

export function Stepper({
  value,
  onChange,
  min = 1,
  max = 12,
  label,
  invalid,
  forceState,
  describedBy,
}: {
  value: number | null;
  onChange?: (n: number) => void;
  min?: number;
  max?: number;
  label: string;
  invalid?: boolean;
  forceState?: ForceState;
  describedBy?: string;
}) {
  const step = (d: number) => onChange?.(Math.min(max, Math.max(min, (value ?? (d > 0 ? 1 : min + 1)) + d)));
  const disabled = forceState === "disabled";
  const btn = cx(
    "grid size-11 shrink-0 cursor-pointer place-items-center text-ink",
    "hover:bg-ink/[0.07] active:bg-ink/[0.14] data-[force=hover]:bg-ink/[0.07]",
    "disabled:cursor-not-allowed disabled:text-ink-subtle disabled:hover:bg-transparent",
    T,
    "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus",
  );
  return (
    <div
      role="group"
      aria-label={label}
      data-force={forceState}
      className={cx(
        "inline-flex w-fit items-stretch border border-(--control-line)",
        T,
        "hover:border-ink-muted data-[force=hover]:border-ink-muted data-[force=focus]:outline-2 data-[force=focus]:outline-offset-2 data-[force=focus]:outline-focus",
        (invalid || forceState === "error") && "border-danger hover:border-danger",
        disabled && "border-line",
      )}
    >
      <button type="button" className={btn} data-force={forceState === "hover" ? "hover" : undefined} onClick={() => step(-1)} disabled={disabled || (value !== null && value <= min)} aria-label="Fewer guests">
        <Minus aria-hidden strokeWidth={1} className="size-[18px]" />
      </button>
      <output aria-describedby={describedBy} className={cx("font-display grid min-w-12 place-items-center border-x border-line text-[1.75rem] leading-none tabular-nums", disabled && "text-ink-subtle", value === null && "text-ink-subtle")}>
        {value ?? "–"}
      </output>
      <button type="button" className={btn} onClick={() => step(1)} disabled={disabled || (value !== null && value >= max)} aria-label="More guests">
        <Plus aria-hidden strokeWidth={1} className="size-[18px]" />
      </button>
    </div>
  );
}
