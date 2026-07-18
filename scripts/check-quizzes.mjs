// Quiz depth gate: every work must have 5-8 valid quiz questions in the store
// the page ACTUALLY renders from — MDX frontmatter if the work is migrated to
// content/ (mirrors src/lib/workContent.ts MDX-first resolution), else
// readme-data.json. Loop-readable output; exits 1 while any work fails.
// Run: npm run check:quizzes

import fs from 'fs';
import matter from 'gray-matter';

const data = JSON.parse(fs.readFileSync('src/data/readme-data.json', 'utf-8'));

const SLUG_TO_KEY = { 'english-1': 'english-i', 'english-2': 'english-ii', 'english-3': 'english-iii', 'english-4': 'english-iv' };

// Same resolution as getWorkFromContent(): literature file (gated on courses
// list) first, then course lesson file; null = not migrated, JSON serves it.
function mdxQuiz(courseSlug, workSlug) {
  const key = SLUG_TO_KEY[courseSlug];
  if (!key) return null;
  const lit = `content/literature/${workSlug}.mdx`;
  if (fs.existsSync(lit)) {
    const fm = matter.read(lit).data;
    if ((fm.courses ?? []).includes(key)) return { quiz: fm.quiz ?? [], source: lit };
  }
  const lesson = `content/courses/${key}/lessons/${workSlug}.mdx`;
  if (fs.existsSync(lesson)) return { quiz: matter.read(lesson).data.quiz ?? [], source: lesson };
  return null;
}

const MIN = 5;
const MAX = 8;
// Superseded courses whose pages redirect to the hubs (see next.config.ts) —
// their works are unreachable, so quiz depth doesn't apply.
const RETIRED_COURSES = new Set(['ai-tools', 'chat-gpt-safety', 'academic-language']);
const failing = [];
let total = 0;

for (const course of data.courses) {
  if (RETIRED_COURSES.has(course.slug)) continue;
  for (const cat of course.categories ?? []) {
    for (const work of cat.works ?? []) {
      if (!work.slug) continue;
      total++;
      const resolved = mdxQuiz(course.slug, work.slug);
      const quiz = resolved ? resolved.quiz : (work.quiz ?? []);
      const problems = [];

      if (quiz.length < MIN) problems.push(`only ${quiz.length} question(s), need >=${MIN}`);
      if (quiz.length > MAX) console.warn(`WARN ${course.slug}/${work.slug}: ${quiz.length} questions (> ${MAX})`);

      const seen = new Set();
      quiz.forEach((q, i) => {
        if (!q.question?.trim()) problems.push(`q${i + 1}: empty question`);
        if (!Array.isArray(q.options) || q.options.length < 3) problems.push(`q${i + 1}: needs >=3 options`);
        else if (!q.options.includes(q.correctAnswer)) problems.push(`q${i + 1}: correctAnswer not in options`);
        if (!q.explanation?.trim()) problems.push(`q${i + 1}: empty explanation`);
        const key = (q.question ?? '').trim().toLowerCase();
        if (seen.has(key)) problems.push(`q${i + 1}: duplicate question`);
        seen.add(key);
      });

      if (problems.length) failing.push({ id: `${course.slug}/${work.slug}`, problems });
    }
  }
}

for (const f of failing) console.log(`FAIL ${f.id}: ${f.problems.join('; ')}`);
console.log(`QUIZ CHECK: ${total - failing.length}/${total} passing, ${failing.length} failing${failing.length ? ': ' + failing.map((f) => f.id).join(', ') : ''}`);
process.exit(failing.length ? 1 : 0);
