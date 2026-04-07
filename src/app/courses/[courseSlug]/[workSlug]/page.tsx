import { getLiteraryWork, getCourses } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import LiteraryWorkClient from '@/components/LiteraryWorkClient';
import { SocialShare } from '@/components/SocialShare';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { BackNav } from '@/components/BackNav';

export async function generateStaticParams() {
  const params: { courseSlug: string; workSlug: string }[] = [];
  getCourses().forEach((c) =>
    c.categories.forEach((cat) =>
      cat.works.forEach((w) => params.push({ courseSlug: c.slug, workSlug: w.slug }))
    )
  );
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ courseSlug: string, workSlug: string }> }) {
  const { courseSlug, workSlug } = await params;
  const work = getLiteraryWork(courseSlug, workSlug);
  if (!work) return { title: 'Work not found' };
  return {
    title: `${work.title} by ${work.author} | CEFR English`,
    description: `An analysis of ${work.title}, part of the ${courseSlug} course.`,
  };
}

export default async function LiteraryWorkPage({ params }: { params: Promise<{ courseSlug: string, workSlug: string }> }) {
  const { courseSlug, workSlug } = await params;
  const work = getLiteraryWork(courseSlug, workSlug);
  if (!work) notFound();

  const existingCourse = getCourses().find(c => c.slug === courseSlug);
  const courseFallbacks: Record<string, any> = {};
  const fallback = courseFallbacks[courseSlug];
  const courseLabel = existingCourse?.name ?? fallback?.name ?? courseSlug
    .split('-')
    .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <BackNav 
        crumbs={[
          { label: 'Home', href: '/' },
          { label: courseLabel, href: `/courses/${courseSlug}` }
        ]} 
        current={work.title} 
      />

      {/* Hero Header */}
      <div className="bg-[linear-gradient(135deg,#021A42_0%,#043370_55%,#00A2C9_100%)] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-400/20 to-transparent blur-3xl pointer-events-none" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium text-cyan-100 mb-6">
            <BookOpen className="w-4 h-4" /> {work!.category}
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4 tracking-tight">{work!.title}</h1>
          <p className="mt-3 text-xl text-cyan-100/90 font-light">by {work!.author}</p>
          <div className="mt-8 flex justify-center">
            <SocialShare title={`${work!.title} by ${work!.author}`} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex-1">
        <div className="max-w-4xl mx-auto">
          <LiteraryWorkClient work={work!} />
        </div>
      </div>

      {/* Bottom Back Button */}
      <div className="border-t border-slate-200 dark:border-slate-800 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl flex justify-between items-center">
          <Link
            href={`/courses/${courseSlug}`}
            className="inline-flex items-center gap-2 font-semibold text-[#043370] dark:text-cyan-400 hover:text-[#00A2C9] dark:hover:text-[var(--ce-golden-yellow)] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to {courseLabel}
          </Link>
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            ← All Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
