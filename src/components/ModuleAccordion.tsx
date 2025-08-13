'use client';
import React, { useState } from 'react';

export interface ModuleItem {
  id: string;
  title: string;
  level: string;
  weeks: string;
  hours: string;
  description: string;
  keyTopics: string[];
  learningOutcomes: string[];
  assessments: { type: string; weight: number; description: string }[];
  activities: string[];
}

// WEF 2025 skill mapping per module id
const WEF_SKILL_TAGS: Record<string, { label: string; color: string; icon: string }> = {
  m1: { label: 'Active Learning', color: '#1E88E5', icon: '📘' },
  m2: { label: 'Communication & Collaboration', color: '#E53935', icon: '💬' },
  m3: { label: 'Complex Problem Solving', color: '#F4511E', icon: '🧩' },
  m4: { label: 'Critical Thinking & Analysis', color: '#43A047', icon: '🔍' },
  m5: { label: 'Creativity & Initiative', color: '#8E24AA', icon: '💡' },
};

export function ModuleAccordionList({ modules }: { modules: ModuleItem[] }) {
  return (
    <div className="space-y-4">
      {modules.map((m) => (
        <details key={m.id} className="group rounded-lg border border-border/30 bg-card/50">
          <summary className="cursor-pointer list-none p-4 md:p-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-lg">
            <div>
              <h3 className="font-headline text-xl md:text-2xl font-bold">{m.title}</h3>
              <p className="text-sm text-foreground/60">Level: {m.level} · Weeks: {m.weeks} · Hours: {m.hours}</p>
            </div>
            <span aria-hidden className="transition-transform group-open:rotate-180">⌄</span>
          </summary>
          <div className="px-4 md:px-5 pb-5 space-y-4">
            <p className="text-foreground/80">{m.description}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Key Topics</h4>
                <ul className="list-disc ml-5 space-y-1">
                  {m.keyTopics.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Learning Outcomes</h4>
                <ul className="list-disc ml-5 space-y-1">
                  {m.learningOutcomes.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Assessments</h4>
                <ul className="space-y-2">
                  {m.assessments.map((a, i) => (
                    <li key={i} className="rounded bg-muted/30 p-3">
                      <span className="font-medium capitalize">{a.type}</span>: {a.description} <span className="text-foreground/60">({a.weight}%)</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Activities</h4>
                <ul className="list-disc ml-5 space-y-1">
                  {m.activities.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

export default function ModuleAccordion({ module }: { module: any }) {
  const [open, setOpen] = useState(false);
  const tag = WEF_SKILL_TAGS[module?.id as string];
  return (
    <article className="border rounded-lg p-4">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-2"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-col xs:flex-row xs:items-center xs:flex-wrap gap-2">
            <h3 className="text-lg font-semibold break-words">
              {module.title}{' '}
            </h3>
            {tag && (
              <span
                className="inline-flex items-center gap-1 rounded shadow text-white"
                style={{ backgroundColor: tag.color, padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                aria-label={`Primary skill: ${tag.label}`}
              >
                <span aria-hidden>{tag.icon}</span>
                <span className="leading-none">{tag.label}</span>
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{module.weeks} • {module.hours} total</p>
        </div>
        <span className="ml-0 md:ml-4 self-end md:self-auto">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          <p>{module.description}</p>
          <div>
            <h4 className="font-medium">Key Topics</h4>
            <ul className="list-disc ml-5">
              {module.keyTopics.map((t: string, i: number) => <li key={i}>{t}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Learning Outcomes</h4>
            <ul className="list-disc ml-5">
              {module.learningOutcomes.map((l: string, i: number) => <li key={i}>{l}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Assessments</h4>
            <ul className="list-disc ml-5">
              {module.assessments.map((a: any, i: number) => <li key={i}>{a.type} — {a.weight}% — {a.description}</li>)}
            </ul>
          </div>
        </div>
      )}
    </article>
  );
}