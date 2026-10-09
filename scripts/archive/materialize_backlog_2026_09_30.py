#!/usr/bin/env python3
"""Catch-up for 25–30 Sep 2026: materialise SSR HTML for daily posts that only landed in
blog-posts.json (soft-404 fix), publish two CA + AI India editorial posts, and update
sitemap, blog index, topics, hub and llms.txt. Idempotent."""
from __future__ import annotations
import os as _os, sys as _sys
if _os.environ.get("ALLOW_ARCHIVED_SCRIPT") != "1":
    _sys.exit("Archived one-off script (already applied). Re-running would overwrite newer rewrites and could "
             "recreate posts retired on 7 Oct 2026 (see scripts/archive/README.md). Set ALLOW_ARCHIVED_SCRIPT=1 "
             "only if you really mean it; retired slugs are skipped regardless.")
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
sys.path.insert(0, str(ROOT / "scripts" / "archive"))
import _blog_helpers as H  # noqa: E402

TODAY = "2026-09-30"
H.TODAY = TODAY
from _blog_helpers import render, plain_text, tool_card, esc  # noqa: E402
from backlog_bodies_2026_09_30 import DAILY  # noqa: E402
from backlog_new_posts_2026_09_30 import NEW_POSTS, faq_ld  # noqa: E402

PUB = ROOT / "public"
BLOG = PUB / "blog"
POSTS_PATH = PUB / "blog-posts.json"
SITEMAP = PUB / "sitemap.xml"
CATALOG = json.loads((PUB / "affiliate-links.json").read_text())
HUB_SLUG = "ai-for-chartered-accountants-in-india"
BASE = "https://pratikbajoria.com"
DISCLOSURE = ("Tool links go to the vendor’s official site unless an affiliate URL is configured. Recommendations are "
              "based on fit for finance, ops and AI implementation — not on commission.")


def wcount(s: str) -> int:
    return len(plain_text(s).split())


def tools_html(keys):
    cards = []
    for k in keys or []:
        t = CATALOG.get(k)
        if t:
            cards.append(tool_card(t["name"], t.get("category", "Tool"), t.get("productUrl") or t.get("url") or "#"))
    return "".join(cards) or None


def upsert_sitemap(urls):
    text = SITEMAP.read_text()
    for loc, lastmod, pri in urls:
        entry = f"  <url><loc>{loc}</loc><lastmod>{lastmod}</lastmod><changefreq>monthly</changefreq><priority>{pri}</priority></url>\n"
        pat = re.compile(r"  <url><loc>" + re.escape(loc) + r"</loc>.*?</url>\n", re.S)
        text = pat.sub(entry, text) if pat.search(text) else text.replace("</urlset>", entry + "</urlset>")
    for loc in (f"{BASE}/blog", f"{BASE}/", f"{BASE}/topics"):
        text = re.sub(r"(<url><loc>" + re.escape(loc) + r"</loc><lastmod>)[^<]+", r"\g<1>" + TODAY, text, count=1)
    SITEMAP.write_text(text)


def _retired_slugs():
    import json as _json
    p = Path(__file__).resolve().parents[1] / "blog-retired-topics.json"
    try:
        return {r["slug"] for r in _json.loads(p.read_text()).get("retired", [])}
    except FileNotFoundError:
        return set()


