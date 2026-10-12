"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, RotateCw, SearchX, X } from "lucide-react";
import { Button } from "./Button";
import { TileBullet } from "./patterns";
import { cx } from "./cx";

/* Badges and tags */
export function Badge({ children, tone = "neutral", className }: { children: React.ReactNode; tone?: "neutral" | "jade" | "outline"; className?: string }) {
  return (
    <span
      className={cx(
        "sh-label inline-flex items-center gap-1.5 rounded-[4px] px-2 py-1 leading-none",
        tone === "neutral" && "bg-surface-2 text-ink",
        tone === "jade" && "bg-brand text-on-brand",
        tone === "outline" && "border border-ink-subtle text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** The count badge on "My trail". It echoes the primary action, so it is coral. */
export function CountBadge({ count, className }: { count: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cx(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-pill bg-accent px-1.5 text-xs font-bold tabular-nums text-on-accent",
        className,
      )}
    >
      {count}
    </span>
  );
}

/* Tooltip */
export function Tooltip({ text, children, show, className }: { text: string; children: React.ReactNode; show?: boolean; className?: string }) {
  return (
    <span className={cx("group/tip relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className={cx(
          "pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-control bg-ink px-2.5 py-1.5 text-xs font-medium text-surface opacity-0 shadow-raised transition-opacity duration-200 group-focus-within/tip:opacity-100 group-hover/tip:opacity-100",
          show && "opacity-100",
        )}
      >
        {text}
        <span aria-hidden className="absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-ink" />
      </span>
    </span>
  );
}

/* Toast */
export type ToastKind = "success" | "info" | "error";
export type ToastData = { id: number; kind: ToastKind; title: string; body?: string };

const toastIcon = {
  success: <CheckCircle2 size={20} strokeWidth={1.5} className="text-success" aria-hidden />,
  info: <Info size={20} strokeWidth={1.5} className="text-info" aria-hidden />,
  error: <AlertTriangle size={20} strokeWidth={1.5} className="text-danger" aria-hidden />,
};

export function ToastCard({ toast, onClose, className }: { toast: Omit<ToastData, "id">; onClose?: () => void; className?: string }) {
  return (
    <div
      className={cx(
        "sh-fade-up pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-card border border-ink bg-surface p-3.5 pr-2 shadow-raised",
        toast.kind === "error" && "border-danger",
        className,
      )}
    >
      <span className="mt-0.5">{toastIcon[toast.kind]}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.9375rem] font-semibold text-ink">{toast.title}</p>
        {toast.body && <p className="mt-0.5 text-sm text-ink-muted">{toast.body}</p>}
      </div>
      {onClose && (
        <button type="button" aria-label="Dismiss" onClick={onClose} className="flex size-9 shrink-0 items-center justify-center rounded-control text-ink-muted hover:bg-surface-2 hover:text-ink">
          <X size={16} strokeWidth={1.5} aria-hidden />
        </button>
      )}
    </div>
  );
}

export function useToasts() {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const n = useRef(0);
  const dismiss = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const push = useCallback(
    (t: Omit<ToastData, "id">) => {
      const id = ++n.current;
      setToasts((cur) => [...cur.slice(-2), { ...t, id }]);
      setTimeout(() => dismiss(id), 4200);
    },
    [dismiss],
  );
  return { toasts, push, dismiss };
}

export function ToastRegion({ toasts, dismiss }: { toasts: ToastData[]; dismiss: (id: number) => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex flex-col items-center gap-2 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:items-end md:p-6"
    >
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} onClose={() => dismiss(t.id)} />
      ))}
    </div>
  );
}

/* Inline alert */
export function Alert({ kind = "info", children, className }: { kind?: ToastKind; children: React.ReactNode; className?: string }) {
  return (
    <div
      role={kind === "error" ? "alert" : "status"}
      className={cx(
        "flex items-start gap-3 rounded-card border p-3.5 text-[0.9375rem]",
        kind === "error" ? "border-danger bg-danger/5 text-ink" : kind === "success" ? "border-success bg-success/5 text-ink" : "border-info bg-info/5 text-ink",
        className,
      )}
    >
      <span className="mt-0.5">{toastIcon[kind]}</span>
      <div>{children}</div>
    </div>
  );
}

/* Skeletons */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cx("sh-skeleton rounded-control", className)} />;
}

export function CardSkeleton({ arch }: { arch?: boolean }) {
  return (
    <div aria-hidden className="overflow-hidden rounded-card border border-line bg-surface p-3">
      <Skeleton className={cx("aspect-[4/3] w-full", arch && "rounded-t-[999px]")} />
      <Skeleton className="mt-4 h-3 w-24" />
      <Skeleton className="mt-3 h-6 w-4/5" />
      <Skeleton className="mt-3 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-2/3" />
    </div>
  );
}

/* Empty, error, success */
export function EmptyState({
  title,
  children,
  action,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex flex-col items-center rounded-card border border-dashed border-ink-subtle bg-surface/60 px-6 py-12 text-center", className)}>
      <SearchX size={32} strokeWidth={1.5} className="text-brand" aria-hidden />
      <h3 className="sh-title mt-4 text-2xl text-ink">{title}</h3>
      {children && <p className="mt-2 max-w-sm text-ink-muted">{children}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function ErrorState({ title = "The archive would not open.", children = "Something went wrong loading this stop. Your trail is safe.", onRetry, className }: { title?: string; children?: React.ReactNode; onRetry?: () => void; className?: string }) {
  return (
    <div role="alert" className={cx("flex flex-col items-center rounded-card border border-danger bg-surface px-6 py-10 text-center", className)}>
      <AlertTriangle size={32} strokeWidth={1.5} className="text-danger" aria-hidden />
      <h3 className="sh-title mt-4 text-2xl text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-ink-muted">{children}</p>
      <Button variant="secondary" className="mt-6" icon={<RotateCw size={16} strokeWidth={1.5} aria-hidden />} onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}

export function SuccessState({ title, children, className }: { title: string; children?: React.ReactNode; className?: string }) {
  return (
    <div role="status" className={cx("flex flex-col items-center rounded-card border border-brand bg-surface px-6 py-10 text-center", className)}>
      <span className="flex size-12 items-center justify-center rounded-full bg-brand text-on-brand">
        <CheckCircle2 size={26} strokeWidth={1.5} aria-hidden />
      </span>
      <h3 className="sh-title mt-4 text-2xl text-ink">{title}</h3>
      {children && <p className="mt-2 max-w-sm text-ink-muted">{children}</p>}
    </div>
  );
}

/** Eyebrow label with tile bullet: "◈ THE FIVE-FOOT WAY" */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cx("sh-label inline-flex items-center gap-2 text-brand", className)}>
      <TileBullet size={12} />
      {children}
    </p>
  );
}

export function useEscape(active: boolean, fn: () => void) {
  useEffect(() => {
    if (!active) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && fn();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [active, fn]);
}
