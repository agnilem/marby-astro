import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// One Markdown file per property. The body is the description; everything
// else (specs, highlights, nearby places, gallery groups) is frontmatter.
const properties = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/properties', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    name: z.string(),
    number: z.string(),
    category: z.enum(['for sale', 'for rent']),
    image: z.string(),
    imageAlt: z.string(),
    secondaryImage: z.string(),
    secondaryImageAlt: z.string(),
    area: z.string(),
    floors: z.coerce.string(),
    bathrooms: z.coerce.string(),
    bedrooms: z.coerce.string(),
    location: z.string(),
    buildYear: z.string(),
    price: z.string(),
    highlights: z.array(z.string()).max(6),
    nearby: z.array(z.object({ place: z.string(), time: z.string() })),
    gallery: z.object({
      bedroom: z.array(z.string()).default([]),
      bathroom: z.array(z.string()).default([]),
      kitchen: z.array(z.string()).default([]),
      exterior: z.array(z.string()).default([]),
    }),
  }),
});

// One Markdown file per article. The filename is the URL slug.
const blog = defineCollection({
  // Filenames become URLs verbatim, so a slug like `rent-vs.-flip` keeps its dot.
  loader: glob({ pattern: '*.md', base: './src/content/blog', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    image: z.string(),
    imageAlt: z.string(),
  }),
});

// Everything repeated across pages: navigation, footer, FAQs, team,
// testimonials, services, features, offices, milestones, beliefs.
const site = defineCollection({
  loader: file('./src/content/site.json'),
  schema: z.any(),
});

export const collections = { properties, blog, site };
