#!/usr/bin/env python3
"""Materialise missing Sep SSR HTML, hub page, finance-highest-roi redirect, sitemap, topics links."""
from __future__ import annotations
import json
import re
import sys
from pathlib import Path
from datetime import date

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from _blog_helpers import (  # noqa: E402
    render, checklist, sources, tool_card, figure, rubric_table, CALLOUT, plain_text, TODAY
)

# Force today Asia/Kolkata as of task date
TODAY = "2026-09-25"
import _blog_helpers as H
H.TODAY = TODAY

POSTS_PATH = ROOT / "public" / "blog-posts.json"
SITEMAP = ROOT / "public" / "sitemap.xml"
CATALOG = json.loads((ROOT / "public" / "affiliate-links.json").read_text())
BLOG = ROOT / "public" / "blog"


def wcount(html: str) -> int:
    return len(plain_text(html).split())


def catalog_url(key: str) -> str:
    t = CATALOG.get(key) or {}
    return t.get("productUrl") or t.get("url") or "#"


def tools_html(keys: list[str]) -> str:
    cards = []
    for k in keys:
        t = CATALOG.get(k)
        if not t:
            continue
        cards.append(tool_card(t["name"], t.get("category", "Tool"), t.get("productUrl") or t.get("url") or "#"))
    return "".join(cards)


# --- Expanded bodies (700–1000 words), no invented stats/client claims ---

BODIES = {}

BODIES["2026-09-19-ai-governance-for-mid-market-teams-who-do-not-have-a-chief-ai-officer"] = f"""
<p>Mid-market teams do not need a Chief AI Officer to govern AI. They need four rules people can recite on a Monday morning. A 40-page policy nobody opens is theatre. A one-page set of ownership, data, review and logging rules is an operating control.</p>
<p>I still see boards ask for “AI governance” the way they once asked for “innovation labs”: a committee, a slide, and no change to how work actually moves. Governance that works is boring on purpose. It makes the safe path the easy path. It names who owns a use case, which data classes a system may touch, when a human must approve, and what evidence must remain if auditors or clients ask how an answer was produced.</p>
<p>Start with a use-case register, not a model catalogue. For each candidate workflow write five lines: input, decision, output, owner, and what “good” looks like today. If those lines are blank, you are not ready for a model — you are guessing. Rank the register by P&amp;L impact and control risk. Fund one narrow release with a named metric. Ignore the impressive adjacent idea until the first release either proves itself or fails cleanly.</p>
<p>The four one-page rules I recommend teams adopt are deliberately short.</p>
<p><strong>1. Ownership.</strong> Every live AI-assisted workflow has a named business owner and a named technical steward. The business owner owns the metric and the stop conditions. The steward owns access, logging and change control. Dual ownership prevents the classic failure mode where IT “keeps the lights on” while Finance assumes the output is already reviewed.</p>
<p><strong>2. Data classes.</strong> Decide in advance which data may leave the company systems, which must stay in a controlled environment, and which must never be pasted into a consumer chatbot. Client identifiable data, unpublished financials and privileged advice sit in the restricted class by default. If a tool cannot honour that boundary, it stays in draft mode or it is declined.</p>
<p><strong>3. Human gates.</strong> Define which outputs require a person to approve before they become a deliverable, a journal, a client message or a management pack line. In finance and client work, an unauditable answer is not a deliverable. Keep judgement and exception handling with a named human; automate intake, drafting and matching where the risk is lower.</p>
<p><strong>4. Logging and change.</strong> Prompt libraries, model versions, connectors and access grants change. Treat those changes like any other control-relevant change: note who changed what, when, and why. Retain enough evidence that you can reconstruct a contested output. If you cannot reconstruct it, you cannot defend it.</p>
<p>These rules align with the spirit of public frameworks such as the NIST AI Risk Management Framework: map risks, measure what matters, manage with proportionate controls, and govern with clear accountability. You do not need to copy a regulator’s vocabulary wholesale. You do need the same discipline — proportionate, documented, owned.</p>
{CALLOUT}
<p>Where software helps, use a shared workspace as scaffolding for the register, exception log and weekly review — not as a second policy binder. A simple Notion board with owners, statuses and evidence links is often enough for a mid-market team. Fancy GRC suites can wait until the operating cadence is real.</p>
<p>Ship a thin release to one team for two to four weeks. Run it beside the old process if the risk is material. Review the metric every week — not in a steering committee three months later. Capture exceptions in a shared log so patterns become obvious. If the metric moves and controls hold, document the pattern so the next team does not start from folklore. If it does not move, stop. A failed pilot you can explain is cheaper than a zombie subscription.</p>
<p>Common failure modes are predictable. Governance written by Legal alone becomes unread. Governance owned only by IT becomes a ticket queue. Governance that never names a metric becomes a branding exercise. The cure is the same in each case: one page, four rules, one funded release, one weekly review.</p>
{checklist([
    "Name the business owner and technical steward for every live AI workflow.",
    "Classify data the tool may see; block restricted classes by default.",
    "Write the human approval gate before go-live.",
    "Confirm logging and change notes exist for prompts, models and connectors.",
    "Book the weekly metric review; blank lines mean pause the rollout.",
])}
{sources([
    ("NIST AI Risk Management Framework", "https://www.nist.gov/itl/ai-risk-management-framework"),
    ("CISA AI Cybersecurity Collaboration Playbook", "https://www.cisa.gov/resources-tools/resources/ai-cybersecurity-collaboration-playbook"),
])}
<p>This is educational commentary from implementation work — not personalised financial, tax, legal or investment advice. Verify vendor pricing, privacy terms and your own internal policies before you buy or deploy.</p>
"""

