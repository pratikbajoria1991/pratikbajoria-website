# AI for AOC-4 and MGT-7 Filings: What a CA Can Automate Before the ROC Deadline

> How a CA firm can use AI to tie AOC-4 to signed accounts and build MGT-7 data before the section 137 and 92 deadlines, and what stays human.

Canonical: https://pratikbajoria.com/blog/2026-10-28-ai-for-aoc-4-and-mgt-7-filings-what-a-ca-can-automate-before-the-roc-deadline
Last updated: 2026-10-28

CA insights · 2026-10-28 · 6 min read

How a CA firm can use AI to tie AOC-4 to signed accounts and build MGT-7 data before the section 137 and 92 deadlines, and what stays human.

Key takeaways

- AOC-4 is due within thirty days of the AGM under section 137, and MGT-7 within sixty days under section 92(4).
- AI is best used to compare form data with the signed accounts and to build shareholding, director and meeting tables with a source on every row.
- Reasons for not holding an AGM, penalties, compounding, MGT-8 certification and the digital signature stay with people.
- Late annual returns attract ten thousand rupees plus one hundred rupees a day, capped at two lakh rupees for the company.
- Build the master data once for AOC-4 and reuse it for MGT-7, and keep client identifiers inside a firm-managed business AI account.

Late October is when the ROC season stops being theoretical. Most companies with a 31 March year-end held their AGMs by the end of September, which puts AOC-4 and MGT-7 on the same desk as tax audit follow-ups and the first GST notices of the half-year. Firms are now asking me a reasonable question: can AI take some of this load without putting a wrong number on a public record?

It can, if you are strict about where it sits. ROC filings are a good fit for AI because most of the work is carrying data that already exists from one document into another and checking that it matches. They are a bad fit for AI wherever the filing records a judgement or a certification. Below is how I draw that line, with the statutory dates the workflow has to respect.

## The dates the workflow is built around

Three sections of the Companies Act, 2013 set the clock, and every AI step below should be planned backwards from them.

