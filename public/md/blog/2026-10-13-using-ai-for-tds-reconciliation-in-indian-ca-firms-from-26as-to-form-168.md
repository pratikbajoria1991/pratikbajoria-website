# Using AI for TDS Reconciliation in Indian CA Firms: From 26AS to Form 168

> Form 26AS is now Form 168 under the new Act. How to automate TDS matching and the mismatch list, while a reviewer decides what to chase with the deductor.

Canonical: https://pratikbajoria.com/blog/2026-10-13-using-ai-for-tds-reconciliation-in-indian-ca-firms-from-26as-to-form-168
Last updated: 2026-10-22

CA insights · 2026-10-13 · 4 min read

TDS reconciliation is one of the least glamorous and most useful places to put AI in a practice. The volume is high, the rules are clear, and the cost of a missed mismatch is a demand, a refund delay or an uncomfortable call with the client.

It is also changing names. Under the [Income-tax Act, 2025](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2248005), the statement many of us still call 26AS is [Form No. 168, the Annual Information Statement](https://www.incometaxindia.gov.in/documents/d/guest/form-168-faqs), issued under section 510 read with Rule 245. The work behind it has not changed: match what the client booked with what others reported, and chase the differences.

## What the statement now contains

The Department’s [Form 168 FAQs](https://www.incometaxindia.gov.in/documents/d/guest/form-168-faqs) describe two parts. Part A carries general information about the taxpayer. Part B carries TDS and TCS information, Statement of Financial Transactions data from reporting entities, payment of taxes, demands and refunds, and other information such as dividends, interest on refunds, and securities and mutual fund transactions. The Taxpayer Information Summary (TIS) aggregates this by category and is updated after feedback is processed.

In practice a reconciliation now has two jobs: tie the TDS credits the client is claiming to what deductors reported, and make sure the income behind those credits is fully reflected in the books and the return.

## What to automate

None of this needs a clever model. A well-written script does most of it, and an AI assistant is useful for writing and maintaining that script, for reading messy ledger narrations and for drafting the deductor emails. Gartner’s [2025 AI in Finance survey](https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-survey-shows-finance-ai-adoption-remains-steady-in-2025) found error and anomaly detection among the three most common finance AI use cases; TDS matching is a very practical version of it.

- Parsing the downloaded statement into a clean table by deductor TAN, section, date and amount.
- Matching each entry to the client’s ledger, first exactly, then within tolerances on date and amount, with every fuzzy match labelled as such.
- Producing a mismatch list in three buckets: in the statement but not in the books, in the books but not in the statement, and in both with different amounts.
- Drafting the email to each deductor listing the missing or short-reported entries, with invoice references attached.
- Tracking responses and re-running the match after deductors file corrections.

## What a reviewer still decides

Whether a difference is a timing issue, a deductor error, a booking error or income the client has not recognised is a judgement. So is the decision to submit feedback on an AIS entry, to wait for a correction statement, or to report income that does not appear in the statement at all. The [FAQs](https://www.incometaxindia.gov.in/documents/d/guest/form-168-faqs) are explicit that actual income must be reported even if it is missing from the AIS, and that the TIS cannot be edited directly.

I would also keep a person on any match the tool marks as fuzzy. Fuzzy matching is where reconciliations quietly go wrong: two invoices of similar value from the same customer can be paired incorrectly, and the error will not surface until a deductor’s correction breaks it.

## The tax auditor will ask the deductor-side question too

For clients who deduct tax, the new tax audit report raises the bar. [Form 26](https://www.incometaxindia.gov.in/documents/d/guest/form-26-faqs) asks the auditor for the total number of transactions reported and not reported in the TDS/TCS return as it stands after the latest correction statement, and the amount of transactions not reported. A firm that already runs transaction-level matching for its clients’ own credits can extend the same scripts to their deduction compliance.

## A simple monthly rhythm

If this is the firm’s first AI workflow, run it as a time-boxed pilot with a baseline, as in my [90-day pilot playbook](https://pratikbajoria.com/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india).

- Download the statement and the ledger extract on a fixed day each month or quarter.
- Run the match and publish the three-bucket mismatch list to the reviewer.
- Reviewer classifies each item and approves the deductor emails.
- Re-run after corrections, and close items with a note of how they were resolved.
- Before the return, reconcile income heads in the TIS to the books and document every difference.

TDS matching is also a good early exercise for article assistants; see [AI and articleship](https://pratikbajoria.com/blog/2026-10-15-ai-and-articleship-how-ca-firms-should-train-article-assistants-now). For the statutory dues clause in the companies audit report, see [AI for CARO 2020 reporting](https://pratikbajoria.com/blog/2026-10-16-ai-for-caro-2020-reporting-where-it-helps-and-where-judgement-stays).

## Frequently asked questions

### Is Form 26AS still available?

Under the Income-tax Act, 2025 and the Income-tax Rules, 2026, the Annual Information Statement is Form No. 168, corresponding to Form 26AS and section 285BB under the 1961 Act.

### Can AI reconcile TDS automatically?

It can do the parsing, matching and drafting at high volume. A reviewer should still classify each difference, approve deductor follow-ups and decide on AIS feedback, and any fuzzy match should be confirmed by a person.

### What if income is missing from the AIS?

According to the Department’s FAQs, all actual income must be reported in the return even if it does not appear in the AIS.

### What does Form 26 ask about TDS returns?

For assessees who deduct or collect tax, the auditor reports the number of transactions reported and not reported in the TDS/TCS return after the latest correction, and the amount of transactions not reported.

## Sources

- [Income Tax Department: Form No. 168 (Annual Information Statement) FAQs](https://www.incometaxindia.gov.in/documents/d/guest/form-168-faqs)
- [Income Tax Department: Form No. 26 FAQs (tax audit under section 63, Income-tax Act, 2025)](https://www.incometaxindia.gov.in/documents/d/guest/form-26-faqs)
- [PIB: Income-tax Act, 2025 comes into force from 1 April 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2248005)
- [Gartner: Finance AI adoption remains steady in 2025 (press release)](https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-survey-shows-finance-ai-adoption-remains-steady-in-2025)

*Disclaimer: this article is general educational commentary. It is not legal, tax, audit or data-protection advice and does not create an adviser–client relationship. Laws, standards and thresholds change; check the current official text and take professional advice on your facts before acting.*

*Educational content; not financial, investment, or legal advice.*

## Related
- [AI for Chartered Accountants in India: the implementation hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india)
- [AI for Tax Audit in India: Form 3CD This Year, Form 26 Next Year](https://pratikbajoria.com/blog/2026-10-09-ai-for-tax-audit-in-india-form-3cd-this-year-form-26-next-year)
- [Drafting Replies to GST and Income Tax Notices With AI Without Losing Control](https://pratikbajoria.com/blog/2026-10-12-drafting-replies-to-gst-and-income-tax-notices-with-ai-without-losing-control)
- [AI for Audit Working Papers in India: What a CA Should Automate and What Must Stay Human](https://pratikbajoria.com/blog/2026-09-30-ai-for-audit-working-papers-in-india-what-a-ca-should-automate-and-what-must-stay-human)
- [The AI Opportunity Audit: a scoped 90-day map](https://pratikbajoria.com/audit)
- [All articles](https://pratikbajoria.com/blog)
