// GENERATED from src/components/sections/Team.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';
import Icon from '@/components/Icon';
import { site } from '@/lib/site';

export default async function Team() {
  const team = await site('team');
  const loop = team.members.length * (278 + 20);

  return (
    <>
      <section className="team" data-dark="">
        <img className="team__bg" src={team.image} alt="" loading="lazy" />
        <div className="container team__inner" data-appear="" style={sx("--appear-y:0px")}>
          <div className="team__head">
            <p className="t-caption2 c-50 team__label" data-appear="">{team.label}</p>
            <div className="team__text">
              <h2 className="t-h2 c-50" data-appear="" style={sx("--appear-delay:0.1s")}>{team.title}</h2>
              <p className="t-body-sm c-200" data-appear="" style={sx("--appear-delay:0.2s")}>{team.text}</p>
            </div>
          </div>
          <div className="ticker" data-appear="" style={sx(`--appear-delay:0.3s;--loop:${loop}px;--dur:${loop / 50}s`)}>
            <div className="ticker__track">
              {[0, 1].map((copy) => (
                <div className="ticker__set" aria-hidden={copy === 1 ? 'true' : undefined}>
                  {team.members.map((m: any) => (
                    <article className="member">
                      <img className="member__photo" src={m.image} alt={copy === 0 ? m.alt : ''} loading="lazy" />
                      <div className="member__blur" aria-hidden="true"></div>
                      <div className="member__body">
                        <div className="member__name">
                          <p className="t-caption c-200">{m.number}</p>
                          <h3 className="t-h4 c-50">{m.name}</h3>
                        </div>
                        <div className="member__meta">
                          <p className="t-caption c-50">{m.post}</p>
                          <p className="t-caption c-50 member__city"><Icon name="pin" size={14} />{m.city}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
