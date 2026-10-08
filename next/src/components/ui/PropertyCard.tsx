// GENERATED from src/components/ui/PropertyCard.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import Icon from '@/components/Icon';
import type { CollectionEntry } from '@/lib/content';

interface Props { p: CollectionEntry<'properties'>; eager?: boolean }

export default function PropertyCard({ p, eager = false }: Props) {
  const d = p.data;
  const rows = [['AREA', d.area], ['LOCATION', d.location], ['BEDROOMS', d.bedrooms], ['PRICE', d.price]];

  return (
    <>
      <a className="pcard" href={`/property/${p.id}`} data-filter-item="" data-tags={d.category} data-name={d.name}>
        <div className="pcard__media">
          <img src={d.image} alt={d.imageAlt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
          <div className="pcard__bar">
            <span className="pcard__chip t-body-sm c-900">{d.category}</span>
            <span className="btn btn--icon" aria-hidden="true"><span className="btn__icon"><Icon name="arrow" /></span></span>
          </div>
        </div>
        <div className="pcard__name">
          <h3 className="t-h5">{d.name}</h3>
          <p className="t-caption">{d.number}</p>
        </div>
        <dl className="pcard__list">
          {rows.map(([k, v]) => (
            <div className="pcard__row">
              <dt className="t-caption2">{k}</dt>
              <dd className="t-body-sm c-900">{v}</dd>
            </div>
          ))}
        </dl>
      </a>
    </>
  );
}
