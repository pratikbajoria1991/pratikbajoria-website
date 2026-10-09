const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' };
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers });
const text = (value, max = 500) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isBlogSlug = (value) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
const INTERNAL_ASSET_HEADER = 'x-pages-internal-asset';
const LEAD_INTERESTS = new Set(['cross-border-buyer', 'cross-border-seller']);

const GA4_SNIPPET = '<script src="/ga4.js?v=20261009-ev" defer></script>\n';
async function injectGa4(response) {
  const ctype = response.headers.get('content-type') || '';
  if (response.status !== 200 || !ctype.includes('text/html')) return response;
  const text = rewriteMainCrossborderLinks(await response.text());
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  if (text.includes('/ga4.js') || text.includes('G-CXQP7F8CRT')) {
    return new Response(text, { status: response.status, statusText: response.statusText, headers });
  }
  const out = text.includes('</head>')
    ? text.replace('</head>', `${GA4_SNIPPET}</head>`)
    : `${text}${GA4_SNIPPET}`;
  return new Response(out, { status: response.status, statusText: response.statusText, headers });
}



// ---------------------------------------------------------------------------
// Cross-border site: https://crossborder.pratikbajoria.com
// Static pages live in public/crossborder/ (built by scripts/crossborder/build.mjs).
// Requests whose Host is crossborder.pratikbajoria.com are served from /crossborder/
// with clean URLs, their own sitemap.xml, robots.txt and 404.
//
// GO-LIVE SWITCH — flip to true only once the custom domain
// crossborder.pratikbajoria.com is attached to this Pages project and resolves.
//   false (now): main-site nav/footer/homepage links keep pointing at
//     /cross-border-partnerships (which stays live and in the main sitemap); the
//     subdomain sitemap is not advertised from the main robots.txt; and
//     pratikbajoria.com/crossborder/* is a noindex preview whose canonicals point
//     at the subdomain.
//   true: /cross-border-partnerships(.html) and pratikbajoria.com/crossborder/*
//     301 to the subdomain; main-site HTML links, JSON-LD and llms.txt are
//     rewritten to https://crossborder.pratikbajoria.com/; the old page leaves the
//     main sitemap; the main robots.txt also lists the subdomain sitemap.
// ---------------------------------------------------------------------------
const CROSSBORDER_LIVE = true;
const XB_HOST = 'crossborder.pratikbajoria.com';
const XB_ORIGIN = `https://${XB_HOST}`;
const XB_DIR = '/crossborder';
const XB_OLD_PAGE = '/cross-border-partnerships';
// Root files the subdomain shares with the main site (incl. the IndexNow key file, which
// IndexNow requires on every host whose URLs are submitted).
const XB_SHARED_ROOT_ASSETS = new Set(['/favicon.ico', '/favicon.png', '/ga4.js', '/d5d19724f0e88d56c47096f6decf1880.txt']);
// Retired cross-border URLs -> their replacements (301 on the subdomain and on the /crossborder/ preview).
const XB_REDIRECTS = {
  '/buyers': '/find-a-partner-in-india',
  '/indian-businesses': '/win-clients-abroad'
};

function rewriteMainCrossborderLinks(text) {
  if (!CROSSBORDER_LIVE) return text;
  return text
    .split(`href="${XB_OLD_PAGE}"`).join(`href="${XB_ORIGIN}/"`)
    .split(`https://pratikbajoria.com${XB_OLD_PAGE}`).join(`${XB_ORIGIN}/`);
}

function requestHost(request, url) {
  return (request.headers.get('host') || url.host || '').split(':')[0].toLowerCase();
}

function xbRedirect(location) {
  return new Response(null, { status: 301, headers: { Location: location, 'Cache-Control': 'public, max-age=3600' } });
}

// /crossborder/x, /x.html, /x/ and /index.html all collapse to the clean path /x.
function xbNormalise(pathname) {
  let p = pathname;
  if (p === XB_DIR || p.startsWith(`${XB_DIR}/`)) p = p.slice(XB_DIR.length) || '/';
  if (p.endsWith('/index.html')) p = p.slice(0, -'index.html'.length);
  else if (p.endsWith('.html')) p = p.slice(0, -'.html'.length);
  if (p.length > 1 && p.endsWith('/')) p = p.replace(/\/+$/, '') || '/';
  return p || '/';
}

let xbManifestCache = null;
async function xbManifest(request, env) {
  if (xbManifestCache) return xbManifestCache;
  const m = await loadJsonAsset(request, env, `${XB_DIR}/site-manifest.json`, null);
  if (m && Array.isArray(m.pages)) { xbManifestCache = m; return m; }
  return { pages: [] };
}

// Fetch a static asset; follow one internal Pages pretty-URL redirect if needed.
async function xbFetchAsset(request, env, assetPath) {
  let r = await env.ASSETS.fetch(internalAssetRequest(request, assetPath));
  if (r.status >= 300 && r.status < 400 && r.headers.get('location')) {
    const next = new URL(r.headers.get('location'), request.url).pathname;
    if (next.startsWith(`${XB_DIR}/`)) r = await env.ASSETS.fetch(internalAssetRequest(request, next));
  }
  return r;
}

