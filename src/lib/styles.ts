// Registry of the three styles. The hub, credits page, and cross-links read from here.

export type StyleSlug = "marina-noir" | "hawker-bright" | "shophouse-heritage";

export type StyleEntry = {
  slug: StyleSlug;
  name: string;
  lens: string;
  tagline: string;
  description: string;
  siteName: string;
  /** Swatches shown on the hub card, in order of prominence. The last one is the accent. */
  swatches: { name: string; hex: string }[];
  /** Colors for rendering the hub card in the style's own palette. `edge` outlines the card while its style floods the hub, so it stays distinct from its own flood. */
  card: { bg: string; ink: string; muted: string; accent: string; onAccent: string; line: string; edge: string };
  displayFontVar: string;
};

export const STYLES: StyleEntry[] = [
  {
    slug: "marina-noir",
    name: "Marina Noir",
    lens: "Crazy Rich Singapore",
    tagline: "After dark, by invitation.",
    description:
      "Marina Bay at midnight, Raffles in lacquer and brass. Near-black, oxblood, and champagne gold, with editorial serifs and a lot of quiet space.",
    siteName: "The Concierge",
    swatches: [
      { name: "Onyx", hex: "#0B0A0A" },
      { name: "Oxblood", hex: "#6E1423" },
      { name: "Lacquer", hex: "#A3172B" },
      { name: "Ivory", hex: "#F3EDE4" },
      { name: "Champagne", hex: "#D4B67A" },
    ],
    card: { bg: "#0B0A0A", ink: "#F3EDE4", muted: "#A89F94", accent: "#D4B67A", onAccent: "#0B0A0A", line: "#2E2926", edge: "#4A403A" },
    displayFontVar: "var(--font-noir-display)",
  },
  {
    slug: "hawker-bright",
    name: "Hawker Bright",
    lens: "Everyday Singapore",
    tagline: "Chope a seat. Kopi's on.",
    description:
      "Seven-a.m. kopi, numbered stall signs, HDB pastels, and void-deck sunlight. Bold, friendly, and busy, the way a hawker centre is.",
    siteName: "Makan Map",
    swatches: [
      { name: "Kopi-si", hex: "#FBF5EA" },
      { name: "Kopi-o", hex: "#2B1D14" },
      { name: "Pandan", hex: "#2F7D4F" },
      { name: "HDB Mint", hex: "#BFE3D0" },
      { name: "Sambal", hex: "#F26B2A" },
    ],
    card: { bg: "#FBF5EA", ink: "#2B1D14", muted: "#6B5646", accent: "#F26B2A", onAccent: "#2B1D14", line: "#2B1D14", edge: "#2B1D14" },
    displayFontVar: "var(--font-hawker-display)",
  },
  {
    slug: "shophouse-heritage",
    name: "Shophouse Heritage",
    lens: "Historic Singapore",
    tagline: "Walk the five-foot way.",
    description:
      "Peranakan tiles, carved shophouse fronts, batik, and letterpress. Jade, turquoise, turmeric, and nyonya coral on celadon.",
    siteName: "The Heritage Trail",
    swatches: [
      { name: "Celadon", hex: "#E3EDE6" },
      { name: "Jade", hex: "#2E6E5E" },
      { name: "Peranakan Teal", hex: "#3A9CA6" },
      { name: "Turmeric", hex: "#D9A23B" },
      { name: "Nyonya Coral", hex: "#E8837A" },
    ],
    card: { bg: "#E3EDE6", ink: "#1F2A33", muted: "#5A6670", accent: "#E8837A", onAccent: "#1F2A33", line: "#BCCFC3", edge: "#2E6E5E" },
    displayFontVar: "var(--font-heritage-display)",
  },
];

export const DELIVERABLES = [
  { key: "site", label: "Site", path: "" },
  { key: "moodboard", label: "Mood board", path: "/moodboard" },
  { key: "system", label: "Design system", path: "/system" },
] as const;

export function href(slug: StyleSlug, key: (typeof DELIVERABLES)[number]["key"]) {
  const d = DELIVERABLES.find((x) => x.key === key)!;
  return `/${slug}${d.path}/`;
}
