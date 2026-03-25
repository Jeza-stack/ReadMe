'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, BookOpen, Users, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data based on the CEFR English learning platform context
const allCourses = [
  {
    id: 7,
    title: 'IQ & Cognitive Practice Test',
    description: 'A comprehensive, stateless cognitive assessment space for logic, patterns, and reasoning skills.',
    href: '/iq-test',
    icon: <Search className="w-8 h-8" />,
    level: 'All Levels',
    duration: 'Untimed',
    difficulty: 'Self-Paced',
    subject: 'Workshops',
  },
  {
    id: 1,
    title: 'English I',
    description: 'Foundational course in English literature and language competency for beginners.',
    href: '/courses/english-1',
    icon: <BookOpen className="w-8 h-8" />,
    level: 'A1 - Beginner',
    duration: '12 Weeks',
    difficulty: 'Beginner',
    subject: 'Core English',
  },
  {
    id: 2,
    title: 'English II',
    description: 'Intermediate course covering basic grammar, everyday communication, and writing.',
    href: '/courses/english-2',
    icon: <BookOpen className="w-8 h-8" />,
    level: 'A2 - Elementary',
    duration: '12 Weeks',
    difficulty: 'Elementary',
    subject: 'Core English',
  },
  {
    id: 3,
    title: 'English III',
    description: 'Advanced course covering complex literary works and modern communication skills.',
    href: '/courses/english-3',
    icon: <BookOpen className="w-8 h-8" />,
    level: 'B1 - Intermediate',
    duration: '16 Weeks',
    difficulty: 'Intermediate',
    subject: 'Core English',
  },
  {
    id: 4,
    title: 'Soft Skills Mastery',
    description: '20-week CEFR-aligned program for communication, teamwork, leadership, and career readiness.',
    href: '/courses/soft-skills-mastery',
    icon: <Users className="w-8 h-8" />,
    level: 'B2 - Upper Intermediate',
    duration: '20 Weeks',
    difficulty: 'Upper Intermediate',
    subject: 'Professional',
  },
  {
    id: 5,
    title: 'Business English Intensive',
    description: 'Master negotiations, formal emails, and corporate presentations in English.',
    href: '/courses/business-english',
    icon: <Users className="w-8 h-8" />,
    level: 'C1 - Advanced',
    duration: '8 Weeks',
    difficulty: 'Advanced',
    subject: 'Professional',
  },
  {
    id: 6,
    title: 'Conversational Fluency',
    description: 'Focus exclusively on speaking, listening, and native-like pronunciation.',
    href: '/courses/conversational',
    icon: <Users className="w-8 h-8" />,
    level: 'B1 - Intermediate',
    duration: '10 Weeks',
    difficulty: 'Intermediate',
    subject: 'Conversation',
  },
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All Results');
  const [filters, setFilters] = useState({
    subject: 'all',
    level: 'all',
    duration: 'all',
    difficulty: 'all',
  });

  const tabs = ['All Results', 'Core English', 'Professional', 'Conversation', 'Workshops', 'FAQs'];

  // Harvard-style filter bar data
  const filterOptions = {
    subject: ['Core English', 'Professional', 'Conversation'],
    level: ['A1 - Beginner', 'A2 - Elementary', 'B1 - Intermediate', 'B2 - Upper Intermediate', 'C1 - Advanced', 'C2 - Mastery'],
    duration: ['8 Weeks', '10 Weeks', '12 Weeks', '16 Weeks', '20 Weeks'],
    difficulty: ['Beginner', 'Elementary', 'Intermediate', 'Upper Intermediate', 'Advanced', 'Mastery'],
  };

  const hasActiveFilters = 
    filters.subject !== 'all' || 
    filters.level !== 'all' || 
    filters.duration !== 'all' || 
    filters.difficulty !== 'all';

  const clearFilters = () => {
    setFilters({
      subject: 'all',
      level: 'all',
      duration: 'all',
      difficulty: 'all',
    });
  };

  // Filter logic
  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = filters.subject === 'all' || course.subject === filters.subject;
    const matchesLevel = filters.level === 'all' || course.level === filters.level;
    const matchesDuration = filters.duration === 'all' || course.duration === filters.duration;
    const matchesDifficulty = filters.difficulty === 'all' || course.difficulty === filters.difficulty;
    const matchesTab = activeTab === 'All Results' || course.subject === activeTab;
    
    return matchesSearch && matchesSubject && matchesLevel && matchesDuration && matchesDifficulty && matchesTab;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* SCU-Inspired Hero Section with Blue Gradient and Vibrant Blend */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-[linear-gradient(135deg,#021A42_0%,#043370_50%,#00A2C9_100%)] text-white">
        {/* Background Overlay for Depth */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-400/20 to-transparent blur-3xl"></div>
        
        <div className="container relative mx-auto px-4 md:px-8 z-10 max-w-6xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-10 tracking-tight font-headline">
            Search
          </h1>
          
          {/* Large Pill Search Bar */}
          <div className="relative max-w-4xl mb-8 group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="h-8 w-8 text-white group-focus-within:text-cyan-200 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-20 pr-8 py-6 rounded-full border-none bg-white/10 backdrop-blur-md text-white md:text-2xl placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-cyan-400/50 focus:bg-white/20 transition-all shadow-2xl"
              placeholder="Search for courses, levels, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full text-white hover:bg-white/20 hover:text-cyan-100">
                <ChevronDown className="h-6 w-6 transform -rotate-90" />
              </Button>
            </div>
          </div>
          
          <div className="text-cyan-100 text-lg mb-8 font-medium">
            1 - {filteredCourses.length} of {allCourses.length} search results
          </div>
          
          {/* SCU-style Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-t-xl font-semibold text-lg transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-white text-[#043370] shadow-[0_-4px_15px_rgba(0,0,0,0.1)]' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* SCU-style White Blend curve/cut at the bottom */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-[0] transform rotate-180">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#f8fafc"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-50.09V0Z" opacity=".5" fill="#f8fafc"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#f8fafc"></path>
          </svg>
        </div>
      </section>

      {/* Harvard-Inspired Sticky Filter Bar */}
      <section className="bg-[#0A1330] text-white border-b border-white/10 sticky top-0 z-40 shadow-xl">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-center gap-1 md:gap-4 py-3">
            <div className="hidden md:flex items-center text-cyan-400 font-bold mr-4 text-sm tracking-wider uppercase">
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filter By:
            </div>
            
            <FilterDropdown 
              label="Subject Area" 
              options={filterOptions.subject} 
              value={filters.subject}
              onChange={(val) => setFilters({...filters, subject: val})}
            />
            <FilterDropdown 
              label="Level" 
              options={filterOptions.level} 
              value={filters.level}
              onChange={(val) => setFilters({...filters, level: val})}
            />
            <FilterDropdown 
              label="Duration" 
              options={filterOptions.duration} 
              value={filters.duration}
              onChange={(val) => setFilters({...filters, duration: val})}
            />
            <FilterDropdown 
              label="Difficulty" 
              options={filterOptions.difficulty} 
              value={filters.difficulty}
              onChange={(val) => setFilters({...filters, difficulty: val})}
            />
          </div>
        </div>
      </section>

      {/* Main Content Area (Harvard Structure) */}
      <section className="flex-1 py-12 container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Results Metadata & Active Filters */}
        <div className="flex flex-wrap items-center justify-between mb-8 border-b pb-6 dark:border-slate-800">
          <div className="flex items-center gap-4 flex-wrap">
            <h2 className="text-xl md:text-2xl font-serif text-slate-800 dark:text-slate-100">
              <span className="font-bold">{filteredCourses.length}</span> results found
            </h2>
            
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap">
                {Object.entries(filters).map(([key, value]) => {
                  if (value === 'all') return null;
                  return (
                    <div key={key} className="flex items-center bg-white border dark:bg-slate-800 dark:border-slate-700 shadow-sm rounded px-3 py-1.5 text-sm">
                      <span className="text-slate-600 dark:text-slate-300 mr-2 uppercase text-xs font-bold tracking-wider">{key}:</span>
                      <span className="font-medium text-slate-900 dark:text-white mr-2">{value}</span>
                      <button 
                        onClick={() => setFilters({...filters, [key]: 'all'})}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
                <button 
                  onClick={clearFilters}
                  className="text-sm font-semibold text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 ml-2"
                >
                  Clear all filters
                </button>
              </div>
            )}
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
                icon={course.icon}
                cta="Explore Course"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
            <Search className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No courses found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              Try adjusting your search query or removing some filters to see more results.
            </p>
            <Button onClick={clearFilters} variant="outline" className="h-12 px-6">
              Clear All Filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

// Helper component for Harvard-style dropdowns in the dark ribbon
function FilterDropdown({ label, options, value, onChange }: { label: string, options: string[], value: string, onChange: (val: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-auto min-w-[140px] max-w-[200px] border-none bg-transparent hover:bg-white/10 text-white font-semibold rounded-none h-12 px-4 uppercase tracking-wider text-xs md:text-sm focus:ring-0 focus:ring-offset-0 [&>span]:line-clamp-1">
        <span className={value !== 'all' ? 'text-cyan-400' : ''}>
          {value !== 'all' ? value : label}
        </span>
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-md shadow-xl z-50">
        <SelectItem value="all" className="font-semibold text-slate-600 dark:text-slate-400">All {label}s</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt} className="font-medium cursor-pointer py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800">
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
