// GENERATED from src/pages/terms-conditions.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';
import Base from '@/layouts/Base';
import PageHeader from '@/components/sections/PageHeader';
import { site } from '@/lib/site';

export default async function TermsConditions() {
  const t = await site('terms');

  return (
    <>
      <Base route="/terms-conditions/" title="Terms & Conditions | Marby" description="Read the terms and conditions for using the Marby website.">
        <PageHeader label={t.label} title={t.title} />
        <section className="terms" data-appear="mount" style={sx("--appear-delay:0.6s")}>
          <div className="terms__text">
            {t.sections.map((s: any) => (
              <div className="terms__block">
                <h2 className="terms__h">{s.title}</h2>
                {s.body.map((p: string) => <p className="t-body">{p}</p>)}
                {s.list && <ul className="terms__list">{s.list.map((li: string) => <li className="t-body">{li}</li>)}</ul>}
              </div>
            ))}
          </div>
        </section>
      </Base>
    </>
  );
}
