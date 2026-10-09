#!/usr/bin/env node
/* Daily editorial publisher (run by .github/workflows/daily-blog-update.yml).

   Builds the day's post ONLY from a topic in scripts/daily-topics/, each of which carries its own
   first-person intro, specific sections, FAQ, internal links and verified source links. There is no
   generic fallback body: if the next topic lacks complete material, fails a check, or is too similar
   to an existing post (> 60% shared 5-word shingles), the generator publishes nothing that day.

   Usage:
     node scripts/generate-daily-blog.js              publish today's post (writes public/blog-posts.json + sitemap)
     node scripts/generate-daily-blog.js --dry-run    build and check today's post, print it, write nothing
     node scripts/generate-daily-blog.js --dry-run --topic 3   same, for the 3rd topic in the bank
     node scripts/generate-daily-blog.js --validate   check every queued topic (used by npm test); exit 1 on problems
     --force   publish even if a topic-bank post already exists for today's IST date (default: skip, so the
               workflow's backup cron is idempotent)

   Never invent statistics, prices, clients or testimonials: every figure must sit in a topic file
   next to a [text][n] citation of a real source. */
const fs = require('fs');
const path = require('path');
const sim = require('./content-similarity');

const root = path.join(__dirname, '..');
const postsPath = path.join(root, 'public', 'blog-posts.json');
const sitemapPath = path.join(root, 'public', 'sitemap.xml');
const retiredPath = path.join(__dirname, 'blog-retired-topics.json');

const kolkataDate = (d = new Date()) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);

// Phrases from the retired generic template. A topic body containing any of them is rejected.
const BANNED_PHRASES = [
  'Here is the practical cut',
  'Narrow beats clever',
  'Design the human gate before the automation',
  'Ship a thin release to one team',
  'A failed pilot that you can explain is cheaper than a zombie subscription',
  'Monday-morning checklist: (1) name the owner',
  'Where software helps, use it as scaffolding'
];
const STATIC_PATHS = new Set(['/', '/blog', '/audit', '/scorecard', '/topics', '/privacy']);
const MIN_BODY_WORDS = 550; // intro + sections
const MIN_TOTAL_WORDS = 700; // including FAQ
const DISCLOSURE = 'Tool links go to the vendor’s official site unless an affiliate URL is configured. Recommendations are based on fit for finance, ops and AI implementation — not on commission.';

