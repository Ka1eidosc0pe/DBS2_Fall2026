// Content for The Heritage Trail. Dates are stated only where well documented; otherwise "c." or a decade.

export type DistrictId = "chinatown" | "kampong-glam" | "little-india" | "joo-chiat" | "civic" | "emerald-hill";
export type EraId = "early" | "straits" | "modern";
export type TypeId = "temple" | "mosque" | "church" | "shophouse" | "civic" | "museum";

export const DISTRICTS: { id: DistrictId; name: string; color: string; colorName: string; note: string }[] = [
  { id: "chinatown", name: "Chinatown", color: "var(--d-chinatown)", colorName: "Turmeric", note: "Telok Ayer shoreline and the Hokkien and Tamil temples" },
  { id: "kampong-glam", name: "Kampong Glam", color: "var(--d-kampong-glam)", colorName: "Peranakan Teal", note: "The Malay and Arab quarter around the Sultan's palace" },
  { id: "little-india", name: "Little India", color: "var(--d-little-india)", colorName: "Indigo", note: "Serangoon Road and its temples, villas and trades" },
  { id: "joo-chiat", name: "Joo Chiat", color: "var(--d-joo-chiat)", colorName: "Mangosteen", note: "Katong's Peranakan terraces, east of the city" },
  { id: "civic", name: "Civic District", color: "var(--d-civic)", colorName: "Pandan", note: "Colonial institutions around the Padang and Fort Canning" },
  { id: "emerald-hill", name: "Emerald Hill", color: "var(--d-emerald-hill)", colorName: "Deep Jade", note: "Peranakan terraces just off Orchard Road" },
];

export const ERAS: { id: EraId; label: string; short: string; span: string }[] = [
  { id: "early", label: "Early colonial", short: "Early colonial", span: "1819–1867" },
  { id: "straits", label: "Straits Settlements", short: "Straits", span: "1867–1942" },
  { id: "modern", label: "Modern", short: "Modern", span: "1942 onward" },
];

export const TYPES: { id: TypeId; label: string }[] = [
  { id: "temple", label: "Temple" },
  { id: "mosque", label: "Mosque" },
  { id: "church", label: "Church" },
  { id: "shophouse", label: "Shophouse" },
  { id: "civic", label: "Civic" },
  { id: "museum", label: "Museum" },
];

export type Landmark = {
  id: string;
  name: string;
  district: DistrictId;
  era: EraId;
  type: TypeId;
  /** Sort key and display, e.g. 1842 / "1842" or "c. 1920s" */
  year: number;
  yearLabel: string;
  /** Rough minutes to look around, including the approach */
  minutes: number;
  image: string;
  alt: string;
  position?: string;
  summary: string;
  story: string;
  lookFor: string[];
  timeline: { year: string; text: string }[];
};

const img = (n: string) => `/images/shophouse-heritage/${n}.jpg`;

