'use client';

import { Menu, ArrowRight, Lightbulb, Brain, Timer, BadgeCheck, FileText, LineChart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Welcome() {
  const router = useRouter();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen flex flex-col relative z-0">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md flex justify-between items-center px-6 py-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <button className="text-[#043370] dark:text-cyan-400 active:scale-95 duration-200">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="font-sans tracking-tight font-extrabold text-xl text-[#043370] dark:text-cyan-400">IQ Practice Sanctuary</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="hidden sm:flex px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Exit Spaces
          </button>
          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden active:scale-95 duration-200 transition-transform border border-slate-300 dark:border-slate-700">
            <img alt="Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6PfazIDPepQy9GHvzxWoq_kzS4-wwvogFW0iwpYDXhf8kmnK3TtTFJ4_DxQyIFx0Aqr6dLI9Cal737-Se3U4QPBCufBWQO00rXHErk9F1cbD4YyKyQ9RJyqqCfNffHGP8bcCwpRJ3XgRcgKmH17Ir3A-CZB7mqwxePLCklDxLwCBQ0_Cxrf_nmtiZxzlonNXzq9LUUkNy_mArAnIoKqM-0wTzqXVe_-aDhRYiXSgaJ5o4gMjgaEpBLrwLrDcY5Cnd1MsriaCLO14" />
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 pt-24 pb-32">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Hero Content: Asymmetric Layout */}
          <div className="md:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-teal-600 dark:text-teal-400 font-semibold tracking-wider text-sm uppercase px-4 py-1.5 bg-teal-100 dark:bg-teal-900/30 rounded-full inline-block">Practice Mode</span>
              <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                Ready to explore your <span className="text-[#043370] dark:text-cyan-400">potential?</span>
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed max-w-lg">
              Step into a space designed for focus. Our cognitive assessments help you understand your unique thinking patterns in a calm, completely stateless practice environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => router.push('/iq-test/protocols')}
                className="bg-gradient-to-br from-[#043370] to-[#00A2C9] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_24px_32px_-4px_rgba(4,51,112,0.15)] hover:translate-y-[-2px] hover:shadow-[0_24px_32px_-4px_rgba(4,51,112,0.25)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-3"
              >
                Start Practice Test
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => router.push('/iq-test/results')}
                className="text-[#043370] dark:text-cyan-400 font-bold px-8 py-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                View Demo Insights
              </button>
            </div>
          </div>

          {/* Visual Feature: Bento Style Card */}
          <div className="md:col-span-5 relative">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl"></div>
            <div className="relative bg-white dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800">
              <div className="space-y-6">
                {/* Stat Item 1 */}
                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <div className="h-12 w-12 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-[#043370] dark:text-cyan-400 shadow-sm">
                    <Lightbulb className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Practice Goal</p>
                    <p className="font-bold text-slate-900 dark:text-white">15 Logic Puzzles</p>
                  </div>
                </div>

                {/* Stat Item 2: Progress Gauge */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Cognitive Stamina</p>
                    <p className="text-xs font-bold text-teal-600 dark:text-teal-400">Level 12</p>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 dark:bg-teal-400 w-3/4 rounded-full"></div>
                  </div>
                </div>

                {/* Mini Card */}
                <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <p className="text-sm italic text-slate-600 dark:text-slate-400 leading-relaxed">
                    "The measure of intelligence is the ability to change."
                  </p>
                  <p className="text-xs font-bold text-[#043370] dark:text-cyan-400 mt-3">— Albert Einstein</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Info Clusters */}
        <div className="max-w-4xl w-full mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all duration-300">
            <Brain className="text-[#043370] dark:text-cyan-400 w-6 h-6 mb-3" />
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Adaptive Logic</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Questions that evolve with your unique solving style.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all duration-300">
            <Timer className="text-[#043370] dark:text-cyan-400 w-6 h-6 mb-3" />
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Paced Rounds</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">No ticking clocks. We measure focus, not just speed.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all duration-300">
            <BadgeCheck className="text-[#043370] dark:text-cyan-400 w-6 h-6 mb-3" />
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Verified Metrics</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Scientific scoring aligned with global standards.</p>
          </div>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center pb-safe pt-2 px-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl rounded-t-[1.5rem] z-50 shadow-[0_-4px_24px_-4px_rgba(0,0,0,0.1)] border-t border-slate-200 dark:border-slate-800 pb-6">
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
          onClick={() => router.push('/iq-test/results')}
          className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-5 py-2 hover:text-[#043370] dark:hover:text-cyan-400 active:scale-90 duration-200"
        >
          <LineChart className="w-6 h-6" />
          <span className="font-sans text-xs font-medium mt-1">Insights</span>
        </button>
      </nav>
    </div>
  );
}
