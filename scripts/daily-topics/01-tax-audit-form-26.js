const S = require('./_sources');
const L = require('./_links');
module.exports = {
  title: 'AI for Tax Audit in India: Form 3CD This Year, Form 26 Next Year',
  category: 'CA insights',
  image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=85',
  keywords: ['AI for tax audit India', 'Form 3CD AI', 'Form 26 tax audit', 'tax audit automation', 'AI for chartered accountants'],
  excerpt: 'Form 26 replaces Form 3CD from tax year 2026-27. Where AI helps a CA prepare tax audit data, and where the reported position must stay with the signer.',
  sources: [S.form26, S.itAct, S.tgAudit, S.form168],
  intro: [
    'Tax audit is about to change shape, and that makes this a sensible moment to decide where AI belongs in it. The [Income-tax Act, 2025 came into force on 1 April 2026][2], and with it a new tax audit report: [Form No. 26 under section 63][1], which applies to tax years beginning on or after 1 April 2026. For audits relating to assessment year 2026-27 and earlier, Forms 3CA, 3CB and 3CD [continue to apply][3].',
    'So most practices will run one more season on Form 3CD while preparing for a form that is built very differently. In both, my view is the same: AI can do a great deal of the data work behind the clauses, and none of the reporting judgement.'
  ],
  sections: [
    {
      heading: 'What actually changes with Form 26',
      paragraphs: [
        'The Department’s [Form 26 FAQs][1] describe a report in four parts: Part A for the assessee’s particulars, Part B for the statement of particulars under section 63, Part C where accounts are audited under another law (the old Form 3CA case) and Part D where they are not (the old Form 3CB case). The signing accountant must quote a UDIN, and the firm registration number where the audit is in the firm’s name.',
        'Three design choices matter for automation. Every clause in Part B needs a mandatory Yes or No answer. Detailed schedules are triggered only when a clause is answered Yes. And the FAQs say the data has been aligned with the return of income so that it can, going forward, be used to populate the ITR. That is a structured-data report, which is exactly the kind of work machines handle well, and exactly the kind where one wrong flag flows straight into the return.'
      ],
      bullets: [
        'Business threshold: total sales, turnover or gross receipts above ₹1 crore, rising to ₹10 crore where cash receipts and cash payments each stay within 5% of the total ([Form 26 FAQ 3][1]).',
        'Profession threshold: gross receipts above ₹50 lakh.',
        'Due date: one month before the return due date, so 30 September or 31 October depending on the return deadline.'
      ]
    },
    {
      heading: 'Where AI genuinely helps in tax audit preparation',
      paragraphs: ['Most of the hours in a tax audit go into pulling, classifying and tying out data rather than forming opinions. That is where I would point AI first, always on data the firm controls.'],
      bullets: [
        'Ledger scrutiny for clause-relevant items: payments that could breach cash limits, expenses that may be personal or capital in nature, and entries that need a second look before the clause answer is drafted.',
        'Reconciling TDS and TCS. Form 26 asks the auditor for the number of transactions reported and not reported in the TDS/TCS returns as they stand after the latest correction, and the amount not reported ([FAQ 38][1]). Matching ledgers to returns at transaction level is tedious and well suited to scripts.',
        'Cross-checking the client’s books against the [Annual Information Statement][4], so that differences are explained before the report is signed rather than after a notice arrives.',
        'Drafting the first version of the explanatory notes and the list of documents to request from the client.'
      ]
    },
    {
      heading: 'Where it must not decide',
      paragraphs: [
        'Form 26 asks the auditor to classify every observation or qualification clause-wise as made on a test-check basis applying materiality, based on management representation, or as something the auditor was unable to verify ([FAQ 35][1]). It also asks for the impact on profit, loss or book profit of qualifications and other matters in the statutory audit ([FAQ 36][1]). Those are judgements about evidence. An AI tool can help assemble the evidence; it cannot decide which category applies, and it cannot sign.',
        'The same goes for every Yes or No answer that carries a tax consequence. I would let AI propose an answer with the supporting ledger extract, and require the engagement partner or manager to accept each one explicitly. If the reviewer cannot see why the tool proposed Yes, the answer stays blank until they can.'
      ]
    },
    {
      heading: 'Watch the new data-location question',
      paragraphs: [
        'One Form 26 change touches technology directly. Under Rule 46, where books of account are kept electronically they must remain accessible in India at all times, with a daily backup on servers located in India, and Form 26 asks for the IP address and country of the server holding the accounting data and the address of the India-located backup server ([FAQ 18][1]).',
        'That has two consequences for a practice. You will need to ask clients where their cloud accounting data actually sits, and you should ask the same question of any AI or data tool your own team uses on client books. If a tool cannot tell you where it stores and processes data, it is not ready for tax audit work.'
      ]
    },
    {
      heading: 'How I would prepare a practice this year',
      paragraphs: ['Use the remaining Form 3CD season as the pilot. Pick two or three clause areas with heavy data work, script the extraction and matching, and keep the reviewer’s sign-off on every output. By the time Form 26 work starts for tax year 2026-27, the firm will know which steps are reliable and which still need a human doing them end to end. My [90-day pilot playbook](/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india) sets out how to run that test.'],
      bullets: [
        'Map each Form 26 Part B clause to the data source in the client’s books.',
        'Build reusable checks for the high-volume clauses first: TDS/TCS, loans and deposits by mode, and quantitative details for trading and manufacturing clients.',
        'Write down, per clause, what the tool may propose and what only a reviewer may conclude.',
        'Ask every client about server location and backups before fieldwork, not during it.'
      ]
    }
  ],
  faq: [
    { q: 'When does Form 26 replace Form 3CD?', a: 'Form No. 26 applies for tax years beginning on or after 1 April 2026, under section 63 of the Income-tax Act, 2025. Forms 3CA, 3CB and 3CD continue for tax audits relating to assessment years up to 2026-27.' },
    { q: 'Can AI fill in a tax audit report?', a: 'It can prepare the data and propose answers for review, which is where most of the time goes. The clause answers, the categorisation of observations and the signature remain the accountant’s responsibility, and every proposed answer should be checked against the books before it is accepted.' },
    { q: 'What is the tax audit threshold under the new Act?', a: 'According to the Department’s Form 26 FAQs, business turnover above ₹1 crore (₹10 crore where cash receipts and payments each stay within 5%), professional receipts above ₹50 lakh, and certain presumptive taxation cases.' },
    { q: 'Does server location matter for tax audit now?', a: 'Yes. Form 26 asks for the IP address and country of the server holding electronic books and the address of the India-located daily backup, in line with Rule 46 of the Income-tax Rules, 2026.' }
  ],
  related: [L.HUB, L.CONTROLS, L.PILOT, L.AUDIT]
};
