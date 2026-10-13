"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { FanPattern } from "./Ornament";
import { IconButton } from "./Button";
import { cx } from "./cx";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Right-hand drawer on desktop, full-screen sheet on mobile. Traps focus, closes on Esc or backdrop,
 * and returns focus to whatever opened it.
 */
export function Drawer({
  open,
  onClose,
  labelledBy,
  children,
  width = "md:w-[min(620px,100vw)]",
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: React.ReactNode;
  width?: string;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const el = panel.current!;
    const focusFirst = window.setTimeout(() => {
      (el.querySelector<HTMLElement>("[data-autofocus]") ?? el).focus({ preventScroll: true });
    }, 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
      } else if (e.key === "Tab") {
        const items = [...el.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((n) => n.offsetParent !== null);
        if (!items.length) return e.preventDefault();
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || active === el)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      trigger?.focus?.({ preventScroll: true });
    };
  }, [open]);

  return (
    <div
      className={cx("fixed inset-0 z-50", !open && "pointer-events-none")}
      style={{ visibility: open ? "visible" : "hidden", transition: `visibility 0s linear ${open ? "0s" : "700ms"}` }}
      inert={!open}
    >
      <div
        aria-hidden
        onClick={onClose}
        className={cx("absolute inset-0 bg-black/75 backdrop-blur-[3px] transition-opacity duration-(--dur-3) ease-(--ease)", open ? "opacity-100" : "opacity-0")}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={cx(
          "absolute inset-0 flex flex-col bg-surface outline-none md:left-auto md:border-l md:border-line-strong",
          width,
          "transition-transform duration-(--dur-3) ease-(--ease)",
          open ? "translate-x-0 translate-y-0" : "translate-y-full md:translate-x-full md:translate-y-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}

/** Header strip for any drawer: bronze top edge, fan lattice fading out, a label and a close button. */
export function DrawerHeader({ eyebrow, onClose, children, id }: { eyebrow: string; onClose?: () => void; children?: React.ReactNode; id?: string }) {
  return (
    <header className="relative shrink-0 overflow-hidden border-t border-t-(--brass) border-b border-line bg-surface-2">
      <div aria-hidden className="absolute inset-0 text-(--brass)/25 [mask-image:linear-gradient(to_left,black,transparent_70%)]">
        <FanPattern size={40} />
      </div>
      <div className="relative flex items-center justify-between gap-4 px-6 py-2 pl-6 md:px-8">
        <div className="min-w-0 py-3">
          <p className="mn-label text-ink-muted">{eyebrow}</p>
          {children && <div id={id} className="mn-title mt-1 truncate">{children}</div>}
        </div>
        {onClose && (
          <IconButton label="Close" onClick={onClose} data-autofocus className="-mr-2 border-transparent">
            <X aria-hidden strokeWidth={1} />
          </IconButton>
        )}
      </div>
    </header>
  );
}
