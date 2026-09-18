#!/usr/bin/env node
/* Daily editorial publisher. Prefer OpenAI when OPENAI_API_KEY is set; otherwise a human-voice local draft.
   Never invent client metrics, awards, or affiliate tracking URLs. */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const postsPath = path.join(root, 'public', 'blog-posts.json');
const catalogPath = path.join(root, 'public', 'affiliate-links.json');
const today = new Date().toISOString().slice(0, 10);

/** Expandable topic bank — each entry used at most once until the bank cycles; avoids same-7 daily clones. */
const topics = [
  {
    title: 'When a Finance Team Should Say No to an AI Pilot',
    category: 'Finance & compliance',
    keywords: ['AI pilot', 'finance AI', 'AI governance'],
    thesis: 'A polite no beats a six-month pilot with no owner and no metric.',
    affiliateTools: ['notion'],
    angle: 'ca-controls',
    sourceLinks: [{ title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }]
  },
  {
    title: 'The Monday Morning Test for Any AI Workflow',
    category: 'AI implementation',
    keywords: ['AI workflow', 'AI implementation', 'operating cadence'],
    thesis: 'If the team cannot explain the workflow in five minutes on Monday, it is not ready for a model.',
    affiliateTools: ['notion'],
    angle: 'ops',
    sourceLinks: [{ title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }]
  },
  {
    title: 'Build vs Buy for AI: What I Ask Founders Before They Sign',
    category: 'AI strategy',
    keywords: ['build vs buy', 'AI tooling', 'vendor selection'],
    thesis: 'Buy undifferentiated plumbing; build only where your data or process is the product.',
    affiliateTools: ['hubspot', 'notion'],
    angle: 'vendor',
    sourceLinks: [{ title: 'CISA AI Cybersecurity Collaboration Playbook', url: 'https://www.cisa.gov/resources-tools/resources/ai-cybersecurity-collaboration-playbook' }]
  },
  {
    title: 'WhatsApp Automation That Still Feels Like Customer Care',
    category: 'Workflow automation',
    keywords: ['WhatsApp automation', 'workflow automation', 'customer ops'],
    thesis: 'Automate intake and logging first; keep judgement and exceptions with a named human.',
    affiliateTools: ['getresponse', 'hubspot'],
    angle: 'ops',
    sourceLinks: [{ title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }]
  },
  {
    title: 'A 90-Day AI Opportunity Audit Without the Theatre',
    category: 'AI implementation',
    keywords: ['AI audit', '90-day roadmap', 'AI opportunity'],
    thesis: 'Rank use cases by P&L and control risk, then fund one narrow release — not a catalogue of ideas.',
    affiliateTools: ['notion', 'upmetrics'],
    angle: 'audit',
    sourceLinks: [{ title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }]
  },
  {
    title: 'Real Estate AI: Start With Leads and Documents, Not Prediction',
    category: 'Real estate & infrastructure',
    keywords: ['real estate AI', 'lead qualification', 'document automation'],
    thesis: 'Structure the mess before you ask a model to forecast anything.',
    affiliateTools: ['hubspot', 'notion'],
    angle: 'sector',
    sourceLinks: [{ title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }]
  },
  {
    title: 'AI Governance for Mid-Market Teams Who Do Not Have a Chief AI Officer',
    category: 'AI governance',
    keywords: ['AI governance', 'AI policy', 'mid-market AI'],
    thesis: 'Four one-page rules beat a 40-page policy nobody reads.',
    affiliateTools: ['notion'],
    angle: 'governance',
    sourceLinks: [{ title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }]
  },
  {
    title: 'How Much Should a Mid-Market Finance Team Budget for AI?',
    category: 'Finance & compliance',
    keywords: ['AI budget', 'finance AI', 'AI ROI'],
    thesis: 'Budget for people, process and review time — not just licences.',
    affiliateTools: ['upmetrics', 'notion'],
    angle: 'budget',
    sourceLinks: [{ title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }]
  },
  {
    title: 'Semrush for Owners: When Search Spend Is Actually Rational',
    category: 'Tool review',
    keywords: ['Semrush review', 'SEO tool', 'search visibility'],
    thesis: 'Pay for Semrush when you will act on one commercial question a week — not when you want prettier reports.',
    affiliateTools: ['semrush'],
    angle: 'tools',
    sourceLinks: [{ title: 'Semrush', url: 'https://www.semrush.com/' }]
  },
  {
    title: 'Notion as a Finance Control Layer — Not a Second Ledger',
    category: 'CA insights',
    keywords: ['Notion for finance', 'close checklist', 'CA workflow'],
    thesis: 'Use Notion for ownership and evidence trails; keep the books in the books.',
    affiliateTools: ['notion'],
    angle: 'tools',
    sourceLinks: [{ title: 'Notion', url: 'https://www.notion.so/product' }]
  },
  {
    title: 'Ecommerce Reconciliation: Where Automation Helps and Where It Lies',
    category: 'Business systems',
    keywords: ['ecommerce accounting', 'reconciliation', 'Synder'],
    thesis: 'Automate mapping and matching; never automate away the settlement exception review.',
    affiliateTools: ['synder', 'notion'],
    angle: 'tools',
    sourceLinks: [{ title: 'Synder', url: 'https://synder.com/' }]
  },
  {
    title: 'HubSpot vs Spreadsheet CRM: The Real Switching Cost',
    category: 'Tool comparison',
    keywords: ['HubSpot CRM', 'CRM adoption', 'sales process'],
    thesis: 'The cost is not the licence — it is defining stages your team will actually use.',
    affiliateTools: ['hubspot'],
    angle: 'tools',
    sourceLinks: [{ title: 'HubSpot CRM', url: 'https://www.hubspot.com/products/crm' }]
  }
];

