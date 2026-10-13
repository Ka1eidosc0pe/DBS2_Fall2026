import { cloneElement, useId } from "react";
import { cx } from "./cx";

/** Pure-CSS tooltip: shows on hover and keyboard focus. The trigger must be focusable. */
export function Tooltip({
  text,
  children,
  forceOpen,
  side = "top",
  className,
}: {
  text: string;
  children: React.ReactElement<{ "aria-describedby"?: string }>;
  forceOpen?: boolean;
  side?: "top" | "bottom";
  className?: string;
}) {
  const id = useId();
  return (
    <span className={cx("group/tip relative inline-flex", className)}>
      {cloneElement(children, { "aria-describedby": id })}
      <span
        id={id}
        role="tooltip"
        data-open={forceOpen || undefined}
        className={cx(
          "mn-caption pointer-events-none absolute left-1/2 z-30 w-max max-w-60 -translate-x-1/2 border border-line-strong bg-surface-2 px-3 py-2 text-center text-ink opacity-0",
          "transition-[opacity,transform] duration-(--dur-1) ease-(--ease)",
          "group-hover/tip:opacity-100 group-focus-within/tip:opacity-100 data-[open]:opacity-100",
          side === "top" ? "bottom-full mb-2.5 translate-y-1 group-hover/tip:translate-y-0 group-focus-within/tip:translate-y-0 data-[open]:translate-y-0" : "top-full mt-2.5 -translate-y-1 group-hover/tip:translate-y-0 group-focus-within/tip:translate-y-0 data-[open]:translate-y-0",
        )}
      >
        {text}
      </span>
    </span>
  );
}
