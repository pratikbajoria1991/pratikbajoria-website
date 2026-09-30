"""Two editorial posts for the CA + AI India cluster (28 and 30 Sep 2026).
Only verified official sources; no invented statistics, prices, awards or case results."""
import html as _h
import json
from _blog_helpers import checklist, sources, CALLOUT

TD = 'style="padding:10px;border:1px solid #cfc9bc;vertical-align:top"'
TH = 'style="text-align:left;padding:10px;border:1px solid #cfc9bc"'


def table(headers, rows, caption):
    head = "".join(f"<th {TH}>{h}</th>" for h in headers)
    body = "\n".join("<tr>" + "".join(f"<td {TD}>{c}</td>" for c in r) + "</tr>" for r in rows)
    return (f'<table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:0.95rem">\n'
            f'  <caption style="text-align:left;padding:0 0 8px;color:#6f746d">{caption}</caption>\n'
            f'  <thead><tr style="background:#ebe6dc">{head}</tr></thead>\n  <tbody>\n{body}\n  </tbody>\n</table>')


def faq_html(qas):
    out = ["<h2>Frequently asked questions</h2>"]
    for q, a in qas:
        out.append(f"<h3>{q}</h3>\n<p>{a}</p>")
    return "\n".join(out)


def faq_ld(qas, url):
    import re
    strip = lambda s: _h.unescape(re.sub(r"<[^>]+>", "", s))
    return json.dumps({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": url + "#faq",
        "mainEntity": [
            {"@type": "Question", "name": strip(q), "acceptedAnswer": {"@type": "Answer", "text": strip(a)}}
            for q, a in qas
        ],
    }, indent=2, ensure_ascii=False)


DISCLAIMER = ('<p><em>Disclaimer: this article is general educational commentary from implementation work. It is not tax, legal, '
              'audit or data-protection advice, and it does not create an adviser–client relationship. GST procedures, portal '
              'functionality, Standards on Auditing and data-protection rules change; check the primary sources and take '
              'professional advice on your specific facts before acting.</em></p>')

GST_SLUG = "2026-09-28-how-indian-ca-firms-can-use-ai-for-gst-reconciliation-without-risking-client-data"
AUDIT_SLUG = "2026-09-30-ai-for-audit-working-papers-in-india-what-a-ca-should-automate-and-what-must-stay-human"

GST_TITLE = "How Indian CA Firms Can Use AI for GST Reconciliation Without Risking Client Data"
GST_DESC = ("A CA’s playbook for using AI on GSTR-2B reconciliation, IMS review and GST notice replies — what to automate, "
            "where the human gate sits, and how to keep client data out of the wrong tools.")
AUDIT_TITLE = "AI for Audit Working Papers in India: What a CA Should Automate and What Must Stay Human"
AUDIT_DESC = ("Using AI on audit working papers without weakening SA 230 documentation: which tasks to automate, which "
              "judgements stay with the engagement team, and how to document AI use on the file.")

GST_FAQ = [
    ("Can AI decide whether input tax credit is eligible?",
     "No. AI can surface mismatches and suggest likely reasons, but ITC eligibility is a professional judgement on the facts and the law. Treat the tool’s output as a working note that a qualified person reviews before anything is accepted, rejected or claimed."),
    ("Is it safe to upload a client’s GSTR-2B export to ChatGPT or a similar tool?",
     "Not to a consumer chatbot account. Use an approved environment with contractual data-processing terms, access control and retention settings your firm has reviewed, and redact or pseudonymise identifiers where the task allows. Deterministic matching in a spreadsheet or script often needs no AI model at all."),
    ("What happens in IMS if nobody acts on an invoice?",
     "According to GSTN’s published IMS FAQs, records with no action are deemed accepted when GSTR-2B is generated. That is why the accept/reject/pending decision should sit with a named reviewer, even if an AI tool prepares the recommendation."),
    ("Can AI draft replies to GST notices?",
     "It can summarise the notice, extract dates and build a document checklist and a first-draft structure. The position taken, the legal reasoning and the final reply must be settled and signed off by the responsible professional."),
]

