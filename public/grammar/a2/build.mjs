import fs from 'node:fs';
import path from 'node:path';

const base = new URL('.', import.meta.url).pathname; // folder of build.mjs
const data = JSON.parse(fs.readFileSync(path.join(base,'data/lessons.json'),'utf8'));
const template = fs.readFileSync(path.join(base,'template.html'),'utf8');

const lessonsDir = path.join(base,'lessons');
if(!fs.existsSync(lessonsDir)) fs.mkdirSync(lessonsDir, {recursive:true});

const indexItems = [];
for (const l of data.lessons){
  const html = template
    .replaceAll('{{TITLE}}', l.title)
    .replace('{{DATA_JSON}}', JSON.stringify(l));
  const out = path.join(lessonsDir, `${l.slug}.html`);
  fs.writeFileSync(out, html, 'utf8');
  indexItems.push({ title:l.title, slug:l.slug, topic:l.topic, canDo:l.canDo, count:l.questions.length });
}

// also produce the index.html with a rendered data stub for the grid
const idxPath = path.join(base,'index.html');
let idx = fs.readFileSync(idxPath,'utf8');
idx = idx.replace('{{INDEX_DATA}}', JSON.stringify(indexItems));
fs.writeFileSync(idxPath, idx, 'utf8');

console.log(`Built ${data.lessons.length} lessons → public/grammar/a2/lessons/`);