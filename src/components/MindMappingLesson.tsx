'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { MindMapSvg } from '@/components/MindMapSvg';
import { MindMapHeroGraphic } from '@/components/MindMapHeroGraphic';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
  Plus,
  X,
  Check,
  Sparkles,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Flag,
  ExternalLink,
  Download,
  Maximize2,
} from 'lucide-react';
import {
  TOTAL_SECTIONS,
  JOURNEY_STEPS,
  SECTION_TIMES,
  TAKEAWAYS,
  DID_YOU_KNOW,
  MINI_CHECKS,
  WHY_QUESTIONS,
  WHY_BENEFITS,
  WHAT_IS,
  NOTES_COMPARISON,
  WHY_IT_WORKS,
  ASSOCIATION_CHAIN,
  GOLDEN_RULES,
  BUILD_ALONG_STAGES,
  BRANCHES,
  REFLECTION_QUESTIONS,
  GROW_INTRO,
  GROW_FIELDS,
  BEGINNER_MISTAKES,
  APPLICATIONS,
  TOOL_GROUPS,
  TOOLS_CLOSING,
  TOOLS_DISCLAIMER,
  COMMON_QUESTIONS,
  SUCCESS_CHECKLIST,
  CHALLENGE,
  PRACTICE_INTRO,
  PRACTICE_CHALLENGES,
  type BranchKey,
} from '@/data/mindMapping';

const STORAGE_KEY = 'mind-mapping-v1';

type LessonState = {
  strengths: string[];
  weaknesses: string[];
  values: string[];
  goals: string[];
  reflection: Record<string, string>;
  grow: Record<string, string>;
};

const EMPTY_STATE: LessonState = {
  strengths: [],
  weaknesses: [],
  values: [],
  goals: [],
  reflection: {},
  grow: {},
};

const marker = (n: number) => `Step ${n} of ${TOTAL_SECTIONS} · ${SECTION_TIMES[n]}`;

/**
 * Section shell matching the synced site's own rhythm (see src/app/page.tsx: max-w-5xl,
 * text-2xl headings, mb-1/mb-5). The old shared <Section> is April-era — text-6xl titles
 * with mb-20 — which neither matches this design nor fits a lesson with five steps.
 */
