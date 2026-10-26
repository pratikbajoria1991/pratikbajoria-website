# ChatGPT, Copilot or Gemini? How a CA Firm in India Should Choose an AI Assistant

> ChatGPT, Microsoft 365 Copilot or Gemini for a CA practice in India? Compare data terms, permissions and retention, with a decision rubric for partners.

Canonical: https://pratikbajoria.com/blog/2026-10-05-chatgpt-vs-copilot-vs-gemini-how-a-ca-firm-in-india-should-choose-an-ai-assistant
Last updated: 2026-10-05

CA insights · 2026-10-05 · 7 min read

Choosing between ChatGPT, Microsoft 365 Copilot and Gemini for a CA practice in India: where client files live, data terms, permissions, retention and a decision rubric for partners.

Key takeaways

- First decision: client work happens only in a firm-controlled business workspace, never a personal account.
- Each vendor publishes business-tier data commitments; they do not cover personal or free accounts.
- The deciding factor is where client files already live: Microsoft 365 points to Copilot, Google Workspace to Gemini.
- Clean up client-folder permissions first, because integrated assistants surface existing permission mistakes.
- Choose with a two-week bake-off on anonymised real tasks marked by one reviewer, not a demo.

A question I hear more and more from partners in Indian CA practices is no longer “should we use AI?” It is “which one should we pay for: ChatGPT, Copilot or Gemini?” Usually an associate has already been using one of them on a personal account, a partner has seen a demo of another, and the IT vendor is pushing the third.

My answer is rarely about which model writes the best paragraph. For a practice that holds client financials, PAN and payroll data, unpublished results and tax positions, the deciding questions are duller: where do your client files already live, who can see what, what does the vendor contractually do with your prompts, and can you prove afterwards who used the tool on which engagement? Get those right and any of the three can be a sensible choice. Get them wrong and the best model in the world is a confidentiality problem with a monthly invoice.

## First, take personal accounts off the table

Every comparison below is about the business tiers. A free or personal subscription that an associate signed up for with a Gmail address is not covered by the commitments these vendors publish for organisational customers, and the firm has no admin control over it. Your confidentiality obligations to clients under ICAI’s framework do not change because a tool is convenient, and where the material includes personal data, the Digital Personal Data Protection Act, 2023 expects reasonable security safeguards, including when a processor handles that data on your behalf.

So the first decision is not which vendor. It is that client work happens only inside a firm-controlled workspace, and personal accounts are for nothing that identifies a client.

## What each vendor says about your data

I would rather you read the vendors’ own pages than rely on my summary, and the links are in the Sources section. As published when I checked them on 5 October 2026:

- **Microsoft 365 Copilot** (which Microsoft now calls Microsoft Copilot) states that prompts, responses and data accessed through Microsoft Graph are not used to train foundation models, and that Copilot only surfaces organisational data the individual user already has at least view permission for. Admins can apply retention policies to Copilot interactions through Microsoft Purview. Microsoft also notes that customers outside the EU may have queries processed in the US, EU or other regions.
- **ChatGPT business plans** (Business and Enterprise): OpenAI states it does not train its models on business data by default, that you own your inputs and outputs where allowed by law, and that workspace admins control retention, with deleted conversations removed within 30 days unless legally required to be kept.
- **Gemini in Google Workspace**: Google’s privacy hub states that your content is not human-reviewed or used for generative AI model training outside your domain without permission, that Gemini does not access Workspace content the user lacks permission for, and that admins set how long prompts and responses are retained.

On paper, the headline promises look similar. The differences that matter to a CA practice sit underneath them.

## The real decision: where your files already live

If the firm runs on Microsoft 365, with engagement folders in SharePoint or OneDrive and client correspondence in Outlook, Copilot’s main advantage is that it works inside that permission model rather than asking people to upload files somewhere new. If the firm runs on Google Workspace, the same logic points to Gemini. ChatGPT is a standalone workspace: strong for drafting, research and analysis on documents you deliberately give it, but every file is a conscious upload, which some partners actually prefer because it forces a decision each time.

There is a catch with the integrated options that I would raise with any practice. Copilot and Gemini respect existing permissions, which means they also expose existing permission mistakes. If an articled assistant technically has view access to the entire “Clients” drive because nobody ever tightened it, an assistant that can search everything they can see will happily summarise a client file they were never meant to open. Before switching on either, run a permissions review on client folders. It is unglamorous work and it is the single most useful thing you can do first.

## A decision rubric you can use in a partners’ meeting

Evaluation framework only. Score each vendor against your own setup; this is not a ranking of the products.

| Question | What good looks like | Red flag |
| --- | --- | --- |
| Where do client files live today? | The assistant works inside the system you already govern | Staff copying files into a second, ungoverned location |
| Are folder permissions clean? | Access by engagement team, reviewed recently | “Everyone” or firm-wide access to client folders |
| Is client data used for training? | Written “no” in the business terms you sign | Only a marketing page, or a personal-tier account |
| Who controls retention? | Firm admin sets it and can apply it centrally | Each user decides, or nobody knows |
| Where is data processed? | Answered in writing by the vendor for your plan | Assumed rather than confirmed |
| Can you see who used it on what? | Admin search or export of interactions | No log beyond each user’s own history |
| Does it help with your actual work? | Fewer reviewer edits on your own test tasks | Judged only on a vendor demo |

Notice that only the last row is about output quality. The rest are about control, and for a professional practice that is the right weighting.

## Run a two-week bake-off, not a demo

Demos are built to impress. A bake-off is built to reveal. Pick three or four tasks your team really does, prepare anonymised or dummy versions, and run the same tasks through each shortlisted tool. Examples I would use: turning a senior’s rough notes into a clean working-paper narrative, summarising a long agreement to direct a reviewer’s attention, drafting a first reply to a routine departmental query from redacted facts, and building a checklist from a circular.

