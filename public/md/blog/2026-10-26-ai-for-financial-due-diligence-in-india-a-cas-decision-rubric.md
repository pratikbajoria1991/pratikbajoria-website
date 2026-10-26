# AI for Financial Due Diligence in India: A CA’s Decision Rubric

> Where AI helps in financial due diligence in India, from data-room triage to ledger analytics, and where a CA’s judgement, NDAs and SEBI UPSI rules stay in charge.

Canonical: https://pratikbajoria.com/blog/2026-10-26-ai-for-financial-due-diligence-in-india-a-cas-decision-rubric
Last updated: 2026-10-26

CA insights · 2026-10-26 · 7 min read

Where AI helps in financial due diligence in India, from data-room triage to ledger analytics, and where a CA’s judgement, NDAs and SEBI UPSI rules stay in charge.

Key takeaways

- AI can index the data room, scan ledgers, extract contract clauses, run reconciliations and draft narrative; each output is a list for a reviewer, not a conclusion.
- Quality-of-earnings adjustments, net debt, normalised working capital, tax exposures and the signed conclusions stay with the CA.
- Check the NDA before any upload, and use only business AI plans whose training and retention terms a partner has read.
- For a listed target, SEBI’s insider trading regulations require confidentiality agreements for UPSI shared in a transaction and a structured digital database with time stamps and audit trails.
- SEBI-regulated intermediaries are solely responsible for the output of AI tools they rely on, whether built or bought.

Financial due diligence is a CA assignment where someone else’s deal sets the deadline. The data room opens late, ledgers arrive in three formats, and the buyer wants a quality-of-earnings view before the term sheet goes stale. Firms increasingly ask me whether AI can read the data room, find the adjustments and draft the report.

My answer, as a chartered accountant with a Big 4 background who now builds AI workflows for finance teams, is that AI can take a real share of the reading and sorting. It cannot own the numbers that change the price. Below: where the line sits, the confidentiality rules that apply before any upload, and a rubric for deciding, task by task, what a tool may do.

## What AI is genuinely good at in a diligence file

Most diligence hours go into finding, sorting and reconciling, not concluding. That is where AI helps:

- **Data-room triage.** Indexing documents against the information request list and flagging what is missing, so gaps are chased in week one.
- **Ledger analytics.** Flagging large, unusual or round-sum entries and year-end reversals as candidates for normalisation, not conclusions.
- **Contract extraction.** Pulling change-of-control clauses, guarantees and termination rights from key agreements into one schedule.
- **Reconciliations.** Tying the trial balance to audited accounts and GST returns to revenue, with every difference listed for a person to explain.
- **First drafts.** Draft narrative and a running question list for management, from reviewed schedules.

Each produces a list for a person to work through: the tool narrows the haystack; the reviewer decides what is a needle.

## What must stay with the CA

Whatever moves the price or the sale and purchase agreement is judgement, and I would not delegate it:

- **Quality-of-earnings adjustments.** Whether an item is truly non-recurring depends on facts the ledger does not hold.
- **Net debt and debt-like items.** Deferred consideration, unpaid statutory dues and disputed liabilities need a view on substance, not a keyword match.
- **Normalised working capital and tax exposures.** Seasonality and pending GST or income-tax matters need management conversations and professional assessment.
- **The conclusions and the signature.** Whoever signs owns every number, including those a tool proposed.

The [NIST Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence) names “confabulation”, confidently stated false content, as a core risk of generative AI. In diligence that is a plausible clause summary of a contract that says something else. Every extracted figure should trace to a page reference a reviewer has opened.

## Confidentiality comes before the first upload

Diligence information arrives under a non-disclosure agreement. Before choosing a tool, settle three questions.

