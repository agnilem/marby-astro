import { lockScroll } from './smooth';

/** Property photo modal ("view all") plus a lightbox for any [data-lightbox] image. */
export function initGallery() {
  const modal = document.querySelector<HTMLElement>('[data-gallery]');
  document.querySelectorAll('[data-gallery-open]').forEach((b) => b.addEventListener('click', () => {
    if (!modal) return;
    modal.hidden = false;
    lockScroll(true);
    requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('is-open')));
  }));
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.hidden = true;
    lockScroll(false);
  };
  modal?.querySelector('[data-gallery-close]')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // Lightbox
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.innerHTML = '<img alt="" />';
  document.body.append(box);
  const img = box.querySelector('img')!;
  document.querySelectorAll<HTMLImageElement>('[data-lightbox]').forEach((el) => el.addEventListener('click', () => {
    img.src = el.currentSrc || el.src;
    img.alt = el.alt;
    box.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => box.classList.add('is-open')));
  }));
  box.addEventListener('click', () => { box.classList.remove('is-open'); box.hidden = true; });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!box.hidden) { box.classList.remove('is-open'); box.hidden = true; }
    else if (modal && !modal.hidden) closeModal();
  });
}
