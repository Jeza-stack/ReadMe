'use client';

import { Shield, Timer, ClipboardCheck, VolumeX, MonitorOff, FileEdit, UserCheck, Clock, ArrowRight, Lightbulb, Brain, BarChart2, History, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Protocols() {
  const router = useRouter();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen flex flex-col relative z-0">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800 flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-3">
          <Shield className="text-[#043370] dark:text-cyan-400 w-6 h-6" />
          <span className="text-lg font-extrabold tracking-tighter text-slate-900 dark:text-white font-sans">IQ ACADEMY</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-8">
            <span className="text-[#043370] dark:text-cyan-400 border-b-2 border-[#043370] dark:border-cyan-400 font-sans font-bold tracking-tight">Assess</span>
            <span onClick={() => router.push('/iq-test/results')} className="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-sans font-bold tracking-tight cursor-pointer px-2 py-1 rounded">Insights</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-300 dark:border-slate-700">
            <img alt="User Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtx1gvdB-5D9yRCagNqMpLKY9Azr_vlk8EV3MeUnNCvfycSiP-FUKxTvKj37W3I_1F5dZBd4sT6SGEljycgJEAna_vg8dsDzo_7JEcG4L32A2ZNbIxZCoX_QmjyAgpmxDpFcQtLvKSQA290r_aJ65BR3SivFHpJFS8_hZYRvwO3ZTMRVnbJ7Pq8T33YwXzKQLhmKqBVsKmUaZ8spYby5kshM4BavK0sHB4uq-n2zVl6crFQ_HVOK-B09FytCPAs46ythdAJ1dYa_E" />
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow pt-24 pb-32 px-6 max-w-5xl mx-auto w-full">
        {/* Header Section: Asymmetric Editorial Layout */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-[#043370] dark:text-cyan-400 font-bold tracking-widest text-sm mb-4 uppercase">Practice Standard 4.2</p>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Assessment Protocols
            </h1>
            <p className="mt-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Prepare your mental environment for maximum cognitive performance. These guidelines ensure the integrity and accuracy of your practice session.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border-l-4 border-[#043370] dark:border-cyan-400">
              <Timer className="text-[#043370] dark:text-cyan-400 w-10 h-10 mb-4" />
              <div className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Total Duration</div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">Untimed Practice</div>
            </div>
          </div>
        </div>

        {/* Instructions Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Rules Checklist (Large Span) */}
          <section className="md:col-span-8 bg-white dark:bg-slate-900/80 p-8 md:p-12 rounded-[2rem] shadow-sm relative overflow-hidden border border-slate-100 dark:border-slate-800">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-3">
                <ClipboardCheck className="text-teal-600 dark:text-teal-400 w-6 h-6" />
                Integrity Standards
              </h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300">
                  <VolumeX className="text-teal-600 dark:text-teal-400 w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Controlled Environment</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Ensure a quiet, private space free from external interruptions or auditory distractions.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300">
                  <FileEdit className="text-teal-600 dark:text-teal-400 w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Draft Materials</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">You may utilize physical scratch paper and a pencil for pattern visualization and logical deduction.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300">
                  <UserCheck className="text-teal-600 dark:text-teal-400 w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Unassisted Effort</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">The assessment must reflect your individual cognitive capacity without collaboration.</p>
                  </div>
                </li>
              </ul>
            </div>
            {/* Subtle Gradient Background Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#043370]/5 dark:bg-cyan-400/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          </section>

          {/* Metrics & Start (Small Span) */}
          <section className="md:col-span-4 flex flex-col gap-6">
            {/* Session Context Card */}
            <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-[2rem] flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-4">Session Scope</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400 text-sm">Quantified Domains</span>
                    <span className="text-[#043370] dark:text-cyan-400 font-bold">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400 text-sm">Total Inquiries</span>
                    <span className="text-[#043370] dark:text-cyan-400 font-bold">15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400 text-sm">Adaptive Difficulty</span>
                    <span className="text-teal-600 dark:text-teal-400 font-bold">Active</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-300 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                  Note: This is a stateless practice environment. Your results are strictly for personal insights and not saved.
                </p>
              </div>
            </div>

            {/* Action Card */}
            <div className="bg-white dark:bg-slate-900 p-2 rounded-[2.5rem] shadow-lg border border-slate-200 dark:border-slate-800">
              <button 
                onClick={() => router.push('/iq-test/assessment')}
                className="w-full bg-gradient-to-br from-[#043370] to-[#00A2C9] text-white py-6 px-8 rounded-[2rem] font-bold text-xl flex items-center justify-center gap-3 hover:translate-y-[-1px] active:scale-95 transition-all duration-200 shadow-lg"
              >
                Begin Assessment
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </section>
        </div>

        {/* Pro-tip/Warning Section */}
        <div className="mt-12 p-8 bg-teal-50 dark:bg-teal-900/20 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 border border-teal-100 dark:border-teal-900/30">
          <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center shrink-0">
            <Lightbulb className="text-teal-700 dark:text-teal-300 w-8 h-8 fill-current" />
          </div>
          <div>
            <h4 className="font-bold text-teal-900 dark:text-teal-100">Pro-Tip: Cognitive Pacing</h4>
            <p className="text-teal-800 dark:text-teal-200 text-sm mt-1">
              Do not linger excessively on complex patterns. Since this is untimed practice, take the time to really understand the logic behind each problem.
            </p>
          </div>
        </div>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-[0_-8px_24px_rgba(0,0,0,0.05)] rounded-t-3xl border-t border-slate-200 dark:border-slate-800">
        <button className="flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 text-[#043370] dark:text-cyan-400 rounded-2xl px-5 py-1.5 shadow-sm transition-all duration-300 ease-out">
          <Brain className="w-6 h-6 fill-current" />
          <span className="text-[11px] font-semibold font-sans mt-1">Assess</span>
        </button>
        <button 
          onClick={() => router.push('/iq-test/results')}
          className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-5 py-1.5 hover:text-[#043370] dark:hover:text-cyan-400 transition-all duration-300 ease-out"
        >
          <BarChart2 className="w-6 h-6" />
          <span className="text-[11px] font-semibold font-sans mt-1">Insights</span>
        </button>
        <button 
          onClick={() => router.push('/iq-test/')}
          className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-5 py-1.5 hover:text-[#043370] dark:hover:text-cyan-400 transition-all duration-300 ease-out"
        >
          <User className="w-6 h-6" />
          <span className="text-[11px] font-semibold font-sans mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
}
