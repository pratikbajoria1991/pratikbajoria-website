const fallbackPosts = [
  { title: 'Why 70% of Corporate AI Pilots Never Reach Production', slug: 'corporate-ai-pilots', date: '2026-02-18', category: 'AI adoption', readTime: 8, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85', excerpt: 'The failure is almost never technical. It is scoping, ownership and change management — and there is a repeatable pattern to avoiding all three.' },
  { title: "The Finance Function is AI's Highest-ROI Starting Point", slug: 'finance-highest-roi', date: '2026-02-10', category: 'Finance & compliance', readTime: 6, image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=85', excerpt: 'Structured data, repetitive judgement, measurable output. A CA’s view on why reconciliation and close automation beat chatbots every time.' },
  { title: 'Build vs. Buy: A Decision Framework for AI Tooling', slug: 'build-vs-buy-ai-tooling', date: '2026-01-28', category: 'AI strategy', readTime: 7, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85', excerpt: 'When to license a vendor, when to build in-house, and the hidden switching costs most leadership teams discover far too late.' }
];

const esc = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const formatDate = (value) => new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));

function storyCard(post) {
  const target = post.url && post.url !== '#' ? post.url : `#${esc(post.slug || '')}`;
  return `<article class="story-card"><a href="${target}" aria-label="Read ${esc(post.title)}"><div class="story-image"><img loading="lazy" src="${esc(post.image)}" alt="" /></div><div class="story-meta"><span>${esc(post.category || 'AI implementation')}</span><span>${formatDate(post.date)} · ${esc(post.readTime || 6)} min</span></div><h3 class="story-title">${esc(post.title)}</h3><p class="story-excerpt">${esc(post.excerpt || '')}</p></a></article>`;
}

async function loadPosts() {
  try {
    const response = await fetch('/blog-posts.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Posts unavailable');
    const posts = await response.json();
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

function addChatMessage(type, text) {
  const message = document.createElement('div');
  message.className = `chat-msg ${type}`;
  message.textContent = text;
  const messages = document.querySelector('#chat-messages');
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

function openModal(id) { document.querySelector(`#${id}`).hidden = false; document.body.style.overflow = 'hidden'; }
function closeModal(modal) { modal.hidden = true; document.body.style.overflow = ''; }

document.addEventListener('DOMContentLoaded', async () => {
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const grid = document.querySelector('#featured-grid');
  if (grid) grid.innerHTML = (await loadPosts()).map(storyCard).join('');

  document.querySelectorAll('[data-open-booking]').forEach((button) => button.addEventListener('click', () => openModal('booking-modal')));
  document.querySelectorAll('[data-open-generator]').forEach((button) => button.addEventListener('click', () => openModal('generator-modal')));
  document.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', () => closeModal(button.closest('.modal-backdrop'))));
  document.querySelectorAll('.modal-backdrop').forEach((modal) => modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(modal); }));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') document.querySelectorAll('.modal-backdrop:not([hidden])').forEach(closeModal); });

  const chatPanel = document.querySelector('#chat-panel');
  document.querySelector('[data-toggle-chat]')?.addEventListener('click', () => { chatPanel.hidden = !chatPanel.hidden; if (!chatPanel.hidden) document.querySelector('#chat-input').focus(); });
  const sendChat = () => { const input = document.querySelector('#chat-input'); const question = input.value.trim(); if (!question) return; addChatMessage('user', question); input.value = ''; window.setTimeout(() => addChatMessage('bot', answerFor(question)), 280); };
  document.querySelector('[data-send-chat]')?.addEventListener('click', sendChat);
  document.querySelector('#chat-input')?.addEventListener('keydown', (event) => { if (event.key === 'Enter') sendChat(); });

  document.querySelector('#subscribe-form')?.addEventListener('submit', (event) => { event.preventDefault(); const status = document.querySelector('#form-status'); status.textContent = 'You’re on the list — welcome to the AI Implementation Brief.'; status.classList.add('success'); event.target.reset(); });

  document.querySelector('#booking-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const subject = encodeURIComponent(`Discovery call request from ${data.get('name')}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')}\nPhone: ${data.get('phone') || '—'}\nChallenge: ${data.get('challenge')}`);
    document.querySelector('#booking-email').href = `mailto:hello@pratikbajoria.in?subject=${subject}&body=${body}`;
    document.querySelector('#booking-whatsapp').href = `https://api.whatsapp.com/send?phone=919804182483&text=${encodeURIComponent(`Hi Pratik, I’m ${data.get('name')} from ${data.get('company')}. ${data.get('challenge')}`)}`;
    document.querySelector('#booking-form-view').hidden = true;
    document.querySelector('#booking-success').hidden = false;
  });

  document.querySelector('#generator-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const topic = new FormData(event.target).get('topic') || 'How to scope your first AI project';
    document.querySelector('#generator-output-title').textContent = topic;
    document.querySelector('#generator-form-view').hidden = true;
    document.querySelector('#generator-output').hidden = false;
  });
});

