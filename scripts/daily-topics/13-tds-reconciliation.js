const S = require('./_sources');
const L = require('./_links');
module.exports = {
  title: 'Using AI for TDS Reconciliation in Indian CA Firms: From 26AS to Form 168',
  category: 'CA insights',
  image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=85',
  keywords: ['TDS reconciliation AI', '26AS reconciliation', 'Form 168 AIS', 'AIS mismatch', 'AI for CA firms India'],
  excerpt: 'Form 26AS is now Form 168 under the new Act. How to automate TDS matching and the mismatch list, while a reviewer decides what to chase with the deductor.',
  sources: [S.form168, S.form26, S.itAct, S.gartner],
  intro: [
    'TDS reconciliation is one of the least glamorous and most useful places to put AI in a practice. The volume is high, the rules are clear, and the cost of a missed mismatch is a demand, a refund delay or an uncomfortable call with the client.',
    'It is also changing names. Under the [Income-tax Act, 2025][3], the statement many of us still call 26AS is [Form No. 168, the Annual Information Statement][1], issued under section 510 read with Rule 245. The work behind it has not changed: match what the client booked with what others reported, and chase the differences.'
  ],
  sections: [
    {
      heading: 'What the statement now contains',
      paragraphs: [
        'The Department’s [Form 168 FAQs][1] describe two parts. Part A carries general information about the taxpayer. Part B carries TDS and TCS information, Statement of Financial Transactions data from reporting entities, payment of taxes, demands and refunds, and other information such as dividends, interest on refunds, and securities and mutual fund transactions. The Taxpayer Information Summary (TIS) aggregates this by category and is updated after feedback is processed.',
        'In practice a reconciliation now has two jobs: tie the TDS credits the client is claiming to what deductors reported, and make sure the income behind those credits is fully reflected in the books and the return.'
      ]
    },
    {
      heading: 'What to automate',
      bullets: [
        'Parsing the downloaded statement into a clean table by deductor TAN, section, date and amount.',
        'Matching each entry to the client’s ledger, first exactly, then within tolerances on date and amount, with every fuzzy match labelled as such.',
        'Producing a mismatch list in three buckets: in the statement but not in the books, in the books but not in the statement, and in both with different amounts.',
        'Drafting the email to each deductor listing the missing or short-reported entries, with invoice references attached.',
        'Tracking responses and re-running the match after deductors file corrections.'
      ],
      paragraphs: ['None of this needs a clever model. A well-written script does most of it, and an AI assistant is useful for writing and maintaining that script, for reading messy ledger narrations and for drafting the deductor emails. Gartner’s [2025 AI in Finance survey][4] found error and anomaly detection among the three most common finance AI use cases; TDS matching is a very practical version of it.']
    },
    {
      heading: 'What a reviewer still decides',
      paragraphs: [
        'Whether a difference is a timing issue, a deductor error, a booking error or income the client has not recognised is a judgement. So is the decision to submit feedback on an AIS entry, to wait for a correction statement, or to report income that does not appear in the statement at all. The [FAQs][1] are explicit that actual income must be reported even if it is missing from the AIS, and that the TIS cannot be edited directly.',
        'I would also keep a person on any match the tool marks as fuzzy. Fuzzy matching is where reconciliations quietly go wrong: two invoices of similar value from the same customer can be paired incorrectly, and the error will not surface until a deductor’s correction breaks it.'
      ]
    },
    {
      heading: 'The tax auditor will ask the deductor-side question too',
      paragraphs: ['For clients who deduct tax, the new tax audit report raises the bar. [Form 26][2] asks the auditor for the total number of transactions reported and not reported in the TDS/TCS return as it stands after the latest correction statement, and the amount of transactions not reported. A firm that already runs transaction-level matching for its clients’ own credits can extend the same scripts to their deduction compliance.']
    },
    {
      heading: 'A simple monthly rhythm',
      bullets: [
        'Download the statement and the ledger extract on a fixed day each month or quarter.',
        'Run the match and publish the three-bucket mismatch list to the reviewer.',
        'Reviewer classifies each item and approves the deductor emails.',
        'Re-run after corrections, and close items with a note of how they were resolved.',
        'Before the return, reconcile income heads in the TIS to the books and document every difference.'
      ],
      paragraphs: ['If this is the firm’s first AI workflow, run it as a time-boxed pilot with a baseline, as in my [90-day pilot playbook](/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india).']
    }
  ],
  faq: [
    { q: 'Is Form 26AS still available?', a: 'Under the Income-tax Act, 2025 and the Income-tax Rules, 2026, the Annual Information Statement is Form No. 168, corresponding to Form 26AS and section 285BB under the 1961 Act.' },
    { q: 'Can AI reconcile TDS automatically?', a: 'It can do the parsing, matching and drafting at high volume. A reviewer should still classify each difference, approve deductor follow-ups and decide on AIS feedback, and any fuzzy match should be confirmed by a person.' },
    { q: 'What if income is missing from the AIS?', a: 'According to the Department’s FAQs, all actual income must be reported in the return even if it does not appear in the AIS.' },
    { q: 'What does Form 26 ask about TDS returns?', a: 'For assessees who deduct or collect tax, the auditor reports the number of transactions reported and not reported in the TDS/TCS return after the latest correction, and the amount of transactions not reported.' }
  ],
  related: [L.HUB, L.GST, L.PILOT, L.AUDIT]
};
