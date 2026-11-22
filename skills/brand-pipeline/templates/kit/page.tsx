import type { Metadata } from "next";
import { AppIcon, CAP, LockupCenter, LockupRight, LockupStack, Mark, MARK, MarkBars, MicroLockup, Wordmark, WordmarkGlyphs, WORDMARK_W } from "@/components/logo";
import { Kit } from "./kit";
import { ConstructionGrid, Exploration, F, Section, Steps, SwatchesPrimary, SwatchStrip, type Swatch } from "./parts";
import "./brand.css";

/* __BRAND__ brand kit, scaffolded by the brand-pipeline skill.
   Replace every TODO with the brand's own words; rename sections to the concept. */

export const metadata: Metadata = {
  title: "Brand Identity | __BRAND__",
  description: "The __BRAND__ identity: TODO one sentence on the concept, the mark and the wordmark.",
};

// TODO: the brand's palette.
const PRIMARY: Swatch[] = [
  { name: "Ink", hex: "#0E0F12", note: "Text, rules, the mark" },
  { name: "Paper", hex: "#FFFFFF", note: "Every surface" },
  { name: "Accent", hex: "#2B44FF", value: "var(--accent)", note: "TODO what it means" },
];
const NEUTRALS: Swatch[] = [
  { name: "Ink", hex: "#0E0F12" }, { name: "Ink 2", hex: "#5B6170" }, { name: "Rule Strong", hex: "#C9CDD6" },
  { name: "Rule", hex: "#E8EAEF" }, { name: "Tint", hex: "#F4F5F8" }, { name: "Paper", hex: "#FFFFFF" },
];
const DATA: Swatch[] = [
  { name: "−2", hex: "#D9481F", dark: true }, { name: "−1", hex: "#FBD9CD" }, { name: "0", hex: "#F4F5F8" },
  { name: "+1", hex: "#C9ECE4" }, { name: "+2", hex: "#0B8A76", dark: true },
];

function MarkConstruction() {
  return (
    <svg className="ak-draw fine" width="840" height="700" viewBox="-24 -22 120 100" role="img" aria-label="Mark construction">
      <ConstructionGrid cols={6} rows={5} step={12} />
      <MarkBars />
      {MARK.map(([x, w]) => <text key={x} x={x + w / 2} y="-4" textAnchor="middle">{w}</text>)}
      <line className="n" x1="-12" y1="0" x2="72" y2="0" />
      <line className="n" x1="-12" y1={CAP} x2="72" y2={CAP} />
      <text x="74" y="1">Cap {CAP}</text>
      <text x="74" y="61">Baseline</text>
      <text x="0" y="74">TODO: the rule behind the proportions</text>
    </svg>
  );
}

function WordmarkConstruction() {
  const cols = Math.ceil(WORDMARK_W / 12);
  return (
    <svg className="ak-draw" width="1008" height="369" viewBox={`-24 -30 ${WORDMARK_W + 48} 120`} role="img" aria-label="Wordmark on its construction grid">
      <ConstructionGrid cols={cols} rows={5} step={12} pad={12} />
      <WordmarkGlyphs />
      <line className="n" x1="-16" y1="0" x2={WORDMARK_W + 16} y2="0" />
      <line className="n" x1="-16" y1={CAP} x2={WORDMARK_W + 16} y2={CAP} />
      <text x="-16" y="-8">Cap · {CAP}</text>
      <text x="-16" y="76">Baseline · 0</text>
    </svg>
  );
}

function Tee() {
  return (
    <svg width="660" height="660" viewBox="0 0 600 600" role="img" aria-label="Black tee with the mark on the chest">
      <defs>
        <linearGradient id="tee" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a2d34" /><stop offset="1" stopColor="#0b0c0f" /></linearGradient>
      </defs>
      <path d="M205 40 Q300 92 395 40 L520 92 L585 228 L492 266 L470 222 L470 568 Q300 586 130 568 L130 222 L108 266 L15 228 L80 92 Z" fill="url(#tee)" />
      <path d="M205 40 Q300 92 395 40" fill="none" stroke="#3a3e47" strokeWidth="10" />
      <g transform="translate(362 150)"><MarkBars fg="#fff" /></g>
    </svg>
  );
}

