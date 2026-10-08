// GENERATED from src/components/sections/Features.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';
import Btn from '@/components/Btn';
import { site } from '@/lib/site';

export default async function Features() {
  const { features } = await site('home');

  return (
    <>
      <section className="features" data-dark="">
        <img className="features__bg" src={features.image} alt="" loading="lazy" data-appear="" />
        <div className="container features__inner">
          <div className="features__head">
            <div className="features__title">
              <p className="t-caption2 c-200" data-appear="">{features.label}</p>
              <h2 className="t-h2 c-50" data-appear="" style={sx("--appear-delay:0.1s")}>{features.title}</h2>
            </div>
            <div className="features__side">
              <p className="t-body-sm c-200 balance features__text" data-appear="" style={sx("--appear-delay:0.2s")}>{features.text}</p>
              <div data-appear="" style={sx("--appear-delay:0.3s")}><Btn label={features.cta.label} href={features.cta.href} variant="secondary" /></div>
            </div>
          </div>
          <div className="features__grid" data-appear="" style={sx("--appear-delay:0.4s")}>
            {features.items.map((f: any) => (
              <div className="fcard">
                <h3 className="t-h5 c-50">{f.title}</h3>
                <p className="t-body-sm c-50 fcard__text">{f.text}</p>
                <p className="t-caption c-50 fcard__num">{f.number}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
