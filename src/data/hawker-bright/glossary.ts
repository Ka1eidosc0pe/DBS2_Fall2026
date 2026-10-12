export type Term = { term: string; say: string; meaning: string; example: string; tone: string };

export const GLOSSARY: Term[] = [
  { term: "Chope", say: "chope", meaning: "To reserve a seat by leaving something on it, usually a packet of tissues.", example: "Chope a table first, then queue for your food.", tone: "var(--hdb-butter)" },
  { term: "Makan", say: "ma-kan", meaning: "To eat. Also the best noun for a good meal.", example: "Makan time! Where shall we go?", tone: "var(--hdb-peach)" },
  { term: "Shiok", say: "shee-ok", meaning: "Deeply satisfying. The feeling after the first spoon of good laksa.", example: "That teh tarik was so shiok.", tone: "var(--hdb-mint)" },
  { term: "Tapao", say: "ta-pow", meaning: "Takeaway. Often in a plastic bag, sometimes with a rubber band.", example: "Can tapao one chicken rice?", tone: "var(--hdb-sky)" },
  { term: "Siew dai", say: "siu dye", meaning: "Less sugar. Used when ordering kopi or teh.", example: "Kopi-o siew dai, please.", tone: "var(--hdb-lilac)" },
  { term: "Kopi-O kosong", say: "ko-pee oh ko-song", meaning: "Black coffee with no sugar and no milk.", example: "One kopi-o kosong, thanks.", tone: "var(--hdb-butter)" },
];

export const KOPI_LINGO: { order: string; gets: string }[] = [
  { order: "Kopi", gets: "Coffee with condensed milk and sugar" },
  { order: "Kopi-C", gets: "Coffee with evaporated milk and sugar" },
  { order: "Kopi-O", gets: "Black coffee with sugar" },
  { order: "Kopi Peng", gets: "Iced kopi, with milk" },
  { order: "Teh", gets: "Tea with condensed milk" },
  { order: "Teh Tarik", gets: "Teh, pulled between two jugs until frothy" },
];
