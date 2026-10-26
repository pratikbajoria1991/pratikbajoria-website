# How Indian CA Firms Can Use AI for GST Reconciliation Without Risking Client Data

> A CA’s playbook for AI on GSTR-2B reconciliation, IMS review and GST notices: what to automate, where the human gate sits, how to protect client data.

Canonical: https://pratikbajoria.com/blog/2026-09-28-how-indian-ca-firms-can-use-ai-for-gst-reconciliation-without-risking-client-data
Last updated: 2026-10-17

CA insights · 2026-09-28 · Updated 7 Oct 2026 · 8 min read

A CA’s playbook for using AI on GSTR-2B reconciliation, IMS review and GST notice replies — what to automate, where the human gate sits, and how to keep client data out of the wrong tools.

Key takeaways

- Since 1 January 2022, section 16(2)(aa) of the CGST Act allows input tax credit only where the supplier has furnished the invoice details and they have been communicated to the recipient.
- Much GSTR-2B matching needs no AI: match deterministically on GSTIN, invoice number and amount, and use AI for messy leftovers and reason coding.
- Under GSTN's IMS FAQs, records with no action are deemed accepted when GSTR-2B is generated, so a named reviewer should take the IMS action.
- Keep GSTR-2B exports and notices out of consumer chatbot accounts; the DPDP Act allows penalties of up to ₹250 crore for failing to take reasonable security safeguards.
- AI can summarise notices and extract dates; the position and the reply stay with the responsible professional.

Every month, somewhere between the 11th and the 20th, most CA practices in India run the same drill. Pull the client’s purchase register, download GSTR-2B, match line by line, chase vendors who have not uploaded, decide what to do with the stragglers, and file GSTR-3B. Add the occasional notice from the department and you have one of the most repetitive, deadline-driven workflows in the profession. It is exactly the kind of work people want to “throw AI at”.

I think that instinct is right — with one condition. GST data is client data. It carries GSTINs, vendor relationships, pricing and, for proprietorships, information that identifies individuals. The question is not whether AI can help with GST reconciliation. It is how to use it so that a partner would be comfortable explaining the set-up to the client, to a peer reviewer, or to the department.

The cost of getting the match wrong is written into the law. Since 1 January 2022, [Section 16(2)(aa) of the CGST Act](https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_CGST_act/active/chapter5/section16_v1.00.html) allows input tax credit only where the supplier has furnished the invoice details and they have been communicated to the recipient, which in practice means they appear in GSTR-2B. An unexplained mismatch is not a clerical loose end. It is credit the client may not be able to claim.

## Where AI genuinely earns its place in GST work

The useful jobs are mostly about language and mess, not tax judgement:

- **Normalising the purchase register.** Vendor names spelled five ways, invoice numbers with and without prefixes, dates in mixed formats. Cleaning these is where most matching time actually goes.
- **Fuzzy matching and reason coding.** Once exact matches are cleared by rules, a model can suggest likely pairs for the remainder and classify mismatches — timing, tax-rate difference, GSTIN error, missing upload — for a human to confirm.
- **Vendor follow-ups.** Drafting polite, specific emails listing the invoices a supplier has not reported, for the article assistant to review and send.
- **Notice triage.** Summarising a notice, extracting reference numbers, periods and due dates, and producing a checklist of documents likely to be needed.

A lot of the matching itself does not need a large language model at all. A well-built spreadsheet or a short script that matches on GSTIN, invoice number and amount is deterministic, auditable and cheap. I use models for the parts rules handle badly: messy text, reason classification and first drafts.

