#!/usr/bin/env node
// Technical SEO audit for pratikbajoria.com + crossborder.pratikbajoria.com.
// Zero dependencies (Node 18+). Runs against production by default.
//
//   node scripts/seo-audit.mjs                 # full audit, human-readable table
//   node scripts/seo-audit.mjs --json out.json # also write machine-readable results
//   node scripts/seo-audit.mjs --no-external   # skip external link checks
//
// Checks (numbered to match the 19-point checklist):
//  1 robots.txt lets Googlebot in, no CSS/JS blocking, sitemap referenced
//  2 server-rendered content (raw HTML has H1, body text and internal links; no JS needed)
//  3 no unintended noindex (meta robots / X-Robots-Tag) on sitemap URLs
//  4 mobile viewport meta
//  5 sitemap valid; only 200 self-canonical URLs; sane lastmod
//  6 sitemap referenced in robots.txt (Search Console submission is manual)
//  7 unique titles (warn outside 30-65 chars)  8 unique meta descriptions (warn outside 70-170)
//  9 absolute self-canonical matching the sitemap URL
// 10 internal links + images resolve 200 (no redirects); external links alive
// 11 alt attribute on every <img>
// 12 every sitemap URL linked from at least one other page
// 13 homepage Person + ProfessionalService/Organization JSON-LD with name/url/email/sameAs
// 14 visible breadcrumb + BreadcrumbList JSON-LD on inner pages; all JSON-LD parses
// 15 first-party raster <img> served as WebP/AVIF
// 16 width/height on every <img>; web fonts use font-display swap/optional
// 17 TTFB < 800 ms, HTML < 150 KB, no render-blocking <script> in <head>
// 18 http/www/.html/trailing-slash variants: one 301 hop to the absolute 200 URL (GET + HEAD)
// 19 AI/search crawlers allowed in robots.txt and not blocked at the edge (curl with their UA)

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const SKIP_EXTERNAL = flag('--no-external');
const JSON_OUT = opt('--json');
const HOSTS = ['https://pratikbajoria.com', 'https://crossborder.pratikbajoria.com'];
const UA = 'Mozilla/5.0 (compatible; pb-seo-audit/1.0; +https://pratikbajoria.com/)';
const BOTS = {
  Googlebot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  Bingbot: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  'OAI-SearchBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot',
  GPTBot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.1; +https://openai.com/gptbot',
  'ChatGPT-User': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot',
  PerplexityBot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot',
  ClaudeBot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ClaudeBot/1.0; +claudebot@anthropic.com',
  'Google-Extended': 'Mozilla/5.0 (compatible; Google-Extended)',
  'Claude-User': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; Claude-User/1.0; +Claude-User@anthropic.com',
  'Claude-SearchBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; Claude-SearchBot/1.0; +Claude-SearchBot@anthropic.com',
  'Perplexity-User': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)',
  Applebot: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)',
  DuckDuckBot: 'DuckDuckBot/1.1; (+http://duckduckgo.com/duckduckbot.html)'
};
// Sites known to answer bots with 403/429/999 while serving real pages to people.
const BOT_BLOCKING_HOSTS = /(^|\.)(linkedin\.com|icai\.org|deloitte\.com|ey\.com|pwc\.com|kpmg\.com|mckinsey\.com|bcg\.com|weforum\.org|microsoft\.com|gartner\.com|investopedia\.com|indeed\.com|glassdoor\.com|zoho\.com|hubspot\.com|semrush\.com|notion\.so|x\.com|twitter\.com|facebook\.com|instagram\.com|medium\.com|whatsapp\.com|wa\.me|reuters\.com|bloomberg\.com|ft\.com|wsj\.com|economictimes\.indiatimes\.com|livemint\.com|business-standard\.com|statista\.com|openai\.com|chatgpt\.com|anthropic\.com|claude\.ai|cbic-gst\.gov\.in|gst\.gov\.in|incometax\.gov\.in|incometaxindia\.gov\.in|cbic\.gov\.in|rbi\.org\.in|sebi\.gov\.in|mca\.gov\.in|meity\.gov\.in|pib\.gov\.in|indiacode\.nic\.in|nasscom\.in|quickbooks\.intuit\.com|intuit\.com|xero\.com|g2\.com|capterra\.com)$/i;