BODIES["2026-09-20-ecommerce-reconciliation-where-automation-helps-and-where-it-lies"] = f"""
<p>Ecommerce reconciliation is where automation looks magical in a demo and quietly dangerous in month-end. Marketplaces, payment gateways, wallets, ads credits and returns create a tangle of settlements. Mapping and matching can be automated. The settlement exception review cannot be automated away without inviting cash and tax surprises.</p>
<p>Automate mapping and matching; never automate away the settlement exception review. That is the practical cut. If your team treats “synced” as “correct”, you will discover the gap when a platform changes a fee code, a chargeback arrives late, or a return is booked in the channel but not in the ledger.</p>
<p>Write the current flow on one page before you buy another connector. Inputs: order exports, payout reports, gateway settlements, ads invoices, inventory adjustments. Decisions: which lines map to which accounts, which differences are timing versus true breaks, who investigates. Outputs: journals, exception list, evidence pack for the close. Owner: usually a finance lead with ecommerce ops as a partner. “Good” today: aged exceptions under a threshold you can defend to your auditor, and a close you can explain.</p>
<p>Where automation helps most is repetitive structure. Normalising SKUs and fee types, matching payout batches to banks, flagging duplicates, and producing a first-pass exception list. Tools in this category — including accounting automation products such as Synder for marketplace and gateway sync — are worth evaluating when volume is high and mapping rules are stable. They are scaffolding, not a substitute for judgement on breaks.</p>
<p>Where automation lies is the promise of “hands-free close”. Settlement logic changes. Platforms introduce new fee lines. Partial refunds and multi-currency FX create timing differences that look like errors. A model or rule set that auto-posts everything will bury the items a senior person should see. Design the human gate first: which exception classes require review, what evidence must attach, and who signs off before the books lock.</p>
{CALLOUT}
<p>Baseline without inventing precision you do not have. Count weekly exception volume by type, hours spent chasing platform portals, and how often senior people re-open “closed” packs. That sketch is enough to judge whether a connector and a clearer exception queue will pay for themselves. Avoid buying three tools because each demo solved a different slide. Narrow beats clever.</p>
<p>A sensible sequence looks like this. Stabilise chart-of-accounts mapping for your top channels. Put payout-to-bank matching on a controlled connector. Stand up an exception queue with owners and ageing. Only then consider richer automation on returns or ads allocation. Each step should move a metric you already manage — aged items, first-pass match rate, or close calendar days — not a vanity “automation percentage”.</p>
<p>Keep evidence trails exportable. If you leave a vendor, you still need to reconstruct how a month’s settlements were booked. Prefer tools that show mappings, logs and exception history. Pair the connector with a simple workspace checklist for month-end (owners, evidence links, sign-offs) so the process survives staff turnover.</p>
<p>When vendors pitch, ask finance questions. Which of our channels and fee types do you map today? How do chargebacks and delayed settlements appear in the exception list? Can we restrict who can post versus who can only draft? How do we retain evidence if we churn? Peers’ success stories are prompts, not proof for your mix of marketplaces and gateways.</p>
{checklist([
    "Map top channels, fee types and payout cadence on one page.",
    "Separate matching automation from exception approval.",
    "Name the owner of aged settlement breaks.",
    "Baseline exception volume and review hours before renewing licences.",
    "Confirm evidence export and mapping visibility with any vendor.",
])}
{sources([
    ("Synder", "https://synder.com/"),
    ("NIST AI Risk Management Framework", "https://www.nist.gov/itl/ai-risk-management-framework"),
])}
<p>Educational content only — not accounting, tax or investment advice. Confirm vendor terms and your own control policies before changing the close.</p>
"""

