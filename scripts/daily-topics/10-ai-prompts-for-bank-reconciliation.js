const S = require('./_sources');
const L = require('./_links');
module.exports = {
  title: 'AI Prompts for Bank Reconciliation: What Works and What to Check',
  category: 'AI automation',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85',
  keywords: ['ai prompt for bank reconciliation', 'claude ai for bank reconciliation', 'chatgpt bank reconciliation', 'bank reconciliation automation India', 'AI for accountants'],
  excerpt: 'Prompts for bank reconciliation with Claude or ChatGPT, written by a CA: file preparation, matching rules, outputs to request and the checks before you post.',
  sources: [S.sahamati, S.gartner, S.dpdpRules],
  intro: [
    'Bank reconciliation is one of the first jobs people try with AI, and “AI prompt for bank reconciliation” is a growing search. Most of what you find is a single prompt in a social post: upload the statement and the ledger, ask the model to match them, done. It often works on a clean demo month. It often fails quietly on a real one.',
    'Here is how I would prompt for bank reconciliation so that the output is something an accountant can review and stand behind.'
  ],
  sections: [
    {
      heading: 'Prepare the files before you prompt',
      bullets: [
        'Bank statement as CSV or Excel, not PDF where you can avoid it; one row per transaction with date, narration, reference, debit, credit and balance.',
        'Bank ledger export from the accounting system for the same period, plus the closing balance per books.',
        'The previous month’s unreconciled items, so carried-forward cheques and deposits are not treated as new.',
        'Remove columns the matching does not need, especially personal details in narrations where possible.'
      ],
      paragraphs: ['Structured data makes everything easier. Consent-based Account Aggregator feeds are one route; [Sahamati][1] reports the network has crossed 500 million consents. Where a client’s bank supports it, a structured feed beats a downloaded PDF.']
    },
    {
      heading: 'A prompt structure that holds up',
      paragraphs: [
        'I write reconciliation prompts in five parts. Describe each file and its columns. State the matching rules in order: exact amount and reference first, then exact amount within three days, then exact amount only, each as a separate pass. List the outputs you want. Add the rules the model must not break. Finally, ask it to show its counts so you can check nothing was dropped.',
        'The rules matter most. I always include: do not create entries to force the balance to agree; do not match one bank line to more than one ledger line unless I ask; list every line you could not classify; and keep the original row numbers so I can trace each match.'
      ]
    },
    {
      heading: 'Outputs to ask for',
      bullets: [
        'Matched items, with the pass on which each was matched.',
        'In bank, not in books: charges, interest, direct credits, returned cheques.',
        'In books, not in bank: unpresented cheques and deposits in transit, with their age.',
        'Possible duplicates on either side.',
        'A reconciliation statement from the bank balance to the book balance, with totals that tie.'
      ]
    },
    {
      heading: 'Checks before you post anything',
      bullets: [
        'Tie the opening and closing balances in the model’s statement to the actual bank statement and ledger.',
        'Check the row counts: matched plus unmatched should equal the total on each side.',
        'Review every match from the looser passes; amount-only matches are where errors hide.',
        'Investigate old unpresented items rather than carrying them forward again.',
        'Post adjusting entries yourself, after review; do not let the tool post directly.'
      ]
    },
    {
      heading: 'Where the time really goes',
      paragraphs: [
        'In my experience the matching is rarely the slow part. Chasing unexplained receipts, missing narrations and duplicate entries is. AI helps most when it hands you a short, well-organised exceptions list on day one of the close. Anomaly detection is one of the most common finance AI uses in [Gartner’s 2025 survey][2], which fits what I see in practice.',
        'For the broader close, my [AI finance automation roadmap](/blog/2026-10-04-ai-finance-automation-roadmap-for-cfos-and-controllers) sets out what to automate in what order.'
      ]
    },
    {
      heading: 'Data and access',
      paragraphs: ['Bank statements reveal salaries, customers, suppliers and personal payments. The [DPDP Rules, 2025][3] were notified in November 2025 with a phased timeline. Use a business AI account with training on your data turned off, keep files in company storage, and record which tool processed which statement.']
    }
  ],
  faq: [
    { q: 'Can ChatGPT or Claude do a bank reconciliation?', a: 'They can match transactions and produce an exceptions list and reconciliation statement from clean CSV files. An accountant should check balances, row counts and loose matches, and post any entries after review.' },
    { q: 'What should a bank reconciliation prompt include?', a: 'A description of each file, matching rules in order of strictness, the outputs you want, rules such as not creating entries to force agreement, and a request for row counts so nothing is silently dropped.' },
    { q: 'Should AI post reconciliation entries automatically?', a: 'Not without review. Let the tool propose adjusting entries and post them yourself after checking, so every change to the books has an accountable approver.' },
    { q: 'Is it safe to upload bank statements to AI tools?', a: 'Only to an approved business account with training on your data turned off and retention settings checked. Remove unnecessary personal details and record which tool processed which file.' }
  ],
  related: [L.ROADMAP, L.DASHBOARD, L.CONTROLS, L.AUTO_HUB]
};
