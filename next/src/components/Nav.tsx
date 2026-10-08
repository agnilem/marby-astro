// GENERATED from src/components/Nav.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';
import Btn from '@/components/Btn';
import Icon from '@/components/Icon';
import { site } from '@/lib/site';

export default async function Nav() {
  const s = await site('settings');

  return (
    <>
      <header className="nav" data-nav="">
        <div className="nav__bar">
          <div className="nav__col nav__col--menu">
            <button className="chip" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="menu" data-menu-open="">
              <Icon name="menu" />
            </button>
          </div>
          <a className="nav__col nav__col--tag" href="/" data-stop="">
            <span className="nav__tag t-caption2" data-invert="">{s.tagline}</span>
          </a>
          <div className="nav__col nav__col--cta" data-stop="">
            <Btn label={s.consultation.label} href={s.consultation.href} />
          </div>
        </div>
      </header>

      <div className="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu" hidden data-menu="">
        <div className="menu__top">
          <div className="menu__brand">
            <button className="chip" type="button" aria-label="Close menu" data-menu-close="">
              <Icon name="close" />
            </button>
            <span className="t-h5">{s.brand}</span>
          </div>
          <div className="menu__top-cta"><Btn label={s.consultation.label} href={s.consultation.href} /></div>
        </div>
        <nav className="menu__list" aria-label="Main">
          {s.menu.map((item: any, i: number) => (
            <a className="menu__item t-h2" href={item.href} style={sx(`--d:${[0.15, 0.15, 0.25, 0.35, 0.45][i] ?? 0.45}s`)}>{item.label}</a>
          ))}
          <div className="menu__socials" style={sx("--d:0.55s")}>
            {s.socials.map((x: any) => (
              <a className="menu__social t-caption2" href={x.href} target="_blank" rel="noreferrer">{x.label}</a>
            ))}
          </div>
          <div className="menu__bottom-cta"><Btn label={s.consultation.label} href={s.consultation.href} /></div>
        </nav>
      </div>
    </>
  );
}
