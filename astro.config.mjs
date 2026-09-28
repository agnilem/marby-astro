import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://marby.startfrom.co',
  devToolbar: { enabled: false },
  // Keep the copy's straight quotes exactly as written.
  markdown: { smartypants: false },
});
