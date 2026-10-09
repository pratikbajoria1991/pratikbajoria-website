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
  const groups = readFileSync(join(pub, 'robots.txt'), 'utf8').split(/\n(?=User-agent:)/).filter((g) => g.startsWith('User-agent:'));
  for (const g of groups) assert.ok(/\nDisallow: \/api\/\n/.test(`${g}\n`), `group without Disallow: /api/ -> ${g.split('\n')[0]}`);
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
const hit = (url, method = 'GET', host) => worker.fetch(new Request(url, { method, headers: host ? { host } : {} }), env);

for (const [u, m] of [['https://pratikbajoria.com/api/subscribe', 'GET'], ['https://pratikbajoria.com/api/discovery', 'HEAD'], ['https://pratikbajoria.com/api/whatever', 'GET'], ['https://crossborder.pratikbajoria.com/api/subscribe', 'GET']]) {
  await check(`${m} ${u} -> X-Robots-Tag noindex, not HTML`, async () => {
    const r = await hit(u, m, new URL(u).host);
    assert.match(r.headers.get('x-robots-tag') || '', /noindex/);
    assert.ok([404, 405].includes(r.status), `status ${r.status}`);
    assert.ok(!(r.headers.get('content-type') || '').includes('text/html'));
  });
}
await check('POST /api/subscribe without DB -> 503 JSON with noindex', async () => {
  const r = await worker.fetch(new Request('https://pratikbajoria.com/api/subscribe', { method: 'POST', body: '{}' }), env);
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

if (failures) { console.error(`\n${failures} GA4/crawl check(s) failed`); process.exit(1); }
console.log('\nGA4/crawl checks passed');
