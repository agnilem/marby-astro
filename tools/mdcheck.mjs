// Dev check: the Next markdown renderer must produce byte-identical HTML to
// the Astro build for every Markdown file. usage: node tools/mdcheck.mjs [distDir]
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(ROOT, 'next', 'package.json'));
const matter = require('gray-matter');
const { parse, serializeOuter, serialize } = require('parse5');
const { renderMarkdown } = await import(join(ROOT, 'next', 'src', 'lib', 'markdown.ts'));
const dist = process.argv[2] || join(ROOT, 'dist');
const find = (n, pred) => { if (pred(n)) return n; for (const c of n.childNodes || []) { const r = find(c, pred); if (r) return r; } };
let bad = 0, n = 0;
for (const [col, route] of [['blog', 'blog'], ['properties', 'property']]) {
  for (const f of readdirSync(join(ROOT, 'src', 'content', col)).filter((f) => f.endsWith('.md'))) {
    const slug = f.replace(/\.md$/, '');
    const html = readFileSync(join(dist, route, slug, 'index.html'), 'utf8');
    const doc = parse(html);
    const el = find(doc, (x) => x.attrs?.some((a) => a.name === 'class' && a.value.split(' ').includes('prose')));
    const astro = serialize(el);
    const next = renderMarkdown(matter(readFileSync(join(ROOT, 'src', 'content', col, f), 'utf8')).content);
    // Compare as parsed DOM, serialised the same way.
    const wrap = (s) => serialize(find(parse(`<div id=x>${s}</div>`), (x) => x.attrs?.some((a) => a.name === 'id' && a.value === 'x')));
    n++;
    if (wrap(astro) !== wrap(next)) { bad++; console.log('DIFF', col, slug); const a = wrap(astro), b = wrap(next); let i = 0; while (a[i] === b[i]) i++; console.log('  astro:', JSON.stringify(a.slice(i - 40, i + 80))); console.log('  next :', JSON.stringify(b.slice(i - 40, i + 80))); }
  }
}
console.log(`${n - bad}/${n} markdown files identical`);
process.exit(bad ? 1 : 0);
