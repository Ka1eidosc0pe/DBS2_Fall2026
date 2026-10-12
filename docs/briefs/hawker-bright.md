# Hawker Bright: creative brief

**Lens:** Everyday Singapore. **Site:** *Makan Map*, where Singaporeans actually eat, and how to order like one.
**Tagline:** Chope a seat. Kopi's on.
**Audience:** curious travelers and backpackers who want to eat like locals at hawker centres and kopitiams, not tourist traps.

## Feeling

Seven a.m. at a hawker centre. Steam off the chicken-rice stall. A uncle pulling teh tarik. Tissue packets on tables to *chope* seats. Rows of numbered stall signs with red and white lettering. HDB blocks in mint, peach, sky, and butter yellow. The playground mosaic dragon at Toa Payoh. Void-deck sunlight and ceiling fans. It is **cheerful, busy, and honest**: dense with information like a stall menu board, but warm and approachable. A little Singlish humour is fine ("Shiok!", "Can lah", "Makan time"); use it sparingly and explain it.

Words: *sunny, chatty, numbered, handwritten, tropical-bright, neighbourly, chope-able.*
Not: *corporate food delivery app, generic Instagram foodie pastel, kitsch tourist souvenir, cluttered without order.*

## Color (tokens in `src/styles/hawker-bright.css`)

| Role | Name | Hex | Use |
| --- | --- | --- | --- |
| bg | Kopi-si | #FBF5EA | Page (milky coffee cream) |
| surface / surface-2 | Plate white / Kaya cream | #FFFFFF / #F3E9D7 | Cards / panels |
| ink | Kopi-o | #2B1D14 | Text **and** thick outlines |
| ink-muted | Teh | #6B5646 | Secondary text |
| line | Formica | #E2D4BD | Soft dividers |
| brand | Pandan | #2F7D4F | Selected chips, stall-sign headers, nav |
| extras | HDB Mint / Peach / Sky / Butter / Lilac | #BFE3D0 / #F7C9A9 / #BFD9EE / #F6E3A1 / #D9CCEB | Category colours, sticker backgrounds, section bands |
| accent | Sambal | #F26B2A | **Primary action only.** Dark kopi-o text on it. |
| danger | Chilli | #C62828 | Errors |

Each dish category or neighbourhood owns an HDB pastel, consistently.

## Type

- **Display:** Archivo (`font-display`) at weight 800–900, **condensed** (`font-variation-settings: "wdth" 62–75`), UPPERCASE for signage moments: stall names, section headers, hero. Tight leading of 0.9–0.95. Big and chunky: 64–120px on desktop, 44–56px on mobile.
- **Body:** Figtree (`font-body`) 400–600 at 16px. Friendly and highly legible.
- **Mono / numeric:** Space Mono (`font-mono`) for **stall numbers** (#01-23), price tiers, queue times, and tiny labels. It reads like a printed receipt or stall code.
- Stall number "badges" are a signature: a mono number in a rounded rectangle with a thick outline, like the real unit numbers.

## Shape, space, motion

- Pills for controls and chips. Cards have an 18px radius.
- **2px kopi-o outlines** on cards, buttons, and inputs, plus a **hard offset shadow** (`shadow-card`: 4px 4px 0 ink). On hover the card lifts (translate -2px,-2px with a bigger shadow), and on press it pushes in (translate 2px,2px with no shadow). It's a tactile, sticker or menu-board feel.
- Density is medium-high: tighter gutters (16–24px) and section padding 64–96px. Grids feel like rows of stalls.
- Motion is snappy and a bit springy, 150–250ms, with a small overshoot (`cubic-bezier(0.34, 1.56, 0.64, 1)`) on chips and toasts. Nothing slow.
- Icons: lucide with `strokeWidth={2.5}`.
- Patterns to draw in code: the **Formica table-top speckle**, the classic **kopitiam mosaic floor tile** (small squares), a tissue-packet "chope" sticker, and receipt-paper zigzag edges for the makan list.

## Site: Makan Map

About 14 **stalls or dishes** across real hawker centres: Maxwell Food Centre, Tiong Bahru Market, Old Airport Road, Chinatown Complex, Lau Pa Sat, Tekka Centre, Newton Food Centre, Adam Road, Amoy Street, Golden Mile Food Centre, and so on. Cover the classics: Hainanese chicken rice, laksa, char kway teow, bak chor mee, Hokkien mee, nasi lemak, roti prata, satay, chwee kueh, kaya toast with kopi, fish soup, carrot cake (white and black), and biryani. You may invent plausible stall names, or use dish plus centre ("Chicken rice @ Maxwell"). Don't claim specific awards or exact prices; use tiers like "$" and "$$". Include "what to order", "how to order it" (the kopi lingo: kopi-o, kopi-c, siew dai, and so on), and a "local tip".

- **Hero:** a big condensed headline ("MAKAN LIKE A LOCAL"), a hawker photo collage with sticker-like cards and tilted photos with outlines, a quick "What are you craving?" search, and a mono "It's {time} — breakfast hour" bit.
- **Filter (interaction 1):** dish-type chips in pastel categories (Rice, Noodles, Breakfast, Supper, Sweet), a neighbourhood select, a "Halal" switch and a "Vegetarian-friendly" switch, and a search box, with a live count and a no-results state ("Wah, nothing leh. Try clearing filters.").
- **Detail panel (interaction 2):** a bottom sheet on mobile and a side panel on desktop styled like a stall menu board, with the dish photo, stall number badge, centre, what to order, how to order, local tip, and spice level (a 0–3 chilli meter). **"Add to makan list"** (sambal, primary) shows a toast ("Shiok! Added.").
- **Makan list:** a receipt-styled drawer with a count badge in the header (sambal badge). It lists the added stalls grouped by centre, with remove actions and an empty state ("Your plate is empty"). Include a "Plan my food crawl" confirm button that shows a loading state, then a success state ("Route sorted! 3 centres, 5 stalls."), disabled when the list has fewer than 2 items.
- **Singlish glossary** band: tap a term to flip and see its meaning (chope, makan, shiok, tapao, siew dai, kopi-o kosong).
- Footer with HDB-pastel stripes.

## Photos to find (about 12–14)

Hawker centre interiors (Maxwell, Lau Pa Sat's Victorian ironwork, Old Airport Road), close-up dishes (chicken rice, laksa, satay grills at night at Lau Pa Sat, roti prata, kaya toast with soft-boiled eggs and kopi), stall signage, colourful HDB blocks (Tiong Bahru Art Deco flats, Rochor Centre if available, Pinnacle@Duxton), the Toa Payoh dragon playground, a void deck, kopitiam tables, and Tekka Centre. Favor bright, natural-light, candid shots. Reject dim or flash shots, blurry food, and crowds without a focal point.
