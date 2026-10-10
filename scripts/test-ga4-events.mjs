#!/usr/bin/env node
// Guards for GA4 conversion tracking and crawl hygiene (run by `npm test`).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
const ga = readFileSync(join(pub, 'ga4.js'), 'utf8');
let failures = 0;
const check = async (name, fn) => {
  try { await fn(); console.log(`ok   ${name}`); } catch (e) { failures++; console.error(`FAIL ${name}\n     ${e.message}`); }
};

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const textFiles = [...walk(pub), ...walk(join(root, 'scripts'))].filter((f) => /\.(html|js|mjs|py|json|txt|xml)$/.test(f));

await check('ga4.js uses only G-CXQP7F8CRT', () => {
  const ids = new Set(ga.match(/G-[A-Z0-9]{8,}/g));
  assert.deepEqual([...ids], ['G-CXQP7F8CRT']);
});
await check('no other GA4 measurement ID anywhere in public/ or scripts/', () => {
  const bad = [];
  for (const f of textFiles) {
    if (f.endsWith('test-ga4-events.mjs')) continue;
    for (const id of readFileSync(f, 'utf8').match(/\bG-[A-Z0-9]{10}\b/g) || []) if (id !== 'G-CXQP7F8CRT') bad.push(`${f}: ${id}`);
  }
  assert.equal(bad.length, 0, bad.slice(0, 5).join('\n'));
});
await check('ga4.js defines every conversion event', () => {
  for (const e of ['book_call_click', 'generate_lead', 'newsletter_signup', 'email_click', 'whatsapp_click', 'affiliate_click', 'crossborder_enquiry']) {
    assert.ok(ga.includes(`'${e}'`), `missing ${e}`);
  }
  assert.ok(ga.includes('page_path'), 'events must carry page_path');
});
await check('ga4.js skips GA for webdriver/headless/bot user agents', () => {
  assert.ok(ga.includes('navigator.webdriver === true'));
  for (const t of ['HeadlessChrome', 'bot', 'crawl', 'spider', 'Lighthouse', 'PhantomJS', 'Puppeteer', 'Playwright']) assert.ok(ga.includes(t), t);
  assert.ok(/function gtag\(\)\{ if \(!PB_GA_SKIP\)/.test(ga) && ga.includes('if (PB_GA_SKIP) return;'));
});
await check('AFFILIATE_DOMAINS covers every host in affiliate-links.json', () => {
  const list = JSON.parse(ga.match(/AFFILIATE_DOMAINS = (\[[^\]]*\])/)[1].replace(/'/g, '"'));
  const links = JSON.parse(readFileSync(join(pub, 'affiliate-links.json'), 'utf8'));
  for (const [key, v] of Object.entries(links)) {
    for (const u of [v.productUrl, v.affiliateUrl].filter(Boolean)) {
      const h = new URL(u).hostname.replace(/^www\./, '');
      assert.ok(list.some((d) => h === d || h.endsWith(`.${d}`)), `${key}: ${h} not in AFFILIATE_DOMAINS`);
    }
  }
});
await check('every HTML page loads the same ga4.js version as the worker injects', () => {
  const worker = readFileSync(join(pub, '_worker.js'), 'utf8');
  const v = worker.match(/GA4_SNIPPET = '<script src="\/ga4\.js\?v=([^"]+)"/)[1];
  const stale = walk(pub).filter((f) => f.endsWith('.html')).filter((f) => {
    const m = readFileSync(f, 'utf8').match(/\/ga4\.js\?v=([^"']+)/);
    return m && m[1] !== v;
  });
  assert.equal(stale.length, 0, `stale ga4.js version in: ${stale.slice(0, 5).join(', ')}`);
});
await check('robots.txt disallows /api/ in every user-agent group', () => {
  // A group = consecutive User-agent lines plus their rules (blank-line separated; comments dropped).
  const groups = readFileSync(join(pub, 'robots.txt'), 'utf8').split(/\n\s*\n/)
    .map((g) => g.split('\n').filter((l) => !l.startsWith('#')).join('\n').trim())
    .filter((g) => g.startsWith('User-agent:'));
  assert.ok(groups.length >= 6, `only ${groups.length} groups parsed`);
  for (const g of groups) assert.ok(/\nDisallow: \/(api\/)?\n/.test(`${g}\n`), `group without Disallow: /api/ (or /) -> ${g.split('\n')[0]}`);
});

await check('no blog post links to itself or to a redirected URL', async () => {
  const w = readFileSync(join(pub, '_worker.js'), 'utf8');
  const aliased = new Set([...w.matchAll(/^\s*'(\/blog\/[^']+)': '\/blog\//gm)].map((m) => m[1]));
  const bad = [];
  for (const f of walk(pub).filter((x) => x.endsWith('.html') && !x.includes(`${join('public', 'crossborder')}`) && !x.endsWith('cross-border-partnerships.html'))) {
    const html = readFileSync(f, 'utf8');
    const own = f.includes(`${join('public', 'blog')}`) ? `/blog/${f.split(/[\\/]/).pop().replace(/\.html$/, '')}` : null;
    for (const [, href] of html.matchAll(/<a\b[^>]*?href="([^"#]+)/g)) {
      const p = href.replace(/^https:\/\/pratikbajoria\.com/, '').replace(/\/$/, '') || '/';
      if (own && p === own) bad.push(`${f}: self-link ${href}`);
      if (aliased.has(p) || p === '/cross-border-partnerships' || /^\/blog\/.+\.html$/.test(p) || p === '/blog.html' || p === '/insights') bad.push(`${f}: redirected ${href}`);
    }
  }
  assert.equal(bad.length, 0, bad.slice(0, 8).join('\n'));
});

// Worker behaviour with a stub ASSETS binding.
const worker = (await import(pathToFileURL(join(pub, '_worker.js')).href)).default;
const env = {
  ASSETS: { fetch: async (req) => {
    const p = new URL(req.url).pathname;
    if (p === '/robots.txt') return new Response(readFileSync(join(pub, 'robots.txt'), 'utf8'), { headers: { 'content-type': 'text/plain' } });
    if (p === '/ga4.js') return new Response(ga, { headers: { 'content-type': 'application/javascript' } });
    return new Response('<!doctype html><html><head></head><body>x</body></html>', { status: 404, headers: { 'content-type': 'text/html' } });
  } }
};
const BROWSER_UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36';
const hit = (url, method = 'GET', host, ua = BROWSER_UA) => worker.fetch(new Request(url, { method, headers: { ...(host ? { host } : {}), ...(ua ? { 'user-agent': ua } : {}) } }), env);

for (const [u, m] of [['https://pratikbajoria.com/api/subscribe', 'GET'], ['https://pratikbajoria.com/api/discovery', 'HEAD'], ['https://pratikbajoria.com/api/whatever', 'GET'], ['https://crossborder.pratikbajoria.com/api/subscribe', 'GET']]) {
  await check(`${m} ${u} -> X-Robots-Tag noindex, not HTML`, async () => {
    const r = await hit(u, m, new URL(u).host);
    assert.match(r.headers.get('x-robots-tag') || '', /noindex/);
    assert.ok([404, 405].includes(r.status), `status ${r.status}`);
    assert.ok(!(r.headers.get('content-type') || '').includes('text/html'));
  });
}
await check('POST /api/subscribe without DB -> 503 JSON with noindex', async () => {
  const r = await worker.fetch(new Request('https://pratikbajoria.com/api/subscribe', { method: 'POST', body: '{}', headers: { 'user-agent': BROWSER_UA } }), env);
  assert.equal(r.status, 503);
  assert.match(r.headers.get('x-robots-tag') || '', /noindex/);
});
await check('crossborder robots.txt disallows /api/', async () => {
  const r = await hit('https://crossborder.pratikbajoria.com/robots.txt', 'GET', 'crossborder.pratikbajoria.com');
  assert.match(await r.text(), /\nDisallow: \/api\/\n/);
});
await check('crossborder host serves /ga4.js (shared root asset)', async () => {
  const r = await hit('https://crossborder.pratikbajoria.com/ga4.js?v=x', 'GET', 'crossborder.pratikbajoria.com');
  assert.equal(r.status, 200);
  assert.ok((await r.text()).includes('G-CXQP7F8CRT'));
});
for (const p of ['/cross-border-partnerships', '/cross-border-partnerships.html', '/cross-border-partnerships/']) {
  for (const m of ['GET', 'HEAD']) {
    await check(`${m} ${p} -> single 301 to crossborder subdomain`, async () => {
      const r = await hit(`https://pratikbajoria.com${p}`, m);
      assert.equal(r.status, 301);
      assert.equal(r.headers.get('location'), 'https://crossborder.pratikbajoria.com/');
    });
  }
}
for (const p of ['/blog/2026-09-12-build-vs-buy-a-practical-framework-for-ai-tooling', '/blog/2026-09-12-build-vs-buy-a-practical-framework-for-ai-tooling.html', '/blog/2026-09-12-build-vs-buy-a-practical-framework-for-ai-tooling/']) {
  await check(`GET ${p} -> single 301 to survivor`, async () => {
    const r = await hit(`https://pratikbajoria.com${p}`);
    assert.equal(r.status, 301);
    assert.equal(r.headers.get('location'), 'https://pratikbajoria.com/blog/build-vs-buy-ai-tooling');
  });
}

// Edge hygiene: constructive crawlers are never refused; scan paths and scanner UAs are.
const GOOD_UAS = {
  Googlebot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  Bingbot: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  GPTBot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.1; +https://openai.com/gptbot',
  'OAI-SearchBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot',
  'ChatGPT-User': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot',
  ClaudeBot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ClaudeBot/1.0; +claudebot@anthropic.com',
  'Claude-User': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; Claude-User/1.0; +Claude-User@anthropic.com',
  'Claude-SearchBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; Claude-SearchBot/1.0; +Claude-SearchBot@anthropic.com',
  PerplexityBot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
  'Perplexity-User': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)',
  'Google-Extended': 'Mozilla/5.0 (compatible; Google-Extended)',
  Applebot: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)',
  DuckDuckBot: 'DuckDuckBot/1.1; (+http://duckduckgo.com/duckduckbot.html)',
  AhrefsBot: 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)',
  UptimeRobot: 'Mozilla/5.0+(compatible; UptimeRobot/2.0; http://www.uptimerobot.com/)',
  curl: 'curl/8.5.0', 'python-requests': 'python-requests/2.31.0', 'Go-http-client': 'Go-http-client/2.0', node: 'node'
};
for (const [name, ua] of Object.entries(GOOD_UAS)) {
  await check(`${name} is not refused at the edge`, async () => {
    for (const u of ['https://pratikbajoria.com/', 'https://pratikbajoria.com/robots.txt', 'https://crossborder.pratikbajoria.com/']) {
      const r = await hit(u, 'GET', new URL(u).host, ua);
      assert.notEqual(r.status, 403, `${u} -> 403`);
    }
  });
}
for (const p of ['/wp-login.php', '/wp-admin/', '/xmlrpc.php', '/.env', '/.env.production', '/.git/config', '/.git/HEAD', '/phpmyadmin/', '/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', '/config.php', '/backup.sql', '/.aws/credentials', '/cgi-bin/luci', '/%2eenv', '/server-status']) {
  await check(`scan path ${p} -> 403 on both hosts`, async () => {
    for (const host of ['pratikbajoria.com', 'crossborder.pratikbajoria.com']) {
      const r = await hit(`https://${host}${p}`, 'GET', host, GOOD_UAS.Googlebot);
      assert.equal(r.status, 403, `${host}${p} -> ${r.status}`);
    }
  });
}
for (const ua of ['', 'sqlmap/1.7.2#stable (https://sqlmap.org)', 'Mozilla/5.0 (compatible; Nuclei - Open-source project (github.com/projectdiscovery/nuclei))', 'Mozilla/5.0 (Linux; Android 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36 (compatible; Bytespider; spider-feedback@bytedance.com)', 'Scrapy/2.11.0 (+https://scrapy.org)']) {
  await check(`UA ${JSON.stringify(ua.slice(0, 30))} -> 403 (robots.txt still readable)`, async () => {
    assert.equal((await hit('https://pratikbajoria.com/', 'GET', null, ua)).status, 403);
    assert.equal((await hit('https://pratikbajoria.com/robots.txt', 'GET', null, ua)).status, 200);
  });
}
await check('/.well-known/ paths are not treated as scan paths', async () => {
  assert.notEqual((await hit('https://pratikbajoria.com/.well-known/security.txt')).status, 403);
});
await check('crossborder robots.txt mirrors the main crawler groups with its own sitemap', async () => {
  const t = await (await hit('https://crossborder.pratikbajoria.com/robots.txt', 'GET', 'crossborder.pratikbajoria.com')).text();
  for (const bot of ['Googlebot', 'OAI-SearchBot', 'Claude-User', 'PerplexityBot', 'Bytespider']) assert.ok(t.includes(`User-agent: ${bot}\n`), bot);
  assert.ok(t.includes('Sitemap: https://crossborder.pratikbajoria.com/sitemap.xml'));
  assert.ok(!t.includes('Sitemap: https://pratikbajoria.com/sitemap.xml'));
});

if (failures) { console.error(`\n${failures} GA4/crawl check(s) failed`); process.exit(1); }
console.log('\nGA4/crawl checks passed');
