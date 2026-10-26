// Hand-written HTML -> markdown extractor for pages whose only source is a static HTML file
// in public/ (service pages, guides, static posts). No dependencies: a forgiving tag parser
// builds a small tree, then main content is rendered as markdown. Nav, header, footer,
// forms, buttons, CTA boxes, breadcrumbs and hidden elements are dropped.
import { link, heading, list, table, escText } from './format.mjs';

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr', 'param']);
const BLOCK = new Set(['address', 'article', 'aside', 'blockquote', 'details', 'dialog', 'dd', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'li', 'main', 'nav', 'ol', 'p', 'pre', 'section', 'summary', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul', 'caption']);
const DROP_TAGS = new Set(['script', 'style', 'svg', 'noscript', 'template', 'form', 'button', 'input', 'select', 'textarea', 'nav', 'footer', 'iframe', 'img', 'picture', 'video', 'audio', 'canvas', 'dialog', 'label']);
const DROP_CLASS = /(^|\s)(site-header|article-header|article-header-links|article-cta|article-cta-actions|breadcrumbs|wordmark|site-footer|site-callout|page-cta-band|subscribe|newsletter[\w-]*|cookie[\w-]*|modal[\w-]*|skip-link|sr-only|visually-hidden|hero-actions|cta[\w-]*|button[\w-]*)(\s|$)/;

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', hellip: '…', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', middot: '·', rarr: '→', larr: '←', times: '×', copy: '©', reg: '®', trade: '™', bull: '•', rupee: '₹', pound: '£', euro: '€', deg: '°', ne: '≠', le: '≤', ge: '≥', check: '✓', nearr: '↗' };
export const decode = (s) => String(s).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
  if (e[0] === '#') return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
  return ENTITIES[e.toLowerCase()] ?? m;
});

