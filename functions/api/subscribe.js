const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store'
};

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
const text = (value, max = 500) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ ok: false, error: 'Subscriber storage is not configured.' }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'Invalid request.' }, 400); }
  if (text(body.website, 80)) return json({ ok: true });

  const email = text(body.email, 254).toLowerCase();
  const pageUrl = text(body.pageUrl, 500);
  const referrer = text(body.referrer, 500);
  const consent = body.consent === true;
  if (!isEmail(email) || !consent) return json({ ok: false, error: 'Please provide a valid email address and consent.' }, 422);

  const now = new Date().toISOString();
  await env.DB.prepare(`INSERT INTO leads (id, kind, created_at, consent_at, email, source, page_url, referrer) VALUES (?, 'newsletter', ?, ?, ?, ?, ?, ?)`)
    .bind(crypto.randomUUID(), now, now, email, 'newsletter', pageUrl || null, referrer || null).run();
  return json({ ok: true, message: 'You are on the list.' }, 201);
}

export async function onRequestOptions() { return new Response(null, { status: 204, headers: JSON_HEADERS }); }
