import Image from "next/image";
import { creditFor } from "@/lib/credits";
import { cx } from "./cx";

export function Credit({ file, className, tone = "text-ink-subtle" }: { file: string; className?: string; tone?: string }) {
  const c = creditFor(file);
  if (!c) return null;
  return (
    <a
      href={c.source}
      target="_blank"
      rel="noreferrer"
      className={cx("mn-caption text-[0.6875rem] tracking-[0.04em] underline-offset-4 decoration-transparent hover:text-ink hover:decoration-current underline transition-colors duration-(--dur-1)", tone, className)}
    >
      {c.author} · {c.license}
    </a>
  );
}

/** A photo graded into the palette. Fills its parent, which must be positioned and sized. */
export function Photo({
  src,
  alt,
  sizes,
  priority,
  className,
  position = "center",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  position?: string;
}) {
  return (
    <div className={cx("mn-photo absolute inset-0 overflow-hidden", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: position }} />
    </div>
  );
}