// On pratikbajoria.com/crossborder/* (preview), root-relative links get the /crossborder prefix.
function xbPreviewHtml(html) {
  return html
    .replace(/<meta name="robots" content="[^"]*"\s*\/?>/, '<meta name="robots" content="noindex,follow" />')
    .replace(/(href|src|action)="\/(?!\/)([^"]*)"/g, (m, attr, rest) => {
      const p = `/${rest}`;
      if (XB_SHARED_ROOT_ASSETS.has(p.split(/[?#]/)[0]) || p.startsWith('/api/')) return m;
      return `${attr}="${XB_DIR}${p}"`;
    });
}

function xbHtml(request, body, status, preview) {
  const h = {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': status === 200 ? 'public, max-age=300, must-revalidate' : 'public, max-age=60'
  };
  if (preview || status !== 200) h['X-Robots-Tag'] = 'noindex, follow';
  return new Response(request.method === 'HEAD' ? null : body, { status, headers: h });
}

async function xbNotFound(request, env, preview) {
  let body = '<!doctype html><html lang="en-GB"><head><meta charset="utf-8" /><meta name="robots" content="noindex" /><title>Page not found</title></head><body><h1>Page not found</h1><p><a href="/">Cross-border home</a></p></body></html>';
  try {
    const r = await xbFetchAsset(request, env, `${XB_DIR}/404`);
    if ((r.status === 200 || r.status === 404) && (r.headers.get('content-type') || '').includes('text/html')) body = await r.text();
  } catch { /* inline fallback */ }
  return xbHtml(request, preview ? xbPreviewHtml(body) : body, 404, true);
}

function xbRobots(request) {
  const body = `# ${XB_HOST}
# Content Signals — https://contentsignals.org/
User-agent: *
Content-Signal: search=yes,ai-input=yes,ai-train=no
Allow: /
Disallow: /api/

Sitemap: ${XB_ORIGIN}/sitemap.xml
`;
  return new Response(request.method === 'HEAD' ? null : body, { status: 200, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}

async function xbSitemap(request, env) {
  const { pages } = await xbManifest(request, env);
  const urls = pages.map((p) => `  <url><loc>${XB_ORIGIN}${p.path === '/' ? '/' : p.path}</loc>${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''}<changefreq>monthly</changefreq><priority>${p.priority || '0.7'}</priority></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(request.method === 'HEAD' ? null : xml, { status: 200, headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}

// mode 'subdomain' = Host crossborder.pratikbajoria.com; 'preview' = pratikbajoria.com/crossborder/*
async function serveCrossborder(request, env, url, mode) {
  const preview = mode === 'preview';
  const raw = url.pathname;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
  }
  if (!preview) {
    if (raw === '/robots.txt') return xbRobots(request);
    if (raw === '/sitemap.xml') return xbSitemap(request, env);
    if (XB_SHARED_ROOT_ASSETS.has(raw) || /^\/fonts\/[a-z0-9-]+\.woff2$/.test(raw)) {
      const r = await env.ASSETS.fetch(internalAssetRequest(request, raw));
      return request.method === 'HEAD' ? new Response(null, r) : r;
    }
  }
  const normalised = xbNormalise(raw);
  const path = XB_REDIRECTS[normalised] || normalised;
  const wanted = preview ? (path === '/' ? `${XB_DIR}/` : `${XB_DIR}${path}`) : path;
  if (raw !== wanted) return xbRedirect(preview ? new URL(`${wanted}${url.search}`, url).toString() : `${XB_ORIGIN}${wanted}${url.search}`);

  const { pages } = await xbManifest(request, env);
  if (pages.some((p) => p.path === path)) {
    const r = await xbFetchAsset(request, env, path === '/' ? `${XB_DIR}/` : `${XB_DIR}${path}`);
    if (r.status === 200) {
      const html = await r.text();
      return xbHtml(request, preview ? xbPreviewHtml(html) : html, 200, preview);
    }
  }
  if (path.startsWith('/assets/') || path === '/og.png') {
    const r = await env.ASSETS.fetch(internalAssetRequest(request, `${XB_DIR}${path}`));
    if (r.status === 200) return request.method === 'HEAD' ? new Response(null, r) : r;
  }
  return xbNotFound(request, env, preview);
}

// Consolidated near-duplicate posts (7 Oct 2026): every loser 301s straight to its survivor (single hop).
// Lookup is applied after normalising .html and trailing slashes, and to /blog?slug= / /blog.html?slug=.
const blogPathAliases = {
  '/blog/2026-08-31-the-ai-opportunity-audit-a-90-day-roadmap-for-leaders': '/blog/2026-09-25-a-90-day-ai-opportunity-audit-without-the-theatre',
  '/blog/2026-09-07-the-ai-opportunity-audit-a-90-day-roadmap-for-leaders': '/blog/2026-09-25-a-90-day-ai-opportunity-audit-without-the-theatre',
  '/blog/2026-09-14-the-ai-opportunity-audit-a-90-day-roadmap-for-leaders': '/blog/2026-09-25-a-90-day-ai-opportunity-audit-without-the-theatre',
  '/blog/2026-10-02-a-90-day-ai-opportunity-audit-without-the-theatre': '/blog/2026-09-25-a-90-day-ai-opportunity-audit-without-the-theatre',
  '/blog/2026-09-01-ai-in-real-estate-start-with-lead-qualification-and-documents': '/blog/2026-09-26-real-estate-ai-start-with-leads-and-documents-not-prediction',
  '/blog/2026-09-08-ai-in-real-estate-start-with-lead-qualification-and-documents': '/blog/2026-09-26-real-estate-ai-start-with-leads-and-documents-not-prediction',
  '/blog/2026-09-15-ai-in-real-estate-start-with-lead-qualification-and-documents': '/blog/2026-09-26-real-estate-ai-start-with-leads-and-documents-not-prediction',
  '/blog/2026-10-03-real-estate-ai-start-with-leads-and-documents-not-prediction': '/blog/2026-09-26-real-estate-ai-start-with-leads-and-documents-not-prediction',
  '/blog/2026-09-02-what-good-ai-governance-looks-like-in-a-mid-market-company': '/blog/2026-09-19-ai-governance-for-mid-market-teams-who-do-not-have-a-chief-ai-officer',
  '/blog/2026-09-09-what-good-ai-governance-looks-like-in-a-mid-market-company': '/blog/2026-09-19-ai-governance-for-mid-market-teams-who-do-not-have-a-chief-ai-officer',
  '/blog/2026-09-16-what-good-ai-governance-looks-like-in-a-mid-market-company': '/blog/2026-09-19-ai-governance-for-mid-market-teams-who-do-not-have-a-chief-ai-officer',
  '/blog/2026-10-04-ai-governance-for-mid-market-teams-who-do-not-have-a-chief-ai-officer': '/blog/2026-09-19-ai-governance-for-mid-market-teams-who-do-not-have-a-chief-ai-officer',
  '/blog/2026-09-03-the-finance-function-is-ai-s-highest-roi-starting-point': '/blog/2026-09-17-the-finance-function-is-ai-s-highest-roi-starting-point',
  '/blog/2026-09-10-the-finance-function-is-ai-s-highest-roi-starting-point': '/blog/2026-09-17-the-finance-function-is-ai-s-highest-roi-starting-point',
  '/blog/finance-highest-roi': '/blog/2026-09-17-the-finance-function-is-ai-s-highest-roi-starting-point',
  '/blog/2026-09-04-why-most-corporate-ai-pilots-never-reach-production': '/blog/corporate-ai-pilots',
  '/blog/2026-09-11-why-most-corporate-ai-pilots-never-reach-production': '/blog/corporate-ai-pilots',
  '/blog/2026-09-05-build-vs-buy-a-practical-framework-for-ai-tooling': '/blog/build-vs-buy-ai-tooling',
  '/blog/2026-09-12-build-vs-buy-a-practical-framework-for-ai-tooling': '/blog/build-vs-buy-ai-tooling',
  '/blog/2026-09-23-build-vs-buy-for-ai-what-i-ask-founders-before-they-sign': '/blog/build-vs-buy-ai-tooling',
  '/blog/2026-09-30-build-vs-buy-for-ai-what-i-ask-founders-before-they-sign': '/blog/build-vs-buy-ai-tooling',
  '/blog/2026-09-06-how-to-automate-a-whatsapp-workflow-without-losing-control': '/blog/2026-09-28-whatsapp-automation-that-still-feels-like-customer-care',
  '/blog/2026-09-13-how-to-automate-a-whatsapp-workflow-without-losing-control': '/blog/2026-09-28-whatsapp-automation-that-still-feels-like-customer-care',
  '/blog/2026-10-01-whatsapp-automation-that-still-feels-like-customer-care': '/blog/2026-09-28-whatsapp-automation-that-still-feels-like-customer-care',
  '/blog/2026-10-05-how-much-should-a-mid-market-finance-team-budget-for-ai': '/blog/2026-09-14-how-much-should-a-mid-market-finance-team-budget-for-ai',
  '/blog/2026-09-18-the-monday-morning-test-for-any-ai-workflow': '/blog/2026-09-29-the-monday-morning-test-for-any-ai-workflow',
  '/blog/2026-09-21-semrush-for-owners-when-search-spend-is-actually-rational': '/blog/semrush-review-business-owners',
  '/blog/2026-10-06-semrush-for-owners-when-search-spend-is-actually-rational': '/blog/semrush-review-business-owners',
  '/blog/2026-09-22-notion-as-a-finance-control-layer-not-a-second-ledger': '/blog/notion-for-finance-professionals-templates-dashboards-workflows',
  '/blog/ai-tools-that-pay-back-for-finance-and-ca-teams': '/blog/best-ai-tools-chartered-accountants-finance-professionals',
};
const blogAliasFor = (pathname) => {
  if (!pathname.startsWith('/blog/')) return null;
  const p = pathname.replace(/\/+$/, '').replace(/\.html$/, '');
  return blogPathAliases[p] || null;
};

// Clean URL form used in the sitemap and canonicals: no trailing slash, no .html, no index.html.
// Search-engine verification files keep their .html name.
const cleanPathname = (pathname) => {
  if (pathname === '/' || /^\/(api|cdn-cgi|\.well-known)\//.test(pathname) || /^\/(google[a-z0-9]+|yandex_[a-z0-9]+)\.html$/i.test(pathname)) return pathname;
  let p = pathname.replace(/\/index\.html$/i, '/').replace(/\.html$/i, '');
  if (p.length > 1) p = p.replace(/\/+$/, '');
  return p || '/';
};

const absoluteRedirect = (requestUrl, pathname) => {
  const target = new URL(pathname, requestUrl);
  return new Response(null, {
    status: 301,
    headers: {
      Location: target.toString(),
      'Cache-Control': 'public, max-age=3600'
    }
  });
};


// ---------------------------------------------------------------------------
// Blog safety net: /blog/{slug} with no static SSR file is rendered from
// blog-posts.json (same markup as public/blog/*.html); unknown slugs get a
// real HTTP 404 instead of the SPA/homepage fallback (soft-404).
// ---------------------------------------------------------------------------
const SITE = 'https://pratikbajoria.com';
const escHtml = (s) => String(s ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

function internalAssetRequest(request, pathname) {
  const u = new URL(request.url);
  u.pathname = pathname;
  u.search = '';
  const h = new Headers();
  h.set(INTERNAL_ASSET_HEADER, '1');
  return new Request(u.toString(), { method: 'GET', headers: h, redirect: 'manual' });
}

async function loadJsonAsset(request, env, pathname, fallback) {
  try {
    const r = await env.ASSETS.fetch(internalAssetRequest(request, pathname));
    if (r.status !== 200) return fallback;
    return await r.json();
  } catch {
    return fallback;
  }
}

async function loadAllPosts(request, env) {
  const [daily, editorial] = await Promise.all([
    loadJsonAsset(request, env, '/blog-posts.json', []),
    loadJsonAsset(request, env, '/affiliate-articles.json', [])
  ]);
  return [...(Array.isArray(daily) ? daily : []), ...(Array.isArray(editorial) ? editorial : [])];
}

// Detects Pages' SPA fallback (homepage served with 200 for a missing asset).
function looksLikeRealBlogPage(html, slug) {
  return html.includes(`data-slug="${slug}"`) || html.includes(`rel="canonical" href="${SITE}/blog/`);
}

const FALLBACK_404_HTML = `<!doctype html><html lang="en-IN"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="robots" content="noindex" /><title>Page not found — Pratik Bajoria</title><link rel="stylesheet" href="/styles.css" /></head><body><main class="shell article-page"><h1>Page not found</h1><p><a href="/blog">Browse all insights</a> · <a href="/">Home</a></p></main></body></html>`;

async function notFound(request, env) {
  let body = FALLBACK_404_HTML;
  try {
    const r = await env.ASSETS.fetch(internalAssetRequest(request, '/404'));
    const ctype = r.headers.get('content-type') || '';
    if ((r.status === 200 || r.status === 404) && ctype.includes('text/html')) {
      const t = await r.text();
      if (t.includes('noindex')) body = t;
    }
  } catch { /* use inline fallback */ }
  return new Response(body, {
    status: 404,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=60', 'X-Robots-Tag': 'noindex' }
  });
}

// Plain-text content -> paragraphs. Blank lines split paragraphs (generator format);
// a single flattened blob is chunked at sentence boundaries so it stays readable.
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

// Visible breadcrumb trail (same markup as the static pages); last item is the current page.
function breadcrumbNav(items) {
  const sep = '<span aria-hidden="true" style="margin:0 8px;color:#a3a69e">/</span>';
  const lis = items.map(([name, href], i) => {
    const label = escHtml(name);
    const inner = href ? `<a href="${escHtml(href)}" style="border-bottom:1px solid rgba(31,37,35,.25)">${label}</a>` : `<span aria-current="page">${label}</span>`;
    return `<li>${i ? sep : ''}${inner}</li>`;
  }).join('');
  return `<nav class="breadcrumbs" aria-label="Breadcrumb" style="font-size:12px;line-height:1.5;color:#5f645e;margin:18px 0 0"><ol style="list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;align-items:baseline">${lis}</ol></nav>`;
}

// /blog index: JSON-only posts (e.g. daily posts with no static card yet) get a server-rendered
// card so every post is linked from crawlable HTML (no orphans, no JS needed).
function injectMissingBlogCards(html, posts) {
  const marker = '<div id="blog-index-list">';
  if (!html.includes(marker)) return html;
  const seen = new Set();
  const missing = posts
    .filter((p) => p && p.slug && isBlogSlug(p.slug) && !blogPathAliases[`/blog/${p.slug}`])
    .filter((p) => { if (seen.has(p.slug)) return false; seen.add(p.slug); return true; })
    .filter((p) => !html.includes(`href="/blog/${p.slug}"`))
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
  if (!missing.length) return html;
  const cards = missing.map((p) => `
      <article class="blog-index-card" style="padding:20px 0;border-bottom:1px solid rgba(28,28,26,0.08)">
        <p class="eyebrow">${escHtml(p.category || 'AI implementation')} · ${escHtml(p.date || '')}</p>
        <h2 style="font-size:1.35rem;margin:6px 0 8px"><a href="/blog/${escHtml(p.slug)}">${escHtml(p.title || p.slug)}</a></h2>
        <p style="color:#6f746d;max-width:720px">${escHtml(p.excerpt || '')}</p>
      </article>`).join('');
  return html.replace(marker, marker + cards);
}

// Structured daily posts (scripts/daily-topics): intro + sections + FAQ + related, with inline links.
// [text][n] -> sources[n-1] (https only); [text](/path) -> internal link. Everything else is escaped text.
const STRUCTURED_DISCLAIMER = 'Disclaimer: this article is general educational commentary. It is not legal, tax, audit or data-protection advice and does not create an adviser–client relationship. Laws, standards and thresholds change; check the current official text and take professional advice on your facts before acting.';
function inlineHtml(raw, sources) {
  return escHtml(raw)
    .replace(/\[([^\]]+)\]\[(\d+)\]/g, (m, label, n) => {
      const src = sources[Number(n) - 1];
      return src && /^https:\/\//.test(src.url || '') ? `<a href="${escHtml(src.url)}" target="_blank" rel="noopener noreferrer">${label}</a>` : label;
    })
    .replace(/\[([^\]]+)\]\((\/[a-z0-9\-\/]*)\)/gi, (m, label, href) => `<a href="${href}">${label}</a>`);
}
function structuredBodyHtml(post, sources) {
  const out = [];
  for (const p of Array.isArray(post.intro) ? post.intro : []) out.push(`<p>${inlineHtml(p, sources)}</p>`);
  for (const sec of post.sections) {
    if (!sec || !sec.heading) continue;
    out.push(`<h2>${escHtml(sec.heading)}</h2>`);
    for (const p of Array.isArray(sec.paragraphs) ? sec.paragraphs.slice(0, 1) : []) out.push(`<p>${inlineHtml(p, sources)}</p>`);
    if (Array.isArray(sec.bullets) && sec.bullets.length) out.push(`<ul>\n${sec.bullets.map((b) => `  <li>${inlineHtml(b, sources)}</li>`).join('\n')}\n</ul>`);
    for (const p of Array.isArray(sec.paragraphs) ? sec.paragraphs.slice(1) : []) out.push(`<p>${inlineHtml(p, sources)}</p>`);
  }
  const faq = Array.isArray(post.faq) ? post.faq.filter((f) => f && f.q && f.a) : [];
  if (faq.length) {
    out.push('<h2 id="faq">Frequently asked questions</h2>');
    for (const f of faq) out.push(`<h3>${escHtml(f.q)}</h3>\n<p>${inlineHtml(f.a, sources)}</p>`);
  }
  const related = Array.isArray(post.related) ? post.related.filter((r) => r && /^\/[a-z0-9\-\/]*$/i.test(r.url || '')) : [];
  if (related.length) out.push(`<h2>Related reading</h2>\n<ul>\n${related.map((r) => `  <li><a href="${r.url}">${escHtml(r.title || r.url)}</a></li>`).join('\n')}\n</ul>`);
  return out.join('\n');
}
function faqJsonLd(post, canonical) {
  const faq = Array.isArray(post.faq) ? post.faq.filter((f) => f && f.q && f.a) : [];
  if (!faq.length) return '';
  const strip = (t) => String(t).replace(/\[([^\]]+)\]\[\d+\]/g, '$1').replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '$1');
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', '@id': `${canonical}#faq`, mainEntity: faq.map((f) => ({ '@type': 'Question', name: strip(f.q), acceptedAnswer: { '@type': 'Answer', text: strip(f.a) } })) };
  return `\n    <script type="application/ld+json">\n${JSON.stringify(ld, null, 2).replace(/</g, '\\u003c')}\n    </script>`;
}

