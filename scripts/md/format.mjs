// Shared markdown formatting helpers for scripts/build-md.mjs (no dependencies).
import { SITE } from './site-config.mjs';

const collapse = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();

// Absolute HTML URL for an internal path or href. Internal links always point at the HTML
// page (never the .md alternate); .html and trailing slashes are dropped like the worker does.
export function absUrl(href) {
  const raw = String(href || '').trim();
  if (!raw) return '';
  if (/^(mailto:|tel:)/i.test(raw)) return raw;
  let u;
  try { u = new URL(raw, `${SITE.url}/`); } catch { return ''; }
  if (!/^https?:$/.test(u.protocol)) return '';
  if (u.hostname === 'www.pratikbajoria.com') u.hostname = 'pratikbajoria.com';
  if (u.hostname === 'pratikbajoria.com') {
    u.protocol = 'https:';
    let p = u.pathname.replace(/\/index\.html$/i, '/').replace(/\.html$/i, '');
    if (p.length > 1) p = p.replace(/\/+$/, '');
    u.pathname = p || '/';
  }
  return u.toString();
}

export const isInternal = (url) => url.startsWith(`${SITE.url}/`);
export const pathOf = (url) => (isInternal(url) ? new URL(url).pathname : null);
export const canonicalFor = (path) => (path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`);
export const mdUrlFor = (path) => `${SITE.url}${path === '/' ? '/index' : path}.md`;

export const escText = (s) => collapse(s).replace(/([\\`*_])/g, '\\$1');
export const escLinkText = (s) => collapse(s).replace(/([\[\]\\])/g, '\\$1');

export function link(text, href) {
  const url = absUrl(href);
  const label = escLinkText(text) || url;
  return url ? `[${label}](${url.replace(/[()\s]/g, (c) => ({ '(': '%28', ')': '%29' }[c] || '%20'))})` : label;
}

export const heading = (level, text) => `${'#'.repeat(Math.min(Math.max(level, 1), 6))} ${collapse(text)}`;

export function list(items, ordered = false) {
  return items.filter((i) => collapse(i)).map((item, i) => {
    const [first, ...rest] = String(item).split('\n');
    const marker = ordered ? `${i + 1}.` : '-';
    return [`${marker} ${first}`, ...rest.map((l) => (l ? `${' '.repeat(marker.length + 1)}${l}` : l))].join('\n');
  }).join('\n');
}

export function table(head, rows) {
  const cell = (c) => collapse(c).replace(/\|/g, '\\|') || ' ';
  const width = Math.max(head.length, ...rows.map((r) => r.length));
  const pad = (r) => Array.from({ length: width }, (_, i) => cell(r[i] ?? ''));
  return [
    `| ${pad(head).join(' | ')} |`,
    `| ${Array(width).fill('---').join(' | ')} |`,
    ...rows.map((r) => `| ${pad(r).join(' | ')} |`)
  ].join('\n');
}

// YYYY-MM-DD from a date-ish string, or '' when unknown.
export function isoDate(value) {
  const m = String(value || '').match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : '';
}

export const approxTokens = (text) => Math.ceil(String(text).length / 4);

// Standard page layout: title, summary, canonical, last updated, body, related links.
export function pageMarkdown({ title, summary, path, lastModified, body, related = [] }) {
  const out = [heading(1, title)];
  if (summary) out.push(`> ${collapse(summary)}`);
  out.push(`Canonical: ${canonicalFor(path)}${lastModified ? `\nLast updated: ${lastModified}` : ''}`);
  if (String(body || '').trim()) out.push(String(body).trim());
  const rel = related.filter(([, url]) => url && url !== canonicalFor(path));
  if (rel.length) out.push(`${heading(2, 'Related')}\n${list(rel.map(([text, url]) => link(text, url)))}`);
  return `${out.join('\n\n').replace(/\n{3,}/g, '\n\n')}\n`;
}
