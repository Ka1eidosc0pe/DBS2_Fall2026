"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import { Check, Plus, Printer, Trash2, X } from "lucide-react";
import { SiteNav } from "./Nav";
import { HeritageFooter } from "./Footer";
import { SectionHeading } from "./Section";
import { ArchFrame } from "./Arch";
import { TileBand, TileBullet } from "./patterns";
import { Button } from "./Button";
import { FilterChip, Segmented } from "./Chips";
import { SelectField, TextField } from "./Fields";
import { EmptyState, ToastRegion, useToasts } from "./Feedback";
import { Drawer } from "./Drawer";
import { LandmarkCard, LandmarkDetail } from "./Landmark";
import { CityTimeline } from "./Timeline";
import { TrailList, routeSummary } from "./Trail";
import { DISTRICTS, ERAS, LANDMARKS, TYPES, eraOf, type DistrictId, type EraId, type Landmark, type TypeId } from "@/data/shophouse-heritage/heritage";

const LINKS = [
  { href: "#landmarks", label: "Landmarks" },
  { href: "#anatomy", label: "The shophouse" },
  { href: "#timeline", label: "Timeline" },
];

const ERA_OPTIONS = [{ value: "all", label: "All eras" }, ...ERAS.map((e) => ({ value: e.id, label: e.short }))];
const TYPE_OPTIONS = [{ value: "all", label: "All types" }, ...TYPES.map((t) => ({ value: t.id, label: t.label }))];

const ANATOMY = [
  { n: "I", t: "The five-foot way", d: "A covered walkway along the front of each house, set out in the first town plan so that shade and shelter ran the length of the street." },
  { n: "II", t: "Louvred shutters", d: "Timber louvres, tall and arched, pass air and cut the glare. Every house opens and closes with the weather." },
  { n: "III", t: "Glazed tiles", d: "Ceramic tiles line the five-foot way, the walls and the doorstep, in pinks, greens and blues set in careful repeats." },
  { n: "IV", t: "Ridge and eave", d: "Green glazed roof tiles and ceramic friezes crown the facade, with flowers and birds in coloured shards." },
];

