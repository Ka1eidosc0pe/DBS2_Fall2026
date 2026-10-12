import { SiteNav } from "./Nav";
import { HeritageFooter } from "./Footer";
import { SectionHeading } from "./Section";
import { TileBand } from "./patterns";
import { ColorSection } from "./SystemColor";
import { TypeSection, SpaceSection } from "./SystemType";
import { ComponentsSection } from "./SystemComponents";
import { StatesMatrix, UiStates } from "./SystemStates";

const LINKS = [
  { href: "#color", label: "Colour" },
  { href: "#type", label: "Type" },
  { href: "#space", label: "Space and shape" },
  { href: "#components", label: "Components" },
  { href: "#states", label: "Control states" },
  { href: "#ui-states", label: "UI states" },
];

export function SystemPage() {
  return (
    <div className="min-h-dvh bg-bg">
      <SiteNav current="system" links={LINKS} />
      <main>
        <section className="px-5 pb-16 pt-16 text-center md:px-10 md:pb-24 md:pt-24">
          <p className="sh-label text-brand">The Heritage Trail · Design system</p>
          <h1 className="sh-display mx-auto mt-4 max-w-4xl text-[2.75rem] leading-[1.02] text-ink md:text-[5.5rem]">
            Ornament, kept in order
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-muted md:text-lg">
            Colour, type, space, components and states for a Singapore heritage guide. Pattern is the signature, framed by calm limewash space; coral is kept for the one action that matters.
          </p>
        </section>
        <TileBand height={56} />
        {[
          { id: "color", eyebrow: "01 · Colour", title: "Colour roles", lede: "Every semantic token plus the tile extras, each with its job and its contrast against its usual partner.", body: <ColorSection /> },
          { id: "type", eyebrow: "02 · Typeface", title: "Typeface roles", lede: "Fraunces for voice, Karla for work. Dates always take old-style italic figures.", body: <TypeSection /> },
          { id: "space", eyebrow: "03 · Space and shape", title: "Spacing, shape and motion", lede: "A regular grid, gentle radii, one arch, and motion that is crafted rather than loud.", body: <SpaceSection /> },
          { id: "components", eyebrow: "04 · Components", title: "Components", lede: "The same parts build the site. Nothing here is restyled on the page that uses it.", body: <ComponentsSection /> },
          { id: "states", eyebrow: "05 · Control states", title: "Control states", lede: "Every control in default, hover, focus-visible, pressed, selected, disabled, loading and error. A dot means the state does not apply.", body: <StatesMatrix /> },
          { id: "ui-states", eyebrow: "06 · UI states", title: "Empty, loading, error, success", lede: "How the site speaks when there is nothing to show, or something went right or wrong.", body: <UiStates /> },
        ].map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={s.id + "-h"} className="scroll-mt-16 px-5 py-16 md:px-10 md:py-24">
            <div className="mx-auto max-w-[84rem]">
              <SectionHeading eyebrow={s.eyebrow} title={s.title} id={s.id + "-h"}>
                {s.lede}
              </SectionHeading>
              <div className="mt-12 md:mt-16">{s.body}</div>
            </div>
          </section>
        ))}
      </main>
      <HeritageFooter current="system" />
    </div>
  );
}
