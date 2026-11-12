# Income-tax Act, 2025 Transition: How a CA Firm Can Use AI to Remap Templates Safely

> How a CA firm can use AI to remap templates, checklists and client letters from the 1961 Act to the Income-tax Act, 2025 without trusting model-made section numbers.

Canonical: https://pratikbajoria.com/blog/2026-11-11-income-tax-act-2025-transition-how-a-ca-firm-can-use-ai-to-remap-templates-safely
Last updated: 2026-11-11

CA insights · 2026-11-11 · 6 min read

How a CA firm can use AI to remap templates, checklists and client letters from the 1961 Act to the Income-tax Act, 2025 without trusting model-made section numbers.

Key takeaways

- The Income-tax Act, 2025 came into force on 1 April 2026; the Income-tax Rules, 2026 were notified on 20 March 2026 with new forms.
- Sections fell from 819 to 536 and chapters from 47 to 23; “tax year” replaces “previous year” and “assessment year”.
- Section 536 keeps the 1961 Act and its procedure for proceedings relating to tax years beginning before 1 April 2026, even if started later.
- Use the Income Tax Department’s comparison utilities as the source of truth; never let a model choose section numbers.
- Let AI extract references and redraft templates; keep the mapping, split provisions and which-Act decisions with named people.

Since 1 April 2026 every CA practice in India has been running two income-tax laws at once. Returns, notices and appeals for 2025-26 and earlier years still sit under the Income-tax Act, 1961. Income from 1 April 2026 falls under the Income-tax Act, 2025, with new section numbers, new rules and new forms. Meanwhile the firm’s engagement letters, checklists, notice-reply templates and client emails were mostly written for the old law.

Remapping all of that is exactly the kind of tedious, high-volume job firms want to hand to an AI tool. It is also the job where a general chatbot is most likely to be confidently wrong. This post sets out a method that uses AI for the volume and keeps the section numbers anchored to the official source.

## What actually changed, in four facts

