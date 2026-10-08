// GENERATED from src/components/sections/Faq.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { cx } from '@/lib/cx';
import { sx } from '@/lib/sx';
import Btn from '@/components/Btn';
import QuestionRow from '@/components/ui/QuestionRow';
import { site } from '@/lib/site';

interface Props { set?: 'general' | 'property'; imageAlt?: string; fill?: boolean; tightPhone?: boolean; rowOnTablet?: boolean }

export default async function Faq({ set = 'general', imageAlt, fill = false, tightPhone = false, rowOnTablet = false }: Props) {
  const faq = await site('faq');
  const items = faq[set];

  return (
    <>
      <section className={cx(['faq', { 'faq--tight': tightPhone, 'faq--row': rowOnTablet }])}>
        <div className="container faq__inner">
          <div className="faq__head">
            <div className="faq__title">
              <p className="t-caption2" data-appear="">{faq.label}</p>
              <h2 className="t-h2" data-appear="" style={sx("--appear-delay:0.1s")}>{faq.title}</h2>
            </div>
            <div className="faq__side">
              <p className="t-body-sm" data-appear="" style={sx("--appear-delay:0.2s")}>{faq.text}</p>
              <div data-appear="" style={sx("--appear-delay:0.3s")}><Btn label={faq.cta.label} href={faq.cta.href} /></div>
            </div>
          </div>
          <div className="faq__body">
            <div className="faq__list" data-accordion="">
              {items.map((it: any, i: number) => <QuestionRow n={i + 1} q={it.q} a={it.a} delay={0.4 + i * 0.1} />)}
            </div>
            <div className={cx(['faq__media', { 'faq__media--fill': fill }])} data-appear="" style={sx("--appear-delay:0.4s")}>
              <img className="faq__img" src={faq.image} alt={imageAlt ?? faq.imageAlt} loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