function renderPostHtml(post, catalog) {
  const slug = post.slug;
  const canonical = `${SITE}/blog/${slug}`;
  const title = post.title || slug;
  const excerpt = post.excerpt || '';
  const image = post.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85';
  const allSources = Array.isArray(post.sources) ? post.sources : [];
  const sources = allSources.filter((s) => s && /^https?:\/\//.test(s.url || ''));
  const structured = Array.isArray(post.sections) && post.sections.length > 0;
  const paras = structured
    ? structuredBodyHtml(post, allSources)
    : splitParagraphs(post.content)
      .map((p) => `<p>${escHtml(p).replace(/\n/g, '<br />')}</p>`)
      .join('\n');
  const sourcesHtml = sources.length
    ? `<h2>Sources</h2>\n<ul>\n${sources.map((s) => `  <li><a href="${escHtml(s.url)}" target="_blank" rel="noopener noreferrer">${escHtml(s.title || s.url)}</a></li>`).join('\n')}\n</ul>`
    : '';
  const tools = (Array.isArray(post.affiliateTools) ? post.affiliateTools : []).map((k) => catalog && catalog[k]).filter(Boolean);
  let toolsHtml = '';
  if (tools.length) {
    const cards = tools.map((tool) => {
      const isAff = Boolean(tool.affiliateUrl);
      const href = isAff ? tool.affiliateUrl : tool.productUrl;
      const label = isAff ? `Explore ${tool.name}` : `Visit ${tool.name} official site`;
      const rel = isAff ? 'nofollow sponsored noopener noreferrer' : 'noopener noreferrer';
      return `<a href="${escHtml(href)}" target="_blank" rel="${rel}"><strong>${escHtml(tool.name)}</strong><span>${escHtml(tool.category)}</span><small>${escHtml(label)} ↗</small></a>`;
    }).join('');
    const disclosure = (post.affiliate && post.affiliate.disclosure) || 'Tool links go to the vendor’s official site unless an affiliate URL is configured.';
    toolsHtml = `<aside class="article-tools" aria-label="Tools mentioned in this article"><p class="eyebrow">Tools worth evaluating</p><div class="article-tool-grid">${cards}</div><p class="article-tool-note">${escHtml(disclosure)}</p></aside>`;
  }
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: excerpt,
    datePublished: post.date || undefined,
    dateModified: post.dateModified || post.date || undefined,
    author: { '@type': 'Person', name: 'Pratik Bajoria', url: `${SITE}/#person`, sameAs: ['https://www.linkedin.com/in/pratik-bajoria-6288b1119/'] },
    publisher: { '@type': 'Person', name: 'Pratik Bajoria', '@id': `${SITE}/#person` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    image,
    keywords: Array.isArray(post.keywords) ? post.keywords : []
  };
  const ldJson = JSON.stringify(ld, null, 2).replace(/</g, '\\u003c');
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: title, item: canonical }
    ]
  };
  const crumbsJson = JSON.stringify(crumbs, null, 2).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="en-IN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#f4f0e8" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />
    <meta name="author" content="Pratik Bajoria" />
    <title>${escHtml(title)} — Pratik Bajoria</title>
    <meta name="description" content="${escHtml(excerpt)}" />
    <link rel="canonical" href="${escHtml(canonical)}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escHtml(title)}" />
    <meta property="og:description" content="${escHtml(excerpt)}" />
    <meta property="og:url" content="${escHtml(canonical)}" />
    <meta property="og:image" content="${escHtml(image)}" />
    <meta property="og:site_name" content="Pratik Bajoria" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escHtml(title)}" />
    <meta name="twitter:description" content="${escHtml(excerpt)}" />
    <meta name="twitter:image" content="${escHtml(image)}" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="stylesheet" href="/styles.css" />
    <link rel="stylesheet" href="/styles-overrides.css?v=20260910" />
    <script type="application/ld+json">
