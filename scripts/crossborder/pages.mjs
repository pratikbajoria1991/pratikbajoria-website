// Page content for the cross-border site. British spelling. No invented clients,
// logos, testimonials, deal counts, stats or fee percentages ("fees agreed per deal").
import { CONTACT_EMAIL, MAIN_SITE, WHATSAPP_DISPLAY, BUILD_DATE, LINKEDIN, BUYER_PATH, SELLER_PATH } from './config.mjs';
import { esc, wa, waButton } from './layout.mjs';
import { INSIGHTS, FAIRS } from './insights.mjs';

const list = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
const listCard = (title, items, extra = '') => `<div class="list-card ${extra}"><h3>${title}</h3>${list(items)}</div>`;
const sectionHead = (label, count) => `<div class="section-head"><span class="eyebrow">${label}</span><span class="count">${count}</span></div>`;
const hero = ({ eyebrow, h1, lede, ctas = true, home = false, extra = '' }) => `      <section class="hero shell${home ? ' home' : ''}">
        <p class="eyebrow kicker"><span class="dot" aria-hidden="true"></span>${eyebrow}</p>
        <h1>${h1}</h1>
        <p class="lede">${lede}</p>
        ${ctas ? `<div class="cta-row">
          <a class="button button-dark" href="${BUYER_PATH}#enquire">I’m looking for a partner or supplier <span>↗</span></a>
          <a class="button button-cream" href="${SELLER_PATH}#enquire">I want international clients or buyers <span>↗</span></a>
        </div>` : ''}
        ${extra}
      </section>`;

