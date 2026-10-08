#!/usr/bin/env node
/* Guard test (npm test): fails if
   1. any two live blog posts share more than 60% of their body text (5-word shingle containment),
   2. any queued daily topic lacks complete sourced material or would be a >60% near-duplicate,
   3. the detector itself stops catching template-generated bodies (self-check). */
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const sim = require('./content-similarity.js');
const gen = require('./generate-daily-blog.js');
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

let failures = 0;
const fail = (msg) => { failures++; console.log(`FAIL ${msg}`); };
const pct = (x) => `${Math.round(x * 100)}%`;

// 1. Live corpus, pairwise.
const corpus = [...sim.loadCorpus(root)];
const shingled = corpus.map(([slug, e]) => ({ slug, source: e.source, words: e.text.split(' ').length, set: sim.shingles(e.text) }));
let worst = { score: 0 };
for (let i = 0; i < shingled.length; i++) {
  if (shingled[i].words < 300) fail(`${shingled[i].source} has only ${shingled[i].words} words of body text`);
  for (let j = i + 1; j < shingled.length; j++) {
    const score = sim.similarity(shingled[i].set, shingled[j].set);
    if (score > worst.score) worst = { score, a: shingled[i].slug, b: shingled[j].slug };
    if (score > sim.MAX_SIMILARITY) fail(`${shingled[i].source} and ${shingled[j].source} share ${pct(score)} of body text (limit ${pct(sim.MAX_SIMILARITY)})`);
  }
}
console.log(`ok   corpus: ${shingled.length} live posts, ${(shingled.length * (shingled.length - 1)) / 2} pairs; most similar pair ${pct(worst.score)} (${worst.a} / ${worst.b})`);

// 2. Queued topics: complete material, cited sources, live internal links, not near-duplicates.
const report = gen.validateAll({ quiet: true });
for (const r of report) {
  if (r.problems.length) fail(`topic ${r.n} "${r.title}" (${r.file}): ${r.problems.join('; ')}`);
  else console.log(`ok   topic ${String(r.n).padStart(2)}: ${r.title} (${r.words} words; nearest live post ${pct(r.nearest.score)})`);
}

// 3. Detector self-check: two bodies from the retired generic template, with different openers and
//    theses, must be flagged. (This is the pattern that produced the thin 8 Oct 2026 post.)
const template = (opener, thesis) => [opener, thesis,
  'Here is the practical cut. Write the current workflow on one page: input, decision, output, owner, and what "good" looks like today. If you cannot fill those five lines, you are not choosing a model yet — you are guessing.',
  'Pick one bottleneck with volume and a measurable cost: cycle time, error rate, review hours, or cash delay. Ignore the impressive adjacent idea. Narrow beats clever. The teams that win treat AI like any other operating change: small scope, named owner, visible metric.',
  'Design the human gate before the automation. Who approves? What evidence must remain? What must never leave the company systems? In finance and client work, an unauditable answer is not a deliverable. If a tool cannot show you how it reached a result, keep it in draft mode.',
  'Ship a thin release to one team for two to four weeks. Run it beside the old process if the risk is material. Review the metric every week — not in a steering committee three months later. Capture exceptions in a shared log so patterns become obvious.',
  'If the metric moves and controls hold, document the pattern so the next team does not start from folklore. If it does not move, stop. A failed pilot that you can explain is cheaper than a zombie subscription.'
].join('\n\n');
const a = template('A useful AI audit is boring on purpose. It ranks work, names owners, and ends with one funded release.', 'Start internal audit AI with full-population testing of one process, not a dashboard nobody reads.');
const b = template('Most AI workflows fail quietly. The model works in a sandbox; the Monday morning handoff does not.', 'Automate the matching and the mismatch list; a reviewer still decides what to chase with the deductor.');
const selfScore = sim.similarity(a, b);
if (selfScore <= sim.MAX_SIMILARITY) fail(`detector self-check: two template bodies scored only ${pct(selfScore)}`);
else console.log(`ok   detector self-check: two template-generated bodies score ${pct(selfScore)} (> ${pct(sim.MAX_SIMILARITY)}, correctly flagged)`);
for (const phrase of gen.BANNED_PHRASES.slice(0, 3)) if (!a.includes(phrase)) fail(`self-check fixture no longer contains banned phrase "${phrase}"`);

console.log(failures ? `\n${failures} failure(s)` : '\nAll content guard checks passed.');
process.exitCode = failures ? 1 : 0;
