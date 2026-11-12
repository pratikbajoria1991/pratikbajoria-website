# AI for Marketplace Seller Reconciliation in India: GST TCS and 194-O TDS

> How a CA can use AI to reconcile marketplace GST TCS and 194-O/section 393 TDS for Indian sellers before the 30 November cut-off, and what stays human.

Canonical: https://pratikbajoria.com/blog/2026-11-04-ai-for-marketplace-seller-reconciliation-in-india-gst-tcs-and-194-o-tds
Last updated: 2026-11-04

CA insights · 2026-11-04 · 7 min read

How a CA can use AI to reconcile marketplace GST TCS and 194-O/section 393 TDS for Indian sellers before the 30 November cut-off, and what stays human.

Key takeaways

- GST TCS (section 52) is 0.5 per cent of net taxable supplies from 10 July 2024; income-tax TDS on e-commerce is 0.1 per cent of gross sales.
- From 1 April 2026, section 194-O moves to section 393(1) Table serial 8(v) of the Income-tax Act, 2025, at the same 0.1 per cent.
- Sellers must accept or reject every TCS row on the GST portal before the credit reaches the electronic cash ledger.
- Operators cannot correct 2025-26 GSTR-8 errors after 30 November 2026 (or the annual statement, if earlier), so raise rejections now.
- Let AI map settlement reports and build the tie-outs; keep accept/reject decisions and tax positions with a named reviewer.

Every November a seller client rings with the same problem. The marketplace dashboard says one thing, the books say another, and in between sit months of GST TCS credit nobody accepted on the portal and income-tax TDS that does not match Form 26AS. Can AI sort it out? It can do most of the matching, and none of the deciding.

