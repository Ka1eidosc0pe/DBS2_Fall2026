import noir from "@/data/credits/marina-noir.json";
import hawker from "@/data/credits/hawker-bright.json";
import heritage from "@/data/credits/shophouse-heritage.json";
import type { StyleSlug } from "@/lib/styles";

export type Credit = {
  /** Public path, e.g. /images/hawker-bright/kopi.jpg */
  file: string;
  title: string;
  author: string;
  license: string;
  licenseUrl?: string;
  /** Page the image came from (Commons file page, Unsplash photo page) */
  source: string;
};

export const CREDITS: Record<StyleSlug, Credit[]> = {
  "marina-noir": noir as Credit[],
  "hawker-bright": hawker as Credit[],
  "shophouse-heritage": heritage as Credit[],
};

export function creditFor(file: string): Credit | undefined {
  return Object.values(CREDITS).flat().find((c) => c.file === file);
}
