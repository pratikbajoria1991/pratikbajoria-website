# AI for Internal Audit in Indian Companies: A Practical Starting Point

> A CA's starting point for AI in internal audit in India: who s.138 covers, what ICAI's new SIA 240 on tools asks for, and one full-population test.

Canonical: https://pratikbajoria.com/blog/2026-10-08-ai-for-internal-audit-in-indian-companies-a-practical-starting-point
Last updated: 2026-10-22

CA insights · 2026-10-08 · 11 min read

A CA's starting point for AI in internal audit in India: who s.138 covers, what ICAI's new SIA 240 on tools asks for, and one full-population test.

Key takeaways

- Rule 13 of the Companies (Accounts) Rules, 2014, under section 138, requires an internal auditor in listed companies and in unlisted public and private companies above set turnover or borrowing thresholds.
- ICAI's SIA 240 expects tools, including AI, to be validated and documented, and says the internal auditor should not rely solely on automated outputs.
- Start with full-population testing of one high-volume process, such as procure-to-pay, instead of a sample.
- AI helps turn policy into tests, draft code, group exceptions and draft observations; people decide what is an issue and sign the report.
- Under CARO 2020 clause 3(xiv), the statutory auditor reports on whether the internal audit system is commensurate with the business.

If you run internal audit in an Indian company, or your CA firm is the appointed internal auditor under section 138, here is my short answer on AI: do not start with a dashboard. Start by testing one high-volume process on the full population instead of a sample, let people investigate every exception the test throws up, and document the tool the way you would document any other audit procedure. ICAI has now written that expectation down in a standard of its own, which makes this a good year to begin properly.

I trained as a Chartered Accountant, spent my early years in Big 4 assurance, and now help finance and audit teams put AI into real workflows. The pattern I see in internal audit is the same one I saw in statutory audit: the technology is rarely the constraint. Clean data, a clear test and a reviewer who knows the business are.

## Who this applies to: section 138 and Rule 13

