'use client';

import React from 'react';
import { Gem, Globe, ShieldCheck, Lock, Badge, Key, ArrowRight, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/iq-test/welcome');
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen flex flex-col relative z-0">
      {/* TopAppBar Execution */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-[20px] shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Gem className="text-[#043370] dark:text-cyan-400 w-6 h-6" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">IQ Global Standard</h1>
          </div>
          <div className="hidden md:flex gap-6 items-center">
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-[#043370] dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              Main Website
            </button>
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">System Status: Practice</span>
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Globe className="w-4 h-4 text-[#043370] dark:text-cyan-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-12 relative z-10 w-full">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Branding/Editorial Column */}
          <div className="lg:col-span-6 space-y-8 hidden lg:block">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#00A2C9]/10 text-[#00A2C9] dark:text-cyan-300 text-xs font-bold tracking-wider uppercase">Practice Environment</span>
              <h2 className="text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
                The Intellectual <br />
                <span className="text-[#043370] dark:text-cyan-400">Sanctuary.</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md leading-relaxed">
                Welcome to our practice IQ Assessment space. This module provides a safe environment to test your cognitive skills with detailed logic explanations.
              </p>
              
              {/* Educational Disclaimer */}
              <div className="mt-4 p-4 border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-sm italic text-blue-800 dark:text-blue-300">
                <strong>Important Notice:</strong> This space is a practice environment for educational and entertainment purposes only, not for any legal, clinical, or formal academic purposes. Test results are entirely stateless and are not retained in any system memory.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
                <ShieldCheck className="text-[#043370] dark:text-cyan-400 w-6 h-6 mb-3" />
                <h4 className="font-bold text-slate-900 dark:text-white">Educational</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Detailed answer explanations</p>
              </div>
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
                <Lock className="text-[#043370] dark:text-cyan-400 w-6 h-6 mb-3" />
                <h4 className="font-bold text-slate-900 dark:text-white">Stateless</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">100% data privacy & no memory storage</p>
              </div>
            </div>
          </div>

          {/* Authentication Card */}
          <div className="lg:col-span-6 flex justify-center z-10 w-full">
            <div className="w-full max-w-md bg-white dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl">
              <div className="mb-10 lg:hidden text-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Practice Space</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Enter credentials or bypass for practice</p>
                <div className="mt-4 p-3 border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-xs italic text-blue-800 dark:text-blue-300 text-left">
                  This space is for educational and entertainment purposes only. Results are strictly stateless and not retained.
                </div>
              </div>
              <form className="space-y-8" onSubmit={handleLogin}>
                {/* ID Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 px-1">Candidate Alias</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Badge className="text-slate-400 w-5 h-5 group-focus-within:text-[#043370] dark:group-focus-within:text-cyan-400 transition-colors" />
                    </div>
                    <input className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border-none rounded-2xl focus:ring-0 focus:bg-slate-100 dark:focus:bg-slate-900 transition-all duration-300 placeholder:text-slate-400 border-b-2 border-transparent focus:border-[#043370] dark:focus:border-cyan-400 outline-none text-slate-900 dark:text-white" placeholder="Practice-User-001" type="text" />
                  </div>
                </div>

                {/* Submit Button */}
                <button className="w-full py-4 px-6 bg-gradient-to-br from-[#043370] to-[#00A2C9] text-white font-bold text-lg rounded-3xl shadow-xl hover:shadow-[0_10px_20px_-10px_rgba(4,51,112,0.5)] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group" type="submit">
                  Enter Practice Matrix
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Secondary Links */}
                <div className="pt-6 text-center space-y-4">
                  <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <button className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 hover:text-[#043370] dark:hover:text-cyan-400 transition-colors" type="button">
                      <HelpCircle className="w-4 h-4" /> Practice Info
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Professional Footer */}
      <footer className="mt-auto py-8 px-6 z-10 w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-slate-500 font-medium tracking-widest uppercase text-center md:text-left">
          <p>© 2024 Educational & Entertainment Practice IQ Service</p>
          <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
            <span className="text-blue-500">No Data Retained</span>
            <span className="text-blue-500">Stateless System</span>
            <span>Non-Legal Use Only</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