BODIES["2026-09-21-semrush-for-owners-when-search-spend-is-actually-rational"] = f"""
<p>Pay for Semrush when you will act on one commercial question a week — not when you want prettier reports. Search tools are easy to buy as status objects. They are harder to operate as a weekly decision system for a founder or marketing lead who already has a full calendar.</p>
<p>Owners usually buy SEO platforms for one of three reasons: competitor anxiety, agency theatre, or a real need to prioritise content and technical fixes against revenue. Only the third pays back reliably. If nobody on your team will open the tool on a fixed weekday, write down a question, and ship a change, the subscription becomes shelfware.</p>
<p>Start with the commercial question, not the feature tour. Examples that earn their keep: Which of our service pages should we strengthen this quarter because intent is commercial and we can fulfil the lead? Which technical issues block crawling on money pages? Where are we losing branded or near-branded queries to a thinner competitor page? Which content ideas map to offers we actually sell? If your questions are vanity (“what is our domain score?”), pause the purchase.</p>
<p>Semrush is worth evaluating when you need keyword research, competitive visibility, site audits and content gap analysis in one place, and you have someone accountable for acting on the output. It is less useful when you only need a single rank tracker, or when an agency already provides a clear monthly action list you trust. Official product pages are the right place to confirm current plans and limits — pricing and bundles change.</p>
{CALLOUT}
<p>Run a four-week trial with stop conditions. Week 1: connect the property, fix only critical technical blockers on top landing pages. Week 2: pick one money topic cluster and outline two pages you can publish. Week 3: publish or improve one page; log the change. Week 4: review whether organic enquiry quality or assisted conversions moved enough to justify the next quarter. If the only output is screenshots for a board pack, cancel.</p>
<p>Separate tooling spend from delivery spend. The licence is the middle bucket. Discovery (which offers deserve search investment) and delivery (writing, design, technical fixes, measurement) usually determine payback. Budget for those or you will fund a dashboard that never reaches production content.</p>
<p>For CA-led and professional-service firms in India, remember YMYL constraints. Do not publish unverifiable claims, invented case metrics or tax positions because a keyword tool suggested a headline. Use search data to prioritise topics you are competent to write; keep compliance review on anything that touches advice.</p>
<p>Alternatives exist. Some teams only need Search Console plus a lightweight rank tracker. Others need a full suite. Choose based on the weekly question and the named owner, not on a feature checklist. Mentioned products are options to evaluate against your process — not endorsements that replace due diligence.</p>
{checklist([
    "Write the one commercial question you will answer each week.",
    "Name the owner who will ship a change from the tool’s output.",
    "Limit the first month to money pages and one topic cluster.",
    "Budget writing and technical fix time alongside the licence.",
    "Set a cancel date if no shipped change appears in four weeks.",
])}
{sources([
    ("Semrush", "https://www.semrush.com/"),
    ("Google Search Central documentation", "https://developers.google.com/search"),
])}
<p>Educational commentary only — not marketing, investment or legal advice. Verify current Semrush pricing and your analytics setup before committing.</p>
"""

BODIES["2026-09-22-notion-as-a-finance-control-layer-not-a-second-ledger"] = f"""
<p>Use Notion for ownership and evidence trails; keep the books in the books. Finance teams that try to turn a workspace into a second ledger usually end up with two incomplete truths and a painful close. The useful pattern is narrower: Notion as the control layer around the ledger — checklists, owners, evidence links, exception logs and operating reviews.</p>
<p>A control layer answers questions the general ledger is not designed to answer quickly. Who owns this reconciliation? Where is the evidence pack for last month’s revenue cut-off? Which AI or automation exceptions are still open? What is the status of the close calendar? Those are process truths. The ledger remains the system of record for balances and journals.</p>
<p>Write the workflow on one page first: input, decision, output, owner, definition of done. Then decide which of those steps belong in the ERP or accounting suite, which belong in bank and payroll feeds, and which belong in a lightweight workspace. If you cannot fill the five lines, you are not choosing software yet — you are guessing.</p>
<p>Practical Notion uses that hold up under audit scrutiny include: month-end and quarterly close checklists with assignees and due dates; a register of reconciliations with links to exported workpapers; an exception log for automation or AI-assisted matches; a decision log for policy judgements; and a simple RAID or issue list for systems projects. Templates help only when they mirror how your team already works. Fancy dashboards that nobody updates are decoration.</p>
{CALLOUT}
<p>What not to do is equally clear. Do not re-key trial balances into Notion tables and treat them as authoritative. Do not store unrestricted client or payroll files in a workspace without access review. Do not let “updated in Notion” replace posting and review in the accounting system. Confidentiality and retention policies still apply; classify data before you invite a wider team in.</p>
<p>Pair the workspace with the tools that actually move numbers — your accounting suite, bank feeds, and where relevant ecommerce or CRM connectors. Notion’s job is coordination and evidence, not transaction processing. Official Notion product pages describe databases, permissions and sharing; confirm your plan’s admin controls before rolling out to a finance team.</p>
<p>A thin release looks like this. Pick one close checklist for a single entity. Link each step to the real workpaper location. Run it for one month beside the old email chase. Measure whether aged open items and chase emails fell. If yes, extend to reconciliations and exception logs. If not, simplify the template before buying more Notion structure.</p>
<p>For CA firms serving clients, the same pattern applies internally: engagement checklists, review notes indexes, and knowledge pages for recurring procedures — with client files staying in the approved DMS. The brand of workspace matters less than the discipline of ownership and evidence.</p>
{checklist([
    "Keep the ledger as system of record; use Notion for process truths only.",
    "Build one close checklist with owners and evidence links.",
    "Add an exception log for automation or AI-assisted matches.",
    "Review workspace access and data classes before wider rollout.",
    "Measure aged open items after one month; simplify if nothing moved.",
])}
{sources([
    ("Notion product", "https://www.notion.so/product"),
    ("NIST AI Risk Management Framework", "https://www.nist.gov/itl/ai-risk-management-framework"),
])}
<p>Educational content; not accounting, tax or legal advice. Confirm security settings and retention rules with your firm before storing working papers in any workspace.</p>
"""

