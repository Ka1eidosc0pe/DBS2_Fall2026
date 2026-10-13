import { cx } from "./cx";

export function SkeletonBlock({ className }: { className?: string }) {
  return <div aria-hidden className={cx("mn-skeleton", className)} />;
}

/** Placeholder with the exact footprint of an ExperienceCard. */
export function ExperienceCardSkeleton({ className }: { className?: string }) {
  return (
    <div role="status" aria-label="Loading experience" className={cx("flex flex-col", className)}>
      <SkeletonBlock className="aspect-[4/3] w-full" />
      <div className="mt-5 flex flex-col gap-3">
        <SkeletonBlock className="h-3 w-24" />
        <SkeletonBlock className="h-7 w-3/4" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-2/3" />
      </div>
    </div>
  );
}
