import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { ArrowRight, BookOpen, CalendarDays, Target, ChevronRight } from 'lucide-react';
import type { Course } from '@/lib/types';

// English I–IV course home — a textbook chapter list, not a marketing page.
// Fixed section order (Canonical Spec): Overview → Learning Outcomes →
// This Week → Weekly Modules → Prescribed Literary Works → Revision →
// Assessment Preparation → Further Reading. Empty sections are hidden
// until JB supplies content in content/courses/<key>/course.json.

const BURGUNDY = '#7B2D3B';

type CourseMeta = {
  outcomes?: string[];
  totalWeeks?: number;
  revision?: { label: string; href: string }[];
  assessmentPrep?: { label: string; href: string }[];
  furtherReading?: { label: string; href?: string }[];
};

const slugToKey: Record<string, string> = {
  'english-1': 'english-i',
  'english-2': 'english-ii',
  'english-3': 'english-iii',
  'english-4': 'english-iv',
};

function readJson<T>(p: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf-8')) as T;
  } catch {
    return null;
  }
}

function getPublishedWeeks(key: string): number[] {
  try {
    const dir = path.join(process.cwd(), 'content', 'courses', key);
    return fs
      .readdirSync(dir)
      .map((f) => /^week-(\d+)\.mdx$/.exec(f)?.[1])
      .filter(Boolean)
      .map(Number)
      .sort((a, b) => a - b);
  } catch {
    return [];
  }
}

function Section({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="mb-10">
      <h2
        id={id}
        className="flex items-center gap-2 font-headline text-xl font-bold text-white mb-4 pb-2 border-b border-white/10"
      >
        <Icon className="w-5 h-5" style={{ color: BURGUNDY }} aria-hidden />
        {title}
      </h2>
      {children}
    </section>
  );
}

export function EnglishCourseHome({ course }: { course: Course }) {
  const key = slugToKey[course.slug];
  const contentDir = path.join(process.cwd(), 'content');
  const meta =
    readJson<CourseMeta>(path.join(contentDir, 'courses', key, 'course.json')) ?? {};
  const publishedWeeks = getPublishedWeeks(key);

  const linkList = (items: { label: string; href?: string }[]) => (
    <ul className="space-y-2">
      {items.map((r) => (
        <li key={r.label} className="flex items-center gap-2 text-sm">
          <ChevronRight className="w-4 h-4 text-white/30" />
          {r.href ? (
            <Link href={r.href} className="text-cyan-300 hover:text-cyan-200">
              {r.label}
            </Link>
          ) : (
            <span className="text-slate-300">{r.label}</span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="bg-[color:var(--ce-deep-navy,#0E141F)] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* 1 — Overview */}
        <header className="mb-10" style={{ borderTop: `4px solid ${BURGUNDY}` }}>
          <p className="mt-4 text-xs uppercase tracking-widest text-slate-400">
            English Courses
          </p>
          <h1 className="font-headline text-4xl font-bold text-white mt-1">{course.name}</h1>
          <p className="text-slate-300 mt-3 leading-relaxed">{course.description}</p>
        </header>

        {/* 2 — Course Learning Outcomes */}
        {meta.outcomes && meta.outcomes.length > 0 && (
          <Section id="outcomes" icon={Target} title="Course Learning Outcomes">
            <ul className="space-y-2">
              {meta.outcomes.map((o, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                  <span className="font-mono text-white/40">{i + 1}.</span>
                  {o}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* 3 — Weekly Modules */}
        {publishedWeeks.length > 0 && (
          <Section id="weeks" icon={CalendarDays} title="Weekly Modules">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {publishedWeeks.map((w) => (
                <Link
                  key={w}
                  href={`/courses/${course.slug}/week/${w}`}
                  className="rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 p-3 text-center transition-colors"
                >
                  <span className="text-xs uppercase tracking-widest block text-white/40">Week</span>
                  <span className="font-headline font-bold text-lg">{w}</span>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* 5 — Prescribed Literary Works */}
        <Section id="works" icon={BookOpen} title="Prescribed Literary Works">
          <div className="space-y-6">
            {course.categories.map((unit) => (
              <div key={unit.name}>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-3">
                  {unit.name}
                </h3>
                <ul className="space-y-2">
                  {unit.works.map((w) => (
                    <li key={w.slug}>
                      <Link
                        href={`/courses/${course.slug}/${w.slug}`}
                        className="group flex items-center justify-between rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-3 transition-colors"
                      >
                        <span>
                          <span className="block text-white font-medium group-hover:text-cyan-300 transition-colors">
                            {w.title}
                          </span>
                          {w.author && !/unit\s+(iv|v|vi)\b/i.test(unit.name) && (
                            <span className="block text-xs text-slate-400 mt-0.5">{w.author}</span>
                          )}
                        </span>
                        <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* 6 — Revision Resources */}
        {meta.revision && meta.revision.length > 0 && (
          <Section id="revision" icon={Target} title="Revision Resources">
            {linkList(meta.revision)}
          </Section>
        )}

        {/* 7 — Assessment Preparation */}
        {meta.assessmentPrep && meta.assessmentPrep.length > 0 && (
          <Section id="assessment" icon={Target} title="Assessment Preparation">
            {linkList(meta.assessmentPrep)}
          </Section>
        )}

        {/* 8 — Further Reading */}
        {meta.furtherReading && meta.furtherReading.length > 0 && (
          <Section id="further-reading" icon={BookOpen} title="Further Reading">
            {linkList(meta.furtherReading)}
          </Section>
        )}
      </div>
    </div>
  );
}
