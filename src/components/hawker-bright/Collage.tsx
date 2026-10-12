import { CreditLine, Photo } from "./Photo";
import { cn } from "./types";
import type { BoardPhoto } from "@/data/hawker-bright/photos";

/** One tilted, outlined photo sticker in the mood board grid. It fills its grid cell. */
export function CollageTile({
  photo,
  n,
  tilt = 0,
  className,
  sizes,
  priority,
  tone = "var(--hdb-butter)",
}: {
  photo: BoardPhoto;
  n: string;
  tilt?: number;
  className?: string;
  sizes: string;
  priority?: boolean;
  tone?: string;
}) {
  return (
    <figure
      className={cn("relative m-0 flex min-h-0 flex-col border-2 border-ink bg-surface p-2 shadow-card transition-transform duration-200 hover:z-10 hover:!rotate-0", className)}
      style={{ transform: `rotate(${tilt}deg)`, borderRadius: 16 }}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-[9px] border-2 border-ink">
        <Photo file={photo.file} alt={photo.alt} sizes={sizes} focus={photo.focus} priority={priority} />
        <span className="hb-stallno absolute left-2 top-2 shadow-[2px_2px_0_var(--ink)]">#{n}</span>
        <span className="hb-tag absolute bottom-2 right-2 block max-w-[calc(100%-1rem)] truncate shadow-[2px_2px_0_var(--ink)]" style={{ ["--tag-bg" as string]: tone }}>
          {photo.label}
        </span>
      </div>
      <figcaption className="mt-1.5 px-0.5">
        <CreditLine file={photo.file} className="!text-[11px] leading-none" />
      </figcaption>
    </figure>
  );
}
