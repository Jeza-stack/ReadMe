// Build-time search index (Phase 2 Item 7). Generates public/search-index.json
// from readme-data.json (courses, works, lessons) plus fixed sections.
// Runs as part of `npm run build`; the client SearchDialog fetches the JSON.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const data = JSON.parse(fs.readFileSync('src/data/readme-data.json', 'utf-8'));
const entries = [];

// Superseded course-shaped sections that now redirect to the hubs (see next.config.ts).
const RETIRED_COURSES = new Set(['ai-tools', 'chat-gpt-safety', 'academic-language']);

// Fixed sections
const fixed = [
  ['ReadMe Home', 'Homepage', '/', 'home english courses'],
  ['All Courses', 'Catalogue', '/courses', 'catalogue browse'],
  ['Quick CEFR Assessment', 'Find your level in 15 minutes', '/assessment/quick', 'test level placement quick'],
  ['Level Assessment', 'Assessment options', '/assessment', 'test level placement'],
  ['IQ Test (Cognitive Assessment)', 'Reasoning, verbal, numerical profile', '/iq-test', 'iq cognitive reasoning'],
  ['Soft Skills', 'Communication, teamwork, leadership', '/soft-skills', 'soft skills blog career'],
  ['CEFR English Academy', 'Lessons by level, A1 to C2', '/cefr', 'cefr academy level lessons english'],
  ['AI for Students', 'Fundamentals, prompts, integrity', '/ai-for-students', 'ai artificial intelligence students integrity prompts'],
  ['Academic Success', 'Essays, referencing, exams', '/academic-success', 'academic essay referencing exam study'],
  ['Soft Skills Programme', 'Communication and teamwork modules', '/soft-skills/programme', 'soft skills programme communication teamwork'],
  ['Mind Mapping', 'Build your first map in one sitting', '/mind-mapping', 'mind map mapping ideas planning'],
];
for (const [title, sub, href, k] of fixed) entries.push({ title, sub, href, k });

// MDX guide content (hubs + CEFR academy lessons): title from frontmatter, route from folder
const contentDirs = [
  ['content/ai-for-students', '/ai-for-students', 'AI for Students'],
  ['content/academic-success', '/academic-success', 'Academic Success'],
  ['content/soft-skills', '/soft-skills/programme', 'Soft Skills Programme'],
  ...['a1', 'a2', 'b1', 'b2', 'c1', 'c2'].map((l) => [`content/cefr/${l}`, `/cefr/${l}`, `CEFR ${l.toUpperCase()}`]),
];
for (const [dir, base, section] of contentDirs) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))) {
    const slug = path.basename(file, '.mdx');
    const fm = matter(fs.readFileSync(path.join(dir, file), 'utf-8')).data;
    entries.push({
      title: fm.title || slug.replace(/-/g, ' '),
      sub: section,
      href: `${base}/${slug}`,
      k: `${section} ${slug.replace(/-/g, ' ')} ${fm.description || ''}`.toLowerCase(),
    });
  }
}

// a1/a2 keep their /level lesson hubs; b1-c2 shells were retired in favour of /cefr.
for (const lvl of ['a1', 'a2', 'b1', 'b2', 'c1', 'c2']) {
  entries.push({
    title: `CEFR ${lvl.toUpperCase()}`,
    sub: 'CEFR English level',
    href: lvl === 'a1' || lvl === 'a2' ? `/level/${lvl}` : `/cefr/${lvl}`,
    k: `cefr level ${lvl} grammar vocabulary english`,
  });
}

for (const course of data.courses) {
  if (RETIRED_COURSES.has(course.slug)) continue;
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
