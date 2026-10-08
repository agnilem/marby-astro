# Marby for Next.js

Next.js 16 (App Router, React 19, TypeScript), exported as a static site. Node 20.9 or later.

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static site in out/
npm start         # serve out/
```

## Where things are

| What | File |
| --- | --- |
| Properties | `src/content/properties/*.md` (frontmatter: specs, highlights, nearby places, gallery; body: description; the file name is the URL) |
| Blog articles | `src/content/blog/*.md` (`order`, `title`, `date`, `category`, `image`; the file name is the URL) |
| All other copy and links | `src/content/site.json` (navigation, footer, home sections, team, testimonials, FAQs, offices, about, terms) |
| Page titles and descriptions | the `<Base title description>` props in each page under `src/app/` |
| Colours, type scale, all styles | `src/styles/site.css` (tokens at the top) |
| Fonts | Urbanist and Onest from Fontsource, imported in `src/app/layout.tsx` |
| Images, hero video, favicon | `public/assets/`, `public/favicon.svg` |
| Pages | `src/app/` (`property/[slug]` and `blog/[slug]` are generated from the Markdown files) |
| Page sections | `src/components/sections/` |
| Property cards, article cards, FAQ rows and tiles | `src/components/ui/` |
| Nav and menu, footer and contact form, button, icons | `src/components/` |
| Head tags and page shell | `src/layouts/Base.tsx` |
| Markdown loading | `src/lib/content.ts`, `src/lib/markdown.ts` |
| Behaviour | `src/scripts/*.ts`, one module per behaviour, wired in `src/scripts/entry.ts` and mounted by `src/app/Scripts.tsx` |
| Sitemap and robots.txt | `src/app/sitemap.ts`, `src/app/robots.ts` |

Components are server components that render plain markup. Behaviour (menu, smooth scrolling with Lenis, reveals, FAQ accordions, testimonial slider, filters and search, jump links, gallery and lightbox, form states) is plain DOM TypeScript loaded once on the client, so every page is complete before any script runs.

Set your domain in `NEXT_PUBLIC_SITE_URL` (used for canonical, Open Graph and sitemap URLs).

## Environment variables

All optional and off by default.

| Variable | Effect |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your domain, e.g. `https://example.com`. |
| `NEXT_PUBLIC_FORM_ENDPOINT` | URL the contact form posts to (Formspree, Basin, ...). Unset, the form only shows its states. |
| `NEXT_PUBLIC_VERCEL_ANALYTICS=true` | Loads Vercel Web Analytics and Speed Insights. |
| `NEXT_PUBLIC_STORE_BADGE=true` | Shows the fixed store badge in the corner. |

## Deploy

Any static host. On Vercel, import the folder; it detects Next.js. Elsewhere, upload `out/`. URLs end in a slash (`/about-us/`), and `vercel.json` redirects the slashless form to it.

## License and credits

MIT. Fonts: Urbanist (The Urbanist Project Authors) and Onest (The Onest Project Authors), both under the SIL Open Font License 1.1. Names, addresses and photos in the demo are placeholders; replace them with your own. The property map embeds Google Maps.
