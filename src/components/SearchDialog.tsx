'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Site search (Phase 2 Item 7): fetches the build-time index once on first
// open, scores by token match. No external service, no tracking.

type Entry = { title: string; sub: string; href: string; k: string };

function score(entry: Entry, tokens: string[]): number {
  const title = entry.title.toLowerCase();
  const hay = `${title} ${entry.sub.toLowerCase()} ${entry.k}`;
  let s = 0;
  for (const t of tokens) {
    if (!hay.includes(t)) return 0; // all tokens must match somewhere
    s += title.includes(t) ? (title.startsWith(t) ? 3 : 2) : 1;
  }
  return s;
}

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<Entry[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && !index) {
      fetch('/search-index.json')
        .then((r) => (r.ok ? r.json() : []))
        .then(setIndex)
        .catch(() => setIndex([]));
    }
  }, [open, index]);

  // Ctrl/Cmd+K shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    if (!index || query.trim().length < 2) return [];
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    return index
      .map((e) => ({ e, s: score(e, tokens) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 10)
      .map((r) => r.e);
  }, [index, query]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search (Ctrl+K)"
        title="Search (Ctrl+K)"
        className="text-white hover:bg-white/10 hover:text-[var(--ce-golden-yellow)]"
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[var(--ce-deep-navy)] border-white/10 text-white p-0 gap-0 max-w-lg top-[20%] translate-y-0">
          <DialogHeader className="px-4 pt-4 pb-2">
            <DialogTitle className="sr-only">Search ReadMe</DialogTitle>
            <div className="flex items-center gap-2 border border-white/15 rounded-lg px-3 bg-white/5 focus-within:border-cyan-400/60">
              <Search className="w-4 h-4 text-white/40 flex-shrink-0" />
              <input
                ref={inputRef}
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search guides, lessons, courses…"
                className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-white/40"
              />
              {query && (
                <button aria-label="Clear" onClick={() => setQuery('')}>
                  <X className="w-4 h-4 text-white/40 hover:text-white" />
                </button>
              )}
            </div>
          </DialogHeader>
          <div className="max-h-80 overflow-y-auto px-2 pb-3">
            {query.trim().length >= 2 && results.length === 0 && index && (
              <p className="text-sm text-white/50 text-center py-6">No results for “{query}”.</p>
            )}
            <ul>
              {results.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 hover:bg-white/10 transition-colors"
                  >
                    <span className="block text-sm font-medium text-white">{r.title}</span>
                    <span className="block text-xs text-white/50 mt-0.5">{r.sub}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {query.trim().length < 2 && (
              <p className="text-xs text-white/35 text-center py-6">
                Type at least two characters · Ctrl+K opens search anywhere
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
