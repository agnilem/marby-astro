import Lenis from 'lenis';
import { reduced } from './motion';

/** Smooth scrolling, as the design's Smooth Scroll component. Off under reduced motion. */
export let lenis: Lenis | null = null;

export function initSmooth() {
  if (reduced) return;
  lenis = new Lenis({ lerp: 0.1, autoRaf: true, anchors: { offset: 0 } });
}

export const lockScroll = (on: boolean) => {
  if (lenis) on ? lenis.stop() : lenis.start();
  document.documentElement.style.overflow = on ? 'hidden' : '';
};
