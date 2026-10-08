import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';
import GithubSlugger from 'github-slugger';

/**
 * Hand-written. Markdown to HTML the way the Astro build renders it:
 * GitHub-flavoured Markdown, inline HTML kept, straight quotes (no smartypants),
 * and an id on every heading slugged from its text.
 */
function headingIds() {
  return (tree: any) => {
    const slugger = new GithubSlugger();
    visit(tree, 'element', (node: any) => {
      if (!/^h[1-6]$/.test(node.tagName)) return;
      if (node.properties.id == null) node.properties.id = slugger.slug(toString(node));
    });
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(headingIds)
  .use(rehypeStringify, { characterReferences: { useNamedReferences: true } });

export function renderMarkdown(md: string): string {
  // Astro ends the rendered HTML with a newline; so does this.
  return String(processor.processSync(md)).replace(/\n?$/, '\n');
}
