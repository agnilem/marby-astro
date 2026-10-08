// Compare two builds element by element (Astro vs Next, or baseline vs Astro).
// Both render the same markup, so the n-th element with a class in one build is
// the n-th in the other. Reports every element whose box differs by more than
// MAX px or whose key computed styles differ, plus page height, visible text and
// console errors, per route and width, after a scroll-through so reveals settle.
// usage: A=http://localhost:4521 B=http://localhost:4522 node tools/variantcmp.mjs [maxPx=2]
import { readdirSync, readFileSync, appendFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, executable } from './pw.mjs';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MAX = Number(process.argv[2] || 2);
const A = process.env.A || 'http://localhost:4521';
const B = process.env.B || 'http://localhost:4522';
// Every route in src/pages, every slug of each dynamic route, and a missing page (the 404).
const slugs = (dir) => readdirSync(join(ROOT, 'src', 'content', dir)).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')).sort();
const allRoutes = ['/', '/about-us/', '/blog/', ...slugs('blog').map((s) => `/blog/${s}/`), '/contact/', '/property/', ...slugs('properties').map((s) => `/property/${s}/`), '/terms-conditions/', '/this-page-does-not-exist/'];
const routes = process.env.ROUTES ? process.env.ROUTES.split(',') : allRoutes;
// 1440/1000/390 plus the template's breakpoint edges (desktop >= 1200, tablet 810-1199, phone < 810).
const widths = (process.env.WIDTHS || '1440,1200,1199,1000,810,809,390').split(',').map(Number);
const STYLE = ['color', 'backgroundColor', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'opacity', 'display', 'visibility', 'transform', 'borderRadius', 'boxShadow', 'objectFit'];
let b = await chromium.launch({ executablePath: executable(), headless: true });
const browser = async () => (b.isConnected() ? b : (b = await chromium.launch({ executablePath: executable(), headless: true })));

async function grab(base, path, w, tries = 3) {
  try { return await grab1(base, path, w); } catch (e) { if (tries <= 1) throw e; await new Promise((r) => setTimeout(r, 1000)); return grab(base, path, w, tries - 1); }
}
async function grab1(base, path, w) {
  const ctx = await (await browser()).newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  // Errors from this site only: the 404 page's own status, and third-party
  // network failures (the Google Maps embed), are not the build's doing.
  p.on('console', (m) => {
    if (m.type() !== 'error' || /status of 404/.test(m.text())) return;
    const at = m.location()?.url || '';
    if (at && !at.startsWith(base)) return;
    errs.push(m.text().slice(0, 140) + (at ? ' @ ' + at.slice(0, 80) : ''));
  });
  await p.goto(base + path, { waitUntil: 'networkidle', timeout: 90000 });
  await p.evaluate(() => document.fonts.ready);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 700) { await p.evaluate((v) => scrollTo(0, v), y); await p.waitForTimeout(40); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(800);
  const rows = await p.evaluate((STYLE) => [...document.querySelectorAll('body [class]')]
    .filter((el) => !el.closest('nextjs-portal, script, style, template'))
    .map((el) => {
      const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { c: el.getAttribute('class').split(/\s+/).filter((x) => !x.startsWith('astro-')).join('.'), x: r.left, y: r.top + scrollY, w: r.width, h: r.height, s: STYLE.map((k) => cs[k]).join('|') };
    }), STYLE);
  const html = await p.evaluate(() => document.documentElement.scrollHeight);
  const text = await p.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').trim());
  await ctx.close();
  return { rows, H: html, text, errs };
}

// LOG=file.jsonl makes the run resumable: finished checks are kept and skipped.
const LOG = process.env.LOG;
const prior = LOG && existsSync(LOG) ? readFileSync(LOG, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l)) : [];
const jobs = widths.flatMap((w) => routes.map((r) => [w, r])).filter(([w, r]) => !prior.some((p) => p.w === w && p.r === r));
let bad = 0, done = 0;
const results = [];
async function worker() {
  while (jobs.length) {
    const [w, r] = jobs.shift();
    const a = await grab(A, r, w), n = await grab(B, r, w);
    const diffs = [];
    if (a.rows.length !== n.rows.length) diffs.push(`element count ${a.rows.length} vs ${n.rows.length}`);
    const len = Math.min(a.rows.length, n.rows.length);
    for (let i = 0; i < len; i++) {
      const x = a.rows[i], y = n.rows[i];
      if (x.c !== y.c) { diffs.push(`#${i} class "${x.c}" vs "${y.c}"`); break; }
      const d = Math.max(Math.abs(x.x - y.x), Math.abs(x.y - y.y), Math.abs(x.w - y.w), Math.abs(x.h - y.h));
      if (d > MAX) diffs.push(`#${i} .${x.c} Δ${d.toFixed(1)} (${Math.round(x.x)},${Math.round(x.y)} ${Math.round(x.w)}x${Math.round(x.h)} vs ${Math.round(y.x)},${Math.round(y.y)} ${Math.round(y.w)}x${Math.round(y.h)})`);
      // Hidden in both (e.g. the closed lightbox): nothing is drawn, so styles cannot differ visibly.
      const hidden = x.s.split('|')[7] === 'none' && y.s.split('|')[7] === 'none';
      if (x.s !== y.s && !hidden) { const sa = x.s.split('|'), sb = y.s.split('|'); const k = STYLE.findIndex((_, j) => sa[j] !== sb[j]); diffs.push(`#${i} .${x.c} style ${STYLE[k]}: ${sa[k]} vs ${sb[k]}`); }
    }
    if (a.H !== n.H) diffs.push(`page height ${a.H} vs ${n.H}`);
    if (a.text !== n.text) diffs.push('visible text differs');
    for (const e of n.errs) diffs.push('B console: ' + e);
    for (const e of a.errs) diffs.push('A console: ' + e);
    results.push({ w, r, n: a.rows.length, diffs });
    if (LOG) appendFileSync(LOG, JSON.stringify({ w, r, n: a.rows.length, diffs }) + '\n');
    console.log(`${diffs.length ? '!!' : 'ok'} ${w} ${r} (${a.rows.length} elements)`);
    for (const d of diffs.slice(0, 12)) console.log('   ' + d);
    if (diffs.length) bad++;
    done++;
  }
}
await Promise.all(Array.from({ length: Number(process.env.PAR || 3) }, worker));
// Chromium ends with the process; no explicit close needed.
const all = new Map([...prior, ...results].map((x) => [`${x.w} ${x.r}`, x]));
bad = [...all.values()].filter((x) => x.diffs.length).length;
console.log(`\n${all.size - bad}/${all.size} route x width checks passed (${routes.length} routes x ${widths.length} widths: ${widths.join(', ')})`);
process.exit(bad ? 1 : 0);
