// Shared header, footer, <head> and helpers for the cross-border site.
import { CONTACT_EMAIL, ORIGIN, MAIN_SITE, WHATSAPP_NUMBER, WHATSAPP_DISPLAY, LINKEDIN, BRAND, BRAND_SHORT } from './config.mjs';

export const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const stripTags = (s) => String(s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
export const abs = (path) => `${ORIGIN}${path === '/' ? '/' : path}`;
export const wa = (text) => `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&amp;text=${encodeURIComponent(text)}`;

const WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.82 11.82 0 0 0 12.1 0C5.55 0 .22 5.33.22 11.89c0 2.1.55 4.14 1.59 5.95L.12 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9a11.82 11.82 0 0 0-3.48-8.42ZM12.11 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.22-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.27c0-5.45 4.44-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.43 9.9-9.88 9.9Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>';
export const waButton = (label = 'WhatsApp', text = 'Hi Pratik, I’d like to discuss a cross-border introduction.', cls = 'button button-whatsapp') =>
  `<a class="${cls}" href="${wa(text)}" target="_blank" rel="noopener noreferrer">${WA_ICON}${esc(label)} <span>↗</span></a>`;

const CHEVRON = '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';

export function buildNav(includeInsights) {
  return [
    { label: 'Home', href: '/' },
    { label: 'For Overseas Buyers', href: '/buyers', id: 'buyers', overview: 'Overview for overseas buyers', children: [
      { label: 'Hire Indian Tech Teams', href: '/buyers/hire-indian-tech-teams', blurb: 'Vetted Indian software agencies for web, mobile, AI and regulated builds' },
      { label: 'Source from India', href: '/buyers/source-from-india', blurb: 'Vetted manufacturers and exporters, samples, documents, direct pricing' },
      { label: 'How We Vet Partners', href: '/buyers/how-we-vet-partners', blurb: 'Track record, reviews, certifications, export history, references' }
    ] },
    { label: 'For Indian Businesses', href: '/indian-businesses', id: 'indian', overview: 'Overview for Indian businesses', children: [
      { label: 'IT & Software Agencies', href: '/indian-businesses/it-software-agencies', blurb: 'Qualified US, UK and Middle East clients; fee on signed, paid projects' },
      { label: 'Manufacturers & Exporters', href: '/indian-businesses/manufacturers-exporters', blurb: 'Qualified importers and distributors; commission on shipped, paid orders' },
      { label: 'Partner Terms', href: '/indian-businesses/partner-terms', blurb: 'Success fee only, no retainer, a short agreement first' }
    ] },
    { label: 'Sectors', href: '/sectors', id: 'sectors', overview: 'All sectors', children: [
      { label: 'Software & AI Development', href: '/sectors/software-ai-development', blurb: 'Web, mobile, AI and data engineering' },
      { label: 'Spices & Agri-food', href: '/sectors/spices-agri-food', blurb: 'Whole and ground spices, processed and organic foods' },
      { label: 'Home Textiles', href: '/sectors/home-textiles', blurb: 'Bed, bath, kitchen and furnishing textiles' },
      { label: 'Engineering Components', href: '/sectors/engineering-components', blurb: 'Castings, forgings, machined and fabricated parts' },
      { label: 'Specialty Chemicals', href: '/sectors/specialty-chemicals', blurb: 'Intermediates, additives and performance chemicals' }
    ] },
    { label: 'How It Works', href: '/how-it-works' },
    ...(includeInsights ? [{ label: 'Insights', href: '/insights' }] : []),
    { label: 'About', href: '/about' }
  ];
}

function header(nav, current) {
  const isIn = (item) => item.href === current || (item.children || []).some((c) => c.href === current);
  const li = nav.map((item) => {
    const cur = isIn(item) ? ' is-current' : '';
    if (!item.children) {
      return `<li class="xb-nav-item${cur}"><a class="xb-nav-link" href="${item.href}"${item.href === current ? ' aria-current="page"' : ''}>${esc(item.label)}</a></li>`;
    }
    const links = [
      `<a class="dd-overview" href="${item.href}"${item.href === current ? ' aria-current="page"' : ''}>${esc(item.overview)} →</a>`,
      ...item.children.map((c) => `<a href="${c.href}"${c.href === current ? ' aria-current="page"' : ''}><strong>${esc(c.label)}</strong><small>${esc(c.blurb)}</small></a>`)
    ].join('');
    return `<li class="xb-nav-item has-dd${cur}"><button class="dd-toggle" type="button" aria-expanded="false" aria-controls="dd-${item.id}">${esc(item.label)}${CHEVRON}</button><div class="dd" id="dd-${item.id}">${links}</div></li>`;
  }).join('\n          ');
  return `<a class="skip" href="#main">Skip to content</a>
    <header class="xb-header">
      <div class="xb-header-inner">
        <a class="xb-brand" href="/" aria-label="${esc(BRAND)}: home"><span class="xb-mark" aria-hidden="true">PB</span><span class="xb-brand-text"><strong>Cross-border Deals &amp; Partnerships</strong><small>by Pratik Bajoria</small></span></a>
        <button class="xb-burger" type="button" aria-expanded="false" aria-controls="xb-nav"><i aria-hidden="true"></i>Menu</button>
        <nav class="xb-nav" id="xb-nav" aria-label="Primary">
          <ul class="xb-nav-list">
          ${li}
          </ul>
          <a class="xb-nav-cta" href="/contact"${current === '/contact' ? ' aria-current="page"' : ''}>Contact <span>↗</span></a>
        </nav>
      </div>
    </header>`;
}

export function ctaBand() {
  return `<section class="cta-band" aria-labelledby="cta-title">
      <div class="shell">
        <span class="eyebrow">Start a conversation · Success fee only</span>
        <h2 id="cta-title">A few lines is <em>enough to start.</em></h2>
        <p>Tell me what you need or what you can supply. I reply personally, and nothing is shared with anyone else until you are comfortable and an agreement is in place.</p>
        <div class="cta-row">
          <a class="button button-dark" href="/contact#buyer">I’m looking for a partner or supplier <span>↗</span></a>
          <a class="button button-cream" href="/contact#seller">I want international clients or buyers <span>↗</span></a>
          ${waButton('WhatsApp')}
        </div>
      </div>
    </section>`;
}

function footer(nav) {
  const emailLink = CONTACT_EMAIL ? `<a href="mailto:${esc(CONTACT_EMAIL)}">${esc(CONTACT_EMAIL)}</a>` : '';
  return `<footer class="xb-footer shell">
      <div class="xb-footer-top">
        <a class="xb-brand" href="/" aria-label="${esc(BRAND)}: home"><span class="xb-mark" aria-hidden="true">PB</span><span class="xb-brand-text"><strong>Cross-border Deals &amp; Partnerships</strong><small>by Pratik Bajoria</small></span></a>
        <nav aria-label="Footer">
          <a href="/how-it-works">How it works</a>
          <a href="/indian-businesses/partner-terms">Partner terms</a>
          <a href="/sectors">Sectors</a>
          ${nav.some((n) => n.href === '/insights') ? '<a href="/insights">Insights</a>' : ''}
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="${MAIN_SITE}/privacy">Privacy</a>
          <a href="${MAIN_SITE}/">AI consulting ↗</a>
        </nav>
      </div>
      <p class="fine">© <span data-year>2026</span> Pratik Bajoria · <a href="${wa('Hi Pratik, I’d like to discuss a cross-border introduction.')}" target="_blank" rel="noopener noreferrer">WhatsApp ${esc(WHATSAPP_DISPLAY)}</a>${emailLink ? ` · ${emailLink}` : ''} · <a href="${LINKEDIN}" target="_blank" rel="noopener noreferrer">LinkedIn</a><br />Introductions only, on a success-fee basis agreed in writing. Not a broker-dealer, investment adviser, legal adviser, customs agent or freight forwarder; no client funds or goods are handled. Pratik’s main practice is <a href="${MAIN_SITE}/">AI implementation consulting</a>.</p>
    </footer>`;
}

const PERSON = {
  '@type': 'Person',
  '@id': `${MAIN_SITE}/#person`,
  name: 'Pratik Bajoria',
  url: `${MAIN_SITE}/`,
  jobTitle: 'Chartered Accountant and AI implementation consultant',
  sameAs: [LINKEDIN]
};

export function orgNode() {
  const node = {
    '@type': 'ProfessionalService',
    '@id': `${ORIGIN}/#organization`,
    name: BRAND,
    url: `${ORIGIN}/`,
    description: 'Success-fee-only cross-border introductions between India and the world: overseas buyers to vetted Indian software agencies, manufacturers and exporters; Indian businesses to qualified international clients and buyers.',
    founder: { '@id': `${MAIN_SITE}/#person` },
    telephone: `+${WHATSAPP_NUMBER}`,
    areaServed: ['India', 'United States', 'United Kingdom', 'European Union', 'Middle East', 'South-East Asia'],
    serviceType: ['Cross-border business introductions', 'IT and software partnerships', 'Export sourcing introductions'],
    image: `${ORIGIN}/og.png`,
    sameAs: [`${MAIN_SITE}/`]
  };
  if (CONTACT_EMAIL) node.email = CONTACT_EMAIL;
  return node;
}

export function renderPage(page, nav) {
  const canonical = abs(page.path);
  const fullTitle = page.path === '/' ? page.title : `${page.title} | ${BRAND_SHORT}`;
  const crumbs = page.crumbs || [];
  const graph = [
    orgNode(),
    PERSON,
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: fullTitle,
      description: page.description,
      inLanguage: 'en-GB',
      isPartOf: { '@type': 'WebSite', '@id': `${ORIGIN}/#website`, name: BRAND, url: `${ORIGIN}/`, publisher: { '@id': `${ORIGIN}/#organization` } },
      about: { '@id': `${ORIGIN}/#organization` },
      author: { '@id': `${MAIN_SITE}/#person` }
    }
  ];
  if (crumbs.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) }))
    });
  }
  if (page.faq && page.faq.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      mainEntity: page.faq.map((f) => ({ '@type': 'Question', name: stripTags(f.q), acceptedAnswer: { '@type': 'Answer', text: stripTags(f.a) } }))
    });
  }
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).replace(/</g, '\\u003c');
  const crumbHtml = crumbs.length
    ? `<nav class="crumbs shell" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li>${crumbs.map((c, i) => i === crumbs.length - 1 ? `<li aria-current="page">${esc(c.name)}</li>` : `<li><a href="${c.path}">${esc(c.name)}</a></li>`).join('')}</ol></nav>`
    : '';
  const robots = page.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1';
  const emailAttr = CONTACT_EMAIL ? ` data-contact-email="${esc(CONTACT_EMAIL)}"` : '';
  return `<!doctype html>
<html lang="en-GB" data-whatsapp="${WHATSAPP_NUMBER}"${emailAttr}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#f4f0e8" />
    <meta name="robots" content="${robots}" />
    <meta name="author" content="Pratik Bajoria" />
    <title>${esc(fullTitle)}</title>
    <meta name="description" content="${esc(page.description)}" />
    ${page.noindex ? '' : `<link rel="canonical" href="${canonical}" />\n    `}<meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(BRAND)}" />
    <meta property="og:title" content="${esc(page.ogTitle || fullTitle)}" />
    <meta property="og:description" content="${esc(page.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ORIGIN}/og.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_GB" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(page.ogTitle || fullTitle)}" />
    <meta name="twitter:description" content="${esc(page.description)}" />
    <meta name="twitter:image" content="${ORIGIN}/og.png" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&amp;family=Instrument+Serif:ital@0;1&amp;family=Manrope:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/assets/xb.css?v=20261003" />
    <script type="application/ld+json">
${ld}
    </script>
    <script src="/ga4.js" defer></script>
  </head>
  <body data-page="${esc(page.path)}">
    ${header(nav, page.path)}
    ${crumbHtml}
    <main id="main">
${page.body}
    </main>
    ${page.noCta ? '' : ctaBand()}
    ${footer(nav)}
    <script src="/assets/xb.js?v=20261003" defer></script>
  </body>
</html>
`;
}
