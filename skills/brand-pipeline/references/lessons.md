# Lessons from the Jetzt Labs run

## Process
- Sketch options **on the /brand page**, not just described in chat. Discuss briefly,
  then draw four candidates in the Exploration section and let them pick by looking.
- When they pick, remove everything else (components, CSS, files). Half-kept explorations rot.
- "Start brand new" means the old UI is not inspiration. Don't carry old colors or logos over.
- Capture is cheap work: give a Codex prompt or run `scripts/capture.mjs`; don't reach for paid tools.

## Next.js dev
- Another session may run `next dev` on :3000 in the same checkout. Two dev servers sharing
  `.next` cause random 404s. Run the redesign preview on another port with its own dist dir:
  `next.config.ts` → `...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {})`,
  launch config env `NEXT_DIST_DIR=.next-redesign`, and gitignore `/.next-*/`.
- Set `devIndicators: false` so screenshots are clean.

## SVG
- Trig-computed coordinates hydrate differently on server and client
  (`6.55513627132909` vs `6.555136271329097`). Round them: `const r2 = n => Math.round(n*100)/100`.
- SMIL can't interpolate CSS variables; give animated fills literal colors.
- A mark with 1–2 unit strokes vanishes at 14–24px. Ship a **micro** variant with fewer, thicker
  strokes and switch at ≤24px (header, favicon, app icon under 40px).
- Construction drawings use a small viewBox, so label `font-size` must be tiny (2–5 user units);
  scope the size by a class on the SVG, not by `viewBox` selectors.
- Mark and wordmark share one unit grid (cap height, stroke width) so lockups align cap to baseline.

## Kit page
- Scale artboards in CSS: `--avail: calc(tan(atan2(100cqw, 1px)) - 2*tan(atan2(var(--pad),1px)))`,
  `--s: min(1, var(--avail)/var(--w))`, stage `transform: scale(var(--s))`. Needs
  `container-type: inline-size` on the column.
- Keep the page light even when the site has dark mode (`color-scheme: light` and
  `body:has(.ak){background:#fff}`).
- Hide crop marks on touch devices and under 760px.
- Small icon sizes look lost in big frames: give each ladder size its own 432×432 frame.

## Verify
- Check mobile at 375 for horizontal overflow (`document.documentElement.scrollWidth`).
- Reset the browser viewport to desktop when done.

## Deploy
- Vercel refuses to publish builds on a Next.js version with a known vulnerability (the build
  succeeds, then "Vulnerable version of Next.js detected"). Before pushing, move to the latest
  patch of the same minor: `npm view next versions` → `npm i -E next@<latest 15.x.y> react@… react-dom@…`.
- Build-time env vars aren't copied from `.env.local`; add server keys (e.g. an AI API key)
  in the host's environment settings, and let the user enter secrets themselves.
