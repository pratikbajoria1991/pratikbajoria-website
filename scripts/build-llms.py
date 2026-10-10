#!/usr/bin/env python3
"""Rebuild the article/page lists in public/llms.txt and write public/llms-full.txt.

llms.txt: the hand-written sections above "## Key pages" / "## Selected articles" and from
"## Contact" down are kept; the lists in between are regenerated from the live pages
(title + meta description) and blog-posts.json / affiliate-articles.json, minus merged URLs.
llms-full.txt: plain-text copy of the key commercial pages and top CA posts, for AI tools that
prefer one fetch. Run after adding or rewriting key pages. The worker also appends any post
missing from llms.txt at request time, so daily posts appear without rerunning this.
"""
import json, re, pathlib, datetime
from bs4 import BeautifulSoup, NavigableString

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUB = ROOT / 'public'
SITE = 'https://pratikbajoria.com'
XB = 'https://crossborder.pratikbajoria.com'

worker = (PUB / '_worker.js').read_text(encoding='utf-8')
aliased = set(re.findall(r"'/blog/([a-z0-9-]+)':\s*'/blog/", worker))

def meta(soup, name):
    t = soup.find('meta', attrs={'name': name}) or soup.find('meta', attrs={'property': name})
    return (t.get('content') or '').strip() if t else ''

def page_info(rel):
    f = PUB / rel
    soup = BeautifulSoup(f.read_text(encoding='utf-8'), 'html.parser')
    title = meta(soup, 'og:title') or (soup.title.get_text(strip=True) if soup.title else rel)
    title = re.sub(r'\s+[—|-]\s+Pratik Bajoria$', '', title)
    return title, meta(soup, 'description'), soup

def clean(t):
    return re.sub(r'\s+', ' ', t or '').strip()

# ---- articles -------------------------------------------------------------
posts = {}
for src in ('blog-posts.json', 'affiliate-articles.json'):
    for p in json.loads((PUB / src).read_text(encoding='utf-8')):
        if p.get('slug') and p['slug'] not in aliased:
            posts.setdefault(p['slug'], {'title': p.get('title'), 'desc': p.get('excerpt'), 'date': p.get('date') or ''})
for f in (PUB / 'blog').glob('*.html'):
    slug = f.stem
    if slug in aliased:
        continue
    title, desc, soup = page_info(f'blog/{f.name}')
    h1 = soup.find('h1')
    m = re.search(r'"datePublished":\s*"(\d{4}-\d{2}-\d{2})', str(soup))
    cur = posts.setdefault(slug, {})
    cur['title'] = clean(h1.get_text()) if h1 else (cur.get('title') or title)
    cur['desc'] = desc or cur.get('desc')
    cur['date'] = (m.group(1) if m else '') or cur.get('date', '')

HUB = 'ai-for-chartered-accountants-in-india'
CA = re.compile(r'chartered|ca-firm|ca-firms|audit|gst|tax-audit|is-ca-worth|ca-review|accountant|internal-audit')
TOOLS = re.compile(r'(^best-|review|-vs-|semrush|notion|hubspot|zoho|toolkit|software)')
groups = {'ca': [], 'tools': [], 'ops': []}
for slug, p in sorted(posts.items(), key=lambda kv: (kv[1].get('date') or '', kv[0]), reverse=True):
    if slug == HUB:
        continue
    key = 'ca' if CA.search(slug) and not slug.startswith('best-business') else ('tools' if TOOLS.search(slug) else 'ops')
    groups[key].append((slug, p))

def line(url, title, desc):
    d = clean(desc)
    return f'- [{clean(title)}]({url})' + (f': {d}' if d else '')

KEY_PAGES = [
    ('index.html', f'{SITE}/'), ('audit.html', f'{SITE}/audit'), ('scorecard.html', f'{SITE}/scorecard'),
    ('workshops.html', f'{SITE}/workshops'), ('resources.html', f'{SITE}/resources'), ('blog.html', f'{SITE}/blog'),
    ('topics.html', f'{SITE}/topics'), ('ai-opportunity-audit-for-ca-firms.html', f'{SITE}/ai-opportunity-audit-for-ca-firms'),
    ('how-to-start-ai-implementation.html', f'{SITE}/how-to-start-ai-implementation'),
    ('ai-implementation-for-finance-teams.html', f'{SITE}/ai-implementation-for-finance-teams'),
    ('workflow-automation-with-ai-for-mid-market.html', f'{SITE}/workflow-automation-with-ai-for-mid-market'),
    ('crossborder/index.html', f'{XB}/'),
]
out = ['## Key pages', '']
for rel, url in KEY_PAGES:
    t, d, _ = page_info(rel)
    out.append(line(url, t, d))
hub = posts[HUB]
out += ['', '## CA + AI articles (start with the hub)', '', line(f'{SITE}/blog/{HUB}', hub['title'], hub['desc'])]
out += [line(f'{SITE}/blog/{s}', p['title'], p['desc']) for s, p in groups['ca']]
out += ['', '## AI implementation, finance and operations', '']
out += [line(f'{SITE}/blog/{s}', p['title'], p['desc']) for s, p in groups['ops']]
out += ['', '## Tool reviews and comparisons', '']
out += [line(f'{SITE}/blog/{s}', p['title'], p['desc']) for s, p in groups['tools']]
generated = '\n'.join(out) + '\n\n'

