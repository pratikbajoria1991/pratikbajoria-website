// Markdown renderer registry: route pattern -> renderer. scripts/build-md.mjs renders every
// route from listMarkdownRoutes() into public/md/, and llms.txt, llms-full.txt, ai.txt and
// /api/md/_catalog are all built from the same list.
//
// Adding a page = one step: add an entry to STATIC_PAGES (static HTML in public/) or, for a
// new collection, a pattern renderer to PATTERNS. Pages that must not get a markdown
// version go in SKIP with a reason (scripts/test-md-coverage.mjs enforces this).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, AI_SUMMARIES } from './site-config.mjs';
import { pageMarkdown, heading, list, table, link, escText, isoDate, absUrl, isInternal, canonicalFor } from './format.mjs';
import { extractMain, pageMeta, parseHtml, findAll, find, textOf } from './extract-html.mjs';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const PUB = path.join(ROOT, 'public');
const read = (rel) => fs.readFileSync(path.join(PUB, rel), 'utf8');
const readJson = (rel, fallback) => { try { return JSON.parse(read(rel)); } catch { return fallback; } };

// Static pages: path -> source file and llms section (core | guides | legal).
export const STATIC_PAGES = [
  { path: '/', file: 'index.html', section: 'core' },
  { path: '/audit', file: 'audit.html', section: 'core' },
  { path: '/scorecard', file: 'scorecard.html', section: 'core' },
  { path: '/workshops', file: 'workshops.html', section: 'core' },
  { path: '/resources', file: 'resources.html', section: 'core' },
  { path: '/topics', file: 'topics.html', section: 'core' },
  { path: '/ai-automation-in-india', file: 'ai-automation-in-india.html', section: 'guides' },
  { path: '/ai-implementation-for-finance-teams', file: 'ai-implementation-for-finance-teams.html', section: 'guides' },
  { path: '/ai-opportunity-audit-for-ca-firms', file: 'ai-opportunity-audit-for-ca-firms.html', section: 'guides' },
  { path: '/how-to-start-ai-implementation', file: 'how-to-start-ai-implementation.html', section: 'guides' },
  { path: '/workflow-automation-with-ai-for-mid-market', file: 'workflow-automation-with-ai-for-mid-market.html', section: 'guides' },
  { path: '/about', file: 'about.html', section: 'core' },
  { path: '/privacy', file: 'privacy.html', section: 'legal' }
];

// HTML files / routes deliberately without a markdown version.
export const SKIP = {
  '/404': 'noindex error page',
  '/cross-border-partnerships': '301 to https://crossborder.pratikbajoria.com/ (phase 2: subdomain markdown)',
  '/crossborder/*': 'cross-border subdomain build; phase 2',
  '/blog.html': '301 to /blog (listing is rendered by the /blog renderer)',
  '/api/*': 'private endpoints (robots.txt Disallow)'
};

// ---------------------------------------------------------------------------
// Data shared with the worker: posts, aliases, sitemap dates.
// ---------------------------------------------------------------------------
export function loadData() {
  const daily = readJson('blog-posts.json', []);
  const editorial = readJson('affiliate-articles.json', []);
  const worker = read('_worker.js');
  const aliases = Object.fromEntries([...worker.matchAll(/'(\/blog\/[a-z0-9-]+)':\s*'(\/[^']*)'/g)].map((m) => [m[1], m[2]]));
  const lastmod = {};
  for (const m of read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) lastmod[m[1]] = isoDate(m[2]);
  const seen = new Set();
  const posts = [...daily.map((p) => ({ ...p, kind: 'daily' })), ...editorial.map((p) => ({ ...p, kind: 'editorial' }))]
    .filter((p) => p && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug || '') && !aliases[`/blog/${p.slug}`])
    .filter((p) => { if (seen.has(p.slug)) return false; seen.add(p.slug); return true; });
  const staticPosts = fs.readdirSync(path.join(PUB, 'blog')).filter((f) => f.endsWith('.html')).map((f) => f.slice(0, -5))
    .filter((slug) => !aliases[`/blog/${slug}`]);
  return { posts, staticPosts, aliases, lastmod, catalog: readJson('affiliate-links.json', {}) };
}

