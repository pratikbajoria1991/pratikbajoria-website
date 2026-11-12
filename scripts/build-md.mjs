#!/usr/bin/env node
// Builds the AI-readable layer of pratikbajoria.com from the same sources the site serves:
//   public/md/**.md            markdown twin of every public page (served at /<path>.md and
//                              /api/md/<path> by public/_worker.js)
//   public/md/_catalog.json    route catalog (served at /api/md/_catalog)
//   public/llms.txt            index for agents (llmstxt.org format; copied to .well-known/)
//   public/llms-full.txt       full markdown of core pages and posts (capped, see FULL_CAP)
//   public/ai.txt              AI usage policy (mirrors robots.txt Content-Signal)
// Run: npm run build:md   (the daily blog workflow runs it after generating a post)
import fs from 'node:fs';
import path from 'node:path';
import { SITE, CLUSTERS, PRIVATE_PATHS, LLMS_INTRO_SECTIONS, LLMS_OUTRO_SECTIONS } from './md/site-config.mjs';
import { PUB, loadData, renderAll } from './md/registry.mjs';
import { canonicalFor, mdUrlFor, approxTokens, heading, list } from './md/format.mjs';

const FULL_CAP = 450_000; // characters; posts beyond this are listed in llms.txt only
const MD_DIR = path.join(PUB, 'md');

const data = loadData();
const pages = renderAll(data);
const latest = pages.map((p) => p.lastModified || '').sort().pop() || '';

// 1. public/md/** (cleared first so deleted pages disappear)
fs.rmSync(MD_DIR, { recursive: true, force: true });
for (const p of pages) {
  const file = path.join(MD_DIR, `${p.path === '/' ? '/index' : p.path}.md`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, p.markdown);
}

// 2. catalog
const catalog = {
  site: SITE.url,
  name: SITE.title,
  generated: latest,
  count: pages.length,
  routes: pages.map((p) => ({
    path: p.path,
    url: canonicalFor(p.path),
    markdown: mdUrlFor(p.path),
    title: p.title,
    summary: p.aiSummary,
    section: p.section,
    lastModified: p.lastModified || null,
    tokens: approxTokens(p.markdown)
  }))
};
fs.writeFileSync(path.join(MD_DIR, '_catalog.json'), `${JSON.stringify(catalog, null, 2)}\n`);

// 3. llms.txt
const entry = (p) => `[${p.title.replace(/[\[\]]/g, '')}](${mdUrlFor(p.path)}): ${p.aiSummary}`;
const sectionPages = (s) => pages.filter((p) => p.section === s);
const posts = sectionPages('posts').sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')) || a.path.localeCompare(b.path));
const groups = [
  ['ca', 'CA + AI articles'],
  ['ai', 'AI implementation, finance and operations'],
  ['tools', 'Tool reviews and comparisons']
];
const intro = [
  heading(1, SITE.title),
  `> ${SITE.description} ${SITE.descriptionSuffix}`,
  `Every page below links to its markdown version (append \`.md\` to any page URL, or send \`Accept: text/markdown\`). Full text of the core pages and articles: ${SITE.url}/llms-full.txt. Usage policy: ${SITE.url}/ai.txt. Machine-readable catalog: ${SITE.url}/api/md/_catalog.`
];
const llms = [
  ...intro,
  ...LLMS_INTRO_SECTIONS.map(([h, body]) => `${heading(2, h)}\n\n${body}`),
  `${heading(2, 'Key pages')}\n\n${list(sectionPages('core').map(entry))}`,
  `${heading(2, 'Guides')}\n\n${list(sectionPages('guides').map(entry))}`,
  ...groups.map(([g, h]) => [h, posts.filter((p) => p.group === g)]).filter(([, ps]) => ps.length)
    .map(([h, ps]) => `${heading(2, h)}\n\n${list(ps.map(entry))}`),
  `${heading(2, 'Contact')}\n\n${list(SITE.contact.map(([k, v]) => `${k}: ${v.replace(/^mailto:/, '')}`))}`,
  ...LLMS_OUTRO_SECTIONS.map(([h, body]) => `${heading(2, h)}\n\n${body}`),
  `${heading(2, 'Optional')}\n\n${list([
    ...sectionPages('legal').map(entry),
    `[Full text](${SITE.url}/llms-full.txt): core pages, guides and articles as one markdown file`,
    `[Sitemap](${SITE.url}/sitemap.xml): every public URL with last-modified dates`
  ])}`
].join('\n\n');
fs.writeFileSync(path.join(PUB, 'llms.txt'), `${llms}\n`);
fs.mkdirSync(path.join(PUB, '.well-known'), { recursive: true });
fs.writeFileSync(path.join(PUB, '.well-known', 'llms.txt'), `${llms}\n`);

