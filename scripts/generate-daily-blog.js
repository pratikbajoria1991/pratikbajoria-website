#!/usr/bin/env node
/* Daily editorial publisher. OPENAI_API_KEY enables model-assisted drafts; the local fallback is deterministic and quality-checked. */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const postsPath = path.join(root, 'public', 'blog-posts.json');
const linksPath = path.join(__dirname, 'affiliate-links.json');
const today = new Date().toISOString().slice(0, 10);

const topics = [
  { title: 'The Finance Function Is AI’s Highest-ROI Starting Point', category: 'Finance & compliance', keywords: ['finance AI', 'reconciliation automation', 'AI implementation'], thesis: 'Finance is a defensible first deployment because its work is structured, repetitive and measurable.', sourceLinks: [{ title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }] },
  { title: 'Why Most Corporate AI Pilots Never Reach Production', category: 'AI adoption', keywords: ['AI adoption', 'AI pilots', 'change management'], thesis: 'The common failure is not model quality; it is a missing owner, an undefined metric or an unowned change process.', sourceLinks: [{ title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }] },
  { title: 'Build vs Buy: A Practical Framework for AI Tooling', category: 'AI strategy', keywords: ['AI tooling', 'build vs buy', 'vendor selection'], thesis: 'The decision should follow differentiation, data sensitivity, time to value and switching cost—not fashion or vendor pressure.', sourceLinks: [{ title: 'CISA AI Cybersecurity Collaboration Playbook', url: 'https://www.cisa.gov/resources-tools/resources/ai-cybersecurity-collaboration-playbook' }] },
  { title: 'How to Automate a WhatsApp Workflow Without Losing Control', category: 'Workflow automation', keywords: ['WhatsApp automation', 'workflow automation', 'controls'], thesis: 'Messaging automation creates leverage only when intake, decisioning, logging and human escalation are designed together.', sourceLinks: [{ title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }] },
  { title: 'The AI Opportunity Audit: A 90-Day Roadmap for Leaders', category: 'AI implementation', keywords: ['AI audit', '90-day roadmap', 'business strategy'], thesis: 'A useful audit produces ranked decisions tied to business metrics, not an unprioritised catalogue of experiments.', sourceLinks: [{ title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }] },
  { title: 'AI in Real Estate: Start With Lead Qualification and Documents', category: 'Real estate & infrastructure', keywords: ['real estate AI', 'lead qualification', 'document automation'], thesis: 'Real-estate teams can create early value by structuring fragmented leads and document-heavy operations before attempting ambitious prediction products.', sourceLinks: [{ title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }] },
  { title: 'What Good AI Governance Looks Like in a Mid-Market Company', category: 'AI governance', keywords: ['AI governance', 'AI policy', 'risk controls'], thesis: 'Good governance makes safe behaviour easy through a small set of clear ownership, data, review and logging controls.', sourceLinks: [{ title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }] }
];

