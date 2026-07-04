// Build-time search index (Phase 2 Item 7). Generates public/search-index.json
// from readme-data.json (courses, works, lessons) plus fixed sections.
// Runs as part of `npm run build`; the client SearchDialog fetches the JSON.

import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/data/readme-data.json', 'utf-8'));
const entries = [];

// Fixed sections
const fixed = [
  ['ReadMe Home', 'Homepage', '/', 'home english courses'],
  ['All Courses', 'Catalogue', '/courses', 'catalogue browse'],
  ['Quick CEFR Assessment', 'Find your level in 15 minutes', '/assessment/quick', 'test level placement quick'],
  ['Level Assessment', 'Assessment options', '/assessment', 'test level placement'],
  ['IQ Test (Cognitive Assessment)', 'Reasoning, verbal, numerical profile', '/iq-test', 'iq cognitive reasoning'],
  ['Soft Skills', 'Communication, teamwork, leadership', '/soft-skills', 'soft skills blog career'],
];
for (const [title, sub, href, k] of fixed) entries.push({ title, sub, href, k });

for (const lvl of ['a1', 'a2', 'b1', 'b2', 'c1', 'c2']) {
  entries.push({
    title: `CEFR ${lvl.toUpperCase()}`,
    sub: 'CEFR English level',
    href: `/level/${lvl}`,
    k: `cefr level ${lvl} grammar vocabulary english`,
  });
}

for (const course of data.courses) {
  entries.push({
    title: course.name,
    sub: 'Course',
    href: `/courses/${course.slug}`,
    k: `course ${course.slug.replace(/-/g, ' ')} ${(course.description || '').slice(0, 80)}`.toLowerCase(),
  });
  for (const unit of course.categories ?? []) {
    for (const w of unit.works ?? []) {
      if (!w.slug || !w.title) continue;
      entries.push({
        title: w.title,
        sub: `${course.name} · ${unit.name}${w.author && !/unit\s+(iv|v|vi)\b/i.test(unit.name) ? ` · ${w.author}` : ''}`,
        href: `/courses/${course.slug}/${w.slug}`,
        k: `${w.author ?? ''} ${unit.name} ${course.name} ${(w.contentAnalysis?.themes ?? []).join(' ')}`.toLowerCase(),
      });
    }
  }
}

fs.mkdirSync('public', { recursive: true });
fs.writeFileSync('public/search-index.json', JSON.stringify(entries));
console.log(`Search index built: ${entries.length} entries → public/search-index.json`);
