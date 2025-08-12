import type { Metadata } from 'next';
import CourseDetail from '@/components/CourseDetail';
import softSkills from '@/data/courses/soft-skills-mastery.json';

export async function generateMetadata(): Promise<Metadata> {
  const url = `https://example.com/courses/${softSkills.slug}`;
  return {
    title: softSkills.seo?.title || softSkills.title,
    description: softSkills.seo?.description || softSkills.description,
    openGraph: {
      title: softSkills.seo?.title || softSkills.title,
      description: softSkills.seo?.description || softSkills.description,
      type: 'website',
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title: softSkills.seo?.title || softSkills.title,
      description: softSkills.seo?.description || softSkills.description,
    },
    alternates: { canonical: url },
  };
}

export default function SoftSkillsCoursePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: softSkills.title,
            description: softSkills.description,
            provider: { '@type': 'Organization', name: 'ReadMe' },
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: softSkills.format,
              courseWorkload: `${softSkills.durationWeeks} weeks`,
              educationalLevel: 'All levels',
            },
          }),
        }}
      />
      <CourseDetail />
    </>
  );
}