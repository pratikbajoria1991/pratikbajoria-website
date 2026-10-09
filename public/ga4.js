/* Google Analytics 4 — Measurement ID G-CXQP7F8CRT (pratikbajoria.com)
   gtag() calls are queued immediately; the 180 KB gtag.js library is fetched only after the hero has painted
   (first LCP candidate), on first interaction, or after 3.5 s, whichever comes first, so it never competes with LCP. */
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-CXQP7F8CRT');
(function () {
  var started = false;
  function load() {
    if (started) return;
    started = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-CXQP7F8CRT';
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
