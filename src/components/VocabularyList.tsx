"use client";
import React, { useEffect, useMemo, useState } from "react";

export interface WordEntry {
  term: string;
  definition: string;
  example: string;
  partOfSpeech?: string;
  tags?: string[];
}

export interface VocabularyListProps {
  level: string; // e.g. "a2"
  category: string; // e.g. "Shopping & Services"
  words: WordEntry[];
  onProgress?: (completed: number, total: number) => void;
  initiallyExpanded?: boolean;
}

const storageKey = (level: string, category: string) =>
  `vocab-progress:${level}:${category}`;

export default function VocabularyList({
  level,
  category,
  words,
  onProgress,
  initiallyExpanded = false,
}: VocabularyListProps) {
  const key = storageKey(level, category);
  const [completedSet, setCompletedSet] = useState<Set<string>>(new Set());
  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    initiallyExpanded ? 0 : null
  );

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
      if (raw) {
        const arr: string[] = JSON.parse(raw);
        setCompletedSet(new Set(arr));
      }
    } catch {}
  }, [key]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(Array.from(completedSet)));
      }
    } catch {}
    if (onProgress) onProgress(completedSet.size, words.length);
  }, [completedSet, key, onProgress, words.length]);

  const toggleCompleted = (term: string) => {
    setCompletedSet(prev => {
      const next = new Set(prev);
      if (next.has(term)) next.delete(term);
      else next.add(term);
      return next;
    });
  };

  const progress = useMemo(() => {
    return words.length === 0 ? 0 : Math.round((completedSet.size / words.length) * 100);
  }, [completedSet, words.length]);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-100">{category}</h2>
          <p className="text-sm text-gray-400">{words.length} words</p>
        </div>

        <div className="w-48">
          <div className="bg-gray-800 rounded-full h-3 w-full overflow-hidden border border-gray-700">
            <div
              className="h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg,#2dd4bf,#06b6d4)" }}
              aria-hidden
            />
          </div>
          <p className="text-xs text-gray-300 text-right mt-1">{progress}%</p>
        </div>
      </div>

      <div className="space-y-3">
        {words.map((w, idx) => {
          const isCompleted = completedSet.has(w.term);
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={w.term}
              className="bg-[#051023] border border-gray-800 rounded-2xl p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleCompleted(w.term)}
                      aria-pressed={isCompleted}
                      className={`w-9 h-9 flex items-center justify-center rounded-md border ${
                        isCompleted ? "bg-green-500/20 border-green-500" : "border-gray-700"
                      }`}
                      title={isCompleted ? "Mark as not learned" : "Mark as learned"}
                    >
                      {isCompleted ? "✓" : "+"}
                    </button>

                    <div>
                      <div className="text-sm font-medium text-gray-100">{w.term}</div>
                      <div className="text-xs text-gray-400">{w.partOfSpeech ?? ""}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setExpandedIndex(prev => (prev === idx ? null : idx))}
                    className="text-sm bg-transparent px-3 py-2 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    {isExpanded ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-3 text-sm text-gray-300 space-y-2">
                  <div>
                    <span className="text-xs text-gray-400">Definition — </span>
                    <span>{w.definition}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Example — </span>
                    <span className="italic">"{w.example}"</span>
                  </div>
                  {w.tags && w.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2">
                      {w.tags.map(t => (
                        <span key={t} className="text-xs px-2 py-1 rounded-full border border-gray-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

