const article = document.querySelector('#article');
const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');

function renderParagraphs(content) {
  return String(content || '').split(/\n\s*\n/).filter(Boolean).map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br />')}</p>`).join('');
}

function renderAffiliateTools(post, catalog) {
  const tools = (post.affiliateTools || []).map((key) => catalog[key]).filter(Boolean);
  if (!tools.length) return '';
  return `<aside class="article-tools" aria-label="Tools mentioned in this article"><p class="eyebrow">Tools worth evaluating</p><div class="article-tool-grid">${tools.map((tool) => {
    const isAffiliate = Boolean(tool.affiliateUrl);
    const href = isAffiliate ? tool.affiliateUrl : tool.productUrl;
    const label = isAffiliate ? `Explore ${tool.name}` : `Visit ${tool.name} official site`;
    const rel = isAffiliate ? 'nofollow sponsored noopener noreferrer' : 'noopener noreferrer';
    return `<a href="${escapeHtml(href)}" target="_blank" rel="${rel}"><strong>${escapeHtml(tool.name)}</strong><span>${escapeHtml(tool.category)}</span><small>${escapeHtml(label)} ↗</small></a>`;
  }).join('')}</div><p class="article-tool-note">Links marked as partner links may earn a commission at no extra cost to you. Where a partner link is not yet active, this page uses the tool’s official website until the approved tracking URL is configured.</p></aside>`;
}

async function loadArticle() {
  try {
    const [postsResponse, catalogResponse, editorialResponse] = await Promise.all([
      fetch('/blog-posts.json', { cache: 'no-store' }),
      fetch('/affiliate-links.json', { cache: 'no-store' }),
      fetch('/affiliate-articles.json', { cache: 'no-store' })
    ]);
    const posts = [...await editorialResponse.json(), ...await postsResponse.json()];
    const catalog = await catalogResponse.json();
    const post = posts.find((item) => item.slug === slug || item.id === slug);
    if (!post) throw new Error('Article not found');
    const canonical = `https://pratikbajoria.com/blog.html?slug=${encodeURIComponent(post.slug)}`;
    document.title = `${post.title} — Pratik Bajoria`;
    document.querySelector('meta[name="description"]').setAttribute('content', post.excerpt || 'Practical writing on implementing AI inside real businesses.');
    document.querySelector('link[rel="canonical"]').setAttribute('href', canonical);
    document.querySelector('#article-schema')?.remove();
    const articleSchema = document.createElement('script');
    articleSchema.id = 'article-schema';
    articleSchema.type = 'application/ld+json';
    articleSchema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt || '',
      datePublished: post.date || undefined,
      dateModified: post.date || undefined,
      author: { '@type': 'Person', name: 'Pratik Bajoria', url: 'https://pratikbajoria.com/#about' },
      publisher: { '@type': 'Person', name: 'Pratik Bajoria' },
      mainEntityOfPage: canonical,
      keywords: post.keywords || []
    });
    document.head.appendChild(articleSchema);
    article.innerHTML = `<p class="eyebrow">${escapeHtml(post.category || 'AI implementation')} · ${escapeHtml(post.date || '')} · ${escapeHtml(post.readTime || 7)} min read</p><h1>${escapeHtml(post.title)}</h1><p class="article-dek">${escapeHtml(post.excerpt || '')}</p><div class="article-body">${renderParagraphs(post.content)}</div>${renderAffiliateTools(post, catalog)}<div class="article-sources"><h2>Sources and further reading</h2>${(post.sources || []).map((source) => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title || source.url)} ↗</a>`).join('')}</div><p class="article-disclosure">${escapeHtml(post.affiliate?.disclosure || '')}</p>`;
  } catch {
    article.innerHTML = '<p class="eyebrow">Insight unavailable</p><h1>This article could not be loaded.</h1><p class="article-dek">Return to the insights index and try another article.</p><p><a class="button button-dark" href="/#insights">Return to insights <span>↗</span></a></p>';
  }
}

loadArticle();

