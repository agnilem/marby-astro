/**
 * FAQ accordions. One open at a time per group, as the original's shared store.
 * [data-accordion] wraps [data-acc-item] > [data-acc-trigger] + [data-acc-panel].
 */
export function initAccordions() {
  document.querySelectorAll<HTMLElement>('[data-accordion]').forEach((group) => {
    const items = [...group.querySelectorAll<HTMLElement>('[data-acc-item]')];
    const set = (item: HTMLElement, open: boolean) => {
      item.classList.toggle('is-open', open);
      item.querySelector('button')?.setAttribute('aria-expanded', String(open));
      const panel = item.querySelector<HTMLElement>('[data-acc-panel]');
      if (panel) panel.style.gridTemplateRows = open ? '1fr' : '0fr';
    };
    items.forEach((item) => {
      const trigger = item.matches('[data-acc-trigger]') ? item : item.querySelector('[data-acc-trigger]');
      trigger?.addEventListener('click', () => {
        const willOpen = !item.classList.contains('is-open');
        items.forEach((i) => set(i, false));
        set(item, willOpen);
      });
    });
  });
}
