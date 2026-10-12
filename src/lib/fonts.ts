// All typefaces, self-hosted at build time by next/font (no runtime requests).
// Each exposes a CSS variable; a style's theme class maps them to --font-display / --font-body / --font-mono.
import {
  Archivo,
  Bodoni_Moda,
  Figtree,
  Fraunces,
  Geist,
  Geist_Mono,
  Jost,
  Karla,
  Space_Mono,
} from "next/font/google";

// Hub
export const hubSans = Geist({ variable: "--font-hub-sans", subsets: ["latin"] });
export const hubMono = Geist_Mono({ variable: "--font-hub-mono", subsets: ["latin"] });

// Marina Noir
export const noirDisplay = Bodoni_Moda({
  variable: "--font-noir-display",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
});
export const noirBody = Jost({ variable: "--font-noir-body", subsets: ["latin"] });

// Hawker Bright
export const hawkerDisplay = Archivo({ variable: "--font-hawker-display", subsets: ["latin"], axes: ["wdth"] });
export const hawkerBody = Figtree({ variable: "--font-hawker-body", subsets: ["latin"] });
export const hawkerMono = Space_Mono({ variable: "--font-hawker-mono", subsets: ["latin"], weight: ["400", "700"] });

// Shophouse Heritage
export const heritageDisplay = Fraunces({
  variable: "--font-heritage-display",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
});
export const heritageBody = Karla({ variable: "--font-heritage-body", subsets: ["latin"] });

const vars = (...fonts: { variable: string }[]) => fonts.map((f) => f.variable).join(" ");

export const fontVars = {
  hub: vars(hubSans, hubMono),
  "marina-noir": vars(noirDisplay, noirBody),
  "hawker-bright": vars(hawkerDisplay, hawkerBody, hawkerMono),
  "shophouse-heritage": vars(heritageDisplay, heritageBody),
};

/** Just the display faces, for previewing each style on the hub. */
export const displayVars = vars(noirDisplay, hawkerDisplay, heritageDisplay);
