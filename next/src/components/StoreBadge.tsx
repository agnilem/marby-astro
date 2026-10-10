// GENERATED from src/components/StoreBadge.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.

const on = process.env.NEXT_PUBLIC_STORE_BADGE === 'true';
const arrow =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>';

export default function StoreBadge() {
  return (
    <>
      {on && (
        <a className="badge" href="https://startfrom.co/" target="_blank" rel="noopener">
          <span className="badge__label">GET MARBY</span>
          <span className="badge__mask">
            <span className="badge__out" dangerouslySetInnerHTML={{ __html: arrow }} />
            <span className="badge__in" dangerouslySetInnerHTML={{ __html: arrow }} />
          </span>
        </a>
      )}
    </>
  );
}
