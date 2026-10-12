import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://marby.startfrom.co',
  // sitemap-index.xml for search engines; the 404 page is left out.
  integrations: [sitemap({ filter: (page) => !/\/404\/?$/.test(page) })],
  // The stylesheets are small, so they go inside the page instead of blocking the first paint as separate requests.
  build: { inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
  // Keep the copy's straight quotes exactly as written.
  markdown: { smartypants: false },
});
