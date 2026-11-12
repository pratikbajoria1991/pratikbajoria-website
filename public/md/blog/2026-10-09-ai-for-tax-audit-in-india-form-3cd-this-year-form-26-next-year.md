# AI for Tax Audit in India: Form 3CD This Year, Form 26 Next Year

> Form 26 replaces Form 3CD from tax year 2026-27. Where AI helps a CA prepare tax audit data, and where the reported position must stay with the signer.

Canonical: https://pratikbajoria.com/blog/2026-10-09-ai-for-tax-audit-in-india-form-3cd-this-year-form-26-next-year
Last updated: 2026-10-22

CA insights · 2026-10-09 · 5 min read

**Key takeaways**

- Form No. 26 under section 63 of the Income-tax Act, 2025 applies for tax years beginning on or after 1 April 2026; Forms 3CA, 3CB and 3CD continue for assessment years up to 2026-27.
- AI helps with the data work: ledger scrutiny, TDS/TCS reconciliation, cross-checking books against the Annual Information Statement and drafting document requests.
- Clause answers, the classification of observations and the signature stay with the accountant.
- Form 26 asks for the IP address and country of the server holding electronic books and the address of the India-located daily backup (Rule 46).
- Use the remaining Form 3CD season as a pilot before Form 26 work starts.

