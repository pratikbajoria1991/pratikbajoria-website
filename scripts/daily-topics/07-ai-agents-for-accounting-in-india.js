const S = require('./_sources');
const L = require('./_links');
module.exports = {
  title: 'AI Agents for Accounting in India: What to Let Them Do Unsupervised',
  category: 'AI automation',
  image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=85',
  keywords: ['ai agent for accounting india', 'ai agent for bank reconciliation', 'agentic AI finance', 'AI automation India', 'AI governance finance'],
  excerpt: 'AI agents can now act inside accounting systems, not just answer questions. A CA’s rule of thumb for which tasks they may run alone and which need a human gate.',
  sources: [S.nfraTech, S.rbiFreeAi, S.meityAiGov, S.gartner],
  intro: [
    'The vendor pitch has moved on from chatbots to agents: software that reads your books, decides what to do and then does it, whether that is posting an entry, chasing a customer or filing a reconciliation. Searches like “AI agent for bank reconciliation” and “AI agents for MSME” are growing, and the results are almost entirely product pages.',
    'Agents can be genuinely useful in finance. But an agent that acts is a different risk from an assistant that drafts. This is the rule of thumb I use with clients to decide what an agent may do on its own.'
  ],
  sections: [
    {
      heading: 'What makes an agent different',
      paragraphs: [
        'An assistant produces a draft that a person reads. An agent takes actions in a system: it creates records, sends messages, changes statuses. Regulators have noticed. India’s audit regulator, in its [July 2026 paper on technology in audit][1], names agentic AI explicitly and gives an example of why validation should be proportionate: a translation aid and an agentic tool that selects and tests samples do not warrant the same scrutiny.',
        'The same logic applies inside a company’s finance function. The more an agent can change, the more governance it needs before it goes live.'
      ]
    },
    {
      heading: 'A three-tier rule of thumb',
      bullets: [
        'Tier 1, may run alone: read-only tasks and reversible preparation. Pulling statements, matching transactions, flagging anomalies, drafting reports and reminders into a review queue.',
        'Tier 2, runs with a human gate: actions that change records but can be reversed. Posting matched bank entries, updating customer status, sending standard reminders from an approved template. A person approves in batches, and every action is logged.',
        'Tier 3, never unsupervised: anything that moves money, files with a regulator, changes master data such as vendor bank details, or communicates a position to a client or authority.'
      ]
    },
    {
      heading: 'What the policy makers expect',
      paragraphs: [
        'Two Indian frameworks are useful here even though neither is a rulebook for a private company. The RBI’s [FREE-AI committee report][2] for the financial sector sets out 7 sutras and 26 recommendations across six pillars, and MeitY’s [India AI Governance Guidelines][3] take a principles-based approach that relies on existing laws. Both point in the same direction: board-level ownership, clear accountability, human oversight proportionate to risk, and the ability to explain and audit what a system did.',
        'For a mid-market finance team, that translates into an owner for each agent, a written list of what it may do, logs you can read, and a way to switch it off.'
      ]
    },
    {
      heading: 'Bank reconciliation as a worked example',
      bullets: [
        'The agent fetches the statement and the ledger, matches on amount, date and reference, and proposes entries for unmatched charges and interest (Tier 1).',
        'A person reviews the proposed entries in one batch each day and approves them; the agent posts and logs (Tier 2).',
        'The agent never creates or edits a payee, and never initiates a payment (Tier 3).',
        'Weekly, someone samples ten agent-posted entries and checks them against the bank statement.'
      ]
    },
    {
      heading: 'Do not skip the business case',
      paragraphs: [
        'Adoption of AI in finance has plateaued rather than exploded. [Gartner’s 2025 AI in Finance survey][4] found 59% of finance functions using AI, against 58% a year earlier. Agents will not change that on their own; a narrow, measured release will. Pick one process with a clear baseline, run it for a month, and decide on evidence. My [finance AI ROI rubric](/blog/2026-10-12-finance-ai-roi-for-mid-market-companies-in-india-a-cas-decision-rubric) is a reasonable place to start.'
      ]
    }
  ],
  faq: [
    { q: 'What is an AI agent in accounting?', a: 'Software that does not just answer questions but takes actions in finance systems, such as matching transactions, posting entries or sending reminders, based on rules and model judgements.' },
    { q: 'Can an AI agent do bank reconciliation on its own?', a: 'It can fetch, match and propose entries on its own. Posting should go through a human approval step, and an agent should never create payees or initiate payments.' },
    { q: 'Are there Indian rules on AI agents in finance?', a: 'There is no single rulebook for private companies. The RBI’s FREE-AI report and MeitY’s India AI Governance Guidelines set out principles such as accountability and proportionate human oversight, and NFRA’s 2026 paper covers agentic AI in audit.' },
    { q: 'How do I decide which tasks an agent may run alone?', a: 'Allow read-only and reversible preparation, put a human gate on actions that change records, and keep anything that moves money, files with a regulator or changes master data under direct human control.' }
  ],
  related: [L.ROADMAP, L.CONTROLS, L.AUTO_HUB, L.IA]
};