function words(value) { return String(value || '').trim().split(/\s+/).filter(Boolean).length; }
function clean(value, max) { return typeof value === 'string' ? value.trim().slice(0, max) : ''; }
function approvedAffiliateLinks() {
  if (!fs.existsSync(linksPath)) return [];
  return JSON.parse(fs.readFileSync(linksPath, 'utf8')).filter((item) => item.status === 'approved' && /^https:\/\//.test(item.url));
}

function fallbackArticle(topic) {
  return [
    `${topic.thesis} That sounds obvious, but it changes the order of operations. Start with the process and the economics; choose the model only after the work, controls and expected outcome are clear.`,
    `The first question is not “Where can we use AI?” It is “Which workflow has enough volume, enough friction and enough measurable output to justify a controlled intervention?” A strong candidate usually has a defined input, a repeatable decision or transformation, and an owner who can explain what good looks like today.`,
    `A practical deployment begins narrowly. Map the current workflow, record cycle time and error patterns, identify the decisions that must remain human, and define one success metric. Then ship one bounded release to one team. This creates a baseline against which the business can judge time saved, quality improved, revenue protected or risk reduced.`,
    `Controls belong in the first version. Decide what data the system may access, where a person must review the result, what gets logged, and how an exception is escalated. In finance, compliance and customer-facing workflows, an impressive demo without an audit trail is not a production system.`,
    `The operating lesson is simple: adoption is part of the build. Give the team a short standard operating procedure, show examples of correct and incorrect use, and review the metric weekly. If the process does not improve, stop or redesign it. If it does, document the pattern and use the evidence to fund the next use case.`,
    `There is also a sequencing decision. Automate the handoffs that create delay before automating nuanced judgement. Standardise the input before asking a model to interpret it. Create a review queue before promising straight-through processing. These choices reduce operational risk and make the business case easier to defend with finance, risk and compliance stakeholders.`,
    `A useful weekly review asks four questions: did the workflow get faster, did quality hold, did people actually use it, and did the control environment remain intact? The answers should be visible in a small operating dashboard, not buried in a project update. Evidence is what turns enthusiasm into a repeatable investment thesis.`,
    `The business case should be written in the language of the function being improved. A finance leader may care about close days, unreconciled items and review hours. A commercial leader may care about response time, qualified pipeline and conversion. An operations leader may care about throughput, rework and exception rates. The same model can be valuable or wasteful depending on which constraint it is designed to relieve.`,
    `This is also why implementation should leave behind operating assets: a workflow map, a baseline metric, a prompt or rules library, an exception policy, a named owner and a review cadence. Those artefacts make the next deployment cheaper and reduce the risk that knowledge disappears when the original project team moves on.`,
    `For leaders, the best first AI win is rarely the most spectacular one. It is the one that can be scoped honestly, measured quickly and trusted by the people who must use it. That is how an experiment becomes operating capability.`
  ].join('\n\n');
}

async function aiArticle(topic) {
  if (!process.env.OPENAI_API_KEY) return null;
  const response = await fetch(process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.45,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'You are an experienced AI implementation consultant and Chartered Accountant. Write precise, useful editorial content for business leaders. Never invent statistics, client claims, quotes, regulations or product capabilities. Use cautious language for opinions. Return only valid JSON.' },
        { role: 'user', content: JSON.stringify({ task: 'Write one original article for the Pratik Bajoria website.', date: today, topic: topic.title, category: topic.category, thesis: topic.thesis, keywords: topic.keywords, sourceLinks: topic.sourceLinks, requirements: { title: 'Use the supplied title or a close editorial refinement.', excerpt: '120-180 characters.', content: '900-1200 words in plain text with blank lines between paragraphs. Include a clear argument, practical framework, risks and a Monday-morning checklist.', keywords: 'Return 4-6 relevant search phrases.', sources: 'Return only the supplied sources unless you can provide a specific primary source URL you know is correct.' } }) }
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
  const validSources = Array.isArray(post.sources) && post.sources.length && post.sources.every((source) => source && /^https:\/\//.test(source.url));
  const minimumWords = post.generatedBy === 'openai' ? 600 : 350;
  return Boolean(post.title && post.excerpt && words(post.content) >= minimumWords && Array.isArray(post.keywords) && post.keywords.length >= 3 && validSources && post.affiliate?.disclosure);
}

async function main() {
  const existing = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
  const topic = topics[Math.floor((Date.parse(`${today}T00:00:00Z`) / 86400000)) % topics.length];
  let draft = null;
  let generatedBy = 'editorial-fallback';
  try {
    const candidate = await aiArticle(topic);
    const candidateSources = Array.isArray(candidate?.sources) && candidate.sources.length ? candidate.sources : topic.sourceLinks;
    const candidateIsUsable = candidate && words(candidate.content) >= 600 && Array.isArray(candidate.keywords) && candidate.keywords.length >= 3 && candidateSources.every((source) => source && /^https:\/\//.test(source.url));
    if (candidateIsUsable) {
      draft = candidate;
      generatedBy = 'openai';
    } else {
      console.warn('AI draft did not meet the editorial quality gate; using the quality-checked editorial fallback.');
    }
  } catch (error) {
    console.warn(`AI draft unavailable (${error.message}); using the quality-checked editorial fallback.`);
  }
  const sources = Array.isArray(draft?.sources) && draft.sources.length ? draft.sources : topic.sourceLinks;
  const post = {
    id: `${today}-${topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
    title: clean(draft?.title || topic.title, 180),
    slug: `${today}-${topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
    url: `/blog.html?slug=${encodeURIComponent(`${today}-${topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`)}`,
    date: today,
    author: 'Pratik Bajoria',
    category: topic.category,
    readTime: draft?.readTime || 7,
    image: draft?.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85',
    excerpt: clean(draft?.excerpt || topic.thesis, 220),
    content: clean(draft?.content || fallbackArticle(topic), 18000),
    keywords: Array.isArray(draft?.keywords) ? draft.keywords.slice(0, 6) : topic.keywords,
    sources,
    generatedBy,
    affiliate: { disclosure: 'This article may contain affiliate links. Recommendations remain editorially independent.', links: approvedAffiliateLinks() }
  };
  if (!qualityCheck(post)) throw new Error('Quality gate failed: article needs a valid title, sources, keywords and at least 350 words.');
  const posts = [post, ...existing.filter((item) => item.id !== post.id)].slice(0, 30);
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2) + '\n');
  console.log(`Published ${generatedBy} article: ${post.title} (${words(post.content)} words)`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
