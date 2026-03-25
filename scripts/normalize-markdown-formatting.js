// scripts/normalize-markdown-formatting.js
const fs = require('fs');
const path = require('path');

const dataFilePath = path.resolve(__dirname, '../src/data/readme-data.json');
const backupPath = dataFilePath + '.norm.bak';
const reportDir = path.resolve(__dirname, '../reports');
if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const reportFile = path.join(reportDir, `markdown-normalization-${timestamp}.json`);

if (!fs.existsSync(dataFilePath)) {
  console.error('Missing data file:', dataFilePath);
  process.exit(1);
}

const raw = fs.readFileSync(dataFilePath, 'utf8');
fs.writeFileSync(backupPath, raw, 'utf8');
const data = JSON.parse(raw);

const changes = [];

function normalizeMarkdown(text) {
  if (typeof text !== 'string' || text.trim() === '') return text;
  const original = text;

  // Normalize newlines and tabs
  text = text.replace(/\r\n?/g, '\n').replace(/\t/g, '  ');

  // Split into lines for targeted operations
  const lines = text.split('\n');
  const normalized = lines.map((line) => {
    let l = line;

    // Trim trailing whitespace
    l = l.replace(/[ \t]+$/g, '');

    // Ensure proper heading space (e.g., ##Heading -> ## Heading)
    l = l.replace(/^(#{1,6})([^ #\s])/g, '$1 $2');

    // Normalize bullet points: unify to '-' and single space after bullet
    const bulletMatch = l.match(/^(\s*)([*-])(\s+)(.+)$/);
    if (bulletMatch) {
      const leading = bulletMatch[1] || '';
      const content = bulletMatch[4].trim();
      // Cap indentation to 0/2/4/6 spaces to avoid runaway indents
      const safeIndent = ' '.repeat(Math.min(6, leading.length - (leading.length % 2)));
      l = `${safeIndent}- ${content}`;
      return l;
    }

    // Normalize numbered lists: '1) item' or '1.   item' -> '1. item'
    l = l.replace(/^(\s*)(\d+)[\.)]\s*(.+)$/g, (m, sp, num, rest) => `${sp}${num}. ${rest.trim()}`);

    return l;
  });
  text = normalized.join('\n');

  // Star cleanup
  // Replace sequences of 3+ '*' with '**'
  text = text.replace(/\*{3,}/g, '**');
  // Fix stray star around bold markers: '* **' or '** *' -> '**'
  text = text.replace(/\*\s+\*\*/g, '**').replace(/\*\*\s+\*/g, '**');
  // Remove isolated single star tokens between spaces/newlines
  text = text.replace(/(\s)\*(\s)/g, '$1$2');

  // Collapse 3+ blank lines into max 2
  text = text.replace(/\n{3,}/g, '\n\n');

  if (text !== original) {
    changes.push({ before: original.slice(0, 500), after: text.slice(0, 500) });
  }
  return text;
}

function shouldNormalizeCourse(course) {
  const slug = (course.slug || '').toLowerCase();
  return slug === 'english-1' || slug === 'english-3';
}

function applyNormalization(dataObj) {
  if (!Array.isArray(dataObj.courses)) return;
  dataObj.courses.forEach((course) => {
    if (!shouldNormalizeCourse(course)) return;
    const units = course.categories || course.units || [];
    (units || []).forEach((unit) => {
      const works = unit.works || [];
      works.forEach((w) => {
        if (typeof w.fullText === 'string') w.fullText = normalizeMarkdown(w.fullText);
        if (Array.isArray(w.faqs)) {
          w.faqs = w.faqs.map((f) => ({
            ...f,
            answer: typeof f.answer === 'string' ? normalizeMarkdown(f.answer) : f.answer,
          }));
        }
      });
    });
  });
}

applyNormalization(data);

fs.writeFileSync(reportFile, JSON.stringify({ timestamp, count: changes.length, samples: changes.slice(0, 100) }, null, 2), 'utf8');
fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Normalization complete. Changes:', changes.length);
console.log('Backup at:', backupPath);
console.log('Report:', reportFile);