BODIES["2026-09-23-build-vs-buy-for-ai-what-i-ask-founders-before-they-sign"] = f"""
<p>Founders ask me “build or buy?” as if it is a branding choice. It is a capital and control choice. Buy undifferentiated plumbing; build only where your data or process is the product. Most mid-market teams over-build chat interfaces and under-invest in the workflow, data access and review gates that make any model useful.</p>
<p>Before anyone signs a statement of work or a multi-year platform deal, I ask a short set of questions. The answers usually make the decision obvious.</p>
<p><strong>Is this differentiating?</strong> If a competent competitor could buy the same capability next quarter, prefer buy or configure. If the advantage sits in your proprietary data, regulated process, or client-specific judgement, a thinner custom layer on top of bought components may be justified.</p>
<p><strong>What is the workflow map?</strong> Input, decision, output, owner, definition of good. If that page does not exist, you are not choosing architecture — you are shopping for demos. Map the human gate before you argue about models.</p>
<p><strong>Where does data live, and what may leave?</strong> Build-versus-buy collapses quickly when client or financial data cannot sit in a vendor’s multi-tenant environment. Sometimes the answer is buy a vendor with strong isolation; sometimes it is keep inference inside your cloud with strict logging. Public playbooks such as CISA’s AI cybersecurity collaboration materials are useful prompts for threat and access discussions — not a substitute for your own risk assessment.</p>
<p><strong>Time to a falsifiable release?</strong> A bought tool that can be in one team’s hands in weeks beats a twelve-month build that never ships. Conversely, a bought tool that cannot meet your control gates is not “fast” — it is a future incident. Define a thin release: one workflow, one metric, stop conditions.</p>
{CALLOUT}
<p><strong>Switching cost and evidence export.</strong> Ask how you leave. Can you export prompts, logs, embeddings and configurations? Will the vendor’s roadmap force a rewrite? Buy when lock-in is tolerable and documented; build when exit cost would threaten the business.</p>
<p><strong>Total cost, not licence cost.</strong> Discovery, integration, review time, exception handling and change control belong on the same sheet as software. An AI budget that only lists licences is incomplete. CRM and workspace products (for example HubSpot for pipeline truth, Notion for SOPs) often appear in the “buy plumbing” column — evaluate them as operating scaffolding, not as AI magic.</p>
<p>A practical default for finance and professional-services founders: buy document extraction, retrieval, ticketing and CRM; configure carefully; build only thin orchestration and domain rules you must own. Revisit the decision when volume, regulation or proprietary data quality changes the economics.</p>
<p>When a vendor pushes a platform story, keep the conversation on your metric and your gates. Peers’ case studies are useful questions, not transferable ROI. Your staffing mix and control environment are not theirs.</p>
{checklist([
    "Write the five-line workflow map before any build-vs-buy debate.",
    "Classify data and decide what may leave company systems.",
    "Prefer buy for undifferentiated plumbing; build only for true differentiation.",
    "Demand export paths and a thin falsifiable first release.",
    "Put review time and exception handling on the same cost sheet as licences.",
])}
{sources([
    ("CISA AI Cybersecurity Collaboration Playbook", "https://www.cisa.gov/resources-tools/resources/ai-cybersecurity-collaboration-playbook"),
    ("NIST AI Risk Management Framework", "https://www.nist.gov/itl/ai-risk-management-framework"),
])}
<p>Educational commentary from implementation work — not investment, legal or procurement advice. Verify contracts, security schedules and pricing yourself.</p>
"""

