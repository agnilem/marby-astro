import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import StoreBadge from '@/components/StoreBadge';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

/**
 * Hand-written counterpart of src/layouts/Base.astro: same props, same markup.
 * Head tags are rendered here and React hoists them into <head>, so each page
 * sets its own title, description and canonical exactly as Astro does. Next
 * adds the charset and viewport meta itself; the font stylesheets and the
 * "js" class script live in src/app/layout.tsx.
 */
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://marby-next.startfrom.co';

interface Props {
  /** The page path, with its trailing slash. The generator passes it. */
  route?: string;
  title: string;
  description: string;
  image?: string;
  withForm?: boolean;
  noindex?: boolean;
  children?: React.ReactNode;
}

export default function Base({ route = '/', title, description, image = '/assets/site/TBN2T3SDKf7U2Zk9enRTbFXuNo.webp', withForm = true, noindex = false, children }: Props) {
  const canonical = new URL(route, SITE).href;
  const ogImage = new URL(image, SITE).href;
  const analytics = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === 'true';
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      {noindex && <meta name="robots" content="noindex" />}
      <Nav />
      <main>{children}</main>
      <Footer withForm={withForm} />
      <StoreBadge />
      {analytics && <Analytics />}
      {analytics && <SpeedInsights />}
      <GoogleAnalytics />
    </>
  );
}
