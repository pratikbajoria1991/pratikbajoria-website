// Single source of truth for site identity used by llms.txt, llms-full.txt, ai.txt and the
// markdown catalog (scripts/build-md.mjs). Facts must match the homepage JSON-LD @graph
// (Person #person, ProfessionalService/Organization #business, WebSite #website) in
// public/index.html; scripts/test-md-coverage.mjs fails if name, url, email or logo drift.
// Wording below was moved verbatim from the hand-written top of the old public/llms.txt.

import fs from 'node:fs';
export const CLUSTERS = JSON.parse(fs.readFileSync(new URL('../../public/clusters.json', import.meta.url), 'utf8'));

export const SITE = {
  name: 'Pratik Bajoria',
  title: 'Pratik Bajoria — AI Implementation for Business',
  organisationName: 'Pratik Bajoria — AI Implementation',
  url: 'https://pratikbajoria.com',
  description: 'Pratik Bajoria is a Chartered Accountant and ex-Big 4 AI implementation consultant helping companies create measurable P&L impact.',
  descriptionSuffix: 'Consulting entity is primary; Findost is product proof.',
  email: 'hello@pratikbajoria.com',
  logo: 'https://pratikbajoria.com/favicon.png',
  language: 'en-IN',
  crossborderUrl: 'https://crossborder.pratikbajoria.com/',
  sameAs: [
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
    'https://findost.io'
  ],
  contact: [
    ['Website', 'https://pratikbajoria.com/'],
    ['LinkedIn', 'https://www.linkedin.com/in/pratik-bajoria-6288b1119/'],
    ['WhatsApp', 'https://api.whatsapp.com/send?phone=919804182483'],
    ['Email', 'mailto:hello@pratikbajoria.com'],
    ['Findost', 'https://findost.io']
  ],
  disclaimer: 'Educational content; not legal, tax, audit, financial or investment advice.'
};

// Paths no crawler or agent should fetch. Keep in sync with robots.txt (Disallow) and the
// [scope] section of ai.txt; the coverage test checks robots.txt.
export const PRIVATE_PATHS = ['/api/'];

// Hand-written llms.txt sections (kept factual: no invented stats, clients or prices).
export const LLMS_INTRO_SECTIONS = [
  ['Primary services', `- AI Opportunity Audit: workflow mapping, use-case scoring and a prioritised 90-day roadmap.
- Workflow Automation: production systems, document agents, WhatsApp/email automation and business-system integrations.
- Finance & Compliance AI: reconciliation, month-end close, GST, TDS, MIS and audit-ready controls.
- Team Enablement: workshops, prompt libraries, SOPs and AI usage policy.
- Fractional AI Leadership: roadmap ownership, governance, vendor selection and reporting.
- AI Product Advisory: architecture, model choices, pricing and go-to-market for AI products.`],
  ['Process', 'Diagnose → Prioritise → Build → Embed.'],
  ['About', 'Pratik works from India with business leaders in India, the United States, the United Kingdom and globally. He is based in Kolkata, India, and is the author of every article on the site (author page: https://pratikbajoria.com/about). He is also the founder of Findost, an AI-powered wealth management platform (proof of shipping AI in a regulated domain — consulting remains the primary commercial entity on this site).'],
  ['Secondary offer: Cross-border Deals & Partnerships', `- Page: https://crossborder.pratikbajoria.com/
- Introductions: Indian businesses to international clients and buyers; overseas companies to vetted Indian partners. Fees agreed per deal, paid only on a closed deal; no retainer.
- Lane 1 — IT & software partnerships: companies in the US, UK and Middle East introduced to vetted Indian development agencies (web, mobile, AI, healthcare/fintech software).
- Lane 2 — Export sourcing: Indian manufacturers/exporters in spices & agri-food, home textiles, engineering components and specialty chemicals connected with importers/distributors in the US, UK/EU, Gulf and South-East Asia.
- Process: understand the need or capacity → shortlist and vet → introduction under a signed agreement → fee only when a deal closes.
- Not a broker-dealer, investment adviser or legal adviser; no guaranteed outcomes; parties carry out their own due diligence. AI implementation consulting remains the primary offer.
- Phase 2: the subdomain has its own sitemap (https://crossborder.pratikbajoria.com/sitemap.xml); it has no markdown versions yet.`],
  ['Key FAQ', `- **What is AI implementation?** Building and deploying AI systems that solve real business problems and deliver measurable P&L impact.
- **How does the first engagement work?** A structured AI Opportunity Audit: map workflows, score use cases on impact and risk, and produce a prioritised 90-day roadmap. Details: https://pratikbajoria.com/audit
- **Which sectors does Pratik serve?** Financial services, accounting and professional services, manufacturing and distribution, retail and e-commerce, healthcare, real estate, legal and compliance, and SaaS and technology.
- **How is sensitive data handled?** Architecture, retention and access controls are scoped to client policies; sensitive work can use redaction, private deployments and audit trails.
- **How do I get in touch?** Book a discovery call, WhatsApp, LinkedIn, or email hello@pratikbajoria.com — replies within one business day.`]
];

export const LLMS_OUTRO_SECTIONS = [
  ['Editorial policy', 'Insights are practical, implementation-focused and may contain disclosed affiliate links. Affiliate recommendations are editorially independent. Finance and markets content is educational and does not constitute financial, investment or legal advice.'],
  ['Editorial pillars (topic clusters)', CLUSTERS.clusters.map((c) => `- ${c.name}: ${c.summary} Hub: ${SITE.url}${c.hub}`).join('\n')],
  ['Author', `- ${CLUSTERS.author.displayName}: ${CLUSTERS.author.role}. Based in Kolkata, India. Author page: ${SITE.url}/about
- Every article is written and signed by Pratik Bajoria; Article schema names Person #person as author and Organization #business as publisher.`],
  ['Featured in', CLUSTERS.featuredIn.map((f) => `- ${f.publication}: ${f.title} (${f.date}) ${f.url}`).join('\n')]
];

// ai-summary overrides for key pages (everything else uses its meta description).
export const AI_SUMMARIES = {
  '/': 'Homepage of Pratik Bajoria, a Chartered Accountant and ex-Big 4 AI implementation consultant in India: services (AI Opportunity Audit, workflow automation, finance and compliance AI, workshops), process, FAQ and contact details.',
  '/about': 'Author page for CA Pratik Bajoria, a Kolkata-based Chartered Accountant (ex-Big 4, 9+ years post-qualification) who advises companies on AI implementation and builds Findost; lists his four topic hubs, CAclubindia feature and profiles.',
  '/audit': 'Service page for the AI Opportunity Audit by Pratik Bajoria: a fixed-fee two-week sprint that maps finance and CA-firm workflows, scores AI use cases and produces a prioritised 90-day roadmap.',
  '/blog': 'Index of every article on pratikbajoria.com about AI implementation, AI for Chartered Accountants, finance automation and business tools, newest first, each with a one-line summary.'
};
