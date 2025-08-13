import React from 'react';
import ModuleAccordion, { SKILL_INFO } from './ModuleAccordion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import canonical from '@/data/courses/soft-skills-mastery.json';

export default function CourseDetail({ course }: { course: any }) {
  // Merge passed course header (from readme-data.json) with canonical module data
  const merged = { ...canonical, ...course } as any;
  const legend = [
    { key: 'Analytical Thinking' },
    { key: 'Complex Problem Solving' as any, fallback: { color: '#F4511E', icon: '🧩', description: 'Devising effective solutions for multi-faceted challenges.' } },
    { key: 'Creative Thinking' },
    { key: 'Critical Thinking & Analysis' as any, fallback: { color: '#43A047', icon: '🔍', description: 'Evaluating information to form reasoned judgments.' } },
    { key: 'Curiosity and Lifelong Learning' },
  ];
  return (
    <main className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold">{merged.title || merged.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{merged.subtitle}</p>
        <p className="mt-4 max-w-3xl">{merged.description}</p>
        <div className="mt-4 flex gap-3">
          <a href="#enroll" className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-white">Enroll / Learn More</a>
        </div>
      </header>

      {/* Legend */}
      <section aria-label="WEF skills legend" className="mb-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {legend.map((item) => {
            const data = SKILL_INFO[item.key as keyof typeof SKILL_INFO] || item.fallback;
            if (!data) return null;
            return (
              <TooltipProvider key={String(item.key)} delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center rounded-lg shadow-sm bg-white dark:bg-gray-800 px-4 py-2 cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary" aria-describedby={`legend-${item.key}`}>
                      <span
                        aria-hidden
                        className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full"
                        style={{ backgroundColor: data.color }}
                      >
                        <span className="text-white text-sm leading-none">{data.icon}</span>
                      </span>
                      <span className="text-sm font-medium">{String(item.key)}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent id={`legend-${item.key}`} className="overflow-visible bg-white dark:bg-gray-800 text-slate-900 dark:text-white max-w-[250px] p-3">
                    <div className="relative">
                      <span className="absolute -top-2 left-4 h-3 w-3 rotate-45 bg-white dark:bg-gray-800 shadow-sm" aria-hidden />
                      <div className="flex items-start gap-2">
                        <span className="text-base" aria-hidden>{data.icon}</span>
                        <div>
                          <div className="font-semibold">{String(item.key)}</div>
                          <div className="text-sm opacity-90">{data.description}</div>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="modules" className="space-y-6">
        <h2 id="modules" className="text-2xl font-bold">Course Modules</h2>
        <div className="space-y-4">
          {(merged.modules || []).map((m: any) => (
            <ModuleAccordion key={m.id} module={m} />
          ))}
        </div>
      </section>

      <aside className="mt-10">
        <h3 className="text-xl font-semibold">Course details</h3>
        <ul className="mt-3 space-y-2 text-sm">
          <li><strong>Duration:</strong> {merged.durationWeeks} weeks</li>
          <li><strong>Format:</strong> {merged.format}</li>
          <li><strong>Certificate:</strong> {merged.certificate?.award}</li>
        </ul>
      </aside>

      <section id="enroll" className="mt-12">
        <h3 className="text-xl font-bold">Enroll</h3>
        <p className="mt-2">Enrollment is open. Complete the modules and submit a final portfolio to receive a digital certificate.</p>
        <a className="mt-4 inline-block rounded bg-accent px-4 py-2 text-white" href="/contact">Contact to enroll</a>
      </section>
    </main>
  );
}