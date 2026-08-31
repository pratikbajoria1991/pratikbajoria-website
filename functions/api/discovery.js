const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store'
};

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });

function text(value, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ ok: false, error: 'Lead storage is not configured.' }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'Invalid request.' }, 400); }
  if (text(body.website, 80)) return json({ ok: true });

  const name = text(body.name, 120);
  const email = text(body.email, 254).toLowerCase();
  const company = text(body.company, 160);
  const phone = text(body.phone, 60);
  const challenge = text(body.challenge, 3000);
  const pageUrl = text(body.pageUrl, 500);
  const referrer = text(body.referrer, 500);
  const consent = body.consent === true;
  if (!name || !company || !challenge || !isEmail(email) || !consent) return json({ ok: false, error: 'Please complete the required fields and consent.' }, 422);

  const now = new Date().toISOString();
  await env.DB.prepare(`INSERT INTO leads (id, kind, created_at, consent_at, name, email, company, phone, challenge, source, page_url, referrer) VALUES (?, 'discovery', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(crypto.randomUUID(), now, now, name, email, company, phone || null, challenge, 'website', pageUrl || null, referrer || null).run();
  return json({ ok: true, message: 'Your discovery request has been received.' }, 201);
}

export async function onRequestOptions() { return new Response(null, { status: 204, headers: JSON_HEADERS }); }
