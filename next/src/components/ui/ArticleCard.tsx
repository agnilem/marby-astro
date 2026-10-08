// GENERATED from src/components/ui/ArticleCard.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import type { CollectionEntry } from '@/lib/content';
import { formatDate } from '@/lib/site';

interface Props { post: CollectionEntry<'blog'> }

export default function ArticleCard({ post }: Props) {
  const d = post.data;

  return (
    <>
      <a className="acard" href={`/blog/${post.id}`} data-filter-item="" data-tags={d.category} data-name={d.title}>
        <div className="acard__media">
          <img src={d.image} alt={d.imageAlt} loading="lazy" decoding="async" />
          <span className="acard__tag t-body-sm">{d.category}</span>
        </div>
        <div className="acard__text">
          <h3 className="t-h5 acard__title">{d.title}</h3>
          <p className="t-caption c-600"><time dateTime={d.date.toISOString()}>{formatDate(d.date)}</time></p>
        </div>
      </a>
    </>
  );
}
