"use client";

import Link from "next/link";
import { BookMarked, Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SearchDialog } from "@/components/SearchDialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const englishCourses = [
  { href: "/courses/english-1", label: "English I" },
  { href: "/courses/english-2", label: "English II" },
  { href: "/courses/english-3", label: "English III" },
  { href: "/courses/english-4", label: "English IV" },
];

const cefrLevels = [
  { href: "/level/a1", label: "A1 · Beginner" },
  { href: "/level/a2", label: "A2 · Elementary" },
  { href: "/level/b1", label: "B1 · Intermediate" },
  { href: "/level/b2", label: "B2 · Upper Intermediate" },
  { href: "/level/c1", label: "C1 · Advanced" },
  { href: "/level/c2", label: "C2 · Proficiency" },
];

const explore = [
  { href: "/courses/ai-tools", label: "AI for Students" },
  { href: "/soft-skills", label: "Soft Skills" },
  { href: "/courses/academic-language", label: "Academic Success" },
  { href: "/iq-test", label: "IQ Test (Cognitive Assessment)" },
  { href: "/courses", label: "All Courses" },
];

function NavDropdown({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 data-[state=open]:bg-white/10 text-sm font-semibold uppercase tracking-wider text-white hover:text-[var(--ce-golden-yellow)]">
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="bg-[var(--ce-deep-navy)] border border-white/10">
        <ul className="w-[240px] p-2">
          {items.map((item) => (
            <li key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (pathname?.startsWith("/iq-test")) return null;

  const mobileSection = (title: string, items: { href: string; label: string }[]) => (
    <div className="space-y-3 pt-4 border-t border-white/10">
      <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest">{title}</h3>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block text-base hover:text-[var(--ce-golden-yellow)] transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="bg-[var(--ce-deep-navy)] text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: brand + desktop nav */}
          <div className="flex items-center gap-6">
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <Menu className="h-7 w-7" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] bg-[var(--ce-deep-navy)] text-white border-r border-white/10 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-6 pb-10">
                    <Link
                      href="/"
                      className="flex items-center gap-2 font-headline text-2xl font-bold text-[var(--ce-golden-yellow)]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <BookMarked className="w-8 h-8" />
                      <span>ReadMe</span>
                    </Link>
                    <nav className="flex flex-col gap-4 pl-2">
                      <Link
                        href="/"
                        className="text-lg font-medium hover:text-[var(--ce-golden-yellow)] transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Home
                      </Link>
                      {mobileSection("English Courses", englishCourses)}
                      {mobileSection("CEFR English", cefrLevels)}
                      {mobileSection("Explore", explore)}
                      <Link
                        href="/assessment"
                        className="text-lg font-medium hover:text-[var(--ce-golden-yellow)] transition-colors pt-4 border-t border-white/10"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Find Your Level
                      </Link>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="flex items-center gap-2 font-headline text-2xl font-bold text-[var(--ce-golden-yellow)] mr-4 hover:opacity-90 transition-opacity"
              >
                <BookMarked className="w-8 h-8" />
                <span className="hidden lg:inline-block">ReadMe</span>
              </Link>
              <div className="hidden lg:block">
                <NavigationMenu>
                  <NavigationMenuList className="gap-2">
                    <NavDropdown label="English Courses" items={englishCourses} />
                    <NavDropdown label="CEFR" items={cefrLevels} />
                    <NavDropdown label="Explore" items={explore} />
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </nav>
          </div>

          {/* Center: mobile brand */}
          <div className="md:hidden flex-1 flex justify-center">
            <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold text-[var(--ce-golden-yellow)]">
              <BookMarked className="w-6 h-6" />
              <span>ReadMe</span>
            </Link>
          </div>

          {/* Right: search + primary CTA */}
          <div className="flex items-center justify-end gap-2">
            <SearchDialog />
            <Button asChild className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5">
              <Link href="/assessment/quick">Find Your Level</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
