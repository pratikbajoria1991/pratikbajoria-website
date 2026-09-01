const fallbackPosts = [
  { title: 'Why 70% of Corporate AI Pilots Never Reach Production', slug: 'corporate-ai-pilots', date: '2026-02-18', category: 'AI adoption', readTime: 8, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85', excerpt: 'The failure is almost never technical. It is scoping, ownership and change management — and there is a repeatable pattern to avoiding all three.' },
  { title: "The Finance Function is AI's Highest-ROI Starting Point", slug: 'finance-highest-roi', date: '2026-02-10', category: 'Finance & compliance', readTime: 6, image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=85', excerpt: 'Structured data, repetitive judgement, measurable output. A CA’s view on why reconciliation and close automation beat chatbots every time.' },
  { title: 'Build vs. Buy: A Decision Framework for AI Tooling', slug: 'build-vs-buy-ai-tooling', date: '2026-01-28', category: 'AI strategy', readTime: 7, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85', excerpt: 'When to license a vendor, when to build in-house, and the hidden switching costs most leadership teams discover far too late.' }
];

const esc = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const formatDate = (value) => new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));

function storyCard(post) {
  const target = post.url && post.url !== '#' ? post.url : `/blog.html?slug=${encodeURIComponent(post.slug || '')}`;
  return `<article class="story-card"><a href="${target}" aria-label="Read ${esc(post.title)}"><div class="story-image"><img loading="lazy" src="${esc(post.image)}" alt="" /></div><div class="story-meta"><span>${esc(post.category || 'AI implementation')}</span><span>${formatDate(post.date)} · ${esc(post.readTime || 6)} min</span></div><h3 class="story-title">${esc(post.title)}</h3><p class="story-excerpt">${esc(post.excerpt || '')}</p></a></article>`;
}

async function loadPosts() {
  try {
    const [response, editorialResponse] = await Promise.all([
      fetch('/blog-posts.json', { cache: 'no-store' }),
      fetch('/affiliate-articles.json', { cache: 'no-store' })
    ]);
    if (!response.ok || !editorialResponse.ok) throw new Error('Posts unavailable');
    const posts = [...await editorialResponse.json(), ...await response.json()];
    return Array.isArray(posts) && posts.length ? posts.slice(0, 3) : fallbackPosts;
  } catch {
    return fallbackPosts;
  }
}

const faq = [
  { terms: ['service', 'offer', 'what do you do', 'consult'], answer: 'Pratik offers six service lines: AI Opportunity Audit, Workflow Automation, Finance & Compliance AI, Team Enablement, Fractional AI Leadership, and AI Product Advisory. Most engagements start with the audit.' },
  { terms: ['process', 'how do you work', 'engagement', 'timeline', 'steps'], answer: 'The engagement runs through four stages: Diagnose, Prioritise, Build and Embed. We map workflows, score use cases on impact and risk, ship the highest-value system, then train and hand it over.' },
  { terms: ['price', 'pricing', 'cost', 'fee', 'budget'], answer: 'The AI Opportunity Audit is a fixed-fee two-week sprint. Build projects are scoped after the audit, workshops are priced per session, and fractional leadership runs on a monthly retainer.' },
  { terms: ['sector', 'industry', 'financial', 'accounting', 'manufacturing', 'retail', 'healthcare', 'real estate', 'legal', 'saas'], answer: 'Pratik works across financial services, accounting and professional services, manufacturing and distribution, retail and e-commerce, healthcare, real estate, legal and compliance, and SaaS and technology.' },
  { terms: ['findost', 'wealth', 'portfolio', 'investment'], answer: 'Findost is Pratik’s AI-powered wealth management platform at findost.io, with portfolio intelligence, personalised planning, conversational advisory and goal-based tracking.' },
  { terms: ['contact', 'reach', 'email', 'call', 'whatsapp', 'linkedin', 'book'], answer: 'Use the booking form on this page, message Pratik on WhatsApp, connect on LinkedIn, or email hello@pratikbajoria.in. He aims to reply within one business day.' },
  { terms: ['background', 'experience', 'chartered', 'big 4', 'about'], answer: 'Pratik is a Chartered Accountant with over nine years of post-qualification experience across audit, financial analysis, taxation and business process transformation, including time at a Big-4 firm.' }
];

function answerFor(question) {
  const normalized = question.toLowerCase();
  const match = faq.find((entry) => entry.terms.some((term) => normalized.includes(term)));
  return match ? match.answer : 'I can help with services, the engagement process, pricing, sectors, Pratik’s background, Findost, or how to get in touch.';
}

function setupVoiceAgent() {
  const panel = document.querySelector('#voice-panel');
  const toggle = document.querySelector('[data-toggle-voice]');
  const close = document.querySelector('[data-close-voice]');
  const listen = document.querySelector('[data-voice-listen]');
  const status = document.querySelector('#voice-status');
  const transcript = document.querySelector('#voice-transcript');
  const response = document.querySelector('#voice-response');
  if (!panel || !toggle || !listen || !status || !transcript || !response) return;

  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const canSpeak = 'speechSynthesis' in window;
  let recognition = null;
  let listening = false;

  const setPanel = (open) => {
    panel.hidden = !open;
    if (!open && listening && recognition) recognition.stop();
    if (!open && canSpeak) window.speechSynthesis.cancel();
    if (open && !Recognition) status.textContent = 'Voice input is not available in this browser. Please use Chrome or Edge, or contact Pratik on WhatsApp.';
  };

  const setListening = (active) => {
    listening = active;
    panel.classList.toggle('is-listening', active);
    listen.classList.toggle('is-listening', active);
    listen.querySelector('span').textContent = active ? 'Listening…' : 'Start listening';
    if (active) status.textContent = 'Listening — ask one clear question, then pause.';
  };

  const speak = (text) => {
    if (!canSpeak) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 0.96;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const answer = (question) => {
    const text = answerFor(question);
    transcript.textContent = `You asked: ${question}`;
    response.textContent = text;
    status.textContent = 'Answer ready — tap the microphone to ask another question.';
    speak(text);
  };

  if (Recognition) {
    recognition = new Recognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setListening(true);
    recognition.onresult = (event) => {
      let finalText = '';
      let interimText = '';
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const text = event.results[index][0].transcript;
        if (event.results[index].isFinal) finalText += text;
        else interimText += text;
      }
      transcript.textContent = interimText ? `Hearing: ${interimText}` : transcript.textContent;
      if (finalText.trim()) answer(finalText.trim());
    };
    recognition.onerror = (event) => {
      setListening(false);
      const message = event.error === 'not-allowed' ? 'Microphone access was blocked. Allow microphone access in your browser settings and try again.' : 'I could not hear that clearly. Please try again.';
      status.textContent = message;
    };
    recognition.onend = () => setListening(false);
  }

  toggle.addEventListener('click', () => setPanel(panel.hidden));
  close?.addEventListener('click', () => setPanel(false));
  listen.addEventListener('click', () => {
    if (!recognition) return;
    if (listening) recognition.stop();
    else {
      transcript.textContent = 'Listening for your question…';
      response.textContent = 'Your answer will appear here.';
      try { recognition.start(); } catch { status.textContent = 'The microphone is already starting. Please try again in a moment.'; }
    }
  });
}

function openModal(id) { document.querySelector(`#${id}`).hidden = false; document.body.style.overflow = 'hidden'; }
function closeModal(modal) { modal.hidden = true; document.body.style.overflow = ''; }

function addPrivacyControls(form, label) {
  if (!form) return;
  if (!form.querySelector('[name="website"]')) {
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';
    honeypot.setAttribute('aria-hidden', 'true');
    honeypot.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0';
    form.appendChild(honeypot);
  }
  if (!form.querySelector('[name="consent"]')) {
    const consent = document.createElement('label');
    consent.className = 'consent-row';
    consent.innerHTML = `<input type="checkbox" name="consent" required /> <span>${label} I agree to the <a href="/privacy.html" target="_blank" rel="noopener">privacy notice</a>.</span>`;
    form.appendChild(consent);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  // Bind voice controls before any awaited content load so the floating agent
  // is interactive even if the featured-post request is slow or unavailable.
  setupVoiceAgent();

  const grid = document.querySelector('#featured-grid');
  if (grid) grid.innerHTML = (await loadPosts()).map(storyCard).join('');

  const bookingForm = document.querySelector('#booking-form');
  const subscribeForm = document.querySelector('#subscribe-form');
  addPrivacyControls(bookingForm, 'I agree that Pratik may use these details to respond to my discovery-call request.');
  addPrivacyControls(subscribeForm, 'I agree to receive the AI Implementation Brief by email.');

  document.querySelectorAll('[data-open-booking]').forEach((button) => button.addEventListener('click', () => openModal('booking-modal')));
  document.querySelectorAll('[data-open-generator]').forEach((button) => button.addEventListener('click', () => openModal('generator-modal')));
  document.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', () => closeModal(button.closest('.modal-backdrop'))));
  document.querySelectorAll('.modal-backdrop').forEach((modal) => modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(modal); }));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') document.querySelectorAll('.modal-backdrop:not([hidden])').forEach(closeModal); });

  subscribeForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const status = document.querySelector('#form-status');
    const button = form.querySelector('button[type="submit"]');
    const data = new FormData(form);
    button.disabled = true;
    button.textContent = 'Saving…';
    status.classList.remove('success', 'error');
    try {
      const response = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: data.get('email'), consent: data.get('consent') === 'on', website: data.get('website'), pageUrl: window.location.href, referrer: document.referrer || 'direct' }) });
      if (!response.ok) throw new Error('Unable to save subscriber');
      status.textContent = 'You’re on the list — welcome to the AI Implementation Brief.';
      status.classList.add('success');
      form.reset();
    } catch {
      status.textContent = 'We couldn’t save that automatically. Please email hello@pratikbajoria.in to subscribe.';
      status.classList.add('error');
    } finally {
      button.disabled = false;
      button.innerHTML = 'Subscribe <span>↗</span>';
    }
  });

  bookingForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Saving request…';
    let saved = false;
    try {
      const response = await fetch('/api/discovery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: data.get('name'), email: data.get('email'), company: data.get('company'), phone: data.get('phone'), challenge: data.get('challenge'), consent: data.get('consent') === 'on', website: data.get('website'), pageUrl: window.location.href, referrer: document.referrer || 'direct' }) });
      saved = response.ok;
    } catch { saved = false; }
    const subject = encodeURIComponent(`Discovery call request from ${data.get('name')}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')}\nPhone: ${data.get('phone') || '—'}\nChallenge: ${data.get('challenge')}`);
    document.querySelector('#booking-email').href = `mailto:hello@pratikbajoria.in?subject=${subject}&body=${body}`;
    document.querySelector('#booking-whatsapp').href = `https://api.whatsapp.com/send?phone=919804182483&text=${encodeURIComponent(`Hi Pratik, I’m ${data.get('name')} from ${data.get('company')}. ${data.get('challenge')}`)}`;
    document.querySelector('#booking-success p').textContent = saved ? 'Your request has been securely recorded. I’ll come back within one business day with a couple of time slots.' : 'The request could not be saved automatically. Please use email or WhatsApp below so I receive your details.';
    document.querySelector('#booking-form-view').hidden = true;
    document.querySelector('#booking-success').hidden = false;
    submitButton.disabled = false;
  });

  document.querySelector('#generator-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const topic = new FormData(event.target).get('topic') || 'How to scope your first AI project';
    document.querySelector('#generator-output-title').textContent = topic;
    document.querySelector('#generator-form-view').hidden = true;
    document.querySelector('#generator-output').hidden = false;
  });
});