// ---------------------------------------------------------------------------
// Renderers. Each returns { title, summary, lastModified, markdown, section, group, date }.
// ---------------------------------------------------------------------------
function relatedFromBlocks(blocks, selfPath, limit = 8) {
  const out = [];
  const seen = new Set([canonicalFor(selfPath)]);
  for (const m of blocks.join('\n').matchAll(/\[([^\]]+)\]\((https:\/\/pratikbajoria\.com[^)\s#]*)\)/g)) {
    const url = absUrl(m[2]);
    if (seen.has(url) || !isInternal(url)) continue;
    seen.add(url);
    out.push([m[1].replace(/\\([\[\]\\])/g, '$1').replace(/\s*[↗→]$/, ''), url]);
    if (out.length >= limit) break;
  }
  return out;
}

// Static HTML (service pages, guides and posts that have public/blog/{slug}.html).
function renderHtmlFile(file, routePath, data) {
  const html = read(file);
  const meta = pageMeta(html);
  if (/noindex/i.test(meta.robots)) return null;
  const { h1, blocks } = extractMain(html);
  const title = h1 || meta.ogTitle || meta.title.replace(/\s+[—|-]\s+Pratik Bajoria$/, '');
  const lastModified = data.lastmod[canonicalFor(routePath)] || isoDate(meta.dateModified);
  const related = relatedFromBlocks(blocks, routePath);
  if (routePath.startsWith('/blog/')) related.push(['All articles', `${SITE.url}/blog`]);
  return {
    title,
    summary: meta.description,
    lastModified,
    date: isoDate(meta.datePublished) || lastModified,
    markdown: pageMarkdown({ title, summary: meta.description, path: routePath, lastModified, body: blocks.join('\n\n'), related })
  };
}

// JSON-only posts: same data and order as renderPostHtml() in public/_worker.js.
const STRUCTURED_DISCLAIMER = 'Disclaimer: this article is general educational commentary. It is not legal, tax, audit or data-protection advice and does not create an adviser–client relationship. Laws, standards and thresholds change; check the current official text and take professional advice on your facts before acting.';
function splitParagraphs(content) {
  const parts = String(content || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (parts.length !== 1 || parts[0].length < 1500) return parts;
  const sentences = parts[0].match(/[^.!?]+[.!?]+["”’)]*\s*|[^.!?]+$/g) || [parts[0]];
  const out = [];
  let buf = '';
  for (const sentence of sentences) {
    buf += sentence;
    if (buf.length >= 550) { out.push(buf.trim()); buf = ''; }
  }
  if (buf.trim()) out.push(buf.trim());
  return out;
}
function inlineMd(raw, sources) {
  // Same link rules as inlineHtml(): [text][n] -> sources[n-1] (https only); [text](/path) internal.
  return escText(raw)
    .replace(/\[([^\]]+)\]\[(\d+)\]/g, (m, label, n) => {
      const src = sources[Number(n) - 1];
      return src && /^https:\/\//.test(src.url || '') ? link(label, src.url) : label;
    })
    .replace(/\[([^\]]+)\]\((\/[a-z0-9\-\/]*)\)/gi, (m, label, href) => link(label, href));
}
function renderJsonPost(post, data) {
  const routePath = `/blog/${post.slug}`;
  const allSources = Array.isArray(post.sources) ? post.sources : [];
  const sources = allSources.filter((s) => s && /^https?:\/\//.test(s.url || ''));
  const out = [`${escText(post.category || 'AI implementation')} · ${post.date || ''} · ${post.readTime || 6} min read`];
  const takeaways = (Array.isArray(post.takeaways) ? post.takeaways : []).filter((t) => typeof t === 'string' && t.trim());
  if (takeaways.length) out.push(`**Key takeaways**\n\n${list(takeaways.map(escText))}`);
  const related = [];
  if (Array.isArray(post.sections) && post.sections.length) {
    for (const p of Array.isArray(post.intro) ? post.intro : []) out.push(inlineMd(p, allSources));
    for (const sec of post.sections) {
      if (!sec || !sec.heading) continue;
      out.push(heading(2, sec.heading));
      const paras = Array.isArray(sec.paragraphs) ? sec.paragraphs : [];
      if (paras[0]) out.push(inlineMd(paras[0], allSources));
      if (Array.isArray(sec.bullets) && sec.bullets.length) out.push(list(sec.bullets.map((b) => inlineMd(b, allSources))));
      for (const p of paras.slice(1)) out.push(inlineMd(p, allSources));
      const t = sec.table;
      if (t && Array.isArray(t.head) && Array.isArray(t.rows) && t.rows.length) {
        if (t.caption) out.push(escText(t.caption));
        out.push(table(t.head, t.rows.map((r) => r.map((c) => inlineMd(String(c), allSources)))));
      }
      for (const p of Array.isArray(sec.after) ? sec.after : []) out.push(inlineMd(p, allSources));
    }
    const faq = (Array.isArray(post.faq) ? post.faq : []).filter((f) => f && f.q && f.a);
    if (faq.length) {
      out.push(heading(2, 'Frequently asked questions'));
      for (const f of faq) out.push(`${heading(3, f.q)}\n\n${inlineMd(f.a, allSources)}`);
    }
    for (const r of Array.isArray(post.related) ? post.related : []) {
      if (r && /^\/[a-z0-9\-\/]*$/i.test(r.url || '')) related.push([r.title || r.url, absUrl(r.url)]);
    }
  } else {
    out.push(...splitParagraphs(post.content).map((p) => escText(p)));
  }
  if (sources.length) out.push(`${heading(2, 'Sources')}\n\n${list(sources.map((s) => link(s.title || s.url, s.url)))}`);
  if (Array.isArray(post.sections) && post.sections.length) out.push(`*${escText(post.disclaimer || STRUCTURED_DISCLAIMER)}*`);
  const tools = (Array.isArray(post.affiliateTools) ? post.affiliateTools : []).map((k) => data.catalog && data.catalog[k]).filter(Boolean);
  if (tools.length) {
    const disclosure = (post.affiliate && post.affiliate.disclosure) || 'Tool links go to the vendor’s official site unless an affiliate URL is configured.';
    out.push(`${heading(2, 'Tools worth evaluating')}\n\n${list(tools.map((t) => `${link(t.name, t.affiliateUrl || t.productUrl)} (${escText(t.category)})`))}\n\n${escText(disclosure)}`);
  }
  out.push('*Educational content; not financial, investment, or legal advice.*');
  related.push(['All articles', `${SITE.url}/blog`]);
  const lastModified = isoDate(post.dateModified || post.date) || data.lastmod[canonicalFor(routePath)];
  return {
    title: post.title || post.slug,
    summary: post.excerpt || '',
    lastModified,
    date: isoDate(post.date),
    markdown: pageMarkdown({ title: post.title || post.slug, summary: post.excerpt, path: routePath, lastModified, body: out.join('\n\n'), related })
  };
}

// /blog: the static cards in blog.html, plus JSON-only posts the worker injects
// (injectMissingBlogCards: newest first, placed before the static cards). Not paginated.
function renderBlogIndex(data) {
  const html = read('blog.html');
  const meta = pageMeta(html);
  const tree = parseHtml(html.replace(/^[\s\S]*?<body[^>]*>/i, ''));
  const h1 = find(tree, (n) => n.tag === 'h1');
  const cards = findAll(tree, (n) => n.tag === 'article').map((a) => {
    const anchor = find(a, (n) => n.tag === 'a' && /^\/blog\//.test(n.attrs.href || ''));
    const desc = findAll(a, (n) => n.tag === 'p').map(textOf).filter((t) => t && !/·\s*\d{4}-/.test(t)).pop() || '';
    return anchor ? { url: absUrl(anchor.attrs.href), title: textOf(anchor), desc } : null;
  }).filter(Boolean);
  const listed = new Set(cards.map((c) => c.url));
  const injected = data.posts
    .filter((p) => !html.includes(`href="/blog/${p.slug}"`))
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
    .map((p) => ({ url: `${SITE.url}/blog/${p.slug}`, title: p.title || p.slug, desc: p.excerpt || '' }))
    .filter((c) => !listed.has(c.url));
  const items = [...injected, ...cards].map((c) => `${link(c.title, c.url)}${c.desc ? ` - ${escText(c.desc)}` : ''}`);
  const title = h1 ? textOf(h1) : 'Insights';
  const lastModified = data.lastmod[`${SITE.url}/blog`] || '';
  return {
    title,
    summary: meta.description,
    lastModified,
    markdown: pageMarkdown({ title, summary: meta.description, path: '/blog', lastModified, body: list(items), related: [['AI, finance and business systems topic guide', `${SITE.url}/topics`], ['Home', `${SITE.url}/`]] })
  };
}

// llms.txt grouping for posts.
function postGroup(post, title) {
  if (post && post.kind === 'editorial') return 'tools';
  const hay = `${title} ${(post && post.category) || ''} ${((post && post.keywords) || []).join(' ')}`;
  return /\b(CA|CAs|chartered|ICAI|GST|TDS|audit firms?|CA firms?)\b/i.test(hay) ? 'ca' : 'ai';
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------
export function listMarkdownRoutes(data = loadData()) {
  const routes = STATIC_PAGES.map((p) => ({ path: p.path, section: p.section, source: `public/${p.file}`, render: () => renderHtmlFile(p.file, p.path, data) }));
  routes.splice(6, 0, { path: '/blog', section: 'core', source: 'public/blog.html + blog-posts.json + affiliate-articles.json', render: () => renderBlogIndex(data) });
  const bySlug = new Map(data.posts.map((p) => [p.slug, p]));
  const slugs = [...new Set([...data.staticPosts, ...data.posts.map((p) => p.slug)])];
  for (const slug of slugs) {
    const post = bySlug.get(slug);
    const hasHtml = data.staticPosts.includes(slug);
    routes.push({
      path: `/blog/${slug}`,
      section: 'posts',
      // The worker serves public/blog/{slug}.html when it exists, so that file is the source.
      source: hasHtml ? `public/blog/${slug}.html` : `${post.kind === 'editorial' ? 'affiliate-articles' : 'blog-posts'}.json`,
      render: () => {
        const r = hasHtml ? renderHtmlFile(`blog/${slug}.html`, `/blog/${slug}`, data) : renderJsonPost(post, data);
        return r && { ...r, group: postGroup(post, r.title) };
      }
    });
  }
  return routes;
}

export function renderAll(data = loadData()) {
  return listMarkdownRoutes(data).map((r) => {
    const out = r.render();
    if (!out) return null;
    const aiSummary = AI_SUMMARIES[r.path] || out.summary;
    return { ...r, ...out, aiSummary };
  }).filter(Boolean);
}
