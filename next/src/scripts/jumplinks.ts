/** Segmented jump links: highlight the section currently under the sticky bar. */
export function initJumpLinks() {
  document.querySelectorAll<HTMLElement>('[data-jump]').forEach((bar) => {
    const links = [...bar.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
    const scroller = bar.closest<HTMLElement>('[data-jump-scroller]');
    const targets = links.map((a) => document.getElementById(a.hash.slice(1))).filter(Boolean) as HTMLElement[];
    const update = () => {
      const line = (scroller ? scroller.getBoundingClientRect().top : 0) + (Number(bar.dataset.jumpOffset) || 140);
      let current = 0;
      targets.forEach((t, k) => { if (t.getBoundingClientRect().top <= line) current = k; });
      links.forEach((a, k) => a.classList.toggle('is-active', k === current));
    };
    links.forEach((a) => a.addEventListener('click', (e) => {
      const t = document.getElementById(a.hash.slice(1));
      if (!t) return;
      e.preventDefault();
      if (scroller) scroller.scrollTo({ top: t.offsetTop - (Number(bar.dataset.jumpOffset) || 0), behavior: 'smooth' });
      else t.scrollIntoView({ behavior: 'smooth' });
    }));
    (scroller ?? window).addEventListener('scroll', update, { passive: true });
    update();
  });
}
