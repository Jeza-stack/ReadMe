"use client";

import Link from "next/link";
import { BookMarked, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const cefrLevels = [
  { href: "/level/a1", label: "A1 - Beginner" },
  { href: "/level/a2", label: "A2 - Elementary" },
  { href: "/level/b1", label: "B1 - Intermediate" },
  { href: "/level/b2", label: "B2 - Upper Intermediate" },
  { href: "/level/c1", label: "C1 - Advanced" },
  { href: "/level/c2", label: "C2 - Proficiency" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (pathname?.startsWith('/iq-test')) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="bg-[var(--ce-deep-navy)] text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Mobile Menu Trigger & Main Links (Harvard style uses hamburger or clean links) */}
          <div className="flex items-center gap-6">
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <Menu className="h-7 w-7" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] bg-[var(--ce-deep-navy)] text-white border-r border-white/10">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-8 mt-6">
                    <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold text-[var(--ce-golden-yellow)]" onClick={() => setIsMobileMenuOpen(false)}>
                      <BookMarked className="w-8 h-8" />
                      <span>CEFR English</span>
                    </Link>
                    <nav className="flex flex-col gap-4 pl-2">
                      <Link href="/" className="text-lg font-medium hover:text-[var(--ce-golden-yellow)] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                      <div className="space-y-3 pt-4 border-t border-white/10">
                        <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest">Levels</h3>
                        {cefrLevels.map((level) => (
                          <Link
                            key={level.href}
                            href={level.href}
                            className="block text-base hover:text-[var(--ce-golden-yellow)] transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {level.label}
                          </Link>
                        ))}
                      </div>
                      <Link href="/assessment" className="text-lg font-medium hover:text-[var(--ce-golden-yellow)] transition-colors pt-4 border-t border-white/10" onClick={() => setIsMobileMenuOpen(false)}>Assessment</Link>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold text-[var(--ce-golden-yellow)] mr-4 hover:opacity-90 transition-opacity">
                <BookMarked className="w-8 h-8" />
                <span className="hidden lg:inline-block">CEFR English</span>
              </Link>
              <div className="hidden lg:flex items-center gap-6">
                 <Link href="/" className="text-sm font-semibold uppercase tracking-wider hover:text-[var(--ce-golden-yellow)] transition-colors">Courses</Link>
                 <Link href="/assessment" className="text-sm font-semibold uppercase tracking-wider hover:text-[var(--ce-golden-yellow)] transition-colors">Assessment</Link>
              </div>
            </nav>
          </div>

          {/* Center: Logo for mobile, or empty for desktop (Harvard style centers logo sometimes, but left is fine) */}
          <div className="md:hidden flex-1 flex justify-center">
             <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold text-[var(--ce-golden-yellow)]">
                <BookMarked className="w-6 h-6" />
                <span>CEFR</span>
              </Link>
          </div>

          {/* Right: Search Box (Small search option at top right) */}
          <div className="flex items-center justify-end">
            <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'w-full md:w-64 bg-white/10 rounded-md p-1' : 'w-10'}`}>
              <form onSubmit={handleSearch} className={`flex items-center w-full ${isSearchOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                <input 
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-white text-sm px-3 focus:outline-none focus:ring-0 placeholder:text-white/50"
                  autoFocus={isSearchOpen}
                />
              </form>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`text-white hover:bg-white/10 hover:text-[var(--ce-golden-yellow)] flex-shrink-0 ${isSearchOpen ? 'rounded-l-none' : 'rounded-md'}`}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                title={isSearchOpen ? "Close search" : "Open search"}
              >
                {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
