// GENERATED from src/components/sections/Hero.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';
import { site } from '@/lib/site';

export default async function Hero() {
  const { hero } = await site('home');

  return (
    <>
      <section className="hero" data-dark="">
        <link rel="preload" as="image" href={hero.poster} fetchPriority="high" />
        <video className="hero__video" data-src={hero.video} poster={hero.poster} muted loop playsInline preload="none" aria-hidden="true"></video>
        <div className="scrim" aria-hidden="true"></div>
        <div className="container hero__inner">
          <h1 className="hero__title" data-appear="mount">{hero.title}</h1>
          <p className="hero__text t-caption2 c-200" data-appear="mount" style={sx("--appear-delay:0.2s")}>{hero.text}</p>
        </div>
      </section>
    </>
  );
}
