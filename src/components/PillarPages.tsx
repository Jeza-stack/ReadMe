import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getContentDoc, listContent } from '@/lib/content';
import { PILLARS, type PillarKey, type GuideFrontmatter } from '@/lib/pillars';

// Shared renderers for content-driven pillar pages (AI for Students,
// Academic Success, Soft Skills programme). Same content pipeline and
// visual language as the course week pages.

const slugOf = (file: string) => file.split('/').pop()!.replace(/\.mdx$/, '');

export function pillarGuides(pillar: PillarKey) {
  return listContent(pillar)
    .map((file) => {
      const doc = getContentDoc<GuideFrontmatter>(file);
      return doc ? { slug: slugOf(file), ...doc } : null;
    })
    .filter((d) => d !== null);
}

export function PillarIndex({ pillar, heading }: { pillar: PillarKey; heading?: string }) {
  const p = PILLARS[pillar];
  const guides = pillarGuides(pillar);

  return (
    <div className="bg-[color:var(--ce-deep-navy,#0E141F)] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-xs uppercase tracking-widest" style={{ color: p.colour }}>
          ReadMe · {p.name}
        </p>
        <h1 className="font-headline text-4xl font-bold text-white mt-2">
          {heading ?? p.name}
        </h1>
        <p className="text-slate-300 mt-4 max-w-2xl leading-relaxed">{p.blurb}</p>

        {guides.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-400">
            Guides for this pillar are in development — the first set publishes soon.
          </div>
        ) : (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`${p.basePath}/${g.slug}`}
                  className="block h-full rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 p-5 transition-colors"
                >
                  {g.frontmatter.section && (
                    <span
                      className="text-[11px] uppercase tracking-wider font-bold"
                      style={{ color: p.colour }}
                    >
                      {g.frontmatter.section}
                    </span>
                  )}
                  <h2 className="font-headline text-lg font-bold text-white mt-1">
                    {g.frontmatter.title}
                  </h2>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-cyan-300">
                    Read the guide <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function PillarGuide({
  pillar,
  slug,
  backHref,
  backLabel,
}: {
  pillar: PillarKey;
  slug: string;
  backHref: string;
  backLabel: string;
}) {
  const p = PILLARS[pillar];
  const doc = getContentDoc<GuideFrontmatter>(`${pillar}/${slug}.mdx`);
  if (!doc) notFound();

  const related = (doc.frontmatter.related ?? []).slice(0, 3);

  return (
    <div className="bg-[color:var(--ce-deep-navy,#0E141F)] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-sm text-cyan-300 hover:text-cyan-200 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> {backLabel}
        </Link>

        <p className="text-xs uppercase tracking-widest" style={{ color: p.colour }}>
          {p.name}
          {doc.frontmatter.section ? ` · ${doc.frontmatter.section}` : ''}
        </p>
        <h1 className="font-headline text-3xl font-bold text-white mt-1">
          {doc.frontmatter.title}
        </h1>
        <p className="text-xs text-slate-500 mt-2">Updated {doc.frontmatter.updated}</p>

        <article className="mt-8 prose prose-invert prose-slate max-w-none leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.body}</ReactMarkdown>
        </article>

        {related.length > 0 && (
          <section className="mt-10 border-t border-white/10 pt-6">
            <h2 className="flex items-center gap-2 font-headline text-lg font-bold text-white mb-3">
              <BookOpen className="w-5 h-5" style={{ color: p.colour }} /> What next
            </h2>
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r}>
                  <Link
                    href={r.startsWith('/') ? r : `${p.basePath}/${r}`}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-3 text-white transition-colors"
                  >
                    {r.startsWith('/') ? r.split('/').pop()!.replace(/-/g, ' ') : r.replace(/-/g, ' ')}
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
