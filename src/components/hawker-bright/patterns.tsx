import type { CSSProperties } from "react";

/** Deterministic pseudo-random so SSR and client agree. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function formicaUri(base: string, dots: string[]) {
  const r = rng(7);
  let body = `<rect width='160' height='160' fill='${base}'/>`;
  for (let i = 0; i < 70; i++) {
    const x = (r() * 160).toFixed(1);
    const y = (r() * 160).toFixed(1);
    const rad = (0.6 + r() * 1.7).toFixed(1);
    const c = dots[Math.floor(r() * dots.length)];
    body += `<circle cx='${x}' cy='${y}' r='${rad}' fill='${c}' opacity='${(0.45 + r() * 0.5).toFixed(2)}'/>`;
  }
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>${body}</svg>`)}")`;
}

/** Formica table-top speckle: cream laminate flecked with brown, green and peach. */
export const formica: CSSProperties = {
  backgroundColor: "#f3e9d7",
  backgroundImage: formicaUri("#f3e9d7", ["#6b5646", "#2f7d4f", "#e2a98a", "#b9a68c", "#ffffff"]),
  backgroundSize: "160px 160px",
};

export const formicaMint: CSSProperties = {
  backgroundColor: "#bfe3d0",
  backgroundImage: formicaUri("#bfe3d0", ["#2f7d4f", "#ffffff", "#6b5646", "#8cc7a9"]),
  backgroundSize: "160px 160px",
};

function mosaicUri() {
  const pal = ["#bfe3d0", "#f7c9a9", "#bfd9ee", "#f6e3a1", "#d9ccec", "#ffffff"];
  const r = rng(21);
  const n = 8;
  const cell = 14;
  let body = `<rect width='${n * cell}' height='${n * cell}' fill='#e2d4bd'/>`;
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      // diamond-ish arrangement: tint by checker, jitter the rest
      const k = (x + y) % 2 === 0 ? [0, 2][Math.floor(r() * 2)] : [1, 3, 4][Math.floor(r() * 3)];
      body += `<rect x='${x * cell + 1}' y='${y * cell + 1}' width='${cell - 2}' height='${cell - 2}' rx='1.5' fill='${pal[k]}'/>`;
    }
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${n * cell}' height='${n * cell}'>${body}</svg>`)}")`;
}

/** Kopitiam / void-deck mosaic floor tile. */
export const mosaic: CSSProperties = {
  backgroundImage: mosaicUri(),
  backgroundSize: "112px 112px",
};

/** Plain 2-colour checker tile, like the black-and-white kopitiam floor. */
export const checker = (a = "#2b1d14", b = "#fbf5ea", size = 20): CSSProperties => ({
  backgroundColor: b,
  backgroundImage: `conic-gradient(${a} 25%, ${b} 0 50%, ${a} 0 75%, ${b} 0)`,
  backgroundSize: `${size}px ${size}px`,
});

/** Tissue-packet "chope" sticker: a packet left on the table means this seat is taken. */
export function ChopeSticker({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 140 110" className={className} style={style} role="img" aria-label="Tissue packet left on a table to chope a seat">
      <g strokeLinejoin="round" strokeLinecap="round">
        <path d="M14 30 L120 14 Q132 12 132 24 L128 86 Q128 98 116 98 L22 100 Q10 100 10 88 Z" fill="#fff" stroke="#2b1d14" strokeWidth="4" />
        <path d="M14 30 L120 14" stroke="#2b1d14" strokeWidth="0" />
        <path d="M22 38 L118 24" stroke="#f26b2a" strokeWidth="0" />
        <rect x="26" y="40" width="82" height="36" rx="8" fill="#bfe3d0" stroke="#2b1d14" strokeWidth="3.5" transform="rotate(-4 67 58)" />
        <text x="67" y="66" textAnchor="middle" fontFamily="var(--font-hawker-display)" fontWeight="900" fontSize="25" fill="#2b1d14" transform="rotate(-4 67 58)" style={{ fontStretch: "62%", fontVariationSettings: '"wdth" 62' }}>
          CHOPE!
        </text>
        <path d="M118 16 L124 28 M124 22 L116 30" stroke="#2b1d14" strokeWidth="3" fill="none" />
        <path d="M28 92 q6 -6 12 0 t12 0 t12 0 t12 0 t12 0" stroke="#2b1d14" strokeWidth="3" fill="none" opacity="0.4" />
      </g>
    </svg>
  );
}

/** Starburst "SHIOK!" sticker. */
export function Burst({ children, className, fill = "#f6e3a1" }: { children: React.ReactNode; className?: string; fill?: string }) {
  const pts = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    const rr = i % 2 === 0 ? 48 : 40;
    return `${50 + Math.cos(a) * rr},${50 + Math.sin(a) * rr}`;
  }).join(" ");
  return (
    <div className={className} style={{ position: "relative", aspectRatio: "1" }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <polygon points={pts} fill={fill} stroke="#2b1d14" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  );
}