${ldJson}
    </script>
    <script type="application/ld+json">
${crumbsJson}
    </script>${structured ? faqJsonLd(post, canonical) : ''}
    <script src="/ga4.js?v=20261009-ev" defer></script>
  </head>
  <body data-static-article="1" data-slug="${escHtml(slug)}">
    <main class="shell article-page">
      <header class="article-header">
        <a class="wordmark" href="/" aria-label="Pratik Bajoria home"><span>PB</span></a>
        <div class="article-header-links">
          <a class="text-link" href="/topics">50 topic guide ↗</a>
          <a class="text-link" href="/blog">All insights ↗</a>
          <a class="text-link" href="/#insights">Home insights ↗</a>
        </div>
      </header>
      ${breadcrumbNav([['Home', '/'], ['Blog', '/blog'], [title, null]])}
      <article id="article">
        <p class="eyebrow">${escHtml(post.category || 'AI implementation')} · ${escHtml(post.date || '')} · ${escHtml(post.readTime || 6)} min read</p>
        <h1>${escHtml(title)}</h1>
        <p class="article-dek">${escHtml(excerpt)}</p>
        <div class="article-body">
${paras}
${sourcesHtml}${structured ? `\n<p><em>${escHtml(post.disclaimer || STRUCTURED_DISCLAIMER)}</em></p>` : ''}
        </div>
        ${toolsHtml}
        <p class="ymyl-note" style="margin-top:28px;font-size:0.92rem;color:#6f746d"><em>Educational content; not financial, investment, or legal advice.</em></p>
        <div class="article-cta" style="margin-top:40px;padding:24px;border:1px solid rgba(28,28,26,0.12);border-radius:12px">
          <p class="eyebrow">Next step</p>
          <h2 style="font-size:1.4rem;margin:8px 0 12px">Turn this insight into action</h2>
          <p>Discuss where AI creates measurable P&amp;L impact — or start free with the scorecard.</p>
          <p class="article-cta-actions" style="margin-top:16px;display:flex;flex-wrap:wrap;gap:12px;align-items:center">
            <a class="button button-dark" href="/#contact">Book a discovery call <span>↗</span></a>
            <a class="button button-cream" href="/scorecard">Get the free AI Opportunity Scorecard <span>↗</span></a>
          </p>
          <p style="margin-top:14px"><a class="muted-link" href="/audit">See the AI Opportunity Audit →</a></p>
        </div>
      </article>
    </main>
    <footer class="site-footer shell">
      <div class="wordmark"><span>PB</span></div>
      <div>© <span id="year"></span> Pratik Bajoria</div>
      <div>
        <a href="/privacy">Privacy</a>
        <a href="/llms.txt">llms.txt</a>
        <a href="/blog">Blog</a>
        <a href="/topics">Topics</a>
        <a href="mailto:hello@pratikbajoria.com">Contact</a>
      </div>
    </footer>
    <script>document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());</script>
    <script src="/blog.js?v=20260909" defer></script>
  </body>
