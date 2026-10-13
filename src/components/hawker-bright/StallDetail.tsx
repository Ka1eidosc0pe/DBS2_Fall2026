"use client";

import type { RefObject } from "react";
import { Check, ChefHat, Lightbulb, MapPin, Megaphone, Plus, Trash2, Utensils } from "lucide-react";
import type { Stall } from "@/data/hawker-bright/stalls";
import { CategoryTag, ChilliMeter, PriceTier, StallBadge } from "./Badges";
import { Button } from "./Button";
import { Drawer } from "./Overlay";
import { CreditLine, Photo } from "./Photo";
import { CATEGORY_TONE } from "./Badges";

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="border-b-2 border-dashed border-ink/25 py-4 last:border-b-0">
      <div className="mb-1.5 flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-surface">{icon}</span>
        <h3 className="hb-label">{label}</h3>
      </div>
      <p className="hb-body pl-9">{children}</p>
    </div>
  );
}

/** Stall menu board: photo, unit number, what to order, how to order, local tip, spice. */
export function StallDetail({
  stall,
  open,
  onClose,
  onList,
  onAdd,
  onRemove,
  returnFocusRef,
  inline,
}: {
  stall: Stall;
  open: boolean;
  onClose: () => void;
  onList: boolean;
  onAdd: () => void;
  onRemove: () => void;
  returnFocusRef?: RefObject<HTMLElement | null>;
  inline?: boolean;
}) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      inline={inline}
      returnFocusRef={returnFocusRef}
      eyebrow={
        <span className="inline-flex items-center gap-2">
          <StallBadge no={stall.unit} className="!bg-surface" /> {stall.centre}
        </span>
      }
      title={stall.dish}
      footer={
        onList ? (
          <div className="flex flex-wrap items-center gap-3">
            <p className="flex flex-1 items-center gap-2 font-bold">
              <Check size={20} strokeWidth={3} aria-hidden className="text-success" /> On your makan list
            </p>
            <Button variant="ghost" onClick={onRemove}>
              <Trash2 size={18} strokeWidth={2.5} aria-hidden /> Remove
            </Button>
          </div>
        ) : (
          <Button variant="primary" size="lg" className="w-full" onClick={onAdd} data-autofocus>
            <Plus size={22} strokeWidth={3} aria-hidden /> Add to makan list
          </Button>
        )
      }
    >
      <div className="relative aspect-[16/10] w-full border-b-2 border-ink bg-surface-2">
        <Photo file={stall.photo} alt={stall.alt} sizes="(min-width:768px) 520px, 100vw" focus={stall.focus} />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-2 pt-8">
          <CreditLine file={stall.photo} onDark className="!text-[11px]" />
          {!stall.photoIsDish ? <span className="hb-caption ml-2 !text-[11px] text-white/80">· illustrative photo</span> : null}
        </div>
      </div>
      <div className="px-5 pb-6 pt-5">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryTag category={stall.category} />
          <PriceTier tier={stall.tier} />
          <span className="flex-1" />
          <span className="inline-flex items-center gap-2">
            <span className="hb-label text-ink-muted">Spice</span>
            <ChilliMeter level={stall.spice} />
          </span>
        </div>
        <p className="hb-caption mt-2 flex items-center gap-1.5 !text-[0.9375rem] font-semibold">
          <MapPin size={16} strokeWidth={2.5} aria-hidden /> {stall.name} · {stall.hood}
        </p>
        <p className="hb-body-lg mt-4">{stall.blurb}</p>
        <div className="mt-4 rounded-[14px] border-2 border-ink bg-surface px-4 shadow-card" style={{ borderTopColor: CATEGORY_TONE[stall.category] }}>
          <Row icon={<Utensils size={14} strokeWidth={2.75} aria-hidden />} label="What to order">
            {stall.order}
          </Row>
          <Row icon={<Megaphone size={14} strokeWidth={2.75} aria-hidden />} label="How to order it">
            {stall.how}
          </Row>
          <Row icon={<Lightbulb size={14} strokeWidth={2.75} aria-hidden />} label="Local tip">
            {stall.tip}
          </Row>
        </div>
        <p className="hb-caption mt-4 flex items-center gap-1.5 text-ink-muted">
          <ChefHat size={14} strokeWidth={2.5} aria-hidden /> Stall names are illustrative. Check the centre for what is open today.
        </p>
      </div>
    </Drawer>
  );
}
