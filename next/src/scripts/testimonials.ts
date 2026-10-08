import { reduced } from './motion';

/** Review slider: three slides, progress bars, advances every 7 seconds. */
export function initTestimonials() {
  document.querySelectorAll<HTMLElement>('[data-reviews]').forEach((root) => {
    const slides = [...root.querySelectorAll<HTMLElement>('[data-review]')];
    const bars = [...root.querySelectorAll<HTMLButtonElement>('[data-review-bar]')];
    let i = 0;
    let timer = 0;
    const show = (n: number) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => { s.classList.toggle('is-active', k === i); s.setAttribute('aria-hidden', String(k !== i)); });
      bars.forEach((b, k) => b.classList.toggle('is-active', k === i));
      clearTimeout(timer);
      if (!reduced) timer = window.setTimeout(() => show(i + 1), 7000);
    };
    bars.forEach((b, k) => b.addEventListener('click', () => show(k)));
    show(0);
  });
}
