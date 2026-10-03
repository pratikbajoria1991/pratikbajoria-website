// Cross-border Deals & Partnerships — navigation + enquiry forms.
// Forms post to the existing /api/discovery endpoint (Cloudflare D1) with
// interest=cross-border-buyer | cross-border-seller. The contact email is only
// shown when <html data-contact-email="…"> is set (see scripts/crossborder/config.mjs).
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const WA = root.dataset.whatsapp || '919804182483';
  const EMAIL = root.dataset.contactEmail || '';
  const desktop = () => window.matchMedia('(min-width: 1201px)').matches;

  // ---- Mobile menu ----
  const burger = document.querySelector('.xb-burger');
  const closeMenu = () => {
    document.body.classList.remove('nav-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  };
  if (burger) {
    burger.addEventListener('click', () => {
      const open = !document.body.classList.contains('nav-open');
      document.body.classList.toggle('nav-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
  }

  // ---- Dropdowns: hover/focus on desktop (CSS), tap/click everywhere (JS) ----
  const items = Array.from(document.querySelectorAll('.xb-nav-item.has-dd'));
  const setOpen = (item, open) => {
    item.classList.toggle('open', open);
    const btn = item.querySelector('.dd-toggle');
    if (btn) btn.setAttribute('aria-expanded', String(open));
  };
  items.forEach((item) => {
    const btn = item.querySelector('.dd-toggle');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const willOpen = !item.classList.contains('open');
      items.forEach((other) => { if (other !== item) setOpen(other, false); });
      item.classList.remove('dd-suppressed');
      setOpen(item, willOpen);
      if (!willOpen && desktop()) item.classList.add('dd-suppressed');
    });
    item.addEventListener('mouseenter', () => { if (desktop()) btn.setAttribute('aria-expanded', 'true'); });
    item.addEventListener('mouseleave', () => {
      item.classList.remove('dd-suppressed');
      if (desktop()) setOpen(item, false);
    });
    item.addEventListener('focusout', (e) => {
      if (!item.contains(e.relatedTarget)) { item.classList.remove('dd-suppressed'); if (desktop()) setOpen(item, false); }
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.xb-nav-item.has-dd')) items.forEach((i) => setOpen(i, false));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const openItem = items.find((i) => i.classList.contains('open') || i.contains(document.activeElement));
    if (openItem) {
      setOpen(openItem, false);
      openItem.classList.add('dd-suppressed');
      const btn = openItem.querySelector('.dd-toggle');
      if (btn) btn.focus();
    } else if (document.body.classList.contains('nav-open')) {
      closeMenu();
      if (burger) burger.focus();
    }
  });

  // ---- Footer year ----
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  // ---- Enquiry forms ----
  const COPY = {
    'cross-border-buyer': {
      subject: 'Cross-border enquiry: looking for a partner or supplier',
      wa: 'Hi Pratik, I’m looking for a partner or supplier in India.'
    },
    'cross-border-seller': {
      subject: 'Cross-border enquiry: seeking international clients or buyers',
      wa: 'Hi Pratik, I’m looking for international clients or buyers.'
    }
  };
  const waHref = (message) => `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(message)}`;
  const mailHref = (subject, body) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

  document.querySelectorAll('form.xb-form').forEach((form) => {
    const interest = form.dataset.interest in COPY ? form.dataset.interest : 'cross-border-buyer';
    const c = COPY[interest];
    const card = form.closest('.form-card');
    const error = form.querySelector('.form-error');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const get = (k) => String(data.get(k) || '').trim();
      error.hidden = true;
      if (!form.checkValidity()) {
        error.textContent = 'Please complete the required fields, use a valid email and tick the consent box.';
        error.hidden = false;
        form.reportValidity();
        return;
      }
      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      button.textContent = 'Sending…';
      const challenge = `[${c.subject}] Country: ${get('country')} · Area: ${get('lane')}\n\n${get('challenge')}`;
      let saved = false;
      try {
        const response = await fetch('/api/discovery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: get('name'), email: get('email'), company: get('company'), phone: get('phone'),
            challenge, interest, country: get('country'), lane: get('lane'),
            consent: data.get('consent') === 'on', website: get('website'),
            pageUrl: window.location.href, referrer: document.referrer || 'direct'
          })
        });
        saved = response.ok;
      } catch { saved = false; }
      if (typeof window.gtag === 'function') {
        try { window.gtag('event', 'generate_lead', { lead_type: interest, saved }); } catch { /* ignore */ }
      }
      const summary = `${c.wa} I’m ${get('name')} from ${get('company')} (${get('country')}). Area: ${get('lane')}. ${get('challenge')}`;
      const success = document.createElement('div');
      success.className = 'form-success';
      success.setAttribute('role', 'status');
      success.innerHTML = `<span class="tick" aria-hidden="true">✓</span><h3>${saved ? 'Thank you.' : 'Almost there.'}</h3><p></p><div class="cta-row"></div>`;
      success.querySelector('p').textContent = saved
        ? 'Your enquiry has been recorded and I’ll reply personally. If you’d like a copy in your own chat, you can also send it on WhatsApp.'
        : 'Your enquiry could not be saved automatically. Please send it on WhatsApp so it reaches me.';
      const row = success.querySelector('.cta-row');
      const wa = document.createElement('a');
      wa.className = 'button button-whatsapp';
      wa.href = waHref(summary);
      wa.target = '_blank';
      wa.rel = 'noopener noreferrer';
      wa.innerHTML = 'Send on WhatsApp <span>↗</span>';
      row.appendChild(wa);
      if (EMAIL) {
        const body = `Name: ${get('name')}\nEmail: ${get('email')}\nCompany: ${get('company')}\nCountry: ${get('country')}\nArea: ${get('lane')}\nPhone: ${get('phone') || '—'}\n\n${get('challenge')}`;
        const mail = document.createElement('a');
        mail.className = 'button button-cream';
        mail.href = mailHref(c.subject, body);
        mail.innerHTML = 'Send by email <span>↗</span>';
        row.appendChild(mail);
      }
      form.hidden = true;
      (card || form.parentNode).appendChild(success);
      button.disabled = false;
      button.innerHTML = 'Send enquiry <span>↗</span>';
    });
  });
})();
