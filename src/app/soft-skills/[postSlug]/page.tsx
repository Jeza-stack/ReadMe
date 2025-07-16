import { getBlogPost, getRelatedBlogPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { SocialShare } from '@/components/SocialShare';
import { Badge } from '@/components/ui/badge';
import { Clock, UserCircle } from 'lucide-react';
import { BlogPostCard } from '@/components/BlogPostCard';
import { Separator } from '@/components/ui/separator';

type Props = {
  params: {
    postSlug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const post = getBlogPost(params.postSlug);
  if (!post) {
    return { title: 'Post not found' };
  }
  return {
    title: `${post.title} | ReadMe Blog`,
    description: post.content.substring(0, 150),
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.postSlug);

  if (!post) {
    notFound();
  }
  
  const relatedPosts = getRelatedBlogPosts(post);

  return (
    <div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto">
                <article>
                    <header className="mb-8 text-center">
                        <Badge variant="secondary" className="mb-4">{post.category}</Badge>
                        <h1 className="font-headline text-4xl md:text-5xl font-bold">{post.title}</h1>
                        <div className="mt-6 flex justify-center items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <UserCircle className="w-4 h-4" />
                                <span>{post.authorProfile}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readingTime} read</span>
                            </div>
                        </div>
                    </header>
                    <div className="my-8 rounded-lg overflow-hidden">
                        <Image src={post.image} alt={post.title} width={1200} height={600} className="w-full object-cover" data-ai-hint={post.dataAiHint} />
                    </div>
                    <div className="prose prose-lg max-w-none font-body">
                       <p>{post.content}</p>
                    </div>

                    <Separator className="my-8" />
                    
                    <footer className="flex justify-center">
                        <SocialShare title={post.title} />
                    </footer>
                </article>

                {relatedPosts.length > 0 && (
                    <aside className="mt-16">
                        <Separator />
                        <div className="py-12">
                            <h2 className="font-headline text-3xl font-bold text-center mb-8">Related Posts</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {relatedPosts.map(relatedPost => (
                                    <BlogPostCard key={relatedPost.slug} post={relatedPost} />
                                ))}
                            </div>
                        </div>
                    </aside>
                )}

            </div>
        </div>
    </div>
  );
}
