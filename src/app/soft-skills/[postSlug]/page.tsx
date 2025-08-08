import { getBlogPost, getRelatedBlogPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { SocialShare } from '@/components/SocialShare';
import { Badge } from '@/components/ui/badge';
import { Clock, UserCircle } from 'lucide-react';
import { BlogPostCard } from '@/components/BlogPostCard';
import { Separator } from '@/components/ui/separator';

export async function generateMetadata({ params }: { params?: any }) {
  const p = (await params) || params;
  const post = getBlogPost(p?.postSlug as string);
  if (!post) {
    return { title: 'Post not found' };
  }
  return {
    title: `${post.title} | ReadMe Blog`,
    description: post.content.substring(0, 150),
  };
}

export default function BlogPostPage({ params }: { params?: any }) {
  const p = params as { postSlug?: string };
  const post = getBlogPost(p?.postSlug || '');

  if (!post) {
    notFound();
  }
  
  const relatedPosts = getRelatedBlogPosts(post);

  return (
    <div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
            <div className="max-w-4xl mx-auto">
                <article>
                    <header className="mb-12 text-center">
                        <Badge variant="secondary" className="mb-4">{post.category}</Badge>
                        <h1 className="font-headline text-4xl md:text-6xl font-bold">{post.title}</h1>
                        <div className="mt-8 flex justify-center items-center gap-6 text-sm text-foreground/70">
                            <div className="flex items-center gap-2">
                                <UserCircle className="w-5 h-5" />
                                <span>{post.authorProfile}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span>{post.readingTime} read</span>
                            </div>
                        </div>
                    </header>
                    <div className="my-12 rounded-lg overflow-hidden shadow-2xl">
                        <Image src={post.image} alt={post.title} width={1200} height={600} className="w-full object-cover" data-ai-hint={post.dataAiHint} />
                    </div>
                    <div className="prose prose-lg prose-invert max-w-none font-body text-foreground/90">
                       <p>{post.content}</p>
                    </div>

                    <Separator className="my-12" />
                    
                    <footer className="flex justify-center">
                        <SocialShare title={post.title} />
                    </footer>
                </article>

                {relatedPosts.length > 0 && (
                    <aside className="mt-24">
                        <Separator />
                        <div className="py-16">
                            <h2 className="font-headline text-3xl font-bold text-center mb-12">Related Posts</h2>
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
