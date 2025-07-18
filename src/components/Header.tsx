"use client";

import Link from "next/link";
import { BookMarked, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const cefrLevels = [
  { href: "/level/a1", label: "A1 - Beginner", description: "Basic everyday expressions" },
  { href: "/level/a2", label: "A2 - Elementary", description: "Simple routine tasks" },
  { href: "/level/b1", label: "B1 - Intermediate", description: "Most travel situations" },
  { href: "/level/b2", label: "B2 - Upper Intermediate", description: "Complex texts and fluent interaction" },
  { href: "/level/c1", label: "C1 - Advanced", description: "Flexible and effective use" },
  { href: "/level/c2", label: "C2 - Proficiency", description: "Near-native mastery" },
];

const navItems = [
  { href: "/assessment", label: "Assessment" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-transparent backdrop-blur-lg border-b border-border/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold text-primary">
            <BookMarked className="w-8 h-8 text-foreground" />
            <span className="text-foreground">CEFR English</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-headline text-md font-medium text-foreground/80 hover:text-primary">
                    Levels
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] gap-3 p-6 md:w-[600px] md:grid-cols-2">
                      {cefrLevels.map((level) => (
                        <NavigationMenuLink key={level.href} asChild>
                          <Link
                            href={level.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{level.label}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {level.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-headline text-md font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background/90 backdrop-blur-xl">
                <SheetHeader>
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                </SheetHeader>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-8">
                         <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                            <BookMarked className="w-6 h-6 text-foreground" />
                            <span className="text-foreground">CEFR English</span>
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close menu</span>
                        </Button>
                    </div>

                    <nav className="flex flex-col gap-6">
                        <div className="space-y-3">
                          <h3 className="font-headline text-lg font-semibold">CEFR Levels</h3>
                          {cefrLevels.map((level) => (
                            <Link
                              key={level.href}
                              href={level.href}
                              className="block font-headline text-md font-medium text-foreground/80 hover:text-primary transition-colors pl-4"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {level.label}
                            </Link>
                          ))}
                        </div>
                        {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="font-headline text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                        ))}
                    </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
