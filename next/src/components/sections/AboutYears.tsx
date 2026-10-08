// GENERATED from src/components/sections/AboutYears.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';
import { site } from '@/lib/site';

export default async function AboutYears() {
  const { years } = await site('about');

  return (
    <>
      <section className="years">
        <div className="years__inner">
          <div className="years__head">
            <p className="t-caption2 years__label" data-appear="">{years.label}</p>
            <p className="t-body-sm years__text" data-appear="" style={sx("--appear-delay:0.1s")}>{years.text}</p>
          </div>
          <div className="years__row">
            {years.milestones.map((m: any, i: number) => (
              <div className="mcard" data-appear="" style={sx(`--appear-delay:${0.2 + i * 0.1}s`)}>
                <p className="t-caption2 mcard__title">{m.title}</p>
                <p className="t-body-sm mcard__text">{m.text}</p>
                <p className="t-h2">{m.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
