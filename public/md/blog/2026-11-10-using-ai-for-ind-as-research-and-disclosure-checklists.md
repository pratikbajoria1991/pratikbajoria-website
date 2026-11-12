# Using AI for Ind AS Research and Disclosure Checklists

> Use AI to find the right Ind AS paragraph, build disclosure checklists and compare peer disclosures. Never let it decide the accounting treatment. A CA’s method.

Canonical: https://pratikbajoria.com/blog/2026-11-10-using-ai-for-ind-as-research-and-disclosure-checklists
Last updated: 2026-11-10

CA insights · 2026-11-10 · 4 min read

Ind AS research is one of the places where AI is both most tempting and most dangerous. Tempting, because the standards are long and cross-referenced, and a good assistant can find the relevant paragraph in seconds. Dangerous, because a plausible answer about recognition or measurement can be completely wrong, and the error ends up in audited financial statements.

My rule is simple: AI may find, organise and compare. It may not decide the accounting.

## Who is on Ind AS

The [Companies (Indian Accounting Standards) Rules, 2015](https://thc.nic.in/Central%20Governmental%20Rules/Companies%20%28Indian%20Accounting%20Standards%29%20Rules,2015.pdf) brought in Ind AS in phases. From accounting periods beginning on or after 1 April 2016: listed companies and companies in the process of listing with net worth of ₹500 crore or more, and unlisted companies with net worth of ₹500 crore or more, together with their holding, subsidiary, joint venture and associate companies. From 1 April 2017: the remaining listed companies and those in the process of listing, and unlisted companies with net worth of ₹250 crore or more but less than ₹500 crore, again with their group companies.

Voluntary adoption is irrevocable, and once a company applies Ind AS it continues even if it later falls below the thresholds. That leaves a long tail of mid-sized companies, and the CAs who work with them, who need reliable Ind AS research without a technical accounting team.

## Where AI is genuinely useful

Gartner’s [2025 AI in Finance survey](https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-survey-shows-finance-ai-adoption-remains-steady-in-2025) found knowledge management to be the most common finance AI use case, at 49% of adopters. Ind AS research is knowledge management with higher stakes.

- Finding the relevant standard and paragraphs for a fact pattern, as a starting point for reading the standard itself.
- Building a disclosure checklist for a specific company from the standards that apply to it, and marking which items are relevant to its transactions.
- Comparing a draft note with the checklist and flagging omissions.
- Comparing disclosures with peers. ICAI’s [CA GPT Industry Forum](https://icai.org/post/prc-icai-unveils-groundbreaking-ca-gpt-platform) integrated annual reports of about 5,000 listed companies for 2023-24 into its member platform, which makes this kind of benchmarking far quicker.
- Summarising changes between the previous year’s notes and this year’s draft.

## Where it must not go

Recognition, measurement, classification and judgement-heavy areas such as revenue from contracts with multiple obligations, leases, financial instruments, impairment and consolidation need a qualified person reading the standard and the facts. An assistant can describe what a standard says in general; it does not know your contract terms, and it will not reliably flag the exception that changes the answer.

I would also never accept an AI paragraph reference without opening the standard. References are where general-purpose tools fail most quietly: the paragraph exists but says something different, or belongs to a different standard.

## A research method that holds up

- Write the fact pattern first, in your own words, with the key contract terms.
- Ask the assistant for the relevant standards and paragraphs, not for the answer.
- Read those paragraphs in the official text, and any related guidance your firm relies on.
- Form the conclusion yourself, and write a short memo stating facts, analysis and conclusion.
- Keep the AI interaction in the file as supporting research, clearly labelled.

## Disclosure checklists: the best first use

If you want one place to start, make it the disclosure checklist. It is structured, it is easy to check against the standards, and an omission found by the checklist is cheap; an omission found by a regulator is not.

Treat the tool the way ICAI’s [SIA 240](https://internalaudit.icai.org/wp-content/uploads/2026/03/Comp-of-Stnd-on-Internal-Audit-26.pdf) asks internal auditors to treat any tool: validate its outputs against known results before relying on it, document how it was used, and apply professional judgement to everything it produces. Run last year’s approved financial statements through the checklist process first and see whether it finds what your reviewers found. Which assistant you use matters less than this discipline, though I compared the main options in [ChatGPT vs Copilot vs Gemini for a CA firm](https://pratikbajoria.com/blog/2026-10-05-chatgpt-vs-copilot-vs-gemini-how-a-ca-firm-in-india-should-choose-an-ai-assistant).

## Frequently asked questions

### Which companies must follow Ind AS?

Under the Companies (Indian Accounting Standards) Rules, 2015: listed companies and those in the process of listing, unlisted companies with net worth of ₹250 crore or more, and their holding, subsidiary, joint venture and associate companies, applied in phases from 1 April 2016 and 1 April 2017.

### Can AI decide an Ind AS accounting treatment?

No. It can help find relevant paragraphs and organise research, but recognition, measurement and classification decisions need a qualified person who has read the standard and the facts, documented in a memo.

### What is ICAI CA GPT?

ICAI’s AI platform for members, launched in July 2024 and free for members. In November 2024 ICAI added an Industry Forum with annual reports of about 5,000 listed companies for 2023-24.

### What is a good first AI use in financial reporting?

A disclosure checklist built from the standards that apply to the company, used to compare draft notes and flag omissions, validated first against a set of financial statements that has already been reviewed.

## Sources

- [Companies (Indian Accounting Standards) Rules, 2015 (Gazette text)](https://thc.nic.in/Central%20Governmental%20Rules/Companies%20%28Indian%20Accounting%20Standards%29%20Rules,2015.pdf)
- [ICAI: CA GPT platform press release (25 November 2024)](https://icai.org/post/prc-icai-unveils-groundbreaking-ca-gpt-platform)
- [Gartner: Finance AI adoption remains steady in 2025 (press release)](https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-survey-shows-finance-ai-adoption-remains-steady-in-2025)
- [ICAI Internal Audit Standards Board: Compendium of Standards on Internal Audit, 2026 (SIA 240, Use of Tools)](https://internalaudit.icai.org/wp-content/uploads/2026/03/Comp-of-Stnd-on-Internal-Audit-26.pdf)

*Disclaimer: this article is general educational commentary. It is not legal, tax, audit or data-protection advice and does not create an adviser–client relationship. Laws, standards and thresholds change; check the current official text and take professional advice on your facts before acting.*

*Educational content; not financial, investment, or legal advice.*

## Related
- [AI for Chartered Accountants in India: the implementation hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india)
- [ChatGPT vs Copilot vs Gemini for a CA firm](https://pratikbajoria.com/blog/2026-10-05-chatgpt-vs-copilot-vs-gemini-how-a-ca-firm-in-india-should-choose-an-ai-assistant)
- [AI controls checklist for CA firms in India](https://pratikbajoria.com/blog/ai-controls-checklist-ca-firms-india)
- [The AI Opportunity Audit: a scoped 90-day map](https://pratikbajoria.com/audit)
- [All articles](https://pratikbajoria.com/blog)
