import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn, type ForceState } from "./types";

type Variant = "primary" | "secondary" | "brand" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  forceState?: ForceState;
  /** Square icon-only button. Requires an aria-label. */
  icon?: boolean;
  children?: ReactNode;
};

export function Button({ variant = "secondary", size = "md", loading, forceState, icon, className, children, disabled, type = "button", ...rest }: ButtonProps) {
  const isLoading = loading || forceState === "loading";
  const isDisabled = disabled || forceState === "disabled";
  return (
    <button
      type={type}
      data-force={forceState}
      data-loading={isLoading || undefined}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={cn(
        "hb-btn hb-lift hb-focusable",
        `hb-btn--${variant}`,
        size !== "md" && `hb-btn--${size}`,
        icon && "hb-btn--icon",
        className,
      )}
      {...rest}
    >
      {isLoading ? <Loader2 size={20} strokeWidth={2.5} className="hb-spin" aria-hidden /> : null}
      {icon && isLoading ? null : children}
    </button>
  );
}
