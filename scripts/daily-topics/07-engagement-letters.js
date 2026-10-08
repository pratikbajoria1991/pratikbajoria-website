const S = require('./_sources');
const L = require('./_links');
module.exports = {
  title: 'Updating Engagement Letters for AI Use in a CA Firm',
  category: 'CA insights',
  image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=85',
  keywords: ['engagement letter AI clause', 'CA firm AI policy', 'client data AI India', 'DPDP Act CA firms', 'SA 210 engagement letter'],
  excerpt: 'Tell clients plainly how AI is used on their work, what data it sees and who reviews it. What to add to CA engagement letters now that the DPDP Rules are notified.',
  sources: [S.sa210, S.dpdpRules, S.dpdpExplainer, S.dpdpAct, S.siaComp],
  intro: [
    'Most CA firms in India now use some AI on client work, even if it is only an assistant drafting emails or summarising documents. Very few have told their clients. That gap will close one way or another: either the firm explains its approach in the engagement letter, or a client asks the question after something goes wrong.',
    'I would rather the engagement letter answered it first. Here is what I would add, and why the timing matters.'
  ],
  sections: [
    {
      heading: 'Why now',
      paragraphs: [
        'Two reasons. First, the [Digital Personal Data Protection Rules, 2025][2] were notified in November 2025, operationalising the [DPDP Act, 2023][4] with an 18-month phased compliance timeline. Client files are full of personal data: employee payroll, customer lists, directors’ details, individual taxpayers’ records. A firm processing that data on a client’s behalf needs clarity on what it does with it.',
        'Second, the stakes are not trivial. The [government’s explainer][3] notes penalties under the Act of up to ₹250 crore for failure to maintain reasonable security safeguards, and up to ₹200 crore for failing to notify a personal data breach to the Board or affected individuals.'
      ]
    },
    {
      heading: 'Start from what SA 210 already covers',
      paragraphs: [
        'For audits, the engagement letter is governed by SA 210, and ICAI’s Auditing and Assurance Standards Board has published [illustrative engagement letters under the Companies Act, 2013][1] that sit in Appendix 1 of the standard. AI fits naturally within the letter’s description of how the audit will be performed and how information will be handled.',
        'For tax, advisory and bookkeeping work there is no equivalent standard letter, which is all the more reason to write the AI terms down.'
      ]
    },
    {
      heading: 'What I would add to the letter',
      bullets: [
        'A plain statement that the firm uses AI tools to assist with specified tasks, such as drafting, summarising, data matching and analysis, and that professional conclusions and deliverables are reviewed and approved by named professionals.',
        'Which categories of client data may be processed by those tools, and which will not, for example identity documents or bank credentials.',
        'That tools are firm-controlled accounts with settings that stop client data being used to train public models, where the provider offers that control, and where the data is stored.',
        'How long data is retained in those tools, and how it is deleted at the end of the engagement.',
        'How the firm will inform the client of a security incident affecting their data, and the contact person for data questions.',
        'A route for the client to ask that AI not be used on their work, and what that means for fees and timelines.'
      ]
    },
    {
      heading: 'Make sure the firm can keep the promises',
      paragraphs: [
        'An engagement letter that describes controls the firm does not have is worse than silence. Before the clause goes out, check that it matches reality: which tools are approved, who has access, where data sits, what the retention settings are and who reviews outputs. My [AI controls checklist for CA firms](/blog/ai-controls-checklist-ca-firms-india) is a reasonable place to start.',
        'Internal auditors now have a useful test for this in ICAI’s [SIA 240][5], which asks that tools comply with data privacy and cybersecurity rules and that third-party tools have adequate confidentiality, ownership and access controls. It names the DPDP Act, 2023 directly. The same questions work for any practice.'
      ]
    },
    {
      heading: 'Talk to clients, not just send the letter',
      paragraphs: ['Most clients react well to a short conversation: we use these tools for these tasks, a professional reviews everything, your data stays in these systems. What worries clients is finding out later. I would also brief the team, so that whoever answers a client’s question about AI gives the same answer the letter does. If you have not yet chosen the assistant itself, I compared the main options in [ChatGPT vs Copilot vs Gemini for a CA firm](/blog/2026-10-05-chatgpt-vs-copilot-vs-gemini-how-a-ca-firm-in-india-should-choose-an-ai-assistant).']
    }
  ],
  faq: [
    { q: 'Do CA firms need to tell clients they use AI?', a: 'There is no single rule requiring a specific disclosure, but engagement terms should describe how client information is handled, and the DPDP framework places obligations on entities processing personal data. Stating AI use in the engagement letter avoids surprises; take advice on your own facts.' },
    { q: 'When do the DPDP Rules apply?', a: 'The DPDP Rules, 2025 were notified in November 2025 with an 18-month phased compliance timeline, according to the government’s press release.' },
    { q: 'What should an AI clause in an engagement letter cover?', a: 'The tasks AI assists with, who reviews outputs, which data the tools may process, where data is stored and for how long, how incidents will be notified, and how a client can opt out.' },
    { q: 'Does SA 210 mention AI?', a: 'SA 210 and ICAI’s illustrative engagement letters predate generative AI and do not address it specifically. AI use fits within the letter’s description of how the audit will be performed and how information will be handled.' }
  ],
  related: [L.HUB, L.CONTROLS, L.ASSISTANT, L.AUDIT]
};
