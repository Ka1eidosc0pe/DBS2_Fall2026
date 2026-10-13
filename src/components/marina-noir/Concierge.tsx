"use client";

import { ArrowDown, ArrowRight, GlassWater } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { EXPERIENCES, KINDS, SORTS, byId, type Experience, type Kind, type Request, type Sort } from "@/data/marina-noir/experiences";
import { CountBadge } from "./Badge";
import { Button } from "./Button";
import { FilterChip, Segmented } from "./Chip";
import { Drawer } from "./Drawer";
import { EveningPanel } from "./EveningPanel";
import { ExperienceCard } from "./ExperienceCard";
import { ExperienceDetail, type Evening } from "./ExperienceDetail";
import { SearchInput, Select, Switch } from "./Fields";
import { CrossLinks, NavBar } from "./NavBar";
import { DoubleRule, FanPattern, Sunburst } from "./Ornament";
import { Credit, Photo } from "./Photo";
import { NoResults } from "./States";
import { ToastRegion, useToasts } from "./ToastRegion";
import { cx, T } from "./cx";

const HERO = "/images/marina-noir/skyline-water.jpg";

function nextEvenings(): Evening[] {
  const f = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" });
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    const label = f.format(d);
    return { value: d.toISOString().slice(0, 10), label: i === 0 ? `Tomorrow, ${label.split(", ").pop() ?? label}` : label };
  });
}

/** Rises into view once. Respects reduced motion. */
function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cx("transition-[opacity,transform] duration-(--dur-3) ease-(--ease)", shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100", className)}>
      {children}
    </div>
  );
}

/* Layout pattern for the asymmetric editorial grid, repeated: 7+5, then 4+4+4. */
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];
const CROPS = ["aspect-[4/3] lg:aspect-auto lg:h-[540px]", "aspect-[4/3] lg:aspect-auto lg:h-[540px]", "aspect-[4/3]", "aspect-[4/3]", "aspect-[4/3]"];

