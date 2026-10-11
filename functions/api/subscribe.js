const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store'
};

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
const text = (value, max = 500) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

async function mirrorToSheets(env, lead) {
  if (!env.SHEETS_WEBHOOK_URL || !env.SHEETS_SYNC_TOKEN) return;
  try {
    await fetch(env.SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: env.SHEETS_SYNC_TOKEN, lead }),
      signal: AbortSignal.timeout(2500)
    });
  } catch { /* D1 is the source of truth; optional reporting must not block lead capture. */ }
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ ok: false, error: 'Subscriber storage is not configured.' }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'Invalid request.' }, 400); }
  if (text(body.website, 80)) return json({ ok: true });

  const email = text(body.email, 254).toLowerCase();
  const pageUrl = text(body.pageUrl, 500);
  const referrer = text(body.referrer, 500);
  const consent = body.consent === true;
  const rawAttribution = body.attribution && typeof body.attribution === 'object' ? body.attribution : {};
  const attr = {
    landing_page: text(rawAttribution.landing_page, 500),
    utm_source: text(rawAttribution.utm_source, 160),
    utm_medium: text(rawAttribution.utm_medium, 160),
    utm_campaign: text(rawAttribution.utm_campaign, 160),
    utm_term: text(rawAttribution.utm_term, 160),
    utm_content: text(rawAttribution.utm_content, 160),
    gclid: text(rawAttribution.gclid, 200),
    fbclid: text(rawAttribution.fbclid, 200)
  };
  if (!isEmail(email) || !consent) return json({ ok: false, error: 'Please provide a valid email address and consent.' }, 422);

  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  await env.DB.prepare(`INSERT INTO leads (id, kind, created_at, consent_at, email, source, page_url, referrer, landing_page, utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid) VALUES (?, 'newsletter', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(id, now, now, email, 'newsletter', pageUrl || null, referrer || null, attr.landing_page || null, attr.utm_source || null, attr.utm_medium || null, attr.utm_campaign || null, attr.utm_term || null, attr.utm_content || null, attr.gclid || null, attr.fbclid || null).run();
  await mirrorToSheets(env, { id, type: 'newsletter', receivedAt: now, consentAt: now, email, source: 'newsletter', pageUrl, referrer, ...attr });
  return json({ ok: true, message: 'You are on the list.' }, 201);
}

export async function onRequestOptions() { return new Response(null, { status: 204, headers: JSON_HEADERS }); }
