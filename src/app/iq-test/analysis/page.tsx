'use client';

import { ArrowLeft, Play, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IQ_QUESTIONS } from '../data';

export default function PatternAnalysis() {
  const router = useRouter();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen pb-32 relative z-0">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-6 py-4 w-full">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="text-[#043370] dark:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95 duration-200 p-2 rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-sans tracking-tight font-bold text-xl text-[#043370] dark:text-cyan-400">Logic Answer Key</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Brand Identity Intro */}
        <div className="mb-10 text-left">
          <span className="text-[#043370] dark:text-cyan-400 font-bold tracking-widest text-xs uppercase mb-2 block">Practice Space Review</span>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">Educational Explanations</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Review the reasoning models required for all 15 cognitive puzzles encountered during the assessment to improve structural thinking.
          </p>
        </div>

        {/* Dynamic Mapping over All 15 IQ Questions */}
        <div className="space-y-8">
          {IQ_QUESTIONS.map((q, index) => {
            const correctAnswer = q.options.find(opt => opt.isCorrect);

            return (
              <section key={q.id} className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Problem Identifier */}
                  <div className="w-full md:w-1/3">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Problem {index + 1}</h3>
                    <div className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-[#043370] dark:group-hover:text-cyan-400 transition-colors">{q.category}</div>
                    <div className="w-8 h-1 bg-[#043370]/20 dark:bg-cyan-400/20 rounded-full mb-4"></div>
                  </div>
                  
                  {/* Explanation Content */}
                  <div className="w-full md:w-2/3">
                    <p className="text-slate-700 dark:text-slate-300 font-medium mb-4 italic">"{q.prompt}"</p>
                    
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Correct Answer: {correctAnswer?.id} ({correctAnswer?.content})</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>

      {/* BottomNavBar Shell */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl rounded-t-[1.5rem] shadow-[0_-4px_24px_rgba(0,0,0,0.1)] border-t border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => router.push('/iq-test/protocols')}
          className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-6 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.98] transition-transform rounded-2xl"
        >
          <CheckCircle className="w-6 h-6 mb-1" />
          <span className="text-xs font-semibold uppercase tracking-wider">Practice Again</span>
        </button>

        <button 
          onClick={() => router.push('/iq-test/results')}
          className="flex flex-col items-center justify-center bg-teal-50 dark:bg-teal-900 text-teal-800 dark:text-teal-100 rounded-2xl px-8 py-3 active:scale-[0.98] transition-transform shadow-sm border border-teal-100 dark:border-teal-800"
        >
          <Play className="w-6 h-6 mb-1 fill-current rotate-180" />
          <span className="text-xs font-semibold uppercase tracking-wider">Back</span>
        </button>
      </nav>
    </div>
  );
}
