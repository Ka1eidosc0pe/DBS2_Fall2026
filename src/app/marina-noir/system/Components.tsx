"use client";

import { ArrowRight, Info, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { EXPERIENCES } from "@/data/marina-noir/experiences";
import { Badge, CountBadge } from "@/components/marina-noir/Badge";
import { Button, IconButton } from "@/components/marina-noir/Button";
import { Checkbox, Field, Radio, SearchInput, Select, Stepper, Switch, TextInput, Textarea } from "@/components/marina-noir/Fields";
import { FilterChip, Segmented } from "@/components/marina-noir/Chip";
import { Drawer } from "@/components/marina-noir/Drawer";
import { ExperienceCard } from "@/components/marina-noir/ExperienceCard";
import { ExperienceDetail } from "@/components/marina-noir/ExperienceDetail";
import { CrossLinks, NavBar } from "@/components/marina-noir/NavBar";
import { Toast } from "@/components/marina-noir/Toast";
import { Tooltip } from "@/components/marina-noir/Tooltip";

const EVENINGS = [
  { value: "a", label: "Thursday, 15 October" },
  { value: "b", label: "Friday, 16 October" },
  { value: "c", label: "Saturday, 17 October" },
];

function Spec({ title, note, children, className }: { title: string; note?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
        <h3 className="mn-label text-ink">{title}</h3>
        {note && <p className="mn-caption text-ink-subtle">{note}</p>}
      </div>
      <div className="pt-6">{children}</div>
    </div>
  );
}

export function Components() {
  const [chip, setChip] = useState("Dine");
  const [seg, setSeg] = useState("curated");
  const [check, setCheck] = useState(true);
  const [seat, setSeat] = useState("Table");
  const [sw, setSw] = useState(true);
  const [party, setParty] = useState<number | null>(2);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
      <Spec title="Buttons" note="Gold only on the primary" className="lg:col-span-2">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" icon={<ArrowRight aria-hidden strokeWidth={1} className="size-[18px]" />}>Request reservation</Button>
          <Button variant="secondary">View your evening</Button>
          <Button variant="ghost">Clear filters</Button>
          <Button variant="destructive" icon={<Trash2 aria-hidden strokeWidth={1} className="size-4" />}>Cancel request</Button>
          <IconButton label="Add to list"><Plus aria-hidden strokeWidth={1} /></IconButton>
          <IconButton label="Close"><X aria-hidden strokeWidth={1} /></IconButton>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button variant="primary" size="lg">Large primary</Button>
          <Button variant="primary" loading>Sending</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </div>
      </Spec>

      <Spec title="Text input" note="Brass edge, 3.9:1">
        <div className="grid max-w-sm gap-6">
          <Field label="Name" htmlFor="c-name"><TextInput id="c-name" placeholder="As it should appear" /></Field>
          <Field label="Email" htmlFor="c-email" error="Enter an address like name@example.com."><TextInput id="c-email" defaultValue="name@" aria-invalid /></Field>
        </div>
      </Spec>

      <Spec title="Search, select, textarea">
        <div className="grid max-w-sm gap-6">
          <SearchInput aria-label="Search the collection" placeholder="Search the collection" value={search} onChange={(e) => setSearch(e.target.value)} onClear={() => setSearch("")} />
          <Select aria-label="Evening" defaultValue=""><option value="">Choose an evening</option>{EVENINGS.map((e) => <option key={e.value}>{e.label}</option>)}</Select>
          <Textarea aria-label="Note" placeholder="A note for your concierge" rows={3} />
        </div>
      </Spec>

      <Spec title="Checkbox, radio, switch, stepper">
        <div className="grid gap-4">
          <Checkbox label="Send me a confirmation" checked={check} onChange={(e) => setCheck(e.target.checked)} />
          <fieldset className="flex flex-wrap gap-x-8">
            <legend className="sr-only">Seating</legend>
            {["Bar", "Table", "Private room"].map((s) => <Radio key={s} name="c-seat" label={s} checked={seat === s} onChange={() => setSeat(s)} />)}
          </fieldset>
          <Switch label="Black tie only" checked={sw} onCheckedChange={setSw} />
          <Stepper label="Party size" value={party} onChange={setParty} />
        </div>
      </Spec>

      <Spec title="Filter chip and segmented control">
        <div className="grid gap-6">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Kind">
            {["All", "Dine", "Drink", "Stay", "Moments"].map((k) => <FilterChip key={k} selected={chip === k} onClick={() => setChip(k)}>{k}</FilterChip>)}
          </div>
          <Segmented label="Sort" value={seg} onChange={setSeg} options={[{ value: "curated", label: "Curated" }, { value: "latest", label: "Latest seating" }, { value: "private", label: "Most private" }]} />
        </div>
      </Spec>

      <Spec title="Badge, tag, count">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Dine</Badge>
          <Badge tone="brand">Black tie</Badge>
          <Badge tone="success">Confirmed</Badge>
          <Badge tone="warning">Waitlist</Badge>
          <Badge tone="danger">Unavailable</Badge>
          <Badge tone="info">Private</Badge>
          <span className="mn-label ml-4 inline-flex items-center gap-3 text-ink-muted">Your evening <CountBadge count={3} label="requests" /></span>
        </div>
      </Spec>

      <Spec title="Tooltip" note="Hover or focus the icon">
        <div className="flex items-center gap-10">
          <Tooltip text="Last seating is when the kitchen closes its book for the evening." side="bottom">
            <IconButton label="About last seating"><Info aria-hidden strokeWidth={1} /></IconButton>
          </Tooltip>
          <Tooltip text="Open by default, for reference." forceOpen side="bottom" className="ml-6">
            <IconButton label="Always open"><Info aria-hidden strokeWidth={1} /></IconButton>
          </Tooltip>
        </div>
        <div className="h-14" />
      </Spec>

      <Spec title="Toast and alert" className="lg:col-span-2">
        <div className="grid items-start gap-4 md:grid-cols-3">
          <Toast tone="success" title="Added to your evening">Your concierge will confirm by morning.</Toast>
          <Toast tone="error" title="Please check the form">The note is over 200 characters.</Toast>
          <Toast tone="info" title="Seatings change nightly" action={<Button variant="ghost" className="-ml-3 min-h-11">See availability</Button>}>Tables are held until 7 pm.</Toast>
        </div>
      </Spec>

      <Spec title="Card" note="Standard and featured" className="lg:col-span-2">
        <div className="grid gap-10 md:grid-cols-2">
          <ExperienceCard item={EXPERIENCES[0]} feature imageClass="aspect-[16/10]" sizes="(min-width: 1024px) 40vw, 100vw" />
          <ExperienceCard item={EXPERIENCES[3]} inEvening imageClass="aspect-[16/10]" sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
      </Spec>

      <Spec title="Navigation bar" note="Header and project links" className="lg:col-span-2">
        <div className="border border-line">
          <CrossLinks current="system" />
          <NavBar
            items={[{ label: "Experiences", href: "#components", current: true }, { label: "Three nights", href: "#states" }, { label: "Your evening", href: "#ui-states" }]}
            end={<span className="mn-label inline-flex min-h-11 items-center gap-3 border border-(--control-line) px-4 text-ink">Your evening <CountBadge count={2} label="requests" /></span>}
          />
        </div>
      </Spec>

      <Spec title="Drawer" note="Right panel on desktop, full-screen sheet on mobile" className="lg:col-span-2">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="max-w-prose">
            <p className="mn-body text-ink-muted">
              The detail panel holds the story, the details and the reservation form. It traps focus, closes on Esc or a click on the scrim, and returns focus to the card that opened it. Below is the same panel, inline.
            </p>
            <Button variant="secondary" className="mt-6" onClick={() => setOpen(true)}>Open it live</Button>
          </div>
        </div>
        <div className="mt-8 flex h-[760px] flex-col overflow-hidden border border-line-strong bg-surface md:max-w-[620px]">
          <ExperienceDetail item={EXPERIENCES[6]} evenings={EVENINGS} onClose={() => {}} onSubmitted={() => {}} onViewEvening={() => {}} titleId="sys-inline-title" />
        </div>
        <Drawer open={open} onClose={() => setOpen(false)} labelledBy="sys-live-title">
          <ExperienceDetail item={EXPERIENCES[5]} evenings={EVENINGS} onClose={() => setOpen(false)} onSubmitted={() => {}} onViewEvening={() => setOpen(false)} titleId="sys-live-title" />
        </Drawer>
      </Spec>
    </div>
  );
}
