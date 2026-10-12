"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import type { Term } from "@/data/hawker-bright/glossary";
import { cn, type ForceState } from "./types";

export function FlipCard({ term, forceState, className }: { term: Term; forceState?: ForceState; className?: string }) {
  const [flipped, setFlipped] = useState(false);
  const on = flipped || forceState === "selected";
  return (
    <div className={cn("hb-flip h-full min-h-[230px]", className)} data-flipped={on}>
      <button
        type="button"
        aria-pressed={on}
        aria-label={`${term.term}. ${on ? "Showing meaning." : "Tap to see the meaning."}`}
        data-force={forceState}
        disabled={forceState === "disabled"}
        onClick={() => setFlipped((v) => !v)}
        className="hb-flip-inner hb-focusable block w-full rounded-[18px] text-left disabled:cursor-not-allowed disabled:opacity-60"
        style={{ minHeight: 230, height: "100%" }}
      >
        <span className="hb-flip-face hb-card hb-lift flex flex-col justify-between p-5" style={{ background: term.tone }} aria-hidden={on}>
          <span className="hb-mono">TERM</span>
          <span className="hb-headline !text-[clamp(2.5rem,2rem+2vw,3.5rem)]">{term.term}</span>
          <span className="hb-label inline-flex items-center gap-2">
            Tap to flip <span aria-hidden>↻</span>
          </span>
        </span>
        <span className="hb-flip-face hb-flip-back hb-card flex flex-col gap-2 bg-surface p-5" aria-hidden={!on}>
          <span className="hb-mono inline-flex items-center gap-2" style={{ color: "var(--ink-muted)" }}>
            <Volume2 size={14} strokeWidth={2.5} aria-hidden /> {term.say}
          </span>
          <span className="hb-body font-semibold">{term.meaning}</span>
          <span className="hb-caption mt-auto rounded-lg border-2 border-dashed border-ink/40 px-3 py-2 italic">&ldquo;{term.example}&rdquo;</span>
        </span>
      </button>
    </div>
  );
}
