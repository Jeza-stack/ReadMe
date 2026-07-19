'use client';

import React, { useState } from 'react';
import { Search, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCard';

export interface CatalogueCourse {
  id: number;
  title: string;
  description: string;
  href: string;
  level: string;
  duration: string;
  difficulty: string;
  subject: string;
  image: string;
}

// ponytail: icons can't cross the server→client prop boundary, so map them here by subject
const subjectIcons: Record<string, React.ReactNode> = {
  'Core English': <BookOpen className="w-8 h-8" />,
  Professional: <Users className="w-8 h-8" />,
  Workshops: <Search className="w-8 h-8" />,
};

export default function CoursesClient({ courses }: { courses: CatalogueCourse[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="container mx-auto px-4 md:px-8 max-w-7xl pt-10 pb-16">
        {/* Title + search — the only chrome on this page */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-slate-900 dark:text-white">
              Courses
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {filteredCourses.length} of {courses.length} courses
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A2C9] transition-all"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Course Card Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                href={course.href}
                icon={subjectIcons[course.subject] ?? <BookOpen className="w-8 h-8" />}
                image={course.image}
                meta={`${course.level} · ${course.subject}`}
                cta="Explore Course"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
            <Search className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No courses found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              Try a different search term to see more results.
            </p>
            <Button onClick={() => setSearchQuery('')} variant="outline" className="h-12 px-6">
              Clear Search
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
