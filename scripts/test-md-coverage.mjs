#!/usr/bin/env node
// Coverage test for the AI-readable layer (scripts/build-md.mjs). Fails when:
//   - an indexable page (HTML file, sitemap URL or JSON post) has no markdown route and is
//     not in SKIP / an alias;
//   - a generated file is missing, malformed or stale (rebuild with `npm run build:md`);
//   - llms.txt or the catalog misses a route;
//   - site-config.mjs facts drift from the homepage JSON-LD or robots.txt.
import fs from 'node:fs';
import path from 'node:path';
import { SITE, PRIVATE_PATHS } from './md/site-config.mjs';
import { PUB, STATIC_PAGES, SKIP, loadData, renderAll } from './md/registry.mjs';
import { mdUrlFor, canonicalFor } from './md/format.mjs';

const errors = [];
const fail = (msg) => errors.push(msg);
const read = (rel) => fs.readFileSync(path.join(PUB, rel), 'utf8');
const data = loadData();
const pages = renderAll(data);
const byPath = new Map(pages.map((p) => [p.path, p]));
const skipped = (p) => Object.keys(SKIP).some((k) => (k.endsWith('/*') ? p.startsWith(k.slice(0, -1)) : p === k));
const covered = (p) => byPath.has(p) || skipped(p) || Boolean(data.aliases[p]);

// 1. Every indexable source has a route.
const htmlFiles = [
  ...fs.readdirSync(PUB).filter((f) => f.endsWith('.html')).map((f) => (f === 'index.html' ? '/' : `/${f.slice(0, -5)}`)),
  ...fs.readdirSync(path.join(PUB, 'blog')).filter((f) => f.endsWith('.html')).map((f) => `/blog/${f.slice(0, -5)}`)
];
for (const p of htmlFiles) {
  if (p === '/blog') continue; // blog.html is the /blog listing
  if (/^\/google[0-9a-f]+$/.test(p)) continue; // Search Console verification file
  if (!covered(p)) fail(`HTML page ${p} has no markdown route (add it to STATIC_PAGES in scripts/md/registry.mjs or to SKIP with a reason)`);
}
for (const m of read('sitemap.xml').matchAll(/<loc>https:\/\/pratikbajoria\.com([^<]*)<\/loc>/g)) {
  const p = m[1].replace(/\/+$/, '') || '/';
  if (!covered(p)) fail(`sitemap URL ${p} has no markdown route`);
}
for (const post of data.posts) if (!covered(`/blog/${post.slug}`)) fail(`post ${post.slug} has no markdown route`);
for (const s of STATIC_PAGES) if (!byPath.has(s.path)) fail(`STATIC_PAGES ${s.path} rendered nothing (noindex or unreadable?)`);

// 2. Generated files exist, are well-formed and current.
const catalog = JSON.parse(read('md/_catalog.json'));
const catPaths = new Set(catalog.routes.map((r) => r.path));
for (const p of pages) {
  const file = `md${p.path === '/' ? '/index' : p.path}.md`;
  let disk = '';
  try { disk = read(file); } catch { fail(`missing ${file} (run npm run build:md)`); continue; }
  if (disk !== p.markdown) fail(`stale ${file} (run npm run build:md)`);
  if (!disk.startsWith('# ') || !disk.includes(`Canonical: ${canonicalFor(p.path)}`)) fail(`${file}: missing title or Canonical line`);
  if (disk.length < 400) fail(`${file}: suspiciously short (${disk.length} chars)`);
  if (/<\/?(div|span|script|style|section)\b/i.test(disk)) fail(`${file}: raw HTML left in markdown`);
  if (!catPaths.has(p.path)) fail(`catalog misses ${p.path}`);
}
if (catalog.routes.length !== pages.length) fail(`catalog has ${catalog.routes.length} routes, expected ${pages.length}`);
const llms = read('llms.txt');
for (const p of pages) if (!llms.includes(`(${mdUrlFor(p.path)})`)) fail(`llms.txt does not link ${mdUrlFor(p.path)}`);
if (read('.well-known/llms.txt') !== llms) fail('.well-known/llms.txt differs from llms.txt (run npm run build:md)');
const full = read('llms-full.txt');
if (full.length > 460_000) fail(`llms-full.txt is ${full.length} chars (cap 450k)`);

// 3. Facts stay in sync with the homepage JSON-LD and robots.txt.
const home = read('index.html');
const ld = [...home.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].flatMap((m) => { try { const j = JSON.parse(m[1]); return j['@graph'] || [j]; } catch { return []; } });
const org = ld.find((n) => [].concat(n['@type']).includes('Organization'));
const person = ld.find((n) => [].concat(n['@type']).includes('Person'));
if (!org) fail('homepage JSON-LD has no Organization node');
else {
  if (org.name !== SITE.organisationName) fail(`Organization name "${org.name}" != site-config organisationName`);
  if (org.email !== SITE.email) fail('Organization email differs from site-config');
  if (org.logo !== SITE.logo && org.logo?.url !== SITE.logo) fail('Organization logo differs from site-config');
  if (String(org.url).replace(/\/$/, '') !== SITE.url) fail('Organization url differs from site-config');
}
if (person && JSON.stringify([...(person.sameAs || [])].sort()) !== JSON.stringify([...SITE.sameAs].sort())) fail('Person sameAs differs from site-config sameAs');
const robots = read('robots.txt');
for (const p of PRIVATE_PATHS) if (!robots.includes(`Disallow: ${p}`)) fail(`robots.txt lacks Disallow: ${p}`);
const ai = read('ai.txt');
const signal = robots.match(/Content-Signal:\s*search=(\w+),ai-input=(\w+),ai-train=(\w+)/);
if (!signal || !ai.includes(`search: ${signal[1]}`) || !ai.includes(`ai-input: ${signal[2]}`) || !ai.includes(`ai-train: ${signal[3]}`)) fail('ai.txt [signals] do not match robots.txt Content-Signal');

const counts = pages.reduce((m, p) => ({ ...m, [p.section]: (m[p.section] || 0) + 1 }), {});
if (errors.length) {
  console.error(`md coverage: ${errors.length} problem(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`md coverage OK: ${pages.length} routes ${JSON.stringify(counts)}; ${htmlFiles.length} HTML files, ${data.posts.length} JSON posts, ${Object.keys(data.aliases).length} aliases, ${Object.keys(SKIP).length} skip rules.`);
