import { Loader } from "lucide-react";
import { cx, FOCUS, T, type ForceState } from "./cx";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

const base = cx(
  "mn-label relative inline-flex min-h-11 cursor-pointer items-center justify-center gap-3 border px-7 whitespace-nowrap select-none",
  "disabled:cursor-not-allowed aria-busy:cursor-progress",
  T,
  FOCUS,
);

/* Each variant lists default, hover, pressed, then disabled. Forced states mirror the real pseudo-classes. */
const variants: Record<ButtonVariant, string> = {
  primary: cx(
    "border-accent bg-accent text-on-accent",
    "hover:border-accent-hover hover:bg-accent-hover data-[force=hover]:border-accent-hover data-[force=hover]:bg-accent-hover",
    "active:border-accent-pressed active:bg-accent-pressed data-[force=active]:border-accent-pressed data-[force=active]:bg-accent-pressed",
    "disabled:border-line disabled:bg-surface-2 disabled:text-ink-subtle",
  ),
  secondary: cx(
    "border-ink/55 bg-transparent text-ink",
    "hover:border-ink hover:bg-ink/[0.07] data-[force=hover]:border-ink data-[force=hover]:bg-ink/[0.07]",
    "active:border-ink active:bg-ink/[0.14] data-[force=active]:border-ink data-[force=active]:bg-ink/[0.14]",
    "disabled:border-line disabled:bg-transparent disabled:text-ink-subtle",
  ),
  ghost: cx(
    "border-transparent bg-transparent px-3 text-ink-muted underline decoration-transparent decoration-1 underline-offset-[7px]",
    "hover:text-ink hover:decoration-current data-[force=hover]:text-ink data-[force=hover]:decoration-current",
    "active:text-ink active:decoration-current data-[force=active]:text-ink data-[force=active]:decoration-current",
    "disabled:text-ink-subtle disabled:no-underline",
  ),
  destructive: cx(
    "border-danger/70 bg-transparent text-danger",
    "hover:border-danger hover:bg-danger/10 data-[force=hover]:border-danger data-[force=hover]:bg-danger/10",
    "active:border-danger active:bg-danger/20 data-[force=active]:border-danger data-[force=active]:bg-danger/20",
    "disabled:border-line disabled:text-ink-subtle",
  ),
};

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
  variant?: ButtonVariant;
  loading?: boolean;
  forceState?: ForceState;
  className?: string;
  size?: "md" | "lg";
  icon?: React.ReactNode;
};

export function Button({ variant = "secondary", loading, forceState, disabled, className, size = "md", icon, children, type = "button", ...rest }: Props) {
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
      onClick={(e) => {
        if (isLoading) return e.preventDefault();
        rest.onClick?.(e);
      }}
      className={cx(base, variants[variant], size === "lg" && "min-h-14 px-9", isLoading && "pointer-events-none", className)}
    >
      {isLoading ? <Loader aria-hidden strokeWidth={1.25} className="size-4 animate-spin" /> : icon}
      <span>{children}</span>
    </button>
  );
}

export function IconButton({
  label,
  forceState,
  disabled,
  className,
  children,
  type = "button",
  ...rest
}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & { label: string; forceState?: ForceState; className?: string }) {
  const isDisabled = disabled || forceState === "disabled";
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      data-force={forceState}
      disabled={isDisabled}
      {...rest}
      className={cx(
        "inline-flex size-11 cursor-pointer items-center justify-center border border-(--control-line) text-ink [&_svg]:size-[18px]",
        "hover:border-ink hover:bg-ink/[0.07] data-[force=hover]:border-ink data-[force=hover]:bg-ink/[0.07]",
        "active:bg-ink/[0.14] data-[force=active]:bg-ink/[0.14]",
        "disabled:cursor-not-allowed disabled:border-line disabled:bg-transparent disabled:text-ink-subtle",
        T,
        FOCUS,
        className,
      )}
    >
      {children}
    </button>
  );
}
