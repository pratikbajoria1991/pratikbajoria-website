const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' };
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers });
const text = (value, max = 500) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

async function handleDiscovery(request, env) {
  if (!env.DB) return json({ ok: false, error: 'Lead storage is not configured.' }, 503);
  let body; try { body = await request.json(); } catch { return json({ ok: false, error: 'Invalid request.' }, 400); }
  if (text(body.website, 80)) return json({ ok: true });
  const name = text(body.name, 120), email = text(body.email, 254).toLowerCase(), company = text(body.company, 160), phone = text(body.phone, 60), challenge = text(body.challenge, 3000), pageUrl = text(body.pageUrl, 500), referrer = text(body.referrer, 500);
  if (!name || !company || !challenge || !isEmail(email) || body.consent !== true) return json({ ok: false, error: 'Please complete the required fields and consent.' }, 422);
  const now = new Date().toISOString();
  await env.DB.prepare(`INSERT INTO leads (id, kind, created_at, consent_at, name, email, company, phone, challenge, source, page_url, referrer) VALUES (?, 'discovery', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(crypto.randomUUID(), now, now, name, email, company, phone || null, challenge, 'website', pageUrl || null, referrer || null).run();
  return json({ ok: true, message: 'Your discovery request has been received.' }, 201);
}

async function handleSubscribe(request, env) {
  if (!env.DB) return json({ ok: false, error: 'Subscriber storage is not configured.' }, 503);
  let body; try { body = await request.json(); } catch { return json({ ok: false, error: 'Invalid request.' }, 400); }
  if (text(body.website, 80)) return json({ ok: true });
  const email = text(body.email, 254).toLowerCase(), pageUrl = text(body.pageUrl, 500), referrer = text(body.referrer, 500);
  if (!isEmail(email) || body.consent !== true) return json({ ok: false, error: 'Please provide a valid email address and consent.' }, 422);
  const now = new Date().toISOString();
  await env.DB.prepare(`INSERT INTO leads (id, kind, created_at, consent_at, email, source, page_url, referrer) VALUES (?, 'newsletter', ?, ?, ?, ?, ?, ?)`)
    .bind(crypto.randomUUID(), now, now, email, 'newsletter', pageUrl || null, referrer || null).run();
  return json({ ok: true, message: 'You are on the list.' }, 201);
}

async function handleLeads(request, env) {
  if (!env.ADMIN_TOKEN || request.headers.get('Authorization') !== `Bearer ${env.ADMIN_TOKEN}`) return json({ ok: false, error: 'Unauthorized.' }, 401);
  if (!env.DB) return json({ ok: false, error: 'Lead storage is not configured.' }, 503);
  const url = new URL(request.url), kind = url.searchParams.get('kind'), limit = Math.min(Math.max(Number(url.searchParams.get('limit') || 100), 1), 1000), filtered = kind === 'discovery' || kind === 'newsletter';
  const query = filtered ? 'SELECT * FROM leads WHERE kind = ? ORDER BY created_at DESC LIMIT ?' : 'SELECT * FROM leads ORDER BY created_at DESC LIMIT ?';
  const result = filtered ? await env.DB.prepare(query).bind(kind, limit).all() : await env.DB.prepare(query).bind(limit).all();
  return json({ ok: true, count: result.results.length, leads: result.results });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS' && url.pathname.startsWith('/api/')) return new Response(null, { status: 204, headers });
    if (request.method === 'POST' && url.pathname === '/api/discovery') return handleDiscovery(request, env);
    if (request.method === 'POST' && url.pathname === '/api/subscribe') return handleSubscribe(request, env);
    if (request.method === 'GET' && url.pathname === '/api/leads') return handleLeads(request, env);
    return env.ASSETS.fetch(request);
  }
};
