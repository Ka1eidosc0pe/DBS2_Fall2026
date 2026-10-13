"use client";

import { ArrowRight } from "lucide-react";
import { useId, useRef, useState } from "react";
import type { Experience, Request, Seating } from "@/data/marina-noir/experiences";
import { Button } from "./Button";
import { DrawerHeader } from "./Drawer";
import { Badge } from "./Badge";
import { DoubleRule } from "./Ornament";
import { Field, Radio, Select, Stepper, Textarea, FieldError } from "./Fields";
import { Credit, Photo } from "./Photo";
import { SuccessState } from "./States";
import { cx } from "./cx";

export type Evening = { value: string; label: string };

const NOTE_MAX = 200;
const PARTY_MAX = 8;

/** Detail panel: image, story, the details, and the reservation request form with the primary action. */
export function ExperienceDetail({
  item,
  evenings,
  existing,
  onClose,
  onSubmitted,
  onViewEvening,
  onInvalid,
  titleId,
}: {
  item: Experience;
  evenings: Evening[];
  existing?: Request;
  onClose: () => void;
  onSubmitted: (r: Request) => void;
  onViewEvening: () => void;
  onInvalid?: () => void;
  titleId: string;
}) {
  const uid = useId();
  const [date, setDate] = useState(existing?.date ?? "");
  const [party, setParty] = useState<number | null>(existing?.party ?? null);
  const [seating, setSeating] = useState<Seating | null>(existing?.seating ?? null);
  const [note, setNote] = useState(existing?.note ?? "");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [tried, setTried] = useState(false);
  const partyRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  const partyError = party !== null && party > PARTY_MAX ? `Tables above ${PARTY_MAX} are arranged privately. Please choose ${PARTY_MAX} or fewer, and mention the full party in your note.` : null;
  const noteError = note.length > NOTE_MAX ? `That is ${note.length - NOTE_MAX} characters over the ${NOTE_MAX} allowed.` : null;
  const ready = date !== "" && party !== null;
  const loading = status === "loading";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || loading) return;
    setTried(true);
    if (partyError || noteError) {
      (partyError ? partyRef.current?.querySelector("button") : noteRef.current)?.focus();
      onInvalid?.();
      return;
    }
    setStatus("loading");
    const ms = 600 + Math.round(Math.random() * 300);
    window.setTimeout(() => {
      const label = evenings.find((d) => d.value === date)?.label ?? date;
      onSubmitted({ id: item.id, date, dateLabel: label, party: party!, seating, note: note.trim() });
      setStatus("done");
    }, ms);
  }

  const details: [string, string][] = [
    ["Neighborhood", item.neighborhood],
    ["Dress", item.dress],
    ["Best time", item.bestTime],
    ["Last seating", item.lastSeatingLabel],
    ["Tier", item.tier],
  ];

  return (
    <form onSubmit={submit} noValidate className="flex min-h-0 flex-1 flex-col">
      <DrawerHeader eyebrow={`${item.kind} · ${item.neighborhood}`} onClose={onClose} />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="mn-photo relative aspect-[16/10] w-full bg-surface-2 md:aspect-[16/9]">
          <Photo src={item.image} alt={item.imageAlt} sizes="(min-width: 768px) 620px, 100vw" position={item.position} />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          <Credit file={item.image} className="absolute right-4 bottom-3 z-10" tone="text-ink/70" />
        </div>
        <div className="px-6 pb-10 md:px-10">
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Badge>{item.kind}</Badge>
            {item.blackTie && <Badge tone="brand">Black tie</Badge>}
            {existing && <Badge tone="success">Requested</Badge>}
          </div>
          <h2 id={titleId} className="mn-headline mt-5 text-[2rem]! lg:text-[2.75rem]!">
            {item.name}
          </h2>
          <p className="mn-caption mt-2 text-ink-muted">{item.place}</p>
          <div className="mt-6 flex flex-col gap-4">
            {item.about.map((p, i) => (
              <p key={i} className="mn-body max-w-[58ch] text-ink-muted">
                {p}
              </p>
            ))}
          </div>

          <h3 className="mn-label mt-10 text-ink">The details</h3>
          <DoubleRule className="mt-3" />
          <dl className="mt-1">
            {details.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-line py-3.5">
                <dt className="mn-label text-ink-subtle">{k}</dt>
                <dd className="mn-body text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          {status !== "done" ? (
            <div className="mt-12 flex flex-col gap-8">
              <div>
                <h3 className="mn-title">{existing ? "Update your request" : "Request a reservation"}</h3>
                <p className="mn-caption mt-2 text-ink-muted">Your concierge confirms by morning. Nothing is charged.</p>
              </div>
              <Field label="Evening" htmlFor={`${uid}-date`}>
                <Select id={`${uid}-date`} value={date} onChange={(e) => setDate(e.target.value)} disabled={loading}>
                  <option value="">Choose an evening</option>
                  {evenings.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </Select>
              </Field>
              <div ref={partyRef} className="flex flex-col gap-2.5">
                <span id={`${uid}-party`} className="mn-label text-ink-muted">
                  Party size
                </span>
                <Stepper label="Party size" value={party} onChange={setParty} min={1} max={12} invalid={!!partyError} describedBy={partyError ? `${uid}-party-error` : undefined} forceState={loading ? "disabled" : undefined} />
                {partyError ? <FieldError id={`${uid}-party-error`}>{partyError}</FieldError> : <p className="mn-caption text-ink-subtle">Up to {PARTY_MAX} guests.</p>}
              </div>
              <fieldset className="flex flex-col gap-1" disabled={loading}>
                <legend className="mn-label mb-2.5 text-ink-muted">Seating</legend>
                <div className="flex flex-wrap gap-x-8">
                  {item.seating.map((s) => (
                    <Radio key={s} name={`${uid}-seat`} label={s} checked={seating === s} onChange={() => setSeating(s)} />
                  ))}
                </div>
              </fieldset>
              <Field label="A note for your concierge" htmlFor={`${uid}-note`} optional error={tried || note.length > NOTE_MAX ? noteError : null}>
                <Textarea
                  id={`${uid}-note`}
                  ref={noteRef}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="An anniversary, a dietary need, a window table."
                  aria-describedby={noteError ? `${uid}-note-error` : undefined}
                  aria-invalid={noteError ? true : undefined}
                  disabled={loading}
                />
                <p className={cx("mn-caption self-end tabular-nums", noteError ? "text-danger" : "text-ink-subtle")}>
                  {note.length} / {NOTE_MAX}
                </p>
              </Field>
            </div>
          ) : (
            <SuccessState
              className="mt-8"
              title="Your concierge will confirm by morning."
              actions={
                <>
                  <Button variant="secondary" onClick={onViewEvening}>
                    View your evening
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                    Keep browsing
                  </Button>
                </>
              }
            >
              {item.place} has been added to your evening for {evenings.find((d) => d.value === date)?.label ?? "the date you chose"}.
            </SuccessState>
          )}
        </div>
      </div>
      {status !== "done" && (
        <footer className="shrink-0 border-t border-t-(--brass) border-b-0 bg-surface-2 px-6 py-4 md:px-10">
          <div className="flex items-center justify-between gap-5">
            <p className="mn-caption hidden text-ink-muted sm:block" aria-live="polite">
              {ready ? "Ready to send." : "Choose an evening and party size to continue."}
            </p>
            <Button type="submit" variant="primary" size="lg" loading={loading} disabled={!ready} className="w-full sm:w-auto" icon={loading ? undefined : <ArrowRight aria-hidden strokeWidth={1} className="size-[18px]" />}>
              {loading ? "Sending" : existing ? "Update request" : "Request reservation"}
            </Button>
          </div>
        </footer>
      )}
    </form>
  );
}
