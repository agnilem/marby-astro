import '@fontsource/urbanist/400.css';
import '@fontsource/urbanist/500.css';
import '@fontsource/onest/400.css';
import '@fontsource/onest/500.css';
import '@/styles/site.css';
import Scripts from './Scripts';

/**
 * Document shell only. Head tags and page chrome come from src/layouts/Base.tsx,
 * which every page renders, the way every Astro page renders Base.astro.
 * The inline script marks the document as scripted before first paint, so the
 * appear effects start hidden (same as Base.astro).
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');" }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
