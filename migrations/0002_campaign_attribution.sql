ALTER TABLE leads ADD COLUMN landing_page TEXT;
ALTER TABLE leads ADD COLUMN utm_source TEXT;
ALTER TABLE leads ADD COLUMN utm_medium TEXT;
ALTER TABLE leads ADD COLUMN utm_campaign TEXT;
ALTER TABLE leads ADD COLUMN utm_term TEXT;
ALTER TABLE leads ADD COLUMN utm_content TEXT;
ALTER TABLE leads ADD COLUMN gclid TEXT;
ALTER TABLE leads ADD COLUMN fbclid TEXT;

CREATE INDEX IF NOT EXISTS idx_leads_utm_campaign ON leads(utm_campaign);
