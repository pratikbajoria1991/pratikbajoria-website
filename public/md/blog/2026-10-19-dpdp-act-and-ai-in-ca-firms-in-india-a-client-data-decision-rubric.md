# DPDP Act and AI in CA Firms in India: A Client-Data Decision Rubric

> How CA firms in India should use AI under the DPDP Act and Rules, 2025: decide your role, vendor terms, safeguards and logs, with a rubric and Monday checklist.

Canonical: https://pratikbajoria.com/blog/2026-10-19-dpdp-act-and-ai-in-ca-firms-in-india-a-client-data-decision-rubric
Last updated: 2026-10-19

CA insights · 2026-10-19 · 7 min read

How CA firms in India should use AI under the DPDP Act and Rules, 2025: decide your role, vendor terms, safeguards and logs, with a rubric and Monday checklist.

Key takeaways

- Under the DPDP Act, 2023, a CA firm can be a Data Fiduciary or a Data Processor depending on the engagement; decide which before any AI tool touches client personal data.
- Most operational obligations in the DPDP Rules, 2025, including security safeguards and breach intimation, commence eighteen months after the 13 November 2025 Gazette publication, in May 2027.
- Rule 6 safeguards read as an AI checklist: mask identifiers, use firm-managed accounts, keep logs for one year and put security terms in the processor contract.
- Breach intimation runs to affected individuals without delay and to the Data Protection Board, with a detailed report within seventy-two hours unless the Board allows longer.
- Score every client-data AI workflow on role clarity, minimisation, vendor terms, access, logs, data location, human review and breach readiness before it runs.

Most CA practices in India now have someone pasting client material into an AI assistant, and some of it is personal data: salary registers, Form 16s, KYC documents, director details for ROC filings. Under the Digital Personal Data Protection Act, 2023 that is a question of responsibility, contract and safeguards, and the DPDP Rules, 2025 have now put dates on it. I write as Pratik Bajoria, Chartered Accountant, ex-Big 4 and founder of Findost. This is a partner’s decision rubric, not legal advice and not a tool review.

## Why the clock matters for CA firms now

The Rules were published in the Gazette on 13 November 2025 as G.S.R. 846(E) and commence in stages. Rules 1, 2 and 17 to 21 took effect on publication; Rule 4, on consent managers, follows a year later. The operational core — notice, security safeguards, breach intimation, retention and erasure, in Rules 3, 5 to 16, 22 and 23 — commences eighteen months after publication, in May 2027. A client-data AI workflow started this quarter will still be running then, and designing for it now is cheaper than retrofitting habits across every associate’s laptop mid-season.

## First decide your role, engagement by engagement

The Act turns on two roles. A Data Fiduciary decides why and how personal data is processed; a Data Processor processes it on a fiduciary’s behalf. A CA firm can be either. Running payroll or bookkeeping for a company that decides what it collects about its staff and vendors, the firm may well be the client’s processor. Holding an individual’s documents to prepare and file their return, it may look more like a fiduciary. The classification turns on facts and engagement terms, so take counsel’s view; what matters here is the consequence.

A fiduciary stays responsible under section 8(1) for processing done on its behalf, irrespective of any agreement to the contrary, and section 8(2) allows it to involve a processor only under a valid contract. An AI vendor receiving client personal data sits in that chain. If the firm is itself the client’s processor, the client’s obligations flow down through the engagement letter, and an unapproved tool puts the client and the relationship at risk.

Alongside this sits Subsection 114 of [ICAI’s Code of Ethics](https://disc.icai.org/code-of-ethics/): no disclosure of client information outside the firm without proper and specific authority, and reasonable steps so that staff respect that duty. The DPDP Act adds statutory consequences to a duty the profession already had.

## What the Rules expect of safeguards, read as an AI checklist

Rule 6 lists the minimum “reasonable security safeguards”. Four matter most for AI:

- **Protect the data itself** by encryption, obfuscation, masking or virtual tokens: mask PANs, account numbers and names before a prompt whenever the task does not need them.
- **Control access** to the computer resources used: firm-managed business accounts, not personal logins.
- **Keep logs** with monitoring and review so unauthorised access can be detected and investigated, retained for one year unless another law requires otherwise.
- **Write security into the processor contract**, as the Rule expects.

Rule 7 adds breach intimation: affected individuals without delay, and the Data Protection Board without delay, with a detailed report within seventy-two hours unless the Board allows longer. The Government’s own explainer notes penalties of up to ₹250 crore for failing to maintain reasonable security safeguards and up to ₹200 crore for failing to notify a breach.

## A decision rubric for any AI workflow that touches client personal data

Score each workflow from one to five on every axis before it touches a live client file. A one on role clarity, vendor terms or human review means redesign before it runs. The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) groups this work as govern, map, measure and manage; treat the rubric as the “map” step for client data.