- **Dates.** Parliament passed the Bill on 12 August 2025, it received the President’s assent on 21 August 2025, and it came into force on 1 April 2026, according to the [PIB release of 1 April 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2248005&lang=1&reg=3). The Income-tax Rules, 2026 were notified on 20 March 2026, with new forms.
- **Structure.** Sections fell from 819 to 536 and chapters from 47 to 23, with 39 new tables and 40 new formulas, as [reported by PTI at assent](https://www.thehindu.com/business/Economy/income-tax-act-gets-president-droupadi-murmus-assent/article69965067.ece).
- **Vocabulary.** “Previous year” and “assessment year” are replaced by a single “tax year”, the twelve months of the financial year starting 1 April (section 3 of the [Act as amended by the Finance Act, 2026](https://www.incometaxindia.gov.in/documents/d/guest/income_tax_act_2025_as_amended_by_fa_act_2026-pdf)).
- **Transition.** Section 536 repeals the 1961 Act but keeps it, and its procedure, for proceedings pending on 1 April 2026 and for proceedings started later, including notices, assessments, penalties and appeals, for any tax year beginning before 1 April 2026.

The [government’s own explainer](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/sep/doc202593626601.pdf) presents the Act as simplification, not a policy change. For a practice, that means most of the work is re-addressing: the same rule now sits at a different number, sometimes merged or split.

## Why a chatbot gets this wrong

General-purpose models learnt Indian tax law from six decades of material on the 1961 Act and comparatively little on the 2025 Act. Ask one for “the new section for 80C” and it may answer correctly (section 123), or it may produce a plausible number from a draft Bill, a blog post or nowhere. Both Acts also use the numbers 1 to 536, so a number can be valid in both and mean different things. A wrong reference in an engagement letter is embarrassing; a wrong reference in a reply to a notice is a problem.

The fix is not to avoid AI. It is to stop asking the model to remember section numbers, and make it look them up instead.

## The source of truth already exists

The Income Tax Department’s [Income-tax Act, 2025 page](https://www.incometaxindia.gov.in/income-tax-act-20251) has utilities that show a 1961 Act section next to its counterpart in the 2025 Act, and separate ones for Rules 1962 against Rules 2026 and for old forms against new forms. They can be used without logging in. Every mapping in your firm’s templates should trace back to one of these utilities or to the Act text itself, not to a model’s memory or a third-party table.

## A remapping workflow I would actually run

1. **Inventory.** List every document that cites the Act, Rules or forms: engagement letters, ITR and tax audit checklists, TDS rate charts, notice-reply templates, advance tax reminders, onboarding forms, standard client emails and any prompts your team already uses.
2. **Extract.** Use AI to pull every statutory reference into one table: document, paragraph, reference as written, and the sentence around it. This is pure extraction and models do it well. Spot-check a sample against the originals.
3. **Classify by tax year.** Mark each reference as relating to 2025-26 or earlier (stays on the 1961 Act under section 536), 2026-27 onwards (moves to the 2025 Act), or both.
4. **Map from the official utility.** A person, or a script reading a table built from the CBDT utility, fills in the new section, rule or form. The model does not choose numbers. Flag anything that maps to more than one provision, or to none, for a senior.
5. **Draft the new wording.** Now let AI rewrite the paragraph using the mapped reference. During the transition, dual references help clients and staff: “section 123 of the Income-tax Act, 2025 (section 80C of the 1961 Act)”. Replace “assessment year” with “tax year” only where the document relates to 2026-27 onwards.
6. **Review and version.** A named reviewer approves each changed template, the old version is archived, and the mapping table is saved as the working paper.

Keep client data out of this exercise entirely: it is about templates, not files. Where a template carries client details, strip them first, in line with my [DPDP rubric for CA firms](https://pratikbajoria.com/blog/2026-10-19-dpdp-act-and-ai-in-ca-firms-in-india-a-client-data-decision-rubric).

Decision rubric for Income-tax Act, 2025 transition work. Evaluation framework only; adapt it to your practice. Not legal advice or benchmark data.

| Task | AI role | Minimum review gate | Stop if |
| --- | --- | --- | --- |
| Extract references from templates | Automate | Sample check against originals | Scanned documents have not been OCR-checked |
| Old-to-new section mapping | Lookup only, from the CBDT utility | Every row cites the utility or Act text | A number came from the model’s memory |
| Split, merged or omitted provisions | Flag only | Senior reads both texts | The wording, not just the number, has changed |
| Rewriting template paragraphs | Draft | Reviewer approves each changed template | The draft introduces a reference not in the mapping table |
| Client explainer emails | Draft | Partner signs off the master version | It promises tax outcomes |
| Which Act governs a proceeding; grounds of appeal | Human only | Partner decision, recorded | Anyone relies on a tool’s summary of section 536 |

## Where judgement stays human

Three calls should not be delegated. First, which law governs a matter: a reassessment notice issued this year for 2023-24 runs under the 1961 Act and its procedure, by virtue of section 536, even though it is dated after 1 April 2026. Second, whether a provision has changed in substance and not just in number; the Finance Act, 2026 has already amended the new Act, so always read the current text. Third, anything in litigation, where existing grounds and citations stay on the old numbering. The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) describes this as managing risk at the point of use: here, the tool prepares, a person decides, and the decision is written down.

The same thinking applies to the forms. My [tax audit post](https://pratikbajoria.com/blog/2026-10-09-ai-for-tax-audit-in-india-form-3cd-this-year-form-26-next-year) covers the move from Form 3CD to its successor, and the [TDS reconciliation guide](https://pratikbajoria.com/blog/2026-10-13-using-ai-for-tds-reconciliation-in-indian-ca-firms-from-26as-to-form-168) covers the statements side. To roll the remapping out across the firm, use the [90-day pilot structure](https://pratikbajoria.com/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india): one team, one set of templates, then scale.

## Monday-morning checklist

- Name one owner for the firm’s Act 2025 mapping table.
- Bookmark the CBDT utilities for sections, rules and forms, and ban model-generated section numbers in client documents.
- Inventory every template that cites the Act, Rules or forms.
- Tag each reference by tax year: 2025-26 and earlier, 2026-27 onwards, or both.
- Update engagement letters and advance tax reminders for 2026-27 first; they reach the most clients.
- Keep litigation files and pending-proceeding templates on 1961 Act references.

For the wider picture of AI in a practice, start from the [AI for Chartered Accountants in India hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india). To see which compliance work is worth automating first, take the [free AI Opportunity Scorecard](https://pratikbajoria.com/scorecard), look at the scoped [AI Opportunity Audit](https://pratikbajoria.com/audit), or [book a discovery call](https://pratikbajoria.com/#contact).

## Frequently asked questions

### Which income-tax law applies to FY 2025-26 income?

The Income-tax Act, 1961. Section 536 of the Income-tax Act, 2025 keeps the 1961 Act and its procedure for proceedings relating to any tax year beginning before 1 April 2026, including notices, assessments, penalties and appeals started after that date. Income from 1 April 2026 falls under the 2025 Act.

### Where can I check the new section number for an old section?

Use the utilities on the Income Tax Department’s Income-tax Act, 2025 page, which show a 1961 Act section beside its 2025 Act counterpart, with separate utilities for the Rules and the forms. Treat that, and the Act text, as the source of truth rather than a chatbot answer.

### Can AI update a CA firm’s templates for the Income-tax Act, 2025?

Yes, for extraction and drafting. AI can list every statutory reference in your templates and rewrite paragraphs once the mapping is fixed. The mapping itself should come from the official utility, and a named reviewer should approve each changed template.

## Keep reading in this topic

Part of [AI for Chartered Accountants in India: the implementation hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india).

- [AI for Tax Audit in India: Form 3CD This Year, Form 26 Next Year](https://pratikbajoria.com/blog/2026-10-09-ai-for-tax-audit-in-india-form-3cd-this-year-form-26-next-year)
- [Drafting Replies to GST and Income Tax Notices With AI Without Losing Control](https://pratikbajoria.com/blog/2026-10-12-drafting-replies-to-gst-and-income-tax-notices-with-ai-without-losing-control)
- [AI for GSTR-9 and GSTR-9C: What a CA Can Automate Before 31 December](https://pratikbajoria.com/blog/2026-11-09-ai-for-gstr-9-and-gstr-9c-what-a-ca-can-automate-before-31-december)

Also useful: [AI Opportunity Audit for CA firms](https://pratikbajoria.com/ai-opportunity-audit-for-ca-firms).

## Sources

- [PIB — Income-tax Act, 2025 comes into force from today (1 April 2026)](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2248005&lang=1&reg=3)
- [Income Tax Department — Income-tax Act, 2025 page with section, rules and forms comparison utilities](https://www.incometaxindia.gov.in/income-tax-act-20251)
- [Income Tax Department — Income-tax Act, 2025 as amended by the Finance Act, 2026 (sections 3 and 536)](https://www.incometaxindia.gov.in/documents/d/guest/income_tax_act_2025_as_amended_by_fa_act_2026-pdf)
- [PIB — The Income Tax Act, 2025: Reshaping Tax Framework (3 September 2025)](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/sep/doc202593626601.pdf)
- [The Hindu (PTI) — Income Tax Act gets President Droupadi Murmu’s assent (22 August 2025)](https://www.thehindu.com/business/Economy/income-tax-act-gets-president-droupadi-murmus-assent/article69965067.ece)
- [NIST — AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

*Disclaimer: this article is general educational commentary from implementation work. It is not tax or legal advice. Section numbers, rules and forms under the Income-tax Act, 2025 are being amended and clarified; verify every reference against the official utilities and the current Act text, and take professional advice before relying on it in a filing, notice reply or appeal.*

*Educational content; not financial, investment, or legal advice.*

## Related
- [DPDP rubric for CA firms](https://pratikbajoria.com/blog/2026-10-19-dpdp-act-and-ai-in-ca-firms-in-india-a-client-data-decision-rubric)
- [tax audit post](https://pratikbajoria.com/blog/2026-10-09-ai-for-tax-audit-in-india-form-3cd-this-year-form-26-next-year)
- [TDS reconciliation guide](https://pratikbajoria.com/blog/2026-10-13-using-ai-for-tds-reconciliation-in-indian-ca-firms-from-26as-to-form-168)
- [90-day pilot structure](https://pratikbajoria.com/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india)
- [AI for Chartered Accountants in India hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india)
- [free AI Opportunity Scorecard](https://pratikbajoria.com/scorecard)
- [AI Opportunity Audit](https://pratikbajoria.com/audit)
- [Drafting Replies to GST and Income Tax Notices With AI Without Losing Control](https://pratikbajoria.com/blog/2026-10-12-drafting-replies-to-gst-and-income-tax-notices-with-ai-without-losing-control)
- [All articles](https://pratikbajoria.com/blog)
