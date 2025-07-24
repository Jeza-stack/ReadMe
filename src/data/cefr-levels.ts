export interface CEFRLevel {
  level: string;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  grammar: number;
  vocabulary: number;
  activities: number;
  features: string[];
}

export const cefrLevels: CEFRLevel[] = [
  {
    level: 'A1',
    name: 'Beginner',
    description: 'Can understand and use familiar everyday expressions and basic phrases.',
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-700 dark:text-blue-300',
    grammar: 6,
    vocabulary: 150,
    activities: 16,
    features: [
      'Present Simple (be, have, do)',
      'Articles (a, an, the)',
      'Personal Pronouns',
      'Basic everyday vocabulary',
      'Simple conversations'
    ]
  },
  {
    level: 'A2',
    name: 'Elementary',
    description: 'Can communicate in simple and routine tasks requiring direct exchange of information.',
    color: 'from-green-400 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    borderColor: 'border-green-200 dark:border-green-800',
    textColor: 'text-green-700 dark:text-green-300',
    grammar: 8,
    vocabulary: 300,
    activities: 20,
    features: [
      'Past Simple & Future plans',
      'Comparative adjectives',
      'Modal verbs (can/could)',
      'Travel & hobbies vocabulary',
      'Simple dialogues'
    ]
  },
  {
    level: 'B1',
    name: 'Intermediate',
    description: 'Can deal with most situations and express thoughts on familiar topics.',
    color: 'from-yellow-400 to-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    textColor: 'text-yellow-700 dark:text-yellow-300',
    grammar: 12,
    vocabulary: 600,
    activities: 28,
    features: [
      'Present Perfect & Past Continuous',
      'Conditional sentences (1st & 2nd)',
      'Passive voice (basic forms)',
      'Work & leisure vocabulary',
      'Opinion expression'
    ]
  },
  {
    level: 'B2',
    name: 'Upper-Intermediate',
    description: 'Can understand complex texts and interact fluently with native speakers.',
    color: 'from-orange-400 to-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    textColor: 'text-orange-700 dark:text-orange-300',
    grammar: 15,
    vocabulary: 1200,
    activities: 35,
    features: [
      'All tense forms & aspects',
      'Advanced conditionals (3rd)',
      'Reported speech',
      'Academic & business vocabulary',
      'Formal presentations'
    ]
  },
  {
    level: 'C1',
    name: 'Advanced',
    description: 'Can use language flexibly and effectively for social, academic and professional purposes.',
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    textColor: 'text-purple-700 dark:text-purple-300',
    grammar: 18,
    vocabulary: 2000,
    activities: 42,
    features: [
      'Complex grammatical structures',
      'Advanced modal verbs',
      'Inversion & emphasis',
      'Specialized terminology',
      'Nuanced communication'
    ]
  },
  {
    level: 'C2',
    name: 'Proficiency',
    description: 'Can understand virtually everything and express themselves spontaneously and precisely.',
    color: 'from-red-400 to-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950/20',
    borderColor: 'border-red-200 dark:border-red-800',
    textColor: 'text-red-700 dark:text-red-300',
    grammar: 20,
    vocabulary: 3000,
    activities: 50,
    features: [
      'Mastery of all grammar',
      'Idiomatic expressions',
      'Register variation',
      'Native-like vocabulary',
      'Effortless communication'
    ]
  }
];

export const getLevelByCode = (code: string): CEFRLevel | undefined => {
  return cefrLevels.find(level => level.level.toLowerCase() === code.toLowerCase());
};