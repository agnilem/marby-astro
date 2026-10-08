// GENERATED from src/pages/404.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';
import Base from '@/layouts/Base';
import Btn from '@/components/Btn';
import { site } from '@/lib/site';

export default async function NotFound() {
  const nf = await site('notFound');

  return (
    <>
      <Base route="/404/" title="Page Not Found | Marby" description="The page you're looking for doesn't exist or has been moved." withForm={false} noindex>
        <section className="nf" data-dark="">
          <img className="nf__bg" src={nf.image} alt="" />
          <div className="scrim" aria-hidden="true"></div>
          <div className="container nf__inner">
            <h1 className="nf__title" data-appear="mount">{nf.title}</h1>
            <div className="nf__side">
              <p className="t-caption2 c-200" data-appear="mount" style={sx("--appear-delay:0.1s")}>{nf.text}</p>
              <div data-appear="mount" style={sx("--appear-delay:0.2s")}><Btn label={nf.cta.label} href={nf.cta.href} variant="secondary" /></div>
            </div>
          </div>
        </section>
      </Base>
    </>
  );
}