</html>
`;
}

async function serveBlogPost(request, env, slug) {
  // 1. Static SSR file (public/blog/{slug}.html) wins.
  // HEAD must be validated against the real body (an empty HEAD body would fail the
  // looksLikeRealBlogPage check and wrongly 404 static-only posts), so probe with GET.
  const isHead = request.method === 'HEAD';
  const direct = await env.ASSETS.fetch(isHead ? new Request(request, { method: 'GET' }) : request);
  if (direct.status === 200) {
    const ctype = direct.headers.get('content-type') || '';
    if (!ctype.includes('text/html')) return isHead ? new Response(null, { status: 200, headers: direct.headers }) : direct;
    const html = await direct.text();
    if (looksLikeRealBlogPage(html, slug)) {
      if (isHead) return new Response(null, { status: 200, statusText: direct.statusText, headers: direct.headers });
      return injectGa4(new Response(html, { status: 200, statusText: direct.statusText, headers: direct.headers }));
    }
    // else: SPA/homepage fallback — fall through.
  } else if (direct.status >= 300 && direct.status < 400) {
    return direct;
  }
  // 2. JSON-only post: server-render from blog-posts.json / affiliate-articles.json.
  const posts = await loadAllPosts(request, env);
  const post = posts.find((p) => p && p.slug === slug);
  if (post) {
    const catalog = await loadJsonAsset(request, env, '/affiliate-links.json', {});
    return new Response(request.method === 'HEAD' ? null : renderPostHtml(post, catalog), {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300, must-revalidate',
        'X-Blog-Render': 'json-fallback'
      }
    });
  }
  // 3. Unknown slug: real 404.
  return notFound(request, env);
}

// sitemap.xml = static file + any JSON posts not yet listed (e.g. JSON-only daily posts).
async function serveSitemap(request, env) {
  const r = await env.ASSETS.fetch(request);
  if (r.status !== 200) return r;
  let xml = await r.text();
  if (CROSSBORDER_LIVE) xml = xml.replace(/[ \t]*<url>\s*<loc>https:\/\/pratikbajoria\.com\/cross-border-partnerships<\/loc>[\s\S]*?<\/url>\s*\n?/g, '');
  const posts = await loadAllPosts(request, env);
  const have = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()));
  const extra = [];
  const seen = new Set();
  for (const p of posts) {
    if (!p || !p.slug || !isBlogSlug(p.slug) || seen.has(p.slug)) continue;
    seen.add(p.slug);
    if (blogPathAliases[`/blog/${p.slug}`]) continue;
    const loc = `${SITE}/blog/${p.slug}`;
    if (have.has(loc)) continue;
    const lastmod = /^\d{4}-\d{2}-\d{2}$/.test(p.date || '') ? `<lastmod>${p.date}</lastmod>` : '';
    extra.push(`  <url><loc>${loc}</loc>${lastmod}<changefreq>monthly</changefreq><priority>0.75</priority></url>\n`);
  }
  if (extra.length) xml = xml.replace('</urlset>', extra.join('') + '</urlset>');
  return new Response(xml, {
    status: 200,
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' }
  });
}

async function handleDiscovery(request, env) {
  if (!env.DB) return json({ ok: false, error: 'Lead storage is not configured.' }, 503);
  let body; try { body = await request.json(); } catch { return json({ ok: false, error: 'Invalid request.' }, 400); }
  if (text(body.website, 80)) return json({ ok: true });
  const name = text(body.name, 120), email = text(body.email, 254).toLowerCase(), company = text(body.company, 160), phone = text(body.phone, 60), challenge = text(body.challenge, 3000), pageUrl = text(body.pageUrl, 500), referrer = text(body.referrer, 500);
  if (!name || !company || !challenge || !isEmail(email) || body.consent !== true) return json({ ok: false, error: 'Please complete the required fields and consent.' }, 422);
  // Optional enquiry type (e.g. cross-border page CTAs). Allow-listed; stored in source + metadata.
  const interest = LEAD_INTERESTS.has(text(body.interest, 40)) ? text(body.interest, 40) : '';
  const source = interest || 'website';
  const metadata = interest ? JSON.stringify({ interest, country: text(body.country, 80) || null, lane: text(body.lane, 80) || null }) : null;
  const now = new Date().toISOString();
  await env.DB.prepare(`INSERT INTO leads (id, kind, created_at, consent_at, name, email, company, phone, challenge, source, page_url, referrer, metadata) VALUES (?, 'discovery', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(crypto.randomUUID(), now, now, name, email, company, phone || null, challenge, source, pageUrl || null, referrer || null, metadata).run();
  return json({ ok: true, message: 'Your discovery request has been received.' }, 201);
}

