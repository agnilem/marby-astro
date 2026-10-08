// GENERATED from src/pages/property/index.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';
import Base from '@/layouts/Base';
import Btn from '@/components/Btn';
import Icon from '@/components/Icon';
import PropertyCard from '@/components/ui/PropertyCard';
import QuestionTile from '@/components/ui/QuestionTile';
import { getCollection } from '@/lib/content';
import { site } from '@/lib/site';

export default async function Index() {
  const prop = await site('property');
  const faq = await site('faq');
  const L = prop.labels;
  const items = (await getCollection('properties')).sort((a, b) => a.data.number.localeCompare(b.data.number)).slice(0, 8);
  const categories = [...new Set(items.map((p) => p.data.category))].sort((a, b) => (a === 'for rent' ? -1 : 1));

  return (
    <>
      <Base route="/property/"
        title="Properties for Sale — Marby Real Estate"
        description="Browse our exclusive selection of luxury homes, apartments, and estates. Filter by location, size, and price to find the property that fits your vision."
      >
        <section className="phero" data-dark="">
          <img className="phero__bg" src={prop.hero.image} alt="" />
          <div className="phero__blur" aria-hidden="true"></div>
          <div className="container phero__inner">
            <h1 className="t-h1 c-50" data-appear="mount">{prop.hero.title}</h1>
          </div>
        </section>

        <section className="plist" data-filter="">
          <div className="container plist__inner">
            <div className="plist__bar">
              <div className="plist__tabs" role="group" aria-label="Filter by category" data-appear="" style={sx("--appear-delay:0.2s")}>
                <button className="tab" type="button" data-filter-tab="" aria-pressed="true">{L.all}</button>
                {categories.map((c) => <button className="tab" type="button" data-filter-tab={c} aria-pressed="false">{c}</button>)}
              </div>
              <label className="plist__search" data-appear="" style={sx("--appear-delay:0.3s")}>
                <span className="visually-hidden">Search properties</span>
                <Icon name="search" className="plist__search-icon" />
                <input type="search" placeholder={L.search} data-filter-search="" />
              </label>
            </div>
            <div className="plist__grid" data-appear="" style={sx("--appear-delay:0.4s")}>
              {items.map((p, i) => <PropertyCard p={p} eager={i < 2} />)}
              <p className="t-body-lg plist__empty" data-filter-empty="" hidden>{prop.empty}</p>
            </div>
          </div>
        </section>

        <section className="pfaq">
          <div className="pfaq__inner">
            <div className="pfaq__head">
              <div className="pfaq__title">
                <p className="t-caption2 c-500" data-appear="">{faq.gridLabel}</p>
                <h2 className="t-h1" data-appear="" style={sx("--appear-delay:0.1s")}>{faq.title}</h2>
              </div>
              <p className="t-body-sm pfaq__text" data-appear="" style={sx("--appear-delay:0.2s")}>{faq.text}</p>
            </div>
            <div className="pfaq__grid" data-accordion="">
              {faq.property.map((it: any, i: number) => <QuestionTile n={i + 1} q={it.q} a={it.a} delay={0.3 + i * 0.1} />)}
              <div className="pfaq__contact" data-appear="" style={sx(`--appear-delay:${0.3 + faq.property.length * 0.1}s`)}>
                <p className="t-body-lg">{faq.gridContact}</p>
                <Btn label={faq.cta.label} href={faq.cta.href} />
              </div>
            </div>
          </div>
        </section>
      </Base>
    </>
  );
}
