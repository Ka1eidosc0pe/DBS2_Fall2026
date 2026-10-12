import { Flame } from "lucide-react";
import { cn } from "./types";

export const CATEGORY_TONE = {
  Rice: "var(--hdb-butter)",
  Noodles: "var(--hdb-peach)",
  Breakfast: "var(--hdb-sky)",
  Supper: "var(--hdb-lilac)",
  Sweet: "var(--hdb-mint)",
} as const;
export type Category = keyof typeof CATEGORY_TONE;

/** Unit-number plate, like the real stall signs: #01-23 */
export function StallBadge({ no, className }: { no: string; className?: string }) {
  return (
    <span className={cn("hb-stallno", className)} aria-label={`Stall ${no}`}>
      #{no}
    </span>
  );
}

export function Tag({ children, tone = "var(--hdb-butter)", className }: { children: React.ReactNode; tone?: string; className?: string }) {
  return (
    <span className={cn("hb-tag", className)} style={{ ["--tag-bg" as string]: tone }}>
      {children}
    </span>
  );
}

export function CategoryTag({ category, className }: { category: Category; className?: string }) {
  return (
    <Tag tone={CATEGORY_TONE[category]} className={className}>
      {category}
    </Tag>
  );
}

/** The sambal-coloured counter. Only used on the makan list (the list the primary action fills). */
export function CountBadge({ count, className }: { count: number; className?: string }) {
  return (
    <span className={cn("hb-count", className)} aria-label={`${count} on your list`}>
      {count}
    </span>
  );
}

export function PriceTier({ tier, className }: { tier: "$" | "$$" | "$$$"; className?: string }) {
  return (
    <span className={cn("hb-tier", className)} aria-label={`Price tier ${tier.length} of 3`}>
      <span aria-hidden>
        {tier}
        <span className="text-line">{"$$$".slice(tier.length)}</span>
      </span>
    </span>
  );
}

/** 0 to 3 chillies */
export function ChilliMeter({ level, className }: { level: 0 | 1 | 2 | 3; className?: string }) {
  const words = ["No spice", "Mild", "Medium", "Siong (hot)"];
  return (
    <span className={cn("inline-flex items-center gap-1", className)} role="img" aria-label={`Spice level ${level} of 3: ${words[level]}`}>
      {[1, 2, 3].map((i) => (
        <Flame key={i} size={20} strokeWidth={2.5} aria-hidden className={i <= level ? "fill-danger text-ink" : "text-ink-subtle"} />
      ))}
    </span>
  );
}
