// Cross-border Deals & Partnerships — enquiry form.
// Posts to the existing /api/discovery lead endpoint (Cloudflare D1) with an
// `interest` field, then always offers prefilled email / WhatsApp as a backup.
(() => {
  const EMAIL = 'hello@pratikbajoria.com';
  const WA = '919804182483';
  const COPY = {
    'cross-border-buyer': {
      subject: 'Cross-border enquiry: looking for a partner or supplier',
      label: 'What do you need? *',
      placeholder: 'Product or service, specification, volumes or scope, target markets and timelines.',
      wa: 'Hi Pratik, I’m looking for a partner or supplier in India.'
    },
    'cross-border-seller': {
      subject: 'Cross-border enquiry: seeking international clients or buyers',
      label: 'What do you offer? *',
      placeholder: 'What you make or build, capacity, certifications, current and target markets.',
      wa: 'Hi Pratik, I’m looking for international clients or buyers.'
    }
  };

  const form = document.querySelector('#xb-form');
  if (!form) return;
  const hidden = form.querySelector('input[name="interest"]');
  const toggles = document.querySelectorAll('.xb-toggle-btn');
  const mailto = document.querySelector('#xb-mailto');
  const waLink = document.querySelector('#xb-whatsapp');
  const label = document.querySelector('#xb-details-label');
  const textarea = form.querySelector('textarea[name="challenge"]');
  const error = document.querySelector('#xb-form-error');

  const mailHref = (subject, body) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
  const waHref = (message) => `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(message)}`;

  function setInterest(value) {
    const key = COPY[value] ? value : 'cross-border-buyer';
    const c = COPY[key];
    hidden.value = key;
    toggles.forEach((t) => t.setAttribute('aria-checked', String(t.dataset.interest === key)));
    if (label) label.textContent = c.label;
    if (textarea) textarea.placeholder = c.placeholder;
    if (mailto) mailto.href = mailHref(c.subject);
    if (waLink) waLink.href = waHref(c.wa);
  }

  toggles.forEach((t) => t.addEventListener('click', () => setInterest(t.dataset.interest)));
  document.querySelectorAll('a[data-interest]').forEach((a) => a.addEventListener('click', () => setInterest(a.dataset.interest)));

  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get('interest');
  setInterest(fromUrl === 'seller' ? 'cross-border-seller' : fromUrl === 'buyer' ? 'cross-border-buyer' : (COPY[fromUrl] ? fromUrl : 'cross-border-buyer'));

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
    const interest = get('interest');
    const c = COPY[interest] || COPY['cross-border-buyer'];
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

    const body = `Name: ${get('name')}\nEmail: ${get('email')}\nCompany: ${get('company')}\nCountry: ${get('country')}\nArea: ${get('lane')}\nPhone: ${get('phone') || '—'}\n\n${get('challenge')}`;
    document.querySelector('#xb-success-email').href = mailHref(c.subject, body);
    document.querySelector('#xb-success-whatsapp').href = waHref(`${c.wa} I’m ${get('name')} from ${get('company')} (${get('country')}). ${get('challenge')}`);
    document.querySelector('#xb-success-text').textContent = saved
      ? 'Your enquiry has been recorded. I’ll reply within one business day. If you’d like a copy in your own inbox or chat, you can also send it by email or WhatsApp below.'
      : 'Your enquiry could not be saved automatically. Please send it by email or WhatsApp below so it reaches me.';
    document.querySelector('#xb-form-view').hidden = true;
    document.querySelector('#xb-success').hidden = false;
    button.disabled = false;
    button.innerHTML = 'Send enquiry <span>↗</span>';
  });
})();
