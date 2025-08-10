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
    <Link href={href} className="block">
      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-card/50">
        <CardContent className="p-4 xs:p-5 md:p-6">
          {icon && <div className="mb-4 text-primary">{icon}</div>}
          <CardTitle className="font-headline text-xl xs:text-2xl font-bold mb-2">{title}</CardTitle>
          <CardDescription className="text-sm xs:text-base text-foreground/70 leading-relaxed">
            {description}
          </CardDescription>
          <div className="mt-4 xs:mt-6">
            <Button className="font-semibold">{cta}</Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}