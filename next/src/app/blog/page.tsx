// GENERATED from src/pages/blog/index.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { sx } from '@/lib/sx';
import Base from '@/layouts/Base';
import PageHeader from '@/components/sections/PageHeader';
import ArticleCard from '@/components/ui/ArticleCard';
import { getCollection } from '@/lib/content';
import { site } from '@/lib/site';

export default async function Index() {
  const blog = await site('blog');
  const posts = (await getCollection('blog')).sort((a, b) => a.data.order - b.data.order);

  return (
    <>
      <Base route="/blog/"
        title="Real Estate Insights & News — Marby Blog"
        description="Expert advice on buying, selling, and investing in real estate. Stay up to date with market trends, property guides, and lifestyle inspiration from Marby."
      >
        <PageHeader label={blog.header.label} title={blog.header.title} labelClass="t-caption" />
        <section className="bgrid" data-filter="">
          <div className="bgrid__tabs" data-appear="mount" style={sx("--appear-delay:0.4s;--appear-y:150px")} role="group" aria-label="Filter by category">
            <button className="tab" type="button" data-filter-tab="" aria-pressed="true">{blog.all}</button>
            {blog.categories.map((c: string) => <button className="tab" type="button" data-filter-tab={c} aria-pressed="false">{c}</button>)}
          </div>
          <div className="bgrid__list" data-appear="mount" style={sx("--appear-delay:0.6s;--appear-y:150px")}>
            {posts.map((p) => <ArticleCard post={p} />)}
            <p className="t-body-lg c-900 bgrid__empty" data-filter-empty="" hidden>{blog.empty}</p>
          </div>
        </section>
      </Base>
    </>
  );
}
