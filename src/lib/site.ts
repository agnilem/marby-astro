import { getEntry } from 'astro:content';

/** Read one block of copy from src/content/site.json by its id. */
export async function site<T = any>(id: string): Promise<T> {
  const entry = await getEntry('site', id);
  if (!entry) throw new Error(`site.json has no entry with id "${id}"`);
  return entry.data as T;
}

/** "Apr 28, 2026", the medium date style the design uses. */
export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
