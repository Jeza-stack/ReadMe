import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Award, FileText } from 'lucide-react';

export function CourseCTA({ enrollHref = '#', syllabusHref = '#' }: { enrollHref?: string; syllabusHref?: string }) {
  return (
    <div className="mt-10 flex flex-col sm:flex-row gap-4">
      <Button asChild size="lg" className="h-12 px-6 font-semibold">
        <Link href={enrollHref} aria-label="Enroll in this course">
          Enroll Now <Award className="ml-2 w-5 h-5" />
        </Link>
      </Button>
      <Button asChild size="lg" variant="outline" className="h-12 px-6 font-semibold">
        <Link href={syllabusHref} aria-label="Download course syllabus">
          Download Syllabus <FileText className="ml-2 w-5 h-5" />
        </Link>
      </Button>
    </div>
  );
}