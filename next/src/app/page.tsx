// GENERATED from src/pages/index.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import Base from '@/layouts/Base';
import Hero from '@/components/sections/Hero';
import HomeAbout from '@/components/sections/HomeAbout';
import Services from '@/components/sections/Services';
import Listings from '@/components/sections/Listings';
import Testimonials from '@/components/sections/Testimonials';
import Features from '@/components/sections/Features';
import Team from '@/components/sections/Team';
import Faq from '@/components/sections/Faq';

export default function Index() {
  return (
    <>
      <Base route="/"
        title="Marby — Luxury Real Estate"
        description="Discover luxury properties and find your dream home with Marby's expert real estate team. Marby is a real estate template built with Astro."
      >
        <Hero />
        <HomeAbout />
        <Services />
        <Listings />
        <Testimonials />
        <Features />
        <Team />
        <Faq />
      </Base>
    </>
  );
}
