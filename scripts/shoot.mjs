#!/usr/bin/env node
// Screenshot routes at mobile (390) and desktop (1440) and flag layout problems.
//
//   node scripts/shoot.mjs /hawker-bright/ /hawker-bright/system/ [--out dir] [--base http://localhost:3000] [--viewport-only]
//
// For each route and width: writes <out>/<route>-<width>.png (full page unless --viewport-only)
// and reports horizontal overflow, the elements that cause it, console errors, and failed requests.
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (k, d) => {
  const i = args.indexOf(k);
  return i >= 0 ? args.splice(i, 2)[1] : d;
};
const out = opt("--out", ".shots");
const base = opt("--base", "http://localhost:3000");
const viewportOnly = args.includes("--viewport-only") && args.splice(args.indexOf("--viewport-only"), 1);
const routes = args.length ? args : ["/"];
const widths = [
  { w: 390, h: 844 },
  { w: 1440, h: 900 },
];

await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch();
let problems = 0;

for (const route of routes) {
  for (const { w, h } of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    // Aborted requests are cancelled link prefetches when the page closes, not real failures.
    page.on("requestfailed", (r) => !/ERR_ABORTED/.test(r.failure()?.errorText ?? "") && errors.push(`request failed: ${r.url()}`));
    page.on("response", (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`));

    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);

    const overflow = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const sw = document.documentElement.scrollWidth;
      const culprits = [];
      if (sw > vw) {
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.right > vw + 1 && r.width > 0) {
            const cls = typeof el.className === "string" ? el.className.slice(0, 60) : "";
            culprits.push(`${el.tagName.toLowerCase()}.${cls} right=${Math.round(r.right)}`);
            if (culprits.length >= 6) break;
          }
        }
      }
      return { vw, sw, culprits };
    });

    const slug = (route.replace(/\//g, "_").replace(/^_|_$/g, "") || "hub") + `-${w}`;
    const file = path.join(out, `${slug}.png`);
    await page.screenshot({ path: file, fullPage: !viewportOnly });

    const flags = [];
    if (overflow.sw > overflow.vw) flags.push(`OVERFLOW ${overflow.sw}>${overflow.vw}: ${overflow.culprits.join(" | ")}`);
    if (errors.length) flags.push(`ERRORS: ${[...new Set(errors)].slice(0, 5).join(" | ")}`);
    problems += flags.length;
    console.log(`${flags.length ? "✗" : "✓"} ${route} @${w} → ${file}${flags.length ? "\n    " + flags.join("\n    ") : ""}`);
    await page.close();
  }
}
await browser.close();
process.exit(problems ? 1 : 0);