Tax audit is about to change shape, and that makes this a sensible moment to decide where AI belongs in it. The [Income-tax Act, 2025 came into force on 1 April 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2248005), and with it a new tax audit report: [Form No. 26 under section 63](https://www.incometaxindia.gov.in/documents/d/guest/form-26-faqs), which applies to tax years beginning on or after 1 April 2026. For audits relating to assessment year 2026-27 and earlier, Forms 3CA, 3CB and 3CD [continue to apply](https://taxguru.in/income-tax/ay-2026-27-tax-audit-forms-3ca-3cb-3cd-apply-form-26-starts.html).

So most practices will run one more season on Form 3CD while preparing for a form that is built very differently. In both, my view is the same: AI can do a great deal of the data work behind the clauses, and none of the reporting judgement.

## What actually changes with Form 26

The Department’s [Form 26 FAQs](https://www.incometaxindia.gov.in/documents/d/guest/form-26-faqs) describe a report in four parts: Part A for the assessee’s particulars, Part B for the statement of particulars under section 63, Part C where accounts are audited under another law (the old Form 3CA case) and Part D where they are not (the old Form 3CB case). The signing accountant must quote a UDIN, and the firm registration number where the audit is in the firm’s name.

- Business threshold: total sales, turnover or gross receipts above ₹1 crore, rising to ₹10 crore where cash receipts and cash payments each stay within 5% of the total ([Form 26 FAQ 3](https://www.incometaxindia.gov.in/documents/d/guest/form-26-faqs)).
- Profession threshold: gross receipts above ₹50 lakh.
- Due date: one month before the return due date, so 30 September or 31 October depending on the return deadline.

Three design choices matter for automation. Every clause in Part B needs a mandatory Yes or No answer. Detailed schedules are triggered only when a clause is answered Yes. And the FAQs say the data has been aligned with the return of income so that it can, going forward, be used to populate the ITR. That is a structured-data report, which is exactly the kind of work machines handle well, and exactly the kind where one wrong flag flows straight into the return.

## Where AI genuinely helps in tax audit preparation

Most of the hours in a tax audit go into pulling, classifying and tying out data rather than forming opinions. That is where I would point AI first, always on data the firm controls.

- Ledger scrutiny for clause-relevant items: payments that could breach cash limits, expenses that may be personal or capital in nature, and entries that need a second look before the clause answer is drafted.
- Reconciling TDS and TCS. Form 26 asks the auditor for the number of transactions reported and not reported in the TDS/TCS returns as they stand after the latest correction, and the amount not reported ([FAQ 38](https://www.incometaxindia.gov.in/documents/d/guest/form-26-faqs)). Matching ledgers to returns at transaction level is tedious and well suited to scripts.
- Cross-checking the client’s books against the [Annual Information Statement](https://www.incometaxindia.gov.in/documents/d/guest/form-168-faqs), so that differences are explained before the report is signed rather than after a notice arrives.
- Drafting the first version of the explanatory notes and the list of documents to request from the client.

## Where it must not decide

Form 26 asks the auditor to classify every observation or qualification clause-wise as made on a test-check basis applying materiality, based on management representation, or as something the auditor was unable to verify ([FAQ 35](https://www.incometaxindia.gov.in/documents/d/guest/form-26-faqs)). It also asks for the impact on profit, loss or book profit of qualifications and other matters in the statutory audit ([FAQ 36](https://www.incometaxindia.gov.in/documents/d/guest/form-26-faqs)). Those are judgements about evidence. An AI tool can help assemble the evidence; it cannot decide which category applies, and it cannot sign.

The same goes for every Yes or No answer that carries a tax consequence. I would let AI propose an answer with the supporting ledger extract, and require the engagement partner or manager to accept each one explicitly. If the reviewer cannot see why the tool proposed Yes, the answer stays blank until they can.

## Watch the new data-location question

One Form 26 change touches technology directly. Under Rule 46, where books of account are kept electronically they must remain accessible in India at all times, with a daily backup on servers located in India, and Form 26 asks for the IP address and country of the server holding the accounting data and the address of the India-located backup server ([FAQ 18](https://www.incometaxindia.gov.in/documents/d/guest/form-26-faqs)).

That has two consequences for a practice. You will need to ask clients where their cloud accounting data actually sits, and you should ask the same question of any AI or data tool your own team uses on client books. If a tool cannot tell you where it stores and processes data, it is not ready for tax audit work.

## How I would prepare a practice this year

Use the remaining Form 3CD season as the pilot. Pick two or three clause areas with heavy data work, script the extraction and matching, and keep the reviewer’s sign-off on every output. By the time Form 26 work starts for tax year 2026-27, the firm will know which steps are reliable and which still need a human doing them end to end. My [90-day pilot playbook](https://pratikbajoria.com/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india) sets out how to run that test.

- Map each Form 26 Part B clause to the data source in the client’s books.
- Build reusable checks for the high-volume clauses first: TDS/TCS, loans and deposits by mode, and quantitative details for trading and manufacturing clients.
- Write down, per clause, what the tool may propose and what only a reviewer may conclude.
- Ask every client about server location and backups before fieldwork, not during it.

The same evidence often feeds the companies audit report. For the CARO side, see [AI for CARO 2020 reporting: where it helps and where judgement stays](https://pratikbajoria.com/blog/2026-10-16-ai-for-caro-2020-reporting-where-it-helps-and-where-judgement-stays); for training juniors to check tool output on both reports, see [AI and articleship](https://pratikbajoria.com/blog/2026-10-15-ai-and-articleship-how-ca-firms-should-train-article-assistants-now).

## Frequently asked questions

### When does Form 26 replace Form 3CD?

Form No. 26 applies for tax years beginning on or after 1 April 2026, under section 63 of the Income-tax Act, 2025. Forms 3CA, 3CB and 3CD continue for tax audits relating to assessment years up to 2026-27.

### Can AI fill in a tax audit report?

It can prepare the data and propose answers for review, which is where most of the time goes. The clause answers, the categorisation of observations and the signature remain the accountant’s responsibility, and every proposed answer should be checked against the books before it is accepted.

### What is the tax audit threshold under the new Act?

According to the Department’s Form 26 FAQs, business turnover above ₹1 crore (₹10 crore where cash receipts and payments each stay within 5%), professional receipts above ₹50 lakh, and certain presumptive taxation cases.

### Does server location matter for tax audit now?

Yes. Form 26 asks for the IP address and country of the server holding electronic books and the address of the India-located daily backup, in line with Rule 46 of the Income-tax Rules, 2026.

## Sources

- [Income Tax Department: Form No. 26 FAQs (tax audit under section 63, Income-tax Act, 2025)](https://www.incometaxindia.gov.in/documents/d/guest/form-26-faqs)
- [PIB: Income-tax Act, 2025 comes into force from 1 April 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2248005)
- [TaxGuru: AY 2026-27 tax audit — Forms 3CA, 3CB and 3CD still apply; Form 26 starts later](https://taxguru.in/income-tax/ay-2026-27-tax-audit-forms-3ca-3cb-3cd-apply-form-26-starts.html)
- [Income Tax Department: Form No. 168 (Annual Information Statement) FAQs](https://www.incometaxindia.gov.in/documents/d/guest/form-168-faqs)

*Disclaimer: this article is general educational commentary. It is not legal, tax, audit or data-protection advice and does not create an adviser–client relationship. Laws, standards and thresholds change; check the current official text and take professional advice on your facts before acting.*

*Educational content; not financial, investment, or legal advice.*

## Related
- [AI for Chartered Accountants in India: the implementation hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india)
- [AI for Audit Working Papers in India: What a CA Should Automate and What Must Stay Human](https://pratikbajoria.com/blog/2026-09-30-ai-for-audit-working-papers-in-india-what-a-ca-should-automate-and-what-must-stay-human)
- [Using AI for TDS Reconciliation in Indian CA Firms: From 26AS to Form 168](https://pratikbajoria.com/blog/2026-10-13-using-ai-for-tds-reconciliation-in-indian-ca-firms-from-26as-to-form-168)
- [AI for Internal Audit in Indian Companies: A Practical Starting Point](https://pratikbajoria.com/blog/2026-10-08-ai-for-internal-audit-in-indian-companies-a-practical-starting-point)
- [The AI Opportunity Audit: a scoped 90-day map](https://pratikbajoria.com/audit)
- [Drafting Replies to GST and Income Tax Notices With AI Without Losing Control](https://pratikbajoria.com/blog/2026-10-12-drafting-replies-to-gst-and-income-tax-notices-with-ai-without-losing-control)
- [All articles](https://pratikbajoria.com/blog)
