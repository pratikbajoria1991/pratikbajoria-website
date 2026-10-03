// Insights: short trade notes. RULE: every item must carry real, checked source links.
// Items that cannot be sourced are left out; if both arrays are empty, the Insights
// page is not built and its nav/footer links disappear.
// All claims below were checked against the linked pages on 3 October 2026.

export const INSIGHTS = [
  {
    id: 'uk-india-ceta',
    dateLabel: 'In force · 15 Jul 2026',
    title: 'The UK–India trade agreement is in force',
    body: `<p>The UK–India Comprehensive Economic and Trade Agreement (CETA), signed on 24 July 2025, came into force on 15 July 2026, together with a Double Contributions Convention on social security.</p>
            <ul>
              <li>The UK government says that from 15 July, 99% of Indian goods entering the UK and 90% of UK goods entering India are either duty free or face reduced tariffs.</li>
              <li>India’s commerce ministry named textiles, leather, gems and jewellery, engineering goods, marine products, chemicals and processed foods among the sectors it expects to benefit, along with IT and professional services.</li>
              <li>Under the Double Contributions Convention, employees moving between the two countries, and their employers, pay social security contributions in only one country at a time for up to five years.</li>
            </ul>
            <p><strong>In practice:</strong> preferential tariffs depend on meeting the agreement’s rules of origin with the right origin paperwork. Check the treatment of your specific product before pricing a deal.</p>`,
    sources: [
      { title: 'GOV.UK: Historic UK-India Free Trade Agreement is now in effect (17 Jul 2026)', url: 'https://www.gov.uk/government/news/historic-uk-india-free-trade-agreement-is-now-in-effect' },
      { title: 'PIB (Government of India): India–UK CETA enters into force (15 Jul 2026)', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2285085' },
      { title: 'business.gov.uk: The UK-India trade deal', url: 'https://www.business.gov.uk/campaign/alive-with-opportunity/the-uk-india-trade-deal/' }
    ]
  },
  {
    id: 'eu-india-fta',
    dateLabel: 'Concluded · 27 Jan 2026',
    title: 'EU–India free trade agreement: concluded, not yet in force',
    body: `<p>India and the European Union announced the conclusion of negotiations on a free trade agreement on 27 January 2026, at the 16th India–EU Summit.</p>
            <ul>
              <li>In September 2026 the European Commission sent the Council of the EU its proposals for signing and concluding the agreement. The Commission lists the remaining steps as Council adoption, signature, the European Parliament’s consent and a Council decision to conclude; once India also ratifies, the agreement can enter into force.</li>
              <li>The Hindu reported on 24 September 2026, citing diplomatic sources, that signing is scheduled for 16 December 2026 in Brussels, with a roll-out expected in early 2027. Treat that timetable as reported rather than confirmed.</li>
              <li>Separate agreements on geographical indications and investment protection are still being negotiated.</li>
            </ul>
            <p><strong>In practice:</strong> nothing changes at the border until the agreement enters into force. EU buyers and Indian exporters planning for 2027 should watch the signing and ratification steps.</p>`,
    sources: [
      { title: 'European Commission: The EU-India trade agreement', url: 'https://commission.europa.eu/topics/trade/eu-india-trade-agreement_en' },
      { title: 'PIB (Government of India): India–EU FTA concluded (27 Jan 2026)', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2219065' },
      { title: 'The Hindu: India-EU FTA to be signed on December 16 (24 Sep 2026)', url: 'https://www.thehindu.com/business/Economy/india-eu-fta-to-be-signed-on-december-16/article71499760.ece' }
    ]
  }
];

// Trade-fair calendar, October 2026 to March 2027. Dates as published by organisers.
export const FAIRS = [
  { dates: '6–8 Oct 2026', name: 'CPHI Milan', where: 'Fiera Milano, Italy', sector: 'Specialty chemicals (pharma ingredients)', url: 'https://www.cphi.com/europe/', sourceLabel: 'cphi.com' },
  { dates: '13–17 Oct 2026', name: 'IHGF Delhi Fair (Autumn)', where: 'India Expo Centre &amp; Mart, Greater Noida', sector: 'Home textiles and furnishings', url: 'https://ihgfdelhifair.in/', sourceLabel: 'ihgfdelhifair.in' },
  { dates: '17–21 Oct 2026', name: 'SIAL Paris', where: 'Paris Nord Villepinte, France', sector: 'Spices &amp; agri-food', url: 'https://www.sialparis.com/en/pratical-info/dates-venue-opening-times', sourceLabel: 'sialparis.com' },
  { dates: '9–12 Nov 2026', name: 'Web Summit', where: 'Lisbon, Portugal', sector: 'Software &amp; AI', url: 'https://websummit.com/web-summit-2026/', sourceLabel: 'websummit.com' },
  { dates: '7–11 Dec 2026', name: 'GITEX Global', where: 'Dubai, UAE', sector: 'Software &amp; AI', url: 'https://www.gitex.com/', sourceLabel: 'gitex.com' },
  { dates: '12–15 Jan 2027', name: 'Heimtextil', where: 'Messe Frankfurt, Germany', sector: 'Home textiles', url: 'https://heimtextil.messefrankfurt.com/frankfurt/en/planning-preparation.html', sourceLabel: 'messefrankfurt.com' },
  { dates: '21–27 Jan 2027', name: 'IMTEX 2027 (with Tooltech)', where: 'BIEC, Bengaluru', sector: 'Engineering components', url: 'https://www.mta.org.uk/event/imtex-2027-tooltech-2027-digital-manufacturing-2027/', sourceLabel: 'mta.org.uk listing' },
  { dates: '29 Jan – 2 Feb 2027', name: 'Ambiente', where: 'Messe Frankfurt, Germany', sector: 'Home textiles (table and kitchen)', url: 'https://ambiente.messefrankfurt.com/frankfurt/en/planning-preparation/visitors.html', sourceLabel: 'messefrankfurt.com' },
  { dates: '16–19 Feb 2027', name: 'BIOFACH', where: 'NürnbergMesse, Nuremberg, Germany', sector: 'Spices &amp; agri-food (organic)', url: 'https://www.biofach.de/en', sourceLabel: 'biofach.de' },
  { dates: '15–19 Mar 2027', name: 'Gulfood', where: 'Dubai World Trade Centre &amp; Dubai Exhibition Centre, UAE', sector: 'Spices &amp; agri-food', url: 'https://www.gulfood.com/', sourceLabel: 'gulfood.com' }
];