Evaluation framework only. Score your own workflows; this is not legal advice or benchmark data.

| Axis | Question to answer | Proceed (5) | Stop and redesign (1) | Your score |
| --- | --- | --- | --- | --- |
| Role clarity | Fiduciary or processor on this engagement? | Recorded and reflected in the engagement letter | Never asked | \_\_\_ |
| Minimisation | Does the task need identifiers? | Masked or removed; only needed fields sent | Full ledgers or KYC pasted by default | \_\_\_ |
| Vendor terms | What do terms say on training, retention, sub-processors? | Business plan; terms read and filed by a partner | Consumer account; terms unread | \_\_\_ |
| Access | Who uses it, from which account? | Firm-managed accounts, multi-factor sign-in, leavers process | Personal logins or shared passwords | \_\_\_ |
| Logs and retention | Can we show who sent what, and delete on schedule? | Logs available; retention set against Rule 6 | No logs, or history kept on personal devices | \_\_\_ |
| Data location | Where is data processed and stored? | Region recorded; watch for section 16 notifications | Unknown | \_\_\_ |
| Human review | Who checks output before it leaves the firm? | Named reviewer, recorded sign-off | Output goes straight to the client | \_\_\_ |
| Breach readiness | Wrong file pasted: who is told, how fast? | Written escalation path; partner assesses within hours | Found at the next peer review | \_\_\_ |

Model quality does not appear. A modest tool on a firm-managed account, with masked inputs and a named reviewer, is easier to defend than a stronger one used from a personal login.

## Where AI still earns its place in the practice

