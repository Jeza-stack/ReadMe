// Pillar registry — theme colours per MDS §Design tokens, content dirs per
// content/_schemas/generic-guide.schema.json pillar enum.
export type PillarKey = 'ai-for-students' | 'academic-success' | 'soft-skills';

export type Pillar = {
  key: PillarKey;
  name: string;
  colour: string; // MDS theme colour
  blurb: string;
  basePath: string; // route prefix for guide pages
};

export const PILLARS: Record<PillarKey, Pillar> = {
  'ai-for-students': {
    key: 'ai-for-students',
    name: 'AI for Students',
    colour: '#6D28D9',
    blurb:
      'Use AI honestly and well: fundamentals, prompt craft, and the integrity rules that keep your degree yours.',
    basePath: '/ai-for-students',
  },
  'academic-success': {
    key: 'academic-success',
    name: 'Academic Success',
    colour: '#C2540A',
    blurb:
      'The craft of being a student: essays, referencing, and exams — each guide built around a worked example.',
    basePath: '/academic-success',
  },
  'soft-skills': {
    key: 'soft-skills',
    name: 'Soft Skills',
    colour: '#059669',
    blurb:
      'Professional capabilities employers name first: communication, teamwork, and how to practise them deliberately.',
    basePath: '/soft-skills/programme',
  },
};

export type GuideFrontmatter = {
  title: string;
  pillar: string;
  section?: string;
  audience?: string[];
  tags?: string[];
  related?: string[];
  updated: string;
};
