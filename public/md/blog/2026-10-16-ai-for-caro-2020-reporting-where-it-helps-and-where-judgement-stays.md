# AI for CARO 2020 Reporting: Where It Helps and Where Judgement Stays

> CARO 2020 asks auditors for a statement on 21 clauses. A clause-by-clause guide to where AI can assemble the evidence, what the auditor must still decide, and how to document the tool.

Canonical: https://pratikbajoria.com/blog/2026-10-16-ai-for-caro-2020-reporting-where-it-helps-and-where-judgement-stays
Last updated: 2026-10-22

CA insights · 2026-10-16 · 8 min read

CARO reporting is a good test of where AI belongs in a statutory audit. Most clauses need the auditor to find, assemble and check specific evidence: title deeds, inventory verification results, loan terms, quarterly returns to banks, statutory dues, whistle-blower complaints. That is laborious and well suited to machines. Each clause then ends in a statement the auditor signs, and that part is not.

Having spent my early years on Big 4 audit files, I know how much of a CARO working is hunting for documents rather than thinking. This guide goes clause by clause: what the order asks, where a tool genuinely saves time, and where the auditor’s judgement has to stay in charge.

## What CARO 2020 asks for

The [Companies (Auditor’s Report) Order, 2020](https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=199571) was issued on 25 February 2020 under section 143(11) of the Companies Act, 2013, replacing CARO 2016. Its start date was deferred twice; ICAI’s [announcement of 19 December 2020](https://icai.org/post/extension-applicability-date-caro-2020-for-one-year) confirms that, after the Ministry of Corporate Affairs order of 17 December 2020, it applies to financial years commencing on or after 1 April 2021. FY 2021-22 was therefore the first year reported under it, and this year’s audits are its fifth cycle.

- Discrepancies of 10% or more in the aggregate of each class of inventory found on physical verification.
- Whether quarterly returns or statements filed with banks agree with the books, where working capital limits above ₹5 crore were sanctioned on the security of current assets.
- A prescribed lender-wise format for defaults in repaying loans or interest, and whether the company is a declared wilful defaulter.
- Whether term loans were used for the purpose obtained, and details of any diversion.
- Cash losses in the current and preceding year, resignation of statutory auditors, and whistle-blower complaints considered by the auditor.

The [order’s text](https://taxguru.in/company-law/caro-2020.html) sets out the matters in paragraph 3 from clause (i) to clause (xxi), and it does not apply to reports on consolidated financial statements except for clause (xxi). The [press release](https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=199571) lists what was new, and most of it is data-heavy:

## Check applicability before anything else

The [order](https://taxguru.in/company-law/caro-2020.html) excludes banking companies, insurance companies, section 8 companies, one person companies and small companies. It also excludes a private company that is not a holding or subsidiary company of a public company, provided three limits are all met: paid-up capital and reserves and surplus of not more than ₹1 crore on the balance sheet date, borrowings from any bank or financial institution of not more than ₹1 crore at any point in the year, and total revenue of not more than ₹10 crore for the year.

Note the wording on borrowings: “at any point of time during the financial year”. A year-end balance of nil does not settle it. This is the first place I would use a tool, to scan the full year’s bank statements and loan ledgers for the peak balance, because a wrong applicability call makes everything after it wasted effort.

The small company test is defined in the Companies Act and its rules and has been revised over the years, so check the thresholds in force for the year under audit rather than relying on memory.

## Clause by clause: what AI can prepare and what you decide

The table below is how I would split the work on the most evidence-heavy clauses. The left-hand columns come from the [order](https://taxguru.in/company-law/caro-2020.html); the right-hand columns are my practice view, not a regulatory requirement.

CARO 2020: where a tool helps and where the auditor’s judgement decides. Clause references from the order; split of work is the author’s practice view.

| Clause | What the order asks | What AI can prepare | What the auditor decides |
| --- | --- | --- | --- |
| (i) Property, plant and equipment | Proper records, physical verification, title deeds held in the company’s name, revaluation, benami proceedings | Match the fixed asset register to title deeds and verification sheets; list mismatched names and missing deeds | Whether records are “proper” and whether title exceptions are reportable |
| (ii) Inventory and bank returns | Coverage of physical verification, 10% discrepancies by class, quarterly returns to banks vs books (limits above ₹5 crore) | Compute discrepancy by class; reconcile each quarterly stock statement to the books and list differences with amounts | Whether coverage was appropriate and whether a difference is a reportable non-agreement |
| (iii) Loans, guarantees and investments | Terms, repayment schedules, overdues, renewals and loans repayable on demand | Extract terms from agreements; build the repayment and overdue schedule | Whether terms are prejudicial to the company’s interest |
| (vii) Statutory dues | Regularity in depositing undisputed dues; arrears outstanding over six months; disputed dues by forum | Reconcile GST, PF, ESI and TDS challans to liabilities and due dates; age the arrears | Which items are disputed and how the forum is described |
| (ix) Borrowings | Defaults in the prescribed lender-wise format, wilful defaulter, diversion of term loans and short-term funds used long term | Compare sanction letters to actual repayments and fund flows; draft the default table | Whether funds were diverted and whether a default exists in substance |
| (xi) Fraud and whistle-blowing | Fraud noticed or reported, ADT-4 filings, whistle-blower complaints considered | Index minutes, complaint logs and legal correspondence so nothing is missed | Everything: read the sources in full, never a summary |
| (xvii) to (xix) Losses, auditor resignation, going concern | Cash losses, outgoing auditor’s concerns, material uncertainty on meeting liabilities within one year | Calculate cash losses; build the ratio, ageing and maturity analysis | Whether a material uncertainty exists |
| (xx) CSR | Unspent amounts transferred to a Schedule VII fund or unspent CSR account in time | Trace CSR spend and transfers to the dates in section 135(6) | Whether a project is “ongoing” |

## Where AI earns its place

These are the same capabilities Gartner’s [2025 survey](https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-survey-shows-finance-ai-adoption-remains-steady-in-2025) found finance teams already using most, such as knowledge management and anomaly detection, applied to an audit file. The time saved is real; the evidence still has to be checked.

- Building the clause-by-clause evidence index: for each clause, what evidence is needed, where it sits and whether it has been received.
- Comparing quarterly stock statements submitted to banks with the books, period by period, and listing every difference with its amount.
- Reading loan agreements and sanction letters to extract repayment schedules and stated purposes, then comparing them with actual repayments and utilisation.
- Summarising board minutes, whistle-blower logs and legal correspondence so the team knows what to read in full.
- Analysing inventory verification sheets by class to see which classes approach the 10% threshold.

## A worked routine for clause (ii)(b)

The bank return comparison is where I see the biggest saving, because it is pure matching. A routine that works: export the four quarterly stock and book-debt statements filed with each bank, export the trial balance and debtors and inventory ledgers at the same four dates, and ask the tool to produce one table per quarter with the bank figure, the book figure, the difference and the percentage.

The tool should then do nothing more. A person reads each difference, asks management why it arose, and decides whether it is a timing difference, a provisional figure later revised, or a genuine non-agreement that the order requires to be reported with details. The [ICAI Guidance Note on CARO 2020](https://cag.gov.in/uploads/media/Guidance-note-on-CARO-2020-064e84867178ba9-47322653.pdf) is the reference for how to word that reporting.

## Where judgement stays

Each clause ends in a statement: whether something is so, and if not, the details. Deciding whether a difference between a bank statement and the books is a reportable non-agreement, whether funds were diverted, or whether a material uncertainty exists about meeting liabilities falling due within a year requires professional judgement and knowledge of the client. AI can surface the facts; it cannot weigh them.

There is also a quieter risk: summaries that miss something. A model asked to summarise board minutes may drop the one line about a fraud investigation. I would never let a summary replace reading the source for clauses dealing with fraud, whistle-blower complaints or defaults.

## Document the tool like any other procedure

Internal audit now has a standard on this. ICAI’s [SIA 240](https://internalaudit.icai.org/wp-content/uploads/2026/03/Comp-of-Stnd-on-Internal-Audit-26.pdf) asks for tool use to be planned, outputs validated for completeness and accuracy, configurations and results documented, and professional judgement applied to all tool-based findings. Statutory auditors are bound by the SAs rather than the SIAs, but the discipline transfers well to a CARO file: record what the tool did, what was checked by a person, and what the conclusion rests on.

For the working-paper side of the same audit, see [AI for audit working papers in India](https://pratikbajoria.com/blog/2026-09-30-ai-for-audit-working-papers-in-india-what-a-ca-should-automate-and-what-must-stay-human). The same evidence often feeds the tax audit report too, which I cover in [AI for tax audit in India](https://pratikbajoria.com/blog/2026-10-09-ai-for-tax-audit-in-india-form-3cd-this-year-form-26-next-year). If you are training juniors to do this matching, [how CA firms should train article assistants now](https://pratikbajoria.com/blog/2026-10-15-ai-and-articleship-how-ca-firms-should-train-article-assistants-now) sets out a review-first approach, and the wider plan sits in the [AI for Chartered Accountants in India hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india).

## A Monday checklist for the CARO file

Before the busy season starts, five things are worth agreeing as a team.

- Applicability decided and documented, with the peak-borrowing check done on the full year’s data.
- An evidence index with one line per clause and sub-clause, owner and status.
- A list of clauses where AI output may be used as a starting point, and those where it may not.
- A rule that every tool-generated schedule carries the source file names and the reviewer’s initials.
- Partner review of every clause that ends in an exception, against source documents rather than summaries.

## Frequently asked questions

### How many clauses does CARO 2020 have?

Paragraph 3 of CARO 2020 sets out matters from clause (i) to clause (xxi). Only clause (xxi) applies to the auditor’s report on consolidated financial statements.

### From which year does CARO 2020 apply?

After two deferrals, CARO 2020 applies to financial years commencing on or after 1 April 2021, so FY 2021-22 was the first year reported under it. CARO 2016 applied to FY 2020-21.

### Can AI prepare CARO reporting?

It can assemble and compare evidence for each clause, such as stock statements against books or loan terms against repayments. The statement made under each clause is the auditor’s judgement and must rest on evidence a person has checked.

### Which companies are exempt from CARO 2020?

Banking, insurance, section 8, one person and small companies, and private companies that are not a holding or subsidiary of a public company with paid-up capital and reserves and borrowings each of not more than ₹1 crore and total revenue of not more than ₹10 crore.

### What did CARO 2020 add on bank borrowings?

Where working capital limits above ₹5 crore were sanctioned on the security of current assets, the auditor reports whether the quarterly returns or statements filed with banks agree with the books, with details if they do not.

### Should AI summaries be used for the fraud clause?

No. Use a tool to index minutes and complaint logs so nothing is missed, but read the source documents in full for fraud, whistle-blower and default matters.

## Sources

- [PIB: Notification of Companies (Auditor’s Report) Order, 2020](https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=199571)
- [Companies (Auditor’s Report) Order, 2020 — full text (TaxGuru)](https://taxguru.in/company-law/caro-2020.html)
- [ICAI Internal Audit Standards Board: Compendium of Standards on Internal Audit, 2026 (SIA 240, Use of Tools)](https://internalaudit.icai.org/wp-content/uploads/2026/03/Comp-of-Stnd-on-Internal-Audit-26.pdf)
- [Gartner: Finance AI adoption remains steady in 2025 (press release)](https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-survey-shows-finance-ai-adoption-remains-steady-in-2025)
- [ICAI: CARO 2020 applicability extended to 1 April 2021 (19 December 2020)](https://icai.org/post/extension-applicability-date-caro-2020-for-one-year)
- [ICAI: Guidance Note on the Companies (Auditor’s Report) Order, 2020 (revised 2022 edition)](https://cag.gov.in/uploads/media/Guidance-note-on-CARO-2020-064e84867178ba9-47322653.pdf)

*Disclaimer: this article is general educational commentary. It is not legal, tax, audit or data-protection advice and does not create an adviser–client relationship. Laws, standards and thresholds change; check the current official text and take professional advice on your facts before acting.*

*Educational content; not financial, investment, or legal advice.*

## Related
- [AI for Chartered Accountants in India: the implementation hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india)
- [AI for audit working papers in India](https://pratikbajoria.com/blog/2026-09-30-ai-for-audit-working-papers-in-india-what-a-ca-should-automate-and-what-must-stay-human)
- [AI for tax audit in India: Form 3CD this year, Form 26 next year](https://pratikbajoria.com/blog/2026-10-09-ai-for-tax-audit-in-india-form-3cd-this-year-form-26-next-year)
- [AI and articleship: how CA firms should train article assistants](https://pratikbajoria.com/blog/2026-10-15-ai-and-articleship-how-ca-firms-should-train-article-assistants-now)
- [AI controls checklist for CA firms in India](https://pratikbajoria.com/blog/ai-controls-checklist-ca-firms-india)
- [All articles](https://pratikbajoria.com/blog)