async function handleSubscribe(request, env) {
  if (!env.DB) return json({ ok: false, error: 'Subscriber storage is not configured.' }, 503);
  let body; try { body = await request.json(); } catch { return json({ ok: false, error: 'Invalid request.' }, 400); }
  if (text(body.website, 80)) return json({ ok: true });
  const email = text(body.email, 254).toLowerCase(), pageUrl = text(body.pageUrl, 500), referrer = text(body.referrer, 500);
  if (!isEmail(email) || body.consent !== true) return json({ ok: false, error: 'Please provide a valid email address and consent.' }, 422);
  const now = new Date().toISOString();
  await env.DB.prepare(`INSERT INTO leads (id, kind, created_at, consent_at, email, source, page_url, referrer) VALUES (?, 'newsletter', ?, ?, ?, ?, ?, ?)`)
    .bind(crypto.randomUUID(), now, now, email, 'newsletter', pageUrl || null, referrer || null).run();
  return json({ ok: true, message: 'You are on the list.' }, 201);
}

async function handleLeads(request, env) {
  if (!env.ADMIN_TOKEN || request.headers.get('Authorization') !== `Bearer ${env.ADMIN_TOKEN}`) return json({ ok: false, error: 'Unauthorized.' }, 401);
  if (!env.DB) return json({ ok: false, error: 'Lead storage is not configured.' }, 503);
  const url = new URL(request.url), kind = url.searchParams.get('kind'), limit = Math.min(Math.max(Number(url.searchParams.get('limit') || 100), 1), 1000), filtered = kind === 'discovery' || kind === 'newsletter';
  const query = filtered ? 'SELECT * FROM leads WHERE kind = ? ORDER BY created_at DESC LIMIT ?' : 'SELECT * FROM leads ORDER BY created_at DESC LIMIT ?';
  const result = filtered ? await env.DB.prepare(query).bind(kind, limit).all() : await env.DB.prepare(query).bind(limit).all();
  return json({ ok: true, count: result.results.length, leads: result.results });
}

