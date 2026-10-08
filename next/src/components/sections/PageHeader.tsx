// GENERATED from src/components/sections/PageHeader.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';

interface Props { label: string; title: string | string[]; labelClass?: string }

export default function PageHeader({ label, title, labelClass = 't-caption2' }: Props) {
  const lines = Array.isArray(title) ? title : [title];

  return (
    <>
      <section className="phead">
        <p className={labelClass} data-appear="mount">{label}</p>
        <h1 className="t-h1 phead__title" data-appear="mount" style={sx("--appear-delay:0.2s")}>
          {lines.map((l, i) => <>{l}{i < lines.length - 1 && <br />}</>)}
        </h1>
      </section>
    </>
  );
}
