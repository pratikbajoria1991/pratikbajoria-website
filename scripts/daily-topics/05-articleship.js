const S = require('./_sources');
const L = require('./_links');
module.exports = {
  title: 'AI and Articleship: How CA Firms Should Train Article Assistants Now',
  category: 'CA insights',
  image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=85',
  keywords: ['articleship AI', 'CA article assistants AI', 'training CA students AI', 'CA firm training India', 'ICAI new scheme articleship'],
  excerpt: 'Articleship is two years under ICAI’s new scheme, and AI now drafts much of what articles used to prepare. How to train them to review, question and own the work.',
  sources: [S.nset, S.ais2026, S.caGpt, S.siaComp],
  intro: [
    'For most of us, articleship was where we learned the job by doing the repetitive parts: vouching, ticking, preparing schedules, chasing documents. A lot of that preparation can now be drafted by a tool in minutes. If firms keep training article assistants the old way, they will produce juniors who are good at work that is disappearing and untrained in the work that remains.',
    'The time available has also shrunk. Under ICAI’s New Scheme of Education and Training, practical training is two years, so firms have less time to get it right.'
  ],
  sections: [
    {
      heading: 'The training window under the new scheme',
      paragraphs: [
        'According to ICAI’s [FAQs on the New Scheme of Education and Training][1], practical training starts after a student passes both groups of the Intermediate examination and completes the four-week ICITSS course, and lasts two years. Industrial training of 9 to 12 months is permitted in the last part of those two years, and 12 leaves are allowed in each year. The Advanced ICITSS course comes after practical training and before the Final examination.',
        'Two years, minus leave and exam preparation, is not much time to turn a student into someone a partner can rely on. That argues for being deliberate about what articles spend their hours on.'
      ]
    },
    {
      heading: 'The profession is already moving',
      paragraphs: [
        'ICAI has been unusually quick on AI. At its [AI Innovation Summit 2026][2], the Institute said it had trained over 50,000 members in AI and developed more than 150 GPT-based tools, and it launched Level 3 of its AI certificate course for members. Students have their own tools too: ICAI’s [November 2024 release][3] reported a GPT for CA students covering Foundation, Intermediate and Final, with over 50,000 students using it at the time.',
        'So articles will arrive already using AI. The firm’s job is not to introduce the tools; it is to teach professional habits around them.'
      ]
    },
    {
      heading: 'Teach review before preparation',
      paragraphs: ['The most valuable skill a junior can build now is checking machine output against evidence. I would restructure the first months of articleship around that.'],
      bullets: [
        'Give articles AI-drafted schedules with deliberate errors planted, and assess how many they find and how they prove each one.',
        'Make "show me the source document" the default response to any number an article presents, whoever or whatever produced it.',
        'Have articles write the review note on an AI draft, not just correct it, so the reasoning is visible.',
        'Rotate them through exception handling: the items a reconciliation tool could not match are where judgement is learned.'
      ]
    },
    {
      heading: 'Keep the fundamentals manual for a while',
      paragraphs: [
        'There is a real risk of juniors who can operate a tool but cannot do the underlying work. I would keep a short period of fully manual work on core tasks, such as a bank reconciliation, a GST return working and a set of audit vouching, before introducing AI on the same task. You cannot review what you have never done.',
        'The internal audit standards make a similar point for the whole team. ICAI’s [SIA 240 on use of tools][4] requires that the team has the competencies to use selected tools and that the engagement lead ensures periodic training as tools evolve. The same principle applies in any practice.'
      ]
    },
    {
      heading: 'Rules articles should know on day one',
      bullets: [
        'Which AI tools are approved, and that client data never goes into personal accounts.',
        'What may be drafted by AI, and what must be done or concluded by a person.',
        'That every AI-assisted output is labelled as such in the file until reviewed.',
        'Who to ask when an AI answer and their own work disagree, and that disagreement is worth raising.'
      ],
      paragraphs: ['None of this needs a large programme. A one-page policy, a planted-error exercise in the first month, and partners who ask "how do you know?" consistently will do more than any course. If you are weighing formal courses for the team, I compared the options in [AI courses for chartered accountants in India](/blog/2026-10-07-ai-courses-for-chartered-accountants-in-india-what-is-worth-it).']
    }
  ],
  faq: [
    { q: 'How long is CA articleship now?', a: 'Under ICAI’s New Scheme of Education and Training, practical training is two years, started after passing both groups of the Intermediate examination and completing ICITSS. Industrial training of 9 to 12 months is permitted in the last part.' },
    { q: 'Should article assistants use AI?', a: 'Yes, within firm rules on approved tools and client data, and after they have done the core tasks manually at least once. The priority is teaching them to review AI output against evidence.' },
    { q: 'What AI training does ICAI offer?', a: 'ICAI runs an AI certificate course for members, with Level 3 launched at its AI Innovation Summit 2026, and provides CA GPT tools for members and students. It reported training over 50,000 members in AI by June 2026.' },
    { q: 'What skills matter most for juniors now?', a: 'Checking outputs against source documents, writing clear review notes, handling exceptions and knowing when to escalate. Preparation still matters, but review is where trust is built.' }
  ],
  related: [L.HUB, L.COURSES, L.REPLACE, L.PILOT]
};
