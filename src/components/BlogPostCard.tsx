import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card className="flex flex-col overflow-hidden group">
        <Link href={`/soft-skills/${post.slug}`} className="block overflow-hidden">
            <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                data-ai-hint={post.dataAiHint}
            />
        </Link>
      <CardHeader>
        <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
        <CardTitle className="font-headline text-xl leading-snug">
          <Link href={`/soft-skills/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3">{post.content}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Clock className="w-4 h-4"/>
            <span>{post.readingTime} read</span>
        </div>
      </CardFooter>
    </Card>
  );
}
