# brand-pipeline

A Claude Code skill that builds a full brand identity for a Next.js (App Router) site, in the
house style of [AREA](https://www.area.tech): monochrome chrome, one label size, a visible 72px
grid, geometric wordmarks, and every brand kit presented as an AREA-style case-study page at `/brand`.

## Install

In Claude Code:

```
/plugin marketplace add abhiwrld/brand-pipeline
/plugin install brand-pipeline@brand-pipeline
```

Or copy `skills/brand-pipeline/` into `~/.claude/skills/`.

## Use

Open Claude Code in your Next.js project and say:

```
Run the brand pipeline for Acme
```

It walks through: intake → (optional) reference capture → concept → tokens → wordmark and mark →
`/brand` kit → site redesign → written spec → verification. Wherever you don't already have a
piece (concept, colors and type, logo), it draws **four options** on the `/brand` page and asks you
to pick one, combine two, or go another round.

## What's inside

| Path | What it is |
|---|---|
| `skills/brand-pipeline/SKILL.md` | The pipeline and its gates |
| `skills/brand-pipeline/templates/kit/` | The AREA-style `/brand` case-study page (kit, parts, CSS, page) |
| `skills/brand-pipeline/templates/logo.tsx` | Starter logo system with placeholder shapes |
| `skills/brand-pipeline/scripts/scaffold.sh` | Adds the kit page to a project (never overwrites) |
| `skills/brand-pipeline/scripts/capture.mjs` | Captures a reference site with Playwright |
| `skills/brand-pipeline/references/` | AREA taste study, lessons, spec and capture-prompt templates |

AREA is an independent studio; this project isn't affiliated with it. The taste study is an
analysis of its public site for reference.