export function HeritageSite() {
  const [districts, setDistricts] = useState<DistrictId[]>([]);
  const [era, setEra] = useState<EraId | "all">("all");
  const [type, setType] = useState<TypeId | "all">("all");
  const [trail, setTrail] = useState<string[]>([]);
  const [open, setOpen] = useState<Landmark | null>(null);
  const [trailOpen, setTrailOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [printed, setPrinted] = useState<string | null>(null);
  const [routeName, setRouteName] = useState("My Heritage Trail");
  const [nameError, setNameError] = useState<string | undefined>();
  const trigger = useRef<HTMLElement | null>(null);
  const { toasts, push, dismiss } = useToasts();

  const stops = useMemo(() => trail.map((id) => LANDMARKS.find((l) => l.id === id)!).filter(Boolean), [trail]);
  const filtered = useMemo(
    () =>
      LANDMARKS.filter(
        (l) => (!districts.length || districts.includes(l.district)) && (era === "all" || l.era === era) && (type === "all" || l.type === type),
      ),
    [districts, era, type],
  );
  const filtering = districts.length > 0 || era !== "all" || type !== "all";

  const clearFilters = () => {
    setDistricts([]);
    setEra("all");
    setType("all");
  };

  const toggleDistrict = (id: DistrictId) => setDistricts((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const openDetail = useCallback((l: Landmark, el: HTMLElement) => {
    trigger.current = el;
    setOpen(l);
  }, []);
  const closeDetail = useCallback(() => {
    setOpen(null);
    setTimeout(() => trigger.current?.focus({ preventScroll: true }), 0);
  }, []);

  const addStop = (l: Landmark) => {
    setTrail((t) => (t.includes(l.id) ? t : [...t, l.id]));
    setPrinted(null);
    push({ kind: "success", title: "Added to your trail", body: `${l.name} is stop ${trail.includes(l.id) ? trail.indexOf(l.id) + 1 : trail.length + 1}.` });
  };
  const removeStop = (id: string) => {
    const l = LANDMARKS.find((x) => x.id === id);
    setTrail((t) => t.filter((x) => x !== id));
    setPrinted(null);
    push({ kind: "info", title: "Removed from your trail", body: l?.name });
  };
  const toggleStop = (l: Landmark) => (trail.includes(l.id) ? removeStop(l.id) : addStop(l));

  // Primary action in the drawer: a short fake delay, then the stop joins the trail.
  const addFromDrawer = (l: Landmark) => {
    setAdding(true);
    setTimeout(() => {
      setAdding(false);
      addStop(l);
    }, 700);
  };

  const moveStop = (i: number, dir: -1 | 1) => {
    setTrail((t) => {
      const n = [...t];
      [n[i], n[i + dir]] = [n[i + dir], n[i]];
      return n;
    });
    setPrinted(null);
  };

  const print = () => {
    if (!routeName.trim()) {
      setNameError("Give your route a name.");
      return;
    }
    setNameError(undefined);
    setPrinting(true);
    setPrinted(null);
    setTimeout(() => {
      setPrinting(false);
      const text = `Your route is ready: ${routeSummary(stops).text}.`;
      setPrinted(text);
      push({ kind: "success", title: "Your route is ready", body: routeSummary(stops).text });
    }, 800);
  };

  const heroCols = [
    { src: "/images/shophouse-heritage/gopuram.jpg", alt: "The tiered gopuram of Sri Mariamman Temple against a blue sky.", pos: "50% 25%" },
    { src: "/images/shophouse-heritage/koon-seng.jpg", alt: "A row of pastel Peranakan shophouses on Koon Seng Road, in pink, sage, grey and terracotta.", pos: "52% 50%" },
    { src: "/images/shophouse-heritage/baba-house.jpg", alt: "A periwinkle Peranakan townhouse with arched shutters and a ceramic frieze.", pos: "38% 40%" },
  ];

  return (
    <div className="min-h-dvh bg-bg">
      <SiteNav current="site" links={LINKS} trailCount={trail.length} onOpenTrail={(el) => { trigger.current = el; setTrailOpen(true); }} />
      <main>
        {/* Hero */}
        <section className="px-5 pb-12 pt-12 text-center md:px-10 md:pb-20 md:pt-20">
          <div className="mx-auto max-w-4xl">
            <p className="sh-label inline-flex items-center gap-2 text-brand">
              <TileBullet size={12} />
              A self-guided walk through the old quarters
            </p>
            <h1 className="sh-display mt-5 text-[2.9rem] leading-[1] text-ink md:text-[5.5rem]">Walk the five-foot way</h1>
            <p className="mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-balance text-ink-muted md:text-xl md:leading-relaxed">
              {LANDMARKS.length} landmarks across Chinatown, Kampong Glam, Little India, Joo Chiat, Emerald Hill and the Civic District, linked by streets where the shade runs the length of the row.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button className="min-w-48 px-7" onClick={() => scrollTo("landmarks")}>Start your trail</Button>
              <Button variant="ghost" onClick={() => scrollTo("timeline")}>Read the timeline</Button>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 items-end gap-6 md:mt-16 md:grid-cols-[1fr_1.5fr_1fr] md:gap-8">
            {heroCols.map((h, i) => (
              <div key={h.src} className={i === 1 ? "mx-auto w-full max-w-sm md:max-w-none" : "hidden md:block"}>
                <ArchFrame
                  src={h.src}
                  alt={h.alt}
                  sizes={i === 1 ? "(min-width: 768px) 42vw, 90vw" : "26vw"}
                  ratio={i === 1 ? "4 / 5" : "3 / 4"}
                  arch
                  reveal
                  position={h.pos}
                  priority={i === 1}
                  imgClassName={i === 1 ? "origin-[50%_30%] scale-[1.28]" : undefined}
                />
              </div>
            ))}
          </div>
        </section>

        <TileBand height={56} />

        {/* Landmarks */}
        <section id="landmarks" aria-labelledby="landmarks-h" className="scroll-mt-16 px-5 py-16 md:px-10 md:py-28">
          <div className="mx-auto max-w-[84rem]">
            <SectionHeading eyebrow="The landmarks" title="Choose your stops" id="landmarks-h">
              Filter by quarter, era or kind of building. Open any landmark for its story, then add it to your trail.
            </SectionHeading>

            <div className="mt-12 rounded-card border border-line bg-surface p-4 md:mt-16 md:p-6">
              <div role="group" aria-label="Filter by district" className="flex flex-wrap gap-2">
                {DISTRICTS.map((d) => (
                  <FilterChip key={d.id} dot={d.color} selected={districts.includes(d.id)} onToggle={() => toggleDistrict(d.id)} count={LANDMARKS.filter((l) => l.district === d.id).length}>
                    {d.name}
                  </FilterChip>
                ))}
              </div>
              <div className="mt-5 grid gap-4 border-t border-line pt-5 md:grid-cols-[auto_16rem_1fr] md:items-end md:gap-6">
                <div>
                  <p className="sh-label mb-1.5 text-ink">Era</p>
                  <Segmented label="Era" value={era} onChange={setEra} options={ERA_OPTIONS.map((o) => ({ value: o.value as EraId | "all", label: o.label }))} className="md:w-auto" />
                </div>
                <SelectField label="Type" value={type} onChange={(e) => setType(e.target.value as TypeId | "all")} options={TYPE_OPTIONS} />
                <div className="flex items-center justify-between gap-2 md:justify-end md:gap-4">
                  <p aria-live="polite" className="text-[0.9375rem] text-ink-muted">
                    <span className="sh-title text-xl text-ink">{filtered.length}</span> of {LANDMARKS.length} landmarks
                  </p>
                  <Button variant="ghost" size="sm" onClick={clearFilters} disabled={!filtering} icon={<X size={15} strokeWidth={1.5} aria-hidden />}>
                    Clear filters
                  </Button>
                </div>
              </div>
            </div>

            {filtered.length ? (
              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {filtered.map((l, i) => (
                  <li key={l.id} className="contents">
                    <LandmarkCard landmark={l} index={i} featured={i % 3 === 1} added={trail.includes(l.id)} onOpen={openDetail} onToggle={toggleStop} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                className="mt-10"
                title="No landmarks match."
                action={<Button variant="secondary" onClick={clearFilters}>Clear filters</Button>}
              >
                The archive is quiet. Try a different district, era or type.
              </EmptyState>
            )}
          </div>
        </section>

        {/* Anatomy */}
        <section id="anatomy" aria-labelledby="anatomy-h" className="scroll-mt-16 bg-surface px-5 py-16 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-[84rem] items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div className="mx-auto grid w-full max-w-md grid-cols-[1.15fr_1fr] items-end gap-4 lg:max-w-none">
              <ArchFrame src="/images/shophouse-heritage/five-foot-way.jpg" alt="A cobalt-blue five-foot way with a rounded arch and a green tiled floor." sizes="(min-width: 1024px) 28vw, 60vw" ratio="3 / 4.4" arch reveal position="50% 45%" />
              <ArchFrame src="/images/shophouse-heritage/baba-house-2.jpg" alt="Sun-faded louvred shutters and painted signboards above a Peranakan five-foot way." sizes="(min-width: 1024px) 24vw, 40vw" ratio="3 / 4" position="45% 20%" />
            </div>
            <div>
              <SectionHeading eyebrow="Reading the street" title="Anatomy of a shophouse" align="left" id="anatomy-h">
                Learn four things to look for, and every street on the trail starts to read.
              </SectionHeading>
              <ol className="mt-10 divide-y divide-line border-y border-line">
                {ANATOMY.map((a) => (
                  <li key={a.n} className="grid grid-cols-[3rem_1fr] gap-4 py-5">
                    <span className="sh-year text-3xl leading-none text-brand">{a.n}</span>
                    <div>
                      <h3 className="sh-title text-xl text-ink">{a.t}</h3>
                      <p className="mt-1.5 text-[1.0625rem] leading-relaxed text-ink-muted">{a.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" aria-labelledby="timeline-h" className="scroll-mt-16 px-5 py-16 md:px-10 md:py-28">
          <div className="mx-auto max-w-[84rem]">
            <SectionHeading eyebrow="A city in dates" title="From 1819 to today" id="timeline-h">
              Choose a date to filter the landmarks by its era.
            </SectionHeading>
            <div className="mt-14 md:mt-20">
              <CityTimeline
                era={era}
                onEra={(e) => {
                  setEra(e);
                  if (e !== "all") {
                    push({ kind: "info", title: `Showing ${eraOf(e).label}`, body: eraOf(e).span });
                    setTimeout(() => scrollTo("landmarks"), 150);
                  }
                }}
              />
            </div>
            <p className="mx-auto mt-8 max-w-xl text-center text-sm text-ink-muted">
              {era === "all" ? "No era chosen. All landmarks are showing." : `Filtering by ${eraOf(era).label}, ${eraOf(era).span}. Select the date again to clear it.`}
            </p>
          </div>
        </section>
      </main>
      <HeritageFooter current="site" />

      {/* Landmark drawer */}
      {open && (
        <Drawer
          open
          onClose={closeDetail}
          title={open.name}
          eyebrow="Landmark"
          footer={
            trail.includes(open.id) ? (
              <div className="flex gap-3">
                <Button variant="secondary" className="flex-1" icon={<Check size={16} strokeWidth={1.75} aria-hidden />} onClick={() => setTrailOpen(true)}>
                  On your trail
                </Button>
                <Button variant="ghost" icon={<Trash2 size={16} strokeWidth={1.5} aria-hidden />} onClick={() => removeStop(open.id)}>
                  Remove
                </Button>
              </div>
            ) : (
              <Button className="w-full" loading={adding} icon={<Plus size={16} strokeWidth={1.75} aria-hidden />} onClick={() => addFromDrawer(open)}>
                {adding ? "Adding" : "Add to trail"}
              </Button>
            )
          }
        >
          <LandmarkDetail landmark={open} />
        </Drawer>
      )}

      {/* My trail */}
      {trailOpen && (
        <Drawer
          open
          onClose={() => {
            setTrailOpen(false);
            setTimeout(() => trigger.current?.focus({ preventScroll: true }), 0);
          }}
          title="My trail"
          eyebrow={`${trail.length} ${trail.length === 1 ? "stop" : "stops"}`}
          width="md:max-w-[30rem]"
        >
          <div className="space-y-6 px-5 pb-8 pt-6 md:px-7">
            {stops.length > 0 && (
              <TextField
                label="Route name"
                value={routeName}
                maxLength={40}
                onChange={(e) => {
                  setRouteName(e.target.value);
                  if (e.target.value.trim()) setNameError(undefined);
                }}
                error={nameError}
              />
            )}
            <TrailList
              stops={stops}
              onMove={moveStop}
              onRemove={removeStop}
              onClear={() => {
                setTrail([]);
                setPrinted(null);
                push({ kind: "info", title: "Trail cleared" });
              }}
              onPrint={print}
              printing={printing}
              printed={printed}
              onBrowse={() => {
                setTrailOpen(false);
                setTimeout(() => scrollTo("landmarks"), 50);
              }}
            />
            {stops.length > 0 && (
              <p className="flex items-start gap-2 text-sm text-ink-muted">
                <Printer size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" aria-hidden />
                Walking times are rough, and include the approach to each stop.
              </p>
            )}
          </div>
        </Drawer>
      )}
      <ToastRegion toasts={toasts} dismiss={dismiss} />
    </div>
  );
}
