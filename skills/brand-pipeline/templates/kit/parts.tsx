/* Server-safe building blocks for the case-study page. */

import { Crops } from "./kit";

export type Tone = "white" | "ink" | "accent" | "tint";

/** One deliverable: an artboard of w × h px (multiples of the 72px unit) and a 72px caption row. */
export function F({ w, h, cap, tone = "white", children }: { w: number; h: number; cap: React.ReactNode; tone?: Tone; children: React.ReactNode }) {
  return (
    <figure className="ak-frame ak-hover" style={{ "--w": w, "--h": h } as React.CSSProperties}>
      <Crops />
      <div className={`ak-img tone-${tone}`}>
        <div className="ak-stage" style={{ width: w, height: h }}>{children}</div>
      </div>
      <figcaption className="ak-cap"><span>{cap}</span></figcaption>
    </figure>
  );
}

/** "Section I: Title" with a slate subtitle, 576 × 144. */
export function Section({ n, title, sub }: { n: string; title: string; sub: string }) {
  return (
    <div className="ak-sect">
      <h2>Section {n}: {title}</h2>
      <p>{sub}</p>
    </div>
  );
}

export type Swatch = { name: string; hex: string; value?: string; note?: string; dark?: boolean };

/** Large primary swatches: chip, name, hex, note. */
export function SwatchesPrimary({ colors }: { colors: Swatch[] }) {
  return (
    <span className="ak-row" style={{ gap: 48, alignItems: "flex-start" }}>
      {colors.map((c) => (
        <span key={c.name} className="ak-swatch">
          <span className="chip" style={{ background: c.value ?? c.hex }} />
          <span className="ak-l">{c.name}</span>
          <span className="ak-l m">{c.hex}</span>
          {c.note && <span className="ak-l m">{c.note}</span>}
        </span>
      ))}
    </span>
  );
}

/** A strip of small swatches (neutrals). */
export function SwatchStrip({ colors }: { colors: Swatch[] }) {
  return (
    <span className="ak-row" style={{ gap: 0 }}>
      {colors.map((c) => (
        <span key={c.name} className="ak-swatch sm">
          <span className="chip" style={{ background: c.value ?? c.hex }} />
          <span className="ak-l">{c.name}</span>
          <span className="ak-l m">{c.hex}</span>
        </span>
      ))}
    </span>
  );
}

/** A stepped scale (data colors). Set `dark` on steps that need white text. */
export function Steps({ colors }: { colors: Swatch[] }) {
  return (
    <span className="ak-row" style={{ gap: 0 }}>
      {colors.map((c) => <span key={c.name} className="ak-step" style={{ background: c.hex, color: c.dark ? "#fff" : "var(--ink)" }}>{c.name}</span>)}
    </span>
  );
}

/** Square grid lines for construction drawings, in drawing units. */
export function ConstructionGrid({ cols, rows, step, pad = 8 }: { cols: number; rows: number; step: number; pad?: number }) {
  return (
    <>
      {Array.from({ length: cols + 1 }, (_, i) => <line key={`v${i}`} className="g" x1={i * step} y1={-pad} x2={i * step} y2={rows * step + pad} />)}
      {Array.from({ length: rows + 1 }, (_, i) => <line key={`h${i}`} className="g" x1={-pad} y1={i * step} x2={cols * step + pad} y2={i * step} />)}
    </>
  );
}

export type Option = { id: "A" | "B" | "C" | "D"; name: string; note?: string; render: (size: number) => React.ReactNode };

/** Section 0 board: four options side by side at a large size, 32px and 16px. Delete after the pick. */
export function Exploration({ options, large = 160 }: { options: Option[]; large?: number }) {
  return (
    <span className="ak-explore">
      {options.map((o) => (
        <span key={o.id} className="ak-explore-cell">
          <span className="ak-l">{o.id} · {o.name}</span>
          <span className="ak-explore-big" style={{ height: large * 1.4 }}>{o.render(large)}</span>
          <span className="ak-row ak-bottom" style={{ gap: 20 }}>{o.render(32)}{o.render(16)}</span>
          {o.note && <span className="ak-l m">{o.note}</span>}
        </span>
      ))}
    </span>
  );
}
