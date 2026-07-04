import type { LiteraryWork } from '@/lib/types';
import { getContentDoc } from '@/lib/content';

// MDX-first work loader (Item 6 migration). If a work exists under
// content/, it is served from there; otherwise callers fall back to
// readme-data.json. This lets migration proceed course-by-course with
// zero risk to unmigrated courses.

const slugToKey: Record<string, string> = {
  'english-1': 'english-i',
  'english-2': 'english-ii',
  'english-3': 'english-iii',
  'english-4': 'english-iv',
};

type WorkFrontmatter = Partial<LiteraryWork> & {
  title: string;
  slug: string;
  // literature files
  courses?: string[];
  units?: string[];
  // lesson files
  course?: string;
  unit?: string;
  summary?: string;
  themes?: string[];
};

function toWork(fm: WorkFrontmatter, body: string, unitName: string): LiteraryWork {
  return {
    title: fm.title,
    slug: fm.slug,
    category: unitName,
    author: fm.author ?? '',
    fullText: body,
    image: fm.image,
    videoUrl: fm.videoUrl,
    videoEmbedId: fm.videoEmbedId,
    difficultWords: fm.difficultWords ?? [],
    authorInfo: fm.authorInfo,
    contentAnalysis: fm.contentAnalysis,
    faqs: fm.faqs ?? [],
    quiz: fm.quiz ?? [],
    lessonMeta: fm.lessonMeta,
    commonMistakes: fm.commonMistakes,
    workedExamples: fm.workedExamples,
    copyright: fm.copyright,
  };
}

/** Load a work from content/ if migrated; null if not (caller falls back to JSON). */
export function getWorkFromContent(courseSlug: string, workSlug: string): LiteraryWork | null {
  const key = slugToKey[courseSlug];
  if (!key) return null;

  const lit = getContentDoc<WorkFrontmatter>(`literature/${workSlug}.mdx`);
  if (lit && (lit.frontmatter.courses ?? []).includes(key)) {
    return toWork(lit.frontmatter, lit.body, lit.frontmatter.units?.[0] ?? '');
  }

  const lesson = getContentDoc<WorkFrontmatter>(`courses/${key}/lessons/${workSlug}.mdx`);
  if (lesson) {
    return toWork(lesson.frontmatter, lesson.body, lesson.frontmatter.unit ?? '');
  }

  return null;
}
