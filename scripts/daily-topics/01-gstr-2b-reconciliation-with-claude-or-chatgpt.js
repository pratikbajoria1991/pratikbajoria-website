const S = require('./_sources');
const L = require('./_links');
module.exports = {
  title: 'How to Use Claude or ChatGPT for GSTR-2B Reconciliation: A CA’s Method',
  category: 'CA insights',
  image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=85',
  keywords: ['claude ai for gst reconciliation', 'ai tool for gstr 2b reconciliation', 'chatgpt gst reconciliation prompt', 'GSTR-2B reconciliation AI', 'IMS GST'],
  excerpt: 'A CA’s step-by-step method for GSTR-2B reconciliation with Claude or ChatGPT: what to upload, the prompt structure, IMS actions and the checks before 3B.',
  sources: [S.cbic193, S.ims, S.dpdpRules],
  intro: [
    'Most of what ranks today for “Claude AI for GST reconciliation” is a LinkedIn post with a copy-paste prompt, or a vendor page selling a tool. The prompts are not wrong. What they leave out is the part that decides whether the input tax credit you claim is defensible: what the law says GSTR-2B is for, what the Invoice Management System changes, and which matches a person must check before GSTR-3B goes in.',
    'This is the method I would hand to a senior article assistant in a CA firm. It works with Claude, ChatGPT or Copilot, and it keeps the professional judgement where it belongs.'
  ],
  sections: [
    {
      heading: 'Why GSTR-2B is the file that matters',
      paragraphs: [
        'Since 1 January 2022, after clause (aa) was inserted in section 16(2) of the CGST Act, input tax credit can be availed only to the extent communicated in GSTR-2B. CBIC set this out plainly in [Circular No. 193/05/2023-GST][1]. So the reconciliation is not a nice-to-have report. It is the evidence that each rupee of credit in GSTR-3B is backed by a supplier filing.',
        'That changes how you should use AI. The model is a fast matching assistant. It is not the authority on eligibility, blocked credits or time limits, and it should never be the last step before filing.'
      ]
    },
    {
      heading: 'Account for IMS before you reconcile',
      paragraphs: [
        'The [GSTN advisory on the Invoice Management System][2] explains that a recipient can accept, reject or keep pending each invoice the supplier saves in GSTR-1, IFF or GSTR-1A. Invoices with no action are deemed accepted and move into GSTR-2B. A draft GSTR-2B is generated on the 14th of the following month, and if you act on invoices after that you need to recompute it before filing GSTR-3B.',
        'In practice this means two passes. First, reconcile the purchase register against the IMS dashboard and decide accept, reject or pending. Second, reconcile against the final GSTR-2B you will actually rely on. Asking an AI tool to compare against a stale 2B download is the most common mistake I see.'
      ]
    },
    {
      heading: 'The step-by-step workflow',
      bullets: [
        'Export the purchase register from Tally, Zoho Books or the client’s ERP as CSV, with supplier GSTIN, invoice number, invoice date, taxable value and each tax head in separate columns.',
        'Download GSTR-2B (and the IMS view, if you are still deciding actions) from the portal in Excel.',
        'Clean both files first: remove subtotal rows, standardise dates and strip spaces and prefixes from invoice numbers. Ask the model to do this as a separate step and to show you the rows it dropped.',
        'Ask for matching on GSTIN plus normalised invoice number first, then on GSTIN plus amount within a small tolerance, and keep the two result sets separate so you can see which matches were fuzzy.',
        'Request four output tables: exact matches, amount or date differences, in books but not in 2B, and in 2B but not in books.',
        'Have the model draft supplier follow-up emails for the missing items, but send them yourself.'
      ]
    },
    {
      heading: 'A prompt structure that holds up',
      paragraphs: [
        'Good prompts for this work are specific about columns, tolerances and outputs, and they forbid guessing. I write them in this order: describe each file and its columns; state the matching keys and the tolerance; list the output tables; and add two rules: “do not infer missing GSTINs” and “list every row you could not classify”.',
        'Then test the prompt on a month you have already reconciled by hand. If the AI result differs from your manual working, find out why before you trust it on a live month. That one test teaches a team more about the tool’s limits than any training video.'
      ]
    },
    {
      heading: 'What must stay with the reviewer',
      bullets: [
        'Eligibility: blocked credits, personal use and the other conditions in section 16 and section 17 are judgements, not matches.',
        'Fuzzy matches: anything matched on amount alone, or with a changed invoice number, needs a human look at the invoice.',
        'Rejections in IMS: rejecting an invoice affects the supplier too, so the decision should sit with someone who knows the commercial relationship.',
        'The final ITC figure in GSTR-3B: a partner or manager should tie it to the reconciliation and sign off.'
      ]
    },
    {
      heading: 'Data protection is part of the method',
      paragraphs: [
        'Purchase registers for proprietors and small firms often contain personal data. The [DPDP Rules, 2025][3] were notified in November 2025 with a phased timeline, so now is the time to decide which AI accounts may receive client files. Use a business or enterprise plan with training on your data switched off, keep files in firm-controlled storage, and remove fields the matching does not need. My [AI controls checklist for CA firms](/blog/ai-controls-checklist-ca-firms-india) has the wider list.'
      ]
    }
  ],
  faq: [
    { q: 'Can Claude or ChatGPT do GSTR-2B reconciliation?', a: 'They can clean the files, match invoices on GSTIN, invoice number and amount, and produce exception tables quickly. They cannot decide eligibility or replace the reviewer’s sign-off on the ITC claimed in GSTR-3B.' },
    { q: 'Why reconcile with GSTR-2B rather than GSTR-2A?', a: 'From 1 January 2022, section 16(2)(aa) of the CGST Act limits input tax credit to the extent communicated in GSTR-2B, as CBIC Circular No. 193/05/2023-GST confirms.' },
    { q: 'How does IMS affect reconciliation?', a: 'Under IMS a recipient accepts, rejects or keeps invoices pending. Deemed-accepted and accepted invoices flow into GSTR-2B. If you act after the draft 2B is generated on the 14th, recompute GSTR-2B before filing GSTR-3B.' },
    { q: 'Is it safe to upload client purchase registers to an AI tool?', a: 'Only to a firm-approved business account with training on your data switched off and retention settings you have checked. Remove fields the matching does not need, and record which tool processed which client file.' }
  ],
  related: [L.GST, L.CONTROLS, L.NOTICES, L.HUB]
};
