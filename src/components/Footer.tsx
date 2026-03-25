'use client';

import Link from 'next/link';
import { BookMarked, Linkedin, Mail, Twitter, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getCourses } from '@/lib/data';

export function Footer() {
  const pathname = usePathname();
  const courses = getCourses().slice(0, 6);
  
  if (pathname?.startsWith('/iq-test')) return null;
  
  return (
    <footer className="bg-[#0A1330] text-white border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className="flex flex-col gap-6 items-start lg:col-span-1">
                <Link href="/" className="flex items-center gap-2 font-headline text-3xl font-bold text-[var(--ce-golden-yellow)] transition-transform hover:scale-105">
                    <BookMarked className="w-10 h-10" />
                    <span>CEFR English</span>
                </Link>
                <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                  Your platform for lifelong learning and professional growth. Designed structurally for excellence, mapping perfectly to global CEFR language standards.
                </p>
                <div className="flex gap-4 mt-2">
                    <a href="#" aria-label="Twitter" className="bg-white/5 p-3 rounded-full hover:bg-[var(--ce-golden-yellow)] hover:text-[#0A1330] transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" aria-label="LinkedIn" className="bg-white/5 p-3 rounded-full hover:bg-[var(--ce-golden-yellow)] hover:text-[#0A1330] transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" aria-label="Mail" className="bg-white/5 p-3 rounded-full hover:bg-[var(--ce-golden-yellow)] hover:text-[#0A1330] transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                </div>
            </div>

            {/* Courses Navigation */}
            <div className="lg:col-span-1">
                <h3 className="font-headline font-semibold text-lg text-white mb-6 uppercase tracking-wider relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-0.5 after:bg-[var(--ce-golden-yellow)]">
                  Top Courses
                </h3>
                <ul className="space-y-3">
                    {courses.map((c) => (
                      <li key={c.slug} className="flex flex-row items-center group">
                        <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[var(--ce-golden-yellow)] transition-colors mr-2" />
                        <Link href={`/courses/${c.slug}`} className="text-sm text-white/70 hover:text-white transition-colors">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                    <li className="flex flex-row items-center group">
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[var(--ce-golden-yellow)] transition-colors mr-2" />
                      <Link href="/courses/soft-skills-mastery" className="text-sm text-white/70 hover:text-white transition-colors">Soft Skills</Link>
                    </li>
                </ul>
            </div>

            {/* Resources Navigation */}
            <div className="lg:col-span-1">
                <h3 className="font-headline font-semibold text-lg text-white mb-6 uppercase tracking-wider relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-0.5 after:bg-[var(--ce-golden-yellow)]">
                  Resources
                </h3>
                <ul className="space-y-3">
                    <li className="flex flex-row items-center group">
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[var(--ce-golden-yellow)] transition-colors mr-2" />
                      <Link href="/assessment" className="text-sm text-white/70 hover:text-white transition-colors">Level Assessment</Link>
                    </li>
                    <li className="flex flex-row items-center group">
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[var(--ce-golden-yellow)] transition-colors mr-2" />
                      <Link href="/soft-skills-blog" className="text-sm text-white/70 hover:text-white transition-colors">Soft Skills Blog</Link>
                    </li>
                    <li className="flex flex-row items-center group">
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[var(--ce-golden-yellow)] transition-colors mr-2" />
                      <Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors">About the CEFR</Link>
                    </li>
                    <li className="flex flex-row items-center group">
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[var(--ce-golden-yellow)] transition-colors mr-2" />
                      <Link href="/contact" className="text-sm text-white/70 hover:text-white transition-colors">Contact Support</Link>
                    </li>
                </ul>
            </div>

            {/* Legal & Newsletter */}
            <div className="lg:col-span-1">
                <h3 className="font-headline font-semibold text-lg text-white mb-6 uppercase tracking-wider relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-0.5 after:bg-[var(--ce-golden-yellow)]">
                  Stay Updated
                </h3>
                <p className="text-sm text-white/70 mb-4">Subscribe to our newsletter for the latest courses and CEFR updates.</p>
                <form className="flex mb-6" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="Your email address" className="bg-white/5 border border-white/10 rounded-l-md px-4 py-2 text-sm text-white w-full focus:outline-none focus:border-[var(--ce-golden-yellow)]" required />
                  <button type="submit" className="bg-[var(--ce-golden-yellow)] text-[#0A1330] font-bold px-4 py-2 rounded-r-md hover:bg-white transition-colors text-sm">
                    Join
                  </button>
                </form>
                <div className="flex flex-wrap gap-4 text-xs text-white/50">
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/50 gap-4">
          <p>&copy; {new Date().getFullYear()} CEFR English Learning Platform. All rights reserved.</p>
          <p>Designed for excellence. Mobile-first ready.</p>
        </div>
      </div>
    </footer>
  );
}
