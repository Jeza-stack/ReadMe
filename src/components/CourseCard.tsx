import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CourseCardProps {
  title: string;
  description: string;
  href: string;
  image?: string;
  icon?: React.ReactNode;
  cta?: string;
}

export function CourseCard({
  title,
  description,
  href,
  image,
  icon,
  cta = 'View Details',
}: CourseCardProps) {
  return (
    <Link href={href} className="block group h-full">
      <Card
        className="flex flex-col h-full overflow-hidden border-0 transition-all duration-300 
          bg-white dark:bg-[#0A1330] 
          shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] 
          hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] 
          hover:-translate-y-2 rounded-2xl group border border-slate-100 dark:border-white/5"
      >
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden">
          {image ? (
            <Image 
              src={image} 
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#043370] to-[#00A2C9]"></div>
          )}
          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          
          {/* Icon Badge */}
          {icon && (
            <div className="absolute bottom-4 left-4 p-2 bg-white/10 backdrop-blur-md rounded-lg text-white border border-white/20">
              {icon}
            </div>
          )}
        </div>

        {/* Content Section */}
        <CardContent className="flex flex-col flex-1 p-6">
          <CardTitle className="font-headline text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-[#00A2C9] transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 font-body">
            {description}
          </CardDescription>
          
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00A2C9] dark:text-cyan-400">
              {cta}
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-400 group-hover:bg-[#00A2C9] group-hover:text-white transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}