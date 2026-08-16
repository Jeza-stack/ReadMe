// IQ answer-key gate: every question in src/app/iq-test/data.ts must have exactly
// one correct option, 4 clean A-D options, and non-empty text. Loop-readable
// output; exits 1 while any question fails. Run: node scripts/check-iq.mjs
//
// ponytail: slices the IQ_QUESTIONS array literal out of the .ts file as text and
// evals it — cheaper than a TS toolchain. Ceiling: the file must stay a plain
// object-literal array (unquoted keys, single quotes, trailing commas OK). If it
// ever gains computed values or imports, swap this for a real tsx import.

import fs from 'fs';

const src = fs.readFileSync('src/app/iq-test/data.ts', 'utf-8');
const start = src.indexOf('[', src.indexOf('IQ_QUESTIONS'));
const end = src.lastIndexOf('];');
if (start < 0 || end < 0) { console.log('IQ CHECK: could not locate IQ_QUESTIONS array'); process.exit(1); }
const questions = new Function(`return ${src.slice(start, end + 1)}`)();

const IDS = ['A', 'B', 'C', 'D'];
const failing = [];
const seenId = new Set();

for (const q of questions) {
  const problems = [];
  if (seenId.has(q.id)) problems.push('duplicate id');
  seenId.add(q.id);
  if (!q.prompt?.trim()) problems.push('empty prompt');
  if (!q.explanation?.trim()) problems.push('empty explanation');

  const opts = q.options ?? [];
  if (opts.length !== 4) problems.push(`${opts.length} options, need 4`);
  const ids = opts.map((o) => o.id).sort();
  if (ids.join('') !== IDS.join('')) problems.push(`option ids ${ids.join('')} != ABCD`);
  if (opts.some((o) => !o.content?.trim())) problems.push('empty option content');

  const correct = opts.filter((o) => o.isCorrect).length;
  if (correct !== 1) problems.push(`${correct} correct answers, need exactly 1`);

  if (q.type === 'matrix' && !q.visuals?.length) problems.push('matrix without visuals');
  if (q.type === 'sequence' && !q.sequence?.length) problems.push('sequence without sequence');

  if (problems.length) failing.push({ id: q.id, problems });
}

for (const f of failing) console.log(`FAIL q${f.id}: ${f.problems.join('; ')}`);
console.log(`IQ CHECK: ${questions.length - failing.length}/${questions.length} passing, ${failing.length} failing`);
process.exit(failing.length ? 1 : 0);
