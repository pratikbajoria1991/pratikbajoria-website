#!/usr/bin/env node
// Builds the static cross-border site into public/crossborder/.
// Usage: node scripts/crossborder/build.mjs
// Served at https://crossborder.pratikbajoria.com/ by public/_worker.js (host-based routing).
import { mkdirSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTACT_EMAIL, BUILD_DATE } from './config.mjs';
import { buildNav, renderPage } from './layout.mjs';
import { INSIGHTS, FAIRS } from './insights.mjs';
import { buildPages, notFoundPage } from './pages.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const OUT = join(here, '..', '..', 'public', 'crossborder');
const includeInsights = INSIGHTS.length > 0 || FAIRS.length > 0;
const nav = buildNav(includeInsights);
const pages = buildPages({ includeInsights });

const fileFor = (path) => path === '/' ? 'index.html' : `${path.slice(1)}.html`;
for (const dir of ['buyers', 'indian-businesses', 'sectors']) rmSync(join(OUT, dir), { recursive: true, force: true });
// Remove every previously generated top-level page so renamed or retired pages don't linger.
for (const f of readdirSync(OUT)) if (f.endsWith('.html')) rmSync(join(OUT, f));
for (const page of [...pages, notFoundPage]) {
  const file = join(OUT, fileFor(page.path));
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, renderPage(page, nav));
}
// Route manifest: public/_worker.js uses it for host routing and the subdomain sitemap.
const manifest = {
  origin: 'https://crossborder.pratikbajoria.com',
  generated: BUILD_DATE,
  pages: pages.map((p) => ({ path: p.path, lastmod: BUILD_DATE, priority: p.priority || (p.path.split('/').length > 2 ? '0.7' : '0.8') }))
};
writeFileSync(join(OUT, 'site-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Built ${pages.length} pages + 404 into public/crossborder (insights: ${includeInsights ? 'on' : 'off'}, email: ${CONTACT_EMAIL ? 'shown' : 'hidden'})`);
for (const p of pages) console.log(`  ${p.path.padEnd(48)} -> crossborder/${fileFor(p.path)}`);
