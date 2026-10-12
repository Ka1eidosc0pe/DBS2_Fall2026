import { useId } from "react";

/* Peranakan tile + grille + batik, drawn in code.
   The tile is a 120×120 four-fold tile: four rose petals on a pale teal lozenge, diagonal buds,
   and quarter-flowers at every corner that complete themselves across neighbouring tiles. */

export const TILE = {
  cream: "#FFFDF8",
  rose: "#E8837A",
  roseDeep: "#C95B55",
  blush: "#F3C4BC",
  teal: "#3A9CA6",
  jade: "#2E6E5E",
  jadeDeep: "#1F5F52",
  turmeric: "#D9A23B",
  indigo: "#2B3A67",
  mist: "#DDEEEB",
} as const;

const T = TILE;
const rot = (angles: number[], cx: number, cy: number, children: React.ReactNode) =>
  angles.map((a) => (
    <g key={a} transform={`rotate(${a} ${cx} ${cy})`}>
      {children}
    </g>
  ));

function Petal() {
  return (
    <>
      <path d="M60 60 C47 49 44 29 60 10 C76 29 73 49 60 60Z" fill={T.rose} />
      <path d="M60 52 C52 45 51 33 60 21 C69 33 68 45 60 52Z" fill={T.blush} />
      <path d="M60 46 C57 42 57 36 60 31 C63 36 63 42 60 46Z" fill={T.roseDeep} />
      <circle cx="60" cy="14.5" r="2" fill={T.cream} />
    </>
  );
}

function Bud() {
  return (
    <g transform="rotate(45 60 60)">
      <path d="M60 62 C51 54 50 40 60 28 C70 40 69 54 60 62Z" fill={T.teal} />
      <path d="M60 57 C55 52 55 44 60 37 C65 44 65 52 60 57Z" fill={T.jade} />
      <path d="M60 52 L60 42" stroke={T.cream} strokeWidth="1" strokeLinecap="round" />
      <circle cx="60" cy="23" r="1.8" fill={T.turmeric} />
    </g>
  );
}

function CornerFlower() {
  return (
    <g>
      <circle r="20" fill={T.indigo} />
      {[0, 90, 180, 270].map((a) => (
        <path key={a} transform={`rotate(${a})`} d="M0 0 C-7 -6 -8 -16 0 -26 C8 -16 7 -6 0 0Z" fill={T.turmeric} />
      ))}
      {[45, 135, 225, 315].map((a) => (
        <path key={a} transform={`rotate(${a})`} d="M0 0 C-5 -5 -5 -12 0 -19 C5 -12 5 -5 0 0Z" fill={T.teal} />
      ))}
      <circle r="5" fill={T.cream} />
      <circle r="2.4" fill={T.rose} />
    </g>
  );
}

/** The tile artwork itself, in a 120×120 coordinate space. */
export function TileArt() {
  return (
    <>
      <rect width="120" height="120" fill={T.cream} />
      <rect x="3.5" y="3.5" width="113" height="113" fill="none" stroke={T.jade} strokeWidth="1" />
      <path d="M60 0 L120 60 L60 120 L0 60Z" fill={T.mist} />
      <path d="M60 8 L112 60 L60 112 L8 60Z" fill="none" stroke={T.teal} strokeWidth="0.8" strokeDasharray="1 3" strokeLinecap="round" />
      {rot([0, 90, 180, 270], 60, 60, <Bud />)}
      {rot([0, 90, 180, 270], 60, 60, <Petal />)}
      <circle cx="60" cy="60" r="9" fill={T.cream} stroke={T.turmeric} strokeWidth="2" />
      <circle cx="60" cy="60" r="4.2" fill={T.jadeDeep} />
      <circle cx="60" cy="60" r="1.6" fill={T.turmeric} />
      {[[0, 0], [120, 0], [0, 120], [120, 120]].map(([x, y]) => (
        <g key={`${x}${y}`} transform={`translate(${x} ${y})`}>
          <CornerFlower />
        </g>
      ))}
      {[[60, 0], [120, 60], [60, 120], [0, 60]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="5" fill={T.jade} />
          <circle cx={x} cy={y} r="2" fill={T.cream} />
        </g>
      ))}
    </>
  );
}

