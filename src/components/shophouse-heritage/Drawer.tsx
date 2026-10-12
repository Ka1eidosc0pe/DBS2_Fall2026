"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { IconButton } from "./Button";
import { TileBand } from "./patterns";
import { cx } from "./cx";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Detail panel. Right-hand drawer from 768px up, bottom sheet below.
 * Traps focus, closes on Esc and backdrop click, and returns focus to whatever opened it.
 * Pass `inline` to render the panel in flow (for the design system page).
 */
export function Drawer({
  open,
  onClose,
  title,
  eyebrow,
  children,
  footer,
  inline,
  width = "md:max-w-[34rem]",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  inline?: boolean;
  width?: string;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    if (!open || inline) return;
    opener.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panel.current?.querySelector<HTMLElement>("[data-autofocus]") ?? panel.current;
    first?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      } else if (e.key === "Tab" && panel.current) {
        const items = [...panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
        if (!items.length) return;
        const a = items[0];
        const z = items[items.length - 1];
        if (e.shiftKey && (document.activeElement === a || document.activeElement === panel.current)) {
          e.preventDefault();
          z.focus();
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      (opener.current as HTMLElement | null)?.focus?.({ preventScroll: true });
    };
  }, [open, inline, onClose]);

  if (!open) return null;

  const body = (
    <div
      ref={panel}
      role="dialog"
      aria-modal={inline ? undefined : true}
      aria-label={title}
      tabIndex={-1}
      className={cx(
        "flex flex-col bg-bg outline-none",
        inline
          ? "w-full max-w-[34rem] overflow-hidden rounded-card border border-ink shadow-raised"
          : cx("sh-drawer pointer-events-auto absolute inset-x-0 bottom-0 max-h-[92dvh] rounded-t-[1.25rem] border-t border-ink shadow-raised md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-full md:rounded-none md:border-l md:border-t-0", width),
      )}
    >
      <div className="relative shrink-0 bg-surface">
        <TileBand height={26} rules={false} />
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 md:px-7">
          <div className="min-w-0">
            {eyebrow && <p className="sh-label text-ink-muted">{eyebrow}</p>}
            <h2 className="sh-title mt-1 text-2xl leading-tight text-ink md:text-[1.75rem]">{title}</h2>
          </div>
          <IconButton label="Close" variant="ghost" onClick={onClose} data-autofocus>
            <X size={20} strokeWidth={1.5} aria-hidden />
          </IconButton>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
      {footer && <div className="shrink-0 border-t border-line bg-surface px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-7">{footer}</div>}
    </div>
  );

  if (inline) return body;
  return (
    <div className="fixed inset-0 z-50">
      <div className="sh-backdrop absolute inset-0 bg-ink/55" onClick={onClose} aria-hidden />
      {body}
    </div>
  );
}
