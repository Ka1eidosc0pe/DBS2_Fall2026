const P = "/images/hawker-bright/";

export type BoardPhoto = { file: string; alt: string; label: string; focus?: string };

export const PHOTOS: Record<string, BoardPhoto> = {
  dragon: { file: P + "dragon-2.jpg", alt: "The mosaic dragon playground in front of an HDB block at Toa Payoh, with a rainbow ring slide for a tail", label: "Toa Payoh dragon", focus: "70% 60%" },
  night: { file: P + "laupasat-satay-street.jpg", alt: "Lau Pa Sat's Victorian iron roof lit up at night above long tables of diners on Satay Street", label: "Lau Pa Sat, after dark", focus: "50% 35%" },
  laksa: { file: P + "laksa.jpg", alt: "A bowl of orange laksa with fish cake, tofu puff and spring onion", label: "Laksa" },
  satay: { file: P + "satay-plate.jpg", alt: "Chicken and mutton satay with peanut sauce beside grilled prawns", label: "Satay and prawns", focus: "50% 55%" },
  chicken: { file: P + "chicken-rice.jpg", alt: "Hainanese chicken rice on yellow plates with soup", label: "Chicken rice", focus: "65% 60%" },
  maxwell: { file: P + "maxwell.jpg", alt: "The roof of Maxwell Food Centre under a blue sky with office towers behind", label: "Maxwell Food Centre", focus: "45% 55%" },
  maxwell2: { file: P + "maxwell-2.jpg", alt: "A hawker centre with an orange gabled roof shaded by large trees", label: "Hawker centre in the trees", focus: "50% 45%" },
  oar: { file: P + "oar-sign.jpg", alt: "Old Airport Road Food Centre's red, yellow and blue ramp beside the entrance sign", label: "Old Airport Road", focus: "30% 45%" },
  kaya: { file: P + "kaya-set.jpg", alt: "Kaya toast, soft-boiled eggs and two cups of coffee on a red tray", label: "Kaya toast set" },
  mural: { file: P + "chinatown-mural.jpg", alt: "A painted mural of a letter writer under red lucky banners at Chinatown Complex", label: "Chinatown Complex", focus: "70% 55%" },
  void: { file: P + "void-deck.jpg", alt: "A long void deck with cream pillars and maroon bases", label: "Void deck", focus: "50% 50%" },
  bcm: { file: P + "bak-chor-mee.jpg", alt: "A rooster-pattern bowl of minced pork noodles", label: "Bak chor mee", focus: "50% 55%" },
  tekka: { file: P + "tekka-dining.jpg", alt: "Orange tables and stools in Tekka Centre's dining area", label: "Tekka Centre", focus: "55% 70%" },
};