// 4. llms-full.txt: core pages, guides, posts newest first, then legal; stop at FULL_CAP.
const strip = (md) => md.trim();
const parts = [`${heading(1, SITE.title)}\n\n> ${SITE.description} ${SITE.descriptionSuffix}\n\nSource: ${SITE.url} · Index: ${SITE.url}/llms.txt · Last updated: ${latest}`];
let size = parts[0].length;
const omitted = [];
const ordered = [...sectionPages('core'), ...sectionPages('guides'), ...posts];
const legal = sectionPages('legal');
const reserve = legal.reduce((n, p) => n + p.markdown.length + 10, 0) + 2000;
for (const p of ordered) {
  const block = `---\n\n${strip(p.markdown)}`;
  if (p.section === 'posts' && size + block.length + reserve > FULL_CAP) { omitted.push(p); continue; }
  parts.push(block);
  size += block.length + 2;
}
if (omitted.length) {
  parts.push(`---\n\n${heading(2, 'Articles not included in this file')}\n\nThis file is capped at about ${Math.round(FULL_CAP / 1000)}k characters. ${omitted.length} older articles are not included here; each is listed in ${SITE.url}/llms.txt and has its own markdown version:\n\n${list(omitted.map((p) => `[${p.title.replace(/[\[\]]/g, '')}](${mdUrlFor(p.path)})`))}`);
  console.warn(`build-md: llms-full.txt hit the ${FULL_CAP} character cap; ${omitted.length} posts listed but not inlined.`);
}
for (const p of legal) parts.push(`---\n\n${strip(p.markdown)}`);
const full = `${parts.join('\n\n')}\n`;
fs.writeFileSync(path.join(PUB, 'llms-full.txt'), full);

// 5. ai.txt (policy mirrors robots.txt: search=yes, ai-input=yes, ai-train=no)
const ai = `# ai.txt for ${SITE.url}
# AI usage policy for ${SITE.title}. Mirrors the Content-Signal lines in /robots.txt;
# robots.txt is authoritative for crawler access. Generated by scripts/build-md.mjs.

[site]
name: ${SITE.title}
url: ${SITE.url}/
owner: ${SITE.name}
contact: ${SITE.email}
language: ${SITE.language}
updated: ${latest}

[author]
name: ${CLUSTERS.author.displayName}
role: ${CLUSTERS.author.role}
location: Kolkata, India
profile: ${SITE.url}/about

[topics]
${CLUSTERS.clusters.map((c) => `${c.id}: ${SITE.url}${c.hub}`).join('\n')}

[signals]
search: yes
ai-input: yes
ai-train: no

[scope]
allow: /
${PRIVATE_PATHS.map((p) => `disallow: ${p}`).join('\n')}

[resources]
llms: ${SITE.url}/llms.txt
llms-full: ${SITE.url}/llms-full.txt
markdown-catalog: ${SITE.url}/api/md/_catalog
markdown: append .md to any page URL (homepage: ${SITE.url}/index.md) or send "Accept: text/markdown"
sitemap: ${SITE.url}/sitemap.xml
robots: ${SITE.url}/robots.txt

[attribution]
required: yes
format: link to the canonical page URL (not the .md URL) and name "${SITE.name}"
note: ${SITE.disclaimer}
`;
fs.writeFileSync(path.join(PUB, 'ai.txt'), ai);

const counts = pages.reduce((m, p) => ({ ...m, [p.section]: (m[p.section] || 0) + 1 }), {});
console.log(`build-md: ${pages.length} markdown routes ${JSON.stringify(counts)}; llms.txt ${llms.length} chars; llms-full.txt ${full.length} chars (${posts.length - omitted.length}/${posts.length} posts inlined); ai.txt written.`);
