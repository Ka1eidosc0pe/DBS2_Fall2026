"use client";
import { useId } from "react";
import { AlertCircle, ChevronDown, Search, X } from "lucide-react";
import { cx, type ForceState } from "./cx";

const control =
  "w-full min-h-11 rounded-control border bg-surface px-3.5 font-body text-base text-ink placeholder:text-ink-muted transition-[border-color,box-shadow] duration-200 hover:border-ink data-[force=hover]:border-ink focus-visible:border-brand data-[force=focus]:border-brand disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-ink-muted disabled:hover:border-ink-subtle data-[force=disabled]:cursor-not-allowed data-[force=disabled]:bg-surface-2 data-[force=disabled]:text-ink-muted";
const edge = "border-ink-subtle";
const errEdge = "border-danger hover:border-danger";

export function FieldLabel({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="sh-label mb-1.5 flex items-baseline justify-between text-ink">
      <span>{children}</span>
      {optional && <span className="font-medium normal-case tracking-normal text-ink-muted">Optional</span>}
    </label>
  );
}

export function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-danger">
      <AlertCircle size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" aria-hidden />
      {children}
    </p>
  );
}

type TextFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> & {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  forceState?: ForceState;
  id?: string;
};

export function TextField({ label, hint, error, optional, forceState, id, className, ...rest }: TextFieldProps) {
  const auto = useId();
  const fid = id ?? auto;
  const err = error ?? (forceState === "error" ? "Please enter a value." : undefined);
  return (
    <div className={className}>
      <FieldLabel htmlFor={fid} optional={optional}>{label}</FieldLabel>
      <input
        id={fid}
        data-force={forceState}
        disabled={rest.disabled || forceState === "disabled"}
        aria-invalid={err ? true : undefined}
        aria-describedby={err ? `${fid}-err` : hint ? `${fid}-hint` : undefined}
        {...rest}
        className={cx(control, err ? errEdge : edge)}
      />
      {hint && !err && <p id={`${fid}-hint`} className="mt-1.5 text-sm text-ink-muted">{hint}</p>}
      {err && <FieldError id={`${fid}-err`}>{err}</FieldError>}
    </div>
  );
}

type SearchFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  label: string;
  value: string;
  onValueChange?: (v: string) => void;
  forceState?: ForceState;
};

export function SearchField({ label, value, onValueChange, forceState, className, ...rest }: SearchFieldProps) {
  const id = useId();
  return (
    <div className={cx("relative", className)}>
      <label htmlFor={id} className="sr-only">{label}</label>
      <Search size={18} strokeWidth={1.5} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" aria-hidden />
      <input
        id={id}
        type="search"
        value={value}
        data-force={forceState}
        disabled={rest.disabled || forceState === "disabled"}
        onChange={(e) => onValueChange?.(e.target.value)}
        {...rest}
        className={cx(control, edge, "pl-10 pr-11 [&::-webkit-search-cancel-button]:hidden")}
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onValueChange?.("")}
          className="absolute right-0 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-control text-ink-muted hover:text-ink"
        >
          <X size={16} strokeWidth={1.5} aria-hidden />
        </button>
      )}
    </div>
  );
}

type SelectFieldProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "id"> & {
  label: string;
  options: { value: string; label: string }[];
  forceState?: ForceState;
  hideLabel?: boolean;
  error?: string;
};

export function SelectField({ label, options, forceState, hideLabel, error, className, ...rest }: SelectFieldProps) {
  const id = useId();
  const err = error ?? (forceState === "error" ? "Choose an option." : undefined);
  return (
    <div className={className}>
      {hideLabel ? <label htmlFor={id} className="sr-only">{label}</label> : <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <div className="relative">
        <select
          id={id}
          data-force={forceState}
          disabled={rest.disabled || forceState === "disabled"}
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? `${id}-err` : undefined}
          {...rest}
          className={cx(control, err ? errEdge : edge, "cursor-pointer appearance-none pr-10")}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown size={18} strokeWidth={1.5} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted" aria-hidden />
      </div>
      {err && <FieldError id={`${id}-err`}>{err}</FieldError>}
    </div>
  );
}

const tick =
  "size-5 shrink-0 cursor-pointer appearance-none border bg-surface transition-colors duration-200 hover:border-ink data-[force=hover]:border-ink checked:border-brand checked:bg-brand disabled:cursor-not-allowed disabled:border-line disabled:bg-surface-2 disabled:checked:bg-ink-subtle data-[force=disabled]:cursor-not-allowed data-[force=disabled]:border-line data-[force=disabled]:bg-surface-2";

type TickProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: React.ReactNode;
  forceState?: ForceState;
  description?: string;
};

export function Checkbox({ label, description, forceState, className, ...rest }: TickProps) {
  const sel = forceState === "selected";
  return (
    <label className={cx("flex min-h-11 cursor-pointer items-start gap-3 py-2.5 text-base text-ink has-[:disabled]:cursor-not-allowed has-[:disabled]:text-ink-muted", className)}>
      <input
        type="checkbox"
        data-force={forceState}
        disabled={rest.disabled || forceState === "disabled"}
        {...(sel ? { defaultChecked: true } : {})}
        {...rest}
        className={cx(tick, "sh-check mt-px rounded-[4px] border-ink-subtle")}
      />
      <span>
        {label}
        {description && <span className="block text-sm text-ink-muted">{description}</span>}
      </span>
    </label>
  );
}

export function Radio({ label, forceState, className, ...rest }: TickProps) {
  const sel = forceState === "selected";
  return (
    <label className={cx("flex min-h-11 cursor-pointer items-center gap-3 py-2.5 text-base text-ink has-[:disabled]:cursor-not-allowed has-[:disabled]:text-ink-muted", className)}>
      <input
        type="radio"
        data-force={forceState}
        disabled={rest.disabled || forceState === "disabled"}
        {...(sel ? { defaultChecked: true } : {})}
        {...rest}
        className={cx(tick, "rounded-full border-ink-subtle checked:bg-surface checked:shadow-[inset_0_0_0_4px_var(--surface),inset_0_0_0_10px_var(--brand)] checked:disabled:shadow-[inset_0_0_0_4px_var(--surface-2),inset_0_0_0_10px_var(--ink-subtle)]")}
      />
      <span>{label}</span>
    </label>
  );
}

export function Switch({
  label,
  checked,
  onCheckedChange,
  forceState,
  disabled,
  className,
}: {
  label: string;
  checked?: boolean;
  onCheckedChange?: (v: boolean) => void;
  forceState?: ForceState;
  disabled?: boolean;
  className?: string;
}) {
  const on = checked || forceState === "selected";
  const off = disabled || forceState === "disabled";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={off}
      data-force={forceState}
      onClick={() => onCheckedChange?.(!on)}
      className={cx("group flex min-h-11 items-center gap-3 rounded-control py-2 text-left text-base text-ink disabled:cursor-not-allowed disabled:text-ink-muted", className)}
    >
      <span
        aria-hidden
        className={cx(
          "relative h-6 w-11 shrink-0 rounded-pill border transition-colors duration-200 group-hover:border-ink group-data-[force=hover]:border-ink",
          on ? "border-brand bg-brand" : "border-ink-subtle bg-surface-2",
          off && "border-line bg-surface-2 group-hover:border-line",
        )}
      >
        <span
          className={cx(
            "absolute top-1/2 size-4 -translate-y-1/2 rounded-full transition-[left,background-color] duration-200",
            on ? "left-[22px] bg-on-brand" : "left-1 bg-ink-muted",
            off && "bg-ink-subtle",
          )}
        />
      </span>
      {label}
    </button>
  );
}