function parseAttrs(raw) {
  const attrs = {};
  for (const m of String(raw || '').matchAll(/([\w:.-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
    attrs[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4] ?? '');
  }
  return attrs;
}

// Tiny forgiving parser: returns { tag:'#root', children } with text nodes as strings.
export function parseHtml(html) {
  const src = String(html)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|svg|noscript|template)\b[\s\S]*?<\/\1\s*>/gi, '');
  const root = { tag: '#root', attrs: {}, children: [] };
  const stack = [root];
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:\s+(?:[^>"']|"[^"]*"|'[^']*')*)?)\s*(\/?)>|([^<]+|<)/g;
  let m;
  while ((m = re.exec(src))) {
    const top = stack[stack.length - 1];
    if (m[5] !== undefined) { top.children.push(decode(m[5])); continue; }
    const tag = m[2].toLowerCase();
    if (m[1]) {
      const i = stack.map((n) => n.tag).lastIndexOf(tag);
      if (i > 0) stack.length = i;
      continue;
    }
    // A new <p>/<li> implicitly closes an open one of the same kind.
    if ((tag === 'p' || tag === 'li') && top.tag === tag) stack.pop();
    const node = { tag, attrs: parseAttrs(m[3]), children: [] };
    stack[stack.length - 1].children.push(node);
    if (!VOID.has(tag) && !m[4]) stack.push(node);
  }
  return root;
}

export function find(node, pred) {
  if (typeof node === 'string') return null;
  if (pred(node)) return node;
  for (const c of node.children) { const r = find(c, pred); if (r) return r; }
  return null;
}
export function findAll(node, pred, out = []) {
  if (typeof node === 'string') return out;
  if (pred(node)) out.push(node);
  for (const c of node.children) findAll(c, pred, out);
  return out;
}
export const textOf = (node) => (typeof node === 'string' ? node : node.children.map(textOf).join(' ')).replace(/\s+/g, ' ').trim();

const dropped = (n) => DROP_TAGS.has(n.tag)
  || n.attrs.hidden !== undefined
  || n.attrs['aria-hidden'] === 'true'
  || (n.tag === 'header' && !find(n, (c) => c.tag === 'h1'))
  || DROP_CLASS.test(n.attrs.class || '');
const isBlock = (n) => typeof n !== 'string' && (BLOCK.has(n.tag) || n.children.some((c) => isBlock(c)));

// Inline markdown for a node's children (blocks flattened with spaces).
function inline(nodes) {
  let out = '';
  for (const n of nodes) {
    if (typeof n === 'string') { out += escText(` ${n} `).replace(/^/, n.match(/^\s/) ? ' ' : '').concat(n.match(/\s$/) ? ' ' : ''); continue; }
    if (dropped(n)) continue;
    const inner = inline(n.children).trim();
    if (n.tag === 'br') out += ' ';
    else if (!inner) continue;
    else if (n.tag === 'a') {
      const href = n.attrs.href || '';
      out += !href || href.startsWith('#') || /^javascript:/i.test(href) ? inner : link(inner.replace(/\\([\\`*_])/g, '$1'), href);
    } else if (n.tag === 'strong' || n.tag === 'b') out += ` **${inner}** `;
    else if (n.tag === 'em' || n.tag === 'i') out += ` *${inner}* `;
    else if (n.tag === 'code') out += ` \`${textOf(n)}\` `;
    else out += ` ${inner} `;
  }
  return out.replace(/\s+/g, ' ').replace(/\s+([,.;:!?)])/g, '$1').replace(/\(\s+/g, '(');
}

function renderTable(n) {
  const rows = findAll(n, (c) => c.tag === 'tr').map((tr) => tr.children.filter((c) => typeof c !== 'string' && (c.tag === 'th' || c.tag === 'td')).map((c) => inline(c.children).trim()));
  if (!rows.length) return [];
  const caption = find(n, (c) => c.tag === 'caption');
  return [caption ? inline(caption.children).trim() : '', table(rows[0], rows.slice(1))].filter(Boolean);
}

// Block markdown for a list of nodes. ctx.skipH1 drops the page h1 (used as the title).
export function blocks(nodes, ctx = {}) {
  const out = [];
  let buf = [];
  const flush = () => { const t = inline(buf).trim(); if (t) out.push(t); buf = []; };
  for (const n of nodes) {
    if (typeof n === 'string' || !isBlock(n)) { if (typeof n === 'string' || !dropped(n)) buf.push(n); continue; }
    flush();
    if (dropped(n)) continue;
    const t = n.tag;
    if (/^h[1-6]$/.test(t)) {
      if (t === 'h1' && ctx.skipH1) continue;
      const text = inline(n.children).trim();
      if (text) out.push(heading(Math.max(Number(t[1]), 2), text));
    } else if (t === 'p' || t === 'figcaption' || t === 'caption' || t === 'dt' || t === 'dd') {
      const text = inline(n.children).trim();
      if (text) out.push(t === 'dt' ? `**${text}**` : text);
    } else if (t === 'ul' || t === 'ol') {
      const items = n.children.filter((c) => typeof c !== 'string' && c.tag === 'li' && !dropped(c)).map((li) => blocks(li.children, ctx).join('\n'));
      const md = list(items, t === 'ol');
      if (md) out.push(md);
    } else if (t === 'table') out.push(...renderTable(n));
    else if (t === 'pre') out.push(`\`\`\`\n${textOf(n)}\n\`\`\``);
    else if (t === 'blockquote') { const inner = blocks(n.children, ctx).join('\n\n'); if (inner) out.push(inner.split('\n').map((l) => `> ${l}`).join('\n')); }
    else if (t === 'details') {
      const summary = n.children.find((c) => typeof c !== 'string' && c.tag === 'summary');
      if (summary) out.push(heading(3, inline(summary.children).trim()));
      out.push(...blocks(n.children.filter((c) => c !== summary), ctx));
    } else if (t === 'summary') { const text = inline(n.children).trim(); if (text) out.push(heading(3, text)); }
    else if (t === 'hr') continue;
    else if (t === 'a') {
      // Card links (<a><h3/><p/></a>): render the blocks, linking the first heading.
      const inner = blocks(n.children, ctx);
      const href = n.attrs.href || '';
      if (inner.length && /^#{2,6} /.test(inner[0]) && href && !href.startsWith('#')) {
        const [, hashes, text] = inner[0].match(/^(#+) (.*)$/);
        inner[0] = `${hashes} ${link(text, href)}`;
      } else if (href && !href.startsWith('#')) inner.push(link(textOf(n).slice(0, 80) || href, href));
      out.push(...inner);
    } else out.push(...blocks(n.children, ctx));
  }
  flush();
  return out.filter(Boolean);
}

// Head metadata + JSON-LD of a full HTML document.
export function pageMeta(html) {
  const head = String(html).slice(0, Math.max(String(html).search(/<body[\s>]/i), 0) || undefined);
  const metas = {};
  for (const m of head.matchAll(/<meta\s+([^>]*?)\/?>/gi)) {
    const a = parseAttrs(m[1]);
    const k = a.name || a.property;
    if (k && a.content !== undefined && metas[k] === undefined) metas[k] = a.content;
  }
  const title = decode((head.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '').trim();
  const canonical = decode((head.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i) || [])[1] || '');
  const ld = [];
  for (const m of String(html).matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try { const j = JSON.parse(m[1]); ld.push(...(Array.isArray(j) ? j : j['@graph'] || [j])); } catch { /* ignore bad block */ }
  }
  const dated = ld.find((n) => n && (n.dateModified || n.datePublished)) || {};
  return {
    title,
    ogTitle: metas['og:title'] || '',
    description: metas.description || metas['og:description'] || '',
    robots: metas.robots || '',
    canonical,
    dateModified: dated.dateModified || dated.datePublished || '',
    datePublished: dated.datePublished || '',
    ld
  };
}

// Main content of a full HTML document as markdown blocks, plus its h1 text.
export function extractMain(html) {
  const tree = parseHtml(String(html).replace(/^[\s\S]*?<body[^>]*>/i, ''));
  const main = find(tree, (n) => n.tag === 'main') || tree;
  const h1 = find(main, (n) => n.tag === 'h1');
  return { h1: h1 ? textOf(h1) : '', blocks: blocks(main.children, { skipH1: true }), tree: main };
}
