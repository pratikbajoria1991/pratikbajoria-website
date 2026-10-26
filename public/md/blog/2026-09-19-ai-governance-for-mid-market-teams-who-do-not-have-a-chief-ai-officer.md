# AI Governance for Indian Companies and CA Firms Without a Chief AI Officer

> A chartered accountant’s one-page AI governance for Indian mid-market companies and CA firms: four rules, mapped to DPDP, MeitY’s AI Governance Guidelines, NFRA and the audit-trail rule.

Canonical: https://pratikbajoria.com/blog/2026-09-19-ai-governance-for-mid-market-teams-who-do-not-have-a-chief-ai-officer
Last updated: 2026-10-26

AI governance · 2026-09-19 · Updated 26 Oct 2026 · 6 min read

Four one-page rules beat a 40-page policy nobody reads — mapped to the Indian anchors that matter: DPDP, MeitY’s AI Governance Guidelines, NFRA and the Companies Act audit trail.

**Quick answer.** You do not need a Chief AI Officer to govern AI in an Indian company or CA firm. You need four one-page rules: a named owner for every AI-assisted workflow, data classes that say what may never leave firm systems, human approval gates before anything reaches a client, a filing or the ledger, and a change log. Map those rules to DPDP, MeitY’s India AI Governance Guidelines and, for audit firms, NFRA’s technology principles.

Mid-market teams do not need a Chief AI Officer to govern AI. They need four rules people can recite on a Monday morning. A 40-page policy nobody opens is theatre. A one-page set of ownership, data, review and logging rules is an operating control.

I still see boards ask for “AI governance” the way they once asked for “innovation labs”: a committee, a slide, and no change to how work actually moves. Governance that works is boring on purpose. It makes the safe path the easy path. It names who owns a use case, which data classes a system may touch, when a human must approve, and what evidence must remain if auditors or clients ask how an answer was produced.

Start with a use-case register, not a model catalogue. For each candidate workflow write five lines: input, decision, output, owner, and what “good” looks like today. If those lines are blank, you are not ready for a model — you are guessing. Rank the register by P&L impact and control risk. Fund one narrow release with a named metric. Ignore the impressive adjacent idea until the first release either proves itself or fails cleanly.

The four one-page rules I recommend teams adopt are deliberately short.

**1. Ownership.** Every live AI-assisted workflow has a named business owner and a named technical steward. The business owner owns the metric and the stop conditions. The steward owns access, logging and change control. Dual ownership prevents the classic failure mode where IT “keeps the lights on” while Finance assumes the output is already reviewed.

**2. Data classes.** Decide in advance which data may leave the company systems, which must stay in a controlled environment, and which must never be pasted into a consumer chatbot. Client identifiable data, unpublished financials and privileged advice sit in the restricted class by default. If a tool cannot honour that boundary, it stays in draft mode or it is declined.

**3. Human gates.** Define which outputs require a person to approve before they become a deliverable, a journal, a client message or a management pack line. In finance and client work, an unauditable answer is not a deliverable. Keep judgement and exception handling with a named human; automate intake, drafting and matching where the risk is lower.

**4. Logging and change.** Prompt libraries, model versions, connectors and access grants change. Treat those changes like any other control-relevant change: note who changed what, when, and why. Retain enough evidence that you can reconstruct a contested output. If you cannot reconstruct it, you cannot defend it.

These rules align with the spirit of public frameworks such as the NIST AI Risk Management Framework: map risks, measure what matters, manage with proportionate controls, and govern with clear accountability. You do not need to copy a regulator’s vocabulary wholesale. You do need the same discipline — proportionate, documented, owned.

Where software helps, use a shared workspace as scaffolding for the register, exception log and weekly review — not as a second policy binder. A simple Notion board with owners, statuses and evidence links is often enough for a mid-market team. Fancy GRC suites can wait until the operating cadence is real.

Ship a thin release to one team for two to four weeks. Run it beside the old process if the risk is material. Review the metric every week — not in a steering committee three months later. Capture exceptions in a shared log so patterns become obvious. If the metric moves and controls hold, document the pattern so the next team does not start from folklore. If it does not move, stop. A failed pilot you can explain is cheaper than a zombie subscription.

Common failure modes are predictable. Governance written by Legal alone becomes unread. Governance owned only by IT becomes a ticket queue. Governance that never names a metric becomes a branding exercise. The cure is the same in each case: one page, four rules, one funded release, one weekly review.

## Monday-morning checklist

- Name the business owner and technical steward for every live AI workflow.
- Classify data the tool may see; block restricted classes by default.
- Write the human approval gate before go-live.
- Confirm logging and change notes exist for prompts, models and connectors.
- Book the weekly metric review; blank lines mean pause the rollout.

## Mapping the four rules to Indian requirements

The four rules are deliberately generic. Here is how I map them for Indian clients, so the one-page policy can point to something recognised when a board, an auditor or a client asks.

Four AI governance rules and their Indian anchors

