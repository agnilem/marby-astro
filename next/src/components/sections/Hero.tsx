// GENERATED from src/components/sections/Hero.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';
import { site } from '@/lib/site';

export default async function Hero() {
  const { hero } = await site('home');

  return (
    <>
      <section className="hero" data-dark="">
        <video className="hero__video" src={hero.video} poster={hero.poster} autoPlay muted loop playsInline preload="auto" aria-hidden="true"></video>
        <div className="scrim" aria-hidden="true"></div>
        <div className="container hero__inner">
          <h1 className="hero__title" data-appear="mount">{hero.title}</h1>
          <p className="hero__text t-caption2 c-200" data-appear="mount" style={sx("--appear-delay:0.2s")}>{hero.text}</p>
        </div>
      </section>
    </>
  );
}