export default function BrandPage() {
  return (
    <Kit
      name="__BRAND__"
      discipline="__DISCIPLINE__"
      date="__DATE__"
      wordmark={<Wordmark height={26} />}
      footer="© __YEAR__ __BRAND__"
      blurb={
        <>
          <p>TODO: what the name means and the one idea that runs the identity.</p>
          <p>TODO: how the wordmark is drawn, and the single rule for color.</p>
        </>
      }
    >
      <F w={1008} h={720} cap="Lockup Center"><LockupCenter size={2.2} /></F>

      {/* Section 0: phase 5 exploration. If the brand has no logo, replace the four placeholders with
          four real marks (MarkA–MarkD), ask the user to pick, then DELETE this section and the losers.
          If the brand brought its own logo, delete this section now. */}
      <Section n="0" title="Exploration" sub="Four directions for the mark" />
      <F w={1296} h={576} cap="Exploration A, B, C, D">
        <Exploration options={(["A", "B", "C", "D"] as const).map((id) => ({
          id, name: "TODO", note: "Placeholder", render: (s: number) => <Mark size={s} micro={s <= 24} title="" />,
        }))} />
      </F>

      <Section n="I" title="The Mark" sub="TODO what the mark depicts" />
      <F w={864} h={720} cap="Mark Primary"><Mark size={400} /></F>
      <F w={1008} h={720} cap="Mark Construction"><MarkConstruction /></F>
      <F w={576} h={288} cap="Mark Micro 48, 32, 24, 16">
        <span className="ak-row ak-bottom" style={{ gap: 40 }}>{[48, 32, 24, 16].map((s) => <Mark key={s} size={s} micro={s <= 24} />)}</span>
      </F>
      <F w={576} h={576} cap="Mark Inverse" tone="ink"><Mark size={300} fg="#fff" /></F>
      <F w={576} h={576} cap="Mark Accent" tone="accent"><Mark size={300} fg="#fff" accent="#fff" /></F>

      <Section n="II" title="The Wordmark" sub="TODO the grid it is drawn on" />
      <F w={1008} h={504} cap="Wordmark Primary"><Wordmark height={140} /></F>
      <F w={1152} h={576} cap="Wordmark Construction"><WordmarkConstruction /></F>
      <F w={1008} h={504} cap="Wordmark Inverse" tone="ink"><Wordmark height={140} /></F>

      <Section n="III" title="Lockups" sub="Center, right, stack, micro" />
      <F w={1008} h={432} cap="Lockup Right"><LockupRight height={112} /></F>
      <F w={576} h={648} cap="Lockup Stack"><LockupStack height={210} /></F>
      <F w={432} h={216} cap="Microlockup"><MicroLockup size={22} /></F>
      <F w={1008} h={432} cap="Lockup Right Inverse" tone="ink"><LockupRight height={112} /></F>
      <F w={864} h={720} cap="Lockup Center Accent" tone="accent"><LockupCenter size={1.8} /></F>

      <Section n="IV" title="App Icon" sub="Ink squircle, the mark at its center" />
      <F w={720} h={720} cap="App Icon"><AppIcon size={400} /></F>
      <F w={1152} h={504} cap="App Icon Ink, Accent, Paper">
        <span className="ak-row" style={{ gap: 72 }}>
          <AppIcon size={240} /><AppIcon size={240} variant="accent" /><AppIcon size={240} variant="paper" />
        </span>
      </F>
      {([[256, "Icon 256×256@2x"], [128, "Icon 128×128@2x"], [32, "Icon 32×32@2x"], [16, "Icon 16×16@1x"]] as const).map(([s, c]) => (
        <F key={c} w={432} h={432} cap={c}><AppIcon size={s} /></F>
      ))}

      <Section n="V" title="Color and Type" sub="TODO the color rule" />
      <F w={1008} h={576} cap="Color Primary"><SwatchesPrimary colors={PRIMARY} /></F>
      <F w={1008} h={288} cap="Color Neutrals"><SwatchStrip colors={NEUTRALS} /></F>
      <F w={864} h={216} cap="Color Data"><Steps colors={DATA} /></F>
      <F w={1008} h={576} cap="Type Reading">
        <span className="ak-type">
          <span className="aa">Aa</span>
          <span className="body">
            <span className="ak-l">TODO typeface · Reading</span>
            <span className="big">TODO a short<br />brand line.</span>
            <span className="abc">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789</span>
          </span>
        </span>
      </F>
      <F w={1008} h={432} cap="Type Mono">
        <span className="ak-type mono">
          <span className="big-mono">0123</span>
          <span className="body">
            <span className="ak-l">TODO mono face · One label size · 10.5 / 16 · +0.04em</span>
            <span className="ak-l">Index · Work · About · Brand</span>
          </span>
        </span>
      </F>

      <Section n="VI" title="TODO The System" sub="The concept's grid or rule, drawn" />
      <F w={1152} h={576} cap="TODO System Drawing"><span className="ak-l m">Draw the concept here</span></F>

      <Section n="VII" title="Applications" sub="Card, poster, tab, tee" />
      <F w={864} h={576} cap="Business Card Front" tone="tint">
        <span className="ak-card">
          <LockupRight height={30} />
          <span className="ak-card-foot"><span className="ak-l">TODO descriptor</span><span className="ak-l m">TODO line two</span></span>
        </span>
      </F>
      <F w={864} h={576} cap="Business Card Back" tone="tint">
        <span className="ak-card ink">
          <span className="ak-l">__BRAND__</span>
          <Mark size={84} fg="#fff" title="" />
          <span className="ak-l m">TODO tagline</span>
        </span>
      </F>
      <F w={864} h={1080} cap="Poster 3:4" tone="tint">
        <span className="ak-poster">
          <span className="ak-l">__BRAND__ · TODO descriptor</span>
          <Wordmark height={110} />
          <span className="ak-poster-grid" />
          <span className="copy">TODO a short<br />brand line.</span>
        </span>
      </F>
      <F w={864} h={288} cap="Favicon Browser Tab" tone="tint">
        <span className="ak-tabs">
          <span className="ak-tab on"><AppIcon size={16} /><span>__BRAND__</span><span className="x">×</span></span>
          <span className="ak-tab"><span className="dot" /><span>New Tab</span><span className="x">×</span></span>
        </span>
      </F>
      <F w={864} h={864} cap="Tee Ink, Chest Mark"><Tee /></F>
    </Kit>
  );
}
