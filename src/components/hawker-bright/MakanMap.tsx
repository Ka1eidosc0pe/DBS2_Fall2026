"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, ListChecks, Search, Sun } from "lucide-react";
import { CATEGORIES, HOODS, STALLS, STALL_BY_ID, type Hood } from "@/data/hawker-bright/stalls";
import { GLOSSARY, KOPI_LINGO } from "@/data/hawker-bright/glossary";
import { PHOTOS } from "@/data/hawker-bright/photos";
import { CATEGORY_TONE, CountBadge, StallBadge, Tag, type Category } from "./Badges";
import { Button } from "./Button";
import { Chip, Segmented } from "./Chip";
import { Select, SearchInput, Switch } from "./Fields";
import { FlipCard } from "./FlipCard";
import { MakanList } from "./MakanList";
import { Footer, SiteNav } from "./Nav";
import { ToastProvider, useToast } from "./Overlay";
import { CreditLine, PhotoSticker } from "./Photo";
import { NoResults } from "./States";
import { StallCard } from "./StallCard";
import { StallDetail } from "./StallDetail";
import { Burst, ChopeSticker, formicaMint, mosaic } from "./patterns";


const LINKS = [
  { href: "#stalls", label: "Stalls" },
  { href: "#kopi", label: "Kopi lingo" },
  { href: "#glossary", label: "Singlish 101" },
];

const TIER = { $: 1, $$: 2, $$$: 3 } as const;

