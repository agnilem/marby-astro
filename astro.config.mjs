import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://marby-astro.vercel.app',
  devToolbar: { enabled: false },
  // Keep the copy's straight quotes exactly as written.
  markdown: { smartypants: false },
});
