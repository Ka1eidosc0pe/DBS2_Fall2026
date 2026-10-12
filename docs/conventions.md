# Build conventions

The rules every style follows. Each style also has a creative brief in `docs/briefs/<slug>.md`.

## The project

**Singapore, Three Ways**: a travel guide to Singapore, designed in three visual styles. Each style ships three pages, linked from the hub at `/`:

| Route | Deliverable |
| --- | --- |
| `/<slug>/moodboard/` | Mood board |
| `/<slug>/system/` | Design system / UI library |
| `/<slug>/` | The site, built only from that system |

Slugs: `marina-noir`, `hawker-bright`, `shophouse-heritage`.

Stack: Next.js 16 App Router + Tailwind v4, built with `output: "export"`. No database, accounts, external APIs, runtime network requests, or storage (no localStorage). All interactions are faked in client state.

> **Next.js 16 differs from older versions.** Before writing Next-specific code, read the relevant guide in `node_modules/next/dist/docs/`. `LayoutProps<"/route">` and `PageProps<"/route">` are global types.

## Ownership (parallel builds share one checkout)

Each style owns only these paths:

```
src/app/<slug>/**             routes (layout already wraps pages in <ThemeRoot theme="<slug>">)
src/components/<slug>/**      that style's components
src/data/<slug>/**            that style's content
src/data/credits/<slug>.json  photo credits
src/styles/<slug>.css         that style's tokens
public/images/<slug>/**       photos
```

**Do not edit anything else.** That includes `globals.css`, `src/lib/*`, `src/components/ThemeRoot.tsx`, other styles, `package.json`, and config files. If you need a shared change or a new package, say so in your final report. `lucide-react` is installed. You may add new tokens to your own `src/styles/<slug>.css` and use them as `bg-(--my-token)`.

## Tokens

Semantic tokens are mapped to Tailwind utilities in `src/app/globals.css`. Use them, not raw hex:

- **Color:** `bg` `surface` `surface-2` `ink` `ink-muted` `ink-subtle` `line` `line-strong` `brand` `on-brand` `accent` `accent-hover` `accent-pressed` `on-accent` `focus` `success` `warning` `danger` `info`, used as `bg-surface`, `text-ink-muted`, `border-line`, and so on.
- **Type:** `font-display` `font-body` `font-mono`
- **Shape:** `rounded-control` `rounded-card` `rounded-pill` `shadow-card` `shadow-raised`

You may tune values in your token file. Keep body text at or above WCAG AA (4.5:1) and large text and UI at or above 3:1, and put contrast ratios on the design system page. If you change a hub-facing color (bg, ink, accent, brand), mention it in your report so the hub card in `src/lib/styles.ts` can be updated.

## The accent rule