const words = (v) => String(v || '').trim().split(/\s+/).filter(Boolean).length;
const slugify = (t) => String(t).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const baseSlugOf = (slug) => String(slug || '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
const normTitle = (t) => String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

function loadTopics() {
  return require('./daily-topics');
}
function loadPosts() {
  return JSON.parse(fs.readFileSync(postsPath, 'utf8'));
}
function loadRetired() {
  if (!fs.existsSync(retiredPath)) return [];
  try { return JSON.parse(fs.readFileSync(retiredPath, 'utf8')).retired || []; } catch { return []; }
}

/** Titles and base slugs already published (any date) or retired by consolidation. */
function isDuplicate(title, existing) {
  const retired = loadRetired();
  const titles = new Set([...existing.map((p) => normTitle(p.title)), ...retired.map((r) => normTitle(r.title))]);
  const slugs = new Set([
    ...existing.map((p) => baseSlugOf(p.slug)),
    ...retired.map((r) => r.baseSlug || baseSlugOf(r.slug)),
    ...retired.map((r) => baseSlugOf(String(r.survivor || '').replace(/^\/blog\//, '')))
  ]);
  return titles.has(normTitle(title)) || slugs.has(slugify(title));
}

/** Every text block of a topic that may carry inline markup. */
function textBlocks(t) {
  const blocks = [];
  for (const p of t.intro || []) blocks.push(p);
  for (const s of t.sections || []) blocks.push(...(s.paragraphs || []), ...(s.bullets || []));
  for (const f of t.faq || []) blocks.push(f.a || '');
  return blocks;
}
function internalPathExists(p, existing) {
  const clean = p.split('#')[0].replace(/\/$/, '') || '/';
  if (STATIC_PATHS.has(clean)) return true;
  const m = clean.match(/^\/blog\/([a-z0-9-]+)$/);
  if (m) return fs.existsSync(path.join(root, 'public', 'blog', `${m[1]}.html`)) || existing.some((x) => x.slug === m[1]);
  return fs.existsSync(path.join(root, 'public', `${clean.slice(1)}.html`)) || fs.existsSync(path.join(root, 'public', clean.slice(1), 'index.html'));
}

/** Returns a list of problems; an empty list means the topic has complete, specific, sourced material. */
function validateTopic(t, existing = loadPosts()) {
  const problems = [];
  const need = (cond, msg) => { if (!cond) problems.push(msg); };
  need(t && typeof t.title === 'string' && t.title.length >= 20 && t.title.length <= 95, 'title missing or not 20-95 chars');
  need(typeof t.category === 'string' && t.category, 'category missing');
  need(/^https:\/\//.test(t.image || ''), 'image must be an https URL');
  need(typeof t.excerpt === 'string' && t.excerpt.length >= 120 && t.excerpt.length <= 170, `excerpt must be 120-170 chars (has ${String(t.excerpt || '').length})`);
  need(Array.isArray(t.keywords) && t.keywords.length >= 3, 'at least 3 keywords');
  const sources = Array.isArray(t.sources) ? t.sources : [];
  need(sources.length >= 3, 'at least 3 sources');
  sources.forEach((s, i) => need(s && s.title && /^https:\/\/[^\s]+$/.test(s.url || ''), `source ${i + 1} needs a title and an https URL`));
  need(Array.isArray(t.intro) && t.intro.filter((p) => words(p) >= 15).length >= 2, 'intro needs at least 2 real paragraphs');
  const sections = Array.isArray(t.sections) ? t.sections : [];
  need(sections.length >= 4, 'at least 4 sections');
  sections.forEach((s, i) => need(s && s.heading && ((s.paragraphs || []).length || (s.bullets || []).length), `section ${i + 1} needs a heading and content`));
  const faq = Array.isArray(t.faq) ? t.faq : [];
  need(faq.length >= 3 && faq.every((f) => f && f.q && words(f.a) >= 12), 'at least 3 FAQ items with real answers');
  const related = Array.isArray(t.related) ? t.related : [];
  need(related.length >= 2 && related.every((r) => r && r.title && /^\//.test(r.url || '')), 'at least 2 related internal links');

  const blocks = textBlocks(t);
  const cited = new Set();
  for (const b of blocks) {
    for (const m of b.matchAll(/\[([^\]]+)\]\[(\d+)\]/g)) {
      const n = Number(m[2]);
      if (n < 1 || n > sources.length) problems.push(`citation [${m[1]}][${n}] points to a missing source`);
      else cited.add(n);
    }
    for (const m of b.matchAll(/\[([^\]]+)\]\(([^)]*)\)/g)) {
      if (!/^\/[a-z0-9\-/]*$/i.test(m[2])) problems.push(`inline link (${m[2]}) must be an internal /path; cite external pages as [text][n]`);
      else if (!internalPathExists(m[2], existing)) problems.push(`internal link ${m[2]} does not exist`);
    }
  }
  for (const r of related) if (r && /^\//.test(r.url || '') && !internalPathExists(r.url, existing)) problems.push(`related link ${r.url} does not exist`);
  need(cited.size >= 3, `at least 3 distinct sources must be cited inline (found ${cited.size})`);
  sources.forEach((s, i) => need(cited.has(i + 1), `source ${i + 1} (${s && s.title}) is listed but never cited`));

  const body = [...(t.intro || []), ...sections.flatMap((s) => [s.heading, ...(s.paragraphs || []), ...(s.bullets || [])])].join(' ');
  const total = body + ' ' + faq.map((f) => `${f.q} ${f.a}`).join(' ');
  need(words(sim.stripInline(body)) >= MIN_BODY_WORDS, `body has ${words(sim.stripInline(body))} words; needs ${MIN_BODY_WORDS}+`);
  need(words(sim.stripInline(total)) >= MIN_TOTAL_WORDS, `body + FAQ has ${words(sim.stripInline(total))} words; needs ${MIN_TOTAL_WORDS}+`);
  for (const phrase of BANNED_PHRASES) if (total.includes(phrase)) problems.push(`contains retired boilerplate: "${phrase}"`);
  return problems;
}

/** Build the JSON entry the worker renders (structured sections + plain-text content for feeds/search). */
function buildPost(t, date) {
  const slug = `${date}-${slugify(t.title)}`;
  const plain = [];
  for (const p of t.intro) plain.push(sim.stripInline(p));
  for (const s of t.sections) {
    plain.push(s.heading);
    for (const p of s.paragraphs || []) plain.push(sim.stripInline(p));
    for (const b of s.bullets || []) plain.push(`• ${sim.stripInline(b)}`);
  }
  plain.push('Frequently asked questions');
  for (const f of t.faq) plain.push(`${f.q}\n${sim.stripInline(f.a)}`);
  const content = plain.join('\n\n');
  return {
    id: slug,
    title: t.title,
    slug,
    url: `/blog/${slug}`,
    date,
    dateModified: date,
    author: 'Pratik Bajoria',
    category: t.category,
    readTime: Math.max(4, Math.round(words(content) / 220)),
    image: t.image,
    excerpt: t.excerpt,
    content,
    intro: t.intro,
    sections: t.sections.map((s) => ({ heading: s.heading, paragraphs: s.paragraphs || [], bullets: s.bullets || [] })),
    faq: t.faq.map((f) => ({ q: f.q, a: f.a })),
    related: t.related.map((r) => ({ title: r.title, url: r.url })),
    keywords: t.keywords.slice(0, 6),
    sources: t.sources.map((s) => ({ title: s.title, url: s.url })),
    generatedBy: 'topic-bank',
    topicFile: t.file,
    affiliateTools: [],
    affiliate: { disclosure: DISCLOSURE }
  };
}

function qualityCheck(post) {
  return Boolean(
    post.title && post.excerpt && words(post.content) >= MIN_TOTAL_WORDS &&
    Array.isArray(post.sections) && post.sections.length >= 4 &&
    Array.isArray(post.faq) && post.faq.length >= 3 &&
    Array.isArray(post.keywords) && post.keywords.length >= 3 &&
    Array.isArray(post.sources) && post.sources.length >= 3 && post.sources.every((s) => /^https:\/\//.test(s.url))
  );
}

function updateSitemap(post, date) {
  if (!fs.existsSync(sitemapPath)) return;
  let xml = fs.readFileSync(sitemapPath, 'utf8');
  const loc = `https://pratikbajoria.com/blog/${post.slug}`;
  const entry = `  <url><loc>${loc}</loc><lastmod>${date}</lastmod><changefreq>monthly</changefreq><priority>0.75</priority></url>\n`;
  const escaped = loc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('  <url><loc>' + escaped + '</loc>[\\s\\S]*?</url>\\n');
  xml = re.test(xml) ? xml.replace(re, entry) : xml.replace('</urlset>', entry + '</urlset>');
  xml = xml.replace(/(<url><loc>https:\/\/pratikbajoria\.com\/blog<\/loc><lastmod>)[^<]+/, '$1' + date);
  fs.writeFileSync(sitemapPath, xml);
}

function parseArgs(argv) {
  const args = { dryRun: argv.includes('--dry-run'), validate: argv.includes('--validate'), force: argv.includes('--force'), topic: null, date: null };
  const ti = argv.indexOf('--topic');
  if (ti >= 0) args.topic = Number(argv[ti + 1]);
  const di = argv.indexOf('--date');
  if (di >= 0) args.date = argv[di + 1];
  return args;
}

/** Check every queued topic: material complete and not a near-duplicate of any live post. */
function validateAll({ quiet = false } = {}) {
  const existing = loadPosts();
  const corpus = sim.loadCorpus(root);
  const topics = loadTopics();
  const report = [];
  const built = [];
  topics.forEach((t, i) => {
    const problems = validateTopic(t, existing);
    const post = problems.length ? null : buildPost(t, '2099-01-01');
    let nearest = { slug: null, score: 0 };
    if (post) {
      nearest = sim.mostSimilar(sim.jsonBodyText(post), corpus, null);
      // the same topic may already be live (published earlier); that is the duplicate guard's job, not a failure here
      if (isDuplicate(t.title, existing)) nearest = { slug: '(already published)', score: 0 };
      else if (nearest.score > sim.MAX_SIMILARITY) problems.push(`${Math.round(nearest.score * 100)}% similar to ${nearest.slug}`);
      for (const other of built) {
        const s = sim.similarity(sim.jsonBodyText(post), sim.jsonBodyText(other.post));
        if (s > sim.MAX_SIMILARITY) problems.push(`${Math.round(s * 100)}% similar to queued topic "${other.title}"`);
      }
      built.push({ title: t.title, post });
    }
    report.push({ n: i + 1, title: t.title, file: t.file, problems, nearest, words: post ? words(post.content) : 0 });
  });
  if (!quiet) {
    for (const r of report) {
      console.log(`${String(r.n).padStart(2)}. ${r.problems.length ? 'FAIL' : 'ok  '} ${r.title} (${r.words} words; nearest ${r.nearest.slug || '-'} ${Math.round(r.nearest.score * 100)}%)`);
      for (const p of r.problems) console.log(`      - ${p}`);
    }
  }
  return report;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.validate) {
    const report = validateAll();
    if (report.some((r) => r.problems.length)) process.exitCode = 1;
    return;
  }
  const date = args.date || kolkataDate();
  const existing = loadPosts();
  // One daily post per IST date. The workflow has a backup cron (GitHub often skips/delays scheduled
  // runs), so a second run on a day that already has its topic-bank post must be a no-op.
  const todays = existing.find((p) => p.date === date && p.generatedBy === 'topic-bank');
  if (todays && !args.dryRun && !args.force) {
    console.log(`Already published today (${date}): ${todays.slug}. Skipping. Use --force to publish another.`);
    return;
  }
  const topics = loadTopics();
  let topic;
  if (args.topic) {
    topic = topics[args.topic - 1];
    if (!topic) throw new Error(`No topic #${args.topic} (bank has ${topics.length}).`);
  } else {
    topic = topics.find((t) => !isDuplicate(t.title, existing));
    if (!topic) {
      console.log('Topic bank exhausted: every topic is already published or retired. Skipping today. Add a fully sourced topic file to scripts/daily-topics/.');
      return;
    }
  }
  const problems = validateTopic(topic, existing);
  if (problems.length) {
    console.log(`Skipping today: "${topic.title}" (${topic.file}) lacks complete material, so nothing is published.`);
    for (const p of problems) console.log(`  - ${p}`);
    return;
  }
  if (!args.dryRun && isDuplicate(topic.title, existing)) {
    console.log(`Duplicate guard: "${topic.title}" already exists or was retired. Skipping today.`);
    return;
  }
  const post = buildPost(topic, date);
  const nearest = sim.mostSimilar(sim.jsonBodyText(post), sim.loadCorpus(root), post.slug);
  if (nearest.score > sim.MAX_SIMILARITY) {
    console.log(`Similarity guard: "${post.title}" shares ${Math.round(nearest.score * 100)}% of its body with ${nearest.slug}. Skipping today.`);
    return;
  }
  if (!qualityCheck(post)) throw new Error('Quality gate failed.');
  if (args.dryRun) {
    console.log(`[dry run] ${post.title}\n  slug: ${post.slug}\n  words: ${words(post.content)}  sections: ${post.sections.length}  faq: ${post.faq.length}  sources: ${post.sources.length}\n  nearest existing post: ${nearest.slug} (${Math.round(nearest.score * 100)}%)\n`);
    console.log(post.content);
    return;
  }
  const posts = [post, ...existing.filter((p) => p.id !== post.id && p.slug !== post.slug)];
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2) + '\n');
  updateSitemap(post, date);
  console.log(`Published topic-bank article: ${post.title} (${words(post.content)} words, ${post.sources.length} sources, nearest ${Math.round(nearest.score * 100)}%)`);
}

module.exports = { validateTopic, validateAll, buildPost, isDuplicate, BANNED_PHRASES };

if (require.main === module) {
  try { main(); } catch (error) { console.error(error); process.exitCode = 1; }
}