/** One tile, as a standalone mark. */
export function TileMotif({ size = 96, className = "", title }: { size?: number; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <TileArt />
    </svg>
  );
}

const clean = (s: string) => s.replace(/[^a-zA-Z0-9]/g, "");

/** The tile, repeated to fill its box. `tile` is the rendered size of one tile in px. */
export function TilePattern({
  tile = 96,
  className = "",
  style,
}: {
  tile?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const id = "tp" + clean(useId());
  return (
    <svg aria-hidden className={className} style={style} width="100%" height="100%" preserveAspectRatio="none">
      <defs>
        <pattern id={id} width={tile} height={tile} patternUnits="userSpaceOnUse" viewBox="0 0 120 120">
          <TileArt />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** A horizontal band of tiles with a jade rule above and below. Height is one tile. */
export function TileBand({ height = 56, className = "", rules = true }: { height?: number; className?: string; rules?: boolean }) {
  return (
    <div
      aria-hidden
      className={`relative w-full ${className}`}
      style={{ height: height + (rules ? 8 : 0) }}
    >
      {rules && (
        <>
          <span className="absolute inset-x-0 top-0 h-px bg-brand" />
          <span className="absolute inset-x-0 top-[3px] h-px bg-brand/40" />
          <span className="absolute inset-x-0 bottom-0 h-px bg-brand" />
          <span className="absolute inset-x-0 bottom-[3px] h-px bg-brand/40" />
        </>
      )}
      <div className="absolute inset-x-0" style={{ top: rules ? 4 : 0, height }}>
        <TilePattern tile={height} />
      </div>
    </div>
  );
}

/** Four-petal tile icon, the style's bullet. Inherits colour. */
export function TileBullet({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="-10 -10 20 20" width={size} height={size} aria-hidden className={className} fill="currentColor">
      {[0, 90, 180, 270].map((a) => (
        <path key={a} transform={`rotate(${a})`} d="M0 -1 C-4 -3 -4 -7 0 -9.5 C4 -7 4 -3 0 -1Z" />
      ))}
      <circle r="1.7" fill="var(--surface)" />
    </svg>
  );
}

/** Ventilation-grille lattice: interlaced octagon and lozenge lines, drawn in currentColor. */
export function GrillePattern({
  tile = 40,
  className = "",
  strokeWidth = 1.25,
}: {
  tile?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const id = "gp" + clean(useId());
  return (
    <svg aria-hidden className={className} width="100%" height="100%" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
      <defs>
        <pattern id={id} width={tile} height={tile} patternUnits="userSpaceOnUse" viewBox="0 0 40 40">
          {/* octagon */}
          <path d="M13 0H27L40 13V27L27 40H13L0 27V13Z" transform="translate(0 0) scale(1)" opacity="0" />
          <circle cx="20" cy="20" r="14" />
          <circle cx="20" cy="20" r="6" />
          <path d="M20 6V34M6 20H34" />
          <path d="M0 0L6 6M40 0L34 6M0 40L6 34M40 40L34 34" />
          <circle cx="0" cy="0" r="6" />
          <circle cx="40" cy="0" r="6" />
          <circle cx="0" cy="40" r="6" />
          <circle cx="40" cy="40" r="6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} stroke="none" />
    </svg>
  );
}

/** Batik kawung: four overlapping ellipses around a seed, the classic quatrefoil. */
export function BatikPattern({ tile = 44, className = "", strokeWidth = 1.2 }: { tile?: number; className?: string; strokeWidth?: number }) {
  const id = "bp" + clean(useId());
  return (
    <svg aria-hidden className={className} width="100%" height="100%" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
      <defs>
        <pattern id={id} width={tile} height={tile} patternUnits="userSpaceOnUse" viewBox="0 0 44 44">
          <g transform="translate(22 22)">
            {[0, 90].map((a) => (
              <ellipse key={a} rx="19" ry="8" transform={`rotate(${a})`} />
            ))}
            {[45, 135].map((a) => (
              <ellipse key={a} rx="19" ry="8" transform={`rotate(${a})`} opacity="0.55" />
            ))}
            <circle r="2.2" fill="currentColor" stroke="none" />
          </g>
          <circle cx="0" cy="0" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="44" cy="0" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="0" cy="44" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="44" cy="44" r="1.6" fill="currentColor" stroke="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} stroke="none" />
    </svg>
  );
}
