// Compare the static HTML of the Astro build (dist/) and the Next build (next/out/):
// the body markup element by element (attributes sorted, Astro scope ids and
// framework scripts dropped), and the SEO head tags (site URL normalised).
// usage: node tools/htmlcmp.mjs
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { parse, serialize } = createRequire(join(ROOT, 'next', 'package.json'))('parse5');
const ASTRO_SITE = 'https://marby.startfrom.co', NEXT_SITE = 'https://marby-next.startfrom.co';
const { execSync } = await import('node:child_process');
const pages = execSync('find . -name index.html -o -name 404.html', { cwd: (process.env.DIST || join(ROOT, 'dist')) }).toString().trim().split('\n').sort();

const kids = (n) => n.childNodes || [];
const find = (n, tag) => { if (n.nodeName === tag) return n; for (const c of kids(n)) { const r = find(c, tag); if (r) return r; } };
function clean(n) {
  if (!n.childNodes) return;
  n.childNodes = n.childNodes.filter((c) => !(c.nodeName === '#comment' || c.nodeName === 'script' || c.nodeName === 'next-route-announcer' || c.nodeName === 'link' || c.nodeName === 'style'
    // How each framework mounts Vercel Analytics: Astro's custom elements, React's Suspense templates.
    || c.nodeName === 'vercel-analytics' || c.nodeName === 'vercel-speed-insights' || c.nodeName === 'template'
    || (c.nodeName === '#text' && !c.value.trim() && n.nodeName !== 'pre')
    // React's empty hidden <div> marking where streamed content lands.
    || (c.nodeName === 'div' && c.attrs.length === 1 && c.attrs[0].name === 'hidden' && kids(c).every((k) => k.nodeName === '#comment'))));
  for (const c of n.childNodes) {
    if (c.attrs) c.attrs = c.attrs.filter((a) => !a.name.startsWith('data-astro-cid')).sort((a, b) => a.name.localeCompare(b.name));
    clean(c);
  }
  if (n.content) clean(n.content);
}
function head(doc) {
  const h = find(doc, 'head'), out = [];
  const walk = (n) => { for (const c of kids(n)) {
    const at = Object.fromEntries((c.attrs || []).map((a) => [a.name, a.value]));
    if (c.nodeName === 'title') out.push('title=' + kids(c).map((t) => t.value).join(''));
    if (c.nodeName === 'meta' && (at.name || at.property) && at.name !== 'generator' && at.name !== 'viewport' && at.name !== 'next-size-adjust') out.push(`${at.name || at.property}=${at.content}`);
    if (c.nodeName === 'link' && /canonical|icon/.test(at.rel)) out.push(`${at.rel}=${at.href}`);
    walk(c);
  } };
  walk(h);
  // Set semantics: Next adds its own robots noindex to the 404, next to ours.
  return [...new Set(out)].sort().join('\n').replaceAll(ASTRO_SITE, 'SITE').replaceAll(NEXT_SITE, 'SITE');
}
let bad = 0;
for (const p of pages) {
  const a = parse(readFileSync(join(process.env.DIST || join(ROOT, 'dist'), p), 'utf8'));
  const nf = join(process.env.OUT || join(ROOT, 'next', 'out'), p);
  if (!existsSync(nf)) { console.log('MISSING in next:', p); bad++; continue; }
  const n = parse(readFileSync(nf, 'utf8'));
  const issues = [];
  const ha = head(a), hn = head(n);
  if (ha !== hn) issues.push('head:\n' + ha.split('\n').filter((l) => !hn.split('\n').includes(l)).map((l) => '    - ' + l).join('\n') + '\n' + hn.split('\n').filter((l) => !ha.split('\n').includes(l)).map((l) => '    + ' + l).join('\n'));
  const ba = find(a, 'body'), bn = find(n, 'body');
  clean(ba); clean(bn);
  const sa = serialize(ba), sn = serialize(bn);
  if (sa !== sn) { let i = 0; while (sa[i] === sn[i]) i++; issues.push(`body differs at ${i}:\n    astro: ${sa.slice(Math.max(0, i - 120), i + 120)}\n    next : ${sn.slice(Math.max(0, i - 120), i + 120)}`); }
  console.log(`${issues.length ? '!!' : 'ok'} ${p}`);
  for (const x of issues) console.log('  ' + x);
  if (issues.length) bad++;
}
console.log(`\n${pages.length - bad}/${pages.length} pages: identical body markup and SEO head`);
process.exit(bad ? 1 : 0);
