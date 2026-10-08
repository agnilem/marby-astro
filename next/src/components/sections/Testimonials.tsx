// GENERATED from src/components/sections/Testimonials.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { cx } from '@/lib/cx';
import Icon from '@/components/Icon';
import { site } from '@/lib/site';

export default async function Testimonials() {
  const { testimonials } = await site('home');
  const n = testimonials.items.length;

  return (
    <>
      <section className="reviews">
        <div className="container reviews__inner">
          <p className="t-caption2" data-appear="">{testimonials.label}</p>
          <div className="reviews__slider" data-reviews="">
            <div className="reviews__slides">
              {testimonials.items.map((r: any, i: number) => (
                <article className={cx(['review', { 'is-active': i === 0 }])} data-review="" aria-hidden={i !== 0 ? 'true' : 'false'}>
                  <div className="review__images">
                    <div className="review__stack">
                      <img className="review__img review__img--grow" src={r.images[0]} alt="" loading="lazy" />
                      <img className="review__img review__img--small" src={r.images[1]} alt="" loading="lazy" />
                    </div>
                    <img className="review__img review__img--tall" src={r.images[2]} alt="" loading="lazy" />
                  </div>
                  <div className="review__content">
                    <blockquote className="t-h5 review__quote">{r.quote}</blockquote>
                    <div className="review__who">
                      <p className="t-body-lg">{r.name}</p>
                      <p className="review__loc t-caption"><Icon name="pin" className="c-600" />{r.location}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="reviews__progress">
              <div className="reviews__bars">
                {testimonials.items.map((_: any, i: number) => (
                  <button className={cx(['reviews__bar', { 'is-active': i === 0 }])} type="button" aria-label={`Show review ${i + 1}`} data-review-bar=""><span></span></button>
                ))}
              </div>
              <p className="reviews__count">/{n}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
