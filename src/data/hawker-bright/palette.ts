export type Swatch = { token: string; name: string; hex: string; use: string; /** hex of the colour it usually sits on or beside */ partner?: { label: string; hex: string } };

export const ROLE_SWATCHES: Swatch[] = [
  { token: "bg", name: "Kopi-si", hex: "#FBF5EA", use: "The page. Milky coffee cream.", partner: { label: "ink", hex: "#2B1D14" } },
  { token: "surface", name: "Plate white", hex: "#FFFFFF", use: "Cards, inputs, receipt paper.", partner: { label: "ink", hex: "#2B1D14" } },
  { token: "surface-2", name: "Kaya cream", hex: "#F3E9D7", use: "Panels, skeletons, disabled fills.", partner: { label: "ink", hex: "#2B1D14" } },
  { token: "ink", name: "Kopi-O", hex: "#2B1D14", use: "Text and every thick outline and hard shadow.", partner: { label: "bg", hex: "#FBF5EA" } },
  { token: "ink-muted", name: "Teh", hex: "#6B5646", use: "Secondary text, captions, hints.", partner: { label: "bg", hex: "#FBF5EA" } },
  { token: "ink-subtle", name: "Teh peng", hex: "#8A7464", use: "Disabled labels and large or decorative marks only.", partner: { label: "bg", hex: "#FBF5EA" } },
  { token: "line", name: "Formica", hex: "#E2D4BD", use: "Soft dividers and receipt rules.", partner: { label: "bg", hex: "#FBF5EA" } },
  { token: "brand", name: "Pandan", hex: "#2F7D4F", use: "Selected chips, stall-sign headers, nav current page.", partner: { label: "on-brand", hex: "#FFFFFF" } },
  { token: "accent", name: "Sambal", hex: "#F26B2A", use: "The primary action only, and its counter badge.", partner: { label: "on-accent", hex: "#2B1D14" } },
  { token: "accent-hover", name: "Fresh-pounded sambal", hex: "#F5824A", use: "Primary action on hover.", partner: { label: "on-accent", hex: "#2B1D14" } },
  { token: "accent-pressed", name: "Wok-burnt sambal", hex: "#E0601F", use: "Primary action pressed.", partner: { label: "on-accent", hex: "#2B1D14" } },
  { token: "danger", name: "Chilli", hex: "#C62828", use: "Errors and destructive actions.", partner: { label: "surface", hex: "#FFFFFF" } },
  { token: "success", name: "Kangkong", hex: "#2F7D4F", use: "Confirmed and on-list marks.", partner: { label: "surface", hex: "#FFFFFF" } },
  { token: "warning", name: "Gula melaka", hex: "#8A5D00", use: "Cautions, with an icon.", partner: { label: "surface", hex: "#FFFFFF" } },
  { token: "info", name: "Monsoon sky", hex: "#2C6AA0", use: "Neutral notices.", partner: { label: "surface", hex: "#FFFFFF" } },
];

export const EXTRA_SWATCHES: Swatch[] = [
  { token: "hdb-butter", name: "Kuning butter", hex: "#F6E3A1", use: "Rice, hover fills, sticker backgrounds.", partner: { label: "ink", hex: "#2B1D14" } },
  { token: "hdb-peach", name: "Block peach", hex: "#F7C9A9", use: "Noodles, error alerts.", partner: { label: "ink", hex: "#2B1D14" } },
  { token: "hdb-sky", name: "Corridor sky", hex: "#BFD9EE", use: "Breakfast, info alerts.", partner: { label: "ink", hex: "#2B1D14" } },
  { token: "hdb-lilac", name: "Stairwell lilac", hex: "#D9CCEB", use: "Supper.", partner: { label: "ink", hex: "#2B1D14" } },
  { token: "hdb-mint", name: "Void-deck mint", hex: "#BFE3D0", use: "Sweet, success alerts.", partner: { label: "ink", hex: "#2B1D14" } },
];