function Step({
  id,
  step,
  title,
  lead,
  children,
}: {
  id?: string;
  step?: number;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-h` : undefined} className="max-w-5xl mx-auto px-4 pb-12">
      {step && (
        <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40 mb-1.5">
          {marker(step)}
        </p>
      )}
      <h2 id={id ? `${id}-h` : undefined} className="font-headline text-2xl font-bold text-foreground mb-1">
        {title}
      </h2>
      {lead && <p className="text-muted-foreground mb-5 max-w-3xl">{lead}</p>}
      {children}
    </section>
  );
}

/**
 * An expanded panel gets a mild tint and a brighter border, so the reader can see at a
 * glance which area they are reading and where to click to close it again.
 *
 * ponytail: this is driven by an inline style from controlled accordion state, not a
 * `data-[state=open]:` Tailwind variant — that variant's rule was being outranked by a
 * cascade-layer conflict in this Turbopack build (verified: rule present, selector matched,
 * yet background stayed transparent). Inline style sidesteps the layer war entirely.
 */
const openPanelBase = 'rounded-lg border px-4 mb-2 transition-colors';

// The fill is an inset box-shadow, not background-color: a global `!important` background
// reset in this theme overrides inline background-color (verified — inline border-color
// applied, inline background-color did not). An inset shadow fills the box the same way and
// nothing in the cascade resets it.
// Both the fill and the crisp sky edge ride on box-shadow: the first inset floods the box
// like a background, the second draws a 1px inner ring. Border-color is reset by the same
// !important rule, so we don't rely on it.
const panelStyle = (open: boolean): React.CSSProperties =>
  open
    ? {
        boxShadow:
          'inset 0 0 0 999px rgba(56,189,248,0.07), inset 0 0 0 1px rgba(56,189,248,0.55)',
      }
    : {};

/**
 * ponytail: no ui/textarea.tsx exists in this repo, so this reuses input.tsx's class
 * string with h-10 swapped for min-h. If a Textarea component is ever added, replace this.
 */
const textareaClass =
  'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';

/* ── Teaching devices ─────────────────────────────────────────────────────────── */

function Takeaway({ section }: { section: number }) {
  const text = TAKEAWAYS[section];
  if (!text) return null;
  return (
    <div className="max-w-3xl mx-auto mt-10 rounded-lg border-l-4 border-[var(--ce-golden-yellow)] bg-[var(--ce-golden-yellow)]/5 px-5 py-4">
      <p className="text-xs font-bold uppercase tracking-widest text-[var(--ce-golden-yellow)] mb-1.5">
        Key takeaway
      </p>
      <p className="text-foreground/80">{text}</p>
    </div>
  );
}

function DidYouKnow({ section }: { section: number }) {
  const text = DID_YOU_KNOW[section];
  if (!text) return null;
  return (
    <div className="max-w-3xl mx-auto mt-8 rounded-lg border border-sky-400/30 bg-sky-400/5 p-5">
      <div className="flex items-start gap-3">
        <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-sky-400" />
        <div>
          <p className="text-sm font-bold text-sky-400 mb-1">Did you know?</p>
          <p className="text-sm text-foreground/70 leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
}

/** Feedback without assessment: picking reveals the answer and why. Never scored, never saved. */
function MiniCheck({ section }: { section: number }) {
  const check = MINI_CHECKS.find((c) => c.section === section);
  const [picked, setPicked] = useState<number | null>(null);
  if (!check) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10 glass-panel p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-3">
        Quick check
      </p>
      <p className="font-semibold mb-4">{check.question}</p>

      <div className="flex flex-col gap-2">
        {check.options.map((option, index) => {
          const isPicked = picked === index;
          const isCorrect = index === check.correctIndex;
          const revealed = picked !== null;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setPicked(index)}
              aria-pressed={isPicked}
              className={cn(
                'flex items-center gap-3 rounded-md border px-4 py-2.5 text-left text-sm transition-colors',
                !revealed && 'border-white/15 hover:border-white/40',
                revealed && isCorrect && 'border-emerald-400/60 bg-emerald-400/10',
                revealed && isPicked && !isCorrect && 'border-rose-400/60 bg-rose-400/10',
                revealed && !isPicked && !isCorrect && 'border-white/10 opacity-50'
              )}
            >
              {revealed && isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />}
              {revealed && isPicked && !isCorrect && <XCircle className="w-4 h-4 shrink-0 text-rose-400" />}
              {(!revealed || (!isPicked && !isCorrect)) && (
                <span className="h-4 w-4 shrink-0 rounded-full border border-white/30" aria-hidden="true" />
              )}
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <p className="mt-4 text-sm text-foreground/70 leading-relaxed">
          <span className="font-semibold text-foreground/85">Why: </span>
          {check.why}
        </p>
      )}
    </div>
  );
}

/* ── Step 2 helper — one map, stepped through ─────────────────────────────────── */

/**
 * The Build-Along. Stacking four full maps made the page taller than the version it was
 * meant to shorten, so the learner steps through one map instead — same four stages, same
 * rules, at their own pace. Stage choice is local; nothing persists.
 */
function BuildAlong() {
  const [i, setI] = useState(0);
  const stage = BUILD_ALONG_STAGES[i];
  const rule = GOLDEN_RULES[i];
  const isLast = i === BUILD_ALONG_STAGES.length - 1;

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-5 sm:p-6">
        {/* Stage picker */}
        <div className="flex flex-wrap gap-2 mb-5" role="tablist" aria-label="Build-along stages">
          {BUILD_ALONG_STAGES.map((s, index) => (
            <button
              key={s.stage}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => setI(index)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors',
                i === index
                  ? 'border-[var(--ce-golden-yellow)] bg-[var(--ce-golden-yellow)]/10 text-gold'
                  : 'border-white/15 text-foreground/55 hover:border-white/40'
              )}
            >
              Stage {s.stage}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="flex flex-col gap-3">
            <h3 className="font-headline text-xl font-bold">{stage.title}</h3>
            {rule && (
              <Badge variant="outline" className="w-fit text-gold border-[var(--ce-golden-yellow)]/40">
                {rule.rule}: {rule.title}
              </Badge>
            )}
            <p className="text-sm font-medium text-gold">{stage.why}</p>
            <p className="text-sm text-foreground/70 leading-relaxed">{stage.explanation}</p>
            <p className="text-sm text-foreground/85 font-medium">{stage.tryIt}</p>

            {rule && (
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2.5 rounded-md border border-emerald-400/30 bg-emerald-400/5 px-3 py-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                  <span className="text-xs text-foreground/75">{rule.goodExample}</span>
                </div>
                <div className="flex items-start gap-2.5 rounded-md border border-rose-400/30 bg-rose-400/5 px-3 py-2">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  <span className="text-xs text-foreground/55">{rule.poorExample}</span>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-foreground">
            <MindMapSvg stage={stage.stage} />
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="flex items-start gap-2.5 rounded-md border border-sky-400/30 bg-sky-400/5 px-4 py-2.5 flex-1">
            <Flag className="w-4 h-4 shrink-0 mt-0.5 text-sky-400" />
            <span className="text-sm text-foreground/70">
              <span className="font-semibold text-sky-400">Checkpoint: </span>
              {stage.checkpoint}
            </span>
          </span>
          {!isLast && (
            <Button type="button" variant="secondary" onClick={() => setI(i + 1)} className="shrink-0">
              Next stage <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/* ── Step 3 helper — a coached conversation, not a form ───────────────────────── */

function BranchCoach({
  branch,
  items,
  onAdd,
  onRemove,
}: {
  branch: (typeof BRANCHES)[number];
  items: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
}) {
  const [draft, setDraft] = useState('');

  const submit = () => {
    const value = draft.trim();
    if (!value) return;
    onAdd(value);
    setDraft('');
  };

  return (
    <Card className={cn('glass-panel', branch.ringClass)}>
      <CardContent className="p-5 sm:p-6">
        <h3 className={cn('font-headline text-xl font-bold mb-2', branch.colorClass)}>
          {branch.heading}
        </h3>
        <p className="text-sm text-foreground/80 mb-4">{branch.lead}</p>

        <p className="text-xs font-semibold uppercase tracking-wider text-foreground/40 mb-2">
          Ask yourself
        </p>
        <ul className="mb-4 flex flex-col gap-1.5 border-l-2 border-white/10 pl-4">
          {branch.prompts.map((prompt) => (
            <li key={prompt} className="text-sm text-foreground/65">
              {prompt}
            </li>
          ))}
        </ul>

        <p className="text-sm font-semibold text-foreground/85 mb-3">{branch.ask}</p>

        <div className="flex gap-2 mb-3">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                submit();
              }
            }}
            placeholder={branch.placeholder}
            aria-label={`Add to ${branch.name}`}
          />
          <Button type="button" onClick={submit} aria-label={`Add to ${branch.name}`}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-xs text-foreground/35 mb-4">
          Stuck? Words you could borrow: {branch.examples.join(' · ')}
        </p>

        {items.length === 0 ? (
          <p className="text-sm text-foreground/40 italic">Nothing here yet.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {items.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-white/5 px-3 py-2"
              >
                <span className="text-sm break-words min-w-0">{item}</span>
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  aria-label={`Remove ${item}`}
                  className="shrink-0 text-foreground/40 hover:text-rose-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

/* ── Lesson ───────────────────────────────────────────────────────────────────── */

export default function MindMappingLesson() {
  const [state, setState] = useState<LessonState>(EMPTY_STATE);
  // Which expandable panel is open, per accordion — drives the read-area tint.
  const [openGrow, setOpenGrow] = useState('');
  const [openFurther, setOpenFurther] = useState('');

  // Load after mount only — reading localStorage during render would desync SSR markup.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      setState({ ...EMPTY_STATE, ...saved });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const addItem = (key: BranchKey, value: string) =>
    setState((prev) => ({ ...prev, [key]: [...prev[key], value] }));

  const removeItem = (key: BranchKey, index: number) =>
    setState((prev) => ({ ...prev, [key]: prev[key].filter((_, i) => i !== index) }));

  return (
    <div className="relative">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Mind Mapping
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Organise your thoughts, connect ideas, and unlock your creativity. Mind mapping
              helps you learn better, remember more, and think clearly.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              {WHY_BENEFITS.map((benefit) => (
                <span
                  key={benefit}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2 text-sm font-medium text-foreground"
                >
                  <Check className="w-4 h-4 shrink-0 text-gold" />
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          {/* The brain hub from the reference: six concepts branching from one centre. */}
          <div className="text-foreground">
            <MindMapHeroGraphic />
          </div>
        </div>
      </section>

      {/* ── Why it matters (surfaced under the hero to mirror the reference) ──── */}
      <section className="max-w-5xl mx-auto px-4 pb-10">
        {/* What is it? — the contrast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {NOTES_COMPARISON.map((column) => (
            <Card key={column.label} className={column.good ? 'border-emerald-400/25' : undefined}>
              <CardContent className="p-5">
                <h3
                  className={cn(
                    'font-headline text-lg font-bold mb-3',
                    column.good ? 'text-emerald-400' : 'text-foreground/60'
                  )}
                >
                  {column.label}
                </h3>
                <ul className="flex flex-col gap-2">
                  {column.traits.map((trait) => (
                    <li
                      key={trait}
                      className={cn('text-sm', column.good ? 'text-foreground/80' : 'text-foreground/50')}
                    >
                      — {trait}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* One thought becoming five — the learner watches association happen. */}
        <p className="text-center text-sm text-foreground/50 mb-3">
          Say one word, and your brain does this on its own:
        </p>
        <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 mb-4">
          {ASSOCIATION_CHAIN.map((word, index) => (
            <li key={word} className="flex items-center gap-2">
              <span
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium',
                  index === 0 ? 'border-[var(--ce-golden-yellow)] text-gold' : 'border-white/15 text-foreground/70'
                )}
              >
                {word}
              </span>
              {index < ASSOCIATION_CHAIN.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-foreground/25" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
        <p className="text-center text-sm text-foreground/50">
          A mind map simply writes that chain down. That is the whole idea.
        </p>

        {/* The science is real but optional — it motivates, it doesn't gate the lesson. */}
        <Accordion type="single" collapsible className="w-full mt-6 max-w-3xl mx-auto">
          <AccordionItem value="why-it-works" className={cn(openPanelBase, 'border-b')}>
            <AccordionTrigger className="text-sm font-semibold justify-center gap-2">
              Why does it work? (the science)
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {WHY_IT_WORKS.map((item) => (
                  <div key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <h4 className="font-bold text-gold mb-1.5">{item.title}</h4>
                    <p className="text-sm text-foreground/70 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* ── Journey ribbon ───────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-10">
        <div className="glass-panel rounded-2xl py-5 px-4">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-foreground/40 mb-4">
            Today's journey
          </p>
          <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
            {JOURNEY_STEPS.map((step, index) => (
              <li key={step.label} className="flex items-center gap-2">
                <span className="flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5">
                  <span className="text-gold font-bold">{step.num}</span>
                  <span className="text-sm font-medium">{step.label}</span>
                </span>
                {index < JOURNEY_STEPS.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-foreground/25" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ── 1 · Understand (Why + What + Why-it-works, merged) ───────────────── */}
      <Step id="understand" step={1} title="Understand" lead={WHAT_IS}>
        <div className="max-w-3xl mx-auto">
          {/* Why should I care? — questions before definitions */}
          <ul className="flex flex-col gap-2.5 mb-6">
            {WHY_QUESTIONS.map((question) => (
              <li key={question} className="glass-panel rounded-lg px-5 py-3 text-foreground/80">
                {question}
              </li>
            ))}
          </ul>

          <p className="text-center font-semibold mb-4">Then mind mapping helps you:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-10">
            {WHY_BENEFITS.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5"
              >
                <Check className="w-4 h-4 shrink-0 text-gold" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>

        </div>

        <DidYouKnow section={1} />
        <MiniCheck section={1} />
        <Takeaway section={1} />
      </Step>

      {/* ── 2 · Watch (Build-Along + the five rules) ─────────────────────────── */}
      <Step
        step={2}
        title="Watch one being built"
        lead="Four stages, from a blank page to a finished map. Each stage teaches one rule."
      >
        <BuildAlong />

        {/* Rule 5 has no stage of its own — it is what happens after the map exists. */}
        {GOLDEN_RULES[4] && (
          <Card className="max-w-4xl mx-auto mt-5">
            <CardContent className="p-5 sm:p-6">
              <Badge variant="outline" className="mb-3 text-gold border-[var(--ce-golden-yellow)]/40">
                {GOLDEN_RULES[4].rule}: {GOLDEN_RULES[4].title}
              </Badge>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {GOLDEN_RULES[4].explanation}
              </p>
            </CardContent>
          </Card>
        )}

        <DidYouKnow section={2} />
        <MiniCheck section={2} />
        <Takeaway section={2} />
      </Step>

      {/* ── 3 · Build (coached, not a form) ──────────────────────────────────── */}
      <Step
        step={3}
        title="Build yours"
        lead="Four questions to sit with. Answer them as keywords — the same rules you just watched."
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-sm text-foreground/50 mb-8">
            Your answers save automatically in this browser.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BRANCHES.map((branch) => (
              <BranchCoach
                key={branch.key}
                branch={branch}
                items={state[branch.key]}
                onAdd={(value) => addItem(branch.key, value)}
                onRemove={(index) => removeItem(branch.key, index)}
              />
            ))}
          </div>
        </div>

        <Takeaway section={3} />
      </Step>

      {/* ── 4 · Reflect (+ GROW) ─────────────────────────────────────────────── */}
      <Step
        step={4}
        title="Reflect"
        lead="One to three sentences each. Short answers get finished."
      >
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          {REFLECTION_QUESTIONS.map((item) => (
            <div key={item.key}>
              <label htmlFor={item.key} className="block font-medium mb-2">
                {item.question}
              </label>
              <textarea
                id={item.key}
                rows={3}
                className={textareaClass}
                placeholder="1–3 sentences"
                value={state.reflection[item.key] ?? ''}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    reflection: { ...prev.reflection, [item.key]: e.target.value },
                  }))
                }
              />
            </div>
          ))}
        </div>

        <Separator className="max-w-3xl mx-auto my-10" />

        <div className="max-w-3xl mx-auto">
          <h3 className="font-headline text-2xl font-bold mb-2 text-center">
            Turn insight into action
          </h3>
          <p className="text-center text-sm text-foreground/60 mb-6">{GROW_INTRO}</p>

          <Accordion type="single" collapsible className="w-full" value={openGrow} onValueChange={setOpenGrow}>
            {GROW_FIELDS.map((field) => (
              <AccordionItem
                key={field.key}
                value={field.key}
                className={openPanelBase}
                style={panelStyle(openGrow === field.key)}
              >
                <AccordionTrigger className="text-left">
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--ce-golden-yellow)] text-sm font-bold text-slate-950">
                      {field.letter}
                    </span>
                    <span className="font-semibold">{field.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-foreground/60 mb-3">{field.prompt}</p>
                  <textarea
                    rows={3}
                    className={textareaClass}
                    aria-label={field.title}
                    value={state.grow[field.key] ?? ''}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        grow: { ...prev.grow, [field.key]: e.target.value },
                      }))
                    }
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <Takeaway section={4} />
      </Step>

      {/* ── The poster — the whole lesson as one printable reference ─────────── */}
      <Step
        title="The whole lesson on one page"
        lead="Print this, or keep it on your phone. Everything you have just done, in one picture."
      >
        <div className="max-w-5xl mx-auto">
          {/* The artwork is light by design, so it sits on a white card rather than
              fighting the dark theme around it. */}
          <div className="rounded-2xl bg-white p-3 sm:p-4 shadow-[0_22px_60px_-18px_rgba(0,8,32,.85)]">
            <a
              href="/images/mind-map-summary.png"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-lg overflow-hidden"
              aria-label="Open the full-size mind mapping summary poster in a new tab"
            >
              <Image
                src="/images/mind-map-summary.png"
                alt="A one-page summary of mind mapping: what it is, the five golden rules, why it works, an example personality mind map with Strengths, Weaknesses, Values and Goals branching from a central ME node, what to use mind maps for, and the four build-along stages."
                width={1536}
                height={1024}
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="w-full h-auto"
                priority={false}
              />
              <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                <Maximize2 className="w-3 h-3" /> View full size
              </span>
            </a>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/images/mind-map-summary.png"
              download="mind-mapping-summary.png"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold hover:border-white/40 transition-colors"
            >
              <Download className="w-4 h-4" /> Download the poster
            </a>
            <a
              href="/images/mind-map-summary.png"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold hover:border-white/40 transition-colors"
            >
              <Maximize2 className="w-4 h-4" /> Open full size
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </Step>

      {/* ── Your Challenge — the beginner finishes naturally here ────────────── */}
      <Step title="Before you leave">
        <div className="max-w-2xl mx-auto">
          <Card className="mb-6">
            <CardContent className="p-6">
              <p className="font-semibold mb-4">Can you now…</p>
              <ul className="flex flex-col gap-2.5">
                {SUCCESS_CHECKLIST.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 shrink-0 text-emerald-400" />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-[var(--ce-golden-yellow)]/40">
            <CardContent className="p-6 sm:p-8 text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-4 text-gold" />
              <h3 className="font-headline text-2xl font-bold mb-3">{CHALLENGE.title}</h3>
              <p className="text-foreground/70 mb-5 leading-relaxed">{CHALLENGE.intro}</p>

              <ol className="flex flex-col gap-2 text-left max-w-sm mx-auto mb-6">
                {CHALLENGE.steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm text-foreground/75">{step}</span>
                  </li>
                ))}
              </ol>

              <p className="font-headline text-xl font-bold text-gold">{CHALLENGE.close}</p>
            </CardContent>
          </Card>
        </div>
      </Step>

      {/* ── 5 · Go Further — everything advanced, collapsed by default ───────── */}
      <Step
        step={5}
        title="Go further"
        lead="Open only what you need. Nothing below is required to finish the lesson."
      >
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full" value={openFurther} onValueChange={setOpenFurther}>
            {/* Advanced Applications */}
            <AccordionItem value="applications" className={openPanelBase} style={panelStyle(openFurther === 'applications')}>
              <AccordionTrigger className="text-left font-semibold">
                Advanced applications — where else can you use this?
              </AccordionTrigger>
              <AccordionContent>
                <Tabs defaultValue={APPLICATIONS[0].tab} className="w-full">
                  <TabsList className="w-full flex-wrap h-auto justify-start">
                    {APPLICATIONS.map((app) => (
                      <TabsTrigger key={app.tab} value={app.tab}>
                        {app.tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {APPLICATIONS.map((app) => (
                    <TabsContent key={app.tab} value={app.tab}>
                      <div className="flex justify-center my-4">
                        <span className="inline-flex items-center justify-center rounded-full border-2 border-[var(--ce-golden-yellow)] px-5 py-2 font-bold text-gold">
                          {app.centre}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {app.items.map((item) => (
                          <div
                            key={item}
                            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-center"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </AccordionContent>
            </AccordionItem>

            {/* Common Mistakes */}
            <AccordionItem value="mistakes" className={openPanelBase} style={panelStyle(openFurther === 'mistakes')}>
              <AccordionTrigger className="text-left font-semibold">
                Common beginner mistakes
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BEGINNER_MISTAKES.map((item) => (
                    <div key={item.mistake} className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-4 h-4 shrink-0 text-rose-400" />
                        <h4 className="font-bold text-sm text-rose-400">{item.mistake}</h4>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                        <p className="text-sm text-foreground/70 leading-relaxed">{item.better}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Professional Software */}
            <AccordionItem value="software" className={openPanelBase} style={panelStyle(openFurther === 'software')}>
              <AccordionTrigger className="text-left font-semibold">
                Professional software — turn your map visual
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                  {TOOL_GROUPS.map((group) => (
                    <div key={group.audience} className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <h4 className="font-headline font-bold text-gold mb-3">{group.audience}</h4>
                      <ul className="flex flex-col gap-2 mb-3">
                        {group.tools.map((tool) => (
                          <li key={tool.name}>
                            <a
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/85 hover:text-gold transition-colors"
                            >
                              {tool.name}
                              <ExternalLink className="w-3 h-3 shrink-0 opacity-60" aria-hidden="true" />
                              <span className="sr-only">(opens in a new tab)</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-foreground/55 leading-relaxed">{group.note}</p>
                    </div>
                  ))}
                </div>

                <p className="text-center text-sm text-foreground/70 italic mb-4">{TOOLS_CLOSING}</p>

                <p className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-foreground/45 leading-relaxed">
                  {TOOLS_DISCLAIMER}
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Practice Challenges — activities, not navigation. No links by design. */}
            <AccordionItem value="practice" className={openPanelBase} style={panelStyle(openFurther === 'practice')}>
              <AccordionTrigger className="text-left font-semibold">
                Practice challenges — keep going
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-foreground/60 mb-4">{PRACTICE_INTRO}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRACTICE_CHALLENGES.map((challenge) => (
                    <div key={challenge.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <div className="text-xl mb-2" aria-hidden="true">
                        {challenge.icon}
                      </div>
                      <h4 className="font-bold mb-1.5">{challenge.title}</h4>
                      <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                        {challenge.prompt}
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                        Try this yourself
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Common Questions */}
            <AccordionItem value="questions" className={openPanelBase} style={panelStyle(openFurther === 'questions')}>
              <AccordionTrigger className="text-left font-semibold">Common questions</AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="w-full">
                  {COMMON_QUESTIONS.map((faq, index) => (
                    <AccordionItem key={faq.question} value={`q-${index}`}>
                      <AccordionTrigger className="text-left text-sm">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-foreground/70 leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Step>
    </div>
  );
}
