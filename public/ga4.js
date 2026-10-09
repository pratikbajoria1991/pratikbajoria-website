/* Google Analytics 4 — Measurement ID G-CXQP7F8CRT (pratikbajoria.com and crossborder.pratikbajoria.com)
   gtag() calls are queued in dataLayer immediately; the 180 KB gtag.js library is fetched only after the hero
   has painted (first LCP candidate), on first interaction, or after 3.5 s, whichever comes first, so it never
   competes with LCP.

   Conversion events (no personal data: no names, emails, phone numbers or form text are ever sent):
     book_call_click     click on a discovery-call CTA (#contact / /#contact, "Book a call", crossborder /contact or #enquire)
     generate_lead       successful POST /api/discovery from the main site (HTTP 201), or the scorecard unlock (/api/subscribe on /scorecard)
     newsletter_signup   successful POST /api/subscribe (HTTP 201) outside /scorecard
     email_click         click on a mailto: link to hello@pratikbajoria.com
     whatsapp_click      click on api.whatsapp.com / wa.me links
     affiliate_click     outbound click to a vendor domain listed in /affiliate-links.json (AFFILIATE_DOMAINS below)
     crossborder_enquiry successful cross-border enquiry form POST /api/discovery (HTTP 201) on crossborder.pratikbajoria.com
   Every event carries page_path, site_section (main | crossborder) and, for clicks, link_text / cta_label / link_domain.
   Honeypot (bot) submissions get HTTP 200, not 201, so they never count.
   Same-origin navigations made before gtag.js has loaded are parked in sessionStorage and replayed on the next page;
   same-tab outbound clicks wait (max 800 ms) for the hit to be sent. */
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
(function () {
  var GA_ID = 'G-CXQP7F8CRT';
  var XB_HOST = 'crossborder.pratikbajoria.com';
  // Keep in sync with public/affiliate-links.json (checked by scripts/test-ga4-events.mjs).
  var AFFILIATE_DOMAINS = ['hubspot.com', 'semrush.com', 'getresponse.com', 'upmetrics.co', 'synder.com', 'notion.so', 'writesonic.com', 'databox.com'];
  var PENDING_KEY = 'pb_ga4_pending';
  var host = location.hostname.toLowerCase();
  var section = host === XB_HOST ? 'crossborder' : 'main';

  gtag('js', new Date());
  gtag('config', GA_ID, { content_group: section });

  var started = false;
  function load() {
    if (started) return;
    started = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }
  // gtag.js replaces dataLayer.push once it has booted.
  function libReady() { return !!window.dataLayer && window.dataLayer.push !== Array.prototype.push; }

  function clip(v, n) { return String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, n || 100); }
  function base(params) {
    var p = { page_path: location.pathname, site_section: section };
    for (var k in params) if (Object.prototype.hasOwnProperty.call(params, k) && params[k] !== '' && params[k] != null) p[k] = params[k];
    return p;
  }
  function send(name, params, cb) {
    var p = base(params || {});
    if (cb) { p.event_callback = cb; p.event_timeout = 800; }
    gtag('event', name, p);
  }

  // Replay events parked by the previous page (clicked before gtag.js had loaded).
  try {
    var parked = JSON.parse(sessionStorage.getItem(PENDING_KEY) || '[]');
    sessionStorage.removeItem(PENDING_KEY);
    for (var i = 0; i < parked.length && i < 10; i++) if (parked[i] && parked[i].n) gtag('event', parked[i].n, parked[i].p);
  } catch (e) { /* storage blocked */ }
  function park(name, params) {
    try {
      var id = String(Date.now()) + Math.random();
      var q = JSON.parse(sessionStorage.getItem(PENDING_KEY) || '[]');
      q.push({ id: id, n: name, p: base(params) });
      sessionStorage.setItem(PENDING_KEY, JSON.stringify(q.slice(-10)));
      // Navigation cancelled (e.g. a script handled the click)? Send it here instead of on the next page.
      setTimeout(function () {
        try {
          var rest = JSON.parse(sessionStorage.getItem(PENDING_KEY) || '[]');
          var mine = rest.filter(function (x) { return x.id === id; });
          if (!mine.length) return;
          sessionStorage.setItem(PENDING_KEY, JSON.stringify(rest.filter(function (x) { return x.id !== id; })));
          gtag('event', mine[0].n, mine[0].p);
        } catch (e) { /* ignore */ }
      }, 2000);
      return true;
    } catch (e) { return false; }
  }

  function isAffiliate(h) {
    h = h.replace(/^www\./, '');
    for (var i = 0; i < AFFILIATE_DOMAINS.length; i++) {
      var d = AFFILIATE_DOMAINS[i];
      if (h === d || h.slice(-(d.length + 1)) === '.' + d) return true;
    }
    return false;
  }
  var BOOK_TEXT = /\b(book (a |your )?(discovery )?call|discovery call|book a call|schedule a call)\b/i;
  function classify(a) {
    var raw = a.getAttribute('href') || '';
    if (/^mailto:/i.test(raw)) {
      return /hello@pratikbajoria\.com/i.test(raw) ? { name: 'email_click', params: { link_domain: 'pratikbajoria.com' } } : null;
    }
    var u;
    try { u = new URL(a.href, location.href); } catch (e) { return null; }
    var h = u.hostname.toLowerCase();
    if (h === 'api.whatsapp.com' || h === 'wa.me' || h === 'web.whatsapp.com') return { name: 'whatsapp_click', params: { link_domain: h } };
    var sameSite = h === host;
    if (!sameSite && /^https?:$/.test(u.protocol) && isAffiliate(h)) return { name: 'affiliate_click', params: { link_domain: h.replace(/^www\./, ''), link_url: (u.origin + u.pathname).slice(0, 200) } };
    if (sameSite || h === 'pratikbajoria.com') {
      var text = a.textContent || '';
      if (section === 'crossborder') {
        if (h === XB_HOST && (u.pathname === '/contact' || u.hash === '#enquire')) return { name: 'book_call_click', params: { link_url: u.pathname + u.hash } };
      } else if (u.hash === '#contact' && (u.pathname === '/' || u.pathname === location.pathname)) {
        return { name: 'book_call_click', params: { link_url: u.pathname + u.hash } };
      } else if (BOOK_TEXT.test(text)) {
        return { name: 'book_call_click', params: { link_url: u.pathname + u.hash } };
      }
    }
    return null;
  }

  document.addEventListener('click', function (ev) {
    var t = ev.target;
    var a = t && t.closest ? t.closest('a[href]') : null;
    if (!a) return;
    var hit;
    try { hit = classify(a); } catch (e) { hit = null; }
    if (!hit) return;
    load();
    hit.params.link_text = clip(a.getAttribute('aria-label') || a.textContent, 100);
    var region = a.closest('header,nav,footer,aside,main');
    hit.params.cta_label = clip(a.getAttribute('data-cta') || ((region ? region.tagName.toLowerCase() : 'page') + (/\bbutton\b|cta/.test(a.className) ? '_button' : '_link')), 60);
    if (libReady()) { send(hit.name, hit.params); return; }

    // gtag.js not booted yet: make sure the hit survives the navigation.
    var target = (a.getAttribute('target') || '').toLowerCase();
    var newTab = target === '_blank' || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button === 1;
    var u; try { u = new URL(a.href, location.href); } catch (e) { u = null; }
    var leavesPage = u && /^https?:$/.test(u.protocol) && !newTab && !ev.defaultPrevented &&
      !(u.origin === location.origin && u.pathname === location.pathname && u.hash);
    if (!leavesPage) { send(hit.name, hit.params); return; }
    if (u.origin === location.origin && park(hit.name, hit.params)) return; // replayed on the next page
    ev.preventDefault();
    var done = false;
    var go = function () { if (!done) { done = true; location.href = a.href; } };
    send(hit.name, hit.params, go);
    setTimeout(go, 900);
  }, true);

  // Form conversions: observe the site's own fetch() calls to /api/discovery and /api/subscribe.
  // Only HTTP 201 (row stored in D1) counts; honeypot and validation failures return 200/4xx.
  if (window.fetch) {
    var origFetch = window.fetch;
    window.fetch = function (input, init) {
      var p = origFetch.apply(this, arguments);
      try {
        var url = typeof input === 'string' ? input : (input && input.url) || '';
        var path = new URL(url, location.href).pathname;
        var method = ((init && init.method) || (input && input.method) || 'GET').toUpperCase();
        if (method === 'POST' && (path === '/api/discovery' || path === '/api/subscribe')) {
          var interest = '';
          try { interest = String(JSON.parse(init && init.body || '{}').interest || ''); } catch (e) { /* not JSON */ }
          p.then(function (res) {
            if (!res || res.status !== 201) return;
            load();
            if (path === '/api/subscribe') {
              if (/^\/scorecard/.test(location.pathname)) send('generate_lead', { form_type: 'scorecard' });
              else send('newsletter_signup', { form_type: 'newsletter' });
            } else if (section === 'crossborder' || /^cross-border-/.test(interest)) {
              send('crossborder_enquiry', { form_type: 'crossborder', lead_type: interest.replace(/^cross-border-/, '') || 'general' });
            } else {
              send('generate_lead', { form_type: /^\/workshops/.test(location.pathname) ? 'workshop' : (/^\/audit/.test(location.pathname) ? 'audit' : 'discovery') });
            }
          }, function () {});
        }
      } catch (e) { /* never break the site's own request */ }
      return p;
    };
  }

  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (e) {
    window.addEventListener(e, load, { once: true, passive: true });
  });
  setTimeout(load, 3500);
  try {
    new PerformanceObserver(function (list, obs) {
      if (list.getEntries().length) { obs.disconnect(); setTimeout(load, 400); }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (err) { /* old browsers: timer/interaction fallback above */ }
})();
