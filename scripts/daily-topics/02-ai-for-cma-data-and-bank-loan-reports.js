const S = require('./_sources');
const L = require('./_links');
module.exports = {
  title: 'AI for CMA Data and Bank Loan Project Reports: A CA’s Review Checklist',
  category: 'CA insights',
  image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=85',
  keywords: ['ai tool for cma data preparation', 'ai for project report', 'CMA data for bank loan', 'working capital assessment MSME', 'AI for CA practices'],
  excerpt: 'AI tools now promise CMA data in minutes. What a CA should still check before a projection goes to the bank: turnover method, ratios, assumptions and evidence.',
  sources: [S.rbiMsmeFaq, S.wefMsme, S.msmeBudget],
  intro: [
    'Search for “AI tool for CMA data preparation” and almost every result is a software landing page promising a bank-ready CMA report in minutes, often with a line about saving the CA’s fee. I have no quarrel with faster spreadsheets. My concern is what gets lost: CMA data is a set of forward-looking claims that a banker will hold the borrower to, and sometimes the CA who prepared them.',
    'Here is how I would use AI in CMA and project report work for MSME clients, and the review checklist I would keep regardless of which tool builds the first draft.'
  ],
  sections: [
    {
      heading: 'Why this work matters more than it looks',
      paragraphs: [
        'Formal credit is still hard for small businesses to get. The [AI playbook for India’s SMEs][2], published by the World Economic Forum with IndiaAI and the Office of the Principal Scientific Adviser in August 2025, says only 19% of MSME credit demand in India is met through formal sources, and that informal lenders typically charge 12 to 16% more. A well-prepared, credible loan file is one of the most practical things a CA can do for a client.',
        'That is also why speed alone is the wrong goal. A projection that is quick but unsupported can get a proposal rejected, or worse, sanctioned on numbers the business cannot meet.'
      ]
    },
    {
      heading: 'Know which assessment method the bank will apply',
      paragraphs: [
        'The [RBI’s MSME FAQs][1] note that banks must appraise genuine working capital needs keeping the business cycle in mind, and that under the Nayak Committee approach, working capital limits for small units are computed at a minimum of 20% of estimated turnover for credit limits up to ₹5 crore. The same FAQs state that banks are mandated not to take collateral security for loans up to ₹10 lakh to units in the MSE sector.',
        'An AI tool will happily compute both the turnover method and the traditional MPBF approach. Your job is to know which one the lender will use for this client and to make sure the projected turnover behind it is defensible.'
      ]
    },
    {
      heading: 'Where AI genuinely helps',
      bullets: [
        'Extracting audited financials from PDFs into the operating statement and balance sheet formats, with a reconciliation back to the signed accounts.',
        'Rolling forward projections from a short list of stated assumptions, and recalculating every form when one assumption changes.',
        'Computing ratios consistently (current ratio, DSCR, debt-equity, holding periods) and flagging the ones that look out of line with the sector or with history.',
        'Drafting the narrative sections of a project report from your notes: business background, the purpose of the loan and the repayment logic.',
        'Preparing a list of questions the banker is likely to ask, so the client can gather evidence before the meeting.'
      ]
    },
    {
      heading: 'The CA’s review checklist',
      bullets: [
        'Tie the historical columns to the audited financial statements and the filed GST returns, line by line.',
        'Write down every projection assumption (growth, margins, debtor and creditor days, capex timing) and the evidence for it: order book, contracts, capacity, past trend.',
        'Check that projected receivable and inventory days are consistent with what the business has actually achieved, not what the tool defaults to.',
        'Recalculate DSCR yourself for at least one year and compare it with the tool’s figure.',
        'Confirm the client’s MSME classification. The [Union Budget 2025-26][3] raised the investment and turnover limits by 2.5 and 2 times, so older Udyam data may be out of date.',
        'Read the generated narrative as the banker would. Remove any sentence the client cannot evidence.'
      ]
    },
    {
      heading: 'Red flags in AI-generated projections',
      paragraphs: [
        'The patterns I would watch for are smooth hockey-stick growth with no capacity explanation, margins that improve every year without a reason, working capital that shrinks as sales grow, and a balance sheet that “balances” only because a plug sits in other current liabilities. Tools that auto-balance projections are convenient, but the plug figure is exactly where the judgement belongs.',
        'Also be careful with any tool that writes credit notes or approval probabilities. A banker will form their own view; a document that oversells is more likely to lose trust than to win a sanction.'
      ]
    },
    {
      heading: 'Keep the working file',
      paragraphs: [
        'Keep the source documents, the assumption sheet, the tool’s output and your review notes together in the client file. If the bank asks how a figure was derived, or the account comes under stress later, you will want to show the basis rather than a screenshot of a tool. The same habit underpins my [AI controls checklist for CA firms](/blog/ai-controls-checklist-ca-firms-india).'
      ]
    }
  ],
  faq: [
    { q: 'Can AI prepare CMA data for a bank loan?', a: 'AI tools can extract financials, build the CMA forms, roll forward projections and compute ratios quickly. A CA still needs to tie the history to audited accounts, evidence every assumption and review the plug figures before the file goes to the bank.' },
    { q: 'How do banks assess working capital for small businesses?', a: 'The RBI’s MSME FAQs say banks should appraise genuine requirements based on the business cycle, and that under the Nayak Committee approach limits for small units are computed at a minimum of 20% of estimated turnover for credit limits up to ₹5 crore.' },
    { q: 'Is collateral needed for small MSE loans?', a: 'According to the RBI’s MSME FAQs, banks are mandated not to accept collateral security for loans up to ₹10 lakh to units in the MSE sector.' },
    { q: 'What should a CA check in an AI-generated project report?', a: 'The tie-out of historical figures, the evidence for each projection assumption, consistency of working capital days, a manual DSCR check, the client’s current MSME classification and any claims in the narrative the client cannot support.' }
  ],
  related: [L.HUB, L.CONTROLS, L.AUTO_HUB, L.AUDIT]
};
