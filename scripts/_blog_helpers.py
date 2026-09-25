"""Evergreen blog helpers — match Semrush template markup."""
from __future__ import annotations
import html as H
import json
import re

TODAY = "2026-09-25"

CALLOUT = """<aside class="site-callout" style="margin:28px 0;padding:20px 22px;border:1px solid rgba(28,28,26,0.12);border-radius:12px;background:#faf7f1">
  <p class="eyebrow" style="margin:0 0 8px">From pratikbajoria.com</p>
  <p style="margin:0 0 12px"><strong>Buy tools after you know which workflow pays back.</strong> Start with the free <a href="https://pratikbajoria.com/scorecard">AI Opportunity Scorecard</a>, or see the scoped <a href="https://pratikbajoria.com/audit">AI Opportunity Audit</a> for a 90-day map.</p>
  <p style="margin:0;display:flex;flex-wrap:wrap;gap:10px"><a class="button button-cream" href="/scorecard">Open scorecard ↗</a> <a class="muted-link" href="/audit">View audit →</a></p>
</aside>"""

def esc(s: str) -> str:
    return H.escape(s, quote=True)

def figure(src: str, alt: str) -> str:
    return f"""<figure style="margin:28px 0">
  <img src="{src}" alt="{esc(alt)}" loading="lazy" width="900" height="520" style="width:100%;height:auto;border-radius:10px;border:1px solid rgba(28,28,26,0.08)" />
  <figcaption style="margin-top:10px;font-size:0.9rem;color:#6f746d">Evaluation framework only — illustrative example scores for a strong-fit profile. Score your own business on each axis from 1 to 5; this is not market-share or industry data.</figcaption>
</figure>"""

def rubric_table(rows) -> str:
    out = ["""<table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:0.95rem">
  <thead>
    <tr style="background:#ebe6dc">
      <th style="text-align:left;padding:10px;border:1px solid #cfc9bc">Axis</th>
      <th style="text-align:left;padding:10px;border:1px solid #cfc9bc">1 = weak fit</th>
      <th style="text-align:left;padding:10px;border:1px solid #cfc9bc">5 = strong fit</th>
      <th style="text-align:left;padding:10px;border:1px solid #cfc9bc">Your score</th>
    </tr>
  </thead>
  <tbody>"""]
    for axis, weak, strong in rows:
        out.append(
            f'<tr><td style="padding:10px;border:1px solid #cfc9bc">{axis}</td>'
            f'<td style="padding:10px;border:1px solid #cfc9bc">{weak}</td>'
            f'<td style="padding:10px;border:1px solid #cfc9bc">{strong}</td>'
            f'<td style="padding:10px;border:1px solid #cfc9bc">___</td></tr>'
        )
    out.append("</tbody>\n</table>")
    return "\n".join(out)

def checklist(items) -> str:
    lis = "\n".join(f"  <li>{i}</li>" for i in items)
    return f"<h2>Monday-morning checklist</h2>\n<ul>\n{lis}\n</ul>"

def sources(items) -> str:
    lis = "\n".join(
        f'  <li><a href="{u}" target="_blank" rel="noopener noreferrer">{t}</a></li>'
        for t, u in items
    )
    return f"<h2>Sources</h2>\n<ul>\n{lis}\n</ul>"

def tool_card(name, blurb, url) -> str:
    return (
        f'<a href="{url}" target="_blank" rel="noopener noreferrer">'
        f"<strong>{name}</strong><span>{blurb}</span>"
        f"<small>Visit {name} official site ↗</small></a>"
    )

def make_ld(title, description, published, slug, image, keywords) -> str:
    return json.dumps(
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "datePublished": published,
            "dateModified": TODAY,
            "author": {
                "@type": "Person",
                "name": "Pratik Bajoria",
                "url": "https://pratikbajoria.com/#person",
                "sameAs": ["https://www.linkedin.com/in/pratik-bajoria-6288b1119/"],
            },
            "publisher": {
                "@type": "Person",
                "name": "Pratik Bajoria",
                "@id": "https://pratikbajoria.com/#person",
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": f"https://pratikbajoria.com/blog/{slug}",
            },
            "image": image.replace("&amp;", "&"),
            "keywords": keywords,
        },
        indent=2,
    )

HEAD = """<!doctype html>
<html lang="en-IN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#f4f0e8" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />
    <meta name="author" content="Pratik Bajoria" />
    <title>{title} — Pratik Bajoria</title>
    <meta name="description" content="{description}" />
    <link rel="canonical" href="https://pratikbajoria.com/blog/{slug}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="{title_attr}" />
    <meta property="og:description" content="{description}" />
    <meta property="og:url" content="https://pratikbajoria.com/blog/{slug}" />
    <meta property="og:image" content="{image}" />
    <meta property="og:site_name" content="Pratik Bajoria" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{title_attr}" />
    <meta name="twitter:description" content="{description}" />
    <meta name="twitter:image" content="{image}" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="stylesheet" href="/styles.css" />
    <link rel="stylesheet" href="/styles-overrides.css?v=20260910" />
    <script type="application/ld+json">
{ld}
    </script>
      <script src="/ga4.js" defer></script>
</head>
  <body data-static-article="1" data-slug="{slug}">
    <main class="shell article-page">
      <header class="article-header">
        <a class="wordmark" href="/" aria-label="Pratik Bajoria home"><span>PB</span></a>
        <div class="article-header-links">
          <a class="text-link" href="/topics">50 topic guide ↗</a>
          <a class="text-link" href="/blog">All insights ↗</a>
          <a class="text-link" href="/#insights">Home insights ↗</a>
        </div>
      </header>
      <article id="article">
        <p class="eyebrow">{category} · {published} · {read} min read</p>
        <h1>{h1}</h1>
        <p class="article-dek">{dek}</p>
        <div class="article-body">
"""

