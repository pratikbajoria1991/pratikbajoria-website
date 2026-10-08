const S = require('./_sources');
const L = require('./_links');
module.exports = {
  title: 'How CA Firms in India Should Price Work When AI Cuts the Hours',
  category: 'CA insights',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85',
  keywords: ['CA firm pricing AI', 'value pricing CA India', 'AI and billable hours', 'CA practice management', 'fixed fee CA firm'],
  excerpt: 'If AI halves preparation time, hourly billing hands the gain to the client. How Indian CA firms can price scope and risk instead, within ICAI’s rules on fees.',
  sources: [S.icaiFees, S.trFop, S.wtiIndia, S.sa210],
  intro: [
    'Every partner I speak to about AI eventually asks the same uncomfortable question: if this saves my team hours, and I bill by the hour or by a rate card built on hours, have I just cut my own fees?',
    'Possibly. But only if pricing stays where it is. The more useful question is what the client is actually paying for, and whether that has changed. In most compliance and advisory work it has not: they are paying for a correct deliverable, delivered on time, with a professional standing behind it.'
  ],
  sections: [
    {
      heading: 'How much time are we talking about?',
      paragraphs: [
        'Nobody has a reliable India-specific number for CA practices yet, and I would be wary of anyone who quotes one. The broader surveys give a sense of direction. Thomson Reuters’ [2025 Future of Professionals report][2], based on 2,275 professionals across legal, tax, accounting, audit, risk and trade, found respondents expecting AI to save five hours a week within a year. The same report found only 22% saying their organisation had a visible, defined AI strategy.',
        'In India, Microsoft’s [2025 Work Trend Index findings][3] reported that 93% of leaders intend to use AI agents to extend workforce capacity in the next 12 to 18 months. Clients will read the same headlines. Expect them to ask why the fee has not moved.'
      ]
    },
    {
      heading: 'First, know what you are not allowed to do',
      paragraphs: [
        'The obvious answer, "charge for the outcome", runs into the profession’s own rules. Under Clause (10) of Part I of the First Schedule to the Chartered Accountants Act, read with [Regulation 192][1], a CA in practice may not charge fees based on a percentage of profits or contingent upon the findings or results of the work, apart from specific exceptions such as receivers and liquidators, co-operative society audits and valuers for direct taxes. ICAI’s FAQs also say fees cannot be charged as a percentage of turnover except as Regulation 192 allows.',
        'So for audit, tax and most compliance work, "value pricing" in an Indian practice means pricing the scope, the complexity and the risk of the engagement as a fixed fee agreed upfront, not tying the fee to a result.'
      ]
    },
    {
      heading: 'Price the deliverable, not the hours behind it',
      paragraphs: ['A fixed fee per deliverable lets the firm keep the efficiency it earns. The client gets certainty and a defined scope; the firm gets the benefit of doing the work faster. That only works if the scope is written down clearly, which is why I would revisit engagement letters at the same time. [SA 210’s illustrative engagement letters][4] already provide for fees and billing arrangements to be agreed in writing; extend the same discipline to non-audit work.'],
      bullets: [
        'Define the deliverable: which returns, which reconciliations, which reports, by when.',
        'Define what is out of scope and how it will be priced, such as notices, revisions and additional entities.',
        'State what the client must provide and by when; late or messy data is the biggest driver of hours.',
        'Separate the review and sign-off component, which does not shrink with AI, from preparation, which does.'
      ]
    },
    {
      heading: 'What does not get cheaper',
      paragraphs: ['Review time, professional judgement and liability do not fall with AI. If anything, review becomes more important, because more of the first draft is produced by a tool. I would make that visible in proposals: a smaller preparation line, an unchanged review and sign-off line, and new lines for work that AI makes possible, such as monthly exception reports or faster turnaround on queries.']
    },
    {
      heading: 'Where the time saved should go',
      bullets: [
        'Into review quality: more time for the manager and partner on the judgement areas.',
        'Into new recurring services clients will pay for, such as monthly MIS or compliance health checks.',
        'Into capacity, so the firm can take on more clients in peak season without lowering standards.',
        'Into training, so article assistants and juniors learn to review machine output, not just prepare.'
      ],
      paragraphs: ['If the hours saved simply disappear into lower bills, the firm has funded the tools and given away the benefit. Decide before you roll AI out where the time will be redeployed, and measure it during a [time-boxed pilot](/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india) rather than guessing.']
    }
  ],
  faq: [
    { q: 'Can a CA firm charge fees based on results?', a: 'Generally no. Clause (10) of Part I of the First Schedule to the Chartered Accountants Act and Regulation 192 prohibit fees based on a percentage of profits or contingent on findings or results, subject to specific exceptions such as receivers, liquidators, co-operative society audits and valuers for direct taxes.' },
    { q: 'Should a CA firm reduce fees because it uses AI?', a: 'Not automatically. Clients pay for a correct, timely deliverable with professional responsibility behind it. A fixed fee for a clearly defined scope lets the firm keep efficiency gains while giving the client certainty.' },
    { q: 'How much time does AI save accountants?', a: 'There is no reliable India-specific figure yet. In Thomson Reuters’ 2025 Future of Professionals survey of 2,275 professionals, respondents expected AI to save five hours a week within the next year.' },
    { q: 'What should change in proposals?', a: 'Separate preparation from review and sign-off, define scope and exclusions precisely, and price new AI-enabled services, such as monthly exception reporting, as their own line.' }
  ],
  related: [L.HUB, L.PILOT, L.REPLACE, L.AUDIT]
};
