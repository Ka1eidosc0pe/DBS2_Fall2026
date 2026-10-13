"use client";

import { useState, type ReactNode } from "react";
import { ArrowRight, Heart, MapPin, Plus, Search, Trash2, X } from "lucide-react";
import { STALLS, STALL_BY_ID } from "@/data/hawker-bright/stalls";
import { GLOSSARY } from "@/data/hawker-bright/glossary";
import { CATEGORY_TONE, CategoryTag, ChilliMeter, CountBadge, PriceTier, StallBadge, Tag, type Category } from "./Badges";
import { Button } from "./Button";
import { Checkbox, Radio, SearchInput, Select, Switch, TextInput } from "./Fields";
import { Chip, Segmented } from "./Chip";
import { FlipCard } from "./FlipCard";
import { MakanList, Receipt } from "./MakanList";
import { NavLink, Wordmark } from "./Nav";
import { ToastView, Tooltip, useToast } from "./Overlay";
import { Alert, EmptyPlate, ErrorState, NoResults, Skeleton, StallCardSkeleton, SuccessState, MosaicStrip } from "./States";
import { StallCard } from "./StallCard";
import { StallDetail } from "./StallDetail";
import { ChopeSticker, Burst, formica, mosaic } from "./patterns";
import type { ForceState } from "./types";

/* ---------- small layout helpers ---------- */

function Block({ title, note, children, id }: { title: string; note?: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="scroll-mt-36">
      <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h3 className="hb-title !text-[1.75rem] uppercase">{title}</h3>
        {note ? <p className="hb-caption text-ink-muted !text-[0.875rem]">{note}</p> : null}
      </div>
      <div className="hb-card p-5 sm:p-6">{children}</div>
    </section>
  );
}

const Label = ({ children }: { children: ReactNode }) => <p className="hb-label mb-2 text-ink-muted">{children}</p>;

/* ---------- 4. Components ---------- */