TAIL_TOOLS = """
        </div>
        <aside class="article-tools" aria-label="Tools mentioned in this article"><p class="eyebrow">Tools worth evaluating</p><div class="article-tool-grid">{tools}</div><p class="article-tool-note">Tool links go to the vendor’s official site. No affiliate tracking is active on this page yet. Recommendations are based on fit for finance, ops and AI implementation work — not on commission.</p></aside>
        <p class="ymyl-note" style="margin-top:28px;font-size:0.92rem;color:#6f746d"><em>Educational content; not financial, investment, or legal advice.</em></p>
                <div class="article-cta" style="margin-top:40px;padding:24px;border:1px solid rgba(28,28,26,0.12);border-radius:12px">
          <p class="eyebrow">Next step</p>
          <h2 style="font-size:1.4rem;margin:8px 0 12px">Turn this insight into action</h2>
          <p>Discuss where AI creates measurable P&amp;L impact — or start free with the scorecard.</p>
          <p class="article-cta-actions" style="margin-top:16px;display:flex;flex-wrap:wrap;gap:12px;align-items:center">
            <a class="button button-dark" href="/#contact">Book a discovery call <span>↗</span></a>
            <a class="button button-cream" href="/scorecard">Get the free AI Opportunity Scorecard <span>↗</span></a>
          </p>
          <p style="margin-top:14px"><a class="muted-link" href="/audit">See the AI Opportunity Audit →</a></p>
        </div>
</article>
    </main>
    <footer class="site-footer shell">
      <div class="wordmark"><span>PB</span></div>
      <div>© <span id="year"></span> Pratik Bajoria</div>
      <div>
        <a href="/privacy">Privacy</a>
        <a href="/llms.txt">llms.txt</a>
        <a href="/blog">Blog</a>
        <a href="/topics">Topics</a>
        <a href="mailto:hello@pratikbajoria.com">Contact</a>
      </div>
    </footer>
    <script>document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());</script>
    <script src="/blog.js?v=20260909" defer></script>
  </body>
</html>
"""

TAIL_NO_TOOLS = """
        </div>
        <p class="ymyl-note" style="margin-top:28px;font-size:0.92rem;color:#6f746d"><em>Educational content; not financial, investment, or legal advice.</em></p>
                <div class="article-cta" style="margin-top:40px;padding:24px;border:1px solid rgba(28,28,26,0.12);border-radius:12px">
          <p class="eyebrow">Next step</p>
          <h2 style="font-size:1.4rem;margin:8px 0 12px">Turn this insight into action</h2>
          <p>Discuss where AI creates measurable P&amp;L impact — or start free with the scorecard.</p>
          <p class="article-cta-actions" style="margin-top:16px;display:flex;flex-wrap:wrap;gap:12px;align-items:center">
            <a class="button button-dark" href="/#contact">Book a discovery call <span>↗</span></a>
            <a class="button button-cream" href="/scorecard">Get the free AI Opportunity Scorecard <span>↗</span></a>
          </p>
          <p style="margin-top:14px"><a class="muted-link" href="/audit">See the AI Opportunity Audit →</a></p>
        </div>
</article>
    </main>
    <footer class="site-footer shell">
      <div class="wordmark"><span>PB</span></div>
      <div>© <span id="year"></span> Pratik Bajoria</div>
      <div>
        <a href="/privacy">Privacy</a>
        <a href="/llms.txt">llms.txt</a>
        <a href="/blog">Blog</a>
        <a href="/topics">Topics</a>
        <a href="mailto:hello@pratikbajoria.com">Contact</a>
      </div>
    </footer>
    <script>document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());</script>
    <script src="/blog.js?v=20260909" defer></script>
  </body>
</html>
"""

def render(meta: dict, body: str, tools_html: str | None = None) -> str:
    title = meta["title"]
    h1 = meta.get("h1", title)
    desc = meta["description"]
    ld = make_ld(title, desc, meta["published"], meta["slug"], meta["image"], meta["keywords"])
    head = HEAD.format(
        title=title,
        title_attr=esc(title),
        description=esc(desc),
        slug=meta["slug"],
        image=meta["image"],
        ld=ld,
        category=meta["category"],
        published=meta["published"],
        read=meta["read"],
        h1=h1,
        dek=desc,
    )
    if tools_html is None:
        return head + body + TAIL_NO_TOOLS
    return head + body + TAIL_TOOLS.format(tools=tools_html)

def plain_text(body: str) -> str:
    text = re.sub(r"<[^>]+>", " ", body)
    text = H.unescape(text)
    return re.sub(r"\s+", " ", text).strip()
