import { Plus } from "lucide-react";
import { EXPERIENCES } from "@/data/marina-noir/experiences";
import { Button, IconButton } from "@/components/marina-noir/Button";
import { Checkbox, Radio, SearchInput, Select, Stepper, Switch, TextInput, Textarea } from "@/components/marina-noir/Fields";
import { FilterChip, Segmented } from "@/components/marina-noir/Chip";
import { ExperienceCard } from "@/components/marina-noir/ExperienceCard";
import type { ForceState } from "@/components/marina-noir/cx";

type Col = { key: string; label: string; state?: ForceState };
const COLS: Col[] = [
  { key: "default", label: "Default" },
  { key: "hover", label: "Hover", state: "hover" },
  { key: "focus", label: "Focus-visible", state: "focus" },
  { key: "active", label: "Pressed", state: "active" },
  { key: "selected", label: "Selected", state: "selected" },
  { key: "disabled", label: "Disabled", state: "disabled" },
  { key: "loading", label: "Loading", state: "loading" },
  { key: "error", label: "Error", state: "error" },
];

type Row = {
  name: string;
  note: string;
  /** Which columns apply. Others render an en dash. */
  states: string[];
  render: (s?: ForceState) => React.ReactNode;
};

const sample = EXPERIENCES[3];

const ROWS: Row[] = [
  { name: "Primary button", note: "Champagne. The one action.", states: ["default", "hover", "focus", "active", "disabled", "loading"], render: (s) => <Button variant="primary" forceState={s}>Reserve</Button> },
  { name: "Secondary button", note: "Ivory hairline", states: ["default", "hover", "focus", "active", "disabled", "loading"], render: (s) => <Button variant="secondary" forceState={s}>View</Button> },
  { name: "Ghost button", note: "Tertiary text action", states: ["default", "hover", "focus", "active", "disabled"], render: (s) => <Button variant="ghost" forceState={s}>Remove</Button> },
  { name: "Destructive button", note: "Cinnabar hairline", states: ["default", "hover", "focus", "active", "disabled", "loading"], render: (s) => <Button variant="destructive" forceState={s}>Cancel</Button> },
  { name: "Icon button", note: "44 × 44", states: ["default", "hover", "focus", "active", "disabled"], render: (s) => <IconButton label="Add" forceState={s}><Plus aria-hidden strokeWidth={1} /></IconButton> },
  { name: "Text input", note: "Brass edge, ivory on focus", states: ["default", "hover", "focus", "disabled", "error"], render: (s) => <TextInput aria-label="Name" placeholder="Your name" defaultValue={s === "error" ? "Smith" : undefined} forceState={s} className="w-full" /> },
  { name: "Search", note: "With clear", states: ["default", "hover", "focus", "disabled"], render: (s) => <SearchInput aria-label="Search" placeholder="Search" value="" readOnly forceState={s} className="w-full" /> },
  { name: "Select", note: "Native, restyled", states: ["default", "hover", "focus", "disabled", "error"], render: (s) => <Select aria-label="Evening" forceState={s} defaultValue="" className="w-full"><option value="">Choose</option></Select> },
  { name: "Textarea", note: "Counter below", states: ["default", "hover", "focus", "disabled", "error"], render: (s) => <Textarea aria-label="Note" rows={2} placeholder="A note" forceState={s} className="w-full !min-h-20" /> },
  { name: "Checkbox", note: "Oxblood when set", states: ["default", "hover", "focus", "active", "selected", "disabled"], render: (s) => <Checkbox label="Option" forceState={s} /> },
  { name: "Radio", note: "A diamond, to keep corners sharp", states: ["default", "hover", "focus", "selected", "disabled"], render: (s) => <Radio name={`r-${s ?? "d"}`} label="Option" forceState={s} /> },
  { name: "Switch", note: "Square thumb", states: ["default", "hover", "focus", "active", "selected", "disabled"], render: (s) => <Switch label="Black tie" checked={false} forceState={s} /> },
  { name: "Stepper", note: "Party size", states: ["default", "hover", "focus", "disabled", "error"], render: (s) => <Stepper label="Party" value={2} forceState={s} /> },
  { name: "Filter chip", note: "The one pill", states: ["default", "hover", "focus", "active", "selected", "disabled"], render: (s) => <FilterChip forceState={s}>Dine</FilterChip> },
  { name: "Segmented control", note: "Lacquer rule on the active segment", states: ["default", "hover", "focus", "active", "selected", "disabled"], render: (s) => (
      <Segmented label="Sort" value="b" options={[{ value: "a", label: "One" }, { value: "b", label: "Two" }]} force={s ? { value: s === "selected" ? "a" : "b", state: s } : undefined} />
    ) },
];

export function Matrix() {
  return (
    <div className="mn-matrix-scroll -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
      <table className="w-full min-w-[1360px] table-fixed border-collapse text-left">
        <caption className="sr-only">Every control in every state. Forced states use the same selectors as the real pseudo-classes.</caption>
        <thead>
          <tr>
            <th scope="col" className="mn-label sticky left-0 z-10 w-32 border-b border-line-strong bg-surface p-4 text-ink-subtle">Control</th>
            {COLS.map((c) => (
              <th key={c.key} scope="col" className="mn-label border-b border-line-strong px-2 py-4 text-ink-muted">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.name} className="align-middle">
              <th scope="row" className="sticky left-0 z-10 border-b border-line bg-surface p-4 text-left font-normal">
                <span className="mn-label block text-ink">{r.name}</span>
                <span className="mn-caption mt-1 block text-ink-subtle">{r.note}</span>
              </th>
              {COLS.map((c) => (
                <td key={c.key} className="border-b border-line px-2 py-4">
                  {r.states.includes(c.key) ? r.render(c.state) : <span aria-label="Not applicable" className="text-ink-subtle">–</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



const CARD_COLS: { label: string; state?: ForceState; evening?: boolean }[] = [
  { label: "Default" },
  { label: "Hover", state: "hover" },
  { label: "Focus-visible", state: "focus" },
  { label: "Selected: in your evening", evening: true },
  { label: "Disabled", state: "disabled" },
];

export function CardStates() {
  return (
    <div className="mt-20">
      <h3 className="mn-label border-b border-line-strong pb-3 text-ink">Card</h3>
      <p className="mn-caption mt-3 text-ink-subtle">Hover lifts the rule and nudges the arrow; selected means the experience is already in your evening.</p>
      <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
        {CARD_COLS.map((c) => (
          <div key={c.label}>
            <p className="mn-label mb-4 text-ink-muted">{c.label}</p>
            <ExperienceCard item={sample} forceState={c.state} inEvening={c.evening} imageClass="aspect-[4/3]" sizes="280px" className="[&_h3]:text-[1.25rem] [&_p:last-of-type]:hidden" />
          </div>
        ))}
      </div>
    </div>
  );
}
