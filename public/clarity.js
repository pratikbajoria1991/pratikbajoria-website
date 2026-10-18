/* Microsoft Clarity — project yzjw4fzkbe (pratikbajoria.com and crossborder.pratikbajoria.com)
   Same loading rules as ga4.js: the clarity() queue exists immediately, but the Clarity tag
   (https://www.clarity.ms/tag/yzjw4fzkbe) is fetched only after the hero has painted (first LCP
   candidate), on first interaction, or after 3.5 s, whichever comes first, so it never competes with LCP.
   Automation/bot browsers (navigator.webdriver, or a headless/bot UA) never load Clarity and send nothing. */
(function () {
  var skip;
  try {
    skip = navigator.webdriver === true ||
      /HeadlessChrome|bot|crawl|spider|Lighthouse|PhantomJS|Puppeteer|Playwright/i.test(navigator.userAgent || '');
  } catch (e) { skip = false; }
  if (skip) return;
  var CLARITY_ID = 'yzjw4fzkbe';
  window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
  try { window.clarity('set', 'site_section', location.hostname.toLowerCase() === 'crossborder.pratikbajoria.com' ? 'crossborder' : 'main'); } catch (e) { /* ignore */ }

  var started = false;
  function load() {
    if (started) return;
    started = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.clarity.ms/tag/' + CLARITY_ID;
    document.head.appendChild(s);
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
