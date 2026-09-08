const fallbackPosts = [
  { title: 'Why 70% of Corporate AI Pilots Never Reach Production', slug: 'corporate-ai-pilots', date: '2026-02-18', category: 'AI adoption', readTime: 8, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85', excerpt: 'The failure is almost never technical. It is scoping, ownership and change management — and there is a repeatable pattern to avoiding all three.' },
  { title: "The Finance Function is AI's Highest-ROI Starting Point", slug: 'finance-highest-roi', date: '2026-02-10', category: 'Finance & compliance', readTime: 6, image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=85', excerpt: 'Structured data, repetitive judgement, measurable output. A CA’s view on why reconciliation and close automation beat chatbots every time.' },
  { title: 'Build vs. Buy: A Decision Framework for AI Tooling', slug: 'build-vs-buy-ai-tooling', date: '2026-01-28', category: 'AI strategy', readTime: 7, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85', excerpt: 'When to license a vendor, when to build in-house, and the hidden switching costs most leadership teams discover far too late.' }
];

const esc = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const formatDate = (value) => new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));

function storyCard(post) {
  const target = post.url && post.url !== '#' ? post.url : `/blog?slug=${encodeURIComponent(post.slug || '')}`;
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

const voiceTopics = {
  services: 'Pratik ki six service lines hain: AI Opportunity Audit, workflow automation, finance aur compliance AI, team enablement, fractional AI leadership, aur AI product advisory. Usually pehla step audit hota hai, taaki recommendation actual business process aur ROI par based ho.',
  process: 'Engagement chaar stages mein hota hai: pehle Diagnose — workflow aur leakage samajhna; phir Prioritise — impact, effort aur risk score karna; uske baad Build — highest-value system ko real users ke saath ship karna; aur finally Embed — training, documentation aur handover. Goal pilot banana nahi, usable system ko production mein lana hai.',
  pricing: 'Pricing scope par depend karti hai. AI Opportunity Audit fixed-fee, two-week sprint hota hai. Build project ka estimate audit ke baad aata hai, workshops per session priced hote hain, aur fractional AI leadership monthly retainer par hoti hai. Discovery call par Pratik realistic range share karenge.',
  sectors: 'Strong fit generally finance-heavy aur process-led businesses hote hain: financial services, accounting, manufacturing, retail aur e-commerce, healthcare, real estate, legal-compliance, aur SaaS-tech. Aapka sector bata dein, main use-case ko more specific bana dungi.',
  findost: 'Findost, findost.io par Pratik ka AI-powered wealth-management platform hai. Ismein portfolio intelligence, personalised planning, conversational advisory aur goal-based tracking hai. Yahan AI patterns ko live product mein test kiya jaata hai.',
  contact: 'Aap website par Book a Discovery Call form fill kar sakte hain, WhatsApp par message kar sakte hain, LinkedIn par connect kar sakte hain, ya hello@pratikbajoria.com par email bhej sakte hain. Pratik generally one business day mein reply karte hain.',
  background: 'Pratik Bajoria Chartered Accountant hain, with 9+ years post-qualification experience across audit, financial analysis, taxation aur business-process transformation. Career ka ek part Big-4 firm mein tha; aaj woh AI implementation aur Findost build kar rahe hain.',
  greeting: 'Namaste! Main Disha hoon — Pratik ki assistant. Aap mujhse AI implementation, services, pricing, sectors, Findost ya discovery call ke baare mein Hinglish mein baat kar sakte hain. Aapka primary business challenge kya hai?',
  thanks: 'Bilkul, khushi hui help karke. Agar aap apna process ya bottleneck share karein, main next practical step suggest kar dungi.',
  fallback: 'Haan, samajh gayi. Main services, AI implementation process, pricing, sectors, Pratik ka background, Findost ya contact options par help kar sakti hoon. Aapka exact business question ya current bottleneck kya hai?'
};

function intentFor(question) {
  const normalized = question.toLowerCase();
  if (/^(hi|hello|hey|namaste|good morning|good evening)\b/.test(normalized)) return 'greeting';
  if (/thank|thanks|great|helpful|shukriya/.test(normalized)) return 'thanks';
  if (/service|offer|consult|capabilit|what do you do/.test(normalized)) return 'services';
  if (/process|how do you work|engagement|timeline|steps|start|roadmap/.test(normalized)) return 'process';
  if (/price|pricing|cost|fee|budget|quote|how much/.test(normalized)) return 'pricing';
  if (/sector|industry|financial|accounting|manufactur|retail|ecommerce|healthcare|real estate|legal|saas|startup/.test(normalized)) return 'sectors';
  if (/findost|wealth|portfolio|investment/.test(normalized)) return 'findost';
  if (/contact|reach|email|call|whatsapp|linkedin|book|connect|talk/.test(normalized)) return 'contact';
  if (/background|experience|chartered|big 4|about|who is pratik/.test(normalized)) return 'background';
  return null;
}

function answerFor(question, conversation) {
  const intent = intentFor(question) || (conversation.lastIntent && /^(and|also|what about|how about|more)/i.test(question.trim()) ? conversation.lastIntent : null);
  let answer = voiceTopics[intent] || voiceTopics.fallback;
  const normalized = question.toLowerCase();
  if (intent === 'services' && /finance|compliance|accounting|gst|tds/.test(normalized)) answer = 'Finance aur compliance AI mein reconciliation, month-end close, GST/TDS workflows, MIS reporting aur audit-ready controls cover hote hain. Aapka current process Excel-heavy hai ya multiple systems mein data split hai?';
  if (intent === 'services' && /automation|workflow|agent|copilot|whatsapp/.test(normalized)) answer = 'Workflow automation ka focus production use-case par hota hai: document processing, WhatsApp/email workflows, CRM-ERP-finance integration aur internal copilots. Pehle ek measurable bottleneck choose karte hain — aapke business mein sabse repetitive process kaunsa hai?';
  if (intent === 'process' && conversation.lastIntent === 'services') answer = 'Agar service choose karni ho, best sequence usually Audit → Prioritise → Build → Embed hota hai. Isse team ko clear ROI, ownership aur adoption plan milta hai. Aap implementation abhi explore kar rahe hain ya koi specific workflow already identify hai?';
  if (intent === 'contact' && /book|call|meeting/.test(normalized)) answer = 'Discovery call focused 30-minute conversation hoti hai. Aap process, bottleneck aur timeline batayenge; Pratik top AI opportunities aur realistic effort-cost discuss karenge. Form kholne ke liye Book a Discovery Call button use kijiye, ya WhatsApp par direct message bhejiye.';
  conversation.lastIntent = intent || conversation.lastIntent;
  return answer;
}

function setupVoiceAgent() {
  const panel = document.querySelector('#voice-panel');
  const toggle = document.querySelector('[data-toggle-voice]');
  const close = document.querySelector('[data-close-voice]');
  const listen = document.querySelector('[data-voice-listen]');
  const fallback = document.querySelector('[data-voice-fallback]');
  const textInput = document.querySelector('[data-voice-text]');
  const textSend = document.querySelector('[data-voice-send]');
  const status = document.querySelector('#voice-status');
  const transcript = document.querySelector('#voice-transcript');
  const response = document.querySelector('#voice-response');
  if (!panel || !toggle || !listen || !status || !transcript || !response) return;

  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const canSpeak = typeof window.speechSynthesis !== 'undefined' && typeof window.SpeechSynthesisUtterance !== 'undefined';
  let recognition = null;
  let listening = false;
  const conversation = { lastIntent: 'greeting', turns: [] };
  const voiceUnavailable = !Recognition || !canSpeak;
  // Keep the typed conversation available even on devices that expose the
  // speech APIs but have no usable microphone or audio output.
  if (fallback) fallback.hidden = false;
  if (voiceUnavailable) {
    listen.setAttribute('aria-disabled', 'true');
    listen.title = 'Live voice is not available in this browser';
  }

  const showTextFallback = (message) => {
    if (fallback) fallback.hidden = false;
    if (message) status.textContent = message;
  };

  const setPanel = (open) => {
    panel.hidden = !open;
    if (!open && listening && recognition) recognition.stop();
    if (!open && canSpeak) window.speechSynthesis.cancel();
    if (open && voiceUnavailable) status.textContent = 'Is browser mein live voice available nahi hai. Neeche type karke Disha se Hinglish mein chat kijiye, ya Chrome/Edge ki normal tab mein microphone allow karke Talk to Disha use kijiye.';
  };

  const setListening = (active) => {
    listening = active;
    panel.classList.toggle('is-listening', active);
    listen.classList.toggle('is-listening', active);
    listen.querySelector('span').textContent = active ? 'Listening…' : 'Talk to Disha';
    if (active) status.textContent = 'Main sun rahi hoon — apna sawaal naturally boliye, phir pause kijiye.';
  };

  const speak = (text) => {
    if (!canSpeak) return false;
    const say = () => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find((entry) => /^hi-IN$/i.test(entry.lang)) || voices.find((entry) => /^en-IN$/i.test(entry.lang));
      if (voice) { utterance.voice = voice; utterance.lang = voice.lang; } else utterance.lang = 'en-IN';
      utterance.rate = 0.92;
      utterance.pitch = 1.02;
      utterance.onstart = () => { status.textContent = 'Disha bol rahi hai…'; };
      utterance.onend = () => { if (!listening) status.textContent = 'Jawab ready hai — follow-up ke liye phir Talk to Disha press kijiye.'; };
      utterance.onerror = () => { showTextFallback('Audio output start nahi ho paaya. Neeche type karke Disha se chat kijiye.'); };
      window.speechSynthesis.speak(utterance);
    };
    if (window.speechSynthesis.getVoices().length) say();
    else window.speechSynthesis.addEventListener('voiceschanged', say, { once: true });
    return true;
  };

  const answer = (question) => {
    const text = answerFor(question, conversation);
    conversation.turns.push({ question, answer: text });
    transcript.textContent = `Aapne poocha: ${question}`;
    response.textContent = text;
    status.textContent = 'Jawab ready hai — follow-up ke liye phir Talk to Disha press kijiye.';
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
      const message = event.error === 'not-allowed' || event.error === 'service-not-allowed' ? 'Microphone permission blocked hai. Browser settings mein pratikbajoria.com ke liye allow karke phir try kijiye.' : event.error === 'audio-capture' ? 'Microphone detect nahi hua. Device mic check karke phir try kijiye.' : event.error === 'no-speech' ? 'Mujhe awaaz nahi mili. Thoda clearly bolkar dobara try kijiye.' : event.error === 'network' ? 'Voice service temporarily unavailable hai. Neeche type karke Disha se chat kijiye.' : 'Main clearly sun nahi paayi. Thoda slowly dobara boliye.';
      showTextFallback(message);
    };
    recognition.onend = () => setListening(false);
  }

  toggle.addEventListener('click', () => setPanel(panel.hidden));
  close?.addEventListener('click', () => setPanel(false));
  listen.addEventListener('click', () => {
    if (!recognition) {
      showTextFallback('Is browser mein microphone voice input available nahi hai. Neeche type karke Disha se chat kijiye.');
      textInput?.focus();
      return;
    }
    if (listening) recognition.stop();
    else {
      transcript.textContent = 'Main sun rahi hoon…';
      response.textContent = 'Aapke sawaal ka conversational jawab yahan dikhega.';
      try { recognition.start(); } catch { status.textContent = 'The microphone is already starting. Please try again in a moment.'; }
    }
  });

  const sendTextQuestion = () => {
    const question = textInput?.value.trim();
    if (!question) return;
    textInput.value = '';
    answer(question);
  };
  textSend?.addEventListener('click', sendTextQuestion);
  textInput?.addEventListener('keydown', (event) => { if (event.key === 'Enter') sendTextQuestion(); });
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
      status.textContent = 'We couldn’t save that automatically. Please email hello@pratikbajoria.com to subscribe.';
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
    document.querySelector('#booking-email').href = `mailto:hello@pratikbajoria.com?subject=${subject}&body=${body}`;
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

