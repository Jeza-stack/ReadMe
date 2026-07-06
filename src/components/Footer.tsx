'use client';

import Link from 'next/link';
import { BookMarked, Linkedin, Mail, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: 'English Courses',
    links: [
      { href: '/courses/english-1', label: 'English I' },
      { href: '/courses/english-2', label: 'English II' },
      { href: '/courses/english-3', label: 'English III' },
      { href: '/courses/english-4', label: 'English IV' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { href: '/cefr', label: 'CEFR Academy' },
      { href: '/ai-for-students', label: 'AI for Students' },
      { href: '/soft-skills/programme', label: 'Soft Skills Programme' },
      { href: '/academic-success', label: 'Academic Success' },
      { href: '/iq-test', label: 'IQ Test (Cognitive Assessment)' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/assessment', label: 'Level Assessment' },
      { href: '/assessment/quick', label: 'Quick CEFR Test (15 min)' },
      { href: '/courses', label: 'All Courses' },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/iq-test')) return null;

  return (
    <footer className="bg-[#0A1330] text-white border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-6 items-start">
            <Link href="/" className="flex items-center gap-2 font-headline text-3xl font-bold text-[var(--ce-golden-yellow)] transition-transform hover:scale-105">
              <BookMarked className="w-10 h-10" />
              <span>ReadMe</span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Free, academically rigorous English Literature, Language, and AI
              literacy resources — built by a lecturer to complement the
              classroom, for students in the Pacific and beyond.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="https://www.linkedin.com/in/dr-jaffer-basha-s-58239827a"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="bg-white/5 p-3 rounded-full hover:bg-[var(--ce-golden-yellow)] hover:text-[#0A1330] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:jafferbasha240@gmail.com"
                aria-label="Email"
                className="bg-white/5 p-3 rounded-full hover:bg-[var(--ce-golden-yellow)] hover:text-[#0A1330] transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-headline font-semibold text-lg text-white mb-6 uppercase tracking-wider relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-0.5 after:bg-[var(--ce-golden-yellow)]">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href} className="flex flex-row items-center group">
                    <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[var(--ce-golden-yellow)] transition-colors mr-2" />
                    <Link href={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/50 gap-4">
          <p>
            &copy; {new Date().getFullYear()} ReadMe · Built by Dr. Jaffer Basha
          </p>
          <p>ReadMe v2.0 — complements the classroom, never replaces it.</p>
        </div>
      </div>
    </footer>
  );
}
