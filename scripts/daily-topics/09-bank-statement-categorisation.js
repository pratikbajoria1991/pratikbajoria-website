const S = require('./_sources');
const L = require('./_links');
module.exports = {
  title: 'AI for Bank Statement Categorisation for Bookkeeping Clients in India',
  category: 'CA insights',
  image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=85',
  keywords: ['bank statement categorisation AI', 'AI bookkeeping India', 'AI for accountants India', 'Account Aggregator bookkeeping', 'bank reconciliation AI'],
  excerpt: 'Bank statement categorisation is the best first AI workflow for many bookkeeping practices: high volume, easy to check, low risk. How to set it up properly.',
  sources: [S.sahamati, S.form26, S.form168, S.gartner],
  intro: [
    'If a bookkeeping practice asks me where to start with AI, the answer is usually the bank statement. Every client has one, the volume is high, the categories repeat month after month, and every mistake is easy to see and fix before it reaches a return.',
    'It is also unglamorous, which is part of the appeal. The aim is not a clever demo. It is getting a month of transactions into the right ledgers faster, with a person checking the parts that need checking.'
  ],
  sections: [
    {
      heading: 'Why it is a good first workflow',
      bullets: [
        'Volume: hundreds or thousands of lines per client per month, mostly repetitive.',
        'Checkability: each categorisation can be verified against the narration, the counterparty and the invoice.',
        'Low downstream risk if reviewed: errors are caught at the ledger stage, long before a return is filed.',
        'A learning loop: corrections made by the reviewer become rules for next month.'
      ],
      paragraphs: ['It is also close to what finance teams already do with AI. Gartner’s [2025 survey][4] found error and anomaly detection among the three most common finance AI use cases.']
    },
    {
      heading: 'Getting the data in cleanly',
      paragraphs: [
        'The weak point in most practices is not the categorisation; it is the input. PDFs, scanned statements and password-protected files waste more time than any classification error. Consent-based data sharing is changing that. India’s Account Aggregator ecosystem [crossed 500 million fulfilled consents in September 2026][1], with more than 2.8 billion financial accounts enabled for sharing and over 1,100 regulated entities live, according to Sahamati, which the Reserve Bank recognised as the self-regulatory organisation for the ecosystem in June 2026.',
        'Not every client or bookkeeping tool will use that route yet, but structured, consented feeds are the direction of travel. Where they are available, they remove a whole class of errors.'
      ]
    },
    {
      heading: 'A categorisation workflow that holds up',
      bullets: [
        'Start with the client’s own chart of accounts and last year’s categorised data as the reference.',
        'Apply firm rules first, for known vendors, salary runs and tax payments, then let AI propose categories for the rest with a confidence level.',
        'Route low-confidence lines, round-figure transfers, cash withdrawals and related-party payments to a reviewer.',
        'Record every reviewer correction and turn recurring ones into rules.',
        'Reconcile the closing balance to the statement every month, without exception.'
      ]
    },
    {
      heading: 'Where the reviewer earns their fee',
      paragraphs: [
        'Some lines need judgement: whether a transfer is a loan, capital or a sale; whether a payment is personal; whether a receipt is income at all. Those decisions affect tax and should never be left to a model’s guess.',
        'It also pays to look at the bank data the way the tax department does. The [Form 168 FAQs][3] explain that banks are among the institutions whose reports feed the Annual Information Statement. Categorising transactions properly during the year makes the year-end comparison with the AIS much less painful.'
      ]
    },
    {
      heading: 'Mind where the books live',
      paragraphs: [
        'Under the new income-tax framework, the [Form 26 FAQs][2] point to Rule 46: where books of account are kept electronically they must remain accessible in India, with a daily backup on servers located in India, and the tax audit report asks for the server location. If a categorisation or bookkeeping tool stores client books, know where. If it processes data outside India, check whether that affects the client’s compliance before you rely on it.',
        'If this is your first AI workflow, treat it as a pilot with a baseline and a decision date; my [90-day pilot playbook](/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india) lists this as a good first candidate.'
      ]
    }
  ],
  faq: [
    { q: 'Can AI categorise bank statements accurately?', a: 'For repetitive transactions with a good reference history, it can propose categories quickly. Accuracy depends on clean inputs and a reviewer who checks low-confidence, unusual and tax-sensitive lines and feeds corrections back as rules.' },
    { q: 'What is the Account Aggregator framework?', a: 'It is India’s consent-based system for sharing financial data between regulated entities. According to Sahamati, it crossed 500 million fulfilled consents in September 2026, with more than 2.8 billion accounts enabled for sharing.' },
    { q: 'Which transactions should a person always review?', a: 'Low-confidence suggestions, cash withdrawals, round-figure and related-party transfers, loans and capital movements, and anything that changes taxable income.' },
    { q: 'Does it matter where bookkeeping software stores data?', a: 'Yes. Under Rule 46 of the Income-tax Rules, 2026, electronic books must remain accessible in India with a daily backup on India-located servers, and Form 26 asks for the server location.' }
  ],
  related: [L.HUB, L.PILOT, L.CONTROLS, L.AUDIT]
};
