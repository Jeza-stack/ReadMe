'use client';
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

// Enriched WEF 2025 skill info
export const SKILL_INFO: Record<string, { color: string; icon: string; description: string }> = {
  'Analytical Thinking': {
    color: '#1E88E5',
    icon: '🧠',
    description: 'Breaking down complex problems into clear, logical steps for effective solutions.'
  },
  'Creative Thinking': {
    color: '#FFB300',
    icon: '💡',
    description: 'Generating original ideas and transforming them into innovative, real-world outcomes.'
  },
  'Resilience, Flexibility and Agility': {
    color: '#43A047',
    icon: '🌱',
    description: 'Adapting quickly to change and bouncing back stronger from challenges.'
  },
  'Motivation and Self-awareness': {
    color: '#F4511E',
    icon: '🔥',
    description: 'Understanding yourself and staying driven to reach your personal and professional goals.'
  },
  'Curiosity and Lifelong Learning': {
    color: '#8E24AA',
    icon: '🔍',
    description: 'Actively seeking new knowledge and skills to keep growing in a changing world.'
  },
  'Systems Thinking': {
    color: '#00ACC1',
    icon: '🔄',
    description: 'Seeing the bigger picture and understanding how parts connect within complex systems.'
  },
  'AI and Big Data': {
    color: '#5E35B1',
    icon: '🤖',
    description: 'Using artificial intelligence and data analysis to make smarter, faster decisions.'
  },
  'Leadership and Social Influence': {
    color: '#D81B60',
    icon: '🌟',
    description: 'Inspiring, guiding, and influencing others to achieve shared goals.'
  },
  'Talent Management': {
    color: '#6D4C41',
    icon: '🧩',
    description: 'Recognizing and developing the potential in yourself and others.'
  },
  'Service Orientation and Customer Service': {
    color: '#009688',
    icon: '🤝',
    description: 'Providing value, care, and solutions that truly meet people’s needs.'
  },
};

// Map modules to a primary WEF skill key
export const MODULE_SKILL_MAP: Record<string, keyof typeof SKILL_INFO> = {
  m1: 'Motivation and Self-awareness',
  m2: 'Communication & Collaboration' as any, // fallback if present elsewhere
  m3: 'Talent Management',
  m4: 'Leadership and Social Influence',
  m5: 'Curiosity and Lifelong Learning',
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
  const skillKey = MODULE_SKILL_MAP[module?.id as string];
  // Support legacy mapping key if using Communication & Collaboration not defined in SKILL_INFO
  const legacyComm = skillKey === ('Communication & Collaboration' as any);
  const skill = legacyComm
    ? { color: '#E53935', icon: '💬', description: 'Exchanging ideas clearly and working effectively with others.' }
    : SKILL_INFO[skillKey as string];

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
            {skill && (
              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className="inline-flex items-center gap-1 rounded shadow text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                      style={{ backgroundColor: skill.color, padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                      aria-describedby={`skill-${module.id}`}
                    >
                      <span aria-hidden>{skill.icon}</span>
                      <span className="leading-none">{skillKey}</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    id={`skill-${module.id}`}
                    className="overflow-visible bg-white dark:bg-gray-800 text-slate-900 dark:text-white max-w-[250px] p-3"
                  >
                    <div className="relative">
                      <span className="absolute -top-2 left-4 h-3 w-3 rotate-45 bg-white dark:bg-gray-800 shadow-sm" aria-hidden />
                      <div className="flex items-start gap-2">
                        <span className="text-base" aria-hidden>{skill.icon}</span>
                        <div>
                          <div className="font-semibold">{skillKey}</div>
                          <div className="text-sm opacity-90">{skill.description}</div>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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