async function serveBlogAsset(request, env, slug) {
  // Prefer static SSR HTML via Pages pretty URLs / explicit .html asset.
  if (slug) {
    const direct = await env.ASSETS.fetch(request);
    if (direct.status === 200) {
      const ctype = direct.headers.get('content-type') || '';
      if (ctype.includes('text/html')) return injectGa4(direct);
    }
    const assetHeaders = new Headers(request.headers);
    assetHeaders.set(INTERNAL_ASSET_HEADER, '1');
    const htmlUrl = new URL(request.url);
    htmlUrl.pathname = `/blog/${encodeURIComponent(slug)}.html`;
    htmlUrl.search = '';
    const htmlResp = await env.ASSETS.fetch(new Request(htmlUrl.toString(), {
      method: 'GET',
      headers: assetHeaders,
      redirect: 'manual'
    }));
    if (htmlResp.status === 200) return injectGa4(htmlResp);
  }
  const assetHeaders = new Headers(request.headers);
  assetHeaders.set(INTERNAL_ASSET_HEADER, '1');
  const shellUrl = new URL(request.url);
  shellUrl.pathname = '/blog';
  shellUrl.search = '';
  const shell = await env.ASSETS.fetch(new Request(shellUrl.toString(), {
    method: request.method,
    headers: assetHeaders,
    redirect: 'manual'
  }));
  if (request.method !== 'GET' || shell.status !== 200 || !(shell.headers.get('content-type') || '').includes('text/html')) return injectGa4(shell);
  const html = injectMissingBlogCards(await shell.text(), await loadAllPosts(request, env));
  const h = new Headers(shell.headers);
  h.delete('content-length');
  h.delete('etag');
  return injectGa4(new Response(html, { status: 200, statusText: shell.statusText, headers: h }));
}

