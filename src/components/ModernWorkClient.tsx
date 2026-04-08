"use client";

import type { LiteraryWork, QuizQuestion } from "@/lib/types";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { CheckCircle, XCircle, Lightbulb, BookOpen, Brain, Sparkles, Target, Zap, ChevronRight, GraduationCap, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/* ── Quiz (reused logic, modern skin) ── */
function ModernQuiz({ questions }: { questions: QuizQuestion[] }) {
  const [ci, setCi] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const pick = (o: string) => {
    if (answered) return;
    setSel(o);
    setAnswered(true);
    if (o === questions[ci].correctAnswer) setScore(s => s + 1);
  };
  const next = () => {
    if (ci < questions.length - 1) { setCi(i => i + 1); setAnswered(false); setSel(null); }
    else setDone(true);
  };
  const restart = () => { setCi(0); setSel(null); setAnswered(false); setScore(0); setDone(false); };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-violet-500/10 border border-white/10 p-8 text-center">
        <Sparkles className="mx-auto w-12 h-12 text-yellow-400 mb-4 animate-pulse" />
        <h3 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h3>
        <p className="text-cyan-200 text-lg mb-6">You scored <span className="text-yellow-400 font-bold">{score}/{questions.length}</span> ({pct}%)</p>
        <Progress value={pct} className="mb-6 h-3 bg-white/10" />
        <Button onClick={restart} className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-bold px-8 py-3 rounded-full">
          Try Again
        </Button>
      </div>
    );
  }

  const q = questions[ci];
  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 backdrop-blur-sm p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">Question {ci + 1}/{questions.length}</span>
        <span className="text-sm text-slate-400">{score} correct so far</span>
      </div>
      <p className="text-lg md:text-xl font-semibold text-white mb-6">{q.question}</p>
      <div className="space-y-3">
        {q.options.map((o, i) => {
          const correct = o === q.correctAnswer;
          const selected = o === sel;
          let cls = "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:border-cyan-400/50";
          if (answered && correct) cls = "bg-emerald-500/20 border-emerald-400 text-emerald-200";
          else if (answered && selected) cls = "bg-red-500/20 border-red-400 text-red-200";
          return (
            <button key={i} onClick={() => pick(o)} disabled={answered}
              className={cn("w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 flex items-center justify-between", cls)}>
              <span>{o}</span>
              {answered && correct && <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
              {answered && selected && !correct && <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-5 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-100 text-sm">
          <strong>💡 Explanation:</strong> {q.explanation}
        </div>
      )}
      {answered && (
        <div className="mt-5 flex justify-end">
          <Button onClick={next} className="bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold rounded-full px-6">
            {ci < questions.length - 1 ? "Next →" : "See Results"} 
          </Button>
        </div>
      )}
    </div>
  );
}

/* ── Glossary Chip ── */
function GlossaryChip({ word, definition, example }: { word: string; definition: string; example?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="group">
      <button onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-500/5 transition-all duration-200">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-cyan-300">{word}</span>
          <ChevronRight className={cn("w-4 h-4 text-slate-500 transition-transform", open && "rotate-90")} />
        </div>
        {open && (
          <div className="mt-2 pt-2 border-t border-white/10 space-y-1">
            <p className="text-sm text-slate-300">{definition}</p>
            {example && <p className="text-xs text-slate-500 italic">"{example}"</p>}
          </div>
        )}
      </button>
    </div>
  );
}

/* ── MAIN COMPONENT ── */
export default function ModernWorkClient({ work }: { work: LiteraryWork }) {
  return (
    <div className="space-y-10">
      
      {/* ── Modern Hero — Deep Dark with Optional Cinematic Image ── */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-white/10 shadow-2xl min-h-[400px] flex items-end">
        {/* Background Image with Overlay */}
        {work.image && (
          <div className="absolute inset-0 z-0">
            <img 
              src={work.image} 
              alt={work.title} 
              className="w-full h-full object-cover transform scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/80 to-transparent" />
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
          </div>
        )}
        
        {/* Animated Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse z-0" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-600/10 rounded-full blur-[120px] animate-pulse z-0" style={{ animationDelay: '1s' }} />

        <div className="relative p-6 md:p-12 z-10 w-full">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1.5 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400 drop-shadow-sm">{work.category}</span>
          </div>
          
          <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tighter text-white drop-shadow-md">
            {work.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm md:text-base">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>By {work.author}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Pro Series 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* Content Body */}
          <section className="relative p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent">
            <div className="bg-[#0a0f1a] rounded-[22px] p-6 md:p-10">
              <article className="prose prose-lg max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:text-cyan-400 prose-h2:mt-10 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-white/5
                prose-h3:text-xl prose-h3:text-violet-400 prose-h3:mt-8
                prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-lg
                prose-strong:text-cyan-200 prose-strong:font-bold
                prose-li:text-slate-300 prose-li:marker:text-cyan-500
                prose-code:text-cyan-300 prose-code:bg-cyan-500/10 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:border prose-code:border-cyan-500/20
                prose-pre:bg-black/60 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:p-6 prose-pre:shadow-2xl
                prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:bg-cyan-500/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:text-cyan-100 prose-blockquote:italic
                prose-table:w-full prose-table:border-collapse prose-table:my-8
                prose-th:bg-white/5 prose-th:text-cyan-300 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:border prose-th:border-white/10
                prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-white/10 prose-td:text-slate-300
              ">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{work.fullText}</ReactMarkdown>
              </article>
            </div>
          </section>
        </div>

        {/* Sidebar for Glossary/Insights */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Key Concepts Sidebar */}
          {work.difficultWords && work.difficultWords.length > 0 && (
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">Key Insights</h2>
              </div>
              <div className="space-y-3">
                {work.difficultWords.map((dw, i) => (
                  <GlossaryChip key={i} word={dw.word} definition={dw.definition} example={dw.example} />
                ))}
              </div>
            </div>
          )}

          {/* Critical Highlight Callout */}
          {work.contentAnalysis?.criticalAnalysis && (
            <div className="rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/5 border border-amber-500/20 p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <Target className="w-16 h-16 text-amber-500" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-amber-400 uppercase text-xs tracking-widest">Global Pro Tip</h4>
              </div>
              <p className="text-amber-100/90 text-sm leading-relaxed relative z-10 font-medium">
                {work.contentAnalysis.criticalAnalysis}
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* ── Secondary Layout (Analysis & Assessment) ── */}
      <div className="space-y-12">
        {/* Analysis Grid */}
        {work.contentAnalysis && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {work.contentAnalysis.summary && (
              <div className="group rounded-3xl bg-white/5 border border-white/10 p-8 hover:bg-white/[0.07] transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Core Synthesis</h3>
                <p className="text-slate-400 leading-relaxed">{work.contentAnalysis.summary}</p>
              </div>
            )}
            
            <div className="space-y-6">
              {work.contentAnalysis.themes && work.contentAnalysis.themes.length > 0 && (
                <div className="rounded-3xl bg-cyan-500/5 border border-cyan-500/10 p-8">
                  <h3 className="text-sm font-black text-cyan-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Focus Areas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {work.contentAnalysis.themes.map((t, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-black/40 text-cyan-300 text-xs font-bold border border-cyan-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {work.contentAnalysis.relevance && (
                <div className="rounded-3xl bg-emerald-500/5 border border-emerald-500/10 p-8">
                   <h3 className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Real-World Impact
                  </h3>
                  <p className="text-emerald-200/80 text-sm leading-relaxed">{work.contentAnalysis.relevance}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Assessment Section (Full Width) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* FAQs */}
          {work.faqs && work.faqs.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <MessageCircleQuestion className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-black text-white">Knowledge Hub</h2>
              </div>
              <Accordion type="single" collapsible className="space-y-3">
                {work.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="rounded-2xl border border-white/5 bg-white/[0.02] px-6 transition-all hover:bg-white/[0.04]">
                    <AccordionTrigger className="text-left py-5 text-white font-bold hover:no-underline text-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-slate-400 text-lg leading-relaxed">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{faq.answer}</ReactMarkdown>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {/* Quiz */}
          {work.quiz && work.quiz.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-amber-500" />
                <h2 className="text-2xl font-black text-white">Skill Verification</h2>
              </div>
              <ModernQuiz questions={work.quiz} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
