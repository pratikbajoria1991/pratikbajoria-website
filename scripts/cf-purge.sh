#!/usr/bin/env bash
# Purge Cloudflare edge cache for changed pages + index URLs.
# Usage: cf-purge.sh <base_sha|""> <head_sha> [extra_url...]
# Env: CF_TOKEN (Zone.Cache Purge on pratikbajoria.com). Never echoed.
set -euo pipefail
BASE="${1:-}"; HEAD="${2:-HEAD}"; shift 2 || true
SITE="https://pratikbajoria.com"
XB="https://crossborder.pratikbajoria.com"
[ -n "${CF_TOKEN:-}" ] || { echo "::error::No Cloudflare purge token secret (CF_PURGE_TOKEN) configured"; exit 1; }
auth=(-H "Authorization: Bearer ${CF_TOKEN}" -H "Content-Type: application/json")
ZONE_ID="${CF_ZONE_ID:-}"
if [ -z "$ZONE_ID" ]; then
  ZONE_ID=$(curl -s "${auth[@]}" "https://api.cloudflare.com/client/v4/zones?name=pratikbajoria.com" | jq -r '.result[0].id // empty')
fi
[ -n "$ZONE_ID" ] || { echo "::error::Could not resolve zone id (token lacks Zone read; set CF_ZONE_ID secret)"; exit 1; }

urls=()
if [ "$#" -gt 0 ]; then urls+=("$@"); else
  urls+=("$SITE/" "$SITE/blog" "$SITE/blog/" "$SITE/sitemap.xml" "$SITE/llms.txt" "$SITE/llms-full.txt" "$SITE/blog-posts.json" "$SITE/robots.txt")
  urls+=("$XB/" "$XB/sitemap.xml" "$XB/robots.txt")
  # AI-readable layer (scripts/build-md.mjs): index files, catalog and the markdown twins below.
  urls+=("$SITE/ai.txt" "$SITE/.well-known/llms.txt" "$SITE/api/md/_catalog" "$SITE/index.md" "$SITE/blog.md")
  [ -f public/rss.xml ] && urls+=("$SITE/rss.xml")
  [ -f public/feed.xml ] && urls+=("$SITE/feed.xml")
  if [ -n "$BASE" ] && ! [[ "$BASE" =~ ^0+$ ]] && git cat-file -e "$BASE" 2>/dev/null; then
    files=$(git diff --name-only "$BASE" "$HEAD" -- public | grep -E '\.html$' || true)
  else
    files=$(git show --name-only --format= "$HEAD" -- public | grep -E '\.html$' || true)
  fi
  for f in $files; do
    p="${f#public/}"; p="${p%.html}"
    case "$p" in index) continue;; */index) p="${p%index}";; esac
    urls+=("$SITE/$p" "$SITE/$p.html")
    # Cross-border pages are served on the subdomain from public/crossborder/.
    case "$p" in crossborder/*) q="${p#crossborder/}"; [ "$q" = "index" ] && q=""; urls+=("$XB/$q");; esac
  done
  # Changed markdown twins: public/md/x.md is served at /x.md.
  if [ -n "$BASE" ] && ! [[ "$BASE" =~ ^0+$ ]] && git cat-file -e "$BASE" 2>/dev/null; then
    mdfiles=$(git diff --name-only "$BASE" "$HEAD" -- public/md | grep -E '\.md$' || true)
  else
    mdfiles=$(git show --name-only --format= "$HEAD" -- public/md | grep -E '\.md$' || true)
  fi
  for f in $mdfiles; do urls+=("$SITE/${f#public/md/}"); done
  # Posts that exist only in blog-posts.json are rendered by the worker from blog.html; when the
  # shell, the worker or the post data changes, every one of them must be purged too.
  if [ -n "$BASE" ] && ! [[ "$BASE" =~ ^0+$ ]] && git cat-file -e "$BASE" 2>/dev/null; then
    shell_changed=$(git diff --name-only "$BASE" "$HEAD" -- public/blog.html public/blog.js public/_worker.js public/blog-posts.json || true)
  else
    shell_changed=$(git show --name-only --format= "$HEAD" -- public/blog.html public/blog.js public/_worker.js public/blog-posts.json || true)
  fi
  if [ -n "$shell_changed" ] && [ -f public/blog-posts.json ]; then
    while IFS= read -r slug; do
      [ -n "$slug" ] && [ ! -f "public/blog/$slug.html" ] && urls+=("$SITE/blog/$slug")
    done < <(jq -r '(if type == "array" then . else .posts end)[]?.slug // empty' public/blog-posts.json)
  fi
fi
# Cloudflare accepts up to 30 URLs per call (free plan).
printf '%s\n' "${urls[@]}" | sort -u > /tmp/purge-urls.txt
echo "Purging $(wc -l < /tmp/purge-urls.txt) URLs:"; cat /tmp/purge-urls.txt
ok=true
split -l 30 /tmp/purge-urls.txt /tmp/purge-chunk-
for c in /tmp/purge-chunk-*; do
  body=$(jq -R . "$c" | jq -s '{files: .}')
  for attempt in 1 2 3; do
    res=$(curl -s -X POST "${auth[@]}" --data "$body" "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache")
    s=$(echo "$res" | jq -r '.success'); echo "purge success=$s errors=$(echo "$res" | jq -c '[.errors[]?.code]')"
    [ "$s" = "true" ] && break; sleep 20  # rate limited: back off and retry
  done
  sleep 2
  [ "$s" = "true" ] || ok=false
done
$ok
