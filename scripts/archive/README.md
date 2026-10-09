# Archived one-off scripts

These scripts were run once (25–30 Sep 2026) to materialise SSR pages for daily posts and publish the
CA + AI hub/backlog. Their output is already in `public/`, and those pages have since been rewritten
(7 Oct 2026 humanise pass, 7 Oct duplicate consolidation, 9 Oct SEO pass).

Do **not** re-run them:

- They would overwrite newer rewrites of the same pages, hub, sitemap and index.
- Several bodies belong to slugs retired on 7 Oct 2026 (`scripts/blog-retired-topics.json`), which now
  301 to a surviving post. Recreating them would bring the duplicates back.

Both runnable scripts (`materialize_missing_ssr.py`, `materialize_backlog_2026_09_30.py`) exit
immediately unless `ALLOW_ARCHIVED_SCRIPT=1` is set, and even then they skip every retired slug.
`backlog_bodies_2026_09_30.py` and `backlog_new_posts_2026_09_30.py` are data modules imported by them.

Daily posts now come only from `scripts/generate-daily-blog.js` + `scripts/daily-topics/`.
