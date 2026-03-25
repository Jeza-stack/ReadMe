import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Crumb {
  label: string;
  href: string;
}

interface BackNavProps {
  crumbs: Crumb[];
  /** The title of the current (deepest) page — no link */
  current: string;
}

/**
 * Sticky breadcrumb / back navigation bar shown below the global header.
 * Provides "you are here" context and one-click escape routes at every depth.
 */
export function BackNav({ crumbs, current }: BackNavProps) {
  return (
    <div className="bg-white dark:bg-[#0A1330] border-b border-slate-200 dark:border-white/10 sticky top-[80px] z-40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold">
        {crumbs.map((crumb, idx) => (
          <span key={idx} className="flex items-center gap-2">
            {idx === 0 && <ArrowLeft className="w-4 h-4 text-slate-400" />}
            <Link
              href={crumb.href}
              className="text-slate-500 dark:text-cyan-400 hover:text-[#043370] dark:hover:text-[var(--ce-golden-yellow)] transition-colors whitespace-nowrap"
            >
              {crumb.label}
            </Link>
            <span className="text-slate-300 dark:text-white/20">/</span>
          </span>
        ))}
        <span className="text-slate-800 dark:text-white font-bold truncate max-w-[200px]">{current}</span>
      </div>
    </div>
  );
}
