// JSON → MDX migration (Item 6). Course-by-course per JB's instruction:
//   node scripts/migrate-json-to-mdx.mjs english-1
// Literary works (Units I–III)   → content/literature/<slug>.mdx
// Language lessons (Units IV–VI) → content/courses/<key>/lessons/<slug>.mdx
// Full structured data (analysis, vocab, faqs, quiz) is preserved in
// frontmatter; fullText becomes the body. readme-data.json is NOT modified
// (originals stay in place until the course is verified and switched over).

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const courseSlug = process.argv[2];
if (!courseSlug) {
  console.error('Usage: node scripts/migrate-json-to-mdx.mjs <course-slug e.g. english-1>');
  process.exit(1);
}

const KEY = { 'english-1': 'english-i', 'english-2': 'english-ii', 'english-3': 'english-iii', 'english-4': 'english-iv' }[courseSlug];
if (!KEY) { console.error(`Unknown course: ${courseSlug}`); process.exit(1); }

const LANG_UNIT = /unit\s+(iv|v|vi)\b/i;

function litType(unitName, title) {
  const u = unitName.toLowerCase();
  if (u.includes('poetry')) return 'poem';
  if (u.includes('short stories')) return 'short-story';
  if (u.includes('shakespeare') || u.includes('plays')) return 'play';
  if (u.includes('speeches')) return 'speech';
  if (u.includes('interview')) return 'interview';
  if (u.includes('life writing')) return 'life-writing';
  if (u.includes('fiction')) return 'prose';
  return 'prose';
}

const data = JSON.parse(fs.readFileSync('src/data/readme-data.json', 'utf-8'));
const course = data.courses.find((c) => c.slug === courseSlug);
if (!course) { console.error(`Course ${courseSlug} not in readme-data.json`); process.exit(1); }

const today = new Date().toISOString().slice(0, 10);
let litCount = 0, lessonCount = 0;

for (const unit of course.categories) {
  const isLang = LANG_UNIT.test(unit.name);
  for (const w of unit.works) {
    const shared = {
      // structured guide data preserved verbatim
      ...(w.image ? { image: w.image } : {}),
      ...(w.videoUrl ? { videoUrl: w.videoUrl } : {}),
      ...(w.videoEmbedId ? { videoEmbedId: w.videoEmbedId } : {}),
      ...(w.difficultWords?.length ? { difficultWords: w.difficultWords } : {}),
      ...(w.authorInfo ? { authorInfo: w.authorInfo } : {}),
      ...(w.contentAnalysis ? { contentAnalysis: w.contentAnalysis } : {}),
      ...(w.faqs?.length ? { faqs: w.faqs } : {}),
      ...(w.quiz?.length ? { quiz: w.quiz } : {}),
      ...(w.lessonMeta ? { lessonMeta: w.lessonMeta } : {}),
      ...(w.commonMistakes?.length ? { commonMistakes: w.commonMistakes } : {}),
      ...(w.workedExamples?.length ? { workedExamples: w.workedExamples } : {}),
      updated: today,
    };

    let fm, outPath;
    if (isLang) {
      fm = {
        title: w.title,
        slug: w.slug,
        course: KEY,
        unit: unit.name,
        summary: w.contentAnalysis?.summary?.slice(0, 300) || `Language and skills lesson: ${w.title}.`,
        ...shared,
      };
      outPath = path.join('content', 'courses', KEY, 'lessons', `${w.slug}.mdx`);
    } else {
      fm = {
        title: w.title,
        slug: w.slug,
        author: w.author,
        courses: [KEY],
        units: [unit.name],
        type: litType(unit.name, w.title),
        summary: (w.contentAnalysis?.summary || `${w.title} by ${w.author}.`).slice(0, 300),
        themes: w.contentAnalysis?.themes ?? [],
        ...shared,
      };
      outPath = path.join('content', 'literature', `${w.slug}.mdx`);
    }

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, matter.stringify((w.fullText || '').trim() + '\n', fm));
    isLang ? lessonCount++ : litCount++;
    console.log(`  ${isLang ? 'lesson    ' : 'literature'} → ${outPath}`);
  }
}
console.log(`\n${courseSlug}: ${litCount} literature guides + ${lessonCount} lessons migrated.`);
