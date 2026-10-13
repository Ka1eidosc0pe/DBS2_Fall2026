export type Kind = "Dine" | "Drink" | "Stay" | "Moments";
export const KINDS: Kind[] = ["Dine", "Drink", "Stay", "Moments"];
export type Seating = "Bar" | "Table" | "Private room";

export type Experience = {
  id: string;
  kind: Kind;
  name: string;
  place: string;
  neighborhood: string;
  tier: "$$$" | "$$$$";
  /** One line for the card. */
  tagline: string;
  /** Paragraphs for the detail drawer. */
  about: string[];
  dress: string;
  blackTie: boolean;
  bestTime: string;
  /** Last seating, 24h clock, for the "Latest seating" sort. */
  lastSeating: number;
  lastSeatingLabel: string;
  /** 1 to 5, for the "Most private" sort. */
  privacy: number;
  seating: Seating[];
  image: string;
  imageAlt: string;
  /** CSS object-position for the card crop. */
  position?: string;
};

const img = (n: string) => `/images/marina-noir/${n}.jpg`;

export const EXPERIENCES: Experience[] = [
  {
    id: "waku-ghin",
    kind: "Dine",
    name: "A chef's counter above the bay",
    place: "Waku Ghin, Marina Bay Sands",
    neighborhood: "Marina Bay",
    tier: "$$$$",
    tagline: "A Japanese-inflected tasting menu, cooked a few feet from your seat.",
    about: [
      "A long tasting menu built around a single counter and a single chef. Courses arrive one at a time and the room is kept deliberately quiet.",
      "Your concierge can ask for the counter seats that face the cooking, or for the private room when the evening is a proposal.",
    ],
    dress: "Smart elegant",
    blackTie: false,
    bestTime: "The first seating, while the bay is still blue",
    lastSeating: 20.5,
    lastSeatingLabel: "8:30 pm",
    privacy: 4,
    seating: ["Table", "Private room"],
    image: img("mbs-dusk"),
    imageAlt: "Marina Bay Sands at dusk, its three towers glowing across still water",
    position: "50% 50%",
  },
  {
    id: "odette",
    kind: "Dine",
    name: "French dining in the old City Hall",
    place: "Odette, National Gallery Singapore",
    neighborhood: "Civic District",
    tier: "$$$$",
    tagline: "Contemporary French cooking beneath a colonial dome.",
    about: [
      "The National Gallery occupies the former City Hall and Supreme Court. The dining room sits inside it, with high ceilings and a hush that suits a long dinner.",
      "Arrive early and walk the atrium first: the galleries are lit warmly at dusk and make a natural prelude.",
    ],
    dress: "Evening wear",
    blackTie: true,
    bestTime: "A weekday, with an early walk through the galleries",
    lastSeating: 20,
    lastSeatingLabel: "8:00 pm",
    privacy: 3,
    seating: ["Table", "Private room"],
    image: img("gallery-atrium"),
    imageAlt: "The National Gallery's pillared atrium glowing in warm light",
    position: "50% 40%",
  },
  {
    id: "lighthouse",
    kind: "Dine",
    name: "Supper beneath the lighthouse",
    place: "The Lighthouse, The Fullerton Hotel",
    neighborhood: "Raffles Place",
    tier: "$$$",
    tagline: "A rooftop table above the heritage building, facing the bay.",
    about: [
      "The Fullerton was once the General Post Office, and its stone colonnades are floodlit after dark. The restaurant occupies the rooftop lantern.",
      "Ask for a table by the glass at sunset; by the end of dinner the skyline across the water has turned gold.",
    ],
    dress: "Smart elegant",
    blackTie: false,
    bestTime: "Sunset, then a slow second course",
    lastSeating: 21,
    lastSeatingLabel: "9:00 pm",
    privacy: 2,
    seating: ["Table", "Private room"],
    image: img("fullerton-aerial"),
    imageAlt: "Aerial view of The Fullerton Hotel at night, its facade lit in gold, with the river behind",
    position: "30% 55%",
  },
  {
    id: "long-bar",
    kind: "Drink",
    name: "The Long Bar, properly",
    place: "Long Bar, Raffles Hotel",
    neighborhood: "Civic District",
    tier: "$$$",
    tagline: "The Singapore Sling where it was first shaken, with the peanuts.",
    about: [
      "A planter-era room of fans, dark wood and green lamps. The Singapore Sling is the thing to order, and the tradition of dropping peanut shells on the floor is still observed.",
      "Come after the dinner crowd has thinned. A late table, one sling each, and the hotel's colonial grandeur does the rest.",
    ],
    dress: "Smart elegant",
    blackTie: false,
    bestTime: "After 9 pm, once the room settles",
    lastSeating: 22.5,
    lastSeatingLabel: "10:30 pm",
    privacy: 2,
    seating: ["Bar", "Table"],
    image: img("singapore-sling"),
    imageAlt: "A Singapore Sling in a tall glass beside a sack of peanuts on a marble table",
    position: "60% 55%",
  },
  {
    id: "atlas",
    kind: "Drink",
    name: "Gin and champagne in an Art Deco hall",
    place: "Atlas, Parkview Square",
    neighborhood: "Bugis",
    tier: "$$$",
    tagline: "A towering lobby bar of brass, marble and an immense gin library.",
    about: [
      "Parkview Square is a Gotham-style Art Deco tower, and Atlas fills its double-height lobby with a tiered gin tower, brass and dark marble.",
      "Order champagne by the glass or a considered martini, and stay for the room itself, which is the main event.",
    ],
    dress: "Smart elegant",
    blackTie: false,
    bestTime: "Mid-evening, before the live music",
    lastSeating: 23,
    lastSeatingLabel: "11:00 pm",
    privacy: 3,
    seating: ["Bar", "Table"],
    image: img("champagne-pour"),
    imageAlt: "Champagne being poured into two tall flutes in lamplight",
    position: "50% 35%",
  },
  {
    id: "lantern",
    kind: "Drink",
    name: "A rooftop hour on the water",
    place: "Lantern, The Fullerton Bay Hotel",
    neighborhood: "Marina Bay",
    tier: "$$$",
    tagline: "A low-lit rooftop bar facing the whole sweep of the bay.",
    about: [
      "Set on the roof of a hotel at the water's edge, Lantern looks straight across Marina Bay to the towers and the Sands.",
      "Time it for the end of the evening light show, then settle in with a drink while the bay quiets.",
    ],
    dress: "Smart elegant",
    blackTie: false,
    bestTime: "Just after dark, facing the bay",
    lastSeating: 23.5,
    lastSeatingLabel: "11:30 pm",
    privacy: 2,
    seating: ["Bar", "Table"],
    image: img("skyline-bridge"),
    imageAlt: "The Singapore skyline at night over the Esplanade bridge, lights reflecting on the bay",
    position: "50% 65%",
  },
  {
    id: "cela-vi",
    kind: "Drink",
    name: "Fifty-seven floors up",
    place: "CÉ LA VI, Marina Bay Sands SkyPark",
    neighborhood: "Marina Bay",
    tier: "$$$$",
    tagline: "A sky lounge on the roof of the Sands, with the city laid out below.",
    about: [
      "The SkyPark crowns the three towers of Marina Bay Sands, 57 floors above the bay. The lounge looks out over the city and the harbour beyond.",
      "Book for the golden hour. By the time the light fails you will already have the best view in the room.",
    ],
    dress: "Smart elegant",
    blackTie: false,
    bestTime: "Golden hour, then dark",
    lastSeating: 23,
    lastSeatingLabel: "11:00 pm",
    privacy: 1,
    seating: ["Bar", "Table"],
    image: img("bay-aerial-night"),
    imageAlt: "Marina Bay Sands and its curved rooftop seen from above at night, with the lit city and bay",
    position: "55% 45%",
  },
  {
    id: "raffles-suite",
    kind: "Stay",
    name: "A suite at Raffles",
    place: "Raffles Hotel",
    neighborhood: "Civic District",
    tier: "$$$$",
    tagline: "Colonial grandeur, arcaded verandahs and a butler for the evening.",
    about: [
      "Raffles has stood on Beach Road since the 1880s, a white colonial landmark with teak, arches and verandahs. Its suites are all-suite and traditionally attended.",
      "For a honeymoon or an anniversary, this is the classic: the long corridors, the courtyard, and a late drink downstairs.",
    ],
    dress: "Evening wear",
    blackTie: true,
    bestTime: "Arrive before dusk to see the facade light up",
    lastSeating: 0,
    lastSeatingLabel: "Check in any time",
    privacy: 5,
    seating: ["Private room"],
    image: img("raffles-night"),
    imageAlt: "The white colonial facade of Raffles Hotel lit warmly against a dark blue night sky",
    position: "50% 50%",
  },
  {
    id: "fullerton-suite",
    kind: "Stay",
    name: "A heritage room at The Fullerton",
    place: "The Fullerton Hotel",
    neighborhood: "Raffles Place",
    tier: "$$$",
    tagline: "A neoclassical landmark, once the General Post Office, on the river.",
    about: [
      "Completed in 1928, the building is among the city's best-known neoclassical landmarks. Rooms wrap around a soaring atrium, and the river and Marina Bay are a short walk away.",
      "Ask for a bay-facing room, and walk out after dinner across the nearby Cavenagh Bridge.",
    ],
    dress: "Smart elegant",
    blackTie: false,
    bestTime: "Check in at dusk and walk the waterfront",
    lastSeating: 0,
    lastSeatingLabel: "Check in any time",
    privacy: 4,
    seating: ["Private room"],
    image: img("fullerton-facade"),
    imageAlt: "The colonnaded facade of The Fullerton Hotel lit warmly at night",
    position: "50% 40%",
  },
  {
    id: "artscience",
    kind: "Moments",
    name: "The museum after hours",
    place: "ArtScience Museum, Marina Bay Sands",
    neighborhood: "Marina Bay",
    tier: "$$$$",
    tagline: "A private evening viewing in the lotus-shaped museum on the bay.",
    about: [
      "The lotus-shaped museum sits at the edge of the bay, its petals lit after dark. Your concierge arranges a private evening viewing of whichever exhibitions are showing.",
      "End the night on the waterfront promenade outside, where the Sands and the skyline reflect in still water.",
    ],
    dress: "Evening wear",
    blackTie: true,
    bestTime: "Late evening, with the crowds gone",
    lastSeating: 21,
    lastSeatingLabel: "9:00 pm",
    privacy: 5,
    seating: ["Private room"],
    image: img("artscience-night"),
    imageAlt: "The lotus-shaped ArtScience Museum glowing against the night sky, reflected in the bay",
    position: "45% 55%",
  },
  {
    id: "supertrees",
    kind: "Moments",
    name: "The Supertrees after dark",
    place: "Gardens by the Bay",
    neighborhood: "Marina Gardens",
    tier: "$$$",
    tagline: "A private walk through the Supertree Grove during the evening light show.",
    about: [
      "The Supertree Grove is a vertical garden of steel and living planting that glows after dusk, with a nightly light show set to music.",
      "A quiet guided route lets you reach the elevated walkway before the crowd, and the Cloud Forest dome beside it is lit softly too.",
    ],
    dress: "Smart casual elegant",
    blackTie: false,
    bestTime: "Arrive at dusk, stay for the show",
    lastSeating: 20,
    lastSeatingLabel: "8:00 pm",
    privacy: 3,
    seating: ["Table"],
    image: img("gardens-night"),
    imageAlt: "Aerial view at night of the Gardens by the Bay, with lit domes and glowing Supertrees",
    position: "40% 55%",
  },
  {
    id: "sail",
    kind: "Moments",
    name: "A sunset sail on the bay",
    place: "Marina Bay",
    neighborhood: "Marina Bay",
    tier: "$$$$",
    tagline: "A private charter at golden hour, back as the towers light up.",
    about: [
      "A private boat leaves at golden hour, slides past the Merlion and the Esplanade, and turns for the Sands as the light goes.",
      "Champagne is a given. Ask for a route that ends facing the skyline as the towers come on, one by one.",
    ],
    dress: "Smart elegant",
    blackTie: false,
    bestTime: "Depart an hour before sunset",
    lastSeating: 19,
    lastSeatingLabel: "7:00 pm",
    privacy: 5,
    seating: ["Private room"],
    image: img("skyline-water"),
    imageAlt: "Marina Bay's towers at night, reflected in the dark water of the bay",
    position: "85% 75%",
  },
];

export const byId = (id: string) => EXPERIENCES.find((e) => e.id === id);

export type Sort = "curated" | "latest" | "private";
export const SORTS: { value: Sort; label: string }[] = [
  { value: "curated", label: "Curated" },
  { value: "latest", label: "Latest seating" },
  { value: "private", label: "Most private" },
];

/** Concierge lists hold one request per experience. */
export type Request = {
  id: string;
  date: string;
  dateLabel: string;
  party: number;
  seating: Seating | null;
  note: string;
};
