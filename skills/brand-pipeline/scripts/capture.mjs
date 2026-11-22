#!/usr/bin/env node
// Capture a reference site for a taste study (brand-pipeline skill, phase 1).
//
// Usage (from the project root):
//   node ~/.claude/skills/brand-pipeline/scripts/capture.mjs <base-url> <out-dir> [path ...]
//   node ~/.claude/skills/brand-pipeline/scripts/capture.mjs https://example.com design-ref/example / /work /about
//
// Needs playwright and sharp. If missing, install them into the capture folder once:
//   npm install --prefix design-ref/<ref> playwright sharp && npx --prefix design-ref/<ref> playwright install chromium
// and run with NODE_PATH=design-ref/<ref>/node_modules.
//
// Per page writes <out>/<slug>/: desktop-fold.png, desktop-full.png, mobile-fold.png, mobile-full.png,
// page.html, styles.json (computed styles of key elements), root.json (:root vars + @font-face), svg-N.svg.
// Then <out>/README.md with a table of results.

import { createRequire } from "node:module";
import fs from "node:fs/promises";
import path from "node:path";

const require = createRequire(path.join(process.cwd(), "noop.js"));
const { chromium } = require("playwright");
const sharp = require("sharp");

const [base, outArg, ...paths] = process.argv.slice(2);
if (!base || !outArg) { console.error("Usage: capture.mjs <base-url> <out-dir> [path ...]"); process.exit(2); }
const out = path.resolve(outArg);
const pages = paths.length ? paths : ["/"];
const sizes = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true },
};
const slug = (p) => (p === "/" ? "home" : p.replace(/^\/+|\/+$/g, "").replace(/[^a-z0-9-]+/gi, "-").toLowerCase());
const rows = [];

async function settle(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
  for (let y = 0; ; y += 600) {
    const s = await page.evaluate((y) => { scrollTo(0, y); return { h: document.documentElement.scrollHeight, v: innerHeight, at: scrollY }; }, y);
    await page.waitForTimeout(250);
    if (s.at + s.v >= s.h - 2 || y > 200000) break;
  }
  await page.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 20000 }).catch(() => {});
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(800);
}

async function fullShot(page, file, spec) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const dpr = spec.deviceScaleFactor, vh = spec.viewport.height, w = spec.viewport.width;
  if (height * dpr <= 16000) { await page.screenshot({ path: file, fullPage: true, timeout: 90000 }); return height; }
  // Tall pages: stitch viewport shots, hiding fixed elements after the first.
  const layers = [];
  for (let y = 0; y < height; y += vh) {
    await page.evaluate((y) => scrollTo(0, y), y); await page.waitForTimeout(250);
    if (y > 0) await page.evaluate(() => { for (const e of document.querySelectorAll("*")) if (getComputedStyle(e).position === "fixed") e.style.visibility = "hidden"; });
    const at = await page.evaluate(() => scrollY), top = Math.round((y - at) * dpr), h = Math.round(Math.min(vh, height - y) * dpr);
    const buf = await sharp(await page.screenshot()).extract({ left: 0, top, width: w * dpr, height: h }).png().toBuffer();
    layers.push({ input: buf, left: 0, top: Math.round(y * dpr) });
  }
  await sharp({ create: { width: w * dpr, height: Math.round(height * dpr), channels: 3, background: "#fff" } }).composite(layers).png().toFile(file);
  return height;
}

async function data(page, dir) {
  await fs.writeFile(path.join(dir, "page.html"), await page.content());
  const d = await page.evaluate(() => {
    const props = ["font-family", "font-size", "font-weight", "line-height", "letter-spacing", "text-transform", "color", "background-color", "padding", "margin", "border-radius", "transition"];
    const els = new Set(document.querySelectorAll("body,h1,h2,h3,h4,p,a,button,header,nav,footer,main,section,figure,figcaption"));
    for (const e of document.querySelectorAll("*")) if (getComputedStyle(e).position === "fixed") els.add(e);
    const styles = [...els].slice(0, 600).map((e) => ({ tag: e.tagName.toLowerCase(), class: e.getAttribute("class"), text: (e.innerText || "").slice(0, 120), computed: Object.fromEntries(props.map((p) => [p, getComputedStyle(e).getPropertyValue(p)])) }));
    const vars = {}, fonts = [];
    const scan = (rules) => { for (const r of rules || []) { if (r.type === CSSRule.FONT_FACE_RULE) fonts.push(r.cssText); if (r.cssRules) scan(r.cssRules); } };
    for (const s of document.styleSheets) { try { scan(s.cssRules); } catch {} }
    const cs = getComputedStyle(document.documentElement);
    for (const p of cs) if (p.startsWith("--")) vars[p] = cs.getPropertyValue(p).trim();
    return { styles, root: { vars, fonts }, svgs: [...document.querySelectorAll("svg")].slice(0, 80).map((s) => s.outerHTML) };
  });
  await fs.writeFile(path.join(dir, "styles.json"), JSON.stringify(d.styles, null, 2));
  await fs.writeFile(path.join(dir, "root.json"), JSON.stringify(d.root, null, 2));
  await Promise.all(d.svgs.map((s, i) => fs.writeFile(path.join(dir, `svg-${i + 1}.svg`), s)));
  return d.svgs.length;
}

const browser = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
for (const p of pages) {
  const name = slug(p), dir = path.join(out, name), url = new URL(p, base).href, row = { name, url, failures: [] };
  await fs.mkdir(dir, { recursive: true });
  for (const [size, spec] of Object.entries(sizes)) {
    const ctx = await browser.newContext(spec), page = await ctx.newPage();
    try {
      await settle(page, url);
      await page.screenshot({ path: path.join(dir, `${size}-fold.png`) });
      row[size] = await fullShot(page, path.join(dir, `${size}-full.png`), spec);
      if (size === "desktop") row.svgs = await data(page, dir);
    } catch (e) { row.failures.push(`${size}: ${e.message.split("\n")[0]}`); }
    finally { await ctx.close(); }
  }
  rows.push(row); console.log(`captured ${name}`, row.failures.length ? row.failures : "");
}
await browser.close();
const md = ["# Reference capture", "", `Base: ${base} · captured ${new Date().toISOString().slice(0, 10)}`, "",
  "| Page | URL | Desktop height | Mobile height | SVGs | Failures |", "| --- | --- | ---: | ---: | ---: | --- |",
  ...rows.map((r) => `| ${r.name} | ${r.url} | ${r.desktop ?? "—"} | ${r.mobile ?? "—"} | ${r.svgs ?? "—"} | ${r.failures.join("; ") || "—"} |`)];
await fs.writeFile(path.join(out, "README.md"), md.join("\n") + "\n");
