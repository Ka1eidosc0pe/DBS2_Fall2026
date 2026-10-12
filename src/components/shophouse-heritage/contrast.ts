/** WCAG 2.x contrast ratio between two #rrggbb colours. */
function lum(hex: string) {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a: string, b: string) {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
export function grade(ratio: number, large = false) {
  if (ratio >= 7) return "AAA";
  if (ratio >= (large ? 3 : 4.5)) return "AA";
  if (ratio >= 3) return large ? "AA large" : "AA large/UI";
  return "Decorative";
}
