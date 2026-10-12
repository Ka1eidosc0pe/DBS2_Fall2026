"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Check } from "lucide-react";
import { cn, type ForceState } from "./types";

export type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  selected?: boolean;
  /** CSS color (usually a --hdb-* token) used when the chip is not selected. */
  tone?: string;
  count?: number;
  forceState?: ForceState;
  children: ReactNode;
};

export function Chip({ selected, tone = "var(--surface)", count, forceState, className, children, disabled, type = "button", style, ...rest }: ChipProps) {
  const isSel = selected || forceState === "selected";
  return (
    <button
      type={type}
      aria-pressed={isSel}
      data-force={forceState}
      disabled={disabled || forceState === "disabled"}
      style={{ ["--chip-bg" as string]: tone, ...style }}
      className={cn("hb-chip hb-focusable", className)}
      {...rest}
    >
      {isSel ? <Check size={16} strokeWidth={3} aria-hidden /> : null}
      {children}
      {count !== undefined ? <span className="hb-chip-count">{count}</span> : null}
    </button>
  );
}

export type SegmentedOption = { value: string; label: string; disabled?: boolean };

export function Segmented({
  label,
  options,
  value,
  onChange,
  forceState,
  forceIndex = 0,
}: {
  label: string;
  options: SegmentedOption[];
  value: string;
  onChange?: (v: string) => void;
  /** Applies a forced state to the item at forceIndex (for the design system page) */
  forceState?: ForceState;
  forceIndex?: number;
}) {
  return (
    <div role="group" aria-label={label} className="hb-seg">
      {options.map((o, i) => {
        const on = o.value === value;
        const forced = forceState && i === forceIndex ? forceState : undefined;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            data-force={forced}
            disabled={o.disabled || forced === "disabled"}
            onClick={() => onChange?.(o.value)}
            className="hb-seg-item hb-focusable"
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
