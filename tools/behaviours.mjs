// Exercise every interactive behaviour by script in several builds and compare
// what each one observes. usage: node tools/behaviours.mjs http://localhost:4520 http://localhost:4521 http://localhost:4522
import { chromium, executable } from './pw.mjs';
const bases = process.argv.slice(2);
const b = await chromium.launch({ executablePath: executable(), headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const tests = {
  async 'appear: mount + in-view reveals'(p) {
    await p.goto('/', { waitUntil: 'networkidle' });
    await wait(300);
    const mount = await p.$$eval('[data-appear="mount"]', (els) => els.map((e) => e.classList.contains('is-in')));
    const before = await p.$$eval('[data-appear]:not([data-appear="mount"])', (els) => els.filter((e) => e.classList.contains('is-in')).length);
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 500) { await p.evaluate((v) => window.scrollTo(0, v), y); await wait(60); }
    await wait(300);
    const after = await p.$$eval('[data-appear]', (els) => [els.length, els.filter((e) => e.classList.contains('is-in')).length]);
    return { mount, beforeScroll: before, afterScroll: after };
  },
  async 'smooth scroll (Lenis) + video + ticker'(p) {
    await p.goto('/', { waitUntil: 'networkidle' });
    await wait(1500);
    const lenis = await p.evaluate(() => document.documentElement.className);
    const video = await p.$eval('.hero__video', (v) => ({ paused: v.paused, muted: v.muted, loop: v.loop }));
    await p.mouse.move(700, 400);
    await p.mouse.wheel(0, 600);
    await wait(80);
    const mid = await p.evaluate(() => scrollY);
    await wait(1200);
    const end = await p.evaluate(() => scrollY);
    const t1 = await p.$eval('.ticker__track', (t) => [getComputedStyle(t).animationName, getComputedStyle(t).animationDuration, t.parentElement.style.getPropertyValue('--loop')]);
    return { htmlClass: lenis, video, smoothing: mid > 0 && mid < end, endScroll: end, ticker: t1 };
  },
  async 'nav: menu open/close, caption colour'(p) {
    await p.goto('/', { waitUntil: 'networkidle' });
    await wait(200);
    const lightTop = await p.$eval('[data-invert]', (e) => e.classList.contains('is-light'));
    await p.click('[data-menu-open]');
    await wait(500);
    const open = await p.evaluate(() => ({ hidden: document.querySelector('[data-menu]').hidden, cls: document.querySelector('[data-menu]').className, expanded: document.querySelector('[data-menu-open]').getAttribute('aria-expanded'), overflow: document.documentElement.style.overflow, focus: document.activeElement?.getAttribute('aria-label'), itemOpacity: getComputedStyle(document.querySelector('.menu__item')).opacity }));
    await p.keyboard.press('Escape');
    await wait(100);
    const closed = await p.evaluate(() => ({ hidden: document.querySelector('[data-menu]').hidden, expanded: document.querySelector('[data-menu-open]').getAttribute('aria-expanded'), overflow: document.documentElement.style.overflow }));
    await p.click('.nav__col--menu', { position: { x: 200, y: 20 } });
    await wait(300);
    const barOpens = await p.evaluate(() => !document.querySelector('[data-menu]').hidden);
    await p.click('[data-menu-close]');
    await wait(100);
    await p.click('.nav__tag');
    await p.waitForLoadState('networkidle');
    const tagStops = await p.evaluate(() => document.querySelector('[data-menu]').hidden);
    await p.evaluate(() => window.scrollTo(0, document.querySelector('.about').offsetTop + 50));
    await wait(800);
    const lightOverWhite = await p.$eval('[data-invert]', (e) => e.classList.contains('is-light'));
    return { lightTop, open, closed, barOpens, tagStops, lightOverWhite };
  },
  async 'faq accordion (rows)'(p) {
    await p.goto('/', { waitUntil: 'networkidle' });
    const rows = await p.$$('.faq__list .qrow');
    await rows[0].scrollIntoViewIfNeeded();
    await rows[0].click();
    await wait(600);
    const s1 = await p.$$eval('.faq__list .qrow', (els) => els.map((e) => [e.classList.contains('is-open'), e.querySelector('button').getAttribute('aria-expanded'), e.querySelector('[data-acc-panel]').style.gridTemplateRows, Math.round(e.getBoundingClientRect().height)]));
    await rows[2].click();
    await wait(600);
    const s2 = await p.$$eval('.faq__list .qrow', (els) => els.map((e) => [e.classList.contains('is-open'), Math.round(e.getBoundingClientRect().height)]));
    await rows[2].click();
    await wait(600);
    const s3 = await p.$$eval('.faq__list .qrow', (els) => els.map((e) => e.classList.contains('is-open')));
    return { s1, s2, s3 };
  },
  async 'faq tiles (property list)'(p) {
    await p.goto('/property/', { waitUntil: 'networkidle' });
    const tiles = await p.$$('.qtile');
    await tiles[1].scrollIntoViewIfNeeded();
    await tiles[1].click();
    await wait(500);
    const s = await p.$$eval('.qtile', (els) => els.map((e) => [e.classList.contains('is-open'), getComputedStyle(e).backgroundColor, getComputedStyle(e.querySelector('.qtile__a')).display]));
    return { s };
  },
  async 'testimonials slider: bars + 7s autoplay'(p) {
    await p.goto('/', { waitUntil: 'networkidle' });
    const state = () => p.$$eval('[data-review]', (els) => els.map((e) => [e.classList.contains('is-active'), e.getAttribute('aria-hidden')]));
    const s0 = await state();
    const bars = await p.$$('[data-review-bar]');
    await bars[2].scrollIntoViewIfNeeded();
    await bars[2].click();
    const s1 = await state();
    const barCls = await p.$$eval('[data-review-bar]', (els) => els.map((e) => e.classList.contains('is-active')));
    await wait(6500);
    const s6 = await state();
    await wait(1000);
    const s7 = await state();
    return { s0, s1, barCls, at6_5s: s6, at7_5s: s7 };
  },
  async 'property filter: tabs + search + empty'(p) {
    await p.goto('/property/', { waitUntil: 'networkidle' });
    const vis = () => p.$$eval('[data-filter-item]', (els) => els.map((e) => !e.hidden));
    const pressed = () => p.$$eval('[data-filter-tab]', (els) => els.map((e) => e.getAttribute('aria-pressed')));
    const r = { all: await vis() };
    const tabs = await p.$$('[data-filter-tab]');
    await tabs[1].click(); r.tab1 = [await vis(), await pressed()];
    await tabs[2].click(); r.tab2 = [await vis(), await pressed()];
    await tabs[0].click();
    await p.fill('[data-filter-search]', 'holland'); r.search = await vis();
    await p.fill('[data-filter-search]', 'zzz'); r.none = [await vis(), await p.$eval('[data-filter-empty]', (e) => e.hidden)];
    return r;
  },
  async 'blog filter: category tabs'(p) {
    await p.goto('/blog/', { waitUntil: 'networkidle' });
    const r = {};
    const tabs = await p.$$('[data-filter-tab]');
    for (let i = 0; i < tabs.length; i++) { await tabs[i].click(); r[i] = await p.$$eval('[data-filter-item]', (els) => els.map((e) => !e.hidden).join('')) + ' empty:' + (await p.$eval('[data-filter-empty]', (e) => e.hidden)); }
    return r;
  },
  async 'property jump links'(p) {
    await p.goto('/property/greenwich-mews/', { waitUntil: 'networkidle' });
    const active = () => p.$$eval('.pd .jump__link', (els) => els.map((e) => e.classList.contains('is-active')));
    const a0 = await active();
    await p.click('.pd .jump__link[href="#location"]');
    await wait(2000);
    const a1 = await active();
    const y = await p.evaluate(() => Math.round(document.getElementById('location').getBoundingClientRect().top));
    return { a0, a1, locationTop: y };
  },
  async 'gallery modal + lightbox'(p) {
    await p.goto('/property/greenwich-mews/', { waitUntil: 'networkidle' });
    await p.click('[data-gallery-open]');
    await wait(500);
    const m1 = await p.$eval('[data-gallery]', (e) => [e.hidden, e.className, getComputedStyle(e).opacity, document.documentElement.style.overflow]);
    await p.click('.gallery .jump__link[href="#kitchen"]');
    await wait(1200);
    const jump = await p.$$eval('.gallery .jump__link', (els) => els.map((e) => e.classList.contains('is-active')));
    const img = await p.$('.room--kitchen img');
    await img.click();
    await wait(500);
    const lb = await p.$eval('.lightbox', (e) => [e.hidden, e.className, e.querySelector('img').getAttribute('src').replace(location.origin, ''), getComputedStyle(e).opacity]);
    await p.keyboard.press('Escape'); await wait(100);
    const lb2 = await p.$eval('.lightbox', (e) => e.hidden);
    const m2 = await p.$eval('[data-gallery]', (e) => e.hidden);
    await p.keyboard.press('Escape'); await wait(100);
    const m3 = await p.$eval('[data-gallery]', (e) => [e.hidden, document.documentElement.style.overflow]);
    return { m1, jump, lb, lb2, m2, m3 };
  },
  async 'contact form states (no endpoint)'(p) {
    await p.goto('/contact/', { waitUntil: 'networkidle' });
    const form = await p.$('[data-form]');
    await form.scrollIntoViewIfNeeded();
    const action = await form.getAttribute('action');
    await p.fill('[data-form] input[name="name"]', 'Test');
    await p.fill('[data-form] input[name="email"]', 'test@example.com');
    await p.click('[data-form] button[type="submit"]');
    const st = () => p.$eval('[data-form] button', (b) => [b.dataset.state, b.querySelector('.submit__label').textContent]);
    const s0 = await st();
    await wait(1200);
    const s1 = [...(await st()), await p.$eval('[data-form] input[name="email"]', (i) => i.value)];
    await wait(4000);
    const s2 = await st();
    return { action, s0, s1, s2 };
  },
  async 'hover: button arrow, property card bar, member photo'(p) {
    await p.goto('/', { waitUntil: 'networkidle' });
    await p.hover('.nav__col--cta .btn');
    await wait(600);
    const arrow = await p.$eval('.nav__col--cta .btn__icon', (e) => getComputedStyle(e).transform);
    const card = await p.$('.listings .pcard');
    await card.scrollIntoViewIfNeeded(); await card.hover(); await wait(600);
    const bar = await p.$eval('.listings .pcard .pcard__bar', (e) => getComputedStyle(e).opacity);
    return { arrow, bar };
  },
  async 'demo-only gating (badge, GA, analytics) off'(p) {
    await p.goto('/', { waitUntil: 'networkidle' });
    return await p.evaluate(() => ({ badge: document.querySelectorAll('.badge').length, ga: [...document.scripts].filter((s) => /googletagmanager|gtag/.test(s.src + s.textContent)).length, vercel: [...document.scripts].filter((s) => /_vercel|vercel-insights|speed-insights/.test(s.src)).length }));
  },
};

const out = {};
for (const base of bases) {
  out[base] = {};
  for (const [name, fn] of Object.entries(tests)) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, baseURL: base });
    const p = await ctx.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    try { out[base][name] = JSON.stringify(await fn(p)) + (errs.length ? ' ERR ' + errs.join(';') : ''); }
    catch (e) { out[base][name] = 'THREW ' + e.message.split('\n')[0]; }
    await ctx.close();
  }
}
let bad = 0;
for (const name of Object.keys(tests)) {
  const vals = bases.map((x) => out[x][name]);
  const same = vals.every((v) => v === vals[0]) && !/THREW|ERR/.test(vals[0]);
  if (!same) bad++;
  console.log(`${same ? 'same' : 'DIFF'}  ${name}\n      ${vals[0]}`);
  if (!same) vals.slice(1).forEach((v, i) => console.log(`   vs ${bases[i + 1]}: ${v}`));
}
console.log(`\n${Object.keys(tests).length - bad}/${Object.keys(tests).length} behaviours identical across ${bases.length} builds`);
process.exit(bad ? 1 : 0);
