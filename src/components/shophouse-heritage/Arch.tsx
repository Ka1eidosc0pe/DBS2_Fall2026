import Image from "next/image";
import { creditFor } from "@/lib/credits";
import { cx } from "./cx";

/** A photograph in an arched frame. The arch is the shophouse window; `reveal` wipes it in upward. */
export function ArchFrame({
  src,
  alt,
  sizes,
  ratio = "4 / 5",
  arch = false,
  position = "center",
  reveal,
  priority,
  credit = true,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  sizes: string;
  ratio?: string;
  arch?: boolean;
  position?: string;
  reveal?: boolean;
  priority?: boolean;
  credit?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const c = creditFor(src);
  return (
    <figure className={cx("m-0 flex flex-col", className)}>
      <div
        className={cx("relative w-full flex-1 overflow-hidden bg-surface-2", arch ? "rounded-t-[999px] rounded-b-card" : "rounded-card", reveal && "sh-reveal")}
        style={{ aspectRatio: ratio }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cx("object-cover", imgClassName)} style={{ objectPosition: position }} />
      </div>
      {credit && c && <PhotoCredit src={src} className="mt-2" />}
    </figure>
  );
}

/** Small credit line: author · licence, linked to the source. */
export function PhotoCredit({ src, className }: { src: string; className?: string }) {
  const c = creditFor(src);
  if (!c) return null;
  return (
    <figcaption className={cx("text-[0.6875rem] leading-snug text-ink-muted", className)}>
      <a href={c.source} target="_blank" rel="noreferrer" className="underline decoration-line-strong/30 underline-offset-2 hover:text-ink hover:decoration-brand">
        {c.author} · {c.license}
      </a>
    </figcaption>
  );
}
