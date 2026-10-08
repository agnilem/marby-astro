import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://marby-next.startfrom.co';

/** Hand-written: the Next counterpart of src/pages/robots.txt.ts in the Astro build. */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${SITE}/sitemap.xml` };
}
