"use client";

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode, type RefObject } from "react";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { Button } from "./Button";
import { cn } from "./types";

/* ---------------- Drawer / bottom sheet ---------------- */

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function Drawer({
  open,
  onClose,
  title,
  eyebrow,
  returnFocusRef,
  children,
  footer,
  tone = "var(--brand)",
  onTone = "var(--on-brand)",
  inline = false,
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  eyebrow?: ReactNode;
  /** Element to refocus when closed. Falls back to whatever had focus on open. */
  returnFocusRef?: RefObject<HTMLElement | null>;
  children: ReactNode;
  footer?: ReactNode;
  tone?: string;
  onTone?: string;
  /** Render in normal flow (for the design system page) instead of fixed over the page. */
  inline?: boolean;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open || inline) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      const first = panel.current?.querySelector<HTMLElement>("[data-autofocus]") ?? panel.current?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    }, 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      } else if (e.key === "Tab" && panel.current) {
        const els = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const restore = returnFocusRef;
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      (restore?.current ?? lastFocus.current)?.focus?.();
    };
  }, [open, onClose, returnFocusRef, inline]);

  if (!open) return null;

  const body = (
    <div
      ref={panel}
      role="dialog"
      aria-modal={inline ? undefined : true}
      aria-labelledby={titleId}
      className={inline ? "hb-card flex flex-col !overflow-hidden bg-bg" : "hb-drawer"}
    >
      <header className="flex items-center gap-3 border-b-2 border-ink px-5 py-3.5" style={{ background: tone, color: onTone }}>
        <div className="min-w-0 flex-1">
          {eyebrow ? <div className="hb-mono opacity-90">{eyebrow}</div> : null}
          <h2 id={titleId} className="hb-title line-clamp-2 !text-[1.65rem] uppercase !leading-[0.95]">
            {title}
          </h2>
        </div>
        <Button icon size="sm" variant="secondary" aria-label="Close" onClick={onClose}>
          <X size={20} strokeWidth={2.75} aria-hidden />
        </Button>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
      {footer ? <footer className="border-t-2 border-ink bg-surface px-5 py-4">{footer}</footer> : null}
    </div>
  );
  if (inline) return body;
  return (
    <>
      <div className="hb-backdrop" onClick={onClose} aria-hidden />
      {body}
    </>
  );
}

/* ---------------- Toasts ---------------- */

type ToastKind = "success" | "info" | "error";
type ToastItem = { id: number; kind: ToastKind; message: string };
const ToastCtx = createContext<{ push: (message: string, kind?: ToastKind) => void }>({ push: () => {} });
export const useToast = () => useContext(ToastCtx);

export const ALERT_STYLE: Record<ToastKind | "warning", { bg: string; Icon: typeof Info }> = {
  success: { bg: "var(--hdb-mint)", Icon: CheckCircle2 },
  info: { bg: "var(--hdb-sky)", Icon: Info },
  warning: { bg: "var(--hdb-butter)", Icon: AlertTriangle },
  error: { bg: "var(--hdb-peach)", Icon: XCircle },
};

/** Visual toast, also used on the design system page. */
export function ToastView({ kind = "success", message, onClose, className }: { kind?: ToastKind | "warning"; message: ReactNode; onClose?: () => void; className?: string }) {
  const { bg, Icon } = ALERT_STYLE[kind];
  return (
    <div className={cn("hb-card hb-toast flex items-center gap-3 !overflow-visible py-2.5 pl-3 pr-2", className)} style={{ background: bg }}>
      <Icon size={24} strokeWidth={2.5} aria-hidden className="flex-none" />
      <p className="flex-1 text-[0.9375rem] font-bold leading-snug">{message}</p>
      {onClose ? (
        <button type="button" onClick={onClose} aria-label="Dismiss" className="hb-focusable grid h-11 w-11 flex-none place-items-center rounded-full hover:bg-white/60">
          <X size={18} strokeWidth={2.75} aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const idRef = useRef(0);
  const push = useCallback((message: string, kind: ToastKind = "success") => {
    const id = ++idRef.current;
    setItems((s) => [...s.slice(-2), { id, kind, message }]);
    window.setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 3400);
  }, []);
  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-3 bottom-3 z-[80] flex flex-col items-center gap-2 md:inset-x-auto md:right-6 md:bottom-6 md:items-end">
        {items.map((t) => (
          <div key={t.id} className="pointer-events-auto w-full max-w-sm">
            <ToastView kind={t.kind} message={t.message} onClose={() => setItems((s) => s.filter((x) => x.id !== t.id))} />
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

/* ---------------- Tooltip ---------------- */

export function Tooltip({ text, children, forceOpen }: { text: string; children: ReactNode; forceOpen?: boolean }) {
  const id = useId();
  return (
    <span className="hb-tip-wrap relative inline-flex">
      <span aria-describedby={id} className="inline-flex">
        {children}
      </span>
      <span id={id} role="tooltip" data-force={forceOpen ? "hover" : undefined} className="hb-tip">
        {text}
      </span>
    </span>
  );
}
