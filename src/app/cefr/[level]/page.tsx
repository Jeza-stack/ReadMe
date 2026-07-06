import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { getContentDoc, listContent } from '@/lib/content';

// CEFR level academy — lessons grouped by skill, can-do overview drawn from
// lesson frontmatter (content/cefr/<level>/*.mdx, cefr-lesson schema).

const LEVELS: Record<string, string> = {
  a1: 'A1 · Beginner',
  a2: 'A2 · Elementary',
  b1: 'B1 · Intermediate',
  b2: 'B2 · Upper Intermediate',
  c1: 'C1 · Advanced',
  c2: 'C2 · Proficiency',
};

const SKILL_ORDER = ['grammar', 'vocabulary', 'reading', 'listening', 'speaking', 'writing', 'academic'];

type LessonFm = {
  title: string;
  level: string;
  skill: string;
  canDo: string[];
  updated: string;
};

export function generateStaticParams() {
  return Object.keys(LEVELS).map((level) => ({ level }));
}

export default async function CefrLevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  if (!(level in LEVELS)) notFound();

  const lessons = listContent(`cefr/${level}`)
    .map((file) => {
      const doc = getContentDoc<LessonFm>(file);
      return doc
        ? { slug: file.split('/').pop()!.replace(/\.mdx$/, ''), fm: doc.frontmatter }
        : null;
    })
    .filter((l) => l !== null);

  const bySkill = new Map<string, typeof lessons>();
  for (const l of lessons) {
    const list = bySkill.get(l.fm.skill) ?? [];
    list.push(l);
    bySkill.set(l.fm.skill, list);
  }

  return (
    <div className="bg-[color:var(--ce-deep-navy,#0E141F)] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/cefr"
          className="inline-flex items-center gap-1 text-sm text-cyan-300 hover:text-cyan-200 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> CEFR Academy
        </Link>

        <p className="text-xs uppercase tracking-widest text-[#38BDF8]">CEFR Academy</p>
        <h1 className="font-headline text-4xl font-bold text-white mt-2">{LEVELS[level]}</h1>

        {lessons.length > 0 && (
          <section className="mt-8">
            <h2 className="flex items-center gap-2 font-headline text-lg font-bold text-white mb-3">
              <CheckCircle className="w-5 h-5 text-[#38BDF8]" /> What you can do at this level
            </h2>
            <ul className="space-y-1.5">
              {lessons.flatMap((l) => l.fm.canDo).map((cd, i) => (
                <li key={i} className="text-sm text-slate-300 leading-relaxed">
                  · {cd}
                </li>
              ))}
            </ul>
          </section>
        )}

        {lessons.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <h2 className="font-headline text-xl font-bold text-white">
              {LEVELS[level]} lessons are in development
            </h2>
            <p className="text-slate-400 mt-3 text-sm leading-relaxed max-w-md mx-auto">
              The B1 academy publishes first; the other levels follow the same
              can-do framework. Meanwhile, take the level assessment or explore
              the English courses.
            </p>
            <Link
              href="/assessment"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-2.5 text-sm transition-colors"
            >
              Find your level <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          SKILL_ORDER.filter((s) => bySkill.has(s)).map((skill) => (
            <section key={skill} className="mt-10">
              <h2 className="font-headline text-lg font-bold text-white capitalize mb-3">{skill}</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {bySkill.get(skill)!.map((l) => (
                  <li key={l.slug}>
                    <Link
                      href={`/cefr/${level}/${l.slug}`}
                      className="block h-full rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 p-4 transition-colors"
                    >
                      <h3 className="font-headline font-bold text-white">{l.fm.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{l.fm.canDo[0]}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