The data has also become more structured. E-invoicing has applied to businesses with aggregate turnover above ₹5 crore [since 1 August 2023](https://www.gstcouncil.gov.in/node/4365), and from 1 April 2025 taxpayers with AATO of ₹10 crore and above [cannot report an e-invoice on the IRP more than 30 days after its date](https://einvoice1.gst.gov.in/Documents/advisory270325.pdf). For a reconciliation team, that means more clean IRN data to match against, and less room to fix a supplier's late reporting after the event.

Where AI fits in GST input tax credit and TDS credit work: AI cleans, matches and flags; people decide IMS actions, eligibility and what is claimed. Source: [CBIC Circular No. 193/05/2023-GST](https://gstcouncil.gov.in/sites/default/files/2024-06/circular-cgst-193.pdf), [GSTN advisory on IMS](https://tutorial.gst.gov.in/downloads/news/revised_advisory_on_ims.pdf), [Income Tax Department, Form No. 168 FAQs](https://www.incometaxindia.gov.in/documents/d/guest/form-168-faqs).

### Text version of this infographic

- **GST, every month:** (1) suppliers save invoices in GSTR-1, IFF or GSTR-1A and they appear in the recipient’s Invoice Management System; (2) the recipient accepts, rejects or keeps each invoice pending, and no action means deemed accepted (a human decision; AI can pre-match to the purchase register); (3) a draft GSTR-2B is generated on the 14th of the next month and must be recomputed if IMS actions change after that; (4) AI cleans the exports, matches on GSTIN, invoice number and amount, and lists exceptions; (5) a reviewer signs off the input tax credit in GSTR-3B, which since 1 January 2022 is limited to the amount communicated in GSTR-2B under section 16(2)(aa) of the CGST Act.
- **TDS credits:** (1) Form 26AS and the Annual Information Statement (Form No. 168 under the Income-tax Act, 2025); (2) AI reads certificates and ledgers and matches them to the statement; (3) AI produces a differences list of missing, short or wrong-PAN credits by deductor; (4) people chase deductors for corrections and decide what is claimed in the return.
- **Keep with people:** eligibility and blocked credits, IMS rejections, fuzzy matches, the final ITC figure and anything that leaves the firm.

## The IMS decision is a control point, not a chore

Since GSTN introduced the Invoice Management System (IMS), recipients can accept, reject or keep pending the records their suppliers report. GSTN’s published FAQs say that records with no action are deemed accepted when GSTR-2B is generated, and that if you change actions after the draft GSTR-2B you need to recompute it before filing GSTR-3B. In other words, silence is a decision.

That makes IMS the natural place for the human gate. Let the tool prepare a recommendation for each record with its reasoning — matched to books, missing in books, rate mismatch, possibly ineligible — and let a named reviewer take the action on the portal. The recommendation file becomes part of your working papers; the portal action remains a professional act.

Illustrative division of work for a CA practice. Adapt thresholds to your own risk assessment.

| GST task | What AI can reasonably do | Human gate | Client-data exposure |
| --- | --- | --- | --- |
| Purchase register clean-up | Standardise vendor names, invoice formats and dates | Spot-check a sample before matching | Medium — keep inside approved tools |
| Books vs GSTR-2B matching | Suggest pairs for non-exact items; classify mismatch reasons | Reviewer confirms matches above a value threshold | Medium — prefer scripts or approved environment |
| IMS accept / reject / pending | Prepare a recommendation with reasoning per record | Named reviewer takes the portal action | Low if only the recommendation file is shared |
| Vendor follow-up | Draft specific reminder emails | Article assistant reviews before sending | Low — share only the vendor’s own invoices |
| Notice triage and reply | Summarise, extract dates, build document checklist and first-draft outline | Professional settles the position and signs the reply | High — notices often contain sensitive facts |

## Keeping client data out of the wrong places

The single most common failure I see is not a bad model. It is an article assistant pasting a client’s GSTR-2B export into a personal chatbot account because the approved tool was slower. So the rules need to be simple enough to remember in the second week of the month:

**Classify first.** Purchase registers, GSTR-2B exports and notices are restricted client data by default. Consumer chatbot accounts are not an approved environment for restricted data.

**Know your role under the DPDP Act.** The Digital Personal Data Protection Act, 2023 makes a data fiduciary responsible for processing done on its behalf by a data processor, allows processors to be engaged only under a valid contract, and requires reasonable security safeguards to prevent a personal data breach. Whether your firm is acting as a fiduciary or a processor for a given engagement is a question worth putting to counsel — but either way your AI vendor’s terms, storage location and retention settings need to be checked, not assumed.

The ceiling is not small. The Act's Schedule allows [a penalty of up to ₹250 crore](https://www.meity.gov.in/static/uploads/2024/02/Digital-Personal-Data-Protection-Act-2023.pdf) for failing to take reasonable security safeguards to prevent a personal data breach, and the DPDP Rules, 2025 were [notified in November 2025](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014) with an 18-month phased timeline.

**Minimise what the model sees.** Reason-coding a mismatch rarely needs the client’s name. Pseudonymise GSTINs and client identifiers where the task allows, and keep the mapping inside your own systems.

**Log it.** Record which tool touched which client file, when, and who reviewed the output. The NIST AI Risk Management Framework is a useful reference for thinking about this proportionately; you do not need its full vocabulary to adopt the habit.

## Notices: faster triage, same accountability

On the GST portal, notices and orders are consolidated under Services › User Services › View Notices and Orders, according to GSTN’s user guide. A practical pattern is a weekly check of that page for each client, with every new item logged into your tracker. AI can then turn a dense notice into a one-page summary: what is alleged, for which period, the reply due date, and the documents you will probably need. It can propose an outline for the reply.

What it cannot do is decide your position. Due dates extracted by a tool should be checked against the portal. The legal reasoning, the facts you rely on and the final reply must be settled by the responsible professional. I would also keep the model’s summary out of anything sent to the department; it is an internal working note.

## How I would start in a practice this month

Pick three clients with messy purchase registers and cooperative contacts. Build the deterministic match first. Add AI only for clean-up and reason coding on the leftovers. Put the IMS recommendation file in front of a named reviewer. Measure two things for one filing cycle: reviewer hours on reconciliation and the number of items still unexplained at filing. If both improve and nobody has touched an unapproved tool, extend to the next group of clients. If not, simplify before you scale.

For the wider context — five-job map, data classes, thin releases — read the [AI for chartered accountants in India](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india) hub. The companion pieces on [AI tools for chartered accountants](https://pratikbajoria.com/blog/best-ai-tools-chartered-accountants-finance-professionals), [where reconciliation automation helps and where it lies](https://pratikbajoria.com/blog/2026-09-20-ecommerce-reconciliation-where-automation-helps-and-where-it-lies) and [AI for audit working papers](https://pratikbajoria.com/blog/2026-09-30-ai-for-audit-working-papers-in-india-what-a-ca-should-automate-and-what-must-stay-human) go deeper on tooling and controls. If you want a structured view of where AI fits across your practice, the [AI Opportunity Audit for CA firms](https://pratikbajoria.com/ai-opportunity-audit-for-ca-firms) is the scoped version, or you can [book a discovery call](https://pratikbajoria.com/#contact).

## Monday-morning checklist

- List the clients whose GST reconciliation takes the most reviewer time; pick three.
- Build deterministic matching (GSTIN, invoice number, amount) before adding any model.
- Write down which tools are approved for GST data and ban consumer chatbot accounts for it.
- Make IMS actions a named reviewer’s job, with the tool’s recommendation filed as a working paper.
- Check each client’s View Notices and Orders page weekly and log every new item.
- After one filing cycle, compare reviewer hours and unexplained items at filing.

## Frequently asked questions

### Can AI decide whether input tax credit is eligible?

No. AI can surface mismatches and suggest likely reasons, but ITC eligibility is a professional judgement on the facts and the law. Treat the tool’s output as a working note that a qualified person reviews before anything is accepted, rejected or claimed.

### Is it safe to upload a client’s GSTR-2B export to ChatGPT or a similar tool?

Not to a consumer chatbot account. Use an approved environment with contractual data-processing terms, access control and retention settings your firm has reviewed, and redact or pseudonymise identifiers where the task allows. Deterministic matching in a spreadsheet or script often needs no AI model at all.

### What happens in IMS if nobody acts on an invoice?

According to GSTN’s published IMS FAQs, records with no action are deemed accepted when GSTR-2B is generated. That is why the accept/reject/pending decision should sit with a named reviewer, even if an AI tool prepares the recommendation.

### Can AI draft replies to GST notices?

It can summarise the notice, extract dates and build a document checklist and a first-draft structure. The position taken, the legal reasoning and the final reply must be settled and signed off by the responsible professional.

## Keep reading in this topic

This guide is part of [AI for Chartered Accountants in India: the implementation hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india).

- [Drafting Replies to GST and Income Tax Notices With AI Without Losing Control](https://pratikbajoria.com/blog/2026-10-12-drafting-replies-to-gst-and-income-tax-notices-with-ai-without-losing-control)
- [AI for Internal Audit in Indian Companies: A Practical Starting Point](https://pratikbajoria.com/blog/2026-10-08-ai-for-internal-audit-in-indian-companies-a-practical-starting-point)
- [Using AI for TDS Reconciliation in Indian CA Firms: From 26AS to Form 168](https://pratikbajoria.com/blog/2026-10-13-using-ai-for-tds-reconciliation-in-indian-ca-firms-from-26as-to-form-168)

Also useful: [AI implementation for finance teams: the CFO and controller guide](https://pratikbajoria.com/ai-implementation-for-finance-teams).

## Sources

- [GSTN — Form GSTR-2B user manual (tutorial.gst.gov.in)](https://tutorial.gst.gov.in/userguide/returns/Manual_gstr2b.htm)
- [GSTN — Frequently Asked Questions on Invoice Management System (IMS)](https://tutorial.gst.gov.in/downloads/news/final_faqs_on_ims_22_09_2024.pdf)
- [GSTN — View Notices and Demand Orders (user guide)](https://tutorial.gst.gov.in/userguide/taxpayersdashboard/View_Notices_and_Demand_Orders.htm)
- [CBIC — GST portal for law, rules and notifications](https://cbic-gst.gov.in/)
- [Digital Personal Data Protection Act, 2023 (Gazette text, MeitY)](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [ICAI — The Institute of Chartered Accountants of India](https://www.icai.org/)
- [CBIC — Section 16, CGST Act, 2017](https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_CGST_act/active/chapter5/section16_v1.00.html)
- [GST Council — Notification 10/2023-Central Tax (e-invoicing above ₹5 crore from 1 August 2023)](https://www.gstcouncil.gov.in/node/4365)
- [GSTN — advisory on the 30-day e-invoice reporting limit for AATO of ₹10 crore and above](https://einvoice1.gst.gov.in/Documents/advisory270325.pdf)
- [MeitY — Digital Personal Data Protection Act, 2023 (Schedule: penalties)](https://www.meity.gov.in/static/uploads/2024/02/Digital-Personal-Data-Protection-Act-2023.pdf)
- [PIB — Government notifies DPDP Rules (14 November 2025)](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014)

*Disclaimer: this article is general educational commentary from implementation work. It is not tax, legal, audit or data-protection advice, and it does not create an adviser–client relationship. GST procedures, portal functionality, Standards on Auditing and data-protection rules change; check the primary sources and take professional advice on your specific facts before acting.*

*Educational content; not financial, investment, or legal advice.*

## Related
- [AI for chartered accountants in India](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india)
- [AI tools for chartered accountants](https://pratikbajoria.com/blog/best-ai-tools-chartered-accountants-finance-professionals)
- [where reconciliation automation helps and where it lies](https://pratikbajoria.com/blog/2026-09-20-ecommerce-reconciliation-where-automation-helps-and-where-it-lies)
- [AI for audit working papers](https://pratikbajoria.com/blog/2026-09-30-ai-for-audit-working-papers-in-india-what-a-ca-should-automate-and-what-must-stay-human)
- [AI Opportunity Audit for CA firms](https://pratikbajoria.com/ai-opportunity-audit-for-ca-firms)
- [Drafting Replies to GST and Income Tax Notices With AI Without Losing Control](https://pratikbajoria.com/blog/2026-10-12-drafting-replies-to-gst-and-income-tax-notices-with-ai-without-losing-control)
- [AI for Internal Audit in Indian Companies: A Practical Starting Point](https://pratikbajoria.com/blog/2026-10-08-ai-for-internal-audit-in-indian-companies-a-practical-starting-point)
- [Using AI for TDS Reconciliation in Indian CA Firms: From 26AS to Form 168](https://pratikbajoria.com/blog/2026-10-13-using-ai-for-tds-reconciliation-in-indian-ca-firms-from-26as-to-form-168)
- [All articles](https://pratikbajoria.com/blog)
