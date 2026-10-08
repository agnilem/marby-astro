// GENERATED from src/components/sections/AboutBeliefs.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';
import { site } from '@/lib/site';

export default async function AboutBeliefs() {
  const { beliefs } = await site('about');

  return (
    <>
      <section className="beliefs">
        <div className="beliefs__inner">
          <div className="beliefs__head">
            <p className="t-caption2" data-appear="">{beliefs.label}</p>
            <h2 className="t-h2" data-appear="" style={sx("--appear-delay:0.1s")}>{beliefs.title}</h2>
          </div>
          <div className="beliefs__body" data-appear="" style={sx("--appear-delay:0.2s")}>
            <div className="beliefs__sticky">
              <img src={beliefs.image} alt={beliefs.imageAlt} loading="lazy" />
            </div>
            <div className="beliefs__cards">
              {beliefs.items.map((b: any) => (
                <div className="scard">
                  <p className="t-caption">{b.label}</p>
                  <h3 className="t-h4">{b.title}</h3>
                  <div className="scard__text"><p className="t-body-sm">{b.text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