export function ComponentsSection() {
  const toast = useToast();
  const [chips, setChips] = useState<Category[]>(["Rice"]);
  const [seg, setSeg] = useState("az");
  const [hood, setHood] = useState("all");
  const [q, setQ] = useState("");
  const [check, setCheck] = useState(true);
  const [radio, setRadio] = useState("a");
  const [halal, setHalal] = useState(true);
  const [veg, setVeg] = useState(false);
  const [flip, setFlip] = useState(0);
  const [demoOpen, setDemoOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [inList, setInList] = useState(false);
  const chicken = STALL_BY_ID["chicken-rice"];
  const sample = [STALL_BY_ID["laksa"], STALL_BY_ID["kaya-toast"], STALL_BY_ID["bak-chor-mee"]];
  const [items, setItems] = useState(sample);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8">
      <Block title="Buttons" note="Primary is sambal and used once per screen. Everything else is pandan, plate-white or ghost.">
        <div className="grid gap-6">
          <div>
            <Label>Variants</Label>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">
                <Plus size={20} strokeWidth={3} aria-hidden /> Add to makan list
              </Button>
              <Button variant="brand">Find food</Button>
              <Button variant="secondary">Show details</Button>
              <Button variant="ghost">Clear filters</Button>
              <Button variant="danger">
                <Trash2 size={18} strokeWidth={2.5} aria-hidden /> Remove all
              </Button>
              <Button icon variant="secondary" aria-label="Save">
                <Heart size={20} strokeWidth={2.5} aria-hidden />
              </Button>
            </div>
          </div>
          <div>
            <Label>Sizes</Label>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm" variant="secondary">Small 40</Button>
              <Button variant="secondary">Medium 48</Button>
              <Button size="lg" variant="secondary">Large 56</Button>
            </div>
          </div>
          <div>
            <Label>Loading (fake 800ms) and disabled</Label>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                loading={adding}
                onClick={() => {
                  setAdding(true);
                  window.setTimeout(() => {
                    setAdding(false);
                    toast.push("Shiok! Added.");
                  }, 800);
                }}
              >
                {adding ? "Adding..." : "Try loading"}
              </Button>
              <Button variant="primary" disabled>Plan my food crawl</Button>
              <Button variant="secondary" disabled>Disabled</Button>
            </div>
          </div>
        </div>
      </Block>

      <div className="grid gap-8 lg:grid-cols-2">
        <Block title="Text input" note="2px outline, pill, hard soft-shadow. Error is chilli with a message.">
          <div className="grid gap-5">
            <TextInput label="Crawl name" placeholder="Saturday supper run" hint="Up to 28 characters." />
            <TextInput label="Crawl name" defaultValue="A" error="Give your crawl a name first, at least 2 letters." />
            <TextInput label="Crawl name" placeholder="Locked" disabled />
          </div>
        </Block>
        <Block title="Search and select">
          <div className="grid gap-5">
            <SearchInput label="Search dishes" value={q} onValueChange={setQ} placeholder="What are you craving?" />
            <Select
              label="Neighbourhood"
              value={hood}
              onChange={(e) => setHood(e.target.value)}
              options={[
                { value: "all", label: "All neighbourhoods" },
                { value: "chinatown", label: "Chinatown" },
                { value: "tiong", label: "Tiong Bahru" },
              ]}
            />
            <Select label="Neighbourhood" disabled options={[{ value: "x", label: "Disabled select" }]} />
          </div>
        </Block>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Block title="Checkbox">
          <div className="grid gap-1">
            <Checkbox label="Vegetarian-friendly" checked={check} onChange={(e) => setCheck(e.target.checked)} />
            <Checkbox label="Open late" defaultChecked={false} />
            <Checkbox label="Unavailable" disabled />
          </div>
        </Block>
        <Block title="Radio">
          <div role="radiogroup" aria-label="Spice" className="grid gap-1">
            {[
              ["a", "Mild"],
              ["b", "Medium"],
              ["c", "Siong (hot)"],
            ].map(([v, l]) => (
              <Radio key={v} name="spice" label={l} checked={radio === v} onChange={() => setRadio(v)} />
            ))}
            <Radio name="spice-off" label="Unavailable" disabled />
          </div>
        </Block>
        <Block title="Switch">
          <div className="grid gap-1">
            <Switch label="Halal" checked={halal} onChange={(e) => setHalal(e.target.checked)} />
            <Switch label="Vegetarian-friendly" checked={veg} onChange={(e) => setVeg(e.target.checked)} />
            <Switch label="Unavailable" disabled />
          </div>
        </Block>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Block title="Filter chips" note="Each category owns an HDB pastel. Selected turns pandan with a tick.">
          <div className="flex flex-wrap gap-3">
            {(Object.keys(CATEGORY_TONE) as Category[]).map((c) => (
              <Chip key={c} tone={CATEGORY_TONE[c]} selected={chips.includes(c)} count={STALLS.filter((s) => s.category === c).length} onClick={() => setChips((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]))}>
                {c}
              </Chip>
            ))}
            <Chip disabled tone="var(--surface)">Disabled</Chip>
          </div>
        </Block>
        <Block title="Segmented control">
          <Segmented
            label="Sort"
            value={seg}
            onChange={setSeg}
            options={[
              { value: "az", label: "A to Z" },
              { value: "cheap", label: "Cheapest" },
              { value: "spicy", label: "Spiciest" },
            ]}
          />
        </Block>
      </div>

      <Block title="Badges and tags" note="Stall number plates, category tags, price tier, spice and the sambal counter.">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <StallBadge no="01-23" />
          {(Object.keys(CATEGORY_TONE) as Category[]).map((c) => (
            <CategoryTag key={c} category={c} />
          ))}
          <Tag tone="var(--hdb-mint)">Halal</Tag>
          <PriceTier tier="$" />
          <PriceTier tier="$$" />
          <ChilliMeter level={0} />
          <ChilliMeter level={2} />
          <ChilliMeter level={3} />
          <span className="inline-flex items-center gap-2 font-bold">
            Makan list <CountBadge count={3} />
          </span>
        </div>
      </Block>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
        <Block title="Card" note="Whole card is a button. Lifts on hover, pushes in on press.">
          <StallCard stall={chicken} onOpen={() => setDemoOpen(true)} />
        </Block>
        <div className="grid gap-8">
          <Block title="Tooltip, toast and alert">
            <div className="grid gap-5">
              <div className="flex flex-wrap items-center gap-4 pt-6">
                <Tooltip text="Add to makan list">
                  <Button icon variant="secondary" aria-label="Quick add">
                    <Plus size={20} strokeWidth={3} aria-hidden />
                  </Button>
                </Tooltip>
                <Tooltip text="Chope a seat first">
                  <Button variant="secondary">Hover or focus me</Button>
                </Tooltip>
                <Button variant="brand" onClick={() => toast.push("Shiok! Added.")}>Show a toast</Button>
              </div>
              <ToastView kind="success" message="Shiok! Added." />
              <ToastView kind="info" message="Tip: chope a table before you queue." />
              <ToastView kind="error" message="Aiyo, that did not work. Try again." />
              <Alert kind="warning" title="Queue is long">Peak lunch hour. Try after 1.30pm.</Alert>
            </div>
          </Block>
        </div>
      </div>

      <Block title="Dialog: stall detail and makan list" note="Drawer on desktop, bottom sheet on mobile. Traps focus, closes on Esc and backdrop, returns focus to the trigger.">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="secondary" onClick={() => setDemoOpen(true)}>
            Open stall detail
          </Button>
          <Button variant="secondary" onClick={() => setListOpen(true)}>
            Open makan list <CountBadge count={items.length} />
          </Button>
        </div>
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
          <StallDetail stall={chicken} open inline onClose={() => {}} onList={inList} onAdd={() => { setInList(true); toast.push("Shiok! Added."); }} onRemove={() => setInList(false)} />
          <MakanList open inline onClose={() => {}} items={items} onRemove={(id) => setItems((s) => s.filter((x) => x.id !== id))} onClear={() => setItems([])} />
        </div>
        <StallDetail stall={chicken} open={demoOpen} onClose={() => setDemoOpen(false)} onList={inList} onAdd={() => { setInList(true); toast.push("Shiok! Added."); }} onRemove={() => setInList(false)} />
        <MakanList open={listOpen} onClose={() => setListOpen(false)} items={items} onRemove={(id) => setItems((s) => s.filter((x) => x.id !== id))} onClear={() => setItems([])} />
      </Block>

      <div className="grid gap-8 lg:grid-cols-2">
        <Block title="Navigation bar">
          <div className="overflow-hidden rounded-[14px] border-2 border-ink bg-bg">
            <div className="flex flex-wrap items-center gap-2 px-3 py-2.5">
              <Wordmark />
              <span className="flex-1" />
              <NavLink href="#components" current>Stalls</NavLink>
              <NavLink href="#components">Glossary</NavLink>
              <Button size="sm" variant="secondary">
                Makan list <CountBadge count={2} />
              </Button>
            </div>
          </div>
        </Block>
        <Block title="Glossary flip card" note="Tap to flip. Six terms on the site.">
          <div className="grid grid-cols-2 gap-4">
            <FlipCard term={GLOSSARY[flip % GLOSSARY.length]} />
            <div className="flex flex-col justify-between gap-3">
              <p className="hb-body text-ink-muted">Front shows the word in signage type on an HDB pastel. Back shows the pronunciation, meaning and an example.</p>
              <Button variant="secondary" size="sm" onClick={() => setFlip((n) => n + 1)}>
                Next term <ArrowRight size={16} strokeWidth={2.75} aria-hidden />
              </Button>
            </div>
          </div>
        </Block>
      </div>

      <Block title="Style-specific pieces" note="Receipt paper, mosaic strip, chope sticker, starburst, formica band.">
        <div className="grid items-start gap-6 md:grid-cols-[minmax(0,320px)_1fr]">
          <Receipt items={sample} />
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label>Mosaic strip divider</Label>
              <div className="h-8 border-y-2 border-ink" style={mosaic} />
            </div>
            <div className="grid gap-2">
              <Label>Formica band</Label>
              <div className="h-20 rounded-[14px] border-2 border-ink" style={formica} />
            </div>
            <div className="flex items-center gap-6">
              <ChopeSticker className="w-36 -rotate-6 drop-shadow-[3px_3px_0_#2b1d14]" />
              <Burst className="w-28 rotate-6">
                <span className="hb-title !text-[1.35rem] uppercase">Shiok!</span>
              </Burst>
              <div className="hb-stripes h-10 flex-1 rounded-full border-2 border-ink" />
            </div>
          </div>
        </div>
      </Block>
    </div>
  );
}

