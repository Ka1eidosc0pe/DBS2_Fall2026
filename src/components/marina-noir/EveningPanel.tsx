"use client";

import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import type { Experience, Request } from "@/data/marina-noir/experiences";
import { Button } from "./Button";
import { CountBadge } from "./Badge";
import { DrawerHeader } from "./Drawer";
import { EmptyState, SuccessState } from "./States";
import { cx } from "./cx";

export type EveningItem = { item: Experience; request: Request };

/** "Your evening": everything requested so far. The count badge in the header is the gold echo of the primary action. */
export function EveningPanel({
  entries,
  onRemove,
  onClose,
  onBrowse,
  onConfirmed,
  titleId,
}: {
  entries: EveningItem[];
  onRemove: (id: string) => void;
  onClose: () => void;
  onBrowse: () => void;
  onConfirmed?: () => void;
  titleId: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  function confirm() {
    setStatus("loading");
    window.setTimeout(() => {
      setStatus("sent");
      onConfirmed?.();
    }, 600 + Math.round(Math.random() * 300));
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <DrawerHeader eyebrow="The Concierge" onClose={onClose} />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pt-8 pb-8 md:px-10">
        <div className="flex items-center gap-4">
          <h2 id={titleId} className="mn-headline text-[2rem]! lg:text-[2.75rem]!">
            Your evening
          </h2>
          <CountBadge count={entries.length} label={entries.length === 1 ? "request" : "requests"} />
        </div>

        {status === "sent" ? (
          <SuccessState
            title="Sent to your concierge"
            actions={
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            }
          >
            Your concierge will confirm by morning.
          </SuccessState>
        ) : entries.length === 0 ? (
          <EmptyState
            title="Nothing yet"
            actions={
              <Button variant="secondary" onClick={onBrowse} icon={<ArrowRight aria-hidden strokeWidth={1} className="size-[18px]" />}>
                Browse the collection
              </Button>
            }
          >
            Requests you make will gather here, in the order you made them.
          </EmptyState>
        ) : (
          <ol className="mt-8 border-t border-line-strong">
            {entries.map(({ item, request }, i) => (
              <li key={item.id} className="grid grid-cols-[2rem_1fr_auto] items-start gap-x-4 border-b border-line py-6">
                <span className="font-display pt-1 text-[1.25rem] text-ink-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <p className="mn-label text-ink-muted">{item.kind}</p>
                  <p className="mn-title mt-1.5 text-[1.375rem]!">{item.name}</p>
                  <p className="mn-caption mt-1 text-ink-subtle">{item.place}</p>
                  <p className="mn-body mt-3 text-ink-muted">
                    {request.dateLabel} · {request.party} {request.party === 1 ? "guest" : "guests"}
                    {request.seating ? ` · ${request.seating}` : ""}
                  </p>
                  {request.note && <p className="mn-caption mt-2 text-ink-subtle italic">“{request.note}”</p>}
                </div>
                <Button variant="ghost" onClick={() => onRemove(item.id)} className="-mr-3 min-w-11" aria-label={`Remove ${item.name}`} icon={<X aria-hidden strokeWidth={1} className="size-4" />}>
                  <span className="sr-only sm:not-sr-only">Remove</span>
                </Button>
              </li>
            ))}
          </ol>
        )}
      </div>
      {status !== "sent" && (
        <footer className={cx("shrink-0 border-t border-t-(--brass) bg-surface-2 px-6 py-4 md:px-10")}>
          <div className="flex items-center justify-between gap-5">
            <p className="mn-caption hidden text-ink-muted sm:block">{entries.length ? "Confirm the whole evening in one message." : "Add at least one request to confirm."}</p>
            <Button variant="primary" size="lg" disabled={entries.length === 0} loading={status === "loading"} onClick={confirm} className="w-full sm:w-auto">
              {status === "loading" ? "Sending" : "Send to concierge"}
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
}
