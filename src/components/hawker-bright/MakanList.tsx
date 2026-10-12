"use client";

import { useState } from "react";
import { ArrowRight, Route, Trash2, X } from "lucide-react";
import type { Stall } from "@/data/hawker-bright/stalls";
import { CountBadge, PriceTier, StallBadge } from "./Badges";
import { Button } from "./Button";
import { TextInput } from "./Fields";
import { Drawer } from "./Overlay";
import { EmptyPlate, SuccessState } from "./States";
import { cn } from "./types";

export function groupByCentre(items: Stall[]) {
  const m = new Map<string, Stall[]>();
  for (const s of items) m.set(s.centre, [...(m.get(s.centre) ?? []), s]);
  return Array.from(m.entries()).map(([centre, stalls]) => ({ centre, stalls }));
}

/** The receipt paper: stalls grouped by centre, with dotted rules and a zigzag bottom edge. */
export function Receipt({ items, onRemove, className }: { items: Stall[]; onRemove?: (id: string) => void; className?: string }) {
  const groups = groupByCentre(items);
  return (
    <div className={cn("hb-zigzag-bottom border-2 border-b-0 border-ink bg-surface px-5 pb-6 pt-5", className)} style={{ borderRadius: "6px 6px 0 0" }}>
      <p className="hb-mono text-center tracking-[0.2em]">MAKAN MAP · ORDER SLIP</p>
      <p className="hb-mono mt-1 text-center text-ink-muted">CHOPE A SEAT · KOPI&apos;S ON</p>
      <div className="my-3 border-t-2 border-dashed border-ink" />
      {groups.map((g, gi) => (
        <section key={g.centre} aria-label={g.centre} className={gi > 0 ? "mt-5" : ""}>
          <h3 className="hb-mono flex items-center gap-2 uppercase">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-bg">{gi + 1}</span>
            {g.centre}
          </h3>
          <ul className="mt-2">
            {g.stalls.map((s) => (
              <li key={s.id} className="flex items-center gap-2 border-b border-dashed border-ink/30 py-2 last:border-b-0">
                <StallBadge no={s.unit} />
                <span className="min-w-0 flex-1 truncate font-bold">{s.dish}</span>
                <PriceTier tier={s.tier} />
                {onRemove ? (
                  <button type="button" onClick={() => onRemove(s.id)} aria-label={`Remove ${s.dish}`} className="hb-focusable grid h-11 w-11 flex-none place-items-center rounded-full hover:bg-hdb-peach [&:hover]:[background:var(--hdb-peach)]">
                    <X size={18} strokeWidth={2.75} aria-hidden />
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
      <div className="my-4 border-t-2 border-dashed border-ink" />
      <p className="hb-mono flex justify-between">
        <span>STALLS</span>
        <span>{String(items.length).padStart(2, "0")}</span>
      </p>
      <p className="hb-mono mt-1 flex justify-between">
        <span>CENTRES</span>
        <span>{String(groups.length).padStart(2, "0")}</span>
      </p>
    </div>
  );
}

type Phase = "idle" | "loading" | "done";

export function MakanList({
  open,
  onClose,
  items,
  onRemove,
  onClear,
  onPlanned,
  inline,
  initialPhase = "idle",
}: {
  open: boolean;
  onClose: () => void;
  items: Stall[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onPlanned?: (centres: number, stalls: number) => void;
  inline?: boolean;
  initialPhase?: Phase;
}) {
  const [phase, setPhase] = useState<Phase>(initialPhase);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const groups = groupByCentre(items);
  const canPlan = items.length >= 2;

  const plan = () => {
    if (name.trim().length < 2) {
      setError("Give your crawl a name first, at least 2 letters.");
      return;
    }
    setError("");
    setPhase("loading");
    window.setTimeout(() => {
      setPhase("done");
      onPlanned?.(groups.length, items.length);
    }, 800);
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      inline={inline}
      tone="var(--ink)"
      onTone="var(--bg)"
      eyebrow="Your plate"
      title={
        <span className="inline-flex items-center gap-3">
          Makan list <CountBadge count={items.length} />
        </span>
      }
      footer={
        items.length === 0 ? null : phase === "done" ? (
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setPhase("idle")}>
              Back to list
            </Button>
            <Button variant="brand" className="flex-1" onClick={onClose}>
              Done
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <TextInput
              label="Name your food crawl"
              placeholder="Saturday supper run"
              value={name}
              maxLength={28}
              error={error}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              disabled={phase === "loading"}
            />
            <Button variant="primary" size="lg" className="w-full" disabled={!canPlan} loading={phase === "loading"} onClick={plan}>
              <Route size={20} strokeWidth={2.75} aria-hidden />
              {phase === "loading" ? "Planning your route..." : "Plan my food crawl"}
            </Button>
            <div className="flex items-center justify-between gap-2">
              <p className="hb-caption text-ink-muted" id="plan-hint">
                {canPlan ? "Looks good. We will sort the order for you." : "Add at least 2 stalls to plan a crawl."}
              </p>
              <Button variant="ghost" size="sm" onClick={onClear} disabled={phase === "loading"}>
                <Trash2 size={16} strokeWidth={2.5} aria-hidden /> Clear
              </Button>
            </div>
          </div>
        )
      }
    >
      <div className="p-5">
        {items.length === 0 ? (
          <EmptyPlate />
        ) : phase === "done" ? (
          <div className="flex flex-col gap-5">
            <SuccessState title="Route sorted!">
              {groups.length} {groups.length === 1 ? "centre" : "centres"}, {items.length} stalls. {name.trim() ? `"${name.trim()}" is ready.` : ""}
            </SuccessState>
            <ol className="hb-card flex flex-col gap-0 p-4">
              {groups.map((g, i) => (
                <li key={g.centre} className="flex items-center gap-3 border-b-2 border-dashed border-line py-2.5 first:pt-0 last:border-b-0 last:pb-0">
                  <span className="hb-mono grid h-8 w-8 flex-none place-items-center rounded-full border-2 border-ink bg-hdb-butter [background:var(--hdb-butter)]">{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold leading-tight">{g.centre}</span>
                    <span className="hb-caption text-ink-muted">{g.stalls.map((s) => s.dish).join(" · ")}</span>
                  </span>
                  {i < groups.length - 1 ? <ArrowRight size={18} strokeWidth={2.5} aria-hidden className="flex-none" /> : null}
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <Receipt items={items} onRemove={onRemove} />
        )}
      </div>
    </Drawer>
  );
}
