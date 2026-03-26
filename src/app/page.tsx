'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  BookOpen,
  Users,
  SlidersHorizontal,
  X,
  BrainCircuit,
  Cpu,
  ShieldCheck,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Reordered courses: CEFR first, English I-IV last
const allCourses = [
  {
    id: 7,
    title: 'IQ & Cognitive Test',
    description: 'Comprehensive cognitive assessment measuring logical reasoning, spatial awareness, and analytical problem-solving capabilities.',
    href: '/iq-test',
    icon: <BrainCircuit className="w-5 h-5" />,
    level: 'All Levels',
    duration: 'Self-Paced',
    difficulty: 'All Levels',
    subject: 'Assessment',
    image: 'https://images.unsplash.com/photo-1558244661-d248897f7bc4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    title: 'CEFR English',
    description: 'Master the Common European Framework of Reference for Languages. From A1 to C2, systematically advance your proficiency with international standards.',
    href: '/courses/cefr-english',
    icon: <Globe className="w-5 h-5" />,
    level: 'Advanced (C1-C2)',
    duration: '24 Weeks',
    difficulty: 'Advanced',
    subject: 'Certifications',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 10,
    title: 'Academic Language',
    description: 'Master formal academic writing, research terminology, and scholarly discourse required for university success and professional publications.',
    href: '/courses/academic-language',
    icon: <GraduationCap className="w-5 h-5" />,
    level: 'Advanced (C1)',
    duration: '12 Weeks',
    difficulty: 'Advanced',
    subject: 'Academic',
    image: 'https://images.unsplash.com/photo-1523050335456-c6bb7f9ccb7a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 8,
    title: 'Latest AI Tools & Apps',
    description: 'Discover and learn to integrate cutting-edge Artificial Intelligence applications like Midjourney, Claude, and specialized tools into your professional workflow.',
    href: '/courses/ai-tools',
    icon: <Cpu className="w-5 h-5" />,
    level: 'Intermediate',
    duration: '4 Weeks',
    difficulty: 'Intermediate',
    subject: 'Technology',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 9,
    title: 'Safe Use of Chat GPT',
    description: 'Learn the ethical, secure, and highly productive ways to prompt and interact with LLMs while protecting your data and ensuring accuracy.',
    href: '/courses/chat-gpt-safety',
    icon: <ShieldCheck className="w-5 h-5" />,
    level: 'Beginner',
    duration: '3 Weeks',
    difficulty: 'Beginner',
    subject: 'Technology',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    title: 'Soft Skills Mastery',
    description: 'Essential communication, teamwork, leadership, and professional career readiness program for the modern global workplace.',
    href: '/courses/soft-skills',
    icon: <Users className="w-5 h-5" />,
    level: 'All Levels',
    duration: '8 Weeks',
    difficulty: 'All Levels',
    subject: 'Professional',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 1,
    title: 'English I (Elementary)',
    description: 'Foundational course in English literature and language competency for absolute beginners. Start your journey here.',
    href: '/courses/english-1',
    icon: <BookOpen className="w-5 h-5" />,
    level: 'Beginner (A1)',
    duration: '12 Weeks',
    difficulty: 'Beginner',
    subject: 'Core English',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'English II (Intermediate)',
    description: 'Elementary course covering basic grammar, everyday communication, and elementary writing for real-world scenarios.',
    href: '/courses/english-2',
    icon: <BookOpen className="w-5 h-5" />,
    level: 'Elementary (A2)',
    duration: '12 Weeks',
    difficulty: 'Elementary',
    subject: 'Core English',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'English III (Upper-Intermediate)',
    description: 'Intermediate course expanding vocabulary, complex sentences, and practical international travel communication.',
    href: '/courses/english-3',
    icon: <BookOpen className="w-5 h-5" />,
    level: 'Intermediate (B1)',
    duration: '16 Weeks',
    difficulty: 'Intermediate',
    subject: 'Core English',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'English IV (Advanced)',
    description: 'Upper-intermediate course focused on high-level professional interactions and nuanced expression in academic settings.',
    href: '/courses/english-4',
    icon: <BookOpen className="w-5 h-5" />,
    level: 'Upper Intermediate (B2)',
    duration: '16 Weeks',
    difficulty: 'Upper Intermediate',
    subject: 'Core English',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800'
  },
];

