const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' };
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers });
const text = (value, max = 500) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isBlogSlug = (value) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
const INTERNAL_ASSET_HEADER = 'x-pages-internal-asset';

const GA4_SNIPPET = '<script src="/ga4.js" defer></script>\n';
async function injectGa4(response) {
  const ctype = response.headers.get('content-type') || '';
  if (response.status !== 200 || !ctype.includes('text/html')) return response;
  const text = await response.text();
  if (text.includes('/ga4.js') || text.includes('G-CXQP7F8CRT')) {
    return new Response(text, { status: response.status, statusText: response.statusText, headers: response.headers });
  }
  const out = text.includes('</head>')
    ? text.replace('</head>', `${GA4_SNIPPET}</head>`)
    : `${text}${GA4_SNIPPET}`;
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  return new Response(out, { status: response.status, statusText: response.statusText, headers });
}


const absoluteRedirect = (requestUrl, pathname) => {
  const target = new URL(pathname, requestUrl);
  return new Response(null, {
    status: 301,
    headers: {
      Location: target.toString(),
      'Cache-Control': 'public, max-age=3600'
    }
  });
};


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

async function serveBlogAsset(request, env, slug) {
  // Prefer static SSR HTML via Pages pretty URLs / explicit .html asset.
  if (slug) {
    const direct = await env.ASSETS.fetch(request);
    if (direct.status === 200) {
      const ctype = direct.headers.get('content-type') || '';
      if (ctype.includes('text/html')) return injectGa4(direct);
    }
    const assetHeaders = new Headers(request.headers);
    assetHeaders.set(INTERNAL_ASSET_HEADER, '1');
    const htmlUrl = new URL(request.url);
    htmlUrl.pathname = `/blog/${encodeURIComponent(slug)}.html`;
    htmlUrl.search = '';
    const htmlResp = await env.ASSETS.fetch(new Request(htmlUrl.toString(), {
      method: 'GET',
      headers: assetHeaders,
      redirect: 'manual'
    }));
    if (htmlResp.status === 200) return injectGa4(htmlResp);
  }
  const assetHeaders = new Headers(request.headers);
  assetHeaders.set(INTERNAL_ASSET_HEADER, '1');
  const shellUrl = new URL(request.url);
  shellUrl.pathname = '/blog';
  shellUrl.search = '';
  return injectGa4(await env.ASSETS.fetch(new Request(shellUrl.toString(), {
    method: request.method,
    headers: assetHeaders,
    redirect: 'manual'
  })));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.headers.get(INTERNAL_ASSET_HEADER) === '1') return env.ASSETS.fetch(request);
    if (request.method === 'OPTIONS' && url.pathname.startsWith('/api/')) return new Response(null, { status: 204, headers });
    if (request.method === 'POST' && url.pathname === '/api/discovery') return handleDiscovery(request, env);
    if (request.method === 'POST' && url.pathname === '/api/subscribe') return handleSubscribe(request, env);
    if (request.method === 'GET' && url.pathname === '/api/leads') return handleLeads(request, env);

    if (request.method === 'GET' && (url.pathname === '/blog' || url.pathname === '/blog.html')) {
      const legacySlug = url.searchParams.get('slug')?.trim();
      if (legacySlug && isBlogSlug(legacySlug)) {
        return absoluteRedirect(url, `/blog/${encodeURIComponent(legacySlug)}`);
      }
      // Collapse /blog.html → /blog (single hop; avoids GSC redirect-chain errors)
      if (url.pathname === '/blog.html') {
        return absoluteRedirect(url, '/blog');
      }
      return serveBlogAsset(request, env, null);
    }

    // /blog/{slug} is served as static SSR HTML by Pages assets (no rewrite).


    if (request.method === 'GET' && (url.pathname === '/insights' || url.pathname === '/insights/')) {
      return absoluteRedirect(url, '/blog');
    }

    const blogPathAliases = {
      '/blog/2026-08-31-the-ai-opportunity-audit-a-90-day-roadmap-for-leaders': '/blog/2026-09-14-the-ai-opportunity-audit-a-90-day-roadmap-for-leaders',
      '/blog/2026-09-01-ai-in-real-estate-start-with-lead-qualification-and-documents': '/blog/2026-09-15-ai-in-real-estate-start-with-lead-qualification-and-documents',
      '/blog/2026-09-02-what-good-ai-governance-looks-like-in-a-mid-market-company': '/blog/2026-09-16-what-good-ai-governance-looks-like-in-a-mid-market-company',
      '/blog/2026-09-03-the-finance-function-is-ai-s-highest-roi-starting-point': '/blog/2026-09-17-the-finance-function-is-ai-s-highest-roi-starting-point',
      '/blog/2026-09-04-why-most-corporate-ai-pilots-never-reach-production': '/blog/2026-09-11-why-most-corporate-ai-pilots-never-reach-production',
      '/blog/2026-09-05-build-vs-buy-a-practical-framework-for-ai-tooling': '/blog/2026-09-12-build-vs-buy-a-practical-framework-for-ai-tooling',
      '/blog/2026-09-06-how-to-automate-a-whatsapp-workflow-without-losing-control': '/blog/2026-09-13-how-to-automate-a-whatsapp-workflow-without-losing-control',
      '/blog/2026-09-07-the-ai-opportunity-audit-a-90-day-roadmap-for-leaders': '/blog/2026-09-14-the-ai-opportunity-audit-a-90-day-roadmap-for-leaders',
      '/blog/2026-09-08-ai-in-real-estate-start-with-lead-qualification-and-documents': '/blog/2026-09-15-ai-in-real-estate-start-with-lead-qualification-and-documents',
      '/blog/2026-09-09-what-good-ai-governance-looks-like-in-a-mid-market-company': '/blog/2026-09-16-what-good-ai-governance-looks-like-in-a-mid-market-company',
      '/blog/2026-09-10-the-finance-function-is-ai-s-highest-roi-starting-point': '/blog/2026-09-17-the-finance-function-is-ai-s-highest-roi-starting-point',
    };
    if (request.method === 'GET' && blogPathAliases[url.pathname]) {
      return absoluteRedirect(url, blogPathAliases[url.pathname]);
    }

    // Absolute 301s for legacy .html URLs (GSC flagged relative _redirects Location as Redirect error)
    const htmlAliases = {
      '/topics.html': '/topics',
      '/privacy.html': '/privacy',
      '/audit.html': '/audit',
      '/scorecard.html': '/scorecard',
      '/workshops.html': '/workshops',
      '/resources.html': '/resources',
      '/how-to-start-ai-implementation.html': '/how-to-start-ai-implementation',
      '/ai-opportunity-audit-for-ca-firms.html': '/ai-opportunity-audit-for-ca-firms',
      '/ai-implementation-for-finance-teams.html': '/ai-implementation-for-finance-teams',
      '/workflow-automation-with-ai-for-mid-market.html': '/workflow-automation-with-ai-for-mid-market',
    };
    if (request.method === 'GET' && htmlAliases[url.pathname]) {
      return absoluteRedirect(url, htmlAliases[url.pathname]);
    }

    return injectGa4(await env.ASSETS.fetch(request));
  }
};
