/* Topic bank for scripts/generate-daily-blog.js — one file per topic, published in this order of preference.
   A topic is publishable only if it passes hasMaterial() in the generator (sections, FAQ, cited sources). */
const fs = require('fs');
const path = require('path');
const files = fs.readdirSync(__dirname).filter((f) => /^\d{2}-.*\.js$/.test(f)).sort();
module.exports = files.map((f) => Object.assign({ file: `scripts/daily-topics/${f}` }, require(path.join(__dirname, f))));
