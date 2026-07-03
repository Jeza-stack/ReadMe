import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import {
  BookOpen,
  Globe,
  Cpu,
  Users,
  GraduationCap,
  BrainCircuit,
  ArrowRight,
} from 'lucide-react';

// ── Data ────────────────────────────────────────────────────────

type Semester = {
  semester: string;
  weeks: Record<string, number>;
};

function getSemester(): Semester {
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), 'content', 'semester.json'),
      'utf-8'
    );
    return JSON.parse(raw);
  } catch {
    return { semester: '', weeks: {} };
  }
}

const englishCourses = [
  { slug: 'english-1', key: 'english-i', name: 'English I', blurb: 'Foundations: poetry, prose, short stories, and workplace English.' },
  { slug: 'english-2', key: 'english-ii', name: 'English II', blurb: 'Poetry, prose, fiction, academic writing, and contemporary issues.' },
  { slug: 'english-3', key: 'english-iii', name: 'English III', blurb: 'Poetry, Shakespeare, great speeches, and professional communication.' },
  { slug: 'english-4', key: 'english-iv', name: 'English IV', blurb: 'Life writing, one-act plays, interviews, and advanced academic English.' },
];

const pillars = [
  { name: 'CEFR English', href: '/courses/cefr-english', accent: '#0369A1', icon: Globe, blurb: 'A1 to C2 — grammar, vocabulary, and the four skills, level by level.' },
  { name: 'AI for Students', href: '/courses/ai-tools', accent: '#6D28D9', icon: Cpu, blurb: 'Use AI well: study skills, assignments, ethics, and academic integrity.' },
  { name: 'Soft Skills', href: '/soft-skills', accent: '#059669', icon: Users, blurb: 'Communication, teamwork, leadership, and career readiness.' },
  { name: 'Academic Success', href: '/courses/academic-language', accent: '#C2540A', icon: GraduationCap, blurb: 'Essay writing, referencing, critical thinking, and exam preparation.' },
  { name: 'IQ Test (Cognitive Assessment)', href: '/iq-test', accent: '#475569', icon: BrainCircuit, blurb: 'A structured profile of your reasoning, verbal, and numerical strengths.' },
  { name: 'All Courses', href: '/courses', accent: '#6B7280', icon: BookOpen, blurb: 'Browse the full catalogue of guides, courses, and assessments.' },
];

// ── Page (server component — no client JS, no loading flash) ────

export default function HomePage() {
  const semester = getSemester();
  const activeWeeks = englishCourses.filter(
    (c) => (semester.weeks?.[c.key] ?? 0) > 0
  );

  return (
    <div className="bg-[color:var(--ce-deep-navy,#0E141F)]">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-14 pb-10 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-white leading-tight">
          Your courses. Your guides. One place.
        </h1>
        <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
          Free, academically rigorous resources for English Literature, English
          Language, and AI literacy — built by a lecturer, for students.
        </p>
        <div className="mt-6">
          <Link
            href="/assessment/quick"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-7 py-3 transition-colors"
          >
            Find your CEFR level in 15 minutes — free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* This Week — only when the semester is running */}
      {activeWeeks.length > 0 && (
        <section aria-labelledby="this-week" className="max-w-5xl mx-auto px-4 pb-10">
          <h2 id="this-week" className="font-headline text-xl font-bold text-white mb-1">
            This Week{semester.semester ? ` · ${semester.semester}` : ''}
          </h2>
          <p className="text-sm text-slate-400 mb-4">
            What to read before your next class.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeWeeks.map((c) => (
              <Link
                key={c.slug}
                href={`/courses/${c.slug}`}
                className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 p-4 transition-colors"
                style={{ borderTop: '3px solid #7B2D3B' }}
              >
                <div className="text-xs uppercase tracking-widest text-slate-400">
                  Week {semester.weeks[c.key]}
                </div>
                <div className="font-headline font-bold text-white mt-1">{c.name}</div>
                <div className="text-sm text-cyan-300 mt-2 inline-flex items-center gap-1">
                  Open this week&apos;s work <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* English Courses — primary tier */}
      <section aria-labelledby="english-courses" className="max-w-5xl mx-auto px-4 pb-12">
        <h2 id="english-courses" className="font-headline text-2xl font-bold text-white mb-1">
          📘 English Courses
        </h2>
        <p className="text-slate-400 mb-5">
          Your prescribed units, literary works, and study guides — organised by course.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {englishCourses.map((c) => (
            <Link
              key={c.slug}
              href={`/courses/${c.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 p-6 transition-colors"
              style={{ borderTop: '4px solid #7B2D3B' }}
            >
              <h3 className="font-headline text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {c.name}
              </h3>
              <p className="text-slate-300 mt-2 text-sm leading-relaxed">{c.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-300">
                Open course <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Explore — secondary tier */}
      <section aria-labelledby="explore" className="max-w-5xl mx-auto px-4 pb-14">
        <h2 id="explore" className="font-headline text-2xl font-bold text-white mb-1">
          Explore
        </h2>
        <p className="text-slate-400 mb-5">
          Beyond your coursework — level up your English, AI skills, and study craft.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.href}
                href={p.href}
                className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 p-5 transition-colors"
                style={{ borderTop: `3px solid ${p.accent}` }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="rounded-lg p-2"
                    style={{ backgroundColor: `${p.accent}26`, color: p.accent }}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="font-headline font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {p.name}
                  </h3>
                </div>
                <p className="text-slate-300 mt-3 text-sm leading-relaxed">{p.blurb}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* About teaser */}
      <section className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-10 text-center">
          <h2 className="font-headline text-lg font-bold text-white">
            Built by Dr. Jaffer Basha
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm leading-relaxed">
            Lecturer in English and Business Communication (IBS University, PNG ·
            Southern Cross University). ReadMe complements the classroom — it
            supports lectures, tutorials, and independent study with clear,
            structured, academically rigorous resources.
          </p>
        </div>
      </section>
    </div>
  );
}
