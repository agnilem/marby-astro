#!/usr/bin/env bash
# Dev check: diff two Astro builds' HTML with hashed asset names and scope ids normalised.
# usage: tools/distdiff.sh .baseline-dist dist
set -euo pipefail
norm() { sed -E 's#/_astro/[^"]+\.(css|js)#/_astro/X.\1#g; s#data-astro-cid-[a-z0-9]+#cid#g' "$1"; }
fail=0
for f in $(cd "$1" && find . -name '*.html' -o -name '*.xml' -o -name '*.txt' | sort); do
  if ! diff -q <(norm "$1/$f") <(norm "$2/$f") >/dev/null; then echo "DIFF $f"; fail=1; fi
done
[ "$(cd "$1" && find . -type f -not -path './_astro/*' | sort)" = "$(cd "$2" && find . -type f -not -path './_astro/*' | sort)" ] || { echo "file list differs"; fail=1; }
exit $fail
