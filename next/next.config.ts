import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep Turbopack from walking up past this folder looking for a workspace root.
  turbopack: { root: __dirname },
  output: 'export', // fully static, same as the Astro build
  trailingSlash: true, // /about-us/, like the Astro site
  images: { unoptimized: true },
};

export default nextConfig;