function words(value) {
  return String(value || '').trim().split(/\s+/).filter(Boolean).length;
}
function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}
function slugify(title) {
  return String(title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function loadCatalog() {
  if (!fs.existsSync(catalogPath)) return {};
  return JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
}

function pickTopic(existing) {
  const usedTitles = new Set(existing.slice(0, 40).map((p) => (p.title || '').toLowerCase()));
  const unused = topics.filter((t) => !usedTitles.has(t.title.toLowerCase()));
  const pool = unused.length ? unused : topics;
  // Stable-ish daily pick without repeating the same index forever
  const idx = Math.floor(Date.parse(`${today}T00:00:00Z`) / 86400000) % pool.length;
  return pool[idx];
}

function humanFallback(topic) {
  const openers = {
    'ca-controls': `I still see finance teams approve AI pilots the way they used to approve "innovation labs": interesting demo, unclear owner, no metric that shows up in the month-end pack.`,
    ops: `Most AI workflows fail quietly. The model works in a sandbox; the Monday morning handoff does not.`,
    vendor: `Founders ask me "build or buy?" as if it is a branding choice. It is a capital and control choice.`,
    audit: `A useful AI audit is boring on purpose. It ranks work, names owners, and ends with one funded release — not a slide of fifty ideas.`,
    sector: `In real estate, the data is rarely clean enough for clever prediction. Lead hygiene and document chaos come first.`,
    governance: `Mid-market teams do not need a Chief AI Officer to govern AI. They need four rules people can recite.`,
    budget: `An AI budget that only lists software is incomplete. Review time and exception handling are part of the cost.`,
    tools: `Tool reviews are only useful when they help you decide what to try next week — not when they read like a feature brochure.`
  };
  const opener = openers[topic.angle] || openers.ops;
  const body = [
    opener,
    topic.thesis,
    `Here is the practical cut. Write the current workflow on one page: input, decision, output, owner, and what "good" looks like today. If you cannot fill those five lines, you are not choosing a model yet — you are guessing.`,
    `Pick one bottleneck with volume and a measurable cost: cycle time, error rate, review hours, or cash delay. Ignore the impressive adjacent idea. Narrow beats clever. The teams that win treat AI like any other operating change: small scope, named owner, visible metric.`,
    `Design the human gate before the automation. Who approves? What evidence must remain? What must never leave the company systems? In finance and client work, an unauditable answer is not a deliverable. If a tool cannot show you how it reached a result, keep it in draft mode.`,
    `Ship a thin release to one team for two to four weeks. Run it beside the old process if the risk is material. Review the metric every week — not in a steering committee three months later. Capture exceptions in a shared log so patterns become obvious.`,
    `If the metric moves and controls hold, document the pattern so the next team does not start from folklore. If it does not move, stop. A failed pilot that you can explain is cheaper than a zombie subscription. I would rather a team keep a simple shared checklist and one honest metric than buy three tools and lose the plot.`,
    `Where software helps, use it as scaffolding — a CRM for pipeline truth, a workspace for SOPs, a planning tool for assumptions — not as a substitute for judgement. Mentioned products are options to evaluate against your process, not endorsements that replace due diligence.`,
    `Monday-morning checklist: (1) name the owner, (2) name the metric, (3) name the exception path, (4) name the data the tool may see, (5) book the weekly review. If any line is blank, pause the rollout.`,
    `This is educational commentary from implementation work — not personalised financial, tax, legal or investment advice. Verify vendor pricing, privacy terms and any partner arrangements before you buy.`
  ];
  return body.join('\n\n');
}

async function aiArticle(topic) {
  if (!process.env.OPENAI_API_KEY) return null;
  const response = await fetch(process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.55,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You write as Pratik Bajoria: Chartered Accountant, ex-Big 4, AI implementation consultant and Findost founder. Voice: clear, specific, slightly conversational, British spelling. Short paragraphs. No hype. Never invent statistics, client names, revenue, case-study metrics, awards or quotes. Prefer concrete operating advice over abstract AI talk. Return only valid JSON.'
        },
        {
          role: 'user',
          content: JSON.stringify({
            task: 'Write one original blog article for pratikbajoria.com',
            date: today,
            topic: topic.title,
            category: topic.category,
            thesis: topic.thesis,
            angle: topic.angle,
            keywords: topic.keywords,
            toolsToMentionNaturally: topic.affiliateTools || [],
            requirements: {
              title: 'Use the supplied title or a close human refinement (max 90 chars).',
              excerpt: '140-190 characters, sounds like a person wrote it.',
              content:
                '850-1200 words. Plain text with blank lines between paragraphs. Open with a concrete situation. Include a short Monday-morning checklist near the end. Mention listed tools only where they genuinely fit; do not force product pitches. No fabricated numbers.',
              keywords: 'Return 4-6 search phrases.',
              sources: 'Use only the supplied sources unless you add a primary public URL you are sure is correct.'
            },
            sourceLinks: topic.sourceLinks
          })
        }
      ]
    })
  });
  if (!response.ok) throw new Error(`AI provider returned ${response.status}`);
  const payload = await response.json();
  const raw = payload.choices?.[0]?.message?.content;
  if (!raw) throw new Error('AI provider returned no content');
  return JSON.parse(raw.replace(/^```json\s*|\s*```$/g, ''));
}

