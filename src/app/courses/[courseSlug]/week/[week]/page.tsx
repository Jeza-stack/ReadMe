import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpen, MessageCircleQuestion, RotateCcw } from 'lucide-react';
import { getCourse } from '@/lib/data';
import { getContentDoc, listContent } from '@/lib/content';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Weekly module page — content/courses/<key>/week-<n>.mdx via the content
// pipeline (frontmatter validated against course-week.schema.json at build).

const slugToKey: Record<string, string> = {
  'english-1': 'english-i',
  'english-2': 'english-ii',
  'english-3': 'english-iii',
  'english-4': 'english-iv',
};
const keyToSlug = Object.fromEntries(Object.entries(slugToKey).map(([a, b]) => [b, a]));

type WeekFrontmatter = {
  course: string;
  week: number;
  title: string;
  readBefore?: string[];
  discussionQuestion: string;
  revision?: string[];
  updated: string;
};

export function generateStaticParams() {
  return listContent('courses')
    .map((file) => /^courses\/([^/]+)\/week-(\d+)\.mdx$/.exec(file))
    .filter(Boolean)
    .map((m) => ({ courseSlug: keyToSlug[m![1]] ?? m![1], week: m![2] }))
    .filter((p) => p.courseSlug in slugToKey);
}

export default async function WeekPage({
  params,
}: {
  params: Promise<{ courseSlug: string; week: string }>;
}) {
  const { courseSlug, week } = await params;
  const key = slugToKey[courseSlug];
  const course = getCourse(courseSlug);
  if (!key || !course) notFound();

  const doc = getContentDoc<WeekFrontmatter>(`courses/${key}/week-${week}.mdx`);

  return (
    <div className="bg-[color:var(--ce-deep-navy,#0E141F)] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link
          href={`/courses/${courseSlug}`}
          className="inline-flex items-center gap-1 text-sm text-cyan-300 hover:text-cyan-200 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> {course.name}
        </Link>

        <p className="text-xs uppercase tracking-widest text-slate-400">
          {course.name} · Week {week}
        </p>

        {doc ? (
          <>
            <h1 className="font-headline text-3xl font-bold text-white mt-1 mb-8">
              {doc.frontmatter.title}
            </h1>

            {(doc.frontmatter.readBefore?.length ?? 0) > 0 && (
              <section className="mb-8">
                <h2 className="flex items-center gap-2 font-headline text-lg font-bold text-white mb-3">
                  <BookOpen className="w-5 h-5 text-[#7B2D3B]" /> Read before class
                </h2>
                <ul className="space-y-2">
                  {doc.frontmatter.readBefore!.map((slug) => (
                    <li key={slug}>
                      <Link
                        href={`/courses/${courseSlug}/${slug}`}
                        className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-3 text-white transition-colors"
                      >
                        {slug.replace(/-/g, ' ')}
                        <ArrowRight className="w-4 h-4 text-cyan-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {doc.body && (
              <section className="mb-8 prose prose-invert prose-slate max-w-none leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.body}</ReactMarkdown>
              </section>
            )}

            {doc.frontmatter.discussionQuestion && (
              <section className="mb-8">
                <h2 className="flex items-center gap-2 font-headline text-lg font-bold text-white mb-3">
                  <MessageCircleQuestion className="w-5 h-5 text-[#7B2D3B]" /> Tutorial discussion
                </h2>
                <blockquote className="rounded-xl border border-white/10 bg-white/5 p-5 text-slate-200 italic leading-relaxed">
                  {doc.frontmatter.discussionQuestion}
                </blockquote>
              </section>
            )}

            {(doc.frontmatter.revision?.length ?? 0) > 0 && (
              <section className="mb-8">
                <h2 className="flex items-center gap-2 font-headline text-lg font-bold text-white mb-3">
                  <RotateCcw className="w-5 h-5 text-[#7B2D3B]" /> Revision pointers
                </h2>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                  {doc.frontmatter.revision!.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </section>
            )}
          </>
        ) : (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <h1 className="font-headline text-2xl font-bold text-white">
              Week {week} — not yet published
            </h1>
            <p className="text-slate-400 mt-3 text-sm leading-relaxed max-w-md mx-auto">
              Weekly modules appear here as the semester progresses. In the
              meantime, all prescribed literary works are available on the
              course page.
            </p>
            <Link
              href={`/courses/${courseSlug}`}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-2.5 text-sm transition-colors"
            >
              Back to {course.name} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
