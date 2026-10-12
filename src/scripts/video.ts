/**
 * Background videos marked with data-src show their poster first and start
 * once the page has finished loading, so the film never competes with the
 * first paint for bandwidth.
 */
export function initDeferredVideos(root: ParentNode = document) {
  const videos = [...root.querySelectorAll<HTMLVideoElement>('video[data-src]')];
  if (!videos.length) return;
  const start = () => {
    for (const v of videos) {
      v.src = v.dataset.src!;
      v.muted = true;
      v.autoplay = true;
      v.play().catch(() => {});
    }
  };
  if (document.readyState === 'complete') start();
  else addEventListener('load', start, { once: true });
}
