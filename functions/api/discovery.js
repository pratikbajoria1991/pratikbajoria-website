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
  if (!name || !company || !challenge || !isEmail(email) || !consent) return json({ ok: false, error: 'Please complete the required fields and consent.' }, 422);

  const interests = new Set(['cross-border-buyer', 'cross-border-seller']);
  const interest = interests.has(text(body.interest, 40)) ? text(body.interest, 40) : '';
  const metadata = interest ? JSON.stringify({ interest, country: text(body.country, 80) || null, lane: text(body.lane, 80) || null }) : null;
  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  await env.DB.prepare(`INSERT INTO leads (id, kind, created_at, consent_at, name, email, company, phone, challenge, source, page_url, referrer, metadata, landing_page, utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid) VALUES (?, 'discovery', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(id, now, now, name, email, company, phone || null, challenge, interest || 'website', pageUrl || null, referrer || null, metadata, attr.landing_page || null, attr.utm_source || null, attr.utm_medium || null, attr.utm_campaign || null, attr.utm_term || null, attr.utm_content || null, attr.gclid || null, attr.fbclid || null).run();
  await mirrorToSheets(env, {
    id, type: 'discovery', receivedAt: now, consentAt: now, name, email, company, phone, enquiry: challenge,
    source: interest || 'website', pageUrl, referrer, ...attr, metadata
  });
  return json({ ok: true, message: 'Your discovery request has been received.' }, 201);
}

export async function onRequestOptions() { return new Response(null, { status: 204, headers: JSON_HEADERS }); }