export function Concierge() {
  const [kind, setKind] = useState<Kind | "All">("All");
  const [blackTie, setBlackTie] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("curated");

  const [requests, setRequests] = useState<Record<string, Request>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [eveningOpen, setEveningOpen] = useState(false);
  const [evenings, setEvenings] = useState<Evening[]>([]);
  const { items: toasts, push, dismiss } = useToasts();
  const uid = useId();

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = EXPERIENCES.filter(
      (e) =>
        (kind === "All" || e.kind === kind) &&
        (!blackTie || e.blackTie) &&
        (!q || [e.name, e.place, e.neighborhood, e.tagline, e.kind].join(" ").toLowerCase().includes(q)),
    );
    if (sort === "latest") out.sort((a, b) => (b.lastSeating || 24) - (a.lastSeating || 24));
    if (sort === "private") out.sort((a, b) => b.privacy - a.privacy);
    return out;
  }, [kind, blackTie, query, sort]);

  const countFor = (k: Kind | "All") => EXPERIENCES.filter((e) => (k === "All" || e.kind === k) && (!blackTie || e.blackTie)).length;
  const filtered = kind !== "All" || blackTie || query.trim() !== "";
  const clearFilters = () => {
    setKind("All");
    setBlackTie(false);
    setQuery("");
  };

  const open = useCallback((item: Experience) => {
    setEvenings(nextEvenings());
    setActiveId(item.id);
    setDetailOpen(true);
  }, []);

  const active = activeId ? byId(activeId) : undefined;
  const entries = Object.values(requests)
    .map((r) => ({ request: r, item: byId(r.id)! }))
    .filter((e) => e.item);
  const count = entries.length;

  const scrollToCollection = () => document.getElementById("collection")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });

  return (
    <div className="overflow-x-clip bg-bg">
      <CrossLinks current="site" />
      <div className="sticky top-0 z-30">
        <NavBar
          items={[
            { label: "Experiences", href: "#collection" },
            { label: "Three nights", href: "#nights" },
            { label: "Mood board", href: "/marina-noir/moodboard/" },
            { label: "Design system", href: "/marina-noir/system/" },
          ]}
          end={
            <button
              type="button"
              onClick={() => setEveningOpen(true)}
              className={cx("mn-label inline-flex min-h-11 cursor-pointer items-center gap-3 whitespace-nowrap border border-(--control-line) px-3.5 text-ink hover:border-ink hover:bg-ink/[0.07] active:bg-ink/[0.14] sm:px-4", T, "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus")}
            >
              Your evening
              {count > 0 && <CountBadge count={count} label={count === 1 ? "request" : "requests"} />}
            </button>
          }
        />
      </div>

      <main>
        {/* HERO */}
        <section aria-labelledby="hero-h" className="relative isolate flex min-h-[calc(100svh-7rem)] items-end overflow-hidden border-b border-line-strong">
          <div className="mn-photo absolute inset-0 -z-20 [&_img]:!brightness-[1.3] [&_img]:!saturate-[0.9]">
            <Photo src={HERO} alt="Marina Bay's towers reflected in dark water at night" sizes="100vw" priority position="50% 62%" />
          </div>
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/55 to-transparent lg:via-bg/25" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-bg/85 via-bg/30 to-transparent lg:via-bg/10" />
          <Sunburst className="absolute right-[-6rem] bottom-0 -z-10 hidden w-[620px] text-ink/25 lg:block" rays={42} />
          <div className="mx-auto w-full max-w-[1440px] px-5 pt-32 pb-14 md:px-10 lg:pb-24">
            <p className="mn-label mn-rise text-ink-muted">The Concierge · Singapore after dark</p>
            <h1 id="hero-h" className="mn-display mn-rise mt-6 max-w-[11ch] lg:text-[7.5rem]" style={{ ["--d" as string]: "120ms" }}>
              After dark, <span className="mn-italic">by invitation.</span>
            </h1>
            <p className="mn-lead mn-rise mt-7 max-w-[40ch] text-ink-muted" style={{ ["--d" as string]: "260ms" }}>
              A private guide to twelve evenings in Marina Bay and beyond: the chef&rsquo;s counter, the rooftop, the suite with the view.
            </p>
            <div className="mn-rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ ["--d" as string]: "400ms" }}>
              <Button variant="primary" size="lg" onClick={scrollToCollection} icon={<ArrowDown aria-hidden strokeWidth={1} className="size-[18px]" />}>
                Plan an evening
              </Button>
              <a href="#nights" className="mn-label inline-flex min-h-11 items-center text-ink-muted underline decoration-line-strong underline-offset-8 transition-colors duration-(--dur-1) hover:text-ink hover:decoration-ink">
                Three ways to spend a night
              </a>
            </div>
            <div className="mt-16 hidden items-end justify-between lg:flex">
              <p className="mn-caption text-ink-subtle">Dress: smart elegant. Reservations by request.</p>
              <Credit file={HERO} tone="text-ink/70" />
            </div>
            <div className="mt-10 lg:hidden"><Credit file={HERO} tone="text-ink/70" /></div>
          </div>
        </section>

        {/* INTRO */}
        <section aria-label="Introduction" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 lg:py-36">
          <Reveal className="grid items-end gap-x-16 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="mn-numeral" aria-hidden>57</p>
              <p className="mn-label mt-4 text-ink-muted">Floors up, at the SkyPark</p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <DoubleRule className="mb-8 w-20" />
              <p className="mn-lead max-w-[46ch]">
                Singapore is at its best after the heat has gone. The bay turns black, the towers come on, and the colonial hotels glow like lanterns. We keep a short list of places worth dressing for, and a concierge to ask for the right table.
              </p>
            </div>
          </Reveal>
        </section>

        {/* COLLECTION */}
        <section id="collection" aria-labelledby="collection-h" className="scroll-mt-28 border-t border-line">
          <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 lg:py-32">
            <div className="grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="mn-label text-ink-subtle">The collection</p>
                <h2 id="collection-h" className="mn-headline mt-3">Twelve evenings</h2>
              </div>
              <p className="mn-lead max-w-[44ch] self-end text-ink-muted lg:col-span-5 lg:col-start-8">
                Four kinds of night. Choose one, or let the concierge compose the whole thing.
              </p>
            </div>

            {/* Controls */}
            <div className="mt-14 border-y border-line-strong py-6 lg:py-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div role="group" aria-label="Filter by kind" className="flex flex-wrap gap-2">
                  {(["All", ...KINDS] as const).map((k) => (
                    <FilterChip key={k} selected={kind === k} count={countFor(k)} onClick={() => setKind(k)}>
                      {k}
                    </FilterChip>
                  ))}
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                  <Switch label="Black tie only" checked={blackTie} onCheckedChange={setBlackTie} />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-8">
                <SearchInput aria-label="Search the collection" placeholder="Search the collection" value={query} onChange={(e) => setQuery(e.target.value)} onClear={() => setQuery("")} className="sm:max-w-md" />
                <div className="flex min-w-0 items-center gap-4">
                  <label htmlFor={`${uid}-sort`} className="mn-label shrink-0 text-ink-muted lg:hidden">Sort</label>
                  <Select id={`${uid}-sort`} value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="min-w-0 flex-1 sm:w-52 sm:flex-none lg:hidden">
                    {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </Select>
                  <Segmented label="Sort" value={sort} onChange={setSort} options={SORTS} className="max-lg:hidden" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="mn-label text-ink-muted" role="status" aria-live="polite">
                <span className="tabular-nums text-ink">{list.length}</span> {list.length === 1 ? "experience" : "experiences"}
                {filtered && <span className="text-ink-subtle"> of {EXPERIENCES.length}</span>}
              </p>
              {filtered && (
                <Button variant="ghost" onClick={clearFilters} className="-mr-3">
                  Clear filters
                </Button>
              )}
            </div>

            {list.length === 0 ? (
              <NoResults
                className="mt-6 border border-line py-20"
                actions={<Button variant="secondary" onClick={clearFilters}>Clear filters</Button>}
              >
                {query.trim() ? <>Nothing matches &ldquo;{query.trim()}&rdquo;. Try another word, or clear the filters.</> : "No experience fits those filters together. Loosen one and the list returns."}
              </NoResults>
            ) : (
              <ul className="mt-10 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-24">
                {list.map((e, i) => (
                  <li key={e.id} className={SPANS[i % 5]}>
                    <Reveal>
                      <ExperienceCard
                        item={e}
                        onOpen={open}
                        inEvening={!!requests[e.id]}
                        feature={i % 5 === 0}
                        imageClass={CROPS[i % 5]}
                        sizes={i % 5 < 2 ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
                      />
                    </Reveal>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* THREE WAYS */}
        <section id="nights" aria-labelledby="nights-h" className="relative isolate scroll-mt-16 overflow-hidden bg-brand text-on-brand">
          <div aria-hidden className="absolute inset-0 -z-10 text-on-brand/[0.1] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]">
            <FanPattern size={64} />
          </div>
          <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 lg:py-32">
            <p className="mn-label text-on-brand/80">An editor&rsquo;s note</p>
            <h2 id="nights-h" className="mn-headline mt-3 max-w-[16ch]">
              Three ways to spend a night in Singapore
            </h2>
            <ol className="mt-16 grid gap-px bg-on-brand/25 lg:grid-cols-3">
              {[
                { n: "01", t: "The early table", b: "Begin at a counter above the bay, while the sky is still blue. One long menu, one chef, no hurry.", id: "waku-ghin" },
                { n: "02", t: "The rooftop hour", b: "Go up fifty-seven floors for golden hour, and stay until the whole city has switched its lights on.", id: "cela-vi" },
                { n: "03", t: "The late room", b: "End in a colonial suite on Beach Road, after a last Singapore Sling under the slow fans.", id: "raffles-suite" },
              ].map((s) => {
                const e = byId(s.id)!;
                return (
                  <li key={s.n} className="flex flex-col bg-brand p-6 sm:p-8 lg:p-10">
                    <span className="font-display text-[3.5rem] leading-none tabular-nums text-on-brand/60" style={{ fontVariationSettings: '"opsz" 96' }}>{s.n}</span>
                    <h3 className="mn-title mt-10 lg:text-[2rem]">{s.t}</h3>
                    <p className="mn-body mt-4 max-w-[34ch] text-on-brand/85">{s.b}</p>
                    <Button variant="secondary" className="mt-10 w-fit" onClick={() => open(e)} icon={<ArrowRight aria-hidden strokeWidth={1} className="size-[18px]" />}>
                      {e.place.split(",")[0]}
                    </Button>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      </main>

      <footer className="border-t border-line-strong">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:px-10 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-6">
            <p className="font-display text-[2rem] italic" style={{ fontVariationSettings: '"opsz" 72' }}>The Concierge</p>
            <p className="mn-body mt-3 max-w-[38ch] text-ink-muted">After dark, by invitation. A student design project: no reservations are made and nothing is stored.</p>
          </div>
          <nav aria-label="Footer" className="lg:col-span-5 lg:col-start-8">
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {[
                ["Hub", "/"],
                ["Mood board", "/marina-noir/moodboard/"],
                ["Design system", "/marina-noir/system/"],
                ["Photo credits", "/credits/"],
              ].map(([l, h]) => (
                <li key={l} className="border-b border-line">
                  <Link href={h} className="mn-label flex min-h-12 items-center justify-between text-ink-muted transition-colors duration-(--dur-1) hover:text-ink">
                    {l}
                    <ArrowRight aria-hidden strokeWidth={1} className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <DoubleRule className="border-x-0" />
        <p className="mn-caption flex items-center justify-center gap-2 px-5 py-6 text-center text-ink-subtle">
          <GlassWater aria-hidden strokeWidth={1} className="size-4" /> Dress: smart elegant. Please drink responsibly.
        </p>
      </footer>

      {/* Detail drawer */}
      <Drawer open={detailOpen} onClose={() => setDetailOpen(false)} labelledBy={`${uid}-detail`}>
        {active && (
          <ExperienceDetail
            key={active.id}
            item={active}
            evenings={evenings}
            existing={requests[active.id]}
            titleId={`${uid}-detail`}
            onClose={() => setDetailOpen(false)}
            onSubmitted={(r) => {
              setRequests((m) => ({ ...m, [r.id]: r }));
              push("success", "Added to your evening", `${active.place}, ${r.dateLabel}.`);
            }}
            onInvalid={() => push("error", "Please check the form", "A few details need a second look.")}
            onViewEvening={() => {
              setDetailOpen(false);
              setEveningOpen(true);
            }}
          />
        )}
      </Drawer>

      {/* Your evening */}
      <Drawer open={eveningOpen} onClose={() => setEveningOpen(false)} labelledBy={`${uid}-evening`} width="md:w-[min(520px,100vw)]">
        <EveningPanel
          entries={entries}
          titleId={`${uid}-evening`}
          onClose={() => setEveningOpen(false)}
          onBrowse={() => {
            setEveningOpen(false);
            window.setTimeout(scrollToCollection, 120);
          }}
          onRemove={(id) => {
            const name = byId(id)?.place.split(",")[0];
            setRequests((m) => {
              const { [id]: _removed, ...rest } = m;
              void _removed;
              return rest;
            });
            push("info", "Removed from your evening", name);
          }}
          onConfirmed={() => {
            push("success", "Sent to your concierge", "Expect a confirmation by morning.");
            setRequests({});
          }}
        />
      </Drawer>

      <ToastRegion items={toasts} onDismiss={dismiss} />
    </div>
  );
}
