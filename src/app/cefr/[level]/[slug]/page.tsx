import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getContentDoc, listContent } from '@/lib/content';

type LessonFm = {
  title: string;
  level: string;
  skill: string;
  canDo: string[];
  related?: string[];
  updated: string;
};

export function generateStaticParams() {
  return listContent('cefr')
    .map((file) => /^cefr\/([^/]+)\/([^/]+)\.mdx$/.exec(file))
    .filter(Boolean)
    .map((m) => ({ level: m![1], slug: m![2] }));
}

export default async function CefrLessonPage({
  params,
}: {
  params: Promise<{ level: string; slug: string }>;
}) {
  const { level, slug } = await params;
  const doc = getContentDoc<LessonFm>(`cefr/${level}/${slug}.mdx`);
  if (!doc) notFound();

  const related = (doc.frontmatter.related ?? []).slice(0, 3);

  return (
    <div className="bg-[color:var(--ce-deep-navy,#0E141F)] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link
          href={`/cefr/${level}`}
          className="inline-flex items-center gap-1 text-sm text-cyan-300 hover:text-cyan-200 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> {level.toUpperCase()} Academy
        </Link>

        <p className="text-xs uppercase tracking-widest text-[#38BDF8]">
          CEFR {level.toUpperCase()} · {doc.frontmatter.skill}
        </p>
        <h1 className="font-headline text-3xl font-bold text-white mt-1">
          {doc.frontmatter.title}
        </h1>
        <p className="text-xs text-slate-500 mt-2">Updated {doc.frontmatter.updated}</p>

        <section className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
          <h2 className="flex items-center gap-2 text-sm font-bold text-cyan-300">
            <CheckCircle className="w-4 h-4" /> After this lesson you can
          </h2>
          <ul className="mt-2 space-y-1">
            {doc.frontmatter.canDo.map((cd, i) => (
              <li key={i} className="text-sm text-slate-200 leading-relaxed">
                · {cd}
              </li>
            ))}
          </ul>
        </section>

        <article className="mt-8 prose prose-invert prose-slate max-w-none leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.body}</ReactMarkdown>
        </article>

        {related.length > 0 && (
          <section className="mt-10 border-t border-white/10 pt-6">
            <h2 className="font-headline text-lg font-bold text-white mb-3">What next</h2>
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r}>
                  <Link
                    href={r.startsWith('/') ? r : `/cefr/${level}/${r}`}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-3 text-white transition-colors"
                  >
                    {(r.startsWith('/') ? r.split('/').pop()! : r).replace(/-/g, ' ')}
                    <ArrowRight className="w-4 h-4 text-cyan-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