| Rule | Indian anchor | What it means in practice |
| --- | --- | --- |
| Ownership | [MeitY India AI Governance Guidelines](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2186639) (Nov 2025) | Accountability sits with a named person, on top of existing laws |
| Data classes | [DPDP Rules, 2025](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014) | Client personal data stays in approved, business-grade tools |
| Human gates | [NFRA Staff Series on Technology in Audit](https://nfra.gov.in/staff-series-on-technology-in-audit/) | Audit firms validate tools before live use; a signing professional reviews output |
| Logging and change | Audit-trail proviso to Rule 3(1), Companies (Accounts) Rules, 2014 | Nothing AI-generated reaches the books without a traceable, human posting |

### For CA firms specifically

A CA firm has two extra layers. Client confidentiality is a professional duty, not only a data-protection one, and the partner who signs remains accountable for every opinion and filing whatever tool drafted it. So the firm version of the policy adds two lines: which client data classes may be used with which named tools, and which outputs a signing professional must review before they leave the firm. I go deeper on this in the [AI controls checklist for CA firms](https://pratikbajoria.com/blog/ai-controls-checklist-ca-firms-india) and the [DPDP client-data rubric](https://pratikbajoria.com/blog/2026-10-19-dpdp-act-and-ai-in-ca-firms-in-india-a-client-data-decision-rubric).

For regulated lenders and NBFCs, the RBI’s [FREE-AI committee report](https://rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=61018) (August 2025) is the more specific reference; the MeitY guidelines adapt their seven principles from it.

## Frequently asked questions

### Is there an AI law in India in 2026?

There is no standalone AI statute. MeitY’s India AI Governance Guidelines (November 2025) take a principles-based approach that relies on existing laws such as the DPDP Act and sector rules.

### What AI governance does a CA firm in India need?

A one-page policy covering owners, client data classes, review gates and change logs, plus a rule that a signing professional reviews any AI-assisted output before it reaches a client or a filing.

### Do mid-market companies need a Chief AI Officer?

Usually not. What they need is a named owner for each AI use, a short written policy, an inventory of tools in use and a simple approval and incident process.

### What should a basic AI policy cover?

Approved tools and accounts, which data classes may and may not be used, where human review is mandatory, logging and retention, and who to tell when something goes wrong.

### Which AI governance frameworks are useful for Indian companies?

The NIST AI Risk Management Framework is a free, practical structure. Regulated entities should also read the RBI’s FREE-AI committee report, and any workflow using personal data must account for the DPDP Act, 2023.

## Keep reading in this topic

This guide is part of [AI automation in India: a practical hub for business owners](https://pratikbajoria.com/ai-automation-in-india).

- [WhatsApp Automation That Still Feels Like Customer Care](https://pratikbajoria.com/blog/2026-09-28-whatsapp-automation-that-still-feels-like-customer-care)
- [Build vs Buy: A Decision Framework for AI Tooling](https://pratikbajoria.com/blog/build-vs-buy-ai-tooling)
- [Ecommerce Reconciliation: Where Automation Helps and Where It Lies](https://pratikbajoria.com/blog/2026-09-20-ecommerce-reconciliation-where-automation-helps-and-where-it-lies)

Also useful: [AI implementation for finance teams: the CFO and controller guide](https://pratikbajoria.com/ai-implementation-for-finance-teams).

## Sources

- [PIB: MeitY unveils the India AI Governance Guidelines (5 November 2025)](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2186639)
- [PIB: Government notifies the DPDP Rules, 2025](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014)
- [NFRA: Staff Series on Technology in Audit](https://nfra.gov.in/staff-series-on-technology-in-audit/)
- [RBI: Report of the FREE-AI committee (13 August 2025)](https://rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=61018)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [CISA AI Cybersecurity Collaboration Playbook](https://www.cisa.gov/resources-tools/resources/ai-cybersecurity-collaboration-playbook)

This is educational commentary from implementation work — not personalised financial, tax, legal or investment advice. Verify vendor pricing, privacy terms and your own internal policies before you buy or deploy.

Tools worth evaluating

[**Notion** Knowledge management and workspace Visit Notion official site ↗](https://www.notion.so/product)

Tool links go to the vendor’s official site. No affiliate tracking is active on this page yet. Recommendations are based on fit for finance, ops and AI implementation work — not on commission.

*Educational content; not financial, investment, or legal advice.*

## Related
- [AI controls checklist for CA firms](https://pratikbajoria.com/blog/ai-controls-checklist-ca-firms-india)
- [DPDP client-data rubric](https://pratikbajoria.com/blog/2026-10-19-dpdp-act-and-ai-in-ca-firms-in-india-a-client-data-decision-rubric)
- [AI automation in India: a practical hub for business owners](https://pratikbajoria.com/ai-automation-in-india)
- [WhatsApp Automation That Still Feels Like Customer Care](https://pratikbajoria.com/blog/2026-09-28-whatsapp-automation-that-still-feels-like-customer-care)
- [Build vs Buy: A Decision Framework for AI Tooling](https://pratikbajoria.com/blog/build-vs-buy-ai-tooling)
- [Ecommerce Reconciliation: Where Automation Helps and Where It Lies](https://pratikbajoria.com/blog/2026-09-20-ecommerce-reconciliation-where-automation-helps-and-where-it-lies)
- [AI implementation for finance teams: the CFO and controller guide](https://pratikbajoria.com/ai-implementation-for-finance-teams)
- [All articles](https://pratikbajoria.com/blog)
