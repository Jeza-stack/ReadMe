import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { listContent } from '@/lib/content';

export const metadata = {
  title: 'CEFR English Academy',
  description:
    'Structured English lessons by CEFR level, A1 to C2 — can-do based, self-checked, free.',
};

const LEVELS: { level: string; label: string; desc: string; href?: string; lessons?: number }[] = [
  // ponytail: A1/A2 lessons already exist under the older /level section — link
  // there (with hand-counted lesson totals) until academy versions replace them.
  { level: 'a1', label: 'A1 · Beginner', desc: 'Everyday phrases, introductions, the present simple.', href: '/level/a1', lessons: 12 },
  { level: 'a2', label: 'A2 · Elementary', desc: 'Routine tasks, simple past, everyday vocabulary.', href: '/level/a2', lessons: 33 },
  { level: 'b1', label: 'B1 · Intermediate', desc: 'Independent use: opinions, narratives, workplace English.' },
  { level: 'b2', label: 'B2 · Upper Intermediate', desc: 'Fluent discussion, argument, and academic reading.' },
  { level: 'c1', label: 'C1 · Advanced', desc: 'Flexible, effective language for academic and professional life.' },
  { level: 'c2', label: 'C2 · Proficiency', desc: 'Precision and nuance approaching an educated native speaker.' },
];

export default function CefrHome() {
  const counts = Object.fromEntries(
    LEVELS.map((l) => [l.level, listContent(`cefr/${l.level}`).length])
  );

  return (
    <div className="bg-[color:var(--ce-deep-navy,#0E141F)] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-xs uppercase tracking-widest text-[#38BDF8]">ReadMe · CEFR Academy</p>
        <h1 className="font-headline text-4xl font-bold text-white mt-2">
          English by level, on your terms
        </h1>
        <p className="text-slate-300 mt-4 max-w-2xl leading-relaxed">
          Every lesson starts from a CEFR can-do statement and ends with a
          self-check, so you always know what you can now do — not just what
          you have read. Not sure of your level?{' '}
          <Link href="/assessment" className="text-cyan-300 hover:text-cyan-200 underline">
            Find your CEFR level in 15 minutes — free
          </Link>
          .
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {LEVELS.map((l) => (
            <li key={l.level}>
              <Link
                href={l.href ?? `/cefr/${l.level}`}
                className="block h-full rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 p-5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-headline text-lg font-bold text-white">{l.label}</h2>
                  <span className="text-xs text-slate-400">
                    {(l.lessons ?? counts[l.level]) > 0 ? `${l.lessons ?? counts[l.level]} lessons` : 'coming soon'}
                  </span>
                </div>
                <p className="text-sm text-slate-300 mt-2">{l.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm text-cyan-300">
                  Enter level <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
