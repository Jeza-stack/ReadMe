import React from 'react';
import ModuleAccordion, { WEF_SKILL_TAGS } from './ModuleAccordion';
import canonical from '@/data/courses/soft-skills-mastery.json';

export default function CourseDetail({ course }: { course: any }) {
  // Merge passed course header (from readme-data.json) with canonical module data
  const merged = { ...canonical, ...course } as any;
  const legend = [
    { skill: 'Active Learning & Learning Strategies', color: '#1E88E5', icon: '📘' },
    { skill: 'Complex Problem Solving', color: '#F4511E', icon: '🧩' },
    { skill: 'Creativity, Originality & Initiative', color: '#8E24AA', icon: '💡' },
    { skill: 'Critical Thinking & Analysis', color: '#43A047', icon: '🔍' },
    { skill: 'Communication & Collaboration', color: '#E53935', icon: '💬' },
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
          {legend.map((item) => (
            <div key={item.skill} className="flex items-center rounded-lg shadow-sm bg-white dark:bg-gray-800 px-4 py-2" aria-label={`Skill: ${item.skill}`}>
              <span
                aria-hidden
                className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full"
                style={{ backgroundColor: item.color }}
              >
                <span className="text-white text-sm leading-none">{item.icon}</span>
              </span>
              <span className="text-sm font-medium">{item.skill}</span>
            </div>
          ))}
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