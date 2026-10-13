import { useId } from "react";
import { cx } from "./cx";

/** Art Deco scallop-fan lattice drawn in hairline strokes. Sits behind content; decorative. */
export function FanPattern({ className, size = 48 }: { className?: string; size?: number }) {
  const id = useId();
  const w = size;
  const h = size / 2;
  const radii = [0.125, 0.25, 0.375, 0.5].map((r) => r * w);
  const fan = (cx0: number, cy0: number) =>
    radii.map((r) => `M${cx0 - r} ${cy0} A${r} ${r} 0 0 1 ${cx0 + r} ${cy0}`).join(" ");
  return (
    <svg aria-hidden className={cx("pointer-events-none absolute inset-0 h-full w-full", className)}>
      <defs>
        <pattern id={id} width={w} height={h * 2} patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.75">
            <path d={fan(w / 2, h * 2)} />
            <path d={fan(0, h)} />
            <path d={fan(w, h)} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/** A hairline sunburst: rays and two arcs. The hero ornament. */
export function Sunburst({ className, rays = 36 }: { className?: string; rays?: number }) {
  const lines = Array.from({ length: rays + 1 }, (_, i) => {
    const a = Math.PI + (i / rays) * Math.PI;
    return { x: 200 + Math.cos(a) * 196, y: 200 + Math.sin(a) * 196, long: i % 3 === 0 };
  });
  return (
    <svg aria-hidden viewBox="0 0 400 204" className={cx("pointer-events-none", className)} fill="none" stroke="currentColor" strokeWidth="0.75">
      {lines.map((l, i) => (
        <line key={i} x1={r2(200 + (l.x - 200) * (l.long ? 0.16 : 0.34))} y1={r2(200 + (l.y - 200) * (l.long ? 0.16 : 0.34))} x2={r2(l.x)} y2={r2(l.y)} />
      ))}
      <path d="M4 200 A196 196 0 0 1 396 200" />
      <path d="M44 200 A156 156 0 0 1 356 200" />
      <path d="M150 200 A50 50 0 0 1 250 200" />
      <line x1="0" y1="200.5" x2="400" y2="200.5" />
    </svg>
  );
}

export function DoubleRule({ className }: { className?: string }) {
  return <div role="presentation" className={cx("mn-double-rule", className)} />;
}

/** Thin stepped Art Deco corner brackets for featured cards. */
export function CornerBrackets({ className, inset = 10, tone = "bg-ink/55" }: { className?: string; inset?: number; tone?: string }) {
  const corner = (pos: string, rot: string) => (
    <span
      aria-hidden
      className={cx("pointer-events-none absolute h-5 w-5", pos)}
      style={{ transform: rot, margin: inset }}
    >
      <span className={cx("absolute top-0 left-0 h-px w-5", tone)} />
      <span className={cx("absolute top-0 left-0 h-5 w-px", tone)} />
      <span className={cx("absolute top-[5px] left-[5px] h-px w-2.5", tone)} />
      <span className={cx("absolute top-[5px] left-[5px] h-2.5 w-px", tone)} />
    </span>
  );
  return (
    <div aria-hidden className={cx("pointer-events-none absolute inset-0", className)}>
      {corner("top-0 left-0", "none")}
      {corner("top-0 right-0", "scaleX(-1)")}
      {corner("bottom-0 left-0", "scaleY(-1)")}
      {corner("bottom-0 right-0", "scale(-1,-1)")}
    </div>
  );
}

/** A Peranakan-meets-Deco grille: diamond lattice with a small lozenge at every crossing. */
export function Lattice({ className, size = 36 }: { className?: string; size?: number }) {
  const id = useId();
  const h = size / 2;
  return (
    <svg aria-hidden className={cx("pointer-events-none absolute inset-0 h-full w-full", className)}>
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.75">
            <path d={`M0 ${h} L${h} 0 L${size} ${h} L${h} ${size} Z`} />
            <path d={`M${h * 0.5} ${h} L${h} ${h * 0.5} L${h * 1.5} ${h} L${h} ${h * 1.5} Z`} />
            <circle cx="0" cy="0" r="1.6" />
            <circle cx={size} cy="0" r="1.6" />
            <circle cx="0" cy={size} r="1.6" />
            <circle cx={size} cy={size} r="1.6" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