function mealTime(d: Date | null) {
  if (!d) return { clock: "--:--", label: "makan time" };
  const h = d.getHours();
  const clock = `${String(h).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  const label = h >= 5 && h < 11 ? "breakfast hour" : h < 14 && h >= 11 ? "lunch rush" : h >= 14 && h < 17 ? "teatime" : h >= 17 && h < 21 ? "dinner time" : "supper hour";
  return { clock, label };
}

function scrollToStalls() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("stalls")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

function Site() {
  const toast = useToast();
  const [query, setQuery] = useState("");
  const [heroQuery, setHeroQuery] = useState("");
  const [cats, setCats] = useState<Category[]>([]);
  const [hood, setHood] = useState<"all" | Hood>("all");
  const [halal, setHalal] = useState(false);
  const [veg, setVeg] = useState(false);
  const [sort, setSort] = useState("featured");
  const [list, setList] = useState<string[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [listOpen, setListOpen] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const t = window.setTimeout(tick, 0);
    const i = window.setInterval(tick, 30000);
    return () => {
      window.clearTimeout(t);
      window.clearInterval(i);
    };
  }, []);

  const base = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STALLS.filter((s) => {
      if (hood !== "all" && s.hood !== hood) return false;
      if (halal && !s.halal) return false;
      if (veg && !s.veg) return false;
      if (q && !`${s.dish} ${s.name} ${s.centre} ${s.hood} ${s.category} ${s.blurb}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, hood, halal, veg]);

  const results = useMemo(() => {
    const r = base.filter((s) => cats.length === 0 || cats.includes(s.category));
    if (sort === "az") return [...r].sort((a, b) => a.dish.localeCompare(b.dish));
    if (sort === "cheap") return [...r].sort((a, b) => TIER[a.tier] - TIER[b.tier]);
    if (sort === "spicy") return [...r].sort((a, b) => b.spice - a.spice);
    return r;
  }, [base, cats, sort]);

  const filtersActive = query !== "" || cats.length > 0 || hood !== "all" || halal || veg;
  const clearAll = () => {
    setQuery("");
    setHeroQuery("");
    setCats([]);
    setHood("all");
    setHalal(false);
    setVeg(false);
  };

  const add = (id: string) => {
    setList((l) => (l.includes(id) ? l : [...l, id]));
    toast.push("Shiok! Added.");
  };
  const remove = (id: string, quiet?: boolean) => {
    setList((l) => l.filter((x) => x !== id));
    if (!quiet) toast.push("Removed from your makan list.", "info");
  };
  const items = list.map((id) => STALL_BY_ID[id]);
  const open = openId ? STALL_BY_ID[openId] : null;
  const t = mealTime(now);

  return (
    <div className="min-h-dvh">
      <SiteNav
        links={LINKS}
        current="site"
        trailing={
          <Button variant="secondary" size="sm" onClick={() => setListOpen(true)} aria-haspopup="dialog" aria-label={`Open makan list, ${list.length} ${list.length === 1 ? "stall" : "stalls"}`}>
            <ListChecks size={20} strokeWidth={2.75} aria-hidden />
            <span className="hidden sm:inline">Makan list</span>
            <CountBadge count={list.length} className={list.length === 0 ? "!bg-surface-2 !text-ink-muted" : "hb-pop"} />
          </Button>
        }
      />

      <main>
        {/* Hero */}
        <section aria-labelledby="hero-h" className="relative border-b-2 border-ink">
          <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-6 lg:pb-20 lg:pt-14">
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2">
                <StallBadge no="01-01" />
                <Tag tone="var(--hdb-mint)">Everyday Singapore</Tag>
              </div>
              <h1 id="hero-h" className="hb-display mt-5">
                Makan like
                <br />a <span className="inline-block -rotate-2 rounded-[14px] border-2 border-ink bg-brand px-3 pb-1 pt-1.5 text-on-brand shadow-card">local</span>
              </h1>
              <p className="hb-body-lg mt-6 max-w-xl">
                Where Singaporeans actually eat, and how to order like one. Hawker centres, kopitiams and the little phrases that get you the good chilli.
              </p>
              <form
                className="mt-7 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-end"
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  setQuery(heroQuery);
                  scrollToStalls();
                }}
              >
                <div className="flex-1">
                  <label htmlFor="hero-q" className="hb-label mb-2 block">
                    What are you craving?
                  </label>
                  <SearchInput id="hero-q" label="What are you craving?" value={heroQuery} onValueChange={setHeroQuery} placeholder="Laksa, satay, kaya toast..." />
                </div>
                <Button type="submit" variant="brand" size="lg">
                  <Search size={20} strokeWidth={2.75} aria-hidden /> Find food
                </Button>
              </form>
              <p className="hb-mono mt-5 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-surface px-3.5 py-2 shadow-[2px_2px_0_var(--ink)]" aria-live="off">
                {t.label === "breakfast hour" ? <Sun size={16} strokeWidth={2.75} aria-hidden /> : <Clock size={16} strokeWidth={2.75} aria-hidden />}
                IT&apos;S {t.clock} · {t.label.toUpperCase()}
              </p>
            </div>

            {/* Collage */}
            <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
              <div className="relative rounded-[28px] border-2 border-ink p-4 shadow-card sm:p-6 lg:p-7" style={formicaMint}>
                <div className="grid grid-cols-5 items-end gap-3 sm:gap-4">
                  <PhotoSticker file={PHOTOS.night.file} alt={PHOTOS.night.alt} sizes="(min-width:1024px) 420px, 90vw" focus="50% 35%" tilt={-2} aspect="16/10" className="col-span-5" priority />
                  <PhotoSticker file={PHOTOS.kaya.file} alt={PHOTOS.kaya.alt} sizes="(min-width:1024px) 250px, 45vw" tilt={3} aspect="4/3" className="col-span-3 mt-1" />
                  <PhotoSticker file={PHOTOS.satay.file} alt={PHOTOS.satay.alt} sizes="(min-width:1024px) 200px, 40vw" focus="35% 60%" tilt={-3} aspect="4/5" className="col-span-2 -mt-2" />
                </div>
                <ChopeSticker className="absolute -left-3 -top-6 w-[104px] -rotate-12 drop-shadow-[3px_3px_0_#2b1d14] sm:-left-6 sm:w-[130px]" />
                <Burst className="absolute -bottom-6 right-2 w-[96px] rotate-12 sm:-right-4 sm:w-[118px]">
                  <span className="hb-title !text-[1.2rem] uppercase sm:!text-[1.5rem]">Shiok!</span>
                </Burst>
              </div>
            </div>
          </div>
          <div className="h-6 border-t-2 border-ink" style={mosaic} aria-hidden />
        </section>

        {/* How to eat like a local */}
        <section aria-labelledby="how-h" className="px-4 py-14 sm:px-6 md:py-16">
          <div className="mx-auto max-w-[1320px]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 id="how-h" className="hb-headline">
                Three rules of the hawker centre
              </h2>
            </div>
            <ol className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                { n: "01", t: "Chope", d: "Leave a packet of tissues on a table before you queue. It means this seat is taken.", tone: "var(--hdb-butter)" },
                { n: "02", t: "Order", d: "Queue at the stall, say the dish and any tweaks, pay, then wait for your number or a shout.", tone: "var(--hdb-peach)" },
                { n: "03", t: "Return", d: "Carry your tray to the return point when you are done. It keeps the centre running and is often the rule.", tone: "var(--hdb-sky)" },
              ].map((s, i) => (
                <li key={s.n} className="hb-card flex flex-col gap-3 p-5" style={{ background: s.tone, transform: `rotate(${[-0.8, 0.6, -0.5][i]}deg)` }}>
                  <StallBadge no={`${s.n}-${s.n}`} className="w-fit" />
                  <h3 className="hb-headline !text-[2.75rem]">{s.t}</h3>
                  <p className="hb-body font-medium">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Stalls */}
        <section id="stalls" aria-labelledby="stalls-h" className="scroll-mt-40 border-y-2 border-ink px-4 py-14 sm:px-6 md:py-16" style={{ background: "var(--surface-2)" }}>
          <div className="mx-auto max-w-[1320px]">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
              <div>
                <h2 id="stalls-h" className="hb-headline">
                  The stalls
                </h2>
                <p className="hb-body mt-2 max-w-xl text-ink-muted">{STALLS.length} dishes across real hawker centres. Filter by dish type, neighbourhood or diet, then tap a card for how to order it.</p>
              </div>
              <p className="hb-mono rounded-full border-2 border-ink bg-surface px-3.5 py-2 shadow-[2px_2px_0_var(--ink)]" role="status" aria-live="polite">
                SHOWING {results.length} OF {STALLS.length} STALLS
              </p>
            </div>

            {/* Filter board */}
            <div className="hb-card mt-8 grid gap-5 p-4 sm:p-5">
              <div className="grid gap-4 md:grid-cols-[1.4fr_1fr] lg:grid-cols-[1.5fr_1fr_auto_auto] lg:items-end">
                <div>
                  <label htmlFor="q" className="hb-label mb-2 block">
                    Search
                  </label>
                  <SearchInput id="q" label="Search stalls, dishes or centres" value={query} onValueChange={(v) => { setQuery(v); setHeroQuery(v); }} placeholder="Dish, centre or neighbourhood" />
                </div>
                <Select
                  label="Neighbourhood"
                  value={hood}
                  onChange={(e) => setHood(e.target.value as "all" | Hood)}
                  options={[{ value: "all", label: "All neighbourhoods" }, ...HOODS.map((h) => ({ value: h, label: h }))]}
                />
                <Switch label="Halal" checked={halal} onChange={(e) => setHalal(e.target.checked)} />
                <Switch label="Vegetarian-friendly" checked={veg} onChange={(e) => setVeg(e.target.checked)} />
              </div>
              <div className="flex flex-wrap items-center gap-3 border-t-2 border-dashed border-line pt-4">
                <span className="hb-label mr-1">Dish type</span>
                {CATEGORIES.map((c) => (
                  <Chip
                    key={c}
                    tone={CATEGORY_TONE[c]}
                    selected={cats.includes(c)}
                    count={base.filter((s) => s.category === c).length}
                    onClick={() => setCats((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]))}
                  >
                    {c}
                  </Chip>
                ))}
                <span className="flex-1" />
                <Segmented
                  label="Sort"
                  value={sort}
                  onChange={setSort}
                  options={[
                    { value: "featured", label: "Featured" },
                    { value: "az", label: "A to Z" },
                    { value: "cheap", label: "Cheapest" },
                    { value: "spicy", label: "Spiciest" },
                  ]}
                />
                <Button variant="ghost" size="sm" disabled={!filtersActive} onClick={clearAll}>
                  Clear filters
                </Button>
              </div>
            </div>

            {results.length === 0 ? (
              <div className="mt-8">
                <NoResults onClear={clearAll} />
              </div>
            ) : (
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((s, i) => (
                  <li key={s.id} className="min-w-0">
                    <StallCard stall={s} onList={list.includes(s.id)} onOpen={() => setOpenId(s.id)} priority={i < 4} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Kopi lingo */}
        <section id="kopi" aria-labelledby="kopi-h" className="scroll-mt-32 px-4 py-14 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-[1320px] items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-[22px] border-2 border-ink bg-ink p-6 text-bg shadow-card sm:p-9" style={{ boxShadow: "6px 6px 0 var(--brand)" }}>
              <p className="hb-mono text-hdb-butter [color:var(--hdb-butter)]">MENU BOARD · KOPITIAM</p>
              <h2 id="kopi-h" className="hb-display mt-2 !text-[clamp(3rem,2rem+4vw,5.5rem)] [color:var(--hdb-butter)]">
                Kopi lingo
              </h2>
              <dl className="mt-6">
                {KOPI_LINGO.map((k) => (
                  <div key={k.order} className="flex items-baseline gap-3 border-b-2 border-dashed border-bg/25 py-3 last:border-b-0">
                    <dt className="hb-title !text-[1.5rem] uppercase">{k.order}</dt>
                    <dd className="min-w-0 flex-1 text-right text-[0.9375rem] font-medium text-bg/85">{k.gets}</dd>
                  </div>
                ))}
              </dl>
              <p className="hb-body mt-5 text-bg/80">
                Add <strong className="text-bg">siew dai</strong> for less sweet, <strong className="text-bg">kosong</strong> for no sugar, <strong className="text-bg">gao</strong> for strong, <strong className="text-bg">poh</strong> for weak. &ldquo;Kopi-O siew dai&rdquo; is black with a little sugar.
              </p>
            </div>
            <figure className="relative m-0 mx-auto w-full max-w-[460px]">
              <PhotoSticker file={PHOTOS.kaya.file} alt={PHOTOS.kaya.alt} sizes="460px" tilt={2.5} aspect="4/3" />
              <ChopeSticker className="absolute -right-4 -top-8 w-[120px] rotate-6 drop-shadow-[3px_3px_0_#2b1d14]" />
            </figure>
          </div>
        </section>

        {/* Glossary */}
        <section id="glossary" aria-labelledby="glossary-h" className="scroll-mt-32 border-t-2 border-ink bg-brand text-on-brand">
          <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 md:py-20">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 id="glossary-h" className="hb-headline">
                  Singlish 101
                </h2>
                <p className="hb-body mt-2 max-w-xl text-on-brand">Six words you will hear before your food arrives. Tap a card to flip it.</p>
              </div>
              <Tag tone="var(--surface)">6 terms</Tag>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {GLOSSARY.map((g) => (
                <li key={g.term} className="min-w-0">
                  <FlipCard term={g} />
                </li>
              ))}
            </ul>
            <p className="hb-caption mt-8 flex flex-wrap gap-x-3 text-on-brand [&_a]:!text-on-brand">
              Photo credits: <CreditLine file={PHOTOS.night.file} /> <CreditLine file={PHOTOS.kaya.file} /> <CreditLine file={PHOTOS.satay.file} />
            </p>
          </div>
        </section>
      </main>
      <Footer current="site" />

      {open ? (
        <StallDetail
          stall={open}
          open
          onClose={() => setOpenId(null)}
          onList={list.includes(open.id)}
          onAdd={() => add(open.id)}
          onRemove={() => remove(open.id)}
        />
      ) : null}
      <MakanList
        open={listOpen}
        onClose={() => setListOpen(false)}
        items={items}
        onRemove={(id) => remove(id)}
        onClear={() => {
          setList([]);
          toast.push("List cleared.", "info");
        }}
        onPlanned={(c, s) => toast.push(`Route sorted! ${c} ${c === 1 ? "centre" : "centres"}, ${s} stalls.`)}
      />
    </div>
  );
}

export function MakanMap() {
  return (
    <ToastProvider>
      <Site />
    </ToastProvider>
  );
}