function qualityCheck(post) {
  const validSources =
    Array.isArray(post.sources) &&
    post.sources.length &&
    post.sources.every((source) => source && /^https:\/\//.test(source.url));
  const minimumWords = post.generatedBy === 'openai' ? 650 : 350;
  return Boolean(
    post.title &&
      post.excerpt &&
      words(post.content) >= minimumWords &&
      Array.isArray(post.keywords) &&
      post.keywords.length >= 3 &&
      validSources &&
      post.affiliate?.disclosure
  );
}

function writeSsrHtml(post, catalog) {
  const esc = (s) =>
    String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  const paras = String(post.content || '')
    .split(/\n\s*\n/)
    .filter(Boolean)
    .map((p) => `<p>${esc(p).replace(/\n/g, '<br />')}</p>`)
    .join('\n');
  const tools = (post.affiliateTools || []).map((k) => catalog[k]).filter(Boolean);
  let toolsHtml = '';
  if (tools.length) {
    const cards = tools
      .map((tool) => {
        const isAff = Boolean(tool.affiliateUrl);
        const href = isAff ? tool.affiliateUrl : tool.productUrl;
        const label = isAff ? `Explore ${tool.name}` : `Visit ${tool.name} official site`;
        const rel = isAff ? 'nofollow sponsored noopener noreferrer' : 'noopener noreferrer';
        return `<a href="${esc(href)}" target="_blank" rel="${rel}"><strong>${esc(tool.name)}</strong><span>${esc(tool.category)}</span><small>${esc(label)} ↗</small></a>`;
      })
      .join('');
    toolsHtml = `<aside class="article-tools" aria-label="Tools mentioned in this article"><p class="eyebrow">Tools worth evaluating</p><div class="article-tool-grid">${cards}</div><p class="article-tool-note">${esc(post.affiliate.disclosure)}</p></aside>`;
  }
  const canonical = `https://pratikbajoria.com/blog/${post.slug}`;
  const html = `<!doctype html>
<html lang="en-IN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />
    <meta name="author" content="Pratik Bajoria" />
    <title>${esc(post.title)} — Pratik Bajoria</title>
    <meta name="description" content="${esc(post.excerpt)}" />
    <link rel="canonical" href="${esc(canonical)}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${esc(post.title)}" />
    <meta property="og:description" content="${esc(post.excerpt)}" />
    <meta property="og:url" content="${esc(canonical)}" />
    <meta property="og:image" content="${esc(post.image)}" />
    <link rel="stylesheet" href="/styles.css" />
    <link rel="stylesheet" href="/styles-overrides.css?v=20260910" />
  </head>
  <body data-static-article="1" data-slug="${esc(post.slug)}">
    <main class="shell article-page">
      <header class="article-header">
        <a class="wordmark" href="/" aria-label="Pratik Bajoria home"><span>PB</span></a>
        <div class="article-header-links">
          <a class="text-link" href="/topics">50 topic guide ↗</a>
          <a class="text-link" href="/blog">All insights ↗</a>
        </div>
      </header>
      <article id="article">
        <p class="eyebrow">${esc(post.category)} · ${esc(post.date)} · ${esc(post.readTime)} min read</p>
        <h1>${esc(post.title)}</h1>
        <p class="article-dek">${esc(post.excerpt)}</p>
        <div class="article-body">
${paras}
        </div>
        ${toolsHtml}
        <p class="ymyl-note" style="margin-top:28px;font-size:0.92rem;color:#6f746d"><em>Educational content; not financial, investment, or legal advice.</em></p>
        <div class="article-cta" style="margin-top:40px;padding:24px;border:1px solid rgba(28,28,26,0.12);border-radius:12px">
          <p class="eyebrow">Next step</p>
          <h2 style="font-size:1.4rem;margin:8px 0 12px">Turn this insight into action</h2>
          <p>Discuss where AI creates measurable P&amp;L impact — or start free with the scorecard.</p>
          <p class="article-cta-actions" style="margin-top:16px;display:flex;flex-wrap:wrap;gap:12px">
            <a class="button button-dark" href="/#contact">Book a discovery call <span>↗</span></a>
            <a class="button button-cream" href="/scorecard">Get the free AI Opportunity Scorecard <span>↗</span></a>
          </p>
        </div>
      </article>
    </main>
    <script src="/blog.js" defer></script>
  </body>
</html>
`;
  const out = path.join(root, 'public', 'blog', `${post.slug}.html`);
  fs.writeFileSync(out, html);
}

async function main() {
  const existing = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
  const catalog = loadCatalog();
  const topic = pickTopic(existing);
  let draft = null;
  let generatedBy = 'editorial-fallback';
  try {
    const candidate = await aiArticle(topic);
    const candidateSources =
      Array.isArray(candidate?.sources) && candidate.sources.length ? candidate.sources : topic.sourceLinks;
    const candidateIsUsable =
      candidate &&
      words(candidate.content) >= 650 &&
      Array.isArray(candidate.keywords) &&
      candidate.keywords.length >= 3 &&
      candidateSources.every((source) => source && /^https:\/\//.test(source.url));
    if (candidateIsUsable) {
      draft = candidate;
      generatedBy = 'openai';
    } else {
      console.warn('AI draft did not meet the editorial quality gate; using human-voice fallback.');
    }
  } catch (error) {
    console.warn(`AI draft unavailable (${error.message}); using human-voice fallback.`);
  }

  const baseSlug = slugify(draft?.title || topic.title);
  const slug = `${today}-${baseSlug}`;
  const sources = Array.isArray(draft?.sources) && draft.sources.length ? draft.sources : topic.sourceLinks;
  const post = {
    id: slug,
    title: clean(draft?.title || topic.title, 180),
    slug,
    url: `/blog/${slug}`,
    date: today,
    author: 'Pratik Bajoria',
    category: topic.category,
    readTime: draft?.readTime || Math.max(6, Math.round(words(draft?.content || humanFallback(topic)) / 140)),
    image: draft?.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85',
    excerpt: clean(draft?.excerpt || topic.thesis, 220),
    content: clean(draft?.content || humanFallback(topic), 18000),
    keywords: Array.isArray(draft?.keywords) ? draft.keywords.slice(0, 6) : topic.keywords,
    sources,
    generatedBy,
    affiliateTools: topic.affiliateTools || [],
    affiliate: {
      disclosure:
        'This article may contain affiliate links. Recommendations remain editorially independent; commissions do not change the assessment.'
    }
  };

  if (!qualityCheck(post)) throw new Error('Quality gate failed.');

  const posts = [post, ...existing.filter((item) => item.id !== post.id && item.slug !== post.slug)].slice(0, 30);
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2) + '\n');
  writeSsrHtml(post, catalog);
  console.log(`Published ${generatedBy} article: ${post.title} (${words(post.content)} words) tools=${(post.affiliateTools || []).join(',') || 'none'}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
