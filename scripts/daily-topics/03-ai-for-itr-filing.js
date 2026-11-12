const S = require('./_sources');
const L = require('./_links');
module.exports = {
  title: 'AI for ITR Filing: What a CA Should Let It Do and What Stays Human',
  category: 'CA insights',
  image: 'https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?w=1200&q=85',
  keywords: ['ai for itr filing', 'ai tool for itr computation', 'chatgpt itr filing', 'AIS reconciliation AI', 'AI for CA practices'],
  excerpt: 'How a CA practice can use AI in ITR season: AIS tie-outs, document extraction and regime comparisons, with the review steps and data rules that stay human.',
  sources: [S.form168, S.itAct, S.itrApplicable, S.cnbcItr, S.dpdpRules],
  intro: [
    'Every July the same question comes up in practices: can AI take some of the ITR load off the team? The search results for “AI for ITR filing” are mostly vendor pages, and a few news pieces warning taxpayers not to trust a chatbot with their return. Both miss the practical middle ground a CA firm actually operates in.',
    'This is how I would split the work: what AI does well in return preparation, what it should never decide, and the controls that make the speed safe.'
  ],
  sections: [
    {
      heading: 'Start with the statement the department already has',
      paragraphs: [
        'The Annual Information Statement is where most mismatches begin. The department’s [Form No. 168 FAQs][1] describe the AIS under the new law, and the [Income-tax Act, 2025][2] came into force on 1 April 2026, so terminology and form references are shifting this year. That is a reason to be careful with any AI tool trained on older material.',
        'Used well, AI is excellent at the tie-out: reading the AIS, the client’s Form 16, bank interest certificates and broker statements, and listing every item that appears in one place but not the other. That list is where a preparer’s time should go.'
      ]
    },
    {
      heading: 'Tasks AI handles well in ITR season',
      bullets: [
        'Extracting figures from Form 16, interest certificates, capital gains statements and rent receipts into a standard working sheet.',
        'Reconciling the extracted figures with the AIS and flagging differences by category and amount.',
        'Running a first comparison of the old and new regimes from the working sheet, for the reviewer to confirm.',
        'Drafting the client query list: missing documents, unexplained credits, foreign assets questions.',
        'Producing a plain-English summary of the computation for the client email.'
      ]
    },
    {
      heading: 'What must stay with the CA',
      paragraphs: [
        'Form selection depends on residential status, the nature of income, directorships, unlisted shares and foreign assets. The e-Filing portal’s [guide to which ITR applies][3] shows how many conditions are involved; an AI tool can suggest a form, but the preparer must confirm it from the facts.',
        'Classification and positions are the other half. Whether a receipt is business income or capital gains, whether an exemption applies, how a loss is set off: these are judgements. As tax experts told [CNBC-TV18][4], using AI does not shift responsibility for what is reported, and an AI answer is no defence if a return is questioned.'
      ]
    },
    {
      heading: 'A workflow for a practice',
      bullets: [
        'Collect documents through a firm-controlled portal or shared drive, not personal WhatsApp.',
        'Run extraction and AIS reconciliation in an approved tool; save the output to the client file.',
        'Preparer reviews every difference and records how each was resolved.',
        'Reviewer confirms the form, regime choice, any exemptions claimed and the final computation.',
        'Client approves the computation before filing and e-verifies the return.'
      ]
    },
    {
      heading: 'Client data rules',
      paragraphs: [
        'ITR documents are dense with personal data: PAN, Aadhaar-linked details, bank accounts, salaries and family information. The [DPDP Rules, 2025][5] were notified in November 2025 with a phased timeline. Decide now which AI accounts may receive client files, switch off training on your data, set retention, and never paste a client’s documents into a personal chatbot account. My [AI controls checklist for CA firms](/blog/ai-controls-checklist-ca-firms-india) covers the policy side.'
      ]
    },
    {
      heading: 'Measuring whether it helped',
      paragraphs: [
        'Track three numbers through the season: hours per return by complexity band, the number of AIS differences found before filing, and post-filing corrections or notices. If hours fall but corrections rise, the tool is moving work downstream rather than removing it. That is the same discipline I apply to [TDS reconciliation](/blog/2026-10-13-using-ai-for-tds-reconciliation-in-indian-ca-firms-from-26as-to-form-168).'
      ]
    }
  ],
  faq: [
    { q: 'Can AI file my income tax return?', a: 'AI tools can extract figures, reconcile them with the AIS and draft a computation, but form selection, classification and positions remain the preparer’s judgement, and the taxpayer remains responsible for what is reported.' },
    { q: 'Is ChatGPT reliable for ITR filing?', a: 'It is useful for explaining concepts and drafting client communication. It may rely on outdated rules, especially with the Income-tax Act, 2025 in force from 1 April 2026, so every figure and provision must be checked against official sources.' },
    { q: 'What is the best use of AI in ITR season for a CA firm?', a: 'Document extraction and reconciliation with the Annual Information Statement, followed by a reviewer-led check of every difference before filing.' },
    { q: 'Is it safe to upload Form 16 and AIS to an AI tool?', a: 'Only to a firm-approved business account with training on your data switched off and retention settings checked. Personal chatbot accounts should not receive client tax documents.' }
  ],
  related: [L.TDS, L.CONTROLS, L.NOTICES, L.HUB]
};
