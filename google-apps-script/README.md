# Optional Google Sheets lead mirror

The site continues to store every accepted form submission in Cloudflare D1. This Apps Script endpoint provides an optional reporting mirror to the private spreadsheet:

https://docs.google.com/spreadsheets/d/1035AzgQEukEZtBsiWafJ0l7H7ofK6NquL4I4JtcI3DE/edit

## One-time activation

1. Open [script.google.com](https://script.google.com/) while signed in to the Google account that can edit the sheet, create a project, and paste `Code.gs`.
2. In Project Settings → Script properties, add `PB_SHEETS_SYNC_TOKEN` with a long random secret (at least 32 random characters). Do not put this token in browser code or GitHub.
3. Deploy → New deployment → Web app. Execute as you, and allow access for anyone. The endpoint is protected by the shared secret; keep the script token private. Copy the resulting `/exec` URL.
4. In Cloudflare Pages → project `pratikbajoria-com` → Settings → Variables and Secrets, add encrypted secrets `SHEETS_WEBHOOK_URL` (the Apps Script `/exec` URL) and `SHEETS_SYNC_TOKEN` (the same random secret). Add them to Production and Preview if desired, then redeploy.
5. Apply `migrations/0002_campaign_attribution.sql` to the production D1 database before deploying the Functions changes. Then merge/deploy the branch.

D1 is authoritative: a Sheets outage or missing secret does not prevent D1 from recording a lead. Existing D1 records are not backfilled automatically. The Apps Script appends new rows only. The Leads tab is expected to use the 20-column header order defined in `Code.gs`.

## Analytics

The separate Analytics Events tab is a schema/template for future reporting; the current site sends GA4 interaction events directly to GA4 and does not mirror visitor-level event streams into Sheets. Do not store raw Disha transcripts or raw on-site search phrases.