BODIES["2026-09-24-when-a-finance-team-should-say-no-to-an-ai-pilot"] = f"""
<p>A polite no beats a six-month pilot with no owner and no metric. Finance teams are under pressure to “do something with AI”. That pressure produces pilots that look busy and never reach the month-end pack. Saying no is not anti-innovation. It is capital discipline.</p>
<p>I still see finance leaders approve AI pilots the way they used to approve innovation labs: interesting demo, unclear owner, no metric that shows up in reporting. The model works in a sandbox; the Monday morning handoff does not. When that happens, the honest move is to decline or redesign — not to extend the pilot because sunk cost feels awkward.</p>
<p>Say no when any of these are true.</p>
<p><strong>No named constraint.</strong> If the pitch cannot name whether you are trying to cut close days, aged reconciliations, review hours, cash visibility lag or exception backlog, you are shopping for capability. Capability rarely survives a board review.</p>
<p><strong>No baseline.</strong> Without a rough sketch of volume, hours by role and error patterns, you cannot know whether the pilot moved anything. You do not need a perfect activity-based cost model. You do need an honest yardstick.</p>
<p><strong>No owner.</strong> Dual ownership (business + technical) or it does not start. A pilot owned only by a vendor success manager is a subscription in waiting.</p>
<p><strong>No human gate.</strong> Finance-adjacent work is YMYL territory. If nobody has decided which outputs require approval, which data classes are in scope, and what gets logged, the pilot is unsafe to call “in production” even if the demo impresses.</p>
<p><strong>No stop conditions.</strong> Write in advance what would cause a pause or cancel. Endless extensions are how zombie tools enter the budget.</p>
{CALLOUT}
<p>When you do say yes, keep the release thin. One workflow, one team, one metric, two to four weeks beside the old process if risk is material. Review weekly. Capture exceptions in a shared log. If the metric moves and controls hold, document the pattern. If not, stop and explain. A failed pilot you can explain is cheaper than a year of unfocused tooling.</p>
<p>Use a free readiness scorecard or a scoped opportunity audit when the shortlist is real but the organisation is still arguing from anecdotes. The goal is not to delay forever. The goal is to fund only what you can defend in finance language the board already uses.</p>
<p>Public frameworks such as NIST’s AI RMF are useful for structuring risk conversation. They do not replace your chart of accounts, your staffing reality or your auditor’s expectations. Translate them into four one-page rules: ownership, data classes, human gates, logging.</p>
<p>Saying no also protects credibility for the next request. Teams that rubber-stamp every demo find that later, better proposals get the same sceptical shrug. Teams that decline weakly designed pilots earn the right to fund a narrow release that actually lands.</p>
{checklist([
    "Refuse pilots that cannot name the constraint and the metric.",
    "Require a baseline sketch and dual ownership before kickoff.",
    "Design the human gate and data classes before any go-live date.",
    "Write stop conditions into the pilot charter.",
    "Prefer a thin release with weekly review over a six-month theatre project.",
])}
{sources([
    ("NIST AI Risk Management Framework", "https://www.nist.gov/itl/ai-risk-management-framework"),
])}
<p>Educational content; not financial, investment or legal advice. Confirm vendor terms and internal policies before approving spend.</p>
"""


def update_json_content(posts: list, slug: str, plain: str, read: int):
    for p in posts:
        if p.get("slug") == slug:
            p["content"] = plain
            p["readTime"] = read
            p["generatedBy"] = "editorial-ssr-materialise"
            return


def upsert_sitemap(urls: list[tuple[str, str, str]]):
    """urls: (loc, lastmod, priority)"""
    text = SITEMAP.read_text()
    for loc, lastmod, pri in urls:
        entry = f'  <url><loc>{loc}</loc><lastmod>{lastmod}</lastmod><changefreq>monthly</changefreq><priority>{pri}</priority></url>\n'
        # replace existing or insert before </urlset>
        pat = re.compile(r"  <url><loc>" + re.escape(loc) + r"</loc>.*?</url>\n", re.S)
        if pat.search(text):
            text = pat.sub(entry, text)
        else:
            text = text.replace("</urlset>", entry + "</urlset>")
    # bump blog index lastmod
    text = re.sub(
        r'(<url><loc>https://pratikbajoria\.com/blog</loc><lastmod>)[^<]+',
        r'\g<1>' + TODAY,
        text,
        count=1,
    )
    text = re.sub(
        r'(<url><loc>https://pratikbajoria\.com/</loc><lastmod>)[^<]+',
        r'\g<1>' + TODAY,
        text,
        count=1,
    )
    SITEMAP.write_text(text)


