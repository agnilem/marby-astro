// GENERATED from src/components/sections/HomeAbout.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';
import Btn from '@/components/Btn';
import { site } from '@/lib/site';

export default async function HomeAbout() {
  const { about } = await site('home');

  return (
    <>
      <section className="about section">
        <div className="container about__inner">
          <div className="about__top">
            <div className="about__col">
              <p className="t-caption2" data-appear="">{about.label}</p>
              <img className="about__img" src={about.image} alt={about.imageAlt} width="473" height="234" loading="lazy" data-appear="" style={sx("--appear-delay:0.1s;--appear-dur:var(--spring-04-dur);--appear-ease:var(--spring-04)")} />
            </div>
            <div className="about__col about__col--text">
              <h2 className="t-h2" data-appear="" style={sx("--appear-delay:0.2s")}>{about.title}</h2>
              <p className="t-body-sm" data-appear="" style={sx("--appear-delay:0.3s")}>{about.text}</p>
              <div data-appear="" style={sx("--appear-delay:0.4s")}><Btn label={about.cta.label} href={about.cta.href} /></div>
            </div>
          </div>
          <div className="about__stats">
            {about.stats.map((s: any, i: number) => (
              <div className="stat" data-appear="" style={sx(`--appear-delay:${0.5 + i * 0.1}s`)}>
                <p className="stat__label t-caption2">{s.label}</p>
                <div className="stat__row">
                  <p className="t-h2 stat__value">{s.value}</p>
                  <p className="t-caption">{s.index}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
