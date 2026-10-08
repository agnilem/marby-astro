// GENERATED from src/components/sections/Listings.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';
import Btn from '@/components/Btn';
import PropertyCard from '@/components/ui/PropertyCard';
import { getCollection } from '@/lib/content';
import { site } from '@/lib/site';

export default async function Listings() {
  const { listings } = await site('home');
  const all = (await getCollection('properties')).sort((a, b) => a.data.number.localeCompare(b.data.number));
  const items = all.slice(0, listings.count);

  return (
    <>
      <section className="listings">
        <div className="container listings__inner">
          <div className="section-head">
            <div className="section-head__title">
              <p className="t-caption2" data-appear="">{listings.label}</p>
              <h2 className="t-h2" data-appear="" style={sx("--appear-delay:0.1s")}>{listings.title}</h2>
            </div>
            <div data-appear="" style={sx("--appear-delay:0.2s")}><Btn label={listings.cta.label} href={listings.cta.href} /></div>
          </div>
          <div className="listings__grid" data-appear="" style={sx("--appear-delay:0.3s")}>
            {items.map((p) => <PropertyCard p={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
