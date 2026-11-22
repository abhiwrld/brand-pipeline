# AREA Technology — taste & design-language knowledge base

Source: https://www.area.tech (captured 2026-11-20). Raw captures, assets and videos live in
`design-ref/area/` in the project where it was captured. Ready-to-use tokens: [`area-tokens.css`](area-tokens.css).

> **AREA in one line:** a quiet, engineered, desktop-OS vitrine (monochrome, one type size, a visible
> 72px drafting grid) that steps back so loud, chrome-and-P3-color symbol work can carry all the energy.

Studio: "Design studio for advanced visual technology" — John Palmer, Timothy Luke. Work: OpenAI,
PartyDAO, Uniswap, Sky, TBPN (client), XVG and Shields (own products). ~7 projects total: small,
curated, no filler.

---

## 1. Taste principles (the "why")

1. **The website is an operating system, not a webpage.** Work is filed in colored *folders*;
   "Information" is an ⓘ icon; hover shows a dock-style ▲ caret; the header is a menu bar of 72px
   icon buttons. Interface nostalgia (Mac OS X Aqua, Y2K chrome, broadcast TV) is redrawn with
   modern precision, never pastiche.
2. **The frame is neutral; the work is loud.** UI chrome is white, black, ink (#262A2C) and slate
   (#8696A4 / #A1B3C3). Saturated color appears *only* in project folders and in the artifacts.
3. **One type size for everything.** 11px, weight 500, uppercase, +0.025em tracking, system UI sans.
   Hierarchy comes from position, spacing, rules and grouping, never from scale. The only exception
   is the hidden project blurb (14/20, sentence case). The display "type" is the custom wordmark.
4. **A strict modular grid, shown openly.** Everything snaps to a 72px unit (1440 = 20u). The grid is
   rendered as a faint drafting-table background (rounded cells, center ticks). It reads as
   engineering: a spec sheet or cutting mat.
5. **Present work as a specification, not a story.** No hero copy, no "challenge / solution".
   A case study is: name / discipline / date, then deliverables, one per frame, each with a technical
   caption ("Icon 16x16@1x", "UGP Lockup Stack Right", "Labs MicroLockup"). Two sentences of context
   sit behind a ⊕ toggle. The work is trusted to speak.
6. **Symbol-first identity systems.** Each project starts from one geometric or mythic idea (the
   oculus circle, the heraldic unicorn, the shield, the ringed sphere). That idea is then exploded into
   a full system: primary, micro, lockups (center/right/stacked), app icons at every size, coins, 3D
   renders, merch, characters, posters.
7. **Old visual languages, new materials.** Heraldry (Uniswap, Shields), classical architecture
   (Pantheon oculus → OpenAI), cartoon mascots (PartyDAO "Kazoo"), sports-broadcast graphics (TBPN),
   macOS app icons (Sky). All rendered in chrome, liquid metal, glass and wide-gamut gradients.
8. **High-fidelity materiality.** Chrome bevels, specular highlights, glossy spheres, fur (the tennis
   ball), aurora skies, and display-P3 colors (`oklch(... 0.35 ...)`). "Advanced visual technology"
   means rendering craft, not flat vector minimalism.
9. **Wit, deadpan.** "AREA 1000" fuzzy tennis ball on the homepage, "Diet TBPN" soda can, a
   PartyDAO mascot holding a mug of himself. Humor lives in the objects; the UI never jokes.
10. **Interaction restraint.** Hover = opacity reveal only (▲ caret, crop marks, darker hairline).
    150ms linear transitions. Route changes are instant (no page-transition theatrics). The only
    "big" motion is the homepage intro render fading out.
11. **Systematic naming as content.** Captions read like a catalog or blazon ("Two Fleury Hinges
    Issuant from Dexter on Pink Perfect"). Naming is part of the design deliverable.

---

## 2. Tokens (measured)

### Color — UI chrome
| Token | Value | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | page, artifact frames |
| `--text` | `#000000` | labels, captions, rules |
| `--ink` | `#262A2C` | wordmark (inner pages), footer, outline icons |
| `--slate` | `#8696A4` | secondary text (home tagline) |
| `--slate-mark` | `#A1B3C3` | home wordmark, home desktop icons |
| `--grid` | `rgb(229 231 235)` (gray-200) | background drafting grid |
| `--hairline` | gray-300 `oklch(87.2% .01 258)` → black on hover | caption connector lines |
| accent (header icon) | cyan ~`#29B6F6` | the radial "grid view" glyph only |

### Color — project folders (vertical gradient top→bottom, P3-first with sRGB fallback)
| Project | sRGB | P3 / OKLCH |
|---|---|---|
| OpenAI | `#0BA7FF → #8FD7FF` | `oklch(65% .25 230) → oklch(85% .15 230)` |
| PartyDAO | `#262A2C → #7E8B92` | `oklch(20% .03 250) → oklch(60% .05 250)` |
| Uniswap | `#C7005F → #FF288F` | `oklch(50% .35 0) → oklch(70% .35 0)` |
| Sky | `#8799B1 → #E6EDF5` | `oklch(68% .06 240) → oklch(94% .03 240)` |
| XVG | `#A10003 → #FF2528` | `oklch(45% .35 25) → oklch(65% .35 25)` |
| Shields | `#DF3400 → #FF8A00` | `oklch(60% .3 45) → oklch(80% .3 70)` |
| TBPN | `#00503A → #009C62` | `color(display-p3 .004 .306 .231) → (0 .6 .4)` |

The folder is two paths: a back "tab" layer and a front body. The front body runs the gradient in reverse, which gives a lit-plastic look. The client logo sits in white at 40–80% width, nudged down 14%.

### Typography
- Family: `ui-sans-serif, system-ui, sans-serif` (SF Pro on Mac). **No webfonts loaded.**
- Label (everything): `11px / 15px`, `500`, `uppercase`, `letter-spacing: 0.025em` (0.275px).
- Blurb (inside "Additional information"): `14px / 20px`, `400`, sentence case, max-width 576px (8u), centered.
- Wordmark: custom extended heavy grotesk SVG, viewBox `720×72` (10u × 1u). Full-bleed on home in
  `#A1B3C3`; 240px wide centered in the header elsewhere in `#262A2C`.

### Space & grid
- `--unit: 72px`; half-unit 36px; `--grid-spacer: 12px` (rounded-cell corner radius); container 1440px (20u), `max-width: 100vw`.
- Header: fixed, transparent (content scrolls under it), 72px tall, `my-4`. Three 72×72 slots: folder (back to projects) · wordmark · view toggle.
- Main content starts at `pt-24` (96px).
- Artifact frame: default **1008×720** (14u×10u), then a **72px** caption row below it. The metadata block is **576×144** (8u×2u): 72px of meta, a 1px black rule, then 71px for the toggle.
- Frames are white and use `box-shadow: 0 0 0 6px #fff`, which knocks the grid out around the work.

### Motion
- Grid variables: `transition: --grid-spacer 150ms linear` (registered custom properties animate).
- Unit change: `--unit 0.3s ease`.
- Default: `150ms cubic-bezier(.4,0,.2,1)`.
- Header glyph: SVG `<animate dur="0.15s">` path morph between the list and grid icons.
- Hover reveals are a pure `opacity 0 → 1`. There's no translate, no scale and no spring.

---

## 3. Components / patterns

**Home (`/`)** — The AREA wordmark spans the full width at the top in slate. A 3D render ("AREA 1000" fuzzy tennis ball) plays as a centered intro, then fades. Bottom-left: tagline in slate. Bottom-right: desktop icons (slate folder "PROJECTS", ⓘ "INFORMATION"). It's essentially a desktop wallpaper with two icons.

**Projects (`/projects`)** — The wordmark sits centered in the header. One row of 7 folders (100–120px wide, `padding-top: 89%` aspect), each labeled with the 11px name underneath and a ▲ caret (5px wide, 8px tall, black) that appears on hover. Everything is vertically centered with large empty space around it. Footer: "©2025 AREA TECHNOLOGY", centered. The logos fade in after the folders paint.

**Case-study header** — Folder outline icon (back) · ink wordmark · cyan radial glyph button (aria "Switch to grid view"). All three are 72×72.

**Meta block** — Centered lines: NAME / DISCIPLINE / DATE (plus an optional external link, e.g. "shields.build", "xvg.area.tech"). Then a full-width 1px black rule, then "⊕ ADDITIONAL INFORMATION". The ⊕ is a 12px black circle with a white 6px plus; when open it becomes ⊖ and reveals two short paragraphs.

**Artifact frame** — A white box on the grid with the image `object-fit: contain`, at 1:1 scale wherever possible. Below it is a 72px caption row: the 11px uppercase caption, with a 1px vertical hairline running through the row center that turns black on hover. Hovering the frame also shows **four L-shaped crop marks** (72×72 corners, 1px black, 5px notch cut by `clip-path`) just outside the frame. It's a print-production idiom.

**Scale ladders** — Icons are shown at 512, 256, 128, 32 and 16 px (@1x/@2x) in successive frames, each one small inside the same big white field. Tiny things get the same frame as big things. The emptiness is the point.

**Grid view** — The toggle reflows the case study into a 3-column contact sheet with no captions. The background grid parameters animate to a denser look.

**Info (`/info`)** — Four centered groups of the 11px label: tagline / founders / email (hover underline) / footer. Nothing else.

**Background grid recipe** — Layered gradients on a `--unit` tile:
`repeating-radial-gradient` white disks at the 4 corners (radius `--grid-spacer`), which round off the cell corners; `repeating-linear-gradient` 1px lines at every unit; a center disk (`--grid-spacer-center: 36px`) that knocks out the middle; and half-unit tick lines. The result is a field of rounded squares with center ticks. The full CSS is in `area-tokens.css`.

**Mobile** — The same template at 390px. The header stays 3-up, frames scale to the viewport width, and the grid stays visible. Labels look larger only because everything else shrinks.

---

## 4. Project notes

| Project | Discipline · date | Core idea | Signature moves |
|---|---|---|---|
| **OpenAI** | Brand identity · Jan–Feb 2023 | Circle/oculus (Pantheon) = optimism, openness | Blue P3 circle, classical serif "OPENAI" wordmark, monogram (figure + ring), chrome dome/sphere renders, character system (Open, Sunny, Warp, Chapter) that pilots tools, app icons, tees, glyph sets (cave-art-like gestures) |
| **PartyDAO** | Brand identity · 2022–2024 | Multiplayer party for Ethereum | Chrome cartoon mascot "Kazoo" in many poses/sports, cursor stars in rainbow primaries, Y2K game-box packaging, seal of quality, card spreads, op-art moiré posters |
| **Uniswap** | Brand identity · 2020–2024 | Heraldic unicorn | Single hot pink (#FF007A-ish) on white, rampant unicorn quartered in a shield, Labs/Grants sub-brands as shield variants, ornate fleur frame, "swap shape" 4-point star, aurora-cloud hero images |
| **Sky** | Naming + brand design · Jan 2025 | Glass sphere app icon | Aqua-era glossy striped orb, full macOS icon size ladder, black square + white orb lockups, extended wide wordmark |
| **XVG** | Vector graphics · Jan 2024 | Generative/parametric vector forms | Wireframe spheres, moiré, lattices in 4 colors (slate, teal, red, purple), each named (Trophy, Turbine, Orbital, Oscillator…); it's a product: xvg.area.tech |
| **Shields** | Design system · Jan 2022 | On-chain heraldry generator | Hundreds of field patterns and charges, chrome hardware, P3 tinctures, blazon-style generated names, "Shield Machine" industrial renders, EmblemWeaver app screens; shields.build |
| **TBPN** | Brand refresh & broadcast · Nov 2024–Jan 2025 | Chrome "T" in a globe ring, '90s sports-network TV | Green-black-chrome palette, scanline/halftone textures, chyron system (Breaking News, Lightning Round…), trading-card news graphics, Diet TBPN can |

Recurring motifs across projects: **spheres/orbs, rings, shields, stars, chrome, wide extended
grotesks, P3 saturated gradients, scale ladders, mascots/characters, objects with fake product names.**

---

## 5. Applying this to a redesign: do / don't

**Do**
- Pick a unit (72px or a derivative) and snap everything to it. Consider showing the grid.
- Use one label style for all UI text. Let a custom wordmark be the only "display" type.
- Keep the chrome monochrome and spend color only on the work or product objects.
- Use OS / object metaphors (folders, icons, windows, cards, trays) drawn with care. Avoid generic cards.
- Present deliverables as a spec: technical captions, multiple scales, lots of empty frame.
- Use hover as a quiet reveal (crop marks, carets, hairlines). Keep transitions at 150ms.
- Invest in one hero object render (material, light, a joke) instead of many decorative sections.
- Write copy that is short, factual and declarative, and put the long version behind a toggle.

**Don't**
- Hero headline plus subhead plus CTA-button stacks, feature grids, testimonial carousels.
- Multiple font sizes or weights for hierarchy, or webfont-heavy type stacks.
- Gradients or color in UI chrome, drop-shadow cards, glassmorphism panels.
- Scroll-jacking, parallax, staggered fade-up on every block, springy easing.
- Marketing adjectives. AREA never sells; it lists.

---

## 6. Raw references
- `design-ref/area/<page>/` has desktop/mobile full and fold screenshots (slices for tall pages), `page.html`, `styles.json`, and inline SVGs.
- `design-ref/area/<project>/assets/` + `assets.json` contain all 220 original images with captions as `alt`.
- `design-ref/area/_motion/` has the home, projects-open, case-study scroll and info videos, plus folder hover stills.
