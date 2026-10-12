export type ForceState = "hover" | "focus" | "active" | "disabled" | "loading" | "selected" | "error";

export const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");
