// GENERATED from src/components/ui/QuestionRow.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';
import Icon from '@/components/Icon';

interface Props { n: number; q: string; a: string; delay?: number }

export default function QuestionRow({ n, q, a, delay = 0 }: Props) {
  const id = `faq-${n}-${q.length}`;

  return (
    <>
      <div className="qrow" data-acc-item="" data-acc-trigger="" data-appear="" style={sx(`--appear-delay:${delay}s`)}>
        <span className="t-h5 qrow__n">{String(n).padStart(2, '0')}</span>
        <div className="qrow__body">
          <h3 className="qrow__q t-h6">{q}</h3>
          <div className="qrow__panel" id={id} data-acc-panel="">
            <div><p className="t-body-sm qrow__a">{a}</p></div>
          </div>
        </div>
        <button className="qrow__btn" type="button" aria-expanded="false" aria-controls={id} aria-label={q}><Icon name="plus" /></button>
      </div>
    </>
  );
}
