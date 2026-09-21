/**
 * Tab + search filtering for the property and blog grids.
 * [data-filter] > [data-filter-tab=value|""] buttons, optional [data-filter-search],
 * and [data-filter-item][data-tags][data-name] cards, [data-filter-empty] message.
 */
export function initFilters() {
  document.querySelectorAll<HTMLElement>('[data-filter]').forEach((root) => {
    const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-filter-tab]')];
    const search = root.querySelector<HTMLInputElement>('[data-filter-search]');
    const items = [...root.querySelectorAll<HTMLElement>('[data-filter-item]')];
    const empty = root.querySelector<HTMLElement>('[data-filter-empty]');
    let tab = '';
    const apply = () => {
      const q = (search?.value ?? '').trim().toLowerCase();
      let shown = 0;
      for (const it of items) {
        const ok = (!tab || (it.dataset.tags ?? '').split('|').includes(tab)) && (!q || (it.dataset.name ?? '').toLowerCase().includes(q));
        it.hidden = !ok;
        if (ok) shown++;
      }
      if (empty) empty.hidden = shown > 0;
      tabs.forEach((t) => t.setAttribute('aria-pressed', String((t.dataset.filterTab ?? '') === tab)));
    };
    tabs.forEach((t) => t.addEventListener('click', () => { tab = t.dataset.filterTab ?? ''; apply(); }));
    search?.addEventListener('input', apply);
    apply();
  });
}