GST_BODY = f"""
<p>Every month, somewhere between the 11th and the 20th, most CA practices in India run the same drill. Pull the client’s purchase register, download GSTR-2B, match line by line, chase vendors who have not uploaded, decide what to do with the stragglers, and file GSTR-3B. Add the occasional notice from the department and you have one of the most repetitive, deadline-driven workflows in the profession. It is exactly the kind of work people want to “throw AI at”.</p>
<p>I think that instinct is right — with one condition. GST data is client data. It carries GSTINs, vendor relationships, pricing and, for proprietorships, information that identifies individuals. The question is not whether AI can help with GST reconciliation. It is how to use it so that a partner would be comfortable explaining the set-up to the client, to a peer reviewer, or to the department.</p>
<h2>Where AI genuinely earns its place in GST work</h2>
<p>The useful jobs are mostly about language and mess, not tax judgement:</p>
<ul>
  <li><strong>Normalising the purchase register.</strong> Vendor names spelled five ways, invoice numbers with and without prefixes, dates in mixed formats. Cleaning these is where most matching time actually goes.</li>
  <li><strong>Fuzzy matching and reason coding.</strong> Once exact matches are cleared by rules, a model can suggest likely pairs for the remainder and classify mismatches — timing, tax-rate difference, GSTIN error, missing upload — for a human to confirm.</li>
  <li><strong>Vendor follow-ups.</strong> Drafting polite, specific emails listing the invoices a supplier has not reported, for the article assistant to review and send.</li>
  <li><strong>Notice triage.</strong> Summarising a notice, extracting reference numbers, periods and due dates, and producing a checklist of documents likely to be needed.</li>
</ul>
<p>A lot of the matching itself does not need a large language model at all. A well-built spreadsheet or a short script that matches on GSTIN, invoice number and amount is deterministic, auditable and cheap. I use models for the parts rules handle badly: messy text, reason classification and first drafts.</p>
<h2>The IMS decision is a control point, not a chore</h2>
<p>Since GSTN introduced the Invoice Management System (IMS), recipients can accept, reject or keep pending the records their suppliers report. GSTN’s published FAQs say that records with no action are deemed accepted when GSTR-2B is generated, and that if you change actions after the draft GSTR-2B you need to recompute it before filing GSTR-3B. In other words, silence is a decision.</p>
<p>That makes IMS the natural place for the human gate. Let the tool prepare a recommendation for each record with its reasoning — matched to books, missing in books, rate mismatch, possibly ineligible — and let a named reviewer take the action on the portal. The recommendation file becomes part of your working papers; the portal action remains a professional act.</p>
{table(["GST task", "What AI can reasonably do", "Human gate", "Client-data exposure"], [
    ["Purchase register clean-up", "Standardise vendor names, invoice formats and dates", "Spot-check a sample before matching", "Medium — keep inside approved tools"],
    ["Books vs GSTR-2B matching", "Suggest pairs for non-exact items; classify mismatch reasons", "Reviewer confirms matches above a value threshold", "Medium — prefer scripts or approved environment"],
    ["IMS accept / reject / pending", "Prepare a recommendation with reasoning per record", "Named reviewer takes the portal action", "Low if only the recommendation file is shared"],
    ["Vendor follow-up", "Draft specific reminder emails", "Article assistant reviews before sending", "Low — share only the vendor’s own invoices"],
    ["Notice triage and reply", "Summarise, extract dates, build document checklist and first-draft outline", "Professional settles the position and signs the reply", "High — notices often contain sensitive facts"],
], "Illustrative division of work for a CA practice. Adapt thresholds to your own risk assessment.")}
<h2>Keeping client data out of the wrong places</h2>
<p>The single most common failure I see is not a bad model. It is an article assistant pasting a client’s GSTR-2B export into a personal chatbot account because the approved tool was slower. So the rules need to be simple enough to remember in the second week of the month:</p>
<p><strong>Classify first.</strong> Purchase registers, GSTR-2B exports and notices are restricted client data by default. Consumer chatbot accounts are not an approved environment for restricted data.</p>
<p><strong>Know your role under the DPDP Act.</strong> The Digital Personal Data Protection Act, 2023 makes a data fiduciary responsible for processing done on its behalf by a data processor, allows processors to be engaged only under a valid contract, and requires reasonable security safeguards to prevent a personal data breach. Whether your firm is acting as a fiduciary or a processor for a given engagement is a question worth putting to counsel — but either way your AI vendor’s terms, storage location and retention settings need to be checked, not assumed.</p>
<p><strong>Minimise what the model sees.</strong> Reason-coding a mismatch rarely needs the client’s name. Pseudonymise GSTINs and client identifiers where the task allows, and keep the mapping inside your own systems.</p>
<p><strong>Log it.</strong> Record which tool touched which client file, when, and who reviewed the output. The NIST AI Risk Management Framework is a useful reference for thinking about this proportionately; you do not need its full vocabulary to adopt the habit.</p>
{CALLOUT}
<h2>Notices: faster triage, same accountability</h2>
<p>On the GST portal, notices and orders are consolidated under Services › User Services › View Notices and Orders, according to GSTN’s user guide. A practical pattern is a weekly check of that page for each client, with every new item logged into your tracker. AI can then turn a dense notice into a one-page summary: what is alleged, for which period, the reply due date, and the documents you will probably need. It can propose an outline for the reply.</p>
<p>What it cannot do is decide your position. Due dates extracted by a tool should be checked against the portal. The legal reasoning, the facts you rely on and the final reply must be settled by the responsible professional. I would also keep the model’s summary out of anything sent to the department; it is an internal working note.</p>
<h2>How I would start in a practice this month</h2>
<p>Pick three clients with messy purchase registers and cooperative contacts. Build the deterministic match first. Add AI only for clean-up and reason coding on the leftovers. Put the IMS recommendation file in front of a named reviewer. Measure two things for one filing cycle: reviewer hours on reconciliation and the number of items still unexplained at filing. If both improve and nobody has touched an unapproved tool, extend to the next group of clients. If not, simplify before you scale.</p>
<p>For the wider context — five-job map, data classes, thin releases — read the {'<a href="/blog/ai-for-chartered-accountants-in-india">AI for chartered accountants in India</a>'} hub. The companion pieces on <a href="/blog/best-ai-tools-chartered-accountants-finance-professionals">AI tools for chartered accountants</a>, <a href="/blog/2026-09-20-ecommerce-reconciliation-where-automation-helps-and-where-it-lies">where reconciliation automation helps and where it lies</a> and <a href="/blog/{AUDIT_SLUG}">AI for audit working papers</a> go deeper on tooling and controls. If you want a structured view of where AI fits across your practice, the <a href="/ai-opportunity-audit-for-ca-firms">AI Opportunity Audit for CA firms</a> is the scoped version, or you can <a href="/#contact">book a discovery call</a>.</p>
{checklist([
    "List the clients whose GST reconciliation takes the most reviewer time; pick three.",
    "Build deterministic matching (GSTIN, invoice number, amount) before adding any model.",
    "Write down which tools are approved for GST data and ban consumer chatbot accounts for it.",
    "Make IMS actions a named reviewer’s job, with the tool’s recommendation filed as a working paper.",
    "Check each client’s View Notices and Orders page weekly and log every new item.",
    "After one filing cycle, compare reviewer hours and unexplained items at filing.",
])}
{faq_html(GST_FAQ)}
{sources([
    ("GSTN — Form GSTR-2B user manual (tutorial.gst.gov.in)", "https://tutorial.gst.gov.in/userguide/returns/Manual_gstr2b.htm"),
    ("GSTN — Frequently Asked Questions on Invoice Management System (IMS)", "https://tutorial.gst.gov.in/downloads/news/final_faqs_on_ims_22_09_2024.pdf"),
    ("GSTN — View Notices and Demand Orders (user guide)", "https://tutorial.gst.gov.in/userguide/taxpayersdashboard/View_Notices_and_Demand_Orders.htm"),
    ("CBIC — GST portal for law, rules and notifications", "https://cbic-gst.gov.in/"),
    ("Digital Personal Data Protection Act, 2023 (Gazette text, MeitY)", "https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf"),
    ("NIST AI Risk Management Framework", "https://www.nist.gov/itl/ai-risk-management-framework"),
    ("ICAI — The Institute of Chartered Accountants of India", "https://www.icai.org/"),
])}
{DISCLAIMER}
"""

