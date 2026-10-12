"use client";
import { useState } from "react";
import { ArrowUp, Plus } from "lucide-react";
import { Button, IconButton } from "./Button";
import { Checkbox, Radio, SearchField, SelectField, Switch, TextField } from "./Fields";
import { FilterChip, Segmented } from "./Chips";
import { CardSkeleton, EmptyState, ErrorState, SuccessState } from "./Feedback";
import { CityTimeline } from "./Timeline";
import { TrailList, routeSummary } from "./Trail";
import { LandmarkCard } from "./Landmark";
import { ERAS, LANDMARKS } from "@/data/shophouse-heritage/heritage";
import type { ForceState } from "./cx";

type Col = "default" | "hover" | "focus" | "active" | "selected" | "disabled" | "loading" | "error";
const COLS: { id: Col; label: string }[] = [
  { id: "default", label: "Default" },
  { id: "hover", label: "Hover" },
  { id: "focus", label: "Focus-visible" },
  { id: "active", label: "Pressed" },
  { id: "selected", label: "Selected" },
  { id: "disabled", label: "Disabled" },
  { id: "loading", label: "Loading" },
  { id: "error", label: "Error" },
];

const NA = <span aria-label="Not applicable" className="text-ink-subtle">·</span>;

type Row = { name: string; note?: string; cell: (c: Col, f: ForceState | undefined) => React.ReactNode | null };

const f = (c: Col): ForceState | undefined => (c === "default" ? undefined : (c as ForceState));
const noop = () => {};

const ERA_OPTS = [{ value: "all", label: "All" }, ...ERAS.map((e) => ({ value: e.id, label: e.short }))];

const ROWS: Row[] = [
  { name: "Primary button", note: "Coral, ink text", cell: (c, s) => (c === "selected" || c === "error" ? null : <Button forceState={s} size="sm" icon={<Plus size={16} strokeWidth={1.75} aria-hidden />}>Add to trail</Button>) },
  { name: "Secondary button", cell: (c, s) => (c === "selected" || c === "error" ? null : <Button variant="secondary" size="sm" forceState={s}>Print route</Button>) },
  { name: "Ghost button", cell: (c, s) => (c === "selected" || c === "error" || c === "loading" ? null : <Button variant="ghost" size="sm" forceState={s}>Clear trail</Button>) },
  { name: "Destructive button", cell: (c, s) => (c === "selected" || c === "error" || c === "loading" ? null : <Button variant="destructive" size="sm" forceState={s}>Remove stop</Button>) },
  { name: "Icon button", cell: (c, s) => (c === "selected" || c === "error" ? null : <IconButton label="Move up" forceState={s} variant="ghost"><ArrowUp size={18} strokeWidth={1.5} aria-hidden /></IconButton>) },
  { name: "Text input", cell: (c, s) => (c === "selected" || c === "active" || c === "loading" ? null : <TextField className="w-44" label="Name" defaultValue={c === "default" ? "" : "Ada Lim"} placeholder="Your name" forceState={s} error={c === "error" ? "Enter a name." : undefined} />) },
  { name: "Search", cell: (c, s) => (c === "selected" || c === "active" || c === "loading" || c === "error" ? null : <SearchField className="w-44" label="Search" placeholder="Search" value="" forceState={s} />) },
  { name: "Select", cell: (c, s) => (c === "selected" || c === "active" || c === "loading" ? null : <SelectField className="w-44" label="Type" hideLabel options={[{ value: "all", label: "All types" }]} forceState={s} error={c === "error" ? "Choose a type." : undefined} />) },
  { name: "Checkbox", cell: (c, s) => (c === "loading" || c === "error" || c === "active" ? null : <Checkbox label="Large print" forceState={s} />) },
  { name: "Radio", cell: (c, s) => (c === "loading" || c === "error" || c === "active" ? null : <Radio name={"r-" + c} label="Brisk" forceState={s} />) },
  { name: "Switch", cell: (c, s) => (c === "loading" || c === "error" || c === "active" ? null : <Switch label="Shade" forceState={s} />) },
  { name: "Filter chip", cell: (c, s) => (c === "loading" || c === "error" ? null : <FilterChip dot="var(--d-kampong-glam)" forceState={s}>Kampong Glam</FilterChip>) },
  { name: "Segmented control", cell: (c) => (c === "loading" || c === "error" ? null : <Segmented label={"Era " + c} value={c === "selected" ? "straits" : "all"} options={[ERA_OPTS[0], ERA_OPTS[2]]} forceStates={c === "default" ? undefined : c === "selected" ? undefined : { straits: f(c) as ForceState }} />) },
  { name: "Timeline date", cell: (c) => (c === "loading" || c === "error" ? null : <div className="w-56"><CityTimeline era={c === "selected" ? "early" : "all"} onEra={noop} forceStates={c === "default" || c === "selected" ? undefined : { "1819": f(c) as ForceState }} compact /></div>) },
];

