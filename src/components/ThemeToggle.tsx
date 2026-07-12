'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * Light/dark toggle. Flips the `dark` class on <html> (Tailwind darkMode:'class'),
 * persists the choice to localStorage, and notifies the ambient background to
 * re-tint. Initial theme is set by the no-flash script in layout.tsx (defaults
 * to the visitor's device preference).
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* ignore storage errors */
    }
    window.dispatchEvent(new Event('themechange'));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-10 h-10 rounded-full grid place-items-center text-white/80 border border-white/15 bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch */}
      {mounted && !dark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
}
