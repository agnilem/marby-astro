// GENERATED from src/components/StoreBadge.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.

const on = process.env.NEXT_PUBLIC_STORE_BADGE === 'true';
const arrow =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>';

export default function StoreBadge() {
  return (
    <>
      {on && (
        <a className="badge" href="https://buy.polar.sh/polar_cl_C7mCmNfCQK9xTynrq5u0t4I4CpMoRc5tN5UCB3mx56l?utm_source=astro-demo&utm_medium=badge&utm_campaign=marby" target="_blank" rel="noopener">
          <span className="badge__label">ALL ASTRO THEMES</span>
          <span className="badge__mask">
            <span className="badge__out" dangerouslySetInnerHTML={{ __html: arrow }} />
            <span className="badge__in" dangerouslySetInnerHTML={{ __html: arrow }} />
          </span>
        </a>
      )}
    </>
  );
}
