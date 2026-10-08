// GENERATED from src/pages/blog/[slug].astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';
import Base from '@/layouts/Base';
import ArticleCard from '@/components/ui/ArticleCard';
import { getCollection } from '@/lib/content';
import { site, formatDate } from '@/lib/site';

async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export async function generateStaticParams() {
  return (await getStaticPaths()).map((p) => p.params);
}


export default async function Slug({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: requested } = await params;
  const { post } = ((await getStaticPaths()).find((p) => p.params.slug === requested)!.props) as any;
  const blog = await site('blog');
  const related = (await getCollection('blog'))
    .filter((p) => p.id !== post.id)
    .sort((a, b) => a.data.order - b.data.order)
    .slice(0, 2);
  const d = post.data;

  return (
    <>
      <Base route={`/blog/${requested}/`} title={`${d.title} — Marby Blog`} description={`Read ${d.title} from the Marby real estate blog.`} image={d.image}>
        <article>
          <header className="ahead">
            <nav className="crumbs" aria-label="Breadcrumb">
              <a className="t-body-sm link" href="/blog">{blog.crumb}</a>
              <span className="t-body-sm c-300">/</span>
              <span className="t-body-sm c-900 crumbs__current">{d.title}</span>
            </nav>
            <div className="ahead__text">
              <h1 className="t-h1 ahead__title" data-appear="mount">{d.title}</h1>
              <div className="ahead__meta">
                <p className="t-body" data-appear="mount" style={sx("--appear-delay:0.1s")}>{d.category}</p>
                <span className="ahead__dot" data-appear="mount" style={sx("--appear-delay:0.2s")}></span>
                <p className="t-body-sm" data-appear="mount" style={sx("--appear-delay:0.3s")}><time dateTime={d.date.toISOString()}>{formatDate(d.date)}</time></p>
              </div>
            </div>
            <img className="ahead__banner" src={d.image} alt={d.imageAlt} data-appear="mount" style={sx("--appear-delay:0.4s")} />
          </header>
          <section className="abody">
            <div className="prose abody__content" data-appear="" dangerouslySetInnerHTML={{ __html: post.rendered?.html }} />
          </section>
        </article>
        <section className="related">
          <div className="related__head">
            <p className="t-caption2 c-500" data-appear="">{blog.related.label}</p>
            <h2 className="t-h2 related__title" data-appear="" style={sx("--appear-delay:0.1s")}>{blog.related.title}</h2>
          </div>
          <div className="related__list" data-appear="" style={sx("--appear-delay:0.3s")}>
            {related.map((p) => <ArticleCard post={p} />)}
          </div>
        </section>
      </Base>
    </>
  );
}
