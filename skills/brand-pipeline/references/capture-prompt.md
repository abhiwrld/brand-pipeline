# Codex prompt: capture a reference site

Fill in the URL and pages, then paste into Codex from the project root.

---

Capture a visual reference of {BASE_URL} into `design-ref/{ref}/` for a design taste study.
Pages: {/, /work, /about, /work/some-case-study, …} (also follow any obvious project links from the index).

For each page, in `design-ref/{ref}/{page-slug}/`:
1. Screenshots with Playwright (prefer the installed Chrome channel for video codecs):
   desktop 1440×900 @1x and mobile 390×844 @2x; a fold shot and a full-page shot each.
   Scroll the whole page first so lazy images load; wait for images. If a full page is taller than
   16,000 device pixels, stitch viewport captures (hide fixed elements after the first) instead.
2. `page.html`, plus `styles.json` with computed font-family, size, weight, line-height,
   letter-spacing, text-transform, color, background, padding, margin, border-radius, transition
   for body, headings, links, header, footer and fixed elements.
3. `root.json` with every `:root` custom property and every `@font-face` rule.
4. Every inline `<svg>` as `svg-N.svg`; every `<img>` at its largest srcset size in `assets/`.
5. Two short screen recordings (1440×900 webm): hovering the main navigation and items,
   and scrolling one case study top to bottom. Trim the loading lead-in.

Write `design-ref/{ref}/README.md`: a table of pages with URL, heights, image counts and failures.
Keep the capture script in that folder so it can be re-run. Don't commit anything.
