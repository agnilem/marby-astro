'use client';

import { useEffect } from 'react';

/**
 * Mounts the site's behaviour: the same script modules the Astro build runs
 * (src/scripts), loaded after hydration. They read the DOM React rendered and
 * enhance it, so every page is complete before any of this runs.
 */
export default function Scripts() {
  useEffect(() => {
    import('@/scripts/entry');
  }, []);
  return null;
}
