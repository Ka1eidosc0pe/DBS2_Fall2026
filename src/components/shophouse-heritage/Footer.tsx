import { CrossLinks } from "./Nav";
import { TileBand } from "./patterns";

export function HeritageFooter({ current }: { current: "site" | "moodboard" | "system" }) {
  return (
    <footer className="mt-24 bg-(--jade-deep) text-on-brand md:mt-32">
      <TileBand height={48} rules={false} />
      <div className="mx-auto flex max-w-[84rem] flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="sh-title text-2xl">The Heritage Trail</p>
          <p className="mt-1 max-w-sm text-sm text-on-brand/80">Walk the five-foot way. A student design project, one of three ways to see Singapore.</p>
        </div>
        <div className="[&_a]:!text-on-brand/85 [&_a]:hover:!text-on-brand [&_a[aria-current=page]]:!text-on-brand [&_span]:text-on-brand/50">
          <CrossLinks current={current} />
          <p className="mt-2 text-xs text-on-brand/70 md:text-right">
            Photographs from Wikimedia Commons, credited beside each image and on the credits page.
          </p>
        </div>
      </div>
    </footer>
  );
}
