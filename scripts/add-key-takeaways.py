#!/usr/bin/env python3
"""Insert a 'Key takeaways' box right after the dek of key CA posts (static HTML) and add a
`takeaways` field to JSON-rendered posts in blog-posts.json. Bullets come from
scripts/key-takeaways.json and restate facts already in each post. Idempotent."""
import json, pathlib, html
ROOT = pathlib.Path(__file__).resolve().parent.parent
data = json.loads((ROOT / 'scripts/key-takeaways.json').read_text(encoding='utf-8'))

def box(items):
    lis = ''.join(f'<li>{html.escape(t, quote=False)}</li>' for t in items)
    return ('<aside class="key-takeaways" aria-label="Key takeaways" style="margin:22px 0 8px;padding:16px 20px;'
            'border:1px solid rgba(28,28,26,0.12);border-radius:12px"><p class="eyebrow">Key takeaways</p>'
            f'<ul style="margin:8px 0 0;padding-left:20px">{lis}</ul></aside>')

posts_path = ROOT / 'public/blog-posts.json'
posts = json.loads(posts_path.read_text(encoding='utf-8'))
json_changed = False
for slug, items in data.items():
    f = ROOT / 'public/blog' / f'{slug}.html'
    if f.exists():
        s = f.read_text(encoding='utf-8')
        if 'class="key-takeaways"' in s:
            continue
        i = s.find('<p class="article-dek">')
        j = s.find('</p>', i)
        assert i > 0 and j > 0, slug
        s = s[: j + 4] + '\n        ' + box(items) + s[j + 4:]
        f.write_text(s, encoding='utf-8'); print('static', slug)
    else:
        for p in posts:
            if p.get('slug') == slug and p.get('takeaways') != items:
                p['takeaways'] = items; json_changed = True; print('json', slug)
if json_changed:
    posts_path.write_text(json.dumps(posts, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
