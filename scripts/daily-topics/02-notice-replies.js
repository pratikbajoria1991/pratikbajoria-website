const S = require('./_sources');
const L = require('./_links');
module.exports = {
  title: 'Drafting Replies to GST and Income Tax Notices With AI Without Losing Control',
  category: 'CA insights',
  image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=85',
  keywords: ['AI for GST notices', 'AI notice reply drafting', 'ASMT-10 reply', 'income tax notice AI', 'CA firm AI India'],
  excerpt: 'AI is good at the chronology and the first draft of a notice reply. The legal position, the facts check and the filing stay with a named CA. Here is the split.',
  sources: [S.rule99, S.s74A, S.form168, S.itAct, S.dpdpRules],
  intro: [
    'Notice work is where I see the most enthusiasm for AI in CA practices, and also the most risk. A good reply is mostly organisation: the timeline, the documents, the reconciliation, the relevant provisions. AI is very good at organisation. But a reply is also a legal position taken on a client’s behalf before a tax officer, and that part cannot be delegated to a model.',
    'Here is how I would split the work, using two common situations: a GST scrutiny notice and an income-tax mismatch query.'
  ],
  sections: [
    {
      heading: 'Know the clock before you open a tool',
      paragraphs: [
        'Deadlines decide how much drafting help you can afford to verify. For GST return scrutiny, [Rule 99 of the CGST Rules][1] has the proper officer issue Form GST ASMT-10 seeking an explanation within 30 days of service, or a longer period the officer allows. The taxpayer replies in ASMT-11, and if the explanation is accepted the officer issues ASMT-12.',
        'For demands relating to financial year 2024-25 onwards, [section 74A of the CGST Act][2] sets a single framework: the show cause notice must be issued within 42 months from the due date for the annual return of that year, and the order within 12 months of the notice, extendable by up to six months by a senior officer for recorded reasons.',
        'On the income-tax side, remember that the [Income-tax Act, 2025 came into force on 1 April 2026][4]. Check which Act and which section a notice cites before anyone, human or machine, starts drafting.'
      ]
    },
    {
      heading: 'What AI does well in notice work',
      bullets: [
        'Reading a long notice and listing every specific discrepancy or allegation, with the paragraph it appears in, so nothing is missed in the reply.',
        'Building a dated chronology from the client’s returns, correspondence and payment records.',
        'Producing the reconciliation the officer is implicitly asking for, for example GSTR-1 against GSTR-3B, or books against the figures in the [Annual Information Statement][3].',
        'Drafting a first version of the reply in a clear structure: facts, reconciliation, submissions, documents enclosed.',
        'Preparing the index of annexures and checking that every document referred to is actually attached.'
      ]
    },
    {
      heading: 'What stays with a named CA',
      paragraphs: [
        'Three things. First, the facts check: every number in the reply ties to a source document the reviewer has seen. Second, the legal position: whether to accept and pay, contest, or partly accept, and on what grounds. Third, the decision to file and the filing itself.',
        'I would add a fourth for AI drafts specifically: every provision, circular or case cited must be checked against the official text. General-purpose assistants still produce confident references that do not exist or do not say what the draft claims. A reply that cites a non-existent judgment does more damage than a short reply that cites none.'
      ]
    },
    {
      heading: 'Mismatch queries start in the AIS',
      paragraphs: [
        'Many income-tax queries begin with a difference between the return and what third parties reported. The Department’s [Form 168 FAQs][3] explain that the Annual Information Statement shows transactions reported by banks, employers, fund houses, brokers and registrars, and that inaccurate entries should be corrected through the feedback option on the portal. The same FAQs make the point that all actual income must be reported even if it is missing from the AIS.',
        'This is a good place for AI-assisted preparation before any notice arrives: compare the AIS with the client’s books each year, list differences, and draft the feedback or explanation while the facts are fresh.'
      ]
    },
    {
      heading: 'Client data rules for notice work',
      paragraphs: ['Notice files contain more personal and sensitive data than almost any other work in a practice. Use firm-controlled tools with retention settings you have checked, and share only what the task needs. The [DPDP Rules, 2025][5] were notified in November 2025 with an 18-month phased timeline, which is enough time to set this up properly but not enough to ignore it. My [AI controls checklist for CA firms](/blog/ai-controls-checklist-ca-firms-india) covers the wider review gates.'],
      bullets: [
        'No client notice goes into a personal chatbot account.',
        'Redact identifiers where the task does not need them.',
        'Keep the AI draft, the reviewer’s changes and the final filed reply in the file.',
        'Log who reviewed and approved each reply.'
      ]
    }
  ],
  faq: [
    { q: 'How long do I have to reply to a GST ASMT-10 notice?', a: 'Rule 99 of the CGST Rules provides for an explanation within 30 days of service of the notice, or such further period as the proper officer may permit. The reply is filed in Form GST ASMT-11.' },
    { q: 'Can I use ChatGPT to draft a reply to a tax notice?', a: 'You can use an approved, firm-controlled assistant to organise facts and prepare a first draft. A CA must check every fact and citation against source documents and official texts, decide the legal position, and approve the final reply before filing.' },
    { q: 'What is the time limit under section 74A of the CGST Act?', a: 'For financial year 2024-25 onwards, the show cause notice must be issued within 42 months from the due date for furnishing the annual return for that year, and the order within 12 months of the notice, extendable by up to six months.' },
    { q: 'How do I correct a wrong entry in the AIS?', a: 'Open the AIS on the e-filing portal, select the transaction and submit feedback with the appropriate reason, such as incorrect, duplicate or not related. The Taxpayer Information Summary updates after the feedback is processed; it cannot be edited directly.' }
  ],
  related: [L.HUB, L.GST, L.CONTROLS, L.AUDIT]
};
