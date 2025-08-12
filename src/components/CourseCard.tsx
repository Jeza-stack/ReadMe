import Link from 'next/link';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function CourseCard({
  title,
  description,
  href,
  icon,
  cta = 'Explore',
}: {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  cta?: string;
}) {
  return (
    <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ce-golden-yellow)] focus-visible:ring-offset-transparent rounded-xl">
      <Card
        className="group relative overflow-hidden border-0 transition duration-200
          bg-[linear-gradient(135deg,var(--ce-deep-navy),var(--ce-mid-blue))]
          text-[var(--ce-text-primary)]
          shadow-[0_4px_12px_rgba(0,0,0,0.3)]
          hover:shadow-[0_6px_16px_rgba(0,0,0,0.35)]
          hover:-translate-y-1 rounded-xl"
      >
        <CardContent className="p-4 xs:p-5 md:p-6">
          {icon && (
            <div className="mb-4 text-[var(--ce-warm-orange)]">
              {icon}
            </div>
          )}
          <CardTitle className="font-headline text-xl xs:text-2xl font-bold mb-2 text-[var(--ce-golden-yellow)]">
            {title}
          </CardTitle>
          <CardDescription className="text-sm xs:text-base leading-relaxed text-[var(--ce-text-secondary)]">
            {description}
          </CardDescription>
          <div className="mt-4 xs:mt-6">
            <Button
              className="font-semibold bg-[var(--ce-magenta)] text-[var(--ce-text-primary)] hover:bg-[var(--ce-magenta-hover)] border-0"
            >
              {cta}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}