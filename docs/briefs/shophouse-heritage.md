# Shophouse Heritage: creative brief

**Lens:** Historic Singapore. **Site:** *The Heritage Trail*, a self-guided walk through Singapore's old quarters.
**Tagline:** Walk the five-foot way.
**Audience:** culturally curious travelers who want history, architecture, and the stories of the Peranakan, Malay, Chinese, Indian, and Eurasian communities that built the city.

## Feeling

Morning light on a row of Joo Chiat shophouses: pastel facades, carved timber, louvred windows, and **Peranakan majolica tiles** in jade, pink, and cobalt set into the walls. The cool shade of a five-foot way. Batik and kebaya embroidery. Nyonya porcelain (kamcheng) in pink and green. Hand-painted shop signboards in gold-on-black or red. Letterpress-printed museum labels. It feels **ornate but orderly, handmade, warm, and scholarly**, like a beautifully designed museum guide. Pattern is the signature, framed by calm celadon space.

Words: *ornamented, crafted, tiled, sun-faded, storied, symmetrical, curated.*
Not: *sepia "old-timey" pastiche, Chinese-New-Year red-and-gold (that's Marina Noir's territory), dusty and dull, theme-park oriental.*

## Color (tokens in `src/styles/shophouse-heritage.css`)

| Role | Name | Hex | Use |
| --- | --- | --- | --- |
| bg | Celadon | #E3EDE6 | Page |
| surface / surface-2 | Porcelain / Glaze | #F7FAF7 / #D5E3DA | Cards / panels |
| ink | Indigo ink | #1F2A33 | Text |
| ink-muted | Slate | #55616b | Secondary text |
| line | Kiln line | #BCCFC3 | Dividers |
| brand | Jade | #2E6E5E | Headers, selected chips, nav, tile motifs |
| extras | Peranakan Teal / Turmeric / Indigo / Deep jade | #3A9CA6 / #D9A23B / #2B3A67 / #1F5F52 | Tiles, district colours, era markers, timeline |
| accent | Nyonya Coral | #E8837A | **Primary action only.** Indigo ink text on it. |
| danger | Madder | #A8324A | Errors |

Each **district** owns a colour from the extras (Kampong Glam = teal, Chinatown = turmeric, Little India = coral is *not* allowed as it's the accent, so use indigo, and so on). Pick a consistent mapping and show it on the system page.

## Type

- **Display:** Fraunces (`font-display`), with soft, "wonky" optical styles at large sizes (`font-variation-settings: "SOFT" 100, "WONK" 1, "opsz" 144`) and weight 500–700. Italic for dates and epigraphs. Large: 56–88px on desktop, 40–48px on mobile.
- **Body:** Karla (`font-body`) 400–500 at 16–17px.
- **Label:** Karla 600–700, UPPERCASE, small (11–12px), tracking 0.12em: museum-label style.
- **Numerals:** Fraunces old-style figures for years (1823, 1932). Dates are a recurring motif.

## Shape, space, motion

- **Arched tops**: cards and image frames echo shophouse windows and doorways (`border-radius: 999px 999px var(--r-card) var(--r-card)` on images, or an SVG arch mask). Use them on featured items and some photos, not everything.
- Controls use a gentle 6px radius, cards 10px.
- **Tile-pattern borders and dividers**: a band of Peranakan tile motifs drawn in SVG as section dividers and drawer headers. A small four-petal tile icon is the bullet.
- Symmetry and centred axes for hero and section headers, like a shophouse facade. The content grid is regular and calm.
- Space is comfortable: section padding 96–128px on desktop, 64–80px on mobile.
- Motion is gentle and crafted, 250–400ms ease-out, with tiles that rotate or fade in subtly and arches that reveal photos with a clip-path wipe upward.
- Icons: lucide `strokeWidth={1.5}`.
- **Patterns to draw in code (essential):** at least one convincing **Peranakan tile** (a four-fold symmetric floral in jade, teal, coral, and turmeric on cream) as a repeatable SVG pattern, plus a simpler **ventilation-grille** or **batik** line pattern.

## Site: The Heritage Trail

About 12–14 **landmarks** across districts: **Chinatown** (Thian Hock Keng Temple, Sri Mariamman Temple, Chinatown Heritage Centre shophouses), **Kampong Glam** (Sultan Mosque, Malay Heritage Centre / Istana Kampong Gelam, Arab Street), **Little India** (Sri Veeramakaliamman Temple, the House of Tan Teng Niah), **Joo Chiat / Katong** (Koon Seng Road shophouses, Peranakan houses), the **Civic District** (Raffles Hotel, Armenian Church, the Victoria Theatre, the Peranakan Museum, Fort Canning), and **Tiong Bahru** (1930s Art Deco estate), plus Emerald Hill. Each has its district, era (Early colonial 1819–1867 / Straits Settlements 1867–1942 / Modern 1942– ), type (Temple, Mosque, Church, Shophouse, Civic, Museum), approximate built-year, a 2–3 sentence story, "look for" details, and walking time. Only state dates you're confident of; use "c." and decades when not.

- **Hero:** centred, symmetric, with a Fraunces headline, an arched photo of a shophouse row, a tile band below, and **"Start your trail"** as the primary (coral) action.
- **Filter (interaction 1):** district chips (each with its colour dot), an era segmented control, a type select, and a live count with a no-results state ("No landmarks match. The archive is quiet.").
- **Detail panel (interaction 2):** a drawer with an arched image, district and era labels, the story, "Look for" bullets with tile icons, a small **timeline** of key dates, and **"Add to trail"** (coral, primary) with a toast.
- **My trail:** a panel with a count badge (coral badge) listing added stops in order, with move up and down (icon buttons, disabled at the ends) and remove, plus total walking time and an empty state. A **"Print my route"** confirm shows loading, then success ("Your route is ready: 4 stops, about 2 hours."), and is disabled until at least 2 stops are added.
- **Timeline band:** a horizontal scroll on mobile (a vertical grid on desktop) of key city dates (1819, 1867, 1942, 1965, ...). Clicking a date filters by era.
- Footer with a tile strip.

## Photos to find (about 12–14)

Peranakan shophouses on Koon Seng Road, Peranakan tile close-ups, Sultan Mosque, Thian Hock Keng, Sri Mariamman's gopuram, the House of Tan Teng Niah, Tiong Bahru Art Deco flats, Raffles Hotel in daytime, the Armenian Church, the Peranakan Museum, Emerald Hill, five-foot-way shade, and kamcheng porcelain or kebaya. Favor daylight, frontal or symmetric architectural shots with clean verticals. Reject tilted verticals, people-heavy street scenes, night shots, and overprocessed HDR.
