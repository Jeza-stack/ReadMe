'use client';

import Link from 'next/link';
import type { LiteraryWork } from '@/lib/types';
import { InteractiveText, Quiz } from '@/components/LiteraryWorkClient';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Literature Guide — LitCharts-calibre study guide for English I–IV works.
// Fixed section order (Content Style Guide §3); sections without data are
// hidden, never reordered. Four-Question Framework: opener (why am I here),
// sections (what to learn), Why It Matters (relevance), What Next (≤3 actions).

const BURGUNDY = '#7B2D3B';

type Props = {
  work: LiteraryWork;
  courseSlug: string;
  courseName: string;
  next?: { slug: string; title: string } | null;
  /** 'literature' = literary work (author/themes framing);
      'language' = grammar/skills lesson (Units IV–VI: no author persona,
      pedagogic labels, sources note instead of biography). */
  variant?: 'literature' | 'language';
  /** Other works in the same unit (knowledge web). */
  related?: { slug: string; title: string; author?: string }[];
  unitName?: string;
};

export default function LiteratureGuide({ work, courseSlug, courseName, next, variant = 'literature', related = [], unitName }: Props) {
  const ca = work.contentAnalysis;
  const ai = work.authorInfo;
  const isLanguage = variant === 'language';

  const labels = isLanguage
    ? {
        overview: 'What You Will Learn',
        read: 'The Lesson',
        themes: 'Key Concepts',
        analysis: 'The Approach',
        vocabulary: 'Key Terms',
        quiz: 'Quiz',
      }
    : {
        overview: 'Overview',
        read: 'Read',
        themes: 'Themes',
        analysis: 'Critical Analysis',
        vocabulary: 'Vocabulary',
        quiz: 'Check Your Understanding',
      };

  const lm = work.lessonMeta;
  const hasBeforeYouBegin =
    isLanguage &&
    Boolean(lm?.estimatedTime || lm?.difficulty || lm?.prerequisites?.length || lm?.objectives?.length);

  const sections: { id: string; label: string; show: boolean }[] = [
    { id: 'begin', label: 'Before You Begin', show: hasBeforeYouBegin },
    { id: 'overview', label: labels.overview, show: Boolean(ca?.summary) },
    { id: 'author', label: 'About the Author', show: !isLanguage && Boolean(ai?.biography || ai?.writingStyle) },
    { id: 'context', label: 'Historical Context', show: !isLanguage && Boolean(ai?.historicalContext) },
    { id: 'themes', label: labels.themes, show: isLanguage && Array.isArray(ca?.themes) && ca.themes.length > 0 },
    { id: 'read', label: !isLanguage && work.copyright?.status === 'copyrighted' ? 'Selected Passages' : labels.read, show: Boolean(work.fullText) },
    { id: 'watch', label: 'Watch', show: !isLanguage && Boolean(work.videoEmbedId) },
    { id: 'examples', label: 'Worked Examples', show: isLanguage && Array.isArray(work.workedExamples) && work.workedExamples.length > 0 },
    { id: 'mistakes', label: 'Common Mistakes', show: isLanguage && Array.isArray(work.commonMistakes) && work.commonMistakes.length > 0 },
    { id: 'lit-themes', label: labels.themes, show: !isLanguage && Array.isArray(ca?.themes) && ca.themes.length > 0 },
    { id: 'devices', label: 'Literary Devices', show: !isLanguage && Array.isArray(ca?.literaryDevices) && ca.literaryDevices.length > 0 },
    { id: 'analysis', label: labels.analysis, show: Boolean(ca?.criticalAnalysis) },
    { id: 'matters', label: 'Why It Matters', show: Boolean(ca?.relevance) },
    { id: 'vocabulary', label: labels.vocabulary, show: Array.isArray(work.difficultWords) && work.difficultWords.length > 0 },
    { id: 'faqs', label: 'FAQs', show: Array.isArray(work.faqs) && work.faqs.length > 0 },
    { id: 'quiz', label: 'Quiz', show: Array.isArray(work.quiz) && work.quiz.length > 0 },
    { id: 'sources', label: 'Background & Sources', show: isLanguage && Boolean(ai?.biography || ai?.historicalContext) },
  ].filter((s) => s.show);

  const H = ({ id, children }: { id: string; children: React.ReactNode }) => (
    <h2
      id={id}
      className="scroll-mt-28 font-headline text-2xl font-bold mb-4 pb-2 border-b"
      style={{ borderColor: `${BURGUNDY}55` }}
    >
      {children}
    </h2>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:flex lg:gap-10">
        {/* Sticky section nav (desktop) */}
        <aside className="hidden lg:block w-52 flex-shrink-0">
          <nav aria-label="Guide sections" className="sticky top-28">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              In this guide
            </p>
            <ul className="space-y-1 border-l border-border">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block pl-3 py-1 text-sm text-muted-foreground hover:text-foreground hover:border-l-2 hover:-ml-[2px] transition-colors"
                    style={{ borderColor: BURGUNDY }}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="flex-1 min-w-0 max-w-3xl">
          {/* Header + Q1: why am I here */}
          <header className="mb-10" style={{ borderTop: `4px solid ${BURGUNDY}` }}>
            <Link
              href={`/courses/${courseSlug}`}
              className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> {courseName}
            </Link>
            <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
              {work.category}
            </p>
            <h1 className="font-headline text-4xl font-bold mt-1">{work.title}</h1>
            {!isLanguage && <p className="text-lg text-muted-foreground mt-1">by {work.author}</p>}
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {isLanguage
                ? `Language and skills lesson for ${courseName} (${work.category}). Work through the lesson, then practise with the quiz.`
                : `Prescribed reading for ${courseName} (${work.category}). Read the guide before class; finish with the quiz to check your understanding.`}
            </p>
          </header>

          {/* Mobile section chips */}
          <nav aria-label="Guide sections" className="lg:hidden mb-8 -mx-4 px-4 overflow-x-auto">
            <div className="flex gap-2 w-max">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="whitespace-nowrap rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="space-y-12">
            {/* Before You Begin — orientation block (JB-authored lessonMeta) */}
            {hasBeforeYouBegin && (
              <section>
                <H id="begin">Before You Begin</H>
                <div className="rounded-xl border border-border bg-card/50 p-5 space-y-3 text-sm">
                  <div className="flex flex-wrap gap-4 text-muted-foreground">
                    {lm?.estimatedTime && (
                      <span>
                        <strong className="text-foreground">Estimated time:</strong> {lm.estimatedTime}
                      </span>
                    )}
                    {lm?.difficulty && (
                      <span>
                        <strong className="text-foreground">Difficulty:</strong> {lm.difficulty}
                      </span>
                    )}
                  </div>
                  {lm?.prerequisites && lm.prerequisites.length > 0 && (
                    <div>
                      <strong>Prerequisites:</strong>
                      <ul className="list-disc list-inside mt-1 text-muted-foreground">
                        {lm.prerequisites.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {lm?.objectives && lm.objectives.length > 0 && (
                    <div>
                      <strong>By the end of this lesson you will be able to:</strong>
                      <ul className="list-disc list-inside mt-1 text-muted-foreground">
                        {lm.objectives.map((o, i) => (
                          <li key={i}>{o}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {ca?.summary && (
              <section>
                <H id="overview">{labels.overview}</H>
                <p className="text-lg leading-relaxed text-foreground/90">{ca.summary}</p>
              </section>
            )}

            {/* Language lessons: key learning points up front */}
            {isLanguage && Array.isArray(ca?.themes) && ca.themes.length > 0 && (
              <section>
                <H id="themes">{labels.themes}</H>
                <ul className="space-y-3">
                  {ca.themes.map((t, i) => (
                    <li
                      key={i}
                      className="rounded-lg border border-border bg-card/50 px-4 py-3 text-foreground/90"
                      style={{ borderLeft: `3px solid ${BURGUNDY}` }}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {!isLanguage && (ai?.biography || ai?.writingStyle) && (
              <section>
                <H id="author">About the Author</H>
                <div className="space-y-4 text-foreground/85 leading-relaxed">
                  {ai.biography && <p>{ai.biography}</p>}
                  {ai.writingStyle && (
                    <p>
                      <strong>Writing style:</strong> {ai.writingStyle}
                    </p>
                  )}
                  {Array.isArray(ai.majorWorks) && ai.majorWorks.length > 0 && (
                    <p>
                      <strong>Major works:</strong> {ai.majorWorks.join(' · ')}
                    </p>
                  )}
                  {ai.influence && (
                    <p>
                      <strong>Influence:</strong> {ai.influence}
                    </p>
                  )}
                </div>
              </section>
            )}

            {!isLanguage && ai?.historicalContext && (
              <section>
                <H id="context">Historical Context</H>
                <p className="text-foreground/85 leading-relaxed">{ai.historicalContext}</p>
              </section>
            )}

            {work.fullText && (
              <section>
                <H id="read">
                  {!isLanguage && work.copyright?.status === 'copyrighted'
                    ? 'Selected Passages'
                    : labels.read}
                </H>
                {isLanguage ? (
                  <article className="prose prose-lg max-w-none dark:prose-invert">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{work.fullText}</ReactMarkdown>
                  </article>
                ) : (
                  <>
                    {work.copyright?.status === 'copyrighted' && (
                      <p className="text-sm text-muted-foreground mb-4">
                        This work is under copyright. The passages below are brief,
                        attributed quotations selected to support the analysis in this
                        guide.
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mb-6">
                      Tap the <span className="text-primary font-bold">bolded words</span> for
                      definitions and connotations.
                    </p>
                    <InteractiveText text={work.fullText} difficultWords={work.difficultWords ?? []} />
                    {work.copyright?.status === 'copyrighted' && work.copyright.readAt && (
                      <a
                        href={work.copyright.readAt}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 flex items-center justify-between rounded-xl border border-border bg-card/50 hover:bg-card p-4 transition-colors group"
                      >
                        <span>
                          <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                            Authorised source
                          </span>
                          <span className="block font-semibold mt-1 group-hover:text-primary">
                            Read the full text of {work.title}
                          </span>
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                      </a>
                    )}
                  </>
                )}
              </section>
            )}

            {/* Worked Examples — language lessons */}
            {isLanguage && Array.isArray(work.workedExamples) && work.workedExamples.length > 0 && (
              <section>
                <H id="examples">Worked Examples</H>
                <div className="space-y-4">
                  {work.workedExamples.map((ex, i) => (
                    <div key={i} className="rounded-lg border border-border bg-card/50 p-4">
                      {ex.title && <p className="font-headline font-bold mb-2">{ex.title}</p>}
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{ex.example}</ReactMarkdown>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Common Mistakes — language lessons */}
            {isLanguage && Array.isArray(work.commonMistakes) && work.commonMistakes.length > 0 && (
              <section>
                <H id="mistakes">Common Mistakes</H>
                <div className="space-y-3">
                  {work.commonMistakes.map((m, i) => (
                    <div key={i} className="rounded-lg border border-border bg-card/50 p-4 text-sm">
                      <p className="text-red-400/90">
                        <strong>✗</strong> {m.mistake}
                      </p>
                      <p className="text-green-400/90 mt-2">
                        <strong>✓</strong> {m.correction}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Official video (rights sit with the uploader; embed, don't copy) */}
            {!isLanguage && work.videoEmbedId && (
              <section>
                <H id="watch">Watch</H>
                <div className="relative aspect-video">
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${work.videoEmbedId}`}
                    title={`${work.title} by ${work.author}`}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </section>
            )}

            {!isLanguage && Array.isArray(ca?.themes) && ca.themes.length > 0 && (
              <section>
                <H id="lit-themes">Themes</H>
                <ul className="space-y-3">
                  {ca.themes.map((t, i) => (
                    <li
                      key={i}
                      className="rounded-lg border border-border bg-card/50 px-4 py-3 text-foreground/90"
                      style={{ borderLeft: `3px solid ${BURGUNDY}` }}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {!isLanguage && Array.isArray(ca?.literaryDevices) && ca.literaryDevices.length > 0 && (
              <section>
                <H id="devices">Literary Devices</H>
                <dl className="space-y-4">
                  {ca.literaryDevices.map((ld, i) => (
                    <div key={i} className="rounded-lg border border-border bg-card/50 p-4">
                      <dt className="font-headline font-bold">{ld.device}</dt>
                      <dd className="text-foreground/80 italic mt-1">“{ld.example}”</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {ca?.criticalAnalysis && (
              <section>
                <H id="analysis">{labels.analysis}</H>
                <p className="text-foreground/85 leading-relaxed">{ca.criticalAnalysis}</p>
              </section>
            )}

            {/* Q3 — why does it matter */}
            {ca?.relevance && (
              <section>
                <H id="matters">Why It Matters</H>
                <blockquote
                  className="rounded-xl border border-border bg-card/50 p-5 leading-relaxed text-foreground/90"
                  style={{ borderLeft: `4px solid ${BURGUNDY}` }}
                >
                  {ca.relevance}
                </blockquote>
              </section>
            )}

            {Array.isArray(work.difficultWords) && work.difficultWords.length > 0 && (
              <section>
                <H id="vocabulary">{labels.vocabulary}</H>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {work.difficultWords.map((w) => (
                    <div key={w.word} className="rounded-lg border border-border bg-card/50 p-4">
                      <dt className="font-headline font-bold text-primary">{w.word}</dt>
                      <dd className="text-sm text-foreground/80 mt-1">{w.definition}</dd>
                      {w.connotation && (
                        <dd className="text-sm text-muted-foreground mt-1">
                          <em>Connotation:</em> {w.connotation}
                        </dd>
                      )}
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {Array.isArray(work.faqs) && work.faqs.length > 0 && (
              <section>
                <H id="faqs">Frequently Asked Questions</H>
                <Accordion type="single" collapsible className="w-full border border-border rounded-lg bg-card/50">
                  {work.faqs.map((faq, index) => (
                    <AccordionItem
                      value={`item-${index}`}
                      key={index}
                      className={cn(index === work.faqs.length - 1 && 'border-b-0')}
                    >
                      <AccordionTrigger className="font-semibold text-left px-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-5 text-foreground/80 prose prose-sm max-w-none dark:prose-invert">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{faq.answer}</ReactMarkdown>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}

            {Array.isArray(work.quiz) && work.quiz.length > 0 && (
              <section>
                <H id="quiz">{labels.quiz}</H>
                <Quiz questions={work.quiz} />
              </section>
            )}

            {/* Language lessons: honest sources note instead of an author persona */}
            {isLanguage && (ai?.biography || ai?.historicalContext) && (
              <section>
                <H id="sources">Background &amp; Sources</H>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  {ai.biography && <p>{ai.biography}</p>}
                  {ai.historicalContext && <p>{ai.historicalContext}</p>}
                  {Array.isArray(ai.majorWorks) && ai.majorWorks.length > 0 && (
                    <p>
                      <strong>Reference works:</strong> {ai.majorWorks.join(' · ')}
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Related in this unit (knowledge web) */}
            {related.length > 0 && (
              <section aria-label="Related" className="border-t border-border pt-8">
                <h2 className="font-headline text-lg font-bold mb-4">
                  More from {unitName ?? 'this unit'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/courses/${courseSlug}/${r.slug}`}
                      className="rounded-xl border border-border bg-card/50 hover:bg-card p-4 transition-colors group"
                    >
                      <span className="block font-semibold text-sm group-hover:text-primary leading-snug">
                        {r.title}
                      </span>
                      {r.author && (
                        <span className="block text-xs text-muted-foreground mt-1">{r.author}</span>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Q4 — what next (≤3 actions) */}
            <section aria-label="What next" className="border-t border-border pt-8">
              <h2 className="font-headline text-lg font-bold mb-4">What next?</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                {next && (
                  <Link
                    href={`/courses/${courseSlug}/${next.slug}`}
                    className="flex-1 rounded-xl border border-border bg-card/50 hover:bg-card p-4 transition-colors group"
                  >
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      Next work
                    </span>
                    <span className="flex items-center justify-between mt-1 font-semibold group-hover:text-primary">
                      {next.title} <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                )}
                <Link
                  href={`/courses/${courseSlug}`}
                  className="flex-1 rounded-xl border border-border bg-card/50 hover:bg-card p-4 transition-colors group"
                >
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Course
                  </span>
                  <span className="flex items-center justify-between mt-1 font-semibold group-hover:text-primary">
                    Back to {courseName} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
