// Cross-border site (crossborder.pratikbajoria.com) — build-time settings.
// After changing anything here, rebuild:  node scripts/crossborder/build.mjs
//
// CONTACT_EMAIL: leave as null while hello@pratikbajoria.com does not receive mail.
// Set it to 'hello@pratikbajoria.com' to show the address on the Contact page, in the
// footer, in the form success state and in the JSON-LD (one switch, everywhere).
export const CONTACT_EMAIL = 'hello@pratikbajoria.com';

// GOOGLE_SITE_VERIFICATION: Search Console HTML-tag verification for the URL-prefix property
// https://crossborder.pratikbajoria.com/. Paste only the content="..." token from the tag GSC shows
// (e.g. 'AbC123...'), rebuild, push to main, then click Verify in GSC. Leave the tag in place afterwards.
// null = no tag emitted.
export const GOOGLE_SITE_VERIFICATION = null;

export const ORIGIN = 'https://crossborder.pratikbajoria.com';
export const MAIN_SITE = 'https://pratikbajoria.com';
export const WHATSAPP_NUMBER = '919804182483';
export const WHATSAPP_DISPLAY = '+91 98041 82483';
export const LINKEDIN = 'https://www.linkedin.com/in/pratik-bajoria-6288b1119/';
// Pratik's live public profiles: Person.sameAs in the JSON-LD (same list as the main site).
export const PERSON_SAME_AS = [
  'https://www.linkedin.com/in/pratik-bajoria-6288b1119/',
  'https://medium.com/@pratikbajoria1991',
  'https://dev.to/pratik_bajoria_b0f8fa8367',
  'https://github.com/pratikbajoria1991',
  'https://www.indiehackers.com/pratikbajoria',
  'https://wellfound.com/u/pratik-bajoria',
  'https://hashnode.com/@pratikbajoria',
  'https://www.crunchbase.com/person/pratik-bajoria',
  'https://www.f6s.com/pratik-bajoria',
  'https://contra.com/pratik_bajoria_bvmul54o',
];
export const BRAND = 'Cross-border Deals & Partnerships by Pratik Bajoria';
export const BRAND_SHORT = 'Cross-border by Pratik Bajoria';
// Date stamped into <lastmod> and the Insights "checked on" note.
export const BUILD_DATE = '2026-10-08';

// Audience landing pages (the two main entry points). The old /buyers and
// /indian-businesses overview URLs 301 here (see XB_REDIRECTS in public/_worker.js).
export const BUYER_PATH = '/find-a-partner-in-india';
export const SELLER_PATH = '/win-clients-abroad';