const results = {}; // id -> { pass: bool, notes: [] }
const fail = (id, msg) => { (results[id] ||= { fails: [], warns: [] }).fails.push(msg); };
const warn = (id, msg) => { (results[id] ||= { fails: [], warns: [] }).warns.push(msg); };
const touch = (id) => { results[id] ||= { fails: [], warns: [] }; };

async function req(url, { method = 'GET', ua = UA, redirect = 'manual', timeout = 20000 } = {}) {
  const t0 = performance.now();
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeout);
  try {
    const r = await fetch(url, { method, redirect, headers: { 'User-Agent': ua, Accept: 'text/html,application/xhtml+xml,*/*;q=0.8' }, signal: ctl.signal });
    const ttfb = performance.now() - t0;
    const body = method === 'HEAD' ? '' : await r.text();
    return { status: r.status, headers: r.headers, body, ttfb, url: r.url };
  } catch (e) {
    return { status: 0, headers: new Headers(), body: '', ttfb: performance.now() - t0, error: String(e.message || e) };
  } finally { clearTimeout(timer); }
}

async function pool(items, n, fn) {
  const out = []; let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => { while (i < items.length) { const k = i++; out[k] = await fn(items[k], k); } }));
  return out;
}

const decode = (s) => String(s || '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const attr = (tag, name) => { const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i')); return m ? decode(m[2] ?? m[3] ?? m[4]) : null; };
const metaContent = (html, name) => { for (const m of html.matchAll(/<meta\b[^>]*>/gi)) { const t = m[0]; if ((attr(t, 'name') || attr(t, 'property') || '').toLowerCase() === name) return attr(t, 'content'); } return null; };

