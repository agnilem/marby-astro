# Marby: real estate theme for Astro and Next.js

Two builds of the same site, a boutique real estate brokerage called Marby. Pick one. They are visually identical, and that is checked element by element on every page at desktop, tablet and phone widths.

| Folder | Stack | Use it when |
| --- | --- | --- |
| `astro/` | Astro 7, static output | You want components and almost no JavaScript. |
| `next/` | Next.js 16, App Router, static export | You already work in React. |

Each folder has its own README with commands and the files to edit.

## Pages

Home, About us, Properties (tabs and search), one page per property with a photo gallery, Blog (category filters), one page per article, Contact, Terms & Conditions and a 404.

## Content

- Properties and articles are Markdown files in `src/content/properties/` and `src/content/blog/`. Add a file to add a page.
- All other copy, links and contact details are in `src/content/site.json`.
- Colours and the type scale are CSS custom properties in `src/styles/tokens.css` (Next: `src/styles/site.css`, top of the file).

## Licence

MIT, see `LICENSE`. Fonts: Urbanist and Onest, both under the SIL Open Font License 1.1. Names, addresses and photos in the demo are placeholders; replace them with your own.
