---
name: brand-pipeline
description: End-to-end brand identity pipeline for a Next.js site, the one used to build Jetzt Labs ("1440"). Capture reference sites, distill a taste KB, find one concept from the brand's name, set tokens, draw a wordmark and explore logo marks, publish an AREA-style case-study brand kit at /brand, then redesign the site and document it. Use when the user asks to create a brand, brand kit, identity, logo, or design system for a brand or company, or to "run the brand pipeline" / "/brand-pipeline <name>".
---

# Brand pipeline

One brand in, one identity out: a concept, tokens, a logo system, a `/brand` case-study page,
a redesigned site and a written spec. Built from the Jetzt Labs run (Nov 2026).

**House style: AREA, always.** Every brand kit must feel like it came from AREA
(`references/taste/area.md`). The /brand page uses the AREA case-study template unchanged, and the
identity follows AREA's approach: monochrome chrome, one label size, a visible grid, a geometric
wordmark on a unit grid, symbol work presented as a spec. Other references may only inform a
brand's own character (its concept, mark and accent), never the presentation. Never swap the
kit template for another style.

Work in phases. **Each phase with a ★ ends at a user gate**: show the options, recommend one,
and wait for the pick before building on it. Everything else runs without asking.

Paths below are relative to this skill folder (`~/.claude/skills/brand-pipeline/`) unless they
start with `src/`, `design-kb/` or `design-ref/`, which live in the user's project.

## 0. Intake

Get, in one round of questions only if missing:
- Brand name and what it means (language, origin, a pun?). The concept usually comes from here.
- What the brand does and for whom; the site's pages.
- Extra references (optional): sites the brand should borrow character from. AREA is always
  the base (`references/taste/area.md`, already distilled; never re-capture it).
- Starting fresh or evolving an existing look. Default: fresh, and the current UI is **not** inspiration.

## 1. Capture extra references (only if the user named some beyond AREA)

Raw captures go in `design-ref/<ref>/` and `design-ref/` is added to `.gitignore`.
Prefer the free routes, never a paid capture service unless the user asks:
- `scripts/capture.mjs` (Playwright): desktop and mobile fold and full-page screenshots, computed
  styles, `:root` variables, `@font-face` rules and inline SVGs per page. Usage is at the top of the file.
- Or hand the user `references/capture-prompt.md` to run in Codex or another coding agent.

## 2. Taste KB

For each new reference, write `design-kb/<ref>.md` and `design-kb/<ref>-tokens.css` from the
captures, using `references/taste-kb-template.md`. Measure; don't guess. Then copy the finished KB
into `references/taste/` here so the next brand can reuse it.

## How a ★ gate works: four options

At every ★ gate, if the user already has that piece (an existing logo, colors, typefaces, a
concept), use theirs and skip the options. Otherwise give **exactly four options**:
1. Make all four real and comparable (drawn on /brand for visual pieces, not just described).
2. Ask with `AskUserQuestion`: four options labeled A–D, each with a one-line description and,
   where it helps, a `preview`. Put your recommendation first with "(Recommended)".
3. The user may pick one, combine two ("keep both A and C"), or ask for another round.
   A combination becomes a new option drawn next to the others, then ask again.
4. Once chosen, delete the rest completely and note the choice in memory.

## 3. ★ Concept

Give four concepts (see the gate above), each one sentence that one idea drives everything
(layout, mark, color rule, motion). Derive them from the brand name and what it does, filtered through AREA's taste
principles (and any extra reference).
Jetzt example: *Jetzt = now → the page is a day*: 1440px = 1440 minutes, 24 hour columns, one
accent color that means "the present" and nothing else.
A good concept gives: a grid rule, a meaning for the single accent color, and a shape for the mark.

## 4. ★ Tokens

If the user has no brand colors or typefaces, give four directions (accent color + type pairing
each), drawn as swatch and type frames in the Exploration section, and run the gate.
Write tokens as CSS custom properties on `:root` in the project's global CSS:
- Monochrome chrome (paper, ink, ink-2, rule, rule-strong, tint) plus **one** accent with a
  P3 value and a dark-mode value. Give the accent a single meaning and write it down.
