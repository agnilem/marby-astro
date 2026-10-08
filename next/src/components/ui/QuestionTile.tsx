// GENERATED from src/components/ui/QuestionTile.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';
import Icon from '@/components/Icon';

interface Props { n: number; q: string; a: string; delay?: number }

export default function QuestionTile({ n, q, a, delay = 0 }: Props) {
  const id = `tile-${n}`;

  return (
    <>
      <div className="qtile" data-acc-item="" data-acc-trigger="" data-appear="" style={sx(`--appear-delay:${delay}s`)}>
        <div className="qtile__top">
          <span className="t-h1 qtile__n">{String(n).padStart(2, '0')}</span>
          <button className="qtile__btn" type="button" aria-expanded="false" aria-controls={id} aria-label={q}><Icon name="plus" /></button>
        </div>
        <div className="qtile__body">
          <h3 className="t-h6 qtile__q">{q}</h3>
          <p className="t-body-sm qtile__a" id={id}>{a}</p>
        </div>
      </div>
    </>
  );
}
