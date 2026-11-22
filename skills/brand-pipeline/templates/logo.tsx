/* __BRAND__ logo system. Pure SVG, no hooks. Starter from the brand-pipeline skill:
   every shape here is a PLACEHOLDER. Redraw the wordmark and mark on one unit grid
   (cap 60, stroke 12 is a good start) and keep these exports so /brand keeps working. */

type P = { className?: string; title?: string };

export const CAP = 60;
export const WORDMARK_W = 280;

/** Wordmark glyphs, viewBox WORDMARK_W × 60. PLACEHOLDER: set in type until drawn as rects/polygons. */
export function WordmarkGlyphs({ fill = "currentColor" }: { fill?: string }) {
  return (
    <g fill={fill}>
      {/* Inline style so drawing label styles (.ak-draw text) never override it. */}
      <text x="0" y="60" textLength={WORDMARK_W} lengthAdjust="spacingAndGlyphs" style={{ font: "700 82px var(--font-text, sans-serif)", letterSpacing: 0, textTransform: "none", fill }}>
        __BRAND_UPPER__
      </text>
    </g>
  );
}

export function Wordmark({ className, title = "__BRAND__", height = 24 }: P & { height?: number }) {
  return (
    <svg className={className} height={height} viewBox={`0 0 ${WORDMARK_W} ${CAP}`} role="img" aria-label={title}>
      <WordmarkGlyphs />
    </svg>
  );
}

/* ───────── The mark ───────── */

/** [x, width] bars on the 60-unit grid; the last one takes the accent. PLACEHOLDER geometry. */
export const MARK: [number, number][] = [[0, 12], [24, 12], [48, 12]];
export const MARK_W = 60;
/** Micro (≤ 24px): fewer, thicker strokes so nothing drops below a pixel. */
export const MARK_MICRO: [number, number][] = [[0, 20], [40, 20]];
export const MARK_MICRO_W = 60;

export function MarkBars({ micro = false, fg = "currentColor", accent = "var(--accent)" }: { micro?: boolean; fg?: string; accent?: string }) {
  const bars = micro ? MARK_MICRO : MARK;
  return (
    <g>
      {bars.map(([x, w], i) => <rect key={x} x={x} y="0" width={w} height={CAP} fill={i === bars.length - 1 ? accent : fg} />)}
    </g>
  );
}

/** The mark. `size` is the height; width follows the mark's proportions. */
export function Mark({ className, title = "__BRAND__", size = 60, micro = false, fg = "currentColor", accent = "var(--accent)" }: P & { size?: number; micro?: boolean; fg?: string; accent?: string }) {
  const w = micro ? MARK_MICRO_W : MARK_W;
  return (
    <svg className={className} width={(size * w) / CAP} height={size} viewBox={`0 0 ${w} ${CAP}`} role={title ? "img" : undefined} aria-label={title || undefined} aria-hidden={title ? undefined : true}>
      <MarkBars micro={micro} fg={fg} accent={accent} />
    </svg>
  );
}

/* ───────── App icon ───────── */

export function AppIcon({ className, size = 64, variant = "ink", title = "__BRAND__ app icon" }: P & { size?: number; variant?: "ink" | "accent" | "paper" }) {
  const id = `ai-${variant}-${size}`;
  const micro = size < 40;
  const fg = variant === "paper" ? "#0e0f12" : "#ffffff";
  const accent = variant === "accent" ? "#ffffff" : "var(--accent)";
  const w = micro ? MARK_MICRO_W : MARK_W;
  const s = micro ? 0.56 : 0.5;
  const bg = variant === "accent" ? ["#5b6cff", "#1a2be0"] : variant === "paper" ? ["#ffffff", "#e9ebf1"] : ["#2a2d35", "#0b0c0f"];
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={title}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={bg[0]} /><stop offset="1" stopColor={bg[1]} /></linearGradient>
        <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity={variant === "paper" ? 0 : 0.18} />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14.5" fill={`url(#${id}-bg)`} />
      <rect width="64" height="64" rx="14.5" fill={`url(#${id}-gloss)`} />
      {variant === "paper" && <rect x="0.5" y="0.5" width="63" height="63" rx="14" fill="none" stroke="#d5d9e1" />}
      <g transform={`translate(${(64 - w * s) / 2} ${(64 - CAP * s) / 2}) scale(${s})`}>
        <MarkBars micro={micro} fg={fg} accent={accent} />
      </g>
    </svg>
  );
}

/* ───────── Lockups ───────── */

export function LockupRight({ height = 40, suffix = "" }: { height?: number; suffix?: string }) {
  return (
    <span className="lockup lockup-right" style={{ height, gap: height * 0.36 }}>
      <Mark size={height} title="" />
      <Wordmark height={height} />
      {suffix && <span className="lockup-labs" style={{ fontSize: height * 0.3, marginLeft: height * 0.06 }}>{suffix}</span>}
    </span>
  );
}

export function LockupCenter({ size = 1, suffix = "" }: { size?: number; suffix?: string }) {
  return (
    <span className="lockup lockup-center" style={{ gap: 22 * size }}>
      <Mark size={72 * size} title="" />
      <Wordmark height={44 * size} />
      {suffix && <span className="lockup-labs" style={{ fontSize: 13 * size, letterSpacing: `${0.6 * size}em` }}>{suffix}</span>}
    </span>
  );
}

export function LockupStack({ height = 120 }: { height?: number }) {
  return (
    <span className="lockup lockup-stack" style={{ height }}>
      <Mark size={height * 0.42} title="" />
      <Wordmark height={height * 0.42} />
    </span>
  );
}

export function MicroLockup({ size = 16, label = "__BRAND__" }: { size?: number; label?: string }) {
  return (
    <span className="lockup lockup-micro">
      <Mark size={size} micro title="" />
      <span className="label">{label}</span>
    </span>
  );
}
