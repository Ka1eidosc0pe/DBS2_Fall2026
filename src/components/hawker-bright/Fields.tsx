"use client";

import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";
import { AlertCircle, ChevronDown, Search, X } from "lucide-react";
import { cn, type ForceState } from "./types";

type FieldShell = { label: string; hint?: string; error?: string; hideLabel?: boolean };

function Shell({ id, label, hint, error, hideLabel, children }: FieldShell & { id: string; children: ReactNode }) {
  return (
    <div className="hb-field">
      <label htmlFor={id} className={cn("hb-label text-ink", hideLabel && "sr-only")}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-err`} role="alert" className="hb-error-text">
          <AlertCircle size={16} strokeWidth={2.5} aria-hidden /> {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="hb-caption text-ink-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type TextProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & FieldShell & { forceState?: ForceState };

export function TextInput({ label, hint, error, hideLabel, forceState, className, id, ...rest }: TextProps) {
  const uid = useId();
  const fid = id ?? uid;
  const invalid = !!error || forceState === "error";
  return (
    <Shell id={fid} label={label} hint={hint} error={error} hideLabel={hideLabel}>
      <input
        id={fid}
        data-force={forceState}
        aria-invalid={invalid || undefined}
        aria-describedby={error ? `${fid}-err` : hint ? `${fid}-hint` : undefined}
        disabled={rest.disabled || forceState === "disabled"}
        className={cn("hb-input", className)}
        {...rest}
      />
    </Shell>
  );
}

type SearchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "value"> & {
  label: string;
  value: string;
  onValueChange?: (v: string) => void;
  forceState?: ForceState;
};

export function SearchInput({ label, value, onValueChange, forceState, className, id, ...rest }: SearchProps) {
  const uid = useId();
  const fid = id ?? uid;
  return (
    <div className="hb-field">
      <label htmlFor={fid} className="sr-only">
        {label}
      </label>
      <div className="hb-input-wrap">
        <Search size={20} strokeWidth={2.5} className="hb-input-icon" aria-hidden />
        <input
          id={fid}
          type="search"
          data-force={forceState}
          value={value}
          onChange={(e) => onValueChange?.(e.target.value)}
          disabled={rest.disabled || forceState === "disabled"}
          className={cn("hb-input hb-input--icon hb-input--trail [&::-webkit-search-cancel-button]:hidden", className)}
          {...rest}
        />
        {value ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => onValueChange?.("")}
            className="hb-input-trail hb-focusable grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2"
          >
            <X size={18} strokeWidth={2.5} aria-hidden />
          </button>
        ) : null}
      </div>
    </div>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & FieldShell & { forceState?: ForceState; options: { value: string; label: string }[] };

export function Select({ label, hint, error, hideLabel, forceState, options, className, id, ...rest }: SelectProps) {
  const uid = useId();
  const fid = id ?? uid;
  const invalid = !!error || forceState === "error";
  return (
    <Shell id={fid} label={label} hint={hint} error={error} hideLabel={hideLabel}>
      <div className="hb-input-wrap">
        <select
          id={fid}
          data-force={forceState}
          aria-invalid={invalid || undefined}
          disabled={rest.disabled || forceState === "disabled"}
          className={cn("hb-input", className)}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown size={20} strokeWidth={2.5} className="pointer-events-none absolute right-4" aria-hidden />
      </div>
    </Shell>
  );
}

type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  label: ReactNode;
  description?: string;
  forceState?: ForceState;
};

function ToggleRow({ kind, label, description, forceState, className, id, ...rest }: ToggleProps & { kind: "check" | "radio" | "switch" }) {
  const uid = useId();
  const fid = id ?? uid;
  const disabled = rest.disabled || forceState === "disabled";
  return (
    <label htmlFor={fid} className={cn("flex min-h-11 items-center gap-3", disabled ? "cursor-not-allowed text-ink-subtle" : "cursor-pointer", className)}>
      <input
        id={fid}
        type={kind === "radio" ? "radio" : "checkbox"}
        role={kind === "switch" ? "switch" : undefined}
        data-force={forceState}
        aria-invalid={forceState === "error" || rest["aria-invalid"] || undefined}
        disabled={disabled}
        className={cn(kind === "check" && "hb-check", kind === "radio" && "hb-radio", kind === "switch" && "hb-switch")}
        {...rest}
      />
      <span className="flex flex-col">
        <span className="font-bold leading-tight">{label}</span>
        {description ? <span className="hb-caption text-ink-muted">{description}</span> : null}
      </span>
    </label>
  );
}

export const Checkbox = (p: ToggleProps) => <ToggleRow kind="check" {...p} />;
export const Radio = (p: ToggleProps) => <ToggleRow kind="radio" {...p} />;
export const Switch = (p: ToggleProps) => <ToggleRow kind="switch" {...p} />;