function parse(html) {
  const head = (html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i) || [, ''])[1];
  const bodyHtml = (html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i) || [, html])[1];
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1].trim());
  const canonicals = [...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi)].map((m) => attr(m[0], 'href'));
  const jsonld = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  const imgs = [...bodyHtml.matchAll(/<img\b[^>]*>/gi)].map((m) => ({ tag: m[0], src: attr(m[0], 'src'), alt: attr(m[0], 'alt'), width: attr(m[0], 'width'), height: attr(m[0], 'height') }));
  const sources = [...bodyHtml.matchAll(/<source\b[^>]*>/gi)].map((m) => attr(m[0], 'srcset')).filter(Boolean);
  const links = [...bodyHtml.matchAll(/<a\b[^>]*>/gi)].map((m) => attr(m[0], 'href')).filter(Boolean);
  const text = bodyHtml.replace(/<script\b[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const h1 = [...bodyHtml.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => m[1].replace(/<[^>]+>/g, '').trim());
  const headScripts = [...head.matchAll(/<script\b[^>]*>/gi)].map((m) => m[0]).filter((t) => attr(t, 'src') && !/\s(defer|async)\b/i.test(t) && !/type=["']module["']/i.test(t));
  const fontLinks = [...html.matchAll(/<link\b[^>]*href=["'](https:\/\/fonts\.googleapis\.com\/[^"']+)["'][^>]*>/gi)].map((m) => decode(m[1]));
  const fontFacesWithoutDisplay = [...html.matchAll(/@font-face\s*\{([^}]*)\}/gi)].filter((m) => !/font-display\s*:\s*(swap|optional|fallback)/i.test(m[1])).length;
  const hasVisibleBreadcrumb = /<nav\b[^>]*aria-label=["']breadcrumb["']/i.test(bodyHtml) || /class=["'][^"']*\bbreadcrumbs?\b/i.test(bodyHtml);
  return { head, title, description: metaContent(html, 'description'), robots: metaContent(html, 'robots'), viewport: metaContent(html, 'viewport'), canonicals, jsonld, imgs, sources, links, text, h1, headScripts, fontLinks, fontFacesWithoutDisplay, hasVisibleBreadcrumb };
}

function ldTypes(blocks) {
  const types = []; const errors = []; const nodes = [];
  for (const b of blocks) {
    let j; try { j = JSON.parse(b); } catch (e) { errors.push(e.message); continue; }
    const walk = (n) => { if (Array.isArray(n)) return n.forEach(walk); if (n && typeof n === 'object') { if (n['@type']) { nodes.push(n); [].concat(n['@type']).forEach((t) => types.push(t)); } Object.values(n).forEach(walk); } };
    walk(j);
  }
  return { types, errors, nodes };
}

const normaliseInternal = (href, base) => {
  try { const u = new URL(href, base); u.hash = ''; return u; } catch { return null; }
};
const isOwnHost = (u) => /^(crossborder\.)?pratikbajoria\.com$/.test(u.hostname);

async function main() {
  const report = { generatedAt: new Date().toISOString(), pages: {} };

  // --- 1, 6, 19: robots.txt -------------------------------------------------
  for (const host of HOSTS) {
    const r = await req(`${host}/robots.txt`);
    touch(1); touch(6); touch(19);
    if (r.status !== 200) { fail(1, `${host}/robots.txt -> ${r.status}`); continue; }
    const groups = []; let cur = null;
    for (const raw of r.body.split(/\r?\n/)) {
      const line = raw.replace(/#.*/, '').trim(); if (!line) continue;
      const [k, ...v] = line.split(':'); const key = k.trim().toLowerCase(); const val = v.join(':').trim();
      if (key === 'user-agent') { if (!cur || cur.rules.length) { cur = { agents: [], rules: [] }; groups.push(cur); } cur.agents.push(val.toLowerCase()); }
      else if ((key === 'allow' || key === 'disallow') && cur) cur.rules.push({ key, val });
    }
    const groupFor = (bot) => groups.find((g) => g.agents.includes(bot.toLowerCase())) || groups.find((g) => g.agents.includes('*'));
    const blocked = (bot, path) => { const g = groupFor(bot); if (!g) return false; let best = null; for (const rule of g.rules) { if (!rule.val) continue; const re = new RegExp('^' + rule.val.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\\\$$/, '$')); if (re.test(path) && (!best || rule.val.length > best.val.length || (rule.val.length === best.val.length && rule.key === 'allow'))) best = rule; } return best ? best.key === 'disallow' : false; };
    for (const p of ['/', '/styles.css', '/app-v2.js', '/blog', '/assets/site.css']) if (blocked('Googlebot', p)) fail(1, `${host} robots.txt blocks Googlebot from ${p}`);
    if (!/^sitemap:\s*https:\/\//im.test(r.body)) { fail(1, `${host} robots.txt has no Sitemap line`); fail(6, `${host} robots.txt has no Sitemap line`); }
    for (const bot of Object.keys(BOTS)) {
      if (blocked(bot, '/')) fail(19, `${host} robots.txt disallows ${bot}`);
      if (host === HOSTS[0] && !groups.some((g) => g.agents.includes(bot.toLowerCase()))) warn(19, `${host} robots.txt has no explicit group for ${bot} (falls back to *)`);
    }
    report[`robots ${host}`] = r.body;
  }

  // --- 19: edge does not block crawler UAs -------------------------------------
  for (const host of HOSTS) for (const [bot, ua] of Object.entries(BOTS)) {
    const r = await req(`${host}/`, { ua });
    if (r.status !== 200 || /cf-chl|challenge-platform|Attention Required/i.test(r.body)) fail(19, `${host}/ as ${bot} -> ${r.status}${r.status === 200 ? ' (challenge page)' : ''}`);
  }

  // --- 5: sitemaps ---------------------------------------------------------------
  const sitemapUrls = [];
  for (const host of HOSTS) {
    const r = await req(`${host}/sitemap.xml`); touch(5);
    if (r.status !== 200) { fail(5, `${host}/sitemap.xml -> ${r.status}`); continue; }
    if (!/<urlset\b[^>]*xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/.test(r.body)) fail(5, `${host}/sitemap.xml missing urlset namespace`);
    const urls = [...r.body.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({ loc: (m[1].match(/<loc>([^<]+)<\/loc>/) || [])[1]?.trim(), lastmod: (m[1].match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1]?.trim() }));
    const seen = new Set();
    const tomorrow = new Date(Date.now() + 36 * 3600e3).toISOString().slice(0, 10);
    for (const u of urls) {
      if (!u.loc) { fail(5, `${host} sitemap entry without <loc>`); continue; }
      if (seen.has(u.loc)) fail(5, `duplicate sitemap loc ${u.loc}`); seen.add(u.loc);
      if (!u.loc.startsWith(host + '/')) fail(5, `${u.loc} not on ${host}`);
      if (u.lastmod && (!/^\d{4}-\d{2}-\d{2}/.test(u.lastmod) || u.lastmod.slice(0, 10) > tomorrow || u.lastmod < '2024-01-01')) fail(5, `bad lastmod ${u.lastmod} for ${u.loc}`);
      if (!u.lastmod) warn(5, `no lastmod for ${u.loc}`);
      sitemapUrls.push(u.loc);
    }
  }

  // --- crawl sitemap URLs --------------------------------------------------------
  const pages = {};
  await pool(sitemapUrls, 6, async (loc) => {
    const r = await req(loc);
    pages[loc] = { r, p: r.status === 200 ? parse(r.body) : null };
  });

  const titles = new Map(); const descs = new Map(); const linkGraph = new Map(); const internalTargets = new Map(); const externalTargets = new Map(); const imageTargets = new Map();
  for (const loc of sitemapUrls) {
    const { r, p } = pages[loc];
    const rec = report.pages[loc] = { status: r.status, ttfbMs: Math.round(r.ttfb), bytes: r.body.length };
    if (r.status !== 200) { fail(5, `${loc} -> ${r.status}${r.headers.get('location') ? ' ' + r.headers.get('location') : ''}`); continue; }
    const isHome = /^https:\/\/[^/]+\/$/.test(loc);
    // 2 SSR
    touch(2);
    if (!p.h1.length) fail(2, `${loc} has no <h1> in raw HTML`);
    if (p.text.split(' ').length < 150) fail(2, `${loc} raw HTML has only ${p.text.split(' ').length} words`);
    const ownLinks = p.links.filter((h) => { const u = normaliseInternal(h, loc); return u && isOwnHost(u) && /^https?:/.test(u.protocol); });
    if (ownLinks.length < 3) fail(2, `${loc} raw HTML has ${ownLinks.length} internal links`);
    if (/id=["'](root|app)["']\s*>\s*<\/div>/i.test(r.body) && p.text.length < 500) fail(2, `${loc} looks like an empty JS shell`);
    // 3 noindex
    touch(3);
    const xr = r.headers.get('x-robots-tag') || '';
    if (/noindex/i.test(p.robots || '') || /noindex/i.test(xr)) fail(3, `${loc} noindex (meta="${p.robots}" header="${xr}")`);
    // 4 viewport
    touch(4);
    if (!p.viewport || !/width=device-width/.test(p.viewport)) fail(4, `${loc} missing viewport meta`);
    if (/<(table|div|img|section)\b[^>]*style=["'][^"']*(?<![-\w])width:\s*([6-9]\d\d|\d{4,})px/i.test(r.body)) warn(4, `${loc} has an inline fixed width >= 600px`);
    // 7/8
    touch(7); touch(8);
    if (!p.title) fail(7, `${loc} missing <title>`); else { (titles.get(p.title) || titles.set(p.title, []).get(p.title)).push(loc); if (p.title.length > 70 || p.title.length < 25) warn(7, `${loc} title ${p.title.length} chars`); }
    if (!p.description) fail(8, `${loc} missing meta description`); else { (descs.get(p.description) || descs.set(p.description, []).get(p.description)).push(loc); if (p.description.length > 170 || p.description.length < 70) warn(8, `${loc} description ${p.description.length} chars`); }
    // 9 canonical
    touch(9);
    if (p.canonicals.length !== 1) fail(9, `${loc} has ${p.canonicals.length} canonical tags`);
    else if (p.canonicals[0] !== loc) fail(9, `${loc} canonical -> ${p.canonicals[0]}`);
    // 11 alt, 15 webp, 16 dimensions
    touch(11); touch(15); touch(16);
    for (const img of p.imgs) {
      if (img.alt === null) fail(11, `${loc} <img src="${img.src}"> has no alt`);
      if (!img.width || !img.height) fail(16, `${loc} <img src="${img.src}"> missing width/height`);
      const u = img.src && normaliseInternal(img.src, loc);
      if (u) {
        imageTargets.set(u.toString(), loc);
        const raster = /\.(jpe?g|png|gif)$/i.test(u.pathname);
        const unsplashNoFormat = /images\.unsplash\.com$/.test(u.hostname) && !/(fm=(webp|avif)|auto=format)/.test(u.search);
        if ((isOwnHost(u) && raster && !p.sources.length) || unsplashNoFormat) fail(15, `${loc} serves non-WebP image ${img.src}`);
      }
    }
    for (const f of p.fontLinks) if (!/display=swap/.test(f)) fail(16, `${loc} font CSS without display=swap: ${f}`);
    if (p.fontFacesWithoutDisplay) fail(16, `${loc} has ${p.fontFacesWithoutDisplay} @font-face rule(s) without font-display`);
    // 17 perf proxies
    touch(17);
    if (r.ttfb > 800) warn(17, `${loc} TTFB ${Math.round(r.ttfb)} ms`);
    if (r.body.length > 150000) warn(17, `${loc} HTML ${r.body.length} bytes`);
    for (const s of p.headScripts) fail(17, `${loc} render-blocking script in <head>: ${attr(s, 'src')}`);
    // 13/14 JSON-LD
    touch(13); touch(14);
    const { types, errors, nodes } = ldTypes(p.jsonld);
    for (const e of errors) fail(14, `${loc} JSON-LD does not parse: ${e}`);
    rec.jsonldTypes = [...new Set(types)];
    if (isHome && loc.startsWith(HOSTS[0])) {
      const person = nodes.find((n) => [].concat(n['@type']).includes('Person') && n.name === 'Pratik Bajoria');
      const biz = nodes.find((n) => [].concat(n['@type']).some((t) => t === 'ProfessionalService' || t === 'Organization'));
      if (!person) fail(13, 'homepage has no Person "Pratik Bajoria" JSON-LD');
      if (!biz) fail(13, 'homepage has no ProfessionalService/Organization JSON-LD');
      else {
        if (biz.email !== 'hello@pratikbajoria.com') fail(13, `business email is ${biz.email}`);
        if (biz.url !== 'https://pratikbajoria.com/') fail(13, `business url is ${biz.url}`);
        if (!Array.isArray(biz.sameAs) || !biz.sameAs.length) fail(13, 'business has no sameAs');
        for (const k of ['address', 'telephone', 'aggregateRating', 'review']) if (biz[k]) warn(13, `business JSON-LD has ${k} — confirm it is real`);
      }
    }
    if (!isHome) {
      if (!types.includes('BreadcrumbList')) fail(14, `${loc} has no BreadcrumbList JSON-LD`);
      if (!p.hasVisibleBreadcrumb) fail(14, `${loc} has no visible breadcrumb nav`);
    }
    // collect links for 10 & 12
    const outs = new Set();
    for (const h of p.links) {
      if (/^(mailto:|tel:|javascript:|#)/i.test(h)) continue;
      const u = normaliseInternal(h, loc); if (!u || !/^https?:$/.test(u.protocol)) continue;
      if (u.pathname.startsWith('/cdn-cgi/')) continue;
      if (isOwnHost(u)) { const k = u.origin + u.pathname + u.search; outs.add(u.origin + u.pathname); if (!internalTargets.has(k)) internalTargets.set(k, loc); }
      else if (!externalTargets.has(u.toString())) externalTargets.set(u.toString(), loc);
    }
    linkGraph.set(loc, outs);
  }
  for (const [t, locs] of titles) if (locs.length > 1) fail(7, `duplicate title "${t}" on ${locs.join(', ')}`);
  for (const [d, locs] of descs) if (locs.length > 1) fail(8, `duplicate description on ${locs.join(', ')}`);

  // 12 orphans
  touch(12);
  for (const loc of sitemapUrls) {
    const linked = [...linkGraph].some(([from, outs]) => from !== loc && outs.has(loc));
    if (!linked) fail(12, `${loc} is not linked from any other sitemap page`);
  }

  // 10 internal links + images
  touch(10);
  const sitemapSet = new Set(sitemapUrls);
  await pool([...internalTargets.keys()], 8, async (url) => {
    const from = internalTargets.get(url);
    const r = await req(url, { method: 'GET' });
    if (r.status === 200) return;
    if (r.status >= 300 && r.status < 400) { warn(10, `internal link ${url} (on ${from}) redirects ${r.status} -> ${r.headers.get('location')}`); return; }
    fail(10, `internal link ${url} (on ${from}) -> ${r.status}`);
  });
  await pool([...imageTargets.keys()], 8, async (url) => {
    const r = await req(url, { method: 'GET', redirect: 'follow' });
    if (r.status !== 200) fail(10, `image ${url} (on ${imageTargets.get(url)}) -> ${r.status}`);
  });
  if (!SKIP_EXTERNAL) {
    await pool([...externalTargets.keys()], 8, async (url) => {
      const from = externalTargets.get(url);
      const host = new URL(url).hostname;
      let r = await req(url, { method: 'HEAD', redirect: 'follow', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127 Safari/537.36' });
      if (r.status >= 400 || r.status === 0) r = await req(url, { method: 'GET', redirect: 'follow', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127 Safari/537.36' });
      if (r.status >= 200 && r.status < 400) return;
      if ([401, 403, 405, 406, 418, 429, 999].includes(r.status) && BOT_BLOCKING_HOSTS.test(host)) { warn(10, `external ${url} -> ${r.status} (bot-blocking site; on ${from})`); return; }
      if ([401, 403, 429, 999].includes(r.status) || r.status === 0) { warn(10, `external ${url} -> ${r.status || r.error} (verify manually; on ${from})`); return; }
      fail(10, `external ${url} -> ${r.status} (on ${from})`);
    });
  }

  // 18 redirect variants (GET + HEAD), one hop to the absolute sitemap URL
  touch(18);
  const variants = [];
  for (const loc of sitemapUrls) {
    const u = new URL(loc);
    variants.push([`http://${u.host}${u.pathname}`, loc]);
    if (u.host === 'pratikbajoria.com') variants.push([`https://www.${u.host}${u.pathname}`, loc]);
    if (u.pathname !== '/') { variants.push([`${loc}/`, loc]); variants.push([`${loc}.html`, loc]); }
    else variants.push([`${u.origin}/index.html`, loc]);
  }
  await pool(variants, 8, async ([from, to]) => {
    for (const method of ['GET', 'HEAD']) {
      const r = await req(from, { method });
      const loc = r.headers.get('location');
      if (r.status !== 301 && r.status !== 308) { fail(18, `${method} ${from} -> ${r.status} (expected 301 to ${to})`); continue; }
      if (!loc || !/^https:\/\//.test(loc)) { fail(18, `${method} ${from} -> relative/missing Location "${loc}"`); continue; }
      if (loc !== to) {
        const r2 = await req(loc, { method });
        fail(18, `${method} ${from} -> ${loc} (${r2.status}${r2.headers.get('location') ? ' -> ' + r2.headers.get('location') : ''}); expected one hop to ${to}`);
      }
    }
  });
  for (const loc of sitemapUrls) {
    const r = await req(loc, { method: 'HEAD' });
    if (r.status !== 200) fail(18, `HEAD ${loc} -> ${r.status}`);
  }

  // ---- report ------------------------------------------------------------------
  const names = { 1: 'Googlebot allowed (robots.txt)', 2: 'Server-side rendered', 3: 'No unintended noindex', 4: 'Mobile viewport', 5: 'sitemap.xml valid/200-only', 6: 'Sitemap referenced', 7: 'Unique titles', 8: 'Unique meta descriptions', 9: 'Self-canonical', 10: 'No broken links/images', 11: 'Image alt text', 12: 'No orphan pages', 13: 'Business schema', 14: 'Breadcrumbs + JSON-LD valid', 15: 'WebP images', 16: 'No layout shift (img dims, font swap)', 17: 'Speed proxies', 18: 'Single-hop redirects', 19: 'AI/search crawlers allowed' };
  let failed = 0;
  console.log(`\nSEO audit — ${sitemapUrls.length} sitemap URLs, ${internalTargets.size} internal links, ${imageTargets.size} images, ${SKIP_EXTERNAL ? 'external skipped' : externalTargets.size + ' external links'}\n`);
  for (const id of Object.keys(names)) {
    const r = results[id] || { fails: [], warns: [] };
    const status = r.fails.length ? 'FAIL' : r.warns.length ? 'WARN' : 'PASS';
    if (r.fails.length) failed++;
    console.log(`${String(id).padStart(2)}. ${status.padEnd(4)}  ${names[id]}${r.fails.length ? ` (${r.fails.length} fail)` : ''}${r.warns.length ? ` (${r.warns.length} warn)` : ''}`);
    for (const m of r.fails.slice(0, 40)) console.log(`      ✗ ${m}`);
    for (const m of r.warns.slice(0, 25)) console.log(`      ! ${m}`);
  }
  report.results = results;
  if (JSON_OUT) { const fs = await import('node:fs'); fs.writeFileSync(JSON_OUT, JSON.stringify(report, null, 2)); }
  process.exitCode = failed ? 1 : 0;
}

main().catch((e) => { console.error(e); process.exit(2); });
