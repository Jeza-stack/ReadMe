import React from 'react';
import courseData from '@/data/courses/soft-skills-mastery.json';
import { ModuleAccordion, ModuleItem } from '@/components/ModuleAccordion';
import { CourseCTA } from '@/components/CourseCTA';

type CourseHeader = { name?: string; description?: string };

export default function CourseDetail({ course }: { course: CourseHeader }) {
  const modules = (courseData.modules as ModuleItem[]) || [];
  const title = course?.name || (courseData as any).title;
  const description = course?.description || (courseData as any).description;
  const subtitle = (courseData as any).subtitle;
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">{title}</h1>
          {subtitle && <p className="mt-3 text-lg text-foreground/70">{subtitle}</p>}
          {description && <p className="mt-5 text-foreground/80">{description}</p>}
          <div className="mt-4 text-sm text-foreground/60">
            <span>Duration: {(courseData as any).durationWeeks} weeks</span>
            <span className="mx-2">•</span>
            <span>Format: {(courseData as any).format}</span>
          </div>
        </header>
        <section aria-labelledby="modules-heading">
          <h2 id="modules-heading" className="sr-only">Course Modules</h2>
          <ModuleAccordion modules={modules} />
        </section>
        <section className="mt-10">
          <CourseCTA enrollHref="#enroll" syllabusHref="#syllabus" />
        </section>
      </div>
    </div>
  );
}