AUDIT_FAQ = [
    ("Does using AI on an audit change what SA 230 requires?",
     "No. SA 230 still requires documentation sufficient for an experienced auditor with no previous connection to the audit to understand the procedures performed, the evidence obtained and the significant judgements made. AI-assisted work has to meet the same test, which usually means recording how the tool was used and who reviewed its output."),
    ("Which audit tasks are safest to automate first?",
     "Administrative and mechanical work: PBC tracking, indexing and cross-referencing, tying lead schedules to the trial balance, extracting fields from confirmations and invoices, and drafting narratives of work already performed. These are easy to check and do not replace judgement."),
    ("Can AI select audit samples?",
     "Tools can generate selections, but the sampling approach, the population, and the rationale remain the engagement team’s responsibility and should be documented as such. Keep the parameters and the output on file so the selection can be re-performed."),
    ("How should I document AI use on the working paper?",
     "Note the tool and version, the input it was given, the output, who reviewed it and when, and what the reviewer changed. Keep it short, but make it possible for a reviewer to reconstruct what happened."),
]

AUDIT_BODY = f"""
<p>When I review how a firm is using AI on audits, I ask one question before looking at any tool: could an experienced auditor who has never seen this engagement pick up the file and understand what was done, what was found and why the team concluded what it did? That is not my invention. It is, in substance, the requirement in SA 230, Audit Documentation, as issued by ICAI. It is also the cleanest test I know for deciding which parts of working-paper preparation AI should touch.</p>
<p>AI is very good at producing text that looks like a working paper. That is the danger. A fluent narrative that nobody performed, or a tie-out nobody checked, makes a file look complete while hollowing out the evidence underneath it.</p>
<h2>What SA 230 actually asks of the file</h2>
<p>Paragraph 8 of SA 230 requires documentation sufficient to enable an experienced auditor, having no previous connection with the audit, to understand the nature, timing and extent of procedures performed, the results and evidence obtained, and significant matters, conclusions and professional judgements. Paragraph 9 requires recording who performed the work and when, and who reviewed it, when and to what extent. The application material notes that assembly of the final audit file is ordinarily completed not more than 60 days after the date of the auditor’s report.</p>
<p>None of that is suspended because a model drafted part of the paper. If anything, AI raises the bar on the “who performed” and “who reviewed” lines, because the honest answer now has three parties: the person, the tool, and the reviewer.</p>
<h2>What I would automate</h2>
<p>The work worth automating is mechanical, checkable and repetitive:</p>
<ul>
  <li><strong>PBC tracking and indexing.</strong> Matching client uploads to the request list, naming files consistently, flagging what is missing.</li>
  <li><strong>Lead schedules and tie-outs.</strong> Mapping the trial balance to lead schedules and flagging differences — work that is easy to re-perform and verify.</li>
  <li><strong>Extraction for vouching support.</strong> Pulling dates, amounts and parties from invoices, confirmations and agreements into a schedule, with the source document linked on every row.</li>
  <li><strong>Reading aids.</strong> Summarising board minutes or long contracts to direct attention — not to replace reading the relevant sections.</li>
  <li><strong>Drafting narratives of completed work.</strong> Turning a senior’s notes on procedures already performed into a clean working-paper narrative, which the senior then checks line by line.</li>
</ul>
<h2>What must stay human</h2>
<p>Risk assessment and materiality. The judgement on whether evidence is sufficient and appropriate. The rationale for sampling approaches, even if a tool generates the selection. Evaluation of misstatements. Going-concern and key judgement areas. Communication with management and those charged with governance. Review and sign-off. These are the places where the file has to show professional judgement, and SA 230 expects significant judgements to be documented as judgements made by the engagement team.</p>
{table(["Working-paper task", "Automate?", "Human responsibility", "Evidence to keep on file"], [
    ["PBC tracking and indexing", "Yes", "Senior confirms completeness of the request list", "Tracker with dates and source links"],
    ["TB to lead schedule tie-out", "Yes", "Preparer investigates every difference flagged", "Tie-out with differences and resolutions"],
    ["Field extraction from invoices and confirmations", "Yes, with source links", "Preparer checks a sample back to documents", "Extraction schedule, tool used, sample check noted"],
    ["Sample selection", "Tool may generate", "Team sets population, method and rationale", "Parameters, output and rationale"],
    ["Minutes and contract summaries", "As a reading aid", "Team reads relevant sections in full", "Note of what was read and matters identified"],
    ["Risk assessment, materiality, conclusions", "No", "Engagement team and partner", "Documented judgements and review evidence"],
], "Illustrative split for a statutory audit working file. Adapt to your firm’s methodology and quality policies.")}
<h2>Documenting AI use without drowning in it</h2>
<p>Firms tend to swing between two extremes: no record of AI use at all, or a policy so heavy that people quietly stop disclosing it. I prefer a short, standard block on any working paper where a tool contributed: the tool and version, what it was given, what it produced, who reviewed it, when, and what they changed. That is enough for a reviewer to reconstruct the work, and it fits naturally alongside the preparer and reviewer sign-offs SA 230 already expects.</p>
<p>Keep prompts that are reused across engagements in a controlled library, with an owner and change notes. When a prompt changes, the output changes; a reviewer should be able to see which version produced which paper. The NIST AI Risk Management Framework is a sensible reference for this kind of proportionate logging.</p>
{CALLOUT}
<h2>Confidentiality and client data</h2>
<p>Audit files contain some of the most sensitive information a client has: unpublished results, payroll, related-party dealings, legal matters. Consumer chatbot accounts are not an approved environment for that material. Use tools your firm has assessed for data processing, storage location, retention and access control. Where working papers include personal data — payroll and KYC are obvious examples — the Digital Personal Data Protection Act, 2023 expects the business to protect it with reasonable security safeguards, including when a processor handles it on its behalf. Your professional confidentiality obligations under ICAI’s framework apply regardless of which tool you choose.</p>
<p>For audits within the remit of the National Financial Reporting Authority, expect files to be read closely by people who were not on the engagement. That is precisely the reader SA 230 has in mind.</p>
<h2>A sensible first quarter</h2>
<p>Pick two or three engagements with cooperative clients and stable systems. Automate PBC tracking and lead-schedule tie-outs first. Add extraction for vouching support with a documented sample check. Introduce the standard AI-use block on every paper a tool touched. At the end of the quarter, ask a manager from a different team to read one file cold. If they can follow it, extend. If they cannot, the problem is the file, not the reviewer.</p>
<p>For the full CA implementation map, see the <a href="/blog/ai-for-chartered-accountants-in-india">AI for chartered accountants in India</a> hub. Related pieces: <a href="/blog/{GST_SLUG}">using AI for GST reconciliation without risking client data</a>, <a href="/blog/best-ai-tools-chartered-accountants-finance-professionals">AI tools for chartered accountants</a> and <a href="/blog/2026-09-24-when-a-finance-team-should-say-no-to-an-ai-pilot">when to say no to an AI pilot</a>. To see where AI fits across your practice, start with the free <a href="/scorecard">AI Opportunity Scorecard</a>, look at the scoped <a href="/audit">AI Opportunity Audit</a>, or <a href="/#contact">book a discovery call</a>.</p>
{checklist([
    "Pick two or three engagements and name the manager accountable for the AI trial.",
    "Automate PBC tracking and lead-schedule tie-outs before anything judgement-heavy.",
    "Add source links to every extracted row and document a sample check.",
    "Adopt a standard AI-use block: tool, input, output, reviewer, date, changes.",
    "Keep client files out of consumer chatbot accounts; confirm vendor data terms.",
    "At quarter end, have someone outside the team read one file cold.",
])}
{faq_html(AUDIT_FAQ)}
{sources([
    ("ICAI — SA 230, Audit Documentation (text of the Standard)", "https://live.icai.org/bos/vcc-2nd-batch-recorded-lectures/pdf/SA%20230%20-%20Audit%20Documentation.pdf"),
    ("ICAI — Implementation Guide to SA 230, Audit Documentation (Revised 2022 Edition)", "https://publication.icai.org/publication/375"),
    ("National Financial Reporting Authority (NFRA)", "https://nfra.gov.in/"),
    ("Digital Personal Data Protection Act, 2023 (Gazette text, MeitY)", "https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf"),
    ("NIST AI Risk Management Framework", "https://www.nist.gov/itl/ai-risk-management-framework"),
])}
{DISCLAIMER}
"""