def make_hub_rubric_png(path: Path):
    from PIL import Image, ImageDraw, ImageFont
    W, Hgt = 900, 520
    img = Image.new("RGB", (W, Hgt), "#faf7f1")
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 18)
        font_b = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 22)
        font_s = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 14)
    except Exception:
        font = font_b = font_s = ImageFont.load_default()
    draw.rectangle([0, 0, W, 56], fill="#ebe6dc")
    draw.text((24, 16), "CA AI implementation readiness (illustrative rubric)", fill="#1c1c1a", font=font_b)
    axes = [
        ("Workflow map clarity", 4),
        ("Data classification", 3),
        ("Human approval gates", 4),
        ("Evidence / logging", 3),
        ("Named owner + metric", 5),
        ("Thin-release discipline", 4),
    ]
    left, top, bar_max, row_h = 24, 80, 520, 60
    for i, (label, score) in enumerate(axes):
        y = top + i * row_h
        draw.text((left, y), label, fill="#1c1c1a", font=font)
        # track
        draw.rectangle([left + 280, y + 4, left + 280 + bar_max, y + 28], outline="#cfc9bc", fill="#fff")
        fill_w = int(bar_max * (score / 5))
        draw.rectangle([left + 280, y + 4, left + 280 + fill_w, y + 28], fill="#2f4f3e")
        draw.text((left + 280 + bar_max + 12, y + 4), f"{score}/5", fill="#1c1c1a", font=font_s)
    draw.text((24, Hgt - 36), "Illustrative example scores for a strong-fit profile — not market data. Score your firm 1–5.", fill="#6f746d", font=font_s)
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "PNG")


def hub_body() -> str:
    img = "/images/blog/ai-for-ca-india-readiness-rubric.png"
    table = rubric_table([
        ("Workflow clarity", "Tribal knowledge only", "Five-line map exists for priority jobs"),
        ("Controls", "Outputs go straight to clients/books", "Human gate + logging defined"),
        ("Data", "Anything pasted into consumer tools", "Classes + approved environments"),
        ("Metrics", "No baseline", "Named metric reviewed weekly"),
        ("Scope", "Transformation programme", "One thin release funded"),
    ])
    return f"""
<p>AI for chartered accountants in India is not a race to install the largest model. It is a controlled change to how CA firms and finance teams research, extract, reconcile, report and communicate — without weakening evidence, confidentiality or professional judgement. This hub is written for partners, CFOs and practice leaders who want CA AI implementation in India to show up in the week’s work, not only in a strategy slide.</p>
<p>I write as Pratik Bajoria, Chartered Accountant, ex-Big 4, and founder of Findost. The lens is practical: structured workflows, measurable controls, and YMYL caution. Nothing here invents client metrics or promises regulatory outcomes. Use it as an implementation map, then verify tools and policies against your own practice.</p>
<h2>What “AI for CA firms India” should mean in 2026</h2>
<p>Three jobs dominate early value: faster first drafts of analysis and memos under review; document extraction into structured working papers; and exception-led reconciliation or compliance checklists. Prediction theatre and unsupervised client advice are late-stage ideas — if they belong at all. The firms that climb search and win trust will publish and operate with that sequencing, not with hype.</p>
<p>Target entities for this page — AI for chartered accountants India, CA AI implementation India, AI for CA firms India — only matter if the content behind them is cite-worthy: clear definitions, a rubric others can reuse, and links to deeper playbooks on tooling, pilots and build-versus-buy.</p>
{figure(img, "Illustrative CA AI implementation readiness rubric for Indian firms")}
{table}
<h2>A CA-led implementation sequence</h2>
<p><strong>1. Map five recurring jobs.</strong> Research and first-draft analysis, document extraction, reconciliation and exceptions, management or client reporting, and routine communication. For each, write input, decision, output, owner and definition of good. Blank lines mean you are not ready to buy.</p>
<p><strong>2. Classify data.</strong> Client identity, unpublished financials, and advice drafts are restricted by default. Consumer chatbots are not an approved environment for restricted classes. Approved tools need access control, retention clarity and exportable logs.</p>
<p><strong>3. Design human gates before automation.</strong> Decide what a person must approve before something becomes a deliverable, a filing support pack or a ledger-adjacent entry. An unauditable answer is not a professional deliverable.</p>
<p><strong>4. Fund one thin release.</strong> One workflow, one team, one metric, two to four weeks, stop conditions in writing. Review weekly. Document the pattern if it works; stop if it does not.</p>
<p><strong>5. Only then expand tooling.</strong> Read the deeper guides on <a href="/blog/best-ai-tools-chartered-accountants-finance-professionals">best AI tools for chartered accountants and finance professionals</a>, <a href="/blog/corporate-ai-pilots">why corporate AI pilots stall</a>, and <a href="/blog/build-vs-buy-ai-tooling">build vs buy for AI tooling</a>. Tool lists without gates are shopping lists.</p>
{CALLOUT}
<h2>Where Indian CA practices should be careful</h2>
<p>Professional work sits in YMYL territory. Do not let keyword pressure push unverifiable claims onto your site or into client memos. Keep ICAI and firm quality standards in view; AI does not replace the signing professional. For securities-market adjacent work, treat SEBI’s public materials as part of your compliance reading list — not as a substitute for counsel. Prefer primary sources when you cite regulation.</p>
<p>Internal links worth keeping open while you plan: the free <a href="/scorecard">AI Opportunity Scorecard</a>, the scoped <a href="/audit">AI Opportunity Audit</a>, and discovery via <a href="/#contact">a conversation on measurable P&amp;L use cases</a>.</p>
<h2>Operating cadence that survives busy season</h2>
<p>AI that only works in a quiet week will die in filings season. Bake the thin release into the Monday checklist: owner, metric, exception path, data the tool may see, weekly review. Use a workspace for the register and evidence links; keep the books in the books. If a pilot cannot explain itself in five minutes on Monday, it is not ready.</p>
{checklist([
    "Pick one job from the five-job map and write the five-line workflow.",
    "Classify data and block restricted classes from consumer tools.",
    "Name dual owners and the weekly metric before buying licences.",
    "Ship a thin release with stop conditions; review weekly.",
    "Read tooling, pilots and build-vs-buy guides before expanding scope.",
])}
{sources([
    ("NIST AI Risk Management Framework", "https://www.nist.gov/itl/ai-risk-management-framework"),
    ("SEBI — investor / regulatory portal", "https://www.sebi.gov.in/"),
    ("ICAI — Institute of Chartered Accountants of India", "https://www.icai.org/"),
])}
<p>Educational commentary for CA and finance leaders in India — not personalised professional, tax, legal or investment advice. Confirm tools, privacy terms and firm policies before deployment.</p>
"""