/* ---------- 5. Control states matrix ---------- */

type Col = "default" | "hover" | "focus" | "active" | "selected" | "disabled" | "loading" | "error";
const COLS: { key: Col; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "hover", label: "Hover" },
  { key: "focus", label: "Focus-visible" },
  { key: "active", label: "Active / pressed" },
  { key: "selected", label: "Selected" },
  { key: "disabled", label: "Disabled" },
  { key: "loading", label: "Loading" },
  { key: "error", label: "Error" },
];

const fs = (c: Col): ForceState | undefined => (c === "default" ? undefined : c);
type Row = { label: string; supports: Col[]; render: (c: Col) => ReactNode };

const BTN: Col[] = ["default", "hover", "focus", "active", "disabled", "loading"];
const FIELD: Col[] = ["default", "hover", "focus", "active", "disabled", "error"];

const ROWS: Row[] = [
  { label: "Primary button", supports: BTN, render: (c) => <Button variant="primary" size="sm" forceState={fs(c)}>Add</Button> },
  { label: "Brand button", supports: BTN, render: (c) => <Button variant="brand" size="sm" forceState={fs(c)}>Find</Button> },
  { label: "Secondary button", supports: BTN, render: (c) => <Button variant="secondary" size="sm" forceState={fs(c)}>Details</Button> },
  { label: "Ghost button", supports: BTN, render: (c) => <Button variant="ghost" size="sm" forceState={fs(c)}>Clear</Button> },
  { label: "Destructive button", supports: BTN, render: (c) => <Button variant="danger" size="sm" forceState={fs(c)}>Remove</Button> },
  { label: "Icon button", supports: BTN, render: (c) => <Button icon size="sm" variant="secondary" aria-label="Add" forceState={fs(c)}><Plus size={20} strokeWidth={3} aria-hidden /></Button> },
  { label: "Text input", supports: FIELD, render: (c) => <TextInput label="Name" hideLabel placeholder="Text" forceState={fs(c)} defaultValue={c === "error" ? "A" : ""} readOnly={c !== "default"} /> },
  { label: "Search", supports: FIELD, render: (c) => <SearchInput label="Search" value="" placeholder="Search" forceState={fs(c)} readOnly /> },
  { label: "Select", supports: FIELD, render: (c) => <Select label="Hood" hideLabel forceState={fs(c)} options={[{ value: "a", label: "All" }]} /> },
  { label: "Checkbox", supports: ["default", "hover", "focus", "active", "selected", "disabled", "error"], render: (c) => <Checkbox label="Halal" aria-label="Halal" forceState={fs(c)} readOnly checked={c === "selected"} onChange={() => {}} /> },
  { label: "Radio", supports: ["default", "hover", "focus", "active", "selected", "disabled"], render: (c) => <Radio label="Mild" forceState={fs(c)} checked={c === "selected"} onChange={() => {}} /> },
  { label: "Switch", supports: ["default", "hover", "focus", "active", "selected", "disabled"], render: (c) => <Switch label="On" forceState={fs(c)} checked={c === "selected"} onChange={() => {}} /> },
  { label: "Filter chip", supports: ["default", "hover", "focus", "active", "selected", "disabled"], render: (c) => <Chip tone={CATEGORY_TONE.Rice} count={3} forceState={fs(c)} selected={c === "selected"}>Rice</Chip> },
  {
    label: "Segmented control",
    supports: ["default", "hover", "focus", "active", "selected", "disabled"],
    render: (c) => (
      <Segmented
        label="Sort"
        value={c === "selected" ? "b" : "a"}
        forceState={c === "default" || c === "selected" ? undefined : fs(c)}
        forceIndex={1}
        options={[{ value: "a", label: "A" }, { value: "b", label: "B" }]}
      />
    ),
  },
  { label: "Nav link", supports: ["default", "hover", "focus", "active", "selected"], render: (c) => <NavLink href="#states" current={c === "selected"} forceState={c === "selected" ? undefined : fs(c)}>Stalls</NavLink> },
];

