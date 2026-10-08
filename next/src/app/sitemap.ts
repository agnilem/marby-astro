import type { MetadataRoute } from 'next';
import { getCollection } from '@/lib/content';

export const dynamic = 'force-static';
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://marby-next.startfrom.co';

/** Hand-written: every page except the 404, with trailing slashes, like @astrojs/sitemap in the Astro build. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ['/', '/about-us/', '/blog/', '/contact/', '/property/', '/terms-conditions/'];
  const posts = (await getCollection('blog')).map((p) => `/blog/${p.id}/`);
  const properties = (await getCollection('properties')).map((p) => `/property/${p.id}/`);
  return [...pages, ...posts, ...properties].sort().map((p) => ({ url: new URL(p, SITE).href }));
}
