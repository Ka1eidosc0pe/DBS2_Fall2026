import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { cx } from "./cx";

export type ToastTone = "success" | "error" | "info";

const tones = {
  success: { Icon: CheckCircle2, rule: "bg-success", icon: "text-success" },
  error: { Icon: AlertCircle, rule: "bg-danger", icon: "text-danger" },
  info: { Icon: Info, rule: "bg-info", icon: "text-info" },
};

/** One notice: a bronze-topped panel with a coloured spine. Never gold. */
export function Toast({
  tone = "success",
  title,
  children,
  onClose,
  action,
  className,
}: {
  tone?: ToastTone;
  title: string;
  children?: React.ReactNode;
  onClose?: () => void;
  action?: React.ReactNode;
  className?: string;
}) {
  const { Icon, rule, icon } = tones[tone];
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cx("relative flex w-full max-w-md items-start gap-4 border border-line-strong border-t-(--brass) bg-surface-2 py-4 pr-2 pl-5 shadow-raised", className)}
    >
      <span aria-hidden className={cx("absolute inset-y-0 left-0 w-0.5", rule)} />
      <Icon aria-hidden strokeWidth={1} className={cx("mt-0.5 size-5 shrink-0", icon)} />
      <div className="min-w-0 flex-1">
        <p className="mn-title text-[1.125rem]! leading-snug">{title}</p>
        {children && <p className="mn-caption mt-1 text-ink-muted">{children}</p>}
        {action && <div className="mt-2">{action}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="grid size-11 shrink-0 cursor-pointer place-items-center text-ink-muted transition-colors duration-(--dur-1) hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
        >
          <X aria-hidden strokeWidth={1.25} className="size-4" />
        </button>
      )}
    </div>
  );
}