None of this keeps AI out of the firm. Research on a provision, the structure of a reply, checklists and working-paper templates need no personal data; start there. Where client data is unavoidable, follow the pattern in [how Indian CA firms can use AI for GST reconciliation without risking client data](https://pratikbajoria.com/blog/2026-09-28-how-indian-ca-firms-can-use-ai-for-gst-reconciliation-without-risking-client-data). The [AI controls checklist for CA firms](https://pratikbajoria.com/blog/ai-controls-checklist-ca-firms-india) sets review gates once a workflow is live; this rubric decides whether it may touch personal data at all. For the vendor choice, see [ChatGPT, Copilot or Gemini for a CA firm in India](https://pratikbajoria.com/blog/2026-10-05-chatgpt-vs-copilot-vs-gemini-how-a-ca-firm-in-india-should-choose-an-ai-assistant), then read the vendor’s own documentation for your plan, such as [Microsoft’s Copilot privacy page](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy) or [Google’s Workspace generative AI privacy hub](https://knowledge.workspace.google.com/admin/generative-ai/generative-ai-in-google-workspace-privacy-hub).

For the wider map, start at the [AI for chartered accountants in India](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india) hub. To score your own opportunities, take the free [AI Opportunity Scorecard](https://pratikbajoria.com/scorecard), see the scoped [AI Opportunity Audit](https://pratikbajoria.com/audit), or [book a discovery call](https://pratikbajoria.com/#contact).

## Monday-morning checklist

- List every AI tool in use, including personal accounts associates actually use.
- For your five busiest client-data workflows, record whether the firm is fiduciary or processor.
- Move client work to firm-managed business accounts.
- Write a one-line masking rule: no PAN, Aadhaar, account numbers or salary data in prompts unless needed and the tool is approved.
- Read each approved tool’s data terms; file the version and date.
- Ask counsel to review a data-processing clause and AI-use line for your engagement letter.
- Name the person who receives a suspected breach report, and rehearse the seventy-two-hour sequence once.
- Put May 2027 in the partners’ calendar and re-score live workflows each quarter.

## Frequently asked questions

### Does the DPDP Act apply to CA firms that use AI?

Yes, where the firm processes digital personal data such as salary records, KYC or individual tax files. It acts as a Data Fiduciary or a Data Processor depending on the engagement, and an AI vendor receiving that data normally becomes a processor in the chain.

### When do the DPDP Rules, 2025 obligations apply?

The Rules were published on 13 November 2025. Some took effect immediately; most operational obligations, including security safeguards and breach intimation, commence eighteen months later, in May 2027.

### Can a CA firm use ChatGPT, Copilot or Gemini on client data?

Only after deciding its role for that data, reading the vendor’s business data terms, using firm-managed accounts, masking unneeded identifiers and naming a human reviewer.

## Keep reading in this topic

This guide is part of [AI for Chartered Accountants in India: the implementation hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india).

- [AI Controls Checklist for CA Firms in India: Practical Review Gates](https://pratikbajoria.com/blog/ai-controls-checklist-ca-firms-india)
- [How Indian CA Firms Can Use AI for GST Reconciliation Without Risking Client Data](https://pratikbajoria.com/blog/2026-09-28-how-indian-ca-firms-can-use-ai-for-gst-reconciliation-without-risking-client-data)
- [How to Run a 90-Day AI Pilot in a CA Firm in India: A 30/60/90 Playbook](https://pratikbajoria.com/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india)

Also useful: [AI implementation for finance teams: the CFO and controller guide](https://pratikbajoria.com/ai-implementation-for-finance-teams).

## Sources

- [Digital Personal Data Protection Act, 2023 (Gazette text, MeitY)](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf)
- [Digital Personal Data Protection Rules, 2025 — G.S.R. 846(E), 13 November 2025 (MeitY)](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf)
- [MeitY — Data protection framework](https://www.meity.gov.in/data-protection-framework)
- [PIB — Government notifies DPDP Rules (14 November 2025)](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014)
- [PIB explainer — DPDP Rules, 2025 notified (penalties under the DPDP Act)](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf)
- [ICAI Disciplinary Directorate — Code of Ethics (2019 Volume I, Subsection 114: Confidentiality)](https://disc.icai.org/code-of-ethics/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [Microsoft Learn — Data, privacy and security for Microsoft 365 Copilot](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy)
- [Google Workspace — Generative AI in Google Workspace Privacy Hub](https://knowledge.workspace.google.com/admin/generative-ai/generative-ai-in-google-workspace-privacy-hub)

*Disclaimer: this article is general educational commentary from implementation work. It is not legal, tax, audit, data-protection or procurement advice, and it does not create an adviser–client relationship. The DPDP Act and Rules, ICAI pronouncements and vendor terms change; verify primary sources and take professional advice on your specific facts before acting.*

*Educational content; not financial, investment, or legal advice.*

## Related
- [how Indian CA firms can use AI for GST reconciliation without risking client data](https://pratikbajoria.com/blog/2026-09-28-how-indian-ca-firms-can-use-ai-for-gst-reconciliation-without-risking-client-data)
- [AI controls checklist for CA firms](https://pratikbajoria.com/blog/ai-controls-checklist-ca-firms-india)
- [ChatGPT, Copilot or Gemini for a CA firm in India](https://pratikbajoria.com/blog/2026-10-05-chatgpt-vs-copilot-vs-gemini-how-a-ca-firm-in-india-should-choose-an-ai-assistant)
- [AI for chartered accountants in India](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india)
- [AI Opportunity Scorecard](https://pratikbajoria.com/scorecard)
- [AI Opportunity Audit](https://pratikbajoria.com/audit)
- [How to Run a 90-Day AI Pilot in a CA Firm in India: A 30/60/90 Playbook](https://pratikbajoria.com/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india)
- [AI implementation for finance teams: the CFO and controller guide](https://pratikbajoria.com/ai-implementation-for-finance-teams)
- [All articles](https://pratikbajoria.com/blog)
