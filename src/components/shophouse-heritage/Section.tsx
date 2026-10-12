import { Eyebrow } from "./Feedback";
import { TileBullet } from "./patterns";
import { cx } from "./cx";

/** Centred section heading on the facade axis: eyebrow, Fraunces title, optional lede and a diamond rule. */
export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "center",
  id,
  className,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  align?: "center" | "left";
  id?: string;
  className?: string;
}) {
  return (
    <header className={cx(align === "center" ? "mx-auto text-center" : "text-left", "max-w-2xl", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="sh-display mt-3 text-[2.5rem] leading-[1.05] text-ink md:text-[3.5rem]">
        {title}
      </h2>
      {children && <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-muted md:text-lg">{children}</p>}
      <Rule className={cx("mt-6", align === "center" ? "mx-auto" : "")} />
    </header>
  );
}

/** Short ornamental rule: line, four-petal tile, line. */
export function Rule({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cx("flex w-40 items-center gap-3 text-brand", className)}>
      <span className="h-px flex-1 bg-brand/50" />
      <TileBullet size={14} />
      <span className="h-px flex-1 bg-brand/50" />
    </div>
  );
}