def main():
    posts = json.loads(POSTS_PATH.read_text())
    by_slug = {p["slug"]: p for p in posts}
    sitemap_urls = []
    done = []

    # 1) Daily posts missing SSR pages
    retired = _retired_slugs()
    for slug, body in DAILY.items():
        if slug in retired:
            print(f"Skip retired slug {slug} (301s to its survivor)")
            continue
        p = by_slug[slug]
        read = max(5, round(wcount(body) / 200))
        meta = {"title": p["title"], "description": p["excerpt"], "published": p["date"], "slug": slug,
                "image": p.get("image"), "keywords": p.get("keywords") or [], "category": p.get("category") or "Insights",
                "read": read}
        (BLOG / f"{slug}.html").write_text(render(meta, body, tools_html(p.get("affiliateTools"))))
        p["content"] = plain_text(body)
        p["readTime"] = read
        p["generatedBy"] = "editorial-ssr-materialise"
        srcs = re.findall(r'<li><a href="(https://[^"]+)"[^>]*>([^<]+)</a></li>', body.split("<h2>Sources</h2>")[-1])
        if srcs:
            p["sources"] = [{"title": t, "url": u} for u, t in srcs]
        sitemap_urls.append((f"{BASE}/blog/{slug}", TODAY, "0.75"))
        done.append(slug)

    # 2) New editorial posts
    for np in NEW_POSTS:
        slug = np["slug"]
        url = f"{BASE}/blog/{slug}"
        read = max(6, round(wcount(np["body"]) / 200))
        meta = {"title": np["title"], "description": np["excerpt"], "published": np["date"], "slug": slug,
                "image": np["image"], "keywords": np["keywords"], "category": np["category"], "read": read}
        html = render(meta, np["body"], None)
        faq_block = f'    <script type="application/ld+json">\n{faq_ld(np["faq"], url)}\n    </script>\n'
        html = html.replace('      <script src="/ga4.js?v=20261009-nobot" defer></script>', faq_block + '      <script src="/ga4.js?v=20261009-nobot" defer></script>', 1)
        (BLOG / f"{slug}.html").write_text(html)
        entry = {
            "id": slug, "title": np["title"], "slug": slug, "url": f"/blog/{slug}", "date": np["date"],
            "author": "Pratik Bajoria", "category": np["category"], "readTime": read, "image": np["image"],
            "excerpt": np["excerpt"], "content": plain_text(np["body"]), "keywords": np["keywords"],
            "sources": np["sources"], "generatedBy": "editorial-monday-seo" if np["date"] == "2026-09-28" else "editorial-ca-cluster",
            "affiliateTools": [], "affiliate": {"disclosure": DISCLOSURE},
        }
        posts = [x for x in posts if x.get("slug") != slug]
        posts.append(entry)
        sitemap_urls.insert(0, (url, TODAY, "0.85"))
        done.append(slug)

    posts.sort(key=lambda x: (x.get("date", ""), 1 if str(x.get("generatedBy", "")).startswith("editorial-") and x["slug"] in {n["slug"] for n in NEW_POSTS} else 0), reverse=True)
    POSTS_PATH.write_text(json.dumps(posts, indent=2, ensure_ascii=False) + "\n")
    sitemap_urls.append((f"{BASE}/blog/{HUB_SLUG}", TODAY, "0.85"))
    upsert_sitemap(sitemap_urls)

    # 3) Hub page: add links to the new CA playbooks + bump dateModified
    hub = BLOG / f"{HUB_SLUG}.html"
    h = hub.read_text()
    gst, audit = NEW_POSTS[1], NEW_POSTS[0]
    if gst["slug"] not in h:
        section = (
            "<h2>Deeper CA playbooks: GST and audit</h2>\n"
            f'<p>Two workflows come up in almost every CA practice conversation. For monthly GST work, read '
            f'<a href="/blog/{gst["slug"]}">how Indian CA firms can use AI for GST reconciliation without risking client data</a> '
            f'— GSTR-2B matching, IMS review and notice triage with a clear human gate. For assurance work, read '
            f'<a href="/blog/{audit["slug"]}">AI for audit working papers in India: what to automate and what must stay human</a> '
            f'— how to use AI without weakening SA 230 documentation. For the operating habit that keeps both alive in busy season, see '
            f'<a href="/blog/2026-09-29-the-monday-morning-test-for-any-ai-workflow">the Monday morning test for any AI workflow</a>.</p>\n\n'
        )
        h = h.replace("<h2>Monday-morning checklist</h2>", section + "<h2>Monday-morning checklist</h2>", 1)
    h = re.sub(r'"dateModified": "[^"]+"', f'"dateModified": "{TODAY}"', h, count=1)
    hub.write_text(h)

    # 4) Static blog index (blog.html): prepend cards for new + materialised posts
    bh = (PUB / "blog.html").read_text()
    order = sorted([p for p in posts if p["slug"] in done], key=lambda x: x["date"], reverse=True)
    cards = ""
    for p in order:
        if f'href="/blog/{p["slug"]}"' in bh:
            continue
        cards += (
            '      <article class="blog-index-card" style="padding:20px 0;border-bottom:1px solid rgba(28,28,26,0.08)">\n'
            f'        <p class="eyebrow">{esc(p["category"])} · {p["date"]}</p>\n'
            f'        <h2 style="font-size:1.35rem;margin:6px 0 8px"><a href="/blog/{p["slug"]}">{esc(p["title"])}</a></h2>\n'
            f'        <p style="color:#6f746d;max-width:720px">{esc(p["excerpt"])}</p>\n'
            '      </article>\n'
        )
    if cards:
        bh = bh.replace('<div id="blog-index-list">\n', '<div id="blog-index-list">\n' + cards, 1)
        (PUB / "blog.html").write_text(bh)

    # 5) topics.html: point GST + audit topics at the new dedicated posts
    t = (PUB / "topics.html").read_text()
    t = t.replace('"name":"AI for audit and assurance","url":"https://pratikbajoria.com/blog/best-ai-tools-chartered-accountants-finance-professionals"',
                  f'"name":"AI for audit and assurance","url":"{BASE}/blog/{audit["slug"]}"')
    t = t.replace('"name":"AI for GST compliance","url":"https://pratikbajoria.com/blog/small-business-ai-without-losing-financial-control"',
                  f'"name":"AI for GST compliance","url":"{BASE}/blog/{gst["slug"]}"')
    t = t.replace('<a href="/blog/best-ai-tools-chartered-accountants-finance-professionals">AI for audit and assurance</a>',
                  f'<a href="/blog/{audit["slug"]}">AI for audit and assurance</a>')
    t = t.replace('<a href="/blog/small-business-ai-without-losing-financial-control">AI for GST compliance</a>',
                  f'<a href="/blog/{gst["slug"]}">AI for GST compliance</a>')
    (PUB / "topics.html").write_text(t)

    # 6) llms.txt: add the new CA posts to Selected articles
    lt = (PUB / "llms.txt").read_text()
    add = ""
    for np in (gst, audit):
        if np["slug"] not in lt:
            add += f'- [{np["title"]}]({BASE}/blog/{np["slug"]})\n'
    if add and "## Selected articles\n\n" in lt:
        lt = lt.replace("## Selected articles\n\n", "## Selected articles\n\n" + add, 1)
        (PUB / "llms.txt").write_text(lt)

    print("DONE")
    for s in done:
        print(" ", s)


if __name__ == "__main__":
    main()
