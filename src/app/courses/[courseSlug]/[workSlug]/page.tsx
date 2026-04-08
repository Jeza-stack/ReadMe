import { getLiteraryWork, getCourses } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import LiteraryWorkClient from '@/components/LiteraryWorkClient';
import ModernWorkClient from '@/components/ModernWorkClient';
import { SocialShare } from '@/components/SocialShare';
import { ArrowLeft, BookOpen, Sparkles, Cpu, GraduationCap, Zap } from 'lucide-react';
import { BackNav } from '@/components/BackNav';

// Slugs that use the modern, vibrant layout
const MODERN_COURSE_SLUGS = new Set(['ai-tools', 'chat-gpt-safety', 'academic-language']);

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
  const courseLabel = existingCourse?.name ?? courseSlug
    .split('-')
    .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

  const isModern = MODERN_COURSE_SLUGS.has(courseSlug);

  /* ── Modern / Tech layout ── */
  if (isModern) {
    // Pick icon based on course
    const iconMap: Record<string, React.ReactNode> = {
      'ai-tools': <Cpu className="w-5 h-5" />,
      'chat-gpt-safety': <Zap className="w-5 h-5" />,
      'academic-language': <GraduationCap className="w-5 h-5" />,
    };
    const heroIcon = iconMap[courseSlug] ?? <Sparkles className="w-5 h-5" />;

    return (
      <div className="min-h-screen bg-[#0a0f1a] flex flex-col">
        <BackNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: courseLabel, href: `/courses/${courseSlug}` }
          ]}
          current={work.title}
        />

        {/* Modern Hero — deep dark with animated gradient mesh */}
        <div className="relative overflow-hidden py-16 md:py-24">
          {/* Animated gradient blobs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />

          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center z-10">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 text-sm font-semibold text-cyan-300 mb-6">
              {heroIcon}
              <span>{work.category}</span>
            </div>
            <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4 tracking-tight bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-transparent">
              {work.title}
            </h1>
            <p className="mt-3 text-lg text-slate-400 font-light">
              by <span className="text-cyan-300 font-medium">{work.author}</span>
            </p>
            <div className="mt-8 flex justify-center">
              <SocialShare title={`${work.title} by ${work.author}`} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex-1">
          <div className="max-w-4xl mx-auto">
            <ModernWorkClient work={work} />
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="border-t border-white/10 py-8 bg-[#0a0f1a]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl flex justify-between items-center">
            <Link
              href={`/courses/${courseSlug}`}
              className="inline-flex items-center gap-2 font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to {courseLabel}
            </Link>
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              ← All Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── Classic literary layout (unchanged) ── */
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
