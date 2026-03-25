import { getCourse, getCourses } from '@/lib/data';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { BookText, ChevronRight } from 'lucide-react';
import { BackNav } from '@/components/BackNav';

// Fallback shape for courses not yet in the JSON data
type CourseData = {
  name: string;
  description: string;
  slug: string;
  categories: Array<{
    name: string;
    works: Array<{ slug: string; title: string; author?: string }>;
  }>;
};

// Map of rich descriptions for individually requested courses
const courseFallbacks: Record<string, CourseData> = {
  'english-1': {
    name: 'English I',
    description: 'Foundational course in English language and literature competency for absolute beginners. Covers basic vocabulary, grammar, and everyday expressions.',
    slug: 'english-1',
    categories: [
      { name: 'Unit 1 – Greetings & Expressions', works: [{ slug: 'greetings', title: 'Basic Greetings', author: 'Core Faculty' }, { slug: 'numbers', title: 'Numbers & Time', author: 'Core Faculty' }] },
      { name: 'Unit 2 – Elementary Grammar', works: [{ slug: 'nouns', title: 'Nouns & Articles', author: 'Core Faculty' }, { slug: 'verbs', title: 'Simple Present Tense', author: 'Core Faculty' }] },
    ],
  },
  'english-2': {
    name: 'English II',
    description: 'Elementary course covering grammar, everyday communication, and simple writing tasks for learners building on A1 foundations.',
    slug: 'english-2',
    categories: [
      { name: 'Unit 1 – Everyday Conversations', works: [{ slug: 'shopping', title: 'Shopping & Transactions', author: 'Core Faculty' }, { slug: 'travel', title: 'Travel Basics', author: 'Core Faculty' }] },
      { name: 'Unit 2 – Writing Skills', works: [{ slug: 'email', title: 'Writing Simple Emails', author: 'Core Faculty' }] },
    ],
  },
  'english-3': {
    name: 'English III',
    description: 'Intermediate course expanding vocabulary, complex sentence structures, and practical communication in familiar contexts.',
    slug: 'english-3',
    categories: [
      { name: 'Unit 1 – Complex Grammar', works: [{ slug: 'past-tense', title: 'Past Tenses in Depth', author: 'Core Faculty' }, { slug: 'conditionals', title: 'Conditional Clauses', author: 'Core Faculty' }] },
      { name: 'Unit 2 – Reading & Comprehension', works: [{ slug: 'reading', title: 'Reading Strategies', author: 'Core Faculty' }] },
    ],
  },
  'english-4': {
    name: 'English IV',
    description: 'Upper-intermediate course focused on nuanced expression, professional interactions, and complex writing tasks.',
    slug: 'english-4',
    categories: [
      { name: 'Unit 1 – Professional Communication', works: [{ slug: 'meetings', title: 'Business Meetings', author: 'Core Faculty' }, { slug: 'presentations', title: 'Formal Presentations', author: 'Core Faculty' }] },
      { name: 'Unit 2 – Academic Writing', works: [{ slug: 'essays', title: 'Essay Structures', author: 'Core Faculty' }] },
    ],
  },
  'cefr-english': {
    name: 'CEFR English',
    description: 'Comprehensive mastery of the Common European Framework of Reference for Languages, from A1 to C2 proficiency standards.',
    slug: 'cefr-english',
    categories: [
      { 
        name: 'Foundation (A1 - A2)', 
        works: [
          { slug: '/level/a1', title: 'Level A1 - Beginner', author: 'Academic Faculty' },
          { slug: '/level/a2', title: 'Level A2 - Elementary', author: 'Academic Faculty' }
        ] 
      },
      { 
        name: 'Independence (B1 - B2)', 
        works: [
          { slug: '/level/b1', title: 'Level B1 - Intermediate', author: 'Academic Faculty' },
          { slug: '/level/b2', title: 'Level B2 - Upper Intermediate', author: 'Academic Faculty' }
        ] 
      },
      { 
        name: 'Proficiency (C1 - C2)', 
        works: [
          { slug: '/level/c1', title: 'Level C1 - Advanced', author: 'Academic Faculty' },
          { slug: '/level/c2', title: 'Level C2 - Proficiency', author: 'Academic Faculty' }
        ] 
      },
      { 
        name: 'Assessments & Samples', 
        works: [
          { slug: '/assessment/quick', title: 'Quick Placement Test', author: 'Assessment Faculty' },
          { slug: '/assessment/samples', title: 'Sample Questions', author: 'Assessment Faculty' },
          { slug: '/assessment', title: 'Detailed Diagnostics', author: 'Assessment Faculty' }
        ] 
      },
    ],
  },
  'soft-skills': {
    name: 'Soft Skills',
    description: 'A comprehensive 8-week program developing communication, teamwork, leadership, and career readiness across all industries.',
    slug: 'soft-skills',
    categories: [
      { name: 'Communication', works: [{ slug: 'verbal', title: 'Verbal Communication Mastery', author: 'Career Faculty' }, { slug: 'nonverbal', title: 'Non-Verbal & Body Language', author: 'Career Faculty' }] },
      { name: 'Leadership & Teamwork', works: [{ slug: 'leadership', title: 'Leadership Principles', author: 'Career Faculty' }] },
    ],
  },
  'iq-test': {
    name: 'IQ Test',
    description: 'Cognitive assessment measuring logical reasoning, pattern recognition, and problem-solving capabilities via structured test modules.',
    slug: 'iq-test',
    categories: [
      { name: 'Logical Reasoning', works: [{ slug: 'patterns', title: 'Pattern Recognition Tests', author: 'Assessment Faculty' }, { slug: 'spatial', title: 'Spatial Reasoning', author: 'Assessment Faculty' }] },
      { name: 'Numerical & Verbal', works: [{ slug: 'numerical', title: 'Numerical Problems', author: 'Assessment Faculty' }] },
    ],
  },
  'ai-tools': {
    name: 'Latest AI Tools & Apps',
    description: 'Discover and integrate cutting-edge Artificial Intelligence tools and applications to supercharge your productivity and daily workflow.',
    slug: 'ai-tools',
    categories: [
      { name: 'Generative AI', works: [{ slug: 'gen-ai-intro', title: 'Intro to Generative AI', author: 'Tech Faculty' }, { slug: 'image-tools', title: 'AI Image Generation Tools', author: 'Tech Faculty' }] },
      { name: 'Productivity AI', works: [{ slug: 'productivity', title: 'Notion AI, Gemini, Copilot', author: 'Tech Faculty' }] },
    ],
  },
  'chat-gpt-safety': {
    name: 'Safe Use of Chat GPT',
    description: 'Learn the ethical, safe, and highly productive ways to prompt and interact with Large Language Models responsibly.',
    slug: 'chat-gpt-safety',
    categories: [
      { name: 'Understanding LLMs', works: [{ slug: 'how-llm-works', title: 'How ChatGPT Works', author: 'AI Ethics Faculty' }] },
      { name: 'Responsible Use', works: [{ slug: 'privacy', title: 'Privacy & Data Safety', author: 'AI Ethics Faculty' }, { slug: 'accuracy', title: 'Fact-Checking AI Outputs', author: 'AI Ethics Faculty' }] },
    ],
  },
  'academic-language': {
    name: 'Academic Language',
    description: 'Master formal academic writing, research terminology, citation methods, and scholarly discourse for university-level studies.',
    slug: 'academic-language',
    categories: [
      { name: 'Academic Writing', works: [{ slug: 'structure', title: 'Essay & Report Structures', author: 'Academic Faculty' }, { slug: 'citations', title: 'APA/MLA Citation Styles', author: 'Academic Faculty' }] },
      { name: 'Research Skills', works: [{ slug: 'research', title: 'Research Methodology', author: 'Academic Faculty' }] },
    ],
  },
};

