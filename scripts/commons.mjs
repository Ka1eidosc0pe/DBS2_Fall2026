#!/usr/bin/env node
// Download a Wikimedia Commons image into public/images/<style>/ and record its credit.
//
//   node scripts/commons.mjs <style-slug> "File:Some photo.jpg" <out-name> [width=1600]
//
// Writes public/images/<style>/<out-name>.jpg and upserts src/data/credits/<style>.json.
// Find candidates with:
//   curl -s "https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&format=json&srlimit=20&srsearch=hawker%20centre%20singapore" | jq -r '.query.search[].title'
import fs from "node:fs/promises";
import path from "node:path";

const [style, title, name, width = "1600"] = process.argv.slice(2);
if (!style || !title || !name) {
  console.error('usage: node scripts/commons.mjs <style> "File:Name.jpg" <out-name> [width]');
  process.exit(1);
}
const UA = "SingaporeThreeWays/1.0 (student design project; static site)";
const api =
  "https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo" +
  `&iiprop=url|extmetadata|size|mime&iiurlwidth=${width}&titles=${encodeURIComponent(title)}`;

const res = await fetch(api, { headers: { "User-Agent": UA } });
const data = await res.json();
const page = Object.values(data.query.pages)[0];
if (!page.imageinfo) {
  console.error("Not found:", title);
  process.exit(1);
}
const info = page.imageinfo[0];
const meta = info.extmetadata ?? {};
const strip = (s = "") => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const license = strip(meta.LicenseShortName?.value) || "See source";
if (!/cc0|public domain|cc by|cc-by|pd/i.test(license)) {
  console.error(`Refusing: licence "${license}" is not CC0 / PD / CC BY(-SA).`);
  process.exit(1);
}

const img = await fetch(info.thumburl ?? info.url, { headers: { "User-Agent": UA } });
if (!img.ok) {
  console.error("Download failed", img.status);
  process.exit(1);
}
const outDir = path.join("public/images", style);
await fs.mkdir(outDir, { recursive: true });
const outFile = path.join(outDir, `${name}.jpg`);
await fs.writeFile(outFile, Buffer.from(await img.arrayBuffer()));

const credit = {
  file: `/images/${style}/${name}.jpg`,
  title: strip(meta.ObjectName?.value) || title.replace(/^File:/, "").replace(/\.\w+$/, ""),
  author: strip(meta.Artist?.value) || "Unknown",
  license,
  licenseUrl: meta.LicenseUrl?.value,
  source: info.descriptionurl,
};
const creditsFile = path.join("src/data/credits", `${style}.json`);
const list = JSON.parse(await fs.readFile(creditsFile, "utf8").catch(() => "[]"));
const next = [...list.filter((c) => c.file !== credit.file), credit];
await fs.writeFile(creditsFile, JSON.stringify(next, null, 2) + "\n");

console.log(`saved ${outFile} (${info.thumbwidth ?? info.width}x${info.thumbheight ?? info.height}) · ${credit.author} · ${license}`);
