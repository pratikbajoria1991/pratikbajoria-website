CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('discovery', 'newsletter')),
  created_at TEXT NOT NULL,
  consent_at TEXT NOT NULL,
  name TEXT,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  challenge TEXT,
  source TEXT NOT NULL DEFAULT 'website',
  page_url TEXT,
  referrer TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  metadata TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_kind ON leads(kind);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