// Every /api/* response (both hosts) carries X-Robots-Tag: noindex; robots.txt also disallows /api/.
const API_POST_ONLY = new Set(['/api/discovery', '/api/subscribe']);
async function handleApi(request, env, url) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
  if (request.method === 'POST' && url.pathname === '/api/discovery') return handleDiscovery(request, env);
  if (request.method === 'POST' && url.pathname === '/api/subscribe') return handleSubscribe(request, env);
  if (request.method === 'GET' && url.pathname === '/api/leads') return handleLeads(request, env);
  if (API_POST_ONLY.has(url.pathname)) {
    const r = json({ ok: false, error: 'Method not allowed.' }, 405);
    r.headers.set('Allow', 'POST, OPTIONS');
    return request.method === 'HEAD' ? new Response(null, r) : r;
  }
  const r = json({ ok: false, error: 'Not found.' }, 404);
  return request.method === 'HEAD' ? new Response(null, r) : r;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.headers.get(INTERNAL_ASSET_HEADER) === '1') return env.ASSETS.fetch(request);
    if (url.pathname === '/api' || url.pathname.startsWith('/api/')) {
      const r = await handleApi(request, env, url);
      const out = new Response(r.body, r);
      out.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return out;
    }

    // Cross-border subdomain (API routes above work on both hosts).
    if (requestHost(request, url) === XB_HOST) return serveCrossborder(request, env, url, 'subdomain');

    // pratikbajoria.com/crossborder/*: 301 to the subdomain once live; noindex preview until then.
    if (url.pathname === XB_DIR || url.pathname.startsWith(`${XB_DIR}/`)) {
      if (CROSSBORDER_LIVE) {
        const n = xbNormalise(url.pathname);
        const p = XB_REDIRECTS[n] || n;
        return xbRedirect(`${XB_ORIGIN}${p === '/' ? '/' : p}${url.search}`);
      }
      return serveCrossborder(request, env, url, 'preview');
    }

    // Old cross-border page -> subdomain, only once live.
    if (CROSSBORDER_LIVE && (url.pathname === XB_OLD_PAGE || url.pathname === `${XB_OLD_PAGE}.html` || url.pathname === `${XB_OLD_PAGE}/`)) {
      return xbRedirect(`${XB_ORIGIN}/`);
    }
    if (CROSSBORDER_LIVE && request.method === 'GET' && (url.pathname === '/robots.txt' || url.pathname === '/llms.txt')) {
      // The body is rewritten here, so the static file's validators no longer describe it:
      // ignore the client's/edge's If-None-Match / If-Modified-Since (otherwise the asset
      // server answers 304 and a stale cached copy survives) and drop ETag/Last-Modified.
      const fresh = new Headers(request.headers);
      fresh.delete('if-none-match');
      fresh.delete('if-modified-since');
      const r = await env.ASSETS.fetch(new Request(request, { headers: fresh }));
      if (r.status === 200) {
        let body = rewriteMainCrossborderLinks(await r.text());
        if (url.pathname === '/robots.txt' && !body.includes(`${XB_ORIGIN}/sitemap.xml`)) body = `${body.replace(/\s*$/, '\n')}Sitemap: ${XB_ORIGIN}/sitemap.xml\n`;
        const h = new Headers(r.headers);
        h.delete('content-length');
        h.delete('etag');
        h.delete('last-modified');
        return new Response(body, { status: 200, headers: h });
      }
      return r;
    }

    // Redirect-bearing routes below must answer HEAD exactly like GET. Otherwise HEAD falls
    // through to env.ASSETS and Pages answers with its own 308 + relative Location
    // (e.g. HEAD /topics.html -> 308 /topics), which crawlers/GSC report as a redirect error.
    const isRead = request.method === 'GET' || request.method === 'HEAD';

    if (isRead && (url.pathname === '/blog' || url.pathname === '/blog.html')) {
      const legacySlug = url.searchParams.get('slug')?.trim();
      if (legacySlug && isBlogSlug(legacySlug)) {
        const aliased = blogPathAliases[`/blog/${legacySlug}`];
        return absoluteRedirect(url, aliased || `/blog/${encodeURIComponent(legacySlug)}`);
      }
      // Collapse /blog.html → /blog (single hop; avoids GSC redirect-chain errors)
      if (url.pathname === '/blog.html') {
        return absoluteRedirect(url, '/blog');
      }
      return serveBlogAsset(request, env, null);
    }

    // /blog/{slug}: static SSR HTML first, then JSON server-render, else real 404 (see serveBlogPost).


    if (isRead && (url.pathname === '/insights' || url.pathname === '/insights/')) {
      return absoluteRedirect(url, '/blog');
    }

    const blogAlias = isRead ? blogAliasFor(url.pathname) : null;
    if (blogAlias) {
      return absoluteRedirect(url, blogAlias);
    }

    // Absolute 301s for legacy .html URLs (GSC flagged relative _redirects Location as Redirect error)
    const htmlAliases = {
      '/topics.html': '/topics',
      '/privacy.html': '/privacy',
      '/audit.html': '/audit',
      '/scorecard.html': '/scorecard',
      '/workshops.html': '/workshops',
      '/resources.html': '/resources',
      '/how-to-start-ai-implementation.html': '/how-to-start-ai-implementation',
      '/ai-opportunity-audit-for-ca-firms.html': '/ai-opportunity-audit-for-ca-firms',
      '/ai-implementation-for-finance-teams.html': '/ai-implementation-for-finance-teams',
      '/workflow-automation-with-ai-for-mid-market.html': '/workflow-automation-with-ai-for-mid-market',
      '/cross-border-partnerships.html': '/cross-border-partnerships',
    };
    if (isRead && htmlAliases[url.pathname]) {
      return absoluteRedirect(url, htmlAliases[url.pathname]);
    }

    // Every other /path/, /path.html and /path/index.html: one absolute 301 to the clean URL
    // (Pages would otherwise answer 308 with a relative Location, which GSC flags).
    if (isRead) {
      const clean = cleanPathname(url.pathname);
      if (clean !== url.pathname) return absoluteRedirect(url, `${blogAliasFor(clean) || clean}${url.search}`);
    }

    if (request.method === 'GET' && url.pathname === '/sitemap.xml') {
      return serveSitemap(request, env);
    }

    if (request.method === 'GET' || request.method === 'HEAD') {
      const m = url.pathname.match(/^\/blog\/([^\/]+)$/);
      if (m && isBlogSlug(m[1])) return serveBlogPost(request, env, m[1]);
    }

    return injectGa4(await env.ASSETS.fetch(request));
  }
};
