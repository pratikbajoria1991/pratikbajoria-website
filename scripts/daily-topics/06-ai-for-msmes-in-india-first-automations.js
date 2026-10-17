const S = require('./_sources');
const L = require('./_links');
module.exports = {
  title: 'AI for MSMEs in India: Three First Automations That Pay Back',
  category: 'AI automation',
  image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=85',
  keywords: ['ai for msme india', 'ai automation for indian smbs', 'ai tools for msme', 'AI automation India', 'small business AI India'],
  excerpt: 'Where an Indian MSME should start with AI: three first automations in collections, bills and customer replies, with sourced context and the controls to keep.',
  sources: [S.wefMsme, S.rbiMsmeFaq, S.msmed, S.sahamati],
  intro: [
    'Most advice on “AI for MSMEs in India” is either a list of 20 tools or a national-level report about trillions of dollars of potential. Neither helps the owner of a ₹30 crore manufacturing unit or a 15-person distributor decide what to do on Monday.',
    'I work with finance teams and business owners on exactly this question. My answer is to start with three automations that touch cash and customer time, measure them for a month, and only then think about anything bigger.'
  ],
  sections: [
    {
      heading: 'First, be clear what kind of MSME you are',
      paragraphs: [
        'The category matters because readiness differs. The [RBI’s MSME FAQs][2] set out the current definitions: micro up to ₹2.5 crore investment and ₹10 crore turnover, small up to ₹25 crore and ₹100 crore, and medium up to ₹125 crore and ₹500 crore. The [AI playbook for India’s SMEs][1] from the World Economic Forum, IndiaAI and the Office of the Principal Scientific Adviser notes that microenterprises are more than 99% of MSMEs, often with paper records, and recommends they start with free or low-cost tools, mobile-based apps and AI-as-a-service rather than building anything.',
        'Small and medium firms usually have an accounting system, a bank feed and a sales team. That is enough for the three automations below.'
      ]
    },
    {
      heading: 'Automation 1: collections follow-up',
      paragraphs: [
        'Pull the receivables ageing from the accounting system every week, have AI draft polite, specific reminders for each overdue customer, and let the owner or accounts head approve and send them. The draft includes invoice numbers, amounts and due dates, so the customer cannot claim confusion.',
        'If your customers include larger companies buying from you as a micro or small enterprise, remember the law is on your side. [Section 15 of the MSMED Act, 2006][3] caps the agreed payment period at 45 days from acceptance or deemed acceptance, and section 16 provides for compound interest on late payment. A reminder that cites the invoice date is often enough.'
      ]
    },
    {
      heading: 'Automation 2: supplier bills into the books',
      paragraphs: [
        'Bills arrive by email, WhatsApp and courier. AI tools can now read them, including photos and handwritten bills, and draft entries in the accounting system for review. The goal is not to remove the accountant; it is to have every bill entered within a day or two, so payables, GST credit and cash forecasts are current. The [AI automation in India hub](/ai-automation-in-india) covers the review controls I would keep.'
      ]
    },
    {
      heading: 'Automation 3: first replies to customer enquiries',
      paragraphs: [
        'For many MSMEs the biggest leak is slow replies to enquiries on WhatsApp, email and the website. An AI assistant that drafts a first reply from your price list, product sheets and FAQs, for a person to approve, can cut response time without risking a wrong quote. Keep pricing, discounts and delivery commitments for a person to confirm.'
      ]
    },
    {
      heading: 'Get the data plumbing right',
      bullets: [
        'Use one accounting system as the source of truth for customers, suppliers and balances.',
        'Prefer structured bank data to PDFs. Consent-based Account Aggregator feeds are maturing; [Sahamati][4] reports more than 500 million consents on the network.',
        'Keep a simple log of what each automation did each week and what a person changed.',
        'Use business accounts for AI tools, not staff members’ personal logins.'
      ]
    },
    {
      heading: 'How to tell if it is working',
      paragraphs: [
        'Pick one number per automation before you start: debtor days or cash collected within terms for collections, days from bill receipt to entry for payables, and median first-reply time for enquiries. Measure for four weeks before and four weeks after. If the number does not move, change the process or stop. If it does, you have earned the right to look at bigger projects such as forecasting or inventory planning.'
      ]
    }
  ],
  faq: [
    { q: 'Where should a small business in India start with AI?', a: 'With one or two automations that touch cash and customer time, such as collections reminders, supplier bill entry and first replies to enquiries, each measured against a single number for a month.' },
    { q: 'Do microenterprises need expensive AI tools?', a: 'No. The WEF, IndiaAI and PSA playbook for India’s SMEs recommends microenterprises start with free or low-cost tools, mobile apps and AI-as-a-service models.' },
    { q: 'What are the current MSME limits in India?', a: 'According to the RBI’s MSME FAQs, micro is up to ₹2.5 crore investment and ₹10 crore turnover, small up to ₹25 crore and ₹100 crore, and medium up to ₹125 crore and ₹500 crore.' },
    { q: 'Can AI help MSMEs get paid faster?', a: 'It can draft specific, timely reminders from the ageing report for a person to approve. Micro and small suppliers can also cite the 45-day limit in section 15 of the MSMED Act, 2006.' }
  ],
  related: [L.AUTO_HUB, L.ROADMAP, L.DASHBOARD, L.AUDIT]
};
