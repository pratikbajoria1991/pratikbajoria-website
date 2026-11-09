# AI for GSTR-9 and GSTR-9C: What a CA Can Automate Before 31 December

> How a CA can use AI to prepare GSTR-9 and GSTR-9C for FY 2025-26, why filing before 30 November can cut off ITC, and what stays human.

Canonical: https://pratikbajoria.com/blog/2026-11-09-ai-for-gstr-9-and-gstr-9c-what-a-ca-can-automate-before-31-december
Last updated: 2026-11-09

CA insights · 2026-11-09 · 6 min read

How a CA can use AI to prepare GSTR-9 and GSTR-9C for FY 2025-26, why filing before 30 November can cut off ITC, and what stays human.

Key takeaways

- GSTR-9 for 2025-26 is due by 31 December 2026; turnover up to ₹2 crore is exempt under Notification No. 15/2025–Central Tax.
- Above ₹5 crore aggregate turnover, a self-certified GSTR-9C must be furnished with the annual return (rule 80(3)).
- Section 16(4) closes 2025-26 ITC on 30 November 2026 or on filing the annual return, whichever is earlier, so do not file GSTR-9 before the unclaimed-credit list is closed.
- From 2024-25 the portal highlights any override of a system-computed value in red, and the highlight stays after filing.
- Let AI build the tie-outs, Table 8A match, HSN split and 9C bridge; keep claims, liabilities and the signature with named people.

Every November the same two dates collide in a CA practice. Input tax credit for 2025-26 has to be taken by 30 November 2026, and the annual return for the same year is due on 31 December 2026. Clients want GSTR-9 done early. Before anyone hands the job to an AI tool or files in a hurry, look at how the two dates interact: filing early can shut a door you did not mean to shut.

