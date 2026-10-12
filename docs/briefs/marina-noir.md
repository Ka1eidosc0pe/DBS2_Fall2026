# Marina Noir: creative brief

**Lens:** Crazy Rich Singapore. **Site:** *The Concierge*, a private guide to Singapore after dark.
**Tagline:** After dark, by invitation.
**Audience:** affluent travelers and honeymooners planning special evenings: a rooftop at golden hour, a chef's counter, a suite with a bay view.

## Feeling

A private members' club at midnight. Marina Bay's lights reflected on black water. Lacquered oxblood walls, brass fittings, white tablecloths, a single gold rim on a glass. *Crazy Rich Asians* (2018) is the reference, especially the Marina Bay Sands rooftop, the Gardens by the Bay night scenes, the Tyersall Park opulence, and the Raffles-like colonial grandeur. Use it as a reference, not a name. The design is **restrained**: luxury here means space, slowness, and precision, not glitter. Nothing shouts. Gold appears once per view.

Words: *hushed, lacquered, nocturnal, tailored, gilded-but-quiet, cinematic, by appointment.*
Not: *bling, casino, nightclub neon, gradient-glow tech, maximalist chinoiserie.*

## Color (tokens in `src/styles/marina-noir.css`)

| Role | Name | Hex | Use |
| --- | --- | --- | --- |
| bg | Onyx | #0B0A0A | Page |
| surface / surface-2 | Smoke / Velvet | #141212 / #1C1918 | Cards, panels, drawer |
| ink | Ivory | #F3EDE4 | Primary text |
| ink-muted / ink-subtle | Linen / Taupe | #A89F94 / #7A7168 | Secondary text, meta |
| line / line-strong | Hairline / Bronze line | #2E2926 / #4A403A | Rules, borders |
| brand | Oxblood | #6E1423 | Selected chips, brand panels, section bands |
| --lacquer | Lacquer | #A3172B | Small decorative moments: a rule, an active indicator, a seal |
| accent | Champagne | #D4B67A | **Primary action only.** Dark text on it. |

Gold is tempting as decoration. Don't. Gold is the call to action; use thin ivory or bronze rules for ornament instead. Reds carry the brand. Photos are dark, warm, and low-key, so they sit in the palette.

## Type

- **Display:** Bodoni Moda (`font-display`), weight 400–500, high optical size (`font-variation-settings: "opsz" 96` at large sizes), tight but not cramped tracking. Italic for taglines and pull-quotes. Big: 56–96px on desktop, 40–48px on mobile.
- **Body:** Jost (`font-body`), 300–400 weight at 16–17px with generous line-height.
- **Label:** Jost 500, UPPERCASE, 11–12px, tracking 0.18–0.24em. Used for eyebrows, nav, buttons, meta. This is a signature of the style.
- Numerals: Bodoni for large stat moments ("57 floors up").

## Shape, space, motion

- **Square corners everywhere** (radius 0). The one exception is pill-shaped filter chips, with hairline borders.
- Borders are 1px hairlines. Use double-rule dividers (two hairlines 3px apart) and thin Art Deco corner brackets on featured cards.
- Lots of negative space: section padding 120–160px on desktop, 72–96px on mobile. Max text measure about 60ch.
- Layout is an asymmetric editorial grid of 12 columns with large images bleeding off one edge.
- Motion is slow and smooth: 400–700ms, `cubic-bezier(0.2, 0.7, 0.1, 1)`. Fade and rise 8–12px on reveal. Image hover is a slow 1.03 scale. Nothing bouncy.
- Elevation: shadows barely read on black. Depth comes from surface steps and a thin bronze top border.
- Icons: lucide with `strokeWidth={1}`.
- Pattern to draw in code: a fine Art Deco fan or sunburst line pattern, or a lattice inspired by Peranakan-meets-Deco grilles, in hairline bronze at low opacity. Use it on the mood board, the drawer header, and the hero ornament.

## Site: The Concierge

A curated set of about 12 **experiences** across four kinds of evening: **Dine** (chef's tables, fine dining), **Drink** (rooftop and hotel bars), **Stay** (suites, landmark hotels), **Moments** (private gallery viewing at the ArtScience Museum, Gardens by the Bay after dark, a sunset sail, Spectra light show viewing). Use real, well-known places: Marina Bay Sands, Raffles Hotel and its Long Bar, Gardens by the Bay, Fullerton Bay, Capella Sentosa, National Gallery, CÉ LA VI, Atlas Bar (Parkview Square), and so on. No prices; use tiers ($$$ / $$$$) and "Dress: smart elegant".

- **Hero:** full-bleed night photo of Marina Bay, a large Bodoni headline, an eyebrow label, and a single gold CTA, "Plan an evening", that scrolls to the collection.
- **Filter (interaction 1):** pill chips for All · Dine · Drink · Stay · Moments, plus a sort ("Curated" / "Latest seating" / "Most private") as a select or segmented control. A live count ("8 experiences") and a no-results state. Optionally a "Black-tie only" switch.
- **Detail panel (interaction 2):** a right-side drawer at desktop, full-screen sheet on mobile. It holds a large image, a description, "The details" (neighborhood, dress, best time, tier), and a **reservation request form**: date (select from the next 7 evenings), party size (stepper), seating preference (radio: Bar / Table / Private room), and a note (textarea). **"Request reservation"** (gold, primary) is disabled until date and party are set, shows a loading state, shows an inline error if the note is over 200 characters or the party is over 8, and ends in a success state ("Your concierge will confirm by morning.").
- **The Evening list:** requested items gather in an "Your evening" panel with a count badge in the header (gold badge), each with a remove (ghost) action and an empty state.
- A short editorial band ("Three ways to spend a night in Singapore") and a quiet footer.

## Photos to find (about 12–14)

Marina Bay Sands at night, the bay skyline reflected in water, Gardens by the Bay Supertrees at night, the Raffles Hotel facade and interior, Long Bar, the Fullerton Hotel at night, the ArtScience Museum, a rooftop bar or infinity pool view, the National Gallery's interior, champagne or cocktail detail shots, a fine-dining plate, and a dark hotel interior. Favor dark, warm, moody shots. Reject daytime tourist snaps, crowds, and overcooked HDR (Diego Delso's HDR shots can look overprocessed, so check each one).
