import readmeData from '@/data/readme-data.json';
import CourseDetail from '@/components/CourseDetail';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soft Skills Mastery — Practical Soft Skills for 2025',
  description: '20-week blended program teaching emotional intelligence, communication, teamwork, leadership, and career readiness.'
};

export default function Page() {
  const course = (readmeData.courses || []).find((c: any) => c.slug === 'soft-skills-mastery');
  if (!course) return <div className="container mx-auto p-6">Course not found.</div>;
  return <CourseDetail course={course} />;
}