const STEPS = [
  ['Tell us your need or capacity', 'A short note or call: what you buy or sell, specifications, volumes or scope, target markets, timelines and what a good partner looks like to you.'],
  ['Shortlist and vet', 'I shortlist possible matches and check them before anyone is introduced: registration, track record, reviews, certifications, export history and references.'],
  ['Introduction under a signed agreement', 'A short written agreement covering confidentiality, non-circumvention and the fee terms is signed before any names are shared.'],
  ['Fee only on a closed deal', 'No retainer. Fees are agreed per deal, in writing and upfront, and paid only on a closed deal: a signed and paid project, or a shipped and paid order.']
];
const STEPS_SHORT = ['A short note on what you need or can supply.', 'Possible matches shortlisted and checked.', 'Names shared once a short agreement is signed.', 'Fees agreed per deal, paid only on a closed deal.'];
const stepsShortHtml = () => `<ol class="steps steps-short">${STEPS.map(([t], i) => `<li><span class="n">STEP 0${i + 1}</span><h3>${t}</h3><p>${STEPS_SHORT[i]}</p></li>`).join('')}</ol>`;
const stepsHtml = (light = false) => `<ol class="steps${light ? ' light' : ''}">${STEPS.map(([t, d], i) => `<li><span class="n">STEP 0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>`;

const SECTORS = [
  { slug: 'software-ai-development', name: 'Software &amp; AI Development', short: 'Web, mobile, AI and data engineering, including healthcare and fintech builds.' },
  { slug: 'spices-agri-food', name: 'Spices &amp; Agri-food', short: 'Whole and ground spices, blends, processed and organic foods.' },
  { slug: 'home-textiles', name: 'Home Textiles', short: 'Bed, bath, kitchen and furnishing textiles, rugs and made-ups.' },
  { slug: 'engineering-components', name: 'Engineering Components', short: 'Castings, forgings, machined, fabricated and assembled parts.' },
  { slug: 'specialty-chemicals', name: 'Specialty Chemicals', short: 'Intermediates, additives, dyes, pigments and performance chemicals.' }
];
const sectorGrid = () => `<div class="grid-5">${SECTORS.map((s, i) => `<a class="card sector-card" href="/sectors/${s.slug}"><span class="num">0${i + 1}</span><h3>${s.name}</h3><p>${s.short}</p><span class="more">Read more<span aria-hidden="true">→</span></span></a>`).join('')}</div>`;
const plain = (t, body) => `<div class="list-card"><h3>${t}</h3><p style="color:var(--muted);font-size:14px;margin:0">${body}</p></div>`;

const formHtml = ({ id, interest, title, intro, detailsLabel, placeholder }) => `<div class="form-card" id="${id}">
            <span class="eyebrow">${interest === 'cross-border-buyer' ? 'Buyers · overseas companies' : 'Sellers · Indian businesses'}</span>
            <h2>${title}</h2>
            <p>${intro}</p>
            <form class="xb-form" data-interest="${interest}" novalidate>
              <input type="hidden" name="interest" value="${interest}" />
              <input class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" />
              <div class="two">
                <label>Full name *<input name="name" required autocomplete="name" placeholder="Your name" /></label>
                <label>Work email *<input name="email" type="email" required autocomplete="email" placeholder="you@company.com" /></label>
              </div>
              <div class="two">
                <label>Company *<input name="company" required autocomplete="organization" placeholder="Company name" /></label>
                <label>Country *<input name="country" required autocomplete="country-name" placeholder="Where you are based" /></label>
              </div>
              <div class="two">
                <label>Sector
                  <select name="lane">
                    <option value="Software & AI development">Software &amp; AI development</option>
                    <option value="Spices & agri-food">Spices &amp; agri-food</option>
                    <option value="Home textiles">Home textiles</option>
                    <option value="Engineering components">Engineering components</option>
                    <option value="Specialty chemicals">Specialty chemicals</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                <label>WhatsApp / phone<input name="phone" type="tel" autocomplete="tel" placeholder="Optional" /></label>
              </div>
              <label>${detailsLabel} *<textarea name="challenge" required placeholder="${placeholder}"></textarea></label>
              <label class="consent"><input type="checkbox" name="consent" required /> <span>I agree that Pratik may use these details to respond to my enquiry, as described in the <a href="${MAIN_SITE}/privacy" target="_blank" rel="noopener">privacy notice</a>.</span></label>
              <p class="form-error" role="alert" hidden></p>
              <button class="button button-dark" type="submit">Send enquiry <span>↗</span></button>
            </form>
          </div>`;
const WA_HELLO = 'Hi Pratik, I’d like to discuss a cross-border introduction.';
const WA_BUYER = 'Hi Pratik, I’m looking for a partner or supplier in India.';
const WA_SELLER = 'Hi Pratik, I’m looking for international clients or buyers.';
const formAside = (waText) => `<aside class="list-card form-aside" aria-label="Other ways to get in touch">
            <h3>Prefer to chat?</h3>
            <p>Message me on WhatsApp and I’ll reply personally.</p>
            <div class="cta-row" style="margin-top:14px">${waButton(`WhatsApp ${WHATSAPP_DISPLAY}`, waText)}</div>${CONTACT_EMAIL ? `
            <p style="margin-top:14px">Or email <a class="inline-link" href="mailto:${esc(CONTACT_EMAIL)}">${esc(CONTACT_EMAIL)}</a></p>` : ''}
            <ul>
              <li>Keep confidential detail until an agreement is in place</li>
              <li>Nothing is shared with anyone else without your consent</li>
              <li><a class="inline-link" href="/how-it-works#faq">Read the FAQ</a></li>
            </ul>
          </aside>`;

const pages = [];
const add = (p) => pages.push(p);

// ------------------------------------------------------------------ Home (a simple fork)
add({
  path: '/',
  title: 'Cross-border Deals & Partnerships by Pratik Bajoria | India and the world',
  ogTitle: 'Cross-border Deals & Partnerships by Pratik Bajoria',
  description: 'Cross-border deals between India and the world. Overseas companies: find a deployable partner in India. Indian businesses: win clients and buyers abroad. Vetted introductions by Pratik Bajoria, Chartered Accountant.',
  priority: '1.0',
  body: `      <section class="hero shell home fork-hero">
        <p class="eyebrow kicker"><span class="dot" aria-hidden="true"></span>India and the world · Vetted introductions · CA-led</p>
        <h1>Cross-border deals between <em>India and the world.</em></h1>
        <p class="lede">Careful introductions in both directions. Which side are you on?</p>
        <div class="fork" role="list">
          <a class="fork-card" role="listitem" href="${BUYER_PATH}">
            <span class="tag">For overseas companies</span>
            <h2>Find a deployable partner <em>in India.</em></h2>
            <p>Hire an Indian tech team, or source from vetted manufacturers and exporters, with partners checked before you meet them.</p>
            <span class="fork-go">Find a partner in India<span aria-hidden="true">→</span></span>
          </a>
          <a class="fork-card" role="listitem" href="${SELLER_PATH}">
            <span class="tag">For Indian businesses</span>
            <h2>Win clients and buyers <em>abroad.</em></h2>
            <p>Qualified overseas clients for IT and software agencies; importers and distributors for manufacturers and exporters.</p>
            <span class="fork-go">Win clients abroad<span aria-hidden="true">→</span></span>
          </a>
        </div>
      </section>

      <section class="band band-compact" aria-labelledby="how">
        <div class="shell">
          ${sectionHead('How it works', 'A — D')}
          <h2 class="section-title" id="how">Four steps, <em>start to finish.</em></h2>
          ${stepsShortHtml()}
          <p style="margin-top:30px"><a class="button button-cream" href="/how-it-works">How it works, in full <span>↗</span></a></p>
        </div>
      </section>

      <section class="section shell" aria-labelledby="sectors" style="padding-top:72px">
        ${sectionHead('Sectors', '05')}
        <h2 class="section-title" id="sectors">Deliberately <em>narrow.</em></h2>
        <p class="section-intro">Five sectors where I can understand both sides properly, so each introduction is considered rather than speculative.</p>
        ${sectorGrid()}
      </section>`
});

// ------------------------------------------------------------------ Landing: Find a deployable partner in India (overseas buyers)
add({
  path: BUYER_PATH,
  title: 'Find a Deployable Partner in India: tech teams, manufacturers, exporters',
  ogTitle: 'Find a deployable partner in India',
  description: 'For overseas companies: introductions to vetted Indian software agencies, manufacturers and exporters that can actually deliver. What you can find, how partners are vetted, the four steps and an enquiry form.',
  priority: '0.9',
  crumbs: [{ name: 'Find a Partner in India', path: BUYER_PATH }],
  noCta: true,
  body: `${hero({
    eyebrow: 'For overseas buyers',
    h1: 'Find a deployable partner <em>in India.</em>',
    lede: 'Whether you need a development team or a manufacturer, the hard part is not finding names: it is knowing who will actually deliver. I shortlist and check Indian partners against your brief before you spend time on calls.',
    ctas: false,
    extra: `<div class="cta-row"><a class="button button-dark" href="#enquire">Send your brief <span>↓</span></a>${waButton('WhatsApp', WA_BUYER)}</div>`
  })}
      <section class="section shell" aria-labelledby="find">
        ${sectionHead('What you can find', '02')}
        <h2 class="section-title" id="find">Teams that build, <em>suppliers that ship.</em></h2>
        <div class="grid-2">
          <a class="card" href="/buyers/hire-indian-tech-teams">
            <span class="tag">Software</span>
            <h3>Indian tech teams</h3>
            <p>Vetted software agencies for web, mobile, AI and regulated-industry builds such as healthcare and fintech.</p>
            <ul><li>Fixed-scope projects or dedicated teams</li><li>Security and compliance experience checked, not assumed</li><li>Time-zone overlap agreed upfront</li></ul>
            <span class="more">Hire Indian tech teams<span aria-hidden="true">→</span></span>
          </a>
          <a class="card" href="/buyers/source-from-india">
            <span class="tag">Goods</span>
            <h3>Manufacturers and exporters</h3>
            <p>Vetted Indian manufacturers and exporters for importers, distributors and brands, dealing with you directly.</p>
            <ul><li>Samples arranged directly with the supplier</li><li>Compliance documents for your market</li><li>Direct pricing, with no trading margin from me</li></ul>
            <span class="more">Source from India<span aria-hidden="true">→</span></span>
          </a>
        </div>
      </section>

      <section class="section shell" aria-labelledby="vetting">
        ${sectionHead('Vetting, in summary', '05 checks')}
        <h2 class="section-title" id="vetting">Checked before <em>you meet them.</em></h2>
        <div class="grid-2">
          ${listCard('What I check', ['<strong>Track record:</strong> comparable work, how long they have operated, capacity for your brief', '<strong>Reviews:</strong> public reviews read for patterns, and how complaints were handled', '<strong>Certifications:</strong> checked against the issuer’s register where one exists', '<strong>Export history:</strong> IEC and export registrations for goods; overseas client experience for services', '<strong>References:</strong> existing clients or buyers you can follow up yourself'])}
          ${listCard('What vetting is not', ['An audit, a certification or a warranty', 'A guarantee of quality, delivery, price or any other outcome', 'A substitute for your own samples, pilots, contracts and due diligence'], 'not')}
        </div>
        <p class="note">Red flags end the process: if registration details are withheld or documents don’t match, I don’t make the introduction. <a class="inline-link" href="/buyers/how-we-vet-partners">How we vet partners, in full</a></p>
      </section>

      <section class="band" aria-labelledby="steps">
        <div class="shell">
          ${sectionHead('How it works', 'A — D')}
          <h2 class="section-title" id="steps">Four steps, <em>start to finish.</em></h2>
          <p class="section-intro">Nothing is shared with the other side until you are comfortable and an agreement is signed.</p>
          ${stepsHtml()}
          <p style="margin-top:34px"><a class="button button-cream" href="/how-it-works">How it works and FAQ <span>↗</span></a></p>
        </div>
      </section>

      <section class="section shell" aria-labelledby="sectors" style="padding-top:72px">
        ${sectionHead('Sectors', '05')}
        <h2 class="section-title" id="sectors">Where I can <em>help you buy.</em></h2>
        ${sectorGrid()}
      </section>

      <section class="section shell" aria-labelledby="enquire-title">
        ${sectionHead('Send your brief', 'Form · WhatsApp')}
        <h2 class="section-title" id="enquire-title">Tell me what <em>you need.</em></h2>
        <div class="forms forms-aside">
          ${formHtml({ id: 'enquire', interest: 'cross-border-buyer', title: 'I’m looking for a partner or supplier', intro: 'A few lines is enough: what you want built or sourced, rough scope or volumes, your market and timelines.', detailsLabel: 'What do you need?', placeholder: 'Product or service, specification, volumes or scope, target markets and timelines.' })}
          ${formAside(WA_BUYER)}
        </div>
      </section>`
});

// ------------------------------------------------------------------ Hire Indian Tech Teams
add({
  path: '/buyers/hire-indian-tech-teams',
  title: 'Hire Indian Tech Teams: vetted software agencies',
  description: 'Introductions to vetted Indian software agencies for web, mobile, AI and regulated-industry builds (healthcare, fintech). Shortlisted against your brief and checked before you meet them.',
  crumbs: [{ name: 'Find a Partner in India', path: BUYER_PATH }, { name: 'Hire Indian Tech Teams', path: '/buyers/hire-indian-tech-teams' }],
  body: `${hero({
    eyebrow: 'For overseas buyers · Software',
    h1: 'Hire Indian tech teams, <em>vetted first.</em>',
    lede: 'Introductions to vetted Indian software agencies for web, mobile, AI and regulated-industry builds such as healthcare and fintech, for companies in the US, UK, Middle East and beyond.'
  })}
      <section class="section shell" aria-labelledby="what">
        ${sectionHead('What I introduce', '04')}
        <h2 class="section-title" id="what">Agencies matched <em>to the work.</em></h2>
        <div class="grid-2">
          ${listCard('Web and mobile', ['Web applications, SaaS platforms and customer portals', 'iOS, Android and cross-platform mobile apps', 'Modernising or rebuilding legacy systems', 'Ongoing product engineering and support'])}
          ${listCard('AI and data', ['AI features in existing products (LLM-based assistants, search, document processing)', 'Workflow automation and integrations', 'Data engineering, pipelines and dashboards', 'Proofs of concept that can grow into production systems'])}
          ${listCard('Regulated-industry builds', ['Healthcare software, where the agency can show experience with the rules your project falls under (for example HIPAA or UK GDPR)', 'Fintech and payments software, with relevant security and compliance experience (for example PCI DSS)', 'Security practices and certifications checked, not assumed'])}
          ${listCard('Engagement models', ['Fixed-scope projects with a clear specification', 'Dedicated teams that work as an extension of yours', 'A paid discovery or pilot phase before a larger commitment', 'Time-zone overlap agreed upfront'])}
        </div>
        <p class="note"><strong>Why this matters to me:</strong> my main practice is <a class="inline-link" href="${MAIN_SITE}/">AI implementation consulting</a>, so I can read a technical proposal critically and tell a capable team from a polished pitch.</p>
      </section>
      <section class="section shell" aria-labelledby="brief">
        ${sectionHead('From brief to shortlist', 'Process')}
        <h2 class="section-title" id="brief">What to send, <em>what happens next.</em></h2>
        <div class="grid-2">
          ${listCard('A useful first note covers', ['What you are building and for whom', 'Preferred stack, if any, and any existing code', 'Budget range and engagement model', 'Timeline and the time-zone overlap you need', 'Compliance requirements (healthcare, fintech, data residency)'])}
          ${listCard('Then', ['I shortlist agencies whose track record matches your brief', 'I check them before introducing them (<a class="inline-link" href="/buyers/how-we-vet-partners">how we vet partners</a>)', 'A short agreement is signed, then I introduce you', 'You run your own evaluation: calls, proposals, references, a pilot', 'Any fee is agreed per deal, in writing, before introductions'])}
        </div>
        <div class="grid-2" style="margin-top:18px">
          ${listCard('A good fit', ['A defined project or product with budget allocated', 'A decision-maker involved from the start', 'Openness to a paid pilot before a long contract'])}
          ${listCard('Not a fit', ['Shopping only for the lowest hourly rate', 'Speculative tenders with no budget or timeline', 'Work that must be done on-site in your country'], 'not')}
        </div>
      </section>`
});

// ------------------------------------------------------------------ Source from India
add({
  path: '/buyers/source-from-india',
  title: 'Source from India: vetted manufacturers and exporters',
  description: 'Introductions to vetted Indian manufacturers and exporters for importers, distributors and brands, covering samples, compliance documents and direct pricing.',
  crumbs: [{ name: 'Find a Partner in India', path: BUYER_PATH }, { name: 'Source from India', path: '/buyers/source-from-india' }],
  body: `${hero({
    eyebrow: 'For overseas buyers · Goods',
    h1: 'Source from India, <em>straight from the maker.</em>',
    lede: 'Introductions to vetted Indian manufacturers and exporters for importers, distributors and brands in the US, UK/EU, Gulf and South-East Asia, covering samples, compliance documents and direct pricing.'
  })}
      <section class="section shell" aria-labelledby="get">
        ${sectionHead('What you get', '03')}
        <h2 class="section-title" id="get">Samples, papers, <em>prices.</em></h2>
        <div class="grid-3">
          ${listCard('Samples', ['Samples arranged directly between you and the supplier', 'Sample cost and courier terms agreed between you', 'Specifications confirmed in writing before bulk orders'])}
          ${listCard('Compliance documents', ['Certificates relevant to your market and product, for example ISO 9001, food-safety, organic, OEKO-TEX or GOTS, or REACH documentation', 'Importer-Exporter Code (IEC) and export registrations checked', 'Lab reports or certificates of analysis requested where relevant'])}
          ${listCard('Direct pricing', ['Quotes come directly from the manufacturer or exporter', 'I don’t buy, resell or hold goods, so there is no trading margin from me', 'Incoterms, payment terms and lead times negotiated between you'])}
        </div>
      </section>
      <section class="section shell" aria-labelledby="sectors">
        ${sectionHead('Sectors', '04')}
        <h2 class="section-title" id="sectors">Where I <em>source.</em></h2>
        <div class="grid-2">
          <a class="card" href="/sectors/spices-agri-food"><span class="tag">Food</span><h3>Spices &amp; agri-food</h3><p>Whole and ground spices, blends, processed and organic foods.</p><span class="more">Sector notes<span aria-hidden="true">→</span></span></a>
          <a class="card" href="/sectors/home-textiles"><span class="tag">Textiles</span><h3>Home textiles</h3><p>Bed, bath, kitchen and furnishing textiles, rugs and made-ups.</p><span class="more">Sector notes<span aria-hidden="true">→</span></span></a>
          <a class="card" href="/sectors/engineering-components"><span class="tag">Engineering</span><h3>Engineering components</h3><p>Castings, forgings, machined, fabricated and assembled parts.</p><span class="more">Sector notes<span aria-hidden="true">→</span></span></a>
          <a class="card" href="/sectors/specialty-chemicals"><span class="tag">Chemicals</span><h3>Specialty chemicals</h3><p>Intermediates, additives, dyes, pigments and performance chemicals.</p><span class="more">Sector notes<span aria-hidden="true">→</span></span></a>
        </div>
      </section>
      <section class="section shell" aria-labelledby="send">
        ${sectionHead('Your first note', 'Checklist')}
        <h2 class="section-title" id="send">What to <em>send me.</em></h2>
        <div class="grid-2">
          ${listCard('Product and volumes', ['Product and specification (or a sample or drawing reference)', 'Expected volumes, order frequency and any target price', 'Packaging or private-label requirements'])}
          ${listCard('Market and logistics', ['Destination country and the certifications your market requires', 'Preferred Incoterms and delivery timeline', 'Whether you already import from India'])}
        </div>
        <p class="note"><strong>Your diligence still matters.</strong> Vetting narrows the field; it is not an inspection or a warranty. For goods, plan for samples, third-party inspection where appropriate and your own contract and payment safeguards.</p>
      </section>`
});

// ------------------------------------------------------------------ How We Vet Partners
add({
  path: '/buyers/how-we-vet-partners',
  title: 'How We Vet Partners: what I check before an introduction',
  description: 'How Indian partners are checked before an introduction: track record, reviews, certifications, export history and references, plus registration basics. What vetting is, and what it is not.',
  crumbs: [{ name: 'Find a Partner in India', path: BUYER_PATH }, { name: 'How We Vet Partners', path: '/buyers/how-we-vet-partners' }],
  body: `${hero({
    eyebrow: 'For overseas buyers · Diligence',
    h1: 'How we vet partners, <em>before you meet them.</em>',
    lede: 'A Chartered Accountant’s habits applied to partner selection: evidence over claims, documents over decks. Here is what I check before I introduce anyone.'
  })}
      <section class="section shell" aria-labelledby="checks">
        ${sectionHead('The checks', '05 + basics')}
        <h2 class="section-title" id="checks">Five things, <em>checked.</em></h2>
        <div class="grid-2">
          ${listCard('01 · Track record', ['How long the business has operated and what it has delivered', 'Comparable projects or products, not just a list of client names', 'Team or production capacity relative to your brief'])}
          ${listCard('02 · Reviews', ['Public reviews on relevant platforms, read for patterns rather than star ratings', 'How complaints were handled, where visible', 'Consistency between what they say and what others say'])}
          ${listCard('03 · Certifications', ['Certificates requested and checked against the issuer’s register where one exists', 'Scope and expiry dates read, not just the logo', 'Industry-specific credentials (for example ISO 27001 for software, food-safety or textile standards for goods)'])}
          ${listCard('04 · Export history', ['For goods: Importer-Exporter Code (IEC) and relevant export registrations', 'Evidence of past shipments to comparable markets (commercial details can be redacted)', 'For services: experience working with overseas clients and time zones'])}
          ${listCard('05 · References', ['Conversations with existing clients or buyers where possible', 'Questions about delivery, communication and how problems were resolved', 'References you can follow up yourself'])}
          ${listCard('Basics', ['Company registration and directors checked on public records', 'GST registration checked where applicable', 'Names, addresses and bank details consistent across documents'])}
        </div>
      </section>
      <section class="section shell" aria-labelledby="not">
        ${sectionHead('Limits', 'Honestly')}
        <h2 class="section-title" id="not">What vetting <em>is not.</em></h2>
        <div class="grid-2">
          ${listCard('Vetting is not', ['An audit, a certification or a warranty', 'A guarantee of quality, delivery, payment or any other outcome', 'A substitute for your own commercial, legal and financial due diligence'], 'not')}
          ${listCard('So I recommend', ['Samples and, for goods, independent inspection where appropriate', 'A paid pilot or discovery phase for software', 'Contracts reviewed by your own advisers', 'Payment terms that match the risk'])}
        </div>
        <p class="note"><strong>Red flags end the process.</strong> Reluctance to share registration details, documents that don’t match, or pressure for advance payments to personal accounts mean I don’t make the introduction.</p>
      </section>`
});

// ------------------------------------------------------------------ Landing: Win clients and buyers abroad (Indian businesses)
add({
  path: SELLER_PATH,
  title: 'Win Clients and Buyers Abroad: for Indian agencies, manufacturers and exporters',
  ogTitle: 'Win clients and buyers abroad',
  description: 'For Indian IT and software agencies, manufacturers and exporters: introductions to qualified overseas clients, importers and distributors. Who it is for, how introductions work, partner terms, sectors and an application form.',
  priority: '0.9',
  crumbs: [{ name: 'Win Clients Abroad', path: SELLER_PATH }],
  noCta: true,
  body: `${hero({
    eyebrow: 'For Indian businesses',
    h1: 'Win clients and buyers <em>abroad.</em>',
    lede: 'If you deliver well and want more overseas business, I introduce you to qualified clients, importers and distributors, with the terms written down before anyone is introduced.',
    ctas: false,
    extra: `<div class="cta-row"><a class="button button-dark" href="#enquire">Apply as a partner <span>↓</span></a>${waButton('WhatsApp', WA_SELLER)}</div>`
  })}
      <section class="section shell" aria-labelledby="who">
        ${sectionHead('Who it’s for', '02')}
        <h2 class="section-title" id="who">Proven delivery, <em>ready for more.</em></h2>
        <div class="grid-2">
          <a class="card" href="/indian-businesses/it-software-agencies">
            <span class="tag">Services</span>
            <h3>IT and software agencies</h3>
            <p>Introductions to qualified clients in the US, UK and Middle East who need web, mobile, AI or regulated-industry builds.</p>
            <ul><li>Real projects with a defined need and budget</li><li>A decision-maker involved from the start</li><li>You set your own pricing and contract terms</li></ul>
            <span class="more">IT &amp; software agencies<span aria-hidden="true">→</span></span>
          </a>
          <a class="card" href="/indian-businesses/manufacturers-exporters">
            <span class="tag">Goods</span>
            <h3>Manufacturers and exporters</h3>
            <p>Introductions to qualified importers and distributors in the US, UK/EU, Gulf and South-East Asia.</p>
            <ul><li>Genuine requirements: product, specification, volumes</li><li>Buyers whose volumes suit your capacity</li><li>Samples, Incoterms and payment terms agreed between you</li></ul>
            <span class="more">Manufacturers &amp; exporters<span aria-hidden="true">→</span></span>
          </a>
        </div>
        <div class="grid-2" style="margin-top:18px">
          ${listCard('A good fit', ['Work or products you can show, and references', 'Capacity to take on new overseas business now', 'Willingness to be checked (registration, certifications, references)', 'Clear, prompt communication in English'])}
          ${listCard('Not a fit', ['Looking for a lead list or mass outreach', 'Unwilling to sign a short agreement first', 'Sectors outside the five I cover'], 'not')}
        </div>
      </section>

      <section class="band" aria-labelledby="intros">
        <div class="shell">
          ${sectionHead('How introductions work', 'A — D')}
          <h2 class="section-title" id="intros">Qualified first, <em>introduced properly.</em></h2>
          <p class="section-intro">I share the client’s or buyer’s brief with you before any introduction, and you decide whether to go ahead. Nobody is introduced until a short agreement is signed.</p>
          ${stepsHtml()}
          <p style="margin-top:34px"><a class="button button-cream" href="/how-it-works">How it works and FAQ <span>↗</span></a></p>
        </div>
      </section>

      <section class="section shell" aria-labelledby="terms" style="padding-top:72px">
        ${sectionHead('Partner terms, in summary', '05')}
        <h2 class="section-title" id="terms">Simple terms, <em>written down first.</em></h2>
        <div class="terms-grid">
          ${plain('Fees agreed per deal', 'Fees are agreed per deal and paid only on a closed deal: signed and paid projects for agencies, shipped and paid orders for goods.')}
          ${plain('No retainer', 'No retainer, no listing fee and nothing upfront. An introduction on its own costs nothing.')}
          ${plain('Existing customers excluded', 'Clients or buyers you already work with, or were already talking to, are listed at the start and excluded.')}
          ${plain('Agreement first', 'A short written agreement is signed before any introduction, setting out the fee basis, trigger, duration and exclusions.')}
          ${plain('Confidentiality', 'Your details are shared only with your consent, and introduced parties agree not to bypass the agreement.')}
        </div>
        <p class="note"><a class="inline-link" href="/indian-businesses/partner-terms">Read the partner terms in full</a></p>
      </section>

      <section class="section shell" aria-labelledby="sectors">
        ${sectionHead('Sectors', '05')}
        <h2 class="section-title" id="sectors">Where I can <em>find you buyers.</em></h2>
        ${sectorGrid()}
      </section>

      <section class="section shell" aria-labelledby="enquire-title">
        ${sectionHead('Apply as a partner', 'Form · WhatsApp')}
        <h2 class="section-title" id="enquire-title">Tell me what <em>you offer.</em></h2>
        <div class="forms forms-aside">
          ${formHtml({ id: 'enquire', interest: 'cross-border-seller', title: 'I want international clients or buyers', intro: 'A few lines is enough: what you build or make, capacity, certifications, and the markets you want to reach.', detailsLabel: 'What do you offer?', placeholder: 'What you make or build, capacity, certifications, current and target markets.' })}
          ${formAside(WA_SELLER)}
        </div>
      </section>`
});

// ------------------------------------------------------------------ IT & Software Agencies
add({
  path: '/indian-businesses/it-software-agencies',
  title: 'IT & Software Agencies: qualified overseas clients',
  description: 'For Indian IT and software agencies: introductions to qualified clients in the US, UK and Middle East with real projects, allocated budgets and a decision-maker involved.',
  crumbs: [{ name: 'Win Clients Abroad', path: SELLER_PATH }, { name: 'IT & Software Agencies', path: '/indian-businesses/it-software-agencies' }],
  body: `${hero({
    eyebrow: 'For Indian businesses · Software',
    h1: 'Qualified overseas clients for <em>Indian agencies.</em>',
    lede: 'Introductions to qualified clients in the US, UK and Middle East who need web, mobile, AI or regulated-industry builds.'
  })}
      <section class="section shell" aria-labelledby="qualified">
        ${sectionHead('What “qualified” means', '04')}
        <h2 class="section-title" id="qualified">Real projects, <em>not lead lists.</em></h2>
        <div class="grid-2">
          ${listCard('Before I introduce a client, I check', ['There is a real project with a defined need', 'Budget has been allocated, at least as a range', 'A decision-maker is involved', 'The timeline is realistic and the work suits your strengths'])}
          ${listCard('You stay in control', ['I share the brief before any introduction', 'You decide whether to engage', 'You set your own pricing and contract terms with the client', 'No exclusivity is required to work with me'])}
        </div>
      </section>
      <section class="section shell" aria-labelledby="ask">
        ${sectionHead('What I’ll ask you', 'Profile')}
        <h2 class="section-title" id="ask">Help me <em>represent you accurately.</em></h2>
        <div class="grid-2">
          ${listCard('About your work', ['Services, stack and the domains you know well', 'Case studies or live products I can review', 'Team size and current capacity', 'Engagement models and typical rate ranges'])}
          ${listCard('About your credentials', ['Company registration and GST details', 'Security or quality certifications, if any (for example ISO 27001 or SOC 2 reports)', 'Two or three client references', 'Experience with overseas clients and time zones'])}
        </div>
        <p class="note"><strong>The fee:</strong> a referral fee only on signed and paid projects with clients I introduce. Fees are agreed per deal and written into a short agreement before any introduction; your existing customers are excluded. See <a class="inline-link" href="/indian-businesses/partner-terms">partner terms</a>.</p>
      </section>`
});

// ------------------------------------------------------------------ Manufacturers & Exporters
add({
  path: '/indian-businesses/manufacturers-exporters',
  title: 'Manufacturers & Exporters: qualified overseas buyers',
  description: 'For Indian manufacturers and exporters: introductions to qualified overseas importers and distributors in the US, UK/EU, Gulf and South-East Asia, with genuine requirements and volumes that suit your capacity.',
  crumbs: [{ name: 'Win Clients Abroad', path: SELLER_PATH }, { name: 'Manufacturers & Exporters', path: '/indian-businesses/manufacturers-exporters' }],
  body: `${hero({
    eyebrow: 'For Indian businesses · Goods',
    h1: 'Overseas importers and distributors, <em>qualified first.</em>',
    lede: 'Introductions to qualified importers and distributors in the US, UK/EU, Gulf and South-East Asia for spices and agri-food, home textiles, engineering components and specialty chemicals.'
  })}
      <section class="section shell" aria-labelledby="buyers">
        ${sectionHead('Qualified buyers', '04')}
        <h2 class="section-title" id="buyers">Buyers who <em>actually order.</em></h2>
        <div class="grid-2">
          ${listCard('Before I introduce a buyer, I check', ['They have a genuine requirement: product, specification and volumes', 'They import, or have a clear plan and the means to', 'Their market’s certification and labelling needs are understood', 'Their volumes and price expectations suit your capacity'])}
          ${listCard('You stay in control', ['You quote your own prices and terms', 'Samples, Incoterms and payment terms are agreed between you and the buyer', 'I don’t take title to goods or handle payments', 'You can decline any introduction'])}
        </div>
      </section>
      <section class="section shell" aria-labelledby="need">
        ${sectionHead('What I need from you', 'Profile')}
        <h2 class="section-title" id="need">Your <em>export profile.</em></h2>
        <div class="grid-2">
          ${listCard('Products and capacity', ['Product range and specifications', 'Monthly capacity, minimum order quantities and lead times', 'Sample policy and private-label options'])}
          ${listCard('Credentials', ['Importer-Exporter Code (IEC) and export registrations', 'Certifications relevant to your products and target markets', 'Current export markets and, ideally, buyer references'])}
        </div>
        <p class="note"><strong>The fee:</strong> a commission only on shipped and paid orders from buyers I introduce. Fees are agreed per deal and set out in a short written agreement before any introduction; existing customers are excluded. See <a class="inline-link" href="/indian-businesses/partner-terms">partner terms</a>.</p>
      </section>`
});

// ------------------------------------------------------------------ Partner Terms
add({
  path: '/indian-businesses/partner-terms',
  title: 'Partner Terms: how fees and introductions work',
  description: 'Partner terms for cross-border introductions: fees agreed per deal, paid only on a closed deal; no retainer; existing customers excluded; a short written agreement signed before any introduction.',
  crumbs: [{ name: 'Win Clients Abroad', path: SELLER_PATH }, { name: 'Partner Terms', path: '/indian-businesses/partner-terms' }],
  body: `${hero({
    eyebrow: 'For Indian businesses · Terms',
    h1: 'Partner terms, <em>in plain English.</em>',
    lede: 'Simple terms, written down before any names are shared: how fees work, what is excluded and how both sides are protected.',
    ctas: false
  })}
      <section class="section shell" aria-labelledby="terms">
        ${sectionHead('The terms', '06')}
        <h2 class="section-title" id="terms">Six things <em>to know.</em></h2>
        <div class="grid-2">
          ${listCard('01 · Fees agreed per deal, paid only on a closed deal', ['No retainer, no listing fee, no upfront charges', 'Nothing is payable for an introduction on its own'])}
          ${listCard('02 · Agreed upfront, in writing', ['The basis and amount of the fee are agreed for each deal', 'Agreed in writing before the introduction, never after'])}
          ${listCard('03 · When a fee is due', ['IT &amp; software: on signed and paid projects, as the client pays', 'Goods: on shipped and paid orders', 'The exact trigger is written into the agreement'])}
          ${listCard('04 · Existing customers excluded', ['Clients or buyers you already work with, or were already talking to, are excluded', 'We list them at the start so there is no ambiguity'])}
          ${listCard('05 · A short written agreement first', ['Signed before any introduction', 'Covers the parties, fee basis, trigger, duration, confidentiality, non-circumvention and exclusions'])}
          ${listCard('06 · Confidentiality and non-circumvention', ['Details are shared only with your consent and only for the purpose of the introduction', 'Introduced parties agree not to bypass the agreement to avoid the fee for the period it sets out'])}
        </div>
        <p class="note"><strong>No guarantees.</strong> I make considered introductions; whether a deal happens, and on what terms, is between you and the other party. I am not your employee or agent, and I don’t handle client funds or goods.</p>
        <div class="cta-row"><a class="button button-dark" href="${SELLER_PATH}#enquire">Apply as a partner <span>↗</span></a><a class="button button-cream" href="/how-it-works#faq">Read the FAQ <span>↗</span></a></div>
      </section>`
});

// ------------------------------------------------------------------ Sectors hub
add({
  path: '/sectors',
  title: 'Sectors: software, spices, textiles, engineering, chemicals',
  description: 'The five sectors covered by Cross-border Deals & Partnerships: software and AI development, spices and agri-food, home textiles, engineering components and specialty chemicals.',
  crumbs: [{ name: 'Sectors', path: '/sectors' }],
  body: `${hero({
    eyebrow: 'Sectors',
    h1: 'Five sectors, <em>understood properly.</em>',
    lede: 'A narrow focus means I can judge fit on both sides. Each sector page sets out what overseas buyers usually need and where I can help.',
    ctas: false
  })}
      <section class="section shell" aria-label="Sector list">
        ${sectorGrid()}
        <p class="note"><strong>Outside these five?</strong> Send a short note anyway. If I can’t help, I’ll say so quickly.</p>
      </section>`
});

// ------------------------------------------------------------------ Sector pages
const sectorPage = ({ slug, name, title, description, h1, lede, needs, help, first, related }) => add({
  path: `/sectors/${slug}`,
  title,
  description,
  crumbs: [{ name: 'Sectors', path: '/sectors' }, { name: name.replace('&amp;', '&'), path: `/sectors/${slug}` }],
  body: `${hero({ eyebrow: `Sectors · ${name}`, h1, lede })}
      <section class="section shell" aria-labelledby="needs">
        ${sectionHead('Buyers and partners', 'Needs · Help')}
        <h2 class="section-title" id="needs">What buyers usually need, <em>and where I help.</em></h2>
        <div class="grid-2">
          ${listCard('What buyers usually need', needs)}
          ${listCard('What I help with', help)}
        </div>
      </section>
      <section class="section shell" aria-labelledby="first">
        ${sectionHead('Your first note', 'Checklist')}
        <h2 class="section-title" id="first">What to <em>include.</em></h2>
        <div class="grid-2">
          ${listCard('If you’re buying', first.buy)}
          ${listCard('If you’re supplying from India', first.sell)}
        </div>
        <p class="note">${related}</p>
      </section>`
});
const goodsRelated = 'Related: <a class="inline-link" href="/buyers/source-from-india">Source from India</a> · <a class="inline-link" href="/indian-businesses/manufacturers-exporters">Manufacturers &amp; exporters</a> · <a class="inline-link" href="/buyers/how-we-vet-partners">How we vet partners</a>';

sectorPage({
  slug: 'software-ai-development', name: 'Software &amp; AI Development',
  title: 'Software & AI Development: Indian agencies for overseas clients',
  description: 'Software and AI development partnerships between overseas companies and vetted Indian agencies: what buyers usually need and how introductions work.',
  h1: 'Software &amp; AI development, <em>with the right team.</em>',
  lede: 'India has a deep pool of software agencies; the challenge is finding one that fits your stack, domain and way of working. I introduce overseas companies to vetted agencies, and Indian agencies to qualified overseas clients.',
  needs: ['Clear scoping, and a choice between fixed-price and dedicated-team models', 'Reliable communication and enough time-zone overlap', 'Security practices, data protection and clear IP assignment', 'Domain experience for regulated builds such as healthcare and fintech', 'Support and maintenance after launch'],
  help: ['Shortlisting agencies whose track record matches your stack and domain', 'Checking delivery history, reviews, certifications and references', 'Reading proposals with an AI practitioner’s eye', 'Introducing both sides under a short agreement', 'Flagging the questions to settle on IP, data and contracts with your own advisers'],
  first: { buy: ['What you’re building, for whom, and any existing code', 'Budget range, timeline and engagement model', 'Compliance needs (for example healthcare or payments data)'], sell: ['Services, stack and domains, with case studies', 'Team size, capacity and rate ranges', 'Certifications and client references'] },
  related: 'Related: <a class="inline-link" href="/buyers/hire-indian-tech-teams">Hire Indian tech teams</a> · <a class="inline-link" href="/indian-businesses/it-software-agencies">IT &amp; software agencies</a> · <a class="inline-link" href="/buyers/how-we-vet-partners">How we vet partners</a>'
});

sectorPage({
  slug: 'spices-agri-food', name: 'Spices &amp; Agri-food',
  title: 'Spices & Agri-food: sourcing from Indian exporters',
  description: 'Spices and agri-food sourcing from vetted Indian exporters: what importers usually need (specifications, food-safety compliance, certifications, traceability) and how introductions work.',
  h1: 'Spices &amp; agri-food, <em>to specification.</em>',
  lede: 'From whole and ground spices to blends and processed or organic foods, buyers need consistent quality that meets their market’s food-safety rules. I introduce importers to exporters who can document it.',
  needs: ['Consistent specifications: grade, moisture, colour, purity and cleanliness', 'Compliance with destination food-safety rules, including pesticide-residue limits', 'Recognised certifications where required (for example organic certification or ISO 22000 food-safety management)', 'Lab reports or certificates of analysis per lot, and traceability', 'Packaging, labelling and private-label options; dependable lead times'],
  help: ['Introducing exporters with the registrations and certifications your market expects', 'Making sure samples and lab reports are part of the first conversation', 'Matching volumes, minimum order quantities and seasonality', 'Checking export history to comparable markets', 'Keeping both sides aligned on specification before bulk orders'],
  first: { buy: ['Products, grades and specifications', 'Volumes, frequency and target price, if any', 'Destination market and the certifications you need'], sell: ['Product range and processing capabilities', 'IEC, export registrations and certifications', 'Capacity, lead times and current markets'] },
  related: goodsRelated
});

sectorPage({
  slug: 'home-textiles', name: 'Home Textiles',
  title: 'Home Textiles: sourcing from Indian manufacturers',
  description: 'Home textiles sourcing from vetted Indian manufacturers: bed, bath, kitchen and furnishing textiles. What buyers usually need (specifications, certifications, social compliance, private label) and how introductions work.',
  h1: 'Home textiles, <em>made to your standard.</em>',
  lede: 'Bed and bath linen, towels, kitchen textiles, curtains, cushions and rugs: buyers need the right fabric, finish and compliance paperwork, at volumes the mill can actually deliver.',
  needs: ['Fabric specifications: fibre, construction, GSM or thread count, finishes', 'Product certifications where required (for example OEKO-TEX, or GOTS for organic claims)', 'Social-compliance audits that retailers ask for', 'Private label, packaging and labelling for the destination market', 'Realistic minimum order quantities and lead times'],
  help: ['Introducing manufacturers whose certifications and capacity fit your order', 'Making sure samples, lab dips and specifications are agreed early', 'Checking export history and buyer references', 'Matching order sizes to the right scale of mill', 'Keeping documentation requests clear on both sides'],
  first: { buy: ['Product types, specifications and finishes', 'Volumes, target price and delivery windows', 'Certifications and audits your customers require'], sell: ['Product range, capacity and MOQs', 'Certifications and audit reports', 'Current export markets and references'] },
  related: goodsRelated
});

sectorPage({
  slug: 'engineering-components', name: 'Engineering Components',
  title: 'Engineering Components: castings, forgings and machined parts from India',
  description: 'Engineering components from vetted Indian manufacturers: castings, forgings, machined and fabricated parts. What buyers usually need (drawings, tolerances, material certificates, quality systems) and how introductions work.',
  h1: 'Engineering components, <em>to drawing.</em>',
  lede: 'Castings, forgings, machined, fabricated and assembled parts: buyers need suppliers who can hold tolerances, document materials and scale from samples to production.',
  needs: ['Parts made to drawing, with tolerances and finishes held consistently', 'Material test certificates and inspection reports', 'Quality systems such as ISO 9001, and sector standards where required (for example IATF 16949 for automotive)', 'First-article or sample approval before production', 'Protective packaging, export documentation and dependable lead times'],
  help: ['Matching your parts to suppliers by process: casting, forging, CNC machining, fabrication', 'Making sure an NDA is in place before drawings are shared', 'Checking certifications, capacity and export history', 'Keeping sample approval and specification sign-off explicit', 'Introducing both sides under a short agreement'],
  first: { buy: ['Part types, materials and processes', 'Annual volumes and batch sizes', 'Quality standards and inspection requirements'], sell: ['Processes, machines and capacity', 'Quality certifications and inspection capability', 'Export markets and references'] },
  related: goodsRelated
});

sectorPage({
  slug: 'specialty-chemicals', name: 'Specialty Chemicals',
  title: 'Specialty Chemicals: sourcing from Indian manufacturers',
  description: 'Specialty chemicals from vetted Indian manufacturers: intermediates, additives, dyes, pigments and performance chemicals. What buyers usually need (specifications, COAs, SDS, regulatory documentation) and how introductions work.',
  h1: 'Specialty chemicals, <em>with the paperwork.</em>',
  lede: 'Intermediates, additives, dyes, pigments and performance chemicals: buyers need consistent batches and complete regulatory documentation for their market, from suppliers who can show both.',
  needs: ['Specifications and a certificate of analysis for each batch', 'Safety data sheets and correct labelling', 'Regulatory documentation for the destination market (for example REACH in the EU or TSCA in the US)', 'Batch-to-batch consistency and change notification', 'Packaging and dangerous-goods handling suited to the product'],
  help: ['Introducing manufacturers with the registrations and documents your market requires', 'Asking for COAs, SDS and samples at the start', 'Checking capacity, quality systems and export history', 'Matching volumes and packaging needs', 'Introducing both sides under a short agreement (regulatory advice stays with your specialists)'],
  first: { buy: ['Product, grade and specification', 'Volumes, packaging and destination', 'Regulatory documents you need'], sell: ['Product portfolio and capacity', 'Certifications, registrations and documentation', 'Export markets and references'] },
  related: goodsRelated
});

// ------------------------------------------------------------------ How It Works
export const FAQ = [
  { q: 'Who pays the fee?', a: 'It is agreed in writing before any introduction. Typically it is the Indian business that wins the work: a referral fee for agencies, a commission for manufacturers and exporters. Where an overseas buyer asks me to run a specific search, any fee is agreed with them upfront. Either way, there is no retainer: fees are agreed per deal, paid only on a closed deal.' },
  { q: 'When is the fee payable?', a: 'Only when a deal closes. For IT and software, that means a signed project that the client has paid for (usually in line with the client’s payments). For goods, it means an order that has shipped and been paid for. The exact trigger is written into the agreement.' },
  { q: 'What is excluded?', a: 'Existing customers: clients or buyers you already work with, or were already talking to, are excluded, and we list them at the start. I also don’t provide legal, tax, customs, logistics or investment advice, I don’t arrange securities or investment transactions, and I don’t hold client funds or goods.' },
  { q: 'How long does it take?', a: 'It depends on the sector and how specific the brief is. I reply personally to every enquiry. Putting together a vetted shortlist usually takes a few weeks, and longer for specialised briefs. After the introduction, timing is in the hands of the parties: software projects often start with a discovery or pilot phase, while goods usually involve samples, documents and trial orders, which can take months.' },
  { q: 'Do you guarantee a deal or an outcome?', a: 'No. I make considered introductions; whether a deal happens, and on what terms, is between the parties. There is no guarantee of orders, delivery, quality, payment or any other commercial outcome.' },
  { q: 'Do I still need to do my own due diligence?', a: 'Yes. Vetting narrows the field; it is not an audit, a certification or a warranty. Both sides should carry out their own commercial, legal and financial checks and, for goods, use samples and inspections before signing.' },
  { q: 'What should I share in my first message?', a: 'Enough to judge fit: what you need or offer, rough volumes or scope, markets and timelines. Keep confidential detail until an agreement is in place.' }
];
add({
  path: '/how-it-works',
  title: 'How It Works: from brief to introduction in four steps',
  description: 'How cross-border introductions work: tell us your need or capacity, shortlist and vet, introduction under a signed agreement, fees agreed per deal and paid only on a closed deal. Confidentiality, non-circumvention and FAQ.',
  crumbs: [{ name: 'How It Works', path: '/how-it-works' }],
  faq: FAQ,
  body: `${hero({
    eyebrow: 'How it works',
    h1: 'Four steps, <em>from brief to deal.</em>',
    lede: 'Simple by design. Nothing is shared with the other side until you are comfortable and an agreement is signed.',
    ctas: false
  })}
      <section class="section shell" aria-label="The four steps" style="padding-top:20px">
        ${stepsHtml(true)}
        <p class="note"><strong>Fees:</strong> no retainer. Fees are agreed per deal, paid only on a closed deal, and written into a short agreement before any introduction. See <a class="inline-link" href="/indian-businesses/partner-terms">partner terms</a> and the <a class="inline-link" href="#faq">FAQ</a>.</p>
      </section>
      <section class="section shell" aria-labelledby="protect">
        ${sectionHead('Protections', 'Both sides')}
        <h2 class="section-title" id="protect">Confidentiality and <em>non-circumvention.</em></h2>
        <div class="grid-2">
          ${listCard('Confidentiality', ['Your details are shared only with your consent, and only with the party being introduced', 'Names are exchanged after the agreement is signed', 'Keep commercially sensitive detail out of your first message; we can cover it once an agreement is in place', `Enquiries are stored privately and used only to respond (see the <a class="inline-link" href="${MAIN_SITE}/privacy">privacy notice</a>)`])}
          ${listCard('Non-circumvention', ['Introduced parties agree not to bypass the agreement to avoid the fee', 'It applies to the introduced party, for the period set out in the agreement', 'Existing relationships are listed upfront and excluded', 'It protects the fee, not the decision: you can always say no to a deal'])}
        </div>
      </section>
      <section class="section shell" aria-labelledby="faq-title" id="faq">
        ${sectionHead('FAQ', String(FAQ.length).padStart(2, '0'))}
        <h2 class="section-title" id="faq-title">Plain answers, <em>upfront.</em></h2>
        <div class="faq">
          ${FAQ.map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('\n          ')}
        </div>
      </section>`
});

// ------------------------------------------------------------------ About
add({
  path: '/about',
  title: 'About Pratik Bajoria: Chartered Accountant, ex-Big 4, founder',
  description: 'About Pratik Bajoria: Chartered Accountant, ex-Big 4, founder of Findost and AI implementation consultant, making selective cross-border introductions between India and the world.',
  crumbs: [{ name: 'About', path: '/about' }],
  body: `${hero({
    eyebrow: 'About',
    h1: 'Chartered Accountant. <em>Ex-Big 4. Founder.</em>',
    lede: 'I’m Pratik Bajoria. I make a small number of carefully vetted cross-border introductions between Indian businesses and overseas clients, buyers and partners.',
    ctas: false
  })}
      <section class="section shell" aria-labelledby="bio" style="padding-top:10px">
        <div class="prose">
          <h2 id="bio">Short bio</h2>
          <p>I’m a Chartered Accountant with over nine years of post-qualification experience across audit, financial analysis, taxation and business process transformation. Part of that career was spent at a Big 4 firm; the rest across industry roles and, latterly, building my own ventures.</p>
          <p>Today my main work is advising companies on AI implementation, alongside building <strong>Findost</strong>, my AI-powered wealth management platform. Cross-border introductions are a focused addition to that work: the same diligence lens, applied to a different problem.</p>
          <h2>Why India and the world</h2>
          <p>India has deep benches of software talent and manufacturing capability, and trade agreements are lowering barriers with major markets: the UK–India agreement came into force in July 2026 and an EU–India agreement is moving towards signature (sources on the <a href="/insights">Insights</a> page). Yet good partners on both sides still struggle to find and trust each other.</p>
          <p>Buyers abroad worry about delivery, quality and paperwork. Strong Indian businesses often lack the networks to reach serious buyers. A careful introducer who checks both sides, documents the terms and is paid only on outcome can close that gap.</p>
          <h2>How I work</h2>
          <p>I take on introductions only where I can understand both sides properly. Every introduction is made under a short written agreement, fees are agreed per deal, and I never ask for a retainer.</p>
          <h2>AI consulting</h2>
          <p>If you’re also thinking about AI in your business, that is my main practice. Find out more at <a href="${MAIN_SITE}/">pratikbajoria.com</a>.</p>
        </div>
        <div class="cta-row">
          <a class="button button-dark" href="${MAIN_SITE}/">AI implementation consulting <span>↗</span></a>
          <a class="button button-cream" href="${LINKEDIN}" target="_blank" rel="noopener noreferrer">LinkedIn <span>↗</span></a>
        </div>
      </section>`
});

// ------------------------------------------------------------------ Contact
add({
  path: '/contact',
  title: 'Contact: start a cross-border conversation',
  description: 'Contact Pratik Bajoria about a cross-border introduction: find a partner or supplier in India, or win international clients and buyers. Enquiry forms and WhatsApp.',
  crumbs: [{ name: 'Contact', path: '/contact' }],
  noCta: true,
  body: `${hero({
    eyebrow: 'Contact · I reply personally',
    h1: 'Tell me what <em>you’re looking for.</em>',
    lede: 'Pick the form that fits. A few lines is enough; keep confidential details until an agreement is in place. Prefer chat? Message me on WhatsApp.',
    ctas: false,
    extra: `<div class="cta-row">${waButton(`WhatsApp ${WHATSAPP_DISPLAY}`, WA_HELLO)}${CONTACT_EMAIL ? `<a class="button button-cream" href="mailto:${esc(CONTACT_EMAIL)}?subject=${encodeURIComponent('Cross-border enquiry')}">${esc(CONTACT_EMAIL)} <span>↗</span></a>` : ''}</div>`
  })}
      <section class="section shell" aria-label="Enquiry forms" style="padding-top:10px">
        <div class="forms">
          ${formHtml({ id: 'buyer', interest: 'cross-border-buyer', title: 'I’m looking for a partner or supplier', intro: 'For overseas companies that want to hire an Indian tech team or source products from India.', detailsLabel: 'What do you need?', placeholder: 'Product or service, specification, volumes or scope, target markets and timelines.' })}
          ${formHtml({ id: 'seller', interest: 'cross-border-seller', title: 'I want international clients or buyers', intro: 'For Indian software agencies, manufacturers and exporters looking for qualified overseas business.', detailsLabel: 'What do you offer?', placeholder: 'What you make or build, capacity, certifications, current and target markets.' })}
        </div>
        <noscript><p class="note">JavaScript is off, so the forms can’t send. Please message me on <a class="inline-link" href="${wa(WA_HELLO)}">WhatsApp ${esc(WHATSAPP_DISPLAY)}</a>${CONTACT_EMAIL ? ` or email <a class="inline-link" href="mailto:${esc(CONTACT_EMAIL)}">${esc(CONTACT_EMAIL)}</a>` : ''} instead.</p></noscript>
        <div class="direct"><span>Or directly:</span><a class="inline-link" href="${wa(WA_HELLO)}" target="_blank" rel="noopener noreferrer">WhatsApp ${esc(WHATSAPP_DISPLAY)}</a>${CONTACT_EMAIL ? `<a class="inline-link" href="mailto:${esc(CONTACT_EMAIL)}">${esc(CONTACT_EMAIL)}</a>` : ''}<a class="inline-link" href="/how-it-works#faq">Read the FAQ first</a></div>
      </section>`
});

// ------------------------------------------------------------------ Insights (only if there is sourced content)
function insightsPage() {
  const checked = new Date(`${BUILD_DATE}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const items = INSIGHTS.map((it) => `<article class="insight" id="${it.id}">
          <div class="date">${it.dateLabel}</div>
          <div>
            <h3>${it.title}</h3>
            ${it.body}
            <p class="sources"><strong>Sources</strong>${it.sources.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a>`).join(' ')}</p>
          </div>
        </article>`).join('\n        ');
  const fairs = FAIRS.length ? `<article class="insight" id="trade-fairs">
          <div class="date">Oct 2026 – Mar 2027</div>
          <div>
            <h3>Trade-fair calendar, October 2026 to March 2027</h3>
            <p>Fairs relevant to the five sectors, with dates as published by each organiser (checked on ${checked}). Dates can change, so confirm with the organiser before booking travel. Listing a fair does not mean I am attending it.</p>
            <table class="fair-table">
              <thead><tr><th>Dates</th><th>Fair</th><th>Where</th><th>Relevant to</th><th>Source</th></tr></thead>
              <tbody>
                ${FAIRS.map((f) => `<tr><td>${f.dates}</td><td>${f.name}</td><td>${f.where}</td><td>${f.sector}</td><td><a href="${esc(f.url)}" target="_blank" rel="noopener noreferrer">${esc(f.sourceLabel)}</a></td></tr>`).join('\n                ')}
              </tbody>
            </table>
          </div>
        </article>` : '';
  return {
    path: '/insights',
    title: 'Insights: India trade notes and trade-fair calendar',
    description: 'Short, sourced trade notes for India cross-border deals: the UK–India trade agreement in force since 15 July 2026, the planned EU–India agreement, and a trade-fair calendar for October 2026 to March 2027.',
    crumbs: [{ name: 'Insights', path: '/insights' }],
    body: `${hero({
      eyebrow: 'Insights · Sourced trade notes',
      h1: 'Trade notes, <em>with sources.</em>',
      lede: 'Short notes on developments that matter for India’s cross-border trade. Every item links to its source. Nothing here is legal, tax or customs advice.',
      ctas: false
    })}
      <section class="section shell" aria-label="Trade notes" style="padding-top:10px">
        ${items}
        ${fairs}
      </section>`
  };
}

// ------------------------------------------------------------------ 404
export const notFoundPage = {
  path: '/404',
  title: 'Page not found',
  description: 'This page could not be found on Cross-border Deals & Partnerships by Pratik Bajoria.',
  noindex: true,
  body: hero({
    eyebrow: '404 · Page not found',
    h1: 'That page <em>isn’t here.</em>',
    lede: 'The link may be out of date or mistyped. Try one of these instead.',
    ctas: false,
    extra: '<div class="cta-row"><a class="button button-dark" href="/">Cross-border home <span>↗</span></a><a class="button button-cream" href="/how-it-works">How it works <span>↗</span></a><a class="button button-cream" href="/contact">Contact <span>↗</span></a></div>'
  })
};

export function buildPages({ includeInsights }) {
  const out = [...pages];
  if (includeInsights) {
    const at = out.findIndex((p) => p.path === '/about');
    out.splice(at, 0, insightsPage());
  }
  return out;
}