def main():
    posts = json.loads(POSTS_PATH.read_text())
    created = []

    meta_by_slug = {p["slug"]: p for p in posts}

    for slug, body in BODIES.items():
        p = meta_by_slug[slug]
        tools = tools_html(p.get("affiliateTools") or [])
        meta = {
            "title": p["title"],
            "description": p["excerpt"],
            "published": p["date"],
            "slug": slug,
            "image": p.get("image") or "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85",
            "keywords": p.get("keywords") or [],
            "category": p.get("category") or "Insights",
            "read": max(6, round(wcount(body) / 140)),
        }
        html = render(meta, body, tools if tools else None)
        out = BLOG / f"{slug}.html"
        out.write_text(html)
        plain = plain_text(body)
        update_json_content(posts, slug, plain, meta["read"])
        created.append((slug, wcount(html)))
        print(f"Wrote {slug} ({created[-1][1]} words)")

    # Hub
    make_hub_rubric_png(ROOT / "public" / "images" / "blog" / "ai-for-ca-india-readiness-rubric.png")
    hub_slug = "ai-for-chartered-accountants-in-india"
    hub_title = "AI for Chartered Accountants in India: A Practical Implementation Hub"
    hub_desc = "CA AI implementation in India without the theatre: five-job map, control rubric, thin releases, and links to tooling, pilots and build-vs-buy guides."
    hub_body_html = hub_body()
    hub_meta = {
        "title": hub_title,
        "description": hub_desc,
        "published": TODAY,
        "slug": hub_slug,
        "image": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=85",
        "keywords": [
            "AI for chartered accountants India",
            "CA AI implementation India",
            "AI for CA firms India",
            "chartered accountant AI",
        ],
        "category": "CA insights",
        "read": max(8, round(wcount(hub_body_html) / 140)),
    }
    hub_html = render(hub_meta, hub_body_html, None)
    (BLOG / f"{hub_slug}.html").write_text(hub_html)
    created.append((hub_slug, wcount(hub_html)))
    print(f"Wrote hub {hub_slug} ({created[-1][1]} words)")

    # Add hub to blog-posts.json if missing
    if not any(p.get("slug") == hub_slug for p in posts):
        posts.insert(0, {
            "id": hub_slug,
            "title": hub_title,
            "slug": hub_slug,
            "url": f"/blog/{hub_slug}",
            "date": TODAY,
            "author": "Pratik Bajoria",
            "category": "CA insights",
            "readTime": hub_meta["read"],
            "image": hub_meta["image"],
            "excerpt": hub_desc,
            "content": plain_text(hub_body_html),
            "keywords": hub_meta["keywords"],
            "sources": [
                {"title": "NIST AI Risk Management Framework", "url": "https://www.nist.gov/itl/ai-risk-management-framework"},
                {"title": "SEBI", "url": "https://www.sebi.gov.in/"},
                {"title": "ICAI", "url": "https://www.icai.org/"},
            ],
            "generatedBy": "editorial-hub",
            "affiliate": {
                "disclosure": "Tool links go to the vendor’s official site unless an affiliate URL is configured. Recommendations are based on fit for finance, ops and AI implementation — not on commission."
            },
        })

    POSTS_PATH.write_text(json.dumps(posts, indent=2, ensure_ascii=False) + "\n")

    # finance-highest-roi → 301 to dated evergreen canonical
    canonical_finance = "/blog/2026-09-17-the-finance-function-is-ai-s-highest-roi-starting-point"
    redirects = ROOT / "public" / "_redirects"
    rtxt = redirects.read_text()
    line = f"/blog/finance-highest-roi https://pratikbajoria.com{canonical_finance} 301\n"
    if "finance-highest-roi" not in rtxt:
        redirects.write_text(rtxt.rstrip() + "\n" + line)
        print("Added _redirects for finance-highest-roi")

    worker = ROOT / "public" / "_worker.js"
    w = worker.read_text()
    needle = "'/blog/2026-09-10-the-finance-function-is-ai-s-highest-roi-starting-point': '/blog/2026-09-17-the-finance-function-is-ai-s-highest-roi-starting-point',"
    alias = "      '/blog/finance-highest-roi': '/blog/2026-09-17-the-finance-function-is-ai-s-highest-roi-starting-point',"
    if "'/blog/finance-highest-roi'" not in w:
        w = w.replace(needle, needle + "\n" + alias)
        worker.write_text(w)
        print("Added worker alias for finance-highest-roi")

    # Sitemap entries
    locs = []
    for slug, _ in created:
        locs.append((f"https://pratikbajoria.com/blog/{slug}", TODAY, "0.85" if "ai-for-chartered" in slug else "0.75"))
    locs.append((f"https://pratikbajoria.com{canonical_finance}", TODAY, "0.75"))
    upsert_sitemap(locs)
    print("Sitemap updated")

    # topics.html — point primary CA topic to new hub + add visible link
    topics = ROOT / "public" / "topics.html"
    t = topics.read_text()
    hub_url = f"https://pratikbajoria.com/blog/{hub_slug}"
    # Update first ItemList entry for AI for Chartered Accountants
    t2 = t.replace(
        '{"@type":"ListItem","position":1,"name":"AI for Chartered Accountants","url":"https://pratikbajoria.com/blog/best-ai-tools-chartered-accountants-finance-professionals"}',
        f'{{"@type":"ListItem","position":1,"name":"AI for Chartered Accountants","url":"{hub_url}"}}',
        1,
    )
    # Visible chip link at top of CA cluster
    old_chip = '<a href="/blog/best-ai-tools-chartered-accountants-finance-professionals">AI for Chartered Accountants</a>'
    new_chip = f'<a href="/blog/{hub_slug}">AI for Chartered Accountants</a><a href="/blog/{hub_slug}">CA AI implementation India</a>'
    if old_chip in t2:
        t2 = t2.replace(old_chip, new_chip, 1)
    topics.write_text(t2)
    print("topics.html internal links updated")

    # Light homepage featured card swap — only if an obvious CA card slot; add near insights if pattern exists
    index = ROOT / "public" / "index.html"
    idx = index.read_text()
    card = (
        f'<a class="featured-card" href="/blog/{hub_slug}">'
        f'<span class="eyebrow">CA insights · {TODAY}</span>'
        f'<strong>AI for Chartered Accountants in India</strong>'
        f'<span>A practical hub for CA AI implementation in India: control rubric, thin releases, and links to tooling and pilots.</span></a>'
    )
    # Insert as first featured-card if section exists
    if f'href="/blog/{hub_slug}"' not in idx:
        m = re.search(r'(<div class="featured-grid">\s*)', idx)
        if m:
            idx = idx[: m.end()] + "\n          " + card + idx[m.end() :]
            index.write_text(idx)
            print("Homepage featured card added")
        else:
            print("Homepage featured-grid not found; topics link only")

    print("DONE", created)


if __name__ == "__main__":
    main()
