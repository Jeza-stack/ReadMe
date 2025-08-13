import React from 'react';
import ModuleAccordion from './ModuleAccordion';
import canonical from '@/data/courses/soft-skills-mastery.json';

export default function CourseDetail({ course }: { course: any }) {
  // Merge passed course header (from readme-data.json) with canonical module data
  const merged = { ...canonical, ...course } as any;
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