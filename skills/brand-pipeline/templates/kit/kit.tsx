"use client";

/* AREA-style case-study shell: fixed 3-slot header, drafting grid, meta block, list/grid toggle.
   Brand-agnostic: pass the wordmark in. Scaffolded by the brand-pipeline skill. */

import Link from "next/link";
import { useState } from "react";

/** List glyph (three rules) cross-fades to a 3×3 contact sheet in grid view. */
function ViewGlyph({ grid }: { grid: boolean }) {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
      <g className={`ak-glyph${grid ? "" : " is-on"}`}>
        {[18, 36, 54].map((y) => <line key={y} x1="10" y1={y} x2="62" y2={y} strokeWidth="2" />)}
      </g>
      <g className={`ak-glyph${grid ? " is-on" : ""}`}>
        {[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={6 + c * 22} y={6 + r * 22} width="16" height="16" />))}
      </g>
    </svg>
  );
}

function Folder() {
  return (
    <svg width="72" height="66" viewBox="0 0 72 66" aria-hidden="true">
      <path d="M1 9.5A6.5 6.5 0 0 1 7.5 3H24l6 6.5h34.5A6.5 6.5 0 0 1 71 16v42.5a6.5 6.5 0 0 1-6.5 6.5h-57A6.5 6.5 0 0 1 1 58.5Z M1 16h70" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function Crops({ meta }: { meta?: boolean }) {
  return (
    <>
      <span className="ak-crop tl" aria-hidden="true" />
      <span className="ak-crop tr" aria-hidden="true" />
      <span className={`ak-crop bl${meta ? " out" : ""}`} aria-hidden="true" />
      <span className={`ak-crop br${meta ? " out" : ""}`} aria-hidden="true" />
    </>
  );
}

type KitProps = {
  name: string;
  discipline: string;
  date: string;
  blurb: React.ReactNode;
  /** The brand's wordmark, ~26px tall, for the center header slot. */
  wordmark: React.ReactNode;
  /** Footer owner line, e.g. "© 2026 Acme". */
  footer: string;
  home?: string;
  homeLabel?: string;
  children: React.ReactNode;
};

export function Kit({ name, discipline, date, blurb, wordmark, footer, home = "/", homeLabel = "Index", children }: KitProps) {
  const [grid, setGrid] = useState(false);
  const [info, setInfo] = useState(false);
  return (
    <div className="ak">
      <header className="ak-hdr">
        <Link href={home} className="ak-slot" aria-label={homeLabel}><Folder /></Link>
        <span className="ak-word">{wordmark}</span>
        <button className="ak-slot" onClick={() => setGrid(!grid)} aria-label={grid ? "Switch to list view" : "Switch to grid view"} aria-pressed={grid}>
          <ViewGlyph grid={grid} />
        </button>
      </header>

      <main className="ak-col" id="main">
        <div className="ak-gridbg" aria-hidden="true" />
        <div className={`ak-list${grid ? " is-grid" : ""}`}>
          <section className="ak-meta ak-hover">
            <Crops meta />
            <div className="ak-meta-top">
              <h1>{name}</h1>
              <p>{discipline}</p>
              <p>{date}</p>
            </div>
            <button className="ak-more" aria-expanded={info} aria-controls="ak-blurb" onClick={() => setInfo(!info)}>
              <i className={info ? "is-open" : ""} aria-hidden="true" />
              Additional information
            </button>
          </section>
          {info && <div className="ak-blurb" id="ak-blurb">{blurb}</div>}
          {children}
        </div>
        <footer className="ak-foot">{footer}</footer>
      </main>
    </div>
  );
}
