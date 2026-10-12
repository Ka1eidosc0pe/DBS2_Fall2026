import Image from "next/image";
import { creditFor } from "@/lib/credits";
import { cn } from "./types";

export function CreditLine({ file, className, onDark }: { file: string; className?: string; onDark?: boolean }) {
  const c = creditFor(file);
  if (!c) return null;
  return (
    <a
      href={c.source}
      target="_blank"
      rel="noreferrer"
      className={cn("hb-caption inline-block max-w-full truncate underline-offset-2 hover:underline", onDark ? "text-white/90" : "text-ink-muted", className)}
      title={`${c.title} by ${c.author}, ${c.license}`}
    >
      {c.author} · {c.license}
    </a>
  );
}

type PhotoProps = {
  file: string;
  alt: string;
  sizes: string;
  className?: string;
  /** CSS object-position, e.g. "50% 30%" */
  focus?: string;
  priority?: boolean;
};

/** A photo filling its (relatively positioned) parent. */
export function Photo({ file, alt, sizes, className, focus = "50% 50%", priority }: PhotoProps) {
  return <Image src={file} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", className)} style={{ objectPosition: focus }} />;
}

/** Outlined, tilted sticker photo with a small credit strip. */
export function PhotoSticker({
  file,
  alt,
  sizes,
  focus,
  tilt = 0,
  aspect = "4/3",
  className,
  credit = true,
  priority,
}: PhotoProps & { tilt?: number; aspect?: string; credit?: boolean }) {
  return (
    <figure
      className={cn("m-0 border-2 border-ink bg-surface p-2 pb-1.5 shadow-card", className)}
      style={{ transform: `rotate(${tilt}deg)`, borderRadius: 14 }}
    >
      <div className="relative overflow-hidden rounded-[8px] border-2 border-ink" style={{ aspectRatio: aspect }}>
        <Photo file={file} alt={alt} sizes={sizes} focus={focus} priority={priority} />
      </div>
      {credit ? (
        <figcaption className="mt-1.5 px-0.5">
          <CreditLine file={file} className="!text-[11px] leading-none" />
        </figcaption>
      ) : null}
    </figure>
  );
}