export async function generateStaticParams() {
  const existing = getCourses().map((c) => ({ courseSlug: c.slug }));
  const newSlugs = Object.keys(courseFallbacks).map((slug) => ({ courseSlug: slug }));
  return [...existing, ...newSlugs];
}

export async function generateMetadata({ params }: any) {
  const slug: string = params.courseSlug;
  const existing = getCourse(slug);
  const fallback = courseFallbacks[slug];
  const name = existing?.name ?? fallback?.name ?? slug.replace(/-/g, ' ').toUpperCase();
  const description = existing?.description ?? fallback?.description ?? 'Explore this program on the CEFR English platform.';
  return {
    title: `${name} | CEFR English`,
    description,
  };
}

export default function CoursePage({ params }: any) {
  const slug: string = params.courseSlug;
  const existingCourse = getCourse(slug);

  // Build a unified typed object
  const course: CourseData = existingCourse
    ? {
        name: existingCourse.name,
        description: existingCourse.description,
        slug: existingCourse.slug,
        categories: (existingCourse.categories ?? []).map((cat) => ({
          name: cat.name,
          works: (cat.works ?? []).map((w) => ({
            slug: w.slug,
            title: w.title,
            author: (w as any).author,
          })),
        })),
      }
    : courseFallbacks[slug] ?? {
        name: slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
        description: 'Explore this programme on the CEFR English platform.',
        slug,
        categories: [
          {
            name: 'Core Modules',
            works: [
              { slug: 'intro', title: 'Introduction & Foundations', author: 'Lead Instructor' },
              { slug: 'practice', title: 'Practical Exercises', author: 'Lead Instructor' },
            ],
          },
        ],
      };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <BackNav 
        crumbs={[{ label: 'Home', href: '/' }]} 
        current={course.name} 
      />

      {/* Hero */}
      <div className="bg-[linear-gradient(135deg,#021A42_0%,#043370_55%,#00A2C9_100%)] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-400/20 to-transparent blur-3xl pointer-events-none" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center z-10">
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-6 tracking-tight">{course.name}</h1>
          <p className="mt-4 text-xl text-cyan-50/90 leading-relaxed font-light max-w-2xl mx-auto">{course.description}</p>
        </div>
      </div>

      {/* Course Modules */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex-1">
        <div className="max-w-4xl mx-auto">
          {course.categories.map((category, idx) => (
            <div key={category.name} className="mb-16">
              <div className="flex items-center mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="w-9 h-9 rounded-full bg-[#043370] flex items-center justify-center text-white font-bold mr-4 text-sm shadow-md flex-shrink-0">
                  {idx + 1}
                </div>
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{category.name}</h2>
              </div>

              <div className="space-y-4">
                {category.works.map((work) => {
                  const href = work.slug.startsWith('/') ? work.slug : `/courses/${course.slug}/${work.slug}`;
                  return (
                    <Link href={href} key={work.slug} className="block group">
                      <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1">
                        <CardContent className="p-5 md:p-7 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-5 min-w-0">
                            <div className="bg-slate-50 dark:bg-slate-800 p-3 md:p-4 rounded-xl group-hover:bg-cyan-50 dark:group-hover:bg-cyan-900/30 transition-colors flex-shrink-0">
                              <BookText className="w-6 h-6 md:w-7 md:h-7 text-[#043370] dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-headline font-bold text-lg md:text-xl text-slate-900 dark:text-white mb-1 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors truncate">{work.title}</p>
                              <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 flex-shrink-0" />
                                {work.author ?? 'Certified Instructor'}
                              </div>
                            </div>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-cyan-500 transition-colors flex-shrink-0">
                            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
