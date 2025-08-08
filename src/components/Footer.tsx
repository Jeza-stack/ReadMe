import Link from 'next/link';
import { BookMarked, Twitter, Facebook, Linkedin } from 'lucide-react';
import { getCourses } from '@/lib/data';

export function Footer() {
  const courses = getCourses().slice(0, 5);
  return (
    <footer className="bg-transparent border-t border-border/30 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4 items-start">
                <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold text-primary">
                    <BookMarked className="w-8 h-8 text-foreground" />
                    <span className="text-foreground">ReadMe</span>
                </Link>
                <p className="text-foreground/70 text-sm">Your platform for lifelong learning and professional growth.</p>
                <div className="flex gap-4 mt-2">
                    <button type="button" aria-label="Twitter" className="cursor-not-allowed opacity-60">
                      <Twitter className="w-5 h-5 text-foreground/60" />
                    </button>
                    <button type="button" aria-label="Facebook" className="cursor-not-allowed opacity-60">
                      <Facebook className="w-5 h-5 text-foreground/60" />
                    </button>
                    <button type="button" aria-label="LinkedIn" className="cursor-not-allowed opacity-60">
                      <Linkedin className="w-5 h-5 text-foreground/60" />
                    </button>
                </div>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div>
                    <h3 className="font-headline font-semibold text-foreground mb-4">Courses</h3>
                    <ul className="space-y-2">
                        {courses.map((c) => (
                          <li key={c.slug}>
                            <Link href={`/courses/${c.slug}`} className="text-sm text-foreground/70 hover:text-primary transition-colors">{c.name}</Link>
                          </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-headline font-semibold text-foreground mb-4">Resources</h3>
                    <ul className="space-y-2">
                        <li><Link href="/soft-skills" className="text-sm text-foreground/70 hover:text-primary transition-colors">Soft Skills Blog</Link></li>
                        <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-headline font-semibold text-foreground mb-4">Legal</h3>
                    <ul className="space-y-2">
                        <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="mt-12 border-t border-border/30 pt-8 text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} ReadMe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