const ITEMS_PER_PAGE = 8;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    subject: 'all',
    level: 'all',
    duration: 'all',
    difficulty: 'all',
  });

  const filterOptions = {
    subject: Array.from(new Set(allCourses.map(c => c.subject))),
    level: Array.from(new Set(allCourses.map(c => c.level))),
    duration: Array.from(new Set(allCourses.map(c => c.duration))),
    difficulty: Array.from(new Set(allCourses.map(c => c.difficulty))),
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== 'all');

  const clearFilters = () => {
    setFilters({ subject: 'all', level: 'all', duration: 'all', difficulty: 'all' });
    setCurrentPage(1);
  };

  const filteredCourses = allCourses.filter((course) => {
    const matchesSubject = filters.subject === 'all' || course.subject === filters.subject;
    const matchesLevel = filters.level === 'all' || course.level === filters.level;
    const matchesDuration = filters.duration === 'all' || course.duration === filters.duration;
    const matchesDifficulty = filters.difficulty === 'all' || course.difficulty === filters.difficulty;

    return matchesSubject && matchesLevel && matchesDuration && matchesDifficulty;
  });

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const currentCourses = filteredCourses.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 flex flex-col animate-in fade-in duration-700">

      {/* Harvard-Style Hero with SCU Gradient & Wave */}
      <section className="relative pt-24 pb-40 lg:pb-52 overflow-hidden bg-[linear-gradient(135deg,#021A42_0%,#043370_55%,#00A2C9_100%)] text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-cyan-400/20 to-transparent blur-3xl pointer-events-none"></div>

        <div className="container relative mx-auto px-4 md:px-8 z-10 max-w-6xl">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-white/10 px-4 py-1.5 text-sm font-semibold text-cyan-50 backdrop-blur-md mb-8 animate-in slide-in-from-bottom-2 duration-500">
              Transforming Lives Through Language & Tech
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight font-headline animate-in slide-in-from-bottom-4 duration-700 delay-100 leading-tight">
              Catalogue of <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-white">Professional Courses</span>
            </h1>

            <p className="max-w-2xl text-lg md:text-xl text-cyan-50/80 leading-relaxed font-light mb-12 animate-in slide-in-from-bottom-4 duration-700 delay-200">
              Master the English language systematically with internationally recognized certifications, specialized technology, and essential soft skills training.
            </p>

            <div className="flex flex-wrap items-center gap-4 animate-in slide-in-from-bottom-4 duration-700 delay-300">
              <Button className="h-14 px-8 rounded-full bg-white text-[#043370] hover:bg-cyan-50 font-bold text-lg shadow-xl shadow-black/20" asChild>
                <Link href="#courses">
                  Browse the Catalogue
                </Link>
              </Button>
              <div className="flex -space-x-3 items-center">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#043370] bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Student" className="w-full h-full object-cover" />
                  </div>
                ))}
                <span className="ml-4 text-sm font-medium text-cyan-100 tracking-wide">+12k Learners Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* SCU-style Wave/Curve at bottom */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-[0] transform rotate-180 z-20">
          <svg className="relative block w-[calc(110%+1.3px)] h-[80px] md:h-[120px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#f8fafc"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-50.09V0Z" opacity=".5" fill="#f8fafc"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#f8fafc"></path>
          </svg>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <section className="bg-[#0A1330] text-white border-b border-white/10 sticky top-[80px] z-40 shadow-xl" id="courses">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-center gap-1 md:gap-4 py-3">
            <div className="hidden md:flex items-center text-cyan-400 font-bold mr-4 text-xs tracking-widest uppercase">
              <SlidersHorizontal className="w-5 h-5 mr-3" />
              Course Select:
            </div>

            <FilterDropdown
              label="Subject Area"
              options={filterOptions.subject}
              value={filters.subject}
              onChange={(val) => { setFilters({ ...filters, subject: val }); setCurrentPage(1); }}
            />
            <FilterDropdown
              label="English Level"
              options={filterOptions.level}
              value={filters.level}
              onChange={(val) => { setFilters({ ...filters, level: val }); setCurrentPage(1); }}
            />
            <FilterDropdown
              label="Duration"
              options={filterOptions.duration}
              value={filters.duration}
              onChange={(val) => { setFilters({ ...filters, duration: val }); setCurrentPage(1); }}
            />
            <FilterDropdown
              label="Proficiency"
              options={filterOptions.difficulty}
              value={filters.difficulty}
              onChange={(val) => { setFilters({ ...filters, difficulty: val }); setCurrentPage(1); }}
            />
          </div>
        </div>
      </section>

      {/* Course Catalog Grid */}
      <section className="flex-1 py-16 lg:py-24 container mx-auto px-4 md:px-8 max-w-7xl">

        <div className="flex flex-wrap items-center justify-between mb-12 pb-8 border-b border-slate-200 dark:border-white/10">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-slate-800 dark:text-white">
              Catalogue Results
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-body">
              Displaying <span className="font-bold text-[#043370] dark:text-cyan-400">{filteredCourses.length}</span> programs available for enrollment
            </p>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-4 md:mt-0 text-sm font-semibold text-[#043370] hover:text-[#00A2C9] dark:text-cyan-400 dark:hover:text-white flex items-center gap-2 transition-all p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg"
            >
              <X className="w-4 h-4" /> Reset all criteria
            </button>
          )}
        </div>

        {currentCourses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <CourseCard
                    title={course.title}
                    description={course.description}
                    href={course.href}
                    icon={course.icon}
                    image={course.image}
                    cta="Explore Program"
                  />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-20 pt-10 border-t border-slate-200 dark:border-white/10 flex items-center justify-center gap-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-full w-12 h-12 p-0 border-slate-200 dark:border-white/10 hover:bg-[#043370] hover:text-white hover:border-[#043370] transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>

                <div className="flex items-center gap-3">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-12 h-12 rounded-full text-sm font-bold transition-all shadow-sm ${currentPage === i + 1
                          ? 'bg-[#043370] text-white'
                          : 'bg-white dark:bg-slate-900 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-full w-12 h-12 p-0 border-slate-200 dark:border-white/10 hover:bg-[#043370] hover:text-white hover:border-[#043370] transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-32 bg-white dark:bg-[#0A1330] rounded-3xl shadow-xl border border-slate-100 dark:border-white/5">
            <BookOpen className="w-20 h-20 text-[#043370]/20 mx-auto mb-8" />
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">No programs found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-10 text-lg">
              Try adjusting your filters or resetting the catalog to see more opportunities.
            </p>
            <Button onClick={clearFilters} size="lg" className="rounded-full bg-[#043370] text-white hover:bg-[#00A2C9] px-10 h-14 font-bold text-lg transition-all shadow-xl shadow-blue-500/20">
              Clear All Filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

function FilterDropdown({ label, options, value, onChange }: { label: string, options: string[], value: string, onChange: (val: string) => void }) {
  if (!options || options.length === 0) return null;
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-auto min-w-[150px] max-w-[220px] border-none bg-transparent hover:bg-white/5 text-white font-bold rounded-none h-14 px-5 uppercase tracking-widest text-xs focus:ring-0 focus:ring-offset-0 transition-colors">
        <span className={value !== 'all' ? 'text-cyan-400' : 'text-cyan-100/60'}>
          {value !== 'all' ? value : label}
        </span>
        <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-[#0A1330] border-slate-200 dark:border-white/10 rounded-xl shadow-2xl z-[100] min-w-[200px]">
        <SelectItem value="all" className="font-bold text-slate-400 uppercase tracking-tighter text-xs">All {label}s</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt} className="font-semibold cursor-pointer py-4 border-b border-slate-50 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/10">
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
