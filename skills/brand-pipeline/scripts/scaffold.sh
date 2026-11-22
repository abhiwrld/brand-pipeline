#!/usr/bin/env bash
# Scaffold the AREA-style brand kit page into a Next.js App Router project.
# Usage: scaffold.sh <project-dir> --name "Acme" [--route brand] [--discipline "Brand Identity"] [--date "November 2026"]
set -euo pipefail

SKILL="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT="${1:-}"; shift || true
NAME=""; ROUTE="brand"; DISCIPLINE="Brand Identity"; DATE="$(date '+%B %Y')"; YEAR="$(date '+%Y')"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --name) NAME="$2"; shift 2 ;;
    --route) ROUTE="$2"; shift 2 ;;
    --discipline) DISCIPLINE="$2"; shift 2 ;;
    --date) DATE="$2"; shift 2 ;;
    *) echo "Unknown option: $1" >&2; exit 2 ;;
  esac
done

[[ -n "$PROJECT" && -n "$NAME" ]] || { echo "Usage: scaffold.sh <project-dir> --name \"Acme\" [--route brand]" >&2; exit 2; }
[[ -f "$PROJECT/package.json" ]] && grep -q '"next"' "$PROJECT/package.json" || { echo "Not a Next.js project: $PROJECT" >&2; exit 1; }

APP="$PROJECT/src/app"; [[ -d "$APP" ]] || APP="$PROJECT/app"
[[ -d "$APP" ]] || { echo "No app/ or src/app/ directory in $PROJECT" >&2; exit 1; }
COMPONENTS="$(dirname "$APP")/components"
DEST="$APP/$ROUTE"
[[ -e "$DEST" ]] && { echo "Refusing to overwrite existing $DEST" >&2; exit 1; }

UPPER="$(printf '%s' "$NAME" | tr '[:lower:]' '[:upper:]')"
fill() { # fill <src> <dest>
  # Escape the replacement strings for sed.
  local e_name e_upper e_disc e_date
  e_name=$(printf '%s' "$NAME" | sed 's/[&|\\]/\\&/g'); e_upper=$(printf '%s' "$UPPER" | sed 's/[&|\\]/\\&/g')
  e_disc=$(printf '%s' "$DISCIPLINE" | sed 's/[&|\\]/\\&/g'); e_date=$(printf '%s' "$DATE" | sed 's/[&|\\]/\\&/g')
  sed -e "s|__BRAND_UPPER__|$e_upper|g" -e "s|__BRAND__|$e_name|g" -e "s|__DISCIPLINE__|$e_disc|g" \
      -e "s|__DATE__|$e_date|g" -e "s|__YEAR__|$YEAR|g" "$1" > "$2"
}

mkdir -p "$DEST"
for f in kit.tsx parts.tsx brand.css page.tsx; do fill "$SKILL/templates/kit/$f" "$DEST/$f"; done
echo "Created $DEST/{kit.tsx,parts.tsx,brand.css,page.tsx}"

if [[ -e "$COMPONENTS/logo.tsx" ]]; then
  echo "Kept existing $COMPONENTS/logo.tsx. The kit page imports: AppIcon CAP LockupCenter LockupRight LockupStack Mark MARK MarkBars MicroLockup Wordmark WordmarkGlyphs WORDMARK_W"
else
  mkdir -p "$COMPONENTS"
  fill "$SKILL/templates/logo.tsx" "$COMPONENTS/logo.tsx"
  echo "Created $COMPONENTS/logo.tsx (placeholder shapes; redraw in phase 5)"
fi
echo "Open /$ROUTE in the dev server. Replace every TODO in $DEST/page.tsx."