**`accent` is used only for the primary action**: the one action that matters most on a screen ("Request reservation", "Add to makan list", "Add to trail") and its direct echoes (the counter badge on the list that action fills, the primary button in that list's drawer). Never for decoration, headings, links, selected filter chips, or icons. Use `brand` and the style extras for those. Reviewers check this.

## Components

- Live in `src/components/<slug>/`, one file per component or family, named in PascalCase.
- **The design system page and the site import the same components.** No copies, no one-off restyles on the site.
- Every interactive component takes an optional `forceState?: "hover" | "focus" | "active" | "disabled" | "loading" | "selected" | "error"` prop for the system page. Implement it as `data-force={forceState}` with matching selectors next to the real pseudo-classes, e.g. `hover:bg-accent-hover data-[force=hover]:bg-accent-hover`, so states look identical forced or real.
- Use real elements: `<button>`, `<a>`, `<input>`, `<label>`. Use `aria-pressed`/`aria-checked`/`aria-expanded` as appropriate. Dialogs and drawers trap focus, close on Esc and backdrop click, and return focus to their trigger.
- Tap targets are at least 44×44px on mobile.

## Design system page (`/<slug>/system/`)

Rendered in the style itself. Required sections, in this order:

1. **Color roles**: every semantic token plus extras, with role name, hex, what it's for, and contrast against its usual partner. Include a "where the accent goes" do/don't.
2. **Typeface roles**: display, headline, title, body, label, caption, and mono or numeric if used. Each with a live specimen, family, size and line-height at mobile and desktop, weight, tracking, and case.
3. **Spacing and shape**: spacing scale, radii, border weights, elevation, layout grid, breakpoints, and motion (durations and easing).
4. **Components**: buttons (primary, secondary, tertiary or ghost, destructive if relevant, icon button), text input, search, select, checkbox, radio, switch, filter chip, segmented control or tabs, card, badge or tag, tooltip, toast or alert, dialog or drawer (the detail panel), navigation bar, and any style-specific pieces.
5. **Control states**: a matrix per control. Rows are controls; columns are default, hover, focus-visible, active/pressed, selected (where it applies), disabled, loading (where it applies), error (inputs). Uses `forceState`.
6. **UI states**: empty, loading (skeletons), error with retry, success or confirmation, and no results from a filter. Each shown as it appears on the site.

Plus a sticky or top in-page nav to jump between sections.

## Mood board (`/<slug>/moodboard/`)

Rendered in the style. A real board, not a document: an editorial collage of 8–14 photos at varied sizes, the palette with evocative color names, type specimens, at least one texture or pattern drawn in code (SVG or CSS), keywords, references, photography direction, and a short "this, not that" list. Every photo shows a small credit (author · licence) and links to its source.

## Photos

Use `node scripts/commons.mjs <slug> "File:Exact title.jpg" <out-name>`. It downloads a ~1600–1920px JPEG to `public/images/<slug>/<out-name>.jpg`, refuses non-free licences, and records the credit in `src/data/credits/<slug>.json`. Search with:

```bash
curl -s -A "SingaporeThreeWays/1.0" "https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&format=json&srlimit=20&srsearch=YOUR+QUERY" | python3 -c "import json,sys;[print(x['title']) for x in json.load(sys.stdin)['query']['search']]"
```

**Look at every photo before using it** (Read the file). Reject photos that are blurry, badly composed, tilted, heavily HDR'd, watermarked, the wrong place, or off-mood. Photos are the mood. About 10–16 photos per style is plenty. Use `next/image` (images are unoptimized in static export) with `sizes` and real `alt` text. Show each photo's credit with `creditFor(file)` from `@/lib/credits`, and keep credits visible but small.

## Content

Real Singapore places and dishes, described accurately. Avoid facts that go stale or are easy to get wrong: no exact prices, opening hours, phone numbers, or awards. Use price tiers and general descriptions. When unsure, leave it out. Data goes in typed TS files in `src/data/<slug>/`.

## Site requirements (`/<slug>/`)

- A clear visual hierarchy: one obvious focal point per section.
- **At least two faked interactions**: (1) filtering a collection (chips, search, or sort) with a live count and a no-results state, and (2) a detail panel (drawer on desktop, bottom sheet or full screen on mobile). The primary action fills a list (a drawer or panel with a count) and shows a toast.
- **Every control in its states on the live site**: hover, focus-visible, pressed, selected, disabled (e.g. a confirm button disabled until required fields are set), loading (fake 600–900ms), error (inline validation), plus empty and success states.
- Accent only on the primary action.
- Responsive. Verified at **390px and 1440px**, with no horizontal overflow and nothing cramped or stretched. Design for both; mobile is not a squashed desktop.
- Header nav includes a quiet way back to the hub and to this style's mood board and system.

## Every page

- `export const metadata = { title: "..." }`.
- Small cross-links: Hub · Mood board · Design system · Site.
- Respect `prefers-reduced-motion` (already global for CSS; also gate JS animation).

## Verification

A dev server runs at `http://localhost:3000`. Don't start another.

```bash
node scripts/shoot.mjs /<slug>/ /<slug>/moodboard/ /<slug>/system/ --out .shots/<slug>
```

This saves full-page PNGs at 390 and 1440 and fails on horizontal overflow, console errors, or 4xx responses. **Read the screenshots and judge them like a designer**: hierarchy, alignment, spacing rhythm, text wrapping, image crops, and whether it is unmistakably this style. For tall pages, add `--viewport-only` and scroll targets, or write a quick Playwright snippet to capture specific states (drawer open, filter with no results). Then run `npm run lint` and `npx tsc --noEmit`. `npm run build` must pass at the end.

## Commits

Commit at each milestone so history shows real progress. Aim for about 6–10 commits per style, for example: photos + credits → mood board → tokens + type → components → state matrices + system page → site structure → site interactions → responsive and polish fixes. Prefix messages with the style name, e.g. `Hawker Bright: mood board`.

Other agents commit in the same checkout at the same time, so **only ever commit your own paths**:

```bash
git add src/app/<slug> src/components/<slug> src/data/<slug> src/data/credits/<slug>.json src/styles/<slug>.css public/images/<slug>
git commit -m "<Style>: <what>" -m "<optional detail>" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -- src/app/<slug> src/components/<slug> src/data/<slug> src/data/credits/<slug>.json src/styles/<slug>.css public/images/<slug>
```

The `-- <paths>` at the end is required so you never sweep up another style's staged work. If git reports `index.lock`, wait a few seconds and retry. Never `git add -A`, `git stash`, `git reset`, `git checkout -- .`, or push.