Internal audit is not optional for a large part of corporate India. [Rule 13 of the Companies (Accounts) Rules, 2014](https://thc.nic.in/Central%20Governmental%20Rules/Companies%20%28Accounts%29%20Rules,%202014..pdf), made under section 138 of the Companies Act, 2013, requires an internal auditor in:

- every listed company;
- every unlisted public company with paid-up share capital of ₹50 crore or more, turnover of ₹200 crore or more, outstanding loans or borrowings from banks or public financial institutions above ₹100 crore, or outstanding deposits of ₹25 crore or more, at any point in the preceding financial year;
- every private company with turnover of ₹200 crore or more, or outstanding loans or borrowings from banks or public financial institutions above ₹100 crore, at any point in the preceding financial year.

Two details in the rule matter for AI. First, the internal auditor can be a Chartered Accountant, whether or not in practice, or an employee of the company, so the function may sit with an in-house team or an outside firm. Second, the Audit Committee or the Board, in consultation with the internal auditor, formulates the scope, functioning, periodicity and methodology of the internal audit. Moving from sampling to full-population analytics is a change of methodology. Take it to the Audit Committee before you rely on it, not after.

## What the standards now say about tools and AI

ICAI's Internal Audit Standards Board issued a [revised compendium of Standards on Internal Audit in 2026](https://internalaudit.icai.org/wp-content/uploads/2026/03/Comp-of-Stnd-on-Internal-Audit-26.pdf). It rationalises the earlier standards into 20 SIAs and adds new ones, including **SIA 240, Use of Tools**. SIA 240 names data analytics platforms, CAATs, visualisation tools, audit management software and "emerging technologies such as Artificial Intelligence (AI) and Machine Learning (ML)". It is recommendatory and effective from 1 April 2026 until the ICAI Council notifies the date from which it applies to internal audits.

The requirements read like a sensible AI policy. Paraphrasing paragraph 4:

- **Plan it.** Evaluate and record the proposed use of tools at the planning stage, aligned to the risk assessment.
- **Validate it.** Check tools for relevance, reliability, security and confidentiality, and confirm that outputs are complete and accurate. The application material suggests trial runs, benchmarking against known outcomes and cross-checks with manual procedures.
- **Protect the data.** Tools must comply with data privacy and cybersecurity rules, and third-party tools need confidentiality, ownership and access controls. The standard names the DPDP Act, 2023.
- **Document it.** Record the rationale, configuration, test parameters and outcomes, and disclose any limitation that affects the conclusion.
- **Keep judgement.** "The internal auditor should not rely solely on automated outputs."

The same compendium carries SIA 230 on internal audit evidence and SIA 250 on documentation, so an AI-assisted test is held to the same evidence and file standard as a manual one. Internationally, the [IIA Global Internal Audit Standards](https://www.theiia.org/en/standards/), with 15 principles across five domains, [took effect on 9 January 2025](https://www.theiia.org/en/content/communications/press-releases/2025/january/the-iia-celebrates-the-effective-date-of-the-global-internal-audit-standards/), and Standard 10.3 deals with the technological resources a function needs. If your team follows both frameworks, the direction is the same.

## Where internal audit actually is with AI

It is earlier than the conference talks suggest. The IIA's [2025 North American Pulse of Internal Audit](https://www.theiia.org/globalassets/site/resources/research-and-reports/pulse-of-internal-audit/2025-iia-pulse-report.pdf) found that the share of chief audit executives using generative AI rose from 15% in the previous edition to 40%. In the same survey, 92% named data analytics as the most important technology skill for internal audit, yet only 28% described their own analytics use as high or advanced. The IIA's [Vision 2035 research](https://www.theiia.org/globalassets/site/foundation/latest-research-and-products/vision-2035-report.pdf) reported that 18% of respondents were using AI in internal audit and a further 22% were researching it.

Those surveys lean heavily towards North America, and I have not seen a comparable Indian dataset, so treat them as direction rather than benchmark. But the gap they show matches what I see: teams want generative AI, and many have not yet built the analytics habits that make it useful. Finance more broadly is similar. [Gartner's 2025 AI in Finance survey](https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-survey-shows-finance-ai-adoption-remains-steady-in-2025) found 59% of finance functions using AI, with error and anomaly detection among the three most common use cases.

## Start with full-population testing of one process

Sampling exists because testing everything used to be expensive. It is not any more. If a process produces structured data, a script can test every transaction, and the conversation with the audit committee changes from "we found nothing in 25 samples" to "we tested all of them, and here are the exceptions we investigated."

Good first candidates are processes with volume, clear rules and data you can extract from the ERP:

- **Procure-to-pay:** duplicate invoices, vendor master changes close to payment runs, purchase orders split to stay under an approval limit, payments to vendors who share bank details or addresses with employees.
- **Employee expenses:** claims on non-working days, repeated round amounts, the same receipt claimed twice, claims approved by the claimant's own reportee.
- **Payroll:** employees sharing bank accounts, pay to people after their exit date, changes to pay made outside the approval workflow.
- **Revenue and receivables:** credit notes raised shortly after period end, manual adjustments to customer balances, discounts outside the policy grid.

Pick one. The temptation to build a "continuous auditing platform" in the first quarter is strong and, in my experience, the reason many analytics programmes stall.

## Where AI helps, and where it must not decide

Most full-population testing is plain analytics: joins, filters and rules. AI earns its place around that core, and SIA 240's examples (Python scripts and AI-based applications alongside IDEA, ACL and Power BI) fit how I would use it:

- **Turning policy into tests.** Give an assistant the delegation-of-authority matrix or the travel policy and ask it to propose test rules. The auditor approves every rule before it runs.
- **Writing the code.** AI is good at drafting the SQL or Python for a test. Someone who can read it still reviews it, and the reviewed version is what goes on file.
- **Grouping exceptions.** When a test returns hundreds of hits, AI can cluster them by vendor, approver or pattern so the team investigates causes rather than rows.
- **Drafting observations.** A first draft of the finding, the risk and the recommendation, which the auditor then rewrites in the company's language and rates.

What stays human: deciding whether an exception is a real issue, the conversation with the process owner, the risk rating, the conclusion and the report. SIA 240's application material says anomalies flagged by tools should be followed up through sampling, walkthroughs or corroborative procedures. That is the line I would draw.

## A six-step way to run the first test

- **1. Scope it with the Audit Committee.** One process, one period, a stated objective, and a note that the methodology is changing to full-population testing.
- **2. Get the data and prove it is complete.** Extract the transactions and agree control totals to the ledger before you test anything. A brilliant test on an incomplete extract is worthless evidence.
- **3. Write and validate the tests.** Draft rules from the policy (AI can help), then run them against a period where you already know the answer, which is the "benchmarking against known outcomes" SIA 240 describes.
- **4. Run on the full population.** Keep the scripts, parameters and output files versioned.
- **5. Investigate exceptions.** People do this. Record what was checked, what the process owner said and what evidence closed each item.
- **6. Report and document.** Report what was tested and what was found, including any limits of the data, and put the tool documentation on file as SIA 240 and SIA 250 expect.

## Controls around the AI itself

Internal audit asks everyone else for controls, so its own AI use should be the best-controlled in the building. My minimum set:

- **Approved tools only.** Company or firm-controlled accounts with retention and training settings you have checked, never personal chatbot accounts. Payroll and vendor data contain personal data.
- **Know your data-protection exposure.** The [DPDP Rules, 2025 were notified in November 2025](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014) with an 18-month phased timeline, and [the Act allows penalties of up to ₹250 crore](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf) for failing to maintain reasonable security safeguards. Share the minimum fields a test needs.
- **A tool register.** Which tools, which versions, who may use them, for what. SIA 240 suggests a centralised tool registry, version control and usage logs.
- **No unreviewed output in the report.** Every AI-drafted rule, script and observation has a named reviewer.

For a broader version of these review gates, see my [AI controls checklist for CA firms in India](https://pratikbajoria.com/blog/ai-controls-checklist-ca-firms-india).

## Remember who reads the file next

Internal audit work does not stay inside the company. Under [CARO 2020](https://taxguru.in/company-law/caro-2020.html), clause 3(xiv) asks the statutory auditor whether the company has an internal audit system commensurate with its size and the nature of its business, and whether the internal auditors' reports for the period were considered. If your exceptions list came from an undocumented prompt, expect questions. If it came from a validated, versioned test with a clear trail of investigation, you have made the statutory auditor's job easier, and your own position stronger.

This is also where internal audit differs from statutory audit. For the statutory side, with SA 230 documentation, read [AI for audit working papers in India](https://pratikbajoria.com/blog/2026-09-30-ai-for-audit-working-papers-in-india-what-a-ca-should-automate-and-what-must-stay-human). For how firms are adopting AI more generally, read [how audit and accounting firms in India are using AI](https://pratikbajoria.com/blog/2026-10-07-how-audit-and-accounting-firms-in-india-are-using-ai).

## What I would tell an Audit Committee

- We will test one process on the full population this quarter, not a sample.
- Every exception will be investigated by a person, and the file will show how each one was closed.
- The tools, scripts and AI assistance will be documented in line with SIA 240, and no client or employee data will go into unapproved tools.
- We will report what the data could and could not tell us.
- If it works, we will extend it to a second process next quarter. If it does not, we will say why.

If you want a structured way to choose that first process and run it, my [90-day AI pilot playbook](https://pratikbajoria.com/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india) applies just as well to an internal audit team. The wider picture for the profession is in the [AI for Chartered Accountants in India hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india). If you would rather have someone map where AI pays back across your finance and audit work, that is what the [AI Opportunity Audit](https://pratikbajoria.com/audit) is for.

## The statutory audit side

Statutory auditors face the same tool questions on CARO 2020, where most clauses are evidence assembly followed by a judgement; I go through it clause by clause in [AI for CARO 2020 reporting: where it helps and where judgement stays](https://pratikbajoria.com/blog/2026-10-16-ai-for-caro-2020-reporting-where-it-helps-and-where-judgement-stays). For what SA 230 still demands of the file whoever drafted it, see [AI for audit working papers in India](https://pratikbajoria.com/blog/2026-09-30-ai-for-audit-working-papers-in-india-what-a-ca-should-automate-and-what-must-stay-human), and for training juniors to check tool output, [AI and articleship](https://pratikbajoria.com/blog/2026-10-15-ai-and-articleship-how-ca-firms-should-train-article-assistants-now).

## Frequently asked questions

### Is internal audit mandatory for my company in India?

Section 138 of the Companies Act, 2013, read with Rule 13 of the Companies (Accounts) Rules, 2014, requires an internal auditor in every listed company; in unlisted public companies with paid-up share capital of ₹50 crore or more, turnover of ₹200 crore or more, outstanding borrowings above ₹100 crore or deposits of ₹25 crore or more; and in private companies with turnover of ₹200 crore or more or outstanding borrowings above ₹100 crore. Check the thresholds against your own preceding-year figures.

### Do ICAI's Standards on Internal Audit allow AI?

Yes. SIA 240, Use of Tools, in ICAI's 2026 compendium names AI and machine learning alongside data analytics and CAATs. It asks the internal auditor to plan and record tool use, validate tool outputs for completeness and accuracy, protect data, document configurations and results, and not rely solely on automated outputs. It is recommendatory from 1 April 2026 until the ICAI Council notifies a mandatory date.

### What is the best first AI use case for an internal audit team?

In my view, full-population testing of one high-volume process, such as procure-to-pay or employee expense claims. It replaces sampling with a complete test, the exceptions are easy to verify, and it fits the evidence and documentation requirements the team already follows.

### Does the statutory auditor look at internal audit work?

Yes. Under CARO 2020, clause 3(xiv), the statutory auditor reports whether the company has an internal audit system commensurate with its size and nature, and whether the internal auditors' reports were considered. AI-assisted work therefore needs to be documented well enough for another auditor to follow.

### Will AI replace internal auditors?

No. It changes the work. Testing every transaction becomes cheap; deciding which exceptions matter, talking to process owners, rating findings and standing behind the report still need an experienced person. SIA 240 says as much: tool findings need professional scepticism and contextual evaluation.

## Keep reading in this topic

This guide is part of [AI for Chartered Accountants in India: the implementation hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india).

- [How Indian CA Firms Can Use AI for GST Reconciliation Without Risking Client Data](https://pratikbajoria.com/blog/2026-09-28-how-indian-ca-firms-can-use-ai-for-gst-reconciliation-without-risking-client-data)
- [AI for Audit Working Papers in India: What a CA Should Automate and What Must Stay Human](https://pratikbajoria.com/blog/2026-09-30-ai-for-audit-working-papers-in-india-what-a-ca-should-automate-and-what-must-stay-human)
- [Drafting Replies to GST and Income Tax Notices With AI Without Losing Control](https://pratikbajoria.com/blog/2026-10-12-drafting-replies-to-gst-and-income-tax-notices-with-ai-without-losing-control)

Also useful: [AI implementation for finance teams: the CFO and controller guide](https://pratikbajoria.com/ai-implementation-for-finance-teams).

## Sources

- [Companies (Accounts) Rules, 2014, Rule 13 (internal audit under section 138)](https://thc.nic.in/Central%20Governmental%20Rules/Companies%20%28Accounts%29%20Rules,%202014..pdf)
- [ICAI Internal Audit Standards Board: Compendium of Standards on Internal Audit, 2026 (incl. SIA 240, Use of Tools)](https://internalaudit.icai.org/wp-content/uploads/2026/03/Comp-of-Stnd-on-Internal-Audit-26.pdf)
- [ICAI Internal Audit Standards Board: publications](https://internalaudit.icai.org/publications/)
- [The IIA: Global Internal Audit Standards](https://www.theiia.org/en/standards/)
- [The IIA: Global Internal Audit Standards effective 9 January 2025 (press release)](https://www.theiia.org/en/content/communications/press-releases/2025/january/the-iia-celebrates-the-effective-date-of-the-global-internal-audit-standards/)
- [The IIA: 2025 North American Pulse of Internal Audit (report)](https://www.theiia.org/globalassets/site/resources/research-and-reports/pulse-of-internal-audit/2025-iia-pulse-report.pdf)
- [The IIA: Pulse of Internal Audit 2025 press release](https://www.theiia.org/en/content/communications/press-releases/2025/march/new-report-reveals-the-value-of-strategy-plus-increasing-responsibility-for-internal-audit-leaders/)
- [The IIA Foundation: Vision 2035 report](https://www.theiia.org/globalassets/site/foundation/latest-research-and-products/vision-2035-report.pdf)
- [Companies (Auditor's Report) Order, 2020: full text incl. clause 3(xiv) (TaxGuru)](https://taxguru.in/company-law/caro-2020.html)
- [PIB: Notification of Companies (Auditor's Report) Order, 2020](https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=199571)
- [PIB: Government notifies DPDP Rules (14 November 2025)](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014)
- [PIB: DPDP Rules, 2025 explainer (penalties under the DPDP Act)](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf)
- [Gartner: Finance AI adoption remains steady in 2025](https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-survey-shows-finance-ai-adoption-remains-steady-in-2025)

*Disclaimer: this article is general educational commentary. It is not legal, audit or data-protection advice and does not create an adviser–client relationship. Thresholds and standards change; check the current text of the Companies Act, the rules and the ICAI standards, and take professional advice on your facts.*

*Educational content; not financial, investment, or legal advice.*

## Related
- [AI controls checklist for CA firms in India](https://pratikbajoria.com/blog/ai-controls-checklist-ca-firms-india)
- [AI for audit working papers in India](https://pratikbajoria.com/blog/2026-09-30-ai-for-audit-working-papers-in-india-what-a-ca-should-automate-and-what-must-stay-human)
- [how audit and accounting firms in India are using AI](https://pratikbajoria.com/blog/2026-10-07-how-audit-and-accounting-firms-in-india-are-using-ai)
- [90-day AI pilot playbook](https://pratikbajoria.com/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india)
- [AI for Chartered Accountants in India hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india)
- [AI Opportunity Audit](https://pratikbajoria.com/audit)
- [AI for CARO 2020 reporting: where it helps and where judgement stays](https://pratikbajoria.com/blog/2026-10-16-ai-for-caro-2020-reporting-where-it-helps-and-where-judgement-stays)
- [AI and articleship](https://pratikbajoria.com/blog/2026-10-15-ai-and-articleship-how-ca-firms-should-train-article-assistants-now)
- [All articles](https://pratikbajoria.com/blog)
