const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' };
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });

export async function onRequestGet({ request, env }) {
  const authorization = request.headers.get('Authorization') || '';
  if (!env.ADMIN_TOKEN || authorization !== `Bearer ${env.ADMIN_TOKEN}`) return json({ ok: false, error: 'Unauthorized.' }, 401);
  if (!env.DB) return json({ ok: false, error: 'Lead storage is not configured.' }, 503);
  const url = new URL(request.url);
  const kind = url.searchParams.get('kind');
  const limit = Math.min(Math.max(Number(url.searchParams.get('limit') || 100), 1), 1000);
  const filtered = kind === 'discovery' || kind === 'newsletter';
  const query = filtered ? 'SELECT * FROM leads WHERE kind = ? ORDER BY created_at DESC LIMIT ?' : 'SELECT * FROM leads ORDER BY created_at DESC LIMIT ?';
  const result = filtered ? await env.DB.prepare(query).bind(kind, limit).all() : await env.DB.prepare(query).bind(limit).all();
  return json({ ok: true, count: result.results.length, leads: result.results });
}
