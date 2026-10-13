# Singapore, Three Ways

A travel guide to Singapore designed in three visual styles. Each has a mood board, a design system, and a small static site built from that system, all reachable from a hub.

| Style | Lens | Site |
| --- | --- | --- |
| **Marina Noir** | Crazy Rich Singapore: onyx, oxblood, champagne | *The Concierge*, evenings by invitation |
| **Hawker Bright** | Everyday Singapore: kopi, pandan, HDB pastels | *Makan Map*, eat like a local |
| **Shophouse Heritage** | Historic Singapore: Peranakan jade, teal, coral | *The Heritage Trail*, a self-guided walk |

**Live:** https://dbs2-fall2026.vercel.app

Creative briefs live in `docs/briefs/`, and build rules in `docs/conventions.md`.

## Deliverables

| Route | What it is |
| --- | --- |
| `/` | Hub linking to every deliverable |
| `/credits` | Photo credits |
| `/<style>/moodboard` | Mood board for the style |
| `/<style>/system` | Design system / UI library: color roles, typeface roles, spacing and shape, components, control states, UI states |
| `/<style>` | The site, built strictly from that style's design system |

## Site requirements (each style)

- Thoughtful visual hierarchy
- 2+ interactions faked in the browser (e.g. a filter and a detail panel)
- Every control shown in its states
- Accent color reserved for the primary action
- Responsive, verified at **390px** (mobile) and **1440px** (desktop)

## Stack

Next.js (App Router) + Tailwind CSS, exported as a static site. No database, accounts, external APIs, or data storage.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Static output lands in `out/`.

## Verify layouts

```bash
node scripts/shoot.mjs / /hawker-bright/ --out .shots
```

Screenshots each route at 390px and 1440px and flags horizontal overflow, console errors, and failed requests.

## Deploy

Hosted on Vercel (project `dbs2-fall2026`) as a static export. Pushes to `main` on GitHub deploy automatically.

```bash
npx vercel deploy --prod
```

Check the live site at both widths with `node scripts/shoot.mjs --base https://dbs2-fall2026.vercel.app / ...`.
