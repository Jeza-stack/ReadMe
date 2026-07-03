import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpen, MessageCircleQuestion, RotateCcw } from 'lucide-react';
import { getCourse } from '@/lib/data';

// Weekly module page: reads content/courses/<key>/week-<n>.mdx.
// Interim frontmatter parser until the MDX pipeline (Phase 2 Item 5)
// replaces body rendering with real MDX.

const slugToKey: Record<string, string> = {
  'english-1': 'english-i',
  'english-2': 'english-ii',
  'english-3': 'english-iii',
  'english-4': 'english-iv',
};

type WeekDoc = {
  title: string;
  readBefore: string[];
  discussionQuestion: string;
  revision: string[];
  body: string;
};

function parseWeekFile(raw: string): WeekDoc {
  const fm = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(raw);
  const head = fm?.[1] ?? '';
  const body = (fm?.[2] ?? raw).trim();
  const get = (k: string) => new RegExp(`^${k}:\\s*"?([^"\\n]*)"?\\s*$`, 'm').exec(head)?.[1] ?? '';
  const getList = (k: string) => {
    const inline = new RegExp(`^${k}:\\s*\\[([^\\]]*)\\]`, 'm').exec(head)?.[1];
    if (inline !== undefined)
      return inline
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    return [];
  };
  return {
    title: get('title'),
    readBefore: getList('readBefore'),
    discussionQuestion: get('discussionQuestion'),
    revision: getList('revision'),
    body,
  };
}

export function generateStaticParams() {
  const params: { courseSlug: string; week: string }[] = [];
  for (const [slug, key] of Object.entries(slugToKey)) {
    const dir = path.join(process.cwd(), 'content', 'courses', key);
    try {
      for (const f of fs.readdirSync(dir)) {
        const m = /^week-(\d+)\.mdx$/.exec(f);
        if (m) params.push({ courseSlug: slug, week: m[1] });
      }
    } catch {
      /* no weeks published yet */
    }
  }
  return params;
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

  const file = path.join(process.cwd(), 'content', 'courses', key, `week-${week}.mdx`);
  let doc: WeekDoc | null = null;
  try {
    doc = parseWeekFile(fs.readFileSync(file, 'utf-8'));
  } catch {
    doc = null;
  }

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
            <h1 className="font-headline text-3xl font-bold text-white mt-1 mb-8">{doc.title}</h1>

            {doc.readBefore.length > 0 && (
              <section className="mb-8">
                <h2 className="flex items-center gap-2 font-headline text-lg font-bold text-white mb-3">
                  <BookOpen className="w-5 h-5 text-[#7B2D3B]" /> Read before class
                </h2>
                <ul className="space-y-2">
                  {doc.readBefore.map((slug) => (
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
              <section className="mb-8 text-slate-300 leading-relaxed space-y-4">
                {doc.body.split(/\n\n+/).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>
            )}

            {doc.discussionQuestion && (
              <section className="mb-8">
                <h2 className="flex items-center gap-2 font-headline text-lg font-bold text-white mb-3">
                  <MessageCircleQuestion className="w-5 h-5 text-[#7B2D3B]" /> Tutorial discussion
                </h2>
                <blockquote className="rounded-xl border border-white/10 bg-white/5 p-5 text-slate-200 italic leading-relaxed">
                  {doc.discussionQuestion}
                </blockquote>
              </section>
            )}

            {doc.revision.length > 0 && (
              <section className="mb-8">
                <h2 className="flex items-center gap-2 font-headline text-lg font-bold text-white mb-3">
                  <RotateCcw className="w-5 h-5 text-[#7B2D3B]" /> Revision pointers
                </h2>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                  {doc.revision.map((r, i) => (
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
