// GENERATED from src/components/sections/Offices.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { cx } from '@/lib/cx';
import { sx } from '@/lib/sx';
import Btn from '@/components/Btn';
import { site } from '@/lib/site';

export default async function Offices() {
  const contact = await site('contact');
  const n = contact.offices.length;

  return (
    <>
      <section className="offices" data-appear="mount" style={sx("--appear-delay:0.6s;--appear-y:150px")}>
        {contact.offices.map((o: any, i: number) => (
          <div className="office" data-dark="">
            <picture>
              {o.imagePhone && <source media="(max-width: 809.98px)" srcSet={o.imagePhone} />}
              <img className="office__bg" src={o.image} alt={contact.labels.image} loading={i === 0 ? 'eager' : 'lazy'} />
            </picture>
            <div className="office__inner">
              <div className="ocard">
                <div className="ocard__progress">
                  <div className="ocard__bars">
                    {Array.from({ length: n }, (_, k) => <span className={cx({ 'is-active': k === i })}></span>)}
                  </div>
                  <p className="t-body c-50">{o.counter}</p>
                </div>
                <div className="ocard__name">
                  <p className="t-caption2 c-200">{o.label}</p>
                  <h2 className="t-h3 c-50">{o.city}</h2>
                </div>
                <div className="ocard__details">
                  <p className="t-body-sm c-200 ocard__text">{o.text}</p>
                  <div className="ocard__pair">
                    <div><p className="t-caption2 c-300">{contact.labels.address}</p><p className="t-body-sm c-50">{o.address[0]}<br />{o.address[1]}</p></div>
                    <div><p className="t-caption2 c-300">{contact.labels.hours}</p><div className="ocard__hours">{o.hours.map((h: string) => <p className="t-body-sm c-50">{h}</p>)}</div></div>
                  </div>
                  <div className="ocard__pair">
                    <div><p className="t-caption2 c-300">{contact.labels.phone}</p><a className="t-body-sm c-50" href={`tel:${o.tel}`}>{o.phone}</a></div>
                    <div><p className="t-caption2 c-300">{contact.labels.email}</p><a className="t-body-sm c-50" href={`mailto:${o.email}`}>{o.email}</a></div>
                  </div>
                </div>
                <Btn label={contact.cta.label} href={contact.cta.href} variant="secondary" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