**Does the NDA allow it?** Many NDAs limit disclosure to named advisers. Check whether a third-party AI service fits the permitted use; ask the counterparty if unclear. Use only business plans whose terms you have read; [OpenAI’s enterprise privacy page](https://openai.com/enterprise-privacy/) and [Microsoft’s Copilot privacy documentation](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy) set out training, retention and access commitments for their business products. Consumer accounts are out.

**Is the target listed?** If so, much of what you see may be unpublished price sensitive information. Under the [SEBI (Prohibition of Insider Trading) Regulations, 2015](https://www.sebi.gov.in/legal/regulations/mar-2025/securities-and-exchange-board-of-india-prohibition-of-insider-trading-regulations-2015-last-amended-on-march-12-2025-_92672.html), regulation 3(3) allows UPSI to be shared for certain transactions, regulation 3(4) requires the parties to sign confidentiality and non-disclosure agreements, and regulation 3(5) requires a structured digital database recording who UPSI was shared with, maintained internally with time stamps and audit trails. Before any UPSI goes into an AI tool, ask counsel how the tool fits that framework.

**Is there personal data?** Payroll files, employee lists and promoter KYC are personal data under the [Digital Personal Data Protection Act, 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf). Mask what the analysis does not need; my [DPDP Act and AI client-data rubric for CA firms](https://pratikbajoria.com/blog/2026-10-19-dpdp-act-and-ai-in-ca-firms-in-india-a-client-data-decision-rubric) covers the steps.

If your firm is a SEBI-registered intermediary, such as a merchant banker, note that the [SEBI (Intermediaries) (Amendment) Regulations, 2025](https://www.sebi.gov.in/sebi_data/attachdocs/feb-2025/1739276753544.pdf) make a regulated person solely responsible for data privacy, for the output of AI tools it relies on and for legal compliance, whether the tool is built in-house or bought. SEBI’s [June 2025 consultation paper on responsible AI/ML usage](https://www.sebi.gov.in/reports-and-statistics/reports/jun-2025/consultation-paper-on-guidelines-for-responsible-usage-of-ai-ml-in-indian-securities-markets_94687.html) proposes model governance, testing and data privacy principles.

## A decision rubric for AI in financial due diligence

Before each engagement, agree the AI role, review gate and stop condition for every workstream. The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) organises this as govern, map, measure and manage; the rubric is the “map” step for a single deal.

Evaluation framework only. Adapt it to your engagement; this is not legal advice or benchmark data.

| Diligence workstream | AI role | Minimum review gate | Stop if |
| --- | --- | --- | --- |
| Data-room indexing and gap list | Automate | Associate checks the gap list against the request list | Tool cannot see all folders, or the NDA bars third-party processing |
| General ledger scan for unusual entries | Automate | Senior reviews every flagged entry before it becomes an adjustment | Ledger export incomplete or not tied to the trial balance |
| Contract clause extraction | Assist | Each clause checked against the page reference | Summaries without page references |
| Trial balance, GST and TDS reconciliations | Assist | Every difference explained by a person, with evidence | Differences closed by the tool without explanation |
| Quality-of-earnings adjustments | Human only; AI may list candidates | Engagement lead decides and documents each adjustment | Any adjustment proposed and accepted without management discussion |
| Net debt, debt-like items and working capital | Human only | Engagement lead and partner | Classification driven by keywords alone |
| Tax exposure assessment | Human only | Tax specialist assesses likelihood and amount | Exposure amounts taken from a model summary |
| Report narrative | Assist (first draft) | Partner reviews every number against schedules | Draft issued before schedules are final |
| UPSI or personal data of a listed target | Stop until cleared | Counsel and partner approve the approach for the deal | No confidentiality agreement or structured digital database entry |

What decides the role is how directly the output feeds the price and how sensitive the input is. Model quality is secondary.

## Where this fits in a CA practice

Diligence is a good place to prove AI value: heavy reading, fixed timetable. Run the first engagement in parallel with the usual process, as in the [90-day AI pilot playbook for CA firms](https://pratikbajoria.com/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india), and apply the review gates in the [AI controls checklist for CA firms](https://pratikbajoria.com/blog/ai-controls-checklist-ca-firms-india). The ledger-scanning approach overlaps with [AI for audit working papers](https://pratikbajoria.com/blog/2026-09-30-ai-for-audit-working-papers-in-india-what-a-ca-should-automate-and-what-must-stay-human); reuse what your audit team has validated.

For the wider map, start at the [AI for chartered accountants in India](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india) hub. To score your own opportunities, take the free [AI Opportunity Scorecard](https://pratikbajoria.com/scorecard), see the scoped [AI Opportunity Audit](https://pratikbajoria.com/audit), or [book a discovery call](https://pratikbajoria.com/#contact).

## Monday-morning checklist

- Pull your standard information request list and mark each line automate, assist or human only, using the rubric above.
- Read the NDA template you sign most often and note whether third-party processing by an AI service is permitted.
- Confirm the firm has a business plan for its AI tool, with training and retention terms filed by a partner.
- Write a one-line rule: no UPSI from a listed target goes into any tool until counsel has cleared the approach for that deal.
- Require a page reference against every figure a tool extracts, and spot-check them before review.
- Name the reviewer for quality-of-earnings, net debt and tax exposures on the next mandate.

## Frequently asked questions

### Can AI do financial due diligence in India?

AI can index the data room, scan ledgers, extract contract clauses, run reconciliations and draft narrative. Quality-of-earnings adjustments, net debt, tax exposures and the conclusions need a qualified professional who reviews the evidence and signs the report.

### Is it safe to upload data-room documents to ChatGPT or Copilot?

Only if the NDA permits it, the firm uses a business plan whose data terms have been read, personal data is masked and access is limited to the deal team. Consumer accounts should not be used for diligence files.

### Does SEBI regulate AI use in due diligence on listed companies?

The SEBI insider trading regulations govern how UPSI is shared, including confidentiality agreements and a structured digital database. SEBI-regulated intermediaries are also solely responsible for the output of AI tools they rely on. Take legal advice on the specific deal.

## Keep reading in this topic

This guide is part of [AI for Chartered Accountants in India: the implementation hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india).

- [DPDP Act and AI in CA Firms in India: A Client-Data Decision Rubric](https://pratikbajoria.com/blog/2026-10-19-dpdp-act-and-ai-in-ca-firms-in-india-a-client-data-decision-rubric)
- [Finance AI ROI for Mid-Market Companies in India: A CA's Decision Rubric](https://pratikbajoria.com/blog/2026-10-12-finance-ai-roi-for-mid-market-companies-in-india-a-cas-decision-rubric)
- [AI Controls Checklist for CA Firms in India: Practical Review Gates](https://pratikbajoria.com/blog/ai-controls-checklist-ca-firms-india)

Also useful: [AI implementation for finance teams: the CFO and controller guide](https://pratikbajoria.com/ai-implementation-for-finance-teams).

## Sources

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [NIST AI 600-1 — Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)
- [SEBI — (Prohibition of Insider Trading) Regulations, 2015 \[last amended on 12 March 2025\]](https://www.sebi.gov.in/legal/regulations/mar-2025/securities-and-exchange-board-of-india-prohibition-of-insider-trading-regulations-2015-last-amended-on-march-12-2025-_92672.html)
- [SEBI — (Intermediaries) (Amendment) Regulations, 2025: responsibility for the use of AI (Gazette, 6 February 2025)](https://www.sebi.gov.in/sebi_data/attachdocs/feb-2025/1739276753544.pdf)
- [SEBI — Consultation paper on guidelines for responsible usage of AI/ML in Indian securities markets (20 June 2025)](https://www.sebi.gov.in/reports-and-statistics/reports/jun-2025/consultation-paper-on-guidelines-for-responsible-usage-of-ai-ml-in-indian-securities-markets_94687.html)
- [Digital Personal Data Protection Act, 2023 (Gazette text, MeitY)](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf)
- [OpenAI — Enterprise privacy](https://openai.com/enterprise-privacy/)
- [Microsoft Learn — Data, privacy and security for Microsoft 365 Copilot](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy)

*Disclaimer: this article is general educational commentary from implementation work. It is not legal, tax, audit, securities-law, valuation or investment advice, and it does not create an adviser–client relationship. SEBI regulations, the DPDP Act and vendor terms change; verify primary sources and take professional advice on your specific transaction before acting.*

*Educational content; not financial, investment, or legal advice.*

## Related
- [DPDP Act and AI client-data rubric for CA firms](https://pratikbajoria.com/blog/2026-10-19-dpdp-act-and-ai-in-ca-firms-in-india-a-client-data-decision-rubric)
- [90-day AI pilot playbook for CA firms](https://pratikbajoria.com/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india)
- [AI controls checklist for CA firms](https://pratikbajoria.com/blog/ai-controls-checklist-ca-firms-india)
- [AI for audit working papers](https://pratikbajoria.com/blog/2026-09-30-ai-for-audit-working-papers-in-india-what-a-ca-should-automate-and-what-must-stay-human)
- [AI for chartered accountants in India](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india)
- [AI Opportunity Scorecard](https://pratikbajoria.com/scorecard)
- [AI Opportunity Audit](https://pratikbajoria.com/audit)
- [Finance AI ROI for Mid-Market Companies in India: A CA's Decision Rubric](https://pratikbajoria.com/blog/2026-10-12-finance-ai-roi-for-mid-market-companies-in-india-a-cas-decision-rubric)
- [All articles](https://pratikbajoria.com/blog)
