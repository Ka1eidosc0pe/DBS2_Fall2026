import { Loader2 } from "lucide-react";
import { cx, type ForceState } from "./cx";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

const base =
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-control border font-body text-[0.9375rem] font-semibold leading-none transition-[background-color,color,border-color,transform] duration-200 ease-out disabled:cursor-not-allowed data-[force=disabled]:cursor-not-allowed active:translate-y-px data-[force=active]:translate-y-px aria-busy:cursor-progress";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-accent text-on-accent shadow-[0_1px_0_rgb(31_42_51/0.25)] hover:bg-accent-hover data-[force=hover]:bg-accent-hover active:bg-accent-pressed data-[force=active]:bg-accent-pressed disabled:border-line disabled:bg-surface-2 disabled:text-ink-muted disabled:shadow-none data-[force=disabled]:border-line data-[force=disabled]:bg-surface-2 data-[force=disabled]:text-ink-muted data-[force=disabled]:shadow-none",
  secondary:
    "border-brand bg-transparent text-brand hover:bg-brand/10 data-[force=hover]:bg-brand/10 active:bg-brand/20 data-[force=active]:bg-brand/20 disabled:border-line disabled:text-ink-muted data-[force=disabled]:border-line data-[force=disabled]:text-ink-muted",
  ghost:
    "border-transparent bg-transparent text-ink underline decoration-line-strong/30 decoration-1 underline-offset-4 hover:bg-surface-2 hover:decoration-brand data-[force=hover]:bg-surface-2 data-[force=hover]:decoration-brand active:bg-line data-[force=active]:bg-line disabled:text-ink-muted disabled:no-underline data-[force=disabled]:text-ink-muted data-[force=disabled]:no-underline",
  destructive:
    "border-danger bg-transparent text-danger hover:bg-danger hover:text-surface data-[force=hover]:bg-danger data-[force=hover]:text-surface active:bg-danger/85 active:text-surface data-[force=active]:bg-danger/85 data-[force=active]:text-surface disabled:border-line disabled:text-ink-muted data-[force=disabled]:border-line data-[force=disabled]:text-ink-muted",
};

const sizes = { md: "min-h-11 px-5 py-3", sm: "min-h-11 px-4 py-2.5 text-sm md:min-h-9 md:py-2" };

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
  loading?: boolean;
  forceState?: ForceState;
  icon?: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  forceState,
  icon,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  const isLoading = loading || forceState === "loading";
  const isDisabled = disabled || forceState === "disabled";
  return (
    <button
      type={type}
      data-force={forceState}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      aria-disabled={isLoading || undefined}
      {...rest}
      onClick={isLoading ? undefined : rest.onClick}
      className={cx(base, variants[variant], sizes[size], className)}
    >
      {isLoading ? <Loader2 size={16} strokeWidth={1.75} className="sh-spinner" aria-hidden /> : icon}
      {children}
    </button>
  );
}

type IconButtonProps = Omit<ButtonProps, "children" | "icon" | "size"> & {
  label: string;
  children: React.ReactNode;
};

/** Square icon-only button, always 44px. `label` is the accessible name. */
export function IconButton({ label, variant = "secondary", forceState, loading, disabled, className, children, type = "button", ...rest }: IconButtonProps) {
  const isLoading = loading || forceState === "loading";
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      data-force={forceState}
      disabled={disabled || forceState === "disabled"}
      aria-busy={isLoading || undefined}
      {...rest}
      onClick={isLoading ? undefined : rest.onClick}
      className={cx(base, variants[variant], "size-11 shrink-0 p-0", className)}
    >
      {isLoading ? <Loader2 size={18} strokeWidth={1.5} className="sh-spinner" aria-hidden /> : children}
    </button>
  );
}
