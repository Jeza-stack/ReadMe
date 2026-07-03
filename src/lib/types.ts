export interface DifficultWord {
  word: string;
  definition: string;
  connotation?: string;
  example?: string;
}

export interface AuthorInfo {
  biography?: string;
  historicalContext?: string;
  writingStyle?: string;
  majorWorks?: string[];
  influence?: string;
}

export interface ContentAnalysis {
  summary?: string;
  themes?: string[];
  literaryDevices?: { device: string; example: string }[];
  criticalAnalysis?: string;
  relevance?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface LiteraryWork {
  title: string;
  slug: string;
  category: string;
  author: string;
  fullText: string;
  image?: string;
  videoUrl?: string;
  videoEmbedId?: string;
  difficultWords: DifficultWord[];
  authorInfo?: AuthorInfo;
  contentAnalysis?: ContentAnalysis;
  faqs: Faq[];
  quiz: QuizQuestion[];
  /** Language Lesson pedagogy fields (Pass 3 content, JB-authored).
      Sections render only when present. */
  lessonMeta?: {
    estimatedTime?: string;      // e.g. "20 minutes"
    difficulty?: string;         // e.g. "Intermediate"
    prerequisites?: string[];
    objectives?: string[];       // "By the end you will be able to…"
  };
  commonMistakes?: { mistake: string; correction: string }[];
  workedExamples?: { title?: string; example: string }[];
}

export interface Course {
  name: string;
  slug: string;
  description: string;
  image: string;
  dataAiHint: string;
  categories: { name: string; works: LiteraryWork[] }[];
}

export interface BlogPost {
  title: string;
  slug: string;
  category: string;
  content: string;
  readingTime: string;
  authorProfile: string;
  image: string;
  dataAiHint: string;
}

export interface Data {
  courses: Course[];
  softSkills: {
    blogCategories: string[];
    blogPosts: BlogPost[];
  };
}

    