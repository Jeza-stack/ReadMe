'use client';

import { ArrowLeft, CheckCircle, XCircle, TrendingUp, Download, Lightbulb, AlertTriangle, HelpCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { IQ_QUESTIONS } from '../data';

// Results = cognitive profile + strengths + recommendations (MDS §7):
// honest practice framing — no pseudo-IQ number, no invented percentiles.

// Map fine-grained question categories onto four broad domains
function domainOf(category: string): string {
  const c = category.toLowerCase();
  if (c.includes('numer') || c.includes('math')) return 'Numerical Reasoning';
  if (c.includes('pattern') || c.includes('matrix') || c.includes('spatial')) return 'Pattern Recognition';
  if (c.includes('verbal') || c.includes('alphabetic') || c.includes('word')) return 'Verbal Reasoning';
  return 'Logical Reasoning';
}

const RECOMMENDATIONS: Record<string, { tip: string; href: string; label: string }> = {
  'Numerical Reasoning': {
    tip: 'Practise number sequences and mental arithmetic in short daily bursts — accuracy first, speed second.',
    href: '/iq-test/protocols',
    label: 'Practice protocols',
  },
  'Pattern Recognition': {
    tip: 'Matrix puzzles reward slowing down: name the rule (rotation? addition? alternation?) before choosing an answer.',
    href: '/iq-test/protocols',
    label: 'Practice protocols',
  },
  'Verbal Reasoning': {
    tip: 'Verbal analogies are vocabulary in disguise — reading widely builds this domain faster than puzzle drills.',
    href: '/cefr',
    label: 'CEFR English Academy',
  },
  'Logical Reasoning': {
    tip: 'For syllogisms, draw the circles (who is inside which group?) instead of holding it all in your head.',
    href: '/academic-success',
    label: 'Academic Success guides',
  },
};

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawScore = searchParams.get('score');
  const score = rawScore ? parseInt(rawScore, 10) : 0;
  const total = IQ_QUESTIONS.length;
  const accuracy = Math.round((score / total) * 100);

  // Per-domain profile from the correctness string (falls back gracefully if absent)
  const r = searchParams.get('r') ?? '';
  const domains = new Map<string, { correct: number; total: number }>();
  if (r.length === total) {
    IQ_QUESTIONS.forEach((q, i) => {
      const d = domainOf(q.category);
      const cur = domains.get(d) ?? { correct: 0, total: 0 };
      cur.total += 1;
      if (r[i] === '1') cur.correct += 1;
      domains.set(d, cur);
    });
  }
  const profile = [...domains.entries()]
    .map(([name, v]) => ({ name, ...v, pct: Math.round((v.correct / v.total) * 100) }))
    .sort((a, b) => b.pct - a.pct);
  const strengths = profile.filter((p) => p.pct >= 70);
  const focus = profile.filter((p) => p.pct < 70);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen pb-32 relative z-0">
      <header className="w-full top-0 sticky z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-6 py-4 w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/iq-test/welcome')}
              className="text-[#043370] dark:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95 duration-200 p-2 rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-sans tracking-tight font-bold text-xl text-[#043370] dark:text-cyan-400">
              Your Cognitive Profile
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8 p-4 border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-sm italic text-blue-800 dark:text-blue-300 text-center max-w-2xl mx-auto">
          Practice results for educational use only — this is not an IQ score. No data is saved.
        </div>

        {/* Overall */}
        <section className="mb-12 text-center">
          <div className="inline-block bg-white dark:bg-slate-900 p-12 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-extrabold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-6">
              Practice Accuracy
            </h2>
            <div className="text-8xl font-black tracking-tighter text-[#043370] dark:text-cyan-400 mb-4 drop-shadow-sm">
              {accuracy}%
            </div>
            <p className="text-xl font-medium text-teal-600 dark:text-teal-400">
              {score} of {total} correct
            </p>
          </div>
        </section>

        {/* Profile bars */}
        {profile.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" /> Profile by domain
            </h2>
            <div className="space-y-4">
              {profile.map((p) => (
                <div key={p.name} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="font-bold text-slate-900 dark:text-white">{p.name}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {p.correct}/{p.total} · {p.pct}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${p.pct >= 70 ? 'bg-teal-500' : 'bg-amber-500'}`}
                      style={{ width: `${p.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Strengths + recommendations */}
        {profile.length > 0 && (
          <section className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <h2 className="flex items-center gap-2 font-extrabold text-slate-900 dark:text-white mb-4">
                <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" /> Strengths
              </h2>
              {strengths.length > 0 ? (
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {strengths.map((s) => (
                    <li key={s.name}>
                      <strong>{s.name}</strong> — {s.pct}% in this practice set. Keep it sharp with occasional mixed practice.
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  No domain reached 70% this time — treat this run as your baseline and focus on the recommendations.
                </p>
              )}
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <h2 className="flex items-center gap-2 font-extrabold text-slate-900 dark:text-white mb-4">
                <Lightbulb className="w-5 h-5 text-amber-500" /> Recommendations
              </h2>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {(focus.length > 0 ? focus : profile.slice(-1)).map((f) => (
                  <li key={f.name}>
                    <strong>{f.name}:</strong> {RECOMMENDATIONS[f.name]?.tip}{' '}
                    <a href={RECOMMENDATIONS[f.name]?.href} className="text-cyan-600 dark:text-cyan-400 underline">
                      {RECOMMENDATIONS[f.name]?.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-12 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h2 className="flex items-center gap-2 font-extrabold text-slate-900 dark:text-white mb-4">
            <HelpCircle className="w-5 h-5 text-[#043370] dark:text-cyan-400" /> Frequently asked
          </h2>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-bold text-slate-900 dark:text-white">Is this my IQ?</dt>
              <dd className="text-slate-600 dark:text-slate-300 mt-1">
                No. IQ is measured by standardised, supervised tests normed on large populations. This is a practice
                set that shows your relative strengths across reasoning domains.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-slate-900 dark:text-white">Why did I score lower than expected?</dt>
              <dd className="text-slate-600 dark:text-slate-300 mt-1">
                Familiarity matters enormously on puzzle formats. First attempts underestimate everyone — retake it
                after reading the answer logic and the gap usually closes.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-slate-900 dark:text-white">Can I improve these skills?</dt>
              <dd className="text-slate-600 dark:text-slate-300 mt-1">
                Performance on these puzzle types improves reliably with practice. Whether that generalises beyond
                puzzles is scientifically contested — which is one more reason not to treat any single number as a
                verdict on your mind.
              </dd>
            </div>
          </dl>
        </section>

        {/* Limitations & disclaimer */}
        <section className="mb-12 p-6 rounded-2xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20">
          <h2 className="flex items-center gap-2 font-extrabold text-amber-900 dark:text-amber-200 mb-3">
            <AlertTriangle className="w-5 h-5" /> Limitations
          </h2>
          <p className="text-sm text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
            This practice set is short, untimed, and not standardised, so it cannot measure intelligence. It is
            affected by familiarity, language background, tiredness, and luck. Use it to notice which kinds of
            reasoning feel easy or hard for you — nothing more. It is unsuitable for any clinical, legal, employment,
            or academic-selection purpose. Results are not stored.
          </p>
        </section>

        {/* Actions */}
        <section className="flex flex-col sm:flex-row gap-4 justify-center print:hidden">
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-3 bg-[#043370] dark:bg-cyan-400 text-white dark:text-slate-900 px-8 py-4 rounded-full font-bold tracking-wide hover:shadow-[0_8px_16px_rgba(4,51,112,0.3)] active:scale-95 transition-all shadow-lg"
          >
            <Download className="w-5 h-5" />
            Download / Export
          </button>
          <button
            onClick={() => router.push('/iq-test/analysis')}
            className="flex items-center justify-center gap-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-8 py-4 rounded-full font-bold tracking-wide hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <TrendingUp className="w-5 h-5" />
            View Answer Key & Logic
          </button>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl rounded-t-[1.5rem] shadow-[0_-4px_24px_rgba(0,0,0,0.1)] border-t border-slate-200 dark:border-slate-800 print:hidden">
        <button
          onClick={() => router.push('/iq-test/assessment')}
          className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-6 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.98] transition-transform rounded-2xl"
        >
          <XCircle className="w-6 h-6 mb-1" />
          <span className="text-xs font-semibold uppercase tracking-wider">Retake</span>
        </button>
        <button
          onClick={() => router.push('/')}
          className="flex flex-col items-center justify-center bg-teal-50 dark:bg-teal-900 text-teal-800 dark:text-teal-100 rounded-2xl px-8 py-3 active:scale-[0.98] transition-transform shadow-sm border border-teal-100 dark:border-teal-800"
        >
          <ArrowLeft className="w-6 h-6 mb-1" />
          <span className="text-xs font-semibold uppercase tracking-wider">Main Site</span>
        </button>
      </nav>
    </div>
  );
}

export default function Results() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 text-[#043370]">Loading Results...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