This post is for CAs and finance leads who look after Indian sellers on platforms that collect payment on the seller’s behalf. It covers the two withholding trails on every marketplace sale, where AI earns its keep, and the controls I would insist on. It is deliberately narrower than my earlier piece on [ecommerce reconciliation in general](https://pratikbajoria.com/blog/2026-09-20-ecommerce-reconciliation-where-automation-helps-and-where-it-lies): this one is about tax credits.

## Two trails, two bases, two portals

Most of the confusion comes from treating GST TCS and income-tax TDS as one thing. They are separate laws, calculated on different bases, reported in different returns and claimed against different liabilities.

**GST TCS under section 52 of the CGST Act.** The operator collects tax on the *net* value of taxable supplies made through it, meaning sales less returns for the month. Since 10 July 2024 the rate has been 0.5 per cent (0.25 per cent CGST plus 0.25 per cent SGST, or 0.5 per cent IGST), down from 1 per cent, under [Notification No. 15/2024–Central Tax](https://www.gstcouncil.gov.in/sites/default/files/2024-09/central-tax-15-2024-11072024.pdf). The operator pays it over and files its statement in Form GSTR-8 within ten days after the end of the month, as [section 52(3) and 52(4)](https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_CGST_act/active/chapter10/section52_v1.00.html) require.

The seller then has to act. On the GST portal, the [“TDS and TCS Credit Received” statement](https://tutorial.gst.gov.in/userguide/inputtaxcredit/manual_tds_and_tcs_credit_received.htm) shows each record the operator reported. Every row must be accepted or rejected before the statement can be filed, and accepted credit reaches the electronic cash ledger only after filing. Rejected rows flow back to the operator’s next GSTR-8 for amendment.

**Income-tax TDS on e-commerce payouts.** For the year to 31 March 2026 this is section 194-O of the 1961 Act, at 0.1 per cent of the *gross* amount of sales from 1 October 2024, after the [Finance (No. 2) Act, 2024](https://research.lawsathi.in/acts/finance-act-2024-no-2-2024/section-61/) cut it from 1 per cent. From 1 April 2026 the same deduction sits in [section 393(1), Table serial number 8(v) of the Income-tax Act, 2025](https://www.incometaxindia.gov.in/w/section-393-6), still at 0.1 per cent of the gross amount. Individual and HUF sellers whose gross platform sales stay within five lakh rupees in the tax year, and who have given the operator their PAN or Aadhaar, are outside it under serial number 11 of the no-deduction table in section 393(4). This credit shows up in Form 26AS and the AIS and is set against income tax, not GST; my [TDS reconciliation guide](https://pratikbajoria.com/blog/2026-10-13-using-ai-for-tds-reconciliation-in-indian-ca-firms-from-26as-to-form-168) covers that side in more depth.

So one sale produces a GST figure on net value and an income-tax figure on gross value. If your working paper does not separate them, the reconciliation will never close.

## Why this matters in November

Two things make this a November job rather than a March one. First, the window for correcting the operator’s side is closing. Under the proviso to section 52(6), an operator cannot rectify an omission or incorrect particulars in GSTR-8 after 30 November following the end of the financial year, or after it files the annual statement, whichever is earlier. For 2025-26 that means rejections the operator has to act on need to be raised now, not after the year-end audit. Second, the Act provides for the operator’s reported supplies to be matched against the seller’s own returns, with unresolved excess amounts added to the seller’s output liability with interest under sections 52(8) to 52(11), as the [GST Council’s e-commerce FAQ](https://gstcouncil.gov.in/sites/default/files/2024-02/faq-e-commerc.pdf) explains. Either way, a gap between what the platform says you sold and what you declared tends to surface later in a notice.

## Where AI genuinely helps

The work is mostly structure, which AI handles well once a person designs the template.

- **Normalising settlement reports.** Each platform labels orders, returns, commission, shipping, ads and penalties differently,. A model can map new fee lines to your chart of accounts and flag the ones it has not seen before.
- **Building the three-way tie-out.** For each GSTIN and month: platform sales and returns, the TCS rows in the portal statement, and the GSTR-1 figures. For each PAN and quarter: platform gross sales, the 194-O or section 393 credits in Form 26AS, and the TDS receivable in the books.
- **Explaining differences in plain language.** Timing (a sale in March, a return in April), base (net against gross), rate (a period straddling 10 July 2024 or 1 October 2024), wrong GSTIN on the seller account, or a genuine omission.
- **Drafting the operator query** once a person has decided a row is wrong, with order IDs and amounts attached.

## Where judgement stays human

Three decisions should never be left to a model. Accepting or rejecting a TCS row on the portal is a filing action with consequences for the cash ledger and the operator’s next return; a person who has seen the evidence clicks the button. Deciding whether a difference is timing or under-declared turnover is a tax position. And the TDS credit claimed in the income-tax return has to agree with Form 26AS and the books, with any mismatch explained by someone who signs the computation.

One data point: settlement reports carry customer names, addresses and phone numbers. Strip those columns before any upload and use a business AI plan whose retention terms a partner has read, as set out in my [DPDP rubric for CA firms](https://pratikbajoria.com/blog/2026-10-19-dpdp-act-and-ai-in-ca-firms-in-india-a-client-data-decision-rubric).

Evaluation framework only. Adapt it to your practice; this is not legal advice or benchmark data.

| Task | AI role | Minimum review gate | Stop if |
| --- | --- | --- | --- |
| Mapping settlement fee lines | Automate, flag new codes | Senior approves each new mapping once | Unknown codes are mapped without a flag |
| GST TCS tie-out by GSTIN and month | Automate the comparison | Every difference above your threshold has a reason | Net and gross figures are mixed in one column |
| 194-O / section 393 TDS against Form 26AS | Assist | Manager ties the total to the books and the return | The tool works from a 26AS download older than the latest quarter |
| Accept or reject TCS rows on the portal | Human only | Evidence for each rejection on file | Anyone suggests “select all” without a tie-out |
| Timing versus under-declaration | Human only | Partner or tax lead decides and documents | The model’s explanation is copied into the file as the conclusion |

## A workflow I would actually run

Start with one client and one platform. Pull twelve months of settlement reports, the portal TCS statement and the latest Form 26AS. A person writes the mapping rules on one page; the tool applies them and produces a GST table and an income-tax table with a reason column. Review the reasons, not the rows that agree. When two cycles close cleanly, add the next platform. If you are still deciding how to structure the pilot itself, the [90-day pilot guide for CA firms](https://pratikbajoria.com/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india) sets out the stages.

The deliverable is a short quarterly evidence pack: both tie-outs, rejected TCS rows with reasons, operator tickets and who reviewed what. That is what you want in hand when an officer asks why the numbers differ.

## Monday-morning checklist

- List every seller client by GSTIN and PAN, with the platforms each one sells on.
- Open the “TDS and TCS Credit Received” statement for each GSTIN and note any months with unactioned rows.
- For 2025-26, list the TCS rows you expect to reject and raise them with the operator before 30 November.
- Separate GST TCS (net, section 52) from income-tax TDS (gross, section 194-O or section 393) in the working paper.
- Strip customer personal data from settlement exports before any AI tool sees them.
- Keep a log of what the tool matched, what a person changed and who signed off.

To see where this fits among the other workflows in a practice, start from the [AI for Chartered Accountants in India hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india), or take the [free AI Opportunity Scorecard](https://pratikbajoria.com/scorecard) to see which reconciliation work is worth automating first. For a scoped view across a whole client book, see the [AI Opportunity Audit](https://pratikbajoria.com/audit).

## Frequently asked questions

### What is the GST TCS rate for marketplace sellers in India?

Since 10 July 2024 an e-commerce operator collects 0.5 per cent of the net value of taxable supplies: 0.25 per cent CGST plus 0.25 per cent SGST for intra-State supplies, or 0.5 per cent IGST for inter-State supplies, under Notification No. 15/2024–Central Tax. It was 1 per cent before that date.

### Where did section 194-O go under the Income-tax Act, 2025?

From 1 April 2026, TDS by an e-commerce operator on a participant’s sales sits in section 393(1), Table serial number 8(v), at 0.1 per cent of the gross amount. Individual and HUF sellers with gross platform sales up to five lakh rupees in the tax year who have furnished PAN or Aadhaar are excluded under section 393(4). Income up to 31 March 2026 stays under section 194-O of the 1961 Act.

### Can AI accept TCS credit on the GST portal for a seller?

It should not. AI can prepare the tie-out between settlement reports and the TCS rows and suggest which rows look wrong, but accepting or rejecting a row is a filing action. A person who has reviewed the evidence should take it, because rejected rows go back to the operator and accepted credit moves to the electronic cash ledger once the statement is filed.

## Keep reading in this topic

Part of [AI for Chartered Accountants in India: the implementation hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india).

- [How Indian CA firms can use AI for GST reconciliation without risking client data](https://pratikbajoria.com/blog/2026-09-28-how-indian-ca-firms-can-use-ai-for-gst-reconciliation-without-risking-client-data)
- [Ecommerce reconciliation: where automation helps and where it lies](https://pratikbajoria.com/blog/2026-09-20-ecommerce-reconciliation-where-automation-helps-and-where-it-lies)
- [AI Controls Checklist for CA Firms in India: Practical Review Gates](https://pratikbajoria.com/blog/ai-controls-checklist-ca-firms-india)

Also useful: [AI Opportunity Audit for CA firms](https://pratikbajoria.com/ai-opportunity-audit-for-ca-firms).

## Sources

- [CBIC — Section 52, CGST Act, 2017: Collection of tax at source](https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_CGST_act/active/chapter10/section52_v1.00.html)
- [Notification No. 15/2024–Central Tax (TCS rate reduced to 0.5% from 10 July 2024)](https://www.gstcouncil.gov.in/sites/default/files/2024-09/central-tax-15-2024-11072024.pdf)
- [GST Council — FAQs on e-commerce](https://gstcouncil.gov.in/sites/default/files/2024-02/faq-e-commerc.pdf)
- [CBIC — FAQs on TCS under GST](https://cbic-gst.gov.in/pdf/FAQs-TCS-30-11-2018.pdf)
- [GST portal user manual — TDS and TCS Credit Received](https://tutorial.gst.gov.in/userguide/inputtaxcredit/manual_tds_and_tcs_credit_received.htm)
- [Finance Act, 2022 — Section 112: Amendment of section 52 (30 November cut-off)](https://research.lawsathi.in/acts/finance-act-2022/section-112/)
- [Finance (No. 2) Act, 2024 — Section 61: Amendment of section 194-O](https://research.lawsathi.in/acts/finance-act-2024-no-2-2024/section-61/)
- [Income Tax Department — Section 393, Income-tax Act, 2025](https://www.incometaxindia.gov.in/w/section-393-6)

*Disclaimer: this article is general educational commentary from implementation work. It is not tax or legal advice. Rates, section numbers, portal screens and due dates change by notification; verify the primary text and take professional advice before filing or accepting credits.*

*Educational content; not financial, investment, or legal advice.*

## Related
- [ecommerce reconciliation in general](https://pratikbajoria.com/blog/2026-09-20-ecommerce-reconciliation-where-automation-helps-and-where-it-lies)
- [TDS reconciliation guide](https://pratikbajoria.com/blog/2026-10-13-using-ai-for-tds-reconciliation-in-indian-ca-firms-from-26as-to-form-168)
- [DPDP rubric for CA firms](https://pratikbajoria.com/blog/2026-10-19-dpdp-act-and-ai-in-ca-firms-in-india-a-client-data-decision-rubric)
- [90-day pilot guide for CA firms](https://pratikbajoria.com/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india)
- [AI for Chartered Accountants in India hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india)
- [free AI Opportunity Scorecard](https://pratikbajoria.com/scorecard)
- [AI Opportunity Audit](https://pratikbajoria.com/audit)
- [How Indian CA firms can use AI for GST reconciliation without risking client data](https://pratikbajoria.com/blog/2026-09-28-how-indian-ca-firms-can-use-ai-for-gst-reconciliation-without-risking-client-data)
- [All articles](https://pratikbajoria.com/blog)
