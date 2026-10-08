// GENERATED from src/components/sections/AboutVision.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { cx } from '@/lib/cx';
import { sx } from '@/lib/sx';
import { site } from '@/lib/site';

export default async function AboutVision() {
  const { vision } = await site('about');

  return (
    <>
      <section className="vision" data-dark="" data-appear="mount" style={sx("--appear-delay:0.6s")}>
        <img className="vision__bg" src={vision.image} alt="" />
        <div className="container vision__inner">
          <div className="vision__head">
            <div className="vision__title">
              <p className="t-caption2 c-50">{vision.label}</p>
              <h2 className="t-h2 c-50">{vision.title}</h2>
            </div>
            <p className="t-body-sm c-200 balance vision__text">{vision.text}</p>
          </div>
          <div className="vision__cards">
            {vision.cards.map((c: any, i: number) => (
              <div className={cx(['vision__box', i === 0 ? 'vision__box--a' : 'vision__box--b'])}>
                <div className="vcard">
                  <h3 className="t-h3 c-50">{c.title}</h3>
                  <div className="vcard__text"><p className="t-body-sm c-200">{c.text}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