export const LANDMARKS: Landmark[] = [
  {
    id: "thian-hock-keng",
    name: "Thian Hock Keng Temple",
    district: "chinatown",
    era: "early",
    type: "temple",
    year: 1842,
    yearLabel: "1842",
    minutes: 40,
    image: img("thian-hock-keng"),
    alt: "The front hall of Thian Hock Keng, with red lanterns, a gilded altar and a mosaic of patterned floor tiles in blue, white and terracotta.",
    position: "50% 70%",
    summary: "The Hokkien community's temple to Mazu, goddess of the sea.",
    story:
      "Hokkien immigrants built this temple to thank Mazu for their safe passage across the South China Sea. It once stood almost at the water's edge on Telok Ayer Street, before reclamation pushed the shoreline far away. It was gazetted a national monument in 1973.",
    lookFor: ["Patterned floor tiles in the front hall, laid in blue, white and terracotta", "Gilded timber carving above the altar", "Carved stone columns and doorways facing Telok Ayer Street"],
    timeline: [
      { year: "1839", text: "Construction begins on the Telok Ayer shoreline" },
      { year: "1842", text: "The temple is completed" },
      { year: "1973", text: "Gazetted a national monument" },
    ],
  },
  {
    id: "sri-mariamman",
    name: "Sri Mariamman Temple",
    district: "chinatown",
    era: "early",
    type: "temple",
    year: 1827,
    yearLabel: "1827",
    minutes: 35,
    image: img("gopuram"),
    alt: "The tiered gopuram of Sri Mariamman Temple, crowded with painted figures of deities under a blue sky.",
    position: "50% 30%",
    summary: "Singapore's oldest Hindu temple, under a gopuram of painted gods.",
    story:
      "Founded in 1827 by Naraina Pillai, a government clerk, this is the oldest Hindu temple in Singapore. It grew from a modest shrine into a masonry temple over the nineteenth century, and the Thimithi fire-walking festival is still held here. It became a national monument in 1973.",
    lookFor: ["The tiered gopuram, every ledge crowded with painted deities and guardians", "Gilded finials crowning the top tier", "Shoes left at the doorway, as at every temple here"],
    timeline: [
      { year: "1827", text: "Founded by Naraina Pillai on South Bridge Road" },
      { year: "1973", text: "Gazetted a national monument" },
    ],
  },
  {
    id: "sultan-mosque",
    name: "Sultan Mosque",
    district: "kampong-glam",
    era: "straits",
    type: "mosque",
    year: 1928,
    yearLabel: "1928",
    minutes: 30,
    image: img("sultan-bussorah"),
    alt: "The golden dome and cream facade of the Sultan Mosque, seen from the head of Bussorah Street.",
    position: "50% 22%",
    summary: "A golden dome at the end of Bussorah Street.",
    story:
      "The first mosque on this site was completed around 1826 for Sultan Hussein Shah. The present building, designed by Denis Santry of Swan & Maclaren, was completed in 1928. It became a national monument in 1975.",
    lookFor: ["The golden dome and its dark band at the base, said to be made of glass bottle ends", "Cusped arches and balconies in Indo-Saracenic style", "The view down pedestrian Bussorah Street"],
    timeline: [
      { year: "c. 1826", text: "First mosque completed for Sultan Hussein Shah" },
      { year: "1928", text: "Present building completed" },
      { year: "1975", text: "Gazetted a national monument" },
    ],
  },
  {
    id: "istana-kampong-gelam",
    name: "Istana Kampong Gelam",
    district: "kampong-glam",
    era: "early",
    type: "museum",
    year: 1843,
    yearLabel: "c. 1843",
    minutes: 45,
    image: img("istana"),
    alt: "The white two-storey palace of Istana Kampong Gelam, with dark timber shutters, a tiled roof and an arcade of arches.",
    position: "50% 55%",
    summary: "A Malay palace turned museum, home of the Malay Heritage Centre.",
    story:
      "Sultan Ali, son of Sultan Hussein Shah, built this palace in the 1840s as the seat of the Malay royal household. After decades of other uses, it was restored, and the Malay Heritage Centre opened here in 2005.",
    lookFor: ["An arcade of round arches on the ground floor", "Dark timber shutters thrown open on the upper floor", "Wide clay-tiled eaves and a garden setting"],
    timeline: [
      { year: "c. 1843", text: "Palace built for Sultan Ali" },
      { year: "2005", text: "Malay Heritage Centre opens in the restored palace" },
    ],
  },
  {
    id: "baba-house",
    name: "NUS Baba House",
    district: "chinatown",
    era: "straits",
    type: "museum",
    year: 1895,
    yearLabel: "c. 1890s",
    minutes: 50,
    image: img("baba-house"),
    alt: "A periwinkle-blue Peranakan townhouse with arched timber shutters, a ceramic frieze and green glazed roof-tile eaves.",
    position: "50% 30%",
    summary: "A Peranakan townhouse on Neil Road, restored room by room.",
    story:
      "Built in the 1890s for a Peranakan family, this Neil Road townhouse was later restored and opened to visitors as a heritage house in 2008. It shows how a Straits Chinese home was arranged and ornamented, from carved timber to the ceramic frieze along its front.",
    lookFor: ["The ceramic frieze above the entrance, in shards of green, pink and cream", "Arched shutters in dark timber under a periwinkle wall", "Pierced green glazed panels set into the gate walls"],
    timeline: [
      { year: "c. 1890s", text: "Townhouse built for a Peranakan family" },
      { year: "2008", text: "Restored and opened as a heritage house" },
    ],
  },
  {
    id: "tan-teng-niah",
    name: "House of Tan Teng Niah",
    district: "little-india",
    era: "straits",
    type: "shophouse",
    year: 1900,
    yearLabel: "c. 1900",
    minutes: 20,
    image: img("tan-teng-niah"),
    alt: "A two-storey Chinese villa painted in many colours, with arched shuttered windows and a fretwork eave.",
    position: "50% 28%",
    summary: "A Chinese villa in every colour, in the middle of Little India.",
    story:
      "Built around 1900 for the businessman Tan Teng Niah, this is the last surviving Chinese villa in Little India. Its painted shutters, fretwork eaves and ornamented columns are a reminder that the district was never only one community's.",
    lookFor: ["Fretwork along the eaves", "Arched, louvred shutters painted in a different palette on each bay", "The balanced three-bay facade"],
    timeline: [
      { year: "c. 1900", text: "Villa built for Tan Teng Niah" },
      { year: "1990s", text: "Restored and repainted" },
    ],
  },
  {
    id: "koon-seng-road",
    name: "Koon Seng Road shophouses",
    district: "joo-chiat",
    era: "straits",
    type: "shophouse",
    year: 1920,
    yearLabel: "c. 1920s",
    minutes: 30,
    image: img("koon-seng"),
    alt: "A row of pastel Peranakan terrace houses on Koon Seng Road in pink, green, grey, orange and blue, with ornate plasterwork and louvred shutters.",
    position: "50% 55%",
    summary: "A row of pastel terrace houses, the best-loved facade in Katong.",
    story:
      "These terraces went up in the 1920s as Katong filled with Peranakan families and their neighbours. Each house is dressed in plaster ornament, louvred shutters and glazed tiles, and the row is repainted in a different colour house by house.",
    lookFor: ["Plaster garlands and fretwork under the eaves", "Glazed tiles set into pillars and the lower walls", "Carved gate piers with pyramid caps, and pierced vents in the walls"],
    timeline: [
      { year: "c. 1920s", text: "Terrace houses built in the late shophouse style" },
      { year: "1990s", text: "Joo Chiat area conserved" },
    ],
  },
  {
    id: "raffles-hotel",
    name: "Raffles Hotel",
    district: "civic",
    era: "straits",
    type: "civic",
    year: 1887,
    yearLabel: "1887",
    minutes: 40,
    image: img("raffles"),
    alt: "The white colonial facade of Raffles Hotel, with arched windows, a pediment and a tiled carriage porch."
    ,
    position: "50% 55%",
    summary: "The white-fronted grande dame of colonial Singapore.",
    story:
      "The Armenian Sarkies brothers opened Raffles in 1887 in a beachfront bungalow, and the main building followed in 1899. The Singapore Sling is said to have been invented at its Long Bar in the 1910s. It was gazetted a national monument in 1987.",
    lookFor: ["The white facade, with its arched windows and central pediment", "The wrought-iron porte-cochere and its tiled roof", "Cast-iron roof railings along the skyline"],
    timeline: [
      { year: "1887", text: "Opens as a small hotel founded by the Sarkies brothers" },
      { year: "1899", text: "Main building completed" },
      { year: "1987", text: "Gazetted a national monument" },
    ],
  },
  {
    id: "armenian-church",
    name: "Armenian Church",
    district: "civic",
    era: "early",
    type: "church",
    year: 1835,
    yearLabel: "1835",
    minutes: 25,
    image: img("armenian-church"),
    alt: "The white Armenian Church of St Gregory the Illuminator, with a columned portico and a small spire, on a green lawn.",
    summary: "The oldest surviving church building in Singapore.",
    story:
      "Designed by George Drumgoole Coleman for the small Armenian community, the Church of St Gregory the Illuminator was consecrated in 1835. In its garden lies Agnes Joaquim, who bred the orchid that became Singapore's national flower.",
    lookFor: ["A Neoclassical portico, its slender columns under a plain pediment", "A slim white spire above the roof", "Gravestones in the quiet garden, including Agnes Joaquim's"],
    timeline: [
      { year: "1835", text: "Church consecrated" },
      { year: "1973", text: "Gazetted a national monument" },
    ],
  },
  {
    id: "victoria-theatre",
    name: "Victoria Theatre and Concert Hall",
    district: "civic",
    era: "early",
    type: "civic",
    year: 1862,
    yearLabel: "1862–1905",
    minutes: 25,
    image: img("victoria-theatre"),
    alt: "The white Neoclassical front of the Victoria Theatre and Concert Hall, with the Raffles statue before it."
    ,
    position: "50% 30%",
    summary: "A town hall, theatre and memorial hall under one clock tower.",
    story:
      "The theatre began as a town hall completed in 1862. A memorial hall followed in 1905 and the two were joined behind a clock tower. After a long restoration, the building reopened in 2014.",
    lookFor: ["The clock tower rising over the entrance", "Round windows, pilasters and a carved lion crest", "The bronze Raffles statue before the door"],
    timeline: [
      { year: "1862", text: "Town hall completed" },
      { year: "1905", text: "Memorial hall added" },
      { year: "2014", text: "Reopens after restoration" },
    ],
  },
  {
    id: "peranakan-museum",
    name: "Peranakan Museum",
    district: "civic",
    era: "straits",
    type: "museum",
    year: 1910,
    yearLabel: "1910",
    minutes: 60,
    image: img("peranakan-museum"),
    alt: "The pale green Peranakan Museum building on Armenian Street, with white arcaded balconies."
    ,
    position: "55% 50%",
    summary: "The story of the Straits Chinese, in a former school.",
    story:
      "The building was put up in 1910 as the Tao Nan School, one of the first modern Chinese schools in Singapore. It now holds the national collection of Peranakan material culture: beadwork, furniture, porcelain, jewellery and kebaya. It reopened after a full refit in 2023.",
    lookFor: ["Kamcheng porcelain in pink and green", "Beaded slippers and embroidered kebaya", "Wedding-bed and altar furniture in carved, gilded wood"],
    timeline: [
      { year: "1910", text: "Built as the Tao Nan School" },
      { year: "2008", text: "Opens as the Peranakan Museum" },
      { year: "2023", text: "Reopens after renovation" },
    ],
  },
  {
    id: "emerald-hill",
    name: "Emerald Hill terraces",
    district: "emerald-hill",
    era: "straits",
    type: "shophouse",
    year: 1910,
    yearLabel: "c. 1900s–1930s",
    minutes: 35,
    image: img("emerald-hill"),
    alt: "Peranakan terrace houses on Emerald Hill with ornate gates and tiled facades.",
    summary: "Peranakan terraces up a quiet hill off Orchard Road.",
    story:
      "Emerald Hill was laid out as a residential hill in the early twentieth century, and its terraces were built for wealthy Peranakan families. The houses are known for their carved gates, glazed tiles and rich plasterwork.",
    lookFor: ["Pintu pagar, the carved half-doors inside the main entrance", "Glazed tiles on the facade and in the five-foot way", "Ornate gates and tall front walls"],
    timeline: [
      { year: "c. 1900s", text: "Residential terraces begin to rise on the hill" },
      { year: "1980s", text: "Area conserved" },
    ],
  },
];

export const CITY_TIMELINE: { year: string; era: EraId; title: string; text: string }[] = [
  { year: "1819", era: "early", title: "A trading post", text: "Stamford Raffles lands on the Singapore River and a trading post is agreed with local rulers." },
  { year: "1822", era: "early", title: "The town plan", text: "A plan for the new town sets aside separate quarters, the roots of today's districts." },
  { year: "1867", era: "straits", title: "Crown colony", text: "The Straits Settlements pass from the East India Company to the Colonial Office." },
  { year: "1942", era: "modern", title: "Occupation", text: "Singapore falls in February, beginning the Japanese Occupation." },
  { year: "1965", era: "modern", title: "Independence", text: "Singapore becomes a sovereign republic on 9 August." },
  { year: "1989", era: "modern", title: "Conservation", text: "A conservation plan begins to protect entire streets of shophouses, not just single monuments." },
];

export function minutesLabel(mins: number) {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

export function districtOf(id: DistrictId) {
  return DISTRICTS.find((d) => d.id === id)!;
}
export function eraOf(id: EraId) {
  return ERAS.find((e) => e.id === id)!;
}
export function typeOf(id: TypeId) {
  return TYPES.find((t) => t.id === id)!;
}
