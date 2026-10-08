import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import siteEntries from '@/content/site.json';
import { renderMarkdown } from './markdown';

/**
 * Hand-written. The Next counterpart of Astro's content collections
 * (src/content.config.ts): the same getCollection / getEntry calls, reading the
 * same files, returning the same shape ({ id, data, body, rendered.html }).
 * Every generated page and component imports from here instead of 'astro:content'.
 */
export interface BlogData {
  order: number;
  title: string;
  date: Date;
  category: string;
  image: string;
  imageAlt: string;
}
export interface PropertyData {
  name: string;
  number: string;
  category: 'for sale' | 'for rent';
  image: string;
  imageAlt: string;
  secondaryImage: string;
  secondaryImageAlt: string;
  area: string;
  floors: string;
  bathrooms: string;
  bedrooms: string;
  location: string;
  buildYear: string;
  price: string;
  highlights: string[];
  nearby: { place: string; time: string }[];
  gallery: { bedroom: string[]; bathroom: string[]; kitchen: string[]; exterior: string[] };
}
interface Collections { blog: BlogData; properties: PropertyData }
export type CollectionEntry<C extends keyof Collections> = {
  id: string;
  collection: C;
  data: Collections[C];
  body: string;
  rendered: { html: string };
};

const DIR = join(process.cwd(), 'src', 'content');

// Same coercions and defaults as the zod schemas in the Astro build.
const shape = {
  blog: (d: any): BlogData => ({ ...d, date: new Date(d.date) }),
  properties: (d: any): PropertyData => ({
    ...d,
    floors: String(d.floors),
    bathrooms: String(d.bathrooms),
    bedrooms: String(d.bedrooms),
    gallery: { bedroom: [], bathroom: [], kitchen: [], exterior: [], ...d.gallery },
  }),
};

const cache = new Map<string, CollectionEntry<any>[]>();

export async function getCollection<C extends keyof Collections>(name: C): Promise<CollectionEntry<C>[]> {
  if (!cache.has(name)) {
    const dir = join(DIR, name);
    cache.set(name, readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .sort()
      .map((f) => {
        const { data, content } = matter(readFileSync(join(dir, f), 'utf8'));
        return { id: f.replace(/\.md$/, ''), collection: name, data: shape[name](data), body: content, rendered: { html: renderMarkdown(content) } };
      }));
  }
  return cache.get(name) as CollectionEntry<C>[];
}

/** src/content/site.json: one entry per id, as Astro's file() loader reads it. */
export async function getEntry(collection: 'site', id: string): Promise<{ id: string; data: any } | undefined> {
  const data = (siteEntries as any[]).find((e) => e.id === id);
  return data ? { id, data } : undefined;
}
