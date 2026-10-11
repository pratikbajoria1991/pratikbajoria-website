const SPREADSHEET_ID = '1035AzgQEukEZtBsiWafJ0l7H7ofK6NquL4I4JtcI3DE';
const TAB_NAME = 'Leads';
const HEADERS = [
  'Received at UTC', 'Type', 'Name', 'Email', 'Company', 'Phone', 'Enquiry',
  'Source', 'Current page', 'Referrer', 'Landing page', 'UTM source',
  'UTM medium', 'UTM campaign', 'UTM term', 'UTM content', 'GCLID',
  'FBCLID', 'Consent at UTC', 'Metadata'
];

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const expected = PropertiesService.getScriptProperties().getProperty('PB_SHEETS_SYNC_TOKEN');
    if (!expected || !payload.token || payload.token !== expected) {
      return output({ ok: false, error: 'Unauthorized' });
    }
    const lead = payload.lead || {};
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(TAB_NAME);
    if (!sheet) throw new Error('Leads sheet tab not found');
    sheet.appendRow([
      lead.receivedAt, lead.type, lead.name, lead.email, lead.company, lead.phone,
      lead.enquiry, lead.source, lead.pageUrl, lead.referrer, lead.landing_page,
      lead.utm_source, lead.utm_medium, lead.utm_campaign, lead.utm_term,
      lead.utm_content, lead.gclid, lead.fbclid, lead.consentAt,
      JSON.stringify(lead.metadata || {})
    ].map(safeCell));
    return output({ ok: true });
  } catch (err) {
    return output({ ok: false, error: 'Unable to record row' });
  }
}

function safeCell(value) {
  if (value === null || value === undefined) return '';
  const text = String(value);
  return /^[=+@-]/.test(text) ? "'" + text : text;
}

function output(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
