export type ForceState = "hover" | "focus" | "active" | "disabled" | "loading" | "selected" | "error";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/** Shared easing for transitions on controls. */
export const T = "transition-[background-color,color,border-color,opacity,transform,box-shadow] duration-(--dur-1) ease-(--ease)";

/** Focus ring that matches the global :focus-visible style, so forced and real focus are identical. */
export const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-[force=focus]:outline-2 data-[force=focus]:outline-offset-2 data-[force=focus]:outline-focus";
