# {Brand} brand system ("{concept name}")

Built {Month YYYY}, informed by the taste KB(s) {list}, not by the old site.
The live kit is at `/brand` (src/app/brand). Logo code: `src/components/logo.tsx`.

## Idea
*{Name}* means {meaning}. One idea runs everything: **{one sentence}**.
- Grid rule: {e.g. 1440px = 1440 minutes, 24 columns of 60px}.
- The accent (`--accent`) means {one thing} and nothing else.

## Logo
The mark is **{mark name}**: {what it depicts and why}. Chosen over {rejected options} on {date}.

| Asset | Component | Notes |
|---|---|---|
| Wordmark | `Wordmark` / `WordmarkGlyphs` | {letterforms, unit grid, cap, stroke, viewBox} |
| Mark | `Mark` / `MarkBars` | {construction, proportions, which part takes the accent} |
| Micro | `Mark micro` | {simplified version, used at ≤24px} |
| Live | `MarkLive` | {motion, duration; SMIL, no JS} |
| Lockups | `LockupRight`, `LockupCenter`, `LockupStack`, `MicroLockup` | {alignment rule} |
| App icon | `AppIcon` | Squircle rx 14.5/64; variants ink, accent, paper. Favicon `src/app/icon.svg`. |

Rules: {what never changes: accent placement, proportions, where motion is allowed}.

## Color
Chrome: Paper {hex}, Ink {hex}, Ink 2 {hex}, Rule {hex}, Rule strong {hex}, Tint {hex}.
Accent {hex} (P3 {value}; dark {hex}).
Data only: {neg} ↔ {pos}, each with `-soft`.

## Type
- {Reading face}: body {size/lh}, lead {…}, display {…}.
- {Mono face} for everything that isn't prose, in one label style: {size/lh, case, tracking}.

## Layout and components
- {grid classes, spans, breakpoints}
- {buttons, tabs, sections}
- Motion: {duration, easing}; reduced motion respected.

## Presentation
`/brand` is an AREA-style case study (see the brand-pipeline skill): 3-slot header, drafting grid,
meta block, artboards in 72px units with caption rows and crop marks, grid view, always light.
