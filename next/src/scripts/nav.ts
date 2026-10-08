import { lockScroll } from './smooth';

/** Overlay menu plus the caption that flips colour over dark sections. */
export function initNav() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!nav || !menu) return;
  const openBtn = nav.querySelector<HTMLButtonElement>('[data-menu-open]')!;

  const open = () => {
    menu.hidden = false;
    lockScroll(true);
    openBtn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-open')));
    menu.querySelector<HTMLElement>('[data-menu-close]')?.focus();
  };
  const close = () => {
    menu.classList.remove('is-open');
    menu.hidden = true;
    lockScroll(false);
    openBtn.setAttribute('aria-expanded', 'false');
    openBtn.focus();
  };

  nav.addEventListener('click', (e) => {
    if ((e.target as Element).closest('[data-stop]')) return;
    open();
  });
  menu.querySelector('[data-menu-close]')?.addEventListener('click', close);
  menu.addEventListener('click', (e) => {
    const t = e.target as Element;
    if (t === menu || t.closest('a')) close();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) close(); });

  // Caption colour: light while the bar sits over a [data-dark] section.
  const tag = nav.querySelector<HTMLElement>('[data-invert]');
  const darks = [...document.querySelectorAll<HTMLElement>('[data-dark]')];
  if (!tag) return;
  const probe = () => {
    const r = tag.getBoundingClientRect();
    const y = r.top + r.height / 2;
    tag.classList.toggle('is-light', darks.some((d) => { const b = d.getBoundingClientRect(); return b.top <= y && b.bottom >= y; }));
  };
  probe();
  addEventListener('scroll', probe, { passive: true });
  addEventListener('resize', probe);
}