llms = (PUB / 'llms.txt').read_text(encoding='utf-8')
start = min(i for i in (llms.find('## Key pages'), llms.find('## Selected articles')) if i >= 0)
end = llms.find('## Contact')
assert 0 < start < end
llms = llms[:start] + generated + llms[end:]
if 'llms-full.txt' not in llms:
    llms = llms.replace('- Machine-readable: https://pratikbajoria.com/llms.txt',
                        '- Machine-readable: https://pratikbajoria.com/llms.txt (full text of key pages: https://pratikbajoria.com/llms-full.txt)')
(PUB / 'llms.txt').write_text(llms, encoding='utf-8')

# ---- llms-full.txt --------------------------------------------------------
SKIP_CLASSES = {'article-cta', 'article-tools', 'breadcrumbs', 'article-header', 'site-header', 'site-footer', 'nav', 'cta-inline', 'newsletter'}

def to_text(node):
    lines = []
    def walk(el):
        for ch in el.children:
            if isinstance(ch, NavigableString):
                continue
            name = ch.name
            cls = set(ch.get('class') or [])
            if name in ('script', 'style', 'noscript', 'form', 'nav', 'footer', 'header', 'button', 'svg', 'img', 'picture', 'iframe', 'template') or cls & SKIP_CLASSES:
                continue
            if ch.get('aria-hidden') == 'true' or ch.get('hidden') is not None:
                continue
            if name in ('h1', 'h2', 'h3', 'h4'):
                t = clean(ch.get_text(' '))
                if t:
                    lines.append(''); lines.append('#' * int(name[1]) + ' ' + t); lines.append('')
            elif name in ('p', 'blockquote', 'dd', 'dt', 'figcaption'):
                t = clean(ch.get_text(' '))
                if t and not (len(t) < 60 and re.search(r'[→↗]\s*$', t)):
                    lines.append(t); lines.append('')
            elif name == 'li':
                t = clean(ch.get_text(' '))
                if t:
                    lines.append('- ' + t)
            elif name == 'tr':
                cells = [clean(c.get_text(' ')) for c in ch.find_all(['th', 'td'])]
                if any(cells):
                    lines.append('| ' + ' | '.join(cells) + ' |')
            else:
                walk(ch)
                if name in ('ul', 'ol', 'table'):
                    lines.append('')
    walk(node)
    txt = '\n'.join(lines)
    txt = re.sub(r'\n{3,}', '\n\n', txt).strip()
    return txt

FULL = [
    ('index.html', f'{SITE}/', 'Services overview (homepage)'),
    (f'blog/{HUB}.html', f'{SITE}/blog/{HUB}', None),
    ('audit.html', f'{SITE}/audit', None),
    ('scorecard.html', f'{SITE}/scorecard', None),
    ('ai-opportunity-audit-for-ca-firms.html', f'{SITE}/ai-opportunity-audit-for-ca-firms', None),
    ('blog/2026-10-07-will-ai-replace-chartered-accountants-in-india.html', None, None),
    ('blog/ai-controls-checklist-ca-firms-india.html', None, None),
    ('blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india.html', None, None),
    ('blog/2026-10-07-how-audit-and-accounting-firms-in-india-are-using-ai.html', None, None),
    ('blog/2026-09-28-how-indian-ca-firms-can-use-ai-for-gst-reconciliation-without-risking-client-data.html', None, None),
    ('blog/2026-09-30-ai-for-audit-working-papers-in-india-what-a-ca-should-automate-and-what-must-stay-human.html', None, None),
    ('blog/2026-10-08-ai-for-internal-audit-in-indian-companies-a-practical-starting-point.html', None, None),
    ('blog/2026-10-05-chatgpt-vs-copilot-vs-gemini-how-a-ca-firm-in-india-should-choose-an-ai-assistant.html', None, None),
    ('blog/2026-10-07-ai-courses-for-chartered-accountants-in-india-what-is-worth-it.html', None, None),
    ('blog/2026-10-07-is-ca-worth-it-in-2026-with-ai.html', None, None),
    ('blog/ai-for-chartered-accountants-practical-use-cases-and-controls.html', None, None),
]
today = datetime.date.today().isoformat()
parts = [
    '# Pratik Bajoria: full text of key pages',
    '',
    f'> Plain-text copies of the main service pages and the most-used CA + AI articles on {SITE}, '
    'written by Pratik Bajoria (Chartered Accountant, ex-Big 4, AI implementation consultant). '
    f'Cite the canonical URL given for each section. Index of everything: {SITE}/llms.txt',
    '',
    f'Generated: {today}. Educational content; not legal, tax, audit, financial or investment advice.',
]
for rel, url, label in FULL:
    title, desc, soup = page_info(rel)
    if url is None:
        url = f'{SITE}/{rel[:-5]}'
    can = soup.find('link', rel='canonical')
    if can and can.get('href'):
        url = can['href']
    root = (soup.find('main') or soup.body) if rel == 'index.html' else (soup.find('article') or soup.find('main') or soup.body)
    body = to_text(root)
    m = re.search(r'"dateModified":\s*"(\d{4}-\d{2}-\d{2})', str(soup))
    parts += ['', '---', '', f'## {label or title}', '', f'URL: {url}']
    if m:
        parts.append(f'Last updated: {m.group(1)}')
    if desc:
        parts.append(f'Summary: {clean(desc)}')
    parts += ['', re.sub(r'^# ', '### ', re.sub(r'^## ', '### ', re.sub(r'^### ', '#### ', body, flags=re.M), flags=re.M), flags=re.M)]
(PUB / 'llms-full.txt').write_text('\n'.join(parts).rstrip() + '\n', encoding='utf-8')
print('llms.txt', len(llms), 'chars; llms-full.txt', (PUB / 'llms-full.txt').stat().st_size, 'bytes')