This post is for CAs and finance leads preparing GSTR-9 and GSTR-9C for 2025-26: what the law requires, where AI saves hours, and what stays with a person. It builds on my [GSTR-2B reconciliation method](https://pratikbajoria.com/blog/2026-10-19-how-to-use-claude-or-chatgpt-for-gstr-2b-reconciliation-a-ca-s-method); the annual return is where those monthly differences finally have to be explained.

## Who files what for 2025-26

Under [rule 80 of the CGST Rules](https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/rules/cgst_rules/active/chapter8/rule80_v1.00.html), GSTR-9 is due by 31 December following the end of the financial year. A registered person whose aggregate turnover exceeds five crore rupees must also furnish GSTR-9C, a self-certified reconciliation statement, along with it. [Section 44(1) of the CGST Act](https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_CGST_act/active/chapter9/section44_v1.00.html) describes that statement as reconciling the supplies declared in returns with the audited annual financial statement.

At the other end, [Notification No. 15/2025–Central Tax](https://egazette.gov.in/WriteReadData/2025/266213.pdf) of 17 September 2025 exempts registered persons whose aggregate turnover in a financial year is up to two crore rupees from filing the annual return, for 2024-25 onwards. So for 2025-26 the bands are simple: up to two crore, no GSTR-9; above two crore, GSTR-9; above five crore, GSTR-9 and GSTR-9C.

## The 30 November trap

[Section 16(4)](https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_CGST_act/active/chapter5/section16_v1.00.html) says credit on an invoice or debit note cannot be taken after 30 November following the end of the financial year, *or* after furnishing the relevant annual return, whichever is earlier. Read that twice. If a client files GSTR-9 for 2025-26 on 15 November, the window for any 2025-26 credit still sitting unclaimed closes on 15 November, not 30 November.

That is the first job I would give an AI tool this month: list every 2025-26 invoice that appears in GSTR-2B or the purchase register but has not been claimed in a GSTR-3B, with supplier, amount and month. A person decides what to claim before the deadline. Only then should anyone file the annual return.

## What changed on the portal

The [GST portal’s GSTR-9 manual](https://tutorial.gst.gov.in/userguide/returns/Manual_gstr9.htm) sets out several changes that matter for review:

- From 2023-24, Table 8A uses document-wise details from GSTR-2B. It includes only documents the supplier has actually filed, so not everything visible in GSTR-2B will appear there.
- From 2024-25, Table 6 has two new fields, A1 and A2, and some labels were revised.
- From 2024-25, any value that differs from the system-computed figure is highlighted in red as a warning, and the highlight stays after the return is filed.
- From 2024-25, you can download Table 12 HSN data from GSTR-1 and GSTR-1A, consolidated in the format Table 17 needs.

That red highlight matters. Every override of a system figure stays visible on the filed return, so each one needs a written reason in the working paper.

2025-26 also has a mid-year rate change. Most rate changes recommended at the [56th GST Council meeting](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2163555) took effect from 22 September 2025, so rate-wise and HSN-wise totals for the year combine two structures. Splitting turnover before and after that date is exactly the kind of mechanical sorting a tool does well.

## Where AI genuinely helps

- **Building the year-long tie-out.** Books against GSTR-1 against GSTR-3B, month by month, for outward supply and tax paid. The tool produces the table; every difference gets a reason column.
- **Table 8A against the books.** Matching the downloaded Table 8A document file to the purchase register, flagging supplier-not-filed, wrong GSTIN, duplicate and blocked-credit candidates.
- **HSN and rate splits.** Mapping item masters to HSN codes, consolidating Table 12 data for Table 17, and separating periods before and after 22 September 2025.
- **The 9C bridge.** Drafting the reconciliation from audited turnover to GST turnover: unbilled revenue, credit notes, advances, deemed supplies and non-GST income, each with the ledger it came from.

## Where judgement stays human

Four things should not be delegated. Whether to claim, reverse or pay on a difference is a tax position. Whether an unexplained gap is timing or under-declaration needs facts the ledger does not hold. Paying any additional liability through DRC-03 is a decision for the client and the partner. And GSTR-9C is self-certified, which means the client’s signatory owns every line, whoever drafted it.

The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) frames this as mapping where a system is used and managing the risk at that point. Here that means: the tool prepares, a person decides, and the decision is written down.

Decision rubric for GSTR-9 and GSTR-9C work. Evaluation framework only; adapt it to your practice. Not legal advice or benchmark data.

| Task | AI role | Minimum review gate | Stop if |
| --- | --- | --- | --- |
| Unclaimed 2025-26 credit list | Automate | Manager decides each claim before 30 November | Anyone plans to file GSTR-9 before this list is closed |
| Books v GSTR-1 v GSTR-3B tie-out | Automate the comparison | Every difference above your threshold has a reason | Source files do not cover all twelve months |
| Table 8A against purchase register | Assist | Senior reviews blocked and ineligible credit flags | Eligibility is decided by keyword alone |
| HSN and pre/post 22 September split | Assist | Spot-check item mapping against invoices | The item master has no HSN field |
| Overrides of system-computed values | Draft reasons only | Manager approves each override in writing | An override has no evidence on file |
| GSTR-9C bridge to audited accounts | Assist (first draft) | Partner ties totals to signed financial statements | Accounts are not yet final |
| Additional liability, DRC-03, filing | Human only | Client signatory approves after partner review | The tool’s explanation is copied in as the conclusion |

## A workflow I would actually run

Start with one client above five crore. Export twelve months of GSTR-1, GSTR-3B and GSTR-2B summaries, the Table 8A file, the HSN download and the trial balance. Strip customer and employee personal data first, and use a business AI plan whose retention terms a partner has read, as my [DPDP rubric for CA firms](https://pratikbajoria.com/blog/2026-10-19-dpdp-act-and-ai-in-ca-firms-in-india-a-client-data-decision-rubric) sets out. A person writes the mapping rules; the tool builds the tables. Review the reasons, not the rows that agree.

The deliverable is a short evidence pack: the tie-outs, the unclaimed-credit decision log, every system-value override with its reason, the 9C bridge and the name of each reviewer. If the same team also files [AOC-4 and MGT-7](https://pratikbajoria.com/blog/2026-10-28-ai-for-aoc-4-and-mgt-7-filings-what-a-ca-can-automate-before-the-roc-deadline), reuse the master data. To roll it out across the client book, follow the [90-day pilot guide for CA firms](https://pratikbajoria.com/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india).

## Monday-morning checklist

- Sort every GST client into three bands for 2025-26: up to two crore, above two crore, above five crore.
- Confirm all GSTR-1 and GSTR-3B returns for 2025-26 are filed for each GSTIN, so the annual return tile opens.
- Run the unclaimed-credit list and get decisions in before 30 November 2026. Do not file GSTR-9 before that.
- Download the Table 8A file and the HSN report for each GSTIN and store them with the working paper.
- Split rate-wise turnover at 22 September 2025.
- Agree who approves each override of a system-computed value, and who signs GSTR-9C.

To see where this sits among the other workflows in a practice, start from the [AI for Chartered Accountants in India hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india). To find which compliance work is worth automating first, take the [free AI Opportunity Scorecard](https://pratikbajoria.com/scorecard), see the scoped [AI Opportunity Audit](https://pratikbajoria.com/audit), or [book a discovery call](https://pratikbajoria.com/#contact).

## Frequently asked questions

### Who must file GSTR-9 and GSTR-9C for FY 2025-26?

Registered persons whose aggregate turnover exceeds two crore rupees file GSTR-9 by 31 December 2026; those up to two crore are exempt under Notification No. 15/2025–Central Tax. Above five crore rupees, a self-certified GSTR-9C must also be furnished with the annual return under rule 80(3) of the CGST Rules.

### Does filing GSTR-9 early affect input tax credit?

Yes. Under section 16(4) of the CGST Act, credit for a year cannot be taken after 30 November following that year or after the annual return is furnished, whichever is earlier. Filing GSTR-9 for 2025-26 before 30 November 2026 closes the credit window on the filing date.

### Can AI prepare GSTR-9C?

AI can draft the reconciliation between audited turnover and GST returns and list the reasons for each difference. GSTR-9C is self-certified, so the client’s signatory owns every figure, and a CA or finance lead should review the bridge against the signed financial statements before filing.

## Keep reading in this topic

Part of [AI for Chartered Accountants in India: the implementation hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india).

- [How to Use Claude or ChatGPT for GSTR-2B Reconciliation: A CA’s Method](https://pratikbajoria.com/blog/2026-10-19-how-to-use-claude-or-chatgpt-for-gstr-2b-reconciliation-a-ca-s-method)
- [How Indian CA firms can use AI for GST reconciliation without risking client data](https://pratikbajoria.com/blog/2026-09-28-how-indian-ca-firms-can-use-ai-for-gst-reconciliation-without-risking-client-data)
- [AI for AOC-4 and MGT-7 Filings: What a CA Can Automate Before the ROC Deadline](https://pratikbajoria.com/blog/2026-10-28-ai-for-aoc-4-and-mgt-7-filings-what-a-ca-can-automate-before-the-roc-deadline)

Also useful: [AI Opportunity Audit for CA firms](https://pratikbajoria.com/ai-opportunity-audit-for-ca-firms).

## Sources

- [CBIC — Section 44, CGST Act, 2017: Annual return](https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_CGST_act/active/chapter9/section44_v1.00.html)
- [CBIC — Rule 80, CGST Rules, 2017: Annual return and GSTR-9C](https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/rules/cgst_rules/active/chapter8/rule80_v1.00.html)
- [Gazette of India — Notification No. 15/2025–Central Tax, S.O. 4205(E), 17 September 2025 (annual return exemption up to ₹2 crore)](https://egazette.gov.in/WriteReadData/2025/266213.pdf)
- [CBIC — Section 16, CGST Act, 2017: Eligibility and conditions for input tax credit](https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_CGST_act/active/chapter5/section16_v1.00.html)
- [GST portal user manual — Form GSTR-9](https://tutorial.gst.gov.in/userguide/returns/Manual_gstr9.htm)
- [GST portal — FAQs and user manual: GSTR-9C offline utility](https://tutorial.gst.gov.in/downloads/gstr9cofflineutilitynew.pdf)
- [PIB — Recommendations of the 56th meeting of the GST Council (3 September 2025)](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2163555)
- [NIST — AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

*Disclaimer: this article is general educational commentary from implementation work. It is not tax or legal advice. Thresholds, due dates, form tables and portal behaviour change by notification and GSTN update; verify the primary text and take professional advice before claiming credit, paying liability or filing an annual return.*

*Educational content; not financial, investment, or legal advice.*

## Related
- [GSTR-2B reconciliation method](https://pratikbajoria.com/blog/2026-10-19-how-to-use-claude-or-chatgpt-for-gstr-2b-reconciliation-a-ca-s-method)
- [DPDP rubric for CA firms](https://pratikbajoria.com/blog/2026-10-19-dpdp-act-and-ai-in-ca-firms-in-india-a-client-data-decision-rubric)
- [AOC-4 and MGT-7](https://pratikbajoria.com/blog/2026-10-28-ai-for-aoc-4-and-mgt-7-filings-what-a-ca-can-automate-before-the-roc-deadline)
- [90-day pilot guide for CA firms](https://pratikbajoria.com/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india)
- [AI for Chartered Accountants in India hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india)
- [free AI Opportunity Scorecard](https://pratikbajoria.com/scorecard)
- [AI Opportunity Audit](https://pratikbajoria.com/audit)
- [How Indian CA firms can use AI for GST reconciliation without risking client data](https://pratikbajoria.com/blog/2026-09-28-how-indian-ca-firms-can-use-ai-for-gst-reconciliation-without-risking-client-data)
- [All articles](https://pratikbajoria.com/blog)