- **The AGM.** Under [section 96](https://ca2013.com/annual-general-meeting/), an AGM after the first must be held within a period of six months from the close of the financial year (subject to the other conditions in the section and any extension granted).
- **Financial statements (AOC-4).** [Section 137](https://ca2013.com/137-copy-of-financial-statement-to-be-filed-with-registrar/) requires the adopted financial statements, with the attached documents, to be filed with the Registrar within thirty days of the AGM. Unadopted statements go in within the same thirty days and are taken on record as provisional.
- **Annual return (MGT-7 or MGT-7A).** [Section 92(4)](https://indiacode.ecourtsindia.com/companies-act/section/92/) gives sixty days from the AGM, or from the date it should have been held. Section 92(5) sets a penalty of ten thousand rupees for failure, plus one hundred rupees a day while it continues, capped at two lakh rupees for the company and fifty thousand rupees for an officer in default.

So for a company whose AGM was on 30 September, AOC-4 falls due at the end of October and MGT-7 about a month later. That gap matters. It means you can use AI for the AOC-4 tie-out now and reuse the same extracted master data for the annual return, instead of keying the shareholding and director details twice.

## Where AI earns its place in ROC work

The useful jobs are all variations of “read, extract, compare, list the differences”.

- **Tying the form to the signed accounts.** Give the tool the signed financial statements and the draft AOC-4 data and ask for a line-by-line comparison: every figure, with the page and note it came from. A person then checks only the mismatches and the figures the tool could not locate.
- **Building the master data once.** Shareholding pattern, transfers during the year, directors and KMP with appointment and cessation dates, meeting dates and attendance. These come from registers, minutes and earlier filings. AI is quick at pulling them into one table with a source reference against each row.
- **Cross-checking the board’s report.** [Section 134](https://ca2013.com/134-financial-statement-boards-report-etc/) lists what the board’s report must contain. A checklist run, with the tool marking each required matter as present, absent or unclear, is a fast first review before the partner reads it properly.
- **Year-on-year consistency.** Comparing this year’s draft against last year’s filed forms catches the dull errors: a changed CIN typo, a director still listed after resignation, a share count that does not roll forward.
- **The filing tracker.** For a firm with many companies, a tracker that reads AGM dates and computes the section 137 and section 92 deadlines, then flags anything missing, is the least glamorous and most valuable automation on this list. The arithmetic is simple; the value is that nobody has to remember.

## What stays with people

Anything that is a judgement, a declaration or a certification stays human, and the tool should not be allowed to fill it in “helpfully”.

- Whether the financial statements were adopted, and the treatment if they were not.
- The reasons statement where no AGM was held. That is the company’s explanation, not a template.
- Penalties, compounding and related-party disclosures in the annual return, which need the facts from management and the legal file.
- Certification. The annual return of a listed company, or one above the prescribed paid-up capital or turnover, must be certified by a company secretary in practice in MGT-8. The [ICSI guidance note on the annual return](https://www.icsi.edu/media/webmodules/publications/A29ChapterPages.pdf) sets the thresholds out as paid-up capital of ten crore rupees or turnover of fifty crore rupees. A certifying professional has to form their own view from the records; a model summary is not evidence.
- The digital signature. No workflow should store or apply a DSC on anyone’s behalf.

## A decision table for ROC filings

I use the same structure as the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework): map the task, decide the AI role, set the review gate and agree when to stop.

Evaluation framework only. Adapt it to your practice; this is not legal advice or benchmark data.

| Task | AI role | Minimum review gate | Stop if |
| --- | --- | --- | --- |
| Deadline tracker from AGM dates | Automate | Manager checks AGM dates against minutes once | AGM dates taken from email rather than minutes |
| AOC-4 figures against signed accounts | Automate the comparison | Article clerk or senior clears every mismatch | Tool compares against an unsigned draft |
| Shareholding, directors and meetings table | Assist | Each row traced to a register or minute | Rows without a source reference |
| Board’s report checklist under section 134 | Assist | Partner reads the report in full | The checklist replaces the read |
| Reasons for not holding an AGM, penalties, compounding | Human only | Facts confirmed by management in writing | Any text drafted from a template without facts |
| MGT-8 certification | Human only | Practising CS forms an independent view | Certification relies on a model summary |

## Client data before the first upload

ROC files carry personal data: director PAN and DIN details, addresses and shareholder lists. Use a business AI plan whose retention and training terms a partner has actually read, mask identifiers the task does not need, and keep the extraction inside a firm-managed account. The same reasoning I set out for [DPDP and AI in CA firms](https://pratikbajoria.com/blog/2026-10-19-dpdp-act-and-ai-in-ca-firms-in-india-a-client-data-decision-rubric) applies here: decide your role on the engagement, then decide what the tool may see.

## Monday-morning checklist

- List every company whose AGM was held, and the date, from the minutes.
- Compute the section 137 and section 92 due dates and sort the list by the nearer one.
- Run the AOC-4 tie-out against signed accounts only; clear the mismatch list the same day.
- Build the master data table once, with a source against every row, and reuse it for MGT-7.
- Mark the human-only fields in each form before anyone opens the tool.
- Keep a short log: what the tool compared, what a person changed, who signed off.

If you want to see where this sits among the other workflows in a practice, start from the [AI for Chartered Accountants in India hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india), or take the [free AI Opportunity Scorecard](https://pratikbajoria.com/scorecard) to see which compliance work is worth automating first.

## Frequently asked questions

### Can AI file AOC-4 or MGT-7 for a company?

AI can prepare and cross-check the data, for example by comparing AOC-4 figures with the signed financial statements and building the shareholding and director tables for MGT-7. The filing, declarations, certification and digital signature remain the responsibility of the company and its professionals.

### What is the due date for AOC-4 and MGT-7?

Under section 137 of the Companies Act, 2013, financial statements are filed within thirty days of the AGM. Under section 92(4), the annual return is filed within sixty days of the AGM, or of the date it should have been held. Check MCA circulars for any extension.

### What is the penalty for filing MGT-7 late?

Section 92(5) sets a penalty of ten thousand rupees, plus one hundred rupees for each day the failure continues, up to two lakh rupees for the company and fifty thousand rupees for an officer in default.

## Keep reading in this topic

Part of [AI for Chartered Accountants in India: the implementation hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india).

- [AI for CARO 2020 reporting: where it helps and where judgement stays](https://pratikbajoria.com/blog/2026-10-16-ai-for-caro-2020-reporting-where-it-helps-and-where-judgement-stays)
- [DPDP Act and AI in CA Firms in India: A Client-Data Decision Rubric](https://pratikbajoria.com/blog/2026-10-19-dpdp-act-and-ai-in-ca-firms-in-india-a-client-data-decision-rubric)
- [AI Controls Checklist for CA Firms in India: Practical Review Gates](https://pratikbajoria.com/blog/ai-controls-checklist-ca-firms-india)

Also useful: [AI Opportunity Audit for CA firms](https://pratikbajoria.com/ai-opportunity-audit-for-ca-firms).

## Sources

- [Companies Act, 2013 — Section 96: Annual general meeting (CAIRR)](https://ca2013.com/annual-general-meeting/)
- [Companies Act, 2013 — Section 137: Copy of financial statement to be filed with Registrar (CAIRR)](https://ca2013.com/137-copy-of-financial-statement-to-be-filed-with-registrar/)
- [Companies Act, 2013 — Section 92: Annual return (India Code text)](https://indiacode.ecourtsindia.com/companies-act/section/92/)
- [Companies Act, 2013 — Section 134: Financial statement, Board’s report (CAIRR)](https://ca2013.com/134-financial-statement-boards-report-etc/)
- [ICSI — Guidance Note on Annual Return](https://www.icsi.edu/media/webmodules/publications/A29ChapterPages.pdf)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

*Disclaimer: this article is general educational commentary from implementation work. It is not legal or company-law advice. Due dates, penalties and MCA forms change and extensions are notified by circular; verify the primary text and take professional advice before filing.*

*Educational content; not financial, investment, or legal advice.*

## Related
- [DPDP and AI in CA firms](https://pratikbajoria.com/blog/2026-10-19-dpdp-act-and-ai-in-ca-firms-in-india-a-client-data-decision-rubric)
- [AI for Chartered Accountants in India hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india)
- [free AI Opportunity Scorecard](https://pratikbajoria.com/scorecard)
- [AI for CARO 2020 reporting: where it helps and where judgement stays](https://pratikbajoria.com/blog/2026-10-16-ai-for-caro-2020-reporting-where-it-helps-and-where-judgement-stays)
- [AI Controls Checklist for CA Firms in India: Practical Review Gates](https://pratikbajoria.com/blog/ai-controls-checklist-ca-firms-india)
- [AI Opportunity Audit for CA firms](https://pratikbajoria.com/ai-opportunity-audit-for-ca-firms)
- [All articles](https://pratikbajoria.com/blog)
