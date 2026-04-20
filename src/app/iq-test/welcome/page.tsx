'use client';

import {
  ArrowRight,
  Lightbulb,
  Brain,
  Timer,
  BadgeCheck,
  FileText,
  LineChart,
  Hash,
  Grid3x3,
  MessageSquare,
  FlaskConical,
  BookOpen,
  BarChart3,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const DOMAINS = [
  {
    icon: <Hash className="w-4 h-4" />,
    label: 'Numerical Reasoning',
    desc: 'Sequences & arithmetic',
    color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
  },
  {
    icon: <Grid3x3 className="w-4 h-4" />,
    label: 'Pattern & Spatial',
    desc: 'Matrix grids & visual logic',
    color: 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300',
  },
  {
    icon: <MessageSquare className="w-4 h-4" />,
    label: 'Verbal & Logic',
    desc: 'Analogies & deduction',
    color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300',
  },
  {
    icon: <FlaskConical className="w-4 h-4" />,
    label: 'Analytical Thinking',
    desc: 'Multi-step & cryptic problems',
    color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300',
  },
];

const STATS = [
  { value: '15', label: 'Questions', icon: <FileText className="w-4 h-4" /> },
  { value: 'Free', label: 'No Sign-Up', icon: <BadgeCheck className="w-4 h-4" /> },
  { value: '~15 min', label: 'Untimed', icon: <Timer className="w-4 h-4" /> },
  { value: '4', label: 'Domains', icon: <Brain className="w-4 h-4" /> },
];

export default function Welcome() {
  const router = useRouter();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen flex flex-col relative z-0">

      {/* ── Header ── */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md flex justify-between items-center px-6 py-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#043370] to-[#00A2C9] flex items-center justify-center shadow-sm">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <h1 className="font-sans tracking-tight font-extrabold text-xl text-[#043370] dark:text-cyan-400">
            IQ Practice Test
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="hidden sm:flex px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            ← Main Website
          </button>
          {/* Initials avatar — no external image dependency */}
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#043370] to-[#00A2C9] flex items-center justify-center text-white text-xs font-bold select-none border-2 border-white dark:border-slate-800 shadow-sm">
            IQ
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 pt-28 pb-36">

        {/* Hero grid */}
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-10 items-center">

          {/* ── Left: copy ── */}
          <div className="md:col-span-7 space-y-7">

            {/* Live badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              Free · No Registration · Instant Results
            </span>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Measure Your{' '}
              <span className="text-[#043370] dark:text-cyan-400">IQ Potential</span>
              <br />— Free &amp; Scientific
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-lg">
              15 university-grade questions spanning numerical sequences, spatial
              patterns, verbal analogies, and analytical reasoning. Get your full
              cognitive profile in minutes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => router.push('/iq-test/protocols')}
                className="bg-gradient-to-br from-[#043370] to-[#00A2C9] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_16px_32px_-8px_rgba(4,51,112,0.35)] hover:-translate-y-0.5 hover:shadow-[0_20px_32px_-8px_rgba(4,51,112,0.45)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-3"
              >
                Take the Free IQ Test
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => router.push('/iq-test/analysis')}
                className="text-[#043370] dark:text-cyan-400 font-bold px-8 py-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Preview Sample Questions
              </button>
            </div>

            {/* Reassurance line */}
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              No sign-up required &nbsp;·&nbsp; No data stored on our servers &nbsp;·&nbsp; Results shown instantly
            </p>
          </div>

          {/* ── Right: info card ── */}
          <div className="md:col-span-5 relative">
            {/* Ambient glows */}
            <div className="absolute -top-10 -right-10 w-56 h-56 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative bg-white dark:bg-slate-900/80 backdrop-blur-md p-7 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 space-y-6">

              {/* Quick-stats 2×2 grid */}
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl flex flex-col gap-1"
                  >
                    <span className="text-[#043370] dark:text-cyan-400">{s.icon}</span>
                    <span className="font-extrabold text-slate-900 dark:text-white text-base leading-none">
                      {s.value}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Domain list */}
              <div className="space-y-2">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-1">
                  Cognitive Domains Covered
                </p>
                <div className="flex flex-col gap-2">
                  {DOMAINS.map((d) => (
                    <div
                      key={d.label}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${d.color}`}
                    >
                      {d.icon}
                      <span className="font-bold">{d.label}</span>
                      <span className="ml-auto font-normal opacity-70 hidden sm:inline">{d.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                <p className="text-sm italic text-slate-600 dark:text-slate-400 leading-relaxed">
                  "Intelligence is the ability to adapt to change."
                </p>
                <p className="text-xs font-bold text-[#043370] dark:text-cyan-400 mt-2">
                  — Stephen Hawking
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature cards ── */}
        <div className="max-w-4xl w-full mt-20 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all duration-300">
            <Brain className="text-[#043370] dark:text-cyan-400 w-6 h-6 mb-3" />
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">3 Question Types</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Matrix grids, number sequences, and logical deduction — just like real IQ assessments.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all duration-300">
            <BarChart3 className="text-[#043370] dark:text-cyan-400 w-6 h-6 mb-3" />
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Instant IQ Score</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              See your estimated IQ, percentile rank, and cognitive classification the moment you finish.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all duration-300">
            <Lightbulb className="text-[#043370] dark:text-cyan-400 w-6 h-6 mb-3" />
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Answer Explanations</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Every question includes a full explanation so you understand the reasoning, not just the answer.
            </p>
          </div>
        </div>

      </main>

      {/* ── Bottom Nav (routing unchanged) ── */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center pt-2 px-4 pb-6 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl rounded-t-[1.5rem] z-50 shadow-[0_-4px_24px_-4px_rgba(0,0,0,0.1)] border-t border-slate-200 dark:border-slate-800">
        <button className="flex flex-col items-center justify-center text-[#043370] dark:text-cyan-400 bg-slate-100 dark:bg-slate-800/50 rounded-2xl px-5 py-2 active:scale-90 duration-200">
          <Brain className="w-6 h-6 fill-current" />
          <span className="font-sans text-xs font-medium mt-1">Practice</span>
        </button>
        <button
          onClick={() => router.push('/iq-test/protocols')}
          className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-5 py-2 hover:text-[#043370] dark:hover:text-cyan-400 active:scale-90 duration-200"
        >
          <FileText className="w-6 h-6" />
          <span className="font-sans text-xs font-medium mt-1">Test</span>
        </button>
        <button
          onClick={() => router.push('/iq-test/analysis')}
          className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-5 py-2 hover:text-[#043370] dark:hover:text-cyan-400 active:scale-90 duration-200"
        >
          <LineChart className="w-6 h-6" />
          <span className="font-sans text-xs font-medium mt-1">Insights</span>
        </button>
      </nav>
    </div>
  );
}
