// Marina Noir palette, mirrored from src/styles/marina-noir.css so the board and system page can show
// hex values and compute contrast without reading computed styles.

export type Swatch = {
  token: string;
  name: string;
  hex: string;
  /** Short role description. */
  role: string;
  /** A phrase for the mood board. */
  evocation: string;
  /** Tailwind utility the token is reached through. */
  utility: string;
};

export const SWATCHES: Swatch[] = [
  { token: "bg", name: "Onyx", hex: "#0B0A0A", role: "Page background", evocation: "Marina Bay at midnight", utility: "bg-bg" },
  { token: "surface", name: "Smoke", hex: "#141212", role: "Cards and panels", evocation: "Haze in a cigar room", utility: "bg-surface" },
  { token: "surface-2", name: "Velvet", hex: "#1C1918", role: "Drawers, toasts, raised panels", evocation: "A banquette after hours", utility: "bg-surface-2" },
  { token: "ink", name: "Ivory", hex: "#F3EDE4", role: "Primary text, focus ring", evocation: "A starched tablecloth", utility: "text-ink" },
  { token: "ink-muted", name: "Linen", hex: "#A89F94", role: "Secondary text", evocation: "Candlelight on card stock", utility: "text-ink-muted" },
  { token: "ink-subtle", name: "Taupe", hex: "#8F8578", role: "Meta, captions, placeholders", evocation: "Dust on a decanter", utility: "text-ink-subtle" },
  { token: "line", name: "Hairline", hex: "#2E2926", role: "Dividers, quiet borders", evocation: "A seam in the leather", utility: "border-line" },
  { token: "line-strong", name: "Bronze line", hex: "#4A403A", role: "Double rules, card tops", evocation: "Inlay in a table edge", utility: "border-line-strong" },
  { token: "control-line", name: "Brass edge", hex: "#7A6B60", role: "Input and control borders (3.9:1)", evocation: "A rail worn by hands", utility: "border-(--control-line)" },
  { token: "brand", name: "Oxblood", hex: "#6E1423", role: "Selected chips, brand bands", evocation: "Lacquered club walls", utility: "bg-brand" },
  { token: "lacquer", name: "Lacquer", hex: "#A3172B", role: "Active indicators, seals (decorative)", evocation: "The wax on the invitation", utility: "bg-(--lacquer)" },
  { token: "accent", name: "Champagne", hex: "#D4B67A", role: "Primary action only", evocation: "A single gold rim on a glass", utility: "bg-accent" },
];

export const STATUS: Swatch[] = [
  { token: "success", name: "Sage", hex: "#7FA88B", role: "Confirmed, success", evocation: "", utility: "text-success" },
  { token: "warning", name: "Amber", hex: "#D9A55B", role: "Caution", evocation: "", utility: "text-warning" },
  { token: "danger", name: "Cinnabar", hex: "#E0614F", role: "Errors, destructive", evocation: "", utility: "text-danger" },
  { token: "info", name: "Dusk", hex: "#8DA4C4", role: "Neutral notices", evocation: "", utility: "text-info" },
];

const lum = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};

export function contrast(a: string, b: string) {
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

export const ratio = (a: string, b: string) => contrast(a, b).toFixed(1) + ":1";

/** AA verdict for a pairing; `large` covers large text and UI components (3:1). */
export function verdict(a: string, b: string, kind: "text" | "ui" | "decor" = "text") {
  const c = contrast(a, b);
  if (kind === "decor") return "Decorative only";
  const need = kind === "text" ? 4.5 : 3;
  return c >= (kind === "text" ? 7 : need) && kind === "text" ? "AAA" : c >= need ? "AA" : "Fails";
}

export const hex = Object.fromEntries([...SWATCHES, ...STATUS].map((s) => [s.token, s.hex])) as Record<string, string>;
