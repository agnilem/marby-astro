// GENERATED from src/components/Footer.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';
import Btn from '@/components/Btn';
import Icon from '@/components/Icon';
import { site } from '@/lib/site';

interface Props { withForm?: boolean }

export default async function Footer({ withForm = true }: Props) {
  const s = await site('settings');
  const c = s.contact;
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '';

  return (
    <>
      {withForm && (
        <section className="contact" data-dark="">
          <img className="contact__bg" src={c.image} alt="" loading="lazy" decoding="async" />
          <div className="contact__scrim" aria-hidden="true"></div>
          <div className="container contact__inner">
            <div className="contact__head">
              <div className="contact__title">
                <p className="t-caption2 c-50" data-appear="">{c.label}</p>
                <h2 className="t-h2 c-50" data-appear="" style={sx("--appear-delay:0.1s")}>{c.title}</h2>
              </div>
              <p className="t-body-sm c-50 contact__text balance" data-appear="" style={sx("--appear-delay:0.2s")}>{c.text}</p>
            </div>
            <div className="contact__row">
              <form className="contact__form glass" action={endpoint || undefined} method="post" data-form="" data-appear="" style={sx("--appear-delay:0.3s")}>
                <label className="field">
                  <span className="t-body-sm c-300">{c.fields.name}</span>
                  <input type="text" name="name" autoComplete="name" />
                </label>
                <label className="field">
                  <span className="t-body-sm c-300">{c.fields.email}</span>
                  <input type="email" name="email" autoComplete="email" required />
                </label>
                <label className="field">
                  <span className="t-body-sm c-300">{c.fields.message}</span>
                  <textarea name="message" rows={3}></textarea>
                </label>
                <button className="submit" type="submit" data-state="idle">
                  <span className="submit__label btn__label" data-label-idle={c.submit} data-label-success={c.fields.success} data-label-error={c.fields.error}>{c.submit}</span>
                  <span className="submit__icon btn__icon"><Icon name="arrow" /></span>
                  <span className="submit__spinner" aria-hidden="true"></span>
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__top">
            <div className="footer__brand">
              <p className="t-body-lg c-50">{s.brand}</p>
              <p className="t-caption c-200">{s.footer.description}</p>
              <Btn label={s.footer.cta.label} href={s.footer.cta.href} variant="secondary" />
            </div>
            <div className="footer__links">
              <div className="footer__col">
                <p className="t-body c-50">{s.footer.socialTitle}</p>
                <ul>
                  {s.socials.map((x: any) => (
                    <li><a className="t-body-sm link" href={x.href} target="_blank" rel="noreferrer">{x.footerLabel}</a></li>
                  ))}
                </ul>
              </div>
              {s.footer.columns.map((col: any) => (
                <div className="footer__col">
                  <p className="t-body c-50">{col.title}</p>
                  <ul>
                    {col.links.map((l: any) => <li><a className="t-body-sm link" href={l.href}>{l.label}</a></li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="footer__bottom">
            <a className="t-caption link" href={s.footer.legal.href}>{s.footer.legal.label}</a>
            <p className="t-caption c-200 footer__copy">{s.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