- Data colors separate from the accent (a diverging pair with `-soft` variants) if the site shows data.
- Two typefaces at most via `next/font`: one for reading, one mono for labels; one label style.
- Grid rule from the concept, spacing unit, motion (120ms `cubic-bezier(0.2,0,0,1)`, honor reduced motion).

## 5. ★ Logo

1. **Wordmark** first: geometric caps drawn as SVG rects/polygons on a unit grid
   (Jetzt: cap 60, stroke 12, viewBox 280×60). Pure SVG components, no hooks.
2. **Mark** (skip if the user brought a logo; redraw theirs on the grid instead): draw **four**
   marks A–D that each express the concept differently, on the wordmark's grid so stroke widths
   match. Show them on `/brand` in a "Section 0: Exploration" using the `Exploration` board from
   `parts.tsx` (all four side by side at large, 32px and 16px), plus one frame per option with
   it locked up next to the wordmark. Screenshot the board, then run the four-option gate.
   Jetzt example: A One Lit Cell, B Caret, C Trail, D Caret + Trail; the user chose C.
3. When picked: delete Section 0, the losers and their CSS entirely, and record the choice in
   memory so it is never reintroduced.
4. Build out the system in `src/components/logo.tsx` (start from `templates/logo.tsx`):
   `Mark`, `MarkBars` (raw `<g>` for drawings), `Wordmark`, `WordmarkGlyphs`, a **micro** variant
   for ≤24px, an optional SMIL live variant, `AppIcon` (squircle rx 14.5/64; ink, accent and paper
   variants), lockups (right, center, stack, micro). Favicon `src/app/icon.svg` uses the micro mark.

## 6. The /brand kit page

Scaffold it, then fill it:

```bash
bash ~/.claude/skills/brand-pipeline/scripts/scaffold.sh <project-dir> --name "Acme" [--route brand] [--discipline "Brand Identity"]
```

This copies `templates/kit/` to `src/app/<route>/` (kit.tsx, parts.tsx, brand.css, page.tsx) and,
only if missing, `templates/logo.tsx` to `src/components/logo.tsx`. It refuses to overwrite.
The page is an AREA case study: fixed 3-slot header, drafting grid, a 576×144 meta block, one
column of white artboards in 72px multiples with caption rows and hover crop marks, a grid-view
contact sheet, always light. Artboards scale with pure CSS (no JS).

Standard sections (rename to the brand's words): Hero lockup · I The Mark (primary, construction,
live, micro ladder, inverse, accent) · II Wordmark (primary, construction, accent, inverse) ·
III Lockups · IV App Icon (hero, variants, 256/128/32/16 ladder) · V Color and Type ·
VI The concept's system (e.g. the grid) · VII Applications (card front/back, poster, browser tab, tee).
Captions are short Title Case nouns ("Lockup Right Inverse"). Draw applications as physical objects.

## 7. Redesign the site

Build a shared `Shell` (header with the micro mark + wordmark, footer, the concept's grid) and
rebuild every page on the tokens. Start from home, then each route. Keep copy and data; change form.

## 8. Document

- `design-kb/<brand>-brand.md` from `references/brand-spec-template.md` (idea, logo table and
  rules, color, type, layout/components, presentation).
- A project memory: concept, chosen mark and rejected options, where the spec and kit live.

## 9. Verify (before saying done)

- Preview `/brand` and changed pages at 1440 desktop and 375 mobile (no horizontal overflow),
  light and dark for the site (/brand is always light), and the grid view.
- Console clean (watch for SVG hydration mismatches), `npx tsc --noEmit`, `npx eslint src`.
- Screenshot proof of the hero, mark, app icon and one application.
- Don't commit unless the user asks.

Read `references/lessons.md` before phase 5; it lists the traps from the Jetzt run.
