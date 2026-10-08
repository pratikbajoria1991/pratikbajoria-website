const S = require('./_sources');
const L = require('./_links');
module.exports = {
  title: 'AI for CARO 2020 Reporting: Where It Helps and Where Judgement Stays',
  category: 'CA insights',
  image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=85',
  keywords: ['CARO 2020 AI', 'CARO reporting automation', 'AI in statutory audit India', 'audit reporting AI', 'AI for auditors India'],
  excerpt: 'CARO 2020 asks for evidence-heavy statements under 21 clauses. Where AI can assemble the evidence for each one, and why the reporting call stays with the auditor.',
  sources: [S.caroPib, S.caroText, S.siaComp, S.gartner],
  intro: [
    'CARO reporting is a good test of where AI belongs in a statutory audit. Most clauses need the auditor to find, assemble and check specific evidence: title deeds, inventory verification results, loan terms, quarterly returns to banks, whistle-blower complaints. That is laborious and well suited to machines. Each clause then ends in a statement the auditor signs, and that part is not.',
    'Having spent my early years on Big 4 audit files, I know how much of a CARO working is hunting for documents rather than thinking. This is how I would use AI across CARO 2020 without blurring the line between the two.'
  ],
  sections: [
    {
      heading: 'What CARO 2020 asks for',
      paragraphs: [
        'The [Companies (Auditor’s Report) Order, 2020][1] was notified on 25 February 2020 under section 143(11) of the Companies Act, replacing CARO 2016. The [order’s text][2] sets out the matters in paragraph 3 from clause (i) to clause (xxi), and does not apply to reports on consolidated financial statements except for clause (xxi).',
        'The press release lists what was new, and most of it is data-heavy. A few examples:'
      ],
      bullets: [
        'Discrepancies of 10% or more in the aggregate of each class of inventory found on physical verification.',
        'Whether quarterly returns or statements filed with banks agree with the books, where working capital limits above ₹5 crore were sanctioned on the security of current assets.',
        'A prescribed format for defaults in repaying loans or interest, and whether the company is a declared wilful defaulter.',
        'Whether term loans were used for the purpose obtained, and details of any diversion.',
        'Cash losses in the current and preceding year, and whistle-blower complaints considered by the auditor.'
      ]
    },
    {
      heading: 'Who it does not apply to',
      paragraphs: ['The [order][2] excludes banking companies, insurance companies, section 8 companies, one person companies and small companies, and private companies that are not a holding or subsidiary of a public company and stay within its limits on paid-up capital and reserves, borrowings from banks or financial institutions, and total revenue. Confirm applicability first; it is the cheapest check in the file.']
    },
    {
      heading: 'Where AI earns its place',
      bullets: [
        'Building the clause-by-clause evidence index: for each clause, what evidence is needed, where it sits and whether it has been received.',
        'Comparing quarterly stock statements submitted to banks with the books, period by period, and listing every difference with its amount.',
        'Reading loan agreements and sanction letters to extract repayment schedules and stated purposes, then comparing them with actual repayments and utilisation.',
        'Summarising board minutes, whistle-blower logs and legal correspondence so the team knows what to read in full.',
        'Analysing inventory verification sheets by class to see which classes approach the 10% threshold.'
      ],
      paragraphs: ['These are the same capabilities Gartner’s [2025 survey][4] found finance teams already using most, such as knowledge management and anomaly detection, applied to an audit file. The time saved is real; the evidence still has to be checked.']
    },
    {
      heading: 'Where judgement stays',
      paragraphs: [
        'Each clause ends in a statement: whether something is so, and if not, the details. Deciding whether a difference between a bank statement and the books is a reportable non-agreement, whether funds were diverted, or whether a material uncertainty exists about meeting liabilities falling due within a year requires professional judgement and knowledge of the client. AI can surface the facts; it cannot weigh them.',
        'There is also a quieter risk: summaries that miss something. A model asked to summarise board minutes may drop the one line about a fraud investigation. I would never let a summary replace reading the source for clauses dealing with fraud, whistle-blower complaints or defaults.'
      ]
    },
    {
      heading: 'Document the tool like any other procedure',
      paragraphs: [
        'Internal audit now has a standard on this. ICAI’s [SIA 240][3] asks for tool use to be planned, outputs validated for completeness and accuracy, configurations and results documented, and professional judgement applied to all tool-based findings. Statutory auditors are bound by the SAs rather than the SIAs, but the discipline transfers well to a CARO file: record what the tool did, what was checked by a person, and what the conclusion rests on.',
        'For the working-paper side of the same audit, see [AI for audit working papers in India](/blog/2026-09-30-ai-for-audit-working-papers-in-india-what-a-ca-should-automate-and-what-must-stay-human).'
      ]
    }
  ],
  faq: [
    { q: 'How many clauses does CARO 2020 have?', a: 'Paragraph 3 of CARO 2020 sets out matters from clause (i) to clause (xxi). Only clause (xxi) applies to the auditor’s report on consolidated financial statements.' },
    { q: 'Can AI prepare CARO reporting?', a: 'It can assemble and compare evidence for each clause, such as stock statements against books or loan terms against repayments. The statement made under each clause is the auditor’s judgement and must rest on evidence a person has checked.' },
    { q: 'Which companies are exempt from CARO 2020?', a: 'Banking, insurance, section 8, one person and small companies, and private companies that are not a holding or subsidiary of a public company and stay within the order’s limits on capital and reserves, borrowings and revenue.' },
    { q: 'What did CARO 2020 add on bank borrowings?', a: 'Where working capital limits above ₹5 crore were sanctioned on the security of current assets, the auditor reports whether the quarterly returns or statements filed with banks agree with the books.' }
  ],
  related: [L.HUB, L.WP, L.CONTROLS, L.AUDIT]
};
