'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#levels', label: 'Levels' },
    { href: '#testimonials', label: 'Success Stories' },
    { href: '#assessment', label: 'Assessment' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="nav-logo">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CE</span>
              </div>
              <span className="font-headline">CEFR Excellence</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <ul className="nav-menu hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Get Started
              </Button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "nav-menu md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "active max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <ul className="py-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className="block px-2 py-3 text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}