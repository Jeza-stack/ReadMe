'use client';

import { ArrowLeft, MoreVertical, CheckCircle, XCircle, Clock, TrendingUp, Download, Share2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const rawScore = searchParams.get('score');
  const score = rawScore ? parseInt(rawScore, 10) : 0;
  const total = 15;
  const accuracy = Math.round((score / total) * 100);
  
  // Calculate mock IQ and Percentile based on the user's score out of 15
  // Baseline IQ 80, Max IQ 145
  const mockIq = Math.round(80 + (score * (65 / 15)));
  
  let percentile = "Below Average";
  let interpretation = "Foundational";
  if (score >= 14) { percentile = "99th Percentile"; interpretation = "Highly Superior"; }
  else if (score >= 12) { percentile = "90th Percentile"; interpretation = "Superior Range Context"; }
  else if (score >= 9) { percentile = "75th Percentile"; interpretation = "High Average"; }
  else if (score >= 6) { percentile = "50th Percentile"; interpretation = "Average Range"; }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen pb-32 relative z-0">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-6 py-4 w-full">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/iq-test/welcome')}
              className="text-[#043370] dark:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95 duration-200 p-2 rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-sans tracking-tight font-bold text-xl text-[#043370] dark:text-cyan-400">Practice Results</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Educational Disclaimer */}
         <div className="mb-8 p-4 border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-sm italic text-blue-800 dark:text-blue-300 text-center max-w-2xl mx-auto">
          These practice metrics are for educational use. No data is saved to our servers locally or globally.
        </div>

        {/* Overall Score Section */}
        <section className="mb-12 text-center">
          <div className="inline-block bg-white dark:bg-slate-900 p-12 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-extrabold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-6">Cognitive Estimate</h2>
            <div className="text-8xl font-black tracking-tighter text-[#043370] dark:text-cyan-400 mb-4 drop-shadow-sm">{mockIq}</div>
            <p className="text-xl font-medium text-teal-600 dark:text-teal-400">{percentile} (Mock)</p>
            <div className="mt-8 flex justify-center gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 text-sm font-bold tracking-wide">
                <CheckCircle className="w-4 h-4" /> {interpretation}
              </span>
            </div>
          </div>
        </section>

        {/* Detailed Metrics Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Metric Card 1 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Accuracy</h3>
              <CheckCircle className="text-teal-600 dark:text-teal-400 w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{accuracy}%</div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{score}/{total} Correct</p>
          </div>

          {/* Metric Card 2 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Errors</h3>
              <XCircle className="text-rose-500 dark:text-rose-400 w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{total - score}</div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Total Missed</p>
          </div>

          {/* Metric Card 3 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Avg Time</h3>
              <Clock className="text-teal-600 dark:text-teal-400 w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">Untimed</div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Practice Mode</p>
          </div>

          {/* Metric Card 4 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Completion</h3>
              <TrendingUp className="text-[#043370] dark:text-cyan-400 w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">100%</div>
            <p className="text-sm text-slate-500 dark:text-slate-400">All questions answered</p>
          </div>
        </section>

        {/* Action Buttons */}
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

      {/* BottomNavBar Shell */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl rounded-t-[1.5rem] shadow-[0_-4px_24px_rgba(0,0,0,0.1)] border-t border-slate-200 dark:border-slate-800 print:hidden">
        {/* Share Result */}
        <button className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-6 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.98] transition-transform rounded-2xl">
          <Share2 className="w-6 h-6 mb-1" />
          <span className="text-xs font-semibold uppercase tracking-wider">Share</span>
        </button>

        {/* Return to Main Website */}
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
