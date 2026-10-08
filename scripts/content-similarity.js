/* Shared near-duplicate detector for blog bodies (used by the daily generator and by npm test).
   Similarity = containment of 5-word shingles: |A ∩ B| / min(|A|, |B|). 1.0 means the shorter body is
   entirely contained in the longer one. Anything above MAX_SIMILARITY counts as a duplicate post. */
const fs = require('fs');
const path = require('path');

const MAX_SIMILARITY = 0.6;
const SHINGLE = 5;

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', mdash: '—', ndash: '–', hellip: '…', rarr: '→' };
function decode(s) {
  return String(s)
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => (ENTITIES[n.toLowerCase()] !== undefined ? ENTITIES[n.toLowerCase()] : m));
}

/** Article body text of a static post: inside <div class="article-body">, minus the Sources list and disclaimer. */
function htmlBodyText(html) {
  let s = String(html);
  const start = s.indexOf('<div class="article-body">');
  if (start >= 0) s = s.slice(start);
  const stops = ['<p class="ymyl-note"', '<aside class="article-tools"', '<div class="article-cta"'];
  const end = Math.min(...stops.map((m) => { const i = s.indexOf(m); return i < 0 ? Infinity : i; }));
  if (end !== Infinity) s = s.slice(0, end);
  s = s.replace(/<h2>\s*Sources\s*<\/h2>\s*<ul>[\s\S]*?<\/ul>/gi, ' ');
  s = s.replace(/<p><em>\s*Disclaimer:[\s\S]*?<\/p>/gi, ' ');
  s = s.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ');
  return decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

/** Plain text of a JSON post (content plus any structured sections). */
function jsonBodyText(post) {
  const parts = [];
  if (Array.isArray(post.intro)) parts.push(...post.intro);
  if (Array.isArray(post.sections)) for (const s of post.sections) parts.push(s.heading || '', ...(s.paragraphs || []), ...(s.bullets || []));
  if (Array.isArray(post.faq)) for (const f of post.faq) parts.push(f.q || '', f.a || '');
  const text = parts.length ? parts.join(' ') : String(post.content || '');
  return stripInline(text).replace(/\s+/g, ' ').trim();
}

/** Remove inline link markup: [text][n] and [text](/path) -> text. */
function stripInline(s) {
  return String(s).replace(/\[([^\]]+)\]\[\d+\]/g, '$1').replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '$1');
}

function tokens(text) {
  return String(text).toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9₹%'\s]+/g, ' ').split(/\s+/).filter(Boolean);
}
function shingles(text, k = SHINGLE) {
  const t = tokens(text);
  const out = new Set();
  for (let i = 0; i + k <= t.length; i++) out.add(t.slice(i, i + k).join(' '));
  return out;
}
function similarity(a, b) {
  const A = a instanceof Set ? a : shingles(a);
  const B = b instanceof Set ? b : shingles(b);
  if (!A.size || !B.size) return 0;
  const [small, big] = A.size <= B.size ? [A, B] : [B, A];
  let hit = 0;
  for (const x of small) if (big.has(x)) hit++;
  return hit / small.size;
}

/** Every live post body: static public/blog/*.html first, then JSON-only posts (rendered by the worker). */
function loadCorpus(root) {
  const blogDir = path.join(root, 'public', 'blog');
  const corpus = new Map();
  for (const f of fs.existsSync(blogDir) ? fs.readdirSync(blogDir) : []) {
    if (!f.endsWith('.html')) continue;
    corpus.set(f.replace(/\.html$/, ''), { source: `public/blog/${f}`, text: htmlBodyText(fs.readFileSync(path.join(blogDir, f), 'utf8')) });
  }
  const postsPath = path.join(root, 'public', 'blog-posts.json');
  const posts = fs.existsSync(postsPath) ? JSON.parse(fs.readFileSync(postsPath, 'utf8')) : [];
  for (const p of posts) {
    if (!p || !p.slug || corpus.has(p.slug)) continue;
    corpus.set(p.slug, { source: `blog-posts.json#${p.slug}`, text: jsonBodyText(p) });
  }
  return corpus;
}

/** Highest similarity between `text` and any corpus body (excluding `exceptSlug`). */
function mostSimilar(text, corpus, exceptSlug) {
  const A = shingles(text);
  let best = { slug: null, score: 0 };
  for (const [slug, entry] of corpus) {
    if (slug === exceptSlug) continue;
    const score = similarity(A, shingles(entry.text));
    if (score > best.score) best = { slug, score };
  }
  return best;
}

module.exports = { MAX_SIMILARITY, htmlBodyText, jsonBodyText, stripInline, shingles, similarity, loadCorpus, mostSimilar };