export function StatesMatrix() {
  return (
    <div className="relative overflow-x-auto rounded-card border border-line bg-surface [scrollbar-width:thin]" tabIndex={0} role="region" aria-label="Control state matrix, scrolls sideways">
      <table className="w-full min-w-[78rem] border-collapse text-left">
        <caption className="sr-only">Each control in each state</caption>
        <thead>
          <tr className="border-b border-line bg-surface-2">
            <th scope="col" className="sticky left-0 z-10 w-44 bg-surface-2 px-4 py-3 sh-label text-ink">Control</th>
            {COLS.map((c) => (
              <th key={c.id} scope="col" className="px-3 py-3 sh-label text-ink">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.name} className="border-b border-line align-middle last:border-0">
              <th scope="row" className="sticky left-0 z-10 bg-surface px-4 py-4 text-sm font-semibold text-ink">
                {r.name}
                {r.note && <span className="block text-xs font-normal text-ink-muted">{r.note}</span>}
              </th>
              {COLS.map((c) => {
                const node = r.cell(c.id, f(c.id));
                return (
                  <td key={c.id} className="px-3 py-4 align-middle">
                    {node ?? NA}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function UiStates() {
  const [printing, setPrinting] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const stops = LANDMARKS.slice(0, 4);
  const sample = LANDMARKS[2];
  const [err, setErr] = useState(true);
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-2">
      <Panel title="Empty: nothing on the trail yet">
        <TrailList stops={[]} onMove={noop} onRemove={noop} onPrint={noop} onBrowse={noop} />
      </Panel>
      <Panel title="No results: a filter that finds nothing">
        <EmptyState title="No landmarks match." action={<Button variant="secondary">Clear filters</Button>}>
          The archive is quiet. Try a different district or era.
        </EmptyState>
      </Panel>
      <Panel title="Loading: skeletons while landmarks arrive">
        <div className="grid gap-4 sm:grid-cols-2">
          <CardSkeleton arch />
          <CardSkeleton />
        </div>
      </Panel>
      <Panel title="Error: with a retry">
        {err ? (
          <ErrorState onRetry={() => setErr(false)} />
        ) : (
          <div className="rounded-card border border-line bg-surface-2 p-6 text-center text-ink-muted">
            Retried. <button className="underline underline-offset-4" onClick={() => setErr(true)}>Show the error again</button>
          </div>
        )}
      </Panel>
      <Panel title="Success: the route is ready">
        <SuccessState title={`Your route is ready: ${routeSummary(stops).text}.`}>
          Print it, fold it, and keep to the shade.
        </SuccessState>
      </Panel>
      <Panel title="Live: Print my route, with loading and success">
        <TrailList
          stops={stops.slice(0, 2)}
          onMove={noop}
          onRemove={noop}
          printing={printing}
          printed={done}
          onPrint={() => {
            setPrinting(true);
            setDone(null);
            setTimeout(() => {
              setPrinting(false);
              setDone(`Your route is ready: ${routeSummary(stops.slice(0, 2)).text}.`);
            }, 800);
          }}
        />
      </Panel>
      <Panel title="Card hover, in place" className="lg:col-span-2">
        <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
          <LandmarkCard landmark={sample} onOpen={noop} onToggle={noop} forceState="hover" />
          <LandmarkCard landmark={sample} added onOpen={noop} onToggle={noop} />
        </div>
      </Panel>
    </div>
  );
}

function Panel({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={"min-w-0 rounded-card border border-line bg-bg p-5 md:p-6 " + className}>
      <p className="sh-label mb-4 text-brand">{title}</p>
      {children}
    </div>
  );
}
