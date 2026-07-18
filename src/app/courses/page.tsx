import data from '@/data/readme-data.json';
import CoursesClient, { type CatalogueCourse } from './CoursesClient';

export const metadata = {
  title: 'All Courses',
  description:
    'Browse the full ReadMe catalogue: English I–IV, CEFR English, Soft Skills, and cognitive assessments.',
};

// Catalogue-only presentation metadata, keyed by course slug. Names, descriptions
// and images come from readme-data.json so the catalogue can never drift from the
// course pages again.
const cardMeta: Record<string, { level: string; duration: string; difficulty: string; subject: string }> = {
  'english-1': { level: 'A1 - Beginner', duration: '12 Weeks', difficulty: 'Beginner', subject: 'Core English' },
  'english-2': { level: 'A2 - Elementary', duration: '12 Weeks', difficulty: 'Elementary', subject: 'Core English' },
  'english-3': { level: 'B1 - Intermediate', duration: '16 Weeks', difficulty: 'Intermediate', subject: 'Core English' },
  'english-4': { level: 'B2 - Upper Intermediate', duration: '16 Weeks', difficulty: 'Upper Intermediate', subject: 'Core English' },
  'soft-skills-mastery': { level: 'B2 - Upper Intermediate', duration: '20 Weeks', difficulty: 'Upper Intermediate', subject: 'Professional' },
};

export default function CoursesPage() {
  const fromData: CatalogueCourse[] = data.courses
    .filter((c) => c.slug in cardMeta)
    .map((c, i) => ({
      id: i + 1,
      title: c.name,
      description: c.description,
      href: `/courses/${c.slug}`,
      image: c.image,
      ...cardMeta[c.slug],
    }));

  const courses: CatalogueCourse[] = [
    ...fromData,
    {
      id: 100,
      title: 'CEFR English',
      description:
        'Structured English lessons by CEFR level, A1 to C2 — can-do based, self-checked, free.',
      href: '/cefr',
      level: 'All Levels',
      duration: 'Self-Paced',
      difficulty: 'All Levels',
      subject: 'Core English',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 101,
      title: 'IQ & Cognitive Practice Test',
      description:
        'A comprehensive, stateless cognitive assessment space for logic, patterns, and reasoning skills.',
      href: '/iq-test',
      level: 'All Levels',
      duration: 'Untimed',
      difficulty: 'Self-Paced',
      subject: 'Workshops',
      image: 'https://images.unsplash.com/photo-1558244661-d248897f7bc4?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return <CoursesClient courses={courses} />;
}
