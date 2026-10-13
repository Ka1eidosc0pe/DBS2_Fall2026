"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Toast, type ToastTone } from "./Toast";

type Item = { id: number; tone: ToastTone; title: string; body?: string };

export function useToasts() {
  const [items, setItems] = useState<Item[]>([]);
  const timers = useRef(new Map<number, number>());
  const next = useRef(1);

  const dismiss = useCallback((id: number) => {
    window.clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setItems((l) => l.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (tone: ToastTone, title: string, body?: string) => {
      const id = next.current++;
      setItems((l) => [...l.slice(-2), { id, tone, title, body }]);
      timers.current.set(id, window.setTimeout(() => dismiss(id), 5200));
    },
    [dismiss],
  );

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach((v) => window.clearTimeout(v));
  }, []);

  return { items, push, dismiss };
}

/** Fixed notice area. The container is a polite live region; each toast also carries its own role. */
export function ToastRegion({ items, onDismiss }: { items: Item[]; onDismiss: (id: number) => void }) {
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-3 p-4 md:inset-x-auto md:right-8 md:bottom-8 md:items-end md:p-0">
      {items.map((t) => (
        <div key={t.id} className="mn-rise pointer-events-auto w-full max-w-md">
          <Toast tone={t.tone} title={t.title} onClose={() => onDismiss(t.id)}>
            {t.body}
          </Toast>
        </div>
      ))}
    </div>
  );
}