Have the same reviewer mark every output. Track how much they had to change, what they caught that was wrong, and how long the whole cycle took compared with doing it the usual way. Write it down. The tool that needs the fewest corrections on your own work is the one that earns the licence, not the one with the best launch video.

## What I would not do

I would not buy all three “to see which sticks”; that guarantees three half-adopted tools and three sets of terms to monitor. I would not let associates expense personal subscriptions and call it a pilot. I would not paste anything that identifies a client into any tool before the firm has chosen one, set retention, and written down what is allowed. And I would not let the choice of assistant substitute for review: every output that reaches a client or a file still needs a named person who checked it.

Whichever you choose, the controls that make it safe are the same, and I have set them out in the [AI controls checklist for CA firms in India](https://pratikbajoria.com/blog/ai-controls-checklist-ca-firms-india). For the full implementation map, start at the [AI for chartered accountants in India](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india) hub. If GST is your first use case, read [using AI for GST reconciliation without risking client data](https://pratikbajoria.com/blog/2026-09-28-how-indian-ca-firms-can-use-ai-for-gst-reconciliation-without-risking-client-data); for assurance work, see [AI for audit working papers in India](https://pratikbajoria.com/blog/2026-09-30-ai-for-audit-working-papers-in-india-what-a-ca-should-automate-and-what-must-stay-human). To see where AI pays back across your practice, take the free [AI Opportunity Scorecard](https://pratikbajoria.com/scorecard), look at the scoped [AI Opportunity Audit](https://pratikbajoria.com/audit), or [book a discovery call](https://pratikbajoria.com/#contact).

## Monday-morning checklist

- Write one line in the firm’s policy: no client-identifying data in personal AI accounts.
- List where client files actually live: Microsoft 365, Google Workspace, local drives or practice software.
- Review permissions on client folders before enabling Copilot or Gemini.
- Read each shortlisted vendor’s business data terms and save a dated copy.
- Ask each vendor in writing where your prompts are processed and stored.
- Prepare three or four anonymised test tasks and name one reviewer to mark them.
- Decide who in the firm administers retention and can search usage.

## Frequently asked questions

### Is ChatGPT, Copilot or Gemini safest for client data in a CA firm?

None is safe or unsafe on its own. Each vendor publishes data commitments for its business tiers, and those commitments do not cover personal accounts. Safety depends on using a firm-controlled business workspace, clean folder permissions, admin-set retention and a review step before anything reaches a client.

### Should a firm on Microsoft 365 automatically choose Copilot?

It is usually the natural starting point because it works inside the permission model you already manage. But clean up client-folder permissions first, and still run a short bake-off on your own tasks before committing licences across the firm.

### Can associates keep using their personal ChatGPT accounts for non-client work?

That is a firm policy decision. The practical rule I suggest is simple: personal accounts may be used for general learning, never for anything that identifies a client, an engagement or a person.

## Keep reading in this topic

This guide is part of [AI for Chartered Accountants in India: the implementation hub](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india).

- [AI Controls Checklist for CA Firms in India: Practical Review Gates](https://pratikbajoria.com/blog/ai-controls-checklist-ca-firms-india)
- [How to Run a 90-Day AI Pilot in a CA Firm in India: A 30/60/90 Playbook](https://pratikbajoria.com/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india)
- [Will AI Replace Chartered Accountants in India? A CA’s Honest Answer](https://pratikbajoria.com/blog/2026-10-07-will-ai-replace-chartered-accountants-in-india)

Also useful: [AI automation in India: a practical hub for business owners](https://pratikbajoria.com/ai-automation-in-india).

## Sources

- [Microsoft Learn — Data, privacy and security for Microsoft Copilot](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy)
- [OpenAI — Enterprise privacy](https://openai.com/enterprise-privacy/)
- [Google Workspace — Generative AI in Google Workspace Privacy Hub](https://knowledge.workspace.google.com/admin/generative-ai/generative-ai-in-google-workspace-privacy-hub)
- [Digital Personal Data Protection Act, 2023 (Gazette text, MeitY)](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [NIST AI 600-1 — Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)

*Disclaimer: this article is general educational commentary from implementation work. It is not legal, tax, audit, data-protection or procurement advice, and it does not create an adviser–client relationship. Vendor terms, product names and features change; read the current terms for your plan and take professional advice on your specific facts before acting.*

*Educational content; not financial, investment, or legal advice.*

## Related
- [AI controls checklist for CA firms in India](https://pratikbajoria.com/blog/ai-controls-checklist-ca-firms-india)
- [AI for chartered accountants in India](https://pratikbajoria.com/blog/ai-for-chartered-accountants-in-india)
- [using AI for GST reconciliation without risking client data](https://pratikbajoria.com/blog/2026-09-28-how-indian-ca-firms-can-use-ai-for-gst-reconciliation-without-risking-client-data)
- [AI for audit working papers in India](https://pratikbajoria.com/blog/2026-09-30-ai-for-audit-working-papers-in-india-what-a-ca-should-automate-and-what-must-stay-human)
- [AI Opportunity Scorecard](https://pratikbajoria.com/scorecard)
- [AI Opportunity Audit](https://pratikbajoria.com/audit)
- [How to Run a 90-Day AI Pilot in a CA Firm in India: A 30/60/90 Playbook](https://pratikbajoria.com/blog/2026-10-07-how-to-run-a-90-day-ai-pilot-in-a-ca-firm-in-india)
- [Will AI Replace Chartered Accountants in India? A CA’s Honest Answer](https://pratikbajoria.com/blog/2026-10-07-will-ai-replace-chartered-accountants-in-india)
- [All articles](https://pratikbajoria.com/blog)
