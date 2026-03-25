'use client';

import { Menu, HelpCircle, CheckCircle, ArrowRight, Flag, Brain, BarChart2, User, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IQ_QUESTIONS, IQQuestion } from '../data';

export default function Assessment() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const question = IQ_QUESTIONS[currentIndex];

  const handleNext = () => {
    if (!selectedOption) return;

    const opt = question.options.find(o => o.id === selectedOption);
    const newScore = opt?.isCorrect ? score + 1 : score;

    if (currentIndex < IQ_QUESTIONS.length - 1) {
      setScore(newScore);
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      // Finished practice
      router.push(`/iq-test/results?score=${newScore}`);
    }
  };

  const renderVisualArea = (q: IQQuestion) => {
    if (q.type === 'matrix' && q.visuals) {
      return (
        <div className="grid grid-cols-3 gap-4 md:gap-6 bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
          {q.visuals.map((v, i) => (
            <div key={i} className="aspect-square bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center shadow-sm text-3xl md:text-5xl text-slate-800 dark:text-slate-200">
              {v}
            </div>
          ))}
          <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 group hover:border-[#043370] transition-colors">
            <HelpCircle className="text-slate-400 group-hover:text-[#043370] w-10 h-10 transition-colors" />
          </div>
        </div>
      );
    }

    if (q.type === 'sequence' && q.sequence) {
      return (
        <div className="flex flex-wrap items-center justify-center gap-4 bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700">
          {q.sequence.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-bold shadow-sm ${item === '?' ? 'bg-[#043370] text-white border-none' : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600'}`}>
                {item}
              </div>
              {i < q.sequence!.length - 1 && <span className="text-slate-400 font-bold hidden sm:block">→</span>}
            </div>
          ))}
        </div>
      );
    }

    // Logic category
    return (
      <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-center min-h-[200px]">
        <Brain className="w-24 h-24 text-teal-600/20 dark:text-teal-400/20" />
      </div>
    );
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen flex flex-col relative z-0">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-6 py-4 max-w-full mx-auto">
          <div className="flex items-center gap-4">
            <button className="text-[#043370] dark:text-cyan-400 active:scale-95 duration-200">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="font-sans tracking-tight font-bold text-lg text-slate-900 dark:text-white">IQ Global Standard</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-8 h-8 rounded-full bg-[#00A2C9] flex items-center justify-center text-[10px] text-white font-bold">JD</div>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-32 px-6 max-w-5xl mx-auto w-full">
        {/* Progress Section */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-wide uppercase">{question.category}</span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">Problem {currentIndex + 1} of {IQ_QUESTIONS.length}</h2>
            </div>
            <div className="text-right">
              <span className="text-[#043370] dark:text-cyan-400 font-bold text-lg">Untimed</span>
              <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest hidden sm:block">Practice Mode</p>
            </div>
          </div>
          {/* Progress Gauge */}
          <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700">
            <div 
              className="h-full bg-teal-500 rounded-full transition-all duration-500" 
              style={{ width: `${((currentIndex) / IQ_QUESTIONS.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Testing Environment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Question Canvas */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 dark:bg-slate-800/50 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-700 pointer-events-none"></div>
              <div className="relative z-10">
                <p className="text-slate-700 dark:text-slate-300 mb-10 leading-relaxed text-xl md:text-2xl font-medium max-w-md">
                  {question.prompt}
                </p>
                {renderVisualArea(question)}
              </div>
            </div>
          </div>

          {/* Options Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-widest uppercase px-2">Select Solution</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {question.options.map((option) => (
                <button 
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={`group p-6 rounded-2xl transition-all duration-300 shadow-sm border active:scale-[0.98] text-left flex items-center justify-between ${
                    selectedOption === option.id 
                      ? 'bg-white dark:bg-slate-800 border-[#043370] dark:border-cyan-400 ring-1 ring-[#043370] dark:ring-cyan-400' 
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors shrink-0 ${
                      selectedOption === option.id 
                        ? 'bg-[#043370] text-white' 
                        : 'bg-slate-200 dark:bg-slate-700 text-[#043370] dark:text-cyan-400 group-hover:bg-[#043370] group-hover:text-white'
                    }`}>
                      {option.id}
                    </span>
                    <span className={`text-xl font-medium ${selectedOption === option.id ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                      {option.content}
                    </span>
                  </div>
                  {selectedOption === option.id && (
                    <CheckCircle className="text-[#043370] dark:text-cyan-400 w-6 h-6 shrink-0 fill-current bg-white rounded-full border border-white" />
                  )}
                </button>
              ))}
            </div>

            {/* Action Controls */}
            <div className="mt-8 flex flex-col gap-4">
              <button 
                onClick={handleNext}
                disabled={!selectedOption}
                className={`w-full py-5 font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 ${
                  selectedOption 
                    ? 'bg-gradient-to-br from-[#043370] to-[#00A2C9] text-white hover:-translate-y-1 active:scale-[0.98]' 
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                {currentIndex === IQ_QUESTIONS.length - 1 ? 'Finish Assessment' : 'Confirm & Next'}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full py-4 text-[#043370] dark:text-cyan-400 font-semibold flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                <Flag className="w-5 h-5" />
                Mark for Review
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* FAB for Next Area (Mobile only alternate) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full rounded-t-3xl z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] px-4 pb-6 pt-3 flex justify-around items-center">
        <button className="flex flex-col items-center justify-center text-[#043370] dark:text-cyan-400 rounded-2xl px-5 py-2 active:scale-90 transition-transform bg-slate-100 dark:bg-slate-800">
          <Brain className="w-6 h-6 fill-current" />
          <span className="font-sans text-[10px] font-bold mt-1 uppercase">Assess</span>
        </button>
        <button 
          onClick={() => { if(selectedOption) handleNext() }}
          className={`flex flex-col items-center justify-center text-white rounded-2xl px-8 py-2 active:scale-90 transition-transform ${selectedOption ? 'bg-[#00A2C9]' : 'bg-slate-300 dark:bg-slate-700'}`}
        >
          <ChevronRight className="w-6 h-6" />
          <span className="font-sans text-[10px] font-bold mt-1 uppercase">Next</span>
        </button>
      </nav>
    </div>
  );
}