NEW_POSTS = [
    {
        "slug": AUDIT_SLUG, "title": AUDIT_TITLE, "excerpt": AUDIT_DESC, "date": "2026-09-30",
        "body": AUDIT_BODY, "faq": AUDIT_FAQ, "category": "CA insights",
        "keywords": ["AI for audit working papers India", "SA 230 audit documentation AI", "AI for CA firms India",
                     "AI in audit India", "chartered accountant AI"],
        "image": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=85",
        "sources": [
            {"title": "ICAI — SA 230, Audit Documentation", "url": "https://live.icai.org/bos/vcc-2nd-batch-recorded-lectures/pdf/SA%20230%20-%20Audit%20Documentation.pdf"},
            {"title": "ICAI — Implementation Guide to SA 230 (Revised 2022)", "url": "https://publication.icai.org/publication/375"},
            {"title": "NFRA", "url": "https://nfra.gov.in/"},
            {"title": "Digital Personal Data Protection Act, 2023", "url": "https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf"},
            {"title": "NIST AI Risk Management Framework", "url": "https://www.nist.gov/itl/ai-risk-management-framework"},
        ],
    },
    {
        "slug": GST_SLUG, "title": GST_TITLE, "excerpt": GST_DESC, "date": "2026-09-28",
        "body": GST_BODY, "faq": GST_FAQ, "category": "CA insights",
        "keywords": ["AI for GST reconciliation", "GSTR-2B reconciliation AI", "AI for CA firms India",
                     "GST notice AI", "client data protection CA firm"],
        "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=85",
        "sources": [
            {"title": "GSTN — Form GSTR-2B user manual", "url": "https://tutorial.gst.gov.in/userguide/returns/Manual_gstr2b.htm"},
            {"title": "GSTN — FAQs on Invoice Management System (IMS)", "url": "https://tutorial.gst.gov.in/downloads/news/final_faqs_on_ims_22_09_2024.pdf"},
            {"title": "GSTN — View Notices and Demand Orders", "url": "https://tutorial.gst.gov.in/userguide/taxpayersdashboard/View_Notices_and_Demand_Orders.htm"},
            {"title": "CBIC GST", "url": "https://cbic-gst.gov.in/"},
            {"title": "Digital Personal Data Protection Act, 2023", "url": "https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf"},
            {"title": "NIST AI Risk Management Framework", "url": "https://www.nist.gov/itl/ai-risk-management-framework"},
            {"title": "ICAI", "url": "https://www.icai.org/"},
        ],
    },
]
