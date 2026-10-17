const S = require('./_sources');
const L = require('./_links');
module.exports = {
  title: 'AI Automation Agency vs Consultant in India: How to Choose',
  category: 'AI automation',
  image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=85',
  keywords: ['ai automation agency india', 'ai automation consultant india', 'ai automation services india', 'AI implementation partner', 'AI automation India'],
  excerpt: 'Hiring help for AI automation in India? When an agency fits, when an independent consultant fits, and the questions to ask either before signing anything.',
  sources: [S.meityAiGov, S.dpdpRules, S.wtiIndia, S.nist],
  intro: [
    '“AI automation agency India” and “AI automation consultant India” are now common searches, and the results are mostly agencies writing about why you should hire an agency. I am an independent consultant, so read this knowing my bias. I have tried to write the guide I would want if I were the buyer.',
    'The honest answer is that both models work, for different jobs. What matters more is how you scope the work and what you insist on owning at the end.'
  ],
  sections: [
    {
      heading: 'Why the decision matters now',
      paragraphs: [
        'Demand is not the issue. Microsoft’s [2025 Work Trend Index findings for India][3] report that 93% of Indian leaders intend to use AI agents to extend workforce capacity in the next 12 to 18 months. The risk is buying delivery before you know which workflow is worth automating, or ending up with automations nobody in the business can maintain.',
        'There are two common ways this goes wrong. A business pays for many builds that are not tied to any metric, so nobody can say later which ones earned their keep. Or it buys a roadmap with nobody to build or run anything, so the plan sits in a folder. The model you hire should match the gap you actually have: knowing what to automate, or having the hands to build it.'
      ]
    },
    {
      heading: 'When an agency fits',
      bullets: [
        'You already know the workflows and need several built, integrated and supported in production.',
        'You need a team: developers, an integration specialist and someone to monitor and fix things.',
        'You want a support contract with response times, and you have budget for ongoing fees.',
        'Your own IT team can review the architecture and hold the agency to it.'
      ]
    },
    {
      heading: 'When an independent consultant fits',
      bullets: [
        'You are not yet sure where AI pays back and need the workflows mapped, ranked and costed first.',
        'The work touches finance, controls or regulated data, and you want someone who understands the process as well as the tools.',
        'You need one narrow release designed and run alongside the old process before committing to more.',
        'You want help writing the brief and evaluating agencies or vendors, without a stake in who wins.'
      ]
    },
    {
      heading: 'Questions to ask either one',
      bullets: [
        'Show me a system you built that is still running in production, and let me speak to the client.',
        'Who exactly will do the work, and who will maintain it after go-live?',
        'What baseline will we measure before we start, and what number should move?',
        'Who owns the code, prompts, workflows, credentials and documentation at the end?',
        'Where will our data be processed and stored, and is any of it used to train models?',
        'What happens if we stop the engagement: what do we receive, and in what format?'
      ]
    },
    {
      heading: 'Governance is part of the scope',
      paragraphs: [
        'Whoever you hire should design controls in from the start, not add them later. MeitY’s [India AI Governance Guidelines][1] favour a principles-based approach built on existing laws, with accountability and human oversight proportionate to risk, and the [DPDP Rules, 2025][2] bring a phased timeline for personal data duties. The [NIST AI Risk Management Framework][4] is a useful neutral checklist: govern, map, measure, manage. If a proposal does not mention data access, logging, approval steps and an owner for each automation, ask why.'
      ]
    },
    {
      heading: 'A sensible way to buy',
      paragraphs: [
        'Start with a short, paid discovery that ends in a ranked list of workflows, a baseline and one designed release. Run that release with one team for a few weeks. Only then sign a larger build or support contract, with the evidence in hand. This is roughly how I structure the [AI Opportunity Audit](/audit), and it is a fair way to test any provider, including me.'
      ]
    }
  ],
  faq: [
    { q: 'Should I hire an AI agency or a consultant in India?', a: 'Hire an agency when you know the workflows and need several built and supported in production. Hire an independent consultant when you first need the workflows mapped, ranked and one release designed and tested, especially where finance or regulated data is involved.' },
    { q: 'What should an AI automation contract include?', a: 'A measured baseline, named people, ownership of code, prompts and documentation, data processing terms, support arrangements and what you receive if the engagement ends.' },
    { q: 'Do Indian AI governance rules affect automation projects?', a: 'MeitY’s India AI Governance Guidelines are principles-based and rely on existing laws, and the DPDP Rules, 2025 set a phased timeline for personal data duties. Both mean controls and data handling should be in scope from the start.' },
    { q: 'How do I test an AI provider before a big commitment?', a: 'Buy a short paid discovery and one narrow release run alongside your current process, then decide on a larger contract based on the measured result.' }
  ],
  related: [L.AUTO_HUB, L.AUDIT, L.ROADMAP, L.CONTROLS]
};
