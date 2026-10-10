#!/usr/bin/env python3
"""Normalise the author Person in JSON-LD across the main site (public/*.html, public/blog/*.html).

- Article/BlogPosting author -> the canonical Person (@id #person) with sameAs to Pratik's real profiles.
- Any node with @id https://pratikbajoria.com/#person gets the profile sameAs merged in.
- Article/BlogPosting without dateModified gets dateModified = datePublished.
Idempotent: rerunning makes no further changes. Only JSON-LD blocks that change are rewritten.
"""
import json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent / 'public'
PERSON_ID = 'https://pratikbajoria.com/#person'
SAME_AS = [
    'https://www.linkedin.com/in/pratik-bajoria-6288b1119/',
    'https://medium.com/@pratikbajoria1991',
    'https://dev.to/pratik_bajoria_b0f8fa8367',
    'https://github.com/pratikbajoria1991',
    'https://www.indiehackers.com/pratikbajoria',
    'https://wellfound.com/u/pratik-bajoria',
    'https://hashnode.com/@pratikbajoria',
    'https://www.crunchbase.com/person/pratik-bajoria',
    'https://www.f6s.com/pratik-bajoria',
    'https://contra.com/pratik_bajoria_bvmul54o',
]
AUTHOR = {
    '@type': 'Person',
    '@id': PERSON_ID,
    'name': 'Pratik Bajoria',
    'url': 'https://pratikbajoria.com/',
    'jobTitle': 'Chartered Accountant and AI implementation consultant',
    'sameAs': SAME_AS,
}
ARTICLE_TYPES = {'Article', 'BlogPosting', 'NewsArticle', 'TechArticle'}
BLOCK = re.compile(r'(<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>)([\s\S]*?)(</script>)', re.I)


def types(n):
    t = n.get('@type')
    return set(t if isinstance(t, list) else [t])


def is_pratik(p):
    return isinstance(p, dict) and (p.get('@id') == PERSON_ID or p.get('name') == 'Pratik Bajoria')


def fix(node):
    changed = False
    if isinstance(node, list):
        for x in node:
            changed |= fix(x)
        return changed
    if not isinstance(node, dict):
        return False
    if types(node) & ARTICLE_TYPES:
        a = node.get('author')
        if a is None or is_pratik(a) or (isinstance(a, str) and 'Pratik' in a):
            if a != AUTHOR:
                node['author'] = dict(AUTHOR); changed = True
        if node.get('datePublished') and not node.get('dateModified'):
            node['dateModified'] = node['datePublished']; changed = True
    elif node.get('@id') == PERSON_ID and node.get('@type') == 'Person' and 'name' in node:
        cur = node.get('sameAs') or []
        merged = list(cur) + [u for u in SAME_AS if u not in cur]
        if merged != cur:
            node['sameAs'] = merged; changed = True
    for k, v in list(node.items()):
        if k != 'author' and isinstance(v, (dict, list)):
            changed |= fix(v)
    return changed


def dump(obj, original):
    if re.search(r'\n {2,}"', original):
        s = json.dumps(obj, indent=2, ensure_ascii=False)
    else:
        s = json.dumps(obj, ensure_ascii=False)
    return s.replace('<', '\\u003c')


def main():
    files = sorted(ROOT.glob('*.html')) + sorted((ROOT / 'blog').glob('*.html'))
    total = 0
    for f in files:
        html = f.read_text(encoding='utf-8')
        n = 0
        def repl(m):
            nonlocal n
            raw = m.group(2)
            try:
                obj = json.loads(raw)
            except Exception:
                return m.group(0)
            if not fix(obj):
                return m.group(0)
            n += 1
            lead = raw[: len(raw) - len(raw.lstrip())]
            trail = raw[len(raw.rstrip()):]
            return m.group(1) + lead + dump(obj, raw) + trail + m.group(3)
        out = BLOCK.sub(repl, html)
        if n:
            f.write_text(out, encoding='utf-8'); total += 1
            print(f'updated {f.relative_to(ROOT)} ({n} block(s))')
    print(f'{total} file(s) updated')


if __name__ == '__main__':
    main()
