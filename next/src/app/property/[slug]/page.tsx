// GENERATED from src/pages/property/[slug].astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { cx } from '@/lib/cx';
import { sx } from '@/lib/sx';
import Base from '@/layouts/Base';
import Btn from '@/components/Btn';
import Icon from '@/components/Icon';
import Faq from '@/components/sections/Faq';
import { getCollection } from '@/lib/content';
import { site } from '@/lib/site';

async function getStaticPaths() {
  const items = await getCollection('properties');
  return items.map((p) => ({ params: { slug: p.id }, props: { p } }));
}

export async function generateStaticParams() {
  return (await getStaticPaths()).map((p) => p.params);
}


export default async function Slug({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: requested } = await params;
  const { p } = ((await getStaticPaths()).find((p) => p.params.slug === requested)!.props) as any;
  const d = p.data;
  const prop = await site('property');
  const settings = await site('settings');
  const L = prop.labels;
  const specs = [
    [L.area, d.area], [L.floors, d.floors], [L.bathrooms, d.bathrooms], [L.bedrooms, d.bedrooms],
    [L.location, d.location], [L.buildYear, d.buildYear], [L.price, d.price],
  ];
  const rooms = (['bedroom', 'bathroom', 'kitchen', 'exterior'] as const).filter((r) => d.gallery[r].length);
  const map = `https://maps.google.com/maps?q=${encodeURIComponent(d.location)}&z=15&output=embed`;

  return (
    <>
      <Base route={`/property/${requested}/`}
        title={`${d.name} — Marby Real Estate`}
        description={`${d.name} in ${d.location}. ${d.area}, ${d.buildYear}. View full details, gallery, and schedule a private showing.`}
        image={d.image}
      >
        <section className="pd">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a className="t-body-sm link" href="/property">{L.crumb}</a>
            <span className="t-body-sm c-300">/</span>
            <span className="t-body-sm c-900 crumbs__current">{d.name}</span>
          </nav>

          <div className="pd__main">
            <div className="pd__name" data-appear="mount">
              <h1 className="t-h1">{d.name}</h1>
              <p className="t-caption2">{d.number}</p>
            </div>

            <div className="pd__top">
              <div className="pd__img1" data-appear="mount" style={sx("--appear-delay:0.1s")}>
                <img src={d.image} alt={d.imageAlt} />
                <span className="pd__chip t-body-sm">{d.category}</span>
              </div>
              <div className="pd__side">
                <div className="pd__img2" data-appear="mount" style={sx("--appear-delay:0.2s")}>
                  <img src={d.secondaryImage} alt={d.secondaryImageAlt} />
                  {rooms.length > 0 && (
                    <button className="viewall" type="button" data-gallery-open="">
                      <svg width="15" height="15" viewBox="0 0 15 15" aria-hidden="true"><rect x="0.5" y="0.5" width="11" height="11" rx="2.5" fill="none" stroke="currentColor" /><path d="M3.5 14.5h8a3 3 0 0 0 3-3v-8" fill="none" stroke="currentColor" strokeLinecap="round" /></svg>
                      <span className="t-body-sm c-900">{L.viewAll}</span>
                    </button>
                  )}
                </div>
                <dl className="specs" data-appear="mount" style={sx("--appear-delay:0.3s")}>
                  {specs.map(([k, v]) => (
                    <div className="specs__row"><dt className="t-caption2">{k}</dt><dd className="t-body-sm c-900">{v}</dd></div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="pd__content">
              <div className="pd__left">
                <nav className="jump" data-jump="" data-jump-offset="140" aria-label="Sections" data-appear="" style={sx("--appear-y:150px")}>
                  <a className="jump__link t-body-sm is-active" href="#overview">{L.overview}</a>
                  <a className="jump__link t-body-sm" href="#highlights">{L.highlights}</a>
                  <a className="jump__link t-body-sm" href="#location">{L.locationTitle}</a>
                </nav>
                <div className="prose pd__desc" id="overview" data-appear="" style={sx("--appear-y:150px")} dangerouslySetInnerHTML={{ __html: p.rendered?.html }} />
                <div className="pd__block" id="highlights" data-appear="" style={sx("--appear-y:150px")}>
                  <h2 className="t-h5 pd__label">{L.highlights}</h2>
                  <ul className="hl">
                    {[0, 2, 4, 1, 3, 5].map((i) => d.highlights[i]).filter(Boolean).map((h) => (
                      <li className="hl__item"><span className="hl__check"><Icon name="check" /></span><span className="t-caption2 c-900">{h}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="pd__block" id="location" data-appear="" style={sx("--appear-y:150px")}>
                  <h2 className="t-h5 pd__label">{L.locationTitle}</h2>
                  <iframe className="pd__map" src={map} title={`Map of ${d.location}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  <dl className="near">
                    {d.nearby.map((n) => (
                      <div className="near__row"><dt className="t-caption2">{n.place}</dt><dd className="t-body-sm c-900">{n.time}</dd></div>
                    ))}
                  </dl>
                </div>
              </div>

              <aside className="pd__aside">
                <div className="advisor" data-appear="" style={sx("--appear-ease:var(--ease-inout)")}>
                  <img className="advisor__img" src={prop.advisor.image} alt={prop.advisor.imageAlt} loading="lazy" />
                  <div className="advisor__body">
                    <div className="advisor__name">
                      <p className="t-caption2">{prop.advisor.label}</p>
                      <p className="t-h5">{prop.advisor.name}</p>
                    </div>
                    <div className="advisor__contact">
                      <a className="t-body-sm c-900" href={`tel:${prop.advisor.phone.replace(/[^+\d]/g, '')}`}>{prop.advisor.phone}</a>
                      <a className="t-body-sm c-900" href={`mailto:${prop.advisor.email}`}>{prop.advisor.email}</a>
                    </div>
                  </div>
                </div>
                <div className="quiet" data-appear="" style={sx("--appear-ease:var(--ease-inout)")}>
                  <div className="quiet__name">
                    <p className="t-caption2 c-300">{prop.quietList.label}</p>
                    <p className="t-body-lg c-50">{prop.quietList.text}</p>
                  </div>
                  <Btn label={prop.quietList.cta.label} href={prop.quietList.cta.href} variant="secondary" />
                </div>
              </aside>
            </div>
          </div>
        </section>

        <Faq set="property" imageAlt={prop.faqImageAlt} fill tightPhone rowOnTablet />

        {rooms.length > 0 && (
          <div className="gallery" hidden data-gallery="" role="dialog" aria-modal="true" aria-label={`${d.name} photos`}>
            <div className="gallery__popup" data-jump-scroller="" data-lenis-prevent="">
              <div className="gallery__top">
                <div className="gallery__bar">
                  <button className="gallery__close" type="button" aria-label="Close gallery" data-gallery-close=""><Icon name="close" size={24} /></button>
                  <Btn label={settings.consultation.label} href={settings.consultation.href} />
                </div>
                <nav className="jump jump--modal" data-jump="" data-jump-offset="170" aria-label="Rooms">
                  {rooms.map((r, i) => <a className={cx(['jump__link t-body-sm', { 'is-active': i === 0 }])} href={`#${r}`}>{L.rooms[r]}</a>)}
                </nav>
              </div>
              {rooms.map((r) => (
                <section className={cx(['room', `room--${r}`])} id={r}>
                  <h3 className="t-h3">{L.rooms[r]}</h3>
                  <div className="room__grid">
                    {d.gallery[r].map((src) => <img src={src} alt={`${d.name}, ${L.rooms[r]}`} loading="lazy" data-lightbox="" />)}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}
      </Base>
    </>
  );
}
