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
  return (
    <article className="border rounded-lg p-4">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex justify-between items-center"
      >
        <div>
          <h3 className="text-lg font-semibold">{module.title} <span className="text-sm text-muted-foreground">({module.level})</span></h3>
          <p className="text-sm text-muted-foreground">{module.weeks} • {module.hours} total</p>
        </div>
        <span className="ml-4">{open ? '−' : '+'}</span>
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