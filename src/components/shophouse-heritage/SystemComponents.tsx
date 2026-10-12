"use client";
import { useState } from "react";
import { ArrowRight, Bookmark, Download, Info, Plus, Search as SearchIcon, Trash2 } from "lucide-react";
import { Button, IconButton } from "./Button";
import { Checkbox, Radio, SearchField, SelectField, Switch, TextField } from "./Fields";
import { FilterChip, Segmented } from "./Chips";
import { Alert, Badge, CountBadge, Tooltip, ToastCard, ToastRegion, useToasts } from "./Feedback";
import { Drawer } from "./Drawer";
import { LandmarkCard, LandmarkDetail } from "./Landmark";
import { SiteNav } from "./Nav";
import { CityTimeline } from "./Timeline";
import { TrailList } from "./Trail";
import { DISTRICTS, ERAS, LANDMARKS, TYPES, type EraId } from "@/data/shophouse-heritage/heritage";

function Block({ title, note, children, className = "" }: { title: string; note?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={"min-w-0 rounded-card border border-line bg-surface p-5 md:p-6 " + className}>
      <h3 className="sh-title text-xl text-ink">{title}</h3>
      {note && <p className="mt-1 text-sm text-ink-muted">{note}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

export function ComponentsSection() {
  const [era, setEra] = useState<"all" | EraId>("all");
  const [seg, setSeg] = useState<"all" | EraId>("all");
  const [chips, setChips] = useState<string[]>(["chinatown"]);
  const [q, setQ] = useState("");
  const [on, setOn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toasts, push, dismiss } = useToasts();
  const sample = LANDMARKS[0];
  const [added, setAdded] = useState(false);
  const [trail, setTrail] = useState(LANDMARKS.slice(0, 3));

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <Block title="Buttons" note="Coral is only ever the primary button. Secondary is a jade outline; ghost is quiet; destructive is madder.">
          <div className="flex flex-wrap items-center gap-3">
            <Button icon={<Plus size={16} strokeWidth={1.75} aria-hidden />}>Add to trail</Button>
            <Button variant="secondary">Print my route</Button>
            <Button variant="ghost">Clear trail</Button>
            <Button variant="destructive" icon={<Trash2 size={16} strokeWidth={1.5} aria-hidden />}>Remove stop</Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button size="sm">Small primary</Button>
            <Button size="sm" variant="secondary">Small secondary</Button>
            <IconButton label="Bookmark"><Bookmark size={18} strokeWidth={1.5} aria-hidden /></IconButton>
            <IconButton label="Download" variant="ghost"><Download size={18} strokeWidth={1.5} aria-hidden /></IconButton>
            <Button
              variant="secondary"
              loading={loading}
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 800);
              }}
            >
              {loading ? "Preparing" : "Try loading"}
            </Button>
          </div>
        </Block>

        <Block title="Text input, search and select">
          <div className="space-y-4">
            <TextField label="Your name" placeholder="As it should appear on the route" hint="Used on the printed route only." />
            <SearchField label="Search landmarks" placeholder="Search landmarks" value={q} onValueChange={setQ} />
            <SelectField label="Type" options={[{ value: "all", label: "All types" }, ...TYPES.map((t) => ({ value: t.id, label: t.label }))]} />
          </div>
        </Block>

        <Block title="Checkbox, radio and switch">
          <div className="grid gap-x-6 sm:grid-cols-2">
            <div>
              <Checkbox label="Include walking directions" defaultChecked />
              <Checkbox label="Large print" />
              <Checkbox label="Archived stop" disabled />
            </div>
            <div role="radiogroup" aria-label="Pace">
              <Radio name="pace" label="Leisurely" defaultChecked />
              <Radio name="pace" label="Brisk" />
              <Radio name="pace" label="Evening only" disabled />
            </div>
          </div>
          <Switch className="mt-2" label="Show five-foot-way shade" checked={on} onCheckedChange={setOn} />
        </Block>

        <Block title="Filter chips and segmented control">
          <div className="flex flex-wrap gap-2">
            {DISTRICTS.slice(0, 4).map((d) => (
              <FilterChip
                key={d.id}
                dot={d.color}
                selected={chips.includes(d.id)}
                onToggle={() => setChips((c) => (c.includes(d.id) ? c.filter((x) => x !== d.id) : [...c, d.id]))}
              >
                {d.name}
              </FilterChip>
            ))}
          </div>
          <div className="mt-5">
            <Segmented
              label="Era"
              value={seg}
              onChange={setSeg}
              options={[{ value: "all", label: "All" }, ...ERAS.map((e) => ({ value: e.id, label: e.short }))]}
            />
          </div>
        </Block>

        <Block title="Badges, tags and count" note="The count badge is coral because it echoes the Add to trail action.">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge>Temple</Badge>
            <Badge tone="outline">Early colonial</Badge>
            <Badge tone="jade">Now open</Badge>
            <span className="inline-flex items-center gap-2 rounded-control border border-brand px-3 py-2 text-sm font-semibold text-brand">My trail <CountBadge count={3} /></span>
          </div>
        </Block>

        <Block title="Tooltip">
          <div className="flex items-center gap-6 pt-14">
            <Tooltip text="Move up"><IconButton label="Move up" variant="ghost"><ArrowRight size={18} strokeWidth={1.5} className="-rotate-90" aria-hidden /></IconButton></Tooltip>
            <Tooltip text="Walking time, including the approach" show><span className="inline-flex size-11 items-center justify-center text-ink-muted"><Info size={20} strokeWidth={1.5} aria-hidden /></span></Tooltip>
          </div>
        </Block>

        <Block title="Toast and alert" note="Toasts appear bottom-right on desktop and bottom-centre on mobile, and clear themselves after about four seconds.">
          <div className="space-y-3">
            <ToastCard toast={{ kind: "success", title: "Added to your trail", body: "Thian Hock Keng Temple is stop 2." }} />
            <ToastCard toast={{ kind: "error", title: "Could not print the route", body: "Check your trail and try again." }} />
            <Alert kind="info">Opening hours change. Check before you go.</Alert>
            <Button variant="secondary" size="sm" onClick={() => push({ kind: "success", title: "Added to your trail", body: "This one is live." })}>Fire a live toast</Button>
          </div>
        </Block>

        <Block title="Navigation bar" note="Sticky on the site. Section links appear from 1024px; a menu holds them below. Hub, mood board and system stay quiet on the right.">
          <div className="relative overflow-x-auto rounded-card border border-line">
            <div className="min-w-[70rem]">
            <SiteNav title="The Heritage Trail" current="system" links={[{ href: "#", label: "Landmarks" }, { href: "#", label: "Timeline" }]} trailCount={3} onOpenTrail={() => {}} />
            </div>
          </div>
        </Block>
      </div>

      <div className="grid gap-5 lg:grid-cols-[22rem_1fr]">
        <Block title="Landmark card" note="Arched photo, district label, year, summary. Secondary action to add.">
          <LandmarkCard landmark={sample} added={added} onOpen={() => setOpen(true)} onToggle={() => setAdded((a) => !a)} featured />
        </Block>
        <div className="grid min-w-0 gap-5">
          <Block title="Detail drawer" note="A right-hand drawer from 768px, a bottom sheet below. It traps focus, closes on Esc and backdrop, and returns focus to its trigger.">
            <div className="flex flex-wrap items-start gap-4">
              <Button variant="secondary" onClick={() => setOpen(true)}>Open the live drawer</Button>
            </div>
            <div className="mt-5 [&>div]:max-h-[34rem]">
              <Drawer inline open onClose={() => {}} title={sample.name} eyebrow="Landmark" footer={<Button className="w-full" icon={<Plus size={16} strokeWidth={1.75} aria-hidden />}>Add to trail</Button>}>
                <LandmarkDetail landmark={sample} />
              </Drawer>
            </div>
          </Block>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Block title="Trail list" note="Order with the arrows, which disable at the ends. Print is disabled until two stops are added.">
          <TrailList
            stops={trail}
            onMove={(i, d) => setTrail((t) => { const n = [...t]; [n[i], n[i + d]] = [n[i + d], n[i]]; return n; })}
            onRemove={(id) => setTrail((t) => t.filter((s) => s.id !== id))}
            onPrint={() => push({ kind: "success", title: "Your route is ready" })}
          />
        </Block>
        <Block title="City timeline band" note="Each date filters by its era. Horizontal scroll on mobile; a six-up grid on desktop.">
          <div className="rounded-card bg-bg p-4 pt-6">
            <CityTimeline era={era} onEra={setEra} />
          </div>
        </Block>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)} title={sample.name} eyebrow="Landmark" footer={<Button className="w-full" icon={<Plus size={16} strokeWidth={1.75} aria-hidden />} onClick={() => { setAdded(true); setOpen(false); push({ kind: "success", title: "Added to your trail", body: sample.name }); }}>Add to trail</Button>}>
        <LandmarkDetail landmark={sample} />
      </Drawer>
      <ToastRegion toasts={toasts} dismiss={dismiss} />
      <span className="sr-only"><SearchIcon aria-hidden /></span>
    </div>
  );
}
