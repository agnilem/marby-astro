// GENERATED from src/components/sections/Services.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';
import Btn from '@/components/Btn';
import { site } from '@/lib/site';

export default async function Services() {
  const { services } = await site('home');

  return (
    <>
      <section className="services">
        <div className="container services__inner">
          <div className="services__head">
            <p className="t-caption2" data-appear="">{services.label}</p>
            <h2 className="t-h2" data-appear="" style={sx("--appear-delay:0.1s")}>{services.title}</h2>
          </div>
          <div className="services__stack">
            {services.items.map((s: any, i: number) => (
              <a className="svc hover-target" href={s.href} data-appear={i === 0 ? '' : undefined} style={sx(i === 0 ? '--appear-delay:0.2s;--appear-ease:var(--ease-inout)' : undefined)}>
                <img className="svc__img" src={s.image} alt="Service card property image" loading="lazy" />
                <div className="svc__card">
                  <div className="svc__progress">
                    <span className="svc__line"></span>
                    <span className="svc__count">{s.counter}</span>
                  </div>
                  <p className="t-body-sm c-300">{s.label}</p>
                  <h3 className="t-h3">{s.title}</h3>
                  <div className="svc__text"><p className="t-body-sm">{s.text}</p></div>
                  <Btn label={s.button} variant="secondary" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