export function StatesMatrix() {
  const chicken = STALL_BY_ID["chicken-rice"];
  const term = GLOSSARY[0];
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8">
      <div className="hb-card overflow-hidden !shadow-card">
        <div className="relative overflow-x-auto" tabIndex={0} role="region" aria-label="Control states matrix, scrolls sideways on small screens">
          <table className="w-full min-w-[1240px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-ink" style={{ background: "var(--hdb-butter)" }}>
                <th scope="col" className="hb-label sticky left-0 z-10 w-[170px] border-r-2 border-ink px-4 py-3" style={{ background: "var(--hdb-butter)" }}>
                  Control
                </th>
                {COLS.map((c) => (
                  <th key={c.key} scope="col" className="hb-label px-3 py-3">
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label} className="border-b-2 border-dashed border-line last:border-b-0">
                  <th scope="row" className="sticky left-0 z-10 border-r-2 border-ink bg-surface px-4 py-3 text-[0.9375rem] font-bold">
                    {r.label}
                  </th>
                  {COLS.map((c) => (
                    <td key={c.key} className="px-3 py-4 align-middle">
                      {r.supports.includes(c.key) ? (
                        <div className={`flex justify-start ${r.supports === FIELD ? "min-w-[150px]" : "min-w-[100px]"}`}>{r.render(c.key)}</div>
                      ) : (
                        <span aria-label="Not applicable" className="hb-mono text-ink-subtle">
                          n/a
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <section aria-labelledby="card-states">
        <h3 id="card-states" className="hb-title !text-[1.75rem] uppercase">
          Card and flip card states
        </h3>
        <div className="relative mt-4 overflow-x-auto pb-4" tabIndex={0} role="region" aria-label="Card states, scrolls sideways on small screens">
          <div className="flex gap-6 pr-6">
            {(["default", "hover", "focus", "active", "selected", "disabled"] as Col[]).map((c) => (
              <div key={c} className="w-[290px] flex-none">
                <p className="hb-label mb-2">{COLS.find((x) => x.key === c)?.label}{c === "selected" ? " (on list)" : ""}</p>
                <StallCard stall={chicken} forceState={fs(c)} />
              </div>
            ))}
          </div>
        </div>
        <div className="relative mt-4 overflow-x-auto pb-4" tabIndex={0} role="region" aria-label="Flip card states, scrolls sideways on small screens">
          <div className="flex gap-6 pr-6">
            {(["default", "hover", "focus", "selected", "disabled"] as Col[]).map((c) => (
              <div key={c} className="w-[250px] flex-none">
                <p className="hb-label mb-2">{COLS.find((x) => x.key === c)?.label}{c === "selected" ? " (flipped)" : ""}</p>
                <FlipCard term={term} forceState={fs(c)} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- 6. UI states ---------- */

export function UiStates() {
  const [retrying, setRetrying] = useState(false);
  const [failed, setFailed] = useState(true);
  const [filters, setFilters] = useState(true);
  const retry = () => {
    setRetrying(true);
    window.setTimeout(() => {
      setRetrying(false);
      setFailed(false);
    }, 800);
  };
  return (
    <div className="grid gap-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <Block title="Empty: makan list" note="Shown in the drawer before anything is added.">
          <EmptyPlate action={<Button variant="secondary">Browse stalls</Button>} />
        </Block>
        <Block title="No results from a filter" note="Singlish headline, plain-language help, one clear way out.">
          {filters ? <NoResults onClear={() => setFilters(false)} /> : (
            <div className="grid place-items-center gap-3 py-10 text-center">
              <p className="hb-body">Filters cleared. All 14 stalls are back.</p>
              <Button variant="ghost" onClick={() => setFilters(true)}>Reset the demo</Button>
            </div>
          )}
        </Block>
      </div>
      <Block title="Loading: skeletons" note="Same card frame, so the grid does not jump when content arrives.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StallCardSkeleton />
          <div className="hidden sm:block"><StallCardSkeleton /></div>
          <div className="hidden lg:block"><StallCardSkeleton /></div>
        </div>
        <div className="mt-6 grid gap-3" aria-hidden>
          <Skeleton className="h-9 w-2/3" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
        </div>
      </Block>
      <div className="grid gap-8 lg:grid-cols-2">
        <Block title="Error with retry" note="Retry shows a loading state for about 800ms.">
          {failed ? (
            <ErrorState onRetry={retry} retrying={retrying} />
          ) : (
            <div className="grid place-items-center gap-3 py-10 text-center">
              <p className="hb-body">Loaded. 14 stalls ready.</p>
              <Button variant="ghost" onClick={() => setFailed(true)}>Reset the demo</Button>
            </div>
          )}
        </Block>
        <Block title="Success: route sorted" note="After Plan my food crawl finishes.">
          <SuccessState title="Route sorted!" action={<Button variant="brand">Done</Button>}>
            3 centres, 5 stalls. &quot;Saturday supper run&quot; is ready.
          </SuccessState>
        </Block>
      </div>
      <Block title="Inline validation and toasts">
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput label="Crawl name" defaultValue="" error="Give your crawl a name first, at least 2 letters." />
          <div className="grid gap-3 content-start">
            <ToastView kind="success" message="Shiok! Added." />
            <ToastView kind="info" message="Removed from your makan list." />
          </div>
        </div>
      </Block>
      <p className="hb-caption flex items-center gap-1.5 text-ink-muted">
        <MapPin size={14} strokeWidth={2.5} aria-hidden /> <Search size={14} strokeWidth={2.5} aria-hidden /> <X size={14} strokeWidth={2.5} aria-hidden /> Icons are lucide at 2.5 stroke.
      </p>
      <MosaicStrip />
    </div>
  );
}
