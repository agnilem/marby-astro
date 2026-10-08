#!/usr/bin/env bash
# Regenerate the Next build, check both builds compile, and pack the zips:
#   zips/marby-astro.zip, zips/marby-next.zip, zips/marby-code.zip (both).
# Dev-only files (tools, ref, launch, env files, builds) never ship.
set -euo pipefail
cd "$(dirname "$0")/.."

node tools/astro-to-next.mjs
node tools/collect-css.mjs
npx astro build > /dev/null
(cd next && npx next build > /dev/null)

stage=$(mktemp -d); trap 'rm -rf "$stage"' EXIT
mkdir -p "$stage/astro" "$stage/next"
rsync -a --exclude node_modules --exclude dist --exclude .astro --exclude tools --exclude next --exclude ref --exclude launch \
  --exclude zips --exclude .baseline-dist --exclude '.env*' --exclude .vercel --exclude .vercelignore --exclude .git --exclude .gitignore \
  --exclude .DS_Store --exclude README.md --exclude LICENSE ./ "$stage/astro/"
rsync -a --exclude node_modules --exclude .next --exclude out --exclude '.env*' --exclude .vercel --exclude next-env.d.ts \
  --exclude tsconfig.tsbuildinfo --exclude .DS_Store next/ "$stage/next/"
# The Astro README without the parts about next/ and the generator.
sed -e '/^<!-- next -->$/,/^<!-- \/next -->$/d' -e '1s/.*/# Marby, an Astro real estate theme/' README.md > "$stage/astro/README.md"
# The Next.js buyer does not get the Astro source or the generator: say what the files are instead.
find "$stage/next/src" -type f \( -name '*.tsx' -o -name '*.ts' \) -exec sed -i '' -E '1s#^// GENERATED (from|by) .*#// Marby for Next.js. Generated from the Marby Astro source; edit freely.#' {} +
sed -i '' -E '1s#^/\* GENERATED .*\*/#/* Marby for Next.js: every style in one sheet. Tokens first. */#' "$stage/next/src/styles/site.css"

# Nothing that identifies the demo deployment ships.
if grep -rIl 'polar_cl_\|G-ZDTVFGHC5K\|apollostudio' "$stage"; then echo "demo-only values in bundle" >&2; exit 1; fi

rm -rf zips && mkdir zips
for s in astro next; do
  d="$stage/pack-$s"; mkdir -p "$d"
  cp -R "$stage/$s" "$d/"; cp LICENSE "$d/"
  label=$([ $s = astro ] && echo Astro || echo Next.js)
  sed -e '/^| `/d' -e '/^| Folder/d' -e '/^| ---/d' -e "1s/.*/# Marby: real estate theme for $label/" \
    -e "s/^Two builds of the same site.*/The Marby site for $label, in \`$s\/\`. Start with the README in that folder./" \
    -e '/^Each folder has its own README/d' \
    -e "$( [ $s = astro ] && echo 's# (Next: `src/styles/site.css`, top of the file)##' || echo 's#`src/styles/tokens.css` (Next: `src/styles/site.css`, top of the file)#`src/styles/site.css`, top of the file#' )" tools/zip-docs/README.md | cat -s > "$d/README.md"
  (cd "$d" && zip -rq "$OLDPWD/zips/marby-$s.zip" . -x '*.DS_Store')
done
d="$stage/pack-all"; mkdir -p "$d"; cp -R "$stage/astro" "$stage/next" "$d/"; cp tools/zip-docs/README.md LICENSE "$d/"
(cd "$d" && zip -rq "$OLDPWD/zips/marby-code.zip" . -x '*.DS_Store')

# Listing check: no env files, no installed or built output.
for z in zips/*.zip; do
  if unzip -Z1 "$z" | grep -E '(^|/)\.env|node_modules|(^|/)(dist|out|\.next)/'; then echo "$z ships files it must not" >&2; exit 1; fi
done
ls -lh zips | awk 'NR>1 {printf "  %-18s %s\n", $9, $5}'
