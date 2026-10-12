# Three Visual Styles

An accelerated journey into UI/UX and visual design: three visual styles, each with a mood board, a design system, and a small static site built in that style, all reachable from a hub.

## Deliverables

| Route | What it is |
| --- | --- |
| `/` | Hub linking to every deliverable |
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
